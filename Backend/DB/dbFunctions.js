const pool = require('./db');
const generateUserId = require('../helperFunctions');
const bCrypt = require('bcrypt');

//Generate a salt to be added to our hashed passwords 
const getSalt = async () => {
    return await bCrypt.genSalt(10);
}

const salt = getSalt();

//Return all users and their information
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).json(results.rows);
    })

}


//Return a specific user by their email
const findByEmail = async (email) => {

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows?.length) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }


}

//Create a new user and store them in the DB
const createUser = async (req, res) => {

    const { password, email, firstname, lastname } = req.body;
    const existingUser = await findByEmail(email);
    if (existingUser == null) {

        //Salt and hash passwords so they are safe

        const hashedPassword = await bCrypt.hash(password, await salt);

        const id = generateUserId();
        const cartId = generateUserId();

        pool.query(
            'INSERT INTO cart VALUES ($1)',
            [cartId], (error, results) => {
                if (error) {
                    console.log(error);
                }
            }
        )
        pool.query(
            'INSERT INTO users (id, password, email, firstname, lastname, created_at, modified_at, cart_id) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp, $6)',
            [id, hashedPassword, email, firstname, lastname, cartId], (error, results) => {
                if (error) {
                    console.log(error);
                }
                res.status(201).send(`User created with email: ${email}`)
            })
    } else {
        res.send(`${existingUser} is already registered!`);
    }

};

//Allow a user to update their password

const changePassword = async (email, newPassword) => {

    //Grab new password from request body then hash and salt
    const existingUser = await findByEmail(email);

    if (existingUser) {
        const hashedNewPassword = await bCrypt.hash(newPassword, await salt);
        pool.query(
            'UPDATE users SET password=$1, modified_at=current_timestamp WHERE email=$2',
            [hashedNewPassword, email], (error, results) => {
                if (error) {
                    console.log(error);
                    return (null)
                }

            }

        )
        return (newPassword);
    } else {
        return (null);
    }
}

//Return all products

const getProducts = (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).json(results.rows);
    })

}
//Return products of a certain category
const getProductsByCategory = async (category) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
        if (result.rows?.length) {
            return await result.rows;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

//Get a user's cart
const getCart = async (req, res) => {

    const { email } = req.body;
    const user = await findByEmail(email);
    if (user === null) { res.send('User not found') }
    else {
        const cartId = user.cart_id;
        pool.query(
            'SELECT * FROM cart_item WHERE cart_id = $1',
            [cartId], (error, results) => {
                if (error) {
                    console.log(error);
                }
                res.send(results.rows);
            }
        )
    }

}

//Find product by Id
const findProductById = async (id) => {
    const result = await pool.query('SELECT * FROM PRODUCTS WHERE id = $1', [id]);
    return result.rows[0];
}

//Add item to cart
const addToCart = async (id, quantity, email) => {
    const user = await findByEmail(email);
    const cartId = user.cart_id;
    const cartItemId = generateUserId();
    const product = await findProductById(id);
    const productId = product.id;
    const price = product.price;

    await pool.query(
        'INSERT INTO cart_item VALUES ($1, $2, $3, $4, $5)',
        [cartItemId, productId, quantity, cartId, price], (error, results) => {
            if (error) {
                console.log(error);
                return (null)
            }
            else { return true };
        }
    )

}

//Delete item from cart
const deleteFromCart = async (id) => {
    await pool.query(
        'DELETE FROM cart_item WHERE id = $1',
        [id])
}

//Save order items to db
const saveOrderItems = async (id, orderId, quantity, price, product_id) => {
    await pool.query('INSERT INTO order_item VALUES($1, $2, $3, $4, $5)',
        [id, orderId, quantity, price, product_id]
    )
};

//Checkout and create an order
const checkout = async (email) => {
    const orderId = generateUserId();
    const user = await findByEmail(email);
    let total = 0;
    if (user) {
        cartId = user.cart_id;
        const cart = await pool.query(
            'SELECT * FROM cart_item WHERE cart_id = $1',
            [cartId])

        await pool.query('INSERT INTO orders(id, user_id, created_at, modified_at) VALUES ($1, $2, current_timestamp, current_timestamp)',
            [orderId, user.id]);

        cart.rows.forEach((element) => {
            let orderItemId = generateUserId();
            let productId = element.product_id;
            let quantity = element.quantity;
            let price = element.price;
            total += Number(price.replace(/[^0-9.-]+/g, ""));
            saveOrderItems(orderItemId, orderId, quantity, price, productId);
        })

        await pool.query('UPDATE orders SET total = $1, status = $2 WHERE id = $3',
            [total, 'Confirmed', orderId]
        )
    }

}

//Get all of a users orders
const getOrders = async (req, res) => {
    const { email } = req.body;
    const user = await findByEmail(email);

    if (user) {
        userId = user.id

        await pool.query('SELECT * FROM orders WHERE user_id = $1',
            [user.id], (error, results) => {
                if (error) {
                    res.send('error')
                }
                if (!results.row)
                res.send(results.rows);
            })
    } else {
        res.send('Orders not found');
    }


};

//Get order by id
const getOrderById = async (req, res) => {
    const { id } = req.body;
    if (id) {
        await pool.query('SELECT * FROM orders WHERE id = $1',
            [id], (error, results) => {
                if(error) {
                    res.send(error);
                }
                if (results.rows.length < 1) {
                    res.send('Order not found');
                }
                res.send(results.rows[0]);
            }
        )
    }
};

//Get items in an order
const getOrderItems = async (req, res) => {
    const { id } = req.body;
    if(id) {
        await pool.query('SELECT * FROM order_item WHERE order_id = $1',
            [id],(error, results) => {
                if (error) {
                    res.send(error);
                }
                if (results.rows.length < 1) {
                    res.send('Order not found');
                }
                res.send(results.rows);
            }
            
        )
    }
};



module.exports = { getUsers, createUser, findByEmail, changePassword, getProducts, getProductsByCategory, getCart, addToCart, deleteFromCart, checkout, getOrders, getOrderById, getOrderItems };
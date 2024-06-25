import React from "react";
import './Cart.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// navigate("/OrderConfirmed");


const Cart = ({ session, cart, cartTotal, products, removeItemFromCart, createAndSaveOrder }) => {
    let cartItemIds = [];
    let showOrderButton = false;
    const navigate = useNavigate();
    if(cartTotal > 0) showOrderButton = true;
    const oldKey = "id";
    const newKey ="cart_product_id";

    cart.forEach(element => {
        cartItemIds.push(element.product_id);
    });


    useEffect(()=>{
        
    },[cartTotal])

    useEffect(()=> {
        cart.map((object) => {
            delete Object.assign(object, {[newKey]: object[oldKey] })[oldKey];
    })

        
    },[cart])


    
    
    let cartProducts = products.filter((product) => cartItemIds.includes(product.id));
    
    // Join our two arrays together
    let zipped = cart.map(obj1 => {
        let obj2 = cartProducts.find(obj2 => obj1.product_id === obj2.id);
        return { ...obj1, ...obj2 };
    });
    
    // console.log(cart);
    // console.log(cartProducts);
    // console.log(cartItemIds);
    // console.log(zipped);
    
    const createOrderHandler = async () => {
        await createAndSaveOrder(session.passport.user)
        navigate("/OrderConfirmed");
        
    }



    return (
        <div className="container cart-container">
            <h1>Cart</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {zipped.map((element) => {
                        
                        return (
                            <tr>
                                <td>{element.name}</td>
                                <td>{element.quantity}</td>
                                <td>£{element.price}</td>
                                <td className="remove" onClick={() => removeItemFromCart(element.cart_product_id)}>x</td>
                            </tr>

                        )

                    })}
                    <tr>
                        <td className="last" colSpan="4">Total: £{cartTotal}</td>
                        
                    </tr>
                </tbody>


            </table>
            <br></br>
            {showOrderButton?<button type="button" className="btn btn-primary" onClick={createOrderHandler}>Confirm Order</button>:<></>}
        </div>
    )
}

export default Cart;
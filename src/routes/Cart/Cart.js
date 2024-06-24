import React from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../api/cart";
import './Cart.css';


const Cart = ({ session, cart, cartTotal, products, removeItemFromCart }) => {
    let cartItemIds = [];

    cart.map(element => {
        cartItemIds.push(element.product_id);
    });

    let cartProducts = products.filter((product) => cartItemIds.includes(product.id));



    //Join our two arrays together
    let zipped = cartProducts.map(obj1 => {
        let obj2 = cart.find(obj2 => obj1.id === obj2.product_id);
        return { ...obj1, ...obj2 };
    });



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
                                <td>{element.price}</td>
                                <td className="remove" onClick={() => removeItemFromCart(element.id)}>x</td>
                            </tr>

                        )

                    })}
                    <tr>
                        <td className="last" colSpan="4">Total: £{cartTotal}</td>
                        
                    </tr>
                </tbody>


            </table>
        </div>
    )
}

export default Cart;
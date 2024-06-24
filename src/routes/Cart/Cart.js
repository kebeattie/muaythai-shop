import React from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../api/cart";


const Cart = ({session, cart, cartTotal, products}) => {

    // let cartItemIds = [];
    
    // cartItemIds = cart.forEach(element => {
    //     cartItemIds.push(element.id);
    // });

    // let cartProducts = products.filter((product) => cartItemIds.includes(product.id));
    
    return (
        <div>
            <h1>Cart</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {cart.map((item) => {
                    return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                    )
                    })}
                </tbody>
                

            </table>
        </div>
    )
}

export default Cart;
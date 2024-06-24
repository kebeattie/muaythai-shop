import React from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../api/cart";

const Cart = ({session, cart}) => {

    console.log(cart);
    
    return (
        <div>
            <h1>Cart</h1>
            <p><Link to="/">click</Link></p>
        </div>
    )
}

export default Cart;
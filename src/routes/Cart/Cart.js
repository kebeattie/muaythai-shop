import React from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../api/cart";

const Cart = ({session}) => {
    const email = session.passport.user;
    getCart(email);
    return (
        <div>
            <h1>Cart</h1>
            <p><Link to="/">click</Link></p>
        </div>
    )
}

export default Cart;
import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmed = () => {
    return (
        <>
            <h1>Order Confirmed!</h1>
            <Link to="/orders">View your orders</Link>
            <br></br>
            <Link to="/">Continue shopping</Link>
        </>
    )
}

export default OrderConfirmed;
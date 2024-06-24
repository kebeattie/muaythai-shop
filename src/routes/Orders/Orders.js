import React from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../api/order";

const Orders = ({session}) => {

    const retrieveAllOrders = async () =>{
        const orders = await getOrders(session.passport.user);
        console.log(orders);
    }

    retrieveAllOrders();

    
    return (
        <div>
            <h1>Orders</h1>
            <p><Link to="/">click</Link></p>
        </div>
    )
}

export default Orders;
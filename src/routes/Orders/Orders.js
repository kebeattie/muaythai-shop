import React, { useState } from "react";
import { getOrders } from "../../api/order";
import { useEffect } from "react";
import './Orders.css';

const Orders = ({session}) => {

    const [allOrders, setAllOrders] = useState([]);

    const retrieveAllOrders = async () =>{
        const orders = await getOrders(session.passport.user);
        setAllOrders(await orders);
    }
    

    useEffect(() => {
        retrieveAllOrders();
    },[])

    
    console.log(allOrders);



    
    return (
        <div className="orders-container">
            <h1>Orders</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((element) => {
                        
                        return (
                            <tr>
                                <td>{element.id}</td>
                                <td>{element.total}</td>
                                <td>{element.status}</td>
                            </tr>

                        )

                    })}
                </tbody>


            </table>
        </div>
    )
}

export default Orders;
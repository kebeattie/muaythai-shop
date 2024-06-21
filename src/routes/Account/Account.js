import React from "react";
import { Link } from "react-router-dom";
import Logout from "../../components/Logout/Logout";

const Account = ({ session, createSession }) => {
    return (
        <div>
            <h1>Welcome, {session.passport.user}</h1>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/orders">Orders</Link></p>
            <p><Link to="/checkout">Checkout</Link></p>
            <Logout createSession={createSession} />
            
            
        </div>
    )
}

export default Account;
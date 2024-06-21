import React from "react";
import { Link } from "react-router-dom";

const Account = ({ session }) => {
    return (
        <div>
            <h1>Welcome, {session.passport.user}</h1>
            <p><Link to="/">click</Link></p>
        </div>
    )
}

export default Account;
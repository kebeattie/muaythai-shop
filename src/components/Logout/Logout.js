import React from "react";
import { Link } from "react-router-dom";
import logout from "../../api/logout";



const Logout = ( {createSession} ) => {

    const logoutAndResetSession = async () => {
        await logout();
        createSession({}, false);
    }
    
    return (
        <div className="container">
            <p><Link to="/" onClick={logoutAndResetSession}>Logout</Link></p>
        </div>
    )
}

export default Logout;
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="container">
            <Link to="/account"><button type="button" className="btn btn-light">Account</button></Link>
        </div>
    )
}


export default Header;
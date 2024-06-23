import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from "../../media/logo-resize.png"
import { useEffect } from "react";

const Header = ( { user }) => {

    // useEffect(() => {

    // }, [user]);

    let buttonText = "Login/Register";

    user ? buttonText = "Account" : buttonText =  "Login/Register";

    return (
        <div className="container header">
            <div className="row align-items-end">
                <div className="col">
                    <Link to="/"><img className="logo" src={logo}/></Link>
                </div>
                <div className="col align-self-center">
                    <Link to="/account" className="account-link float-end">{buttonText}</Link>
                </div>
                <div className="col-1"></div>
                
            </div>
        </div>
    )
}


export default Header;
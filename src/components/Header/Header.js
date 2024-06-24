import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from "../../media/logo-resize.png"
import Cart from "../Cart/Cart";
import { useEffect } from "react";

const Header = ( { user, cartTotal }) => {

    useEffect(()=>{

    },[cartTotal]);

    let buttonText = "Login/Register";

    user ? buttonText = "Account" : buttonText =  "Login/Register";

    return (
        <div className="container header">
            <div className="row align-items-end">
                <div className="col-6">
                    <Link to="/"><img className="logo" src={logo}/></Link>
                </div>
                <div className="col-4 align-self-center">
                    
                    <Link to="/account" className="account-link float-end">{buttonText}</Link>
                    
                </div>
                
               {user?<div className="col-2 align-self-center"><Link to="/cart"><Cart /><p className="total">£{cartTotal}</p></Link></div> : <div className="col-1"></div>} 
                
            </div>
        </div>
    )
}


export default Header;
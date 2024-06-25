import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from "../../media/logo-resize.png"
import Cart from "../Cart/Cart";
import { useEffect } from "react";

const Header = ( { user, cartTotal }) => {

    useEffect(()=>{

    },[cartTotal, user]);

    let buttonText = "";
    let colWidth = "";

    user ? buttonText = "Account" : buttonText =  "Login/Register";
    user? colWidth = "col-4 align-self-center auth-link": colWidth ="col-5 align-self-center auth-link";

    return (
        <div className="container-fluid header">
            <div className="row align-items-end">
                <div className="col-6">
                    <Link to="/"><img className="logo" src={logo}/></Link>
                </div>
                <div className={colWidth}>
                    
                    <Link to="/account" className="account-link float-end">{buttonText}</Link>
                    
                </div>
                
               {user?<div className="col-1 align-self-center"><Link to="/cart"><Cart /><p className="total">£{cartTotal}</p></Link></div> : <div></div>} 
                
            </div>
        </div>
    )
}


export default Header;
import React from "react";

const Product = ({ name, price, image}) => {
    console.log("here");
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>{name}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img src={image} alt="test"/>
                </div>
            </div>
            <div className="row">
                <div className="col"><p>£{price}</p></div>
            </div>
            
        </div>
    )
}

export default Product;
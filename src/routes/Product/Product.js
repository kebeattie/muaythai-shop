import React from "react";
import './Product.css'
import { Link } from "react-router-dom";

const Product = ({ name, price, image, id}) => {


    return (
        <div className="card">
            <div className="card-body">
                <img className="product-image card-img" src={image} />
                <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
                <hr></hr>
                <h5 className="card-title">£{price}</h5>
                <Link to={`/${id}`}><button type="button" className="btn btn-secondary">See more</button></Link>  
            </div>
</div>
    )
}

export default Product;
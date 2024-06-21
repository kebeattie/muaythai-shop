import React from "react";
import './Product.css'
import { Link } from "react-router-dom";

const Product = ({ name, price, image, id }) => {


    return (
        <Link to={`/${id}` } style={{ textDecoration: 'none' }}>
            <div className="card-product shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <img className="product-image card-img" src={image} />
                    <h6 className="card-subtitle mb-2 text-muted product-name">{name}</h6>
                    <hr></hr>
                    <h5 className="card-title price">£{price}</h5>
                    <button type="button" className="btn btn-secondary card-button">Details</button>
                </div>
            </div>
        </Link>
    )
}

export default Product;
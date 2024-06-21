import React from "react";
import './Product.css'
const ProductDetails = ( { products} ) => {
    const pathName = window.location.pathname;
    const id = pathName.replace('/', '');

    let product = [];

    products.forEach(element => {
        if (element.id == id) {
            product = element;
        }
    });

   

    console.log(product);
    return (
        <div className="flex-container">
            <h1 className="col-sm">{product.name}</h1>
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <img className="product-image card-img" src={product.image} />
                    <hr></hr>
                    <p className="description">{product.description}</p>
                    <h5 className="card-title">£{product.price}</h5>
                    <button type="button" className="card-button btn btn-secondary">Add to cart</button>
                </div>
            </div>
        </div>
        
    )
}

export default ProductDetails;
import React from "react";

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
        <>
            <h1> product</h1>
        </>
    )
}

export default ProductDetails;
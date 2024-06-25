import React from "react";
import './Product.css'
import { addToCart } from "../../api/cart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductDetails = ({ products, session, loadCart, calcCartTotal }) => {

    const pathName = window.location.pathname;
    const id = pathName.replace('/', '');
    let product = [];
    const navigate = useNavigate();

    const[quantity, setQuantity] = useState (1);

    products.forEach(element => {
        if (element.id == id) {
            product = element;
        }
    });



    const addToCartHandler = async (id, user) => {
        if (JSON.stringify(session) == "{}") {
            navigate("/login");
        }
        else {
            await addToCart(id, user.passport.user, quantity);
            await loadCart(user.passport.user);
            await calcCartTotal(loadCart(user.passport.user));
        }
    }

    const getQuantity = (event) => {
        setQuantity(event.target.value);
    }


    return (
        <div className="flex-container product-details">
            <h1 className="col-sm title">{product.name}</h1>
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <img className="product-image card-img" src={product.image} />
                    <hr></hr>
                    <p className="description">{product.description}</p>
                    <h5 className="card-title">£{product.price}</h5>
                    <button type="button" className="card-button btn btn-secondary" onClick={() => addToCartHandler(product.id, session)}>Add to cart</button>
                    <br></br>
                    <label htmlFor="quantity">Quantity:</label>
                        <select name="quantity" id="quantity" onChange={getQuantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        </select>
                </div>
            </div>
        </div>

    )


}

export default ProductDetails;
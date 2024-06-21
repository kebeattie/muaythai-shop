import React from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../../components/Header/Header";

const Home = ({ products }) => {
    console.log(products);
    let test = [1, 2, 3];

    return (
        <div className="container">
            <h1 className="col-sm">MuayThai shop</h1>
            <p className="col-sm"><Link to="/registration">click</Link></p>
            
            {products.map((product) => {
               return <Product
                key={product.key}
                name={product.name}
                image={product.image}
                price={product.price}
                />
            })}


        </div>
    )
}

export default Home;
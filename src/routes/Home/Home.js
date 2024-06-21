import React from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../../components/Header/Header";

const Home = ({ products }) => {
    console.log(products);

    return (
        <div className="container">
            <h1 className="col-sm">MuayThai shop</h1>
            <p className="col-sm"><Link to="/registration">click</Link></p>
            <div className="flex-container">


                {products.map((product) => {
                    return <Product
                        key={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                    />
                })}


            </div>

        </div>
    )
}

export default Home;
import React from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../../components/Header/Header";
import '../Product/Product.css';
import { useState, useEffect } from "react";

const Home = ({ products }) => {


    const [displayedProducts, setDisplayedProducts] = useState([]);

    useEffect(() => {

        setDisplayedProducts(products);

    }, [products]);
    

    //Filter which products are displayed
    const productsFilter = (filterBy) => {
        setDisplayedProducts(products.filter((product) => product.category === filterBy));
        console.log(displayedProducts);

    };
    
    //Reset displayed products to default
    const showAllProducts = () => {
        setDisplayedProducts(products);
    }
   
    

    

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand">Products</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" onClick={showAllProducts}>All</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> productsFilter("Training")}>Training Gear</a>
                        </li>
                        <li class="nav-item" >
                            <a class="nav-link" onClick={() => productsFilter("Shorts")}>Muay Thai Shorts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={() => productsFilter("Gloves")}>Boxing Gloves</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="flex-container">


                    {displayedProducts.map((product) => {
                        return <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    })}


                </div>

            </div>
        </>
    )
}

export default Home;
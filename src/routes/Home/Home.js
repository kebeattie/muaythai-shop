import React from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../../components/Header/Header";
import '../Product/Product.css';
import { useState, useEffect } from "react";
import './Home.css';
import { click } from "@testing-library/user-event/dist/click";

const Home = ({ products}) => {


    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setDisplayedProducts(products);

    }, [products]);


    //Filter which products are displayed
    const productsFilter = (filterBy) => {
        setDisplayedProducts(products.filter((product) => product.category === filterBy));
    };

    //Filter products by search
    const productsFilterBySearch = (search) => {
        setDisplayedProducts(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
    }

    //Reset displayed products to default
    const showAllProducts = () => {
        setDisplayedProducts(products);
    }

    //Track search input
    const updateSearch = (event) => {
        let value = event.target.value;
        setSearch(value);
        if (search.length === 1) showAllProducts();
        else {
            productsFilterBySearch(search);
        };

    };


    //Mobile Nav button

    let toggle = false;
    const clickHandler = () => {
        let element = document.getElementById("navbarNav");
            toggle = !toggle

            if(!toggle) element.style.display = "none";
            else element.style.display = "inline";
            
            
            
            
}
        
    


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <button className="navbar-toggler" onClick={clickHandler} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse nav" id="navbarNav">
                    <div className="navbar-flex">
                        <div className="item-flex">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={showAllProducts}>All</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => productsFilter("Training")}>Training Gear</a>
                                </li>
                                <li className="nav-item" >
                                    <a className="nav-link" onClick={() => productsFilter("Shorts")}>Muay Thai Shorts</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => productsFilter("Gloves")}>Boxing Gloves</a>
                                </li>
                            </ul>
                        </div>

                        <div className="search-flex">
                            <input className="mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={updateSearch} onReset={updateSearch}></input>
                        </div>
                    </div>

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
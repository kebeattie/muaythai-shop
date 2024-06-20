import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <h1 className="col-sm">MuayThai shop</h1>
            <p className="col-sm"><Link to="/registration">click</Link></p>
        </div>
    )
}

export default Home;
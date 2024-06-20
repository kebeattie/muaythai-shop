import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>MuayThai shop</h1>
            <p><Link to="/registration">click</Link></p>
        </div>
    )
}

export default Home;
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/Login";

const Login = ({ createSession }) => {

    return (
        <div>
            <h1>Login</h1>
            <LoginForm createSession={createSession}/>
            <p><Link to="/">click</Link></p>
        </div>
    )
}

export default Login;
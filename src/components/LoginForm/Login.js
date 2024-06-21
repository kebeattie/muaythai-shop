import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState} from "react";
import login from "../../api/login";


const LoginForm = ({ createSession }) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const readEmail = (event) =>{
        const input = event.target.value;
        setEmail(input);

    }

    const readPassword = (event) =>{
        const input = event.target.value;
        setPassword(input); 
    }

    const loginHandler = async (event) => {
         event.preventDefault();
         const results = await login(email, password);
         if (!results.data) {
            setIsError(true);
            setIsSuccessful(false);
         } else {
            createSession(results.data);
            setIsError(false); 
            setIsSuccessful(true);
    }
}




    if (isSuccessful) {
        return(
            <Navigate to="/Account" replace />
        )
    } else {
        return (
        
            <div className="container">
                {isError? <p className="text-danger">Account with these credentials not found</p>: <></>}
                <div className="row">
                    <div className="col-md">
                        <form onSubmit={loginHandler}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required onChange={readEmail}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required onChange={readPassword}/>
                            </div>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                    <div className="col-sm">
                        <h2>Don't have an account?</h2>
                        <Link to="/registration"><button type="button" className="btn btn-light">Register Here</button></Link>
                    
                    </div>
                </div>
            </div>
        )
    
    }
    
}


export default LoginForm;
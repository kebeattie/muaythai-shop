import React from "react";
import { Link, Navigate } from "react-router-dom";
import register from "../../api/register";
import { useState} from "react";



const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isError, setIsError] = useState(false);

    const readPassword = (event) =>{
        const input = event.target.value;
        setPassword(input);
        
    };

    const readEmail = (event) =>{
        const input = event.target.value;
        setEmail(input);
        
    };
    const readFirstName = (event) =>{
        const input = event.target.value;
        setFirstName(input);
        
    };
    const readLastName = (event) =>{
        const input = event.target.value;
        setLastName(input);
        
    };

    const registerHandler = async (event) => {
        event.preventDefault();
        let response = await register(firstName, lastName, email, password);
        
        console.log(response);
        
        if(response === `${email} is already registered!`) {
            setIsError(true);
            setIsSuccessful(false);
        }
        else {
            setIsError(false);
            setIsSuccessful(true);
            
        }
    };

    


   if (isSuccessful) {
    return (
        <Navigate to="/" replace />
    )
   } else {
    return (
        <div className="container">
            {isError? <p className="text-danger">Account with that email already exists</p>: <></>}
            <div className="row">
                <div className="col-md">
                    <form onSubmit={registerHandler}>
                        <div className="form-group">
                            <label htmlFor="exampleInputFirstName">First Name</label>
                            <input type="text" className="form-control" id="exampleInputFirstName" aria-describedby="firstNameHelp" placeholder="Enter first name" required onChange={readFirstName}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputlastName">Last Name</label>
                            <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="lastNameHelp" placeholder="Enter last name" required onChange={readLastName}/>
                        </div>
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
                    <h2>Already registered?</h2>
                    <Link to="/login"><button type="button" className="btn btn-light">Login Here</button></Link>
                
                </div>
            </div>
        </div>
    )
   };

    
};

export default Registration;
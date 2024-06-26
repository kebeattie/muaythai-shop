import axios from "axios";

//API call to create a new user in database

const register = async (firstname, lastname, email, password) => {
    
    let results = await axios.post(`${process.env.REACT_APP_URL}/registration`, {
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname 
    })

    return(results.data);
   
}

export default register; 

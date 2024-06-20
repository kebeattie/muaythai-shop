import axios from "axios";

//API call to create a new user in database

const register = async (firstname, lastname, email, password) => {
    
    let results = await axios.post("http://localhost:4001/registration", {
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname 
    })

    console.log(results.data);
   
}

export default register; 

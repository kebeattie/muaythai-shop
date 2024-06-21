import axios from "axios";

//API call to login

const login = async (email, password) => {

    try{
        let results = await axios.post("http://localhost:4001/login", {
            password: password,
            email: email
        });
    
        return results;
    } catch(error) {
        return error;
    }
    
}

export default login;
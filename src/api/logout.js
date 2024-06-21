import axios from "axios";

//API call to log user out and end session

const logout = async () => {
    await axios.post(`${process.env.REACT_APP_URL}/logout`);

}

export default logout;
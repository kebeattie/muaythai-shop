import axios from "axios";

//API call to log user out and end session

const logout = async () => {
    await axios.post("http://localhost:4001/logout");
    console.log("logging out");
}

export default logout;
import axios from "axios";

export const addToCart = async (id, email, quantity) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/cart/addToCart/${id}`, {
            email: email,
            quantity: quantity
        })
        const results = await response.json();
        return results;

    } catch(error) {
        return error;
    }
}
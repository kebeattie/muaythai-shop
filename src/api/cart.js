import axios from "axios";

//add an item to cart
export const addToCart = async (id, email, quantity) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/cart/addToCart/${id}`, {
            email: email,
            quantity: quantity
        });
        const results = await response.json();
        return results;

    } catch(error) {
        return error;
    }
}

//get cart details
export const getCart = async (email) => {
    try {
        const results = await axios.get(`${process.env.REACT_APP_URL}/cart/${email}`);
        return results.data;

    } catch(error) {
        return error;
    }
}

//remove item from cart

export const removeFromCart = async (id) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/cart//deleteFromCart/${id}`)
        const results = await response.json();
        return results;
        
    } catch(error) {
        return error
    }
}
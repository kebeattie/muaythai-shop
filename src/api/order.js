import axios from "axios";

//Create an order from whatever items are in user's cart

export const createOrder = async (email) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/cart/checkout`,{
            email: email
        });

        const results = response.json();
        return results;

    } catch(error) {
        return error;
    }
}

//Get order

export const getOrders = async(email) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/orders/${email}`)
        return response.data;
    } catch (error) {
        return error;
    }
}
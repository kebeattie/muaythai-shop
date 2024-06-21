import axios, { Axios } from "axios";

//Api call to get all products

const getProducts = async () => {
   let results = await axios.get(`${process.env.REACT_APP_URL}/products`);
   return results.data;
   
}

export default getProducts;
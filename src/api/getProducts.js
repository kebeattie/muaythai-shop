import axios, { Axios } from "axios";

//Api call to get all products

const getProducts = async () => {
   let results = await axios.get("http://localhost:4001/products");
   return results.data;
   
}

export default getProducts;
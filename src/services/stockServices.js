import axios from 'axios';

const getAllItems = async () =>{
    try {
        const {data} = await axios.get(`${process.env.VUE_APP_DB_URL}/grocery`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

const getPaginatedItems = async (page = 1, limit = 20, filters) =>{
    try {
        const {data} = await axios.get(`${process.env.VUE_APP_DB_URL}/grocery?_page=${page}&_limit=${limit}&${filters}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const toggleLike = async (product) =>{
    try {
        const {status} = await axios.put(`${process.env.VUE_APP_DB_URL}/grocery/${product.id}`, product);
        return status;
    } catch (error) {
        console.log(error)
    }
}

export default {
    getAllItems,
    getPaginatedItems,
    toggleLike,
}

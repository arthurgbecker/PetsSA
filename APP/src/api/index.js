import axios from 'axios';

const api = axios.create({
    baseURL: "http://10.3.62.84:3000"
})

export default api

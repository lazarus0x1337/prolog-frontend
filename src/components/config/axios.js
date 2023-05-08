import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const instance = axios.create({
    baseURL,
})

instance.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`

console.log({ instance })
export default instance;
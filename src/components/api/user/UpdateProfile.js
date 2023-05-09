import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export function UpdateProfile(token, data, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    axios.put(
        `${API_URL}/user/${id}`,
        data,
        config
    ).catch((reason)=> {
        console.log(reason)
    });

}
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export async function GetFacturesById(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.get(`${API_URL}/factureColis/${id}`, config)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(reason => {
            console.log(reason);
        });
}
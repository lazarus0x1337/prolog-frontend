import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export async function GetPointsRelais(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios
        .get(`${API_URL}/pointRelais`, config)
        .then(response => {
                return response.data;
            }
        )
        .catch(error => console.error(error));
}
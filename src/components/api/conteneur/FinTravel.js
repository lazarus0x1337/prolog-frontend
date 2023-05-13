import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export async function FinTravel(token, conteneurId) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
        "fin":true
    }
    await axios
        .put(`${API_URL}/conteneur/${conteneurId}`, data, config)
        .catch(error => console.error(error));
}
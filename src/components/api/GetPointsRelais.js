import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export async function GetPointsRelais(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    axios
        .get(`${API_URL}/pointRelais`, config)
        .then(() => navigate('/home'))
        .catch(error => console.error(error));
}
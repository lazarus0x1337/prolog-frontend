import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export async function GetFactureByTrackingNumber(token, tracking) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios
        .get(`${API_URL}/factureColis/trackingNumber/${tracking}`, config)
        .then(response => {
            const fact = response.data;
            return fact;
        })
        .catch(error => console.error(error));
}
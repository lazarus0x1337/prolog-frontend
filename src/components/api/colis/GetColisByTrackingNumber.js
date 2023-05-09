import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export async function GetColisByTrackingNumber(token, tracking, set) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    await axios
        .get(`${API_URL}/colis/trackingNumber/${tracking}`, config)
        .then(response => {
            const col = response.data;
            set(col);
        })
        .catch(error => console.error(error));
}
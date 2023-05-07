import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export function GetTrajetByTracking(token,tracking) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios
        .get(`${API_URL}/tracking/${tracking}`, config)
        .then((response) => {
            if(response.status===200) {
                const tr = response.data;
                return tr;
            } else {
                console.log("3ian");

            }
        })
        .catch(error => {
            console.log("3ian");
        });
}
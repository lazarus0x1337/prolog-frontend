import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export async function GetTrajetByTracking(token,tracking) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios
        .get(`${API_URL}/tracking/${tracking}`, config)
        .then((response) => {
            if(response.status===200) {
                return response.data;
            } else {
                console.log({config});
            }
        })
        .catch(error => {
            console.log({config});
        });
}
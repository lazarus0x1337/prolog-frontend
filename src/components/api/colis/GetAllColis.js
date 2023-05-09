import axios from "axios";


const API_URL = 'http://localhost:8080/api/v1';

export function GetAllColis(token) {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    return axios.get(`${API_URL}/colis`,config)
        .then(response => {
            if (response.status === 200)
                return response.data;
            else console.log("ereur "+response.status);
        })
        .catch(reason => console.log({reason}));
}
import axios from "axios";


const API_URL = 'http://localhost:8080/api/v1';

export function GetAllUsers(token, role) {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    return axios.get(`${API_URL}/user`,config)
        .then(response => {
            if (response.status === 200)
                return response.data.filter(user => user.role === role);
            else console.log("ereur "+response.status);
        })
        .catch(reason => console.log({reason}));
}
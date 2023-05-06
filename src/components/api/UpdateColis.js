import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export async function UpdateColis(token, idColis, val,check) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const data0 = {
        "recup":check
    }
    const data1 = {
        "delivered":check
    }
    let data= {};
    switch(val) {
        case 'recup':
            data = data0;
            break;
        case 'delivered':
            data = data1;
            break;
        default:
            data = '';
    }

    await axios
        .put(`${API_URL}/colis/${idColis}`, data, config)
        .catch(error => console.error(error));
}
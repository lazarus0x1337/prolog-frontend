import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export function getConteneursById(token, id, setConteneur) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`${API_URL}/conteneur/${id}`, config)
        .then(response => {
            if (response.status === 200) {
                const cont = response.data;
                setConteneur(cont);
            }
        })
        .catch(reason => {
            console.log(reason);
        });
}
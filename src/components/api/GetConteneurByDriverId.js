import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export function getConteneursByDriverId(token, driverId, setConteneurs) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`${API_URL}/conteneur`, config)
        .then(response => {
            if (response.status === 200) {
                const cont = response.data.filter(conteneur => conteneur.driver.id == driverId);
                setConteneurs(cont);
            }
        })
        .catch(reason => {
            console.log(reason);
        });
}


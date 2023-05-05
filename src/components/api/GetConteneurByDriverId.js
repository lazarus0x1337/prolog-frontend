import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export function GetConteneursByDriverId(token, driverId) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/conteneur`, config)
            .then(response => {
                if (response.status === 200) {
                    const cont = response.data.filter(conteneur => conteneur.driver.id == driverId);
                    resolve(cont);
                }
            })
            .catch(reason => {
                console.log(reason);
                reject(reason);
            });
    });
}
import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export function UpdateTracking(token, pointRelais, colis) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    colis.map((item, i) => {
        const time = new Date();
        const data = {
            "pointsDeRelais": [{ "id": pointRelais.id }],
            "dateChemin": [time.toISOString()]
        };
        axios.put(
            `${API_URL}/tracking/${item.trackingNumber.trackingNumber}`,
            data,
            config
        ).then(response =>{
            console.log(response);
        }).catch((reason)=> {
            console.log(reason)
        });
    });
}
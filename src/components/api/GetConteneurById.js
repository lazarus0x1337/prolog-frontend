import axios from 'axios';
import {GetFacturesById} from "./GetFacturesById";

const API_URL = 'http://localhost:8080/api/v1';

// export function GetConteneursById(token, id, setConteneur) {
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
//
//     axios.get(`${API_URL}/conteneur/${id}`, config)
//         .then(response => {
//             if (response.status === 200) {
//                 const cont = response.data;
//                 setConteneur(cont);
//             }
//         })
//         .catch(reason => {
//             console.log(reason);
//         });
// }

export async function GetConteneurById(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axios.get(`${API_URL}/conteneur/${id}`, config);
        if (response.status === 200) {
            const cont = response.data;
            for (const colis of cont.colis) {
                const facture = await GetFacturesById(token, colis.id);
                if (facture) {
                    colis.prix = facture.prix;
                    colis.client = facture.client;
                }
            }
            return cont;
        }
    } catch (error) {
        console.log(error);
    }
}
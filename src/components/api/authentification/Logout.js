import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1';

export function Logout(token, navigate) {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    axios
        .post(`${API_URL}/auth/logout`, {}, config)
        .then(() => navigate('/home'))
        .catch(error => console.error(error));
}
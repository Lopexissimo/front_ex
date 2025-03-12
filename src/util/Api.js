import axios from 'axios';

const Api = {
    basicUrl: 'http://kg00w4owgo0o8okwgk4w4g40.185.229.236.238.sslip.io/users',

    async getUsers() {
        try {
            const response = await axios.get(this.basicUrl, {
                params: { page: 1, pagesize: 3 }
            });
            return response.data.results;

        } catch (err) {
            console.error("Errore API:", err);
            return null;
        }
    },

    async getUsersById(id) {
        try {
            const response = await axios.get(`${this.basicUrl}/${id}`);
            return response.data.results;
        } catch (err) {
            console.error(`Errore caricamento user con ID: ${id}`, err);
            return null;
        }
    },
    async addUser(user) {
        try {
            const response = await axios.post(this.basicUrl, user)
            return response.data
        } catch (err) {
            console.error(`Errore creazione user con ID: ${user.id}`, err);
            return null;
        }
    },

    async editUser(id, editedUser) {
        try {
            const response = await axios.put(`${this.basicUrl}/${id}`, editedUser)
            return response.data;
        } catch (err) {
            console.error(`Errore modifica user con ID: ${id}`, err);
            return null;
        }
    },

    async deleteUser(id) {
        try {
            const response = await axios.delete(`${this.basicUrl}/${id}`)
            return true;
        } catch (err) {
            console.error(`Errore eliminazione user con ID: ${id}`, err);
            return false;
        }
    }
};

export default Api;

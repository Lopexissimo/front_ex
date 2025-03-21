import axios from 'axios';

const Api = {
    basicUrl: 'http://kg00w4owgo0o8okwgk4w4g40.185.229.236.238.sslip.io/users',

    async getUsers(pag) {
        try {
            const response = await axios.get(this.basicUrl, {
                params: { page: pag, pagesize: 100 }
            });
            return response.data;

        } catch (err) {
            console.error("Errore API:", err);
            return false;
        }
    },

    async getUsersById(id) {
        try {
            const response = await axios.get(`${this.basicUrl}/${id}`);
            return response.data.results;
        } catch (err) {
            console.error(`Errore caricamento user con ID: ${id}`, err);
            return false;
        }
    },

    async addUser(user) {
        try {
            const response = await axios.post(this.basicUrl, user)
            return response;
        } catch (err) {
            console.error(`Errore creazione user con ID: ${user.id}`, err);
            return false;
        }
    },

    async editUser(id, editedUser) {
        try {
            await axios.put(`${this.basicUrl}/${id}`, editedUser)
            return true;
        } catch (err) {
            console.error(`Errore modifica user con ID: ${id}`, err);
            return false;
        }
    },

    async deleteUser(id) {
        try {
            await axios.delete(`${this.basicUrl}/${id}`)
            return true;
        } catch (err) {
            console.error(`Errore eliminazione user con ID: ${id}`, err);
            return false;
        }
    }
};

export default Api;

import axios from 'axios'

const Api={
    getUsers(){
        const url='http://kg00w4owgo0o8okwgk4w4g40.185.229.236.238.sslip.io/users'
        const params = {
            page:1,
            pagesize:10
        }
        axios.get(url, {params})
        .then( response => {
            return response;
        }).catch(err => {
            alert(err);
        })
    }

}

export default Api;
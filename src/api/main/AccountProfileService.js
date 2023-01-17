import axios from 'axios'
import {API_URL} from '../../Constants'

class AccountProfileService {

    retrieveInfo(name) {
        return axios.get(`${API_URL}/user/${name}`);
    }

    getCurrentUser() {
        return axios.get(`${API_URL}/user`);
    }

    getImageForUser(username) {
        return axios.get(`${API_URL}/image/profileImage/${username}`);
    }

    getBackgroundForUser(username) {
        return axios.get(`${API_URL}/image/bgImage/${username}`);
    }

    updateDetails(firstname, lastname, bio) {
        return axios.post(`${API_URL}/user/update`, {
            firstname,
            lastname,
            bio
        })
    }

    uploadAvatar(file) {
        const formData = new FormData();
        formData.set("file", file);
        return axios.post(`${API_URL}/image/upload`, formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            });
    }


    uploadBackground(file) {
        const formData = new FormData();
        formData.set("file", file);
        return axios.post(`${API_URL}/image/bgUpload`, formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            });
    }

    getAllUser() {
        return axios.get(`${API_URL}/user/all`);
    }
}

export default new AccountProfileService()
import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

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

    retrieveDetails(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/profile/details`);
    }

    retrieveAllInfo() {
        return axios.get(`${JPA_API_URL}/users/all/profile`);
    }

    deleteInfo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/profile/${id}`);
    }

    updateInfo(name, id, profile) {
        return axios.put(`${JPA_API_URL}/users/${name}/profile/${id}`, profile);
    }

    updateDetails(firstname, lastname, bio) {
        return axios.post(`${API_URL}/user/update`, {
            firstname,
            lastname,
            bio
        })
    }


    createInfo(name, profile) {
        return axios.post(`${JPA_API_URL}/users/${name}/profile/`, profile);
    }


    uploadAvatar(file) {
        const formData = new FormData();
        formData.set("file", file);
        return axios.post(`${API_URL}/image/upload`,formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            },
        });
    }

    
    uploadBackground(file) {
        const formData = new FormData();
        formData.set("file", file);
        return axios.post(`${API_URL}/image/bgUpload`,formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            });
    }


    getAvatarLink(username){
        return axios.get(`${JPA_API_URL}/users/${username}/profile/avatar`);
    }

    getBackgroundLink(username){
        return axios.get(`${JPA_API_URL}/users/${username}/profile/background`);
    }
    getAllUser() {
        return axios.get(`${API_URL}/user/all`);
    }

}

export default new AccountProfileService()
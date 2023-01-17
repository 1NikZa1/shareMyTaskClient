import axios from 'axios'
import {API_URL} from '../../Constants'

class PostDataService {

    retrieveAllPosts(username) {
        return axios.get(`${API_URL}/post/user/${username}/posts`);
    }

    retrieveAll() {
        return axios.get(`${API_URL}/post/all`);
    }

    deletePost(postId) {
        return axios.post(`${API_URL}/post/${postId}/delete`);
    }

    deleteComment(commentId) {
        return axios.post(`${API_URL}/comment/${commentId}/delete`);
    }

    createPost(post) {
        return axios.post(`${API_URL}/post/create`, post);
    }

    postComment(postId, comment) {
        return axios.post(`${API_URL}/comment/${postId}/create`, comment);
    }
}

export default new PostDataService()
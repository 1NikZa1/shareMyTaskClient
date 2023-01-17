import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class PostDataService {

    retrieveAllPosts(username) {
        return axios.get(`${API_URL}/post/user/${username}/posts`);
    }

    retrieveAll() {
        return axios.get(`${API_URL}/post/all`);
    }

    retrievePost(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/posts/${id}`);
    }

    deletePost(postId) {
        return axios.post(`${API_URL}/post/${postId}/delete`);
    }

    deleteComment(commentId) {
        return axios.post(`${API_URL}/comment/${commentId}/delete`);
    }

    updatePost(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/posts/${id}`, todo);
    }

    createPost(post) {
        return axios.post(`${API_URL}/post/create`, post);
    }

    retrievePostComments(id) {
        return axios.get(`${API_URL}/comment/${id}/all`);
    }

    postComment(postId, comment) {
        return axios.post(`${API_URL}/comment/${postId}/create`, comment);
    }

}

export default new PostDataService()
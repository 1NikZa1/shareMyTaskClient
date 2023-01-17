import axios from 'axios'
import {API_URL} from '../../Constants'

export const TOKEN_KEY = 'auth-token'
export const USER_KEY = 'auth-user'

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/auth/signin`, {
            username,
            password
        })
    }

    registerNewAccount(email, username, firstname, lastname, password, confirmPassword) {
        return axios.post(`${API_URL}/auth/signup`, {
            email,
            username,
            firstname,
            lastname,
            password,
            confirmPassword
        })
    }

    saveToken(token) {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.setItem(TOKEN_KEY, token)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    saveUser(user) {
        sessionStorage.removeItem(USER_KEY);
        sessionStorage.setItem(USER_KEY, user)
    }

    logout() {
        sessionStorage.clear();
        window.location.reload();
    }

    createJWTToken(token) {
        sessionStorage.setItem("USER_TOKEN", token);
        return token
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_KEY)
        return user != null;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()
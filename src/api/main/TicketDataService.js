import axios from 'axios'
import {API_URL} from '../../Constants'

class TicketDataService {
    retrieveAllTickets() {
        return axios.get(`${API_URL}/ticket/all`);
    }
}

export default new TicketDataService()
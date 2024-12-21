import HttpClient from '../utils/HttpClient'

class UserService {
    static async register(data) {
       return await HttpClient.post('/auth/register', data).then((response) => response.data.data)
    }

    static async login(data) {
        return await HttpClient.post('/auth/login', data).then((response) => response.data.data)
    }

    static async me() {
        return await HttpClient.get('/auth/me').then((response) => response.data.data)
    }
}

export default UserService

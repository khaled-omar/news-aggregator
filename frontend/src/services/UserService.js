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

    static async updateProfile(data) {
        return await HttpClient.put('/auth/user/profile', data).then((response) => response.data);
    }

    static async updatePreferences(data) {
        return await HttpClient.put('/auth/user/preferences', data).then((response) => response.data);
    }
}

export default UserService

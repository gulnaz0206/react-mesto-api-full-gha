export default class AuthApi {
    constructor(baseUrl) {
        this._url = baseUrl;
    }

    _addResult(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    signIn = (email, password) => {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._addResult(res))
    }

    signUp = (email, password) => {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._addResult(res))
    }

    checkUser = (token) => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then((res) => this._addResult(res))
    }
}

const BASE_URL = 'https://auth.nomoreparties.co';

export const authApi = new AuthApi(BASE_URL);
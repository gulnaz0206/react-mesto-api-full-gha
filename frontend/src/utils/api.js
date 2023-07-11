import { baseUrl, token } from "./utils";

export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _addResult(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getInitialCards = () => {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => this._addResult(res))
    };

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        }).then((res) => this._addResult(res))
    };

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._addResult(res))
    };

    changeLikeCardStatus(id, condition) {
        if (condition) {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers,
            }).then((res) => this._addResult(res))
        } else {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            }).then((res) => this._addResult(res))
        }
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => this._addResult(res))
    };

    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        }).then((res) => this._addResult(res))
    };

    editUserAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then((res) => this._addResult(res))
    }
};

export const api = new Api({
    baseUrl: baseUrl,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }

}); 
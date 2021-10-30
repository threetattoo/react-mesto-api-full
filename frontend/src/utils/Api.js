class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    changeUserInfo(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(response => this._checkApiRequest(response));
    }

    addNewCard(data, token) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(response => this._checkApiRequest(response));
    }

    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    likeCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    dislikeCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    changeUserAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    avatar: data.avatar
                })
            })
            .then(response => this._checkApiRequest(response));
    }

    _checkApiRequest(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка запроса: ${response.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://api.threetattoo-mesto.nomoredomains.rocks',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;
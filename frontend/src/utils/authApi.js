class authApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    signup(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(response => this._checkApiRequest(response));
    }
    
    signin(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(response => this._checkApiRequest(response));
    }
    
    getUserData(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            }
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

const authapi = new authApi({
    baseUrl: 'https://api.threetattoo-mesto.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
    }
});
  
export default authapi;
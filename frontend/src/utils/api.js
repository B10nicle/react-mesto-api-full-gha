class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(res => this._checkResponse(res));
    }

    setCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(res => this._checkResponse(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(res => this._checkResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(res => this._checkResponse(res));
    }

    setUserInfo(forms) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(forms)
        }).then(res => this._checkResponse(res));
    }

    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(res => this._checkResponse(res));
    }

    setLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        }).then(res => this._checkResponse(res));
    }

    _checkResponse(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`${res.status} ${res.statusText}`);
    }
}

const _token = localStorage.getItem("jwt");
const api = new Api({
    baseUrl: "https://api.b10nicle.nomoredomains.rocks",
    headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${_token}`,
    }
});

export default api;

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загружаем набор карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  //добавление новой карточки
  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse)
  }

  //удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  //добавление лайка
  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse)
  }

  //Удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse)
  }

  //получения данных пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  //отправка данных пользователя
  editUserData(name, about) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({name, about})
    }).then(this._checkResponse)
  }

  //аватар пользователя
  editAvatar(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink.avatar })
    }).then(this._checkResponse)
  }
}

const api = new Api({
  url: 'http://api.egmas.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
})

export default api
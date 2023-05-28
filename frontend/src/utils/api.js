

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkRes(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

_makeRequest(url, options) {
  return fetch(url, options).then(this._checkRes)
}

  getInitCards() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  addAvatar(data) {
    console.log('avatar data:');
    console.log(data);
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  };

  addInfo(data) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  };
  
  //добавляем карточку
  addNewCard(data) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    });
  };

  deleteCard(id) {
    return this._makeRequest(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
  };
/*
  addCardLike(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
  };

  deleteCardLike(data) {
    return this._makeRequest(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
  };
*/
  // объединим функции добавления и удаления лайка (addCardLike, deleteCardLike)
  changeLikeStatus(id, isLiked) {
    if (isLiked) {
      return this._makeRequest(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
          method: "PUT",
      });
    } else {
      return this._makeRequest(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
        method: "DELETE",
      });
    }
  };
}

const api = new Api({
  baseUrl:"https://mesto.nomoreparties.co/v1/cohort-59",
  headers:{authorization: "f12b044f-995b-4f4a-bc14-fbb855775aa8",
  "Content-Type": "application/json"}
});

export default api;

//https://mesto.nomoreparties.co/v1/cohort-59
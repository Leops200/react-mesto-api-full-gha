
// удалил файл auth, а код подправил и добавил сюда
const BASE_AUTH_URL = "https://api.mymesto15front.nomoredomains.monster";
// https://localhost:3002

function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_AUTH_URL}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
}

export function registration({ password, email }) {
  return makeRequest("/signup", "POST", { password, email });
}

export function login({ password, email }) {
  return makeRequest("/signin", "POST", { password, email });
}

export function checkToken() {
  return makeRequest("/users/me", "GET");
}

/*
  _checkRes(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

_makeRequest(url, options) {
  return fetch(url, options).then(this._checkRes)
}
*/

export function getInitCards() {
    return makeRequest("/cards", "GET");
  }

export function getUserInfo() {
    return makeRequest("/users/me", "GET");
  }

  export function addAvatar({ avatar }) {
    console.log('avatar data:');
    console.log({ avatar });
    return makeRequest("/users/me/avatar", "PATCH",
    { avatar });
  };

  export function addInfo({ name, about }) {
    return makeRequest("/users/me", "PATCH", { name, about });
  };
  
  //добавляем карточку
  export function addNewCard({ name, link }) {
    return makeRequest("/cards", "POST", { name, link });
  };

  export function deleteCard(id) {
    return makeRequest(`/cards/${id}`, "DELETE");
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
  export function changeLikeStatus(id, isLiked) {
    let flag;
  isLiked ? (flag = "DELETE") : (flag = "PUT");
  return makeRequest(`/cards/${id}/likes`, flag);
  };

  // Разлогин
export function logout() {
  return makeRequest("/users/me", "DELETE");
}

  /*
}


const api = new Api({
  baseUrl:"https://localhost:3002",
  headers:{authorization: "f12b044f-995b-4f4a-bc14-fbb855775aa8",
  "Content-Type": "application/json"}
});

export default api;
*/

// https://mesto.nomoreparties.co/v1/cohort-59"
// https://api.mymesto15front.nomoredomains.monster/
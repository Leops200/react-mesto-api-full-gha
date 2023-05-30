
const BASE_AUTH_URL = "http://localhost:3001";
// http://localhost:3001
// https://auth.nomoreparties.co
// https://api.mesto.ld-webdev.nomoredomains.monster

function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };
  /* исключаем проверку токена 
  if (token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  */
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

export function logout() {
  return makeRequest("/users/me", "DELETE");
}

export function checkToken() {
  return makeRequest("/users/me", "GET",);
}

export function getUserInfo() {
  return makeRequest(`/users/me`, "GET");
}

export function addInfo({ name, about }) {
  return makeRequest("/users/me", "PATCH", { name, about });
}

export function addAvatar({ avatar }) {
  return makeRequest("/users/me/avatar", "PATCH", { avatar });
}

// ==== cards ==============

export function getInitCards() {
  return makeRequest(`/cards`, "GET");
}

export function addNewCard({ name, link }) {
  return makeRequest("/cards", "POST", { name, link });
}

export function changeLikeStatus(id, isLiked) {
  let method;
  isLiked ? (method = "DELETE") : (method = "PUT");
  return makeRequest(`/cards/${id}/likes`, method);
}

export function deleteCard(id) {
  return makeRequest(`/cards/${id}`, "DELETE");
}


/*
class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

 _checkRes(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

login = (email, password) => {
  console.log("in auth, login: mail");
  console.log(email);
  return fetch(`${this._baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => this._checkRes(response));
};

registration = (email, password) => {
  console.log("in auth, reg: pass");
  console.log(password);
  return fetch(`${this._baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    return this._checkRes(response);

  });
};

checkToken = (jwt) => {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((response) => this._checkRes(response));
};
}

export const auth = new Api({baseUrl: "https://nomoreparties.co"});

*/
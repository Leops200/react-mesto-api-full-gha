
const BASE_AUTH_URL = "https://api.mymesto15front.nomoredomains.monster";
// http://localhost:3001
//https://auth.nomoreparties.co

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

export function checkToken(token) {
  return makeRequest("/users/me", "GET", undefined, token);
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
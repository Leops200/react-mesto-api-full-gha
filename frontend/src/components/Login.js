import React from 'react';
import useForm from '../hooks/useFormsInputs.js';
//import { Link, useNavigate } from 'react-router-dom';
//import * as auth from '../auth';


function Login({ onLogin }) {
  const { values, handleInput } = useForm({});


  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
    console.log("in login === values: ")
    console.log(values);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleInput}
          required
          autoComplete="on"
        />
        <input
          className="login__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleInput}
          required
          autoComplete="off"
        />
        <button className="login__submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
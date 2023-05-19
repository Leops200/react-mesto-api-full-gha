import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useFormsInputs.js';

//import * as auth from '../auth.js';


function Register({onRegister}) {
  const {values, handleInput} = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
    console.log("in Register === values: ")
    console.log(values);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
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
          autoComplete="on"
        />
        <button className="login__submit" type="submit" >
          Зарегистрироваться
        </button>
      </form>
      <p className="login__quest">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>{" "}
      </p>
    </section>
  );
}

export default Register;
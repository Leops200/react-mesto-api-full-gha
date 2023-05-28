import { Routes, Route, Link } from 'react-router-dom';

function NavBar({ email, onLogOut }) {
  return (
    <div className='header__nav'>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">Зарегистрироваться</Link>
          }
          exact
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">Войти</Link>
          }
          exact
        />
        <Route
          path='/'
          element={
            <>
              <p className="header__user-mail">{email}</p>
              <button
                className='header__exit'
                onClick={onLogOut}
                type='button'
              >Выйти</button>
            </>
          }
          exact
        />
      </Routes>
    </div>
  );
}

export default NavBar;
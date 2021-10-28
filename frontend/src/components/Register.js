import React from 'react';
import {Link} from 'react-router-dom';

function Register (props) {
  const [data, setData] = React.useState ({
    email: '',
    password: '',
  });

  function handleChange (event) {
    const {name, value} = event.target;
    setData ({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit (event) {
    event.preventDefault ();
    const {email, password} = data;
    props.onRegister (email, password);
  }

  return (
    <section className="sign">
      <div className="sign__wrapper">
        <h2 className="sign__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="sign__form" noValidate>
          <input
            onChange={handleChange}
            value={data.email || ''}
            className="sign__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            onChange={handleChange}
            value={data.password || ''}
            className="sign__input sign__input_type_password"
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
          <button className="sign__submit" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <h3 className="sign__subtitle">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="sign__login-link">Войти</Link>
        </h3>
      </div>
    </section>
  );
}

export default Register;

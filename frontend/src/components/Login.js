import React from 'react';

function Login (props) {
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
    props.onLogin (email, password);
  }

  return (
    <section className="sign">
      <div className="sign__wrapper">
        <h2 className="sign__title">Вход</h2>
        <form onSubmit={handleSubmit} className="sign__form" noValidate>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={data.email || ''}
            className="sign__input"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            required
            value={data.password || ''}
            className="sign__input sign__input_type_password"
            placeholder="Пароль"
            onChange={handleChange}
          />
          <button className="sign__submit" type="submit">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;

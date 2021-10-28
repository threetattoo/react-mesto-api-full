import React from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import logo from '../images/logo.svg';

function Header (props) {
  const [menuIsOpen, setMenuIsOpen] = React.useState (false);

  function handleChangeMenuState () {
    setMenuIsOpen (!menuIsOpen);
  }

  function handleLogout () {
    setMenuIsOpen (false);
    props.handleLogout ();
  }

  return (
    <header
      className={props.loggedIn ? 'header header_column-reverse' : 'header'}
    >
      <div className="header__wrapper">
        <img
          src={logo}
          alt="Логотип сервиса 'Место'"
          className="header__logo"
        />
        {props.loggedIn
          ? <button
              className={
                menuIsOpen
                  ? 'header__burger-button header__burger-button_opened'
                  : 'header__burger-button'
              }
              onClick={handleChangeMenuState}
            />
          : <button
              className="header__burger-button_hidden"
              onClick={handleChangeMenuState}
            />}
      </div>
      <Switch>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__navlink">Войти</NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__navlink">
            Регистрация
          </NavLink>
        </Route>
        <Route exact path="/">
          <nav
            className={
              menuIsOpen ? 'header__nav' : 'header__nav header__nav_hidden'
            }
          >
            <span className="header__email">{props.userInfo.email}</span>
            <NavLink
              to="/sign-in"
              className={
                menuIsOpen
                  ? 'header__navlink header__navlink_menuopened'
                  : 'header__navlink'
              }
              onClick={handleLogout}
            >
              Выйти
            </NavLink>
          </nav>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;

import React from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import authapi from '../utils/authApi';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';

function App () {
  const [loggedIn, setLoggedIn] = React.useState (false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState (
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState (false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState (
    false
  );
  const [selectedCard, setSelectedCard] = React.useState ({});
  const [currentUser, setCurrentUser] = React.useState ({});
  const [cards, setCards] = React.useState ([]);
  const [userInfo, setUserInfo] = React.useState ({email: ''});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState (false);
  const [
    isInfoTooltipSuccessfully,
    setIsInfoTooltipSuccessfully,
  ] = React.useState (true);
  const [token, setToken] = React.useState('');
  const history = useHistory ();

  //проверяем валидность токена пользователя
  React.useEffect (
    () => {
      const token = localStorage.getItem ('token');
      if (token) {
        setToken(token);
        authapi
          .getUserData (token)
          .then (response => {
            if (response) {
              setUserInfo ({email: response.email});
              setLoggedIn (true);
              history.push ('/');
            }
          })
          .catch (error => {
            console.log (error);
            setIsInfoTooltipSuccessfully (false);
            setIsInfoTooltipOpen (true);
          });
      }
    },
    [history]
  );

  //если пользователь залогинен, получаем информацию о нем
  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token');
      Promise.all ([api.getUserInfo (token), api.getInitialCards (token)])
      .then (([userInfo, initialCards]) => {
        setCurrentUser (userInfo);
        setCards (initialCards);
      })
      .catch (error => console.log (error));
    }
  }, [loggedIn])

  //функция авторизации пользователя
  function handleLogin (email, password) {
    authapi
      .signin (email, password)
      .then (response => {
        if (response.token) {
          setToken(response.token);
          localStorage.setItem ('token', response.token);
          setUserInfo ({email: email});
          setLoggedIn (true);
          history.push ('/');
        }
      })
      .catch (error => {
        console.log (error);
        setIsInfoTooltipSuccessfully (false);
        setIsInfoTooltipOpen (true);
      });
  }

  //функция регистрации пользователя
  function handleRegister (email, password) {
    authapi
      .signup (email, password)
      .then (response => {
        localStorage.setItem ('token', response.token);
        setUserInfo ({email: email});
        setIsInfoTooltipSuccessfully (true);
        history.push ('/sign-in');
      })
      .catch (error => {
        console.log (error);
        setIsInfoTooltipSuccessfully (false);
      })
      .finally (() => setIsInfoTooltipOpen (true));
  }

  //функция выхода пользователя из аккаунта
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserInfo({ email: "" });
    history.push('/sign-in');
  }


  function handleEditProfileClick () {
    setIsEditProfilePopupOpen (true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen (true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true);
  }

  function handleCardClick (card) {
    setSelectedCard (card);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen (false);
    setIsEditProfilePopupOpen (false);
    setIsAddPlacePopupOpen (false);
    setIsInfoTooltipOpen (false);
    setSelectedCard ({});
  }

  function handleCardLike (card, isLiked) {
    (isLiked ? api.dislikeCard (card._id, token) : api.likeCard (card._id, token))
      .then (newCard => {
        setCards (cards =>
          cards.map (item => (item._id === card._id ? newCard : item))
        );
      })
      .catch (error => console.log (error));
  }

  function handleCardDelete (card) {
    api
      .deleteCard (card._id, token)
      .then (() => {
        setCards (cards => cards.filter (item => item._id !== card._id));
      })
      .catch (error => console.log (error));
  }

  function handleUpdateUser (data) {
    api
      .changeUserInfo (data, token)
      .then (response => {
        setCurrentUser (response);
        closeAllPopups ();
      })
      .catch (error => console.log (error));
  }

  function handleUpdateAvatar (data) {
    api
      .changeUserAvatar (data, token)
      .then (response => {
        setCurrentUser (response);
        closeAllPopups ();
      })
      .catch (error => console.log (error));
  }

  function handleAddPlaceSubmit (data) {
    api
      .addNewCard (data, token)
      .then (newCard => {
        setCards ([newCard, ...cards]);
        closeAllPopups ();
      })
      .catch (error => console.log (error));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header handleLogout={handleLogout} userInfo={userInfo} loggedIn={loggedIn} />
      <Switch>
        <Route path="/sign-in">
          <Login onLogin={handleLogin}></Login>
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister}></Register>
        </Route>
        <ProtectedRoute
          path="/"
          component={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>       
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithForm
        name="card-delete-confirm"
        title="Вы уверены?"
        buttonText="Да"
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSignedUp={isInfoTooltipSuccessfully}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

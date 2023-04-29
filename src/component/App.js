import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utilis/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => alert(err))
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function hendleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function hendleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== card._id));
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={hendleEditProfileClick}
          onAddPlace={hendleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__form">
            <input
              id="input-avatar"
              type="url"
              name="avatar"
              className="popup__input popup__input_type_link"
              placeholder="Ссылка на аватар"
              required />
            <span id="input-avatar-error" className="popup__error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <label className="popup__form">
            <input
              id="input-name"
              type="text"
              name="name"
              className="popup__input popup__input_type_name"
              placeholder="Укажите имя"
              minLength="2"
              maxLength="40"
              required />
            <span id="input-name-error" className="popup__error"></span>
            <input
              id="input-job"
              type="text"
              name="about"
              className="popup__input popup__input_type_job"
              placeholder="Укажите професcию"
              minLength="2"
              maxLength="200"
              required />
            <span id="input-job-error" className="popup__error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="place"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input
            id="input-title"
            type="text"
            name="name"
            className="popup__input popup__input_type_title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required />
          <span id="input-title-error" className="popup__error"></span>
          <input
            id="input-link"
            type="url"
            name="link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required />
          <span id="input-link-error" className="popup__error"></span>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}>
        </ImagePopup>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;

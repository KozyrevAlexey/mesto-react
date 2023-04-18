import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={hendleEditProfileClick}
        onAddPlace={hendleAddPlaceClick}
        onCardClick={handleCardClick}
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
  )
}

export default App;

import React from "react";

function PopupWithForm({ name, title, onClose, isOpen, children }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" aria-label="Close" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form popup__form_type_${name}" name={`form-${name}`} noValidate>
          {children}
          <button className="popup__button popup__button-submit" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  )
}


export default PopupWithForm;

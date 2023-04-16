import React from "react";

function Card({ card, onCardClick }) {
    const handleClick = () => onCardClick(card);

    return (
        <article className="element">
            <button className="element__basket"></button>
            <img className="element__img" alt={card.name} src={card.link} onClick={handleClick} />
            <div className="element__wrap">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-group">
                    <button className="element__button"></button>
                    <span className="element__span">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;

import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    const handleLikeClick = () => { onCardLike(card) };
    const handleDeleteClick = () => { onCardDelete(card) };

    return (
        <article className="element">
            {isOwn && <button onClick={handleDeleteClick} type="button" aria-label="Кнопка удалить" className="element__delete-button"></button>}
            <img onClick={() => { onCardClick(card) }} alt={card.name} className="element__image" src={card.link} />
            <div className="element__vector-like">
                <h2 className="element__caption">{card.name}</h2>
                <div className="element__like-container">
                    <button onClick={handleLikeClick} type="button" aria-label="Кнопка лайк" className={cardLikeButtonClassName}></button>
                    <span className="element__like-counter">{card?.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;
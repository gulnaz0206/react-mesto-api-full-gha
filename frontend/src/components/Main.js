import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
   
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img src={currentUser?.avatar} alt={`аватар пользователя ${currentUser?.name}`} className="profile__avatar" />
                <button onClick={onEditAvatar} className="profile__edit-avatar-button" type="button" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser?.name}</h1>
                    <button onClick={onEditProfile} type="button" aria-label="Кнопка" className="profile__edit">
                    </button>
                    <p className="profile__job">{currentUser?.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" aria-label="Кнопка плюс" className="profile__button"></button>
            </section>
            <section className="elements">
                {cards?.map((card) => (
                    <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id}/>
                ))}
            </section>
        </main>
    )
}

export default Main;
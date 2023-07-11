function ImagePopup({card, onClose}) {
    return(
        <div id="popup-big-picture" className={`popup popup_type_big-picture ${card ? 'popup_opened' : ''}`}>
            <div className="popup-image-container">
                <button onClick={onClose} type="button" aria-label="Кнопка закрыть попап" className="popup__close-button"></button>
                <img className="popup__image" src={card?.link} alt={card?.name} />
                <figcaption className="popup-image-heading">{card?.name}</figcaption>
            </div>
        </div>
    )
}

export default ImagePopup;
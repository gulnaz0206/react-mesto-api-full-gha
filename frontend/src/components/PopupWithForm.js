function PopupWithForm({ title, buttonText, name, isOpen, onClose, onSubmit, children }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" aria-label="Кнопка закрыть попап" className="popup__close-button" />
                <h3 className="popup__title">{title}</h3>
                <form onSubmit={onSubmit} name={name} className="popup__form popup-add-form">
                    {children}
                    <button type="submit" className="popup__button popup__delete-button">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    const handleNameInputChange = (event) => setName(event.target.value);
    const handleLinkInputChange = (event) => setLink(event.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({name, link});
    }

    return (
        <PopupWithForm title={'Новое место'} buttonText={'Создать'} name={'add-card'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input value={name} onChange={handleNameInputChange} type="text" name="popup__input_type_place" placeholder="Название" minLength="2" maxLength="30"
                required className="popup__input popup__input_type_place" id="input-add-place" />
            <span id="input-add-place-error" className="popup__error"></span>
            <input value={link} onChange={handleLinkInputChange} type="url" name="popup__link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_link" id="input-edit-link" required />
            <span id="input-edit-link-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
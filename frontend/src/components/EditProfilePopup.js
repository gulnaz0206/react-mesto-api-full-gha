import { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/api';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleNameInputChange = (event) => setName(event.target.value);
    const handleDescriptionInputChange = (event) => setDescription(event.target.value);

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm title={'Редактировать профиль'} buttonText={'Сохранить'} name={'profile'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input onChange={handleNameInputChange} value={name || ''} type="text" name="popup__name" placeholder="Ваше имя" minLength="2" maxLength="40" required
                className="popup__input popup__input_type_name" id="input-edit-name" />
            <span id="input-edit-name-error" className="popup__error"></span>
            <input onChange={handleDescriptionInputChange} value={description || ''} type="text" name="popup__job" placeholder="Ваша профессия" minLength="2" maxLength="200" required
                className="popup__input popup__input_type_job" id="input-edit-job" />
            <span id="input-edit-job-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const linkInput = useRef(null);

    useEffect(() => {
        if (isOpen) {
            linkInput.current.value = '';
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: linkInput.current.value,
        });
      }
    
    return (
        <PopupWithForm title={'Обновить аватар'} buttonText={'Сохранить'} name={'change-avatar'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input ref={linkInput} type="url" name="popup__link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_avatar" id="input-change-avatar" required />
            <span id="input-change-avatar-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
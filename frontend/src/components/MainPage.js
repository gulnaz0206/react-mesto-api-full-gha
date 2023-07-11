import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function MainPage({ onLogout, userEmail, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, handleCardLike, handleCardDelete, handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, handleCardClick, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit, cards, currentUser, closeAllPopups }) {

    return (
        <>

            <CurrentUserContext.Provider value={currentUser}>

                <Header>
                    <div className='header__links'>
                        <p className='header__email'>{userEmail}</p>
                        <button onClick={onLogout} className='header__button'>Выйти</button>
                    </div>
                </Header>

                <Main
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Footer />

                {/* Попап редактирования профиля */}
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                {/* Попап добавления карточки */}
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                {/* Попап большой картинки */}
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                {/* Попап удаления картинки */}
                <PopupWithForm title={'Вы уверены?'} buttonText={'Да'} name={'delete-picture'} isOpen={false} onClose={closeAllPopups} />

                {/* Попап смены аватара */}
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            </CurrentUserContext.Provider>

        </>
    )
}

export default MainPage;
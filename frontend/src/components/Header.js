function Header({children}) {
    return (
        <header className="header">
            <img src="./images/logo.svg" alt="Логотип" className="header__logo" />
            {children}
        </header>
    )
}

export default Header;
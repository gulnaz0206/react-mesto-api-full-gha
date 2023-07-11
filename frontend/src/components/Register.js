import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import InfoTooltip from "./InfoTooltip";

function Register({ handleRegisterSubmit, loggedIn }) {

  const [isValue, setIsValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsValue({
      ...isValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = isValue;
    handleRegisterSubmit(email, password);
  }

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Header>
      <RegistrationPage name="register" title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <input id="input-register-email" className="auth__input auth__input_name" name="email" type="email" placeholder="Email" minLength={2} maxLength={40} required value={isValue.email} onChange={handleChange} />
        <span id="input-register-email-error" className="popup__error" />
        <input id="input-register-password" className="auth__input auth__input_password" name="password" type="password" placeholder="Пароль" minLength={2} maxLength={200} required value={isValue.password} onChange={handleChange} />
        <span id="input-register-password-error" className="popup__error" />
      </RegistrationPage>
      <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </>
  );
}
export default Register;
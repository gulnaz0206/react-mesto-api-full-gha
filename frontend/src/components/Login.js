import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

import RegistrationPage from "./RegistrationPage";

function Login({ handleLoginSubmit, loggedIn }) {
  const [formValue, setformValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formValue,
      [name]: value
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue
    handleLoginSubmit(email, password)
  }
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">Зарегистрироваться</Link>
      </Header>
      <RegistrationPage name="login" title="Вход" buttonText="Войти" onSubmit={handleSubmit}>
        <input id="input-login-email" className="auth__input auth__input_name" name="email" type="email" placeholder="Email" minLength={2} maxLength={40} required value={formValue.email} onChange={handleChange} />
        <span id="input-login-email-error" className="popup__error" />
        <input id="input-login-password" className="auth__input auth__input_password" name="password" type="password" placeholder="Пароль" minLength={2} maxLength={200} required value={formValue.password} onChange={handleChange} />
        <span id="input-login-password-error" className="popup__error" />
      </RegistrationPage>
    </>
  );
}
export default Login;
import React from 'react';
import styles from './Login.modules.scss';

const userTypes = {
  0: 'herSgory',
  1: 'student',
  2: 'profik',
  3: 'teacher',
};

const Login = () => {
  let submitFlag = false;

  const [auth, setAuth] = React.useState(0);

  React.useEffect(() => {
    axios.post('http://localhost:3000/users', { userName, password }).then((res) => {
      // Обработка успешного входа
    });
  }, [submitFlag]);

  const submitEvent = () => {
    submitFlag = 1;
  };

  return (
    <div className="">
      <h1 className="login">LOGIN</h1>
      <form action="#">
        <p>Логин</p>
        <input name="login" type="text" />
        <p>Пароль</p>
        <input name="password" type="password" />
        <button type="submit" onClick={submitEvent}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;

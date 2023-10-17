import React from 'react';
// import { setUser } from '../../redux/slices/userSlice';
import axios from 'axios';
import styles from './Login.module.scss';

const userTypes = {
  0: 'herSgory',
  1: 'student',
  2: 'profik',
  3: 'teacher',
};

const Login = () => {
  const [auth, setAuth] = React.useState(0);

  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleClick = (user, pass) => {
    axios.post('http://localhost:3000/users', { user, pass }).then((res) => {
      setAuth(res.data);
    });
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.loginTitle}>Войти в систему</h1>
      <div className={styles.loginBlock}>
        <input
          className={styles.input}
          type="text"
          value={user}
          placeholder="Никнейм"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          value={pass}
          placeholder="Пароль"
          onChange={(e) => setPass(e.target.value)}
        />
        <button className={styles.button} onClick={() => handleClick(user, pass)}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Login;

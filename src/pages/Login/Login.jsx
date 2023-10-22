import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import axios from 'axios';
import styles from './Login.module.scss';

export const userTypes = {
  0: 'herSgory',
  1: 'Student',
  2: 'profik',
  3: 'teacher',
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleClick = (user, pass) => {
    axios
      .get(`http://localhost:5030/Auth/${user}/${pass}`, { user, pass })
      .then((res) => {
        dispatch(login(res.data));
        // console.log(res.data);
        navigate(`/${res.data.type}/${res.data.authId}`);
      })
      .catch((error) => {
        console.error(error);
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

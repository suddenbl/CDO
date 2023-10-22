import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './Student.module.scss';
import axios from 'axios';
import { setUser } from '../../store/slices/userSlice';

const Student = () => {
  const { userType, userId } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5030/Student/${userId}`)
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          width="300px"
          height="300px"
          src="https://basket-04.wb.ru/vol634/part63414/63414239/images/big/1.jpg"
          alt="Аватарка"
        />
        <h3>{user.name}</h3>
      </div>
      <div className={styles.content__bottom}>
        <nav className={styles.navigation}>
          <ul className="navigation-ul">
            <li className="navigation__item">Ссылки: </li>
            <li className="navigation__item">1</li>
            <li className="navigation__item">2</li>
            <li className="navigation__item">3</li>
          </ul>
        </nav>
        <div className="user-info">
          <ul>
            <li>ФИО: {user.name}</li>
            <li>Возраст: {user.age}</li>
            <li>Группа: {user.group}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Student;

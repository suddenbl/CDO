import React from 'react';

import styles from './Student.module.scss';

const student = {
  name: 'user',
  age: 99,
  group: 'VT-220',
};

const Student = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img src="../assets/img/ava.jpg" alt="Аватарка" />
        <h3>{student.name}</h3>
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
            <li>ФИО: {student.name}</li>
            <li>Возраст: {student.age}</li>
            <li>Группа: {student.group}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Student;

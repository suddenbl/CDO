// import React from 'react';

import styles from './Teacher.module.scss';

const teacher = {
  name: 'Teacher',
};

const Teacher = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <h3>{teacher.name}</h3>
      </div>
      <div className={styles.content__bottom}>
        <div>Опубликовать материалы</div>
        <div>Студенты</div>
      </div>
    </div>
  );
};

export default Teacher;

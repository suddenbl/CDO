import React from 'react';
import styles from './Actions.module.scss';

const Actions = ({ userType }) => {
  const actions = {
    Student: ['Внесение данных о студенте'],
    Union: ['Выставить информацию о ближайших мероприятиях'],
    Teacher: ['Просмотр данных о студенте', 'Выставление оценок', 'Публикация материалов'],
    Rector: ['Добавление учебного плана', 'Внесение дополнительных данных о студенте'],
    Admin: [
      'Добавление и удаление групп',
      'Найм и увольнение сотрудников',
      'Добавление новых студентов',
      'Удаление неактуальных студентов',
      'Просмотр данных о студенте',
    ],
    Accountant: [
      'Просмотр данных о студенте',
      'Составление списка задолженностей',
      'Выставляет размер выплат/стипендий',
    ],
  };

  if (!actions[userType]) {
    console.log('Одна ошибка и ты ошибся');
    return null;
  }

  return (
    <div className={styles.actions}>
      <div className={styles.actionsItem}>
        {actions[userType].map((obj) => {
          return <button key={obj}>{obj}</button>;
        })}
      </div>
    </div>
  );
};

export default Actions;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../../store/slices/empoloyeeSlice';
import styles from './Employee.module.scss';
import { Button, Input, List, Tabs, Text, Textarea } from '@mantine/core';

function Employee() {
  const employeeData = useSelector((state) => state.auth.user);
  const authToken = employeeData.authToken;

  const user = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Employee/${authToken}/authToken`);
        dispatch(setEmployee(response.data));
      } catch (error) {
        console.log('Проблема в получении данных работника', error);
      }
    };
    fetchData();
  }, []);

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  async function submitPayment(e) {
    e.preventDefault();
    axios.post('http://localhost:5240/Payment', {
      paymentType: 'Выплата стипендии',
      paymentCost: +inputOne,
      paymentDate: new Date(),
      studentID: +inputTwo,
    });
    setInputOne('');
    setInputTwo('');
  }
  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          className={styles.contentTopAvatar}
          src="https://nipkef.ru/upload/medialibrary/b0a/o38u236v5s0tbq1dm34z2jylsjrjc6in.jpg"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <div className={styles.userInfoList}>
            <Text size="xl">ФИО: {user.fullNameEmployee}</Text>
            <Text size="xl">Должность: Бухгалтер</Text>
            <Text size="xl">Номер телефона: {user.contactMailEmployee}</Text>
            <Text size="xl">Почта: {user.contactPhoneEmployee}</Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <div>
          <h2>Проставить стипендию</h2>
          <form onSubmit={submitPayment}>
            <input
              required
              type="number"
              placeholder="Сумма"
              value={inputOne}
              onChange={(event) => setInputOne(event.target.value)}
            />
            <input
              required
              type="number"
              placeholder="ID студента"
              value={inputTwo}
              onChange={(event) => setInputTwo(event.target.value)}
            />
            <button>Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Employee;

import { Button, Input, List, Tabs, Text, Textarea } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup, setStudent, setPayment } from '../../store/slices/studentSlice';
import styles from './Student.module.scss';

const Student = () => {
  const studentData = useSelector((state) => state.auth.user);
  const authToken = studentData.authToken;
  const user = useSelector((state) => state.student);
  const studentId = user.studentId;
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('one');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Student/${authToken}/authToken`);
        dispatch(setStudent(response.data));
        const group = await axios.get(`http://localhost:5240/Group/${response.data.groupID}`);
        dispatch(setGroup(group.data));
        const payment = await axios.get(`http://localhost:5240/Payment/${studentId}/studentId`);
        dispatch(setPayment(payment.data));
      } catch (error) {
        console.log('Проблема в получении данных студента', error);
      }
    };

    fetchData();
  }, []);
  const dateOfBirth = new Date(user.age).toLocaleDateString('ru-RU');
  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          className={styles.contentTopAvatar}
          width="300px"
          height="300px"
          src="https://basket-04.wb.ru/vol634/part63414/63414239/images/big/1.jpg"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <Text size="xl">ФИО: {user.name}</Text>
          <Text size="xl">Пол: {user.gender == true ? 'Мужской ' : 'Женский'}</Text>
          <Text size="xl">Дата рождения: {dateOfBirth}</Text>
          <Text size="xl">Группа: {user.groupName}</Text>
          <Text size="xl">Номер телефона: {user.contactPhone}</Text>
          <Text size="xl">Почта: {user.contactMail}</Text>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs
          className={styles.tabs}
          value={activeTab}
          onChange={setActiveTab}
          orientation="vertical">
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="one">Внесение данных о студенте</Tabs.Tab>
            <Tabs.Tab value="two">Узнать стипендию</Tabs.Tab>
            <Tabs.Tab value="three">Узнать оценки</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one"></Tabs.Panel>
          <Tabs.Panel value="two">
            {user.payment.map((payment) => (
              <div className={styles.paymentWrap}>
                <Text size="xl">{payment.paymentCost} руб</Text>
                <Text size="xl">{payment.paymentType}</Text>
                <Text size="xl">{payment.paymentDate.slice(0, -13)}</Text>
              </div>
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="three"></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Student;

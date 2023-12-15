import { Button, Input, Tabs, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGroup,
  setStudent,
  setPayment,
  setJournal,
  setSubjectName,
} from '../../store/slices/studentSlice';
import { setAddon } from '../../store/slices/addonSlice';
import styles from './Student.module.scss';

const Student = () => {
  const studentData = useSelector((state) => state.auth.user);
  const authToken = studentData.authToken;
  const user = useSelector((state) => state.student);
  const addons = useSelector((state) => state.addon);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('one');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Student/${authToken}/authToken`);
        dispatch(setStudent(response.data));
        const group = await axios.get(`http://localhost:5240/Group/${response.data.groupID}`);
        dispatch(setGroup(group.data));
        const payment = await axios.get(
          `http://localhost:5240/Payment/${response.data.studentID}/studentId`,
        );
        dispatch(setPayment(payment.data));
        const journal = await axios.get(
          `http://localhost:5240/Journal/${response.data.studentID}/studentId`,
        );
        dispatch(setJournal(journal.data));
        const addon = await axios.get(`http://localhost:5240/Addon`);
        dispatch(setAddon(addon.data));
      } catch (error) {
        console.log('Проблема в получении данных студента', error);
      }
    };

    fetchData();
    getArrSubjectName();
  }, []);

  const fetchSubject = async (lessonID) => {
    const res = await axios.get(`http://localhost:5240/Lesson/${lessonID}`);
    const ress = await axios.get(`http://localhost:5240/Subject/${res.data.subjectID}`);
    dispatch(setSubjectName(ress.data));
    console.log(user.subjectName);
  };
  let array = [];
  function getArrSubjectName() {
    for (const i of user.journal) {
      let temp = i.lessonID;
      array.push(temp);
    }
    for (const i of array) {
      fetchSubject(i);
    }
  }

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
          <Text size="xl">
            Источник финансирования: {user.budget == true ? 'Бюджет' : 'Платник'}
          </Text>
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
            <Tabs.Tab value="three">Узнать задолжности</Tabs.Tab>
            <Tabs.Tab value="four">Узнать оценки</Tabs.Tab>
            <Tabs.Tab value="five">Просмотреть лекционный материал</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one">
            <div className={styles.paymentWrapEdit}>
              <Input size="md" placeholder="Новая почта" />
              <Button size="md" variant="filled">
                Отправить
              </Button>
              <Input size="md" placeholder="Новый номер телефона" />
              <Button size="md" variant="filled">
                Отправить
              </Button>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="two">
            {user.payment.map((payment) =>
              payment.paymentDirection ? (
                <div className={styles.paymentWrap}>
                  <Text size="xl">{payment.paymentCost} руб</Text>
                  <Text size="xl">{payment.paymentType}</Text>
                  <Text size="xl">{payment.paymentDate.slice(0, -13)}</Text>
                </div>
              ) : (
                ''
              ),
            )}
          </Tabs.Panel>
          <Tabs.Panel value="three">
            {user.payment.map((payment) =>
              !payment.paymentDirection ? (
                <div className={styles.paymentWrap}>
                  <Text size="xl">{payment.paymentCost} руб</Text>
                  <Text size="xl">{payment.paymentType}</Text>
                  <Text size="xl">{payment.paymentDate.slice(0, -13)}</Text>
                </div>
              ) : (
                ''
              ),
            )}
          </Tabs.Panel>
          <Tabs.Panel value="four">
            {user.journal.map((journal, i) => (
              <div className={styles.paymentWrap}>
                <Text size="xl">{user.subjectName[i]}</Text>
                <Text size="xl">Зачет: {journal.mark}</Text>
                {journal.rating.map((rating, index) => (
                  <Text size="xl">
                    Рейтинг {index + 1}: {rating}
                  </Text>
                ))}
              </div>
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="five">
            {addons.arr.map((addon) => (
              <div className={styles.paymentWrap}>
                <Text size="xl">{addon.addonHeader}</Text>
                <a href="./">{addon.addonDescription}</a>
              </div>
            ))}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Student;

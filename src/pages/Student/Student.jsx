import { Button, Input, Tabs, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudent, setMail, setPhone, setLessons } from '../../store/slices/studentSlice';
import styles from './Student.module.scss';
import { setEvent } from '../../store/slices/eventSlice';
const Student = () => {
  const studentData = useSelector((state) => state.auth.user);
  const authToken = studentData.authToken;
  const user = useSelector((state) => state.student);
  const events = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('one');

  const [newMail, setNewMail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Student/${authToken}/authToken`);
        dispatch(setStudent(response.data));
        const resEvent = await axios.get(`http://localhost:5240/Event`);
        dispatch(setEvent(resEvent.data));
        const resLessons = await axios.get(
          `http://localhost:5240/Lesson/${response.data.groupID}/groupId`,
        );
        dispatch(setLessons(resLessons.data));
      } catch (error) {
        console.log('Проблема в получении данных студента', error);
      }
    };
    fetchData();
  }, []);

  const dateOfBirth = new Date(user.age).toLocaleDateString('ru-RU');
  const changeMail = (mail) => {
    dispatch(setMail(mail));
    axios.put(`http://localhost:5240/Student/${user.studentId}/5/${mail}`);
  };
  const changePhone = (phone) => {
    dispatch(setPhone(phone));
    axios.put(`http://localhost:5240/Student/${user.studentId}/6/${phone}`);
  };

  const payPayment = (paymentID) => {
    axios.put(`http://localhost:5240/Payment/${paymentID}/true`);
  };

  let matrixLessons = [
    [0, 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
    ['8:30-10:00', 0, 0, 0, 0, 0],
    ['10:20-11:50', 0, 0, 0, 0, 0],
    ['12:10-13:40', 0, 0, 0, 0, 0],
    ['14:00-15:30', 0, 0, 0, 0, 0],
    ['15:50-17:20', 0, 0, 0, 0, 0],
  ];
  const createMatrixLessons = () => {
    for (const lesson of user.lessons) {
      let y = lesson.dayOrder;
      let x = lesson.weekdays;
      matrixLessons[y][x] = lesson;
    }
  };
  createMatrixLessons();

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
          <Text size="xl">Группа: {user.group}</Text>
          <Text size="xl">
            Источник финансирования: {user.budget == true ? 'Бюджет' : 'Платник'}
          </Text>
          <Text size="xl">Номер телефона: {user.contactPhone}</Text>
          <Text size="xl">Почта: {user.contactMail}</Text>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs className={styles.tabs} value={activeTab} onChange={setActiveTab}>
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="one">Внесение данных о студенте</Tabs.Tab>
            <Tabs.Tab value="two">Узнать стипендию</Tabs.Tab>
            <Tabs.Tab value="three">Узнать задолжности</Tabs.Tab>
            <Tabs.Tab value="four">Узнать оценки</Tabs.Tab>
            <Tabs.Tab value="five">Просмотреть лекционный материал</Tabs.Tab>
            <Tabs.Tab value="six">Просмотреть расписание</Tabs.Tab>
            <Tabs.Tab value="seven">Мероприятия</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one">
            <div className={styles.editWrap}>
              <Input
                size="md"
                placeholder="Новая почта"
                value={newMail}
                onChange={(e) => setNewMail(e.target.value)}
              />
              <Button
                size="md"
                variant="filled"
                onClick={() => (changeMail(newMail), setNewMail(''))}>
                Отправить
              </Button>
              <Input
                size="md"
                placeholder="Новый номер телефона"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <Button
                size="md"
                variant="filled"
                onClick={() => (changePhone(newPhone), setNewPhone(''))}>
                Отправить
              </Button>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="two">
            {user.payments.map((payment, index) =>
              payment.paymentDirection ? (
                <div className={styles.paymentWrapGrant} key={index}>
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
            {user.payments.map((payment, index) =>
              !payment.paymentDirection && !payment.isPaid ? (
                <div className={styles.paymentWrap} key={index}>
                  <Text size="xl">{payment.paymentCost} руб</Text>
                  <Text size="xl">{payment.paymentType}</Text>
                  <Text size="xl">{payment.paymentDate.slice(0, -13)}</Text>
                  <Button
                    size="md"
                    variant="filled"
                    onClick={() => (payPayment(payment.paymentID), location.reload())}>
                    Оплатить
                  </Button>
                </div>
              ) : !payment.paymentDirection && payment.isPaid ? (
                <div className={styles.paymentWrapActive} key={index}>
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
            {user.journal.map((journal, index) => (
              <div className={styles.journalWrap} key={index}>
                <Text size="xl">{journal.lessons.subject.subjectName}</Text>
                {journal.mark === null ? (
                  <Text size="xl">Экзамен/Зачет: </Text>
                ) : journal.mark === ('зачет' || 'незачет' || 'Зачет' || 'Незачет') ? (
                  <Text size="xl">Зачет: {journal.mark}</Text>
                ) : (
                  <Text size="xl">Экзамен: {journal.mark}</Text>
                )}
                {journal.rating.map((rating, index) => (
                  <Text size="xl" key={index}>
                    Рейтинг {index + 1}: {rating}
                  </Text>
                ))}
              </div>
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="five">
            {user.journal.map((journal, index) => (
              <div className={styles.addonWrap} key={index}>
                {journal.lessons.addons.map((addon, index) => (
                  <div key={index}>
                    <Text size="xl" key={index}>
                      {addon.addonHeader}
                    </Text>
                    <a href="./">{addon.addonDescription}</a>
                  </div>
                ))}
              </div>
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="six">
            <div className={styles.scheduleWrap}>
              {matrixLessons.map((matrixLesson) =>
                matrixLesson.map((lesson, index) =>
                  lesson === 0 ? (
                    <div className={styles.scheduleWrapTarget} key={index}></div>
                  ) : typeof lesson === 'string' ? (
                    <div className={styles.scheduleWrapTarget} key={index}>
                      <Text size="xl" className={styles.scheduleTextStirng}>
                        {lesson}
                      </Text>
                    </div>
                  ) : (
                    <div className={styles.scheduleWrapTarget} key={index}>
                      <Text size="xl" className={styles.scheduleTextName}>
                        {lesson.subject.subjectName}
                      </Text>
                      <Text size="xl" className={styles.scheduleTextFullname}>
                        {lesson.teacher.fullNameTeacher}
                      </Text>
                      <Text size="xl" className={styles.scheduleTextClassroom}>
                        {lesson.classroom}
                      </Text>
                    </div>
                  ),
                ),
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="seven">
            {events.arr.map((event, index) => (
              <div className={styles.eventWrap} key={index}>
                <Text size="xl">{event.eventHeader}</Text>
                <Text size="xl">{event.eventDescription}</Text>
                <Text size="xl">{event.eventDate.replace('T', ' Время: ')}</Text>
              </div>
            ))}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Student;

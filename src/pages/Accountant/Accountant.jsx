import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccountant,
  setStudentBudget,
  setStudentNotBudget,
} from '../../store/slices/accountantSlice';
import styles from './Accountant.module.scss';
import { Text, Input, Button, Tabs } from '@mantine/core';

function Accountant() {
  const accountantData = useSelector((state) => state.auth.user);
  const authToken = accountantData.authToken;

  const user = useSelector((state) => state.accountant);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('one');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Employee/${authToken}/authToken`);
        dispatch(setAccountant(response.data));
        const resStudentBudget = await axios.get('http://localhost:5240/Student/true/budget');
        dispatch(setStudentBudget(resStudentBudget.data));
        const resStudentNotBudget = await axios.get('http://localhost:5240/Student/false/budget');
        dispatch(setStudentNotBudget(resStudentNotBudget.data));
      } catch (error) {
        console.log('Проблема в получении данных работника', error);
      }
    };
    fetchData();
  }, []);

  const [grant, setGrant] = useState('');
  const postGrant = (grant) => {
    for (const student of user.studentBudget) {
      axios.post('http://localhost:5240/Payment', {
        paymentType: 'Выплата стипендии',
        paymentCost: +grant,
        paymentDate: new Date(),
        studentID: student.studentID,
        paymentDirection: true,
      });
      setGrant('');
    }
  };
  const [credit, setCredit] = useState('');
  const postCredit = (credit) => {
    for (const student of user.studentNotBudget) {
      axios.post('http://localhost:5240/Payment', {
        paymentType: 'Задолжность за оплату обучение',
        paymentCost: +credit,
        paymentDate: new Date(),
        studentID: student.studentID,
        paymentDirection: false,
      });
      setCredit('');
    }
  };
  const [hostelPrice, setHostelPrice] = useState('');
  const postHostelPrice = (hostelPrice) => {
    for (const student of user.studentNotBudget) {
      axios.post('http://localhost:5240/Payment', {
        paymentType: 'Задолжность за оплату обучение',
        paymentCost: +credit,
        paymentDate: new Date(),
        studentID: student.studentID,
        paymentDirection: false,
      });
      setCredit('');
    }
  };
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
            <Text size="xl">ФИО: {user.fullNameAccountant}</Text>
            <Text size="xl">Должность: Бухгалтер</Text>
            <Text size="xl">Номер телефона: {user.contactMailAccountant}</Text>
            <Text size="xl">Почта: {user.contactPhoneAccountant}</Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs className={styles.tabs} value={activeTab} onChange={setActiveTab}>
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="one">Проставить стипендию</Tabs.Tab>
            <Tabs.Tab value="two">Проставить задолжность за оплату обучение</Tabs.Tab>
            <Tabs.Tab value="three">Проставить задолжность за оплату общажития</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one">
            <h2>Проставить стипендию</h2>
            <Input
              size="md"
              placeholder="Стипендия"
              value={grant}
              onChange={(e) => setGrant(e.target.value)}
            />
            <Button size="md" variant="filled" onClick={() => postGrant(grant)}>
              Отправить
            </Button>
          </Tabs.Panel>
          <Tabs.Panel value="two">
            <h2>Проставить задолжность за оплату обучение</h2>
            <Input
              size="md"
              placeholder="Задолжность за оплату обучение"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
            <Button size="md" variant="filled" onClick={() => postCredit(credit)}>
              Отправить
            </Button>
          </Tabs.Panel>
          <Tabs.Panel value="three">
            <h2>Проставить задолжность за оплату общажития</h2>
            <Input
              size="md"
              placeholder="Задолжность за оплату общажития"
              value={hostelPrice}
              onChange={(e) => setHostelPrice(e.target.value)}
            />
            <Button size="md" variant="filled" onClick={() => postHostelPrice(hostelPrice)}>
              Отправить
            </Button>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
export default Accountant;

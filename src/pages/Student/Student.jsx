import { Button, List, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup, setStudent } from '../../store/slices/studentSlice';
import styles from './Student.module.scss';

const Student = () => {
  const studentData = useSelector((state) => state.auth.user);
  const authToken = studentData.authToken;
  const user = useSelector((state) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Student/${authToken}/authToken`);
        console.log(response.data);
        dispatch(setStudent(response.data));
        const group = await axios.get(`http://localhost:5240/Group/${response.data.groupID}`);
        dispatch(setGroup(group.data));
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
          <List className={styles.userInfoList}>
            <List.Item>
              <Text size="md" className={styles.userInfoItem}>
                ФИО: {user.name}
              </Text>
            </List.Item>
            <List.Item>
              <Text size="md" className={styles.userInfoListItem}>
                Пол: {user.gender == true ? 'Мужской ' : 'Женский'}
              </Text>
            </List.Item>
            <List.Item>
              <Text size="md" className={styles.userInfoItem}>
                Дата рождения: {dateOfBirth}
              </Text>
            </List.Item>
            <List.Item>
              <Text size="md" className={styles.userInfoItem}>
                Группа: {user.groupName}
              </Text>
            </List.Item>
            <List.Item>
              <Text size="md" className={styles.userInfoItem}>
                Номер телефона: {user.contactPhone}
              </Text>
            </List.Item>
            <List.Item>
              <Text size="md" className={styles.userInfoItem}>
                Почта: {user.contactMail}
              </Text>
            </List.Item>
          </List>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <h4 className={styles.contentBottomTitle}>Доступные действия:</h4>
        {/* {userType === 'Student' && ( */}
        <List className={styles.actions}>
          <List.Item className={styles.actionsItem}>
            <Button>Внесение данных о студенте</Button>
          </List.Item>
        </List>
        {/* )} */}
        {/* <Actions userType={userType} /> */}
      </div>
    </div>
  );
};

export default Student;

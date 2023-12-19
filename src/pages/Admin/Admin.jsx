import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, setStudent } from '../../store/slices/adminSlice';
import { setGroup } from '../../store/slices/groupSlice';

import styles from './Admin.module.scss';
import { Text, Input, Button, Tabs, Select } from '@mantine/core';
import { IMaskInput } from 'react-imask';

function Admin() {
  const adminData = useSelector((state) => state.auth.user);
  const authToken = adminData.authToken;

  const user = useSelector((state) => state.admin);
  const group = useSelector((state) => state.group);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('one');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Employee/${authToken}/authToken`);
        dispatch(setAdmin(response.data));
        const responseStudent = await axios.get(`http://localhost:5240/Student`);
        dispatch(setStudent(responseStudent.data));
        const responseGroup = await axios.get(`http://localhost:5240/Group`);
        dispatch(setGroup(responseGroup.data));
        const groupName = responseGroup.data.map((group) => ({
          value: group.groupID.toString(),
          label: group.groupName,
        }));
        setGroupName(groupName);
      } catch (error) {
        console.log('Проблема в получении данных работника', error);
      }
    };
    fetchData();
  }, []);
  const [groupName, setGroupName] = useState([]);

  const [studentAddFIO, setStudentAddFIO] = useState('');
  const [studentAddAge, setStudentAddAge] = useState('');
  const [studentAddEnrollment, setStudentAddEnrollment] = useState('');
  const [studentAddGender, setStudentAddGender] = useState('');
  const [studentAddBudget, setStudentAddBudget] = useState('');
  const [studentAddHostel, setStudentAddHostel] = useState('');
  const [studentAddLogin, setStudentAddLogin] = useState('');
  const [studentAddPassword, setStudentAddPassword] = useState('');
  const [studentAddGroup, setStudentAddGroup] = useState('');

  const addStudent = async (
    studentAddFIO,
    studentAddAge,
    studentAddEnrollment,
    studentAddGender,
    studentAddBudget,
    studentAddHostel,
    studentAddGroup,
    studentAddLogin,
    studentAddPassword,
  ) => {
    let tempStudentAddGender = false;
    let tempStudentAddBudget = false;
    let tempStudentAddHostel = false;
    if (
      (studentAddFIO &&
        studentAddAge &&
        studentAddEnrollment &&
        studentAddGender &&
        studentAddBudget &&
        studentAddHostel &&
        studentAddGroup &&
        studentAddLogin &&
        studentAddPassword) !== ''
    ) {
      studentAddGender === 'Муж' ? (tempStudentAddGender = true) : (tempStudentAddGender = false);
      studentAddBudget === 'Бюджет'
        ? (tempStudentAddBudget = true)
        : (tempStudentAddBudget = false);
      studentAddHostel === 'Общежите выдано'
        ? (tempStudentAddHostel = true)
        : (tempStudentAddHostel = false);

      await axios.post('http://localhost:5240/Authorization', {
        login: studentAddLogin,
        password: studentAddPassword,
        type: 'student',
      });

      const resAuth = await axios.get('http://localhost:5240/Authorization');
      console.log(resAuth);
      const tempAuthToken = resAuth.data[resAuth.data.length - 1].authToken;
      console.log(tempAuthToken);

      await axios.post('http://localhost:5240/Student', {
        fullNameStudent: studentAddFIO,
        age: new Date(studentAddAge),
        enrollmentDate: new Date(studentAddEnrollment),
        contactMailStudent: '1',
        contactPhoneStudent: '1',
        gender: tempStudentAddGender,
        groupID: studentAddGroup,
        authToken: 46,
        budget: tempStudentAddBudget,
        hostelRent: tempStudentAddHostel,
      });

      setStudentAddFIO('');
      setStudentAddAge('');
      setStudentAddEnrollment('');
      setStudentAddLogin('');
      setStudentAddPassword('');
    }
  };

  return (
    <div className={styles.container}>
      {/* {console.log(groupName)} */}
      {/* {console.log(user.students)} */}
      <div className={styles.content__top}>
        <img
          className={styles.contentTopAvatar}
          src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <div className={styles.userInfoList}>
            <Text size="xl">ФИО: {user.fullNameAdmin}</Text>
            <Text size="xl">Должность: {user.jobTitles.jobName}</Text>
            <Text size="xl">Номер телефона: {user.contactMailAdmin}</Text>
            <Text size="xl">Почта: {user.contactPhoneAdmin}</Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs className={styles.tabs} value={activeTab} onChange={setActiveTab}>
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="one">Студенты</Tabs.Tab>
            <Tabs.Tab value="two">Группы</Tabs.Tab>
            <Tabs.Tab value="three">Учитиля</Tabs.Tab>
            <Tabs.Tab value="four">Работники</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="one">
            <div className={styles.wrapEditor}>
              <h2>Добавить</h2>
              <Input
                required
                size="md"
                placeholder="ФИО"
                value={studentAddFIO}
                onChange={(e) => setStudentAddFIO(e.target.value)}
              />
              <Input
                component={IMaskInput}
                mask={Date}
                size="md"
                placeholder="Дата рождения"
                value={studentAddAge}
                onChange={(e) => setStudentAddAge(e.target.value)}
              />
              <Input
                component={IMaskInput}
                mask={Date}
                size="md"
                placeholder="Дата поступления"
                value={studentAddEnrollment}
                onChange={(e) => setStudentAddEnrollment(e.target.value)}
              />
              <Select
                size="md"
                placeholder="Пол"
                data={['Жен', 'Муж']}
                value={studentAddGender}
                onChange={(value) => setStudentAddGender(value)}
              />
              <Select
                size="md"
                placeholder="Источник финансирования"
                data={['Платник', 'Бюджет']}
                value={studentAddBudget}
                onChange={(value) => setStudentAddBudget(value)}
              />
              <Select
                size="md"
                placeholder="Общежитие"
                data={['Общежитие не выдано', 'Общежитие выдано']}
                value={studentAddHostel}
                onChange={(value) => setStudentAddHostel(value)}
              />
              <Select
                size="md"
                data={groupName}
                value={studentAddGroup}
                onChange={(value) => setStudentAddGroup(value)}
                placeholder="Выберите группу"></Select>
              <Input
                size="md"
                placeholder="Логин"
                value={studentAddLogin}
                onChange={(e) => setStudentAddLogin(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Пароль"
                value={studentAddPassword}
                onChange={(e) => setStudentAddPassword(e.target.value)}
              />
              <Button
                size="md"
                variant="filled"
                onClick={() =>
                  addStudent(
                    studentAddFIO,
                    studentAddAge,
                    studentAddEnrollment,
                    studentAddGender,
                    studentAddBudget,
                    studentAddHostel,
                    studentAddGroup,
                    studentAddLogin,
                    studentAddPassword,
                  )
                }>
                Отправить
              </Button>
            </div>
            <div className={styles.wrapEditor}>
              <h2>Изменить</h2>
            </div>
            <div className={styles.wrapEditor}>
              <h2>Удалить</h2>
            </div>
            {user.students.map((student) => (
              <div className={styles.wrap}>
                <Text size="xl">AuthToken: {student.authToken}</Text>
                <Text size="xl">ID: {student.studentID}</Text>
                <Text size="xl">{student.fullNameStudent}</Text>
                <Text size="xl">{student.age.slice(0, -9)}</Text>
                <Text size="xl">{student.enrollmentDate.slice(0, -9)}</Text>
                <Text size="xl">{student.group.groupName}</Text>
                {student.budget === true ? (
                  <Text size="xl">Бюджет</Text>
                ) : (
                  <Text size="xl">Платник</Text>
                )}
                {student.hostelRent === true ? (
                  <Text size="xl">Общежитие выдано</Text>
                ) : (
                  <Text size="xl">Общежитие не выдано</Text>
                )}
              </div>
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="two"></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
export default Admin;

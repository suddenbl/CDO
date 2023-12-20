import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, setStudent, setTeacher } from '../../store/slices/adminSlice';
import { setGroup } from '../../store/slices/groupSlice';

import styles from './Admin.module.scss';
import { Text, Input, Button, Tabs, Select } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import Modal from 'react-modal';

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
        const responseTeacher = await axios.get(`http://localhost:5240/Teacher`);
        dispatch(setTeacher(responseTeacher.data));
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

  //////////////////////////
  // ФУНКЦИОНАЛ СТУДЕНТА //
  /////////////////////////

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
        contactMailStudent: '',
        contactPhoneStudent: '',
        gender: tempStudentAddGender,
        groupID: studentAddGroup,
        authToken: tempAuthToken,
        budget: tempStudentAddBudget,
        hostelRent: tempStudentAddHostel,
      });
      setStudentAddFIO('');
      setStudentAddAge('');
      setStudentAddEnrollment('');
      setStudentAddLogin('');
      setStudentAddPassword('');
      const responseStudent = await axios.get(`http://localhost:5240/Student`);
      dispatch(setStudent(responseStudent.data));
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentEditID, setStudentEditID] = useState('');
  const [studentEditParametr, setStudentEditParametr] = useState('');
  const [studentEditFIO, setStudentEditFIO] = useState('');
  const [studentEditAge, setStudentEditAge] = useState('');
  const [studentEditEnrollment, setStudentEditEnrollment] = useState('');
  const [studentEditGender, setStudentEditGender] = useState('');
  const [studentEditBudget, setStudentEditBudget] = useState('');
  const [studentEditHostel, setStudentEditHostel] = useState('');
  const [studentEditGroup, setStudentEditGroup] = useState('');

  let arr = [
    { value: '1', label: 'ФИО' },
    { value: '2', label: 'Группа' },
    { value: '3', label: 'Возраст' },
    { value: '4', label: 'Поступление' },
    { value: '7', label: 'Пол' },
    { value: '8', label: 'Финансирование' },
    { value: '9', label: 'Общежитие' },
  ];

  const openModal = (ID) => {
    setIsModalOpen(true);
    setStudentEditID(ID);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editStudent = async (
    studentEditFIO,
    studentEditAge,
    studentEditEnrollment,
    studentEditGender,
    studentEditBudget,
    studentEditHostel,
    studentEditGroup,
  ) => {
    let tempStudentEditGender = false;
    let tempStudentEditBudget = false;
    let tempStudentEditHostel = false;
    let tempStudentEditAge = new Date(studentEditAge);
    let tempStudentEditEnrollment = new Date(studentEditEnrollment);
    studentEditGender === 'Муж' ? (tempStudentEditGender = true) : (tempStudentEditGender = false);
    studentEditBudget === 'Бюджет'
      ? (tempStudentEditBudget = true)
      : (tempStudentEditBudget = false);
    studentEditHostel === 'Общежите выдано'
      ? (tempStudentEditHostel = true)
      : (tempStudentEditHostel = false);
    studentEditParametr === '1'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${studentEditFIO}`,
        )
      : studentEditParametr === '2'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${studentEditGroup}`,
        )
      : studentEditParametr === '3'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${tempStudentEditAge}`,
        )
      : studentEditParametr === '4'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${tempStudentEditEnrollment}`,
        )
      : studentEditParametr === '7'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${tempStudentEditGender}`,
        )
      : studentEditParametr === '8'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${tempStudentEditBudget}`,
        )
      : studentEditParametr === '9'
      ? await axios.put(
          `http://localhost:5240/Student/${studentEditID}/${studentEditParametr}/${tempStudentEditHostel}`,
        )
      : '';
    location.reload();
  };

  const deleteStudent = async (authToken) => {
    await axios.delete(`http://localhost:5240/Authorization/${authToken}`);
    const responseStudent = await axios.get(`http://localhost:5240/Student`);
    dispatch(setStudent(responseStudent.data));
  };

  const [groupAddName, setGroupAddName] = useState('');

  ////////////////////////
  // ФУНКЦИОНАЛ ГРУППЫ //
  ///////////////////////

  const addGroup = async (groupAddName) => {
    await axios.post('http://localhost:5240/Group', {
      groupName: groupAddName,
    });
    const responseGroup = await axios.get(`http://localhost:5240/Group`);
    dispatch(setGroup(responseGroup.data));
  };

  const deleteGroup = async (ID) => {
    await axios.delete(`http://localhost:5240/Group/${ID}`);
    const responseGroup = await axios.get(`http://localhost:5240/Group`);
    dispatch(setGroup(responseGroup.data));
  };

  /////////////////////////
  // ФУНКЦИОНАЛ УЧИТЕЛЯ //
  ////////////////////////

  const [teacherAddFIO, setTeacherAddFIO] = useState('');
  const [teacherAddPhone, setTeacherAddPhone] = useState('');
  const [teacherAddMail, setTeacherAddMail] = useState('');
  const [teacherAddLogin, setTeacherAddLogin] = useState('');
  const [teacherAddPassword, setTeacherAddPassword] = useState('');
  const [teacherAddJob, setTeacherAddJob] = useState('');

  const addTeacher = async () => {};

  return (
    <div className={styles.container}>
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
                <Button
                  variant="filled"
                  color="green"
                  size="md"
                  onClick={() => openModal(student.studentID)}>
                  Редактировать
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  size="md"
                  onClick={() => deleteStudent(student.authToken)}>
                  Удалить
                </Button>
              </div>
            ))}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
              <Select
                size="md"
                placeholder="Параметр"
                data={arr}
                value={studentEditParametr}
                onChange={(value) => setStudentEditParametr(value)}></Select>
              {studentEditParametr === '1' ? (
                <Input
                  required
                  size="md"
                  placeholder="ФИО"
                  value={studentEditFIO}
                  onChange={(e) => setStudentEditFIO(e.target.value)}
                />
              ) : studentEditParametr === '2' ? (
                <Select
                  size="md"
                  data={groupName}
                  value={studentEditGroup}
                  onChange={(value) => setStudentEditGroup(value)}
                  placeholder="Выберите группу"></Select>
              ) : studentEditParametr === '3' ? (
                <Input
                  component={IMaskInput}
                  mask={Date}
                  size="md"
                  placeholder="Дата рождения"
                  value={studentEditAge}
                  onChange={(e) => setStudentEditAge(e.target.value)}
                />
              ) : studentEditParametr === '4' ? (
                <Input
                  component={IMaskInput}
                  mask={Date}
                  size="md"
                  placeholder="Дата поступления"
                  value={studentEditEnrollment}
                  onChange={(e) => setStudentEditEnrollment(e.target.value)}
                />
              ) : studentEditParametr === '7' ? (
                <Select
                  size="md"
                  placeholder="Пол"
                  data={['Жен', 'Муж']}
                  value={studentEditGender}
                  onChange={(value) => setStudentEditGender(value)}
                />
              ) : studentEditParametr === '8' ? (
                <Select
                  size="md"
                  placeholder="Источник финансирования"
                  data={['Платник', 'Бюджет']}
                  value={studentEditBudget}
                  onChange={(value) => setStudentEditBudget(value)}
                />
              ) : studentEditParametr === '9' ? (
                <Select
                  size="md"
                  placeholder="Общежитие"
                  data={['Общежитие не выдано', 'Общежитие выдано']}
                  value={studentEditHostel}
                  onChange={(value) => setStudentEditHostel(value)}
                />
              ) : (
                ''
              )}
              <Button
                size="md"
                variant="filled"
                onClick={() =>
                  editStudent(
                    studentEditFIO,
                    studentEditAge,
                    studentEditEnrollment,
                    studentEditGender,
                    studentEditBudget,
                    studentEditHostel,
                    studentEditGroup,
                  )
                }>
                Отправить
              </Button>
            </Modal>
          </Tabs.Panel>
          <Tabs.Panel value="two">
            <div className={styles.wrapEditor}>
              <h2>Добавить</h2>
              <Input
                required
                size="md"
                placeholder="Название"
                value={groupAddName}
                onChange={(e) => setGroupAddName(e.target.value)}
              />
              <Button size="md" variant="filled" onClick={() => addGroup(groupAddName)}>
                Отправить
              </Button>
            </div>
            {group.arr.map((group) => (
              <div className={styles.wrap}>
                <Text size="xl">ID: {group.groupID}</Text>
                <Text size="xl">{group.groupName}</Text>
                <Button
                  variant="filled"
                  color="red"
                  size="md"
                  onClick={() => deleteGroup(group.groupID)}>
                  Удалить
                </Button>
              </div>
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="three">
            <div className={styles.wrapEditor}>
              <h2>Добавить</h2>
              <Input
                size="md"
                placeholder="ФИО"
                value={teacherAddFIO}
                onChange={(e) => setTeacherAddFIO(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Номер"
                value={teacherAddPhone}
                onChange={(e) => setTeacherAddPhone(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Почта"
                value={teacherAddMail}
                onChange={(e) => setTeacherAddMail(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Логин"
                value={teacherAddLogin}
                onChange={(e) => setTeacherAddLogin(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Пароль"
                value={teacherAddPassword}
                onChange={(e) => setTeacherAddPassword(e.target.value)}
              />
              <Button size="md" variant="filled" onClick={() => addTeacher(groupAddName)}>
                Отправить
              </Button>
            </div>
            {user.teachers.map((teacher) => (
              <div className={styles.wrap}>
                <Text size="xl">{teacher.fullNameTeacher}</Text>
                {/* <Button
                  variant="filled"
                  color="red"
                  size="md"
                  onClick={() => deleteGroup(group.groupID)}>
                  Удалить
                </Button> */}
              </div>
            ))}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
export default Admin;

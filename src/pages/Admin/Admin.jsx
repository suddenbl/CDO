import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAdmin,
  setStudent,
  setTeacher,
  setJob,
  setEmployee,
} from '../../store/slices/adminSlice';
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
        const responseJob = await axios.get(`http://localhost:5240/JobTitle`);
        dispatch(setJob(responseJob.data));
        const jobName = responseJob.data.map((job) => ({
          value: job.jobID.toString(),
          label: job.jobName,
        }));
        setJobName(jobName);
        const resposneEmployee = await axios.get(`http://localhost:5240/Employee`);
        dispatch(setEmployee(resposneEmployee.data));
      } catch (error) {
        console.log('Проблема в получении данных работника', error);
      }
    };
    fetchData();
  }, []);
  const [groupName, setGroupName] = useState([]);
  const [jobName, setJobName] = useState([]);

  /////////////////////////
  // ФУНКЦИОНАЛ СТУДЕНТА //
  /////////////////////////

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

  const [studentEditID, setStudentEditID] = useState('');
  const [studentEditParametr, setStudentEditParametr] = useState('');
  const [studentEditFIO, setStudentEditFIO] = useState('');
  const [studentEditAge, setStudentEditAge] = useState('');
  const [studentEditEnrollment, setStudentEditEnrollment] = useState('');
  const [studentEditGender, setStudentEditGender] = useState('');
  const [studentEditBudget, setStudentEditBudget] = useState('');
  const [studentEditHostel, setStudentEditHostel] = useState('');
  const [studentEditGroup, setStudentEditGroup] = useState('');

  let arrSelectStudent = [
    { value: '1', label: 'ФИО' },
    { value: '2', label: 'Группа' },
    { value: '3', label: 'Возраст' },
    { value: '4', label: 'Поступление' },
    { value: '7', label: 'Пол' },
    { value: '8', label: 'Финансирование' },
    { value: '9', label: 'Общежитие' },
  ];

  const [isModalStudentOpen, setIsModalStudentOpen] = useState(false);
  const openModalStudent = (ID) => {
    setIsModalStudentOpen(true);
    setStudentEditID(ID);
  };

  const closeModalStudent = () => {
    setIsModalStudentOpen(false);
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

  ///////////////////////
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

  ////////////////////////
  // ФУНКЦИОНАЛ УЧИТЕЛЯ //
  ////////////////////////

  const [teacherAddFIO, setTeacherAddFIO] = useState('');
  const [teacherAddPhone, setTeacherAddPhone] = useState('');
  const [teacherAddMail, setTeacherAddMail] = useState('');
  const [teacherAddLogin, setTeacherAddLogin] = useState('');
  const [teacherAddPassword, setTeacherAddPassword] = useState('');
  const [teacherAddJob, setTeacherAddJob] = useState('');

  const addTeacher = async (
    teacherAddFIO,
    teacherAddJob,
    teacherAddPhone,
    teacherAddMail,
    teacherAddLogin,
    teacherAddPassword,
  ) => {
    if (
      (teacherAddFIO &&
        teacherAddJob &&
        teacherAddPhone &&
        teacherAddMail &&
        teacherAddLogin &&
        teacherAddPassword) !== ''
    ) {
      await axios.post('http://localhost:5240/Authorization', {
        login: teacherAddLogin,
        password: teacherAddPassword,
        type: 'teacher',
      });

      const resAuth = await axios.get('http://localhost:5240/Authorization');
      console.log(resAuth);
      const tempAuthToken = resAuth.data[resAuth.data.length - 1].authToken;
      console.log(tempAuthToken);

      await axios.post('http://localhost:5240/Teacher', {
        fullNameTeacher: teacherAddFIO,
        contactMailTeacher: teacherAddMail,
        contactPhoneTeacher: teacherAddPhone,
        authToken: tempAuthToken,
        jobID: teacherAddJob,
      });
      const responseTeacher = await axios.get(`http://localhost:5240/Teacher`);
      dispatch(setTeacher(responseTeacher.data));
      setTeacherAddFIO('');
      setTeacherAddPhone('');
      setTeacherAddMail('');
      setTeacherAddLogin('');
      setTeacherAddPassword('');
    }
  };

  let arrSelectTeacher = [
    { value: '1', label: 'ФИО' },
    { value: '3', label: 'Почта' },
    { value: '4', label: 'Телефон' },
  ];

  const [isModalTeacherOpen, setIsModalTeacherOpen] = useState(false);

  const openModalTeacher = (ID) => {
    setIsModalTeacherOpen(true);
    setTeacherEditID(ID);
  };

  const closeModalTeacher = () => {
    setIsModalTeacherOpen(false);
  };

  const [teacherEditID, setTeacherEditID] = useState('');
  const [teacherEditParametr, setTeacherEditParametr] = useState('');
  const [teacherEditFIO, setTeacherEditFIO] = useState('');
  const [teacherEditPhone, setTeacherEditPhone] = useState('');
  const [teacherEditMail, setTeacherEditMail] = useState('');
  const editTeacher = async (teacherEditFIO, teacherEditMail, teacherEditPhone) => {
    teacherEditParametr === '1'
      ? await axios.put(
          `http://localhost:5240/Teacher/${teacherEditID}/${teacherEditParametr}/${teacherEditFIO}`,
        )
      : teacherEditParametr === '3'
      ? await axios.put(
          `http://localhost:5240/Teacher/${teacherEditID}/${teacherEditParametr}/${teacherEditMail}`,
        )
      : teacherEditParametr === '4'
      ? await axios.put(
          `http://localhost:5240/Teacher/${teacherEditID}/${teacherEditParametr}/${teacherEditPhone}`,
        )
      : '';
    location.reload();
  };

  const deleteTeacher = async (authToken) => {
    await axios.delete(`http://localhost:5240/Authorization/${authToken}`);
    const responseTeacher = await axios.get(`http://localhost:5240/Teacher`);
    dispatch(setTeacher(responseTeacher.data));
  };

  //////////////////////////
  // ФУНКЦИОНАЛ РАБОТНИКА //
  //////////////////////////
  const [employeeAddFIO, setEmployeeAddFIO] = useState('');
  const [employeeAddPhone, setEmployeeAddPhone] = useState('');
  const [employeeAddMail, setEmployeeAddMail] = useState('');
  const [employeeAddLogin, setEmployeeAddLogin] = useState('');
  const [employeeAddPassword, setEmployeeAddPassword] = useState('');
  const [employeeAddJob, setEmployeeAddJob] = useState('');

  const addEmployee = async (
    employeeAddFIO,
    employeeAddJob,
    employeeAddPhone,
    employeeAddMail,
    employeeAddLogin,
    employeeAddPassword,
  ) => {
    if (
      (employeeAddFIO &&
        employeeAddJob &&
        employeeAddPhone &&
        employeeAddMail &&
        employeeAddLogin &&
        employeeAddPassword) !== ''
    ) {
      await axios.post('http://localhost:5240/Authorization', {
        login: employeeAddLogin,
        password: employeeAddPassword,
        type: 'employee',
      });

      const resAuth = await axios.get('http://localhost:5240/Authorization');
      console.log(resAuth);
      const tempAuthToken = resAuth.data[resAuth.data.length - 1].authToken;
      console.log(tempAuthToken);

      await axios.post('http://localhost:5240/Employee', {
        fullNameEmployee: employeeAddFIO,
        contactMailEmployee: employeeAddMail,
        contactPhoneEmployee: employeeAddPhone,
        authToken: tempAuthToken,
        jobID: employeeAddJob,
      });

      setEmployeeAddFIO('');
      setEmployeeAddPhone('');
      setEmployeeAddMail('');
      setEmployeeAddLogin('');
      setEmployeeAddPassword('');
      const resposneEmployee = await axios.get(`http://localhost:5240/Employee`);
      dispatch(setEmployee(resposneEmployee.data));
    }
  };

  let arrSelectEmployee = [
    { value: '1', label: 'ФИО' },
    { value: '3', label: 'Почта' },
    { value: '4', label: 'Телефон' },
  ];

  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false);

  const openModalEmployee = (ID) => {
    setIsModalEmployeeOpen(true);
    setEmployeeEditID(ID);
  };

  const closeModalEmployee = () => {
    setIsModalTeacherOpen(false);
  };

  const [employeeEditID, setEmployeeEditID] = useState('');
  const [employeeEditParametr, setEmployeeEditParametr] = useState('');
  const [employeeEditFIO, setEmployeeEditFIO] = useState('');
  const [employeeEditPhone, setEmployeeEditPhone] = useState('');
  const [employeeEditMail, setEmployeeEditMail] = useState('');
  const editEmployee = async (employeeEditFIO, employeeEditMail, employeeEditPhone) => {
    employeeEditParametr === '1'
      ? await axios.put(
          `http://localhost:5240/Employee/${employeeEditID}/${employeeEditParametr}/${employeeEditFIO}`,
        )
      : employeeEditParametr === '3'
      ? await axios.put(
          `http://localhost:5240/Employee/${employeeEditID}/${employeeEditParametr}/${employeeEditMail}`,
        )
      : employeeEditParametr === '4'
      ? await axios.put(
          `http://localhost:5240/Employee/${employeeEditID}/${employeeEditParametr}/${employeeEditPhone}`,
        )
      : '';
    location.reload();
  };

  const deleteEmployee = async (authToken) => {
    await axios.delete(`http://localhost:5240/Authorization/${authToken}`);
    const resposneEmployee = await axios.get(`http://localhost:5240/Employee`);
    dispatch(setEmployee(resposneEmployee.data));
  };
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
              <div className={styles.wrapStudent}>
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
                  onClick={() => openModalStudent(student.studentID)}>
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
            <Modal isOpen={isModalStudentOpen} onRequestClose={closeModalStudent}>
              <Select
                size="md"
                placeholder="Параметр"
                data={arrSelectStudent}
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
              <div className={styles.wrapGroup}>
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
              <Select
                size="md"
                placeholder="Должность"
                data={jobName}
                value={teacherAddJob}
                onChange={(value) => setTeacherAddJob(value)}
              />
              <Input
                component={IMaskInput}
                mask={'8-000-000-00-00'}
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
              <Button
                size="md"
                variant="filled"
                onClick={() =>
                  addTeacher(
                    teacherAddFIO,
                    teacherAddJob,
                    teacherAddPhone,
                    teacherAddMail,
                    teacherAddLogin,
                    teacherAddPassword,
                  )
                }>
                Отправить
              </Button>
            </div>
            {user.teachers.map((teacher) => (
              <div className={styles.wrapTeacher}>
                <Text size="xl">authToken: {teacher.authToken}</Text>
                <Text size="xl">ID: {teacher.teacherID}</Text>
                <Text size="xl">{teacher.fullNameTeacher}</Text>
                <Text size="xl">{teacher.jobTitles.jobName}</Text>
                <Text size="xl">{teacher.contactMailTeacher}</Text>
                <Text size="xl">{teacher.contactPhoneTeacher}</Text>
                <Button
                  variant="filled"
                  color="green"
                  size="md"
                  onClick={() => openModalTeacher(teacher.teacherID)}>
                  Редактировать
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  size="md"
                  onClick={() => deleteTeacher(teacher.authToken)}>
                  Удалить
                </Button>
              </div>
            ))}
            <Modal isOpen={isModalTeacherOpen} onRequestClose={closeModalTeacher}>
              <Select
                size="md"
                placeholder="Параметр"
                data={arrSelectTeacher}
                value={teacherEditParametr}
                onChange={(value) => setTeacherEditParametr(value)}></Select>
              {teacherEditParametr === '1' ? (
                <Input
                  size="md"
                  placeholder="ФИО"
                  value={teacherEditFIO}
                  onChange={(e) => setTeacherEditFIO(e.target.value)}
                />
              ) : teacherEditParametr === '3' ? (
                <Input
                  size="md"
                  placeholder="Почта"
                  value={teacherEditMail}
                  onChange={(e) => setTeacherEditMail(e.target.value)}
                />
              ) : teacherEditParametr === '4' ? (
                <Input
                  component={IMaskInput}
                  mask={'8-000-000-00-00'}
                  size="md"
                  placeholder="Номер"
                  value={teacherEditPhone}
                  onChange={(e) => setTeacherEditPhone(e.target.value)}
                />
              ) : (
                ''
              )}
              <Button
                size="md"
                variant="filled"
                onClick={() => editTeacher(teacherEditFIO, teacherEditMail, teacherEditPhone)}>
                Отправить
              </Button>
            </Modal>
          </Tabs.Panel>
          <Tabs.Panel value="four">
            <div className={styles.wrapEditor}>
              <h2>Добавить</h2>
              <Input
                size="md"
                placeholder="ФИО"
                value={employeeAddFIO}
                onChange={(e) => setEmployeeAddFIO(e.target.value)}
              />
              <Select
                size="md"
                placeholder="Должность"
                data={jobName}
                value={employeeAddJob}
                onChange={(value) => setEmployeeAddJob(value)}
              />
              <Input
                component={IMaskInput}
                mask={'8-000-000-00-00'}
                size="md"
                placeholder="Номер"
                value={employeeAddPhone}
                onChange={(e) => setEmployeeAddPhone(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Почта"
                value={employeeAddMail}
                onChange={(e) => setEmployeeAddMail(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Логин"
                value={employeeAddLogin}
                onChange={(e) => setEmployeeAddLogin(e.target.value)}
              />
              <Input
                size="md"
                placeholder="Пароль"
                value={employeeAddPassword}
                onChange={(e) => setEmployeeAddPassword(e.target.value)}
              />
              <Button
                size="md"
                variant="filled"
                onClick={() =>
                  addEmployee(
                    employeeAddFIO,
                    employeeAddJob,
                    employeeAddPhone,
                    employeeAddMail,
                    employeeAddLogin,
                    employeeAddPassword,
                  )
                }>
                Отправить
              </Button>
            </div>
            {user.employees.map((employee) => (
              <div className={styles.wrapEmployee}>
                <Text size="xl">authToken: {employee.authToken}</Text>
                <Text size="xl">ID: {employee.employeeID}</Text>
                <Text size="xl">{employee.fullNameEmployee}</Text>
                <Text size="xl">{employee.jobTitles.jobName}</Text>
                <Text size="xl">{employee.contactMailEmployee}</Text>
                <Text size="xl">{employee.contactPhoneEmployee}</Text>
                <Button
                  variant="filled"
                  color="green"
                  size="md"
                  onClick={() => openModalEmployee(employee.employeeID)}>
                  Редактировать
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  size="md"
                  onClick={() => deleteEmployee(employee.authToken)}>
                  Удалить
                </Button>
              </div>
            ))}
            <Modal isOpen={isModalEmployeeOpen} onRequestClose={closeModalEmployee}>
              <Select
                size="md"
                placeholder="Параметр"
                data={arrSelectTeacher}
                value={employeeEditParametr}
                onChange={(value) => setEmployeeEditParametr(value)}></Select>
              {employeeEditParametr === '1' ? (
                <Input
                  size="md"
                  placeholder="ФИО"
                  value={employeeEditFIO}
                  onChange={(e) => setEmployeeEditFIO(e.target.value)}
                />
              ) : employeeEditParametr === '3' ? (
                <Input
                  size="md"
                  placeholder="Почта"
                  value={employeeEditMail}
                  onChange={(e) => setEmployeeEditMail(e.target.value)}
                />
              ) : employeeEditParametr === '4' ? (
                <Input
                  component={IMaskInput}
                  mask={'8-000-000-00-00'}
                  size="md"
                  placeholder="Номер"
                  value={employeeEditPhone}
                  onChange={(e) => setEmployeeEditPhone(e.target.value)}
                />
              ) : (
                ''
              )}
              <Button
                size="md"
                variant="filled"
                onClick={() => editEmployee(employeeEditFIO, employeeEditMail, employeeEditPhone)}>
                Отправить
              </Button>
            </Modal>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
export default Admin;

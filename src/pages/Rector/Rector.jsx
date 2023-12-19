import axios from 'axios';
import styles from './Rector.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setRector } from '../../store/slices/rectorSlice';
import { useEffect, useState } from 'react';
import { Button, Input, Tabs, Text, Textarea, Select } from '@mantine/core';

const Rector = () => {
  const rectorData = useSelector((state) => state.auth.user);
  const authToken = rectorData.authToken;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.rector);

  const [groupList, setGroupList] = useState([]);
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    const fetchRectorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Employee/${authToken}/authToken`);
        dispatch(setRector(response.data));
        console.log('Данные ректора: ', response.data);

        const groups = await axios.get('http://localhost:5240/Group');
        const groupsList = groups.data.map((group) => ({
          value: group.groupID.toString(),
          label: group.groupName,
        }));
        setGroupList(groupsList);

        const lessons = await axios.get('http://localhost:5240/Lesson');
        setLessonList(lessons.data);
        console.log("Lesson's data: ", lessons.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRectorData();
  }, []);

  const pushLoad = async (e, title, description, groupID) => {
    e.preventDefault();
    const parsedID = parseInt(groupID);

    try {
      const response = await axios.post('http://localhost:5240/StudyLoad/', {
        studyLoadHeader: title,
        studyLoadDescription: description,
        groupID: parsedID,
      });

      console.log('Load successful:', response.data);

      setLoadTitle('');
      setLoadDescription('');
      setLoadGroupName('');
      alert('Учебная нагрузка успешно отправлена');
    } catch (error) {
      console.log('Error with publishing load:', error);
    }
  };

  const [loadTitle, setLoadTitle] = useState('');
  const [loadDescription, setLoadDescription] = useState('');
  const [loadGroupName, setLoadGroupName] = useState('');

  const createMatrixLessons = () => {
    const scheduleByGroup = {};

    for (const lesson of lessonList) {
      const groupID = lesson.group.groupID;
      if (!scheduleByGroup[groupID]) {
        scheduleByGroup[groupID] = [
          [0, 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
          ['8:30-10:00', 0, 0, 0, 0, 0],
          ['10:20-11:50', 0, 0, 0, 0, 0],
          ['12:10-13:40', 0, 0, 0, 0, 0],
          ['14:00-15:30', 0, 0, 0, 0, 0],
          ['15:50-17:20', 0, 0, 0, 0, 0],
        ];
      }

      let y = lesson.dayOrder;
      let x = lesson.weekdays;
      scheduleByGroup[groupID][y][x] = lesson;
    }

    return scheduleByGroup;
  };

  const scheduleByGroup = createMatrixLessons();

  const [activeTab, setActiveTab] = useState('first');

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          className={styles.contentTopAvatar}
          width="300px"
          height="300px"
          src="https://i0.wp.com/eroskosmos.org/wp-content/uploads/2014/02/16-Yoda-Empire-star-wars-e1392547687502.jpg?fit=554%2C523&ssl=1"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <div className={styles.userInfoList}>
            <Text size="xl" className={styles.userInfoListItem}>
              ФИО: {user.fullNameRector}
            </Text>
            <Text size="xl">Должность: {user.jobTitles.jobName}</Text>
            <Text size="xl" className={styles.userInfoListItem}>
              Номер телефона: {user.contactPhoneRector}
            </Text>
            <Text size="xl" className={styles.userInfoListItem}>
              Почта: {user.contactMailRector}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs className={styles.tabs} value={activeTab} onChange={setActiveTab} color="indigo">
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="first">Учебный план</Tabs.Tab>
            <Tabs.Tab value="second">Работа с расписанием</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first">
            <form className={styles.publishForm}>
              <Text>Заголовок</Text>
              <Input
                size="md"
                type="text"
                value={loadTitle}
                onChange={(e) => setLoadTitle(e.target.value)}
              />
              <Text>Ссылка</Text>
              <Textarea
                size="md"
                className={styles.textarea}
                value={loadDescription}
                onChange={(e) => setLoadDescription(e.target.value)}
              />
              <Text>Выберите группу:</Text>
              <Select
                data={groupList}
                value={loadGroupName}
                onChange={(value) => setLoadGroupName(value)}
                placeholder="Выберите группу"></Select>
              <Button
                type="submit"
                onClick={(e) => pushLoad(e, loadTitle, loadDescription, loadGroupName)}>
                Опубликовать материал
              </Button>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="second">
            <Select
              data={groupList}
              value={loadGroupName}
              onChange={(value) => setLoadGroupName(value)}
              placeholder="Выберите группу"
            />
            <div className={styles.scheduleWrap}>
              {scheduleByGroup[loadGroupName]?.map((matrixLesson, rowIndex) =>
                matrixLesson.map((lesson, colIndex) =>
                  lesson === 0 ? (
                    <div className={styles.scheduleWrapTarget} key={colIndex}></div>
                  ) : typeof lesson === 'string' ? (
                    <div className={styles.scheduleWrapTarget} key={colIndex}>
                      <Text size="xl" className={styles.scheduleTextStirng}>
                        {lesson}
                      </Text>
                    </div>
                  ) : (
                    <div className={styles.scheduleWrapTarget} key={colIndex}>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Rector;

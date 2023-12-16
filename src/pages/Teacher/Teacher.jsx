import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setGroup,
  setLessons,
  setStudentsInGroup,
  setTeacher,
} from '../../store/slices/teacherSlice'
import styles from './Teacher.module.scss'
import { Button, Input, List, Tabs, Text, Textarea } from '@mantine/core'

const Teacher = () => {
  const teacherData = useSelector((state) => state.auth.user)
  const authToken = teacherData.authToken

  const user = useSelector((state) => state.teacher)
  const dispatch = useDispatch()

  const lessonsSearch = async (teacherID) => {
    try {
      const response = await axios.get(`http://localhost:5240/Lesson/${teacherID}`)
      console.log('Lessons data: ', response.data)
      dispatch(setLessons(response.data))
      return response.data
    } catch (error) {
      console.log('Ошибка при получении данных уроков: ', error)
      throw error
    }
  }

  const groupSearch = async (groupID) => {
    try {
      const response = await axios.get(`http://localhost:5240/Group/${groupID}`)
      console.log('Group data: ', response.data)
      dispatch(setGroup(response.data))
      return response.data
    } catch (error) {
      console.log('Ошибка при получении данных группы: ', error)
      throw error
    }
  }

  const searchStudentsFromGroup = async (groupID) => {
    try {
      const response = await axios.get(`http://localhost:5240/Student/${groupID}/groupID`)
      console.log('Students data: ', response.data)
      dispatch(setStudentsInGroup({ groupID, students: response.data }))
      return response.data
    } catch (error) {
      console.log('Ошибка при получении данных студентов из группы: ', error)
      throw error
    }
  }

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Teacher/${authToken}/authToken`)
        console.log('Teacher data: ', response.data)
        dispatch(setTeacher(response.data))

        const lessons = await lessonsSearch(response.data.teacherID)
        setLessons(lessons)
        const group = await groupSearch(lessons.groupID)
        await searchStudentsFromGroup(group.groupID)

        const initialDisplayState = group.students.reduce((acc, student) => {
          acc[student.studentID] = false
          return acc
        }, {})
        setDisplayMarks(initialDisplayState)
      } catch (error) {
        console.log('Ошибка при получении данных в useEffect() : ', error)
      }
    }

    fetchTeacherData()
  }, [])

  const [mark, setMark] = useState(0)
  const [rating, setRating] = useState([])

  const getMarkForStudent = async (studentID, lessonID) => {
    try {
      const res = await axios.get(`http://localhost:5240/Journal/${studentID}/studentID`)
      console.log('getMarks', res.data)
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].lessonID === lessonID) {
          setMark(res.data[i].mark)
          setRating(res.data[i].rating)
          setDisplayMarks((prevDisplayMarks) => ({
            ...prevDisplayMarks,
            [studentID]: !prevDisplayMarks[studentID],
          }))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setMarkForStudent = async (teacherID, studentID, order) => {
    try {
      const res = await axios.get(`http://localhost:5240/Lesson/${teacherID}`)
      const lessonID = res.data.lessonID
      // const journal = await axios.get(`http://localhost:5240/Journal/${lessonID}/lessonID`);
      const mark = prompt('Напишите оценку')
      await axios.put(`http://localhost:5240/Journal/${studentID}/${lessonID}/${order}/${mark}`)
    } catch (error) {
      console.log(error)
    }
  }

  const [publicationTitle, setPublicationTitle] = useState('')
  const [publicationDescription, setPublicationDescription] = useState('')

  const setPublicationForStudent = async (e, title, description, lessonID) => {
    e.preventDefault()
    axios.post('http://localhost:5240/Addon', {
      addonHeader: title,
      addonDescription: description,
      lessonID: lessonID,
    })
    console.log('Запись добавлена')
  }

  const [activeTab, setActiveTab] = useState('first')
  const [displayMarks, setDisplayMarks] = useState({})

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          className={styles.contentTopAvatar}
          src="https://kilinson.com/wa-data/public/blog/plugins/attachment/1/500/picture/platon012.jpg"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <div className={styles.userInfoList}>
            <Text size="xl">ФИО: {user.name}</Text>
            <Text size="xl">Должность: преподаватель</Text>
            <Text size="xl">Номер телефона: {user.contactPhone}</Text>
            <Text size="xl">Почта: {user.contactMail}</Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs className={styles.tabs} value={activeTab} onChange={setActiveTab} color="indigo">
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="first">Мои группы</Tabs.Tab>
            <Tabs.Tab value="second">Публикация материалов</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first">
            <Text size="xl" className={styles.listTitle}>
              Список групп:{' '}
            </Text>
            <List type="unordered" withPadding>
              {user.group.map((group) => (
                <List.Item key={group.groupID}>
                  <Text size="lg">{group.groupName}</Text>
                  {group.students && (
                    <List type="ordered">
                      {group.students.map((student) => (
                        <List.Item key={student.studentID}>
                          <Text size="md" className={styles.mb10}>
                            {student.fullNameStudent}
                          </Text>
                          <div className={styles.gradesButtonBlock}>
                            <Button
                              className={styles.actualGradesBlock}
                              onClick={() => getMarkForStudent(student.studentID)}>
                              <Text size="md">Показать оценки:</Text>
                            </Button>
                            {displayMarks[student.studentID] && (
                              <div className={styles.actualGrades}>
                                <Text size="xs">Оценка за зачет: {mark}</Text>
                                <Text size="xs">
                                  Оценка за 1 рейтинг: {rating[0] ? rating[0] : 'Нет оценки'}
                                </Text>
                                <Text size="xs">
                                  Оценка за 2 рейтинг: {rating[1] ? rating[1] : 'Нет оценки'}
                                </Text>
                                <Text size="xs">
                                  Оценка за 3 рейтинг: {rating[2] ? rating[2] : 'Нет оценки'}
                                </Text>
                              </div>
                            )}

                            <div className={styles.actualGradesButtons}>
                              <Button
                                variant="outline"
                                className={styles.listButton}
                                onClick={() => setMarkForStudent(user.id, student.studentID, 1)}>
                                <Text size="xs">Добавить оценку за зачет \ экзамен</Text>
                              </Button>
                              <Button
                                variant="outline"
                                className={styles.listButton}
                                onClick={() => setMarkForStudent(user.id, student.studentID, 2)}>
                                <Text size="xs">Добавить оценку за 1 рейтинг</Text>
                              </Button>
                              <Button
                                variant="outline"
                                className={styles.listButton}
                                onClick={() => setMarkForStudent(user.id, student.studentID, 3)}>
                                <Text size="xs">Добавить оценку за 2 рейтинг</Text>
                              </Button>
                              <Button
                                variant="outline"
                                className={styles.listButton}
                                onClick={() => setMarkForStudent(user.id, student.studentID, 4)}>
                                <Text size="xs">Добавить оценку за 3 рейтинг</Text>
                              </Button>
                            </div>
                          </div>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </List.Item>
              ))}
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="second">
            <Text className={styles.listTitle} size="xl">
              Что хотим опубликовать?
            </Text>
            <form className={styles.publishForm}>
              <Text>Заголовок объявления</Text>
              <Input
                size="md"
                type="text"
                value={publicationTitle}
                onChange={(e) => setPublicationTitle(e.target.value)}
              />
              <Text>Текст объявления</Text>
              <Textarea
                size="md"
                className={styles.textarea}
                value={publicationDescription}
                onChange={(e) => setPublicationDescription(e.target.value)}
              />
              <Button
                type="submit"
                onClick={(e) =>
                  setPublicationForStudent(
                    e,
                    publicationTitle,
                    publicationDescription,
                    user.lessons.lessonID,
                  )
                }>
                Опубликовать материал
              </Button>
            </form>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default Teacher

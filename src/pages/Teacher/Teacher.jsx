import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTeacher } from '../../store/slices/teacherSlice'
import styles from './Teacher.module.scss'
import { Button, Input, List, Tabs, Text, Textarea } from '@mantine/core'

const Teacher = () => {
  const teacherAuth = useSelector((state) => state.auth.user)
  const teacherAuthToken = teacherAuth.authToken
  const user = useSelector((state) => state.teacher)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTeacherData = async () => {
      const response = await axios.get(
        `http://localhost:5240/Teacher/${teacherAuthToken}/authToken`,
      )
      dispatch(setTeacher(response.data))
      console.log('Teacher data: ', response.data)
    }

    fetchTeacherData()
  }, [])

  const [marks, setMarks] = useState({})

  const getMarksForStudent = async (studentID, groupID, lessonID) => {
    try {
      const marks = await axios.get(
        `http://localhost:5240/Journal/${studentID}/${groupID}/${lessonID}`,
      )
      setMarks(marks.data)
    } catch (error) {
      console.log('Ошибка при получении оценок студента', error)
    }
  }

  const setMarkForStudent = async (studentID, lessonID, param) => {
    try {
      const value = window.prompt('Какую оценку поставим нашему непутёвому?')
      axios.put(`http://localhost:5240/Journal/${studentID}/${lessonID}/${param}/${value}`)
    } catch (error) {
      console.log('Произошла ошибка при выставлении оценки: ', error)
    }
  }

  const pushPublication = async (e, title, description, lessonID) => {
    e.preventDefault
    try {
      await axios.post('http://localhost:5240/Addon', {
        addonHeader: title,
        addonDescription: description,
        lessonID: lessonID,
      })
    } catch (error) {
      console.log('Произошла ошибка при публикации материалов', error)
    }
  }

  const [publicationTitle, setPublicationTitle] = useState('')
  const [publicationDescription, setPublicationDescription] = useState('')

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [activeTab, setActiveTab] = useState('first')
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
            <Text size="xl">Должность: {user.jobTitles.jobName}</Text>
            <Text size="xl">Номер телефона: {user.contactPhone}</Text>
            <Text size="xl">Почта: {user.contactMail}</Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs className={styles.tabs} value={activeTab} onChange={setActiveTab} color="indigo">
          <Tabs.List className={styles.tabsList} grow>
            <Tabs.Tab value="first">Мои занятия</Tabs.Tab>
            <Tabs.Tab value="second">Публикация материалов для студентов</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first">
            <List className={styles.lessonsList} type="ordered" withPadding>
              {user.lessons.map((lesson) => (
                <List.Item key={lesson.lessonID}>
                  <Text size="xl">{lesson.subject.subjectName}</Text>
                  <Text size="xl">Аудитория : {lesson.classroom}</Text>
                  <div>
                    <Text size="xl">Группа: {lesson.group.groupName}</Text>
                    <List className={styles.groupsList} type="ordered" withPadding>
                      {lesson.group.students.map((student) => (
                        <List.Item key={student.studentID}>
                          <Text size="xl">{student.fullNameStudent}</Text>
                          <Text>Почта: {student.contactMailStudent}</Text>
                          <Button
                            onClick={() => {
                              setSelectedStudent(student.studentID)
                              getMarksForStudent(
                                student.studentID,
                                student.groupID,
                                lesson.lessonID,
                              )
                            }}>
                            <Text>Просмотреть оценки</Text>
                          </Button>
                          <div>
                            <div className={styles.actualGrades}>
                              {selectedStudent === student.studentID && marks.rating && (
                                <>
                                  <Text>Зачет\экзамен: {marks.mark}</Text>
                                  <Text>Рейтинг 1: {marks.rating[0]}</Text>
                                  <Text>Рейтинг 2: {marks.rating[1]}</Text>
                                  <Text>Рейтинг 3: {marks.rating[2]}</Text>
                                </>
                              )}
                            </div>
                            <Text size="xl">Поставить оценку:</Text>
                            <div className={styles.actualGradesButtons}>
                              <Button
                                onClick={() =>
                                  setMarkForStudent(selectedStudent, lesson.lessonID, 2)
                                }>
                                1 рейтинг
                              </Button>
                              <Button
                                onClick={() =>
                                  setMarkForStudent(selectedStudent, lesson.lessonID, 3)
                                }>
                                2 рейтинг
                              </Button>
                              <Button
                                onClick={() =>
                                  setMarkForStudent(selectedStudent, lesson.lessonID, 4)
                                }>
                                3 рейтинг
                              </Button>
                              <Button
                                onClick={() =>
                                  setMarkForStudent(selectedStudent, lesson.lessonID, 1)
                                }>
                                Зачет\Экзамен
                              </Button>
                            </div>
                          </div>
                        </List.Item>
                      ))}
                    </List>
                  </div>
                </List.Item>
              ))}
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="second">
            <Text className={styles.listTitle} size="xl">
              Что хотим опубликовать?
            </Text>
            <form className={styles.publishForm}>
              <Text>Заголовок</Text>
              <Input
                size="md"
                type="text"
                value={publicationTitle}
                onChange={(e) => setPublicationTitle(e.target.value)}
              />
              <Text>Текст</Text>
              <Textarea
                size="md"
                className={styles.textarea}
                value={publicationDescription}
                onChange={(e) => setPublicationDescription(e.target.value)}
              />
              <Button
                type="submit"
                onClick={(e) =>
                  pushPublication(
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

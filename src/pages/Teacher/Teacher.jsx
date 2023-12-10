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

import { Button, List, Tabs, Text } from '@mantine/core'

const Teacher = () => {
  const teacherData = useSelector((state) => state.auth.user)
  const authToken = teacherData.authToken

  const user = useSelector((state) => state.teacher)
  const dispatch = useDispatch()

  const getInformationAboutStudent = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:5240/Student/${studentId}`)
      console.log('1 student data: ', response)
      dispatch(setStudent(response.data))
    } catch (error) {
      console.log('Ошибка при получении данных 1 студента: ', error)
      throw error
    }
  }

  const lessonsSearch = async (teacherID) => {
    try {
      const response = await axios.get(`http://localhost:5240/Lesson/${teacherID}`)
      console.log('Lessons data: ', response.data)
      dispatch(setLessons(response.data))
      return response.data
    } catch (error) {
      console.log('Ошибка при получении данных уроков: ', error)
      throw error // Прокидываем ошибку для обработки в вызывающей функции
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
        const group = await groupSearch(lessons.groupID)
        await searchStudentsFromGroup(group.groupID)
      } catch (error) {
        console.log('Ошибка при получении данных в общем: ', error)
      }
    }

    fetchTeacherData()
  }, [])

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
            <Text size="xl">Номер телефона: {user.contactPhone}</Text>
            <Text size="xl">Почта: {user.contactMail}</Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Tabs
          className={styles.tabs}
          value={activeTab}
          onChange={setActiveTab}
          orientation="vertical">
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
                    <List type="ordered" withPadding>
                      {group.students.map((student) => (
                        <List.Item key={student.studentID}>
                          {student.fullNameStudent}
                          <Button className={styles.listButton}>Добавить оценку</Button>
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
              Что хотим опубликовать?{' '}
            </Text>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default Teacher

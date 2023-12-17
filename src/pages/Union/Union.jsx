import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setUnion } from '../../store/slices/unionSlice'
import { Button, Input, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from './Union.module.scss'

const Union = () => {
  const unionData = useSelector((state) => state.auth.user)
  const authToken = unionData.authToken
  const dispatch = useDispatch()
  const user = useSelector((state) => state.union)

  dayjs.extend(customParseFormat)

  useEffect(() => {
    const fetchUnionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Employee/${authToken}/authToken`)
        dispatch(setUnion(response.data))
        console.log(response.data)
      } catch (error) {
        console.log('Ошибка при получении данные профсоюза', error)
      }
    }

    fetchUnionData()
  }, [])

  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventTime, setEventTime] = useState(null)

  const pushPublication = async (e, title, description, date) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5240/Event', {
        eventHeader: title,
        eventDescription: description,
        eventDate: date,
      })

      console.log('Отправка прошла успешно: ', response.data)
      setEventTitle('')
      setEventDescription('')
      setEventTime(null)
      alert('Публикация успешно создана')
    } catch (error) {
      console.log('Произошла ошибка при отправке данных о мероприятии:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          className={styles.contentTopAvatar}
          width="300px"
          height="300px"
          src="https://vgudok.com/sites/default/files/styles/1040x570/public/field/image/profsoyuz_obl.jpg?itok=2AI9Xui2"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <div className={styles.userInfoList}>
            <Text size="xl" className={styles.userInfoListItem}>
              ФИО: {user.fullNameUnion}
            </Text>
            <Text size="xl" className={styles.userInfoListItem}>
              Пол: {user.gender == true ? 'Мужской ' : 'Женский'}
            </Text>
            <Text size="xl">Должность: {user.jobTitles.jobName}</Text>
            <Text size="xl" className={styles.userInfoListItem}>
              Номер телефона: {user.contactPhoneUnion}
            </Text>
            <Text size="xl" className={styles.userInfoListItem}>
              Почта: {user.contactMailUnion}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <Text size="xl">Разместить мероприятие: </Text>

        <form className={styles.publishForm}>
          <Text size="lg">Название мероприятия</Text>
          <Input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
          <Text size="lg">Описание мероприятия</Text>
          <Input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <Text size="md">Время мероприятия: </Text>
          <DateInput
            valueFormat="DD/MM/YYYY HH:mm:ss"
            value={eventTime}
            onChange={(value) => setEventTime(value)}
          />
          <Button
            type="submit"
            onClick={(e) => pushPublication(e, eventTitle, eventDescription, eventTime)}>
            Опубликовать мероприятие
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Union

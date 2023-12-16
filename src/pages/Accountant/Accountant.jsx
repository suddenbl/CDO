import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountant } from '../../store/slices/accountantSlice'
import styles from './Accountant.module.scss'
import { Text } from '@mantine/core'

function Accountant() {
  const accountantData = useSelector((state) => state.auth.user)
  const authToken = accountantData.authToken

  const user = useSelector((state) => state.accountant)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5240/Employee/${authToken}/authToken`)
        dispatch(setAccountant(response.data))
      } catch (error) {
        console.log('Проблема в получении данных работника', error)
      }
    }
    fetchData()
  }, [])

  const [inputOne, setInputOne] = useState('')
  const [inputTwo, setInputTwo] = useState('')
  async function submitPayment(e) {
    e.preventDefault()
    axios.post('http://localhost:5240/Payment', {
      paymentType: 'Выплата стипендии',
      paymentCost: +inputOne,
      paymentDate: new Date(),
      studentID: +inputTwo,
    })
    setInputOne('')
    setInputTwo('')
  }
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
        <div>
          <h2>Проставить стипендию</h2>
          <form onSubmit={submitPayment}>
            <input
              required
              type="number"
              placeholder="Сумма"
              value={inputOne}
              onChange={(event) => setInputOne(event.target.value)}
            />
            <input
              required
              type="number"
              placeholder="ID студента"
              value={inputTwo}
              onChange={(event) => setInputTwo(event.target.value)}
            />
            <button>Отправить</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Accountant

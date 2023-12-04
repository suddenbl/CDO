import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStudent } from '../../store/slices/studentSlice'
import styles from './Student.module.scss'

const Student = () => {
  // const { userType, authToken } = useParams()
  const studentData = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  console.log(studentData)

  const authToken = studentData.user.authToken

  React.useEffect(() => {
    axios
      .get(`http://localhost:5240/Student/${authToken}/authToken`)
      .then((res) => {
        console.log(res)
        dispatch(setStudent(res.data))
      })
      .catch((error) => {
        console.log('все хуёво 2', error)
      })
  }, [])

  const user = useSelector((state) => state.student)

  const dateOfBirth = new Date(user.age).toLocaleDateString('ru-RU')

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          width="300px"
          height="300px"
          src="https://basket-04.wb.ru/vol634/part63414/63414239/images/big/1.jpg"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <ul className={styles.userInfoList}>
            <li className={styles.userInfoListItem}>ФИО: {user.name}</li>
            <li className={styles.userInfoListItem}>
              Пол: {user.gender == true ? 'Мужской ' : 'Женский'}
            </li>
            <li className={styles.userInfoListItem}>Дата рождения: {dateOfBirth}</li>
            <li className={styles.userInfoListItem}>Группа: {user.group}</li>
            <li className={styles.userInfoListItem}>
              Номер телефона: {user.contactPhone}
            </li>
            <li className={styles.userInfoListItem}>Почта: {user.contactMail}</li>
          </ul>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <h4 className={styles.contentBottomTitle}>Доступные действия:</h4>
        {/* {userType === 'Student' && ( */}
        <ul className={styles.actions}>
          <li className={styles.actionsItem}>
            <button>Внесение данных о студенте</button>
          </li>
        </ul>
        {/* )} */}
        {/* <Actions userType={userType} /> */}
      </div>
    </div>
  )
}

export default Student

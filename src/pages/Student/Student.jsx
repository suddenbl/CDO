import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setStudent } from '../../store/slices/studentSlice'
import styles from './Student.module.scss'

const Student = () => {
  const { userType, authToken } = useParams()
  const dispatch = useDispatch()

  console.log(userType)

  React.useEffect(() => {
    axios
      .get(`http://localhost:5240/Student/${authToken}/authToken`)
      .then((res) => {
        dispatch(setStudent(res.data))
      })
      .catch((error) => {
        console.log('все хуёво 2', error)
      })
  }, [])

  const user = useSelector((state) => state.student)

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
            <li className={styles.userInfoListItem}>{user.name}</li>
            <li className={styles.userInfoListItem}>Дата рождения: {user.dateOfBirth}</li>
            <li className={styles.userInfoListItem}>Группа: {user.group}</li>
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

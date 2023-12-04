import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTeacher } from '../../store/slices/teacherSlice'
import styles from './Teacher.module.scss'

const Teacher = () => {
  const { userType, userId } = useParams()
  const dispatch = useDispatch()

  console.log(userType)

  React.useEffect(() => {
    axios
      .get(`http://localhost:5420/Teacher/${userId}`)
      .then((res) => {
        dispatch(setTeacher(res.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const user = useSelector((state) => state.teacher)

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
            <li className={styles.userInfoListItem}>{user.fullNameTeacher}</li>
            <li className={styles.userInfoListItem}>Должность: {user.jobId}</li>
          </ul>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <h4 className={styles.contentBottomTitle}>Доступные действия:</h4>
        <ul className={styles.actions}>
          <li className={styles.actionsItem}>
            <button>Въебать неуд</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Teacher

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTeacher } from '../../store/slices/teacherSlice'
import { useEffect } from 'react'
import styles from './Teacher.module.scss'

const Teacher = () => {
  const teacherData = useSelector((state) => state.auth.user)
  const authToken = teacherData.authToken

  console.log(authToken)

  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get(`http://localhost:5420/Teacher/${authToken}/authToken`)
      .then((res) => {
        console.log('jopa')
        dispatch(setTeacher(res.data))
      })
      .catch(() => {
        console.log('все хуево 3')
      })
  }, [])

  const user = useSelector((state) => state.teacher)

  // console.log(user)

  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <img
          width="300px"
          height="300px"
          src="https://kilinson.com/wa-data/public/blog/plugins/attachment/1/500/picture/platon012.jpg"
          alt="Аватарка"
        />
        <div className={styles.userInfo}>
          <ul className={styles.userInfoList}>
            <li className={styles.userInfoListItem}>ФИО: {user.name}</li>
            <li className={styles.userInfoListItem}>Должность: {user.jobId}</li>
            <li className={styles.userInfoListItem}>
              Номер телефона: {user.contactPhone}
            </li>
            <li className={styles.userInfoListItem}>Почта: {user.contactMail}</li>
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

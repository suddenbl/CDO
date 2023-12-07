import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTeacher } from '../../store/slices/teacherSlice'
import { useState, useEffect } from 'react'
import styles from './Teacher.module.scss'

const Teacher = () => {
  const teacherData = useSelector((state) => state.auth.user)
  const authToken = teacherData.authToken

  console.log(authToken)

  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get(`http://localhost:5240/Teacher/${authToken}/authToken`)
      .then((res) => {
        console.log(res.data)
        dispatch(setTeacher(res.data))
      })
      .catch(() => {
        console.log('все хуево - препод')
      })
  }, [])

  const [student, setStudent] = useState({})
  const [studentId, setStudentId] = useState(0)

  const getInformationAboutStudent = (studentId) => {
    axios
      .get(`http://localhost:5240/Student/${studentId}`)
      .then((res) => {
        console.log(res.data)
        setStudent(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const user = useSelector((state) => state.teacher)

  console.log(Object.keys(student))

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
            <label>
              Введите ID студента
              <input
                type="number"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </label>
            <button onClick={() => getInformationAboutStudent(studentId)}>
              Показать информацию о студенте
            </button>
          </li>
        </ul>
        <div className={styles.result}>
          {Object.keys(student).length > 0 ? (
            <div>
              <div>{student.fullNameStudent}</div>
              <div>{student.studentId}</div>
              <div>{student.age}</div>
              <div>{student.enrollmentDate}</div>
              <div>{student.contactMailStudent}</div>
              <div>{student.contactPhoneStudent}</div>
              <div>{student.gender}</div>
            </div>
          ) : (
            <div>Ошибка 404. Пользователь не найден!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Teacher

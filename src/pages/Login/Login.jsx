import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/slices/authSlice'
import styles from './Login.module.scss'

export const userTypes = {
  Guest: 'guest',
  Student: 'student',
  Union: 'union',
  Teacher: 'teacher',
  Rector: 'rector',
  Admin: 'admin',
  Accountant: 'accountant',
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [user, setUser] = React.useState('')
  const [pass, setPass] = React.useState('')

  const handleClick = (user, pass) => {
    axios
      .get(`http://localhost:5240/Authorization/${user}/${pass}`, { user, pass })
      .then((res) => {
        dispatch(login(res.data))
        return res.data
      })
      .then((res) => {
        console.log(res)
        navigate(`/${res.type}/${res.authToken}`)
      })
      .catch((error) => {
        console.error('все хуёво', error)
      })
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.loginTitle}>Войти в систему</h1>
      <div className={styles.loginBlock}>
        <input
          className={styles.input}
          type="text"
          value={user}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          value={pass}
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button className={styles.button} onClick={() => handleClick(user, pass)}>
          Отправить
        </button>
      </div>
    </div>
  )
}

export default Login

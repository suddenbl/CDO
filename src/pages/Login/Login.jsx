import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/slices/authSlice'
import styles from './Login.module.scss'

import { Button, Input, Title } from '@mantine/core'

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

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleClick = (user, pass) => {
    axios
      .get(`http://localhost:5240/Authorization/${user}/${pass}`, { user, pass })
      .then((res) => {
        console.log('LOGIN', res.data)
        dispatch(login(res.data))
        return res.data
      })
      .then((res) => {
        navigate(`/${res.type}/${res.authToken}`)
      })
      .catch((error) => {
        console.error('все хуёво', error)
      })
  }

  return (
    <div className={styles.login}>
      <Title order={2} size="h3" className={styles.loginTitle}>
        Войти в систему
      </Title>
      <div className={styles.loginBlock}>
        <Input
          size="md"
          radius="md"
          type="text"
          value={user}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          size="md"
          radius="md"
          type="password"
          value={pass}
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <Button className={styles.button} onClick={() => handleClick(user, pass)}>
          Отправить
        </Button>
      </div>
    </div>
  )
}

export default Login

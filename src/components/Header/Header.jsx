import { Button, Title } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'
import styles from './Header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Title className={styles.headerTitle} order={1} size="h2">
          CDO. Личный кабинет
        </Title>
        <div className={styles.wrapperBlock}>
          <Button onClick={() => handleLogout()}>Выйти</Button>
        </div>
      </div>
    </header>
  )
}

export default Header

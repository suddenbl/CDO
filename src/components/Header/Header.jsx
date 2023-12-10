import React from 'react'

import { Button, Title } from '@mantine/core'
import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Title order={1}>CDO. Личный кабинет</Title>
        <div className={styles.wrapperBlock}>
          <Button>Выйти</Button>
        </div>
      </div>
    </header>
  )
}

export default Header

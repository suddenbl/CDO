// import React from 'react';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>CDO</h1>
        <div className={styles.wrapperBlock}>
          <button className={styles.wrapperLogin}>Войти в систему</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

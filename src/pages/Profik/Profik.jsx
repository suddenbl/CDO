// import React from 'react';

import styles from './Profik.module.scss';

const profik = {
  name: 'profik',
};

const Profik = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content__top}>
        <h3>{Profik.name}</h3>
      </div>
      <div className={styles.content__bottom}>
        <div>МЕРОПРИЯТИЯ</div>
      </div>
    </div>
  );
};

export default Profik;

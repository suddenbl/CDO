import React from 'react';
import Header from './components/Header/Header';
import Student from './pages/Student';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

import styles from './scss/app.module.scss';

function App() {
  return (
    <div className={styles.appStart}>
      <Header />
      <main>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Student />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

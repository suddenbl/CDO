import React from 'react';
import Header from './components/Header/Header';
import Student from './pages/Student/Student';
import NotFound from './pages/NotFound/NotFound';
import Profik from './pages/Profik/Profik';
import Teacher from './pages/Teacher/Teacher';
import { Routes, Route } from 'react-router-dom';

import styles from './scss/app.module.scss';

function App() {
  return (
    <div className={styles.appStart}>
      <Header />
      <main>
        <div className={styles.content}>
          <Routes>
            <Route path="/Student" element={<Student />}></Route>
            <Route path="/Profik" element={<Profik />}></Route>
            <Route path="/Teacher" element={<Teacher />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

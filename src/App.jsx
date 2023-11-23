import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Student from './pages/Student/Student';
import Teacher from './pages/Teacher/Teacher';

import styles from './scss/app.module.scss';

function App() {
  return (
    <div className={styles.appStart}>
      <Header />
      <main>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/student/:userId" element={<Student />} />
            <Route path="/teacher/:userId" element={<Teacher />} />
            {/* <Route path="/admin/:userId" element={<Admin />} /> */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

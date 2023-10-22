import React from 'react';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
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
            <Route path="/" element={<Login />}></Route>
            {/* <Route path="/1" element={<Student />}></Route>
            <Route path="/2" element={<Profik />}></Route>
            <Route path="/3" element={<Teacher />}></Route> */}
            <Route path="/:userType/:userId" element={<Student />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Student from './pages/Student/Student';
import Teacher from './pages/Teacher/Teacher';
import Employee from './pages/Employee/Employee';
// import Employee from './pages/Employee/Employee';

import styles from './scss/app.module.scss';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <div className={styles.appStart}>
        <Header />
        <main>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/student/:userId" element={<Student />} />
              <Route path="/teacher/:userId" element={<Teacher />} />
              <Route path="/employee/:userId" element={<Employee />} />
              {/* <Route path="/admin/:userId" element={<Admin />} /> */}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </main>
      </div>
    </MantineProvider>
  );
}

export default App;

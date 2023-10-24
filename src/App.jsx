import React from 'react';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
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
            <Route path="/:userType/:userId" element={<User />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

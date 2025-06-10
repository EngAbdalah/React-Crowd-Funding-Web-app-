import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LanguageContext from './context/LanguageContext';
import MyNavBar from './components/MyNavBar';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import './App.css';

function App()
{

  return (
    <div>

      {/* language change from arabic to english */}
      {/* */}
        <BrowserRouter>
          {/* <MyNavBar /> */}
          {/* <categorylist />*/}
          <div className='container'>
            <Routes>
              {/* <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<LoginForm />} />
              <Route path="/profile" element={<profile_update />} />
              <Route path="/category/:id" element={<category />
              <Route path="/donate/:id" element={<donate/> } />
              <Route path="/donate/:id" element={<report/> }
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
          {/* < /> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
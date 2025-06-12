import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/users/account/LoginPage';
import RegisterPage from './pages/users/account/RegisterPage';
import ProfilePage from './pages/users/account/ProfilePage';
import ForgotPasswordPage from './pages/users/account/ForgotPasswordPage';

import ConfirmEmailPage from './pages/users/account/ConfirmEmailPage';
import ChangePasswordPage from './pages/users/account/ChangePasswordPage';
import DeleteAccountPage from './pages/users/account/DeleteAccountPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-3">Page not found</p>
      <p className="lead">The page you're looking for doesn't exist.</p>
    </div>
  </div>
);


function App()
{

  return (
    <div>

      {/* language change from arabic to english */}
      {/* */}
        <BrowserRouter>
          {/* <MyNavBar /> */}
          {/* <categorylist />*/}
          <div className='container py-4'>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/confirm-email" element={<ConfirmEmailPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/delete-account" element={<DeleteAccountPage />} /> 
            
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/category/:id" element={<category /> */}
              {/* <Route path="/donate/:id" element={<donate/> } /> */}
              {/* <Route path="/donate/:id" element={<report/> } */}
              {/* <Route path="*" element={<NotFound />} /> */} 
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {/* < /> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
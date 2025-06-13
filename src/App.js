import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/users/account/LoginPage';
import RegisterPage from './pages/users/account/RegisterPage';
import ProfilePage from './pages/users/account/ProfilePage';
import ForgotPasswordPage from './pages/users/account/ForgotPasswordPage';

import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyles } from './theme/globalStyles';

import ConfirmEmailPage from './pages/users/account/ConfirmEmailPage';
import ChangePasswordPage from './pages/users/account/ChangePasswordPage';
import DeleteAccountPage from './pages/users/account/DeleteAccountPage';

// Main Navigation Pages
import HomePage from './pages/home/HomePage.jsx';
import CampaignsPage from './pages/campaigns/CampaignsPage';
import SponsorshipsPage from './pages/sponsorships/SponsorshipsPage';
import EducationPage from './pages/education/EducationPage';
import OccasionsPage from './pages/occasions/OccasionsPage';

import NavBar from './components/NavBar'
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


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="app-container">
        <BrowserRouter>
          <NavBar />
          <div className='container py-4'>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/confirm-email" element={<ConfirmEmailPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/delete-account" element={<DeleteAccountPage />} />

              {/* Main Navigation Routes */}
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/sponsorships" element={<SponsorshipsPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/occasions" element={<OccasionsPage />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
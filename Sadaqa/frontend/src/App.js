import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDonation from './components/ProjectDonation';
import DonationSuccess from './components/DonationSuccess';
// Import other components

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/projects/:projectId" element={<ProjectDonation />} />
        <Route path="/donation/success" element={<DonationSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
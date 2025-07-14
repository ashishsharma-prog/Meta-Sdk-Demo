import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingForm from './components/OnboardingForm';
import PrivacyConsent from './components/PrivacyConsent';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingForm setUserData={setUserData} />} />
        <Route path="/privacy-consent" element={<PrivacyConsent userData={userData} />} />
      </Routes>
    </Router>
  );
}

export default App;

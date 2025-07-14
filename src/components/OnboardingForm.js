import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingForm = ({ setUserData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    navigate('/privacy-consent');
  };

  return (
    <div>
      <h2>Onboarding Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default OnboardingForm;

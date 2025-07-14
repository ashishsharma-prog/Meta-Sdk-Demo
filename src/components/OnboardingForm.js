import React, { useState } from 'react';
import { User, Mail, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getFieldStatus = (fieldName, errors, touched, formData, validateField) => {
  if (errors[fieldName]) return 'error';
  if (touched[fieldName] && formData[fieldName] && !errors[fieldName]) return 'success';
  return 'default';
};

const InputField = ({ name, type, placeholder, icon: Icon, label, errors, touched, formData, handleChange, handleBlur, validateField }) => {
  const status = getFieldStatus(name, errors, touched, formData, validateField);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 ${
            status === 'error' ? 'text-red-400' : 
            status === 'success' ? 'text-green-400' : 'text-gray-400'
          }`} />
        </div>
        <input
          id={name}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
            status === 'error' 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : status === 'success'
              ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {status === 'success' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );
};

const OnboardingForm = ({ setUserData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid phone number';
        if (cleanPhone.length < 10) return 'Phone number must be at least 10 digits';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });

   
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true
    });

    // If no errors, proceed
    if (Object.keys(newErrors).length === 0) {
      setUserData(formData);
      navigate('/privacy-consent');
    }
  };

  const isFormValid = Object.keys(formData).every(key => 
    formData[key].trim() !== '' && !validateField(key, formData[key])
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h1>
          <p className="text-gray-600">Let's get you set up with your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="name"
              type="text"
              placeholder="Enter your full name"
              icon={User}
              label="Full Name"
              errors={errors}
              touched={touched}
              formData={formData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              validateField={validateField}
            />

            <InputField
              name="email"
              type="email"
              placeholder="Enter your email address"
              icon={Mail}
              label="Email Address"
              errors={errors}
              touched={touched}
              formData={formData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              validateField={validateField}
            />

            <InputField
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              icon={Phone}
              label="Phone Number"
              errors={errors}
              touched={touched}
              formData={formData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              validateField={validateField}
            />
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
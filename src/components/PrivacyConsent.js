import React, { useState } from 'react';
import { Shield, Eye, BarChart3, Sparkles, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyConsent = ({ userData, onAllowTracking }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  const initializeMetaPixel = () => {
    // Dynamically load Meta Pixel SDK
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', process.env.REACT_APP_FACEBOOK_PIXEL_ID);
    window.fbq('track', 'PageView');

    console.log('Meta Pixel SDK initialized.');
  };

  const handleAllowTracking = async () => {
    setIsLoading(true);
    
    try {
      // Initialize Meta Pixel
      initializeMetaPixel();
      
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsAllowed(true);
      
      // Call parent callback if provided
      if (onAllowTracking) {
        setTimeout(() => {
          onAllowTracking();
        }, 1500);
      }
    } catch (error) {
      console.error('Error initializing tracking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const benefits = [
    {
      icon: Sparkles,
      text: "Personalized content and recommendations"
    },
    {
      icon: BarChart3,
      text: "Help us improve your experience"
    },
    {
      icon: Eye,
      text: "Anonymous analytics for better features"
    }
  ];

  if (isAllowed) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Perfect!</h2>
            <p className="text-gray-600 mb-6">
              Thanks for helping us personalize your experience, {userData?.name}!
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        // Only trigger onClose if the user clicks directly on the overlay, not the modal content
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hi {userData?.name}! 👋
          </h2>
          <p className="text-gray-600">
            Help us create a better experience for you
          </p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-700 mb-4 leading-relaxed">
            We'd like to track your activity to provide analytics and personalization. 
            This helps us understand how you use our app and deliver content that matters most to you.
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {benefits?.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <benefit.icon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Your privacy is protected.</strong> All data is collected anonymously 
                and used only for improving our services.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Not Now
          </button>
          <button
            onClick={handleAllowTracking}
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Setting up...
              </>
            ) : (
              'Allow Tracking'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsent;
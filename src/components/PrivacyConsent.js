import React from 'react';

const PrivacyConsent = ({ userData }) => {
  const handleAllowTracking = () => {
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

  return (
    <div>
      <h2>Privacy Consent</h2>
      <p>
        Hi {userData?.name}, our app uses tracking to personalize your experience and analyze usage. Please allow
        tracking to continue.
      </p>
      <button onClick={handleAllowTracking}>Allow Tracking</button>
    </div>
  );
};

export default PrivacyConsent;

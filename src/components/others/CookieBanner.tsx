import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    try {
      const cookiesAccepted = localStorage.getItem('cookiesAccepted');
      if (!cookiesAccepted) {
        // Small delay to ensure page is loaded before showing banner
        setTimeout(() => setShowBanner(true), 1000);
      }
    } catch (error) {
      // localStorage might not be available in incognito/private mode
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    try {
      localStorage.setItem('cookiesAccepted', 'all');
      localStorage.setItem('cookiePreferences', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      }));
    } catch (error) {
      console.log('localStorage not available');
    }
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    try {
      localStorage.setItem('cookiesAccepted', 'necessary');
      localStorage.setItem('cookiePreferences', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      }));
    } catch (error) {
      console.log('localStorage not available');
    }
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookiesAccepted', 'custom');
      localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    } catch (error) {
      console.log('localStorage not available');
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-[9998] backdrop-blur-sm" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 animate-slide-up">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-slate-200">
          {!showDetails ? (
            // Simple View
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    We use cookies to enhance your browsing experience, serve personalized content, 
                    and analyze our traffic. Choose your preferences or accept all to continue.
                  </p>
                </div>
                <button
                  onClick={handleAcceptNecessary}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all text-sm sm:text-base"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all text-sm sm:text-base"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                >
                  Accept All
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                Learn more in our{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          ) : (
            // Detailed View
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Cookie Preferences</h3>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-600 mb-6 text-sm sm:text-base">
                Customize your cookie preferences below. You can change these settings at any time.
              </p>

              <div className="space-y-3 mb-6">
                {/* Necessary Cookies */}
                <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-not-allowed border border-slate-200">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.necessary}
                    disabled
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">Necessary Cookies</p>
                    <p className="text-sm text-slate-600">
                      Essential for the website to function properly. These cannot be disabled as 
                      they are required for basic site functionality like security and accessibility.
                    </p>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
                    Always Active
                  </span>
                </label>

                {/* Analytics Cookies */}
                <label className="flex items-start gap-3 p-4 bg-white rounded-xl cursor-pointer hover:bg-slate-50 transition-colors border border-slate-200">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) => setCookiePreferences({...cookiePreferences, analytics: e.target.checked})}
                    className="w-5 h-5 mt-0.5 accent-blue-600 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">Analytics Cookies</p>
                    <p className="text-sm text-slate-600">
                      Help us understand how visitors interact with our website by collecting and 
                      reporting information anonymously to improve performance and user experience.
                    </p>
                  </div>
                </label>

                {/* Marketing Cookies */}
                <label className="flex items-start gap-3 p-4 bg-white rounded-xl cursor-pointer hover:bg-slate-50 transition-colors border border-slate-200">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={(e) => setCookiePreferences({...cookiePreferences, marketing: e.target.checked})}
                    className="w-5 h-5 mt-0.5 accent-blue-600 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">Marketing Cookies</p>
                    <p className="text-sm text-slate-600">
                      Used to deliver personalized advertisements relevant to you and your interests, 
                      and to measure the effectiveness of advertising campaigns.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieBanner;
import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Lock, Eye, FileText, Mail, CheckCircle } from 'lucide-react';
import Footer from "@/components/Agent/Footer";
import Header from './HomeHeader';

const PrivacyPolicyPage = () => {
  // Set to true for testing - change to false for production
  const TESTING_MODE = true;
  
  const [showCookieBanner, setShowCookieBanner] = useState(TESTING_MODE);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // TESTING MODE: Always show banner for testing
    if (TESTING_MODE) {
      setShowCookieBanner(true);
      return;
    }

    // Check if user has already accepted cookies
    try {
      const cookiesAccepted = localStorage.getItem('cookiesAccepted');
      if (!cookiesAccepted) {
        setShowCookieBanner(true);
      }
    } catch (error) {
      // localStorage might not be available in incognito/private mode
      // Show banner by default in this case
      setShowCookieBanner(true);
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
    } catch (error) {
      console.log('localStorage not available');
    }
    setShowCookieBanner(false);
  };

  const handleAcceptNecessary = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    try {
      localStorage.setItem('cookiesAccepted', 'necessary');
    } catch (error) {
      console.log('localStorage not available');
    }
    setShowCookieBanner(false);
  };

  const handleCustomize = () => {
    try {
      localStorage.setItem('cookiesAccepted', JSON.stringify(cookiePreferences));
    } catch (error) {
      console.log('localStorage not available');
    }
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-slate-500 mt-2">Last Updated: October 4, 2025</p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Information We Collect',
              'How We Use Your Information',
              'Cookie Policy',
              'Data Security',
              'Your Rights'
            ].map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section-1" className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Information We Collect</h2>
                <p className="text-slate-600 mb-4">
                  We collect information to provide better services to our users. This includes:
                </p>
              </div>
            </div>
            <div className="ml-9 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Name, email address, and phone number</li>
                  <li>Property preferences and search criteria</li>
                  <li>Communication history with agents</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on site</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">How We Use Your Information</h2>
                <p className="text-slate-600 mb-4">
                  We use the collected information for the following purposes:
                </p>
              </div>
            </div>
            <div className="ml-9 space-y-3 text-slate-600">
              <p>✓ To provide and maintain our services</p>
              <p>✓ To connect you with real estate agents and developers</p>
              <p>✓ To send property recommendations and updates</p>
              <p>✓ To improve user experience and platform functionality</p>
              <p>✓ To comply with legal obligations</p>
            </div>
          </section>

          {/* Section 3 - Cookie Policy */}
          <section id="section-3" className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Cookie Policy</h2>
                <p className="text-slate-600 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience.
                </p>
              </div>
            </div>
            <div className="ml-9 space-y-4">
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">🔒 Necessary Cookies (Always Active)</h3>
                <p className="text-slate-600 text-sm">
                  Essential for the website to function properly. Cannot be disabled.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">📊 Analytics Cookies (Optional)</h3>
                <p className="text-slate-600 text-sm">
                  Help us understand how visitors interact with our website to improve performance.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">🎯 Marketing Cookies (Optional)</h3>
                <p className="text-slate-600 text-sm">
                  Used to deliver personalized advertisements and measure campaign effectiveness.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Data Security</h2>
                <p className="text-slate-600">
                  We implement industry-standard security measures to protect your personal information. 
                  This includes encryption, secure servers, and regular security audits. However, no method 
                  of transmission over the Internet is 100% secure.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Your Rights</h2>
                <p className="text-slate-600 mb-4">
                  Under applicable data protection laws, you have the following rights:
                </p>
              </div>
            </div>
            <div className="ml-9 space-y-2 text-slate-600">
              <p>• Right to access your personal data</p>
              <p>• Right to rectify inaccurate data</p>
              <p>• Right to request deletion of your data</p>
              <p>• Right to restrict processing</p>
              <p>• Right to data portability</p>
              <p>• Right to withdraw consent</p>
            </div>
          </section>

          {/* Section 6 - Contact */}
          {/* <section id="section-6" className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                <p className="mb-4 text-blue-100">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-blue-100">
                  <p>📧 Email: privacy@offplan.market</p>
                  <p>📍 Address: Dubai, United Arab Emirates</p>
                  <p>🌐 Website: offplan.market</p>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </main>

      {/* Footer */}
      <Footer />    

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 transform transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Cookie Preferences</h3>
              </div>
              <button
                onClick={handleAcceptNecessary}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 mb-6">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-not-allowed">
                <input
                  type="checkbox"
                  checked={cookiePreferences.necessary}
                  disabled
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Necessary Cookies</p>
                  <p className="text-sm text-slate-600">Required for basic site functionality</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={cookiePreferences.analytics}
                  onChange={(e) => setCookiePreferences({...cookiePreferences, analytics: e.target.checked})}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Analytics Cookies</p>
                  <p className="text-sm text-slate-600">Help us improve our website</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={cookiePreferences.marketing}
                  onChange={(e) => setCookiePreferences({...cookiePreferences, marketing: e.target.checked})}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Marketing Cookies</p>
                  <p className="text-sm text-slate-600">For personalized advertisements</p>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptNecessary}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
              >
                Necessary Only
              </button>
              <button
                onClick={handleCustomize}
                className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Accept All
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              Read our full <a href="#section-3" className="text-blue-600 hover:underline">Cookie Policy</a> for more information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;
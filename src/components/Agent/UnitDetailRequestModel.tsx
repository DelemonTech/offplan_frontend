import { useState } from "react";
import '@/i18n';
import { useTranslation } from 'react-i18next';

export default function RequestPlanModal({ unitName, onClose }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      // console.log('lng', lng);
  
      document.dir = lng === 'fa' ? 'rtl' : 'ltr';
      setIsOpen(false);
    };
    const lang = i18n.language || 'en';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending floor plan here
    // console.log("Name:", name, "WhatsApp:", whatsapp);
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-purple-600 mb-2">{t("Request")}{t("Floor Plan")}</h2>
        <p className="text-gray-600 mb-4">
          Enter your details to receive the floor plan for <strong>{unitName}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              placeholder={t("Enter your full name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("WhatsApp Number")} *</label>
            <input
              type="tel"
              placeholder="+971 50 123 4567"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-300"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2 font-semibold hover:from-purple-600 hover:to-pink-600"
            >
              Send Floor Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

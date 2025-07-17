import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ReactCountryFlag from "react-country-flag";

interface LanguageSwitcherProps {
  mobile?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile = false }) => {
  const { language, setLanguage, isRTL } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', countryCode: 'GB' }, // 🇬🇧
    { code: 'ar', name: 'العربية', countryCode: 'SA' }, // 🇸🇦
    { code: 'fa', name: 'فارسی', countryCode: 'IR' }    // 🇮🇷
  ];

  if (mobile) {
    return (
      <div className="space-y-2 mt-4">
        <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
          Language
        </div>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`flex items-center py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 w-full ${
              language === lang.code
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <span className="mr-3">
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{
                  width: "1.2em",
                  height: "1.2em",
                  borderRadius: "2px",
                }}
                title={lang.name}
              />
            </span>
            <span className={`text-base ${lang.code === 'ar' || lang.code === 'fa' ? 'font-medium' : ''}`}>
              {lang.name}
            </span>
            {language === lang.code && (
              <span className="ml-auto text-blue-600">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center bg-gray-50 rounded-lg p-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage(lang.code as any)}
          className={`flex items-center space-x-1 transition-all ${
            language === lang.code
              ? 'bg-white shadow-sm text-blue-600 font-medium'
              : 'text-gray-600 hover:text-blue-600 hover:bg-white'
          }`}
        >
          <span>
            <ReactCountryFlag
              countryCode={lang.countryCode}
              svg
              style={{
                width: "1em",
                height: "1em",
                borderRadius: "2px",
              }}
              title={lang.name}
            />
          </span>
          <span className={`text-xs font-medium ${lang.code === 'ar' || lang.code === 'fa' ? 'font-semibold' : ''}`}>
            {lang.code === 'en' ? 'EN' : lang.code === 'ar' ? 'ع' : 'ف'}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

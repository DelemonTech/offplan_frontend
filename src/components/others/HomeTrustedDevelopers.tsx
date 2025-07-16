import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
const TrustedDevelopers = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const developers = [
    { name: "EMAAR", logo: "E" },
    { name: "DAMAC", logo: "D" },
    { name: "SOBHA", logo: "S" },
    { name: "NAKHEEL", logo: "N" },
    { name: "AZIZI", logo: "A" },
    { name: "MERAAS", logo: "M" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("Trusted by the Most Respected Developers in the UAE")}
          </h2>
          <div className="w-24 h-1 bg-offplan-gradient mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {developers.map((developer, index) => (
            <div 
              key={developer.name}
              className="flex flex-col items-center group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl md:text-3xl font-bold text-gray-700">{developer.logo}</span>
              </div>
              <span className="mt-3 text-sm font-semibold text-gray-600 group-hover:text-offplan-purple transition-colors">
                {developer.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedDevelopers;

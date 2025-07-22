import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import emaar from '@/assets/HomePage/Emaar-properties.jpg';
import damac from '@/assets/HomePage/DAMAC_Properties.jpg';
import sobha from '@/assets/HomePage/Sobha-Dubai.webp';
import nakheel from '@/assets/HomePage/Nakheel.jfif';
import azizi from '@/assets/HomePage/azizi.webp';
import meraas from '@/assets/HomePage/Meraas_Properties.jpg';
const TrustedDevelopers = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   if (!slider) return;

  //   const interval = setInterval(() => {
  //     if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
  //       slider.scrollTo({ left: 0, behavior: "smooth" });
  //     } else {
  //       slider.scrollBy({ left: 200, behavior: "smooth" });
  //     }
  //   }, 2000); // Slide every 2 seconds

  //   return () => clearInterval(interval);
  // }, []);

  const developers = [
    { name: "EMAAR", logo: emaar },
    { name: "DAMAC", logo: damac },
    { name: "SOBHA", logo: sobha },
    { name: "NAKHEEL", logo: nakheel },
    { name: "AZIZI", logo: azizi },
    { name: "MERAAS", logo: meraas }
  ];

  return (
    <section className="py-12 bg-white pt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("Trusted by the Most Respected Developers in the UAE")}
          </h2>
          <div className="w-24 h-1 bg-offplan-gradient mx-auto rounded-full"></div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar flex-wrap justify-center items-center"
        >
          {developers.map((developer) => (
            <div
              key={developer.name}
              className="flex-shrink-0 w-32 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-30 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-transform group-hover:scale-110">
                <img
                  src={developer.logo}
                  alt={developer.name}
                  className="max-h w-full h-full rounded-xl"
                />
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-600 group-hover:text-offplan-purple transition-colors">
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

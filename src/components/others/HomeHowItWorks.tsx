
import { Search, UserCheck, Shield } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

const HowItWorks = () => {
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

  const steps = [
    {
      number: "01",
      icon: Search,
      title: t("Explore Projects"),
      description: t("Browse through verified off-plan projects with real-time data and detailed information.")
    },
    {
      number: "02", 
      icon: UserCheck,
      title: t("Choose Your Agent"),
      description: t("Select from our verified agents based on language, expertise, and customer reviews.")
    },
    {
      number: "03",
      icon: Shield,
      title: t("Secure Your Investment"),
      description: t("Get expert guidance through the entire process and secure your dream property.")
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("How It Works")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("Simple 3-step process to find and secure your perfect off-plan property.")}
          </p>
          <div className="w-24 h-1 bg-offplan-gradient mx-auto rounded-full mt-8"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-offplan-purple to-offplan-pink"></div>
            
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="text-center relative animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Number Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-offplan-gradient rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10">
                    <span className="text-white text-2xl font-bold">{step.number}</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-offplan-gradient rounded-full mx-auto animate-pulse opacity-30"></div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-6 border border-gray-100">
                  <step.icon className="w-8 h-8 text-offplan-purple" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

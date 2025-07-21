import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { Shield, Users, Database, Award, Brain, Globe } from "lucide-react";

const WhyTrustUs = () => {
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

  const features = [
    {
      icon: Shield,
      title: t("Honest Advice, No Pressure"),
      description: t("Our agents provide transparent, unbiased guidance to help you make informed decisions.")
    },
    {
      icon: Users,
      title: t("Choose Your Own Agent Freely"),
      description: t("Browse profiles and select the agent that best matches your preferences and language.")
    },
    {
      icon: Database,
      title: t("Real-time Developer-Synced Data"),
      description: t("Access up-to-the-minute project information directly from developer systems.")
    },
    {
      icon: Award,
      title: t("Verified Agents Only"),
      description: t("All our agents are RERA-registered and thoroughly vetted for your security.")
    },
    {
      icon: Brain,
      title: t("AI-Powered Property Matching"),
      description: t("Advanced algorithms match you with properties that fit your exact requirements.")
    },
    {
      icon: Globe,
      title: t("Multilingual Support"),
      description: t("Communicate in your preferred language with our diverse team of international agents.")
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("Why Thousands Trust Us")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("We've revolutionized the off-plan property market with transparency, technology, and trust.")}
          </p>
          <div className="w-24 h-1 bg-offplan-gradient mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="trust-card animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4 gap-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;

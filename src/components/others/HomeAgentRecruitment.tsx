
import { Button } from "@/components/ui/button";
import { User, Database, Megaphone, Brain } from "lucide-react";
import { useState, useEffect } from 'react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const AgentRecruitment = () => {
   const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const benefits = [
    {
      icon: User,
      title: t("Personal Agent Page"),
      description: t("Get your own branded page under your name with full profile customization.")
    },
    {
      icon: Database,
      title: t("Access to All Off-Plan Inventory"),
      description: t("Complete database of verified off-plan projects across the UAE.")
    },
    {
      icon: Megaphone,
      title: t("Instantly Promote Developer Projects"),
      description: t("Market new launches and exclusive projects to your network immediately.")
    },
    {
      icon: Brain,
      title: t("AI-Powered Leads"),
      description: t("Receive qualified leads matched to your expertise and language skills.")
    }
  ];

  useEffect(() => {
      document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    }, [i18n.language]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("Agents: Build Your Brand with Us")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("Join the most advanced platform for real estate professionals.")}
              {t("Grow your business with cutting-edge tools and verified leads.")}
            </p>
            <div className="w-24 h-1 bg-offplan-gradient mx-auto rounded-full mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="trust-card animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-offplan-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="btn-primary text-lg px-10 py-4 animate-pulse-glow">
              {t("Join as an Agent")}
            </Button>
            <p className="text-gray-600 mt-4">
              {t("Already an agent?")} <a href="#" className="text-offplan-purple hover:underline font-medium">{t("Sign in here")}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentRecruitment;

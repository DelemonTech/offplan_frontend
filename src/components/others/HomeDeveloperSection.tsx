import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Users, FileText } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';

const DeveloperSection = () => {
   const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
      document.dir = lng === 'fa' ? 'rtl' : 'ltr';
      setIsOpen(false);
    };
  const benefits = [
    {
      icon: CheckCircle,
      text: t("Verified listing process")
    },
    {
      icon: TrendingUp,
      text: t("Real-time data tracking")
    },
    {
      icon: Users,
      text: t("No fake leads or duplicates")
    },
    {
      icon: Users,
      text: t("Access to qualified, global buyers")
    },
    {
      icon: FileText,
      text: t("Weekly reporting")
    }
  ];

  useEffect(() => {
      document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    }, [i18n.language]);

  return (
    <section className="py-20 bg-gradient-to-br from-offplan-purple/5 to-offplan-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t("Why Developers List With Us")}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t("Join the leading platform that connects your projects with serious, verified buyers from around the world.")}
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-offplan-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <Button className="btn-primary text-lg px-8 py-4">
                {t("Request Developer Access")}
              </Button>
            </div>

            {/* Visual */}
            <div className="relative animate-scale-in">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("Developer Dashboard")}</h3>
                  <p className="text-gray-600">{t("Real-time insights and analytics")}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">{t("Active Listings")}</span>
                      <span className="text-2xl font-bold text-green-600">24</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800 font-medium">{t("This Month's Leads")}</span>
                      <span className="text-2xl font-bold text-blue-600">187</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-800 font-medium">{t("Conversion Rate")}</span>
                      <span className="text-2xl font-bold text-purple-600">12.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;

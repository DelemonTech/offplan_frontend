
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Zap } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const CallToAction = ({agent}) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='6' cy='6' r='3'/%3E%3Ccircle cx='26' cy='26' r='3'/%3E%3Ccircle cx='46' cy='46' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <Zap size={20} className="text-yellow-400" />
              <span className="font-semibold">{t('Limited Time Offer')}</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t("Don't Miss UAE's")}
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent"> {t('Hottest')}</span>
              <br />{t("Off-Plan Opportunities")}
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("Properties are selling 40% faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market.")}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">0%</div>
              <div className="text-gray-300">{t('Commission on Select Properties')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">{t('AI Assistant Support')}</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <MessageCircle size={20} className="mr-2" />
              {t('Chat with AI Now')}
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>

          {/* Trust Indicator - Fixed Mobile Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">2,847 {t('investors online now')}</span>
            </div>
            <div className="text-sm">✓ {t('No hidden fees')}</div>
            <div className="text-sm">✓ {t('Instant property alerts')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

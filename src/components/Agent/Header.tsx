
import React, { useState, useEffect } from 'react';
import { Search, Globe, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/Agent/LanguageSwitcher';
import maleLogo from '@/assets/OFFPLAN_MARKET_male.png';
import femaleLogo from '@/assets/OFFPLAN_MARKET_female.png';
import defaultLogo from '@/assets/OFFPLAN_MARKET.png';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const Header = ({ logo = "/OFFPLAN_MARKET_default.png" }: { logo?: string }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const navigationLinks = [
    { href: "/", label: t('Home') },
    { href: "#", label: t('About') },
    { href: "#", label: t('Contact') },
    { href: `/blogs`, label: t('Blogs') },
  ];
 
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" dir='ltr'>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-blue-500"></div> */}
            <span className="text-xl font-bold">
              {/* <span className="text-pink-500">OFFPLAN</span>
              <span className="text-blue-600">.MARKET</span> */}
              <>
                <img src={logo} alt="Logo" className="h-8 w-auto block md:hidden" />
                <img src={logo} alt="Logo" className="h-10 w-auto hidden md:block" />
              </>

            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2">
                <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link to="/" className="md:hidden">
                    <img src={logo} alt="Logo" className="h-8" />
                  </Link>
                  {/* <SheetClose asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X size={20} className="text-gray-600" />
                    </button>
                  </SheetClose> */}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-4">
                  <div className="space-y-1 px-4">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="block py-2 px-4 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200 text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Language Switcher */}
                    <LanguageSwitcher mobile />
                  </div>
                </nav>

                {/* Footer with gradient background */}
                <div className="p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-t-xl">
                  <p className="text-sm text-gray-600 text-center">
                    {t('offplan.market©2025')}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

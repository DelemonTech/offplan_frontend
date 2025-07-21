import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Bell, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import exp from 'constants';
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Users, Building2 } from "lucide-react";
import LanguageSwitcher from '@/components/Agent/LanguageSwitcher';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const [isMobileOverlayVisible, setIsMobileOverlayVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const menuItems = [
    { label: t('Projects'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: t('Agents'), icon: <Users className="w-4 h-4" /> },
    { label: t('Developers'), icon: <Building2 className="w-4 h-4" /> },
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !(overlayRef.current as any).contains(event.target)
      ) {
        setIsMobileOverlayVisible(false);
      }
    };
    if (isMobileOverlayVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOverlayVisible]);

  const handleAvatarClick = () => {
    if (window.innerWidth < 768) {
      setIsMobileOverlayVisible(true);
    }
  };
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
      document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    }, [i18n.language]);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-200" dir='ltr'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                <img
                  src="/lovable-uploads/11b303ba-efcb-483b-86ae-d82efdb9c016.png"
                  alt="Off Plan Market"
                  className="h-12 max-w-[60vw] w-auto object-contain"
                />
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#projects" className="text-gray-700 hover:text-offplan-purple transition-colors">{t("Projects")}</a>
              <a href="#agents" className="text-gray-700 hover:text-offplan-purple transition-colors">{t("Agents")}</a>
              <a href="#developers" className="text-gray-700 hover:text-offplan-purple transition-colors">{t("Developers")}</a>

              {/* <div className="relative group py-2">
                <button className="flex items-center text-gray-700 hover:text-[#6084ee] transition">
                  🌐
                  <span className="ml-1 hidden sm:inline">{t('Language')}</span>
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t("English (UK)")}
                  </button>
                  <button
                    onClick={() => changeLanguage('fa')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t("Farsi (Persian)")}
                  </button>
                </div>
              </div> */}
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden md:inline-flex">
                {t("Login")}
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hidden md:inline-flex font-semibold text-white">
                {t("Get Started")}
              </Button>
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>

          </div>
          {isOpen && (
            <>
              {/* Transparent backdrop */}
              <div
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 z-40"
              ></div>

              {/* Dropdown menu below header */}
              <div
                className="fixed top-16 left-4 right-4 bg-white z-50 shadow-md px-4 pb-4 flex flex-col space-y-3 rounded-lg overflow-auto inline-flex max-w-[calc(100vw-2rem)]">
                {/* {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setIsOpen(false);
                      // Add route navigation here if needed
                    }}
                    className="text-gray-700 hover:text-[#6084ee] hover:text-500 text-base text-left"
                  >
                    <div className='flex items-center space-x-2'>{item.icon}<span>{item.label}</span></div>
                  </button>
                ))} */}
                {/* <hr /> */}
                {/* Language on Mobile */}
                {/* <div>
                  <p className="text-gray-600 text-sm mb-1">🌐 Language</p>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                  >
                    {t("English (UK)")}
                  </button>
                  <button
                    onClick={() => changeLanguage('fa')}
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                  >
                    {t("Farsi (Persian)")}
                  </button>
                </div> */}
                <LanguageSwitcher mobile/>
              </div>
            </>

          )}
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileOverlayVisible && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center md:hidden">
          <div ref={overlayRef} className="bg-white p-6 rounded shadow-md text-center max-w-xs w-full relative">
            <button
              onClick={() => setIsMobileOverlayVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>

            {/* <p className="text-sm font-medium mb-4">Dubai, UAE</p> */}


          </div>
        </div>

      )}
    </>
  );
};
export default Header;
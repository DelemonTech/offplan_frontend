import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Bell, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import exp from 'constants';
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Users, Building2 } from "lucide-react";
import LanguageSwitcher from '@/components/Agent/LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import logoPath from '@/assets/OFFPLAN_MARKET_female.png';

export const Header = ({ logo = "/OFFPLAN_MARKET_default.png" }: { logo?: string }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
    window.location.reload();
  };
  const [isMobileOverlayVisible, setIsMobileOverlayVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const menuItems = [
    { label: t('Home'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: t('Agents'), icon: <Users className="w-4 h-4" /> },
    { label: t('Blogs'), icon: <Building2 className="w-4 h-4" /> },
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const navigationLinks = [
    { href: "/", label: t('Home') },
    { href: "#", label: t('About') },
    { href: "#", label: t('Contact') },
    { href: `/blogs`, label: t('Blogs') },
  ];

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

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                {/* <button className="md:hidden p-2">
                <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </button> */}
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white">
                <div className="flex flex-col h-full">
                  {/* Header with close button */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link to="/" className="md:hidden">
                      <img src={logoPath} alt="Logo" className="h-8" />
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
              {/* <div
                className="fixed top-16 left-4 right-4 bg-white z-50 shadow-md px-4 pb-4 flex flex-col space-y-3 rounded-lg overflow-auto inline-flex max-w-[calc(100vw-2rem)]"> */}
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
              {/* <LanguageSwitcher mobile /> */}
              {/* </div> */}
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
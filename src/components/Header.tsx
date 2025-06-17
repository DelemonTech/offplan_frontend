import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Bell, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import exp from 'constants';

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

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

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

    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200" dir='ltr'>
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

                        <div className="flex items-center space-x-4">
                            <div className="relative group py-2">
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
                            </div>
                            <div className="hidden md:block text-right">
                                {/* <p className="text-sm text-muted-foreground">{currentTime}</p> */}
                                <p className="text-sm font-bold">Dubai, UAE</p>
                            </div>
                            <Bell className="h-5 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                            <div className="flex items-center space-x-3 relative">
                                <Avatar onClick={handleAvatarClick} className="cursor-pointer">
                                    <AvatarImage src="https://s3.us-east-1.amazonaws.com/offplan.market/WhatsApp+Image+2025-06-05+at+00.34.51_6c4f7cce.jpg" />
                                    <AvatarFallback>SK</AvatarFallback>
                                </Avatar>

                                {/* Desktop Dropdown */}
                                <div className="relative group cursor-pointer hidden md:block">
                                    <div className="text-gray-700 group-hover:text-[#6084ee] transition">
                                        <p className="text-md text-[#6084ee] font-bold">Sahar Kalhor</p>
                                        <p className="text-xs text-muted-foreground">Senior Off-Plan Advisor</p>
                                    </div>

                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 hover:text-[#6084ee] transition"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <Avatar className="mx-auto mb-4 w-20 h-20">
                            <AvatarImage src="https://s3.us-east-1.amazonaws.com/offplan.market/WhatsApp+Image+2025-06-05+at+00.34.51_6c4f7cce.jpg" />
                            <AvatarFallback>SK</AvatarFallback>
                        </Avatar>
                        <p className="text-lg font-semibold">Sahar Kalhor</p>
                        <p className="text-sm text-muted-foreground mb-4">Senior Off-Plan Advisor</p>
                        {/* <p className="text-sm text-muted-foreground mb-2">{currentTime}</p> */}
                        <p className="text-sm font-medium mb-4">Dubai, UAE</p>

                        <button
                            onClick={() => {
                                setIsMobileOverlayVisible(false);
                                navigate('/profile');
                            }}
                            className="w-full px-4 py-2 mb-2 border rounded hover:bg-gray-100 flex items-center justify-center gap-2"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </button>
                        <button
                            onClick={() => {
                                setIsMobileOverlayVisible(false);
                                handleLogout();
                            }}
                            className="w-full px-4 py-2 border rounded text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>

            )}
        </>
    );
};
export default Header;
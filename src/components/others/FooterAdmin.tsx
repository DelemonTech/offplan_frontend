import React from 'react';
import {
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
// import Logo from '../assets/OFFPLAN_MARKET_new.png';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const FooterAdmin = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        // document.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        // console.log('Inquiry form submitted');
    };

    return (
        <footer className="bg-slate-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <img
                                // src={Logo}
                                alt="offplan.market"
                                className="h-50 w-auto"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t("Discover premium off-plan properties in Dubai. Your gateway to exclusive real estate investments.")}
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t("Quick Links")}</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Home")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Exclusive Properties")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Latest Projects")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Blog")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("About Us")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t("Property Types")}</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Luxury Apartments")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Beachfront Villas")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Penthouses")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Townhouses")}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {t("Commercial Spaces")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Send Inquiry Card */}
                    {/* <div className="lg:col-span-1">
                        <Card className="bg-slate-800 border-slate-700">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-white">{t("Send Inquiry")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="text-gray-300 text-sm">{t("Name")}</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder={t("Your email address")}
                                            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="mobile" className="text-gray-300 text-sm">{t("Mobile")}</Label>
                                        <Input
                                            id="mobile"
                                            type="text"
                                            placeholder={t("Your mobile number")}
                                            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-gray-300 text-sm">{t("Email")}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t("Your email address")}
                                            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-gray-300 text-sm">{t("Message")}</Label>
                                        <Textarea
                                            id="message"
                                            placeholder={t("Your inquiry message")}
                                            rows={3}
                                            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 resize-none"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-blue-600 hover:bg-cyan-700 text-white">
                                        {t("Send Inquiry")}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div> */}
                </div>

                {/* Bottom Border and Copyright */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 {t("offplan market")} . {t("All rights reserved")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterAdmin;

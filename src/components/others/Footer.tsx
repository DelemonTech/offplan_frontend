import React, { useState } from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
// import Logo from '../assets/OFFPLAN_MARKET_new.png';
import '@/i18n';
import { useTranslation } from 'react-i18next';
// import ReCAPTCHA from "react-google-recaptcha";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [agree, setAgree] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to receive updates & alerts");
      return;
    }
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    // TODO: Proceed with form submission logic (API call, etc)
    console.log('Inquiry form submitted');
    console.log('Recaptcha value:', recaptchaValue);
  };

  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t("About")}</h3>
            <div className="mb-4">
              <img
                // src={Logo}
                alt="offplan.market"
                className="h-50 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("Offplan.Market helps users explore & invest in premium off-plan properties in Dubai. Trusted for transparency, smart search & expert support.")}
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-8">
              <a href="https://www.facebook.com/profile.php?id=61576864533245" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCFcc-JtEzK79k7Fc8_7z7Ew" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://www.instagram.com/offplan.market/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/107619333/admin/dashboard/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Quick Links")}</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Home")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Projects")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Areas & Communities")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Developers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Compare")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Blog")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("FAQs")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("About Us")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Contact Us")}
                </a>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Property Types")}</h3>
            <ul className="space-y-6">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Off-plan Apartments")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Beachfront Villas")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("JVC Townhouses")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Dubai Hills Villas")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Ready to Move")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t("Post-Handover Plans")}
                </a>
              </li>
            </ul>
          </div>

          {/* Send Inquiry Card */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3 p-3">
                <CardTitle className="text-lg font-semibold text-white">{t("Inquiry Form")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 text-sm">{t("Name")}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("Your name")}
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
                  <div className="flex items-center justify-center space-x-2">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor="agree" className="text-gray-300 text-sm cursor-pointer">
                      {t("I agree to receive updates & alerts")}
                    </label>
                  </div>

                  <div className="w-full flex justify-center overflow-hidden">
                      {/* <ReCAPTCHA className="transform scale-[0.85]"
                        sitekey="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
                        onChange={(value) => setRecaptchaValue(value)}
                      /> */}
                    </div>
                  {/* </div> */}
                  <Button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-blue-600 hover:bg-cyan-700 text-white">
                    {t("Send Inquiry")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {t("2025 Offplan.Market | Dubai’s Smart Off-Plan Property Platform | All rights reserved.")}
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;

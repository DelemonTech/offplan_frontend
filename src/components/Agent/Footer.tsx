
import React, { useState } from 'react';
import { Facebook, Youtube, Instagram, Linkedin, ChevronDown, ChevronUp, Phone, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';
import { SiSnapchat, SiTiktok } from "react-icons/si";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ContactModal from './ContactModal';
import Icon from '@/static/OFFPLAN.MARKET new.png';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FooterSection = ({
    title,
    children,
    id
  }: {
    title: string;
    children: React.ReactNode;
    id: string;
  }) => (
    <div className="md:block">
      <Collapsible
        open={openSections.includes(id)}
        onOpenChange={() => toggleSection(id)}
      >
        <CollapsibleTrigger className="md:cursor-default w-full md:w-auto">
          <div className="flex items-center justify-between md:justify-start py-2 md:py-0">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <div className="md:hidden">
              {openSections.includes(id) ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="md:block">
          <div className="pb-4 md:pb-0 md:mt-4">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  // Custom TikTok icon component
  // const TikTokIcon = ({ size = 24, className = "" }) => (
  //   <svg
  //     width={size}
  //     height={size}
  //     viewBox="0 0 24 24"
  //     fill="currentColor"
  //     className={className}
  //   >
  //     <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
  //   </svg>
  // );

  // Custom Twitter/X icon component
  const TwitterIcon = ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white rounded-t-2xl overflow-hidden">
      {/* SEO Navigation Section - Visible to crawlers */}
      <section className="bg-gray-800 py-4 px-6 border-b border-gray-700">
        <div className="container mx-auto">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <a href="/blogs" className="text-gray-300 hover:text-white transition-colors">Real Estate Blog</a>
            <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </nav>
        </div>
      </section>

      {/* AI Chat CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white py-4 ">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-medium">{t('Need help choosing? Chat with our AI — support!')} 🤖</p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Section */}
          <FooterSection title={t("Company")} id="company">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-blue-500"></div>
                <span className="font-bold">
                  <span className="text-pink-400">offplan</span>
                  <span className="text-blue-400">.market</span>
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {t("UAE's premier off-plan property platform. Trusted for transparency, smart search & expert support.")}
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                    id='about-us'
                  >
                    {t('About Us')}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                    id='contact'
                  >
                    {t('Contact')}
                  </a>
                </li>
                <li>
                  <a
                    href="/blogs"
                    className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                    id='blogs'
                  >
                    {t('Blogs')}
                  </a>
                </li>
              </ul>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title={t("Quick Links")} id="quicklinks">
            <ul className="space-y-3 text-sm">
              {/* {[t('FAQs'), t('Privacy Policy'), t('Terms of Service'), t('Chat with AI'), t('Help Center'), t('Contact Support')].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors font-medium">
                    {link}
                  </a>
                </li>
              ))} */}
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                  id='faqs'
                >
                  {t('FAQs')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                  id='privacy-policy'
                >
                  {t('Privacy Policy')}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                  id='contact-support'
                >
                  {t('Contact Support')}
                </a>
              </li>
              <li>
                <a
                  href="https://offplan.market/sitemap.xml"
                  className="text-gray-300 hover:text-pink-400 transition-colors font-medium"
                  id='sitemap'
                >
                  {t('Sitemap')}
                </a>
              </li>
            </ul>
          </FooterSection>

          {/* Popular Properties */}
          <FooterSection title={t("Popular Properties")} id="properties">
            <ul className="space-y-3 text-sm">
              {[
                { id: "dubai-marina", label: t('Apartments in Dubai Marina') },
                { id: "jvc-villas", label: t('Villas in JVC') },
                { id: "business-bay-offices", label: t('Offices in Business Bay') },
                { id: "downtown-shops", label: t('Shops in Downtown') },
                { id: "difc-penthouses", label: t('Penthouses in DIFC') },
                { id: "dubailand-townhouses", label: t('Townhouses in Dubailand') },
                { id: "jebel-ali-warehouses", label: t('Warehouses in Jebel Ali') },
                { id: "springs-retail", label: t('Retail in The Springs') }
              ].map((property) => (
                <li key={property.id}>
                  {/* <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors font-medium"> */}
                  {property.label}
                  {/* </a> */}
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title={t("Contact Info")} id="contact">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin size={16} className="text-pink-400 flex-shrink-0" />
                  <span className="text-gray-200 font-medium">{t("7th floor, Al Amiri Tower, Barsha Heights, Tecom, UAE")}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone size={16} className="text-pink-400 flex-shrink-0" />
                  <span className="text-gray-200 font-medium" dir='ltr'>+971 52 952 9687</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={16} className="text-pink-400 flex-shrink-0" />
                  <span className="text-gray-200 font-medium">Sahar@offplan.market</span>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-pink-400" />
                <select className="bg-gray-800 border-gray-600 text-white text-sm rounded px-3 py-2 font-medium">
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                  <option value="fa">فارسی</option>
                </select>
              </div>

              {/* Contact Modal Button */}
              <div className="pt-3">
                <ContactModal />
              </div>
            </div>
          </FooterSection>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-800 rounded-lg py-6 px-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">{t('Stay Updated')}</h3>
              <p className="text-gray-300 font-medium">{t('Get the latest off-plan property updates and market insights')}</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <Input
                type="email"
                placeholder={t('Enter your email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:border-pink-400 font-medium"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 px-6 font-medium">
                {t('Subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://www.facebook.com/profile.php?id=61576864533245"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook
              size={24}
              className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300 hover:scale-110"
            />
          </a>

          <a
            href="https://www.youtube.com/channel/UCFcc-JtEzK79k7Fc8_7z7Ew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube
              size={24}
              className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors duration-300 hover:scale-110"
            />
          </a>

          <a
            href="https://www.instagram.com/offplan.market/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram
              size={24}
              className="text-gray-400 hover:text-pink-400 cursor-pointer transition-colors duration-300 hover:scale-110"
            />
          </a>

          <a
            href="https://www.linkedin.com/company/107619333/admin/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              size={24}
              className="text-gray-400 hover:text-blue-300 cursor-pointer transition-colors duration-300 hover:scale-110"
            />
          </a>

          <a
            href="https://www.tiktok.com/@offplan.market"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiTiktok
              size={24}
              className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300 hover:scale-110"
            />
          </a>

          <a
            href="https://profile.snapchat.com/91c5628a-eb73-4b4a-9755-a8922f965d97/profiles/a59bb01d-e94f-4e6e-a30d-9bbd1e367000/details/public-stories?ref_aid=fe1d29a1-c5c0-4a6e-bc32-1e14764a27fe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiSnapchat
              size={24}
              className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300 hover:scale-110"
            />
          </a>
        </div>


        {/* Bottom Row */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col items-center gap-6">
            {/* Bottom Row with Logo and Back to Top */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
              <div className="flex items-center space-x-3">
                {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-blue-500"></div> */}
                <span className="font-bold text-lg">
                  {/* <span className="text-pink-400">offplan</span>
                  <span className="text-blue-400">.market</span> */}
                  <img src={Icon} alt="Logo" className="h-12" />
                </span>
              </div>

              <p className="text-sm text-gray-400 text-center font-medium">
                © 2025 {t('Offplan.Market | UAE\'s Smart Off-Plan Property Platform | All rights reserved')}
              </p>

              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="bg-from-pink-500 to-blue-500 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                <ArrowUp size={16} className="mr-1" />
                {t('Back to Top')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

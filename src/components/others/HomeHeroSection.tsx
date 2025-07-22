import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import HeroVideo from '@/assets/HomePage/31956-389724705_small.mp4'

const HeroSection = () => {
   const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Background Decoration */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23a855f7%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div> */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover lg:object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster="/lovable-uploads/8eae98ca-021a-42e1-b6ed-4146adf704b1.png"
          style={{
            aspectRatio: 'auto',
          }}
        >
          <source src={HeroVideo} type="video/mp4" />
          <source src="/path-to-your-video.webm" type="video/webm" />
          {/* Fallback image */}
          {/* <img 
            src="/lovable-uploads/8eae98ca-021a-42e1-b6ed-4146adf704b1.png" 
            alt="Sahar Kalhor - Off-Plan Expert"
            className="w-full h-full object-cover"
          /> */}
        </video>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="py-6 text-center max-w-4xl mx-auto animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 pr-1" />
              ))}
            </div>
            <span className="text-sm font-medium">{t("Trusted by 10,000+ buyers")}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t("Your Global Gateway to")}<br></br>{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-300 to-blue-300 bg-clip-text text-transparent text-outline-white">
              {t("Off-Plan Properties")}
            </span>{" "}
            {t("in the UAE")}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.")}
          </p>

          {/* CTA Buttons */}
          <div className="box-border flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-lg px-10 py-4 group flex items-center justify-center w-full sm:w-auto min-w-[100px]">
              {t("Explore Projects")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="bg-gray-200 text-lg text-grey-900 px-10 py-4 flex items-center justify-center w-full sm:w-auto min-w-[100px] hover:text-white hover:bg-gray-800 transition-colors">
              {t("Choose Your Agent")}
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white bg-transparent hover:bg-purple-500 hover:text-white text-lg px-10 py-4 flex items-center justify-center w-full sm:w-auto min-w-[100px]">
              {t("List Your Project")}
            </Button>
          </div>

          {/* Video Preview */}
          {/* <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="aspect-video bg-gradient-to-br from-offplan-purple/20 to-offplan-blue/20 flex items-center justify-center">
              <Button size="lg" className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 animate-pulse-glow">
                <Play className="w-8 h-8 text-white mr-2" />
                <span className="text-white text-lg">Watch Platform Demo</span>
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div> */}

          {/* Live Activity Ticker */}
          {/* <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">41 {("users viewing projects now")}</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium">6 {("new inquiries in")} 30 min</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

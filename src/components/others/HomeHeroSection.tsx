import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Sparkles, Zap, TrendingUp, Globe2, Users } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import HeroVideo from '@/assets/HomePage/31956-389724705_small.mp4'


const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    setTimeout(() => setIsVisible(true), 300);
  }, [i18n.language]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 60%),
          radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)
        `
      }}
    >
      {/* Enhanced Video Background */}
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
            filter: 'brightness(0.4) contrast(1.2) saturate(1.1)',
            // transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0003})`
          }}
        >
          <source src={HeroVideo} type="video/mp4" />
          <source src="/path-to-your-video.webm" type="video/webm" />
        </video>
        
        {/* Dynamic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(147, 51, 234, 0.4) 0%, 
                rgba(59, 130, 246, 0.3) 30%, 
                transparent 70%
              )
            `
          }}
        ></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float-complex"
            style={{
              width: `${10 + i * 15}px`,
              height: `${10 + i * 15}px`,
              left: `${5 + (i * 6)}%`,
              top: `${10 + (i * 5)}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${8 + i * 0.4}s`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl rotate-45 opacity-60 blur-sm"></div>
          </div>
        ))}

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
            }}
          ></div>
        </div>

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-float-particles"
            style={{
              width: '4px',
              height: '4px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div className="w-full h-full bg-white rounded-full opacity-60 animate-pulse"></div>
          </div>
        ))}

        {/* Energy waves */}
        {/* {[...Array(4)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute border border-white/10 rounded-full animate-pulse-wave"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i * 0.5}s`
            }}
          ></div>
        ))} */}
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className={`py-6 text-center max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          
          {/* Enhanced Trust Badge */}
          <div className={`inline-flex items-center space-x-3 bg-white/20 backdrop-blur-xl rounded-full px-6 py-3 mb-8 shadow-2xl border border-white/30 transition-all duration-700 hover:bg-white/30 hover:scale-105 ${
            isVisible ? 'animate-trust-badge-entry' : ''
          }`}>
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 fill-yellow-400 text-yellow-400 transition-all duration-300 hover:scale-110 animate-star-twinkle`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-white animate-pulse">{t("Trusted by 10,000+ buyers")}</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-300 font-medium">Live</span>
            </div>
          </div>

          {/* Enhanced Main Headline */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight transition-all duration-1000 ${
            isVisible ? 'animate-headline-reveal' : ''
          }`}>
            <span className="inline-block animate-word-float" style={{ animationDelay: '0.2s' }}>
              {t("Your Global Gateway to")}
            </span>
            <br />
            <span className="relative inline-block">
              <span 
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent inline-block animate-word-float relative z-10 "
                style={{
                  textShadow: '0 0 15px rgba(147, 51, 234, 0.5)',
                  filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.8))'
                }}
              >
                {t("Off-Plan Properties")}
              </span>
              {/* Animated underline */}
              {/* <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-underline-grow rounded-full blur-sm"></div>
              <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-underline-grow rounded-full" style={{ animationDelay: '0.2s' }}></div> */}
            </span>
            <br />
            <span className="inline-block animate-word-float" style={{ animationDelay: '0.4s' }}>
              {t("in the UAE")}
            </span>
            
            {/* Floating icons */}
            <div className="absolute -top-8 -right-8 animate-float-icon">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin-slow" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-float-icon" style={{ animationDelay: '1s' }}>
              <Zap className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </h1>

          {/* Enhanced Subheadline */}
          <p className={`text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : ''
          }`} style={{ animationDelay: '0.8s' }}>
            {t("Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.")}
            
            {/* Typing cursor effect */}
            <span className="animate-blink ml-1 text-purple-400">|</span>
          </p>

          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-buttons-slide-up' : ''
          }`} style={{ animationDelay: '0.4s' }}>
            
            {/* Primary Button */}
            <a href="#steps">
            <Button 
              className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg px-12 py-5 group flex items-center justify-center w-full sm:w-auto min-w-[200px] rounded-xl shadow-2xl border-0 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/50"
              onMouseEnter={() => setHoveredButton(0)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all duration-500 ${
                hoveredButton === 0 ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 font-bold">{t("Explore Projects")}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              
              {/* Floating particles on hover */}
              {hoveredButton === 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-button-particles"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${20 + i * 15}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  ))}
                </div>
              )}
            </Button>
            </a>

            {/* Secondary Button */}
            <a href="#agents">
            <Button 
              className="relative overflow-hidden bg-white/20 backdrop-blur-xl text-white border border-white/30 text-lg px-12 py-5 flex items-center justify-center w-full sm:w-auto min-w-[200px] rounded-xl shadow-xl hover:bg-white/30 hover:scale-105 transition-all duration-500"
              onMouseEnter={() => setHoveredButton(1)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 font-bold">{t("Choose Your Agent")}</span>
              <Users className="w-5 h-5 ml-2 relative z-10" />
            </Button></a>

            {/* Third Button */}
            <a href="#steps">
            <Button 
              className="relative overflow-hidden bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-purple-900 text-lg px-12 py-5 flex items-center justify-center w-full sm:w-auto min-w-[200px] rounded-xl shadow-xl transition-all duration-500 hover:scale-105 hover:border-white"
              onMouseEnter={() => setHoveredButton(2)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-bold">{t("List Your Project")}</span>
            </Button>
            </a>
          </div>

          {/* Enhanced Stats Section */}
          <div className={`bg-black/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto border border-white/20 transition-all duration-1000 hover:bg-black/30 ${
            isVisible ? 'animate-stats-appear' : ''
          }`} style={{ animationDelay: '0.8s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              
              <div className="group cursor-pointer">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-fast"></div>
                  <span className="font-bold text-white text-lg group-hover:text-green-400 transition-colors duration-300">47</span>
                  <span className="text-white/80 text-sm">{t("users viewing projects now")}</span>
                </div>
                <div className="h-1 bg-green-400/30 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full animate-progress-bar" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast" style={{ animationDelay: '0.5s' }}></div>
                  <span className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">12</span>
                  <span className="text-white/80 text-sm">{t("new inquiries in 30 min")}</span>
                </div>
                <div className="h-1 bg-blue-400/30 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full animate-progress-bar" style={{ width: '65%', animationDelay: '0.3s' }}></div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Globe2 className="w-4 h-4 text-purple-400 animate-spin-slow" />
                  <span className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors duration-300">23</span>
                  <span className="text-white/80 text-sm">{t("countries represented")}</span>
                </div>
                <div className="h-1 bg-purple-400/30 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full animate-progress-bar" style={{ width: '92%', animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float-complex {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-40px) rotate(90deg) scale(1.1); 
          }
          50% { 
            transform: translateY(20px) rotate(180deg) scale(0.9); 
          }
          75% { 
            transform: translateY(-20px) rotate(270deg) scale(1.05); 
          }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(100px, 100px) rotate(360deg); }
        }

        @keyframes float-particles {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: translateY(-30px) translateX(10px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes pulse-wave {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.6);
            opacity: 0;
          }
        }

        @keyframes trust-badge-entry {
          0% {
            transform: translateY(-50px) scale(0.8);
            opacity: 0;
          }
          70% {
            transform: translateY(10px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes headline-reveal {
          0% {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
            filter: blur(20px);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes word-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes underline-grow {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 0.8;
          }
        }

        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            transform: translateY(60px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes buttons-slide-up {
          0% {
            transform: translateY(80px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes button-particles {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
          }
        }

        @keyframes stats-appear {
          0% {
            transform: translateY(50px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes progress-bar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @keyframes star-twinkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-float-complex { animation: float-complex 10s ease-in-out infinite; }
        .animate-grid-move { animation: grid-move 30s linear infinite; }
        .animate-float-particles { animation: float-particles 8s ease-in-out infinite; }
        .animate-pulse-wave { animation: pulse-wave 8s ease-in-out infinite; }
        .animate-trust-badge-entry { animation: trust-badge-entry 1.2s ease-out; }
        .animate-headline-reveal { animation: headline-reveal 1.5s ease-out; }
        .animate-word-float { animation: word-float 3s ease-in-out infinite; }
        .animate-gradient-shift { 
          animation: gradient-shift 4s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .animate-underline-grow { animation: underline-grow 2s ease-out; }
        .animate-float-icon { animation: float-icon 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-buttons-slide-up { animation: buttons-slide-up 1s ease-out; }
        .animate-button-particles { animation: button-particles 1.5s ease-out infinite; }
        .animate-stats-appear { animation: stats-appear 1s ease-out; }
        .animate-pulse-fast { animation: pulse-fast 1.5s ease-in-out infinite; }
        .animate-progress-bar { 
          animation: progress-bar 2s ease-out;
          transform-origin: left;
        }
        .animate-star-twinkle { animation: star-twinkle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;
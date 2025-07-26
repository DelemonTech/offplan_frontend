import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageCircle, Award, Globe, Users, Zap, TrendingUp } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { throttle } from 'lodash';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const TopRatedAgents = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  const { setLanguage } = useLanguage();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  // Mock data with enhanced details
  const agents = [
    {
      id: 1,
      name: t("Sahar Kalhor"),
      username: "sahar",
      avatar: <img src="https://s3.us-east-1.amazonaws.com/offplan.market/sahar-crawler.webp" alt="Sahar Kalhor" className="w-full h-full object-cover rounded-full" />,
      nationality: <img src='https://flagcdn.com/32x24/ae.png' alt='AE' />,
      languages: ['en', 'ar', 'fa'],
      rating: 4.9,
      reviews: 127,
      specialties: [t("Luxury Properties"), t("Investment")],
      totalSales: "150+",
      responseTime: "< 30 min",
      badge: t("Top Performer"),
      color: "from-pink-400 via-purple-500 to-indigo-600"
    },
    {
      id: 2,
      name: t("Mohammed Erfani"),
      username: "erfani",
      avatar: <img src="https://s3.us-east-1.amazonaws.com/offplan.market/erfani-crawler.webp" alt="Mohammed Erfani" className='overflow-hidden rounded-full' />,
      nationality: <img src='https://flagcdn.com/32x24/ae.png' alt='AE' />,
      languages: ['en', 'ar', 'fa'],
      rating: 4.9,
      reviews: 95,
      specialties: [t("Commercial"), t("Residential")],
      totalSales: "125+",
      responseTime: "< 30 min",
      badge: t("Rising Star"),
      color: "from-orange-400 via-red-500 to-pink-600"
    },
    {
      id: 3,
      name: t("Maryam"),
      username: "maryam",
      avatar: <img src="https://s3.us-east-1.amazonaws.com/offplan.market/maryam-crawler.webp" alt="Maryam" className='overflow-hidden rounded-full' />,
      nationality: <img src='https://flagcdn.com/32x24/ae.png' alt='AE' />,
      languages: ['en', 'ar', 'fa'],
      rating: 4.9,
      reviews: 89,
      specialties: [t("First-time Buyers"), t("Rentals")],
      totalSales: "120+",
      responseTime: "< 30 min",
      badge: t("Expert"),
      color: "from-emerald-400 via-teal-500 to-cyan-600"
    },
  ];


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

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, agents.length - 2));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, agents.length - 2)) % Math.max(1, agents.length - 2));
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && hoveredCard === null) {
        nextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating, hoveredCard]);

  // const { i18n } = useTranslation();
  const handleLanguageChange = (lng: string, username: string) => {
    setLanguage(lng as 'en' | 'ar' | 'fa');
    i18n.changeLanguage(lng);
    document.dir = lng === 'ar' || lng === 'fa' ? 'rtl' : 'ltr';

    // Redirect to agent page
    window.location.href = `/${username}`; // or with language: `/${lng}/${username}`
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%
          )
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              background: `linear-gradient(45deg, hsl(${i * 60}, 70%, 60%), hsl(${(i * 60) + 120}, 70%, 60%))`,
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`
            }}
          />
        ))}

        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rounded-lg rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-full animate-pulse"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10" id="agents">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
              <Award className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 relative">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl animate-text-shimmer">
              {t("Top Rated Agents")}
            </span>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            {t("Connect with verified, multilingual professionals who understand your needs.")}
          </p>

          <div className="relative w-40 h-2 mx-auto rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-loading-bar shadow-lg"></div>
          </div>
        </div>

        {/* Desktop Enhanced Carousel */}
        <div className="hidden lg:block relative">
          <div className="flex justify-center items-center space-x-8 perspective-1000">
            {agents.slice(currentIndex, currentIndex + 3).map((agent, displayIndex) => {
              const actualIndex = currentIndex + displayIndex;
              const isCenter = displayIndex === 1;

              return (
                <div
                  key={agent.id}
                  className={`relative transition-all duration-800 ease-out transform-gpu ${isCenter ? 'scale-110 z-20' : 'scale-95 z-10'
                    } ${!isAnimating ? 'animate-card-entrance' : ''}`}
                  style={{
                    animationDelay: `${displayIndex * 50}ms`,
                    transform: `
                      ${isCenter ? 'scale(1.1) translateY(-20px)' : 'scale(0.95) translateY(10px)'}
                      ${displayIndex === 0 ? 'rotateY(15deg)' : displayIndex === 2 ? 'rotateY(-15deg)' : 'rotateY(0deg)'}
                    `
                  }}
                  onMouseEnter={() => setHoveredCard(agent.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <EnhancedAgentCard
                    agent={agent}
                    actualIndex={actualIndex}
                    t={t}
                    isHovered={hoveredCard === agent.id}
                    isCenter={isCenter}
                    handleLanguageChange={handleLanguageChange}
                  />
                </div>
              );
            })}
          </div>

          {/* Enhanced Navigation */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-8 top-1/2 -translate-y-1/2 group"
          >
            <div className="relative w-16 h-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 flex items-center justify-center hover:scale-110 disabled:opacity-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <ChevronLeft className="w-7 h-7 text-white group-hover:text-blue-200 transition-all duration-300 relative z-10" />
            </div>
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-8 top-1/2 -translate-y-1/2 group"
          >
            <div className="relative w-16 h-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 flex items-center justify-center hover:scale-110 disabled:opacity-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
              <ChevronRight className="w-7 h-7 text-white group-hover:text-purple-200 transition-all duration-300 relative z-10" />
            </div>
          </button>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-4 mt-12">
            {Array.from({ length: Math.max(1, agents.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative group"
              >
                <div className={`w-4 h-4 rounded-full transition-all duration-500 ${index === currentIndex
                  ? 'bg-gradient-to-r from-blue-400 to-purple-600 scale-125 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60 scale-100'
                  }`}>
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-ping opacity-40"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Mobile View */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className="min-w-[320px] sm:min-w-[350px] snap-center"
                onMouseEnter={() => setHoveredCard(agent.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <EnhancedAgentCard
                  agent={agent}
                  actualIndex={index}
                  t={t}
                  isHovered={hoveredCard === agent.id}
                  isCenter={false}
                  handleLanguageChange={handleLanguageChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-6">
          <button className="group relative inline-flex items-center justify-center px-12 py-3 text-xl font-bold text-white transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
            <div className="absolute inset-0.1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl animate-gradient-shift"></div>
            <span className="relative z-10 flex items-center space-x-3">
              <span>{t("View All Agents")}</span>
              <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes card-entrance {
          0% { 
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-text-shimmer { 
          animation: text-shimmer 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .animate-card-entrance { animation: card-entrance 0.8s ease-out; }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        
        .perspective-1000 { perspective: 1000px; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

const EnhancedAgentCard = ({ agent, actualIndex, t, isHovered, isCenter, handleLanguageChange }) => (
  <div className={`relative group transition-all duration-700 ${isCenter ? 'transform-gpu' : ''} p-2`}>
    {/* Card container with enhanced glassmorphism */}
    <div className={`
      relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl 
      p-8 rounded-3xl border border-white/20 shadow-2xl overflow-hidden
      transition-all duration-700 transform-gpu
      ${isHovered ? 'scale-105 shadow-blue-500/25' : 'scale-100'}
    `}>

      {/* Animated background overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 
        transition-all duration-700 rounded-3xl
        ${isHovered ? 'opacity-10' : 'opacity-0'}
      `}></div>

      {/* Floating particles effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Badge */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className={`
          bg-gradient-to-r ${agent.color} px-4 py-5 rounded-full text-white text-sm font-bold
          shadow-lg transform rotate-12 transition-all duration-500
          ${isHovered ? 'rotate-0 scale-110' : 'rotate-12 scale-100'}
        `}>
          {agent.badge}
        </div>
      </div>

      <div className="text-center relative z-10">
        {/* Enhanced Avatar */}
        <div className="relative mb-8 mx-auto w-32 h-32">
          <div className={`
            absolute inset-0 bg-gradient-to-br ${agent.color} rounded-full
            transition-all duration-700
            ${isHovered ? 'animate-pulse scale-110' : 'scale-100'}
          `}></div>

          <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full border-4 border-white/30 flex items-center justify-center shadow-2xl overflow-hidden">
            {agent.avatar}
          </div>


          {/* Status indicator with pulse animation */}
          <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>

        {/* Name and Nationality with enhanced typography */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <h3 className="font-black text-2xl lg:text-3xl text-white drop-shadow-lg">
            {agent.name}
          </h3>
          <span className="text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
            {agent.nationality}
          </span>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className={`
            bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-4 rounded-2xl 
            border border-white/20 transition-all duration-500 hover:scale-105
            ${isHovered ? 'shadow-lg shadow-blue-500/20' : ''}
          `}>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-black text-green-600">{agent.totalSales}</div>
            </div>
            <div className="text-sm text-white/70 font-medium">{t("Total Sales")}</div>
          </div>

          <div className={`
            bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-4 rounded-2xl 
            border border-white/20 transition-all duration-500 hover:scale-105
            ${isHovered ? 'shadow-lg shadow-purple-500/20' : ''}
          `}>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div className="text-lg font-black text-yellow-400">{agent.responseTime}</div>
            </div>
            <div className="text-sm text-white/70 font-medium">{t("Response Time")}</div>
          </div>
        </div>

        {/* Languages with enhanced styling */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-white/70" />
            <span className="text-sm font-bold text-white/70 uppercase tracking-wider">{t("LANGUAGES")}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {agent.languages.map((langCode, index) => (
              <span
                key={langCode}
                onClick={() => handleLanguageChange(langCode, agent.username)}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold border border-white/30 cursor-pointer
                  bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white
                  transition-all duration-500 hover:scale-110 hover:shadow-lg
                  ${isHovered ? 'animate-bounce' : ''}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {t(
                  langCode === 'en'
                    ? 'English'
                    : langCode === 'ar'
                      ? 'Arabic'
                      : 'Farsi'
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-white/70" />
            <span className="text-sm font-bold text-white/70 uppercase tracking-wider">{t("SPECIALTIES")}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {agent.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Rating */}
        <div className="flex items-center justify-center space-x-3 mb-10">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`
                  w-6 h-6 transition-all duration-300
                  ${i < Math.floor(agent.rating)
                    ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                    : 'text-white/30'
                  }
                  ${isHovered ? 'animate-pulse' : ''}
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span className="font-black text-white text-xl drop-shadow-lg">{agent.rating}</span>
          <span className="text-white/70 text-sm">
            ({agent.reviews} {t("reviews")})
          </span>
        </div>

        {/* Enhanced CTAs */}
        <div className="space-y-4">
          <Link
            to={`/${agent.username}`}
            className="group relative block w-full overflow-hidden rounded-2xl"
            // target="_blank" // optional: if you truly want a new tab
            rel="noopener noreferrer"
          >
            <div className={`relative bg-gradient-to-r ${agent.color} p-4 hover:scale-105 hover:shadow-2xl shadow-lg transition-all duration-500`}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <span className="text-white font-bold text-lg">
                  {t("View Full Profile")}
                </span>
              </div>
            </div>
          </Link>

          {/* <button className="group w-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border-2 border-white/30 text-white p-4 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 hover:bg-white/30 hover:shadow-xl flex items-center justify-center space-x-3">
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>{t("Contact Now")}</span>
          </button> */}
        </div>
      </div>
    </div>
  </div>
);

export default TopRatedAgents;
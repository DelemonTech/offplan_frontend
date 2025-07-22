import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { User, Database, Megaphone, Brain, Star, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';

const AgentRecruitment = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const benefits = [
    {
      icon: User,
      title: t("Personal Agent Page"),
      description: t("Get your own branded page under your name with full profile customization."),
      color: "from-blue-400 via-indigo-500 to-purple-600",
      bgColor: "from-blue-500/20 to-purple-500/20",
      delay: 50
    },
    {
      icon: Database,
      title: t("Access to All Off-Plan Inventory"),
      description: t("Complete database of verified off-plan projects across the UAE."),
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      bgColor: "from-emerald-500/20 to-teal-500/20",
      delay: 100
    },
    {
      icon: Megaphone,
      title: t("Instantly Promote Developer Projects"),
      description: t("Market new launches and exclusive projects to your network immediately."),
      color: "from-orange-400 via-red-500 to-pink-600",
      bgColor: "from-orange-500/20 to-pink-500/20",
      delay: 150
    },
    {
      icon: Brain,
      title: t("AI-Powered Leads"),
      description: t("Receive qualified leads matched to your expertise and language skills."),
      color: "from-violet-400 via-purple-500 to-fuchsia-600",
      bgColor: "from-violet-500/20 to-fuchsia-500/20",
      delay: 200
    }
  ];

  // Mouse tracking
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

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, benefits[index].delay);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, 
            #fef7ff 0%, 
            #f3e8ff 25%, 
            #e0e7ff 50%, 
            #c7d2fe 75%, 
            #a5b4fc 100%
          )
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-float-complex"
            style={{
              width: `${50 + i * 15}px`,
              height: `${50 + i * 15}px`,
              left: `${10 + (i * 9)}%`,
              top: `${5 + (i * 8)}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + i * 0.4}s`
            }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${benefits[i % benefits.length].color} rounded-3xl rotate-45 opacity-40`}></div>
          </div>
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 69, 19, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 69, 19, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        {/* Pulsing circles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute rounded-full border-2 border-purple-300/20 animate-pulse-custom"
            style={{
              width: `${180 + i * 80}px`,
              height: `${180 + i * 80}px`,
              right: `${15 + i * 10}%`,
              top: `${20 + i * 8}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${3.5 + i * 0.4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping opacity-20 scale-150"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                <Star className="w-12 h-12 text-purple-600 animate-pulse" />
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 relative">
              <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 bg-clip-text text-transparent drop-shadow-2xl animate-text-shimmer">
                {t("Agents: Build Your Brand with Us")}
              </span>
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 to-pink-600/20 blur-3xl -z-10 animate-pulse"></div>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
              {t("Join the most advanced platform for real estate professionals.")}
              <br className="hidden md:block" />
              {t("Grow your business with cutting-edge tools and verified leads.")}
            </p>
            
            <div className="relative w-48 h-2 mx-auto rounded-full overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full animate-loading-wave"></div>
            </div>
          </div>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                ref={el => cardRefs.current[index] = el}
                className={`
                  relative group cursor-pointer transform-gpu transition-all duration-700
                  ${visibleCards.includes(index) ? 'animate-card-slide-up opacity-100' : 'opacity-0 translate-y-20'}
                `}
                style={{ animationDelay: `${benefit.delay}ms` }}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className={`
                  relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl
                  p-8 rounded-3xl border border-white/30 shadow-2xl overflow-hidden h-full
                  transition-all duration-700 transform-gpu
                  ${hoveredBenefit === index ? 'scale-105 shadow-purple-500/25 -translate-y-2' : 'scale-100'}
                `}>
                  
                  {/* Background overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${benefit.bgColor} opacity-0 
                    transition-all duration-700 rounded-3xl
                    ${hoveredBenefit === index ? 'opacity-100' : 'opacity-0'}
                  `}></div>
                  
                  {/* Floating particles */}
                  {hoveredBenefit === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute animate-float-particles"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.15}s`,
                          }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${benefit.color} rounded-full opacity-70`}></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shine effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transform -translate-x-full transition-transform duration-1000
                    ${hoveredBenefit === index ? 'translate-x-full' : '-translate-x-full'}
                  `}></div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-6">
                      {/* Enhanced Icon */}
                      <div className={`
                        relative w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl
                        flex items-center justify-center shadow-2xl transition-all duration-500 flex-shrink-0
                        ${hoveredBenefit === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                      `}>
                        <benefit.icon className={`
                          w-8 h-8 text-white transition-all duration-500
                          ${hoveredBenefit === index ? 'animate-bounce' : ''}
                        `} />
                        
                        <div className={`
                          absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl blur-lg opacity-0
                          transition-all duration-500
                          ${hoveredBenefit === index ? 'opacity-50 scale-150' : 'opacity-0 scale-100'}
                        `}></div>
                      </div>

                      <div className="flex-1">
                        {/* Title */}
                        <h3 className={`
                          text-2xl font-black text-slate-900 mb-3 transition-all duration-500
                          ${hoveredBenefit === index ? 'text-transparent bg-gradient-to-r bg-clip-text ' + benefit.color : ''}
                        `}>
                          {benefit.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed transition-all duration-300">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Check mark */}
                      <div className={`
                        transition-all duration-500 transform
                        ${hoveredBenefit === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                      `}>
                        <CheckCircle className="w-6 h-6 text-green-500 animate-check-mark" />
                      </div>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className={`
                    absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${benefit.color} rounded-full opacity-20
                    transition-all duration-500
                    ${hoveredBenefit === index ? 'scale-150 opacity-40 animate-pulse' : 'scale-100 opacity-20'}
                  `}></div>
                </div>

                {/* External glow */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-3xl blur-2xl opacity-0
                  transition-all duration-500 -z-10
                  ${hoveredBenefit === index ? 'opacity-20 scale-110' : 'opacity-0 scale-100'}
                `}></div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center relative">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
              <Button className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 rounded-2xl font-bold shadow-2xl border-0 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-1">
                <span className="flex items-center space-x-3">
                  <span>{t("Join as an Agent")}</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
            
            <p className="text-slate-600 mt-6 text-lg">
              {t("Already an agent?")} <a href="#" className="text-purple-600 hover:text-purple-800 font-bold transition-colors duration-300 hover:underline">{t("Sign in here")}</a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-complex {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-25px) rotate(90deg) scale(1.1); 
          }
          50% { 
            transform: translateY(8px) rotate(180deg) scale(0.9); 
          }
          75% { 
            transform: translateY(-12px) rotate(270deg) scale(1.05); 
          }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes pulse-custom {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.1); 
          }
        }
        
        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes card-slide-up {
          0% { 
            opacity: 0;
            transform: translateY(80px) scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        
        @keyframes loading-wave {
          0% { transform: translateX(-100%) scaleX(0.5); }
          50% { transform: translateX(0%) scaleX(1); }
          100% { transform: translateX(100%) scaleX(0.5); }
        }
        
        @keyframes float-particles {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes check-mark {
          0% {
            transform: scale(0) rotate(-45deg);
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-float-complex { animation: float-complex 8s ease-in-out infinite; }
        .animate-grid-move { animation: grid-move 18s linear infinite; }
        .animate-pulse-custom { animation: pulse-custom 5s ease-in-out infinite; }
        .animate-text-shimmer { 
          animation: text-shimmer 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .animate-card-slide-up { animation: card-slide-up 0.8s ease-out; }
        .animate-loading-wave { animation: loading-wave 3s ease-in-out infinite; }
        .animate-float-particles { animation: float-particles 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-check-mark { animation: check-mark 0.6s ease-out; }
      `}</style>
    </section>
  );
};

export default AgentRecruitment;
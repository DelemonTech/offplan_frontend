import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Database, Award, Brain, Globe, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';

const WhyTrustUs = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Mock translation function - replace with your actual i18n
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const features = [
    {
      icon: Shield,
      title: t("Honest Advice, No Pressure"),
      description: t("Our agents provide transparent, unbiased guidance to help you make informed decisions."),
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      bgColor: "from-emerald-500/20 to-teal-500/20",
      delay: 0
    },
    {
      icon: Users,
      title: t("Choose Your Own Agent Freely"),
      description: t("Browse profiles and select the agent that best matches your preferences and language."),
      color: "from-blue-400 via-indigo-500 to-purple-600",
      bgColor: "from-blue-500/20 to-purple-500/20",
      delay: 0
    },
    {
      icon: Database,
      title: t("Real-time Developer-Synced Data"),
      description: t("Access up-to-the-minute project information directly from developer systems."),
      color: "from-orange-400 via-red-500 to-pink-600",
      bgColor: "from-orange-500/20 to-pink-500/20",
      delay:0
    },
    {
      icon: Award,
      title: t("Verified Agents Only"),
      description: t("All our agents are RERA-registered and thoroughly vetted for your security."),
      color: "from-yellow-400 via-orange-500 to-red-600",
      bgColor: "from-yellow-500/20 to-red-500/20",
      delay: 0
    },
    {
      icon: Brain,
      title: t("AI-Powered Property Matching"),
      description: t("Advanced algorithms match you with properties that fit your exact requirements."),
      color: "from-violet-400 via-purple-500 to-fuchsia-600",
      bgColor: "from-violet-500/20 to-fuchsia-500/20",
      delay: 0
    },
    {
      icon: Globe,
      title: t("Multilingual Support"),
      description: t("Communicate in your preferred language with our diverse team of international agents."),
      color: "from-pink-400 via-rose-500 to-red-600",
      bgColor: "from-pink-500/20 to-red-500/20",
      delay: 0
    }
  ];

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, features[index].delay);
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

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, 
            #f8fafc 0%, 
            #e2e8f0 25%, 
            #cbd5e1 50%, 
            #94a3b8 75%, 
            #64748b 100%
          )
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-float-complex"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 7)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i * 0.3}s`
            }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${features[i % features.length].color} rounded-2xl rotate-45 opacity-30`}></div>
          </div>
        ))}
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>

        {/* Pulsing circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute rounded-full border-2 border-white/10 animate-pulse-custom"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 12}%`,
              top: `${15 + i * 10}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping opacity-20 scale-150"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
              <Sparkles className="w-12 h-12 text-indigo-600 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 relative">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent drop-shadow-2xl animate-text-shimmer">
              {t("Why Thousands Trust Us")}
            </span>
            <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            {t("We've revolutionized the off-plan property market with transparency, technology, and trust.")}
          </p>
          
          <div className="relative w-48 h-2 mx-auto rounded-full overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full animate-loading-wave"></div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={el => cardRefs.current[index] = el}
              className={`
                relative group cursor-pointer transform-gpu transition-all duration-700
                ${visibleCards.includes(index) ? 'animate-card-slide-up opacity-100' : 'opacity-0 translate-y-20'}
              `}
              style={{ animationDelay: `${feature.delay}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className={`
                relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl
                p-8 rounded-3xl border border-white/30 shadow-2xl overflow-hidden h-full
                transition-all duration-700 transform-gpu
                ${hoveredCard === index ? 'scale-105 shadow-indigo-500/25 -translate-y-2' : 'scale-100'}
              `}>
                
                {/* Animated background overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 
                  transition-all duration-700 rounded-3xl
                  ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
                `}></div>
                
                {/* Floating particles effect */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-float-particles"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full opacity-60`}></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Shine effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -translate-x-full transition-transform duration-1000
                  ${hoveredCard === index ? 'translate-x-full' : '-translate-x-full'}
                `}></div>

                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className="flex items-center mb-6 gap-4">
                    <div className={`
                      relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl
                      flex items-center justify-center shadow-2xl transition-all duration-500
                      ${hoveredCard === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                    `}>
                      <feature.icon className={`
                        w-8 h-8 text-white transition-all duration-500
                        ${hoveredCard === index ? 'animate-bounce' : ''}
                      `} />
                      
                      {/* Icon glow effect */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-0
                        transition-all duration-500
                        ${hoveredCard === index ? 'opacity-50 scale-150' : 'opacity-0 scale-100'}
                      `}></div>
                    </div>

                    {/* Check mark animation */}
                    <div className={`
                      transition-all duration-500 transform
                      ${hoveredCard === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    `}>
                      <CheckCircle className="w-6 h-6 text-green-500 animate-check-mark" />
                    </div>
                  </div>

                  {/* Title with enhanced typography */}
                  <h3 className={`
                    text-2xl font-black text-slate-900 mb-4 transition-all duration-500
                    ${hoveredCard === index ? 'text-transparent bg-gradient-to-r bg-clip-text ' + feature.color : ''}
                  `}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6 transition-all duration-300">
                    {feature.description}
                  </p>

                  {/* Enhanced CTA */}
                  <div className={`
                    flex items-center space-x-2 text-sm font-semibold transition-all duration-500
                    ${hoveredCard === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                  `}>
                    <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {t("Discover More")}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hoveredCard === index ? 'translate-x-1' : ''}`} 
                      style={{ color: `rgb(${hoveredCard === index ? '99, 102, 241' : '100, 116, 139'})` }} />
                  </div>
                </div>

                {/* Corner decoration */}
                <div className={`
                  absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full opacity-20
                  transition-all duration-500
                  ${hoveredCard === index ? 'scale-150 opacity-40 animate-pulse' : 'scale-100 opacity-20'}
                `}></div>
              </div>

              {/* External glow effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-2xl opacity-0
                transition-all duration-500 -z-10
                ${hoveredCard === index ? 'opacity-20 scale-110' : 'opacity-0 scale-100'}
              `}></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-complex {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-30px) rotate(90deg) scale(1.1); 
          }
          50% { 
            transform: translateY(10px) rotate(180deg) scale(0.9); 
          }
          75% { 
            transform: translateY(-15px) rotate(270deg) scale(1.05); 
          }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
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
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-pulse-custom { animation: pulse-custom 6s ease-in-out infinite; }
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

export default WhyTrustUs;
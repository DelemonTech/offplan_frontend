
import { Search, UserCheck, Shield, Sparkles } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';

const HowItWorks = () => {
  const { t } = useTranslation();
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  // Mouse tracking for dynamic background
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

  // Intersection Observer for step animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleSteps.includes(index)) {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, index]);
              }, index * 200);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

  const steps = [
    
    {
      number: "01", 
      icon: UserCheck,
      title: t("Choose Your Agent"),
      description: t("Select from our verified agents based on language, expertise, and customer reviews."),
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      bgColor: "from-emerald-500/20 to-teal-500/20"
    },
    {
      number: "02",
      icon: Search,
      title: t("Explore Projects"),
      description: t("Browse through verified off-plan projects with real-time data and detailed information."),
      color: "from-blue-400 via-indigo-500 to-purple-600",
      bgColor: "from-blue-500/20 to-purple-500/20"
    },
    {
      number: "03",
      icon: Shield,
      title: t("Secure Your Investment"),
      description: t("Get expert guidance through the entire process and secure your dream property."),
      color: "from-orange-400 via-red-500 to-pink-600",
      bgColor: "from-orange-500/20 to-pink-500/20"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, 
            #ffffff 0%, 
            #f8fafc 25%, 
            #f1f5f9 50%, 
            #e2e8f0 75%, 
            #cbd5e1 100%
          )
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float-complex"
            style={{
              width: `${40 + i * 12}px`,
              height: `${40 + i * 12}px`,
              left: `${5 + (i * 11)}%`,
              top: `${10 + (i * 9)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i * 0.5}s`
            }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${steps[i % steps.length].color} rounded-full opacity-60`}></div>
          </div>
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10" id="steps">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20 scale-150"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                <Sparkles className="w-10 h-10 text-blue-600 animate-pulse" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 relative">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent drop-shadow-2xl animate-text-shimmer">
                {t("How It Works")}
              </span>
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
              {t("Simple 3-step process to find and secure your perfect off-plan property.")}
            </p>
            
            <div className="relative w-32 h-1 mx-auto rounded-full overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-loading-wave"></div>
            </div>
          </div>

          {/* Enhanced Steps Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-32 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse"></div>
              
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  ref={el => stepRefs.current[index] = el}
                  className={`
                    text-center relative transform-gpu transition-all duration-700
                    ${visibleSteps.includes(index) ? 'animate-card-slide-up opacity-100' : 'opacity-0 translate-y-20'}
                  `}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative group">
                    {/* Step Number Circle */}
                    <div className="relative mb-8">
                      <div className={`
                        w-24 h-24 bg-gradient-to-br ${step.color} rounded-full 
                        flex items-center justify-center mx-auto shadow-2xl relative z-10
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
                      `}>
                        <span className="text-white text-2xl font-black">{step.number}</span>
                      </div>
                      <div className={`
                        absolute inset-0 w-24 h-24 bg-gradient-to-br ${step.color} rounded-full mx-auto 
                        animate-pulse opacity-30 group-hover:opacity-50 transition-all duration-500
                      `}></div>
                    </div>

                    {/* Enhanced Icon */}
                    <div className={`
                      relative w-20 h-20 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl
                      rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-8 
                      border border-white/30 transition-all duration-500 group-hover:scale-110
                      group-hover:-translate-y-2
                    `}>
                      <step.icon className={`
                        w-10 h-10 text-gradient-to-br ${step.color.replace('from-', '').replace('via-', '').replace('to-', '').split(' ')[0]} 
                        transition-all duration-500 group-hover:animate-bounce
                      `} style={{color: '#3b82f6'}} />
                      
                      {/* Icon glow effect */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl opacity-0
                        transition-all duration-500 group-hover:opacity-100
                      `}></div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="relative">
                      <h3 className={`
                        text-2xl md:text-3xl font-black text-slate-900 mb-4 transition-all duration-500
                        group-hover:group-hover:bg-gradient-to-r group-hover:bg-clip-text
                      `} 
                      style={{
                        backgroundImage: visibleSteps.includes(index) ? 
                          `linear-gradient(to right, ${step.color.match(/from-(\w+-\d+)/)?.[1]}, ${step.color.match(/to-(\w+-\d+)/)?.[1]})` : 'none'
                      }}>
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg transition-all duration-300 group-hover:text-slate-700">
                        {step.description}
                      </p>
                    </div>

                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute animate-float-particles"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full opacity-70`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
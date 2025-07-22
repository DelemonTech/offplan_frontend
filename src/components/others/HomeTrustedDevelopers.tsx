import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import emaar from '@/assets/HomePage/Emaar-properties.png';
import damac from '@/assets/HomePage/DAMAC_Properties.png';
import sobha from '@/assets/HomePage/Sobha-Dubai.png';
import nakheel from '@/assets/HomePage/Nakheel.png';
import azizi from '@/assets/HomePage/azizi.png';
import meraas from '@/assets/HomePage/Meraas_Properties.png';
import { Star } from 'lucide-react';
const TrustedDevelopers = () => {
  const { t } = useTranslation();
  const [visibleLogos, setVisibleLogos] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef(null);
  const logoRefs = useRef([]);

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

  // Intersection Observer for logo animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = logoRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleLogos.includes(index)) {
              setTimeout(() => {
                setVisibleLogos(prev => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    logoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleLogos]);

  const developers = [
    { name: "EMAAR", logo: `${emaar}`, color: "from-blue-500 to-indigo-600"},
    { name: "DAMAC", logo: `${damac}`, color: "from-purple-500 to-pink-600" },
    { name: "SOBHA", logo: `${sobha}` , color: "from-green-500 to-emerald-600" },
    { name: "NAKHEEL", logo: `${nakheel}` , color: "from-orange-500 to-red-600" },
    { name: "AZIZI", logo: `${azizi}`, color: "from-cyan-500 to-blue-600" },
    { name: "MERAAS", logo:`${meraas}`, color: "from-violet-500 to-purple-600" }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, 
            #ffffff 0%, 
            #fafafa 50%, 
            #f5f5f5 100%
          )
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating brand elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5 animate-float-complex"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + (i * 15)}%`,
              top: `${15 + (i * 12)}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${4 + i * 0.2}s`
            }}
          >
            {/* White background wrapper */}
            <div className="w-full h-full bg-white rounded-xl shadow-md flex items-center justify-center">
              {/* Logo or gradient */}
              <div
                className={`w-4/5 h-4/5 bg-gradient-to-br ${developers[i].color} rounded-lg rotate-12`}
              ></div>
            </div>
          </div>

        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-ping opacity-20 scale-150"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                <Star className="w-8 h-8 text-violet-600 animate-pulse" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent drop-shadow-2xl animate-text-shimmer">
                {t("Trusted by the Most Respected Developers in the UAE")}
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-purple-600/20 blur-2xl -z-10 animate-pulse"></div>
            </h2>

            <div className="relative w-32 h-1 mx-auto rounded-full overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full animate-loading-wave"></div>
            </div>
          </div>

          {/* Enhanced Developer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {developers.map((developer, index) => (
              <div
                key={developer.name}
                ref={el => logoRefs.current[index] = el}
                className={`
                  group cursor-pointer transform-gpu transition-all duration-700
                  ${visibleLogos.includes(index) ? 'animate-card-slide-up opacity-100' : 'opacity-0 translate-y-10'}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative">
                  {/* Logo Container */}
                  <div className={`
                    relative w-32 h-24 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl
                    rounded-2xl flex items-center justify-center shadow-2xl border border-white/30
                    transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2
                    group-hover:shadow-purple-500/25
                  `}>
                    <div className="flex items-center justify-center w-full h-full p-2">
                      <img
                        src={`${developer.logo}`} // Add `logoSrc` field in developers array
                        alt={`${developer.name} Logo`}
                        className="object-contain w-full h-full"
                      />
                    </div>


                    {/* Hover background */}
                    <div className={`
                      absolute inset-0 bg-white ${developer.color} opacity-0 rounded-2xl
                      transition-all duration-500 group-hover:opacity-10
                    `}></div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                  </div>

                  {/* Developer Name */}
                  <div className="mt-4 text-center">
                    <span className={`
                      text-sm font-bold text-slate-600 transition-all duration-300
                      group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text
                    `}
                      style={{
                        backgroundImage: visibleLogos.includes(index) ?
                          `linear-gradient(to right, ${developer.color.match(/from-(\w+-\d+)/)?.[1]}, ${developer.color.match(/to-(\w+-\d+)/)?.[1]})` : 'none'
                      }}>
                      {developer.name}
                    </span>
                  </div>

                  {/* External glow */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${developer.color} rounded-2xl blur-xl opacity-0
                    transition-all duration-500 -z-10 group-hover:opacity-20 group-hover:scale-125
                  `}></div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-float-particles"
                        style={{
                          left: `${25 + Math.random() * 50}%`,
                          top: `${25 + Math.random() * 50}%`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      >
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${developer.color} rounded-full opacity-80`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-complex {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-20px) rotate(90deg) scale(1.05); 
          }
          50% { 
            transform: translateY(10px) rotate(180deg) scale(0.95); 
          }
          75% { 
            transform: translateY(-15px) rotate(270deg) scale(1.02); 
          }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes card-slide-up {
          0% { 
            opacity: 0;
            transform: translateY(60px) scale(0.9);
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
            transform: translateY(-15px) rotate(180deg);
            opacity: 1;
          }
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

        .animate-float-complex { animation: float-complex 10s ease-in-out infinite; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-text-shimmer { 
          animation: text-shimmer 4s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .animate-card-slide-up { animation: card-slide-up 0.8s ease-out; }
        .animate-loading-wave { animation: loading-wave 2.5s ease-in-out infinite; }
        .animate-float-particles { animation: float-particles 2.5s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
      `}</style>
    </section>
  );
};

export default TrustedDevelopers;

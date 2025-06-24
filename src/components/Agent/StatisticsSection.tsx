
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const StatisticsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    investors: 0,
    successRate: 0,
    avgROI: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      key: 'projects',
      target: 1531,
      label: "Premium Projects",
      icon: "🏢",
      suffix: ""
    },
    {
      key: 'investors',
      target: 130,
      label: "Happy Investors",
      icon: "👥",
      suffix: ""
    },
    {
      key: 'successRate',
      target: 96,
      label: "Success Rate",
      icon: "📈",
      suffix: "%"
    },
    {
      key: 'avgROI',
      target: 8,
      label: "Avg. ROI",
      icon: "💰",
      suffix: "%"
    }
  ];

  // Function to animate counter from 0 to target value
  const animateCounter = (key: string, target: number, duration: number = 1500) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

      setCounters(prev => ({
        ...prev,
        [key]: currentValue
      }));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Start animations with slight delays for better visual effect
          stats.forEach((stat, index) => {
            setTimeout(() => {
              animateCounter(stat.key, stat.target, 1500);
            }, index * 200);
          });
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Investors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our track record speaks for itself. Join the growing community of successful investors.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {counters[stat.key as keyof typeof counters].toLocaleString('en-US')}{stat.suffix}
              </div>
              <div className="text-sm lg:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

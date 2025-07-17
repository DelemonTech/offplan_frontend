
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

const TopRatedAgents = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const agents = [
    {
      id: 1,
      name: "Sarah Ahmed",
      nationality: "🇪🇬",
      languages: ["Arabic", "English", "French"],
      rating: 4.9,
      reviews: 127,
      avatar: "SA"
    },
    {
      id: 2,
      name: "Michael Johnson",
      nationality: "🇺🇸",
      languages: ["English", "Spanish"],
      rating: 4.8,
      reviews: 89,
      avatar: "MJ"
    },
    {
      id: 3,
      name: "Priya Sharma",
      nationality: "🇮🇳",
      languages: ["Hindi", "English", "Urdu"],
      rating: 5.0,
      reviews: 156,
      avatar: "PS"
    },
    {
      id: 4,
      name: "Ahmed Al Mansouri",
      nationality: "🇦🇪",
      languages: ["Arabic", "English"],
      rating: 4.9,
      reviews: 203,
      avatar: "AM"
    },
    {
      id: 5,
      name: "Elena Rodriguez",
      nationality: "🇪🇸",
      languages: ["Spanish", "English", "Portuguese"],
      rating: 4.7,
      reviews: 74,
      avatar: "ER"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("Top Rated Agents")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("Connect with verified, multilingual professionals who understand your needs.")}
          </p>
          <div className="w-24 h-1 bg-offplan-gradient mx-auto rounded-full mt-8"></div>
        </div>

        {/* Agent Carousel */}
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {agents.map((agent, index) => (
              <div 
                key={agent.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 min-w-[280px] hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-offplan-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl font-bold">{agent.avatar}</span>
                  </div>

                  {/* Name and Nationality */}
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{agent.name}</h3>
                    <span className="text-xl">{agent.nationality}</span>
                  </div>

                  {/* Languages */}
                  <div className="mb-3">
                    <div className="flex flex-wrap justify-center gap-1">
                      {agent.languages.map((lang) => (
                        <span 
                          key={lang}
                          className="text-xs bg-offplan-purple/10 text-offplan-purple px-2 py-1 rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{agent.rating}</span>
                    <span className="text-gray-600 text-sm">({agent.reviews} {t("reviews")})</span>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-offplan-purple text-offplan-purple hover:bg-offplan-purple hover:text-white"
                  >
                    {t("View Full Profile")}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button 
            variant="outline" 
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center mt-8">
          <Button className="btn-secondary">
            {t("View All Agents")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedAgents;

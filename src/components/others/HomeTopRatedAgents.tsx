
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const TopRatedAgents = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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
      name: "Sahar Kalhor",
      username: "sahar",
      nationality: "🇦🇪",
      languages: ["Arabic", "English", "Farsi"],
      rating: 4.9,
      reviews: 127,
      avatar: <img src="https://offplanmarket.netlify.app/assets/girl-BUZ38C6H.jpg" alt="Sahar Kalhor" className="w-20 h-20 rounded-full" />
    },
    {
      id: 2,
      name: "Mohammed Erfani",
      username: "erfani",
      nationality: "🇦🇪",
      languages: ["English", "Arabic", "Farsi"],
      rating: 4.9,
      reviews: 122,
      avatar: <img src="https://s3.us-east-1.amazonaws.com/offplan.market/IMG_0620.JPG" alt="Mohammed Erfani" className="w-20 h-20 rounded-full" />
    },
    {
      id: 3,
      name: "Maryam",
      username: "maryam",
      nationality: "🇦🇪",
      languages: ["Arabic", "English", "Farsi"],
      rating: 4.9,
      reviews: 156,
      avatar: <img src="https://s3.us-east-1.amazonaws.com/offplan.market/maryam_img.jpeg" alt="Maryam" className="w-20 h-20 rounded-full" />
    },
    // {
    //   id: 4,
    //   name: "Ahmed Al Mansouri",
    //   nationality: "🇦🇪",
    //   languages: ["Arabic", "English"],
    //   rating: 4.9,
    //   reviews: 203,
    //   avatar: "AM"
    // },
    // {
    //   id: 5,
    //   name: "Elena Rodriguez",
    //   nationality: "🇪🇸",
    //   languages: ["Spanish", "English", "Portuguese"],
    //   rating: 4.7,
    //   reviews: 74,
    //   avatar: "ER"
    // }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 flex-wrap justify-center">
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
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide sm:flex-wrap sm:justify-center">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 
                 min-w-[250px] sm:min-w-[280px] lg:min-w-[320px] hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 lg:w-22 lg:h-22 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl lg:text-3xl font-bold">{agent.avatar}</span>
                  </div>

                  {/* Name and Nationality */}
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <h3 className="font-bold text-xl lg:text-2xl text-gray-900">{agent.name}</h3>
                    <span className="text-2xl lg:text-3xl">{agent.nationality}</span>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {agent.languages.map((lang) => (
                        <span
                          key={lang}
                          className="text-sm lg:text-base bg-offplan-purple/10 text-offplan-purple px-3 py-1 rounded-full font-semibold transition-colors hover:bg-offplan-purple hover:text-white"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-2 mb-5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900 text-lg">{agent.rating}</span>
                    <span className="text-gray-600 text-sm lg:text-base">
                      ({agent.reviews} {t("reviews")})
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href={`/${agent.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                  <Button
                    // onClick={() => navigate(`/${agent.username}`)}
                    variant="outline"
                    size="sm"
                    className="w-full border-offplan-purple text-offplan-purple hover:bg-offplan-purple hover:text-white text-base lg:text-lg"
                  >
                    {t("View Full Profile")}
                  </Button>
                  </a>
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

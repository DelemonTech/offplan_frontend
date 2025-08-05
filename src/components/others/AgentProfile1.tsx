
import React, { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Girl from '../assets/girl.jpg';
import { Agent } from '@/types/agent';
// import { fetchAgentDetails } from '@/components/AgentFetchDetails';
import '@/i18n';
import { useTranslation } from 'react-i18next';

type Props = {
  agent: Agent | null;
};

const AgentProfile = ({ agent }: Props) => {
  const { t, i18n } = useTranslation();
  const { username } = useParams<{ username: string }>()
  // const [agent, setAgent] = useState<Agent | null>(null)
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
  };
  // const agent = {
  //   name: t("Sahar Kalhor "),
  //   // username: agentUsername,
  //   email: "Sahar@offplan.market",
  //   phone: "+971 52 952 9687",
  //   whatsapp: "+971529529687",
  //   // profileImage: {Girl},
  //   bio: t("More than just an agent — Sahar is your trusted advisor in navigating Dubai’s off-plan landscape. With deep industry knowledge and a passion for matching clients with the right properties, she brings clarity, confidence, and care to every deal."),
  //   totalSales: "150+",
  //   experience: "6+ "+ t("Years")
  // };

  if (!agent) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#f24ca0] border-opacity-50"></div>
        <span className="text-[#f24ca0] font-semibold text-lg">{t("Loading ...")}</span>
      </div>
    </div>
  );
}


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Dubai Modern Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop')"
        }}
      ></div>

      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/50 to-transparent"></div>
      </div>

      {/* Glass Morphism Elements */}
      <div className="absolute top-10 md:top-20 right-10 md:right-20 w-32 h-32 md:w-64 md:h-64 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"></div>
      <div className="absolute bottom-16 md:bottom-32 left-8 md:left-16 w-16 h-16 md:w-32 md:h-32 bg-pink-200/30 backdrop-blur-sm rounded-2xl border border-white/30 rotate-12"></div>

      {/* Header */}
      {/*<div className="relative z-10 flex justify-between items-center p-4 md:p-6">
         <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/d0addd95-fc49-4adb-8b07-3beb7257a566.png" 
            alt="Off Plan Market" 
            className="h-8 md:h-10 w-auto"
          />
        </div> */}
      {/* <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-sm md:text-base px-3 md:px-4 py-2">
          Browse All Properties
        </Button> 
      </div>*/}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-100 border border-green-200 rounded-full px-3 md:px-4 py-1 md:py-2 mb-6 md:mb-8">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-xs md:text-sm font-medium">{t("Currently Online")}</span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
              {agent.name}
            </h2>

            <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 leading-relaxed">
              {agent.description}
            </p>

            {/* Modern Stats Cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/50">
                <div className="text-2xl md:text-3xl font-bold text-pink-600 mb-1 md:mb-2">{agent.total_business_deals}</div>
                <div className="text-sm md:text-base text-gray-600">{t("Business Deals")}</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/50">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">{agent.years_of_experience}</div>
                <div className="text-sm md:text-base text-gray-600">{t("Experience")}</div>
              </div>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col gap-3 md:gap-4">
              <a
                href={`tel:${agent.phone_number}`}
                className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-2xl shadow-lg w-full min-h-[48px]">
                <Phone className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
                {t("Call Now")}
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base rounded-2xl min-h-[48px]">
                  <Mail className="mr-2 h-4 w-4" />
                  {t("Email")}
                </a>
                <a
                  href={`https://wa.me/${agent.whatsapp_number}?text=Hi, I'm interested in your off-plan properties`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-3 md:py-4 text-sm md:text-base rounded-2xl min-h-[48px]">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("WhatsApp")}
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Modern Agent Display */}

          <div className="relative order-1 lg:order-2">
            <div className="relative z-10">
              {/* Main Image */}
              {agent && (
                <div className="relative">

                  <img
                    src={agent.profile_image_url}
                    // alt={agent.name}
                    className="w-full h-80 md:h-[500px] lg:h-[600px] object-cover rounded-3xl shadow-2xl"
                  />


                  {/* Floating Achievement Card */}
                  <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-white/50">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-base md:text-lg">#1</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm md:text-base">{t("Top Performer")}</div>
                        <div className="text-xs md:text-sm text-gray-600">{agent.rank_top_performing}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-full h-full bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-3xl -z-10"></div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default AgentProfile;

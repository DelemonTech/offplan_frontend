
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageCircle, Briefcase, Clock, Star, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import RatingBox from './RatingBox';
import girl from '@/static/girl.jpg'

const AgentProfile = ({ agent, project }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState('');
  const [showFullText, setShowFullText] = useState(false);

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hi ${agent.name}, I'm interested in off-plan properties. Can you help me?

  Here's the link: ${window.location.href}`);
    window.open(`https://wa.me/${agent.phone_number}?text=${message}`, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation request:', formData);
    // Handle form submission here
  };

  const truncateText = `From Dubai’s skyline dreams to smart investments — ${agent.name} brings`;
  const truncateIndex = agent.description.indexOf(truncateText) + truncateText.length;

  const shortDescription = agent.description.slice(0, truncateIndex);
  const remainingDescription = agent.description.slice(truncateIndex);


  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Modern Agent Section */}
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

            {/* Left Column - Agent Image, Stats, and Buttons */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative flex flex-col w-full max-w-sm">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50">
                  <img
                    src={agent.profile_image_url}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Modern gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Top Agent Badge - Modern Design */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">Top Agent</span>
                    </div>
                  </div>
                </div>

                {/* Stats section - Below the image */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-gray-200/50 shadow-lg mt-4">
                  <div className="flex items-center justify-around text-gray-700">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Briefcase className="w-4 h-4 mr-1" />
                      </div>
                      <div className="text-2xl font-bold">{agent.total_business_deals}</div>
                      <div className="text-xs opacity-80">Deals</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                      </div>
                      <div className="text-2xl font-bold">{agent.years_of_experience.split(" ")[0]}</div>
                      <div className="text-xs opacity-80">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                      </div>
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-xs opacity-80">Rating</div>
                    </div>
                  </div>
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="flex-grow"></div>

                {/* Quick Contact Buttons - At the bottom */}
                {agent && project && (
                  <div className="flex flex-col gap-4 mt-6">
                    <a
                      href={`https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(`Hi ${agent.name}, I'm interested in your off-plan properties.\n\nHere's the link: ${window.location.href}/property-details/?id=${project.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <MessageCircle size={18} className="mr-2" />
                        WhatsApp Now
                      </Button>
                    </a>

                    <a href={`tel:${agent.phone_number}`}>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Phone size={18} className="mr-2" />
                        Call Now
                      </Button>
                    </a>
                  </div>
                )}

              </div>
            </div>

            {/* Middle Column - Agent Info and Rating */}
            <div className="lg:col-span-4 flex flex-col text-center lg:text-left">

              {/* Name and Title */}
              <div className="mb-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {agent.name}
                </h2>
                <p className="text-2xl text-gray-600 font-medium mb-4">
                  Your Trusted Off-Plan Expert
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-lg font-semibold text-gray-700 ml-2">4.9 out of 5</span>
                </div>
              </div>

              {/* Description with See more/less */}
              <div className="mb-6 flex-shrink-0">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {shortDescription}
                  {!showFullText && remainingDescription && (
                    <>
                      ...
                      <button
                        onClick={() => setShowFullText(true)}
                        className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1 transition-colors ml-1"
                      >
                        See more <ChevronDown size={16} />
                      </button>
                    </>
                  )}
                  {showFullText && (
                    <>
                      {remainingDescription}
                      <button
                        onClick={() => setShowFullText(false)}
                        className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1 transition-colors ml-1"
                      >
                        See less <ChevronUp size={16} />
                      </button>
                    </>
                  )}
                </p>
              </div>

              {/* Rating Box - Takes up remaining space */}
              <div className="flex-grow flex items-start">
                <div className="w-full">
                  <RatingBox agent={agent} />
                </div>
              </div>
            </div>

            {/* Right Column - Consultation Form */}
            <div className="lg:col-span-4 flex">
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-6 shadow-2xl border border-purple-400/20 w-full flex flex-col">

                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">📬</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    Book a Free Consultation
                  </h3>
                  <p className="text-purple-100 text-sm">
                    Get personalized property recommendations
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div className="relative">
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField('')}
                      className="h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-transparent focus:border-white focus:ring-white/30 peer transition-all duration-200 rounded-xl"
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'fullName' || formData.fullName
                        ? '-top-2 text-xs text-white bg-purple-600 px-2 transform scale-90 font-medium rounded'
                        : 'top-3 text-white/70 transform scale-100'
                        }`}
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className="h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-transparent focus:border-white focus:ring-white/30 peer transition-all duration-200 rounded-xl"
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                        ? '-top-2 text-xs text-white bg-purple-600 px-2 transform scale-90 font-medium rounded'
                        : 'top-3 text-white/70 transform scale-100'
                        }`}
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <Input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('whatsapp')}
                      onBlur={() => setFocusedField('')}
                      className="h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-transparent focus:border-white focus:ring-white/30 peer transition-all duration-200 rounded-xl"
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'whatsapp' || formData.whatsapp
                        ? '-top-2 text-xs text-white bg-purple-600 px-2 transform scale-90 font-medium rounded'
                        : 'top-3 text-white/70 transform scale-100'
                        }`}
                    >
                      WhatsApp Number
                    </label>
                  </div>

                  <div className="relative flex-grow">
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      className="min-h-[120px] bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-transparent focus:border-white focus:ring-white/30 resize-none transition-all duration-200 rounded-xl h-full"
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message
                        ? '-top-2 text-xs text-white bg-purple-600 px-2 transform scale-90 font-medium rounded'
                        : 'top-3 text-white/70 transform scale-100'
                        }`}
                    >
                      Your Message
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-white text-purple-700 hover:bg-gray-100 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-auto"
                  >
                    <Send size={18} className="mr-2" />
                    Submit Request
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentProfile;

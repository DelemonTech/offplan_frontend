import React, { useState, useEffect } from 'react';
import { Building2, Award, Users, Globe, MapPin, Star, Sparkles, ExternalLink, Trophy, Shield, Target, TrendingUp, CheckCircle, Calendar, Heart, Home, Camera, Play, ChevronRight, ArrowRight, Phone, Mail, Clock, Eye, Download, Share2, Check } from 'lucide-react';
import Header from '@/components/others/HomeHeader';
import Footer from "@/components/Agent/Footer";
import object1 from '@/assets/HomePage/object-1.jpg';
import { SEOHead } from "@/components/SEOHead";

const Object1DeveloperProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const handleShare = async () => {
    setShareLoading(true);
    
    const shareData = {
      title: "🏗️ Object 1 - Visionary Real Estate Developer",
      text: `Discover Object 1 - Pioneering innovative real estate development since 2015 🌟

✨ Key Highlights:
• 9+ years of cutting-edge development
• 50+ premium projects across Dubai & UAE
• Award-winning luxury & sustainable developments
• Strong presence in Downtown Dubai, DIFC & Business Bay

🏢 Featured Projects:
• Object Tower - Iconic mixed-use development
• Object Residences - Ultra-luxury residential complex
• Object Plaza - Premium commercial hub
• Object Marina - Waterfront luxury living

💼 Why Choose Object 1:
• Innovative architectural design
• Sustainable & eco-friendly developments
• Prime locations in Dubai's business districts
• Premium quality & luxury amenities

Contact our expert agent for exclusive off-plan opportunities!`,
      url: window.location.href || 'https://offplan.market/zoya'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Share successful via native share sheet');
        setShareLoading(false);
        return;
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Share cancelled by user');
          setShareLoading(false);
          return;
        } else {
          console.error('Native share failed:', err);
        }
      }
    }

    await fallbackToClipboard(shareData);
    setShareLoading(false);
  };

  const fallbackToClipboard = async (shareData) => {
    const textToShare = `${shareData.title}

${shareData.text}

🔗 Learn more: ${shareData.url}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToShare;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
          alert(`Please copy this URL manually: ${shareData.url}`);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      alert(`Please copy this URL manually: ${shareData.url}`);
    }
  };

  // Featured projects
  const featuredProjects = [
    {
      id: 1,
      name: "Object Tower",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      location: "Downtown Dubai",
      status: "Under Development",
      type: "Mixed-Use Tower",
      year: "2026",
      units: "500+ Units"
    },
    {
      id: 2,
      name: "Object Residences",
      image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=600&h=400&fit=crop",
      location: "DIFC",
      status: "Under Development",
      type: "Ultra-Luxury Residences",
      year: "2027",
      units: "200+ Units"
    },
    {
      id: 3,
      name: "Object Plaza",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
      location: "Business Bay",
      status: "Completed",
      type: "Commercial Hub",
      year: "2024",
      units: "150+ Units"
    },
    {
      id: 4,
      name: "Object Marina",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      location: "Dubai Marina",
      status: "Planning",
      type: "Waterfront Living",
      year: "2028",
      units: "800+ Units"
    }
  ];

  const handleExploreProperties = () => {
    window.open('https://offplan.market/zoya', '_blank');
  };

  const handleContactAgent = () => {
    window.open('https://offplan.market/zoya', '_blank');
  };

  const handleWhatsApp = () => {
    const message = `Hi Zoya! I'm interested in Object 1 properties. Can you share more details?`
    const whatsappUrl = `https://wa.me/971505423008?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced SEO Head with comprehensive meta tags */}
      <SEOHead
        title="Top Agents for Object1 Properties | Trusted Experts"
        description="Find the best agents for Object1 Properties offering expert guidance, market insights, and personalized service to help you buy or sell your dream property easily."
        keywords="off-plan properties UAE, Dubai real estate, property investment, luxury homes Dubai, real estate agents UAE, new developments Dubai, off-plan apartments, Dubai properties for sale, UAE property market, real estate investment Dubai"
        canonical="https://offplan.market/"
        type="website"
        image="https://offplan.market/lovable-uploads/93c61de1-b334-4926-a59a-2934c6cb5135.png"
      />
      {/* Background Effects */}
      <Header />
      <div className="mt-10 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-8">
        {/* Developer Header */}
        <div
        className="rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden bg-cover bg-center"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565402170291-8491f14678db?w=1200&h=600&fit=crop')",
        }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
            {/* Developer Logo & Basic Info */}
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-2xl">
                <div className="text-white text-6xl font-bold">
                  <img src={object1} alt="Object 1 Logo" className="w-24 h-24 object-contain"/>
                </div>
              </div>
              <h1 className='sr-only'>Agents for Object1 properties</h1>
              <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Object 1
              </p>
              <p className="bg-gradient-to-r from-blue-700 to-red-500 text-lg mb-4 bg-clip-text text-transparent font-semibold">Visionary Development Since 2015</p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 ml-2">(4.8/5)</span>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">9+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
                <div className="text-gray-600 text-sm">Premium Projects</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-pink-600 mb-1">15K+</div>
                <div className="text-gray-600 text-sm">Units Delivered</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-gray-600 text-sm">Sustainable</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleExploreProperties}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <Eye size={20} />
                View All Properties
                <ExternalLink size={18} />
              </button>
              
              <button
                onClick={handleWhatsApp}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <Phone size={20} />
                Contact Agent
                <ArrowRight size={18} />
              </button>
              
              <div className="flex gap-2">
                <button 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/80 text-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 font-medium border border-gray-200"
                  onClick={() => {alert('Brochure download coming soon!');}}
                >
                  <Download size={18} />
                  Download Brochure
                </button>
                <button 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/80 text-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 font-medium border border-gray-200 disabled:opacity-50"
                  onClick={handleShare}
                  disabled={shareLoading}
                >
                  {shareLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Share2 size={18} />
                  )}
                  {shareLoading ? "Sharing..." : copied ? "Copied!" : "Share"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-2 mb-8 border border-white/20">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: Building2 },
              { id: 'projects', label: 'Projects', icon: Home },
              { id: 'achievements', label: 'Achievements', icon: Trophy },
              { id: 'about', label: 'About', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100/60'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Overview */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Developer Overview
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">2015</div>
                    <div className="text-gray-600 text-sm">Established</div>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Innovation</div>
                    <div className="text-gray-600 text-sm">Driven</div>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Premium</div>
                    <div className="text-gray-600 text-sm">Quality</div>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Sustainable</div>
                    <div className="text-gray-600 text-sm">Development</div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  Object 1 is a visionary real estate developer specializing in innovative, sustainable, and 
                  ultra-premium developments across Dubai's most prestigious locations. Since 2015, we've been 
                  redefining luxury living through cutting-edge architecture, smart technology integration, and 
                  environmental consciousness. Our portfolio represents the pinnacle of modern urban development.
                </p>
              </div>
            </div>

            {/* Featured Projects Carousel */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Featured Projects
                </h3>
                
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {featuredProjects.map((project) => (
                        <div key={project.id} className="w-full flex-shrink-0">
                          <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                              <img 
                                src={project.image} 
                                alt={project.name}
                                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                              />
                            </div>
                            <div>
                              <div className={`inline-block px-3 py-1 text-white text-sm rounded-full mb-3 ${
                                project.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                project.status === 'Under Development' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                                'bg-gradient-to-r from-orange-500 to-red-500'
                              }`}>
                                {project.status}
                              </div>
                              <h4 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h4>
                              <p className="text-gray-600 mb-4 flex items-center gap-2">
                                <MapPin size={16} />
                                {project.location}
                              </p>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p><strong>Type:</strong> {project.type}</p>
                                <p><strong>Completion:</strong> {project.year}</p>
                                <p><strong>Scale:</strong> {project.units}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {featuredProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                All Projects by Object 1
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <div key={project.id} className="bg-white/60 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                          project.status === 'Under Development' ? 'bg-blue-100 text-blue-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 flex items-center gap-1">
                        <MapPin size={14} />
                        {project.location}
                      </p>
                      <p className="text-gray-600 text-sm mb-4">{project.type}</p>
                      <button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                        onClick={handleWhatsApp}
                      >
                        Contact Agent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={handleExploreProperties}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  View All Object 1 Properties
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-8">
            {/* Awards & Recognition */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 via-orange-50/50 to-red-50/50"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Awards & Achievements
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Best Innovation</h3>
                    <p className="text-gray-600 text-sm">Dubai Design Awards 2024</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Sustainable Developer</h3>
                    <p className="text-gray-600 text-sm">UAE Green Building Awards</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Luxury Excellence</h3>
                    <p className="text-gray-600 text-sm">Premium Property Awards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Milestones */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Key Milestones
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2015 - Company Founded</div>
                      <div className="text-gray-600 text-sm">Object 1 established with vision of innovation</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2018 - First Major Project</div>
                      <div className="text-gray-600 text-sm">Object Tower groundbreaking ceremony</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2022 - Sustainability Focus</div>
                      <div className="text-gray-600 text-sm">100% carbon-neutral development commitment</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Present - Industry Leader</div>
                      <div className="text-gray-600 text-sm">50+ premium projects across Dubai</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                About Object 1
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Company Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Object 1 is a pioneering real estate developer that has been transforming Dubai's skyline 
                    since 2015. We specialize in creating innovative, sustainable, and ultra-premium developments 
                    that set new standards for luxury living and commercial excellence. Our commitment to 
                    cutting-edge design, environmental sustainability, and smart technology integration makes 
                    us a leader in the next generation of urban development.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With a focus on prime locations across Dubai's most prestigious districts, Object 1 delivers 
                    architectural masterpieces that combine aesthetic excellence with functional innovation. Our 
                    developments feature state-of-the-art amenities, sustainable building practices, and smart 
                    home technologies that cater to the sophisticated lifestyle demands of modern residents.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Core Values</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Innovation & Design Excellence</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Sustainable Development</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Premium Quality Construction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Smart Technology Integration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Customer-Centric Approach</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Locations</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>• Downtown Dubai - Iconic urban center</p>
                      <p>• DIFC - Financial district hub</p>
                      <p>• Business Bay - Commercial excellence</p>
                      <p>• Dubai Marina - Waterfront luxury</p>
                      <p>• Palm Jumeirah - Exclusive island living</p>
                      <p>• Dubai Hills - Premium community</p>
                      <p>• City Walk - Lifestyle destination</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Object 1?</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Architectural Innovation</h5>
                      <p className="text-gray-600 text-sm">Award-winning designs that push the boundaries of modern architecture</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Prime Locations</h5>
                      <p className="text-gray-600 text-sm">Strategically positioned in Dubai's most prestigious and sought-after areas</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Sustainability Focus</h5>
                      <p className="text-gray-600 text-sm">100% carbon-neutral developments with green building certifications</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Smart Living</h5>
                      <p className="text-gray-600 text-sm">Integrated IoT systems and smart home technologies in every unit</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Luxury Amenities</h5>
                      <p className="text-gray-600 text-sm">World-class facilities including spas, fitness centers, and concierge services</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Investment Value</h5>
                      <p className="text-gray-600 text-sm">Exceptional returns through premium locations and innovative design</p>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                  >
                    <Phone size={24} />
                    Connect with Object 1 Agent
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Object1DeveloperProfile;
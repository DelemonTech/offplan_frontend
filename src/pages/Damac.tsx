import React, { useState, useEffect } from 'react';
import { Building2, Award, Users, Globe, MapPin, Star, Sparkles, ExternalLink, Trophy, Shield, Target, TrendingUp, CheckCircle, Calendar, Heart, Home, Camera, Play, ChevronRight, ArrowRight, Phone, Mail, Clock, Eye, Download, Share2, Check, Crown, Gem, Palette } from 'lucide-react';
import Header from '@/components/others/HomeHeader';
import Footer from "@/components/Agent/Footer";
import damac from '@/assets/HomePage/DAMAC_Properties.png';

const DamacDeveloperProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

   const handleShare = async () => {
    setShareLoading(true);
    
    const shareData = {
      title: "🏗️ DAMAC Properties - Luxury Real Estate Developer",
      text: `Discover DAMAC Properties - Leading luxury real estate developer since 2002 🌟

✨ Key Highlights:
• 22+ years of excellence in luxury development
• 44,000+ homes delivered across 12+ countries
• Partnerships with Versace, Fendi, Bugatti & Trump
• Premium developments in Dubai, London & more

🏢 Featured Projects:
• DAMAC Hills 2 - Master community in Dubailand
• Aykon City - Mixed-use development on Sheikh Zayed Road
• DAMAC Lagoons - Waterfront community
• Marina Heights - Luxury tower in Dubai Marina

💼 Why Choose DAMAC:
• Award-winning luxury developments
• International presence & reputation
• Brand partnerships with world-famous names
• Proven track record of delivery

Contact our expert agent Mohammed Erfani for exclusive off-plan opportunities!`,
      url: window.location.href || 'https://offplan.market/erfani'
    };

    // Check if Web Share API is supported (this will trigger native share sheet on mobile)
    if (navigator.share) {
      try {
        // On mobile, this will pop up the native share sheet with all apps
        await navigator.share(shareData);
        console.log('Share successful via native share sheet');
        setShareLoading(false);
        return;
      } catch (err) {
        if (err.name === 'AbortError') {
          // User cancelled the share, that's okay
          console.log('Share cancelled by user');
          setShareLoading(false);
          return;
        } else {
          console.error('Native share failed:', err);
          // Continue to fallback
        }
      }
    }

    // Fallback for browsers without Web Share API (desktop browsers mostly)
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
        // Fallback for older browsers
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
          // Show URL in alert as last resort
          alert(`Please copy this URL manually: ${shareData.url}`);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      // Show URL in alert as last resort
      alert(`Please copy this URL manually: ${shareData.url}`);
    }
  };

  // Featured projects
  const featuredProjects = [
    {
      id: 1,
      name: "DAMAC Hills 2",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      location: "Dubailand",
      status: "Under Development",
      type: "Master Community",
      year: "2024",
      units: "10,000+ Units"
    },
    {
      id: 2,
      name: "Aykon City",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      location: "Sheikh Zayed Road",
      status: "Under Development",
      type: "Mixed-Use Development",
      year: "2025",
      units: "3,000+ Units"
    },
    {
      id: 3,
      name: "DAMAC Lagoons",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop",
      location: "Dubailand",
      status: "Launched",
      type: "Waterfront Community",
      year: "2026",
      units: "8,000+ Units"
    },
    {
      id: 4,
      name: "Marina Heights",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      location: "Dubai Marina",
      status: "Completed",
      type: "Residential Tower",
      year: "2019",
      units: "500+ Units"
    }
  ];

  const handleExploreProperties = () => {
    // window.open('https://damacproperties.com/', '_blank');
    window.open('https://offplan.market/erfani', '_blank');
  };

  const handleContactAgent = () => {
    window.open('https://offplan.market/erfani', '_blank');
  };

  const handleWhatsApp = () => {
    const message = `Hi Mohammed Erfani! I'm interested in Offplan market DAMAC properties. Can you share more details?`;
    const whatsappUrl = `https://wa.me/971509467111?text=${encodeURIComponent(message)}`;
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
      <Header />
      {/* Background Effects */}
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
            backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
            {/* Developer Logo & Basic Info */}
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 bg-gradient-to-r from-white to-white rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-2xl">
                <div className="text-orange-600 font-bold text-2xl"><img src={damac} alt="DAMAC Properties" className="w-24 h-24 object-contain"/></div>
              </div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                DAMAC Properties
              </h1>
              <p className="bg-gradient-to-r from-blue-700 to-red-500 text-lg mb-4 bg-clip-text text-transparent font-semibold">Luxury Developer Since 2002</p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 ml-2">(4.7/5)</span>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">22+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">80+</div>
                <div className="text-gray-600 text-sm">Projects Delivered</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-pink-600 mb-1">44K+</div>
                <div className="text-gray-600 text-sm">Homes Delivered</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">12+</div>
                <div className="text-gray-600 text-sm">Countries</div>
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
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/80 text-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 font-medium border border-gray-200"
                onClick={() => {window.open('https://prod-cdn.damacproperties.com/uploads/magazine/luxlife-full-mag-eng.pdf', '_blank');}}>
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
                    <div className="text-2xl font-bold text-gray-900 mb-1">2002</div>
                    <div className="text-gray-600 text-sm">Established</div>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Luxury</div>
                    <div className="text-gray-600 text-sm">Focus</div>
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
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Leader</div>
                    <div className="text-gray-600 text-sm">Market Position</div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  DAMAC Properties is a leading luxury real estate developer in the Middle East. Since 2002, 
                  we have delivered over 44,000 homes and have a development portfolio of over 44,000 units 
                  at various stages of progress worldwide. Known for our luxury developments and partnerships with world-renowned brands.
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
                              <div className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full mb-3">
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
                All Projects by DAMAC
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
                          project.status === 'Launched' ? 'bg-blue-100 text-blue-600' :
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
                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                        onClick={handleWhatsApp}>
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
                  View All DAMAC Properties
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Developer of the Year</h3>
                    <p className="text-gray-600 text-sm">Arabian Business Awards</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Luxury Developer</h3>
                    <p className="text-gray-600 text-sm">Middle East Excellence</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gem className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Design Excellence</h3>
                    <p className="text-gray-600 text-sm">International Property Awards</p>
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
                      <div className="font-semibold text-gray-900">2002 - Company Founded</div>
                      <div className="text-gray-600 text-sm">DAMAC Properties established in Dubai</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2013 - London Expansion</div>
                      <div className="text-gray-600 text-sm">First international project launched</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">2017 - Brand Partnerships</div>
                      <div className="text-gray-600 text-sm">Collaborations with Versace, Fendi, and Bugatti</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Present - Innovation Leader</div>
                      <div className="text-gray-600 text-sm">Pioneer in luxury themed developments</div>
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
                About DAMAC Properties
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Company Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    DAMAC Properties is a leading luxury real estate developer in the Middle East with a strong presence 
                    across the region. Since 2002, we have delivered over 44,000 homes and have a development portfolio 
                    of over 44,000 units at various stages of progress worldwide.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The company is known for iconic developments and partnerships with world-renowned fashion and 
                    automotive brands including Versace, Fendi, Bugatti, and Trump. DAMAC Properties trades on 
                    the London Stock Exchange and is valued at over $2.5 billion.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Core Values</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Luxury & Excellence</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Innovation in Design</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Brand Partnerships</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700">Customer Satisfaction</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Global Presence</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>• United Arab Emirates (Headquarters)</p>
                      <p>• Saudi Arabia</p>
                      <p>• Qatar</p>
                      <p>• Jordan</p>
                      <p>• Lebanon</p>
                      <p>• United Kingdom</p>
                      <p>• Oman</p>
                      <p>• Iraq</p>
                      <p>• Turkey</p>
                      <p>• Canada</p>
                      <p>• Thailand</p>
                      <p>• Maldives</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Brand Partnerships</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    DAMAC Properties is renowned for its exclusive partnerships with world-famous luxury brands, 
                    creating unique themed developments that offer residents an unparalleled lifestyle experience.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/60 rounded-xl shadow-md">
                      <Palette className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold text-sm">Versace</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-xl shadow-md">
                      <Crown className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                      <div className="font-semibold text-sm">Fendi</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-xl shadow-md">
                      <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold text-sm">Bugatti</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-xl shadow-md">
                      <Building2 className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <div className="font-semibold text-sm">Trump</div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                  >
                    <Phone size={24} />
                    Connect with DAMAC Agent Erfani
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

export default DamacDeveloperProfile;
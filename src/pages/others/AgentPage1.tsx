
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, MessageCircle, ArrowLeft, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Menu, X } from 'lucide-react';
import PropertyFilters from '@/components/others/PropertyFilters';
import ProjectListing from '@/components/others/ProjectListing';
import AgentProfile from '@/components/others/AgentProfile1';
import Footer from '@/components/others/Footer';
import { Agent } from '@/types/agent';
import { fetchAgentDetails } from '@/components/others/AgentFetchDetails';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { VisuallyHidden } from '@/components/ui/visually-hidden';


const AgentPage = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useParams<{ username: string }>()
  const [agent, setAgent] = useState<Agent | null>(null)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const { agentUsername } = useParams();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: ''
  });


  const menuItems = [t('Home'), t('Exclusive'), t('Latest'), t('About'), t('Contact'), t('Blog')];

  // Mock agent data - in real app, this would come from API based on agentUsername
  // const agent = {
  //   name: "Sahar Kalhor",
  //   username: agentUsername,
  //   email: "benison@offplanmarket.com",
  //   phone: "+971 52 952 9687",
  //   whatsapp: "+971529529687",
  //   profileImage: "https://s3.us-east-1.amazonaws.com/offplan.market/WhatsApp+Image+2025-06-05+at+00.34.51_6c4f7cce.jpg",
  //   bio: "More than just an agent — Sahar is your trusted advisor in navigating Dubai’s off-plan landscape. With deep industry knowledge and a passion for matching clients with the right properties, she brings clarity, confidence, and care to every deal.",
  //   totalSales: "150+",
  //   experience: "6+ Years"
  // };

  // Scroll detection for floating buttons
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const heroSection = document.querySelector('section');
  //     if (heroSection) {
  //       const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  //       const scrollPosition = window.scrollY + window.innerHeight * 0.2; // Add some buffer
  //       setShowFloatingButtons(scrollPosition > heroBottom);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
      if (username) {
        fetchAgentDetails(username).then(setAgent)
      }
    }, [username])

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Handle filter changes here
  };

  const handleRequestInfo = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setIsFormOpen(true);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead submitted:', {
      ...leadForm,
      project: selectedProject,
      agent: agentUsername
    });
    toast.success('Your inquiry has been sent! The agent will contact you soon.');
    setIsFormOpen(false);
    setLeadForm({ name: '', phone: '', email: '' });
    setSelectedProject('');
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/11b303ba-efcb-483b-86ae-d82efdb9c016.png"
              alt="Off Plan Market"
              className="h-12 max-w-[65vw] w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="relative">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item}
                  className="text-gray-700 hover:text-[#6084ee] hover:text-500 transition"
                >
                  {item}
                </button>
              ))}
              {/* </div> */}

              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-[#6084ee] transition">
                  🌐
                  <span className="ml-1 hidden sm:inline">{t('Language')}</span>
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t("English (UK)")}
                  </button>
                  <button
                    onClick={() => changeLanguage('fa')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t("Farsi (Persian)")}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Dropdown Menu with Transparent Backdrop */}
            {isOpen && (
              <>
                {/* Transparent backdrop */}
                <div
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/20 z-40"
                ></div>

                {/* Dropdown menu below header */}
                <div
                  className="fixed top-16 left-4 right-4 bg-white z-50 shadow-md px-4 py-4 flex flex-col space-y-3 rounded-lg overflow-auto inline-flex max-w-[calc(100vw-2rem)]">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setIsOpen(false);
                        // Add route navigation here if needed
                      }}
                      className="text-gray-700 hover:text-[#6084ee] hover:text-500 text-base text-left"
                    >
                      {item}
                    </button>
                  ))}
                  <hr />
                  {/* Language on Mobile */}
                  <div>
                    <p className="text-gray-600 text-sm mb-1">🌐 Language</p>
                    <button
                      onClick={() => changeLanguage('en')}
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    >
                      {t("English (UK)")}
                    </button>
                    <button
                      onClick={() => changeLanguage('fa')}
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    >
                      {t("Farsi (Persian)")}
                    </button>
                  </div>
                </div>
              </>

            )}
          </nav>
        </div>
      </header>

      {/* Floating Action Buttons */}
      {agent && (
      <div className={`fixed right-4 bottom-6 z-50 flex flex-col space-y-3 transition-all duration-500 ${showFloatingButtons ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}>
        {/* Call Now Floating Button */}
        <a
          href={`tel:${agent.phone_number}`}
          className="group flex items-center bg-[#f24ca0] hover:bg-[#f24ca0]/90 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <Phone className="h-5 w-5" />
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:pr-4 text-sm font-medium">
            Call Now
          </span>
        </a>

        {/* Email Floating Button */}
        <a
          href={`mailto:${agent.email}`}
          className="group flex items-center bg-[#6084ee] hover:bg-[#6084ee]/90 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <Mail className="h-5 w-5" />
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:pr-4 text-sm font-medium">
            Email Us
          </span>
        </a>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${agent.whatsapp_number}?text=Hi, I'm interested in your off-plan properties`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <MessageCircle className="h-5 w-5" />
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:pr-4 text-sm font-medium">
            WhatsApp
          </span>
        </a>
      </div>
      )}

      {/* City Banner with Video Background */}
      {agent && (
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={agent.introduction_video_url} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

        {/* Overlay Text */}
        <div className="relative z-10 text-center px-4">
          <h2 className="text-white text-2xl md:text-5xl font-bold mb-0  drop-shadow-lg">
           {agent.name}
          </h2>
          <h2 className="text-white text-[20px] md:text-5xl font-bold mb-8 drop-shadow-lg">
            {t("Your Trusted Off-Plan Expert in UAE.")}
          </h2>
          <p className="text-white/90 text-sm md:text-lg max-w-xl mx-auto drop-shadow-md">
            {t("Handpicked homes and investments — verified, valuable, and ready for you.")}
          </p>
        </div>

        {/* Optional Floating Gradient Circles for Effect */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-200"></div>
      </section>
      )}


      {/* Project Listing */}
      <ProjectListing onRequestInfo={handleRequestInfo} />

      {/* Request Information Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md sr-only">
          <DialogHeader>
            <DialogTitle className="text-[#6084ee] sr-only">
              Request Information - {selectedProject}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitLead} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={leadForm.name}
                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                placeholder="+971 50 123 4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            {agent && (
            <p className="text-xs text-gray-600">
              By submitting this form, you agree to be contacted by {agent.name} regarding this property.
            </p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#f24ca0] hover:bg-[#f24ca0]/90 text-white"
            >
              Send Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Enhanced Hero Section with New Dubai Background */}
      <section
        className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(96, 132, 238, 0.4), rgba(242, 76, 160, 0.3)), url('/lovable-uploads/a2e280c1-2382-4dc9-be36-d986b10ebbc1.png')`
        }}
      >
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#6084ee]/20 to-[#f24ca0]/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-[#f24ca0]/20 to-[#6084ee]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
          <div className="absolute top-32 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-md animate-pulse delay-700"></div>
        </div>

      </section>
      <AgentProfile agent={agent} />
      {/* Property Search Filters */}
      <section className="py-2 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyFilters onFiltersChange={handleFiltersChange} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentPage;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, ArrowLeft, Phone, Mail, MessageCircle, Calendar, Home, Car, Building2, Users, Ruler, MapIcon, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '../static/OFFPLAN.MARKET new.png';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const menuItems = ['Home', 'Exclusive', 'Latest', 'About', 'Contact', 'Blog'];

  // Mock project data - in real app, this would come from API
  const agent = {
    name: "Sahar Kalhor",
    // username: agentUsername,
    email: "benison@offplanmarket.com",
    phone: "+971 52 952 9687",
    whatsapp: "+971529529687",
    profileImage: "https://s3.us-east-1.amazonaws.com/offplan.market/WhatsApp+Image+2025-06-05+at+00.34.51_6c4f7cce.jpg",
    bio: "More than just an agent — Sahar is your trusted advisor in navigating Dubai’s off-plan landscape. With deep industry knowledge and a passion for matching clients with the right properties, she brings clarity, confidence, and care to every deal.",
    totalSales: "150+",
    experience: "6+ Years"
  };

  const project = {
    title: "Dubai Creek Harbour Tower",
    location: "Dubai Creek Harbour",
    price: "Starting from AED 1,200,000",
    priceRange: "AED 1.2M - 3.5M",
    type: "Apartment",
    status: "Off Plan",
    completionDate: "2026-06-30",
    description: "Experience luxury living at its finest in this iconic tower overlooking Dubai Creek. This prestigious development offers unparalleled views, world-class amenities, and prime location in the heart of Dubai's most sought-after waterfront community.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
    ],
    unitTypes: [
      { type: "Studio", area: "446 sqft", price: "AED 1.2M" },
      { type: "1 Bedroom", area: "750 sqft", price: "AED 1.8M" },
      { type: "2 Bedroom", area: "1,200 sqft", price: "AED 2.5M" },
      { type: "3 Bedroom", area: "1,800 sqft", price: "AED 3.5M" }
    ],
    features: [
      "Panoramic Creek Views",
      "Smart Home Technology",
      "Infinity Pool",
      "State-of-the-art Gym",
      "24/7 Concierge",
      "Private Beach Access",
      "Retail Outlets",
      "Children's Play Area",
      "Covered Parking",
      "Business Center",
      "Spa & Wellness Center",
      "Rooftop Garden"
    ],
    specifications: {
      developer: "Emaar Properties",
      completionDate: "Q4 2026",
      floors: "45 Floors",
      units: "320 Residential Units",
      parking: "2 Parking Spaces per Unit"
    },
    paymentPlan: [
      { phase: "Booking", percentage: "10%", amount: "AED 120,000", timing: "On Booking" },
      { phase: "Construction Phase 1", percentage: "20%", amount: "AED 240,000", timing: "6 Months" },
      { phase: "Construction Phase 2", percentage: "20%", amount: "AED 240,000", timing: "12 Months" },
      { phase: "Construction Phase 3", percentage: "20%", amount: "AED 240,000", timing: "18 Months" },
      { phase: "On Handover", percentage: "30%", amount: "AED 360,000", timing: "On Completion" }
    ]
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead submitted:', { ...leadForm, project: project.title });
    toast.success('Your inquiry has been sent! We will contact you soon.');
    setIsFormOpen(false);
    setLeadForm({ name: '', phone: '', email: '' });
  };

  const [isOpen, setIsOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-2">
            {/* <div
              onClick={() => navigate('/')}
              className="text-[#6084ee] cursor-pointer lg:hidden"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
            </div> */}
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
                  className="
          fixed
          top-16
          left-4
          right-4
          bg-white
          z-50
          shadow-md
          px-4
          py-4
          flex
          flex-col
          space-y-3
          rounded-lg
          overflow-auto
          inline-flex
          max-w-[calc(100vw-2rem)]
        "
                >

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
                </div>
              </>

            )}
          </nav>
        </div>
      </header>

      {/* Watermark Overlay */}
      <div className="flex fixed inset-0 z-40 pointer-events-none box-border">
        <div className="flex items-center justify-center h-full w-full backdrop-blur-sm box-border">
          <div className="flex box-border pointer-events-none select-none opacity-50 text-4xl font-bold text-gray-900 whitespace-nowrap z-50 ">
            <center><p>API Integration<br />
              under Development</p></center>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image Carousel */}
        <div className="relative mb-8">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ArrowLeft className="h-6 w-6 transform rotate-180" />
          </button>

          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-black text-white">
              {project.status}
            </Badge>
            <Badge className="bg-white text-gray-800">
              {project.completionDate}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Info */}
            <div>
              <h2 className="text-4xl font-bold text-[#6084ee] mb-4">{project.title}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{project.location}</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-2xl font-bold text-[#f24ca0]">{project.price}</div>
                <Badge variant="outline" className="border-[#6084ee] text-[#6084ee]">
                  {project.type}
                </Badge>
              </div>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Unit Types */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#6084ee] mb-6">Available Unit Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.unitTypes.map((unit, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#f24ca0] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Home className="h-5 w-5 text-[#6084ee] mr-2" />
                          <h4 className="font-semibold text-[#6084ee]">{unit.type}</h4>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#f24ca0]">{unit.price}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Ruler className="h-4 w-4 mr-1" />
                        <span className="text-sm">{unit.area}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#6084ee] mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-[#f24ca0] rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Plan */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#6084ee] mb-4">Payment Plan</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="payment-details">
                    <AccordionTrigger>View Payment Schedule</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {project.paymentPlan.map((phase, index) => (
                          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold text-[#6084ee]">{phase.phase}</p>
                              <p className="text-sm text-gray-600">{phase.timing}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-[#f24ca0]">{phase.amount}</p>
                              <p className="text-sm text-gray-600">{phase.percentage}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sticky CTA */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#6084ee] mb-4">Interested in this project?</h3>
                <p className="text-gray-600 mb-6">Get detailed information and schedule a viewing</p>

                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#f24ca0] hover:bg-[#f24ca0]/90 text-white mb-3">
                      Request Information
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-[#6084ee]">Request Information</DialogTitle>
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
                      <Button
                        type="submit"
                        className="w-full bg-[#f24ca0] hover:bg-[#f24ca0]/90 text-white"
                      >
                        Send Request
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="space-y-2">
                  <a
                    href={`tel:${agent.phone}`}>
                    <Button
                      variant="outline"
                      className="w-full border-[#6084ee] text-[#6084ee] hover:bg-[#6084ee] hover:text-white"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${agent.whatsapp}?text=Hi, I'm interested in your off-plan properties `}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white my-3"

                    >
                      <MessageCircle

                        className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>

                </div>
              </CardContent>
            </Card>

            {/* Project Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#6084ee] mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Developer</span>
                    </div>
                    <span className="font-semibold">{project.specifications.developer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Completion</span>
                    </div>
                    <span className="font-semibold">{project.specifications.completionDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Floors</span>
                    </div>
                    <span className="font-semibold">{project.specifications.floors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Total Units</span>
                    </div>
                    <span className="font-semibold">{project.specifications.units}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Car className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Parking</span>
                    </div>
                    <span className="font-semibold">{project.specifications.parking}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

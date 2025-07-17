
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Maximize, DollarSign, Building, Eye, Calendar, Bath, Bed, Phone, Mail, Download, Share2, MessageCircle, Home, CheckCircle, Image, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/others/Header';
import Footer from '@/components/others/Footer';

const UnitDetails = () => {
  const { id: projectId, unitId } = useParams<{ id: string; unitId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Agent profile with contact information
  const agentProfile = {
    name: "Sahar Kalhor",
    title: "Your Property Advisor",
    phone: "+971529529687",
    email: "sahar@offplan.market",
    image: "/lovable-uploads/d10f1d83-102b-4cd8-90c2-c2ff386125e7.png"
  };

  // Unit data for different projects
  const unitData: Record<string, Record<string, any>> = {
    "1": { // Azure Marina Residences
      "azure-studio": {
        unitNumber: "A-1205",
        type: "Studio",
        projectName: "Azure Marina Residences",
        location: "Dubai Marina",
        size: "450 sq ft",
        sizeMetric: "42 sq m",
        price: "850,000",
        floor: "12",
        view: "Marina View",
        bedrooms: 0,
        bathrooms: 1,
        balcony: "Yes",
        parking: "1 Space",
        status: "Available",
        handover: "Q4 2025",
        paymentPlan: "60/40",
        description: "Modern studio unit with smart design, floor-to-ceiling windows and stunning marina views – perfect for investors or end users.",
        features: ["Floor-to-ceiling windows", "Built-in wardrobe", "Modern kitchen", "Marina views", "Balcony access"],
        specialFeatures: ["Marina View", "Modern Kitchen", "Smart Home Ready"],
        images: [
          "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
        ],
        floorPlan: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop"
      },
      "azure-1br": {
        unitNumber: "B-1810",
        type: "1 Bedroom",
        projectName: "Azure Marina Residences",
        location: "Dubai Marina",
        size: "650 sq ft",
        sizeMetric: "60 sq m",
        price: "1,200,000",
        floor: "18",
        view: "Sea View",
        bedrooms: 1,
        bathrooms: 1,
        balcony: "Yes",
        parking: "1 Space",
        status: "Available",
        handover: "Q4 2025",
        paymentPlan: "60/40",
        description: "Modern 1-bedroom unit with smart design, premium finishes and breathtaking sea views – perfect for investors or end users.",
        features: ["Master bedroom with ensuite", "Open plan living", "Premium kitchen", "Sea views", "Large balcony"],
        specialFeatures: ["Sea View", "Premium Finishes", "Large Balcony"],
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
        ],
        floorPlan: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
      }
    },
    "2": { // Skyline Business Bay
      "skyline-studio": {
        unitNumber: "S-0905",
        type: "Studio",
        projectName: "Skyline Business Bay",
        location: "Business Bay",
        size: "420 sq ft",
        sizeMetric: "39 sq m",
        price: "650,000",
        floor: "9",
        view: "City View",
        bedrooms: 0,
        bathrooms: 1,
        balcony: "No",
        parking: "1 Space",
        status: "Available",
        handover: "Q2 2026",
        paymentPlan: "70/30",
        description: "Modern studio in the heart of Dubai's business district with exceptional city views and easy access to commercial centers.",
        features: ["Smart home features", "City views", "Modern appliances", "High-speed internet", "Building amenities"],
        specialFeatures: ["City View", "Smart Home", "Premium Location"],
        images: [
          "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop"
        ],
        floorPlan: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop"
      }
    },
    "3": { // Palm Residences
      "palm-2br": {
        unitNumber: "P-0302",
        type: "2 Bedroom",
        projectName: "Palm Residences",
        location: "Palm Jumeirah",
        size: "1,200 sq ft",
        sizeMetric: "111 sq m",
        price: "2,200,000",
        floor: "3",
        view: "Beach View",
        bedrooms: 2,
        bathrooms: 2,
        balcony: "Yes",
        parking: "2 Spaces",
        status: "Available",
        handover: "Q1 2026",
        paymentPlan: "50/50",
        description: "Luxury 2-bedroom unit with direct beach access, spacious terrace and stunning sea views in one of Dubai's most prestigious locations.",
        features: ["Direct beach access", "Premium finishes", "Spacious terrace", "Beach views", "Private parking"],
        specialFeatures: ["Beach Access", "Premium Finishes", "Private Terrace"],
        images: [
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
        ],
        floorPlan: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
      }
    }
  };

  const unit = unitData[projectId || "1"]?.[unitId || "azure-studio"] || unitData["1"]["azure-studio"];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-500 text-white border-0';
      case 'Reserved':
        return 'bg-amber-500 text-white border-0';
      case 'Sold':
        return 'bg-red-500 text-white border-0';
      default:
        return 'bg-gray-500 text-white border-0';
    }
  };

  // Handler functions for contact actions
  const handlePhoneCall = () => {
    window.open(`tel:+971529529687`, '_self');
  };

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(`Hi, I'm interested in Unit ${unit.unitNumber} on Offplan.Market`);
    window.open(`https://wa.me/971529529687?text=${message}`, '_blank');
  };

  const handleEmailInquiry = () => {
    const subject = encodeURIComponent(`Inquiry about Unit ${unit.unitNumber}`);
    const body = encodeURIComponent(`Hi Sahar,\n\nI'm interested in Unit ${unit.unitNumber} and would like more information.\n\nThank you!`);
    window.open(`mailto:${agentProfile.email}?subject=${subject}&body=${body}`, '_self');
  };

  const handleBookViewing = () => {
    const message = encodeURIComponent(`Hi, I would like to book a viewing for Unit ${unit.unitNumber} - ${unit.projectName}`);
    window.open(`https://wa.me/971529529687?text=${message}`, '_blank');
  };

  const handleRequestFloorPlan = () => {
    setIsModalOpen(true);
    setShowConfirmation(false);
    setFormData({ name: '', whatsappNumber: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateWhatsAppNumber = (number: string) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    return phoneRegex.test(number.replace(/\s/g, ''));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!formData.whatsappNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    if (!validateWhatsAppNumber(formData.whatsappNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // console.log('Floor Plan Request:', {
      //   name: formData.name,
      //   whatsappNumber: formData.whatsappNumber,
      //   unitId: unit.unitNumber,
      //   projectId,
      //   timestamp: new Date().toISOString()
      // });

      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowConfirmation(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send floor plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowConfirmation(false);
    setFormData({ name: '', whatsappNumber: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Back Button - Compact */}
        <Button
          onClick={() => navigate(`/project/${projectId}`)}
          variant="outline"
          size="sm"
          className="mb-6 flex items-center gap-2 hover:bg-gray-50 border-gray-300 text-gray-600 px-3 py-1.5 h-8 text-sm"
        >
          <ArrowLeft size={14} />
          Back to Properties
        </Button>

        {/* Hero Image - Clean and Simple */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="relative h-[350px] lg:h-[450px]">
            <img
              src={unit.images[0]}
              alt={`${unit.type} - ${unit.unitNumber}`}
              className="w-full h-full object-cover"
            />
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <Badge className={`${getStatusBadgeStyle(unit.status)} font-medium px-3 py-1 text-sm shadow-lg`}>
                {unit.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Unit Summary Section - Clean and Professional */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-8">
          {/* Project Name and Location */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {unit.projectName} – Unit {unit.unitNumber}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={16} className="mr-2" />
              <span className="text-lg">{unit.location}</span>
            </div>
            
            {/* Price */}
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-6">
              AED {parseInt(unit.price).toLocaleString()}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Bed className="text-blue-600" size={20} />
              </div>
              <div className="text-sm text-gray-600">Bedrooms</div>
              <div className="font-semibold text-gray-900">
                {unit.bedrooms > 0 ? unit.bedrooms : 'Studio'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Maximize className="text-blue-600" size={20} />
              </div>
              <div className="text-sm text-gray-600">Size</div>
              <div className="font-semibold text-gray-900">{unit.size}</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div className="text-sm text-gray-600">Handover</div>
              <div className="font-semibold text-gray-900">{unit.handover}</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <DollarSign className="text-blue-600" size={20} />
              </div>
              <div className="text-sm text-gray-600">Payment Plan</div>
              <div className="font-semibold text-gray-900">{unit.paymentPlan}</div>
            </div>
          </div>

          {/* Floor Plan Integration */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Floor Plan</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <img
                src={unit.floorPlan}
                alt={`Floor plan for unit ${unit.unitNumber}`}
                className="w-full max-w-md mx-auto h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Unit Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Unit Description</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {unit.description}
            </p>
          </div>
        </div>

        {/* Key Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Image className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gallery</h3>
              <p className="text-gray-600 text-sm mb-4">View all unit images and renders</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {/* Add gallery functionality */}}
              >
                View Gallery
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <FileText className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Floor Plan</h3>
              <p className="text-gray-600 text-sm mb-4">Download detailed floor plan</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleRequestFloorPlan}
              >
                Download Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <CreditCard className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Plan</h3>
              <p className="text-gray-600 text-sm mb-4">Flexible payment options</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {/* Add payment plan details */}}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action - Minimal and Clean */}
        <Card className="border-0 shadow-lg bg-white mb-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Interested in this unit?
            </h3>
            
            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button 
                onClick={handleBookViewing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Calendar size={18} className="mr-2" />
                Book Viewing
              </Button>
              
              <Button 
                onClick={handleRequestFloorPlan}
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                <Download size={18} className="mr-2" />
                Download Floor Plan
              </Button>

              <Button 
                onClick={handleWhatsAppChat}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle size={18} className="mr-2" />
                WhatsApp Contact
              </Button>
            </div>
            
            {/* Secondary Contact */}
            <div className="mt-6">
              <Button 
                onClick={handlePhoneCall}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                <Phone size={16} className="mr-2" />
                Call: +971 52 952 9687
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agent Profile */}
        <Card className="max-w-xl mx-auto border-0 shadow-lg bg-white">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-gray-200 mb-3">
                <img 
                  src={agentProfile.image}
                  alt="Sahar - Property Advisor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{agentProfile.name}</h4>
              <p className="text-gray-600">{agentProfile.title}</p>
            </div>
            <p className="text-gray-700 text-sm">
              Speak directly with Sahar for pricing, viewings, and exclusive offers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Floor Plan Request Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Request Floor Plan
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {showConfirmation 
                ? "Your floor plan request has been sent!" 
                : `Enter your details to receive the floor plan for Unit ${unit.unitNumber}`}
            </DialogDescription>
          </DialogHeader>
          
          {showConfirmation ? (
            <div className="text-center py-6">
              <div className="mb-4 text-6xl">📩</div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Thank you!
              </h3>
              <p className="text-gray-600 mb-4">
                We've sent the floor plan to your WhatsApp
              </p>
              <Button 
                onClick={handleModalClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleModalClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Floor Plan'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default UnitDetails;

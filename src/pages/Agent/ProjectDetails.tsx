import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, TrendingUp, Building, Users, Car, Wifi, Dumbbell, Waves, Home, Bath, Maximize, DollarSign, Clock, Phone, Mail, Map, Eye, Bed, MessageCircle, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Header from '@/components/Agent/Header';
import Footer from '@/components/Agent/Footer';
import UnitPreviewModal from '@/components/Agent/UnitPreviewModal';

const ProjectDetails = ({agent, properties}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isUnitPreviewOpen, setIsUnitPreviewOpen] = useState(false);
  const [expandedUnitType, setExpandedUnitType] = useState<string | null>(null);

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

  // Project data with all project information
  const projectData: Record<string, any> = {
    "1": {
      title: "Azure Marina Residences",
      location: "Dubai Marina",
      developer: "Emaar Properties",
      price: "1,200,000",
      roi: "12%",
      delivery: "Q4 2025",
      status: "Pre-Launch",
      projectType: "Luxury Apartments in Dubai Marina",
      priceRange: "AED 850K – 2.65M",
      areaRange: "450 – 1,400 sq.ft.",
      description: "Luxury waterfront living in the heart of Dubai Marina with stunning views and world-class amenities. This extraordinary development offers residents an unparalleled lifestyle experience with direct marina access, premium finishes, and breathtaking panoramic views of the Arabian Gulf. Each residence is thoughtfully designed with spacious layouts, floor-to-ceiling windows, and high-end specifications that reflect the epitome of modern luxury living.",
      address: "Sheikh Zayed Road, Dubai Marina, Dubai, UAE",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: [
        "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
      ],
      unitInventory: [
        // Studio units - 15 available
        { id: "azure-studio-01", unitNumber: "S-0501", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "850,000", floor: "5", view: "Marina View", status: "Available" },
        { id: "azure-studio-02", unitNumber: "S-0601", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "860,000", floor: "6", view: "Marina View", status: "Available" },
        { id: "azure-studio-03", unitNumber: "S-0701", type: "Studio", size: "455 sq ft", sizeMetric: "42 sq m", price: "870,000", floor: "7", view: "Marina View", status: "Available" },
        { id: "azure-studio-04", unitNumber: "S-0801", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "880,000", floor: "8", view: "Marina View", status: "Available" },
        { id: "azure-studio-05", unitNumber: "S-0901", type: "Studio", size: "460 sq ft", sizeMetric: "43 sq m", price: "890,000", floor: "9", view: "Marina View", status: "Available" },
        { id: "azure-studio-06", unitNumber: "S-1001", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "900,000", floor: "10", view: "Marina View", status: "Available" },
        { id: "azure-studio-07", unitNumber: "S-1101", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "910,000", floor: "11", view: "Marina View", status: "Available" },
        { id: "azure-studio-08", unitNumber: "S-1201", type: "Studio", size: "465 sq ft", sizeMetric: "43 sq m", price: "920,000", floor: "12", view: "Marina View", status: "Available" },
        { id: "azure-studio-09", unitNumber: "S-1301", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "930,000", floor: "13", view: "Marina View", status: "Available" },
        { id: "azure-studio-10", unitNumber: "S-1401", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "940,000", floor: "14", view: "Marina View", status: "Available" },
        { id: "azure-studio-11", unitNumber: "S-1501", type: "Studio", size: "470 sq ft", sizeMetric: "44 sq m", price: "950,000", floor: "15", view: "Marina View", status: "Available" },
        { id: "azure-studio-12", unitNumber: "S-0502", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "860,000", floor: "5", view: "City View", status: "Available" },
        { id: "azure-studio-13", unitNumber: "S-0602", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "870,000", floor: "6", view: "City View", status: "Available" },
        { id: "azure-studio-14", unitNumber: "S-0702", type: "Studio", size: "455 sq ft", sizeMetric: "42 sq m", price: "880,000", floor: "7", view: "City View", status: "Available" },
        { id: "azure-studio-15", unitNumber: "S-0802", type: "Studio", size: "450 sq ft", sizeMetric: "42 sq m", price: "890,000", floor: "8", view: "City View", status: "Available" },
        
        // 1 Bedroom units - 8 available
        { id: "azure-1br-01", unitNumber: "1B-1001", type: "1 Bedroom", size: "650 sq ft", sizeMetric: "60 sq m", price: "1,200,000", floor: "10", view: "Sea View", status: "Available" },
        { id: "azure-1br-02", unitNumber: "1B-1101", type: "1 Bedroom", size: "660 sq ft", sizeMetric: "61 sq m", price: "1,220,000", floor: "11", view: "Sea View", status: "Available" },
        { id: "azure-1br-03", unitNumber: "1B-1201", type: "1 Bedroom", size: "650 sq ft", sizeMetric: "60 sq m", price: "1,240,000", floor: "12", view: "Sea View", status: "Available" },
        { id: "azure-1br-04", unitNumber: "1B-1301", type: "1 Bedroom", size: "670 sq ft", sizeMetric: "62 sq m", price: "1,260,000", floor: "13", view: "Sea View", status: "Available" },
        { id: "azure-1br-05", unitNumber: "1B-1401", type: "1 Bedroom", size: "650 sq ft", sizeMetric: "60 sq m", price: "1,280,000", floor: "14", view: "Sea View", status: "Available" },
        { id: "azure-1br-06", unitNumber: "1B-1501", type: "1 Bedroom", size: "680 sq ft", sizeMetric: "63 sq m", price: "1,300,000", floor: "15", view: "Sea View", status: "Available" },
        { id: "azure-1br-07", unitNumber: "1B-1002", type: "1 Bedroom", size: "650 sq ft", sizeMetric: "60 sq m", price: "1,180,000", floor: "10", view: "Marina View", status: "Available" },
        { id: "azure-1br-08", unitNumber: "1B-1102", type: "1 Bedroom", size: "660 sq ft", sizeMetric: "61 sq m", price: "1,200,000", floor: "11", view: "Marina View", status: "Available" },
        
        // 2 Bedroom units - 5 available
        { id: "azure-2br-01", unitNumber: "2B-1501", type: "2 Bedroom", size: "950 sq ft", sizeMetric: "88 sq m", price: "1,750,000", floor: "15", view: "Marina & Sea View", status: "Available" },
        { id: "azure-2br-02", unitNumber: "2B-1601", type: "2 Bedroom", size: "980 sq ft", sizeMetric: "91 sq m", price: "1,800,000", floor: "16", view: "Marina & Sea View", status: "Available" },
        { id: "azure-2br-03", unitNumber: "2B-1701", type: "2 Bedroom", size: "950 sq ft", sizeMetric: "88 sq m", price: "1,850,000", floor: "17", view: "Marina & Sea View", status: "Available" },
        { id: "azure-2br-04", unitNumber: "2B-1801", type: "2 Bedroom", size: "1000 sq ft", sizeMetric: "93 sq m", price: "1,900,000", floor: "18", view: "Marina & Sea View", status: "Available" },
        { id: "azure-2br-05", unitNumber: "2B-1901", type: "2 Bedroom", size: "950 sq ft", sizeMetric: "88 sq m", price: "1,950,000", floor: "19", view: "Marina & Sea View", status: "Available" },
        
        // 3 Bedroom units - 2 available
        { id: "azure-3br-01", unitNumber: "3B-2501", type: "3 Bedroom", size: "1,350 sq ft", sizeMetric: "125 sq m", price: "2,500,000", floor: "25", view: "Panoramic Sea View", status: "Available" },
        { id: "azure-3br-02", unitNumber: "3B-2601", type: "3 Bedroom", size: "1,400 sq ft", sizeMetric: "130 sq m", price: "2,650,000", floor: "26", view: "Panoramic Sea View", status: "Available" }
      ],
      amenities: [
        { name: "Swimming Pool", icon: Waves },
        { name: "Gym & Fitness", icon: Dumbbell },
        { name: "Parking", icon: Car },
        { name: "High Speed WiFi", icon: Wifi },
        { name: "24/7 Security", icon: Users },
        { name: "Concierge", icon: Building }
      ],
      paymentPlan: {
        downPayment: "20%",
        duringConstruction: "60%",
        onCompletion: "20%",
        handoverDate: "Q4 2025"
      }
    },
    "2": {
      title: "Skyline Business Bay",
      location: "Business Bay",
      developer: "DAMAC Properties",
      price: "890,000",
      roi: "10%",
      delivery: "Q2 2026",
      status: "Off-Plan",
      projectType: "Modern Apartments in Business Bay",
      priceRange: "AED 650K – 1.6M",
      areaRange: "420 – 940 sq.ft.",
      description: "Modern business district living with panoramic city views and premium amenities. This contemporary development redefines urban living with its sleek architectural design and strategic location in the heart of Dubai's financial district.",
      address: "Business Bay Boulevard, Business Bay, Dubai, UAE",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: [
        "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop"
      ],
      unitInventory: [
        // Studio units - 12 available
        { id: "skyline-studio-01", unitNumber: "S-0801", type: "Studio", size: "420 sq ft", sizeMetric: "39 sq m", price: "650,000", floor: "8", view: "City View", status: "Available" },
        { id: "skyline-studio-02", unitNumber: "S-0901", type: "Studio", size: "425 sq ft", sizeMetric: "39 sq m", price: "660,000", floor: "9", view: "City View", status: "Available" },
        { id: "skyline-studio-03", unitNumber: "S-1001", type: "Studio", size: "420 sq ft", sizeMetric: "39 sq m", price: "670,000", floor: "10", view: "City View", status: "Available" },
        { id: "skyline-studio-04", unitNumber: "S-1101", type: "Studio", size: "430 sq ft", sizeMetric: "40 sq m", price: "680,000", floor: "11", view: "City View", status: "Available" },
        { id: "skyline-studio-05", unitNumber: "S-1201", type: "Studio", size: "420 sq ft", sizeMetric: "39 sq m", price: "690,000", floor: "12", view: "City View", status: "Available" },
        { id: "skyline-studio-06", unitNumber: "S-1301", type: "Studio", size: "435 sq ft", sizeMetric: "40 sq m", price: "700,000", floor: "13", view: "City View", status: "Available" },
        { id: "skyline-studio-07", unitNumber: "S-1401", type: "Studio", size: "420 sq ft", sizeMetric: "39 sq m", price: "710,000", floor: "14", view: "City View", status: "Available" },
        { id: "skyline-studio-08", unitNumber: "S-1501", type: "Studio", size: "440 sq ft", sizeMetric: "41 sq m", price: "720,000", floor: "15", view: "City View", status: "Available" },
        { id: "skyline-studio-09", unitNumber: "S-1601", type: "Studio", size: "420 sq ft", sizeMetric: "39 sq m", price: "730,000", floor: "16", view: "City View", status: "Available" },
        { id: "skyline-studio-10", unitNumber: "S-1701", type: "Studio", size: "445 sq ft", sizeMetric: "41 sq m", price: "740,000", floor: "17", view: "City View", status: "Available" },
        { id: "skyline-studio-11", unitNumber: "S-1801", type: "Studio", size: "420 sq ft", sizeMetric: "39 sq m", price: "750,000", floor: "18", view: "City View", status: "Available" },
        { id: "skyline-studio-12", unitNumber: "S-0802", type: "Studio", size: "425 sq ft", sizeMetric: "39 sq m", price: "655,000", floor: "8", view: "Business Bay View", status: "Available" },
        
        // 1 Bedroom units - 10 available
        { id: "skyline-1br-01", unitNumber: "1B-1201", type: "1 Bedroom", size: "600 sq ft", sizeMetric: "56 sq m", price: "890,000", floor: "12", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-02", unitNumber: "1B-1301", type: "1 Bedroom", size: "610 sq ft", sizeMetric: "57 sq m", price: "910,000", floor: "13", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-03", unitNumber: "1B-1401", type: "1 Bedroom", size: "600 sq ft", sizeMetric: "56 sq m", price: "930,000", floor: "14", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-04", unitNumber: "1B-1501", type: "1 Bedroom", size: "620 sq ft", sizeMetric: "58 sq m", price: "950,000", floor: "15", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-05", unitNumber: "1B-1601", type: "1 Bedroom", size: "600 sq ft", sizeMetric: "56 sq m", price: "970,000", floor: "16", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-06", unitNumber: "1B-1701", type: "1 Bedroom", size: "630 sq ft", sizeMetric: "59 sq m", price: "990,000", floor: "17", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-07", unitNumber: "1B-1801", type: "1 Bedroom", size: "600 sq ft", sizeMetric: "56 sq m", price: "1,010,000", floor: "18", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-08", unitNumber: "1B-1901", type: "1 Bedroom", size: "640 sq ft", sizeMetric: "59 sq m", price: "1,030,000", floor: "19", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-09", unitNumber: "1B-2001", type: "1 Bedroom", size: "600 sq ft", sizeMetric: "56 sq m", price: "1,050,000", floor: "20", view: "Business Bay View", status: "Available" },
        { id: "skyline-1br-10", unitNumber: "1B-2101", type: "1 Bedroom", size: "650 sq ft", sizeMetric: "60 sq m", price: "1,070,000", floor: "21", view: "Downtown View", status: "Available" },
        
        // 2 Bedroom units - 6 available
        { id: "skyline-2br-01", unitNumber: "2B-1801", type: "2 Bedroom", size: "880 sq ft", sizeMetric: "82 sq m", price: "1,350,000", floor: "18", view: "Downtown View", status: "Available" },
        { id: "skyline-2br-02", unitNumber: "2B-1901", type: "2 Bedroom", size: "900 sq ft", sizeMetric: "84 sq m", price: "1,400,000", floor: "19", view: "Downtown View", status: "Available" },
        { id: "skyline-2br-03", unitNumber: "2B-2001", type: "2 Bedroom", size: "880 sq ft", sizeMetric: "82 sq m", price: "1,450,000", floor: "20", view: "Downtown View", status: "Available" },
        { id: "skyline-2br-04", unitNumber: "2B-2101", type: "2 Bedroom", size: "920 sq ft", sizeMetric: "85 sq m", price: "1,500,000", floor: "21", view: "Downtown View", status: "Available" },
        { id: "skyline-2br-05", unitNumber: "2B-2201", type: "2 Bedroom", size: "880 sq ft", sizeMetric: "82 sq m", price: "1,550,000", floor: "22", view: "Downtown View", status: "Available" },
        { id: "skyline-2br-06", unitNumber: "2B-2301", type: "2 Bedroom", size: "940 sq ft", sizeMetric: "87 sq m", price: "1,600,000", floor: "23", view: "Downtown View", status: "Available" }
      ],
      amenities: [
        { name: "Rooftop Pool", icon: Waves },
        { name: "Business Center", icon: Building },
        { name: "Valet Parking", icon: Car },
        { name: "Smart Home", icon: Wifi },
        { name: "Spa & Wellness", icon: Dumbbell },
        { name: "Concierge", icon: Users }
      ],
      paymentPlan: {
        downPayment: "25%",
        duringConstruction: "50%",
        onCompletion: "25%",
        handoverDate: "Q2 2026"
      }
    },
    "3": {
      title: "Palm Residences",
      location: "Palm Jumeirah",
      developer: "Nakheel",
      price: "2,500,000",
      roi: "8%",
      delivery: "Ready",
      status: "Available",
      projectType: "Exclusive Beachfront Villas",
      priceRange: "AED 2.2M – 4.5M",
      areaRange: "1,200 – 2,500 sq.ft.",
      description: "Exclusive beachfront luxury on the iconic Palm Jumeirah with private beach access. Experience the pinnacle of coastal living with unobstructed views of the Arabian Gulf and Dubai's spectacular skyline.",
      address: "Palm Jumeirah Crescent, Palm Jumeirah, Dubai, UAE",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      images: [
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
      ],
      unitInventory: [
        // 2 Bedroom units - 3 available
        { id: "palm-2br-01", unitNumber: "2B-0301", type: "2 Bedroom", size: "1,200 sq ft", sizeMetric: "111 sq m", price: "2,200,000", floor: "3", view: "Beach View", status: "Available" },
        { id: "palm-2br-02", unitNumber: "2B-0401", type: "2 Bedroom", size: "1,250 sq ft", sizeMetric: "116 sq m", price: "2,350,000", floor: "4", view: "Beach View", status: "Available" },
        { id: "palm-2br-03", unitNumber: "2B-0501", type: "2 Bedroom", size: "1,200 sq ft", sizeMetric: "111 sq m", price: "2,500,000", floor: "5", view: "Beach View", status: "Available" },
        
        // 3 Bedroom units - 2 available
        { id: "palm-3br-01", unitNumber: "3B-0401", type: "3 Bedroom", size: "1,600 sq ft", sizeMetric: "149 sq m", price: "2,500,000", floor: "4", view: "Arabian Gulf View", status: "Available" },
        { id: "palm-3br-02", unitNumber: "3B-0501", type: "3 Bedroom", size: "1,650 sq ft", sizeMetric: "153 sq m", price: "2,650,000", floor: "5", view: "Arabian Gulf View", status: "Available" },
        
        // Penthouse - 1 available
        { id: "palm-penthouse-01", unitNumber: "PH-0601", type: "Penthouse", size: "2,500 sq ft", sizeMetric: "232 sq m", price: "4,500,000", floor: "6", view: "360° Views", status: "Available" }
      ],
      amenities: [
        { name: "Private Beach", icon: Waves },
        { name: "Infinity Pool", icon: Waves },
        { name: "Private Parking", icon: Car },
        { name: "Beach Club", icon: Building },
        { name: "Water Sports", icon: Dumbbell },
        { name: "Butler Service", icon: Users }
      ],
      paymentPlan: {
        downPayment: "30%",
        duringConstruction: "0%",
        onCompletion: "70%",
        handoverDate: "Ready"
      }
    }
  };

  const project = projectData[id || "1"] || projectData["1"];

  // Utility functions
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      case 'Off-Plan':
        return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white';
      case 'Pre-Launch':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const getUnitStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Sold':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUnitDetails = (unitId: string) => {
    navigate(`/project/${id}/unit/${unitId}`);
  };

  const handleUnitPreview = (unit: any) => {
    setSelectedUnit(unit);
    setIsUnitPreviewOpen(true);
  };

  const handlePhoneCall = () => {
    window.open(`tel:+971529529687`, '_self');
  };

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${project.title} on Offplan.Market`);
    window.open(`https://wa.me/971529529687?text=${message}`, '_blank');
  };

  const handleEmailInquiry = () => {
    const subject = encodeURIComponent(`Inquiry about ${project.title}`);
    const body = encodeURIComponent(`Hi Sahar,\n\nI'm interested in ${project.title} and would like more information.\n\nThank you!`);
    window.open(`mailto:${agentProfile.email}?subject=${subject}&body=${body}`, '_self');
  };

  // Group units by type for better organization
  const groupedUnits = project.unitInventory?.reduce((acc: any, unit: any) => {
    if (!acc[unit.type]) {
      acc[unit.type] = [];
    }
    acc[unit.type].push(unit);
    return acc;
  }, {}) || {};

  const getUnitTypeIcon = (unitType: string) => {
    if (unitType.toLowerCase().includes('studio')) {
      return Bed;
    } else if (unitType.toLowerCase().includes('bedroom')) {
      return Home;
    } else if (unitType.toLowerCase().includes('penthouse')) {
      return Building;
    }
    return Home;
  };

  const handleUnitTypeExpansion = (unitType: string) => {
    setExpandedUnitType(expandedUnitType === unitType ? null : unitType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Compact Back Button - Moved higher and smaller */}
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="sm"
          className="mb-2 flex items-center gap-1.5 hover:bg-pink-50 hover:border-pink-300 border rounded-md px-2 py-1 text-xs h-8"
        >
          <ArrowLeft size={14} />
          Back to Properties
        </Button>

        {/* Hero Image Carousel with Center Overlay */}
        <div className="mb-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Carousel className="w-full">
              <CarouselContent>
                {project.images.map((image: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-96 lg:h-[500px] object-cover"
                      />
                      {/* Center Overlay Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white bg-black/40 backdrop-blur-sm rounded-xl p-6 lg:p-8 max-w-2xl mx-4">
                          <h1 className="text-3xl lg:text-5xl font-bold mb-3">
                            {project.title}
                          </h1>
                          <div className="flex items-center justify-center text-lg lg:text-xl">
                            <MapPin size={20} className="mr-2 text-pink-400" />
                            <span className="font-medium">{project.location}, Dubai</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>

        {/* Key Info Section */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
            {/* Project Type and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <p className="text-lg text-gray-600 mb-2">{project.projectType || `Luxury Development in ${project.location}`}</p>
              </div>
              <div className="flex-shrink-0 mt-2 sm:mt-0">
                <Badge className={`${getStatusBadgeStyle(project.status)} font-semibold px-4 py-2 text-sm shadow-lg`}>
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <div className="p-2 bg-pink-500 rounded-lg">
                  <DollarSign className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Price Range</div>
                  <div className="font-bold text-gray-900 text-sm">{project.priceRange || `AED ${parseInt(project.price).toLocaleString()}+`}</div>
                </div>
              </div>

              {/* Area Range */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Maximize className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Area Range</div>
                  <div className="font-bold text-gray-900 text-sm">{project.areaRange || "Various sizes"}</div>
                </div>
              </div>

              {/* Handover Date */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Calendar className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Handover</div>
                  <div className="font-bold text-gray-900 text-sm">{project.delivery}</div>
                </div>
              </div>

              {/* Payment Plan */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Clock className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Payment Plan</div>
                  <div className="font-bold text-gray-900 text-sm">{project.paymentPlan.downPayment} Down</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Units Display - Accordion Style Only */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Unit Types</h2>
          <div className="space-y-4">
            {Object.entries(groupedUnits).map(([unitType, units]: [string, any]) => {
              const UnitIcon = getUnitTypeIcon(unitType);
              const isExpanded = expandedUnitType === unitType;
              const hasUnits = units.length > 0;
              const minPrice = hasUnits ? Math.min(...units.map((u: any) => parseInt(u.price))) : 0;
              
              return (
                <Card key={unitType} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-md">
                          <UnitIcon className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{unitType}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={hasUnits ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                              {hasUnits ? `${units.length} units available` : 'Sold Out'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {hasUnits && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">Starting from</div>
                          <div className="text-lg font-bold text-gray-900">
                            AED {minPrice.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* See More/Less Button */}
                    <div className="border-t border-gray-200 pt-4">
                      <Collapsible open={isExpanded} onOpenChange={() => handleUnitTypeExpansion(unitType)}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full transition-all duration-300 ${
                              hasUnits 
                                ? 'hover:bg-blue-50 hover:border-blue-300 text-blue-600' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!hasUnits}
                          >
                            {!hasUnits ? (
                              'Sold Out'
                            ) : isExpanded ? (
                              <>
                                See Less <ChevronUp size={16} className="ml-2" />
                              </>
                            ) : (
                              <>
                                See More <ChevronDown size={16} className="ml-2" />
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="transition-all duration-300 ease-in-out">
                          <div className="mt-6 border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {units.map((unit: any) => (
                                <Card key={unit.id} className="border shadow-sm hover:shadow-md transition-shadow bg-white">
                                  <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                      <CardTitle className="text-base font-bold text-gray-900">
                                        {unit.unitNumber}
                                      </CardTitle>
                                      <Badge className={getUnitStatusBadgeStyle(unit.status)}>
                                        {unit.status}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-sm">
                                        <Maximize size={14} className="text-gray-500" />
                                        <span className="text-gray-600">{unit.size} ({unit.sizeMetric})</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Building size={14} className="text-blue-500" />
                                        <span className="text-gray-600">Floor {unit.floor}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Eye size={14} className="text-green-500" />
                                        <span className="text-gray-600">{unit.view}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3">
                                      <div className="flex items-center gap-2">
                                        <DollarSign size={16} className="text-green-500" />
                                        <span className="font-bold text-gray-900">AED {parseInt(unit.price).toLocaleString()}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button 
                                        onClick={() => handleUnitDetails(unit.id)}
                                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm"
                                      >
                                        View Details
                                      </Button>
                                      <Button 
                                        onClick={() => handleUnitPreview(unit)}
                                        variant="outline" 
                                        size="icon" 
                                        className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                                        title="Quick Preview"
                                      >
                                        <Eye size={16} className="text-blue-500" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Section - YouTube Integration */}
        {project.videoUrl && (
          <div className="mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Play className="text-pink-500" size={28} />
                  Project Tour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} Video Tour`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ready to Explore More Projects CTA Section */}
        <div className="mb-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore More Projects?</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Discover other premium developments in Dubai or get personalized recommendations from our expert advisors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 text-lg"
                  >
                    <Home size={20} className="mr-2" />
                    Browse All Projects
                  </Button>
                  <Button 
                    onClick={handleWhatsAppChat}
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    Need Help Choosing?
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info - Project Details Section */}
        <div className="space-y-8">
          {/* Full Description */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">About This Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Map className="text-pink-500" size={28} />
                Location & Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-pink-500 mt-1" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{project.title}</div>
                    <div className="text-gray-600">{project.address}</div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <Map className="mx-auto mb-3 text-gray-400" size={48} />
                  <p className="text-gray-600">Interactive map coming soon</p>
                  <p className="text-sm text-gray-500 mt-2">Contact Sahar for location details and site visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {project.amenities.map((amenity: any, index: number) => {
                  const IconComponent = amenity.icon;
                  return (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <IconComponent size={32} className="mx-auto mb-3 text-pink-500" />
                      <h3 className="font-semibold text-gray-900 text-sm">{amenity.name}</h3>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payment Plan */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Payment Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{project.paymentPlan.downPayment}</div>
                  <div className="text-gray-600">Down Payment</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{project.paymentPlan.duringConstruction}</div>
                  <div className="text-gray-600">During Construction</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{project.paymentPlan.onCompletion}</div>
                  <div className="text-gray-600">On Completion</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 pt-6">
                <Clock className="text-blue-500" size={20} />
                <span className="text-gray-600">Handover: {project.paymentPlan.handoverDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Make This Your Home?</h2>
          <p className="text-xl mb-6 opacity-90">Contact {agent.name} today for exclusive access and personalized assistance</p>
          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <Button 
              className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={handlePhoneCall}
            >
              <Phone size={18} className="mr-2" />
              Call Now
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 shadow-lg"
              onClick={handleWhatsAppChat}
            >
              <MessageCircle size={18} className="mr-2" />
              Chat on WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              onClick={handleEmailInquiry}
            >
              <Mail size={18} className="mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Unit Preview Modal */}
      <UnitPreviewModal
        unit={selectedUnit}
        isOpen={isUnitPreviewOpen}
        onClose={() => setIsUnitPreviewOpen(false)}
        projectTitle={project.title}
        projectLocation={project.location}
      />

      <Footer />
    </div>
  );
};

export default ProjectDetails;

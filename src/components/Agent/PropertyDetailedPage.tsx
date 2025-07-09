import React, { useState } from 'react';
import { ArrowLeft, Home, Ruler, Calendar, MapPin, Car, Eye, Download, Phone, MessageCircle, Star, DollarSign } from 'lucide-react';
import Header from '../Agent/Header';
import logoPath from '@/assets/OFFPLAN_MARKET_female.png'
import Footer from '../Agent/Footer';
import { Button } from '@/components/ui/button'
import { Image, FileText, CreditCard, CalendarClock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const PropertyDetailedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unit, projectData, agent } = location.state || {};

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500">No unit data provided.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const formatPrice = (price: string | number) => {
    // Handle string inputs like "AED 1,200,000"
    const numericPrice =
      typeof price === "string"
        ? parseInt(price.replace(/[^\d]/g, ""), 10)
        : price;

    if (numericPrice >= 1_000_000) {
      return `${(numericPrice / 1_000_000).toFixed(1)}M`;
    } else if (numericPrice >= 1_000) {
      return `${(numericPrice / 1_000).toFixed(0)}K`;
    }
    return numericPrice.toString();
  };

  const [activeTab, setActiveTab] = useState('floor-plan');

  const [showModal, setShowModal] = useState(false);

  const handover = (() => {
    const delivery = projectData?.delivery_date;

    if (!delivery) return "N/A";

    // If it's a number (UNIX timestamp)
    if (typeof delivery === "number") {
      const date = new Date(delivery * 1000);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Compute quarter
      const quarter = Math.ceil(month / 3);
      return `Q${quarter} ${year}`;
    }

    // If it's already a string (like "Q4 2024")
    if (typeof delivery === "string") {
      return delivery;
    }

    return "N/A";
  })();

  const unitSpecs = [
    { icon: Home, label: 'Room', value: `${unit.apartmentType}`, color: 'bg-purple-200 text-purple-600' },
    { icon: Ruler, label: 'Area', value: `${(unit.size)}`, color: 'bg-blue-200 text-blue-600' },
    { icon: Calendar, label: 'Handover', value: `${handover}`, color: 'bg-green-200 text-green-600' },
    // { icon: MapPin, label: 'Floor', value: '12th', color: 'bg-teal-100 text-teal-600' },
    { icon: DollarSign, label: 'Payment', value: `${formatPrice(unit.price)}`, color: 'bg-red-200 text-red-600' },
    // { icon: Eye, label: 'View', value: 'Marina View', color: 'bg-cyan-100 text-cyan-600' }
  ];

  const unitFeatures = [
    'Premium flooring solutions',
    'Built-in wardrobes',
    'Balcony access',
    'Modern kitchen',
    'Ensuite views'
  ];

  const cards = [
    {
      title: "Gallery",
      description: "View all unit images and renders",
      button: "View Gallery",
    },
    {
      title: "Floor Plan",
      description: "Download detailed floor plan",
      button: "Download Plan",
    },
    {
      title: "Payment Plan",
      description: "Flexible payment options",
      button: "View Details",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-xl text-gray-800">OFFPLAN.MARKET</span>
            </div>

            <nav className="hidden lg:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Exclusive</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Latest</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
            </nav>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>🇦🇪 AR</span>
              <span>🇸🇦 SA</span>
              <span>🇦🇪 AE</span>
              <span>🇬🇧 EN</span>
            </div>
          </div>
        </div>
      </header> */}
      <Header logo={logoPath} />

      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
        {/* Back Button */}
        {/* <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Project
        </button> */}

        {/* Unit Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-80 lg:h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20 z-10"></div>
          <img
            src={projectData.cover}
            alt="Unit Hero"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 z-20 flex flex-col lg:flex-row lg:items-end justify-between px-8 py-6">
            <div className="text-white space-y-3">
              <h1 className="flex flex-row text-3xl lg:text-5xl font-bold">{projectData.title} - Unit ID : {unit.id}</h1>
              <p className="flex flex-row flex items-center gap-2 text-lg lg:text-2xl"><MapPin className="w-5 h-5" />{projectData.city?.name}, {projectData.district?.name}</p>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text py-1">AED {formatPrice(unit.price)}</div>
            </div>
            <div className="absolute bottom-3 right-2 bg-green-500 text-white px-5 py-2 rounded-full font-semibold lg:mb-8">
              {unit.status}
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {unitSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <div className={`w-12 h-12 rounded-full ${spec.color} flex items-center justify-center mx-auto mb-3`}>
                    <spec.icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                  <p className="font-semibold text-gray-800">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Floor Plan */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
                  Floor Plan
                </h2>
                {unit.floorPlan && unit.floorPlan !== "NO_FLOOR_PLAN" ? (
                  <div className="flex space-x-2">
                    {/* Download Button */}
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = unit.floorPlan;
                        link.download = "floor-plan.jpg"; // you can set a filename here
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {/* Preview Button */}
                    <a
                      href={unit.floorPlan}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">No Floor Plan Available</span>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden">
                {unit.floorPlan && unit.floorPlan !== "NO_FLOOR_PLAN" ? (
                  <img
                    src={unit.floorPlan}
                    alt="Floor Plan"
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-72 bg-gray-100 text-gray-500 rounded-xl">
                    No Floor Plan Image
                  </div>
                )}
              </div>
            </div>


            {/* Description */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold mb-4">Unit Description</h3>
              <div
                className="text-gray-600 prose prose-p"
                dangerouslySetInnerHTML={{ __html: projectData.description }}
              ></div>
            </div> */}
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:sticky lg:top-20">
            {/* Contact Agent */}
            <div className="w-full px-4 md:px-8 lg:px-16 py-10">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl px-8 py-10 text-white shadow-xl w-full max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  {/* <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
            👤
          </div> */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Interested in this unit?
                  </h3>
                  <p className="text-base md:text-lg opacity-90">
                    Contact our property advisor for exclusive pricing and viewing
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <a
                    href={`https://wa.me/${agent?.whatsapp_number?.replace(/\s+/g, '') || ''}?text=Hi, I'm interested in your off-plan properties and would like to visit ${projectData.title} (${unit.apartmentType}, Unit ${unit.id}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-white text-blue-600 font-semibold py-4 rounded-xl hover:bg-blue-400 transition-colors hover:text-white"
                  >
                    <CalendarClock className="w-5 h-5 mr-2" /> Book a Visit
                  </a>

                  <a
                    href={`tel:${agent?.phone_number || ""}`}
                    className="flex-1 flex items-center justify-center bg-white text-green-600 font-semibold py-4 rounded-xl hover:bg-green-400 transition-colors hover:text-white"
                  >
                    <Phone className="w-5 h-5 mr-2" /> Call Now
                  </a>

                  <a
                    href={`https://wa.me/${agent?.whatsapp_number?.replace(/\s+/g, '') || ''}?text=Hi, I'm interested in your off-plan properties`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-green-500 text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                  </a>
                </div>

              </div>
            </div>

            <div className="w-full px-4 md:px-8 lg:px-16 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Gallery */}
                <div className="flex flex-col items-center bg-purple-100 rounded-2xl shadow-md p-6 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 mb-4">
                    <Image size={32} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Gallery</h4>
                  <p className="text-sm text-gray-600 mb-4">View all unit images and renders</p>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold border hover:bg-purple-400 hover:text-white transition-colors">
                    View Gallery
                  </button>
                </div>

                {/* Floor Plan */}
                <div className="flex flex-col items-center bg-blue-100 rounded-2xl shadow-md p-6 text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 mb-4">
                    <FileText size={32} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Floor Plan</h4>
                  <p className="text-sm text-gray-600 mb-4">Download detailed floor plan</p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold border hover:bg-blue-400 hover:text-white transition-colors">
                    Download Plan
                  </button>
                </div>

                {/* Payment Plan */}
                <div className="flex flex-col items-center bg-green-100 rounded-2xl shadow-md p-6 text-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-3 mb-4">
                    <CreditCard size={32} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Payment Plan</h4>
                  <p className="text-sm text-gray-600 mb-4">Flexible payment options</p>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold border hover:bg-green-400 hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl text-center p-8 mt-10 max-w-2xl mx-auto border border-gray-100">
              <img
                src={agent.profile_image_url}
                alt="Sahar Kalhor"
                className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
              />
              <h3 className="text-2xl font-bold">{agent.name}</h3>
              <p className="text-sm text-gray-500 mb-3">Your Property Advisor</p>
              <p className="text-gray-700 mb-5 text-sm leading-relaxed">
                Speak directly with {agent.name} for pricing, viewing, and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-stretch sm:justify-around w-full">
                <a
                  href={`https://wa.me/${agent?.whatsapp_number?.replace(/\s+/g, '') || ''}?text=Hi, I'm interested in your off-plan properties`}
                  target="_blank"
                  className="flex-1"
                >
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold">
                    Chat with {agent.name}
                  </Button>
                </a>
                <a
                  href={`tel:${agent?.phone_number || ""}`}
                  className="flex-1"
                >
                  <Button className="w-full bg-purple-400 text-purple-600 font-semibold py-4 rounded-xl hover:bg-purple-500 text-white">
                    <Phone className="w-5 h-5 mr-2" /> Call Now
                  </Button>
                </a>
              </div>


            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetailedPage;

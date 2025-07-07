import React, { useState } from 'react';
import { ArrowLeft, Home, Ruler, Calendar, MapPin, Car, Eye, Download, Phone, MessageCircle, Star } from 'lucide-react';
import Header from '../Agent/Header';
import logoPath from '@/assets/OFFPLAN_MARKET_female.png'
import Footer from '../Agent/Footer';
import { Button } from '@/components/ui/button'
import { Image, FileText, CreditCard, CalendarClock } from "lucide-react";

const PropertyDetailedPage = () => {
  const [activeTab, setActiveTab] = useState('floor-plan');

  const unitSpecs = [
    { icon: Home, label: 'Room', value: 'Studio', color: 'bg-purple-100 text-purple-600' },
    { icon: Ruler, label: 'Area', value: '450 sq ft', color: 'bg-blue-100 text-blue-600' },
    { icon: Calendar, label: 'Handover', value: 'Q4 2025', color: 'bg-green-100 text-green-600' },
    { icon: MapPin, label: 'Floor', value: '12th', color: 'bg-teal-100 text-teal-600' },
    { icon: Car, label: 'Parking', value: '1', color: 'bg-red-100 text-red-600' },
    { icon: Eye, label: 'View', value: 'Marina View', color: 'bg-cyan-100 text-cyan-600' }
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
            src="https://panel.estaty.app/images/UYg2XEsJ6pPNQ9fZ-1747329506.webp"
            alt="Unit Hero"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 z-20 flex flex-col lg:flex-row lg:items-end justify-between px-8 py-6">
            <div className="text-white space-y-3">
              <h1 className="text-3xl lg:text-5xl font-bold">Azure Marina Residences</h1>
              <p className="text-lg lg:text-2xl">Unit A-1205</p>
              <div className="text-3xl font-bold">AED 850<span className="text-xl font-normal">K</span></div>
            </div>
            <div className="absolute bottom-3 right-2 bg-green-500 text-white px-5 py-2 rounded-full font-semibold lg:mb-8">
              Available
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <div className="flex space-x-2">
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <img src="/api/placeholder/600/400" alt="Floor Plan" className="w-full h-72 object-cover" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold mb-4">Unit Description</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Modern studio unit with smart design, featuring ceiling windows and stunning marina views.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                {unitFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
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
                  <button className="flex items-center justify-center flex-1 bg-white text-blue-600 font-semibold py-4 rounded-xl hover:bg-blue-400 transition-colors hover:text-white">
                    <CalendarClock className="w-5 h-5 mr-2" /> Book a Visit
                  </button>
                  <button className="flex items-center justify-center flex-1 bg-white text-green-600 font-semibold py-4 rounded-xl hover:bg-green-400 transition-colors hover:text-white">
                    <Phone className="w-5 h-5 mr-2" /> Call Now
                  </button>
                  <button className="flex items-center justify-center flex-1 bg-green-500 text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                  </button>
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
                src="https://via.placeholder.com/100"
                alt="Sahar Kalhor"
                className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
              />
              <h3 className="text-2xl font-bold">Sahar Kalhor</h3>
              <p className="text-sm text-gray-500 mb-3">Your Property Advisor</p>
              <p className="text-gray-700 mb-5 text-sm leading-relaxed">
                Speak directly with Sahar for pricing, viewing, and exclusive offers.
              </p>
              <div className="flex gap-3">
  <Button className="bg-green-500 hover:bg-green-600 text-white flex-1 rounded-xl font-semibold">
    Chat with Sahar
  </Button>
  <Button className="flex items-center justify-center flex-1 bg-purple-400 text-purple-600 font-semibold py-4 rounded-xl hover:bg-gray-100 transition-colors hover:bg-purple-500 text-white">
    <Phone className="w-5 h-5 mr-2" /> Call Now
  </Button>
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

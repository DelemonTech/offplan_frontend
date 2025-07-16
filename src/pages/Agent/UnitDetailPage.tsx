import React ,{useState} from 'react'
import Header from '../../components/others/Header'
// import Header from "@/components/HomeHeader";
import { ArrowLeft, MapPin, Ruler,Maximize, DollarSign, Building, Eye,Shield,Info,TrendingUp, Clock,Calendar,CalendarDays,Flame, Bath, Bed, Phone,Map,ChartBar, Mail, Download, Share2, MessageCircle, Home, CheckCircle, Image, FileText,Square, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import unit from '../../assets/unit.jpeg';
import girl from '../../assets/girl.jpg'
import forplan from '../../assets/forplan1.webp';

import Footer from '../../components/Agent/Footer'

const featureList = [
  { label: 'Type', value: 'Studio', icon:  <Home />, gradient: 'from-pink-500 to-purple-500' },
  { label: 'Size', value: '450 sq ft', icon: <Ruler/>, gradient: 'from-blue-500 to-indigo-500' },
  { label: 'Handover', value: 'Q4 2025', icon: <Calendar  />, gradient: 'from-pink-500 to-purple-500' },
  { label: 'Payment', value: '60/40', icon: <DollarSign  />, gradient: 'from-green-400 to-blue-400' },
];




function UnitDetailPage() {

const [showMessageBox, setShowMessageBox] = useState(false);
const agentProfile = {
    name: "Sahar Kalhor",
    title: "Your Property Advisor",
    phone: "+971529529687",
    email: "sahar@offplan.market",
    image: "https://media.istockphoto.com/id/1401007734/photo/portrait-of-a-happy-charming-business-woman-looking-at-the-camera-in-the-office.jpg?s=612x612&w=0&k=20&c=xB9FzwByjmaGmPdPjGpTsJwmUDhZ6QPLKActiXsQxPQ="
  };

    
  return (
    <div>
   <div className="min-h-screen bg-gray-50">
  {/* Hero Section */}
  <div className="relative bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80')`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-sm"></div>
  </div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 text-gray-800">
    <h1 className="text-3xl md:text-5xl font-bold mb-4">
      Bay Tower – <br /> Unit ID: <span className="text-pink-600 font-extrabold">G-02</span>
    </h1>

    <div className="flex flex-col md:flex-row gap-2 text-base md:text-lg mb-6">


      <div className="flex items-center gap-2">
        💰 <span className="font-medium">Price:</span> AED 5.2M
      </div>
      <div className="flex items-center gap-2">
        📐 <span className="font-medium">Size:</span> 3,371 sq.ft
      </div>
      <div className="flex items-center gap-2">
        📍 <span className="font-medium">Location:</span> Dubai – Bukadra
      </div>
      <div className="flex items-center gap-2">
        ✅ <span className="font-medium">Availability:</span> Available
      </div>
    </div>

    {/* Highlight CTA message */}
   
  </div>
</div>

  <div className="mt-6 max-w-xl mx-auto text-center hidden md:block">
  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-bold rounded-xl shadow-lg transition-all">
    Reserve Instantly – No Payment Required
  </button>
  <p className="mt-2 text-gray-600 text-sm">
    Just send your contact info and a photo of your ID. No card needed.
  </p>
</div>

{/* ✅ Sticky CTA for Mobile only */}
<div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t shadow-lg px-4 py-3">
  <div className="flex flex-col items-center justify-center text-center">
    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base font-semibold rounded-lg">
      Reserve Instantly – No Payment Required
    </button>
    <p className="mt-1 text-gray-600 text-xs">
      Just send your contact info and a photo of your ID. No card needed.
    </p>
  </div>
</div>

  {/* Info Cards Section */}
  <div className="container mx-auto px-6">
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-8">
  {/* Unit Type */}
  <div className="rounded-lg bg-gradient-to-br from-pink-100 to-pink-200 transition-all shadow-lg hover:shadow-xl border-0">
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <Home className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">Unit Type</h3>
      <p className="text-gray-600">2 Bedroom Apartment</p>
    </div>
  </div>

  {/* Handover */}
  <div className="rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 transition-all shadow-lg hover:shadow-xl">
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <CalendarDays className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">Handover</h3>
      <p className="text-gray-600">Q4 2026</p>
    </div>
  </div>

  {/* Estimated ROI */}
  <div className="rounded-lg bg-gradient-to-br from-green-100 to-green-200 transition-all shadow-lg hover:shadow-xl">
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <TrendingUp className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">Estimated ROI</h3>
      <p className="text-gray-600">6.1%</p>
    </div>
  </div>

  {/* Key Features */}
  <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 transition-all shadow-lg hover:shadow-xl">
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <Info className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">Key Features</h3>
      <ul className="text-gray-600 text-sm mt-2 space-y-1 text-left list-disc list-inside">
        <li>Lagoon View</li>
        <li>Fully Fitted Kitchen</li>
        <li>1 Parking Space</li>
        <li>Free 1-Year Mgmt</li>
      </ul>
    </div>
  </div>
</div>


        {/* Floor Plan Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Floor Plan</h2>
          <div className="max-w-5xl mx-auto rounded-lg bg-card shadow-xl text-card-foreground">
            <div className="p-0">
                <img 
                src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Floor Plan"
                className="w-full h-96 object-cover rounded-lg"
                />
            </div>
        </div>
        </div>

        

        {/* Call to Action Section */}
        

        {/* Quick Access Cards - Moved above agent card */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 transition-all cursor-pointer shadow-lg hover:shadow-xl border-0 text-card-foreground">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Image className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Gallery</h3>
                    <p className="text-gray-600 mb-4">View all property images</p>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl">
                    View Gallery
                    </Button>
                </div>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-teal-100 hover:from-green-100 hover:to-teal-200 transition-all cursor-pointer shadow-lg hover:shadow-xl border-0 text-card-foreground">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Map className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Floor Plan</h3>
                    <p className="text-gray-600 mb-4">Detailed floor layouts</p>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-xl">
                    View Floor Plan
                    </Button>
                </div>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-orange-50 to-amber-100 hover:from-orange-100 hover:to-amber-200 transition-all cursor-pointer shadow-lg hover:shadow-xl border-0 text-card-foreground">
                <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ChartBar className="h-12 w-12 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Plan</h3>
                    <p className="text-gray-600 mb-4">Flexible payment options</p>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl">
                    View Payment Plan
                    </Button>
                </div>
            </div>

          </div>
        </div>

        {/* Agent Detail Card */}
<section className="bg-gradient-to-tr from-pink-500  to-purple-500 py-8 md:px-8 border-t  border-gray-200 mt-8">
  <div className="max-w-3xl mx-auto text-center">
    {/* Title & Subtitle */}
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
      Need Help or More Info?
    </h2>
    <p className="text-gray-600 mb-6">
      Talk to our property advisor for pricing, viewing, and guidance.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {/* Call Now */}
      <a href="tel:+971500000000" className="flex-1">
        <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl shadow transition-all text-base font-semibold">
          <Phone className="h-5 w-5" />
          Call Now
        </button>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/971500000000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl shadow transition-all text-base font-semibold">
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </button>
      </a>

      {/* Request Callback (Optional) */}
      <button
        onClick={() => alert('Callback form popup')} // placeholder
        className="flex-1 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl shadow transition-all text-base font-semibold"
      >
        <Clock className="h-5 w-5" />
        Request Callback
      </button>
    </div>
  </div>
</section>



      </div>
    </div>
    </div>
  )
}


export default UnitDetailPage;

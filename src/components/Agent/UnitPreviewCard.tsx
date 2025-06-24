import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Maximize, DollarSign, Calendar, Download, Home } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  size: string;
  sizeMetric: string;
  price: string;
  floor: string;
  view: string;
  status: string;
}

interface UnitPreviewCardProps {
  unit: Unit;
  projectTitle: string;
  projectLocation: string;
  handoverDate?: string;
  paymentPlan?: {
    downPayment: string;
    duringConstruction: string;
    onCompletion: string;
  };
  floorPlanImage?: string;
}

const UnitPreviewCard = ({ 
  unit, 
  projectTitle, 
  projectLocation,
  handoverDate = "Q4 2025",
  paymentPlan = { downPayment: "20%", duringConstruction: "60%", onCompletion: "20%" },
  floorPlanImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop"
}: UnitPreviewCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    if (numPrice >= 1000000) {
      return `${(numPrice / 1000000).toFixed(2)}M`;
    }
    return numPrice.toLocaleString();
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });
        
        const link = document.createElement('a');
        link.download = `${projectTitle.replace(/\s+/g, '_')}_Unit_${unit.unitNumber.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500 text-white';
      case 'Reserved':
        return 'bg-yellow-500 text-white';
      case 'Sold':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Card for Sharing */}
      <div 
        ref={cardRef}
        className="w-full max-w-lg mx-auto bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100"
        style={{ width: '400px', minHeight: '600px' }}
      >
        {/* Header with Gradient Background */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 p-6 text-white relative">
          {/* Offplan.Market Branding */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs font-bold text-white">Offplan.Market</span>
            </div>
          </div>
          
          {/* Project Info */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-1">{projectTitle}</h1>
            <div className="flex items-center text-pink-100">
              <MapPin size={14} className="mr-2" />
              <span className="text-sm">{projectLocation}</span>
            </div>
          </div>
          
          {/* Unit Number and Status */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Unit {unit.unitNumber}</h2>
              <p className="text-pink-100 text-sm">{unit.type}</p>
            </div>
            <Badge className={`${getStatusBadgeStyle(unit.status)} px-3 py-1`}>
              {unit.status}
            </Badge>
          </div>
        </div>

        {/* Floor Plan Section */}
        <div className="p-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
            <img
              src={floorPlanImage}
              alt={`Floor plan for unit ${unit.unitNumber}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="text-center">
                <span className="text-lg font-bold text-gray-900">{unit.type}</span>
                <div className="text-sm text-gray-600 mt-1">Floor {unit.floor} • {unit.view}</div>
              </div>
            </div>
          </div>

          {/* Unit Details Grid */}
          <div className="space-y-4 mb-6">
            {/* Size */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100">
              <div className="flex items-center mb-2">
                <Maximize size={16} className="text-purple-600 mr-2" />
                <span className="text-sm font-semibold text-purple-700">Size</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{unit.size}</div>
              <div className="text-sm text-gray-600">({unit.sizeMetric})</div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center mb-2">
                <DollarSign size={16} className="text-green-100 mr-2" />
                <span className="text-sm font-semibold text-green-100">Price</span>
              </div>
              <div className="text-2xl font-bold">AED {formatPrice(unit.price)}</div>
              <div className="text-sm text-green-100">({parseInt(unit.price).toLocaleString()} AED)</div>
            </div>

            {/* Handover Date */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100">
              <div className="flex items-center mb-2">
                <Calendar size={16} className="text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-blue-700">Handover</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{handoverDate}</div>
            </div>
          </div>

          {/* Payment Plan */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-pink-100">
            <div className="flex items-center mb-3">
              <Building size={16} className="text-pink-600 mr-2" />
              <span className="text-sm font-semibold text-pink-700">Payment Plan</span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• {paymentPlan.downPayment} Down Payment</div>
              <div>• {paymentPlan.duringConstruction} During Construction</div>
              <div>• {paymentPlan.onCompletion} On Completion</div>
            </div>
          </div>

          {/* Contact Footer */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-4 py-2 text-white text-xs font-bold">
              Contact: +971 52 952 9687
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <Button 
          onClick={handleDownload}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download size={20} className="mr-2" />
          Download as Image
        </Button>
      </div>
    </div>
  );
};

export default UnitPreviewCard;

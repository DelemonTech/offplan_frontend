
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X, Phone, MessageCircle, ExternalLink } from 'lucide-react';

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

interface UnitPreviewModalProps {
  unit: Unit | null;
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectLocation?: string;
}

const UnitPreviewModal = ({ unit, isOpen, onClose, projectTitle, projectLocation = "Dubai Marina" }: UnitPreviewModalProps) => {
  if (!unit) return null;

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

  const handlePhoneCall = () => {
    window.open('tel:+971529529687', '_self');
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/971529529687', '_blank');
  };

  const handleViewFullDetails = () => {
    window.location.href = `/project/1/unit/${unit.id}`;
  };

  const floorPlanImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop";

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    if (numPrice >= 1000000) {
      return `${(numPrice / 1000000).toFixed(2)}M`;
    }
    return numPrice.toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm max-w-[85vw] p-0 overflow-hidden rounded-xl shadow-xl bg-white border-0 max-h-[75vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 p-1.5 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full transition-all duration-200 shadow-md border border-gray-200"
        >
          <X size={12} className="text-gray-700" />
        </button>

        {/* Header with Project and Unit Info */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 p-3 text-white">
          <div className="mb-2">
            <h2 className="text-sm font-bold mb-1">{projectTitle}</h2>
            <div className="flex items-center text-pink-100">
              <MapPin size={8} className="mr-1" />
              <span className="text-xs">{projectLocation}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-bold mb-1">
                {unit.type} - Unit {unit.unitNumber}
              </h1>
            </div>
            <Badge className={`${getStatusBadgeStyle(unit.status)} text-xs px-2 py-1`}>
              {unit.status}
            </Badge>
          </div>
        </div>

        {/* Compact Content Section */}
        <div className="p-3">
          {/* Floor Plan with Size overlay */}
          <div className="relative rounded-lg overflow-hidden bg-gray-50 shadow-md mb-3">
            <img
              src={floorPlanImage}
              alt={`Floor plan for unit ${unit.unitNumber}`}
              className="w-full h-28 object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
              <span className="text-xs font-bold text-gray-900">{unit.size}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-3">
            <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-lg p-2 text-center text-white shadow-lg">
              <div className="text-lg font-bold">
                AED {formatPrice(unit.price)}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-900 text-center">
              Interested in this unit?
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handlePhoneCall}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 text-xs shadow-md"
              >
                <Phone size={10} className="mr-1" />
                Call Sahar
              </Button>
              <Button 
                onClick={handleWhatsAppChat}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 text-xs shadow-md"
              >
                <MessageCircle size={10} className="mr-1" />
                WhatsApp
              </Button>
            </div>

            <Button 
              onClick={handleViewFullDetails}
              variant="outline"
              className="w-full py-2 text-xs font-bold border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
            >
              <ExternalLink size={10} className="mr-1" />
              View Complete Specifications
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnitPreviewModal;

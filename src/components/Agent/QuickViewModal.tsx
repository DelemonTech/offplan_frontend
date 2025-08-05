
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X, Calendar, Home, DollarSign, Building, Download } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  location: string;
  price: string;
  roi: string;
  delivery: string;
  status: string;
  statusType: string;
  image: string;
  badges: string[];
}

interface QuickViewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails: (projectId: number) => void;
}

const QuickViewModal = ({ project, isOpen, onClose, onViewDetails }: QuickViewModalProps) => {
  if (!project) return null;

  const handleModalClick = () => {
    onViewDetails(project.id);
    onClose();
  };

  const handleDownloadBrochure = (e: React.MouseEvent) => {
    e.stopPropagation();
    // console.log("Downloading brochure for DoubleTree By Hilton");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-[95vw] p-0 overflow-hidden rounded-2xl shadow-2xl max-h-[95vh] w-full bg-white border-2 border-gray-100">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/lovable-uploads/a8780c8b-8c74-4510-8147-9e6f64f12c1c.png')`
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-50 p-1.5 bg-black/40 backdrop-blur-sm hover:bg-black/50 rounded-full transition-all duration-200"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Complete Project Information Box */}
        <div className="relative z-10 p-4 space-y-4 cursor-pointer" onClick={handleModalClick}>
          
          {/* Header Section with Project Name & Location */}
          <div className="text-center border-b border-gray-200 pb-3">
            <div className="flex items-center justify-center mb-1">
              <Building size={18} className="text-amber-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">DoubleTree By Hilton</h2>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1 text-pink-500" />
              <span>Dubai / Jumeirah Garden City</span>
            </div>
          </div>

          {/* Basic Info Row */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-blue-50/90 p-3 rounded-lg border-l-4 border-blue-400">
              <span className="text-gray-600 flex items-center"><span className="mr-1">🏗️</span> Status:</span>
              <div className="font-semibold text-blue-700">Off-plan</div>
            </div>
            <div className="bg-green-50/90 p-3 rounded-lg border-l-4 border-green-400">
              <span className="text-gray-600 flex items-center"><span className="mr-1">🏠</span> Type:</span>
              <div className="font-semibold text-green-700">Residential</div>
            </div>
          </div>

          {/* Handover Date */}
          <div className="bg-purple-50/90 p-3 rounded-lg border-l-4 border-purple-400 text-center">
            <span className="text-gray-600 text-sm flex items-center justify-center">
              <span className="mr-1">📆</span> Handover:
            </span>
            <span className="font-bold text-purple-700 text-lg">06/2027</span>
          </div>

          {/* Unit Details Section */}
          <div className="bg-gray-50/90 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center">
              <span className="mr-1">🛏️</span> Unit Details
            </h3>
            
            {/* 1 Bedroom */}
            <div className="bg-white/90 rounded-lg p-3 mb-3 border-l-4 border-pink-400">
              <div className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
                <span className="mr-1">•</span> 1 Bedroom
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-600">Price Range:</span>
                  <div className="font-semibold text-gray-800">AED 1,736,011 - 2,003,914</div>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <div className="font-semibold text-gray-800">721 ft² - 809 ft²</div>
                </div>
              </div>
            </div>
            
            {/* 2 Bedroom */}
            <div className="bg-white/90 rounded-lg p-3 border-l-4 border-blue-400">
              <div className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
                <span className="mr-1">•</span> 2 Bedroom
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-600">Price Range:</span>
                  <div className="font-semibold text-gray-800">AED 2,571,869 - 3,386,294</div>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <div className="font-semibold text-gray-800">1,099 ft² - 1,415 ft²</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Plan Section */}
          <div className="bg-gradient-to-r from-green-50/90 to-blue-50/90 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center">
              <span className="mr-1">💳</span> Payment Plan - 50/50
            </h3>
            
            <div className="grid grid-cols-1 gap-1 text-xs">
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• Booking & 1st Payment</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• DLD Fees</span>
                <span className="font-semibold">4%</span>
              </div>
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• 1st Installment</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• 2nd Installment</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• 3rd Installment</span>
                <span className="font-semibold">5%</span>
              </div>
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• 4th Installment</span>
                <span className="font-semibold">7.5%</span>
              </div>
              <div className="flex justify-between bg-white/70 rounded px-3 py-2">
                <span className="text-gray-700">• 5th Installment</span>
                <span className="font-semibold">7.5%</span>
              </div>
              <div className="flex justify-between bg-gradient-to-r from-green-200/80 to-blue-200/80 rounded px-3 py-2 font-bold">
                <span className="text-gray-800">• On Delivery</span>
                <span className="text-green-700">50%</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleDownloadBrochure}
            variant="outline"
            className="w-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-medium py-2 rounded-lg transition-all duration-300 text-sm bg-white/90"
          >
            <Download size={14} className="mr-2" />
            Download Brochure
          </Button>
          
          <div className="text-center">
            <span className="text-xs text-gray-500">Click anywhere to view full details</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;

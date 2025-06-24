
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, TrendingUp, Building, Users, DollarSign, Maximize, Phone, MessageCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  location: string;
  price: string;
  status: string;
  delivery: string;
  image: string;
  roi?: string;
  badges?: string[];
}

interface ProjectSummaryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectSummaryModal: React.FC<ProjectSummaryModalProps> = ({ project, isOpen, onClose }) => {
  const navigate = useNavigate();

  // Debug logging
  console.log('ProjectSummaryModal - Received project:', project);

  if (!project) return null;

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
    onClose();
  };

  const handleContact = () => {
    const message = encodeURIComponent(`Hi Sahar, I'm interested in ${project.title} in ${project.location}. Can you provide more details?`);
    window.open(`https://wa.me/971529529687?text=${message}`, '_blank');
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Ready':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      case 'Off-Plan':
        return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white';
      case 'Pre-Launch':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-w-[95vw] p-0">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-64 rounded-t-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <Badge className={`${getStatusBadgeStyle(project.status)} font-semibold px-3 py-1`}>
                {project.status}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold text-center">
                Project Summary
              </DialogTitle>
            </DialogHeader>

            {/* Key Information Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-pink-500" />
                  <span className="text-sm text-gray-600">Starting Price</span>
                </div>
                <div className="font-bold text-lg text-gray-900">AED {project.price}</div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="text-sm text-gray-600">Delivery</span>
                </div>
                <div className="font-bold text-lg text-gray-900">{project.delivery}</div>
              </div>

              {project.roi && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-green-500" />
                    <span className="text-sm text-gray-600">Expected ROI</span>
                  </div>
                  <div className="font-bold text-lg text-gray-900">{project.roi}</div>
                </div>
              )}

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building size={18} className="text-orange-500" />
                  <span className="text-sm text-gray-600">Property Type</span>
                </div>
                <div className="font-bold text-lg text-gray-900">Luxury Apartments</div>
              </div>
            </div>

            {/* Project Highlights */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Project Highlights</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Prime location in {project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Modern architecture and premium finishes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>World-class amenities and facilities</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Flexible payment plans available</span>
                </div>
                {project.badges && project.badges.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Features: {project.badges.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/lovable-uploads/d10f1d83-102b-4cd8-90c2-c2ff386125e7.png"
                  alt="Sahar Kalhor"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sahar Kalhor</div>
                  <div className="text-sm text-gray-600">Senior Property Consultant</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get personalized assistance and exclusive access to this project.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} />
                <span>+971 52 952 9687</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleViewDetails}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              >
                View Full Details
              </Button>
              <Button 
                onClick={handleContact}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle size={18} className="mr-2" />
                Contact Sahar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSummaryModal;

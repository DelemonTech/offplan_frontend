import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail,Calendar } from 'lucide-react';

const RequestCallBackModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
  });

  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
          <button
            className="w-full mt-4 sm:mt-4 bg-purple-200 text-gray-800 border border-gray-300 hover:bg-gray-100 font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition"
          >
            <span className="text-lg"><Calendar /></span> Request Callback
          </button>
        </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Request Callback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name Field */}
          <div className="relative">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 transition-all duration-200 peer"
              placeholder="Your name"
            />
            <label
              className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1 
                ${focusedField === 'name' || formData.name
                  ? '-top-2 text-xs text-pink-500 font-medium'
                  : 'top-3 text-gray-500'
                }`}
            >
              Your name
            </label>
          </div>

          {/* Mobile Field */}
          <div className="relative">
            <Input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('mobile')}
              onBlur={() => setFocusedField('')}
              className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 transition-all duration-200 peer"
              placeholder="Mobile number"
            />  
            <label
              className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1 
                ${focusedField === 'mobile' || formData.mobile
                  ? '-top-2 text-xs text-pink-500 font-medium'
                  : 'top-3 text-gray-500'
                }`}
            >
              Mobile number
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 transition-all duration-200 peer"
              placeholder="Email address"
            />
            <label
              className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1 
                ${focusedField === 'email' || formData.email
                  ? '-top-2 text-xs text-pink-500 font-medium'
                  : 'top-3 text-gray-500'
                }`}
            >
              Email address
            </label>
          </div>

          {/* Submit Button */}
          <Button className="w-full h-11 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Submit Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestCallBackModal;

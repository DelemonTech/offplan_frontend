
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail } from 'lucide-react';

function RequestCallBackModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
      });
    
      const [focusedField, setFocusedField] = useState('');
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const FloatingLabelInput = ({
      label,
      name,
      type = 'text',
      value,
      onChange
    }: {
      label: string;
      name: string;
      type?: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }) => (
      <div className="relative">
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="peer h-11 bg-white border border-gray-300 text-gray-900 placeholder-transparent focus:border-pink-500  rounded-md transition-all duration-200"
        />
        <label
          htmlFor={name}
          className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 bg-white px-1 pointer-events-none 
            peer-placeholder-shown:top-3 
            peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-500 
            peer-focus:-top-2 
            peer-focus:text-xs 
            peer-focus:text-pink-500 
            peer-focus:font-medium"
        >
          {label}
        </label>
      </div>
    );
  return (
    <div>
      <Dialog open onOpenChange={onClose}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Mail size={16} className="mr-2" />
                Contact Us
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900 text-center">Request Callback</DialogTitle>
              </DialogHeader>
      
              <div className="space-y-4 mt-4">
                <FloatingLabelInput
                  label="Your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
      
                <FloatingLabelInput
                  label="Mobile number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
      
                <FloatingLabelInput
                  label="Email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
      
                
               
                <Button className="w-full h-11 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Send Inquiry
                </Button>
                
              </div>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default RequestCallBackModal

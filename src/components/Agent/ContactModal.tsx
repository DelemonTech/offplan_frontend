
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail } from 'lucide-react';

const ContactModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
    agreeUpdates: false
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
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField('')}
        className="h-11 bg-white border-gray-300 text-gray-900 placeholder-transparent focus:border-pink-400 focus:ring-pink-300 peer transition-all duration-200"
        placeholder={label}
      />
      <label 
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          focusedField === name || value
            ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
            : 'top-3 text-gray-500 transform scale-100'
        }`}
      >
        {label}
      </label>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <Mail size={16} className="mr-2" />
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">Get In Touch</DialogTitle>
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

          <div className="relative">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField('')}
              className="min-h-[80px] bg-white border-gray-300 text-gray-900 placeholder-transparent focus:border-pink-400 focus:ring-pink-300 resize-none transition-all duration-200"
              placeholder="Your inquiry message"
            />
            <label 
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                focusedField === 'message' || formData.message
                  ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                  : 'top-3 text-gray-500 transform scale-100'
              }`}
            >
              Your message
            </label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="updates"
              checked={formData.agreeUpdates}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, agreeUpdates: checked as boolean }))
              }
              className="border-gray-400 data-[state=checked]:bg-pink-500 mt-0.5"
            />
            <label htmlFor="updates" className="text-sm text-gray-600 leading-relaxed">
              I agree to receive updates about new properties
            </label>
          </div>

          <Button className="w-full h-11 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Send Inquiry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;

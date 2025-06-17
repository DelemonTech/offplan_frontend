
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { Pointer } from 'lucide-react';


const Login = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(credentials);
      if (success) {
        toast.success('Login successful!');
        // Navigate based on role
        if (credentials.email === 'admin@offplanmarket.com') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error('Invalid credentials. Try admin@offplanmarket.com/admin123 or agent@offplanmarket.com/agent123');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f24ca0]/10 to-[#6084ee]/10 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/93c61de1-b334-4926-a59a-2934c6cb5135.png" 
            alt="Off Plan Market" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-[#6084ee]">
            {t("Welcome Back")}
          </CardTitle>
          <p className="text-gray-600">{t("Empowering Agents")}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t("Email")}</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder={t("Enter your email")}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{t("Password")}</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder={t("Enter your password")}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#f24ca0] hover:bg-[#f24ca0]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? t('Signing In...') : t('Sign In')}
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>{t("Demo Accounts")}:</p>
            <p>{t("Admin")}: admin@offplanmarket.com / admin123</p>
            <p>{t("Agent")}: agent@offplanmarket.com / agent123</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between" dir='ltr'>
            <a 
              // variant="ghost" 
              onClick={() => navigate('/')}
              className="text-[#6084ee] hover:text-[#6084ee]/80 cursor-pointer"
            >
              {t("Home")}
            </a>

              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-[#6084ee] transition">
                  🌐
                  <span className="ml-1 hidden sm:inline">{t('Language')}</span>
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t("English (UK)")}
                  </button>
                  <button
                    onClick={() => changeLanguage('fa')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t("Farsi (Persian)")}
                  </button>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

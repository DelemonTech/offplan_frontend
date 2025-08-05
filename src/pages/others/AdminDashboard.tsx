
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, UserPlus, Users, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import FooterAdmin from '@/components/others/FooterAdmin';

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("Good Morning");
    else if (hour < 18) return t("Good Afternoon");
    else return t("Good Evening");
  };
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });

  const menuItems = [t('Home'), t('Exclusive'), t('Latest'), t('About'), t('Blog')];

  // Mock data - in real app, this would come from API
  const [agents] = useState([
    { id: 1, username: 'benison', name: 'Benison Agent', email: 'benison@offplanmarket.com', totalLeads: 12 },
    { id: 2, username: 'sarah', name: 'Sarah Ahmed', email: 'sarah@offplanmarket.com', totalLeads: 8 },
    { id: 3, username: 'mohammed', name: 'Mohammed Ali', email: 'mohammed@offplanmarket.com', totalLeads: 15 }
  ]);

  const [leads] = useState([
    { id: 1, name: 'John Doe', phone: '+971501234567', project: 'Dubai Creek Harbour Tower', agent: 'benison', date: '2024-01-15' },
    { id: 2, name: 'Sarah Smith', phone: '+971507654321', project: 'Marina Bay Residences', agent: 'sarah', date: '2024-01-14' },
    { id: 3, name: 'Ahmed Hassan', phone: '+971509876543', project: 'Downtown Vista', agent: 'mohammed', date: '2024-01-13' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would be an API call
    toast.success(`Agent ${newAgent.name} added successfully`);
    setNewAgent({ username: '', name: '', email: '', password: '' });
    setShowAddAgent(false);
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/11b303ba-efcb-483b-86ae-d82efdb9c016.png"
                alt="Off Plan Market"
                className="h-12 max-w-[60vw] w-auto object-contain"
              />
            </div>

            {/* Navigation */}
            <nav className="relative">
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    className="text-gray-700 hover:text-[#6084ee] hover:text-500 transition"
                  >
                    {item}
                  </button>
                ))}
                {/* </div> */}

                {/* Language Selector */}
                <div className="relative group py-2">
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
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-[#f24ca0] text-[#f24ca0] hover:bg-[#f24ca0] hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>


              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {/* Mobile Dropdown Menu with Transparent Backdrop */}
              {isOpen && (
                <>
                  {/* Transparent backdrop */}
                  <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 z-40"
                  ></div>

                  {/* Dropdown menu below header */}
                  <div
                    className="fixed top-16 left-4 right-4 bg-white z-50 shadow-md px-4 py-4 flex flex-col space-y-3 rounded-lg overflow-auto inline-flex max-w-[calc(100vw-2rem)]">
                    {menuItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setIsOpen(false);
                          // Add route navigation here if needed
                        }}
                        className="text-gray-700 hover:text-[#6084ee] hover:text-500 text-base text-left"
                      >
                        {item}
                      </button>
                    ))}
                    <hr />
                    {/* Language on Mobile */}
                    <div>
                      <p className="text-gray-600 text-sm mb-1">🌐 Language</p>
                      <button
                        onClick={() => changeLanguage('en')}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                      >
                        {t("English (UK)")}
                      </button>
                      <button
                        onClick={() => changeLanguage('fa')}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                      >
                        {t("Farsi (Persian)")}
                      </button>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="border-[#f24ca0] text-[#f24ca0] hover:bg-[#f24ca0] hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </>

              )}
            </nav>
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Stats Cards */}
        <div>
          <h2 className="text-xl font-semibold text-[#7786ff]">{getGreeting()}, {user?.name}</h2>
          {/* <p className="text-sm text-gray-600">Good Morning, {user?.name}</p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-[#6084ee]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t("Total Agents")}</p>
                  <p className="text-2xl font-bold text-[#6084ee]">{agents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-[#f24ca0]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t("Total Leads")}</p>
                  <p className="text-2xl font-bold text-[#f24ca0]">{leads.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserPlus className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t("Active Projects")}</p>
                  <p className="text-2xl font-bold text-green-600">25</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6084ee]">{t("Manage Agents")}</CardTitle>
              <Button
                onClick={() => setShowAddAgent(!showAddAgent)}
                className="bg-[#f24ca0] hover:bg-[#f24ca0]/90 text-white"
              >
                <UserPlus className="h-4 w-4" />
                {t("Add Agent")}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddAgent && (
              <form onSubmit={handleAddAgent} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">{t("Username")}</Label>
                    <Input
                      id="username"
                      value={newAgent.username}
                      onChange={(e) => setNewAgent({ ...newAgent, username: e.target.value })}
                      placeholder={t("Enter username")}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">{t("Full Name")}</Label>
                    <Input
                      id="name"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                      placeholder={t("Enter full name")}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("Email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAgent.email}
                      onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                      placeholder={t("Enter email")}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">{t("Password")}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newAgent.password}
                      onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                      placeholder={t("Enter password")}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" className="bg-[#6084ee] hover:bg-[#6084ee]/90 text-white">
                    {t("Add Agent")}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddAgent(false)}>
                    {t("Cancel")}
                  </Button>
                </div>
              </form>
            )}

            <Table dir="ltr">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Username")}</TableHead>
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead>{t("Email")}</TableHead>
                  <TableHead>{t("Total Leads")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.username}</TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.totalLeads}</TableCell>
                    <TableCell>
                      <div className="flex flex-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/${agent.username}`)}
                          className="mr-2"
                        >
                          {t("View Page")}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => toast.success(`Agent ${agent.name} deleted`)}
                        >
                          {t("Delete")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Leads Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#6084ee]">{t("All Leads")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table dir="ltr">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead>{t("Phone")}</TableHead>
                  <TableHead>{t("Project")}</TableHead>
                  <TableHead>{t("Agent")}</TableHead>
                  <TableHead>{t("Date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.project}</TableCell>
                    <TableCell>{lead.agent}</TableCell>
                    <TableCell>{lead.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <FooterAdmin />
    </div>
  );
};

export default AdminDashboard;

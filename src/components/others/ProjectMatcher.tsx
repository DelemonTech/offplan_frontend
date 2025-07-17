import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MessageSquare, Users, ChartBar } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

export const ProjectMatcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const projects = [
    {
      id: 1,
      name: 'Sobha Hartland II',
      location: 'MBR City',
      priceRange: 'AED 1.2M - 4.8M',
      unitTypes: '1-4 BR Apartments',
      launch: 'Q3 2024',
      matchingLeads: 12,
      status: 'launching',
      description: 'Luxury waterfront living with stunning views'
    },
    {
      id: 2,
      name: 'Dubai South Village',
      location: 'Dubai South',
      priceRange: 'AED 800K - 2.1M',
      unitTypes: 'Studios, 1-2 BR',
      launch: 'Available Now',
      matchingLeads: 8,
      status: 'available',
      description: 'Modern community near Al Maktoum Airport'
    },
    {
      id: 3,
      name: 'Marina Pinnacle',
      location: 'Dubai Marina',
      priceRange: 'AED 1.8M - 6.2M',
      unitTypes: '1-3 BR Apartments',
      launch: 'Q4 2024',
      matchingLeads: 15,
      status: 'upcoming',
      description: 'Iconic tower with marina and sea views'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'launching':
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">🚀 Launching Soon</Badge>;
      case 'available':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">✅ Available</Badge>;
      case 'upcoming':
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">📅 Upcoming</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center">
              <ChartBar className="h-5 w-5 mr-2 text-pink-600" />
              {t("AI Project-to-Client Match Engine")}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("Smart recommendations based on client preferences and budget")}
            </p>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            {t("View All Projects")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
                {getStatusBadge(project.status)}
              </div>

              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("Price Range")}:</span>
                  <span className="font-medium">{project.priceRange}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("Unit Types")}:</span>
                  <span className="font-medium">{project.unitTypes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("Launch")}:</span>
                  <span className="font-medium">{project.launch}</span>
                </div>
              </div>

              <div className="bg-pink-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-pink-600" />
                    <span className="text-sm font-medium text-pink-800">
                      {project.matchingLeads} {t("Matching Clients")}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("AI Match")}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {t("WhatsApp Offer")}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  {t("View Matches")}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg border border-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-pink-800">{t("Smart Suggestion")}</h4>
              <p className="text-sm text-pink-600 mt-1">
                Ahmed Al-Rashid might be interested in Sobha Hartland II based on his Downtown Dubai preference and budget range.
              </p>
            </div>
            <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
              {t("Send Recommendation")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
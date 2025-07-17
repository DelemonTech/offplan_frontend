import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Bell, Plus } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

export const LeadManagement = () => {
      const { t, i18n } = useTranslation();
      const [isOpen, setIsOpen] = useState(false);
      const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.dir = lng === 'fa' ? 'rtl' : 'ltr';
        setIsOpen(false);
      };
  const leads = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@email.com',
      phone: '+971 50 123 4567',
      propertyInterest: 'Downtown Dubai, 2BR',
      channel: t('WhatsApp'),
      lastContact: '2 hours ago',
      status: t('hot'),
      avatar: 'AR'
    },
    {
      id: 2,
      name: 'Maria Gonzalez',
      email: 'maria@email.com',
      phone: '+971 55 987 6543',
      propertyInterest: 'Dubai Marina, 1BR',
      channel: 'Website',
      lastContact: '1 day ago',
      status: t('warm'),
      avatar: 'MG'
    },
    {
      id: 3,
      name: 'James Wilson',
      email: 'james@email.com',
      phone: '+971 56 456 7890',
      propertyInterest: 'Business Bay, Studio',
      channel: 'Social Ad',
      lastContact: '3 days ago',
      status: t('cold'),
      avatar: 'JW'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+971 52 234 5678',
      propertyInterest: 'JVC, 3BR Villa',
      channel: 'Email',
      lastContact: '5 hours ago',
      status: t('hot'),
      avatar: 'PS'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hot':
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">🔥 {t("Hot")}</Badge>;
      case 'warm':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">⚡ {t("Warm")}</Badge>;
      case 'cold':
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">❄️ {t("Cold")}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  useEffect(() => {
      document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    }, [i18n.language]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{t("Smart Lead Management")}</CardTitle>
          <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            {t("Add Lead")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{lead.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{lead.name}</h4>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  <p className="text-xs text-muted-foreground">{lead.phone}</p>
                </div>
              </div>
              {getStatusBadge(lead.status)}
            </div>
            
            <div className="space-y-2 mb-3">
              <p className="text-sm">
                <span className="font-medium">{t("Interest")}:</span> {lead.propertyInterest}
              </p>
              <p className="text-sm">
                <span className="font-medium">{t("Channel")}:</span> {lead.channel}
              </p>
              <p className="text-sm">
                <span className="font-medium">{t("Last Contact")}:</span> {lead.lastContact}
              </p>
            </div>

            <div className="flex space-x-2 gap-1 overflow-x-auto">
              <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                {t("WhatsApp")}
              </Button>
              <Button size="sm" variant="outline">
                {t("Email")}
              </Button>
              <Button size="sm" variant="outline">
                <Bell className="h-3 w-3 mr-1" />
                {t("Follow-up")}
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-3 w-3 mr-1" />
                {t("Note")}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
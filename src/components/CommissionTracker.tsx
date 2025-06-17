import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import '@/i18n';
import { useTranslation } from 'react-i18next';

export const CommissionTracker = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const deals = [
    {
      id: 1,
      project: 'The Address Harbour Point',
      client: 'Ahmed Al-Rashid',
      salePrice: 'AED 2.8M',
      commission: '3%',
      amount: 'AED 84K',
      status: 'paid',
      date: '2024-05-15'
    },
    {
      id: 2,
      project: 'Emaar Beachfront',
      client: 'Maria Gonzalez',
      salePrice: 'AED 4.2M',
      commission: '2.5%',
      amount: 'AED 105K',
      status: 'pending',
      date: '2024-05-20'
    },
    {
      id: 3,
      project: 'Dubai Creek Harbour',
      client: 'James Wilson',
      salePrice: 'AED 1.9M',
      commission: '3.5%',
      amount: 'AED 66.5K',
      status: 'paid',
      date: '2024-05-10'
    },
    {
      id: 4,
      project: 'Palm Jumeirah Resort',
      client: 'Priya Sharma',
      salePrice: 'AED 6.1M',
      commission: '2%',
      amount: 'AED 122K',
      status: 'pending',
      date: '2024-05-25'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'paid' 
      ? <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">✅ {t("Paid")}</Badge>
      : <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">⏳ {t("Pending")}</Badge>;
  };
  
  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{t("Commission & Deal Tracker")}</CardTitle>
          <Button size="sm" variant="outline">
            {t("View All")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deals.map((deal) => (
            <div key={deal.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{deal.project}</h4>
                  <p className="text-xs text-muted-foreground">{deal.client}</p>
                </div>
                {getStatusBadge(deal.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">{t("Sale Price")}</p>
                  <p className="font-medium">{deal.salePrice}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t("Commission")}</p>
                  <p className="font-medium">{deal.commission}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t("Amount")}</p>
                  <p className="font-bold text-pink-600">{deal.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t("Date")}</p>
                  <p className="font-medium">{deal.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t("Total Commission This Month")}</p>
            <p className="text-2xl font-bold text-pink-600">AED 377.5K</p>
            <p className="text-xs text-muted-foreground mt-1">+23% from last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
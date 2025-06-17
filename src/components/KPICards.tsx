
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, ChartBar } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

export const KPICards = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.dir = lng === 'fa' ? 'rtl' : 'ltr';
        setIsOpen(false);
    };
    const getGreeting = () => {
        const hour = new Date().getHours();
        // const emoji = ["🌞","☀️","🌙"];
        if (hour < 12) return t("Good Morning");
        else if (hour < 18) return t("Good Afternoon");
        else return t("Good Evening");
    };
    const getEmoji = () => {
        const emoji = ["☀️","🌞","🌙"];
        const hour = new Date().getHours();
        if (hour < 12) return emoji[0];
        else if (hour < 18) return emoji[1];
        else return emoji[2];
    }
    const kpis = [
        {
            title: t('Total Leads'),
            value: '147',
            change: '12 '+ t('this week'),
            icon: Users,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50'
        },
        {
            title: t('Active Projects'),
            value: '23',
            change: '5 ' +t('launching soon'),
            icon: ChartBar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: t('Closed Deals'),
            value: '34',
            change: '8 ' +t('this month'),
            icon: Calendar,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50'
        },
        {
            title: t('Last Inquiry'),
            value: '2h ago',
            change: t('WhatsApp message'),
            icon: Clock,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        }
    ];

    const earnings = [
        {
            title: t('Paid Commission'),
            value: 'AED 2.4M',
            subtitle: t('This year')
        },
        {
            title: t('Pending Commission'),
            value: 'AED 890K',
            subtitle: '12'+ t('pending deals')
        },
        {
            title: t('Total Earned'),
            value: 'AED 3.3M',
            subtitle: t('Lifetime')
        },
        {
            title:t('Avg. Deal Size'),
            value: 'AED 97K',
            subtitle: t('Commission per deal')
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {getGreeting()}, {t("Sahar")} {getEmoji()}
                </h2>
                <p className="text-muted-foreground">
                    {t("You have ")} 8{t(" hot leads waiting for follow-up and ")}3{t(" site visits scheduled today.")}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                    <p className="text-2xl font-bold">{kpi.value}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
                                </div>
                                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {earnings.map((earning, index) => (
                    <Card key={index} className="bg-gradient-to-br from-pink-600 to-blue-600 text-white hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <p className="text-sm text-pink-100">{earning.title}</p>
                            <p className="text-2xl font-bold mt-1">{earning.value}</p>
                            <p className="text-xs text-pink-200 mt-1">{earning.subtitle}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
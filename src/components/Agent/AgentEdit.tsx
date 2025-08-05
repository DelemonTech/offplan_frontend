import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MessageSquare, Star, Trophy, Calendar, Play, Save, Camera, Globe, Briefcase, Award, Edit3, Sparkles, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




const AgentEdit = ({ agent }) => {
    const [formData, setFormData] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const hostUrl = import.meta.env.VITE_HOST_URL
                const res = await fetch(`${hostUrl}/agent/${username}`);
                const json = await res.json();
                if (res.ok && json.status) {
                    setFormData({
                        id: json.data.id || "",
                        username: json.data.username || "",
                        name: json.data.name || "",
                        email: json.data.email || "",
                        whatsapp_number: json.data.whatsapp_number || "",
                        phone_number: json.data.phone_number || "",
                        profile_image_url: json.data.profile_image_url || "",
                        introduction_video_url: json.data.introduction_video_url || "",
                        description: json.data.description || "",
                        years_of_experience:
                            typeof json.data.years_of_experience === "string"
                                ? json.data.years_of_experience.match(/\d+/)?.[0] || ""
                                : json.data.years_of_experience?.toString() || "",
                        total_business_deals: json.data.total_business_deals?.toString() || "",
                        rank_top_performing: json.data.rank_top_performing || "",
                        gender: json.data.gender || "",
                        fa_name: json.data.fa_name || "",
                        fa_username: json.data.fa_username || "",
                        fa_description: json.data.fa_description || "",
                        ar_name: json.data.ar_name || "",
                        ar_username: json.data.ar_username || "",
                        ar_description: json.data.ar_description || "",
                    });
                }
            } catch (err) {
                console.error("Failed to fetch agent:", err);
            }
        };

        if (username) fetchAgentData();
    }, [username]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData || !formData.id) return;

        try {
            const hostUrl = import.meta.env.VITE_HOST_URL;
            const res = await fetch(`${hostUrl}/agent/update/${formData.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok && result.status) {
                toast({
                    title: "Profile Updated Successfully!",
                    description: "Your agent profile has been saved with the latest changes.",
                });

                setTimeout(() => {
                    navigate(`/${formData.username}`);
                }, 1500);
            } else {
                toast({
                    title: "Update Failed",
                    description: result.message || "Something went wrong.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            toast({
                title: "Network Error",
                description: "Unable to update agent profile at this time.",
                variant: "destructive",
            });
        }
    };
    if (!formData) {
        return <div className="text-center p-8 text-gray-600">Loading profile data...</div>;
    }
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 overflow-x-hidden">
                {/* Hero Section */}
                <div className="relative overflow-x-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 opacity-90"></div>
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    ></div>

                    <div className="relative container mx-auto px-6 py-16">
                        <div className="flex flex-row lg:flex-row items-center gap-12">
                            {/* Profile Section */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="relative mb-6">
                                    <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>
                                    <div className="relative bg-white/10 p-2 rounded-full backdrop-blur-sm">
                                        <Avatar className="w-40 h-40 border-4 border-white/30 shadow-2xl">
                                            <AvatarImage
                                                src={formData.profile_image_url}
                                                alt={formData.name || "Agent"}
                                            />
                                            <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                                                {formData.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                                            <Camera className="w-5 h-5 text-purple-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-white">
                                    <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                                        {formData.name}
                                    </h2>
                                    <p className="text-xl text-white/90 mb-2">@{formData.username}</p>
                                    <p className="text-lg text-white/80 max-w-md leading-relaxed">
                                        Real Estate Expert & Property Consultant
                                    </p>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 w-full ">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
                                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">{formData.years_of_experience}+ Years</div>
                                    <div className="text-white/80 text-sm">Experience</div>
                                </div>

                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
                                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">{formData.total_business_deals}</div>
                                    <div className="text-white/80 text-sm">Deals Closed</div>
                                </div>

                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
                                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">{formData.rank_top_performing}</div>
                                    <div className="text-white/80 text-sm">Top Performer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="container mx-auto px-6 py-12 -mt-8 relative z-10">
                    <div className="max-w-6xl mx-auto">

                        {/* Page Title */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
                                <Edit3 className="w-5 h-5" />
                                Edit Your Profile
                                <Sparkles className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="space-y-8">

                            {/* Language Tabs */}
                            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <div className="bg-white/20 rounded-lg p-2">
                                            <User className="w-5 h-5" />
                                        </div>
                                        Profile Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <Tabs defaultValue="english" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3 mb-8">
                                            <TabsTrigger value="english" className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                English
                                            </TabsTrigger>
                                            <TabsTrigger value="farsi" className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                فارسی
                                            </TabsTrigger>
                                            <TabsTrigger value="arabic" className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                العربية
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* English Tab */}
                                        <TabsContent value="english" className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                        Full Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className="h-12 border-2 border-purple-100 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                        Username
                                                    </Label>
                                                    <Input
                                                        id="username"
                                                        value={formData.username}
                                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                                        className="h-12  border-purple-100 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                                    rows={5}
                                                    className="border-2 border-purple-100 focus:border-purple-400 focus:ring-purple-400 resize-none rounded-xl"
                                                />
                                            </div>
                                        </TabsContent>

                                        {/* Farsi Tab */}
                                        <TabsContent value="farsi" className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <Label htmlFor="fa_name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                        نام کامل
                                                    </Label>
                                                    <Input
                                                        id="fa_name"
                                                        value={formData.fa_name}
                                                        onChange={(e) => handleInputChange('fa_name', e.target.value)}
                                                        className="h-12 border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl text-right"
                                                        dir="rtl"
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="fa_username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                        نام کاربری
                                                    </Label>
                                                    <Input
                                                        id="fa_username"
                                                        value={formData.fa_username}
                                                        onChange={(e) => handleInputChange('fa_username', e.target.value)}
                                                        className="h-12 border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl text-right"
                                                        dir="rtl"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="fa_description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                    توضیحات
                                                </Label>
                                                <Textarea
                                                    id="fa_description"
                                                    value={formData.fa_description}
                                                    onChange={(e) => handleInputChange('fa_description', e.target.value)}
                                                    rows={5}
                                                    className="border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 resize-none text-right rounded-xl"
                                                    dir="rtl"
                                                />
                                            </div>
                                        </TabsContent>

                                        {/* Arabic Tab */}
                                        <TabsContent value="arabic" className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <Label htmlFor="ar_name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        الاسم الكامل
                                                    </Label>
                                                    <Input
                                                        id="ar_name"
                                                        value={formData.ar_name}
                                                        onChange={(e) => handleInputChange('ar_name', e.target.value)}
                                                        className="h-12 border-2 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl text-right"
                                                        dir="rtl"
                                                    />
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="ar_username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        اسم المستخدم
                                                    </Label>
                                                    <Input
                                                        id="ar_username"
                                                        value={formData.ar_username}
                                                        onChange={(e) => handleInputChange('ar_username', e.target.value)}
                                                        className="h-12 border-2 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl text-right"
                                                        dir="rtl"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="ar_description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                    الوصف
                                                </Label>
                                                <Textarea
                                                    id="ar_description"
                                                    value={formData.ar_description}
                                                    onChange={(e) => handleInputChange('ar_description', e.target.value)}
                                                    rows={5}
                                                    className="border-2 border-indigo-100 focus:border-indigo-400 focus:ring-indigo-400 resize-none text-right rounded-xl"
                                                    dir="rtl"
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Other Form Sections */}
                            <div className="grid lg:grid-cols-1 gap-8">

                                {/* Contact Information */}
                                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                                        <CardTitle className="flex items-center gap-3 text-xl">
                                            <div className="bg-white/20 rounded-lg p-2">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            Contact Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <Mail className="w-4 h-4" />
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="h-12 border-2 border-purple-100 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    <Phone className="w-4 h-4" />
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    value={formData.phone_number}
                                                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                                    className="h-12 border-2 border-purple-100 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="whatsapp" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    <MessageCircle className="w-4 h-4" />
                                                    WhatsApp Number
                                                </Label>
                                                <Input
                                                    id="whatsapp"
                                                    value={formData.whatsapp_number}
                                                    onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                                                    className="h-12 border-2 border-purple-100 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            {/* Media & Professional Statistics */}
                            <div className='grid lg:grid-cols-2 gap-8'>
                                {/* Media & Content Card */}
                                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                                        <CardTitle className="flex items-center gap-3 text-xl">
                                            <div className="bg-white/20 rounded-lg p-2">
                                                <Play className="w-5 h-5" />
                                            </div>
                                            Media & Content
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        {/* Profile Image URL */}
                                        <div className="space-y-3">
                                            <Label htmlFor="profile_image" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                Profile Image URL
                                            </Label>
                                            <Input
                                                id="profile_image"
                                                value={formData.profile_image_url}
                                                onChange={(e) => handleInputChange('profile_image_url', e.target.value)}
                                                className="h-12 border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl"
                                            />
                                        </div>

                                        {/* Introduction Video URL */}
                                        <div className="space-y-3">
                                            <Label htmlFor="video_url" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                Introduction Video URL
                                            </Label>
                                            <Input
                                                id="video_url"
                                                value={formData.introduction_video_url}
                                                onChange={(e) => handleInputChange('introduction_video_url', e.target.value)}
                                                className="h-12 border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl"
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div className="space-y-3">
                                            <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                Gender
                                            </Label>
                                            <Input
                                                id="gender"
                                                value={formData.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className="h-12 border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Professional Statistics Card */}
                                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                                        <CardTitle className="flex items-center gap-3 text-xl">
                                            <div className="bg-white/20 rounded-lg p-2">
                                                <Trophy className="w-5 h-5" />
                                            </div>
                                            Professional Statistics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        {/* Years of Experience */}
                                        <div className="space-y-3">
                                            <Label htmlFor="experience" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                Years of Experience
                                            </Label>
                                            <Input
                                                type='number'
                                                value={formData.years_of_experience}
                                                onChange={(e) => handleInputChange("years_of_experience", e.target.value)}
                                            />
                                        </div>

                                        {/* Total Business Deals */}
                                        <div className="space-y-3">
                                            <Label htmlFor="deals" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                Total Business Deals
                                            </Label>
                                            <select
                                                id="deals"
                                                value={formData.total_business_deals}
                                                onChange={(e) => handleInputChange('total_business_deals', e.target.value)}
                                                className="h-12 w-full border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl px-4 text-gray-700"
                                            >
                                                <option value={formData.total_business_deals}>{formData.total_business_deals}</option>
                                                {Array.from({ length: 20 }, (_, i) => {
                                                    const val = 50 * (i + 1); // 50, 100, ..., 1000
                                                    return (
                                                        <option key={val} value={val}>
                                                            {val}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        {/* Rank */}
                                        {/* <div className="space-y-3">
                                            <Label htmlFor="rank" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                Top Performing Rank
                                            </Label>
                                            <Input
                                                id="rank"
                                                value={formData.rank_top_performing}
                                                onChange={(e) => handleInputChange('rank_top_performing', e.target.value)}
                                                className="h-12 border-2 border-pink-100 focus:border-pink-400 focus:ring-pink-400 rounded-xl"
                                            />
                                        </div> */}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center pt-12">
                                <Button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:via-purple-600 hover:to-pink-500 text-white px-20 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                                >
                                    <Save className="w-6 h-6 ml-3" />
                                    Save All Changes
                                    <Sparkles className="w-6 h-6 mr-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentEdit

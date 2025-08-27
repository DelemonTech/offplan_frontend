
import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from "@/i18n";

export type Language = 'en' | 'ar' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.exclusive': 'Exclusive',
    'nav.latest': 'Latest',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blogs': 'Blogs',
    'nav.language': 'Language',
    
    // Hero Section
    'hero.title': 'Find Your Dream Off-Plan Property in Dubai',
    'hero.subtitle': 'Discover exclusive pre-construction properties with guaranteed ROI and flexible payment plans',
    'hero.cta': 'Start Your Search',
    'hero.features.roi': '15% Average ROI',
    'hero.features.payment': 'Flexible Payment Plans',
    'hero.features.exclusive': 'Exclusive Listings',
    
    // Agent Profile
    'agent.name': 'Sahar Kalhor',
    'agent.title': 'Your Trusted Off-Plan Expert',
    'agent.deals': '150+ Deals',
    'agent.experience': '6+ Years',
    'agent.description': 'Your trusted advisor in Dubai\'s off-plan market with deep industry knowledge and a passion for matching clients with perfect investment opportunities.',
    'agent.quote': 'Let me help you find your perfect investment today.',
    'agent.contact.title': 'Get in Touch',
    'agent.contact.call': 'Call Now',
    'agent.contact.whatsapp': 'WhatsApp',
    'agent.contact.email': 'Email Inquiry',
    'agent.stats.projects': 'Projects Sold',
    'agent.stats.clients': 'Happy Clients',
    'agent.stats.years': 'Years Experience',
    
    // Search Section
    'search.title': '🔍 Still searching? Use the filters below to find your dream property',
    'search.subtitle': 'Search with more precision below — we\'re here to help you every step of the way.',
    'search.smart': 'Smart filters powered by AI',
    'search.roi': 'Find the best ROI instantly',
    'search.filters.location': 'Location',
    'search.filters.price': 'Price Range',
    'search.filters.bedrooms': 'Bedrooms',
    'search.filters.completion': 'Completion Date',
    'search.filters.developer': 'Developer',
    'search.filters.amenities': 'Amenities',
    'search.button': 'Search Properties',
    'search.reset': 'Reset Filters',
    
    // Projects & Properties
    'projects.title': 'Featured Off-Plan Projects',
    'projects.subtitle': 'Discover premium developments with exceptional investment potential',
    'projects.starting.from': 'Starting from',
    'projects.roi': 'ROI',
    'projects.completion': 'Completion',
    'projects.payment.plan': 'Payment Plan',
    'projects.view.details': 'View Details',
    'projects.book.appointment': 'Book Appointment',
    'projects.sold.out': 'Sold Out',
    'projects.available.units': 'Available Units',
    'projects.new.launch': 'New Launch',
    'projects.limited.units': 'Limited Units Available',
    
    // Property Details
    'property.bedrooms': 'Bedrooms',
    'property.bathrooms': 'Bathrooms',
    'property.area': 'Total Area',
    'property.parking': 'Parking Spaces',
    'property.floor': 'Floor',
    'property.view': 'View',
    'property.furnished': 'Furnished',
    'property.balcony': 'Balcony',
    'property.sqft': 'sq ft',
    'property.price.per.sqft': 'Price per sq ft',
    
    // Forms & Contact
    'form.name': 'Full Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.message': 'Your Message',
    'form.submit': 'Send Message',
    'form.required': 'Required field',
    'form.success': 'Message sent successfully!',
    'form.error': 'Please fill in all required fields',
    'form.newsletter': 'Subscribe to newsletter',
    'form.privacy': 'I agree to the privacy policy',
    'form.updates': 'I agree to receive updates about new properties',
    
    // Call to Action
    'cta.title': 'Don\'t Miss Dubai\'s Hottest Off-Plan Opportunities',
    'cta.subtitle': 'Properties are selling 40% faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market.',
    'cta.button.primary': 'Chat with AI Now',
    'cta.button.secondary': 'Get Expert Call',
    'cta.features.commission': '0% Commission on Select Properties',
    'cta.features.support': '24/7 AI Assistant Support',
    'cta.features.roi': '15% Average ROI Guaranteed',
    'cta.trust.online': 'investors online now',
    'cta.trust.fees': 'No hidden fees',
    'cta.trust.alerts': 'Instant property alerts',
    
    // Footer
    'footer.tagline': 'Your trusted off-plan property partner',
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.locations': 'Locations',
    'footer.contact': 'Contact Information',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Common UI Elements
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'close': 'Close',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'show.more': 'Show More',
    'show.less': 'Show Less',
    'read.more': 'Read More',
    'learn.more': 'Learn More',
    'get.started': 'Get Started',
    'book.now': 'Book Now',
    'call.now': 'Call Now',
    'download': 'Download',
    'share': 'Share',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete',
    'add': 'Add',
    'remove': 'Remove',
    'update': 'Update',
    
    // Error Messages
    'error.404': 'Page not found',
    'error.500': 'Internal server error',
    'error.network': 'Network error',
    'error.try.again': 'Please try again',
    'error.contact.support': 'Contact support if the problem persists',
    
    // Empty States
    'empty.projects': 'No projects found',
    'empty.search': 'No results found for your search',
    'empty.filters': 'Try adjusting your filters',
  },
  ar: {
    // Header & Navigation
    'nav.home': 'الرئيسية',
    'nav.exclusive': 'حصريات',
    'nav.latest': 'الأحدث',
    'nav.about': 'حولنا',
    'nav.contact': 'اتصل بنا',
    'nav.blogs': 'المدونة',
    'nav.language': 'اللغة',
    
    // Hero Section
    'hero.title': 'اعثر على عقارك المثالي قيد الإنشاء في دبي',
    'hero.subtitle': 'اكتشف عقارات حصرية قيد الإنشاء مع عائد استثمار مضمون وخطط دفع مرنة',
    'hero.cta': 'ابدأ البحث',
    'hero.features.roi': 'متوسط عائد ١٥٪',
    'hero.features.payment': 'خطط دفع مرنة',
    'hero.features.exclusive': 'قوائم حصرية',
    
    // Agent Profile
    'agent.name': 'سحر كلهور',
    'agent.title': 'خبيرتك الموثوقة في العقارات قيد الإنشاء',
    'agent.deals': '١٥٠+ صفقة',
    'agent.experience': '٦+ سنوات',
    'agent.description': 'مستشارتك الموثوقة في سوق دبي للعقارات قيد الإنشاء مع معرفة عميقة بالصناعة وشغف لمطابقة العملاء مع الفرص الاستثمارية المثالية.',
    'agent.quote': 'دعيني أساعدك في العثور على استثمارك المثالي اليوم.',
    'agent.contact.title': 'تواصل معنا',
    'agent.contact.call': 'اتصل الآن',
    'agent.contact.whatsapp': 'واتساب',
    'agent.contact.email': 'استفسار بالبريد',
    'agent.stats.projects': 'مشاريع مبيعة',
    'agent.stats.clients': 'عملاء راضون',
    'agent.stats.years': 'سنوات خبرة',
    
    // Search Section
    'search.title': '🔍 ما زلت تبحث؟ استخدم المرشحات أدناه للعثور على عقارك المثالي',
    'search.subtitle': 'ابحث بدقة أكبر أدناه — نحن هنا لمساعدتك في كل خطوة.',
    'search.smart': 'مرشحات ذكية مدعومة بالذكاء الاصطناعي',
    'search.roi': 'اعثر على أفضل عائد استثمار فوراً',
    'search.filters.location': 'الموقع',
    'search.filters.price': 'نطاق السعر',
    'search.filters.bedrooms': 'غرف النوم',
    'search.filters.completion': 'تاريخ الإنجاز',
    'search.filters.developer': 'المطور',
    'search.filters.amenities': 'المرافق',
    'search.button': 'البحث عن عقارات',
    'search.reset': 'إعادة تعيين المرشحات',
    
    // Projects & Properties
    'projects.title': 'مشاريع مميزة قيد الإنشاء',
    'projects.subtitle': 'اكتشف تطويرات متميزة مع إمكانيات استثمارية استثنائية',
    'projects.starting.from': 'يبدأ من',
    'projects.roi': 'عائد الاستثمار',
    'projects.completion': 'الإنجاز',
    'projects.payment.plan': 'خطة الدفع',
    'projects.view.details': 'عرض التفاصيل',
    'projects.book.appointment': 'حجز موعد',
    'projects.sold.out': 'نفذت الكمية',
    'projects.available.units': 'وحدات متاحة',
    'projects.new.launch': 'إطلاق جديد',
    'projects.limited.units': 'وحدات محدودة متاحة',
    
    // Property Details
    'property.bedrooms': 'غرف النوم',
    'property.bathrooms': 'دورات المياه',
    'property.area': 'المساحة الإجمالية',
    'property.parking': 'مواقف السيارات',
    'property.floor': 'الطابق',
    'property.view': 'الإطلالة',
    'property.furnished': 'مفروش',
    'property.balcony': 'الشرفة',
    'property.sqft': 'قدم مربع',
    'property.price.per.sqft': 'السعر للقدم المربع',
    
    // Forms & Contact
    'form.name': 'الاسم الكامل',
    'form.email': 'عنوان البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.message': 'رسالتك',
    'form.submit': 'إرسال الرسالة',
    'form.required': 'حقل مطلوب',
    'form.success': 'تم إرسال الرسالة بنجاح!',
    'form.error': 'يرجى ملء جميع الحقول المطلوبة',
    'form.newsletter': 'الاشتراك في النشرة الإخبارية',
    'form.privacy': 'أوافق على سياسة الخصوصية',
    'form.updates': 'أوافق على تلقي تحديثات حول العقارات الجديدة',
    
    // Call to Action
    'cta.title': 'لا تفوت أهم الفرص العقارية قيد الإنشاء في دبي',
    'cta.subtitle': 'العقارات تباع بسرعة ٤٠٪ أكثر من العام الماضي. احصل على وصول حصري لمشاريع ما قبل الإطلاق بأسعار مبكرة قبل طرحها في السوق.',
    'cta.button.primary': 'تحدث مع الذكاء الاصطناعي الآن',
    'cta.button.secondary': 'احصل على مكالمة خبير',
    'cta.features.commission': '٠٪ عمولة على عقارات مختارة',
    'cta.features.support': 'دعم مساعد ذكي ٢٤/٧',
    'cta.features.roi': '١٥٪ متوسط عائد مضمون',
    'cta.trust.online': 'مستثمر متصل الآن',
    'cta.trust.fees': 'لا توجد رسوم خفية',
    'cta.trust.alerts': 'تنبيهات عقارية فورية',
    
    // Footer
    'footer.tagline': 'شريكك الموثوق في العقارات قيد الإنشاء',
    'footer.company': 'الشركة',
    'footer.services': 'الخدمات',
    'footer.locations': 'المواقع',
    'footer.contact': 'معلومات الاتصال',
    'footer.follow': 'تابعنا',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    
    // Common UI Elements
    'loading': 'جارٍ التحميل...',
    'error': 'خطأ',
    'success': 'نجح',
    'cancel': 'إلغاء',
    'confirm': 'تأكيد',
    'close': 'إغلاق',
    'back': 'رجوع',
    'next': 'التالي',
    'previous': 'السابق',
    'show.more': 'عرض المزيد',
    'show.less': 'عرض أقل',
    'read.more': 'اقرأ المزيد',
    'learn.more': 'تعلم المزيد',
    'get.started': 'ابدأ',
    'book.now': 'احجز الآن',
    'call.now': 'اتصل الآن',
    'download': 'تحميل',
    'share': 'مشاركة',
    'save': 'حفظ',
    'edit': 'تعديل',
    'delete': 'حذف',
    'add': 'إضافة',
    'remove': 'إزالة',
    'update': 'تحديث',
    
    // Error Messages
    'error.404': 'الصفحة غير موجودة',
    'error.500': 'خطأ في الخادم الداخلي',
    'error.network': 'خطأ في الشبكة',
    'error.try.again': 'يرجى المحاولة مرة أخرى',
    'error.contact.support': 'اتصل بالدعم إذا استمرت المشكلة',
    
    // Empty States
    'empty.projects': 'لم يتم العثور على مشاريع',
    'empty.search': 'لم يتم العثور على نتائج لبحثك',
    'empty.filters': 'حاول تعديل المرشحات الخاصة بك',
  },
  fa: {
    // Header & Navigation
    'nav.home': 'خانه',
    'nav.exclusive': 'انحصاری',
    'nav.latest': 'جدیدترین',
    'nav.about': 'درباره ما',
    'nav.contact': 'تماس با ما',
    'nav.blogs': 'وبلاگ',
    'nav.language': 'زبان',
    
    // Hero Section
    'hero.title': 'ملک رویایی خود را در طرح‌های پیش‌ساخت دبی پیدا کنید',
    'hero.subtitle': 'املاک انحصاری پیش‌ساخت با بازدهی تضمینی و طرح‌های پرداخت انعطاف‌پذیر را کشف کنید',
    'hero.cta': 'شروع جستجو',
    'hero.features.roi': 'میانگین بازدهی ۱۵٪',
    'hero.features.payment': 'طرح‌های پرداخت انعطاف‌پذیر',
    'hero.features.exclusive': 'لیست‌های انحصاری',
    
    // Agent Profile
    'agent.name': 'سحر کلهر',
    'agent.title': 'کارشناس مورد اعتماد پروژه‌های پیش‌ساخت',
    'agent.deals': '۱۵۰+ معامله',
    'agent.experience': '۶+ سال',
    'agent.description': 'مشاور مورد اعتماد شما در بازار پروژه‌های پیش‌ساخت دبی با دانش عمیق صنعت و علاقه به تطبیق مشتریان با فرصت‌های سرمایه‌گذاری مناسب.',
    'agent.quote': 'اجازه دهید امروز به شما کمک کنم تا سرمایه‌گذاری مناسب خود را پیدا کنید.',
    'agent.contact.title': 'تماس بگیرید',
    'agent.contact.call': 'تماس فوری',
    'agent.contact.whatsapp': 'واتساپ',
    'agent.contact.email': 'استعلام ایمیل',
    'agent.stats.projects': 'پروژه‌های فروخته شده',
    'agent.stats.clients': 'مشتریان راضی',
    'agent.stats.years': 'سال تجربه',
    
    // Search Section
    'search.title': '🔍 هنوز در جستجو هستید؟ از فیلترهای زیر برای یافتن ملک رویایی خود استفاده کنید',
    'search.subtitle': 'با دقت بیشتری در زیر جستجو کنید — ما اینجا هستیم تا در هر مرحله به شما کمک کنیم.',
    'search.smart': 'فیلترهای هوشمند با قدرت هوش مصنوعی',
    'search.roi': 'بهترین بازدهی را فوراً پیدا کنید',
    'search.filters.location': 'موقعیت',
    'search.filters.price': 'محدوده قیمت',
    'search.filters.bedrooms': 'اتاق خواب',
    'search.filters.completion': 'تاریخ تکمیل',
    'search.filters.developer': 'سازنده',
    'search.filters.amenities': 'امکانات',
    'search.button': 'جستجوی املاک',
    'search.reset': 'بازنشانی فیلترها',
    
    // Projects & Properties
    'projects.title': 'پروژه‌های برجسته پیش‌ساخت',
    'projects.subtitle': 'توسعه‌های پریمیوم با پتانسیل سرمایه‌گذاری استثنایی را کشف کنید',
    'projects.starting.from': 'شروع از',
    'projects.roi': 'بازدهی سرمایه',
    'projects.completion': 'تکمیل',
    'projects.payment.plan': 'طرح پرداخت',
    'projects.view.details': 'مشاهده جزئیات',
    'projects.book.appointment': 'رزرو قرار',
    'projects.sold.out': 'تمام شده',
    'projects.available.units': 'واحدهای موجود',
    'projects.new.launch': 'راه‌اندازی جدید',
    'projects.limited.units': 'واحدهای محدود موجود',
    
    // Property Details
    'property.bedrooms': 'اتاق خواب',
    'property.bathrooms': 'سرویس بهداشتی',
    'property.area': 'مساحت کل',
    'property.parking': 'پارکینگ',
    'property.floor': 'طبقه',
    'property.view': 'نما',
    'property.furnished': 'مبله',
    'property.balcony': 'بالکن',
    'property.sqft': 'فوت مربع',
    'property.price.per.sqft': 'قیمت به فوت مربع',
    
    // Forms & Contact
    'form.name': 'نام کامل',
    'form.email': 'آدرس ایمیل',
    'form.phone': 'شماره تلفن',
    'form.message': 'پیام شما',
    'form.submit': 'ارسال پیام',
    'form.required': 'فیلد اجباری',
    'form.success': 'پیام با موفقیت ارسال شد!',
    'form.error': 'لطفاً تمام فیلدهای اجباری را پر کنید',
    'form.newsletter': 'عضویت در خبرنامه',
    'form.privacy': 'با سیاست حریم خصوصی موافقم',
    'form.updates': 'موافقم اطلاعات املاک جدید را دریافت کنم',
    
    // Call to Action
    'cta.title': 'داغ‌ترین فرصت‌های پیش‌ساخت دبی را از دست ندهید',
    'cta.subtitle': 'املاک ۴۰٪ سریع‌تر از سال گذشته فروخته می‌شوند. دسترسی انحصاری به پروژه‌های پیش از راه‌اندازی با قیمت‌گذاری زودهنگام قبل از ورود به بازار را بدست آورید.',
    'cta.button.primary': 'همین حالا با هوش مصنوعی چت کنید',
    'cta.button.secondary': 'تماس با کارشناس',
    'cta.features.commission': '۰٪ کمیسیون برای املاک منتخب',
    'cta.features.support': 'پشتیبانی دستیار هوشمند ۲۴/۷',
    'cta.features.roi': '۱۵٪ میانگین بازدهی تضمینی',
    'cta.trust.online': 'سرمایه‌گذار آنلاین هم‌اکنون',
    'cta.trust.fees': 'بدون هزینه‌های پنهان',
    'cta.trust.alerts': 'هشدارهای فوری املاک',
    
    // Footer
    'footer.tagline': 'شریک مورد اعتماد شما در املاک پیش‌ساخت',
    'footer.company': 'شرکت',
    'footer.services': 'خدمات',
    'footer.locations': 'مکان‌ها',
    'footer.contact': 'اطلاعات تماس',
    'footer.follow': 'ما را دنبال کنید',
    'footer.rights': 'تمام حقوق محفوظ است',
    'footer.privacy': 'سیاست حریم خصوصی',
    'footer.terms': 'شرایط خدمات',
    
    // Common UI Elements
    'loading': 'در حال بارگیری...',
    'error': 'خطا',
    'success': 'موفقیت',
    'cancel': 'لغو',
    'confirm': 'تأیید',
    'close': 'بستن',
    'back': 'بازگشت',
    'next': 'بعدی',
    'previous': 'قبلی',
    'show.more': 'نمایش بیشتر',
    'show.less': 'نمایش کمتر',
    'read.more': 'ادامه مطلب',
    'learn.more': 'بیشتر بدانید',
    'get.started': 'شروع کنید',
    'book.now': 'همین حالا رزرو کنید',
    'call.now': 'همین حالا تماس بگیرید',
    'download': 'دانلود',
    'share': 'اشتراک‌گذاری',
    'save': 'ذخیره',
    'edit': 'ویرایش',
    'delete': 'حذف',
    'add': 'افزودن',
    'remove': 'حذف',
    'update': 'به‌روزرسانی',
    
    // Error Messages
    'error.404': 'صفحه یافت نشد',
    'error.500': 'خطای سرور داخلی',
    'error.network': 'خطای شبکه',
    'error.try.again': 'لطفاً دوباره تلاش کنید',
    'error.contact.support': 'در صورت ادامه مشکل با پشتیبانی تماس بگیرید',
    
    // Empty States
    'empty.projects': 'هیچ پروژه‌ای یافت نشد',
    'empty.search': 'نتیجه‌ای برای جستجوی شما یافت نشد',
    'empty.filters': 'فیلترهای خود را تنظیم کنید',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
  const storedLang = localStorage.getItem("i18nextLng");
  // normalize (convert en-US → en, ar-SA → ar, etc.)
  const normalizedLang = storedLang ? storedLang.split("-")[0] : null;

  const initialLang: Language = (normalizedLang as Language) || "en";

  setLanguageState(initialLang);
  i18n.changeLanguage(initialLang);
  document.dir = initialLang === "ar" || initialLang === "fa" ? "rtl" : "ltr";
}, []);


  const setLanguage = (lang: Language) => {
    localStorage.setItem("i18nextLng", lang);
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    document.dir = lang === 'ar' || lang === 'fa' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar' || language === 'fa';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'} data-lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

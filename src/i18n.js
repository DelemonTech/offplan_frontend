import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  // English Translation

  // // Farsi Translation

  // // Arabic Translation

  fa: {
    translation: {
      "Home": "خانه",
      "Exclusive": "انحصاری",
      "Request": "درخواست",
      "Latest": "جدیدترین",
      "About": "درباره",
      "Contact": "تماس",
      "Cancel": "لغو",
      "Payment Plan": "طرح پرداخت",
      "No Floor Plan Image": "تصویری از نقشه طبقه موجود نیست",
      "Name": "نام",
      "Blog": "وبلاگ",
      "sqft": "فوت مربع",
      "price_not_available": "قیمت در دسترس نیست",
      "Enter your full name": "نام کامل خود را وارد کنید",
      "Enter your email": "ایمیل خود را وارد کنید",
      "Bedroom Apartment": "آپارتمان یک‌خوابه",
      "Chat on WhatsApp": "گفتگو در واتساپ",
      "Studio": "استودیو",
      "Loading property details...": "در حال بارگذاری جزئیات ملک...",
      "Bedroom": "خوابه",
      "Enter your details to get the full payment plan details.": "اطلاعات خود را وارد کنید تا جزئیات کامل طرح پرداخت را دریافت کنید",
      "Payment Plan": "طرح پرداخت",
      "Project Gallery": "گالری پروژه",
      "Send Payment Plan": "ارسال طرح پرداخت",
      "Careers": "فرصت‌های شغلی",
      "Apartment": "آپارتمان",
      "Available Units": "واحد موجود",
      "Floor Plan": "نقشه طبقه",
      "Starting from": "شروع از",
      "View Units": "مشاهده واحدها",
      "fromArea": "از {{area}} فوت مربع",
      "FAQs": "سؤالات متداول",
      "Privacy Policy": "سیاست حفظ حریم خصوصی",
      "Terms of Service": "شرایط خدمات",
      "Chat with AI": "گفتگو با هوش مصنوعی",
      "Help Center": "مرکز راهنما",
      "Contact Support": "تماس با پشتیبانی",
      "Apartments in Dubai Marina":"آپارتمان‌ها در دبی مارینا",
      "Villas in JVC": "ویلاها در JVC",
      "Offices in Business Bay":"دفاتر در بیزینس بی",
      "Shops in Downtown":"فروشگاه‌ها در داون‌تاون",
      "Penthouses in DIFC":"پنت‌هاوس‌ها در DIFC",
      "Townhouses in Dubailand":"تاون‌هاوس‌ها در دبی‌لند",
      "Warehouses in Jebel Ali":"انبارها در جبل علی",
      "Retail in The Springs":"انبارها در جبل علی",
      "About Us": "درباره ما",
      "Sahar Kalhor": "سحر کلهر",
      "No Floor Plan Available": "هیچ نقشه‌ طبقه‌ای در دسترس نیست",
      "Off-Plan & Ready Property Expert | Dubai & UAE": "متخصص املاک آماده و پیش فروش | دبی و امارات",
      "UAE's premier off-plan property platform. Trusted for transparency, smart search & expert support.": "برترین پلتفرم املاک پیش‌فروش در امارات. قابل اعتماد برای شفافیت، جستجوی هوشمند و پشتیبانی تخصصی.",
      "Helping you find the right ready and off-plan properties in Dubai, Abu Dhabi, and across the UAE.": "کمک به شما برای یافتن املاک آماده و پیش فروش مناسب در دبی، ابوظبی و سراسر امارات",
      "Explore Projects": "مشاهده پروژه‌ها",
      "Chat with Sahar Kalhor": "گفتگو با سحر کلهر",
      "Fairmont Dubai Skyline": "افق دبی فیرمونت",
      "ID": "شناسه",
      "7th floor, Al Amiri Tower, Barsha Heights, Tecom, UAE":"طبقه هفتم، برج الامیری، برشا هایتس، تیکام، امارات متحده عربی",
      "Unit Price & Payment Plan": "قیمت واحد و برنامه پرداخت",
      "Floor": "طبقه",
      "Size": "اندازه",
      "Coming Soon": "به زودی",
      "No units available in this category": "هیچ واحدی در این دسته موجود نیست",
      "Write your short comment... (optional)": "نظر کوتاه خود را بنویسید... (اختیاری)",
      "View Details": "مشاهده جزئیات",
      "Hide Units": "مخفی کردن واحدها",
      "View Units": "مشاهده واحدها",
      "Starting from": "شروع از",
      "Available": "موجود",
      "units_available": "واحد موجود",
      "DLD Verified": "تأیید شده توسط DLD",
      "Deals Closed": "معاملات انجام شده",
      "Years of Experience": "سال تجربه",
      "area_not_available": "منطقه در دسترس نیست",
      "Guaranteed ROI Contract": "قرارداد بازده تضمین‌شده سرمایه‌گذاری",
      "Waldorf Astoria Residence": "اقامتگاه والدورف آستوریا",
      "exclusive_property": "این ملک انحصاری را در {{title}} کاوش کنید",
      "left": "باقی‌مانده",
      "deliveryBy": "تحویل تا {{date}}",
      "Ready to Make This Your Home?": "آیا آماده‌اید اینجا را خانه خود کنید؟",

      "overview": "بررسی اجمالی",
      "3_bedroom_apartment": "آپارتمان ۳ خوابه",
      "area": "متراژ",
      "1836_sqft": "۱۸۳۶ فوت مربع",
      "handover": "تحویل",
      "handover_date": "سه‌ماهه چهارم ۲۰۲۴",
      "payment_plan": "برنامه پرداخت",
      "payment_plan_value": "۲۰٪",
      "childrens_play_area": "محل بازی کودکان",
      "available": "در دسترس",
      "swimming_pool": "استخر شنا",

      "Your Next Home Starts Here": "خانه بعدی شما از اینجا شروع می‌شود",
      "rateConsultation": "مشاورهٔ {{name}} را چگونه ارزیابی می‌کنید؟",
      "Your Next Home": "خانه بعدی شما",
      "Starts Here": "از اینجا شروع می‌شود",
      "Chat with": "گفتگو با",
      "Buy Ready & Offplan Properties in Dubai, Abu Dhabi, and Across the UAE Curated for Smart Investors": "خرید املاک آماده و پیش فروش در دبی، ابوظبی و سراسر امارات منتخب برای سرمایه‌گذاران هوشمند",
      "Buy Ready & Offplan Properties": "خرید املاک آماده و پیش‌فروش",
      "in Dubai, Abu Dhabi, and Across the UAE": "در دبی، ابوظبی و سراسر امارات",
      "Curated for Smart Investors.": "منتخب برای سرمایه‌گذاران هوشمند.",
      "Contact {{name}} today for exclusive access and personalized assistance": "امروز با {{name}} تماس بگیرید تا به دسترسی انحصاری و پشتیبانی شخصی‌سازی شده دست یابید",
      "4.9 out of 5": "4.9 از 5",
      "Don't Miss UAE's": "فرص امارات را از دست ندهید",
      "Hottest": "داغ‌ترین",
      "units_left_9plus": "بیش از ۹ واحد باقی‌مانده",
      "units_left": "{{count}} واحد باقی‌مانده",
      "units_left_plural": "{{count}} واحد باقی‌مانده",
      "Off-Plan Opportunities": "پروژه‌های پیش‌فروش",
      "Properties are selling 40% faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market.": "املاک ۴۰٪ سریع‌تر از سال گذشته در حال فروش هستند. به پروژه‌های پیش‌فروش با قیمت‌های ویژه قبل از عرضه در بازار دسترسی انحصاری داشته باشید.",
      "Haven’t found the right Offplan or Ready property yet?": "هنوز ملک آماده یا پیش‌فروش مناسب را پیدا نکرده‌اید؟",
      "Don’t worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond.": "نگران نباشید — فقط از نوار جستجو برای کشف بهترین فرصت‌های سرمایه‌گذاری در دبی، ابوظبی و فراتر استفاده کنید.",
      "How would you rate {{name}}'s consultation?": "چطور مشاوره {{name}} را ارزیابی می‌کنید؟",
      "Share your experience with others": "تجربه خود را با دیگران به اشتراک بگذارید",
      "All": "همه",
      "Ready": "آماده",
      "Off Plan": "پیش فروش",
      "Dubai": "دبی",
      "Abu Dhabi": "ابوظبی",
      "Ajman": "عجمان",
      "Sharjah": "شارجه",
      "Ras Al Khaimah": "رأس الخیمه",
      "unit left": "واحد باقی مانده",
      "units left": "واحد باقی مانده",
      "Edge Hotel by Rotana (Navitas)": "هتل Edge بای روتانا (Navitas)",
      "Payment": "پرداخت",
      "Starting from": "شروع از",
      "AlKifaf": "الکفاف",
      "From": "از",
      "ft²": "فوت مربع",
      "See Availability": "مشاهده موجودی",
      "Rukan Tower": "برج روکان",
      "Rukan Community": "جامعه روکان",
      "October": "اکتبر",
      "Binghatti Tulip": "بینقتی تولیپ",
      "JVC": "JVC",
      "December": "دسامبر",
      "Binghatti Azure": "بینقتی آژور",
      "January": "ژانویه",
      "Binghatti Phoenix": "بینقتی فونیکس",
      "February": "فوریه",
      "Binghatti Dusk": "بینقتی غروب",
      "Rokane G24": "روکان G24",
      "The Sterling": "استرلینگ",
      "Business Bay": "خلیج تجاری",
      "June": "ژوئن",
      "The Pad": "پد",
      "So Uptown Dubai": "سو آپ تاون دبی",
      "Uptown, AlThanyah Fifth": "آپ تاون، الثنیه پنجم",
      "Rokane G25": "روکان G25",
      "September": "سپتامبر",
      "Raffles": "رافلز",
      "Palm Jumeirah": "پالم جمیرا",
      "May": "می",
      "Opus By Zaha Hadid": "اپوس طراحی زها حدید",
      "Load More Properties": "بارگذاری املاک بیشتر",
      "Top Agent": "مشاور برتر",
      "Deals": "معاملات",
      "Years": "سال",
      "Rating": "امتیاز",
      "WhatsApp Now": "واتساپ اکنون",
      "Call Now": "تماس اکنون",
      "Your Trusted Off-Plan Expert": "متخصص مورد اعتماد پیش فروش شما",
      "out of": "از",
      "More than just an agent — Sahar is your trusted advisor in navigating": "بیش از یک مشاور ساده — سحر مشاور مورد اعتماد شما در راهنمایی",
      "See more": "بیشتر ببینید",
      "How would you rate Sahar Kalhor's consultation?": "مشاوره سحر کلهر را چگونه ارزیابی می‌کنید؟",
      "Share your experience with others": "تجربه خود را با دیگران به اشتراک بگذارید",
      "Submit Review": "ثبت نظر",
      "Book a Free Consultation": "رزرو مشاوره رایگان",
      "Get personalized property recommendations": "دریافت پیشنهادات شخصی‌سازی شده املاک",
      "Full Name": "نام کامل",
      "Email Address": "آدرس ایمیل",
      "WhatsApp Number": "شماره واتساپ",
      "Your Message": "پیام شما",
      "Submit Request": "ارسال درخواست",
      "Haven't found the right Offplan or Ready property yet?": "هنوز املاک پیش فروش یا آماده مناسب پیدا نکرده‌اید؟",
      "Don't worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond": "نگران نباشید — فقط از نوار جستجو برای کاوش بهترین فرصت‌های سرمایه‌گذاری در دبی، ابوظبی و فراتر از آن استفاده کنید",
      "City": "شهر",
      "Select city": "انتخاب شهر",
      "Neighborhood": "محله",
      "Select area": "انتخاب منطقه",
      "Property Type": "نوع ملک",
      "Residential": "مسکونی",
      "Commercial": "تجاری",
      "Residential Property Types": "انواع املاک مسکونی",
      "Apartment": "آپارتمان",
      "Villa": "ویلا",
      "Townhouse": "خانه شهری",
      "Penthouse": "پنت هاوس",
      "Bedrooms": "اتاق خواب",
      "Advanced Filters": "فیلترهای پیشرفته",
      "Reset Filters": "بازنشانی فیلترها",
      "Show Properties": "نمایش املاک",
      "Smart Navigation": "ناوبری هوشمند",
      "AI-powered search": "جستجوی مبتنی بر هوش مصنوعی",
      "Prime Locations": "مکان‌های برتر",
      "Best areas in Dubai": "بهترین مناطق دبی",
      "Urban Excellence": "تعالی شهری",
      "Premium developments": "توسعه‌های ممتاز",
      "Best ROI": "بهترین بازدهی سرمایه",
      "Find instant returns": "یافتن بازده فوری",
      "Limited Time Offer": "پیشنهاد محدود",
      "Don't Miss UAE's Hottest Off-Plan Opportunities": "فرصت‌های داغ پیش فروش امارات را از دست ندهید",
      "Properties are selling faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market": "املاک سریع‌تر از سال گذشته فروخته می‌شوند. دسترسی انحصاری به پروژه‌های پیش از راه‌اندازی با قیمت‌گذاری زودهنگام قبل از ورود به بازار",
      "Commission on Select Properties": "کمیسیون بر املاک منتخب",
      "AI Assistant Support": "پشتیبانی دستیار هوش مصنوعی",
      "Chat with AI Now": "اکنون با هوش مصنوعی گفتگو کنید",
      "investors online now": "سرمایه‌گذار آنلاین اکنون",
      "No hidden fees": "بدون هزینه‌های پنهان",
      "Instant property alerts": "هشدارهای فوری املاک",
      "Need help choosing? Chat with our AI — support!": "برای انتخاب کمک نیاز دارید؟ با هوش مصنوعی ما گفتگو کنید — پشتیبانی!",
      "Company": "شرکت",
      "Quick Links": "لینک‌های سریع",
      "Popular Properties": "املاک محبوب",
      "Contact Info": "اطلاعات تماس",
      "floor, Al Amiri Tower, Barsha Heights, Tecom, UAE": "طبقه، برج امیری، بارشا هایتس، تکام، امارات",
      "English": "انگلیسی",
      "Contact Us": "تماس با ما",
      "Stay Updated": "به‌روز بمانید",
      "Get the latest off-plan property updates and market insights": "آخرین به‌روزرسانی‌های املاک پیش فروش و بینش‌های بازار را دریافت کنید",
      "Subscribe": "اشتراک",
      "Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved": "Offplan.Market | پلتفرم هوشمند املاک پیش فروش امارات | تمام حقوق محفوظ است",
      "Back to Top": "بازگشت به بالا",
      "Last inquiry received": "آخرین درخواست دریافت‌شده",
      "Last down payment confirmed": "آخرین پیش‌پرداخت تأیید شد",
      "Last offer negotiated": "آخرین پیشنهاد مذاکره شد",
      "Last viewed": "آخرین بازدید",
      "Last unit sold": "آخرین واحد فروخته شد",
      "minutes ago": "دقیقه پیش",
      "hours ago": "ساعت پیش",
      "Azizi Farhad Creek Views 1": "عزیزی فرهاد - ویوهای خور ۱",
      "Located in prime community of {{district}}, {{city}}": "واقع در جامعه‌ای ممتاز در {{district}}، {{city}}",
      "Expected handover by {{handover}}": "تحویل مورد انتظار تا {{handover}}",
      "Flexible payment plan with only": "طرح پرداخت انعطاف‌پذیر فقط با",
      "down payment": "پیش‌پرداخت",
      "Unique": "منحصر به فرد",
      "onsite": "در محل",
      "During construction": "در حین ساخت",
      "2 years after delivery": "دو سال پس از تحویل",
      "DLD Fees": "هزینه‌های دایره زمین و املاک",
      "On Delivery": "هنگام تحویل",
      "Within 34 months Post Delivery": "ظرف ۳۴ ماه پس از تحویل",
      "Booking and 1st payment": "رزرو و اولین پرداخت",
      "1st Installment": "قسط اول",
      "2nd Installment": "قسط دوم",
      "3rd Installment": "قسط سوم",
      "4th Installment": "قسط چهارم",
      "5th Installment": "قسط پنجم",
      "6th Installment": "قسط ششم",
      "7th Installment": "قسط هفتم",
      "8th Installment": "قسط هشتم",
      "9th Installment": "قسط نهم",
      "1st Instalment": "قسط اول",
      "2nd Instalment": "قسط دوم",
      "3rd Instalment": "قسط سوم",
      "4th Instalment": "قسط چهارم",
      "5th Instalment": "قسط پنجم",
      "6th Instalment": "قسط ششم",
      "7th Instalment": "قسط هفتم",
      "8th Instalment": "قسط هشتم",
      "9th Instalment": "قسط نهم",
      "Advanced Filters": "فیلترهای پیشرفته",
      "Project Name": "نام پروژه",
      "Enter project name": "نام پروژه را وارد کنید",
      "Developer": "توسعه‌دهنده",
      "Select developer": "توسعه‌دهنده را انتخاب کنید",
      "Property Status": "وضع ملک",
      "Select status": "وضع را انتخاب کنید",
      "Price Range (AED)": "محدوده قیمت (درهم)",
      "Area Range (sq ft)": "محدوده متراژ (فوت مربع)",
      "Min": "حداقل",
      "Max": "حداکثر",
      "to": "تا",
      "sq ft": "فوت مربع",
      "Delivery Year": "سال تحویل",
      "Select delivery year": "سال تحویل را انتخاب کنید",


      // fa : {
      //   translation: {
      "Projects": "پروژه‌ها",
      "Agents": "نمایندگان",
      "Developers": "سازندگان",
      "Login": "ورود",
      "Get Started": "شروع کنید",
      "Trusted by 10,000+ buyers": "مورد اعتماد بیش از 10,000 خریدار",
      "Live": "زنده",
      "Your Global Gateway to": "دروازه جهانی شما به",
      "Off-Plan Properties": "املاک پیش‌فروش",
      "in the UAE": "در امارات متحده عربی",
      "Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.": "با نمایندگان چندزبانه و تأیید شده ارتباط برقرار کنید — به زبان و در محیط راحت خودتان. آینده سرمایه‌گذاری املاک را با تطبیق هوش مصنوعی تجربه کنید.",
      "Explore Projects": "پروژه‌ها را کاوش کنید",
      "Choose Your Agent": "نماینده خود را انتخاب کنید",
      "List Your Project": "پروژه خود را فهرست کنید",
      "users viewing projects now": "کاربر در حال مشاهده پروژه‌ها",
      "new inquiries in 30 min": "استعلام جدید در 30 دقیقه",
      "countries represented": "کشور نمایندگی شده",
      "Trusted by the Most Respected Developers in the UAE": "مورد اعتماد محترم‌ترین سازندگان در امارات متحده عربی",
      "Why Thousands Trust Us": "چرا هزاران نفر به ما اعتماد دارند",
      "We've revolutionized the off-plan property market with transparency, technology, and trust.": "ما بازار املاک پیش‌فروش را با شفافیت، تکنولوژی و اعتماد متحول کرده‌ایم.",
      "Honest Advice, No Pressure": "مشاوره صادقانه، بدون فشار",
      "Our agents provide transparent, unbiased guidance to help you make informed decisions.": "نمایندگان ما راهنمایی شفاف و بی‌طرفانه ارائه می‌دهند تا به شما کمک کنند تصمیمات آگاهانه بگیرید.",
      "Discover More": "بیشتر کشف کنید",
      "Choose Your Own Agent Freely": "نماینده خود را آزادانه انتخاب کنید",
      "Browse profiles and select the agent that best matches your preferences and language.": "پروفایل‌ها را مرور کنید و نماینده‌ای را انتخاب کنید که بهترین تطابق را با ترجیحات و زبان شما داشته باشد.",
      "Real-time Developer-Synced Data": "داده‌های همگام‌سازی شده با سازنده در زمان واقعی",
      "Access up-to-the-minute project information directly from developer systems.": "به اطلاعات به‌روز پروژه مستقیماً از سیستم‌های سازنده دسترسی پیدا کنید.",
      "Verified Agents Only": "فقط نمایندگان تأیید شده",
      "All our agents are RERA-registered and thoroughly vetted for your security.": "تمام نمایندگان ما در RERA ثبت شده و برای امنیت شما کاملاً بررسی شده‌اند.",
      "AI-Powered Property Matching": "تطبیق املاک با قدرت هوش مصنوعی",
      "Advanced algorithms match you with properties that fit your exact requirements.": "الگوریتم‌های پیشرفته شما را با املاکی که دقیقاً با نیازهایتان مطابقت دارد، تطبیق می‌دهند.",
      "Multilingual Support": "پشتیبانی چندزبانه",
      "Communicate in your preferred language with our diverse team of international agents.": "به زبان ترجیحی خود با تیم متنوع ما از نمایندگان بین‌المللی ارتباط برقرار کنید.",
      "Top Rated Agents": "نمایندگان با بالاترین امتیاز",
      "Connect with verified, multilingual professionals who understand your needs.": "با متخصصان تأیید شده و چندزبانه که نیازهای شما را درک می‌کنند، ارتباط برقرار کنید.",
      "Top Performer": "عملکرد برتر",
      "Rising Star": "ستاره در حال ظهور",
      "Expert": "متخصص",
      "Total Sales": "کل فروش",
      "Response Time": "زمان پاسخ",
      "LANGUAGES": "زبان‌ها",
      "English": "انگلیسی",
      "Arabic": "عربی",
      "Farsi": "فارسی",
      "SPECIALTIES": "تخصص‌ها",
      "Luxury Properties": "املاک لوکس",
      "Investment": "سرمایه‌گذاری",
      "Commercial": "تجاری",
      "Residential": "مسکونی",
      "First-time Buyers": "خریداران اول‌بار",
      "Rentals": "اجاره",
      "View Full Profile": "مشاهده پروفایل کامل",
      "View All Agents": "مشاهده تمام نمایندگان",
      "How It Works": "چگونه کار می‌کند",
      "Simple 3-step process to find and secure your perfect off-plan property.": "فرآیند ساده 3 مرحله‌ای برای یافتن و تضمین املاک پیش‌فروش ایده‌آل شما.",
      "Choose Your Agent": "نماینده خود را انتخاب کنید",
      "Select from our verified agents based on language, expertise, and customer reviews.": "از میان نمایندگان تأیید شده ما بر اساس زبان، تخصص و نظرات مشتریان انتخاب کنید.",
      "Explore Projects": "پروژه‌ها را کاوش کنید",
      "Browse through verified off-plan projects with real-time data and detailed information.": "پروژه‌های پیش‌فروش تأیید شده را با داده‌های زمان واقعی و اطلاعات تفصیلی مرور کنید.",
      "Secure Your Investment": "سرمایه‌گذاری خود را تضمین کنید",
      "Get expert guidance through the entire process and secure your dream property.": "راهنمایی متخصص در کل فرآیند دریافت کنید و املاک رویایی خود را تضمین کنید.",
      "Agents: Build Your Brand with Us": "نمایندگان: برند خود را با ما بسازید",
      "Join the most advanced platform for real estate professionals.": "به پیشرفته‌ترین پلتفرم برای متخصصان املاک بپیوندید.",
      "Grow your business with cutting-edge tools and verified leads.": "کسب‌وکار خود را با ابزارهای پیشرفته و سرنخ‌های تأیید شده رشد دهید.",
      "Personal Agent Page": "صفحه شخصی نماینده",
      "Get your own branded page under your name with full profile customization.": "صفحه برندی خود را تحت نام خودتان با سفارشی‌سازی کامل پروفایل دریافت کنید.",
      "Access to All Off-Plan Inventory": "دسترسی به تمام موجودی پیش‌فروش",
      "Complete database of verified off-plan projects across the UAE.": "پایگاه داده کامل پروژه‌های پیش‌فروش تأیید شده در سراسر امارات متحده عربی.",
      "Instantly Promote Developer Projects": "فوراً پروژه‌های سازنده را تبلیغ کنید",
      "Market new launches and exclusive projects to your network immediately.": "راه‌اندازی‌های جدید و پروژه‌های انحصاری را فوراً در شبکه خود بازاریابی کنید.",
      "AI-Powered Leads": "سرنخ‌های مبتنی بر هوش مصنوعی",
      "Receive qualified leads matched to your expertise and language skills.": "سرنخ‌های واجد شرایط متناسب با تخصص و مهارت‌های زبانی خود دریافت کنید.",
      "Join as an Agent": "به عنوان نماینده بپیوندید",
      "Already an agent? Sign in here": "قبلاً نماینده هستید؟ اینجا وارد شوید",
      "Sign in here": "اینجا وارد شوید",
      "Need help choosing? Chat with our AI — 24/7 support! 🤖": "برای انتخاب کمک نیاز دارید؟ با هوش مصنوعی ما گفتگو کنید — پشتیبانی 24/7! 🤖",
      "Company": "شرکت",
      "Quick Links": "پیوندهای سریع",
      "Popular Properties": "املاک محبوب",
      "Contact Info": "اطلاعات تماس",
      "Stay Updated": "به‌روز بمانید",
      "Get the latest off-plan property updates and market insights": "آخرین به‌روزرسانی‌های املاک پیش‌فروش و بینش‌های بازار را دریافت کنید",
      "Subscribe": "اشتراک",
      "© 2025 Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved.": "© 2025 Offplan.Market | پلتفرم هوشمند املاک پیش‌فروش امارات | تمام حقوق محفوظ است.",
      "Back to Top": "بازگشت به بالا",
      "users viewing projects now": "کاربران در حال مشاهده پروژه‌ها",
      "new inquiries in 30 min": "درخواست‌های جدید در ۳۰ دقیقه گذشته",
      "countries represented": "کشورهای نمایندگی شده",

      "Already an agent?": "قبلاً نماینده هستید؟",
      "Mohammed Erfani": "محمد عرفانی",
      "Sahar Kalhor": "سحر کلهر",
      "Maryam": "مریم",
      "Booking & 1st Payment": "رزرو و اولین پرداخت",
      "Hi {{agent}}! I'm interested in {{title}} in {{city}}. Starting from AED {{price}}. Can you share more details?": "سلام {{agent}}! من به {{title}} در {{city}} علاقه‌مندم. قیمت از {{price}} درهم شروع می‌شود. می‌توانید جزئیات بیشتری را ارسال کنید؟",
      "Location": "موقعیت",
      "Price": "قیمت",
      "Unit Size": "متراژ واحد",
      "sq.ft": "فوت مربع",
      "Handover": "تحویل",
      "Status": "وضعیت",
      "Available Unit(s)": "واحدهای موجود",
      "available": "موجود",
      "Available": "موجود",
      "Payment Plan": "برنامه پرداخت",
      "Contact": "تماس با",
      "for more details": "برای اطلاعات بیشتر",
      "WhatsApp": "واتساپ",
      "Highlights": "ویژگی‌ها",
      "Final unit available": "آخرین واحد موجود",
      "Modern design by developer": "طراحی مدرن توسط توسعه‌دهنده",
      "Escrow-protected & ready to transfer": "محافظت شده با حساب امانی و آماده انتقال",
      "Project Page": "صفحه پروژه",

      "Loading ...": "در حال بارگذاری...",
      "Loading more properties...": "در حال بارگذاری ملک‌های بیشتر...",

      "Back": "بازگشت",
      "9+ units left": "بیش از ۹ واحد باقی‌مانده",
      "Ready": "آماده",
      "Explore This Exclusive Property in {{city-name}}": "این ملک خاص را در {{city-name}} بررسی کنید",
      "Available Unit Types": "انواع واحدهای موجود",
      "Starting from": "شروع از",
      "Hide Units": "مخفی کردن واحدها",
      "View Units": "مشاهده واحدها",
      "About {{project-title}}": "درباره {{project-title}}",
      "Location & Address\n\nMillennium Tower\n\nDubai Silicon Oasis, Dubai": "موقعیت و آدرس\n\nبرج Millennium\n\nواحة دبی سیلیکون، دبی",
      "Amenities\nGarden\nChildren's Play Area\nGym\nSwimming Pool": "امکانات\nباغ\nمحوطه بازی کودکان\nباشگاه ورزشی\nاستخر شنا",
      "Why Invest in {{project-title}}": "چرا در {{project-title}} سرمایه‌گذاری کنید",
      "Payment Plans": "طرح‌های پرداخت",
      "Ready to Make This Your Home?\n\nContact {{name}} today for exclusive access and personalized assistance\n\nCall Now\nChat on WhatsApp": "آماده‌اید این مکان خانه شما باشد؟\n\nامروز با {{name}} تماس بگیرید برای دسترسی انحصاری و کمک شخصی\n\nتماس بگیرید\nچت در واتساپ",
      "Call Now\nChat on WhatsApp": "تماس بگیرید\nچت در واتساپ",
      "Price Range": "محدوده قیمت",
      "Area Range": "محدوده مساحت",
      "Location & Address": "موقعیت و آدرس",
      "Amenities": "امکانات",
      "Zero Risk – Escrow Protected": "بدون ریسک – محافظت شده با حساب امانی",
      "AED": "درهم",
      "Contact Sahar Kalhor today for exclusive access and personalized assistance": "امروز با سحر کالهر تماس بگیرید تا از دسترسی انحصاری و مشاوره شخصی بهره‌مند شوید.",
      "Unit ID :": "شناسه واحد :",
      "No units available": "هیچ واحدی موجود نیست",
      "Reserve 24/7 –": "رزرو ۲۴ ساعته –",
      "No Down Payment Required !": "نیازی به پیش‌پرداخت نیست!",
      "Gallery": "گالری",
      "View all unit images and renders": "مشاهده تمام تصاویر و رندرهای واحدها",
      "View Gallery": "مشاهده گالری",

      "Floor Plan": "نقشه طبقات",
      "Download detailed floor plan": "دانلود نقشه تفصیلی طبقه",
      "Download Plan": "دانلود نقشه",

      "Payment Plan": "برنامه پرداخت",
      "Flexible payment options": "گزینه‌های پرداخت انعطاف‌پذیر",
      "View Details": "مشاهده جزئیات",
      "Unit Price": "قیمت واحد",
      "Unit ID": "شناسه واحد",
      "Unit Details": "جزئیات واحد",
      "Ready to Reserve?": "آماده رزرو هستید؟",
      "Secure this unit online now with a small deposit.": "این واحد را هم‌اکنون با پرداخت بیعانه آنلاین رزرو کنید.",
      "Reserve Now": "اکنون رزرو کنید",
      "Pay Booking Fee": "پرداخت هزینه رزرو",
      "or": "یا",
      "Need Help or More Info?": "نیاز به راهنمایی یا اطلاعات بیشتر دارید؟",
      "Talk to our property advisor for pricing, viewing, and guidance.": "برای قیمت‌گذاری، بازدید و مشاوره با مشاور املاک ما صحبت کنید.",
      "Your Property Advisor": "مشاور املاک شما",
      "Trusted Advisor": "مشاور قابل اعتماد",
      "4.9 (38 reviews)": "۴.۹ (۳۸ نظر)",
      "Request Callback": "درخواست تماس",
      "Your name": "نام شما",
      "Mobile number": "شماره موبایل",
      "Email address": "آدرس ایمیل",
      "Submit Request": "ارسال درخواست",

    }
  },

  ar: {
    translation: {
      "Home": "الرئيسية",
      "Request": "طلب",
      "Exclusive": "حصري",
      "Latest": "الأحدث",
      "About": "حول",
      "Payment Plan": "خطة الدفع",
      "No Floor Plan Image": "لا توجد صورة لمخطط الطابق",
      "Contact": "اتصال",
      "Enter your full name": "أدخل اسمك الكامل",
      "Name": "الاسم",
      "Blog": "مدونة",
      "sqft": "قدم مربع",
      "Cancel": "إلغاء",
      "Careers": "الوظائف",
      "Bedroom Apartment": "شقة غرفة نوم",
      "Enter your details to get the full payment plan details.": "أدخل بياناتك للحصول على تفاصيل خطة الدفع الكاملة",
      "Payment Plan": "خطة الدفع",
      "Send Payment Plan": "إرسال خطة الدفع",
      "Apartments in Dubai Marina": "شقق في دبي مارينا",
      "Villas in JVC": "فلل في قرية جميرا الدائرية",
      "Offices in Business Bay": "مكاتب في الخليج التجاري",
      "Shops in Downtown": "محلات في وسط المدينة",
      "Penthouses in DIFC": "بنتهاوس في مركز دبي المالي العالمي",
      "Townhouses in Dubailand": "تاون هاوس في دبي لاند",
      "Warehouses in Jebel Ali": "مستودعات في جبل علي",
      "Retail in The Springs": "محلات تجزئة في الينابيع",
      "Loading property details...": "جاري تحميل تفاصيل العقار...",
      "About Us": "من نحن",
      "fromArea": "من {{area}} قدم مربع",
      "Sahar Kalhor": "سحر كلهر",
      "left": "متبقية",
      "price_not_available": "السعر غير متوفر",
      "Bedroom": "غرفة",
      "Enter your email": "أدخل بريدك الإلكتروني",
      "Apartment": "شقة",
      "Available Units": "وحدة متاحة",
      "FAQs": "الأسئلة الشائعة",
      "Privacy Policy": "سياسة الخصوصية",
      "Terms of Service": "شروط الخدمة",
      "Chat with AI": "الدردشة مع الذكاء الاصطناعي",
      "Help Center": "مركز المساعدة",
      "Contact Support": "الاتصال بالدعم",
      "Starting from": "تبدأ من",
      "Unit Price & Payment Plan": "سعر الوحدة وخطة الدفع",
      "View Units": "عرض الوحدات",
      "No Floor Plan Available": "لا توجد مخططات طوابق متاحة",
      "ID": "معرّف",
      "Floor": "الطابق",
      "Size": "المساحة",
      "Project Gallery": "معرض المشروع",
      "Coming Soon": "قريباً",
      "No units available in this category": "لا توجد وحدات متاحة في هذه الفئة",
      "7th floor, Al Amiri Tower, Barsha Heights, Tecom, UAE":"الطابق السابع، برج الأميري، برشا هايتس، تيكوم، الإمارات العربية المتحدة",
      "Write your short comment... (optional)": "اكتب تعليقك القصير... (اختياري)",
      "UAE's premier off-plan property platform. Trusted for transparency, smart search & expert support.": "المنصة الرائدة في دولة الإمارات للعقارات على المخطط. موثوقة للشفافية، البحث الذكي، والدعم المتخصص.",
      "View Details": "عرض التفاصيل",
      "Hide Units": "إخفاء الوحدات",
      "View Units": "عرض الوحدات",
      "Floor Plan": "مخطط الطابق",
      "Starting from": "تبدأ من",
      "Available": "متاح",
      "units_available": "وحدة متاحة",
      "Studio": "استوديو",
      "Off-Plan & Ready Property Expert | Dubai & UAE": "خبيرة العقارات الجاهزة وعلى الخريطة | دبي والإمارات",
      "Helping you find the right ready and off-plan properties in Dubai, Abu Dhabi, and across the UAE.": "مساعدتك في العثور على العقارات الجاهزة وعلى الخريطة المناسبة في دبي وأبو ظبي وعبر الإمارات",
      "Explore Projects": "استكشف المشاريع",
      "Chat with Sahar Kalhor": "تحدث مع سحر كلهر",
      "Waldorf Astoria Residence": "والدورف أستوريا ريزيدنس",
      "exclusive_property": "استكشف هذا العقار الحصري في {{title}}",

      "overview": "نظرة عامة",
      "3_bedroom_apartment": "شقة من 3 غرف نوم",
      "area": "المساحة",
      "1836_sqft": "1836 قدم مربع",
      "handover": "تسليم",
      "handover_date": "الربع الرابع 2024",
      "payment_plan": "خطة الدفع",
      "payment_plan_value": "20٪",
      "childrens_play_area": "منطقة لعب الأطفال",
      "available": "متوفر",
      "swimming_pool": "حمام السباحة",

      // "deliveryBy ": "التسليم بحلول {{date}}",
      "Guaranteed ROI Contract": "عقد عائد استثمار مضمون",
      "Ready to Make This Your Home?": "هل أنت مستعد لجعل هذا منزلك؟",
      "Contact {{name}} today for exclusive access and personalized assistance": "تواصل مع {{name}} اليوم للحصول على وصول حصري ومساعدة مخصصة", "DLD Verified": "معتمد من دائرة الأراضي والأملاك",
      "Deals Closed": "الصفقات المغلقة",
      "Years of Experience": "سنوات الخبرة",
      "area_not_available": "المنطقة غير متوفرة",
      "Your Next Home Starts Here": "منزلك القادم يبدأ هنا",
      "rateConsultation": "كيف تقيم استشارة {{name}}؟",
      "Your Next Home": "منزلك القادم",
      "Starts Here": "يبدأ هنا",
      "Buy Ready & Offplan Properties in Dubai, Abu Dhabi, and Across the UAE Curated for Smart Investors": "شراء العقارات الجاهزة وعلى الخريطة في دبي وأبو ظبي وعبر الإمارات المختارة للمستثمرين الأذكياء",
      "Buy Ready & Offplan Properties": "شراء العقارات الجاهزة وعلى المخطط",
      "in Dubai, Abu Dhabi, and Across the UAE": "في دبي وأبوظبي وجميع أنحاء الإمارات",
      "Curated for Smart Investors.": "مختارة خصيصًا للمستثمرين الأذكياء.",
      "Chat with": "الدردشة مع",
      "Don't Miss UAE's": "لا تفوت فرص الإمارات",
      "Hottest": "الأكثر سخونة",
      "Off-Plan Opportunities": "لشراء العقارات على المخطط",
      "Properties are selling 40% faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market.": "العقارات تُباع بسرعة أكبر بنسبة 40٪ عن العام الماضي. احصل على وصول حصري إلى المشاريع قبل الإطلاق بأسعار خاصة قبل طرحها في السوق.",
      "Haven’t found the right Offplan or Ready property yet?": "هل لم تجد العقار المناسب الجاهز أو على المخطط بعد؟",
      "Don’t worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond.": "لا تقلق — استخدم شريط البحث لاستكشاف أفضل فرص الاستثمار في دبي، أبوظبي، وما بعدها.",
      "How would you rate {{name}}'s consultation?": "كيف تقيم استشارة {{name}}؟",
      "Share your experience with others": "شارك تجربتك مع الآخرين",
      "All": "الكل",
      "Ready": "جاهز",
      "Off Plan": "على الخريطة",
      "units_left_9plus": "أكثر من 9 وحدات متبقية",
      "units_left": "{{count}} وحدة متبقية",
      "units_left_plural": "{{count}} وحدات متبقية",
      "Dubai": "دبي",
      "Abu Dhabi": "أبو ظبي",
      "Ajman": "عجمان",
      "AlKifaf": "الكفاف",
      "Edge Hotel by Rotana (Navitas)": "فندق Edge من روتانا (Navitas)",
      "Sharjah": "الشارقة",
      "Ras Al Khaimah": "رأس الخيمة",
      "unit left": "وحدة متبقية",
      "units left": "وحدات متبقية",
      "Payment": "الدفع",
      "Starting from": "ابتداءً من",
      "From": "من",
      "ft²": "قدم مربع",
      "See Availability": "شاهد التوفر",
      "Rukan Tower": "برج ركن",
      "Rukan Community": "مجتمع ركن",
      "October": "أكتوبر",
      "Binghatti Tulip": "بن غاطي توليب",
      "Booking & 1st Payment": "الحجز والدفع الأول",
      "JVC": "JVC",
      "December": "ديسمبر",
      "Binghatti Azure": "بن غاطي أزور",
      "January": "يناير",
      "Binghatti Phoenix": "بن غاطي فونيكس",
      "February": "فبراير",
      "Binghatti Dusk": "بن غاطي داسك",
      "Rokane G24": "روكان G24",
      "The Sterling": "ذا ستيرلنغ",
      "Business Bay": "الخليج التجاري",
      "June": "يونيو",
      "The Pad": "ذا باد",
      "So Uptown Dubai": "سو أب تاون دبي",
      "Uptown, AlThanyah Fifth": "أب تاون، الثنية الخامس",
      "Rokane G25": "روكان G25",
      "September": "سبتمبر",
      "Raffles": "رافلز",
      "Palm Jumeirah": "نخلة جميرا",
      "May": "مايو",
      "Opus By Zaha Hadid": "أوبوس بتصميم زها حديد",
      "Load More Properties": "تحميل المزيد من العقارات",
      "Top Agent": "وكيل مميز",
      "Deals": "الصفقات",
      "Years": "سنوات",
      "Rating": "التقييم",
      "WhatsApp Now": "واتساب الآن",
      "Call Now": "اتصل الآن",
      "Your Trusted Off-Plan Expert": "خبيرتك الموثوقة في العقارات على الخريطة",
      "out of": "من أصل",
      "4.9 out of 5": "4.9 من 5",
      "More than just an agent — Sahar is your trusted advisor in navigating": "أكثر من مجرد وكيل — سحر مستشارتك الموثوقة في التنقل",
      "See more": "شاهد المزيد",
      "How would you rate Sahar Kalhor's consultation?": "كيف تقيم استشارة سحر كلهر؟",
      "Share your experience with others": "شارك تجربتك مع الآخرين",
      "Submit Review": "إرسال المراجعة",
      "Book a Free Consultation": "احجز استشارة مجانية",
      "Get personalized property recommendations": "احصل على توصيات عقارية مخصصة",
      "Full Name": "الاسم الكامل",
      "Email Address": "عنوان البريد الإلكتروني",
      "WhatsApp Number": "رقم الواتساب",
      "Your Message": "رسالتك",
      "Submit Request": "إرسال الطلب",
      "Haven't found the right Offplan or Ready property yet?": "لم تجد العقار المناسب على الخريطة أو الجاهز بعد؟",
      "Don't worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond": "لا تقلق — فقط استخدم شريط البحث لاستكشاف أفضل الفرص الاستثمارية في دبي وأبو ظبي وما بعدها",
      "City": "المدينة",
      "Select city": "اختر المدينة",
      "Neighborhood": "الحي",
      "Select area": "اختر المنطقة",
      "Property Type": "نوع العقار",
      "Residential": "سكني",
      "Commercial": "تجاري",
      "Residential Property Types": "أنواع العقارات السكنية",
      "Apartment": "شقة",
      "Villa": "فيلا",
      "Townhouse": "تاون هاوس",
      "Penthouse": "بنت هاوس",
      "Bedrooms": "غرف النوم",
      "Advanced Filters": "المرشحات المتقدمة",
      "Reset Filters": "إعادة تعيين المرشحات",
      "Show Properties": "عرض العقارات",
      "Smart Navigation": "التنقل الذكي",
      "AI-powered search": "البحث المدعوم بالذكاء الاصطناعي",
      "Prime Locations": "المواقع الرئيسية",
      "Best areas in Dubai": "أفضل المناطق في دبي",
      "Urban Excellence": "التميز الحضري",
      "Premium developments": "التطويرات المميزة",
      "Best ROI": "أفضل عائد على الاستثمار",
      "Find instant returns": "العثور على عوائد فورية",
      "Limited Time Offer": "عرض لوقت محدود",
      "Don't Miss UAE's Hottest Off-Plan Opportunities": "لا تفوت أحدث الفرص على الخريطة في الإمارات",
      "Properties are selling faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market": "العقارات تُباع بشكل أسرع من العام الماضي. احصل على وصول حصري للمشاريع قبل الإطلاق بأسعار المبكرين قبل دخولها السوق",
      "Commission on Select Properties": "عمولة على العقارات المختارة",
      "AI Assistant Support": "دعم المساعد الذكي",
      "Chat with AI Now": "تحدث مع الذكاء الاصطناعي الآن",
      "investors online now": "مستثمر متصل الآن",
      "No hidden fees": "لا توجد رسوم مخفية",
      "Instant property alerts": "تنبيهات العقارات الفورية",
      "Need help choosing? Chat with our AI — support!": "تحتاج مساعدة في الاختيار؟ تحدث مع ذكائنا الاصطناعي — الدعم!",
      "Company": "الشركة",
      "Quick Links": "روابط سريعة",
      "Popular Properties": "العقارات الشائعة",
      "Contact Info": "معلومات الاتصال",
      "floor, Al Amiri Tower, Barsha Heights, Tecom, UAE": "الطابق، برج الأميري، بارشا هايتس، تيكوم، الإمارات",
      "English": "الإنجليزية",
      "Contact Us": "اتصل بنا",
      "Stay Updated": "ابق محدثاً",
      "Get the latest off-plan property updates and market insights": "احصل على آخر تحديثات العقارات على الخريطة ورؤى السوق",
      "Subscribe": "اشترك",
      "Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved": "Offplan.Market | منصة الإمارات الذكية للعقارات على الخريطة | جميع الحقوق محفوظة",
      "Back to Top": "العودة للأعلى",
      "Last unit sold": "تم بيع آخر وحدة",
      "Last viewed": "آخر مشاهدة",
      "Last offer negotiated": "تم التفاوض على آخر عرض",
      "Last down payment confirmed": "تم تأكيد الدفعة المقدمة الأخيرة",
      "hours ago": "منذ ساعات",
      "minutes ago": "منذ دقائق",
      "Located in prime community of {{district}}, {{city}}": "يقع في مجتمع رئيسي في {{district}}، {{city}}",
      "Expected handover by {{handover}}": "من المتوقع التسليم بحلول {{handover}}",
      "Flexible payment plan with only": "خطة سداد مرنة مع فقط",
      "down payment": "دفعة أولى",
      "Unique": "مميز",
      "onsite": "في الموقع",
      "During construction": "أثناء الإنشاء",
      "2 years after delivery": "بعد التسليم بسنتين",
      "DLD Fees": "رسوم دائرة الأراضي والأملاك",
      "On Delivery": "عند التسليم",
      "Within 34 months Post Delivery": "خلال 34 شهرًا بعد التسليم",
      "Booking and 1st payment": "الحجز والدفع الأول",
      "1st Instalment": "القسط الأول",
      "2nd Instalment": "الدفعة الثانية",
      "3rd Instalment": "الدفعة الثالثة",
      "4th Instalment": "الدفعة الرابعة",
      "5th Instalment": "الدفعة الخامسة",
      "6th Instalment": "الدفعة السادسة",
      "7th Instalment": "الدفعة السابعة",
      "8th Instalment": "الدفعة الثامنة",
      "9th Instalment": "الدفعة التاسعة",
      "unit_price_payment_plan": "سعر الوحدة وخطة الدفع",
      "unit_details": "تفاصيل الوحدة",
      "unit_id": "معرف الوحدة",
      "status": "الحالة",
      "size": "المساحة",
      "unit_price": "سعر الوحدة",
      "view_all_unit_images_and_renders": "عرض جميع صور الوحدة والعروض التخطيطية",
      "view_gallery": "عرض المعرض",
      "floor_plan": "مخطط الطابق",
      "download_detailed_floor_plan": "تحميل مخطط الطابق التفصيلي",
      "download_plan": "تحميل المخطط",
      "payment_plan": "خطة الدفع",
      "flexible_payment_options": "خيارات دفع مرنة",
      "view_details": "عرض التفاصيل",
      "ready_to_reserve": "هل أنت مستعد للحجز؟",
      "secure_unit_online": "احجز هذه الوحدة عبر الإنترنت الآن بدفعة صغيرة.",
      "reserve_now": "احجز الآن",
      "pay_booking_fee": "دفع رسوم الحجز",
      "or": "أو",
      "need_help_or_info": "تحتاج إلى مساعدة أو مزيد من المعلومات؟",
      "talk_to_property_advisor": "تحدث إلى مستشارنا العقاري للحصول على الأسعار والمعاينة والإرشادات.",
      // ar : {
      //   translation: {
      "Projects": "المشاريع",
      "Agents": "الوكلاء",
      "Developers": "المطورين",
      "Login": "تسجيل الدخول",
      "Get Started": "ابدأ الآن",
      "Trusted by 10,000+ buyers": "موثوق من قبل أكثر من 10,000 مشتري",
      "Live": "مباشر",
      "Your Global Gateway to": "بوابتك العالمية إلى",
      "Off-Plan Properties": "العقارات على الخريطة",
      "in the UAE": "في دولة الإمارات العربية المتحدة",
      "Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.": "تواصل مع وكلاء متعددي اللغات ومعتمدين — بلغتك ومنطقة راحتك. اختبر مستقبل الاستثمار العقاري مع المطابقة المدعومة بالذكاء الاصطناعي.",
      "Explore Projects": "استكشف المشاريع",
      "Choose Your Agent": "اختر وكيلك",
      "List Your Project": "أدرج مشروعك",
      "users viewing projects now": "مستخدم يشاهدون المشاريع الآن",
      "new inquiries in 30 min": "استفسار جديد في 30 دقيقة",
      "countries represented": "دولة ممثلة",
      "Trusted by the Most Respected Developers in the UAE": "موثوق من قبل أكثر المطورين احتراماً في دولة الإمارات العربية المتحدة",
      "Why Thousands Trust Us": "لماذا يثق بنا الآلاف",
      "We've revolutionized the off-plan property market with transparency, technology, and trust.": "لقد ثورنا سوق العقارات على الخريطة بالشفافية والتكنولوجيا والثقة.",
      "Honest Advice, No Pressure": "نصائح صادقة، بلا ضغط",
      "Our agents provide transparent, unbiased guidance to help you make informed decisions.": "يقدم وكلاؤنا إرشادات شفافة وغير متحيزة لمساعدتك على اتخاذ قرارات مدروسة.",
      "Discover More": "اكتشف المزيد",
      "Choose Your Own Agent Freely": "اختر وكيلك بحرية",
      "Browse profiles and select the agent that best matches your preferences and language.": "تصفح الملفات الشخصية واختر الوكيل الذي يتناسب أكثر مع تفضيلاتك ولغتك.",
      "Real-time Developer-Synced Data": "بيانات متزامنة مع المطور في الوقت الفعلي",
      "Access up-to-the-minute project information directly from developer systems.": "احصل على معلومات المشروع المحدثة مباشرة من أنظمة المطور.",
      "Verified Agents Only": "وكلاء معتمدون فقط",
      "All our agents are RERA-registered and thoroughly vetted for your security.": "جميع وكلائنا مسجلون في هيئة تنظيم العقارات ومفحوصون بدقة لأمانك.",
      "AI-Powered Property Matching": "مطابقة العقارات بالذكاء الاصطناعي",
      "Advanced algorithms match you with properties that fit your exact requirements.": "خوارزميات متقدمة تطابقك مع العقارات التي تناسب متطلباتك بالضبط.",
      "Multilingual Support": "دعم متعدد اللغات",
      "Communicate in your preferred language with our diverse team of international agents.": "تواصل بلغتك المفضلة مع فريقنا المتنوع من الوكلاء الدوليين.",
      "Top Rated Agents": "الوكلاء الأعلى تقييماً",
      "Connect with verified, multilingual professionals who understand your needs.": "تواصل مع محترفين معتمدين ومتعددي اللغات يفهمون احتياجاتك.",
      "Top Performer": "الأداء الأفضل",
      "Rising Star": "النجم الصاعد",
      "Expert": "خبير",
      "Total Sales": "إجمالي المبيعات",
      "Response Time": "وقت الاستجابة",
      "LANGUAGES": "اللغات",
      "English": "الإنجليزية",
      "Arabic": "العربية",
      "Farsi": "الفارسية",
      "SPECIALTIES": "التخصصات",
      "Luxury Properties": "العقارات الفاخرة",
      "Investment": "الاستثمار",
      "Commercial": "تجاري",
      "Residential": "سكني",
      "First-time Buyers": "المشترون لأول مرة",
      "Rentals": "الإيجارات",
      "View Full Profile": "عرض الملف الشخصي الكامل",
      "View All Agents": "عرض جميع الوكلاء",
      "How It Works": "كيف يعمل",
      "Simple 3-step process to find and secure your perfect off-plan property.": "عملية بسيطة من 3 خطوات للعثور على عقارك المثالي على الخريطة وتأمينه.",
      "Choose Your Agent": "اختر وكيلك",
      "Select from our verified agents based on language, expertise, and customer reviews.": "اختر من وكلائنا المعتمدين بناءً على اللغة والخبرة وتقييمات العملاء.",
      "Explore Projects": "استكشف المشاريع",
      "Browse through verified off-plan projects with real-time data and detailed information.": "تصفح المشاريع المعتمدة على الخريطة مع البيانات في الوقت الفعلي والمعلومات التفصيلية.",
      "Secure Your Investment": "أمّن استثمارك",
      "Get expert guidance through the entire process and secure your dream property.": "احصل على إرشادات الخبراء خلال العملية بأكملها وأمّن عقارك المثالي.",
      "Agents: Build Your Brand with Us": "الوكلاء: ابنوا علامتكم التجارية معنا",
      "Join the most advanced platform for real estate professionals.": "انضم إلى أكثر المنصات تطوراً لمحترفي العقارات.",
      "Grow your business with cutting-edge tools and verified leads.": "نمّ أعمالك بأدوات متطورة وعملاء محتملين معتمدين.",
      "Personal Agent Page": "صفحة الوكيل الشخصية",
      "Get your own branded page under your name with full profile customization.": "احصل على صفحتك ذات العلامة التجارية تحت اسمك مع تخصيص كامل للملف الشخصي.",
      "Access to All Off-Plan Inventory": "الوصول إلى جميع مخزون العقارات على الخريطة",
      "Complete database of verified off-plan projects across the UAE.": "قاعدة بيانات كاملة للمشاريع المعتمدة على الخريطة في جميع أنحاء دولة الإمارات العربية المتحدة.",
      "Instantly Promote Developer Projects": "روّج لمشاريع المطورين فوراً",
      "Market new launches and exclusive projects to your network immediately.": "سوّق الإطلاقات الجديدة والمشاريع الحصرية لشبكتك فوراً.",
      "AI-Powered Leads": "عملاء محتملون مدعومون بالذكاء الاصطناعي",
      "Receive qualified leads matched to your expertise and language skills.": "احصل على عملاء محتملين مؤهلين يتناسبون مع خبرتك ومهاراتك اللغوية.",
      "Join as an Agent": "انضم كوكيل",
      "Already an agent? Sign in here": "وكيل بالفعل؟ سجل دخولك هنا",
      "Sign in here": "سجل دخولك هنا",
      "Need help choosing? Chat with our AI — 24/7 support! 🤖": "تحتاج مساعدة في الاختيار؟ تحدث مع الذكاء الاصطناعي لدينا — دعم 24/7! 🤖",
      "Company": "الشركة",
      "Quick Links": "روابط سريعة",
      "Popular Properties": "العقارات الشائعة",
      "Contact Info": "معلومات الاتصال",
      "Stay Updated": "ابق محدثاً",
      "Get the latest off-plan property updates and market insights": "احصل على أحدث تحديثات العقارات على الخريطة ورؤى السوق",
      "Subscribe": "اشترك",
      "© 2025 Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved.": "© 2025 Offplan.Market | منصة الإمارات الذكية للعقارات على الخريطة | جميع الحقوق محفوظة.",
      "Back to Top": "العودة إلى الأعلى",
      "users viewing projects now": "مستخدمون يشاهدون المشاريع الآن",
      "new inquiries in 30 min": "استفسارات جديدة خلال 30 دقيقة",
      "countries represented": "دول ممثلة",

      "Already an agent?": "هل أنت وكيل بالفعل؟",
      "Mohammed Erfani": "محمد عرفانی",
      "Sahar Kalhor": "سحر کلهر",
      "Maryam": "مريم",

      "Hi {{agent}}! I'm interested in {{title}} in {{city}}. Starting from AED {{price}}. Can you share more details?": "مرحبًا {{agent}}! أنا مهتم بـ {{title}} في {{city}}. تبدأ الأسعار من درهم {{price}}. هل يمكنك مشاركة المزيد من التفاصيل؟",
      "Location": "الموقع",
      "Price": "السعر",
      "Unit Size": "حجم الوحدة",
      "sq.ft": "قدم²",
      "Handover": "تاريخ التسليم",
      "Status": "الحالة",
      "Available Unit(s)": "الوحدات المتوفرة",
      "available": "متوفرة",
      "Available": "متوفرة",
      "Payment Plan": "خطة الدفع",
      "Contact": "اتصل بـ",
      "for more details": "لمزيد من التفاصيل",
      "WhatsApp": "واتساب",
      "Highlights": "المميزات",
      "Final unit available": "الوحدة الأخيرة متوفرة",
      "Modern design by developer": "تصميم حديث من المطور",
      "Escrow-protected & ready to transfer": "محمي بواسطة حساب الضمان وجاهز للنقل",
      "Project Page": "صفحة المشروع",

      "Loading ...": "جارٍ التحميل...",
      "Loading more properties...": "جارٍ تحميل المزيد من العقارات...",

      "Back": "رجوع",
      "9+ units left": "متبقي 9+ وحدات",
      "Ready": "جاهز",
      "Explore This Exclusive Property in {{city-name}}": "استكشف هذا العقار الحصري في {{city-name}}",
      "Available Unit Types": "أنواع الوحدات المتاحة",
      "Starting from": "تبدأ من",
      "Hide Units": "إخفاء الوحدات",
      "View Units": "عرض الوحدات",
      "About {{project-title}}": "حول {{project-title}}",
      "About {{project-title}}": "حول {{project-title}}",
      "Location & Address": "الموقع والعنوان",
      "Amenities": "المرافق",
      "Why Invest in {{project-title}}": "لماذا تستثمر في {{project-title}}",
      "Why Invest in {{project-title}}": "لماذا تستثمر في {{project-title}}",
      "Payment Plans": "خطط الدفع",
      "Ready to Make This Your Home?\n\nContact {{project-title}} today for exclusive access and personalized assistance\n\nCall Now\nChat on WhatsApp": "هل أنت مستعد لجعل هذا منزلك؟\n\nتواصل مع {{project-title}} اليوم للحصول على وصول حصري ومساعدة شخصية\n\nاتصل الآن\nالدردشة على واتساب",
      "Call Now\nChat on WhatsApp": "اتصل الآن\nالدردشة على واتساب",
      "Price Range": "نطاق السعر",
      "Area Range": "نطاق المساحة",
      "Location & Address": "الموقع والعنوان",
      "Amenities": "المرافق",
      "Zero Risk – Escrow Protected": "صفر مخاطرة – محمي بحساب الضمان",
      "Last inquiry received": "آخر استفسار تم استلامه",
      "Chat on WhatsApp": "الدردشة على واتساب",
      "Unit ID :": "معرف الوحدة :",
      "AED": "درهم",
      "No units available": "لا توجد وحدات متاحة",
      "Reserve 24/7 –": "احجز على مدار الساعة –",
      "No Down Payment Required !": "لا حاجة لدفع مقدم!",
      "Gallery": "المعرض",
      "View all unit images and renders": "عرض جميع صور الوحدات والتصاميم",
      "View Gallery": "عرض المعرض",

      "Floor Plan": "مخطط الطابق",
      "Download detailed floor plan": "تحميل المخطط التفصيلي",
      "Download Plan": "تحميل المخطط",

      "Payment Plan": "خطة الدفع",
      "Flexible payment options": "خيارات دفع مرنة",
      "View Details": "عرض التفاصيل",
      "Unit Price": "سعر الوحدة",
      "Unit ID": "معرف الوحدة",
      "Unit Details": "تفاصيل الوحدة",
      "Ready to Reserve?": "جاهز للحجز؟",
      "Secure this unit online now with a small deposit.": "قم بتأمين هذه الوحدة الآن عبر الإنترنت بدفعة صغيرة.",
      "Reserve Now": "احجز الآن",
      "Pay Booking Fee": "ادفع رسوم الحجز",
      "or": "أو",
      "Need Help or More Info?": "تحتاج مساعدة أو مزيد من المعلومات؟",
      "Talk to our property advisor for pricing, viewing, and guidance.": "تحدث إلى مستشار العقارات لدينا للتسعير والمعاينة والإرشاد.",
      "Your Property Advisor": "مستشارك العقاري",
      "Trusted Advisor": "مستشار موثوق",
      "4.9 (38 reviews)": "٤.٩ (٣٨ تقييمًا)",
      "Request Callback": "طلب معاودة الاتصال",
      "Your name": "اسمك",
      "Mobile number": "رقم الجوال",
      "Email address": "عنوان البريد الإلكتروني",
      "Submit Request": "إرسال الطلب",
      "Advanced Filters": "فلاتر متقدمة",
      "Project Name": "اسم المشروع",
      "Enter project name": "أدخل اسم المشروع",
      "Developer": "المطور",
      "Select developer": "اختر المطور",
      "Property Status": "حالة العقار",
      "Select status": "اختر الحالة",
      "Price Range (AED)": "نطاق السعر (درهم)",
      "Area Range (sq ft)": "نطاق المساحة (قدم مربع)",
      "Min": "الحد الأدنى",
      "Max": "الحد الأقصى",
      "to": "إلى",
      "sq ft": "قدم مربع",
      "Delivery Year": "سنة التسليم",
      "Select delivery year": "اختر سنة التسليم",


    }

  },

  en: {
    translation: {
      "Home": "Home",
      "Request": "Request",
      "Payment Plan": "Payment Plan",
      "Cancel": "Cancel",
      "fromArea": "From {{area}} ft²",
      "No Floor Plan Image": "No Floor Plan Image",
      "Exclusive": "Exclusive",
      "Latest": "Latest",
      "Enter your full name": "Enter your full name",
      "About": "About",
      "Name": "Name",
      "Cancel": "Cancel",
      "Contact": "Contact",
      "Enter your details to get the full payment plan details.": "Enter your details to get the full payment plan details.",
      "Payment Plan": "Payment Plan",
      "Loading property details...": "Loading property details...",
      "About Us": "About Us",
      "Careers": "Careers",
      "Send Payment Plan": "Send Payment Plan",
      "Blog": "Blog",
      "Write your short comment... (optional)": "Write your short comment... (optional)",
      "7th floor, Al Amiri Tower, Barsha Heights, Tecom, UAE":"7th floor, Al Amiri Tower, Barsha Heights, Tecom, UAE",
      "No Floor Plan Available": "No Floor Plan Available",
      "Waldorf Astoria Residence": "Waldorf Astoria Residence",
      "Enter your email": "Enter your email",
      "FAQs": "FAQs",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service",
      "Chat with AI": "Chat with AI",
      "Help Center": "Help Center",
      "Contact Support": "Contact Support",
      "Sahar Kalhor": "Sahar Kalhor",
      "Unit Price & Payment Plan": "Unit Price & Payment Plan",
      "Apartments in Dubai Marina": "Apartments in Dubai Marina",
      "Villas in JVC": "Villas in JVC",
      "Offices in Business Bay": "Offices in Business Bay",
      "Shops in Downtown": "Shops in Downtown",
      "Penthouses in DIFC": "Penthouses in DIFC",
      "Townhouses in Dubailand": "Townhouses in Dubailand",
      "Warehouses in Jebel Ali": "Warehouses in Jebel Ali",
      "Retail in The Springs": "Retail in The Springs",
      "left": "left",
      "Studio": "Studio",
      "Bedroom": "Bedroom",
      "Apartment": "Apartment",
      "Available Units": "Available Units",
      "Starting from": "Starting from",
      "ID": "ID",
      "sqft": "sq.ft.",
      "Floor": "Floor",
      "Size": "Size",
      "Coming Soon": "Coming Soon",
      "No units available in this category": "No units available in this category",
      "UAE's premier off-plan property platform. Trusted for transparency, smart search & expert support.": "UAE's premier off-plan property platform. Trusted for transparency, smart search & expert support.",
      "View Details": "View Details",
      "Hide Units": "Hide Units",
      "View Units": "View Units",
      "Starting from": "Starting from",
      "Project Gallery": "Project Gallery",
      "Guaranteed ROI Contract": "Guaranteed ROI Contract",
      "Floor Plan": "Floor Plan",
      "overview": "Overview",
      "3_bedroom_apartment": "3 Bedroom Apartment",
      "area": "Area",
      "1836_sqft": "1836 sq.ft",
      "handover": "Handover",
      "handover_date": "Q4 2024",
      "payment_plan": "Payment Plan",
      "payment_plan_value": "20%",
      "childrens_play_area": "Children's Play Area",
      "available": "Available",
      "swimming_pool": "Swimming Pool",
      "Available": "Available",

      "units_available": "units available",
      "View Units": "View Units",
      "Off-Plan & Ready Property Expert | Dubai & UAE": "Off-Plan & Ready Property Expert | Dubai & UAE",
      "Helping you find the right ready and off-plan properties in Dubai, Abu Dhabi, and across the UAE": "Helping you find the right ready and off-plan properties in Dubai, Abu Dhabi, and across the UAE",
      "Explore Projects": "Explore Projects",
      "Chat with Sahar Kalhor": "Chat with Sahar Kalhor",
      "DLD Verified": "DLD Verified",
      "Deals Closed": "Deals Closed",
      "deliveryBy": "Delivery by {{date}}",
      "area_not_available": "Area Not Available",
      "Years of Experience": "Years of Experience",
      "Edge Hotel by Rotana (Navitas)": "Edge Hotel by Rotana (Navitas)",
      "exclusive_property": "Explore This Exclusive Property in {{title}}",
      "Your Next Home Starts Here": "Your Next Home Starts Here",
      "Buy Ready & Offplan Properties in Dubai, Abu Dhabi, and Across the UAE Curated for Smart Investors": "Buy Ready & Offplan Properties in Dubai, Abu Dhabi, and Across the UAE Curated for Smart Investors",
      "Buy Ready & Offplan Properties": "Buy Ready & Offplan Properties",
      "in Dubai, Abu Dhabi, and Across the UAE": "in Dubai, Abu Dhabi, and Across the UAE",
      "Curated for Smart Investors.": "Curated for Smart Investors.",
      "Don't Miss UAE's": "Don't Miss UAE's",
      "price_not_available": "Price Not Available",
      "rateConsultation": "How would you rate {{name}}'s consultation?",
      "Hottest": "Hottest",
      "Off-Plan Opportunities": "Off-Plan Opportunities",
      "Properties are selling 40% faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market.": "Properties are selling 40% faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market.",
      "Haven’t found the right Offplan or Ready property yet?": "Haven’t found the right Offplan or Ready property yet?",
      "Don’t worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond.": "Don’t worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond.",
      "How would you rate {{name}}'s consultation?": "How would you rate {{name}}'s consultation?",
      "Share your experience with others": "Share your experience with others",
      "All": "All",
      "Ready": "Ready",
      "Off Plan": "Off Plan",
      "Dubai": "Dubai",
      "Abu Dhabi": "Abu Dhabi",
      "Ajman": "Ajman",
      "Sharjah": "Sharjah",
      "Ras Al Khaimah": "Ras Al Khaimah",
      "unit left": "unit left",
      "units left": "units left",
      "Payment": "Payment",
      "Starting from": "Starting from",
      "en": "AlKifaf",
      "From": "From",
      "ft²": "ft²",
      "See Availability": "See Availability",
      "Rukan Tower": "Rukan Tower",
      "Rukan Community": "Rukan Community",
      "October": "October",
      "Binghatti Tulip": "Binghatti Tulip",
      "JVC": "JVC",
      "December": "December",
      "Binghatti Azure": "Binghatti Azure",
      "January": "January",
      "Binghatti Phoenix": "Binghatti Phoenix",
      "February": "February",
      "Binghatti Dusk": "Binghatti Dusk",
      "Rokane G24": "Rokane G24",
      "The Sterling": "The Sterling",
      "Business Bay": "Business Bay",
      "June": "June",
      "The Pad": "The Pad",
      "So Uptown Dubai": "So Uptown Dubai",
      "Uptown, AlThanyah Fifth": "Uptown, AlThanyah Fifth",
      "Rokane G25": "Rokane G25",
      "September": "September",
      "Raffles": "Raffles",
      "Palm Jumeirah": "Palm Jumeirah",
      "May": "May",
      "Opus By Zaha Hadid": "Opus By Zaha Hadid",
      "Load More Properties": "Load More Properties",
      "Top Agent": "Top Agent",
      "Deals": "Deals",
      "Years": "Years",
      "Rating": "Rating",
      "WhatsApp Now": "WhatsApp Now",
      "Call Now": "Call Now",
      "Your Trusted Off-Plan Expert": "Your Trusted Off-Plan Expert",
      "out of": "out of",
      "More than just an agent — Sahar is your trusted advisor in navigating": "More than just an agent — Sahar is your trusted advisor in navigating",
      "See more": "See more",
      "How would you rate Sahar Kalhor's consultation?": "How would you rate Sahar Kalhor's consultation?",
      "Last viewed": "Last viewed",
      "Last inquiry received": "Last inquiry received",
      "Last offer negotiated": "Last offer negotiated",
      "Last down payment confirmed": "Last down payment confirmed",
      "hours ago": "hours ago",
      "minutes ago": "minutes ago",
      "Share your experience with others": "Share your experience with others",
      "Submit Review": "Submit Review",
      "Book a Free Consultation": "Book a Free Consultation",
      "Get personalized property recommendations": "Get personalized property recommendations",
      "Full Name": "Full Name",
      "Email Address": "Email Address",
      "WhatsApp Number": "WhatsApp Number",
      "Your Message": "Your Message",
      "Submit Request": "Submit Request",
      "Haven't found the right Offplan or Ready property yet?": "Haven't found the right Offplan or Ready property yet?",
      "Don't worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond": "Don't worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond",
      "City": "City",
      "Select city": "Select city",
      "Neighborhood": "Neighborhood",
      "Select area": "Select area",
      "Property Type": "Property Type",
      "Residential": "Residential",
      "Commercial": "Commercial",
      "Residential Property Types": "Residential Property Types",
      "Apartment": "Apartment",
      "Villa": "Villa",
      "Townhouse": "Townhouse",
      "Penthouse": "Penthouse",
      "Bedrooms": "Bedrooms",
      "Advanced Filters": "Advanced Filters",
      "Reset Filters": "Reset Filters",
      "Show Properties": "Show Properties",
      "Smart Navigation": "Smart Navigation",
      "AI-powered search": "AI-powered search",
      "Prime Locations": "Prime Locations",
      "Best areas in Dubai": "Best areas in Dubai",
      "Urban Excellence": "Urban Excellence",
      "Premium developments": "Premium developments",
      "Best ROI": "Best ROI",
      "Find instant returns": "Find instant returns",
      "Limited Time Offer": "Limited Time Offer",
      "Don't Miss UAE's Hottest Off-Plan Opportunities": "Don't Miss UAE's Hottest Off-Plan Opportunities",
      "Properties are selling faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market": "Properties are selling faster than last year. Get exclusive access to pre-launch projects with early-bird pricing before they hit the market",
      "Commission on Select Properties": "Commission on Select Properties",
      "AI Assistant Support": "AI Assistant Support",
      "Chat with AI Now": "Chat with AI Now",
      "investors online now": "investors online now",
      "No hidden fees": "No hidden fees",
      "Instant property alerts": "Instant property alerts",
      "Need help choosing? Chat with our AI — support!": "Need help choosing? Chat with our AI — support!",
      "Company": "Company",
      "Quick Links": "Quick Links",
      "Popular Properties": "Popular Properties",
      "Contact Info": "Contact Info",
      "floor, Al Amiri Tower, Barsha Heights, Tecom, UAE": "floor, Al Amiri Tower, Barsha Heights, Tecom, UAE",
      "English": "English",
      "Contact Us": "Contact Us",
      "Stay Updated": "Stay Updated",
      "Get the latest off-plan property updates and market insights": "Get the latest off-plan property updates and market insights",
      "Subscribe": "Subscribe",
      "Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved": "Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved",
      "Back to Top": "Back to Top",
      "During construction": "During construction",
      "2 years after delivery": "2 years after delivery",
      "Booking & 1st payment": "Booking & 1st payment",
      "DLD Fees": "DLD Fees",
      "On Delivery": "On Delivery",
      "Within 34 months Post Delivery": "Within 34 months Post Delivery",
      "1st Installment": "1st installment",
      "2nd Installment": "2nd Installment",
      "3rd Installment": "3rd Installment",
      "4th Installment": "4th Installment",
      "5th Installment": "5th Installment",
      "6th Installment": "6th Installment",
      "7th Installment": "7th Installment",
      "8th Installment": "8th Installment",
      "9th Installment": "9th Installment",
      "1st Instalment": "1st instalment",
      "2nd Instalment": "2nd Instalment",
      "3rd Instalment": "3rd Instalment",
      "4th Instalment": "4th Instalment",
      "5th Instalment": "5th Instalment",
      "6th Instalment": "6th Instalment",
      "7th Instalment": "7th Instalment",
      "8th Instalment": "8th Instalment",
      "9th Instalment": "9th Instalment",
      "view_all_unit_images_and_renders": "View all unit images and renders",
      "view_gallery": "View Gallery",
      "floor_plan": "Floor Plan",
      "download_detailed_floor_plan": "Download detailed floor plan",
      "download_plan": "Download Plan",
      "payment_plan": "Payment Plan",
      "flexible_payment_options": "Flexible payment options",
      "view_details": "View Details",
      "ready_to_reserve": "Ready to Reserve?",
      "secure_unit_online": "Secure this unit online now with a small deposit.",
      "reserve_now": "Reserve Now",
      "pay_booking_fee": "Pay Booking Fee",
      "or": "or",
      "need_help_or_info": "Need Help or More Info?",
      "talk_to_property_advisor": "Talk to our property advisor for pricing, viewing, and guidance.",

      // en : {
      // translation: {
      "Projects": "Projects",
      "Agents": "Agents",
      "Developers": "Developers",
      "Login": "Login",
      "Get Started": "Get Started",
      "Trusted by 10,000+ buyers": "Trusted by 10,000+ buyers",
      "Live": "Live",
      "Your Global Gateway to": "Your Global Gateway to",
      "Off-Plan Properties": "Off-Plan Properties",
      "in the UAE": "in the UAE",
      "Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.": "Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.",
      "Explore Projects": "Explore Projects",
      "Choose Your Agent": "Choose Your Agent",
      "List Your Project": "List Your Project",
      "users viewing projects now": "users viewing projects now",
      "new inquiries in 30 min": "new inquiries in 30 min",
      "countries represented": "countries represented",
      "Trusted by the Most Respected Developers in the UAE": "Trusted by the Most Respected Developers in the UAE",
      "Why Thousands Trust Us": "Why Thousands Trust Us",
      "We've revolutionized the off-plan property market with transparency, technology, and trust.": "We've revolutionized the off-plan property market with transparency, technology, and trust.",
      "Honest Advice, No Pressure": "Honest Advice, No Pressure",
      "Our agents provide transparent, unbiased guidance to help you make informed decisions.": "Our agents provide transparent, unbiased guidance to help you make informed decisions.",
      "Discover More": "Discover More",
      "Choose Your Own Agent Freely": "Choose Your Own Agent Freely",
      "Browse profiles and select the agent that best matches your preferences and language.": "Browse profiles and select the agent that best matches your preferences and language.",
      "Real-time Developer-Synced Data": "Real-time Developer-Synced Data",
      "Access up-to-the-minute project information directly from developer systems.": "Access up-to-the-minute project information directly from developer systems.",
      "Verified Agents Only": "Verified Agents Only",
      "All our agents are RERA-registered and thoroughly vetted for your security.": "All our agents are RERA-registered and thoroughly vetted for your security.",
      "AI-Powered Property Matching": "AI-Powered Property Matching",
      "Advanced algorithms match you with properties that fit your exact requirements.": "Advanced algorithms match you with properties that fit your exact requirements.",
      "Multilingual Support": "Multilingual Support",
      "Communicate in your preferred language with our diverse team of international agents.": "Communicate in your preferred language with our diverse team of international agents.",
      "Top Rated Agents": "Top Rated Agents",
      "Connect with verified, multilingual professionals who understand your needs.": "Connect with verified, multilingual professionals who understand your needs.",
      "Top Performer": "Top Performer",
      "Rising Star": "Rising Star",
      "Expert": "Expert",
      "Total Sales": "Total Sales",
      "Response Time": "Response Time",
      "LANGUAGES": "LANGUAGES",
      "English": "English",
      "Arabic": "Arabic",
      "Farsi": "Farsi",
      "SPECIALTIES": "SPECIALTIES",
      "Luxury Properties": "Luxury Properties",
      "Investment": "Investment",
      "Commercial": "Commercial",
      "Residential": "Residential",
      "First-time Buyers": "First-time Buyers",
      "Rentals": "Rentals",
      "View Full Profile": "View Full Profile",
      "View All Agents": "View All Agents",
      "How It Works": "How It Works",
      "Simple 3-step process to find and secure your perfect off-plan property.": "Simple 3-step process to find and secure your perfect off-plan property.",
      "Choose Your Agent": "Choose Your Agent",
      "Select from our verified agents based on language, expertise, and customer reviews.": "Select from our verified agents based on language, expertise, and customer reviews.",
      "Explore Projects": "Explore Projects",
      "Browse through verified off-plan projects with real-time data and detailed information.": "Browse through verified off-plan projects with real-time data and detailed information.",
      "Secure Your Investment": "Secure Your Investment",
      "Get expert guidance through the entire process and secure your dream property.": "Get expert guidance through the entire process and secure your dream property.",
      "Agents: Build Your Brand with Us": "Agents: Build Your Brand with Us",
      "Join the most advanced platform for real estate professionals.": "Join the most advanced platform for real estate professionals.",
      "Grow your business with cutting-edge tools and verified leads.": "Grow your business with cutting-edge tools and verified leads.",
      "Personal Agent Page": "Personal Agent Page",
      "Get your own branded page under your name with full profile customization.": "Get your own branded page under your name with full profile customization.",
      "Access to All Off-Plan Inventory": "Access to All Off-Plan Inventory",
      "Complete database of verified off-plan projects across the UAE.": "Complete database of verified off-plan projects across the UAE.",
      "Instantly Promote Developer Projects": "Instantly Promote Developer Projects",
      "Market new launches and exclusive projects to your network immediately.": "Market new launches and exclusive projects to your network immediately.",
      "AI-Powered Leads": "AI-Powered Leads",
      "Receive qualified leads matched to your expertise and language skills.": "Receive qualified leads matched to your expertise and language skills.",
      "Join as an Agent": "Join as an Agent",
      "Already an agent? Sign in here": "Already an agent? Sign in here",
      "Sign in here": "Sign in here",
      "Need help choosing? Chat with our AI — 24/7 support! 🤖": "Need help choosing? Chat with our AI — 24/7 support! 🤖",
      "Company": "Company",
      "Quick Links": "Quick Links",
      "Popular Properties": "Popular Properties",
      "Contact Info": "Contact Info",
      "Stay Updated": "Stay Updated",
      "Get the latest off-plan property updates and market insights": "Get the latest off-plan property updates and market insights",
      "Subscribe": "Subscribe",
      "© 2025 Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved.": "© 2025 Offplan.Market | UAE's Smart Off-Plan Property Platform | All rights reserved.",
      "Back to Top": "Back to Top",
      "users viewing projects now": "users viewing projects now",
      "new inquiries in 30 min": "new inquiries in 30 min",
      "countries represented": "countries represented",
      "Last unit sold": "Last unit sold",

      "Hi {{agent}}! I'm interested in {{title}} in {{city}}. Starting from AED {{price}}. Can you share more details?": "Hi {{agent}}! I'm interested in {{title}} in {{city}}. Starting from AED {{price}}. Can you share more details?",
      "Location": "Location",
      "Price": "Price",
      "Unit Size": "Unit Size",
      "sq.ft": "sq.ft",
      "Handover": "Handover",
      "Status": "Status",
      "Available Unit(s)": "Available Unit(s)",
      "available": "available",
      "Available": "Available",
      "Payment Plan": "Payment Plan",
      "Contact": "Contact",
      "for more details": "for more details",
      "WhatsApp": "WhatsApp",
      "Highlights": "Highlights",
      "Final unit available": "Final unit available",
      "Modern design by developer": "Modern design by developer",
      "Escrow-protected & ready to transfer": "Escrow-protected & ready to transfer",
      "Project Page": "Project Page",

      "Loading...": "Loading...",
      "Loading more properties...": "Loading more properties...",

      "Back": "Back",
      "9+ units left": "9+ units left",
      "Ready": "Ready",
      "Explore This Exclusive Property in {{city-name}}": "Explore This Exclusive Property in {{city-name}}",
      "Available Unit Types": "Available Unit Types",
      "Starting from": "Starting from",
      "Hide Units": "Hide Units",
      "View Units": "View Units",
      "About {{project-title}}": "About {{project-title}}",
      "About {{project-title}}": "About {{project-title}}",
      "Location & Address": "Location & Address",
      "Amenities": "Amenities",
      "Why Invest in {{project-title}}\nLocated in prime community of {district-name}}, {{city-name}}, {{location}}\nExpected handover by {{handover}}\nFlexible payment plan with only {{downPayment}} down payment\nUnique gym and swimming pool onsite": "Why Invest in {{project-title}}\nLocated in prime community of {{district-name}}, {{city-name}}, {{location}}\nExpected handover by {{handover}}\nFlexible payment plan with only {{downPayment}} down payment\nUnique gym and swimming pool onsite",
      "Payment Plans": "Payment Plans",
      "Ready to Make This Your Home?\n\nContact {{project-title}} today for exclusive access and personalized assistance\n\nCall Now\nChat on WhatsApp": "Ready to Make This Your Home?\n\nContact {{project-title}} today for exclusive access and personalized assistance\n\nCall Now\nChat on WhatsApp",
      "Call Now\nChat on WhatsApp": "Call Now\nChat on WhatsApp",
      "Area Range": "Area Range",
      "Zero Risk – Escrow Protected": "Zero Risk – Escrow Protected",
      "units_left_9plus": "9+ units left",
      "units_left": "{{count}} unit left",
      "units_left_plural": "{{count}} units left",
      "Unit ID :": "Unit ID :",
      "Reserve 24/7 –": "Reserve 24/7 –",
      "No Down Payment Required !": "No Down Payment Required!",
      "Gallery": "Gallery",
      "View all unit images and renders": "View all unit images and renders",
      "View Gallery": "View Gallery",

      "Floor Plan": "Floor Plan",
      "Download detailed floor plan": "Download detailed floor plan",
      "Download Plan": "Download Plan",

      "Payment Plan": "Payment Plan",
      "Flexible payment options": "Flexible payment options",
      "View Details": "View Details",
      "Unit Price": "Unit Price",
      "Unit ID": "Unit ID",
      "Unit Details": "Unit Details",
      "Ready to Reserve?": "Ready to Reserve?",
      "Secure this unit online now with a small deposit.": "Secure this unit online now with a small deposit.",
      "Reserve Now": "Reserve Now",
      "Pay Booking Fee": "Pay Booking Fee",
      "or": "or",
      "Need Help or More Info?": "Need Help or More Info?",
      "Talk to our property advisor for pricing, viewing, and guidance.": "Talk to our property advisor for pricing, viewing, and guidance.",
      "Your Property Advisor": "Your Property Advisor",
      "Trusted Advisor": "Trusted Advisor",
      "4.9 (38 reviews)": "4.9 (38 reviews)",
      "Request Callback": "Request Callback",
      "Your name": "Your name",
      "Mobile number": "Mobile number",
      "Email address": "Email address",
      "Submit Request": "Submit Request",
      "Advanced Filters": "Advanced Filters",
      "Project Name": "Project Name",
      "Enter project name": "Enter project name",
      "Developer": "Developer",
      "Select developer": "Select developer",
      "Property Status": "Property Status",
      "Select status": "Select status",
      "Price Range (AED)": "Price Range (AED)",
      "Area Range (sq ft)": "Area Range (sq ft)",
      "Min": "Min",
      "Max": "Max",
      "to": "to",
      "sq ft": "sq ft",
      "Delivery Year": "Delivery Year",
      "Select delivery year": "Select delivery year",
    },
  }

}


// en: {
//   translation: {
//     Language: "Language",
//     "English (UK)": "English (UK)",
//     "Farsi (Persian)": "Farsi (Persian)",
//     Home: "Home",
//     About: "About",
//     Contact: "Contact",
//     Exclusive: "Exclusive",
//     Latest: "Latest",
//     Blog: "Blog",
//     "Empowering": "Empowering",
//     "Elite Agents": "Elite Agents",
//     "#1 Real Estate Platform": "#1 Real Estate Platform",
//     "The premium property marketing platform that transforms how top real estate professionals connect with high-value clients and accelerate their success.": "The premium property marketing platform that transforms how top real estate professionals connect with high-value clients and accelerate their success.",
//     "Sahar Kalhor": "Sahar Kalhor",
//     "Your Trusted Off-Plan Expert in UAE.": "Your Trusted Off-Plan Expert in UAE.",
//     "Handpicked homes and investments — verified, valuable, and ready for you.": "Handpicked homes and investments — verified, valuable, and ready for you.",

//     "Your Next Home Starts Here": "Your Next Home Starts Here",
//     "Curated by Sahar, crafted for your future.": "Curated by Sahar, crafted for your future.",

//     "Dubai Marina": "Dubai Marina",
//     "Dubai Creek Harbour": "Dubai Creek Harbour",
//     "Ready": "Ready",
//     "Offplan": "Offplan",
//     "Pre launch": "Pre launch",
//     "Downtown Dubai": "Downtown Dubai",
//     "Palm Jumeirah": "Palm Jumeirah",
//     "Business Bay": "Business Bay",
//     "Jumeirah Lake Towers": "Jumeirah Lake Towers",
//     "Dubai Hills": "Dubai Hills",
//     "Al Barari": "Al Barari",
//     "Meydan": "Meydan",
//     "City Walk": "City Walk",
//     "DIFC": "DIFC",

//     "Load More Projects": "Load More Projects",
//     "remaining": "remaining",
//     "projects": "projects",
//     "More than just an agent — Sahar is your trusted advisor in navigating Dubai’s off-plan landscape. With deep industry knowledge and a passion for matching clients with the right properties, she brings clarity, confidence, and care to every deal.": "More than just an agent — Sahar is your trusted advisor in navigating Dubai’s off-plan landscape. With deep industry knowledge and a passion for matching clients with the right properties, she brings clarity, confidence, and care to every deal.",

//     "Business Deals": "Business Deals",
//     "Experience": "Experience",
//     "Call Now": "Call Now",
//     "Email": "Email",
//     "WhatsApp": "WhatsApp",
//     "Still haven’t found your dream home?": "Still haven’t found your dream home?",
//     "Search with more precision below — and remember, I’m Sahar and I’m here to help you every step of the way.": "Search with more precision below — and remember, I’m Sahar and I’m here to help you every step of the way.",

//     "Location": "Location",
//     "Property Type": "Property Type",
//     "Residential": "Residential",
//     "Commercial": "Commercial",
//     "Apartment": "Apartment",
//     "Villa": "Villa",
//     "Townhouse": "Townhouse",
//     "Penthouse": "Penthouse",
//     "Office": "Office",
//     "Shop": "Shop",
//     "Warehouse": "Warehouse",
//     "Price Range(AED)": "Price Range (AED)",
//     "Area Range(Square feet)": "Area Range (Square feet)",
//     "Bedrooms": "Bedrooms",
//     "Studio": "Studio",
//     "Bathrooms": "Bathrooms",
//     "Minimum": "Minimum",
//     "Maximum": "Maximum",
//     "Reset": "Reset",
//     "Show Properties": "Show Properties",
//     "Property Types": "Property Types",
//     "Luxury Apartments": "Luxury Apartments",
//     "Beachfront Villas": "Beachfront Villas",
//     "Penthouses": "Penthouses",
//     "Townhouses": "Townhouses",
//     "Commercial Spaces": "Commercial Spaces",
//     "Discover premium off-plan properties in Dubai. Your gateway to exclusive real estate investments.": "Discover premium off-plan properties in Dubai. Your gateway to exclusive real estate investments.",

//     "Send Inquiry": "Send Inquiry",
//     "Name": "Name",
//     "Mobile": "Mobile",
//     "Message": "Message",
//     "offplan market": "offplan market",
//     "All rights reserved": "All rights reserved",
//     "Your email address": "Your email address",
//     "Your mobile number": "Your mobile number",
//     "Your enquiry message": "Your enquiry message",
//     "About us": "About us",
//     "Latest projects": "Latest projects",
//     "Exclusive properties": "Exclusive properties",
//     "Quick Links": "Quick Links",
//     "Currently Online": "Currently Online",
//     "Top Performer": "Top Performer",

//     "Luxury": "Luxury",
//     "Premium": "Premium",
//     "Ultra Luxury": "Ultra Luxury",

//     "Dubai Creek Harbour Tower": "Dubai Creek Harbour Tower",
//     "Marina Bay Residences": "Marina Bay Residences",
//     "Downtown Elite": "Downtown Elite",
//     "Palm Jumeirah Villas": "Palm Jumeirah Villas",
//     "Business Bay Heights": "Business Bay Heights",
//     "JLT Crystal Tower": "JLT Crystal Tower",
//     "Dubai Hills Estate": "Dubai Hills Estate",
//     "Al Barari Gardens": "Al Barari Gardens",
//     "DIFC Gateway": "DIFC Gateway",
//     "Meydan Horizon": "Meydan Horizon",
//     "City Walk Apartments": "City Walk Apartments",
//     "The Opera District": "The Opera District",

//     "Good Morning": "Good Morning",
//     "Good Afternoon": "Good Afternoon",
//     "Good Evening": "Good Evening",
//     "Total Agents": "Total Agents",
//     "Total Leads": "Total Leads",
//     "Active Projects": "Active Projects",
//     "Manage Agents": "Manage Agents",
//     "Add Agent": "Add Agent",
//     "Username": "Username",
//     "Name": "Name",
//     "Email": "Email",
//     "Actions": "Actions",
//     "View Page": "View Page",
//     "Delete": "Delete",
//     "All Leads": "All Leads",
//     "Agent": "Agent",
//     "Date": "Date",
//     "Project": "Project",
//     "Phone": "Phone",
//     "Full Name": "Full Name",
//     "Password": "Password",
//     "Cancel": "Cancel",
//     "Enter username": "Enter username",
//     "Enter full name": "Enter full name",
//     "Enter email": "Enter email",
//     "Enter password": "Enter password",
//     "Demo Accounts": "Demo Accounts",
//     "Admin": "Admin",
//     "Back to Homepage": "Back to Homepage",
//     "Welcome Back": "Welcome Back",
//     "Enter your email": "Enter your email",
//     "Enter your password": "Enter your password",
//     "Signing In...": "Signing In...",
//     "Sign In": "Sign In",
//     "Empowering Agents": "Empowering Agents"
//   }
// },
// fa: {
//   translation: {
//     "Language": "زبان",
//     "English (UK)": "English (UK)",
//     "Farsi (Persian)": "فارسی",
//     "Home": "خانه",
//     "About": "درباره ما",
//     "Contact": "تماس با ما",
//     "Exclusive": "انحصاری",
//     "Latest": "جدیدترین",
//     "Blog": "وبلاگ",
//     "Empowering": "توانمندسازی",
//     "Elite Agents": "مشاوران برتر",
//     "#1 Real Estate Platform": "#1 پلتفرم برتر املاک",
//     "The premium property marketing platform that transforms how top real estate professionals connect with high-value clients and accelerate their success.": "پلتفرم بازاریابی املاک ممتاز که روش ارتباط حرفه‌ای‌های برتر حوزه املاک با مشتریان ارزشمند را متحول می‌کند و مسیر موفقیت آن‌ها را شتاب می‌بخشد.",
//     "Start Your Journey": "شروع سفر شما",
//     "Learn More": "بیشتر بدانید",
//     "Uptime": "زمان فعال بودن",
//     "Lightning Fast": "سرعت بسیار بالا",
//     "Enterprise Security": "امنیت سازمانی",
//     "Client Satisfaction": "رضایت مشتری",
//     "Qualified Leads": "سرنخ‌های واجد شرایط",
//     "Top Agents": "برترین مشاوران",
//     "Premium Properties": "املاک ممتاز",
//     "Ready to Start Your Real Estate Journey?": "آماده‌اید سفر املاک خود را شروع کنید؟",
//     "Connect with our expert agents and discover the best off-plan opportunities in the UAE": "با مشاوران متخصص ما ارتباط برقرار کنید و بهترین فرصت‌های پیش‌فروش در امارات را کشف کنید",
//     "Off Plan": "پیش‌فروش",
//     "Ready to Move": "آماده سکونت",
//     "to": "تا",
//     "Sahar Kalhor ": "سحر کلهر",
//     "Sahar Kalhor": "",
//     "Sahar": "سحر",
//     "Your Trusted Off-Plan Expert in UAE.": "سحر کلهر – همراه مطمئن شما در زمینه خرید املاک پیش‌فروش در امارات",
//     "Handpicked homes and investments — verified, valuable, and ready for you.": "منتخبی از بهترین خانه‌ها و فرصت‌های سرمایه‌گذاری، با دقت بررسی شده و آماده برای انتخاب",

//     "Your Next Home Starts Here": "خانه رویایی شما از اینجا آغاز می‌شود",
//     "Curated by Sahar, crafted for your future.": "با نگاهی دقیق و آینده‌نگرانه، انتخاب شده برای شما.",

//     "Dubai Marina": "دبی مارینا",
//     "Dubai Creek Harbour": "دبی کریک هاربر",
//     "Ready": "آماده تحویل",
//     "Offplan": "آف‌پلن (پیش‌فروش)",
//     "Pre launch": "قبل از پيش فروش",
//     "Downtown Dubai": "داون‌تاون دبی",
//     "Palm Jumeirah": "پالم جمیرا",
//     "Business Bay": "بیزینس بی",
//     "Jumeirah Lake Towers": "جميرا ليك تاورز ",
//     "Dubai Hills": "دبی هیلز",
//     "Al Barari": "البراری",
//     "Meydan": "میدان",
//     "City Walk": "سیتی واک",
//     "DIFC": "دی‌آی‌اف‌سی",

//     "Load More Projects": "نمایش پروژه‌های بیشتر",
//     "Showing": "نمایش",
//     "of": "از",
//     "remaining": "باقی‌مانده",
//     "projects": "پروژه‌ها",
//     "More than just an agent — Sahar is your trusted advisor in navigating Dubai’s off-plan landscape. With deep industry knowledge and a passion for matching clients with the right properties, she brings clarity, confidence, and care to every deal.": "بیش از یک مشاور — سحر راهنمای مورد اعتماد شما در مسیر پروژه‌های آف‌پلن دبی است. با دانشی عمیق از صنعت و اشتیاقی واقعی برای تطبیق ملک با نیاز شما، او با شفافیت، اطمینان و دلسوزی در هر معامله همراه شماست.",

//     "Business Deals": "معاملات تجاری",
//     "Experience": "تجربه",
//     "Years": "سال‌ها",
//     "Call Now": "تماس بگیرید",
//     "Email": "ایمیل",
//     "Email Us": "ایمیل بفرستید",
//     "WhatsApp": "واتساپ",
//     "Still haven’t found your dream home?": "هنوز خانه رویایی‌تان را پیدا نکرده‌اید؟",
//     "Search with more precision below — and remember, I’m Sahar and I’m here to help you every step of the way.": "در زیر با دقت بیشتری جستجو کنید — و به یاد داشته باشید، من سحر هستم و در هر قدم در کنارتان خواهم بود.",

//     "Location": "موقعیت مکانی",
//     "Property Type": "نوع ملک",
//     "Residential": "مسکونی",
//     "Commercial": "تجاری",
//     "Apartment": "آپارتمان",
//     "Villa": "ویلا",
//     "Townhouse": "تاون‌هاوس",
//     "Penthouse": "پنت‌هاوس",
//     "Office": "دفتر کار",
//     "Shop": "فروشگاه",
//     "Warehouse": "انبار",
//     "Studio": "استودیو",
//     "Price Range(AED)": "محدوده قیمت (درهم امارات)",
//     "AED": "درهم",
//     "Area Range(Square feet)": "محدوده متراژ (فوت مربع)",
//     "Studio": "استودیو",
//     "Bedrooms": "اتاق خواب‌ها",
//     "Bathrooms": "حمام‌ها",
//     "Search for a locality, area or city": "جستجو برای محله، منطقه یا شهر",
//     "Minimum": "حداقل",
//     "Maximum": "حداکثر",
//     "Reset": "بازنشانی",
//     "Show Properties": "نمایش املاک",
//     "Property Types": "انواع ملک",
//     "Luxury Apartments": "آپارتمان‌های لوکس",
//     "Beachfront Villas": "ویلاهای ساحلی",
//     "Penthouses": "پنت‌هاوس‌ها",
//     "Townhouses": "تاون‌هاوس‌ها",
//     "Commercial Spaces": "فضاهای تجاری",
//     "Discover premium off-plan properties in Dubai. Your gateway to exclusive real estate investments.": "کشف املاک آف‌پلن ممتاز در دبی. دروازه‌ای به سرمایه‌گذاری‌های انحصاری ملکی.",
//     "View Details": "مشاهده جزئیات",

//     "Send Inquiry": "ارسال درخواست",
//     "Name": "نام",
//     "Mobile": "موبایل",
//     "Message": "پیام",
//     "offplan market": "بازار آف‌پلن",
//     "All rights reserved": "تمامی حقوق محفوظ است",
//     "Your email address": "آدرس ایمیل شما",
//     "Your mobile number": "شماره موبایل شما",
//     "Your inquiry message": "پیام درخواست شما",
//     "About Us": "درباره ما",
//     "Latest Projects": "آخرین پروژه‌ها",
//     "Exclusive Properties": "املاک انحصاری",
//     "Quick Links": "لینک‌های سریع",
//     "Currently Online": "اکنون آنلاین",
//     "Top Performer": "کارگزار برتر",

//     "Luxury": "لوکس",
//     "Premium": "پریمیوم",
//     "Ultra Luxury": "فوق‌لوکس",

//     "Dubai Creek Harbour Tower": "برج دبی کریک هاربر",
//     "Marina Bay Residences": "مارینا بی رسیدنس",
//     "Downtown Elite": "داون‌تاون الیت",
//     "Palm Jumeirah Villas": "ویلاهای پالم جمیرا",
//     "Business Bay Heights": "ابیزینس بی هایتس ",
//     "JLT Crystal Tower": "ج ال تی کریستال تاور  ",
//     "Dubai Hills Estate": " دبی هیلزاستیت",
//     "Al Barari Gardens ": "البراری گاردنز",
//     "DIFC Gateway": "دي اي اف سي گیت وی ",
//     "Meydan Horizon": "ميدان هورايزون",
//     "City Walk Apartments": "آپارتمان‌های سیتی واک",
//     "The Opera District": "اوپرا ديستريكت",

//     "Good Morning": "صبح بخیر",
//     "Good Afternoon": "عصر بخیر",
//     "Good Evening": "شب بخیر",
//     "Total Agents": "تعداد کل مشاوران",
//     "Total Leads": "تعداد کل سرنخ‌ها",
//     "Active Projects": "پروژه‌های فعال",
//     "Manage Agents": "مدیریت مشاوران",
//     "Add Agent": "افزودن مشاور",
//     "Username": "نام کاربری",
//     "Name": "نام",
//     "Email": "ایمیل",
//     "Actions": "عملیات",
//     "View Page": "مشاهده صفحه",
//     "Delete": "حذف",
//     "All Leads": "همه سرنخ‌ها",
//     "Agent": "مشاور",
//     "Date": "تاریخ",
//     "Project": "پروژه",
//     "Phone": "تلفن",
//     "Full Name": "نام کامل",
//     "Password": "رمز عبور",
//     "Cancel": "لغو",
//     "Enter username": "نام کاربری را وارد کنید",
//     "Enter full name": "نام کامل را وارد کنید",
//     "Enter email": "ایمیل را وارد کنید",
//     "Enter password": "رمز عبور را وارد کنید",
//     "Demo Accounts": "حساب‌های آزمایشی",
//     "Admin": "مدیر",
//     "Back to Homepage": "بازگشت به صفحه اصلی",
//     "Welcome Back": "خوش برگشتی",
//     "Enter your email": "ایمیل خود را وارد کنید",
//     "Enter your password": "رمز عبور خود را وارد کنید",
//     "Signing In...": "در حال ورود...",
//     "Sign In": "ورود",
//     "Empowering Agents": "توانمندسازی مشاوران",

//     "You have ": "شما",
//     " hot leads waiting for follow-up and ": " سرنخ داغ برای پیگیری دارید و امروز ",
//     " site visits scheduled today.": " بازدید از سایت برنامه‌ریزی شده است.",

//     "Send Recommendation": "ارسال پیشنهاد",
//     "Smart Suggestion": "پیشنهاد هوشمند",
//     "View Matches": "مشاهده تطابق‌ها",
//     "WhatsApp Offer": "پیشنهاد واتساپ",
//     "AI Match": "تطابق هوش مصنوعی",
//     "Matching Clients": "مشتریان مطابقت‌یافته",
//     "Upcoming": "آینده",
//     "Price Range": "بازه قیمت",
//     "Unit Types": "انواع واحد",
//     "Launch": "راه‌اندازی",
//     "AI Project-to-Client Match Engine": "موتور تطابق پروژه با مشتری مبتنی بر هوش مصنوعی",
//     "View All Projects": "مشاهده همه پروژه‌ها",
//     "Smart recommendations based on client preferences and budget": "پیشنهادات هوشمند براساس ترجیحات مشتری و بودجه",
//     "Launching Soon": "به زودی راه‌اندازی می‌شود",
//     "Total Commission This Month": "کل کمیسیون این ماه",
//     "from last month": "از ماه گذشته",
//     "Pending": "در انتظار",
//     "Paid": "پرداخت‌شده",
//     "Amount": "مبلغ",
//     "Sale Price": "قیمت فروش",
//     "Commission": "کمیسیون",
//     "View All": "مشاهده همه",
//     "Commission & Deal Tracker": "ردیاب کمیسیون و معاملات",
//     "Hot": "داغ",
//     "Cold": "سرد",
//     "Warm": "گرم",
//     "Follow-up": "پیگیری",
//     "Add Lead": "افزودن سرنخ",
//     "Avg. Deal Size": "میانگین حجم معامله",
//     "Commission per deal": "کمیسیون هر معامله",
//     "Total Earned": "کل درآمد",
//     "Lifetime": "کل دوره",
//     "Pending Commission": "کمیسیون معوق",
//     "pending deals": "معاملات معوق",
//     "Paid Commission": "کمیسیون پرداخت‌شده",
//     "This year": "امسال",
//     "Last Inquiry": "آخرین استعلام",
//     "WhatsApp message": "پیام واتساپ",
//     "Closed Deals": "معاملات بسته‌شده",
//     "this month": "این ماه",
//     "this week": "این هفته",
//     "launching soon": "به زودی راه‌اندازی می‌شود",
//     "Smart Lead Management": "مدیریت هوشمند سرنخ",
//     "Interest": "علاقه",
//     "Channel": "کانال",
//     "Last Contact": "آخرین تماس",
//     "Note": "یادداشت",
//     "Available": "در دسترس",
//     "Offplan.Market helps users explore & invest in premium off-plan properties in Dubai. Trusted for transparency, smart search & expert support.": "Offplan.Market به کاربران کمک می‌کند تا در املاک پریمیوم پیش‌فروش در دبی کاوش و سرمایه‌گذاری کنند. مورد اعتماد برای شفافیت، جستجوی هوشمند و پشتیبانی تخصصی.",
//     "Projects": "پروژه‌ها",
//     "Areas & Communities": "مناطق و محله‌ها",
//     "Developers": "سازندگان",
//     "Compare": "مقایسه",
//     "FAQs": "سؤالات متداول",
//     "Contact Us": "تماس با ما",
//     "Off-plan Apartments": "آپارتمان‌های پیش‌فروش",
//     "JVC Townhouses": "تاون‌هاوس‌های JVC",
//     "Dubai Hills Villas": "ویلاهای دبی هیلز",
//     "Post-Handover Plans": "برنامه‌های پس از تحویل",
//     "Inquiry Form": "فرم استعلام",
//     "Your name": "نام شما",
//     "I agree to receive updates & alerts": "من موافقم که به‌روزرسانی‌ها و هشدارها را دریافت کنم",
//     "2025 Offplan.Market | Dubai’s Smart Off-Plan Property Platform | All rights reserved.": "2025 Offplan.Market | پلتفرم هوشمند املاک پیش‌فروش دبی | همه حقوق محفوظ است.",

//     "Your Global Gateway to": " دروازه جهانی شما به ",
//     "Off-Plan Properties": "املاک پیش‌فروش ",
//     "in the UAE": "در امارات متحده عربی",
//     "Connect with multilingual, verified agents — in your language and comfort zone. Experience the future of property investment with AI-powered matching.": "با مشاوران چندزبانه و تأییدشده به زبان و آسایش خود ارتباط برقرار کنید. آینده سرمایه‌گذاری ملکی را با تطبیق مبتنی بر هوش مصنوعی تجربه کنید.",
//     "Explore Projects": "جستجوی پروژه‌ها",
//     "Choose Your Agent": "انتخاب مشاور شما",
//     "List Your Project": "ثبت پروژه شما",
//     "users viewing projects now": " نفر در حال مشاهده پروژه‌ها هم‌اکنون ",
//     "new inquiries in": " درخواست جدید در ",
//     "Agents": "مشاوران",
//     "Trusted by the Most Respected Developers in the UAE": "مورد اعتماد معتبرترین توسعه‌دهندگان در امارات",
//     "Why Thousands Trust Us": "چرا هزاران نفر به ما اعتماد دارند",
//     "We've revolutionized the off-plan property market with transparency, technology, and trust.": "ما بازار املاک پیش‌فروش را با شفافیت، فناوری و اعتماد متحول کرده‌ایم.",
//     "Honest Advice, No Pressure": "مشاوره صادقانه، بدون فشار",
//     "Choose Your Own Agent Freely": "آزادی در انتخاب مشاور دلخواه",
//     "Real-time Developer-Synced Data": "داده‌های لحظه‌ای همگام با توسعه‌دهنده",
//     "Verified Agents Only": "فقط مشاوران تأییدشده",
//     "AI-Powered Property Matching": "تطبیق ملک با هوش مصنوعی",
//     "Multilingual Support": "پشتیبانی چندزبانه",
//     "Find Your Perfect Off-Plan Project": "پروژه پیش‌فروش ایده‌آل خود را بیابید",
//     "Use our smart search tool to discover projects that match your exact needs.": "از ابزار جستجوی هوشمند ما برای یافتن پروژه‌های متناسب با نیاز خود استفاده کنید.",
//     "Choose Location": "انتخاب موقعیت",
//     "Property Type": "نوع ملک",
//     "Budget Range": "محدوده بودجه",
//     "Quick Filters": "فیلترهای سریع",
//     "Updated Today": "به‌روزرسانی امروز",
//     "Launching Soon": "به‌زودی عرضه می‌شود",
//     "Search Projects": "جستجوی پروژه‌ها",
//     "Latest Projects Listed": "جدیدترین پروژه‌های فهرست‌شده",
//     "View Details": "مشاهده جزئیات",
//     "Top Rated Agents": "مشاوران برتر",
//     "Connect with verified, multilingual professionals who understand your needs.": "با مشاوران چندزبانه و تأییدشده‌ای که نیازهای شما را درک می‌کنند ارتباط بگیرید.",
//     "View All Agents": "مشاهده تمام مشاوران",
//     "How It Works": "نحوه عملکرد",
//     "Simple 3-step process to find and secure your perfect off-plan property.": "فرآیند ساده سه‌مرحله‌ای برای یافتن و خرید ملک پیش‌فروش ایده‌آل شما.",
//     "Explore Projects": "جستجوی پروژه‌ها",
//     "Browse through verified off-plan projects with real-time data and detailed information.": "از میان پروژه‌های تأییدشده پیش‌فروش با اطلاعات لحظه‌ای و جزئیات دقیق مرور کنید.",
//     "Choose Your Agent": "انتخاب مشاور شما",
//     "Select from our verified agents based on language, expertise, and customer reviews.": "از بین مشاوران تأییدشده ما براساس زبان، تخصص و نظرات مشتریان انتخاب کنید.",
//     "Secure Your Investment": "سرمایه‌گذاری خود را تضمین کنید",
//     "Get expert guidance through the entire process and secure your dream property.": "با راهنمایی تخصصی در تمام مراحل، ملک رؤیایی خود را تضمین کنید.",
//     "Agents: Build Your Brand with Us": "مشاوران: برند خود را با ما بسازید",
//     "Join the most advanced platform for real estate professionals.Grow your business with cutting-edge tools and verified leads": "به پیشرفته‌ترین پلتفرم برای مشاوران املاک بپیوندید. کسب‌وکار خود را با ابزارهای نوین و سرنخ‌های تأییدشده توسعه دهید.",
//     "Personal Agent Page": "صفحه اختصاصی مشاور",
//     "Get your own branded page under your name with full profile customization.": "صفحه‌ای اختصاصی با نام شما و امکان شخصی‌سازی کامل پروفایل داشته باشید.",
//     "Access to All Off-Plan Inventory": "دسترسی به تمام پروژه‌های پیش‌فروش",
//     "Complete database of verified off-plan projects across the UAE.": "پایگاه کامل پروژه‌های پیش‌فروش تأییدشده در سراسر امارات.",
//     "AI-Powered Leads": "سرنخ‌های هوشمند با هوش مصنوعی",
//     "Receive qualified leads matched to your expertise and language skills.": "سرنخ‌های واجد شرایط مطابق با تخصص و مهارت زبانی خود دریافت کنید.",
//     "Instantly Promote Developer Projects": "تبلیغ فوری پروژه‌های توسعه‌دهنده",
//     "Market new launches and exclusive projects to your network immediately.": "پروژه‌های جدید و انحصاری را فوراً به شبکه خود معرفی کنید.",
//     "Join as an Agent": "ثبت‌نام به‌عنوان مشاور",
//     "Already an agent?": "قبلاً مشاور هستید؟",
//     "Sign in here": "از اینجا وارد شوید"
//   }

// }

// };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, ArrowRight, CheckCircle2, Play, MessageCircle, Instagram, Music, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import ChatBot from "@/components/ChatBot";
import { countriesCities } from "@/data/countries";

type Language = "de" | "en" | "ar";
type Theme = "light" | "dark";

const translations = {
  de: {
    nav: {
      services: "Leistungen",
      routes: "Routen",
      process: "Ablauf",
      contact: "Kontakt",
      quote: "Angebot",
    },
    hero: {
      title: "Premium-Fahrzeugversand weltweit",
      subtitle: "Internationale Transportlösungen für hochwertige Fahrzeuge",
      cta: "Jetzt anfragen",
      description: "Container • RoRo • Luftfracht • Straßentransport",
    },
    services: {
      title: "Leistungen",
      subtitle: "Die passende Transportlösung für Ihr Fahrzeug",
      items: [
        {
          num: "01",
          title: "Container Shipping",
          desc: "Maximaler Schutz für hochwertige Fahrzeuge",
          features: ["Geschlossene Containerlösung", "Geeignet für hochwertige Fahrzeuge", "Export-Support"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/container-shipping-final-W2Tj3jWxGxiX5gQqQZMmwt.webp",
        },
        {
          num: "02",
          title: "RoRo Verschiffung",
          desc: "Effiziente Seefrachtoption",
          features: ["Für fahrbereite Fahrzeuge", "Verfügbarkeit je nach Route", "Kostenoptimiert"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/roro-shipping-final-EDy2jYPc9Y7WdgdaenVRx7.webp",
        },
        {
          num: "03",
          title: "Luftfracht",
          desc: "Schnellste Transportmethode",
          features: ["Für VIP-Transporte", "Zeitkritische Lieferungen", "Weltweit verfügbar"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/air-freight-5pYR3DYEdfkhmTZUtbmFvt.webp",
        },
        {
          num: "04",
          title: "Straßentransport",
          desc: "Abholung & Europa-Koordination",
          features: ["Deutschland & Europa", "Abholung bei Kunde", "Hafen-Verbindung"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/road-transport-ZYRsNfFZWAGwsVDrctukAY.webp",
        },
      ],
    },
    routes: {
      title: "Routen",
      subtitle: "Von Deutschland in die Welt",
      primary: "München / Deutschland → Dubai / VAE",
      other: "Weitere Ziele auf Anfrage",
    },
    process: {
      title: "Ablauf",
      subtitle: "Ein klarer Prozess für Ihren Fahrzeugversand",
      steps: [
        { num: "01", title: "Fahrzeugdetails", desc: "Modell, Zustand, Abholort, Zielort" },
        { num: "02", title: "Route prüfen", desc: "Passende Lösung je nach Fahrzeug" },
        { num: "03", title: "Angebot", desc: "Individuelles Angebot mit Schritten" },
        { num: "04", title: "Verladung", desc: "Abholung und Verladung koordiniert" },
        { num: "05", title: "Versand", desc: "Direkte Kommunikation bis Zielort" },
      ],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Senden Sie uns Fahrzeugdetails",
      name: "Ihr Name",
      vehicle: "z.B. BMW X5 2024",
      from: "z.B. München",
      to: "z.B. Dubai",
      method: "Transportart wählen",
      info: "Weitere Informationen...",
      send: "Per WhatsApp senden",
      phone: "+49 178 1838448",
    },
    testimonials: {
      title: "Kundenbewertungen",
      subtitle: "Das sagen unsere Kunden",
      items: [
        {
          name: "Luciano Costanzino",
          company: "Porsche-Besitzer",
          text: "Die Abholung eines neuen Porsche in Stuttgart, Deutschland, und der anschließende Transport nach Madrid, Spanien, durch SMS Car Shipping verliefen problemlos.",
          rating: 5,
          image: "/media/zogaj-porsche_f16ce7e9.png",
        },
        {
          name: "zogaj Arrnoft",
          company: "Mercedes-Besitzer",
          text: "Mein S 63 AMG E Performance wurde kürzlich per Luftfracht transportiert und alles lief perfekt ab. Ein erstklassiges Unternehmen, keine Komplikationen oder Probleme. Würde ihre Dienstleistungen gerne wieder in Anspruch nehmen!",
          rating: 5,
          image: "/media/fa-mercedes_1e30d319.png",
        },
        {
          name: "F A",
          company: "Local Guide",
          text: "Ausgezeichneter Service, unkompliziert, zugänglich und zuverlässig! Ich empfehle zu 100%!",
          rating: 5,
          image: "/media/luciano-landrover_37789426.png",
        },
      ],
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Antworten auf Ihre Fragen zum Fahrzeugversand",
      items: [
        {
          question: "Wie lange dauert der Versand?",
          answer: "Die Versanddauer hängt von der Entfernung und Transportmethode ab. Container-Versand dauert typischerweise 3-6 Wochen, RoRo 2-4 Wochen und Luftfracht 3-5 Tage.",
        },
        {
          question: "Welche Versicherung ist inbegriffen?",
          answer: "Alle unsere Transporte sind standardmäßig versichert. Wir bieten auch zusätzliche Versicherungsoptionen für hochwertige Fahrzeuge an.",
        },
        {
          question: "Welche Dokumente benötige ich?",
          answer: "Sie benötigen den Fahrzeugschein, einen gültigen Personalausweis und ggf. eine Exportgenehmigung. Wir unterstützen Sie bei allen Formalitäten.",
        },
        {
          question: "Kann ich mein Fahrzeug verfolgen?",
          answer: "Ja! Sie erhalten regelmäßige Updates über den Status Ihres Fahrzeugs. Bei Luftfracht erhalten Sie sogar Echtzeit-Tracking.",
        },
        {
          question: "Welche Länder können Sie beliefern?",
          answer: "Wir liefern weltweit. Fragen Sie uns für ein individuelles Angebot.",
        },
      ],
    },
    footer: {
      company: "SMS Car Shipping GmbH",
      tagline: "Premium-Fahrzeugversand weltweit",
      contact: "Kontakt",
      legal: "Rechtliches",
      impressum: "Impressum",
      privacy: "Datenschutz",
      rights: "© 2026 SMS Car Shipping GmbH. Alle Rechte vorbehalten.",
      newsletter: "Newsletter",
      newsletterTitle: "Bleiben Sie informiert",
      newsletterDesc: "Erhalten Sie die neuesten Updates und exklusive Angebote direkt in Ihren Posteingang.",
      newsletterPlaceholder: "Ihre E-Mail-Adresse",
      newsletterButton: "Anmelden",
      newsletterSuccess: "Danke! Sie sind jetzt angemeldet.",
      newsletterError: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    },
  },
  en: {
    nav: {
      services: "Services",
      routes: "Routes",
      process: "Process",
      contact: "Contact",
      quote: "Quote",
    },
    hero: {
      title: "Premium Vehicle Shipping Worldwide",
      subtitle: "International Transport Solutions for Luxury Vehicles",
      cta: "Get Quote",
      description: "Container • RoRo • Air Freight • Road Transport",
    },
    services: {
      title: "Services",
      subtitle: "The right transport solution for your vehicle",
      items: [
        {
          num: "01",
          title: "Container Shipping",
          desc: "Maximum protection for luxury vehicles",
          features: ["Closed container solution", "Suitable for luxury vehicles", "Export support"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/container-shipping-final-W2Tj3jWxGxiX5gQqQZMmwt.webp",
        },
        {
          num: "02",
          title: "RoRo Shipping",
          desc: "Efficient sea freight option",
          features: ["For drivable vehicles", "Route-dependent availability", "Cost-optimized"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/roro-shipping-final-EDy2jYPc9Y7WdgdaenVRx7.webp",
        },
        {
          num: "03",
          title: "Air Freight",
          desc: "Fastest transport method",
          features: ["For VIP transports", "Time-critical deliveries", "Worldwide available"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/air-freight-5pYR3DYEdfkhmTZUtbmFvt.webp",
        },
        {
          num: "04",
          title: "Road Transport",
          desc: "Pickup & European coordination",
          features: ["Germany & Europe", "Pickup at customer", "Port connection"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/road-transport-ZYRsNfFZWAGwsVDrctukAY.webp",
        },
      ],
    },
    routes: {
      title: "Routes",
      subtitle: "From Germany to the World",
      primary: "Munich / Germany → Dubai / UAE",
      other: "Other destinations on request",
    },
    process: {
      title: "Process",
      subtitle: "A clear process for your vehicle shipping",
      steps: [
        { num: "01", title: "Vehicle Details", desc: "Model, condition, pickup, destination" },
        { num: "02", title: "Check Route", desc: "Suitable solution for your vehicle" },
        { num: "03", title: "Quote", desc: "Individual quote with next steps" },
        { num: "04", title: "Loading", desc: "Pickup and loading coordinated" },
        { num: "05", title: "Shipping", desc: "Direct communication to destination" },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Send us your vehicle details",
      name: "Your Name",
      vehicle: "e.g. BMW X5 2024",
      from: "e.g. Munich",
      to: "e.g. Dubai",
      method: "Select transport method",
      info: "Additional information...",
      send: "Send via WhatsApp",
      phone: "+49 178 1838448",
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "What our satisfied customers say",
      items: [
        {
          name: "Luciano Costanzino",
          company: "Porsche Owner",
          text: "The pickup of a new Porsche in Stuttgart, Germany, and the subsequent transport to Madrid, Spain, by SMS Car Shipping went smoothly.",
          rating: 5,
          image: "/media/zogaj-porsche_f16ce7e9.png",
        },
        {
          name: "zogaj Arrnoft",
          company: "Mercedes Owner",
          text: "My S 63 AMG E Performance was recently transported by air freight and everything went perfectly. A top-notch company, no complications or problems. Would gladly use their services again!",
          rating: 5,
          image: "/media/fa-mercedes_1e30d319.png",
        },
        {
          name: "F A",
          company: "Local Guide",
          text: "Excellent service, uncomplicated, accessible and reliable! I recommend 100%!",
          rating: 5,
          image: "/media/luciano-landrover_37789426.png",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answers to your vehicle shipping questions",
      items: [
        {
          question: "How long does shipping take?",
          answer: "Shipping duration depends on distance and transport method. Container shipping typically takes 3-6 weeks, RoRo 2-4 weeks, and air freight 3-5 days.",
        },
        {
          question: "What insurance is included?",
          answer: "All our transports are standard insured. We also offer additional insurance options for luxury vehicles.",
        },
        {
          question: "What documents do I need?",
          answer: "You need the vehicle registration, valid ID, and possibly an export permit. We support you with all formalities.",
        },
        {
          question: "Can I track my vehicle?",
          answer: "Yes! You receive regular updates on your vehicle's status. With air freight, you even get real-time tracking.",
        },
        {
          question: "Which countries do you deliver to?",
          answer: "We deliver worldwide. Ask us for a custom quote.",
        },
      ],
    },
    footer: {
      company: "SMS Car Shipping GmbH",
      tagline: "Premium vehicle shipping worldwide",
      contact: "Contact",
      legal: "Legal",
      impressum: "Imprint",
      privacy: "Privacy",
      rights: "© 2026 SMS Car Shipping GmbH. All rights reserved.",
      newsletter: "Newsletter",
      newsletterTitle: "Stay Informed",
      newsletterDesc: "Get the latest updates and exclusive offers delivered to your inbox.",
      newsletterPlaceholder: "Your email address",
      newsletterButton: "Subscribe",
      newsletterSuccess: "Thank you! You are now subscribed.",
      newsletterError: "Please enter a valid email address.",
    },
  },
  ar: {
    nav: {
      services: "الخدمات",
      routes: "الطرق",
      process: "العملية",
      contact: "اتصل",
      quote: "عرض سعر",
    },
    hero: {
      title: "شحن المركبات الفاخرة عالمياً",
      subtitle: "حلول نقل دولية للمركبات الفاخرة",
      cta: "احصل على عرض سعر",
      description: "الحاويات • RoRo • الشحن الجوي • النقل البري",
    },
    services: {
      title: "الخدمات",
      subtitle: "الحل الصحيح لنقل مركبتك",
      items: [
        {
          num: "01",
          title: "شحن الحاويات",
          desc: "الحماية القصوى للمركبات الفاخرة",
          features: ["حل الحاوية المغلقة", "مناسب للمركبات الفاخرة", "دعم التصدير"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/container-shipping-final-W2Tj3jWxGxiX5gQqQZMmwt.webp",
        },
        {
          num: "02",
          title: "شحن RoRo",
          desc: "خيار الشحن البحري الفعال",
          features: ["للمركبات القابلة للقيادة", "التوفر حسب الطريق", "محسّن التكلفة"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/roro-shipping-final-EDy2jYPc9Y7WdgdaenVRx7.webp",
        },
        {
          num: "03",
          title: "الشحن الجوي",
          desc: "أسرع طريقة نقل",
          features: ["لنقل VIP", "التسليم في الوقت المحدد", "متاح عالمياً"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/air-freight-5pYR3DYEdfkhmTZUtbmFvt.webp",
        },
        {
          num: "04",
          title: "النقل البري",
          desc: "الاستلام والتنسيق الأوروبي",
          features: ["ألمانيا وأوروبا", "الاستلام من العميل", "اتصال الميناء"],
          image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505557323/9DoJgJ4uEGKZgJJaZ9nx5u/road-transport-ZYRsNfFZWAGwsVDrctukAY.webp",
        },
      ],
    },
    routes: {
      title: "الطرق",
      subtitle: "من ألمانيا إلى العالم",
      primary: "ميونيخ / ألمانيا → دبي / الإمارات",
      other: "وجهات أخرى حسب الطلب",
    },
    process: {
      title: "العملية",
      subtitle: "عملية واضحة لشحن مركبتك",
      steps: [
        { num: "01", title: "تفاصيل المركبة", desc: "الموديل والحالة والاستلام والوجهة" },
        { num: "02", title: "التحقق من الطريق", desc: "الحل المناسب لمركبتك" },
        { num: "03", title: "عرض السعر", desc: "عرض سعر فردي مع الخطوات التالية" },
        { num: "04", title: "التحميل", desc: "الاستلام والتحميل المنسق" },
        { num: "05", title: "الشحن", desc: "التواصل المباشر إلى الوجهة" },
      ],
    },
    contact: {
      title: "اتصل",
      subtitle: "أرسل لنا تفاصيل مركبتك",
      name: "اسمك",
      vehicle: "مثال: BMW X5 2024",
      from: "مثال: ميونيخ",
      to: "مثال: دبي",
      method: "اختر طريقة النقل",
      info: "معلومات إضافية...",
      send: "أرسل عبر WhatsApp",
      phone: "+49 178 1838448",
    },
    testimonials: {
      title: "آراء العملاء",
      subtitle: "ما يقوله عملاؤنا الراضون",
      items: [
        {
          name: "لوتشيانو كوستانزينو",
          company: "مالك بورش",
          text: "تمت عملية الاستلام من بورش جديدة في شتوتغارت بألمانيا والنقل اللاحق إلى مدريد بإسبانيا بواسطة SMS Car Shipping بسلاسة تامة.",
          rating: 5,
          image: "/media/zogaj-porsche_f16ce7e9.png",
        },
        {
          name: "زوجاج أرنوفت",
          company: "مالك مرسيدس",
          text: "تم نقل سيارتي S 63 AMG E Performance مؤخراً بالشحن الجوي وسارت كل شيء بشكل مثالي. شركة من الدرجة الأولى، بدون مضاعفات أو مشاكل. سأستخدم خدماتهم مرة أخرى بكل سرور!",
          rating: 5,
          image: "/media/fa-mercedes_1e30d319.png",
        },
        {
          name: "ف أ",
          company: "دليل محلي",
          text: "خدمة ممتازة وبسيطة وسهلة الوصول وموثوقة! أوصي بنسبة 100%!",
          rating: 5,
          image: "/media/luciano-landrover_37789426.png",
        },
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "إجابات على أسئلتك حول شحن المركبات",
      items: [
        {
          question: "كم من الوقت يستغرق الشحن؟",
          answer: "تعتمد مدة الشحن على المسافة وطريقة النقل. يستغرق شحن الحاويات عادة 3-6 أسابيع، وRoRo 2-4 أسابيع، والشحن الجوي 3-5 أيام.",
        },
        {
          question: "ما التأمين المشمول؟",
          answer: "جميع عمليات النقل لدينا مؤمنة بشكل قياسي. نقدم أيضاً خيارات تأمين إضافية للمركبات الفاخرة.",
        },
        {
          question: "ما المستندات التي أحتاجها؟",
          answer: "تحتاج إلى تسجيل المركبة وهويتك الصحيحة وربما تصريح التصدير. نساعدك في جميع الإجراءات الرسمية.",
        },
        {
          question: "هل يمكنني تتبع مركبتي؟",
          answer: "نعم! تتلقى تحديثات منتظمة عن حالة مركبتك. مع الشحن الجوي، تحصل حتى على تتبع فوري.",
        },
        {
          question: "ما الدول التي تشحنون إليها؟",
          answer: "نشحن في جميع أنحاء العالم. اطلب عرض سعر مخصص.",
        },
      ],
    },
    footer: {
      company: "SMS Car Shipping GmbH",
      tagline: "شحن المركبات الفاخرة عالمياً",
      contact: "اتصل",
      legal: "قانوني",
      impressum: "بيان قانوني",
      privacy: "الخصوصية",
      rights: "© 2026 SMS Car Shipping GmbH. جميع الحقوق محفوظة.",
      newsletter: "النشرة الإخبارية",
      newsletterTitle: "ابقَ على اطلاع",
      newsletterDesc: "احصل على أحدث التحديثات والعروض الحصرية مباشرة في بريدك الإلكتروني.",
      newsletterPlaceholder: "عنوان بريدك الإلكتروني",
      newsletterButton: "اشترك",
      newsletterSuccess: "شكراً! أنت مشترك الآن.",
      newsletterError: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("de");
  const [theme, setTheme] = useState<Theme>("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    vehicle: "",
    fromCountry: "",
    fromCity: "",
    toCountry: "",
    toCity: "",
    method: "",
    info: "",
  });

  const countries = countriesCities;

  const t = translations[language];

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "fromCountry") {
      setFormData((prev) => ({ ...prev, fromCountry: value, fromCity: "" }));
    } else if (name === "toCountry") {
      setFormData((prev) => ({ ...prev, toCountry: value, toCity: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Name: ${formData.name}\nFahrzeug: ${formData.vehicle}\nVon: ${formData.fromCountry}, ${formData.fromCity}\nNach: ${formData.toCountry}, ${formData.toCity}\nTransportart: ${formData.method}\nInfo: ${formData.info}`;
    const whatsappUrl = `https://wa.me/491781838448?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };



  const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const isExpanded = expandedFAQ === question;
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all">
        <button
          onClick={() => setExpandedFAQ(isExpanded ? null : question)}
          className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">{question}</h3>
          <ChevronDown className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/media/sms-logo_53fa3042.jpg" alt="SMS Car Shipping" className="h-12 w-auto" />
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white">sms-carshipping gmbh</h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.services}
              </a>
              <a href="#routes" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.routes}
              </a>
              <a href="#process" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.process}
              </a>
              <a href="#contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.contact}
              </a>
            </div>
          </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.services}
              </a>
              <a href="#routes" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.routes}
              </a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.process}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                {t.nav.contact}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {t.nav.quote}
                </Button>
              </a>
            </div>
          </div>
        )}

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              {(["de", "en", "ar"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-sm font-medium rounded transition ${
                    language === lang
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <a href="#contact" className="hidden md:inline-flex">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                {t.nav.quote}
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cinematic with Video */}
      <section className="relative w-full min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 overflow-hidden flex items-center justify-center bg-black/80">
        {/* Background Video with Overlay - Mobile Version */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover sm:object-contain z-0 md:hidden"
        >
          <source src="/media/SMS_REAL_LOOP_412fd30a.mp4" type="video/mp4" />
        </video>
        
        {/* Background Video with Overlay - Desktop Version */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover sm:object-contain z-0 hidden md:block"
        >
          <source src="/media/SMS_REAL_LOOP_desktop_3c7bf874.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg">
              {t.hero.title}
            </h1>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-md">
              {t.hero.subtitle}
            </p>
            <p className="text-xs sm:text-sm md:text-lg text-gray-200 mb-6 sm:mb-8 md:mb-12 drop-shadow-md">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center">
              <a href="#contact">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  {t.hero.cta} <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </a>
              <a href="https://wa.me/491781838448" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="text-xs sm:text-sm md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 bg-white/20 border-white text-white hover:bg-white/30 shadow-lg">
                  {t.nav.contact}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.services.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.services.items.map((service, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-5xl font-bold text-white">{service.num}</div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section id="routes" className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.routes.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.routes.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-4">{t.routes.primary}</h3>
              <p className="text-blue-100 mb-6">Premium-Route für hochwertige Fahrzeuge und internationale Exportkunden.</p>
              <div className="flex flex-wrap gap-2">
                {["Container", "RoRo", "Luftfracht", "Straßentransport"].map((m) => (
                  <span key={m} className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.routes.other}</h3>
              <ul className="space-y-3">
                {["Ägypten", "Westafrika", "Saudi-Arabien", "Naher Osten", "Weltweit"].map((dest) => (
                  <li key={dest} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group">
                    <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="group-hover:translate-x-2 transition-transform">Deutschland → {dest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.process.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.process.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {t.process.steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">{step.num}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-300 dark:text-blue-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {testimonial.image && (
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</p>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={`star-${testimonial.name}-${i}`} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.contact.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.contact.subtitle}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 transform hover:shadow-2xl transition-shadow">
            <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kontaktieren Sie uns direkt:</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>SMS Car Shipping GmbH</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Mühldorfer Str. 26, 85661 Forstinning, Deutschland
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> <a href="mailto:info@sms-carshipping.com" className="text-blue-600 dark:text-blue-400 hover:underline">info@sms-carshipping.com</a>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Telefon:</strong> <a href="tel:+491781838448" className="text-blue-600 dark:text-blue-400 hover:underline">+49 178 1838448</a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Geschäftsführer:</strong> Mike Songhorzadeh
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t.contact.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
                <input
                  type="text"
                  name="vehicle"
                  placeholder="z.B. Mercedes G 63 AMG"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="fromCountry"
                  value={formData.fromCountry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                  <option value="">Land wählen</option>
                  {Object.keys(countries).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <select
                  name="fromCity"
                  value={formData.fromCity}
                  onChange={handleInputChange}
                  disabled={!formData.fromCountry}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition disabled:opacity-50"
                >
                  <option value="">Stadt wählen</option>
                  {formData.fromCountry && countries[formData.fromCountry]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="toCountry"
                  value={formData.toCountry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                  <option value="">Land wählen</option>
                  {Object.keys(countries).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <select
                  name="toCity"
                  value={formData.toCity}
                  onChange={handleInputChange}
                  disabled={!formData.toCountry}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition disabled:opacity-50"
                >
                  <option value="">Stadt wählen</option>
                  {formData.toCountry && countries[formData.toCountry]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <select
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              >
                <option value="">{t.contact.method}</option>
                <option value="Container">Container</option>
                <option value="RoRo">RoRo</option>
                <option value="Luftfracht">Luftfracht</option>
                <option value="Straßentransport">Straßentransport</option>
              </select>

              <textarea
                name="info"
                placeholder={t.contact.info}
                value={formData.info}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              ></textarea>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                {t.contact.send}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Worldwide Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Weltweit erreichbar</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Wir liefern Fahrzeuge in über 150 Länder weltweit</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 font-semibold">SMS Car Shipping GmbH • Mühldorfer Str. 26 • 85661 Forstinning • Deutschland</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.854296!2d11.833100!3d48.228100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sSMS%20Car%20Shipping%20GmbH!2sMühldorfer%20Str.%2026%2C%2085661%20Forstinning%2C%20Deutschland!5e0!3m2!1sde!2sde!4v1716873600000"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Globale Reichweite</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SMS Car Shipping bietet internationalen Fahrzeugversand in über 150 Länder weltweit. Von Europa bis zum Nahen Osten, von Afrika bis Asien - wir sind Ihr zuverlässiger Partner für sichere und pünktliche Lieferungen.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Container & RoRo:</strong> Für große Mengen und schwere Fahrzeuge</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Luftfracht:</strong> Für schnelle internationale Lieferungen</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Straßentransport:</strong> Flexible und kostengünstige Optionen</p>
                </div>
              </div>

              <a href="#contact" className="inline-block mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105">
                Jetzt anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.faq.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.faq.subtitle}</p>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">{t.footer.company}</h3>
              <p className="text-sm">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t.footer.contact}</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email:</p>
                  <a href="mailto:info@sms-carshipping.com" className="text-sm hover:text-white transition break-all">
                    info@sms-carshipping.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Telefon:</p>
                  <a href="tel:+491781838448" className="text-sm hover:text-white transition">
                    {t.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">CEO:</p>
                  <p className="text-sm">Mike Songhorzadeh</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/impressum" className="hover:text-white transition">{t.footer.impressum}</a></li>
                <li><a href="/privacy" className="hover:text-white transition">{t.footer.privacy}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>{t.footer.rights}</p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://wa.me/491781838448"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 hover:scale-110 transition-all transform shadow-lg hover:shadow-xl rounded-2xl overflow-hidden"
              title="WhatsApp"
            >
              <img src="/media/IMG_8772_db95b680.PNG" alt="WhatsApp" className="w-full h-full object-cover" />
            </a>
            <a
              href="https://www.instagram.com/sms_carshipping/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 hover:scale-110 transition-all transform shadow-lg hover:shadow-xl rounded-2xl overflow-hidden"
              title="Instagram"
            >
              <img src="/media/0cH7MGya3vxO_d9fd91f7.jpg" alt="Instagram" className="w-full h-full object-cover" />
            </a>
            <a
              href="https://www.tiktok.com/@sms.car.shipping"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 hover:scale-110 transition-all transform shadow-lg hover:shadow-xl rounded-2xl overflow-hidden"
              title="TikTok"
            >
              <img src="/media/IMG_8773_53ebb12f.PNG" alt="TikTok" className="w-full h-full object-cover" />
            </a>
          </div>
        </div>
      </footer>

      {/* ChatBot on Left Side */}
      <ChatBot language={language as 'de' | 'en' | 'ar'} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/491781838448"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 inline-flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all transform hover:scale-110 animate-pulse-glow overflow-hidden"
        title="WhatsApp Chat"
      >
        <img src="/media/IMG_8772_db95b680.PNG" alt="WhatsApp" className="w-full h-full object-cover" />
      </a>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  );
}

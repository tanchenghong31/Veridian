/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Maximize, 
  MapPin, 
  Bed, 
  Waves, 
  Trees, 
  Layout, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Phone, 
  Mail, 
  User, 
  Building2,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Japandi Palette
const colors = {
  stone: '#F5F5F4',
  walnut: '#44403C',
  sage: '#A8A29E',
  gold: '#D4AF37',
};

// Types for Page Content
interface PageContent {
  hero: {
    headline: string;
    subheadline: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
  atAGlance: {
    items: { icon: string; label: string; sub: string }[];
  };
  vibe: {
    title: string;
    cards: { title: string; desc: string; img: string }[];
  };
  units: {
    title: string;
    subtitle: string;
    types: { id: string; name: string; size: string; rooms: string; features: string[]; image: string }[];
  };
  facilities: {
    title: string;
    description: string;
    items: { name: string; icon: string }[];
    images: { url: string; alt: string }[];
  };
  location: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
    mapImage: string;
    amenities: { category: string; list: { name: string; distance: string }[] }[];
  };
  footer: {
    description: string;
    phone: string;
    email: string;
    copyright: string;
  };
}

const initialContent: PageContent = {
  hero: {
    headline: "Veridian Residence",
    subheadline: "New Launch in PJ from RM5xxk. Located between Bandar Sunway and Bangsar, with easy access to NPE and Federal Highway.",
    image: "https://lh3.googleusercontent.com/d/1nLxHKcnDLYeWRtPV4N5IHcvNlbwpzaw7",
    ctaText: "Register Interest",
    ctaLink: "https://wa.link/o1m0cf",
  },
  atAGlance: {
    items: [
      { icon: "Bed", label: "3-4 Bedrooms", sub: "Spacious Living" },
      { icon: "Maximize", label: "947-1,302 sq.ft", sub: "Versatile Space" },
      { icon: "Layout", label: "Dual-Key Ready", sub: "Multi-Gen & Rental Flexibility" },
      { icon: "MapPin", label: "3km to Sunway", sub: "Prime Connectivity" },
    ],
  },
  vibe: {
    title: "The Veridian Vibe",
    cards: [
      { title: "Vibrant Community", desc: "Experience a well-planned project in PJ designed for modern living, where residents enjoy a connected lifestyle within a growing Petang Jaya neighbourhood.", img: "https://lh3.googleusercontent.com/d/12PtOA89N21NzDymXLDZf4_iTQ4E6is_K" },
      { title: "Versatile Layouts", desc: "Explore flexible Veridian layouts ranging from practical family units to dual-key options, offering efficient space planning and ideal configurations for both own stay and investment.", img: "https://lh3.googleusercontent.com/d/1ArfzaPAMnR5upAQHzxlm_roSpxhBkQXT" },
      { title: "Zen Aesthetics", desc: "Designed with calming Japandi-inspired interiors, each unit features well-balanced Veridian size layouts that maximise space, natural light, and everyday comfort.", img: "https://fastly.picsum.photos/id/625/2507/1674.jpg?hmac=ZuCWygmEqFbv5q0hlD-jimDTtYWRwgAebHLepuXaUUk" },
    ],
  },
  units: {
    title: "Unit Types",
    subtitle: "Find your perfect space",
    types: [
      { id: 'A', name: 'Type A', size: '947 sq.ft.', rooms: '3 Bedrooms', features: ['No Versatile Room', 'Standard Layout'], image: 'https://lh3.googleusercontent.com/d/1g-P1SfogqTL_Kn3oUJb5ZY6deDKmzOlr' },
      { id: 'A1', name: 'Type A1', size: '1,098 sq.ft.', rooms: '3 Bedrooms + 1 Versatile Room', features: ['Standard Layout'], image: 'https://lh3.googleusercontent.com/d/1SEXnyJ9qDwvtMv5v7bJFsy3CNagrwmD2' },
      { id: 'B', name: 'Type B', size: '1,055 sq.ft.', rooms: '3 Bedrooms', features: ['Standard Layout'], image: 'https://lh3.googleusercontent.com/d/1UvSRPcmAUCb7r_fu-iUQsFaOS6fST2I7' },
      { id: 'B1', name: 'Type B1', size: '1,206 sq.ft.', rooms: '3 Bedrooms + 1 Versatile Room', features: ['Standard Layout'], image: 'https://lh3.googleusercontent.com/d/1nIQmQBH_2B2QTccESsVPM68TnkU2oRWV' },
      { id: 'B2', name: 'Type B2', size: '1,055 sq.ft.', rooms: '3 Bedrooms', features: ['Dual Key Layout'], image: 'https://lh3.googleusercontent.com/d/1dsj_FkVCB_YkMdI37uHRuQeBT7mJ46HO' },
      { id: 'C', name: 'Type C', size: '1,195 sq.ft.', rooms: '3 Bedrooms + 1 Versatile Room', features: ['Dual Key Layout'], image: 'https://lh3.googleusercontent.com/d/1kSL2aqbIltDDL9LcIUAp9M9KwTA8xCfU' },
      { id: 'C1', name: 'Type C1', size: '1,302 sq.ft.', rooms: '4 Bedrooms + 1 Versatile Room', features: ['Dual Key Layout'], image: 'https://lh3.googleusercontent.com/d/1YcVlpMqsuynSy3t2DxVMhbEfdQbuFn0v' },
    ],
  },
  facilities: {
    title: "4-Acre Sky Deck",
    description: "Elevate your lifestyle with 57 curated Veridian facilities designed for wellness, productivity, and leisure. From our Olympic-length lap pool to modern co-working spaces, every detail is crafted for your comfort.",
    items: [
      { name: 'Lap Pool', icon: 'Waves' },
      { name: 'Co-working Space', icon: 'Building2' },
      { name: 'Sky Deck', icon: 'Trees' },
      { name: 'Gymnasium', icon: 'Maximize' },
      { name: 'Zen Garden', icon: 'Trees' },
      { name: 'Children Playground', icon: 'Home' },
    ],
    images: [
      { url: 'https://lh3.googleusercontent.com/d/15tcPFACAYhGmTFwhfslVDZo1XzYIgdgM', alt: 'olympic lap pool' },
      { url: 'https://lh3.googleusercontent.com/d/15pA2rrkEbDLBCQ0rZXY1kRMvqU5z7S8M', alt: 'veridian residence gym' },
      { url: 'https://lh3.googleusercontent.com/d/1xAqVeh6qHm5sF2QtBBQj86igh1a2QvCz', alt: 'co working space' },
      { url: 'https://lh3.googleusercontent.com/d/1titCzBuZ_2VlPcdM2t-8pCQOPr4cOXZx', alt: 'function room' },
      { url: 'https://lh3.googleusercontent.com/d/101O9N134iQvhI4bs5OyYoOR2VwDsFyhx', alt: 'community square' },
      { url: 'https://lh3.googleusercontent.com/d/1XFpsqskuWX6GgMuqhNtfUmqOz6myh-jH', alt: 'skylit cinema' },
      { url: 'https://lh3.googleusercontent.com/d/1_cVLaRpxHRaIDIN5Q2RUQ_Gt1pfwVqlk', alt: 'pickle ball court' },
      { url: 'https://lh3.googleusercontent.com/d/1bMN6rSRSCoxZse2NLA-VaKsMmsbwSWgj', alt: 'zen garden' },
      { url: 'https://lh3.googleusercontent.com/d/1vaI8EFeU-rFKGy1sEKrdaIWB0EG-HOT9', alt: 'indoor zen' },
      { url: 'https://lh3.googleusercontent.com/d/1UDp1RzVPJ27AIaqg06uQeTMFlZ1ecqQx', alt: 'grand entrance' },
      { url: 'https://lh3.googleusercontent.com/d/1nLxHKcnDLYeWRtPV4N5IHcvNlbwpzaw7', alt: 'facade' },
    ],
  },
  location: {
    title: "Veridian Connectivity",
    subtitle: "Heart of PJ South",
    items: [
      { title: "Highways", desc: "Seamless access to NPE, Federal Highway, and KESAS." },
      { title: "Public Transport", desc: "Only 500m to KTM Seri Setia for easy city commuting." },
      { title: "Shopping", desc: "A quick 3km drive to Sunway Pyramid and Sunway Lagoon." },
    ],
    mapImage: "https://lh3.googleusercontent.com/d/1LH81nwjfTTSAXWQOoeUjCFs2vnw98C_7",
    amenities: [
      {
        category: "Shopping Malls",
        list: [
          { name: "Sunway Pyramid", distance: "3.0 km" },
          { name: "NU Empire", distance: "5.0 km" },
        ]
      },
      {
        category: "Healthcare",
        list: [
          { name: "Sunway Medical Centre", distance: "4.3 km" },
          { name: "Sime Darby Medical Centre", distance: "5.0 km" },
          { name: "Assunta Hospital", distance: "6.1 km" },
        ]
      },
      {
        category: "Educational Institutions",
        list: [
          { name: "The One Academy", distance: "3.0 km" },
          { name: "Sunway University", distance: "4.1 km" },
          { name: "Taylor’s University & College", distance: "4.2 km" },
          { name: "Monash University", distance: "4.5 km" },
          { name: "INTI International College", distance: "5.2 km" },
        ]
      },
      {
        category: "Recreational & Theme Park",
        list: [
          { name: "Sunway Lagoon Theme Park", distance: "3.3 km" },
          { name: "Subang National Golf Club", distance: "5.4 km" },
          { name: "Subang Ria Recreational Park", distance: "6.0 km" },
        ]
      }
    ]
  },
  footer: {
    description: "Veridian Residence is a modern project in PJ, located between Bandar Sunway and Bangsar with easy access to NPE and Federal Highway.\n\nThe development features efficient Veridian layouts with sizes ranging from 947 to 1,302 sq.ft., offering 3 to 4-bedroom units, including selected dual-key options.\n\nWith a strong Veridian location, residents enjoy close proximity to Sunway Pyramid, medical centres, and top universities — making it ideal for both own stay and investment.",
    phone: "+6011 6959 2585",
    email: "",
    copyright: "© 2026 Veridian Residence. All rights reserved. | Developed for PJ South Excellence.",
  },
};

const IconMap: Record<string, React.ReactNode> = {
  Bed: <Bed className="w-8 h-8" />,
  Maximize: <Maximize className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  MapPin: <MapPin className="w-8 h-8" />,
  Waves: <Waves className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Trees: <Trees className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
};

export default function App() {
  const content = initialContent;

  const [activeUnit, setActiveUnit] = useState(0);
  const [activeFacility, setActiveFacility] = useState(0);
  const [activeLocationCategory, setActiveLocationCategory] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedLayoutImage, setSelectedLayoutImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextUnit = () => setActiveUnit((prev) => (prev + 1) % content.units.types.length);
  const prevUnit = () => setActiveUnit((prev) => (prev - 1 + content.units.types.length) % content.units.types.length);

  const nextFacility = () => setActiveFacility((prev) => (prev + 1) % content.facilities.images.length);
  const prevFacility = () => setActiveFacility((prev) => (prev - 1 + content.facilities.images.length) % content.facilities.images.length);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#D4AF37]/30" style={{ backgroundColor: colors.stone, color: colors.walnut }}>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${
          isScrolled || isMenuOpen ? 'bg-white shadow-sm text-stone-900' : 'bg-transparent text-white'
        } ${isVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="cursor-pointer flex items-center" onClick={() => scrollToSection('hero')}>
          <img 
            src="https://lh3.googleusercontent.com/d/18bKR9B-xw5LfHXWi6_obPW1ER-80VtKH" 
            alt="veridianpjlogo" 
            className={`h-8 md:h-10 transition-all duration-300 ${isScrolled || isMenuOpen ? 'brightness-0' : 'brightness-0 invert'}`}
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wider">
          {[
            { name: 'Details', id: 'vibe' },
            { name: 'Units', id: 'units' },
            { name: 'Facilities', id: 'facilities' },
            { name: 'Actual View', id: 'vr' },
            { name: 'Location', id: 'location' },
            { name: 'Contact Us', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a 
            href={content.hero.ctaLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block bg-[#D4AF37] text-white px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-[#D4AF37]/20 transition-all hover:-translate-y-0.5"
          >
            Register Now
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl z-50 p-10 flex flex-col"
              >
              <div className="flex justify-between items-center mb-12">
                <img 
                  src="https://lh3.googleusercontent.com/d/18bKR9B-xw5LfHXWi6_obPW1ER-80VtKH" 
                  alt="veridianpjlogo" 
                  className="h-8 brightness-0"
                  referrerPolicy="no-referrer"
                />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-8">
                {[
                  { name: 'Details', id: 'vibe' },
                  { name: 'Units', id: 'units' },
                  { name: 'Facilities', id: 'facilities' },
                  { name: 'Actual View', id: 'vr' },
                  { name: 'Location', id: 'location' },
                  { name: 'Contact Us', id: 'contact' }
                ].map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="text-2xl font-serif text-left hover:text-[#D4AF37] transition-colors border-b border-stone-100 pb-4"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="mt-auto pt-10">
                <a 
                  href={content.hero.ctaLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full block bg-[#D4AF37] text-white text-center py-4 rounded-sm font-bold uppercase tracking-widest shadow-lg"
                >
                  Register Now
                </a>
                <div className="mt-8 flex justify-center space-x-6 text-stone-400">
                  <a href={`tel:${content.footer.phone}`} className="hover:text-[#D4AF37] transition-colors">
                    <Phone className="w-5 h-5" />
                  </a>
                  {content.footer.email && (
                    <a href={`mailto:${content.footer.email}`} className="hover:text-[#D4AF37] transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={content.hero.image} 
              alt="Veridian Residence Facade" 
              className="w-full h-full object-right md:object-center object-cover brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <motion.h1 
              key={content.hero.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
            >
              {content.hero.headline}
            </motion.h1>
            <motion.p 
              key={content.hero.subheadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-10 font-light tracking-wide max-w-2xl mx-auto"
            >
              {content.hero.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a 
                href={content.hero.ctaLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#D4AF37] text-white px-10 py-4 rounded-sm text-lg font-bold uppercase tracking-widest shadow-2xl hover:bg-[#c4a132] transition-all"
              >
                <span>{content.hero.ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* At a Glance */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {content.atAGlance.items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="text-[#A8A29E] mb-4">{IconMap[item.icon]}</div>
                <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                <p className="text-sm text-[#A8A29E] uppercase tracking-tighter">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Vibe */}
        <section id="vibe" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-serif mb-4"
              >
                {content.vibe.title}
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-1 bg-[#D4AF37] mx-auto"
              ></motion.div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {content.vibe.cards.map((card, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-sm shadow-sm border border-stone-100"
                >
                  <img src={card.img} alt={card.title} className="w-full h-64 object-cover mb-6 rounded-sm" referrerPolicy="no-referrer" />
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-[#A8A29E] leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Unit Types Carousel */}
        <section id="units" className="py-24 px-6 bg-[#44403C] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl font-serif mb-4"
                >
                  {content.units.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/60 uppercase tracking-widest text-sm mb-8"
                >
                  {content.units.subtitle}
                </motion.p>
                
                {/* Visual Tabs */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {content.units.types.map((type, idx) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveUnit(idx)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all border ${
                        activeUnit === idx 
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-white' 
                          : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {type.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 mt-8 md:mt-0">
                <button onClick={prevUnit} className="p-3 border border-white/20 hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextUnit} className="p-3 border border-white/20 hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[400px] md:min-h-[600px] md:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeUnit}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-12 h-full items-center"
                >
                  <div className="order-1 md:order-1 text-center md:text-left md:pl-20">
                    <span className="text-[#D4AF37] font-bold text-5xl mb-4 block">{content.units.types[activeUnit].id}</span>
                    <h3 className="text-3xl font-serif mb-2">{content.units.types[activeUnit].name}</h3>
                    <p className="text-xl text-white/80 mb-6">{content.units.types[activeUnit].size} • {content.units.types[activeUnit].rooms}</p>
                    <div className="flex flex-col items-center md:items-start">
                      <ul className="space-y-3 mb-10 text-left">
                        {content.units.types[activeUnit].features.map((f, i) => (
                          <li key={i} className="flex items-center space-x-3 text-white/70">
                            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a 
                      href="https://wa.link/mmptlz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#c4a132] transition-all"
                    >
                      Get Pricing
                    </a>
                  </div>
                  <div 
                    className="order-2 md:order-2 h-auto md:h-full bg-white p-2 md:p-4 rounded-sm shadow-2xl flex items-center justify-center min-h-[300px] md:min-h-[500px] cursor-zoom-in group/layout relative"
                    onClick={() => setSelectedLayoutImage(content.units.types[activeUnit].image)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover/layout:bg-black/5 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/layout:opacity-100">
                      <Maximize className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <img 
                      src={content.units.types[activeUnit].image} 
                      alt={content.units.types[activeUnit].name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section id="facilities" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-center md:text-left">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl font-serif mb-6"
                >
                  {content.facilities.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[#A8A29E] text-lg mb-8 leading-relaxed"
                >
                  {content.facilities.description}
                </motion.p>
                <div className="grid grid-cols-2 gap-6 mb-12 md:mb-0">
                  {content.facilities.items.map((f, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-100 rounded-sm text-left">
                      <div className="text-[#D4AF37]">{IconMap[f.icon]}</div>
                      <span className="font-medium text-sm">{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div 
                  className="relative h-[600px] overflow-hidden rounded-sm shadow-xl cursor-zoom-in"
                  onClick={() => setSelectedImage(content.facilities.images[activeFacility].url)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeFacility}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7 }}
                      src={content.facilities.images[activeFacility].url} 
                      alt={content.facilities.images[activeFacility].alt} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  {/* Slider Controls */}
                  <div className="absolute bottom-4 right-4 flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={prevFacility}
                      className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextFacility}
                      className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Caption */}
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-bold">
                    {content.facilities.images[activeFacility].alt}
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] text-white p-8 rounded-sm hidden md:block z-10">
                  <p className="text-4xl font-serif mb-1">57</p>
                  <p className="text-xs uppercase tracking-widest font-bold">Lifestyle Facilities</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actual View (VR) */}
        <section id="vr" className="py-24 px-6 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-serif mb-4"
              >
                Actual View
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#A8A29E] uppercase tracking-widest text-sm mb-8"
              >
                Experience Veridian in 360°
              </motion.p>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-1 bg-[#D4AF37] mx-auto"
              ></motion.div>
            </div>
            
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-sm overflow-hidden shadow-2xl border border-stone-200 bg-white">
              <iframe 
                src="https://veridian.my/360vr2025/index.html" 
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, boxShadow: '0 0px 0px rgba(0,0,0,0.3)', borderRadius: '0px' }}
                allowFullScreen
                title="Veridian 360 VR View"
              />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed italic">
                "Immerse yourself in the actual surroundings and breathtaking views of Veridian Residence. Our 360° virtual tour offers a realistic perspective of your future home."
              </p>
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-serif mb-4"
              >
                {content.location.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#A8A29E] uppercase tracking-widest text-sm"
              >
                {content.location.subtitle}
              </motion.p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {content.location.items.map((item, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[#A8A29E]">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                {content.location.amenities.map((cat, idx) => (
                  <div key={idx} className="border-b border-stone-100">
                    <button 
                      onClick={() => setActiveLocationCategory(activeLocationCategory === idx ? null : idx)}
                      className="w-full flex justify-between items-center py-4 text-left group"
                    >
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
                        {cat.category}
                      </h3>
                      <ChevronDown 
                        className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${
                          activeLocationCategory === idx ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeLocationCategory === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-3 pb-6">
                            {cat.list.map((item, i) => (
                              <li key={i} className="flex justify-between items-center group/item">
                                <div className="flex items-center space-x-3">
                                  <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                  <span className="text-sm font-medium text-stone-700">{item.name}</span>
                                </div>
                                <span className="text-xs text-stone-400 font-mono">{item.distance}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div 
                className="relative h-[300px] md:h-full md:min-h-[500px] rounded-sm overflow-hidden shadow-2xl bg-stone-50 flex items-center justify-center cursor-zoom-in"
                onClick={() => setSelectedImage(content.location.mapImage)}
              >
                <img 
                  src={content.location.mapImage} 
                  alt="location image" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="contact" className="py-24 px-6 bg-[#F5F5F4]">
          <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-sm shadow-2xl border border-stone-100">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl font-serif mb-4"
              >
                Book a Private Viewing
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#A8A29E]"
              >
                Leave your details and our consultant will contact you shortly.
              </motion.p>
            </div>
            <form 
              action="https://formspree.io/f/xnjonlpq"
              method="POST"
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="John Doe" 
                      className="w-full pl-10 pr-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com" 
                      className="w-full pl-10 pr-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" 
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="+60 12 345 6789" 
                      className="w-full pl-10 pr-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Interested Unit</label>
                  <select 
                    name="unit"
                    required
                    className="w-full px-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors appearance-none bg-white"
                  >
                    <option value="">Select Unit Type</option>
                    <option value="Type A">Type A (947 sqft)</option>
                    <option value="Type B">Type B (1,055 sqft)</option>
                    <option value="Type C1">Type C1 (1,302 sqft)</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#44403C] text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl"
              >
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#44403C] text-white py-10 md:py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          <div className="col-span-2 flex flex-col items-center md:items-start">
            <img 
              src="https://lh3.googleusercontent.com/d/18bKR9B-xw5LfHXWi6_obPW1ER-80VtKH" 
              alt="veridianpjlogo" 
              className="h-10 mb-4 md:mb-6 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/60 max-w-md leading-relaxed text-sm md:text-base whitespace-pre-line">
              {content.footer.description}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-4 text-white/60 text-xs md:text-sm">
              <li><button onClick={() => scrollToSection('vibe')} className="hover:text-white transition-colors">Details</button></li>
              <li><button onClick={() => scrollToSection('units')} className="hover:text-white transition-colors">Unit Types</button></li>
              <li><button onClick={() => scrollToSection('facilities')} className="hover:text-white transition-colors">Facilities</button></li>
              <li><button onClick={() => scrollToSection('vr')} className="hover:text-white transition-colors">Actual View</button></li>
              <li><button onClick={() => scrollToSection('location')} className="hover:text-white transition-colors">Location</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6">Contact</h4>
            <ul className="space-y-2 md:space-y-4 text-white/60 text-xs md:text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <a href={`tel:${content.footer.phone}`} className="hover:text-white transition-colors">
                  {content.footer.phone}
                </a>
              </li>
              {content.footer.email && (
                <li className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${content.footer.email}`} className="hover:text-white transition-colors">
                    {content.footer.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/5 text-center text-white/40 text-[10px] md:text-xs uppercase tracking-widest">
          {content.footer.copyright}
        </div>
      </footer>

      {/* Layout Lightbox */}
      <AnimatePresence>
        {selectedLayoutImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLayoutImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-5xl w-full bg-white p-4 md:p-8 rounded-sm shadow-2xl"
            >
              <button 
                onClick={() => setSelectedLayoutImage(null)}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-[#D4AF37] transition-colors p-2"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="relative aspect-[4/3] md:aspect-video flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedLayoutImage} 
                  alt="Layout Preview" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-stone-900">
                  <h3 className="text-xl font-serif uppercase tracking-widest">{content.units.types[activeUnit].id} - {content.units.types[activeUnit].name}</h3>
                  <p className="text-sm text-stone-500">{content.units.types[activeUnit].size} • {content.units.types[activeUnit].rooms}</p>
                </div>
                <a 
                  href="https://wa.link/mmptlz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#D4AF37] text-white px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#c4a132] transition-all"
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generic Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-6xl w-full flex justify-center items-center pointer-events-none"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4AF37] transition-colors p-2 pointer-events-auto"
              >
                <X className="w-8 h-8" />
              </button>
              
              <img 
                src={selectedImage} 
                alt="Expanded View" 
                className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.link/o1m0cf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm">
          Chat with us
        </span>
      </a>
    </div>
  );
}

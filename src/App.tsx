/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Phone, 
  Mail, 
  User, 
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Japandi Palette
const colors = {
  stone: '#F5F5F4',
  walnut: '#44403C',
  sage: '#A8A29E',
  gold: '#D4AF37',
};

const unitTypes = [
  {
    id: 'A',
    name: 'Type A',
    size: '947 sqft',
    rooms: '3R2B',
    features: ['Spacious Living Area', 'Natural Ventilation'],
    image: 'https://picsum.photos/seed/unit-a/800/600'
  },
  {
    id: 'B',
    name: 'Type B',
    size: '1,055 sqft',
    rooms: '3R2B',
    features: ['Dual Key Ready', 'Master Suite'],
    image: 'https://picsum.photos/seed/unit-b/800/600'
  },
  {
    id: 'C1',
    name: 'Type C1',
    size: '1,302 sqft',
    rooms: '4R3B',
    features: ['Dual Key with Lanai', 'Family Lounge'],
    image: 'https://picsum.photos/seed/unit-c1/800/600'
  }
];

const facilities = [
  { name: 'Lap Pool', icon: <Waves className="w-6 h-6" /> },
  { name: 'Co-working Space', icon: <Building2 className="w-6 h-6" /> },
  { name: 'Sky Deck', icon: <Trees className="w-6 h-6" /> },
  { name: 'Gymnasium', icon: <Maximize className="w-6 h-6" /> },
  { name: 'Zen Garden', icon: <Trees className="w-6 h-6" /> },
  { name: 'Children Playground', icon: <Home className="w-6 h-6" /> },
];

export default function App() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [activeFacility, setActiveFacility] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const facilityImages = [
    { url: 'https://picsum.photos/seed/pool/800/1000', alt: 'Olympic Lap Pool' },
    { url: 'https://picsum.photos/seed/gym/800/1000', alt: 'Modern Gymnasium' },
    { url: 'https://picsum.photos/seed/cowork/800/1000', alt: 'Co-working Space' },
    { url: 'https://picsum.photos/seed/skydeck/800/1000', alt: '4-Acre Sky Deck' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextUnit = () => setActiveUnit((prev) => (prev + 1) % unitTypes.length);
  const prevUnit = () => setActiveUnit((prev) => (prev - 1 + unitTypes.length) % unitTypes.length);

  const nextFacility = () => setActiveFacility((prev) => (prev + 1) % facilityImages.length);
  const prevFacility = () => setActiveFacility((prev) => (prev - 1 + facilityImages.length) % facilityImages.length);

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
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="text-2xl font-serif tracking-widest uppercase cursor-pointer" onClick={() => scrollToSection('hero')}>
          Veridian
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wider">
          {[
            { name: 'Details', id: 'vibe' },
            { name: 'Units', id: 'units' },
            { name: 'Facilities', id: 'facilities' },
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
        <a 
          href="https://wa.link/o1m0cf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#D4AF37] text-white px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-[#D4AF37]/20 transition-all hover:-translate-y-0.5"
        >
          Register Now
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/veridian-hero/1920/1080" 
              alt="Veridian Residence Exterior" 
              className="w-full h-full object-cover brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
            >
              Veridian Residence <br /> in PJ South
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-10 font-light tracking-wide max-w-2xl mx-auto"
            >
              Experience the 4-acre Sky Deck and sustainable living with GreenRE Silver certification.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a 
                href="https://wa.link/o1m0cf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#D4AF37] text-white px-10 py-4 rounded-sm text-lg font-bold uppercase tracking-widest shadow-2xl hover:bg-[#c4a132] transition-all"
              >
                <span>Register Interest</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* At a Glance */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: <Bed className="w-8 h-8" />, label: "3-4 Bedrooms", sub: "Spacious Living" },
              { icon: <Maximize className="w-8 h-8" />, label: "947-1,302 sq.ft", sub: "Versatile Space" },
              { icon: <Layout className="w-8 h-8" />, label: "Dual Balcony", sub: "Panoramic Views" },
              { icon: <MapPin className="w-8 h-8" />, label: "3km to Sunway", sub: "Prime Connectivity" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="text-[#A8A29E] mb-4">{item.icon}</div>
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
              <h2 className="text-4xl font-serif mb-4">The Veridian Vibe</h2>
              <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Vibrant Community", desc: "A place where neighbors become friends in a thoughtfully designed social ecosystem.", img: "https://picsum.photos/seed/community/600/800" },
                { title: "Versatile Layouts", desc: "Dual-key ready options perfect for multi-generational living or investment flexibility.", img: "https://picsum.photos/seed/layout/600/800" },
                { title: "Zen Aesthetics", desc: "Japandi-inspired interiors that blend Japanese minimalism with Scandinavian warmth.", img: "https://picsum.photos/seed/zen/600/800" },
              ].map((card, idx) => (
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
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-serif mb-4">Unit Types</h2>
                <p className="text-white/60 uppercase tracking-widest text-sm">Find your perfect space</p>
              </div>
              <div className="flex space-x-4 mt-6 md:mt-0">
                <button onClick={prevUnit} className="p-3 border border-white/20 hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextUnit} className="p-3 border border-white/20 hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="relative h-[500px] md:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeUnit}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-12 h-full items-center"
                >
                  <div className="order-2 md:order-1">
                    <span className="text-[#D4AF37] font-bold text-5xl mb-4 block">{unitTypes[activeUnit].id}</span>
                    <h3 className="text-3xl font-serif mb-2">{unitTypes[activeUnit].name}</h3>
                    <p className="text-xl text-white/80 mb-6">{unitTypes[activeUnit].size} • {unitTypes[activeUnit].rooms}</p>
                    <ul className="space-y-3 mb-10">
                      {unitTypes[activeUnit].features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-3 text-white/70">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a 
                      href="https://wa.link/mmptlz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#c4a132] transition-all"
                    >
                      Get Pricing
                    </a>
                  </div>
                  <div className="order-1 md:order-2 h-full">
                    <img 
                      src={unitTypes[activeUnit].image} 
                      alt={unitTypes[activeUnit].name} 
                      className="w-full h-full object-cover rounded-sm shadow-2xl"
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
              <div>
                <h2 className="text-4xl font-serif mb-6">4-Acre Sky Deck</h2>
                <p className="text-[#A8A29E] text-lg mb-8 leading-relaxed">
                  Elevate your lifestyle with 57 curated facilities designed for wellness, productivity, and leisure. From our Olympic-length lap pool to modern co-working spaces, every detail is crafted for your comfort.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {facilities.map((f, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-100 rounded-sm">
                      <div className="text-[#D4AF37]">{f.icon}</div>
                      <span className="font-medium text-sm">{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="relative h-[600px] overflow-hidden rounded-sm shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeFacility}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7 }}
                      src={facilityImages[activeFacility].url} 
                      alt={facilityImages[activeFacility].alt} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  {/* Slider Controls */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
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
                    {facilityImages[activeFacility].alt}
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

        {/* Location */}
        <section id="location" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-4">VTOWN Connectivity</h2>
              <p className="text-[#A8A29E] uppercase tracking-widest text-sm">Heart of PJ South</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {[
                { title: "Highways", desc: "Seamless access to NPE, Federal Highway, and KESAS." },
                { title: "Public Transport", desc: "Only 500m to KTM Seri Setia for easy city commuting." },
                { title: "Shopping", desc: "A quick 3km drive to Sunway Pyramid and Sunway Lagoon." },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[#A8A29E]">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="w-full h-[400px] bg-stone-100 rounded-sm flex items-center justify-center border border-stone-200 overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/map-placeholder/1200/400" 
                alt="Veridian Residence Location Map" 
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute flex flex-col items-center">
                <MapPin className="w-12 h-12 text-[#D4AF37] mb-2" />
                <span className="font-bold uppercase tracking-widest text-sm">Veridian Residence Location</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="contact" className="py-24 px-6 bg-[#F5F5F4]">
          <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-sm shadow-2xl border border-stone-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-4">Book a Private Viewing</h2>
              <p className="text-[#A8A29E]">Leave your details and our consultant will contact you shortly.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input type="tel" placeholder="+60 12 345 6789" className="w-full pl-10 pr-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#A8A29E]">Interested Unit</label>
                  <select className="w-full px-4 py-3 border border-stone-200 focus:border-[#D4AF37] outline-none transition-colors appearance-none bg-white">
                    <option>Select Unit Type</option>
                    <option>Type A (947 sqft)</option>
                    <option>Type B (1,055 sqft)</option>
                    <option>Type C1 (1,302 sqft)</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-[#44403C] text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#44403C] text-white py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-3xl font-serif tracking-widest uppercase mb-6">Veridian</h2>
            <p className="text-white/60 max-w-md leading-relaxed">
              A premier residential development in PJ South, blending modern luxury with sustainable living. GreenRE Silver certified and designed for the future.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><button onClick={() => scrollToSection('units')} className="hover:text-white transition-colors">Unit Types</button></li>
              <li><button onClick={() => scrollToSection('facilities')} className="hover:text-white transition-colors">Facilities</button></li>
              <li><button onClick={() => scrollToSection('location')} className="hover:text-white transition-colors">Location</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+60 3 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>sales@veridian.com.my</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-white/40 text-xs uppercase tracking-widest">
          © 2026 Veridian Residence. All rights reserved. | Developed for PJ South Excellence.
        </div>
      </footer>
    </div>
  );
}

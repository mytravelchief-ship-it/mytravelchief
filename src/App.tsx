import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  Clock,
  ShieldCheck,
  MapPin,
  Star,
  ChevronDown,
  Car,
  Plane,
  Mountain,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Vehicle {
  id: string;
  name: string;
  type: string;
  seats: number;
  label: string;
  image: string;
  description: string;
  tariffs: {
    airport: { route: string; price: string }[];
    local: { package: string; price: string }[];
    outstation: { rate: string; minKm: string; bata: string };
  };
}

// --- Data ---

const VEHICLES: Vehicle[] = [
  {
    id: 'dzire',
    name: 'Dzire / Etios',
    type: 'Sedan',
    seats: 4,
    label: 'Best for small families',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773312544/Screenshot_2026-03-12_161818_qysbit.png',
    description: 'Comfortable air-conditioned sedan perfect for city rides and airport transfers.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹1,200' },
        { route: 'Airport to Munnar', price: '₹3,500' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹1,500' },
        { package: '8 hrs / 80 km', price: '₹2,500' }
      ],
      outstation: { rate: '₹14/km', minKm: '250km', bata: '₹500/day' }
    }
  },
  {
    id: 'ertiga',
    name: 'Suzuki Ertiga',
    type: 'MPV',
    seats: 6,
    label: 'Great for group travel',
    image: 'https://mallucabscochin.com/image/taxi/mallu-cabs-suv-cab-booking.jpg',
    description: 'Spacious 6-seater MPV ideal for medium-sized families and group outings.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹1,800' },
        { route: 'Airport to Munnar', price: '₹4,500' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹2,200' },
        { package: '8 hrs / 80 km', price: '₹3,500' }
      ],
      outstation: { rate: '₹16/km', minKm: '250km', bata: '₹600/day' }
    }
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    type: 'MPV',
    seats: 7,
    label: 'Reliable & Comfortable',
    image: 'https://mallucabscochin.com/image/taxi/innova-car-booking-in-kochi-kerala.jpg',
    description: 'The standard for long-distance travel in India. Unmatched comfort and reliability.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹2,200' },
        { route: 'Airport to Munnar', price: '₹5,000' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹2,800' },
        { package: '8 hrs / 80 km', price: '₹4,000' }
      ],
      outstation: { rate: '₹20/km', minKm: '250km', bata: '₹600/day' }
    }
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    type: 'Premium MPV',
    seats: 7,
    label: 'Premium comfort',
    image: 'https://mallucabscochin.com/image/taxi/tour-cab-booking-kochi.jpg',
    description: 'Luxury version of the Innova. Perfect for premium travel experiences.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹2,500' },
        { route: 'Airport to Munnar', price: '₹5,500' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹3,000' },
        { package: '8 hrs / 80 km', price: '₹4,500' }
      ],
      outstation: { rate: '₹22/km', minKm: '250km', bata: '₹700/day' }
    }
  },
  {
    id: 'tempo-9-12',
    name: 'Tempo Traveler 9-12 Seater',
    type: 'Van',
    seats: 12,
    label: '9-12 Seats',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773527901/Tempo_Traveller_PI_s6rq8d.png',
    description: 'Perfect for medium-sized groups and family trips with comfortable seating.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹3,500' },
        { route: 'Airport to Munnar', price: '₹7,000' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹4,000' },
        { package: '8 hrs / 80 km', price: '₹6,000' }
      ],
      outstation: { rate: '₹22/km', minKm: '250km', bata: '₹800/day' }
    }
  },
  {
    id: 'tempo-14-17',
    name: 'Tempo Traveler 14-17 Seater',
    type: 'Van',
    seats: 17,
    label: '14-17 Seats',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773527902/tempo-traveller-in-jodhpur_lfgtip.jpg',
    description: 'Spacious tempo traveler ideal for larger groups and extended tours.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹4,000' },
        { route: 'Airport to Munnar', price: '₹8,000' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹5,000' },
        { package: '8 hrs / 80 km', price: '₹7,000' }
      ],
      outstation: { rate: '₹25/km', minKm: '300km', bata: '₹900/day' }
    }
  },
  {
    id: 'tempo',
    name: 'Tempo Traveler',
    type: 'Van',
    seats: 26,
    label: '10-26 Seats',
    image: 'https://mallucabscochin.com/image/taxi/mallu-cabs-tempo-traveler.png',
    description: 'Ideal for large families or groups of friends exploring Kerala together.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹4,500' },
        { route: 'Airport to Munnar', price: '₹8,500' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹5,500' },
        { package: '8 hrs / 80 km', price: '₹7,500' }
      ],
      outstation: { rate: '₹28/km', minKm: '300km', bata: '₹1,000/day' }
    }
  },
  {
    id: 'luxury-tempo',
    name: 'Luxury Tempo Traveler',
    type: 'Luxury Van',
    seats: 10,
    label: '08-10 Seats',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773527527/Urbania-Tempo-Traveller-in-Jodhpur_ktlsrh.webp',
    description: 'Premium seating for smaller groups who want extra comfort.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹5,500' },
        { route: 'Airport to Munnar', price: '₹10,500' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹6,500' },
        { package: '8 hrs / 80 km', price: '₹9,500' }
      ],
      outstation: { rate: '₹35/km', minKm: '300km', bata: '₹1,200/day' }
    }
  },
  {
    id: 'urbania',
    name: 'Force Urbania',
    type: 'Premium Van',
    seats: 16,
    label: '12-16 Seats',
    image: 'https://mallucabscochin.com/image/taxi/mallu-cabs-luxury-tempo%20-traveler.jpg',
    description: 'The most modern and comfortable large van available for group travel.',
    tariffs: {
      airport: [
        { route: 'Kochi Airport to City', price: '₹6,500' },
        { route: 'Airport to Munnar', price: '₹12,500' }
      ],
      local: [
        { package: '4 hrs / 40 km', price: '₹7,500' },
        { package: '8 hrs / 80 km', price: '₹11,500' }
      ],
      outstation: { rate: '₹45/km', minKm: '300km', bata: '₹1,500/day' }
    }
  },
  {
    id: 'coach-35',
    name: 'BharatBenz Coach',
    type: 'Coach',
    seats: 35,
    label: '35 Seats',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773527726/bharatbenz-1017-39-seater-medium-duty-staff-bus-1000x1000_kscgva.webp',
    description: 'Premium coach for large groups with comfortable seating and ample luggage space.',
    tariffs: {
      airport: [{ route: 'Airport Transfer', price: '₹8,500' }],
      local: [{ package: '8 hrs / 80 km', price: '₹15,000' }],
      outstation: { rate: '₹65/km', minKm: '300km', bata: '₹2,000/day' }
    }
  },
  {
    id: 'coach-45',
    name: 'Glider Coach',
    type: 'Coach',
    seats: 45,
    label: '45 Seats',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773527701/61a8f946c0403_wqngtj.jpg',
    description: 'Luxury glider coach for large corporate groups or wedding parties.',
    tariffs: {
      airport: [{ route: 'Airport Transfer', price: '₹10,500' }],
      local: [{ package: '8 hrs / 80 km', price: '₹18,000' }],
      outstation: { rate: '₹75/km', minKm: '300km', bata: '₹2,500/day' }
    }
  },
  {
    id: 'bus-49',
    name: 'AC Bus',
    type: 'Bus',
    seats: 49,
    label: '49 Seats',
    image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773528131/pngtree-d-render-of-a-medium-sized-black-city-bus-on-a-image_3772916_nix3bk.jpg',
    description: 'Standard AC bus for large group transportation across Kerala.',
    tariffs: {
      airport: [{ route: 'Airport Transfer', price: '₹12,500' }],
      local: [{ package: '8 hrs / 80 km', price: '₹20,000' }],
      outstation: { rate: '₹85/km', minKm: '300km', bata: '₹3,000/day' }
    }
  }
];

const SERVICES = [
  {
    title: 'Airport Pickup & Drop',
    description: 'Arriving at Cochin International Airport? Our drivers track your flight and ensure on-time pickup, even during delays. Ideal for tourists, business travelers, and families.',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800',
    link: '#services'
  },
  {
    title: 'Kerala Tour Packages',
    description: 'Custom-designed Kerala travel packages covering hill stations, backwaters, beaches, wildlife, and heritage locations.',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
    link: '#services'
  },
  {
    title: 'Local Taxi in Kochi',
    description: 'Perfect for city travel, shopping trips, meetings, hotel transfers, and hourly rentals within Kochi and Ernakulam.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    link: '#services'
  },
  {
    title: 'Outstation Cabs Across Kerala',
    description: 'Comfortable long-distance travel to popular destinations like: Munnar, Alleppey, Thekkady, Wayanad, Varkala & Kovalam',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    link: '#services'
  }
];

const DESTINATIONS = [
  { name: 'Munnar', tagline: 'Misty Hills & Tea Gardens', image: 'https://travelchief.in/wp-content/uploads/2026/02/munn.avif' },
  { name: 'Wayanad', tagline: 'Nature & Wildlife', image: 'https://travelchief.in/wp-content/uploads/2026/02/Wayanad.jpg.jpeg' },
  { name: 'Thekkady', tagline: 'Wildlife & Spice', image: 'https://travelchief.in/wp-content/uploads/2026/02/Thekkadi.jpg.jpeg' },
  { name: 'Alleppey', tagline: 'Backwater Bliss', image: 'https://travelchief.in/wp-content/uploads/2026/02/Allepey.jpg.jpeg' },
  { name: 'Ponmudi', tagline: 'Golden Peak', image: 'https://travelchief.in/wp-content/uploads/2026/02/Ponmudi.jpg.jpeg' },
  { name: 'Kochi', tagline: 'Queen of Arabian Sea', image: 'https://travelchief.in/wp-content/uploads/2026/02/Kochi.jpg.jpeg' },
  // { name: 'Rameshwaram', tagline: 'Sacred Pilgrimage', image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773313522/1612441298_144275276_2491105017864228_1237678389235436394_n_hble2w.jpg' },
  { name: 'Madurai', tagline: 'Temple City', image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773313425/a4eb9f56222453823b83e33a17de04c9_wg61ov.jpg' },
  { name: 'Kanyakumari', tagline: 'Land\'s End', image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773313143/1-Places-to-Visit-in-Kanyakumari_mqzbb0.jpg' }
];

const FAQS = [
  {
    q: "Do you provide airport pickup from Kochi Airport?",
    a: "Yes. We offer 24/7 pickup and drop services from Cochin International Airport with real-time flight tracking."
  },
  {
    q: "Are your Kerala tour packages customizable?",
    a: "Absolutely! We specialize in custom-designed Kerala travel packages covering hill stations, backwaters, beaches, and more based on your preferences."
  },
  {
    q: "What types of vehicles do you offer?",
    a: "We offer a wide range of vehicles including Sedans (Dzire/Etios), MPVs (Ertiga, Innova, Crysta), Tempo Travelers (10-26 seats), and Luxury Coaches."
  },
  {
    q: "Is pricing transparent?",
    a: "Yes, we believe in transparent pricing with no hidden charges. All costs are discussed upfront during the booking process."
  },
  {
    q: "How can I book a cab quickly?",
    a: "You can book quickly via WhatsApp or by calling us directly at +91 755 991 7686. Our support team is available 24/7."
  }
];

// --- Components ---

const Logo = ({ light = false, className = "" }: { light?: boolean; className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/db41bfixa/image/upload/v1772454082/image-removebg-preview_zimjfs.png"
          alt="Travel Chief Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-none text-left">
        <span className={`text-xl font-display font-black uppercase tracking-[-0.05em] ${light ? 'text-white' : 'text-brand-black'}`}>
          TRAVEL <span className="text-brand-gold">CHIEF</span>
        </span>
        <span className={`text-[7px] font-bold uppercase tracking-[0.3em] ${light ? 'text-white/60' : 'text-brand-black/40'}`}>
          The World On Wings
        </span>
      </div>
    </div>
  );
};

// Helper: scroll to hash or navigate to home + hash
const useScrollToHash = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
};

const NavLink = ({ name, href, onClick, children }: { name: string; href: string; onClick?: () => void; children?: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClick?.();

    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/') {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + (href === '#' ? '' : href));
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={children ? '' : "text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-gold text-white/70 hover:tracking-[0.3em]"}
    >
      {children || name}
    </a>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Cabs & Tariff', href: '/tariff' },
    { name: 'Tour Packages', href: '#packages' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-black/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <NavLink name="" href="#" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo light={true} />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink name={link.name} href={link.href} />
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/917559917686"
            className="group relative px-8 py-3 bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-brand-black border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <ul className="p-8 space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink name={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} />
                </li>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <a href="https://wa.me/917559917686" className="bg-brand-gold text-brand-black p-4 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest">
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a href="tel:+917559917686" className="bg-white/5 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest border border-white/10">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const HERO_SLIDES = [
  'https://res.cloudinary.com/db41bfixa/image/upload/v1772454263/hawaii-beach-landscape-with-nature-coastline_2_1_f4pytb.jpg',
  'https://res.cloudinary.com/db41bfixa/image/upload/v1772453595/view-green-palm-tree-species-with-beautiful-foliage_2_vfrhk2.jpg',
  'https://res.cloudinary.com/db41bfixa/image/upload/v1772453516/aerial-shot-long-road-surrounded-by-trees-fields_3_1_lvmuqr.jpg',
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-10 overflow-hidden bg-brand-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === currentSlide ? 'opacity-60' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt={`Kerala ${i + 1}`}
              className="w-full h-full object-cover scale-105"
              style={{ animation: i === currentSlide ? 'heroZoom 5s ease-in-out forwards' : 'none' }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/50 to-brand-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-[0.9] tracking-[-0.03em] mb-8"
          >
            The World <br />
            <span className="text-stroke-gold">On Wings</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Experience Kerala like never before with our most trusted premium taxi service.
            From airport transfers to luxury group tours, we provide the wings for your journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#tariff"
              className="group relative w-full sm:w-auto px-10 py-5 bg-brand-gold text-brand-black text-xs font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Fleet <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all"
            >
              Get a Quote
            </a>
          </motion.div>

          {/* Service Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {[
              { name: 'Tourist Taxi', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=100' },
              { name: 'Airport Pickup', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=100' },
              { name: 'Sabarimala Packages', img: 'https://images.unsplash.com/photo-1623944889288-cd147dbb517c?auto=format&fit=crop&q=80&w=100' },
              { name: 'Group Tours', img: 'https://images.unsplash.com/photo-1539635278303-d4002c07dee3?auto=format&fit=crop&q=80&w=100' }
            ].map((tag) => (
              <span key={tag.name} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-brand-gold">
                {tag.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-12 bg-brand-black relative overflow-hidden">
      <div className="section-title-bg">SERVICES</div>

      <div className="container mx-auto px-2 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-5">
          <div className="max-w-2xl">
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">
              Premium Travel <br />
              <span className="text-stroke">Solutions</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm font-medium leading-relaxed">
            From quick city hops to extensive Kerala explorations, we provide tailored transportation for every need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-brand-black p-10 hover:bg-brand-black-light transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
                {service.description}
              </p>
              <a href={service.link} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Learn More <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PACKAGE_TARIFFS = [
  {
    id: 'dzire',
    name: 'Swift Dzire / Toyota Etios',
    passengers: 4,
    extraKm: '14/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '4,600/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '6,400/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '8,700/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '11,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '12,800/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '14,600/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '16,400/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '18,500/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '20,000/-' },
    ]
  },
  {
    id: 'ertiga',
    name: 'Suzuki Ertiga',
    passengers: 6,
    extraKm: '18/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '5,400/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '7,600/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '10,400/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '13,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '15,300/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '17,400/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '19,600/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '21,800/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '24,000/-' },
    ]
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    passengers: 7,
    extraKm: '20/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '6,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '8,500/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '11,500/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '14,500/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '17,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '19,500/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '22,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '24,500/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '27,000/-' },
    ]
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    passengers: 7,
    extraKm: '22/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '7,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '10,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '13,500/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '17,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '20,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '23,000/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '26,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '29,000/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '32,000/-' },
    ]
  },
  {
    id: 'tempo-9-12',
    name: 'Tempo Traveller 12 Seater',
    passengers: 12,
    extraKm: '24/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '8,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '12,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '16,000/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '19,500/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '23,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '26,500/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '30,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '33,500/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '37,000/-' },
    ]
  },
  {
    id: 'tempo-14-17',
    name: 'Tempo Traveller 14-17 Seater',
    passengers: 17,
    extraKm: '25/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '9,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '13,500/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '17,500/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '22,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '26,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '30,000/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '34,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '38,000/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '42,000/-' },
    ]
  },
  {
    id: 'luxury-tempo',
    name: 'Luxury Tempo Traveller 08-10 Seater',
    passengers: 10,
    extraKm: '28/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '12,500/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '18,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '24,000/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '29,500/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '35,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '41,000/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '46,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '51,500/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '57,000/-' },
    ]
  },
  {
    id: 'urbania',
    name: 'Force Urbania 12-16 Seater',
    passengers: 16,
    extraKm: '30/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '16,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '23,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '30,000/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '37,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '44,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '51,000/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '58,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '65,000/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '72,000/-' },
    ]
  },
  {
    id: 'coach-35',
    name: 'Bharat Benz Premium Coach 35 Seater',
    passengers: 35,
    extraKm: '40/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '21,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '31,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '41,000/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '50,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '60,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '69,500/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '79,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '88,500/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '98,000/-' },
    ]
  },
  {
    id: 'coach-45',
    name: 'Glider Luxury Coach 45 Seater',
    passengers: 45,
    extraKm: '55/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '28,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '42,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '55,000/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '68,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '81,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '94,000/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '1,07,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '1,20,000/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '1,33,000/-' },
    ]
  },
  {
    id: 'bus-49',
    name: 'AC 49 Seater Bus',
    passengers: 49,
    extraKm: '50/Km',
    packages: [
      { days: '01 Night / 02 Days', km: '200 Km', rate: '26,000/-' },
      { days: '02 Nights / 03 Days', km: '300 Km', rate: '39,000/-' },
      { days: '03 Nights / 04 Days', km: '400 Km', rate: '51,000/-' },
      { days: '04 Nights / 05 Days', km: '500 Km', rate: '63,000/-' },
      { days: '05 Nights / 06 Days', km: '600 Km', rate: '75,000/-' },
      { days: '06 Nights / 07 Days', km: '700 Km', rate: '87,000/-' },
      { days: '07 Nights / 08 Days', km: '800 Km', rate: '99,000/-' },
      { days: '08 Nights / 09 Days', km: '900 Km', rate: '1,11,000/-' },
      { days: '09 Nights / 10 Days', km: '1000 Km', rate: '1,23,000/-' },
    ]
  },
];

const PackageTariff = ({ defaultOpenId }: { defaultOpenId?: string | null }) => {
  const defaultIdx = defaultOpenId ? PACKAGE_TARIFFS.findIndex(v => v.id === defaultOpenId) : -1;
  const [openIdx, setOpenIdx] = useState<number | null>(defaultIdx >= 0 ? defaultIdx : null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (defaultIdx >= 0 && itemRefs.current[defaultIdx]) {
      setTimeout(() => {
        itemRefs.current[defaultIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [defaultIdx]);

  return (
    <div className="mt-24">
      <div className="text-center mb-14">
        <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Tour Packages</span>
        <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight">
          Package <span className="text-stroke-gold">Rates</span>
        </h3>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {PACKAGE_TARIFFS.map((vehicle, i) => (
          <div
            key={vehicle.id}
            ref={el => { itemRefs.current[i] = el; }}
            className={`rounded-2xl border transition-all duration-300 ${openIdx === i ? 'border-brand-gold/30 bg-brand-black' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold text-sm font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="text-left">
                  <h4 className="font-display font-bold text-white text-base tracking-tight">{vehicle.name}</h4>
                  <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{vehicle.passengers} Passengers &middot; AC &middot; Extra {vehicle.extraKm}</span>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`text-white/30 transition-transform duration-300 flex-shrink-0 ${openIdx === i ? 'rotate-180 text-brand-gold' : ''}`}
              />
            </button>

            <AnimatePresence>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-4 gap-4 px-4 py-3 mb-1 rounded-xl bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-widest">
                      <span>Duration</span>
                      <span>Included Km</span>
                      <span>Rate</span>
                      <span className="text-right">Book</span>
                    </div>
                    {vehicle.packages.map((pkg, j) => (
                      <div
                        key={j}
                        className={`grid grid-cols-4 gap-4 px-4 py-3.5 rounded-xl text-sm ${j % 2 === 0 ? 'bg-white/[0.03]' : ''} hover:bg-white/[0.06] transition-colors`}
                      >
                        <span className="text-white/70 font-medium text-xs">{pkg.days}</span>
                        <span className="text-white/50 font-medium text-xs">{pkg.km}</span>
                        <span className="text-brand-gold font-bold text-xs">{pkg.rate}</span>
                        <div className="text-right">
                          <a
                            href={`https://wa.me/917559917686?text=I'm interested in ${vehicle.name} - ${pkg.days} package`}
                            className="inline-flex items-center gap-1.5 bg-brand-gold text-brand-black text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-brand-gold-light transition-all"
                          >
                            Book
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

// Homepage car cards showcase
const CarsShowcase = () => {
  const navigate = useNavigate();

  return (
    <section id="tariff" className="py-10 bg-brand-black-light relative">
      <div className="section-title-bg">FLEET</div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Our Fleet</span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">
            Our <span className="text-stroke-gold">Vehicles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VEHICLES.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              className="group bg-brand-black border border-white/5 rounded-3xl overflow-hidden hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-black/70 backdrop-blur-md text-brand-gold text-[10px] font-black uppercase tracking-[0.15em] rounded-full">
                    {vehicle.type}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-display font-black uppercase tracking-tight text-white mb-3">{vehicle.name}</h3>
                <div className="flex items-center gap-3 mb-5 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Users size={12} /> {vehicle.seats} Seats</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> AC</span>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/917559917686?text=I'm interested in booking a ${vehicle.name}`}
                    className="flex-1 py-3.5 bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-gold-light transition-all duration-300"
                  >
                    Book Now
                  </a>
                  <button
                    onClick={() => navigate(`/tariff?vehicle=${vehicle.id}`)}
                    className="flex-1 py-3.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300"
                  >
                    View Tariff
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tariff page full section with filters + accordion
const TariffSection = ({ vehicleId }: { vehicleId?: string | null }) => {
  return (
    <section className="py-10 bg-brand-black-light relative">
      <div className="container mx-auto px-6 relative z-10">
        <PackageTariff defaultOpenId={vehicleId} />
      </div>
    </section>
  );
};

const TrustSection = () => {
  const features = [
    { title: "Custom Kerala Tour Packages", desc: "Tailored itineraries for Munnar, Alleppey & more." },
    { title: "Reliable Airport Pickup & Drop", desc: "On-time service with flight tracking at COK." },
    { title: "Clean, Well-Maintained Vehicles", desc: "Well-maintained fleet for your comfort." },
    { title: "Experienced & Verified Drivers", desc: "Verified professionals with local expertise." },
    { title: "Transparent Pricing", desc: "No hidden charges or surprise costs." },
    { title: "Local Kerala Expertise", desc: "Deep knowledge of Kerala's routes and culture." },
    { title: "24/7 Booking Support", desc: "We're always here when you need us." },
    { title: "Flexible Travel Options", desc: "Rides you can trust at your own pace." }
  ];

  return (
    <section id="about" className="py-10 bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://res.cloudinary.com/db41bfixa/image/upload/v1772456386/young-family-with-little-son-walking-bridge-by-river_juff47.jpg"
                alt="Kerala Tourism"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand-gold p-10 rounded-3xl shadow-2xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand-black rounded-2xl flex items-center justify-center text-brand-gold font-black text-2xl">5.0</div>
                <div>
                  <div className="flex text-brand-black"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                  <p className="text-[10px] font-black text-brand-black/60 uppercase tracking-[0.2em]">Google Reviews</p>
                </div>
              </div>
              <p className="text-brand-black font-bold leading-relaxed italic text-sm">
                "From misty hills to peaceful backwaters, every journey in Kerala deserves comfort."
              </p>
            </div>
          </div>

          <div>
            <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Why Choose Travel Chief?</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-10 leading-none">
              Safe & Easy <br />
              <span className="text-stroke">Family Travel</span>
            </h2>
            <p className="text-white/40 text-lg mb-12 leading-relaxed font-medium">
              Best Taxi Service in Kochi for International Travelers, North Indians & Tourists. Trusted, professional cab services tailored for airport transfers, city tours, and long-distance journeys.
            </p>
            <div className="grid sm:grid-cols-2 gap-12">
              {features.map((f, i) => (
                <div key={i} className="group flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-gold border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white mb-2 uppercase tracking-tight text-sm group-hover:text-brand-gold transition-colors">{f.title}</h4>
                    <p className="text-[11px] text-white/30 font-medium leading-relaxed group-hover:text-white/50 transition-colors">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920"
          alt="Taxi Background"
          className="w-full h-full object-cover opacity-20 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <span className="text-brand-gold font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Ready to Travel in Kerala?</span>
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight mb-12 leading-none">
            Book Your Ride <br />
            <span className="text-stroke-gold">With Travel Chief</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-12 mb-20">
            {['Comfortable Rides', 'On-Time Pickup', 'Expert Support'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">
                <CheckCircle2 size={16} className="text-brand-gold" /> {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href="tel:+917559917686"
              className="group relative w-full md:w-auto px-12 py-6 bg-brand-gold text-brand-black text-xs font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Phone size={20} /> Call Now
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="https://wa.me/917559917686"
              className="w-full md:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Destinations = () => {
  return (
    <section id="packages" className="py-10 bg-brand-black relative">
      <div className="section-title-bg">TRAVEL</div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Explore Kerala</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">
              Popular <span className="text-stroke">Destinations</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm font-medium leading-relaxed">
            Discover the most breathtaking locations in Kerala with our curated tour packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative h-[450px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  {dest.tagline}
                </span>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {dest.name}
                </h3>
                <div className="h-px w-0 group-hover:w-full bg-brand-gold transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [hasStarted, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  const reviews = [
    {
      image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773530268/unnamed_5_u1rnyz.webp',
      name: 'Chanchal Singhal',
      type: 'Kerala Trip',
      quote: 'I highly recommend Travel Chief and Jithin to anyone planning a trip to Kerala. Their professionalism, expertise, and warm hospitality made our vacation truly unforgettable. Five stars aren\'t enough - I\'d give them ten if I could!',
    },
    {
      image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773530209/unnamed_4_hjikd0.webp',
      name: 'Mayuri Bhosale',
      type: 'Kerala Tour',
      quote: 'I had an amazing experience with the cab service. Our driver, Jitin, was very courteous and knowledgeable. He took us to all the major attractions, providing insightful information about each location. His expertise and friendly demeanor made the tour truly enjoyable. Highly recommend!',
    },
    {
      image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773530048/unnamed_3_jbobz5.webp',
      name: 'Ankit Verma',
      type: 'Kerala Trip',
      quote: 'Very nice trip. Libin Thomas is the best driver we have met. Very humble and very nice person and he knows many beautiful locations on the trip. Travel Chief is very helpful and most affordable and best rates in Kerala.',
    },
    {
      image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773529481/unnamed_r39u04.webp',
      name: 'Abhishek Joshi',
      type: 'South India Trip',
      quote: 'Excellent cab services in south India. We took the cab from Madurai to Kochi covering Rameshwaram, Kanyakumari, Thekkady, Varkala & Munnar. Our driver Mr Rajeesh was like family to us. Thanks Rajeesh ji for making our trip memorable!',
    },
    {
      image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773529488/unnamed_1_t9qllz.webp',
      name: 'KalyanKumar',
      type: 'Business Trip',
      quote: 'I had an excellent experience with my driver. He was punctual, polite, and very professional throughout the ride. The car was clean and comfortable, and he made sure the journey was smooth and safe. I would definitely recommend him!',
    },
    {
      image: 'https://res.cloudinary.com/db41bfixa/image/upload/v1773529493/unnamed_2_slfp0v.webp',
      name: 'Sanjeet Kumar',
      type: 'Kerala & Tamil Nadu Trip',
      quote: 'Wonderful trip with Travelchief! Our driver Mr. Umesh was extremely polite, calm, and professional. He had excellent knowledge about all the places we visited. The vehicle was in excellent condition throughout our 10-day journey!',
    }
  ];

  const cardStyles = [
    'md:-rotate-3 md:translate-y-4',
    'md:rotate-2 md:-translate-y-6',
    'md:-rotate-2 md:translate-y-8',
    'md:rotate-1 md:translate-y-2',
    'md:-rotate-1 md:-translate-y-4',
    'md:rotate-2 md:translate-y-6',
  ];

  return (
    <section className="py-10 bg-brand-black relative overflow-hidden">
      <div className="section-title-bg">Stories</div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Destinations', end: 50, suffix: '+' },
            { label: 'Trips Completed', end: 10, suffix: 'K+' },
            { label: 'Happy Tourists', end: 5, suffix: 'K+' },
            { label: 'Years Experience', end: 15, suffix: '+' },
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-5xl md:text-7xl font-display font-black text-brand-gold mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white/50 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-28">
          <div className="text-center mb-16">
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Trip Memories</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">
              Real Stories, <span className="text-stroke-gold">Real Smiles</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-6xl mx-auto md:px-4">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className={`${cardStyles[i]} hover:!rotate-0 hover:!translate-y-0 transition-all duration-500 group cursor-default`}
              >
                <div className="bg-white/[0.03] rounded-3xl overflow-hidden border border-white/10 hover:border-brand-gold/30 transition-all duration-500 shadow-2xl hover:shadow-brand-gold/5">
                  {/* Photo */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        {review.type}
                      </span>
                    </div>
                  </div>
                  {/* Review Content */}
                  <div className="p-6">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-5 italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                        <Users size={14} className="text-brand-gold" />
                      </div>
                      <p className="text-white font-display font-bold text-sm tracking-wide">{review.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 bg-brand-black relative">
      <div className="section-title-bg">FAQ</div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Questions</span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">
            Common <span className="text-stroke-gold">Queries</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/5 rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-white/10">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-8 text-left flex justify-between items-center group"
              >
                <span className={`font-display font-bold uppercase tracking-tight transition-colors ${openIdx === i ? 'text-brand-gold' : 'text-white/70 group-hover:text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${openIdx === i ? 'bg-brand-gold text-brand-black' : 'bg-white/5 text-white/40'}`}>
                  <ChevronDown size={20} className={`transition-transform duration-500 ${openIdx === i ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-white/40 font-medium leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-10 bg-brand-black-light relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Contact Us</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-10 leading-none">
              How Can We <br />
              <span className="text-stroke-gold">Help You?</span>
            </h2>

            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-brand-gold flex-shrink-0 border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-white/30">Location</h4>
                  <p className="text-white font-display font-bold text-xl">Palarivattom, Kochi, Kerala</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-brand-gold flex-shrink-0 border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-white/30">Contact</h4>
                  <p className="text-brand-gold font-display font-bold text-xl">+91 755 991 7686</p>
                  <p className="text-brand-gold font-display font-bold text-xl">+91 623 857 4412</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-brand-gold flex-shrink-0 border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-white/30">Email</h4>
                  <p className="text-white font-display font-bold text-xl">support@travelchief.in</p>
                </div>
              </div>
            </div>

          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2!2d76.3081!3d9.9963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTknNDYuNyJOIDc2wrAxOCcyOS4yIkU!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-[500px] lg:h-full min-h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Travel Chief Location"
            />
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs">
              <div className="bg-brand-black/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-brand-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-sm">Travel Chief</h4>
                    <p className="text-white/40 text-xs">Palarivattom, Kochi</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/eZWCyZfe9jYZKhHD9?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-brand-gold text-brand-black py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-brand-gold-light transition-all"
                >
                  <ArrowRight size={14} />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-black text-white pt-10 relative overflow-hidden">
      <div className="container mx-auto  relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-15">
          <div className="col-span-1 lg:col-span-1">
            <Logo light={true} className="mb-10" />
            <p className="text-white/30 text-sm leading-relaxed mb-10 font-medium max-w-xs">
              Kochi's most reliable cab and tour provider. We specialize in airport transfers, local city rides, and customized Kerala tour packages.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-500 border border-white/10"><MessageCircle size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-500 border border-white/10"><Star size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-brand-gold">Quick Links</h4>
            <ul className="space-y-5 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Services</a></li>
              <li><Link to="/tariff" className="hover:text-brand-gold transition-colors">Fleet</Link></li>
              <li><a href="#packages" className="hover:text-brand-gold transition-colors">Packages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-brand-gold">Services</h4>
            <ul className="space-y-5 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Airport Taxi</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Tourism Taxi</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">City Taxi</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Outstation</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Sabarimala</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-brand-gold">Contact</h4>
            <ul className="space-y-8 text-white/40 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-brand-gold flex-shrink-0" />
                <span className="leading-relaxed">Palarivattom, Kochi, Kerala, India</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-brand-gold flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-white font-black">+91 755 991 7686</span>
                  <span className="text-white font-black">+91 623 857 4412</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-brand-gold flex-shrink-0" />
                <span className="text-white font-black">support@travelchief.in</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`fixed right-5 bottom-6 z-50 flex flex-col gap-3 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
      {/* Call */}
      <a
        href="tel:+917559917686"
        className="group relative flex items-center justify-end"
      >
        <span className="absolute right-full mr-3 bg-brand-black/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl">
          Call Now
        </span>
        <div className="w-14 h-14 rounded-2xl bg-brand-black-lighter border border-white/10 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-brand-gold/40 transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-gold">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
      </a>
      {/* WhatsApp */}
      <a
        href="https://wa.me/917559917686"
        className="group relative flex items-center justify-end"
      >
        <span className="absolute right-full mr-3 bg-brand-black/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl">
          WhatsApp Us
        </span>
        <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.3)] group-hover:scale-110 group-hover:shadow-[0_8px_40px_rgba(37,211,102,0.5)] transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </a>
    </div>
  );
};

const HomePage = () => {
  useScrollToHash();
  return (
    <>
      <Hero />
      <Services />
      <CarsShowcase />
      <TrustSection />
      <Destinations />
      <Stats />
      <CallToAction />
      <FAQ />
      <Contact />
    </>
  );
};

const TariffPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const vehicleId = params.get('vehicle');

  useEffect(() => {
    if (!vehicleId) {
      window.scrollTo({ top: 0 });
    }
  }, [vehicleId]);

  return (
    <>
      <section className="pt-36 pb-8 bg-brand-black-light relative overflow-hidden">
        <div className="section-title-bg">TARIFF</div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Our Fleet</span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-4">
            Cabs & <span className="text-stroke-gold">Tariff</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto font-medium">
            Choose from our wide range of well-maintained vehicles for your Kerala journey.
          </p>
        </div>
      </section>
      <TariffSection vehicleId={vehicleId} />
    </>
  );
};

const ScrollRoad = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const roadTop = 80;
  const roadBottom = 80;
  const carSize = 32;

  return (
    <div className="fixed right-1 sm:right-2 top-0 bottom-0 z-40 w-6 sm:w-8 flex flex-col items-center pointer-events-none">
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[6px] bg-white/[0.06] rounded-full"
        style={{ top: roadTop, bottom: roadBottom }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, rgba(212,175,55,0.25) 0px, rgba(212,175,55,0.25) 8px, transparent 8px, transparent 20px)',
          }}
        />
        <div
          className="absolute left-0 top-0 w-full bg-brand-gold/10 rounded-full transition-[height] duration-100"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 transition-[top] duration-100 ease-out"
        style={{
          top: `calc(${roadTop}px + ${progress} * (100% - ${roadTop + roadBottom + carSize}px))`,
        }}
      >
        <div className="relative flex flex-col items-center">
          <div
            className="absolute -bottom-3 w-3 h-6 rounded-full opacity-60 blur-sm"
            style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.6), transparent)' }}
          />
          <svg width={carSize} height={carSize} viewBox="0 0 32 32" fill="none" className="drop-shadow-lg">
            <rect x="8" y="4" width="16" height="24" rx="6" fill="#D4AF37" />
            <rect x="10" y="9" width="12" height="10" rx="3" fill="#0A0A0A" opacity="0.6" />
            <rect x="11" y="6" width="10" height="4" rx="2" fill="#0A0A0A" opacity="0.4" />
            <rect x="11" y="22" width="10" height="3" rx="1.5" fill="#0A0A0A" opacity="0.4" />
            <rect x="5" y="8" width="4" height="5" rx="2" fill="#1F1F1F" />
            <rect x="5" y="19" width="4" height="5" rx="2" fill="#1F1F1F" />
            <rect x="23" y="8" width="4" height="5" rx="2" fill="#1F1F1F" />
            <rect x="23" y="19" width="4" height="5" rx="2" fill="#1F1F1F" />
            <rect x="13" y="12" width="6" height="3" rx="1.5" fill="#F4D03F" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tariff" element={<TariffPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
      <ScrollRoad />
    </div>
  );
}

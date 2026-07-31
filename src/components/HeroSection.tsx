import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Ticket, FolderDown, ChevronDown } from 'lucide-react';
import { EVENT_DETAILS } from '../data/parayanData';

interface HeroSectionProps {
  onOpenRsvp: () => void;
  onOpenInvitation: () => void;
  onNavigate: (id: string) => void;
}

// Elegant Golden Lotus SVG Component
const LotusFlower: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M32 6 C36 16 42 24 42 36 C42 45 36 50 32 50 C28 50 22 45 22 36 C22 24 28 16 32 6 Z"
      fill="url(#lotus-center)"
    />
    <path
      d="M32 16 C42 22 52 30 52 40 C52 48 44 52 38 50 C34 44 32 36 32 16 Z"
      fill="url(#lotus-petal-1)"
      opacity="0.9"
    />
    <path
      d="M32 16 C22 22 12 30 12 40 C12 48 20 52 26 50 C30 44 32 36 32 16 Z"
      fill="url(#lotus-petal-1)"
      opacity="0.9"
    />
    <path
      d="M32 24 C46 30 58 38 56 46 C54 52 42 54 34 50 C32 44 32 36 32 24 Z"
      fill="url(#lotus-petal-2)"
      opacity="0.8"
    />
    <path
      d="M32 24 C18 30 6 38 8 46 C10 52 22 54 30 50 C32 44 32 36 32 24 Z"
      fill="url(#lotus-petal-2)"
      opacity="0.8"
    />
    {/* Base Pad */}
    <path
      d="M20 52 C26 56 38 56 44 52 C48 56 46 60 32 60 C18 60 16 56 20 52 Z"
      fill="url(#lotus-center)"
      opacity="0.9"
    />
    <defs>
      <linearGradient id="lotus-center" x1="32" y1="6" x2="32" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="lotus-petal-1" x1="12" y1="16" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="lotus-petal-2" x1="8" y1="24" x2="56" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#78350F" />
      </linearGradient>
    </defs>
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRsvp,
  onOpenInvitation,
  onNavigate,
}) => {
  // Countdown to August 18, 2026 19:15 IST
  const targetDate = new Date('2026-08-18T19:15:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between items-center text-white overflow-hidden bg-[#0a0806]">
      {/* Mandir Background Image with Dark Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_mandir_parayan_1785262214909.jpg"
          alt="BAPS Swaminarayan Mandir Malad"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-125 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806]/90 via-[#0a0806]/60 to-[#0a0806]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806]/95 via-transparent to-[#0a0806]/95" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Animated Golden Lotus Flowers */}
      {/* Top Left Floating Lotus */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-8 sm:left-16 z-10 pointer-events-none drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)] opacity-80 hidden sm:block"
      >
        <LotusFlower className="w-14 h-14 sm:w-20 sm:h-20" />
      </motion.div>

      {/* Top Right Floating Lotus near Book Card */}
      <motion.div
        animate={{
          y: [0, 18, 0],
          rotate: [6, -4, 6],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-24 right-6 sm:right-20 z-10 pointer-events-none drop-shadow-[0_10px_25px_rgba(245,158,11,0.4)] opacity-85"
      >
        <LotusFlower className="w-16 h-16 sm:w-24 sm:h-24" />
      </motion.div>

      {/* Mid Left Subtle Floating Lotus */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 4, -8],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-4 z-10 pointer-events-none drop-shadow-[0_8px_16px_rgba(245,158,11,0.25)] opacity-60 hidden md:block"
      >
        <LotusFlower className="w-12 h-12" />
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 mx-auto flex-1 flex flex-col justify-center items-center">

        {/* Top Hero Layout: Title & Subtitle Left, Glass Book Card Right */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">

          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 text-left space-y-3"
          >

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white leading-none">
              Yuva <br />
              Parayan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500">
                2026
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-300 font-serif max-w-md leading-snug pt-2">
              Celebrating 25 Glorious Years of Kandivali Yuva Parayan
            </p>
          </motion.div>

          {/* Right Floating Glass Book Card with Real Book Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            <div className="relative group">
              {/* Floating Decorative Lotus on Book Corner */}
              <motion.div
                animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 z-20 pointer-events-none drop-shadow-lg"
              >
                <LotusFlower className="w-12 h-12" />
              </motion.div>

              {/* Stacked Backing Card Effect */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-gradient-to-br from-amber-900/40 to-stone-900/60 border border-amber-500/20 shadow-2xl backdrop-blur-sm pointer-events-none" />

              {/* Main Frosted Glass Book Card */}
              <div className="relative rounded-3xl bg-white/10 border border-white/20 p-5 backdrop-blur-2xl shadow-2xl max-w-xs space-y-3 text-center transition-transform duration-500 group-hover:scale-[1.02]">

                {/* Book Glow & Image Container */}
                <div className="relative rounded-2xl p-4 bg-gradient-to-b from-amber-500/10 to-black/40 border border-amber-500/30 flex items-center justify-center overflow-hidden">
                  {/* Subtle Light Ring behind book */}
                  <div className="absolute w-40 h-40 bg-amber-400/20 rounded-full blur-xl animate-pulse" />

                  <img
                    src="/src/assets/images/shri_hari_leelamrutam_book_1785262229930.jpg"
                    alt="Shri Hari Leelamrutam Katha Book"
                    className="w-40 sm:w-44 h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] relative z-10 hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Book Card Descriptor Text */}
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-300 tracking-wide font-mono">
                    25th Silver Jubilee Edition
                  </p>
                  <p className="text-xs text-stone-200 font-serif italic">
                    • Shri Hari Leelamrutam Katha •
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Countdown Timer Pill (Glassmorphic) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full max-w-lg mb-8"
        >
          <div className="bg-white/10 border border-white/20 rounded-3xl p-4 backdrop-blur-xl shadow-2xl flex items-center justify-around text-center relative overflow-hidden">
            {/* Subtle background lotus watermark */}
            <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
              <LotusFlower className="w-32 h-32" />
            </div>

            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINS', val: timeLeft.minutes },
              { label: 'SECS', val: timeLeft.seconds },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tracking-wider">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-stone-300 font-bold tracking-widest uppercase mt-0.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Big Rounded Orange Pill Buttons (Matching Reference Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="w-full max-w-md space-y-3.5"
        >
          {/* Solid Glowing Orange RSVP Button */}
          <button
            onClick={onOpenRsvp}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold text-base shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Ticket className="w-5 h-5 fill-black" />
            <span>RSVP & Register Online</span>
          </button>

          {/* Outlined Glass Download Pass Button */}
          <button
            onClick={onOpenInvitation}
            className="w-full py-4 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white border border-amber-500/40 font-bold text-base backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <FolderDown className="w-5 h-5 text-amber-400" />
            <span>Download Digital Pass</span>
          </button>
        </motion.div>

      </div>

      {/* Footer Info Bar */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 mx-auto mt-6 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-4 bg-black/60 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            {EVENT_DETAILS.dates}
          </span>
          <span className="hidden sm:inline text-stone-600">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            7:15 PM Onwards
          </span>
          <span className="hidden md:inline text-stone-600">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            BAPS Mandir, Malad (W)
          </span>
        </div>

        <button
          onClick={() => onNavigate('about')}
          className="p-2 rounded-full bg-black/60 border border-white/10 text-stone-400 hover:text-white transition-all cursor-pointer animate-bounce flex items-center gap-1"
          title="Scroll to explore"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};



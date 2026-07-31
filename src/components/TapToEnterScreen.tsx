import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, Volume2, ArrowRight } from 'lucide-react';
import { EVENT_DETAILS } from '../data/parayanData';
import { ambientSynth } from '../lib/audioSynth';

interface TapToEnterProps {
  isOpen: boolean;
  onEnter: () => void;
}

export const TapToEnterScreen: React.FC<TapToEnterProps> = ({ isOpen, onEnter }) => {
  if (!isOpen) return null;

  const handleTap = () => {
    ambientSynth.playChime();
    ambientSynth.start(); // auto play gentle drone
    onEnter();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-stone-950 via-zinc-950 to-amber-950/90 text-amber-50 overflow-hidden backdrop-blur-3xl"
      >
        {/* Ambient Glowing Orbs Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full flex items-center justify-between max-w-sm pt-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            25th Silver Jubilee
          </span>
          <span className="text-xs text-amber-200/60 font-mono">2001 - 2026</span>
        </motion.div>

        {/* Center Main Tap Card */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md my-auto px-2">
          {/* Lotus Flower / Sacred Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            className="relative mb-6 cursor-pointer group"
            onClick={handleTap}
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-amber-400/40 bg-gradient-to-b from-amber-900/40 to-stone-900/80 p-1 flex items-center justify-center shadow-2xl backdrop-blur-md">
              <img
                src="/src/assets/images/shri_hari_leelamrutam_book_1785262229930.jpg"
                alt="Shri Hari Leelamrutam"
                className="w-full h-full object-cover rounded-full filter brightness-110 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] tracking-wider uppercase shadow-md">
                25 YEARS
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1"
          >
            🌸 Kandivali Yuva Parayan 🌸
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2"
          >
            {EVENT_DETAILS.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl sm:text-3xl font-serif text-amber-300 mb-4 tracking-wide font-medium"
          >
            📖 {EVENT_DETAILS.gujaratiTitle}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-stone-300 max-w-xs mb-8 leading-relaxed"
          >
            Celebrating 25 Glorious Years of Youth Devotion, Service, and Unwavering Faith.
          </motion.p>

          {/* TAP TO OPEN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleTap}
            id="tap-to-enter-btn"
            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>TAP TO ENTER WEBSITE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Bottom Details Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-sm pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs text-stone-400"
        >
          <div className="flex items-center gap-1.5 text-amber-200/80">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>18 - 20 Aug 2026</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200/80">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Malad (W), Mumbai</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

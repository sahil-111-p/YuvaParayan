import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ExternalLink, X, Maximize2, ShieldCheck, Heart, Flame, ArrowRight, Layers } from 'lucide-react';
import { EVENT_DETAILS } from '../data/parayanData';

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  rotation: string; // e.g. '-deg-6'
  zIndex: number;
  offset: string;
}

export const AboutSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string; caption: string } | null>(null);

  // Photos for "Abt Granth" scattered frame cluster (Left side of section 1)
  const granthPhotos: PhotoItem[] = [
    {
      id: 'g-1',
      url: '/src/assets/images/shri_hari_leelamrutam_book_1785262229930.jpg',
      title: 'Shri Hari Leelamrutam Granth',
      caption: '25th Silver Jubilee Edition Holy Book',
      rotation: '-rotate-6',
      zIndex: 20,
      offset: 'top-0 left-4 sm:left-8',
    },
    {
      id: 'g-2',
      url: '/src/assets/images/day1_nishtha_visual_1785262243317.jpg',
      title: 'Scripture Pujan & Discourse',
      caption: 'Learned Swamis reciting Leelamrutam Katha',
      rotation: 'rotate-8',
      zIndex: 10,
      offset: 'top-10 right-2 sm:right-6',
    },
    {
      id: 'g-3',
      url: '/src/assets/images/day3_tap_visual_1785262257760.jpg',
      title: 'Sacred Aarti Ceremony',
      caption: 'Evening Aarti of Shri Hari Leelamrutam',
      rotation: '-rotate-12',
      zIndex: 15,
      offset: 'bottom-2 left-0 sm:left-4',
    },
    {
      id: 'g-4',
      url: 'https://images.unsplash.com/photo-1541802645635-11f2286a7482?auto=format&fit=crop&w=800&q=80',
      title: 'Divine Pujan & Pushpanjali',
      caption: 'Devotees offering flowers to Granth',
      rotation: 'rotate-12',
      zIndex: 25,
      offset: 'bottom-6 right-0 sm:right-4',
    },
  ];

  // Photos for "Abt Parayan" scattered frame cluster (Right side of section 2)
  const parayanPhotos: PhotoItem[] = [
    {
      id: 'p-1',
      url: '/src/assets/images/hero_mandir_parayan_1785262214909.jpg',
      title: 'Akshardham Complex, Malad',
      caption: 'Sacred venue hosting 25th Yuva Parayan',
      rotation: 'rotate-6',
      zIndex: 20,
      offset: 'top-0 right-4 sm:right-8',
    },
    {
      id: 'p-2',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      title: 'Youth Assembly & Fellowship',
      caption: '25 years of Kandivali Yuva Mandal unity',
      rotation: '-rotate-8',
      zIndex: 15,
      offset: 'top-12 left-2 sm:left-6',
    },
    {
      id: 'p-3',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      title: 'Youth Kirtan Aradhana',
      caption: 'Devotional music and instruments by Yuvas',
      rotation: 'rotate-12',
      zIndex: 10,
      offset: 'bottom-2 right-0 sm:right-4',
    },
    {
      id: 'p-4',
      url: '/src/assets/images/day1_nishtha_visual_1785262243317.jpg',
      title: '25th Jubilee Celebration',
      caption: 'Silver Jubilee milestone celebration in Mumbai',
      rotation: '-rotate-10',
      zIndex: 25,
      offset: 'bottom-6 left-0 sm:left-4',
    },
  ];

  const pillars = [
    {
      num: '01',
      gujarati: 'નિષ્ઠા',
      title: 'Nishtha — Conviction',
      desc: 'Unwavering faith in Bhagwan Swaminarayan & Mahant Swami Maharaj.',
      icon: ShieldCheck,
      color: 'border-amber-500/40 text-amber-300',
    },
    {
      num: '02',
      gujarati: 'સેવા',
      title: 'Seva — Selfless Service',
      desc: 'Humble service to society, mandir, and humanity without ego.',
      icon: Heart,
      color: 'border-emerald-500/40 text-emerald-300',
    },
    {
      num: '03',
      gujarati: 'તપ',
      title: 'Tap — Discipline & Devotion',
      desc: 'Building moral purity, character, and spiritual enthusiasm in youth.',
      icon: Flame,
      color: 'border-rose-500/40 text-rose-300',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-[#0a0806] text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30">
            01 • ABOUT PARAYAN & GRANTH
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white pt-2">
            25 Years Legacy & <span className="text-amber-300 italic">Sacred Granth</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Exploring the divine history of Kandivali Yuva Parayan and the sacred scripture <strong className="text-white">Shri Hari Leelamrutam</strong>.
          </p>
        </div>

        {/* ========================================================= */}
        {/* WIREFRAME SECTION 1: Abt Granth (Photos Left, Text Right) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Scattered Tilted Photo Frame Cluster (Abt Granth) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative h-[420px] sm:h-[480px] w-full flex items-center justify-center"
          >
            {/* Background Accent Frame Box matching Wireframe outline */}
            <div className="absolute inset-4 sm:inset-8 border border-amber-500/20 rounded-3xl bg-amber-950/20 backdrop-blur-sm -z-10" />

            {granthPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ scale: 1.12, rotate: 0, zIndex: 40 }}
                onClick={() => setActivePhoto(photo)}
                className={`absolute ${photo.offset} ${photo.rotation} transition-all duration-300 cursor-pointer group`}
                style={{ zIndex: photo.zIndex }}
              >
                {/* Polaroid Frame Container */}
                <div className="p-2 sm:p-2.5 bg-zinc-900 border-2 border-amber-500/40 rounded-2xl shadow-2xl shadow-black group-hover:border-amber-400 group-hover:shadow-amber-500/20 max-w-[180px] sm:max-w-[220px]">
                  <div className="aspect-4/3 rounded-xl overflow-hidden bg-black relative">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity text-amber-300">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="pt-2 px-1 text-left">
                    <p className="text-[11px] font-mono font-bold text-amber-300 truncate">{photo.title}</p>
                    <p className="text-[9px] text-stone-400 truncate">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Badge overlay on Granth Photo Cluster */}
            <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-amber-400 text-black text-[10px] font-mono font-black uppercase tracking-widest shadow-lg z-30">
              Abt Granth • Photos
            </div>
          </motion.div>

          {/* RIGHT: Text Content for Abt Granth */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SACRED SCRIPTURE HISTORY</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Shri Hari Leelamrutam</span>
            </h3>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Authored by <strong className="text-amber-300">Acharya Viharilalji Maharaj</strong>, <em>Shri Hari Leelamrutam</em> is a monumental Gujarati poetic biography detailing the divine life, spiritual discourses, and social welfare work of <strong>Bhagwan Swaminarayan</strong>.
            </p>

            <div className="space-y-3 bg-zinc-900/80 p-5 rounded-2xl border border-white/10 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <p><strong className="text-white font-mono">10 Kalashes & 10,000+ Verses:</strong> Captures the essence of Bhagwan Swaminarayan's travels, mandir consecrations, and youth teachings across Gujarat.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <p><strong className="text-white font-mono">25th Silver Jubilee Focus:</strong> During this 3-day assembly, Pujya Swamis will elucidate chapters on Nishtha (Conviction), Seva (Service), and Tap (Devotion).</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={EVENT_DETAILS.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Read Full Granth PDF in Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* WIREFRAME SECTION 2: Abt Parayan (Text Left, Photos Right) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/10 pt-20">
          
          {/* LEFT: Text Content for Abt Parayan */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>25 YEARS KANDIVALI YUVA MANDAL</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Kandivali Yuva Parayan</span>
            </h3>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Established in <strong className="text-white font-mono">2001</strong>, Kandivali Yuva Parayan marks <strong>25 glorious years</strong> of divine youth transformation, moral values, and community service in Mumbai.
            </p>

            <p className="text-stone-300 text-sm leading-relaxed">
              Under the divine guidance of <strong>BAPS Swaminarayan Sanstha</strong>, hundreds of youth gather annually at Akshardham Complex, Malad, to listen to inspiring discourses, participate in cultural drama, and partake in Mahaprasad.
            </p>

            {/* Quick 3 Pillar Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {pillars.map((p) => {
                const IconComp = p.icon;
                return (
                  <div key={p.num} className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-center space-y-1">
                    <IconComp className="w-4 h-4 text-amber-400 mx-auto" />
                    <p className="text-xs font-serif font-bold text-white">{p.gujarati}</p>
                    <p className="text-[10px] text-stone-400 font-mono">{p.title.split('—')[0]}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: Scattered Tilted Photo Frame Cluster (Abt Parayan) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative h-[420px] sm:h-[480px] w-full flex items-center justify-center"
          >
            {/* Background Accent Frame Box matching Wireframe outline */}
            <div className="absolute inset-4 sm:inset-8 border border-orange-500/20 rounded-3xl bg-orange-950/20 backdrop-blur-sm -z-10" />

            {parayanPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ scale: 1.12, rotate: 0, zIndex: 40 }}
                onClick={() => setActivePhoto(photo)}
                className={`absolute ${photo.offset} ${photo.rotation} transition-all duration-300 cursor-pointer group`}
                style={{ zIndex: photo.zIndex }}
              >
                {/* Polaroid Frame Container */}
                <div className="p-2 sm:p-2.5 bg-zinc-900 border-2 border-orange-500/40 rounded-2xl shadow-2xl shadow-black group-hover:border-amber-400 group-hover:shadow-orange-500/20 max-w-[180px] sm:max-w-[220px]">
                  <div className="aspect-4/3 rounded-xl overflow-hidden bg-black relative">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity text-amber-300">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="pt-2 px-1 text-left">
                    <p className="text-[11px] font-mono font-bold text-amber-300 truncate">{photo.title}</p>
                    <p className="text-[9px] text-stone-400 truncate">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Badge overlay on Parayan Photo Cluster */}
            <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-orange-500 text-black text-[10px] font-mono font-black uppercase tracking-widest shadow-lg z-30">
              Abt Parayan • Memories
            </div>
          </motion.div>

        </div>
      </div>

      {/* Lightbox Modal for Photo Click */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 text-white"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-zinc-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 text-stone-300 hover:text-white border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-16/10 w-full bg-black flex items-center justify-center">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-zinc-950 border-t border-white/10 space-y-1 text-left">
                <h4 className="text-xl font-serif font-bold text-amber-300">{activePhoto.title}</h4>
                <p className="text-stone-300 text-xs sm:text-sm">{activePhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

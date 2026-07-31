import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FAQ_ITEMS } from '../data/parayanData';

export const ImportantInfoFaq: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-stone-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-semibold mb-3 uppercase tracking-wider"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Important Guidance & FAQs
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3"
          >
            Attendee <span className="text-amber-300 font-serif">Guidelines & FAQ</span>
          </motion.h2>

          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Everything you need to know about seating, timings, Mahaprasad, dress codes, and online registration.
          </p>
        </div>

        {/* Important Highlights Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              title: 'Entry & Registration',
              desc: 'Entry is free for all devotees. Online RSVP is requested to streamline Mahaprasad dining.',
              icon: CheckCircle2,
            },
            {
              title: 'Timings Discipline',
              desc: 'Mahaprasad 7:15 PM – 8:30 PM. Sabha begins strictly at 8:30 PM. Kindly arrive on time.',
              icon: Info,
            },
            {
              title: 'Dress Code Respect',
              desc: 'Follow Day 1 (White), Day 2 (Black/White), Day 3 (Traditional) dress themes for harmony.',
              icon: ShieldCheck,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/20 space-y-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 w-fit">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-stone-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-zinc-900/80 border border-amber-500/20 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/50"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-5 sm:px-5 text-xs text-stone-300 whitespace-pre-line leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

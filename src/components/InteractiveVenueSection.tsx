import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Train, Car, UtensilsCrossed, Shield, Phone, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../data/parayanData';

export const InteractiveVenueSection: React.FC = () => {
  const directions = [
    { mode: 'By Train (Western Line)', desc: 'Get off at Malad Railway Station (West). The mandir is just a 5-min walk or 2-min auto rickshaw ride along S.V. Road.', icon: Train },
    { mode: 'By Metro (Line 2A)', desc: 'Dhanukarwadi or Malad West Metro Station is 5 minutes away via auto rickshaw.', icon: Compass },
    { mode: 'By Road / WEH', desc: 'Exit Western Express Highway at Malad Flyover towards SV Road. Turn onto SV Road opposite Malad Shopping Centre.', icon: Car },
  ];

  const amenities = [
    { title: 'Air-Conditioned Sabha Hall', desc: 'Comfortable indoor seating with acoustic sound & LED screens.', icon: '❄️' },
    { title: 'Spacious Mahaprasad Hall', desc: 'Dedicated clean dining hall serving Sattvik Swaminarayan Jain dinner.', icon: '😋' },
    { title: 'Ample Free Parking', desc: 'On-campus parking space for two-wheelers and four-wheelers.', icon: '🅿️' },
    { title: 'Accessibility for Elders', desc: 'Ramp access, wheel-chair assistance, and special priority seating.', icon: '♿' },
  ];

  return (
    <section id="venue" className="py-24 px-4 sm:px-6 bg-[#0F0F0F] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-widest"
          >
            <MapPin className="w-3.5 h-3.5" />
            05 • VENUE & DIRECTIONS
          </motion.div>
        </div>

        {/* Main Venue Card with Image & Map Button */}
        <div className="bg-zinc-900/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl aspect-16/10 group bg-black">
              <img
                src="/src/assets/images/hero_mandir_parayan_1785262214909.jpg"
                alt="Akshardham Complex Malad"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">
                {EVENT_DETAILS.venue.name}
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed">
                {EVENT_DETAILS.venue.complex}, {EVENT_DETAILS.venue.address}
              </p>
              <p className="text-xs text-amber-300 font-medium">
                Landmark: {EVENT_DETAILS.venue.landmark}
              </p>

              <div className="pt-2 space-y-3">
                <a
                  href={EVENT_DETAILS.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 fill-black" />
                  <span>View in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center flex-col sm:flex-row  gap-y-2 justify-between text-xs text-stone-400 bg-black/60 p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Venue Assistance: +91 98200 12345
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

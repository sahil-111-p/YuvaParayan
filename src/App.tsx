import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { TapToEnterScreen } from './components/TapToEnterScreen';
import { RekorderNavbar } from './components/RekorderNavbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TimelineDaySection } from './components/TimelineDaySection';
import { InteractiveGallery } from './components/InteractiveGallery';
import { InteractiveVenueSection } from './components/InteractiveVenueSection';
import { ImportantInfoFaq } from './components/ImportantInfoFaq';
import { RsvpFormSection } from './components/RsvpFormSection';
import { InvitationCardModal } from './components/InvitationCardModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isTapToEnterOpen, setIsTapToEnterOpen] = useState(true);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeDay, setActiveDay] = useState(1);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      delete (window as any).lenis;
      lenis.destroy();
    };
  }, []);

  // Section observer for updating active nav pill
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'timeline', 'videos', 'gallery', 'venue', 'faq', 'rsvp'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (isTapToEnterOpen) {
      setIsTapToEnterOpen(false);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(el, { offset: -60, duration: 1.2 });
        } else {
          const y = el.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setActiveSection(sectionId);
      }
    }, 50);
  };

  const handleOpenRsvp = () => {
    handleNavigate('rsvp');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans selection:bg-amber-400 selection:text-black">
      {/* 1. Tap to Enter Interactive Screen */}
      <TapToEnterScreen
        isOpen={isTapToEnterOpen}
        onEnter={() => setIsTapToEnterOpen(false)}
      />

      {/* Main Website Content */}
      <div className={isTapToEnterOpen ? 'overflow-hidden max-h-screen filter blur-md' : ''}>
        {/* 2. Rekorder Studios Inspired Navbar */}
        <RekorderNavbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenRsvp={handleOpenRsvp}
          onOpenInvitation={() => setIsInvitationModalOpen(true)}
          activeDay={activeDay}
        />

        {/* 3. Hero Storytelling Section */}
        <HeroSection
          onOpenRsvp={handleOpenRsvp}
          onOpenInvitation={() => setIsInvitationModalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* 4. About Us & 25 Years Legacy Section */}
        <AboutSection />

        {/* 5. 3-Day Schedule & Dynamic Theme Timeline */}
        <TimelineDaySection
          onOpenRsvp={handleOpenRsvp}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
        />

        {/* 7. Interactive Photo Wall & Globe Gallery */}
        <InteractiveGallery />

        {/* 8. Interactive Venue & Directions Section */}
        <InteractiveVenueSection />

        {/* 9. Guidelines & FAQ Section */}
        <ImportantInfoFaq />

        {/* 10. RSVP Online Registration Form */}
        <RsvpFormSection
          onOpenInvitation={() => setIsInvitationModalOpen(true)}
        />

        {/* 11. Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenRsvp={handleOpenRsvp}
          onOpenInvitation={() => setIsInvitationModalOpen(true)}
        />

        {/* 12. Invitation Card Generator Modal */}
        <InvitationCardModal
          isOpen={isInvitationModalOpen}
          onClose={() => setIsInvitationModalOpen(false)}
        />
      </div>
    </div>
  );
}

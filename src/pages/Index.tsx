import React, { Suspense } from 'react';
import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SectionSeparator from '@/components/SectionSeparator';

// Lazy load below-the-fold components to reduce initial bundle size
const AboutSection = React.lazy(() => import('@/components/AboutSection'));
const SkillsSection = React.lazy(() => import('@/components/SkillsSection'));
const ProjectsSection = React.lazy(() => import('@/components/ProjectsSection'));
const ExperienceSection = React.lazy(() => import('@/components/ExperienceSection'));
const AchievementsSection = React.lazy(() => import('@/components/AchievementsSection'));
const EducationSection = React.lazy(() => import('@/components/EducationSection'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));
const Footer = React.lazy(() => import('@/components/Footer'));

const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center text-muted-foreground/20 font-mono text-xs tracking-widest uppercase animate-pulse">
    Initializing section...
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <SectionSeparator />
        
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
          <SectionSeparator />
          <SkillsSection />
          <SectionSeparator />
          <ProjectsSection />
          <SectionSeparator />
          <ExperienceSection />
          <SectionSeparator />
          <AchievementsSection />
          <SectionSeparator />
          <EducationSection />
          <SectionSeparator />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;

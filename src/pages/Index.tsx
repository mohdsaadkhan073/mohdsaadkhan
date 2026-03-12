import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AchievementsSection from '@/components/AchievementsSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SectionSeparator from '@/components/SectionSeparator';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <SectionSeparator />
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
      </main>
    </div>
  );
};

export default Index;

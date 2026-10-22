import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { IntroCardsSection } from '../components/home/IntroCardsSection';
import { UnderstandingFlowSection } from '../components/home/UnderstandingFlowSection';
import { TechShowcaseSection } from '../components/home/TechShowcaseSection';
import { OculusVrSection } from '../components/home/OculusVrSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { MetaverseSection } from '../components/home/MetaverseSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <HeroSection />
      <IntroCardsSection />
      <UnderstandingFlowSection />
      <TechShowcaseSection />
      <OculusVrSection />
      <ProjectsSection />
      <MetaverseSection />
      <ContactSection />
    </div>
  );
};

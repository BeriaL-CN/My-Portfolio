import React, { useEffect, useState } from 'react';
// Project, about, and profile copy are normalized in one shared data adapter.
import ProjectCard from './ProjectCard';
import PortfolioHeader from './PortfolioHeader';
import HomeSection from './HomeSection';
import ContactSection from './ContactSection';
import ExperienceSection from './ExperienceSection';
import './Portfolio2D.css';

const sectionIds = ['home', 'about', 'experience', 'projects', 'contact'];

const Portfolio2D = ({ portfolioData, portfolioMeta, contactData, experienceData }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionEntries = sectionIds
      .map((sectionId) => ({
        id: sectionId,
        element: document.querySelector(`.${sectionId}-section`) || document.querySelector(`#${sectionId}`),
      }))
      .filter((entry) => entry.element);

    const updateActiveSection = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (scrolledToBottom) {
        setActiveSection('contact');
        return;
      }

      const headerHeight = document.querySelector('.portfolio-header')?.offsetHeight || 0;
      // Use one stable scan line below the sticky header so short sections still own their range.
      const activationLine = window.scrollY + headerHeight + window.innerHeight * 0.28;
      const currentSection = sectionEntries.reduce((current, entry) => (
        entry.element.offsetTop <= activationLine ? entry.id : current
      ), 'home');

      setActiveSection(currentSection);
    };

    let animationFrame = null;
    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        updateActiveSection();
        animationFrame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="portfolio-2d">
      <PortfolioHeader 
        portfolioMeta={portfolioMeta}
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />
      
      <main className="portfolio-main">
        <HomeSection portfolioMeta={portfolioMeta} />
        
        <section className="about-section" id="about">
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              {portfolioMeta.summary}
            </p>
          </div>
        </section>

        <ExperienceSection experienceData={experienceData} />
        
        <section className="projects-section" id="projects">
          <div className="section-header">
            <h2>Projects</h2>
            <p>A showcase of my work and accomplishments</p>
          </div>
          <div className="projects-grid">
            {portfolioData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
         </section>

         <ContactSection contactData={contactData} />
       </main>

     </div>
  );
};

export default Portfolio2D;

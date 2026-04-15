import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';
import PortfolioHeader from './PortfolioHeader';
import HomeSection from './HomeSection';
import ContactSection from './ContactSection';
import './Portfolio2D.css';

const Portfolio2D = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="portfolio-2d">
      <PortfolioHeader 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />
      
      <main className="portfolio-main">
        <HomeSection />
        
        <section className="about-section" id="about">
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              I'm a dedicated developer with experience in various technologies 
              and frameworks. I love creating user-friendly applications and 
              solving complex problems with elegant solutions.
            </p>
          </div>
        </section>
        
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

         <ContactSection />
       </main>

     </div>
  );
};

export default Portfolio2D;

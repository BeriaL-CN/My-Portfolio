import React from 'react';

const HomeSection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="home-section">
      <div className="hero-background">
        {/* 背景图片容器，等待用户导入图片后填充 */}
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">BeriaL's Portfolio</h1>
        <p className="hero-subtitle">Creative Developer & Designer</p>
        
        <div className="scroll-indicator" onClick={scrollToProjects}>
          <span className="scroll-text">Scroll Down</span>
          <div className="scroll-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-point"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;

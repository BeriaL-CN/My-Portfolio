import React from 'react';

const PortfolioHeader = ({ activeSection, onNavigate }) => {
  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`.${sectionId}-section`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // 如果找不到section，尝试使用id选择器
      const sectionById = document.querySelector(`#${sectionId}`);
      if (sectionById) {
        sectionById.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigation = (section) => {
    onNavigate(section);
    // 延迟一下确保状态更新后再滚动
    setTimeout(() => scrollToSection(section), 100);
  };

  return (
    <header className="portfolio-header">
      <div className="header-container">
        <h1 className="header-title">BeriaL's Portfolio</h1>
        <nav className="header-nav">
          <button 
            className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => handleNavigation('projects')}
          >
            Projects
          </button>
          <button 
            className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavigation('about')}
          >
            About
          </button>
        </nav>
      </div>
    </header>
  );
};

export default PortfolioHeader;

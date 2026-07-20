import React from 'react';

const ExperienceSection = ({ experienceData }) => {
  if (!experienceData?.length) return null;

  return (
    <section className="experience-section" id="experience">
      <div className="section-header">
        <h2>Experience</h2>
        <p>Technical roles and client-facing delivery</p>
      </div>

      <div className="experience-timeline">
        {experienceData.map((experience) => (
          <article key={experience.id} className="experience-card">
            <div className="experience-card-marker" aria-hidden="true" />
            <div className="experience-card-body">
              <div className="experience-card-meta">
                <span>{experience.dateRange}</span>
                {experience.isCurrent && <span className="experience-current">Current</span>}
              </div>

              <h3>{experience.position}</h3>
              <p className="experience-company">
                {experience.company} · {experience.location}
              </p>

              {/* Career highlights come from the public resume data and stay short for scanability. */}
              <ul className="experience-highlights">
                {experience.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>

              <div className="card-tags experience-tags">
                {experience.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

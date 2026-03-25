import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <div className="card-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        {project.links.github && (
          <a 
            href={project.links.github} 
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
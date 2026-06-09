import React, { useState } from 'react';

const ProjectCard = ({ project }) => {
  // Previews may contain local images, GitHub-hosted mp4 assets, or external video links.
  const previewImages = project.preview?.images || [];
  const previewVideos = project.preview?.videos || [];
  const primaryPreview = previewImages[0];
  const primaryVideo = previewVideos[0];
  const hasPreview = Boolean(primaryPreview || primaryVideo);
  const [floatingPreview, setFloatingPreview] = useState(null);

  const openFloatingPreview = (event) => {
    if (!hasPreview || floatingPreview) return;
    // Lock the floating panel to its first hover position so users can move into it and click media.
    const previewWidth = Math.min(440, window.innerWidth - 32);
    const left = Math.min(
      event.clientX + 5,
      window.innerWidth - previewWidth - 16
    );

    setFloatingPreview({ left, top: 120 });
  };

  const closeFloatingPreview = (event) => {
    // Keep the panel open while the pointer moves between the card and its fixed-position preview.
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setFloatingPreview(null);
  };

  // Shared by the mobile inline preview and the desktop floating panel.
  const renderPrimaryPreview = () => (
    <div className="project-preview-frame">
      {primaryPreview ? (
        // Images open directly so mobile users can inspect the original screenshots.
        <a
          href={primaryPreview.src}
          className="project-preview-image-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${primaryPreview.caption || project.title} full image`}
        >
          <img
            src={primaryPreview.src}
            alt={primaryPreview.alt}
            className="project-preview-image"
            loading="lazy"
          />
        </a>
      ) : primaryVideo.kind === 'youtube' ? (
        // YouTube short links are opened externally; the thumbnail keeps the card visual.
        <a
          href={primaryVideo.src}
          className="project-preview-youtube"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${primaryVideo.caption || project.title} video`}
        >
          <img
            src={primaryVideo.thumbnail}
            alt={`${primaryVideo.caption || project.title} video preview`}
            className="project-preview-image"
            loading="lazy"
          />
          <span className="project-preview-youtube-play" aria-hidden="true">Play</span>
        </a>
      ) : (
        <video
          src={primaryVideo.src}
          className="project-preview-video"
          controls
          muted
          preload="metadata"
        />
      )}
    </div>
  );

  return (
    <div
      className={`project-card${hasPreview ? ' has-preview' : ''}`}
      onMouseEnter={openFloatingPreview}
      onMouseLeave={closeFloatingPreview}
    >
      {hasPreview && (
        <div className="project-preview" aria-label={`${project.title} preview`}>
          {renderPrimaryPreview()}
          {/* Inline thumbnails are mainly for mobile, where hover/floating panels are unavailable. */}
          <div className="project-preview-thumbs">
            {previewImages.slice(0, 4).map((image) => (
              <a
                key={image.src}
                className="project-preview-thumb"
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{image.caption}</span>
              </a>
            ))}
            {previewVideos.slice(0, 4).map((video, index) => (
              <a
                key={video.src}
                className="project-preview-thumb project-preview-video-link"
                href={video.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="project-preview-play" aria-hidden="true">Play</span>
                <span>{video.caption || `Demo ${index + 1}`}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      {floatingPreview && (
        <div
          className="project-floating-preview"
          style={{
            left: floatingPreview.left,
            top: floatingPreview.top,
          }}
        >
          {renderPrimaryPreview()}
          {/* Floating actions duplicate the media list so desktop users can open demos without leaving hover. */}
          <div className="project-preview-thumbs floating-preview-actions">
            {previewImages.slice(0, 4).map((image) => (
              <a
                key={image.src}
                className="project-preview-thumb"
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{image.caption}</span>
              </a>
            ))}
            {previewVideos.slice(0, 4).map((video, index) => (
              <a
                key={video.src}
                className="project-preview-thumb project-preview-video-link"
                href={video.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="project-preview-play" aria-hidden="true">Play</span>
                <span>{video.caption || `Demo ${index + 1}`}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        {/* Highlights stay as bullets so longer resume copy remains scannable. */}
        <ul className="card-description card-highlights">
          {project.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
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

// src/ProjectDetailsPanel.jsx
// 用来显示项目详细信息的面板组件
import React from 'react';

// 样式定义：使面板浮在 3D 场景之上
const panelStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // 居中
    width: '400px',
    maxWidth: '90vw',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    zIndex: 20, // 确保它在所有东西之上
    color: '#333',
    maxHeight: '80vh',
    overflowY: 'auto'
};

// The panel mirrors 2D card media while keeping thumbnails at a stable 16:9 ratio.
const previewGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '10px',
    margin: '0 0 20px 0'
};

const previewImageStyle = {
    width: '100%',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#202733'
};

const previewLinkStyle = {
    color: '#4e79a7',
    fontSize: '0.72rem',
    fontWeight: 700,
    textDecoration: 'none'
};

const previewCaptionStyle = {
    margin: '5px 0 0 0',
    color: '#665746',
    fontSize: '0.72rem',
    fontWeight: 700,
    lineHeight: 1.3,
    textTransform: 'uppercase'
};

const ProjectDetailsPanel = ({ project, onClose }) => {
    // 如果没有项目数据，则不渲染（理论上 App.jsx 已经做了检查，但这里是安全防护）
    if (!project) return null;
    const previewImages = project.preview?.images || [];
    const previewVideos = project.preview?.videos || [];
    const hasPreview = previewImages.length > 0 || previewVideos.length > 0;

    return (
        <div style={panelStyle}>
            <button 
                onClick={onClose} 
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.2rem',
                    color: '#333',
                    cursor: 'pointer',
                }}
            >
                &times; {/* 乘号作为关闭图标 */}
            </button>

            <h2>{project.title}</h2>
            {hasPreview && (
                <div style={previewGridStyle} aria-label={`${project.title} previews`}>
                    {previewImages.map((image) => (
                        <figure key={image.src} style={{ margin: 0 }}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                style={previewImageStyle}
                                loading="lazy"
                            />
                            <figcaption style={previewCaptionStyle}>{image.caption}</figcaption>
                        </figure>
                    ))}
                    {previewVideos.map((video, index) => (
                        <figure key={video.src} style={{ margin: 0 }}>
                            {video.kind === 'youtube' ? (
                                // YouTube previews use a thumbnail link; GitHub mp4 assets can play inline.
                                <a href={video.src} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                                    <img
                                        src={video.thumbnail}
                                        alt={`${video.caption || project.title} video preview`}
                                        style={previewImageStyle}
                                        loading="lazy"
                                    />
                                </a>
                            ) : (
                                <video
                                    src={video.src}
                                    style={previewImageStyle}
                                    controls
                                    muted
                                    preload="metadata"
                                />
                            )}
                            <figcaption style={previewCaptionStyle}>
                                {video.caption || `Demo ${index + 1}`}
                            </figcaption>
                            <a href={video.src} target="_blank" rel="noopener noreferrer" style={previewLinkStyle}>
                                Open video
                            </a>
                        </figure>
                    ))}
                </div>
            )}
            {/* Match the 2D project cards: resume highlights are easier to scan as bullets. */}
            <ul style={{ color: '#4f4337', fontWeight: 500, lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                {project.highlights.map((highlight, index) => (
                    <li key={index} style={{ marginBottom: '0.55rem' }}>{highlight}</li>
                ))}
            </ul>
            
            <hr style={{ border: '0', borderTop: '1px solid #eee' }}/>

            <p><strong>Technologies: </strong> {project.tags.join(', ')}</p>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                {project.links.liveDemo && (
                    <a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer">
                        <button style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                            Live Demo
                        </button>
                    </a>
                )}
                {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <button style={{ backgroundColor: '#4e79a7', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                            GitHub Link
                        </button>
                    </a>
                )}
            </div>
            
        </div>
    );
};

export default ProjectDetailsPanel;

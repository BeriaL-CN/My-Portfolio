// src/ExperienceDetailsPanel.jsx
// 3D 职业经历面板：复用简历数据，但保持为终端式经历列表而不是项目详情。
import React from 'react';

const panelStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '520px',
    maxWidth: '92vw',
    padding: '28px',
    background: 'linear-gradient(180deg, #fffdf5 0%, #f8f0e0 100%)',
    border: '2px solid #90c8e8',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    zIndex: 20,
    color: '#333',
    maxHeight: '86dvh',
    overflow: 'hidden',
    fontFamily: "'Courier New', monospace"
};

const closeButtonStyle = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    color: '#5c4f42',
    cursor: 'pointer',
    zIndex: 2,
    width: '36px',
    height: '32px',
    padding: 0,
    borderRadius: '6px',
    background: 'rgba(255, 253, 245, 0.92)',
    border: '2px solid #d0b890',
    boxShadow: '0 2px 6px rgba(80, 60, 30, 0.16)',
    fontSize: '1.2rem',
    fontWeight: 800,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const panelBodyStyle = {
    maxHeight: 'calc(86dvh - 56px)',
    overflowY: 'auto',
    paddingRight: '6px'
};

const experienceItemStyle = {
    margin: '0 0 18px 0',
    padding: '0 0 18px 0',
    borderBottom: '1px solid #e0d0b0'
};

const metaStyle = {
    color: '#706050',
    fontSize: '0.76rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    margin: '0 0 8px 0'
};

const tagStyle = {
    display: 'inline-block',
    margin: '0 6px 6px 0',
    padding: '4px 7px',
    border: '2px solid #3078a0',
    borderRadius: '4px',
    background: 'linear-gradient(180deg, #70b8e0 0%, #5098c0 100%)',
    color: 'white',
    fontSize: '0.62rem',
    fontWeight: 700,
    textTransform: 'uppercase'
};

const ExperienceDetailsPanel = ({ experiencePanel, onClose }) => {
    if (!experiencePanel?.experiences?.length) return null;

    return (
        <div style={panelStyle}>
            <button onClick={onClose} style={closeButtonStyle} aria-label="Close experience details">
                &times;
            </button>

            <div style={panelBodyStyle}>
                <h2 style={{ margin: '0 38px 8px 0', color: '#6b4423' }}>{experiencePanel.title}</h2>
                <p style={{ margin: '0 0 22px 0', color: '#4f4337', fontWeight: 600, lineHeight: 1.6 }}>
                    Technical experience pulled from the public resume data.
                </p>

                {experiencePanel.experiences.map((experience) => (
                    <article key={experience.id} style={experienceItemStyle}>
                        <p style={metaStyle}>{experience.dateRange} · {experience.location}</p>
                        <h3 style={{ margin: '0 0 6px 0', color: '#6b4423', lineHeight: 1.35 }}>
                            {experience.position}
                        </h3>
                        <p style={{ margin: '0 0 10px 0', color: '#4f4337', fontWeight: 800 }}>
                            {experience.company}
                        </p>
                        {/* Keep each 3D entry compact so the modal remains navigable in the canvas overlay. */}
                        <ul style={{ margin: '0 0 12px 0', paddingLeft: '1.2rem', color: '#4f4337', lineHeight: 1.65 }}>
                            {experience.highlights.slice(0, 2).map((highlight, index) => (
                                <li key={index} style={{ marginBottom: '6px' }}>{highlight}</li>
                            ))}
                        </ul>
                        <div>
                            {experience.tags.map((tag) => (
                                <span key={tag} style={tagStyle}>{tag}</span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ExperienceDetailsPanel;

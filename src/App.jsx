// src/App.jsx

import React, { useState } from 'react'; 
import { Canvas } from '@react-three/fiber'; 
import ThreeDScene from './components/3d/ThreeDScene';
import './App.css'; 
import ProjectDetailsPanel from './components/3d/ProjectDetailsPanel';
import Portfolio2D from './components/2d/Portfolio2D';

function App() {
  const [viewMode, setViewMode] = useState('2D');
  const [selectedProject, setSelectedProject] = useState(null);

  const uiStyle = { 
    position: 'fixed', 
    bottom: 20, 
    left: 20, 
    zIndex: 999, 
    padding: '12px 24px', 
    background: 'linear-gradient(180deg, #f8f0e0 0%, #e8e0d0 100%)',
    border: '3px solid #b0a080',
    borderRadius: '25px',
    cursor: 'pointer',
    color: '#605030', 
    fontWeight: '700',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 12px rgba(80, 60, 30, 0.2)',
    transition: 'all 0.2s ease',
    fontFamily: "'Courier New', monospace"
  };


  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      
      {/* 视图模式切换按钮 */}
      <button 
        style={uiStyle}
        onClick={(e) => {
          setViewMode(viewMode === '3D' ? '2D' : '3D');
          // 防止按钮保持选中状态
          e.target.blur();
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(180deg, #fffaf0 0%, #f8f0e0 100%)';
          e.target.style.borderColor = '#c8b090';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(80, 60, 30, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(180deg, #f8f0e0 0%, #e8e0d0 100%)';
          e.target.style.borderColor = '#b0a080';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(80, 60, 30, 0.2)';
        }}
      >
        switch to the {viewMode === '3D' ? '2D' : '3D'} view
      </button>

      {/* 3D Canvas 区域 */}
      {viewMode === '3D' ? (
        <Canvas
          camera={{ position: [0, 7, 12], fov: 50 }}
          style={{ background: '#000000ff' }}
        >
          <ThreeDScene 
            onProjectSelect={setSelectedProject}
            selectedProject={selectedProject}
            onProjectClose={() => setSelectedProject(null)}
            viewMode={viewMode}
          />
        </Canvas>
      ) : (
        // 2D Portfolio 视图
        <Portfolio2D />
      )} 
      
      {/* 项目详情面板 */}
      {selectedProject && (
        <ProjectDetailsPanel 
          project={selectedProject}
          onClose={() => setSelectedProject(null)} 
        />
      )}
      
    </div>
  );
}

export default App;

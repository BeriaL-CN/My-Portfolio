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
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    zIndex: 999, 
    padding: '12px 24px', 
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '2px solid rgba(102, 126, 234, 0.5)',
    borderRadius: '25px',
    cursor: 'pointer',
    color: '#667eea', 
    fontWeight: '700',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  };


  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      
      {/* 视图模式切换按钮 */}
      <button 
        style={uiStyle}
        onClick={() => setViewMode(viewMode === '3D' ? '2D' : '3D')}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
          e.target.style.borderColor = 'rgba(102, 126, 234, 0.8)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
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

// src/App.jsx

import React, { useState } from 'react'; 
import { Canvas } from '@react-three/fiber'; 
import ThreeDScene from './components/3d/ThreeDScene';
import './App.css'; 
import ProjectDetailsPanel from './ProjectDetailsPanel';
import Portfolio2D from './components/2d/Portfolio2D';

function App() {
  const [viewMode, setViewMode] = useState('3D');
  const [selectedProject, setSelectedProject] = useState(null);

  const uiStyle = { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    zIndex: 10, 
    padding: '10px 15px', 
    backgroundColor: 'white', 
    border: '1px solid #ccc',
    cursor: 'pointer',
    color: 'black', 
    fontWeight: 'bold'
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      
      {/* 视图模式切换按钮 */}
      <button 
        style={uiStyle}
        onClick={() => setViewMode(viewMode === '3D' ? '2D' : '3D')}
      >
        切换到 {viewMode === '3D' ? '2D' : '3D'} 视图
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

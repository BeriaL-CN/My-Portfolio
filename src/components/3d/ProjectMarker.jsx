// src/ProjectMarker.jsx

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboardControls } from './useKeyboardControls';

const BALL_MODEL_PATH = 'models/pokeballs.glb'; 

export function ProjectMarker({ data, onProjectSelect, onProjectClose, selectedProject, onRegister, player, viewMode, isMobile, ...props }) {
  const meshRef = useRef(); // 引用到标记的 mesh 对象
  const [hovered, hover] = useState(false); // 悬停状态
  const [isNear, setIsNear] = useState(false); // 玩家接近状态
  const keys = useKeyboardControls(); // 键盘控制状态
  const spacePressed = useRef(false); // 空格键按下状态，用于防止连续触发

  // 1. 加载精灵球 GLB 模型
  const { scene } = useGLTF(BALL_MODEL_PATH);

  // 2. 提取模型中的特定子对象（根据数据里的 model 字段），并进行必要的 transform 设置
  const ballModel = useMemo(() => {
    // 根据数据里的 ballName 提取，如果没有则选第一个
    const target = scene.getObjectByName(data.model);
    
    if (!target) {
      console.warn(`找不到名为 ${data.model} 的子模型`);
      return new THREE.Group(); // 没找到则返回空组防止崩溃
    }

    //重置模型的 transform，确保它在正确的位置和大小
    target.position.set(0, 0, 0);
    target.scale.set(0.15, 0.15, 0.15); // 根据需要调整缩放
    
    //不能克隆模型，因为这样导致没办法改变它的位置和大小，所以直接返回原模型，并且在 ThreeDScene.jsx 中使用 primitive 来渲染它，这样就可以直接控制它的 transform 了。

    return target;
  }, [scene, data.model]);

  // 4. 视图切换时强制重新加载
  useEffect(() => {
    // 只在3D视图模式下重新加载模型
    if (viewMode === '3D') {
      const timeoutId = setTimeout(() => {
        useGLTF.clear(BALL_MODEL_PATH);
        useGLTF.preload(BALL_MODEL_PATH);
        console.log(`[ProjectMarker] ${data.title} - Model reloaded for 3D view`);
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [viewMode]); // 只依赖视图模式

  // 5. 注册碰撞（继承你之前的逻辑）
  useEffect(() => {
    if (onRegister && meshRef.current) {
      onRegister(meshRef.current);
    }
  }, [onRegister]);

  // 6. 每帧动画与距离检测
  useFrame((state) => {
    if (meshRef.current && player && player.current) {
      // 上下浮动动画
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.002;

      // 距离检测逻辑 - 使用传入的玩家对象引用
      // 使用 getWorldPosition 确保在 group 嵌套下坐标依然准确
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      const distance = worldPos.distanceTo(player.current.position);
      
      // 接近判定
      if (distance < 2) { // 稍微放宽判定范围，提升操作感
        setIsNear(true);
        hover(true);
        
        // 空格键交互：靠近时按空格切换面板开关状态
        if (keys.Space && !spacePressed.current) {
          spacePressed.current = true;
          if (selectedProject) {
            onProjectClose();
          } else {
            onProjectSelect(data);
          }
        }
        
        // 检测空格键释放
        if (!keys.Space) {
          spacePressed.current = false;
        }
      } else {
        setIsNear(false);
        spacePressed.current = false;
        // 如果不是鼠标悬停，且人走开了，才取消 hover 状态
        if (!hovered) hover(false); 
      }
    }
  });

  return (
    // 保持你之前的 group 结构和 position 传入
    <group position={props.position}>
      {/* 浮动文字提示 - 桌面端 */}
      {isNear && !selectedProject && !isMobile && (
        <Html distanceFactor={10} position={[0, 0.8, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            Press Space to see <br/>{data.title}
          </div>
        </Html>
      )}
      
      {/* 浮动文字提示 - 移动端 */}
      {isNear && !selectedProject && isMobile && (
        <Html distanceFactor={10} position={[0, 0.8, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            Tap to see <br/>{data.title}
          </div>
        </Html>
      )}

      {/* 使用单层 mesh 包装 primitive 来确保事件处理器正确绑定 */}
      <mesh 
        ref={meshRef} 
        position={[0, -0.1, 0]}
        scale={hovered ? 1 : 1}
        onClick={(e) => {
          e.stopPropagation();
          console.log(`[ProjectMarker] ${data.title} - Mouse clicked`);
          onProjectSelect(data);
        }}
        onPointerOver={() => {
          console.log(`[ProjectMarker] ${data.title} - Mouse over`);
          hover(true);
        }}
        onPointerOut={() => {
          console.log(`[ProjectMarker] ${data.title} - Mouse out`);
          hover(false);
        }}
      >
        <primitive object={ballModel}/>
        <meshStandardMaterial/>
      </mesh>
    </group>
  );
}

// 预加载模型
useGLTF.preload(BALL_MODEL_PATH);
// src/PokemonCenter.jsx

import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { assetPath } from '../../utils/assetPath';

// Build the public model URL with Vite's base path so GitHub Pages does not return index.html.
const MODEL_PATH = assetPath('models/pokemon_center.glb');

export function PokemonCenter({ onLoaded, onBoundsLoaded, ...props }) {
    // useGLTF 是 Drei 提供的钩子，用于异步加载 GLTF/GLB 模型
    const { scene } = useGLTF(MODEL_PATH);
    const sceneRef = useRef(null);

    // 遍历所有子网格，确保它们是可检测的 ---
    useEffect(() => {
        const selectedMeshes = [];
        // 递归遍历模型内部的所有子对象
        scene.traverse((child) => {
            if (child.isMesh && child.name) {
                // 💡 仅将需要碰撞的网格（墙壁、 电梯）添加到 COLLISION_OBJECTS 数组中
                if (!child.name.toLowerCase().includes('floor')) {
                    selectedMeshes.push(child);
                }
            }
        });
        // 将包含碰撞网格的数组传递回父组件 ThreeDScene
        if (onLoaded) {
            onLoaded(selectedMeshes);
        }

        // Use the rendered model bounds as the playable footprint for returning to 2D.
        if (onBoundsLoaded && sceneRef.current) {
            sceneRef.current.updateMatrixWorld(true);
            const bounds = new THREE.Box3().setFromObject(sceneRef.current);
            if (!bounds.isEmpty()) {
                onBoundsLoaded(bounds.clone());
            }
        }
    }, [scene, onLoaded, onBoundsLoaded]); // 依赖项是加载的场景对象

    return (
        // primitive 允许我们直接渲染一个 Three.js 原生对象 (scene)
        <primitive
            ref={sceneRef}
            object={scene}
            scale={10} // 根据模型大小调整比例
            rotation={[0, 0, 0]} // 旋转模型使其面向相机
            position={[-0.4, 0, 0]} // 根据场景需要调整位置
            {...props}
        />
    );
}

// 预加载模型，提高用户体验
useGLTF.preload(MODEL_PATH);

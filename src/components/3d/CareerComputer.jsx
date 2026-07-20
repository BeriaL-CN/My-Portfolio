// src/CareerComputer.jsx
// 将职业经历入口附着到 Pokemon Center 现有电脑上，避免新增突兀的大型场景物件。
import React, { useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from './useKeyboardControls';

// Manual anchor based on the rendered Pokemon Center transform; this targets the PC_02 screen.
const CAREER_COMPUTER_POSITION = [5.85, 1.7, -4.3];

export function CareerComputer({
  experienceData,
  onExperienceSelect,
  onExperienceClose,
  selectedExperience,
  selectedProject,
  player,
  isMobile,
}) {
  const groupRef = useRef();
  const pulseRef = useRef();
  const screenRef = useRef();
  const spacePressed = useRef(false);
  const keys = useKeyboardControls();
  const [isNear, setIsNear] = useState(false);
  const hasExperience = experienceData?.length > 0;

  const careerTerminal = useMemo(() => ({
    title: 'Career Terminal',
    experiences: experienceData || [],
  }), [experienceData]);

  useFrame((state) => {
    if (!groupRef.current || !player?.current || !hasExperience) return;

    const elapsed = state.clock.getElapsedTime();
    const playerPosition = player.current.position;
    const terminalPosition = new THREE.Vector3();
    groupRef.current.getWorldPosition(terminalPosition);
    const distance = terminalPosition.distanceTo(playerPosition);
    const nextIsNear = distance < 2.1;

    setIsNear(nextIsNear);

    if (pulseRef.current) {
      // Breathing pulse highlights the computer as the career interaction point.
      const pulse = 1 + Math.sin(elapsed * 3.2) * 0.14;
      pulseRef.current.scale.set(pulse, pulse, pulse);
      pulseRef.current.material.opacity = nextIsNear ? 0.72 : 0.38 + Math.sin(elapsed * 2.4) * 0.12;
    }

    if (screenRef.current) {
      screenRef.current.material.opacity = nextIsNear ? 0.96 : 0.62 + Math.sin(elapsed * 5.2) * 0.2;
    }

    if (nextIsNear && keys.Space && !spacePressed.current) {
      spacePressed.current = true;
      if (selectedExperience) {
        onExperienceClose();
      } else {
        onExperienceSelect(careerTerminal);
      }
    }

    if (!keys.Space) {
      spacePressed.current = false;
    }
  });

  if (!hasExperience) return null;

  return (
    <group ref={groupRef} position={CAREER_COMPUTER_POSITION}>
      <pointLight color="#70d8ff" intensity={isNear ? 1.8 : 0.8} distance={2.6} />
      <mesh
        ref={screenRef}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 9, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          // Opening career details closes project details in App.jsx, keeping overlays mutually exclusive.
          onExperienceSelect(careerTerminal);
        }}
      >
        <planeGeometry args={[0.75, 0.38]} />
        <meshBasicMaterial color="#70d8ff" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={pulseRef} position={[0, 0, 0.015]} rotation={[-Math.PI / 9, 0, 0]}>
        <ringGeometry args={[0.38, 0.47, 36]} />
        <meshBasicMaterial color="#f8d030" transparent opacity={0.42} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, 0, 0.03]}
        rotation={[-Math.PI / 9, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          // Mobile taps need a forgiving target because the glowing screen is intentionally compact.
          onExperienceSelect(careerTerminal);
        }}
      >
        <planeGeometry args={[0.9, 0.6]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {isNear && !selectedProject && (
        <Html distanceFactor={8} position={[0, 0.45, 0]} center>
          <div style={{
            background: 'rgba(24, 32, 40, 0.82)',
            color: '#fff8e8',
            padding: '5px 11px',
            border: '1px solid rgba(112, 216, 255, 0.8)',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
            {`${isMobile ? 'Tap' : 'Press Space'} to view experience`}
          </div>
        </Html>
      )}
    </group>
  );
}

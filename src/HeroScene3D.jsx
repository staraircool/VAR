import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function GrowthCore() {
  const group = React.useRef();
  const inner = React.useRef();

  useFrame((state) => {
    if (!group.current || !inner.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.42;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
    inner.current.rotation.z = state.clock.elapsedTime * -0.9;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial color="#ff7a18" emissive="#ff3d00" emissiveIntensity={0.55} roughness={0.2} metalness={0.75} wireframe />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[2.18, 0.018, 16, 128]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff7a18" emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.012, 16, 128]} />
        <meshStandardMaterial color="#ff8a18" emissive="#ff3d00" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

export default function HeroScene3D() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 7.6], fov: 42 }} style={{ overflow: 'visible' }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 5, 5]} intensity={2.9} color="#ff7a18" />
      <pointLight position={[-4, -2, 3]} intensity={1.6} color="#ffffff" />
      <GrowthCore />
    </Canvas>
  );
}

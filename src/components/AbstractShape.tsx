import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface FluidPlaneProps {
  materialType?: 'silk' | 'velvet' | 'cotton';
}

const materialConfigs = {
  silk: { roughness: 0.2, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.2 },
  velvet: { roughness: 0.8, metalness: 0, clearcoat: 0, clearcoatRoughness: 1 },
  cotton: { roughness: 0.9, metalness: 0, clearcoat: 0, clearcoatRoughness: 1 }
};

const FluidPlane = ({ materialType = 'silk' }: FluidPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Select config and color
  const config = materialConfigs[materialType] || materialConfigs.silk;
  const materialColor = materialType === 'velvet' ? '#1a1a1a' : // Dark charcoal velvet
    materialType === 'cotton' ? '#E5E4E2' : // Platinum/Linen
      '#e0deda'; // Silk (Pearl)

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const geometry = meshRef.current.geometry;
    const positionAttributes = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttributes.count; i++) {
      vertex.fromBufferAttribute(positionAttributes, i);

      // base wave
      const x = vertex.x;
      const y = vertex.y;

      // simple rolling wave simulating fabric in wind
      const waveX = Math.sin(x * 0.5 + time * 0.5) * 0.5;
      const waveY = Math.cos(y * 0.3 + time * 0.3) * 0.5;

      // Mouse Interaction Ripple (distance from mouse pos)
      const mouseX = (state.mouse.x * viewport.width) / 2;
      const mouseY = (state.mouse.y * viewport.height) / 2;
      const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));

      // Creates a subtle "push" effect near mouse
      const ripple = Math.sin(dist * 2 - time * 3) * Math.max(0, (5 - dist) / 5);

      // Combine for Z displacement
      const z = waveX + waveY + ripple * 0.2;

      positionAttributes.setZ(i, z);
    }

    positionAttributes.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-0.2, 0, 0]} position={[0, 0, -2]}>
      {/* High segment count for smooth waves */}
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 64, 64]} />
      <meshPhysicalMaterial
        color={materialColor}
        roughness={config.roughness}
        metalness={config.metalness}
        clearcoat={config.clearcoat}
        clearcoatRoughness={config.clearcoatRoughness}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default FluidPlane;

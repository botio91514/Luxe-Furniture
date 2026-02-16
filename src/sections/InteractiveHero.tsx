import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame, useThree, extend, type ThreeElement } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';

// --- Custom Shader Material Definition ---
const WaveMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.0, 0.0, 0.0),
        uTexture: new THREE.Texture(),
        uMouse: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate distance from mouse
      float dist = distance(uv, uMouse);

      // Liquid Displacement
      float strength = 0.02 * smoothstep(0.5, 0.0, dist);
      
      uv.x += sin(uv.y * 20.0 + uTime) * strength;
      uv.y += cos(uv.x * 20.0 + uTime) * strength;

      vec4 color = texture2D(uTexture, uv);

      // Grayscale
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      
      // Reveal mask
      float mask = smoothstep(0.4, 0.1, dist);

      // Mix gray and color
      vec3 finalColor = mix(vec3(gray), color.rgb, mask);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ WaveMaterial });

// Add to ThreeElements for type safety in R3F v9+
declare module '@react-three/fiber' {
    interface ThreeElements {
        waveMaterial: ThreeElement<typeof WaveMaterial> & {
            uTime?: number;
            uColor?: THREE.Color;
            uTexture?: THREE.Texture;
            uMouse?: THREE.Vector2;
            uResolution?: THREE.Vector2;
        };
    }
}

const ImagePlane = () => {
    // Explicitly type the ref to match the ShaderMaterial uniforms we need to update
    const materialRef = useRef<THREE.ShaderMaterial & { uTime: number, uMouse: THREE.Vector2 }>(null);
    const { viewport } = useThree();

    const texture = useTexture('/hero-living-room.jpg');
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
            materialRef.current.uMouse = new THREE.Vector2(
                (state.mouse.x + 1) / 2,
                (state.mouse.y + 1) / 2
            );
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <waveMaterial
                ref={materialRef}
                uTexture={texture}
                transparent
            />
        </mesh>
    );
};

const InteractiveHero = () => {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <ImagePlane />
            </Canvas>

            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none mix-blend-exclusion text-white">
                <h1 className="text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter">
                    OBSESSION
                </h1>
                <p className="text-xl md:text-2xl uppercase tracking-[0.5em] font-light mt-4">
                    The Detail is the Design
                </p>
            </div>

            <div className="absolute bottom-12 left-6 md:left-12 z-20 pointer-events-none mix-blend-difference text-white">
                <div className="w-12 h-px bg-white mb-4" />
                <p className="text-xs uppercase tracking-widest max-w-[200px] leading-relaxed">
                    Move your cursor to reveal the true colors.
                </p>
            </div>
        </div>
    );
};

export default InteractiveHero;

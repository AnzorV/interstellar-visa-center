import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Saturn = ({ isMobile }) => {
  const saturn = useGLTF("/saturn/scene.gltf");
  const ref = useRef();

  // авто-вращение
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
 <primitive
  ref={ref}
  object={saturn.scene}
  scale={isMobile ? 4 : 3.5 }
  position={[0, -3, 0]}   // смещаем вниз по Y
/>

  );
};

const SaturnCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
   <div
  style={{
    position: "absolute",
    bottom: 0,                // прижимаем вниз
    left: "50%",              // по центру по горизонтали
    transform: "translateX(-50%)", // центрируем
    width: isMobile ? "100%" : "50%",
    height: isMobile ? "50vh" : "100vh",
    pointerEvents: "none",
  }}
>
  <Canvas
    style={{ width: "100%", height: "100%" }}
    camera={{
      position: [0, 0, isMobile ? 20 : 18], // по оси Z прямо на модель
      fov: isMobile ? 55 : 50,
    }}
    gl={{ alpha: true }}
  >
    <ambientLight intensity={1} />
    <Suspense fallback={null}>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        target={[0, 0, 0]}   // фокус строго в центр
      />
      <Saturn isMobile={isMobile} />
    </Suspense>
  </Canvas>
</div>

  );
};

export default SaturnCanvas;

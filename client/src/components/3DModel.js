import React from "react";
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {

  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial 
            color="red" 
            attatch="material" 
            distort={0.5} 
            speed={3}
            roughness={1}
        />
    </Sphere>
  )
}

export default AnimatedSphere
import { FC, useEffect, useRef } from "react";
import * as THREE from "three";

export const Three: FC<{ onPointerEnter: () => void }> = ({
  onPointerEnter,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-1, -1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, camera);

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children);

      for (const child of scene.children) {
        child.material.color.set(0x00ff00);
      }
      for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
        onPointerEnter();
      }
      renderer.render(scene, camera);
    };
    animate();

    function onPointerMove(event: MouseEvent) {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return <div ref={ref} />;
};

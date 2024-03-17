import { useEffect, useRef } from "react";

export const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return console.error("Canvas not found");
    const canvas = ref.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 400, 400);
  }, []);
  return (
    <div>
      <canvas ref={ref} width="400" height="400" />
    </div>
  );
};

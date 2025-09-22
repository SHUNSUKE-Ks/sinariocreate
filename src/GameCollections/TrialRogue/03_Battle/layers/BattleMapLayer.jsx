import React, { forwardRef, useImperativeHandle, useRef } from "react";

// Small overview map overlay (minimap). Uses solid colors for speed.
const colorFor = (id) => {
  if (id === "floor_basic") return "#7777";
  if (id === "wall_basic") return "#2227";
  if (id === "stairs_down") return "#e0c34177";
  if (id === "water_shore") return "#2c6fbf77";
  return "#f0f7";
};

const BattleMapLayer = forwardRef(function BattleMapLayer({ grid, scale = 4 }, ref) {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    draw: () => {
      const canvas = canvasRef.current;
      if (!canvas || !grid?.length) return;
      const h = grid.length,
        w = grid[0].length;
      const ctx = canvas.getContext("2d");
      canvas.width = w * scale;
      canvas.height = h * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          ctx.fillStyle = colorFor(grid[y][x]);
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }));

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        right: 12,
        top: 12,
        zIndex: 30,
        border: "1px solid #333",
        opacity: 0.6,
        pointerEvents: "none"
      }}
    />
  );
});

export default BattleMapLayer;

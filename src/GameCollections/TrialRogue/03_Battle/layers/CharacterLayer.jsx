import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const CharacterLayer = forwardRef(function CharacterLayer({ width, height, tileSize }, ref) {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    draw: ({ player, enemy, item, overlay }) => {
      const canvas = canvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = width * tileSize, H = height * tileSize;
      ctx.clearRect(0, 0, W, H);
      const px = player.x * tileSize, py = player.y * tileSize;
      const ex = enemy.x * tileSize, ey = enemy.y * tileSize;
      if (item) {
        const ix = item.x * tileSize, iy = item.y * tileSize;
        ctx.fillStyle = item.color; ctx.beginPath();
        ctx.arc(ix + tileSize/2, iy + tileSize/2, 6, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#cfe'; ctx.font = '12px sans-serif';
        ctx.fillText(`${item.name}: HP+${item.val}`, ix + 10, iy - 4);
      }
      ctx.fillStyle = enemy.color; ctx.fillRect(ex+2, ey+2, tileSize-4, tileSize-4);
      ctx.fillStyle = '#faa'; ctx.font = '12px sans-serif';
      ctx.fillText(`${enemy.name} HP:${enemy.hp} AT:${enemy.at} DF:${enemy.df}`, ex + 10, ey - 4);
      ctx.fillStyle = player.color; ctx.fillRect(px+2, py+2, tileSize-4, tileSize-4);
      ctx.fillStyle = '#ff8'; ctx.font = '12px sans-serif';
      ctx.fillText(`${player.name} HP:${player.hp} AT:${player.at} DF:${player.df}`, px + 10, py - 4);

      if (overlay) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = overlay === 'win' ? '#8ef58e' : '#ff9a9a';
        ctx.font = '28px sans-serif';
        ctx.fillText(overlay === 'win' ? 'Stage Clear' : 'Game Over', 24, 48);
      }
    }
  }));

  return (
    <canvas ref={canvasRef} width={width * tileSize} height={height * tileSize}
      style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }} />
  );
});

export default CharacterLayer;


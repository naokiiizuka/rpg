import { npcImage } from "./image.js";

export const npcs = [
  { x: 15, y: 14, frame: 2, anime: 0, frame: 2, frameCount: 2, frameInterval: 300, lastFrameTime: 0 },
  { x: 15, y: 17, frame: 0, anime: 1, frame: 0, frameCount: 2, frameInterval: 300, lastFrameTime: 0 },
  { x: 17, y: 17, frame: 0, anime: 1, frame: 0, frameCount: 2, frameInterval: 300, lastFrameTime: 0 },
];

export function drawNPCs(ctx, tileSize, offsetX, offsetY) {
  npcs.forEach((npc) => {
    if (npc.anime) {
      const now = Date.now();
      if (now - npc.lastFrameTime > npc.frameInterval) {
        npc.frame = (npc.frame + 1) % npc.frameCount;
        npc.lastFrameTime = now;
      }
    }
    const npcTileX = npc.frame;
    const npcTileY = 0;

    const canvasX = (npc.x - offsetX) * tileSize;
    const canvasY = (npc.y - offsetY) * tileSize;

    ctx.drawImage(npcImage, npcTileX * tileSize, npcTileY * tileSize, tileSize, tileSize, canvasX, canvasY, tileSize, tileSize);
  });
}

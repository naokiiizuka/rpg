import { npcImage } from "./image.js";

export const npcs = [
  { x: 7, y: 6, frame: 2, anime: 0, frame: 2, frameCount: 2, frameInterval: 300, lastFrameTime: 0 },
  { x: 7, y: 9, frame: 0, anime: 1, frame: 0, frameCount: 2, frameInterval: 300, lastFrameTime: 0 },
  { x: 9, y: 9, frame: 0, anime: 1, frame: 0, frameCount: 2, frameInterval: 300, lastFrameTime: 0 },
];

export function drawNPCs(ctx, tileSize) {
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
    ctx.drawImage(npcImage, npcTileX * tileSize, npcTileY * tileSize, tileSize, tileSize, npc.x * tileSize, npc.y * tileSize, tileSize, tileSize);
  });
}

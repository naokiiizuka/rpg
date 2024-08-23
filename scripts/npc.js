import { npcImage } from "./images.js";

export const npcs = [
  { x: 7, y: 6, frame: 2, anime: 0 },
  { x: 7, y: 9, frame: 0, anime: 1 },
  { x: 9, y: 9, frame: 0, anime: 1 },
];

export function drawNPCs(ctx, tileSize) {
  npcs.forEach((npc) => {
    if (npc.anime) {
      npc.frame = 1 - npc.frame;
    }
    const npcTileX = npc.frame;
    const npcTileY = 0;
    ctx.drawImage(npcImage, npcTileX * tileSize, npcTileY * tileSize, tileSize, tileSize, npc.x * tileSize, npc.y * tileSize, tileSize, tileSize);
  });
}

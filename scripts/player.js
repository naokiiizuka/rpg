import { map } from "./map.js";
import { playerImage } from "./images.js";
import { npcs } from "./npc.js";

const player = {
  x: 7,
  y: 7,
  width: 32,
  height: 32,
  frame: 0,
  frameCount: 2,
  frameInterval: 300,
  lastFrameTime: 0,
};

// Draw player image
export function drawPlayer(ctx, tileSize) {
  const now = Date.now();
  if (now - player.lastFrameTime > player.frameInterval) {
    player.frame = (player.frame + 1) % player.frameCount;
    player.lastFrameTime = now;
  }

  const playerTileX = player.frame;
  const playerTileY = 0;
  ctx.drawImage(playerImage, playerTileX * tileSize, playerTileY * tileSize, tileSize, tileSize, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Manage types of non-movable map tiles in an array
const blockedTiles = [0, 1, 2];

// Function to prevent the player from entering the NPC's position
function isBlockedByNPC(newX, newY) {
  return npcs.some((npc) => npc.x === newX && npc.y === newY);
}

export function movePlayer(event) {
  let newX = player.x;
  let newY = player.y;

  switch (event.key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
  }

  // Check: Within map bounds and not in blockedTiles or NPC positions
  if (
    newX >= 0 &&
    newX < map[0].length &&
    newY >= 0 &&
    newY < map.length &&
    !blockedTiles.includes(map[newY][newX]) && // The destination is not a blocked tile
    !isBlockedByNPC(newX, newY) // The destination is not an NPC
  ) {
    player.x = newX;
    player.y = newY;
  }
}

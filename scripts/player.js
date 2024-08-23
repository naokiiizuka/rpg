import { map } from "./map.js";
import { playerImage } from "./image.js";
import { npcs } from "./npc.js";
import { isBlockedItem } from "./item.js";

const player = {
  x: 11, // Move to the center of the map
  y: 11, // Move to the center of the map
  width: 32,
  height: 32,
  frame: 0,
  frameCount: 2,
  frameInterval: 300,
  lastFrameTime: 0,
};

// Function to draw the player. Added offset as an argument
export function drawPlayer(ctx, tileSize, offsetX, offsetY) {
  const now = Date.now();
  if (now - player.lastFrameTime > player.frameInterval) {
    player.frame = (player.frame + 1) % player.frameCount;
    player.lastFrameTime = now;
  }

  // Calculate the player's drawing position considering the offset
  const playerTileX = player.frame;
  const playerTileY = 0;

  // Subtract the map offset and draw on the canvas
  const canvasX = (player.x - offsetX) * tileSize;
  const canvasY = (player.y - offsetY) * tileSize;

  ctx.drawImage(
    playerImage,
    playerTileX * tileSize,
    playerTileY * tileSize,
    tileSize,
    tileSize, // Player sprite
    canvasX,
    canvasY,
    tileSize,
    tileSize // Drawing position on the canvas
  );
}

// Define non-movable tiles
const blockedTiles = [0, 1, 2];

// Function to check if the player is blocked by an NPC
function isBlockedByNPC(newX, newY) {
  return npcs.some((npc) => npc.x === newX && npc.y === newY);
}

// Function to move the player
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

  // Check if within map bounds and not blocked
  if (
    newX >= 0 &&
    newX < map[0].length &&
    newY >= 0 &&
    newY < map.length &&
    !blockedTiles.includes(map[newY][newX]) && // The destination is not a blocked tile
    !isBlockedByNPC(newX, newY) && // The destination is not an NPC
    !isBlockedItem(newX, newY) // The destination is not blocked by an item
  ) {
    player.x = newX;
    player.y = newY;
  }
}

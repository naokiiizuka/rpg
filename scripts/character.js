import { map } from "./map.js";
import { characterImage } from "./images.js";
import { npcs } from "./npc.js";

const character = {
  x: 7,
  y: 7,
  width: 32,
  height: 32,
  frame: 0,
};

// Draw character image
export function drawCharacter(ctx, tileSize) {
  character.frame = 1 - character.frame;
  const characterTileX = character.frame;
  const characterTileY = 0;
  ctx.drawImage(characterImage, characterTileX * tileSize, characterTileY * tileSize, tileSize, tileSize, character.x * tileSize, character.y * tileSize, tileSize, tileSize);
}

// Manage types of non-movable map tiles in an array
const blockedTiles = [0, 1, 2];

// Function to prevent the player from entering the NPC's position
function isBlockedByNPC(newX, newY) {
  return npcs.some((npc) => npc.x === newX && npc.y === newY);
}

export function moveCharacter(event) {
  let newX = character.x;
  let newY = character.y;

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
    character.x = newX;
    character.y = newY;
  }
}

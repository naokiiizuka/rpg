import { map } from "./map.js";
import { characterImage } from "./images.js";

const character = {
  x: 7,
  y: 7,
  width: 32,
  height: 32,
  frame: 0,
  frameInterval: 500,
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

  // Check if the new coordinates are within the map bounds and if the destination is not in the blockedTiles
  if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length && !blockedTiles.includes(map[newY][newX])) {
    character.x = newX;
    character.y = newY;
  }
}

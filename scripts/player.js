import { map } from "./map.js";
import { playerImage } from "./images.js";

const player = {
  x: 7,
  y: 7,
  width: 32,
  height: 32,
};

export function drawPlayer(ctx, tileSize) {
  // Draw player image
  const playerTileX = 0;
  const playerTileY = 0;
  ctx.drawImage(playerImage, playerTileX * tileSize, playerTileY * tileSize, tileSize, tileSize, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Manage types of non-movable map tiles in an array
const blockedTiles = [0, 1, 2, 3];

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

  // Check if the new coordinates are within the map bounds and if the destination is not in the blockedTiles
  if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length && !blockedTiles.includes(map[newY][newX])) {
    player.x = newX;
    player.y = newY;
  }
}

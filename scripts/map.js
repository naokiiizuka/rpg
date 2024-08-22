import { tileImage } from "./images.js";

export const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
  [0, 0, 0, 0, 1, 3, 2, 2, 2, 2, 2, 2, 3, 1, 0],
  [0, 0, 0, 0, 1, 3, 2, 3, 2, 2, 3, 2, 3, 1, 0],
  [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
  [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
  [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const tileSize = 32;

export function drawMap(ctx, tileSize) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tileType = map[y][x]; // Use map values as tile types

      // Set tile position (X coordinate)
      const tileX = tileType % 8; // X position on the tile sheet (e.g., when 8 types of tiles are arranged in a row)s
      const tileY = Math.floor(tileType / 8); // Y position on the tile sheet

      // Draw the tile image
      ctx.drawImage(
        tileImage, // Tile image object
        tileX * tileSize, // X coordinate on the tile sheet
        tileY * tileSize, // Y coordinate on the tile sheet
        tileSize, // Tile width
        tileSize, // Tile height
        x * tileSize, // X coordinate on the canvas
        y * tileSize, // Y coordinate on the canvas
        tileSize, // Tile width on the canvas
        tileSize // Tile height on the canvas
      );
    }
  }
}

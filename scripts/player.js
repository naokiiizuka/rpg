import { playerImage } from "./image.js";

const player = {
  x: 7, // Player stays in the center of the map
  y: 7,
  width: 32,
  height: 32,
  frame: 0,
  frameCount: 2,
  frameInterval: 300,
  lastFrameTime: 0,
};

// Function to draw the player at the center
export function drawPlayer(ctx, tileSize) {
  const now = Date.now();
  if (now - player.lastFrameTime > player.frameInterval) {
    player.frame = (player.frame + 1) % player.frameCount;
    player.lastFrameTime = now;
  }

  const playerTileX = player.frame;
  const playerTileY = 0;

  // The player remains in the center of the canvas
  const canvasX = player.x * tileSize;
  const canvasY = player.y * tileSize;

  ctx.drawImage(playerImage, playerTileX * tileSize, playerTileY * tileSize, tileSize, tileSize, canvasX, canvasY, tileSize, tileSize);
}

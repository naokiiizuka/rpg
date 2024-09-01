import { blockedTiles, drawMap } from "./map.js";
import { drawPlayer, player } from "./player.js";
import { drawNPCs, isBlockedNPC } from "./npc.js";
import { drawItems, isBlockedItem } from "./item.js";
import { map } from "./map.js";
import { tileImage } from "./image.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const visibleWidth = 15;
const visibleHeight = 15;

canvas.width = visibleWidth * tileSize;
canvas.height = visibleHeight * tileSize;

let mapOffsetX = 8 * tileSize;
let mapOffsetY = 8 * tileSize;
let targetOffsetX = mapOffsetX;
let targetOffsetY = mapOffsetY;

let moving = false;
let moveSpeed = 1; // Move 1px at a time

tileImage.onload = () => gameLoop();

function gameLoop() {
  drawScene();
  updatePosition(); // Smooth movement update
  requestAnimationFrame(gameLoop);
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize, mapOffsetX / tileSize, mapOffsetY / tileSize);
  drawItems(ctx, tileSize, mapOffsetX / tileSize, mapOffsetY / tileSize);
  drawNPCs(ctx, tileSize, mapOffsetX / tileSize, mapOffsetY / tileSize);
  drawPlayer(ctx, tileSize, 8, 8);
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (moving) return; // Prevent new movement while already moving

  const { x: playerX, y: playerY } = player;
  const offsetX = playerX - 8 + mapOffsetX / tileSize;
  const offsetY = playerY - 8 + mapOffsetY / tileSize;

  switch (event.key) {
    case "ArrowUp":
      if (isValidMove(offsetX, offsetY - 1)) {
        targetOffsetY = Math.max(mapOffsetY - tileSize, 0);
        moving = true;
      }
      break;
    case "ArrowRight":
      if (isValidMove(offsetX + 1, offsetY)) {
        targetOffsetX = Math.min(mapOffsetX + tileSize, (map[0].length - visibleWidth) * tileSize);
        moving = true;
      }
      break;
    case "ArrowDown":
      if (isValidMove(offsetX, offsetY + 1)) {
        targetOffsetY = Math.min(mapOffsetY + tileSize, (map.length - visibleHeight) * tileSize);
        moving = true;
      }
      break;
    case "ArrowLeft":
      if (isValidMove(offsetX - 1, offsetY)) {
        targetOffsetX = Math.max(mapOffsetX - tileSize, 0);
        moving = true;
      }
      break;
  }
}

function updatePosition() {
  if (moving) {
    if (mapOffsetX < targetOffsetX) mapOffsetX += moveSpeed;
    if (mapOffsetX > targetOffsetX) mapOffsetX -= moveSpeed;
    if (mapOffsetY < targetOffsetY) mapOffsetY += moveSpeed;
    if (mapOffsetY > targetOffsetY) mapOffsetY -= moveSpeed;

    // Stop movement when reaching the target position
    if (Math.abs(mapOffsetX - targetOffsetX) < moveSpeed && Math.abs(mapOffsetY - targetOffsetY) < moveSpeed) {
      mapOffsetX = targetOffsetX;
      mapOffsetY = targetOffsetY;
      moving = false;
      console.log("Movement stopped. Redrawing map at:", mapOffsetX, mapOffsetY);
    }
  }
}

function isValidMove(x, y) {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length && !blockedTiles.includes(map[y][x]) && !isBlockedNPC(x, y) && !isBlockedItem(x, y);
}

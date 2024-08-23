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

let mapOffsetX = 8;
let mapOffsetY = 8;

tileImage.onload = () => gameLoop();

function gameLoop() {
  drawScene();
  requestAnimationFrame(gameLoop);
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawItems(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawNPCs(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawPlayer(ctx, tileSize, 8, 8);
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (event.key === "l") logSurroundingTiles();
  moveMap(event);
}

function moveMap(event) {
  const { x: playerX, y: playerY } = player;
  const offsetX = playerX - 8 + mapOffsetX;
  const offsetY = playerY - 8 + mapOffsetY;

  switch (event.key) {
    case "ArrowUp":
      if (mapOffsetY > 0 && isValidMove(offsetX, offsetY - 1)) mapOffsetY--;
      break;
    case "ArrowRight":
      if (mapOffsetX < 16 && isValidMove(offsetX + 1, offsetY)) mapOffsetX++;
      break;
    case "ArrowDown":
      if (mapOffsetY < 16 && isValidMove(offsetX, offsetY + 1)) mapOffsetY++;
      break;
    case "ArrowLeft":
      if (mapOffsetX > 0 && isValidMove(offsetX - 1, offsetY)) mapOffsetX--;
      break;
  }
}

function isValidMove(x, y) {
  return !blockedTiles.includes(map[y][x]) && !isBlockedNPC(x, y) && !isBlockedItem(x, y);
}

function logSurroundingTiles() {
  const { x: playerX, y: playerY } = player;
  const tilePositions = [
    { x: playerX + mapOffsetX - 8, y: playerY + mapOffsetY - 8 },
    { x: playerX + mapOffsetX - 8, y: playerY + mapOffsetY - 9 },
    { x: playerX + mapOffsetX - 7, y: playerY + mapOffsetY - 8 },
    { x: playerX + mapOffsetX - 8, y: playerY + mapOffsetY - 7 },
    { x: playerX + mapOffsetX - 9, y: playerY + mapOffsetY - 8 },
  ];

  tilePositions.forEach(({ x, y }) => {
    if (x >= 0 && x < map[0].length && y >= 0 && y < map.length) {
      console.log(`Tile (${x}, ${y}): ${map[y][x]}`);
    } else {
      console.log(`Tile (${x}, ${y}): Out of bounds`);
    }
  });
}

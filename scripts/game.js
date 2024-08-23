import { blockedTiles, drawMap } from "./map.js";
import { drawPlayer, player } from "./player.js";
import { drawNPCs, isBlockedNPC } from "./npc.js";
import { drawItems, isBlockedItem } from "./item.js";
import { map } from "./map.js";
import { tileImage } from "./image.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 15;
const mapHeight = 15;

canvas.width = mapWidth * tileSize;
canvas.height = mapHeight * tileSize;

tileImage.onload = function () {
  gameLoop();
};

let mapOffsetX = 8; // Offset for the 27x27 map to display the central 15x15
let mapOffsetY = 8; // Same as above
const playerOffsetX = 8;
const playerOffsetY = 8;

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawItems(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawNPCs(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawPlayer(ctx, tileSize, playerOffsetX, playerOffsetY);
}

// Function to log map information surrounding the player
function logSurroundingMap() {
  const surroundingTiles = [
    { x: player.x - playerOffsetX + mapOffsetX, y: player.y - playerOffsetY + mapOffsetY }, // Status
    { x: player.x - playerOffsetX + mapOffsetX, y: player.y - playerOffsetY + mapOffsetY - 1 }, // Top
    { x: player.x - playerOffsetX + mapOffsetX + 1, y: player.y - playerOffsetY + mapOffsetY }, // Right
    { x: player.x - playerOffsetX + mapOffsetX, y: player.y - playerOffsetY + mapOffsetY + 1 }, // Bottom
    { x: player.x - playerOffsetX + mapOffsetX - 1, y: player.y - playerOffsetY + mapOffsetY }, // Left
  ];

  console.log("Surrounding map tiles:");
  surroundingTiles.forEach(({ x, y }) => {
    if (x >= 0 && x < map[0].length && y >= 0 && y < map.length) {
      console.log(`Tile at (${x}, ${y}): ${map[y][x]}`);
    } else {
      console.log(`Tile at (${x}, ${y}): Out of bounds`);
    }
  });
}

// Call logSurroundingMap function on a key event for testing purposes
document.addEventListener("keydown", (event) => {
  moveMap(event);
  if (event.key === "l") {
    // Press 'l' to log surrounding map info
    logSurroundingMap();
  }
});

// Function to move the map instead of the player
function moveMap(event) {
  let newX = player.x - playerOffsetX + mapOffsetX;
  let newY = player.y - playerOffsetY + mapOffsetY;
  switch (event.key) {
    case "ArrowUp":
      // console.log(map[newY - 1][newX]);
      if (mapOffsetY > 0 && !blockedTiles.includes(map[newY - 1][newX]) && !isBlockedNPC(newX, newY - 1) && !isBlockedItem(newX, newY - 1)) mapOffsetY--;
      break;
    case "ArrowRight":
      // console.log(map[newY][newX + 1]);
      if (mapOffsetX < 16 && !blockedTiles.includes(map[newY][newX + 1]) && !isBlockedNPC(newX + 1, newY) && !isBlockedItem(newX + 1, newY)) mapOffsetX++;
      break;
    case "ArrowDown":
      // console.log(map[newY + 1][newX]);
      if (mapOffsetY < 16 && !blockedTiles.includes(map[newY + 1][newX]) && !isBlockedNPC(newX, newY + 1) && !isBlockedItem(newX, newY + 1)) mapOffsetY++;
      break;
    case "ArrowLeft":
      // console.log(map[newY][newX - 1]);
      if (mapOffsetX > 0 && !blockedTiles.includes(map[newY][newX - 1]) && !isBlockedNPC(newX - 1, newY) && !isBlockedItem(newX - 1, newY)) mapOffsetX--;
      break;
  }
}

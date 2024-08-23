import { drawMap } from "./map.js";
import { drawPlayer } from "./player.js";
import { drawNPCs } from "./npc.js";
import { drawItems } from "./item.js";
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

let mapOffsetX = 4; // Offset for the 23x23 map to display the central 15x15
let mapOffsetY = 4; // Same as above

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawItems(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawNPCs(ctx, tileSize, mapOffsetX, mapOffsetY);
  drawPlayer(ctx, tileSize);
}

document.addEventListener("keydown", (event) => {
  moveMap(event);
});

// Function to move the map instead of the player
function moveMap(event) {
  switch (event.key) {
    case "ArrowUp":
      if (mapOffsetY > 0) mapOffsetY--; // Prevent moving out of bounds
      break;
    case "ArrowDown":
      if (mapOffsetY < 8) mapOffsetY++; // Prevent moving out of bounds
      break;
    case "ArrowLeft":
      if (mapOffsetX > 0) mapOffsetX--; // Prevent moving out of bounds
      break;
    case "ArrowRight":
      if (mapOffsetX < 8) mapOffsetX++; // Prevent moving out of bounds
      break;
  }
}

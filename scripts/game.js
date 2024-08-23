import { drawMap } from "./map.js";
import { drawPlayer, movePlayer } from "./player.js";
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

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize);
  drawItems(ctx, tileSize);
  drawNPCs(ctx, tileSize);
  drawPlayer(ctx, tileSize);
}

document.addEventListener("keydown", (event) => {
  movePlayer(event);
});

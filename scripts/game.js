import { drawMap } from "./map.js";
import { drawCharacter, moveCharacter } from "./character.js";
import { drawNPCs } from "./npc.js";
import { drawItems } from "./items.js";
import { tileImage } from "./images.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 15;
const mapHeight = 15;

canvas.width = mapWidth * tileSize;
canvas.height = mapHeight * tileSize;

tileImage.onload = function () {
  setInterval(() => {
    draw();
  }, 300);
};

// draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize);
  drawItems(ctx, tileSize);
  drawNPCs(ctx, tileSize);
  drawCharacter(ctx, tileSize);
}

// key event listener
document.addEventListener("keydown", (event) => {
  moveCharacter(event);
});

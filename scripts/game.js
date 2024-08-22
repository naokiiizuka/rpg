import { drawMap } from "./map.js";
import { drawPlayer, initializeCharacter, movePlayer } from "./character.js";
import { tileImage } from "./images.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 15;
const mapHeight = 15;

canvas.width = mapWidth * tileSize;
canvas.height = mapHeight * tileSize;

tileImage.onload = function () {
  initializeCharacter();
  draw();
};

// draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize);
  drawPlayer(ctx, tileSize);
}

// key event listener
document.addEventListener("keydown", (event) => {
  movePlayer(event);
  draw();
});

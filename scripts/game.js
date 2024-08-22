import { drawMap } from "./map.js";
import { drawPlayer, setPlayerStartPosition, movePlayer } from "./player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const mapWidth = 15;
const mapHeight = 15;

canvas.width = mapWidth * tileSize;
canvas.height = mapHeight * tileSize;

// タイル画像をロード
const tileImage = new Image();
tileImage.src = "assets/images/tiles.png"; // タイル画像のパス

tileImage.onload = function () {
  setPlayerStartPosition();
  draw(); // 画像がロードされた後に描画
};

// 描画関数
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx, tileSize);
  drawPlayer(ctx, tileSize);
}

// キーイベントリスナー
document.addEventListener("keydown", (event) => {
  movePlayer(event);
  draw();
});

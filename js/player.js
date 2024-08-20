import { map } from "./map.js";

const player = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
};

export function drawPlayer(ctx, tileSize) {
  ctx.fillStyle = "#FF0000"; // プレイヤーの色
  ctx.fillRect(player.x * tileSize, player.y * tileSize, player.width, player.height);
}

export function setPlayerStartPosition() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 3) {
        player.x = x;
        player.y = y;
      }
    }
  }
}

export function movePlayer(event) {
  let newX = player.x;
  let newY = player.y;

  switch (event.key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
  }

  if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length && map[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
  }
}

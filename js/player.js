import { map } from "./map.js";

const player = {
  x: 7,
  y: 7,
  width: 32,
  height: 32,
};

const tileImage = new Image();
tileImage.src = "images/tiles.png"; // プレイヤーの画像も含むタイル画像

export function drawPlayer(ctx, tileSize) {
  // プレイヤー画像を描画
  const playerTileX = 0;
  const playerTileY = 2;
  ctx.drawImage(tileImage, playerTileX * tileSize, playerTileY * tileSize, tileSize, tileSize, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

export function setPlayerStartPosition() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 8) {
        player.x = x;
        player.y = y;
      }
    }
  }
}

// 移動できないマップチップの種類を配列で管理
const blockedTiles = [0, 1, 2, 3]; // 0 と 1 と 2 は侵入不可

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

  // 新しい座標がマップの範囲内か、かつ移動先がblockedTilesに含まれていないかを確認
  if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length && !blockedTiles.includes(map[newY][newX])) {
    player.x = newX;
    player.y = newY;
  }
}

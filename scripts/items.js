import { itemImage } from "./images.js";

const items = [
  { type: "chest", x: 10, y: 4 },
  { type: "door", x: 8, y: 10 },
  { type: "stairs", x: 12, y: 11 },
];

// Draw each item on the map
export function drawItems(ctx, tileSize) {
  items.forEach((item) => {
    let itemTileX, itemTileY;

    switch (item.type) {
      case "chest":
        itemTileX = 0;
        itemTileY = 0;
        break;
      case "door":
        itemTileX = 1;
        itemTileY = 0;
        break;
      case "stairs":
        itemTileX = 2;
        itemTileY = 0;
        break;
    }

    ctx.drawImage(itemImage, itemTileX * tileSize, itemTileY * tileSize, tileSize, tileSize, item.x * tileSize, item.y * tileSize, tileSize, tileSize);
  });
}

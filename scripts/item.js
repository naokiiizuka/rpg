import { itemImage } from "./image.js";

const items = [
  { type: "chest", x: 18, y: 12, blocked: false },
  { type: "chest", x: 16, y: 15, blocked: false },
  { type: "chest", x: 17, y: 15, blocked: false },
  { type: "door", x: 16, y: 18, blocked: true },
  { type: "stairs", x: 20, y: 19, blocked: false },
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

// Function to check if an item is blocking movement
export function isBlockedItem(x, y) {
  return items.some((item) => item.x === x && item.y === y && item.blocked);
}

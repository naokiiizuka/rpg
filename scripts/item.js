import { itemImage } from "./image.js";

const items = [
  { type: "chest", x: 14, y: 8, blocked: false },
  { type: "chest", x: 12, y: 11, blocked: false },
  { type: "chest", x: 13, y: 11, blocked: false },
  { type: "door", x: 12, y: 14, blocked: true },
  { type: "stairs", x: 16, y: 15, blocked: false },
];

// Draw each item on the map
export function drawItems(ctx, tileSize, offsetX, offsetY) {
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

    const canvasX = (item.x - offsetX) * tileSize;
    const canvasY = (item.y - offsetY) * tileSize;

    ctx.drawImage(itemImage, itemTileX * tileSize, itemTileY * tileSize, tileSize, tileSize, canvasX, canvasY, tileSize, tileSize);
  });
}

// Function to check if an item is blocking movement
export function isBlockedItem(x, y) {
  return items.some((item) => item.x === x && item.y === y && item.blocked);
}

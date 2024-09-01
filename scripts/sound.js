// Initialize sound effects
export const bumpSound = new Audio("assets/sounds/bump.wav");
export const castleBgm = new Audio("assets/sounds/castle.wav");

// Play sound effect
export function playBumpSound() {
  bumpSound.play();
}

export function playCastle() {
  castleBgm.loop = true;
  castleBgm.play();
}

export function stopCastle() {
  castleBgm.pause();
  castleBgm.currentTime = 0; // Reset to the beginning
}

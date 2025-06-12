let currentDirection = null;
let directionTimeout = null;

function handlePress(direction) {
  if (currentDirection !== direction) {
    currentDirection = direction;
    window.sendDirection && window.sendDirection(direction);
  }
  clearTimeout(directionTimeout);
  directionTimeout = setTimeout(() => {
    if (currentDirection === direction) {
      window.sendDirection && window.sendDirection(direction);
      handlePress(direction);
    }
  }, 300);
}

function handleRelease() {
  currentDirection = null;
  clearTimeout(directionTimeout);
  window.sendDirection && window.sendDirection('STOP');
}

const directions = [
  { selector: '.arrow-button-up', dir: 'UP' },
  { selector: '.arrow-button-down', dir: 'DOWN' },
  { selector: '.arrow-button-left', dir: 'LEFT' },
  { selector: '.arrow-button-right', dir: 'RIGHT' }
];

directions.forEach(({ selector, dir }) => {
  document.querySelectorAll(selector).forEach(button => {
    button.addEventListener('mousedown', () => handlePress(dir));
    button.addEventListener('touchstart', (e) => { e.preventDefault(); handlePress(dir); });
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleRelease);
    button.addEventListener('touchend', handleRelease);
  });
});

document.querySelectorAll('.arrow-button-up').forEach(button => {
  button.addEventListener('click', () => {
    window.sendDirection && window.sendDirection('UP');
  });
});
document.querySelectorAll('.arrow-button-left').forEach(button => {
  button.addEventListener('click', () => {
    window.sendDirection && window.sendDirection('LEFT');
  });
});
document.querySelectorAll('.arrow-button-right').forEach(button => {
  button.addEventListener('click', () => {
    window.sendDirection && window.sendDirection('RIGHT');
  });
});
document.querySelectorAll('.arrow-button-down').forEach(button => {
  button.addEventListener('click', () => {
    window.sendDirection && window.sendDirection('DOWN');
  });
});
document.querySelectorAll('.button-stop').forEach(button => {
  button.addEventListener('click', () => {
    window.sendDirection && window.sendDirection('STOP');
  });
});
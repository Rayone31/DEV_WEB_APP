document.querySelectorAll('.arrow-button-up').forEach(button => {
  button.addEventListener('click', () => {
    alert(`Vous avez cliqué sur la flèche ${button.textContent}`);
    console.log('avance')
  });
});

document.querySelectorAll('.arrow-button-left').forEach(button => {
  button.addEventListener('click', () => {
    alert(`Vous avez cliqué sur la flèche ${button.textContent}`);
    console.log('gauche')
  });
});

document.querySelectorAll('.arrow-button-right').forEach(button => {
  button.addEventListener('click', () => {
    alert(`Vous avez cliqué sur la flèche ${button.textContent}`);
    console.log('droite')
  });
});

document.querySelectorAll('.arrow-button-down').forEach(button => {
  button.addEventListener('click', () => {
    alert(`Vous avez cliqué sur la flèche ${button.textContent}`);
    console.log('recule')
  });
});

document.querySelectorAll('.button-stop').forEach(button => {
  button.addEventListener('click', () => {
    alert(`Vous avez cliqué sur le bouton stop ${button.textContent}`);
    console.log('stop')
  });
});

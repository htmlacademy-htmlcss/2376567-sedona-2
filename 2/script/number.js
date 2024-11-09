document.querySelectorAll('.modal__number-input').forEach(function(container) {
  const input = container.querySelector('.modal__form-input');
  const decreaseButton = container.querySelector('.modal__button--decrease');
  const increaseButton = container.querySelector('.modal__button--increase');

  increaseButton.addEventListener('click', function() {
      input.value = parseInt(input.value) + 1;
  });

  decreaseButton.addEventListener('click', function() {
      if (input.id === 'adults') {
          input.value = Math.max(1, parseInt(input.value) - 1); // Минимум 1 для взрослых
      } else {
          input.value = Math.max(0, parseInt(input.value) - 1); // Минимум 0 для детей
      }
  });
});

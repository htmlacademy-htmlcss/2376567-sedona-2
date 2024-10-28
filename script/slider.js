'use strict';

const minThumb = document.querySelector('.slider__thumb--min');
const maxThumb = document.querySelector('.slider__thumb--max');
const sliderRange = document.querySelector('.slider__range');
const sliderTrack = document.querySelector('.slider__track');

const priceFromInput = document.getElementById('price-from');
const priceToInput = document.getElementById('price-to');

const resetButton = document.getElementById('reset');

let isMinDragging = false;
let isMaxDragging = false;

const updateInputs = () => {
    const min = Math.round((13000 * (Math.ceil(minThumb.offsetLeft) / sliderTrack.offsetWidth)));
    const max = Math.round((13000 * (Math.floor(maxThumb.offsetLeft) / sliderTrack.offsetWidth)));
    priceFromInput.value = min;
    priceToInput.value = max;
};

const updateThumbsFromInputs = () => {
    const minValue = parseInt(priceFromInput.value);
    const maxValue = parseInt(priceToInput.value);

    const minPercent = (minValue / 13000) * 100;
    const maxPercent = (maxValue / 13000) * 100;

    if (minPercent >= 0 && minPercent <= maxPercent && maxPercent <= 100) {
        minThumb.style.left = minPercent + '%';
        maxThumb.style.left = maxPercent + '%';
        sliderRange.style.left = minPercent + '%';
        sliderRange.style.width = (maxPercent - minPercent) + '%';
    }
};

minThumb.addEventListener('mousedown', () => {
    isMinDragging = true;
});

maxThumb.addEventListener('mousedown', () => {
    isMaxDragging = true;
});

document.addEventListener('mouseup', () => {
    isMinDragging = false;
    isMaxDragging = false;
});

document.addEventListener('mousemove', (event) => {
    const sliderRect = sliderTrack.getBoundingClientRect();
    const sliderWidth = sliderRect.width;

    if (isMinDragging) {
        let newMinPosition = ((event.clientX - sliderRect.left) / sliderWidth) * 100;
        let maxThumbPosition = (maxThumb.offsetLeft / sliderWidth) * 100;

        if (newMinPosition >= 0 && newMinPosition <= maxThumbPosition) {
          if (newMinPosition < 1) {
            newMinPosition = 0;
        }
            minThumb.style.left = newMinPosition + '%';
            sliderRange.style.left = newMinPosition + '%';
            sliderRange.style.width = (maxThumbPosition - newMinPosition) + '%';
            updateInputs();
        }
    }

    if (isMaxDragging) {
        let newMaxPosition = ((event.clientX - sliderRect.left) / sliderWidth) * 100;
        let minThumbPosition = (minThumb.offsetLeft / sliderWidth) * 100;

        if (newMaxPosition <= 100 && newMaxPosition >= minThumbPosition) {
            if (newMaxPosition > 99) {
                newMaxPosition = 100;
            }
            maxThumb.style.left = newMaxPosition + '%';
            sliderRange.style.width = (newMaxPosition - minThumbPosition) + '%';
            updateInputs();
        }
    }
});

const initSliderFromInputs = () => {
    const minValue = parseInt(priceFromInput.value);
    const maxValue = parseInt(priceToInput.value);

    const minPercent = (minValue / 13000) * 100;
    const maxPercent = (maxValue / 13000) * 100;

    minThumb.style.left = minPercent + '%';
    maxThumb.style.left = maxPercent + '%';
    sliderRange.style.left = minPercent + '%';
    sliderRange.style.width = (maxPercent - minPercent) + '%';
};

const resetSlider = () => {
    priceFromInput.value = 0;
    priceToInput.value = 13000;

    minThumb.style.left = '0%';
    maxThumb.style.left = '100%';
    sliderRange.style.left = '0%';
    sliderRange.style.width = '100%';
  };

  resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      resetSlider();
  });

  priceFromInput.addEventListener('input', updateThumbsFromInputs);
  priceToInput.addEventListener('input', updateThumbsFromInputs);

  initSliderFromInputs();

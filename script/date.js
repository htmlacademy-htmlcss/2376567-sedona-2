'use strict';

const checkInDateText = document.querySelector('#check-in');
const checkOutDateText = document.querySelector('#check-out');

const checkInDateHidden = document.getElementById('check-in-date');
const checkOutDateHidden = document.getElementById('check-out-date');

function formatDateToRussian(dateString) {
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function updateDateField(dateTextField, dateHiddenField) {
  const formattedDate = formatDateToRussian(dateHiddenField.value);
  dateTextField.value = formattedDate;
}

document.querySelectorAll('.modal__form-input--date').forEach(input => {
  input.addEventListener('click', function () {
    const dateInputHidden = document.getElementById(this.id + '-date');
    dateInputHidden.showPicker();
  });
});

checkInDateHidden.addEventListener('change', () => updateDateField(checkInDateText, checkInDateHidden));
checkOutDateHidden.addEventListener('change', () => updateDateField(checkOutDateText, checkOutDateHidden));

function calc(){
  let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = 0;

  function checkerEmpty() {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    }
  }
  persons.addEventListener('input', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
    checkerEmpty();
  });

  restDays.addEventListener('input', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
    checkerEmpty();
  });

  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total * this.options[this.selectedIndex].value;
    }
  });
}

module.exports = calc;
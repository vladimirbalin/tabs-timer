function slider() {
  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);
  setInterval(() => plusSlides(1), 5000);

  function showSlides(n) { //главная функция
    if (n > slides.length) { //зацикливаем слайды
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');       //скрываем все слайды изначально
    dots.forEach((item) => item.classList.remove('dot-active')); //делаем неактивными все точки изначально   

    slides[slideIndex - 1].style.display = 'block';              //показываем первый слайд
    dots[slideIndex - 1].classList.add('dot-active');            //делаем активной первую точку
  }

  function plusSlides(n) {              // для того чтобы юзать её в prev и next buttons logic, плюсовать/вычитать
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {            //для того чтобы юзать её в логике для кликов на определнную dot
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', () => {                 //prev button logic
    plusSlides(-1);
  });
  next.addEventListener('click', () => {                 //next button logic
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', (event) => {        //логикa для кликов на определнную dot
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });
}

module.exports = slider;
// SCSS
import '../scss/main.scss';

// Libs
import tilt from 'tilt.js';
import ActiveMenuLink from 'active-menu-link';
import ScrollReveal from 'scrollreveal';

$(() => {
  const header = $('.header');
  let justExecuted = false;
  const text = 'Alex Krakovsky';
  let line = 0;
  let count = 0;
  let result = '';

  function typeLine() {
    let interval = setTimeout(() => {
      result += text[line][count]
      document.querySelector('h1').innerHTML = result + '|';
      count++;

      if (count >= text[line].length) {
        count = 0;
        line++;

        if (line == text.length) {
          clearTimeout(interval);
          document.querySelector('h1').innerHTML = result;

          return true;
        }
      }

      typeLine();
    }, getRandomInt(getRandomInt(250 * 2.5)))
  }

  typeLine();

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  ScrollReveal().reveal('.me', { scale: 0 });
  ScrollReveal().reveal('.skills__item', { scale: 0 });
  ScrollReveal().reveal('.experience__item', { easing: 'ease-in' });

  if (window.scrollY >= 90) {
    header.addClass('scrolled')
  }

  new ActiveMenuLink('.header__nav', {
    itemTag: 'li',
    activeClass: 'active',
    ease: 'linear',
    headerHeight: 120,
  });

  window.addEventListener('scroll', () => {
    if (justExecuted) {
      return;
    }

    justExecuted = true;

    if (window.scrollY >= 90) {
      header.addClass('scrolled')
    } else {
      header.removeClass('scrolled')
    }

    setTimeout(function () {
      justExecuted = false;
    }, 50);
  });

  $('.js-tilt').tilt();
})
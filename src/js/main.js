// SCSS
import '../scss/main.scss';

// Libs
import tilt from 'tilt.js';
import ActiveMenuLink from 'active-menu-link';

$(() => {
  const header = $('.header');
  let justExecuted = false;

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
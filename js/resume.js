(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

async function loadJSONData() {
  try {
    const response = await fetch('resume.json');
    const data = await response.json();

    document.getElementById('firstname').innerText = data.firstName;
    document.getElementById('lastname').innerText = data.lastName;
    document.getElementById('address').innerText = `${data.address.city} · ${data.address.state}, ${data.address.country} · ${data.address.zipCode}`;
    document.getElementById('email').innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
    document.getElementById('about').innerText = data.about;

    document.getElementById('linkedin').href = data.social.linkedIn;
    document.getElementById('github').href = data.social.github;
    document.getElementById('facebook').href = data.social.facebook;
    document.getElementById('twitter').href = data.social.twitter;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadJSONData);
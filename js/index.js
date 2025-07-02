import Resume from "./modules/Resume.js";
import Translate from "./modules/Translate.js";

(function($) {
  "use strict";

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

  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery);

const resume = new Resume();
const translate = new Translate();
const jsonPath = (language) => `js/jsons/resume_${language}.json`
let currentLanguage = 'en';

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
  translate.selectorButtonTextContent(currentLanguage);

  return currentLanguage;
}

document.addEventListener('DOMContentLoaded', async () => {
  translate.selectorButtonTextContent(currentLanguage);
  await resume.loadJSONData(jsonPath("en"));
});

document.getElementById('languageToggle').addEventListener('click', async () => {
  const language = toggleLanguage();

  resume.clearElements();
  translate.renderPageTranslated(language);
  await resume.loadJSONData(jsonPath(language));
});

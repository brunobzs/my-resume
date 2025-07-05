export default class Translate {
  constructor() {
    this.translation = {
      en: {
        about: "About",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
        projects: "Projects",
        awards: "Awards"
      },
      pt: {
        about: "Sobre",
        experience: "Experiência",
        education: "Educação",
        skills: "Habilidades",
        projects: "Projetos",
        awards: "Certificações"
      }
    };
  }

  /**
   * Updates the text content of the navigation menu based on the selected language.
   * @param {string} language - The language code ('en' for English, 'pt' for Portuguese).
   */
  menuLanguage(language) {
    document.getElementById('nav-about').textContent = this.translation[language].about;
    document.getElementById('nav-experience').textContent = this.translation[language].experience;
    document.getElementById('nav-education').textContent = this.translation[language].education;
    document.getElementById('nav-skills').textContent = this.translation[language].skills;
    document.getElementById('nav-projects').textContent = this.translation[language].projects;
    document.getElementById('nav-awards').textContent = this.translation[language].awards;
  }

  /**
   * Updates the text content of section titles based on the selected language.
   * @param {string} language - The language code ('en' for English, 'pt' for Portuguese).
   */
  titleLanguage(language) {
    document.getElementById('experience-title').textContent = this.translation[language].experience;
    document.getElementById('education-title').textContent = this.translation[language].education;
    document.getElementById('skills-title').textContent = this.translation[language].skills;
    document.getElementById('skills-tools-title').textContent = language === 'en' ? 'Programming Languages & Tools' : 'Linguagens & Ferramentas';
    document.getElementById('projects-title').textContent = this.translation[language].projects;
    document.getElementById('awards-title').textContent = language === 'en'? `${this.translation[language].awards} & Certifications` : this.translation[language].awards;
  }

  /**
   * Updates the text content of the language toggle button based on the selected language.
   * @param {string} language - The language code ('en' for English, 'pt' for Portuguese).
   */
  selectorButtonTextContent(language) {
    const button = document.getElementById('languageToggle');
    button.textContent = language === 'en' ? 'PT' : 'EN';
  }

  /**
   * Updates the page content based on the selected language.
   * @param {string} language - The language code ('en' for English, 'pt' for Portuguese).
   */
  renderPageTranslated(language) {
    this.menuLanguage(language);
    this.titleLanguage(language);
  }
}

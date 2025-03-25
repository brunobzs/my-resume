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

async function loadJSONData() {
  try {
    const data = await fetch("js/resume.json");
    const resume = await data.json();

    // My Info
    document.getElementById("firstname").textContent = resume.firstName;
    document.getElementById("lastname").textContent = resume.lastName;
    document.getElementById('address').textContent = `${resume.address.city} · ${resume.address.state}, ${resume.address.country} · ${resume.address.zip}`;
    document.getElementById('email').textContent = resume.email;
    document.getElementById('email').href = `mailto:${resume.email}`;
    document.getElementById('about-me').textContent = resume.about

    // Social Media
    Object.entries(resume.links).forEach(([key, url]) => {
      const element = document.getElementById(key);
      if (element) {
        if (url) {
          element.href = url; // Define o link se existir um valor
        } else {
          element.parentElement.remove(); // Remove o <li> se o link for vazio
        }
      }
    });

    // Experience
    const experienceList = document.getElementById("experience-list");
    Object.entries(resume.experiences).forEach((experience) => {
      const { title, company, location, description, startDate, endDate, isCurrent } = experience[1];
      const experienceItem = document.createElement("div");

      experienceItem.innerHTML = `
        <div class="resume-item d-flex flex-column flex-md-row mb-5">
          <div class="resume-content mr-auto">
            <h3 id="experience-title" class="mb-0">${title}</h3>
            <div class="subheading mb-3">
              <span>${company} · ${location}</span>
            </div>
            <p id="description">${description}</p>
          </div>
          <div class="resume-date text-md-right">
            <span id="startdate" class="text-primary">${startDate}</span>
              <span> - </span>
            <span id="enddate" class="text-primary">${isCurrent ? 'Current' : endDate}</span>
          </div>
        </div>
      `;

      experienceList.appendChild(experienceItem);
    });

    // Education
    const educationList = document.getElementById("education-list");
    Object.entries(resume.education).forEach((education) => {
      const { institution, degree, major, startDate, endDate } = education[1];
      const educationItem = document.createElement("div");

      educationItem.innerHTML = `
        <div class="resume-item d-flex flex-column flex-md-row mb-5">
          <div class="resume-content mr-auto">
            <h3 class="mb-0">${institution}</h3>
            <div class="subheading mb-3">${degree}</div>
          </div>
          <div class="resume-date text-md-right">
            <span class="text-primary">${startDate} - ${endDate}</span>
          </div>
        </div>
      `;

      educationList.appendChild(educationItem);
    })

    // Skills
    const skillsList = document.getElementById("skills-list");
    Object.entries(resume.skills.tools).forEach(([name, icon]) => {
      const categoryElement = document.createElement("li");

      categoryElement.setAttribute("class", "list-inline-item");
      categoryElement.innerHTML = `<img alt="${name}" src="${icon}" width="40" height="40"/>`

      skillsList.appendChild(categoryElement);
    });

    const workflow = document.getElementById("workflow");
    Object.entries(resume.skills.workflow).forEach((item) => {
      const workflowItem = document.createElement("li");

      workflowItem.innerHTML = `
        <i class="fa-li fa fa-check"></i>
        ${item[1]}
      `;

      workflow.appendChild(workflowItem);
    });

    // Awards & Certifications
    const certificationsList = document.getElementById("certifications");
    Object.entries(resume.certifications).forEach((certification) => {
      const certificationItem = document.createElement("li");

      certificationItem.innerHTML = `
        <i class="fa-li fa fa-trophy text-warning"></i>
        ${certification[1]}
      `;

      certificationsList.appendChild(certificationItem);
    })
  } catch (error) {
    console.error('Error loading JSON data:', error);
  }
}

document.addEventListener("DOMContentLoaded", loadJSONData);
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

function renderAboutMe({ firstName, lastName, city, state, country, zipcode, email, about }) {
  document.getElementById("firstname").textContent = firstName;
  document.getElementById("lastname").textContent = lastName;
  document.getElementById('address').textContent = `${city} · ${state}, ${country} · ${zipcode}`;
  document.getElementById('email').textContent = email;
  document.getElementById('email').href = `mailto:${email}`;
  document.getElementById('about-me').textContent = about
}

function renderMyLinks(links) {
  Object.entries(links).forEach(([key, url]) => {
    const element = document.getElementById(key);

    if (element) {
      if (url) {
        return element.href = url; // Define o link se existir um valor
      } else {
        return element.parentElement.remove(); // Remove o <li> se o link for vazio
      }
    }
  });
}

function renderExperiences(experiences) {
  Object.entries(experiences).forEach((experience) => {
    const experienceList = document.getElementById("experience-list");
    const experienceItem = document.createElement("div");
    const { title, company, webpage, location, description, startDate, endDate, isCurrent } = experience[1];

    experienceItem.innerHTML = `
      <div class="resume-item d-flex flex-column flex-md-row mb-5">
        <div class="resume-content mr-auto">
          <h3 id="experience-title" class="mb-0">${title}</h3>
          <div class="subheading mb-3">
            ${webpage ? `<a href="${webpage}" target="_blank">${company}</a>` : company}
            <span> · ${location}</span>
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
}

function renderEducation(education) {
  Object.entries(education).forEach((education) => {
    const { institution, degree, major, startDate, endDate } = education[1];
    const educationList = document.getElementById("education-list");
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
}

function renderSkills({ tools, workflow }) {
  if(tools) {
    Object.entries(tools).forEach(([name, icon]) => {
      const skillsList = document.getElementById("skills-list");
      const skillItem = document.createElement("li");

      skillItem.setAttribute("class", "list-inline-item");
      skillItem.innerHTML = `<img alt="${name}" src="${icon}" width="40" height="40"/>`

      skillsList.appendChild(skillItem);
    });
  }
  if (workflow) {
    Object.entries(workflow).forEach((item) => {
      const workflowList = document.getElementById("workflow");
      const workflowItem = document.createElement("li");

      workflowItem.innerHTML = `<i class="fa-li fa fa-check"></i>${item[1]}`;

      workflowList.appendChild(workflowItem);
    });
  }
}

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");

  projects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.className = "col-md-6 col-lg-4 project-card";

    projectCard.innerHTML = `
      <div class="card">
        <img src="${project.image}" class="card-img-top" alt="${project.name}">
        <div class="card-body">
          <h5 class="card-title">${project.name}</h5>
          <p class="card-text">${project.description}</p>
          <div class="project-technologies">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <div class="mt-3">
            <a href="${project.repository}" class="btn btn-primary" target="_blank">
              <i class="fa fa-github"></i> Repository
            </a>
            ${project.demo ? `
              <a href="${project.demo}" class="btn btn-secondary" target="_blank">
                <i class="fa fa-external-link"></i> Demo
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    projectsList.appendChild(projectCard);
  });
}

function renderCertifications(certifications) {
  Object.entries(certifications).forEach((certification) => {
    const certificationsList = document.getElementById("certifications");
    const certificationItem = document.createElement("li");

    certificationItem.innerHTML = `<i class="fa-li fa fa-trophy text-warning"></i>${certification[1]}`;

    certificationsList.appendChild(certificationItem);
  })
}

async function loadJSONData() {
  try {
    const data = await fetch("js/resume.json");
    const resume = await data.json();

    // About
    await renderAboutMe({
      firstName: resume.firstName,
      lastName: resume.lastName,
      city: resume.address.city,
      state: resume.address.state,
      country: resume.address.country,
      zipcode: resume.address.zip,
      email: resume.email,
      about: resume.about
    })

    // Links
    if (resume.links) {
      await renderMyLinks(resume.links);
    }

    // Experience
    if (resume.experiences) {
      await renderExperiences(resume.experiences);
    }

    // Education
    if (resume.education) {
      await renderEducation(resume.education);
    }

    // Skills
    if (resume.skills) {
      await renderSkills({
        tools: resume.skills.tools,
        workflow: resume.skills.workflow
      })
    }

    // Projects
    if (resume.projects) {
      await renderProjects(resume.projects);
    }

    // Awards & Certifications
    if (resume.certifications) {
      await renderCertifications(resume.certifications);
    }
  } catch (error) {
    console.error('Error loading JSON data:', error);
  }
}

document.addEventListener("DOMContentLoaded", loadJSONData);
export default class Resume {
  /**
   * Render the "About Me" section of the resume.
   * @param {string} firstName - The first name of the person.
   * @param {string} lastName - The last name of the person.
   * @param {string} city - The city where the person lives.
   * @param {string} state - The state where the person lives.
   * @param {string} country - The country where the person lives.
   * @param {string} zipcode - The postal code of the person's address.
   * @param {string} email - The email address of the person.
   * @param {string} about - A brief description about the person.
   */
  renderAboutMe({ firstName, lastName, city, state, country, zipcode, email, about }) {
    document.getElementById("firstname").textContent = firstName;
    document.getElementById("lastname").textContent = lastName;
    document.getElementById('address').textContent = `${city} · ${state}, ${country} · ${zipcode}`;
    document.getElementById('email').textContent = email;
    document.getElementById('email').href = `mailto:${email}`;
    document.getElementById('about-me').textContent = about
  }

  /**
   * Render the links in the "My Links" section of the resume.
   * @param {Object} links - An object containing key-value pairs where keys are element IDs and values are URLs.
   */
  renderMyLinks(links) {
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

  /**
   * Render the experiences in the "Experience" section of the resume.
   * @param {Array} experiences - An array of experience objects, each containing details like title, company, webpage, location, description, startDate, endDate, and isCurrent.
   */
  renderExperiences(experiences) {
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

  /**
   * Render the education details in the "Education" section of the resume.
   * @param {Array} education - An array of education objects, each containing details like institution, degree, major, startDate, and endDate.
   */
  renderEducation(education) {
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

  /**
   * Render the skills in the "Skills" section of the resume.
   * @param {Object} tools - An object containing key-value pairs where keys are skill names and values are their corresponding icons.
   * @param {Array} workflow - An array of strings representing the workflow or methodologies used.
   */
  renderSkills({ tools, workflow }) {
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

  /**
   * Render the projects in the "Projects" section of the resume.
   * @param {Array} projects - An array of project objects, each containing details like name, image, description, technologies, repository, and demo.
   */
  renderProjects(projects) {
    const projectsList = document.getElementById("projects-list");
    const maxVisible = 6;
    let showingAll = false;

    function renderHTML (visibleCount) {
      projectsList.innerHTML = "";
      projects.slice(0, visibleCount).forEach(project => {
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

    renderHTML(maxVisible)

    const button = document.getElementById("projects-show-more-btn");
    if (button) button.remove();

    if (projects.length > maxVisible) {
      const showMoreBtn = document.createElement("button");
      showMoreBtn.id = "projects-show-more-btn";
      showMoreBtn.textContent = "Show more";
      showMoreBtn.onclick = function() {
        showingAll = !showingAll;
        if (showingAll) {
          renderHTML(projects.length);
          showMoreBtn.textContent = "Show less";
        } else {
          renderHTML(maxVisible);
          showMoreBtn.textContent = "Show more";
          // Scroll para a seção de projetos ao esconder
          projectsList.scrollIntoView({ behavior: "smooth" });
        }
      };
      projectsList.parentElement.appendChild(showMoreBtn);
    }
  }

  /**
   * Render the certifications in the "Certifications" section of the resume.
   * @param {Array} certifications - An array of certification names.
   */
  renderCertifications(certifications) {
    Object.entries(certifications).forEach((certification) => {
      const certificationsList = document.getElementById("certifications");
      const certificationItem = document.createElement("li");

      certificationItem.innerHTML = `<i class="fa-li fa fa-trophy text-warning"></i>${certification[1]}`;

      certificationsList.appendChild(certificationItem);
    })
  }

  /**
   * Load JSON data from a file and render the resume sections.
   * @param {String} jsonFile - The path to the JSON file containing resume data.
   */
  async loadJSONData(jsonFile) {
    try {
      const file = await fetch(jsonFile);
      const dataJSON = await file.json();

      // About
      await this.renderAboutMe({
        firstName: dataJSON.firstName,
        lastName: dataJSON.lastName,
        city: dataJSON.address.city,
        state: dataJSON.address.state,
        country: dataJSON.address.country,
        zipcode: dataJSON.address.zip,
        email: dataJSON.email,
        about: dataJSON.about
      })

      // Links
      if (dataJSON.links) {
        await this.renderMyLinks(dataJSON.links);
      }

      // Experience
      if (dataJSON.experiences) {
        await this.renderExperiences(dataJSON.experiences);
      }

      // Education
      if (dataJSON.education) {
        await this.renderEducation(dataJSON.education);
      }

      // Skills
      if (dataJSON.skills) {
        await this.renderSkills({
          tools: dataJSON.skills.tools,
          workflow: dataJSON.skills.workflow
        })
      }

      // Projects
      if (dataJSON.projects) {
        await this.renderProjects(dataJSON.projects);
      }

      // Awards & Certifications
      if (dataJSON.certifications) {
        await this.renderCertifications(dataJSON.certifications);
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  }

  /**
   * Clear all elements in the resume sections.
   */
  clearElements() {
    document.getElementById("experience-list").innerHTML = '';
    document.getElementById("education-list").innerHTML = '';
    document.getElementById("skills-list").innerHTML = '';
    document.getElementById("workflow").innerHTML = '';
    document.getElementById("projects-list").innerHTML = '';
    document.getElementById("certifications").innerHTML = '';
  }
}
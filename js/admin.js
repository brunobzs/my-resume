const jsonPath = await fetch('js/jsons/resume_en.json')
let resumeData = await jsonPath.json()

// Authentication
const validCredentials = { username: 'admin', password: 'admin123' };
let isAuthenticated = false;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('mainContent');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const logoutBtn = document.getElementById('logoutBtn');
const sectionTitle = document.getElementById('sectionTitle');

// Login functionality
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === validCredentials.username && password === validCredentials.password) {
    isAuthenticated = true;
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadData();
    showSection('overview');
  } else {
    loginError.classList.remove('hidden');
    setTimeout(() => loginError.classList.add('hidden'), 3000);
  }
});

// Logout functionality
logoutBtn.addEventListener('click', function() {
  isAuthenticated = false;
  loginScreen.classList.remove('hidden');
  dashboard.classList.add('hidden');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
});

// Sidebar functionality
toggleSidebarBtn.addEventListener('click', function() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  if (window.innerWidth > 768) {
    mainContent.classList.toggle('shifted');
  }
});

overlay.addEventListener('click', function() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  mainContent.classList.remove('shifted');
});

// Menu navigation
document.querySelectorAll('.sidebar-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const section = this.dataset.section;
    showSection(section);

    // Update active menu item
    document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
});

function showSection(section) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));

  // Show selected section
  document.getElementById(section + 'Section').classList.remove('hidden');

  // Update title
  const titles = {
    overview: 'Overview',
    about: 'About Information',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills & Technologies',
    projects: 'Projects',
    certifications: 'Certifications'
  };
  sectionTitle.textContent = titles[section];
}

function switchSection(section) {
  showSection(section);
  document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`).classList.add('active');
}

function loadData() {
  const data = resumeData;

  // Load about data
  document.getElementById('firstName').value = data.firstName || '';
  document.getElementById('lastName').value = data.lastName || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('aboutMe').value = data.about || '';
  document.getElementById('city').value = data.address?.city || '';
  document.getElementById('state').value = data.address?.state || '';
  document.getElementById('country').value = data.address?.country || '';
  document.getElementById('zipCode').value = data.address?.zip || '';

  // Load workflow skills
  document.getElementById('workflowItems').value = data.skills?.workflow?.join('\n') || '';

  // Load certifications
  document.getElementById('certificationsList').value = data.certifications?.join('\n') || '';

  // Load experiences
  loadExperiences();

  // Load projects
  loadProjects();

  // Load education
  loadEducation();

  // Update stats
  updateStats();
}

function updateStats() {
  const data = resumeData;
  document.getElementById('experienceCount').textContent = data.experiences?.length || 0;
  document.getElementById('projectCount').textContent = data.projects?.length || 0;
  document.getElementById('skillCount').textContent = data.skills?.workflow?.length || 0;
  document.getElementById('certCount').textContent = data.certifications?.length || 0;
}

// Experience Section Functions
function loadExperiences() {
  const experienceList = document.getElementById('experienceList');
  experienceList.innerHTML = '';

  resumeData.experiences?.forEach((exp, index) => {
    const expElement = document.createElement('div');
    expElement.className = 'experience-item';
    expElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-start mb-3">
          <h5>${exp.title}</h5>
          <button class="btn btn-sm btn-danger" onclick="deleteExperience(${index})">
              <i class="fas fa-trash"></i>
          </button>
      </div>
      <div class="row">
          <div class="col-md-6 mb-2">
              <input type="text" class="form-control" placeholder="Job Title" value="${exp.title}" onchange="updateExperience(${index}, 'title', this.value)">
          </div>
          <div class="col-md-6 mb-2">
              <input type="text" class="form-control" placeholder="Company" value="${exp.company}" onchange="updateExperience(${index}, 'company', this.value)">
          </div>
          <div class="col-md-6 mb-2">
              <input type="text" class="form-control" placeholder="Location" value="${exp.location}" onchange="updateExperience(${index}, 'location', this.value)">
          </div>
          <div class="col-md-6 mb-2">
              <input type="text" class="form-control" placeholder="Company Website" value="${exp.webpage || ''}" onchange="updateExperience(${index}, 'webpage', this.value)">
          </div>
          <div class="col-md-6 mb-2">
              <input type="text" class="form-control" placeholder="Start Date" value="${exp.startDate}" onchange="updateExperience(${index}, 'startDate', this.value)">
          </div>
          <div class="col-md-6 mb-2">
              <input type="text" class="form-control" placeholder="End Date (leave empty if current)" value="${exp.endDate || ''}" onchange="updateExperience(${index}, 'endDate', this.value)">
          </div>
          <div class="col-12 mb-2">
              <textarea class="form-control" rows="3" placeholder="Job Description" onchange="updateExperience(${index}, 'description', this.value)">${exp.description}</textarea>
          </div>
      </div>
    `;
    experienceList.appendChild(expElement);
  });
}

function addExperience() {
  const newExp = {
    title: "New Job Title",
    company: "New Company",
    location: "City, State",
    startDate: "YYYY-MM",
    endDate: "",
    description: "Write your job description here."
  };
  if (!resumeData.experiences) {
    resumeData.experiences = [];
  }
  resumeData.experiences.push(newExp);
  loadExperiences();
  updateStats();
}

function deleteExperience(index) {
  resumeData.experiences.splice(index, 1);
  loadExperiences();
  updateStats();
}

function updateExperience(index, key, value) {
  resumeData.experiences[index][key] = value;
  console.log('Experience updated:', resumeData.experiences[index]);
}

// Projects Section Functions
function loadProjects() {
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';

  resumeData.projects?.forEach((project, index) => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-item card mb-3';
    projectElement.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
            <h5>${project.name}</h5>
            <button class="btn btn-sm btn-danger" onclick="deleteProject(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="row">
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="Project Name" value="${project.name}" onchange="updateProject(${index}, 'name', this.value)">
          </div>
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="Image" value="${project.image}" onchange="updateProject(${index}, 'image', this.value)">
          </div>
          <div class="col-12 mb-2">
            <input type="text" class="form-control" placeholder="Link" value="${project.repository || ''}" onchange="updateProject(${index}, 'link', this.value)">
          </div>
          <div class="col-12 mb-2">
            <textarea class="form-control" rows="3" placeholder="Project Description" onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
          </div>
        </div>
      </div>
    `;
    projectsList.appendChild(projectElement);
  });
}

function addProject() {
  const newProject = {
    name: "New Project",
    description: "Brief description of the project.",
    link: ""
  };
  if (!resumeData.projects) {
    resumeData.projects = [];
  }
  resumeData.projects.push(newProject);
  loadProjects();
  updateStats();
}

function deleteProject(index) {
  resumeData.projects.splice(index, 1);
  loadProjects();
  updateStats();
}

function updateProject(index, key, value) {
  resumeData.projects[index][key] = value;
  console.log('Project updated:', resumeData.projects[index]);
}


// Education Section Functions
function loadEducation() {
  const educationList = document.getElementById('educationList');
  educationList.innerHTML = '';

  resumeData.education?.forEach((edu, index) => {
    const eduElement = document.createElement('div');
    eduElement.className = 'education-item card mb-3';
    eduElement.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
            <h5>${edu.institution}</h5>
            <button class="btn btn-sm btn-danger" onclick="deleteEducation(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="row">
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="Institution" value="${edu.institution}" onchange="updateEducation(${index}, 'institution', this.value)">
          </div>
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="Degree" value="${edu.degree}" onchange="updateEducation(${index}, 'degree', this.value)">
          </div>
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="Start Date" value="${edu.startDate}" onchange="updateEducation(${index}, 'startDate', this.value)">
          </div>
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="End Date (or 'Present')" value="${edu.endDate || ''}" onchange="updateEducation(${index}, 'endDate', this.value)">
          </div>
        </div>
      </div>
    `;
    educationList.appendChild(eduElement);
  });
}

function addEducation() {
  const newEdu = {
    institution: "New University",
    degree: "Degree Name",
    startDate: "YYYY",
    endDate: ""
  };
  if (!resumeData.education) {
    resumeData.education = [];
  }
  resumeData.education.push(newEdu);
  loadEducation();
  updateStats();
}

function deleteEducation(index) {
  resumeData.education.splice(index, 1);
  loadEducation();
  updateStats();
}

function updateEducation(index, key, value) {
  resumeData.education[index][key] = value;
  console.log('Education updated:', resumeData.education[index]);
}


// Saving Functions
function saveAbout() {
  resumeData.firstName = document.getElementById('firstName').value;
  resumeData.lastName = document.getElementById('lastName').value;
  resumeData.email = document.getElementById('email').value;
  resumeData.about = document.getElementById('aboutMe').value;

  if (!resumeData.address) {
    resumeData.address = {};
  }
  resumeData.address.city = document.getElementById('city').value;
  resumeData.address.state = document.getElementById('state').value;
  resumeData.address.country = document.getElementById('country').value;
  resumeData.address.zip = document.getElementById('zipCode').value;

  console.log('About section saved:', resumeData);
  // Optional: add a visual feedback like an alert
  alert('About Information saved!');
  saveDataToFile();
}

function saveSkills() {
  const skillsText = document.getElementById('workflowItems').value;
  resumeData.skills.workflow = skillsText.split('\n').filter(line => line.trim() !== '');
  console.log('Skills saved:', resumeData.skills.workflow);
  updateStats();
  alert('Skills saved!');
  saveDataToFile();
}

function saveCertifications() {
  const certText = document.getElementById('certificationsList').value;
  resumeData.certifications = certText.split('\n').filter(line => line.trim() !== '');
  console.log('Certifications saved:', resumeData.certifications);
  updateStats();
  alert('Certifications saved!');
  saveDataToFile();
}

// Function to trigger JSON file download
function saveDataToFile() {
  const jsonData = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume_en.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log('JSON file downloaded.');
}

// Attach event listeners to new buttons
document.getElementById('aboutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  saveAbout();
});

document.getElementById('addExperience').addEventListener('click', addExperience);
document.getElementById('addProject').addEventListener('click', addProject);
document.getElementById('addEducation').addEventListener('click', addEducation);


// Make functions globally available for inline onclick attributes
window.switchSection = switchSection;
window.addExperience = addExperience;
window.deleteExperience = deleteExperience;
window.updateExperience = updateExperience;
window.addProject = addProject;
window.deleteProject = deleteProject;
window.updateProject = updateProject;
window.addEducation = addEducation;
window.deleteEducation = deleteEducation;
window.updateEducation = updateEducation;
window.saveSkills = saveSkills;
window.saveCertifications = saveCertifications;
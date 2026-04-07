// admin.js

let currentData = {};

async function loadInitialData() {
    try {
        const response = await fetch('js/jsons/resume_en.json');
        currentData = await response.json();
        populateForm(currentData);
    } catch (error) {
        console.error('Error loading initial data:', error);
        alert('Could not load resume_en.json. Starting with empty form.');
    }
}

function populateForm(data) {
    const form = document.getElementById('adminForm');
    
    // About
    form.querySelector('[name="firstName"]').value = data.firstName || '';
    form.querySelector('[name="lastName"]').value = data.lastName || '';
    form.querySelector('[name="email"]').value = data.email || '';
    form.querySelector('[name="address.city"]').value = data.address?.city || '';
    form.querySelector('[name="address.state"]').value = data.address?.state || '';
    form.querySelector('[name="address.country"]').value = data.address?.country || '';
    form.querySelector('[name="about"]').value = data.about || '';

    // Links
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = '';
    Object.entries(data.links || {}).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.className = 'col-md-6 mb-3';
        div.innerHTML = `
            <label class="form-label">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input type="text" class="form-control" name="links.${key}" value="${value}">
        `;
        linksContainer.appendChild(div);
    });

    // Experience
    const experienceList = document.getElementById('experienceList');
    experienceList.innerHTML = '';
    (data.experiences || []).forEach(exp => addExperience(exp));

    // Education
    const educationList = document.getElementById('educationList');
    educationList.innerHTML = '';
    (data.education || []).forEach(edu => addEducation(edu));

    // Projects
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
    (data.projects || []).forEach(proj => addProject(proj));

    // Skills
    form.querySelector('[name="skills.workflow"]').value = (data.skills?.workflow || []).join('\n');
    
    const toolsList = document.getElementById('toolsList');
    toolsList.innerHTML = '';
    Object.entries(data.skills?.tools || {}).forEach(([name, icon]) => addTool({name, icon}));

    // Certifications
    form.querySelector('[name="certifications"]').value = (data.certifications || []).join('\n');
}

function addExperience(exp = {}) {
    const container = document.getElementById('experienceList');
    const div = document.createElement('div');
    div.className = 'item-row experience-item';
    div.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm btn-remove" onclick="this.parentElement.remove()">×</button>
        <div class="row">
            <div class="col-md-6 mb-2">
                <label>Title</label>
                <input type="text" class="form-control form-control-sm" name="exp_title" value="${exp.title || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Company</label>
                <input type="text" class="form-control form-control-sm" name="exp_company" value="${exp.company || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Webpage</label>
                <input type="text" class="form-control form-control-sm" name="exp_webpage" value="${exp.webpage || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Location</label>
                <input type="text" class="form-control form-control-sm" name="exp_location" value="${exp.location || ''}">
            </div>
            <div class="col-md-4 mb-2">
                <label>Start Date</label>
                <input type="text" class="form-control form-control-sm" name="exp_startDate" value="${exp.startDate || ''}">
            </div>
            <div class="col-md-4 mb-2">
                <label>End Date</label>
                <input type="text" class="form-control form-control-sm" name="exp_endDate" value="${exp.endDate || ''}">
            </div>
            <div class="col-md-4 mb-2">
                <label>Current?</label>
                <select class="form-control form-control-sm" name="exp_isCurrent">
                    <option value="false" ${!exp.isCurrent ? 'selected' : ''}>No</option>
                    <option value="true" ${exp.isCurrent ? 'selected' : ''}>Yes</option>
                </select>
            </div>
            <div class="col-12 mb-2">
                <label>Description</label>
                <textarea class="form-control form-control-sm" name="exp_description" rows="2">${exp.description || ''}</textarea>
            </div>
        </div>
    `;
    container.appendChild(div);
}

function addEducation(edu = {}) {
    const container = document.getElementById('educationList');
    const div = document.createElement('div');
    div.className = 'item-row education-item';
    div.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm btn-remove" onclick="this.parentElement.remove()">×</button>
        <div class="row">
            <div class="col-md-12 mb-2">
                <label>Institution</label>
                <input type="text" class="form-control form-control-sm" name="edu_institution" value="${edu.institution || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Degree</label>
                <input type="text" class="form-control form-control-sm" name="edu_degree" value="${edu.degree || ''}">
            </div>
            <div class="col-md-3 mb-2">
                <label>Start</label>
                <input type="text" class="form-control form-control-sm" name="edu_startDate" value="${edu.startDate || ''}">
            </div>
            <div class="col-md-3 mb-2">
                <label>End</label>
                <input type="text" class="form-control form-control-sm" name="edu_endDate" value="${edu.endDate || ''}">
            </div>
        </div>
    `;
    container.appendChild(div);
}

function addProject(proj = {}) {
    const container = document.getElementById('projectsList');
    const div = document.createElement('div');
    div.className = 'item-row project-item';
    div.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm btn-remove" onclick="this.parentElement.remove()">×</button>
        <div class="row">
            <div class="col-md-6 mb-2">
                <label>Name</label>
                <input type="text" class="form-control form-control-sm" name="proj_name" value="${proj.name || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Image URL</label>
                <input type="text" class="form-control form-control-sm" name="proj_image" value="${proj.image || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Repository</label>
                <input type="text" class="form-control form-control-sm" name="proj_repository" value="${proj.repository || ''}">
            </div>
            <div class="col-md-6 mb-2">
                <label>Demo</label>
                <input type="text" class="form-control form-control-sm" name="proj_demo" value="${proj.demo || ''}">
            </div>
            <div class="col-12 mb-2">
                <label>Technologies (comma separated)</label>
                <input type="text" class="form-control form-control-sm" name="proj_technologies" value="${(proj.technologies || []).join(', ')}">
            </div>
            <div class="col-12 mb-2">
                <label>Description</label>
                <textarea class="form-control form-control-sm" name="proj_description" rows="2">${proj.description || ''}</textarea>
            </div>
        </div>
    `;
    container.appendChild(div);
}

function addTool(tool = {}) {
    const container = document.getElementById('toolsList');
    const div = document.createElement('div');
    div.className = 'item-row tool-item d-flex gap-2 align-items-center';
    div.style.padding = '10px';
    div.innerHTML = `
        <input type="text" class="form-control form-control-sm" placeholder="Tool Name" name="tool_name" value="${tool.name || ''}">
        <input type="text" class="form-control form-control-sm" placeholder="Icon URL" name="tool_icon" value="${tool.icon || ''}">
        <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(div);
}

function generateJSON() {
    const form = document.getElementById('adminForm');
    const data = {
        firstName: form.querySelector('[name="firstName"]').value,
        lastName: form.querySelector('[name="lastName"]').value,
        address: {
            city: form.querySelector('[name="address.city"]').value,
            state: form.querySelector('[name="address.state"]').value,
            country: form.querySelector('[name="address.country"]').value,
            zip: currentData.address?.zip || ""
        },
        email: form.querySelector('[name="email"]').value,
        about: form.querySelector('[name="about"]').value,
        links: {},
        experiences: [],
        education: [],
        skills: {
            tools: {},
            workflow: form.querySelector('[name="skills.workflow"]').value.split('\n').filter(l => l.trim() !== '')
        },
        projects: [],
        certifications: form.querySelector('[name="certifications"]').value.split('\n').filter(l => l.trim() !== '')
    };

    // Collect Links
    document.querySelectorAll('#linksContainer input').forEach(input => {
        const key = input.name.split('.')[1];
        data.links[key] = input.value;
    });

    // Collect Experience
    document.querySelectorAll('.experience-item').forEach(el => {
        data.experiences.push({
            title: el.querySelector('[name="exp_title"]').value,
            company: el.querySelector('[name="exp_company"]').value,
            webpage: el.querySelector('[name="exp_webpage"]').value,
            location: el.querySelector('[name="exp_location"]').value,
            startDate: el.querySelector('[name="exp_startDate"]').value,
            endDate: el.querySelector('[name="exp_endDate"]').value,
            description: el.querySelector('[name="exp_description"]').value,
            isCurrent: el.querySelector('[name="exp_isCurrent"]').value === "true"
        });
    });

    // Collect Education
    document.querySelectorAll('.education-item').forEach(el => {
        data.education.push({
            institution: el.querySelector('[name="edu_institution"]').value,
            degree: el.querySelector('[name="edu_degree"]').value,
            startDate: el.querySelector('[name="edu_startDate"]').value,
            endDate: el.querySelector('[name="edu_endDate"]').value
        });
    });

    // Collect Projects
    document.querySelectorAll('.project-item').forEach(el => {
        data.projects.push({
            name: el.querySelector('[name="proj_name"]').value,
            description: el.querySelector('[name="proj_description"]').value,
            image: el.querySelector('[name="proj_image"]').value,
            repository: el.querySelector('[name="proj_repository"]').value,
            demo: el.querySelector('[name="proj_demo"]').value,
            technologies: el.querySelector('[name="proj_technologies"]').value.split(',').map(t => t.trim()).filter(t => t !== '')
        });
    });

    // Collect Tools
    document.querySelectorAll('.tool-item').forEach(el => {
        const name = el.querySelector('[name="tool_name"]').value;
        const icon = el.querySelector('[name="tool_icon"]').value;
        if (name && icon) data.skills.tools[name] = icon;
    });

    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.textContent = JSON.stringify(data, null, 2);
    jsonOutput.style.display = 'block';
    document.getElementById('copyBtn').style.display = 'inline-block';
    
    // Scroll to output
    document.getElementById('jsonResult').scrollIntoView({ behavior: 'smooth' });
}

function copyJSON() {
    const text = document.getElementById('jsonOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa fa-check"></i> Copied!';
        btn.classList.replace('btn-primary', 'btn-success');
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('btn-success', 'btn-primary');
        }, 2000);
    });
}

window.onload = loadInitialData;

# My Resume - Interactive Web Resume

## Overview
This project is a personal interactive web resume for Bruno Carvalho, built using HTML, CSS, and JavaScript. It provides a responsive, single-page application that showcases professional experience, education, skills, projects, and certifications in an elegant and user-friendly interface.

## Features
- **Responsive Design**: Adapts seamlessly to different screen sizes and devices
- **Dynamic Content Loading**: All resume data is loaded from a JSON file, making it easy to update
- **Interactive Navigation**: Smooth scrolling between different sections
- **Project Showcase**: Visual display of portfolio projects with links to repositories and demos
- **Social Media Integration**: Links to professional profiles and contact information
- **Downloadable Resume**: Option to download a PDF version of the resume
- **Skills Visualization**: Visual representation of technical skills and tools

## Installation

### Prerequisites
- Node.js (for development)
- npm (Node Package Manager)

### Setup
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-resume.git
   cd my-resume
   ```

2. Install dependencies:
   ```
   npm install
   ```


## Usage

### Customizing the Resume
All resume data is stored in `js/resume.json`. To personalize this resume for your own use:

1. Edit the JSON file with your personal information, including:
   - Personal details (name, contact information)
   - Work experience
   - Education
   - Skills
   - Projects
   - Certifications

2. Replace the profile image in the `img` directory with your own photo.

3. Customize colors and styling in `css/resume.css` or `scss/resume.scss` if you prefer working with SASS.

### Adding Projects
To add new projects to your portfolio:

1. Add a new project object to the `projects` array in `resume.json`:
   ```json
   {
     "name": "Project Name",
     "description": "Project description",
     "image": "URL to project image",
     "repository": "URL to GitHub repository",
     "demo": "URL to live demo (optional)",
     "technologies": ["Tech1", "Tech2", "Tech3"]
   }
   ```

2. The project will automatically appear in the Projects section.

## Technologies Used
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap 5.0.0
  - jQuery 3.2.1
  - Font Awesome (for icons)

- **Development Tools**:
  - Gulp (task runner)
  - SASS/SCSS (CSS preprocessor)
  - Browser-Sync (live reload)

## Project Structure
```
my-resume/
├── css/                  # Compiled CSS files
├── downloads/            # Downloadable files (PDF resume)
├── img/                  # Images including profile picture
├── js/                   # JavaScript files
│   ├── resume.js         # Main JavaScript functionality
│   └── resume.json       # Resume data
├── scss/                 # SCSS source files
├── vendor/               # Third-party libraries
├── index.html            # Main HTML file
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Original template by [Blackrock Digital LLC](https://github.com/BlackrockDigital)
- Icons from [Font Awesome](https://fontawesome.com/) and [Devicons](https://devicons.github.io/)
- Fonts from [Google Fonts](https://fonts.google.com/)
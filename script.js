const aboutSection = document.querySelector('#about');
const aboutImage = document.querySelector('.about-image');
const aboutContent = document.querySelector('.about-content');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.querySelector('.about-container').style.opacity = '1';
            aboutImage.style.animation = 'moveImage 1s ease-out forwards';
            aboutContent.style.animation = 'moveText 1s ease-out forwards';
        }
    });
}, {
    threshold: 0.5
});

observer.observe(aboutSection);

const skillsContainer = document.querySelector('.skills-grid');

const fetchSkills = async () => {
    try {
        console.log('Fetching skills data...');
        const response = await fetch('data/skills.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const skills = await response.json();
        console.log('Parsed skills:', skills);

        if (skills.length === 0) {
            console.log('No skills found!');
        } else {
            renderSkills(skills);
        }
    } catch (error) {
        console.error('Fetch skills error:', error);
    }
};

const renderSkills = (skills) => {
    console.log('Rendering skills...');
    skills.forEach((skill, index) => {
        const skillElement = document.createElement('div');
        skillElement.classList.add('skill');

        // Generate random x and y offsets for animation
        const randomX = `${Math.floor(Math.random() * 200 - 100)}px`; // range: -100px to +100px
        const randomY = `${Math.floor(Math.random() * 200 - 100)}px`;

        // Apply random offsets as CSS variables
        skillElement.style.setProperty('--random-x', randomX);
        skillElement.style.setProperty('--random-y', randomY);

        skillElement.innerHTML = `
            <div class="skill-content">
                <img src="${skill.image}" alt="${skill.name}">
                <p>${skill.name}</p>
                <span class="tooltip">${skill.proficiency}</span>
            </div>
        `;

        skillsContainer.appendChild(skillElement);
    });
};



const observeSkills = () => {
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        observer.observe(skill);
    });
};

// Fetch and observe skills
fetchSkills().then(() => {
    observeSkills();
});



document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll('.skill');

    function generateRandomPosition() {
        const randomX = Math.floor(Math.random() * 200) - 100 + "px";
        const randomY = Math.floor(Math.random() * 200) - 100 + "px";
        return { x: randomX, y: randomY };
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skills.forEach(skill => {
                    const randomPosition = generateRandomPosition();
                    skill.style.setProperty('--random-x', randomPosition.x);
                    skill.style.setProperty('--random-y', randomPosition.y);

                    skill.style.opacity = 1;
                    skill.style.animation = "moveIn 1s ease-out forwards";
                });
            }
        });
    }, {
        threshold: 0.5
    });

    const skillsSection = document.querySelector('#skills');
    observer.observe(skillsSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const experienceContainer = document.querySelector(".experience-timeline-container");

    const fetchExperience = async () => {
        try {
            const response = await fetch('data/experience.json');
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const experienceData = await response.json();
            renderExperience(experienceData);
            observeExperience(); // Start animation observers
        } catch (error) {
            console.error("Error loading experience data:", error);
        }
    };

    const renderExperience = (data) => {
        data.forEach((item) => {
            const timeline = document.createElement('div');
            timeline.classList.add('timeline');

            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item', item.Side);

            timelineItem.innerHTML = `
                <div class="content">
                    <div class="exp-${item.Side === 'left' ? 'details' : 'logo'}">
                        ${item.Side === 'left' ? `
                            <h3>${item.Company}</h3>
                            <p class="date">${item.Date}</p>
                            <p class="role">${item.Role}</p>
                        ` : `
                            <img src="${item.Logo}" alt="Logo">
                        `}
                    </div>
                    <div class="exp-${item.Side === 'left' ? 'logo' : 'details'}">
                        ${item.Side === 'right' ? `
                            <h3>${item.Company}</h3>
                            <p class="date">${item.Date}</p>
                            <p class="role">${item.Role}</p>
                        ` : `
                            <img src="${item.Logo}" alt="Logo">
                        `}
                    </div>
                </div>
            `;

            timeline.appendChild(timelineItem);
            experienceContainer.appendChild(timeline);
        });
    };

    const observeExperience = () => {
        const experienceSection = document.querySelector("#experience");
        const logos = document.querySelectorAll("#experience .exp-logo img");

        let hasRotated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasRotated) {
                    logos.forEach((logo) => {
                        logo.classList.add("rotate-logo");
                        logo.addEventListener("animationend", () => {
                            logo.classList.remove("rotate-logo");
                        });
                    });
                    hasRotated = false;
                }
            });
        }, {
            threshold: 0.5,
        });

        observer.observe(experienceSection);
    };

    fetchExperience();
});



document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.querySelector('.projects-grid');

    const fetchProjects = async () => {
        try {
            console.log('Fetching data from API...');
            const response = await fetch('data/projects.json');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Response received, parsing JSON...');
            const projects = await response.json();

            console.log('Parsed projects:', projects);

            if (projects.length === 0) {
                console.log('No projects found!');
            } else {
                renderProjects(projects);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const renderProjects = (projects) => {
        console.log('Rendering projects to the DOM...');
        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            if (index % 2 === 0) {
                projectElement.classList.add('even');
            } else {
                projectElement.classList.add('odd');
            }

            projectElement.innerHTML = `
                <div class="project-image-container">
                    <a href="${project.Github_Link}" target="_blank">
                    <img src="${project.Image_URL}" alt="${project.Project_Name}" class="project-image">
                    </a>
                    <div class="project-overlay">
                    <h3>${project.Project_Name}</h3>
                    <p>${project.Description}</p>
                    <p><strong>Technologies Used:</strong> ${project.Technologies}</p>
                    </div>
                </div>
            `;



            projectsContainer.appendChild(projectElement);
        });
    };

    function resetAnimation(project) {
        project.style.animation = 'none';
        project.offsetHeight;
        project.style.animation = '';
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('animated')) {
                    entry.target.style.opacity = 1;
                    resetAnimation(entry.target);
                    entry.target.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });

    const observeProjects = () => {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            observer.observe(project);
        });
    };

    fetchProjects().then(() => {
        observeProjects();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const certContainer = document.querySelector('.cert-slider');

    const fetchCertifications = async () => {
        try {
            const response = await fetch('data/certifications.json');
            if (!response.ok) throw new Error('Failed to fetch');

            const certs = await response.json();
            renderCertifications(certs);
        } catch (error) {
            console.error('Error loading certifications:', error);
        }
    };

    const renderCertifications = (certs) => {
        certs.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.classList.add('cert-card');

            certCard.innerHTML = `
                <img src="${cert.Image_URL}" alt="${cert.Title}">
                <h3>${cert.Title}</h3>
                <p>${cert.Organization}</p>
                <a href="${cert.Cert_Link}" target="_blank">View Certificate</a>
            `;

            certContainer.appendChild(certCard);
        });
    };

    fetchCertifications();
});


emailjs.init({
    publicKey: "5LgZMtRi7F08wMCqp",
});

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("form-status");
    status.textContent = "⏳ Sending...";
    status.style.color = "blue";

    emailjs.sendForm("service_ct5g8tl", "template_eovv2ua", this)
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "green";
            e.target.reset();
        }, function (error) {
            console.error("FAILED...", error);
            status.textContent = "❌ Failed to send. Please try again.";
            status.style.color = "red";
        });
});
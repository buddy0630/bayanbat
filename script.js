// GitHub Username - replace with your own
const GITHUB_USERNAME = 'buddy0630';

// GitHub Repositories Fetch Function
async function fetchGitHubRepos() {
    const reposContainer = document.getElementById('githubRepos');

    try {
        // Fetch repositories sorted by stars in descending order
        const response = await fetch(`https://api.github.com/users/buddy0630/repos?sort=stars&direction=desc`);

        if (!response.ok) {
            throw new Error('GitHub API request failed');
        }

        const repos = await response.json();

        // Clear loading spinner
        reposContainer.innerHTML = '';

        // Limit to top 6 repositories
        const topRepos = repos.slice(0, 6);

        topRepos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'github-repo-card';

            repoCard.innerHTML = `
                        <h5 class="card-title">
                            <a href="${repo.html_url}" target="_blank" class="text-light">
                                ${repo.name}
                            </a>
                        </h5>
                        <p class="text-secondary">
                            ${repo.description || 'No description available'}
                        </p>
                        <div class="repo-stats">
                            <span>
                                <i class="fas fa-star text-warning"></i> 
                                ${repo.stargazers_count}
                            </span>
                            <span>
                                <i class="fas fa-code-branch text-info"></i> 
                                ${repo.forks_count}
                            </span>
                            <span>
                                <i class="fas fa-code text-success"></i> 
                                ${repo.language || 'Unknown'}
                            </span>
                        </div>
                    `;

            reposContainer.appendChild(repoCard);
        });
    } catch (error) {
        reposContainer.innerHTML = `
                    <div class="text-center text-danger">
                        <p>Unable to load GitHub repositories</p>
                        <small>${error.message}</small>
                    </div>
                `;
        console.error('GitHub API Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    // Initialize EmailJS
    emailjs.init("G3fXwHURMFoH3pvB8"); // Replace with your public key

    // Form submission handler
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Validate form inputs (basic example)
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');
        const messageElement = document.getElementById('message');

        if (!nameElement || !emailElement || !messageElement) {
            console.error("One or more form elements are missing.");
            return;
        }

        const name = nameElement.value.trim();
        const email = emailElement.value.trim();
        const message = messageElement.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        // Send the form data using EmailJS
        emailjs.sendForm('service_k32bscq', 'template_gm55v6i', this)
            .then(function (response) {
                alert('Message sent successfully! Thank you for reaching out.');
                console.log('EmailJS response:', response);
            })
            .catch(function (error) {
                alert('Failed to send the message. Please try again later.');
                console.error('EmailJS error:', error);
            });
    });


});

// Load home page by default
document.addEventListener('DOMContentLoaded', function() {
    loadPage('home');
});

// Function to load different pages
async function loadPage(pageName) {
    const contentDiv = document.getElementById('content');
    
    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        contentDiv.innerHTML = html;
        
        // Update active nav link
        updateActiveNav(pageName);
        
        // Initialize page-specific functionality
        initializePage(pageName);
        
    } catch (error) {
        console.error('Error loading page:', error);
        contentDiv.innerHTML = '<div class="content-page"><h2>Error loading page</h2><p>Please try again later.</p></div>';
    }
}

// Update active navigation
function updateActiveNav(pageName) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the correct nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick').includes(pageName)) {
            link.classList.add('active');
        }
    });
}

// Initialize page-specific functionality
function initializePage(pageName) {
    if (pageName === 'home') {
        initializeHome();
    }
    
    // Add hover effects to cards
    addHoverEffects();
}

// Home page specific functions
function initializeHome() {
    // Photo upload functionality
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
        photoInput.addEventListener('change', loadPhoto);
    }
}

// Photo upload function
function loadPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDiv = document.querySelector('.profile-photo');
            const placeholder = document.getElementById('photoPlaceholder');
            
            // Hide the placeholder
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            
            // Remove any existing photo
            const existingImg = photoDiv.querySelector('img');
            if (existingImg) {
                existingImg.remove();
            }
            
            // Add the new photo
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Profile Photo';
            img.style.cssText = 'width: 100%; height: 100%; border-radius: 50%; object-fit: cover; cursor: pointer;';
            photoDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

// Add hover effects to interactive elements
function addHoverEffects() {
    document.querySelectorAll('.work-card, .content-section, .publication-item, .project-item, .blog-item, .interest-item').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
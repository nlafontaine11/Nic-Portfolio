const iconData = [
    { icon: '<i class="fab fa-html5"></i>', name: 'HTML5' },
    { icon: '<i class="fab fa-js"></i>', name: 'JavaScript' },
    { icon: '<i class="fab fa-react"></i>', name: 'React' },
    { icon: '<i class="fab fa-node-js"></i>', name: 'Node.js' },
    { icon: '<i class="fab fa-python"></i>', name: 'Python' },
    { icon: '<i class="fab fa-php"></i>', name: 'PHP' },
    { icon: '<i class="fab fa-java"></i>', name: 'Java' },
    { icon: '<i class="fab fa-git-alt"></i>', name: 'Git' },
    { icon: '<i class="fab fa-github"></i>', name: 'GitHub' },
    { icon: '<i class="fab fa-npm"></i>', name: 'NPM' },
    { icon: '<i class="fab fa-react"></i>', name: 'Next.js' }, 
    { icon: '<i class="fab fa-js"></i>', name: 'TypeScript' }, 
    { icon: '<i class="fab fa-css3-alt"></i>', name: 'Tailwind CSS' },
    { icon: '<i class="fas fa-database"></i>', name: 'SQL' }, 
    { icon: '<i class="fas fa-leaf"></i>', name: 'MongoDB' }, 
];
const track = document.getElementById('icon-track');
const iconElements = [];
const iconSpacing = 120; // spacing for names
let animationPaused = false;
let animationId = null;

// Calculate initial positions to start icons on screen
const startPosition = 50; // start position from left edge

// Create the icons with wrappers for names
iconData.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'icon-wrapper';
    
    const iconEl = document.createElement('div');
    iconEl.className = 'icon';
    iconEl.innerHTML = item.icon;
    
    const nameEl = document.createElement('div');
    nameEl.className = 'icon-name';
    nameEl.textContent = item.name;
    
    wrapper.appendChild(iconEl);
    wrapper.appendChild(nameEl);
    
    // Position icons starting on-screen
    wrapper.style.left = `${startPosition + (index * iconSpacing)}px`;
    wrapper.style.top = '35%'; // Positioned higher to make room for names
    
    track.appendChild(wrapper);
    iconElements.push(wrapper);
    
    // Pause animation on hover
    wrapper.addEventListener('mouseenter', () => {
        animationPaused = true;
        cancelAnimationFrame(animationId);
    });
    
    wrapper.addEventListener('mouseleave', () => {
        animationPaused = false;
        animateIcons();
    });
});

// Animation parameters
let speed = 0.8; 

// Animate the icons
function animateIcons() {
    if (animationPaused) return;
    
    iconElements.forEach((wrapper, index) => {
        // Get current position
        const currentLeft = parseFloat(wrapper.style.left);
        
        // Move icon to the left
        wrapper.style.left = `${currentLeft - speed}px`;
        
        // If icon has moved off screen to the left, reset to the right
        if (currentLeft < -100) {
            // Calculate the position of the rightmost icon
            const lastIconPosition = Math.max(...iconElements.map(el => parseFloat(el.style.left)));
            // Position this icon to the right of the last icon
            wrapper.style.left = `${lastIconPosition + iconSpacing}px`;
        }
    });
    
    animationId = requestAnimationFrame(animateIcons);
}


animateIcons();

// Adjust speed based on screen width for consistent experience
function updateSpeed() {
    speed = window.innerWidth / 1200; // Divisor for medium speed
    if (speed < 0.2) speed = 0.2; // Minimum speed
    if (speed > 0.4) speed = 0.4; // Maximum speed
}

// Call once and add listener for window resize
updateSpeed();
window.addEventListener('resize', updateSpeed);
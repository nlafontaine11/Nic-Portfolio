// Store the original state globally
const originalState = {};
let expandedProjectIndex = null;

document.addEventListener('DOMContentLoaded', function() {
  // Get all project boxes
  const projectBoxes = document.querySelectorAll('.project-box');
  
  // Initialize original state storage
  projectBoxes.forEach((box, index) => {
    originalState[index] = box.innerHTML;
    
    // Add click event listener
    box.addEventListener('click', function(event) {
      // Prevent default anchor behavior
      event.preventDefault();
      event.stopPropagation();
      
      handleProjectClick(box, index);
    });
  });
});

function handleProjectClick(box, index) {
  // If the box is already expanded, collapse it
  if (box.classList.contains('expanded')) {
    closeProject(box, index);
  } else {
    // If another project is expanded, close it first
    if (expandedProjectIndex !== null) {
      const previouslyExpandedBox = document.querySelectorAll('.project-box')[expandedProjectIndex];
      closeProject(previouslyExpandedBox, expandedProjectIndex);
    }
    
    expandProject(box, index);
    expandedProjectIndex = index;
  }
}
function expandProject(box, index) {
  // Get project data
  const projectImg = box.querySelector('.project-img').src;
  const projectTitle = box.querySelector('.project-caption h5').textContent;
  
  // Sample descriptions - replace with your actual descriptions
  const descriptions = {
    'Chess': 'A sophisticated chess game built with Next.js, featuring full implementation of standard chess rules, including checkmate detection, en passant, and promotion. Designed for an immersive double-player experience with future expansion potential',
    'Coming Soon - Fantasy Baskebtall App': 'An upcoming application that allows users to create and manage fantasy basketball teams. Features will include live score updates, player statistics, and competitive leagues with friends.'
  };
  
  // Project links - add your actual links here
  const projectLinks = {
    'Chess':'https://nic-chess.netlify.app/',  
    'Coming Soon - Fantasy Baskebtall App': ''
  };
  
  // Get the description or use a default one
  const description = descriptions[projectTitle] || 'More information about this project is coming soon.';
  
  // Get the link if available
  const projectLink = projectLinks[projectTitle] || '';
  
  // Clone the original content
  const originalContent = box.innerHTML;
  
  // Create expanded view HTML
  const expandedHTML = `
    <div class="project-wrapper">
      <div class="project-image-container">
        ${originalContent}
      </div>
      <div class="project-description">
        <h3>${projectTitle}</h3>
        <p>${description}</p>
        <div class="project-buttons">
          <button class="close-btn">Close</button>
          ${projectLink ? `<a href="${projectLink}" target="_blank" class="demo-btn">Live Demo</a>` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Replace content and add expanded class
  box.innerHTML = expandedHTML;
  box.classList.add('expanded');
  
  // Add event listener to close button
  const closeBtn = box.querySelector('.close-btn');
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeProject(box, index);
  });
  
  // Prevent clicks on the links and buttons from bubbling up to the project box
  const projectButtons = box.querySelector('.project-buttons');
  if (projectButtons) {
    projectButtons.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Prevent clicks on the image from bubbling up to the project box
  const imgContainer = box.querySelector('.project-image-container');
  imgContainer.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Scroll to the expanded project
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeProject(box, index) {
  box.classList.remove('expanded');
  box.innerHTML = originalState[index];
  
  // Re-add event listener to the anchor
  const newAnchor = box.querySelector('a');
  if (newAnchor) {
    newAnchor.addEventListener('click', function(e) {
      e.preventDefault();
    });
  }
  
  if (expandedProjectIndex === index) {
    expandedProjectIndex = null;
  }
}
// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
  // Toggle Nav
  navLinks.classList.toggle('active');
  
  // Burger Animation
  burger.classList.toggle('toggle');
  
  // Animate Links
  navLinksItems.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        navLinksItems.forEach(link => {
          link.style.animation = '';
        });
      }
    }
  });
});

// Animation on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .team-card, .blog-post, .gallery-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.classList.add('fade-in');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to specific elements
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('slide-in-left');
  }
  
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });
  
  // Add hover effect to team cards
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const image = card.querySelector('.team-image');
      image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
      const image = card.querySelector('.team-image');
      image.style.transform = 'scale(1)';
    });
  });
  
  // Add gradient animation to buttons
  const buttons = document.querySelectorAll('.btn:not(.btn-outline)');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('gradient-bg');
    });
    
    button.addEventListener('mouseleave', () => {
      button.classList.remove('gradient-bg');
    });
  });
});
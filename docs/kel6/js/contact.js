document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
      });
      
      // Validate form
      let isValid = true;
      
      // Name validation
      const name = document.getElementById('name');
      if (name.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Nama lengkap harus diisi';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
      }
      
      // Email validation
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === '') {
        document.getElementById('email-error').textContent = 'Email harus diisi';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        document.getElementById('email-error').textContent = 'Email tidak valid';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
      }
      
      // Phone validation (optional)
      const phone = document.getElementById('phone');
      if (phone.value.trim() !== '' && !/^[0-9]+$/.test(phone.value)) {
        document.getElementById('phone-error').textContent = 'Nomor telepon harus berupa angka';
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
      }
      
      // Subject validation
      const subject = document.getElementById('subject');
      if (subject.value === '') {
        // No error message for select as it has a placeholder
        isValid = false;
        subject.style.borderColor = '#e74c3c';
      } else {
        subject.style.borderColor = '#ddd';
      }
      
      // Message validation
      const message = document.getElementById('message');
      if (message.value.trim() === '') {
        document.getElementById('message-error').textContent = 'Pesan harus diisi';
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
      }
      
      // If form is valid, show success message
      if (isValid) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted:', {
          name: name.value,
          email: email.value,
          phone: phone.value,
          subject: subject.value,
          message: message.value
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          formSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }
  
  // Add animation to contact form elements
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach((group, index) => {
    group.style.animationDelay = `${index * 0.1}s`;
    group.classList.add('slide-in-up');
  });
  
  // Add interactive effect to info cards
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.info-icon');
      icon.style.transform = 'scale(1.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.info-icon');
      icon.style.transform = 'scale(1)';
    });
  });
});
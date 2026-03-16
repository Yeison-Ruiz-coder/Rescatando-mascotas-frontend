// Funcionalidad del footer
export const initFooter = () => {
  console.log('Footer inicializado');
};

// Efectos de hover para iconos sociales
export const footerEffects = () => {
  const socialIcons = document.querySelectorAll('.social-icons a');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
};

// Opcional: función para smooth scroll al inicio
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
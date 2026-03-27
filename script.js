// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const gameNotif = document.getElementById('gameNotif');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  if (gameNotif && scrolled) {
    gameNotif.style.opacity = '0';
    gameNotif.style.pointerEvents = 'none';
  }
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link && scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ===== FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll(
  '.clip-card, .video-card, .schedule-card, .role-item, .mosaic-item, .social-btn'
);
fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => observer.observe(el));

// ===== VIDEO MODAL =====
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.video-player').forEach(player => {
  player.addEventListener('click', () => {
    const src = player.dataset.src;
    if (src && videoModal && modalVideo) {
      modalVideo.src = src;
      videoModal.classList.add('active');
      modalVideo.play();
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
  });
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove('active');
      modalVideo.pause();
      modalVideo.src = '';
    }
  });
}

// ===== PARTICLES =====
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 40;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '#ff2d78' : '#00f0ff';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// ===== BACKGROUND SLIDESHOW =====
const bgSlides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;

function nextSlide() {
  bgSlides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % bgSlides.length;
  bgSlides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 8000);

// ===== TASK CHECKBOX TOGGLE =====
document.querySelectorAll('.task').forEach(task => {
  task.addEventListener('click', () => {
    const check = task.querySelector('.task-check');
    if (check.textContent === '☐') {
      check.textContent = '☑';
      task.style.color = '#00ff88';
    } else {
      check.textContent = '☐';
      task.style.color = '';
    }
  });
});

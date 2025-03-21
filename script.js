
    // Matrix Rain Effect
    const matrixCanvas = document.getElementById('matrix-canvas');
    const mtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const matrixDrops = Array(Math.floor(matrixCanvas.width / 20)).fill(1);

    function drawMatrix() {
        mtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        mtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mtx.fillStyle = '#0F0';
        mtx.font = '15px monospace';

        matrixDrops.forEach((drop, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            mtx.fillText(text, i * 20, drop * 20);
            matrixDrops[i] = drop > matrixCanvas.height/20 || Math.random() > 0.95 ? 0 : drop + 1;
        });
    }
    setInterval(drawMatrix, 50);

    //Typing Effect
    const words = ["Coder", "Designer", "Leader", "Innovator", "Thinker"];
    let wordIndex = 0;
    let charIndex = 0;
    const typingSpeed = 150;  
    const erasingSpeed = 100; 
    const delayBetweenWords = 2000;
    const wordSpan = document.getElementById("word");

    function type() {
    if (charIndex < words[wordIndex].length) {
        wordSpan.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        // Word complete; wait then erase
        setTimeout(erase, delayBetweenWords);
    }
    }

    function erase() {
    if (charIndex > 0) {
        wordSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        // Move to next word, looping back if at the end
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingSpeed);
    }
    }

    document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, typingSpeed);
    });

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll with offset
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
            
            // Update URL without refreshing
            history.pushState(null, null, targetId);
        });
    });
    
    // Active state management
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-item');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => item.classList.remove('active'));
                navItems[index].classList.add('active');
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });


    // Floating Particles
    const particleCanvas = document.getElementById('particles');
    const ptx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.velocity = { x: -1 + Math.random() * 2, y: -1 + Math.random() * 2 };
            this.radius = Math.random() * 2;
        }
    }

    const particles = Array(100).fill().map(() => new Particle());

    function animateParticles() {
        ptx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(particle => {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            ptx.beginPath();
            ptx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ptx.fillStyle = 'rgba(0, 243, 255, 0.5)';
            ptx.fill();

            if(particle.x < 0 || particle.x > particleCanvas.width) particle.velocity.x *= -1;
            if(particle.y < 0 || particle.y > particleCanvas.height) particle.velocity.y *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Add card hover effects
document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.cyber-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Add timeline animations
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = 0;
    if(item.querySelector('.timeline-card').classList.contains('left')) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

function sendMessage() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('statusMessage');
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };

    // Clear previous status
    status.textContent = '';
    status.className = 'transmission-status';
    
    // Validate inputs
    let isValid = true;
    if (!inputs.name.value.trim()) {
        inputs.name.style.borderBottomColor = '#ff0000';
        isValid = false;
    }
    if (!inputs.email.value.trim() || !/^\S+@\S+\.\S+$/.test(inputs.email.value)) {
        inputs.email.style.borderBottomColor = '#ff0000';
        isValid = false;
    }
    if (!inputs.message.value.trim()) {
        inputs.message.style.borderBottomColor = '#ff0000';
        isValid = false;
    }

    if (!isValid) {
        status.textContent = 'ERROR: MISSING REQUIRED FIELDS';
        status.className = 'transmission-status error';
        return;
    }

    // Success state
    status.textContent = 'TRANSMISSION SUCCESSFUL';
    status.className = 'transmission-status success';
    form.reset();
    setTimeout(() => status.textContent = '', 3000);
}

function toggleCard(card) {
    const isActive = card.classList.contains('active');
    document.querySelectorAll('.compact-card').forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
}

// Close cards when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.compact-card')) {
        document.querySelectorAll('.compact-card').forEach(c => c.classList.remove('active'));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const scanLine = document.querySelector('.scan-line');
    setInterval(() => {
        scanLine.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            scanLine.style.transition = 'none';
            scanLine.style.transform = 'translateY(400%)';
            setTimeout(() => {
                scanLine.style.transition = 'transform 8s linear';
                scanLine.style.transform = 'translateY(-100%)';
            }, 50);
        }, 8000);
    }, 8000);
});


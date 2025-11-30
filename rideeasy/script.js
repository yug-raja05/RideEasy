// ===== Global Variables =====
let heroScene, heroCamera, heroRenderer;
let mapScene, mapCamera, mapRenderer;
let currentCarouselIndex = 0;
let currentTestimonial = 1;
let testimonialInterval;

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Initialize Three.js Hero Scene =====
function initHeroThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(window.devicePixelRatio);

    // Add particles
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;

        const color = new THREE.Color();
        color.setHSL(0.55, 1, 0.5 + Math.random() * 0.5);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    heroScene.add(particleSystem);

    // Add glowing lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array([
        -100, 0, 0,
        100, 0, 0,
        0, -100, 0,
        0, 100, 0
    ]);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    heroScene.add(lines);

    heroCamera.position.z = 100;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        lines.rotation.y += 0.002;

        heroRenderer.render(heroScene, heroCamera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== Initialize Map Three.js =====
function initMapThreeJS() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;

    mapScene = new THREE.Scene();
    mapCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    mapRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    mapRenderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Create a simple 3D map representation
    const mapGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const mapMaterial = new THREE.MeshBasicMaterial({
        color: 0x007bff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const mapPlane = new THREE.Mesh(mapGeometry, mapMaterial);
    mapPlane.rotation.x = -Math.PI / 2;
    mapScene.add(mapPlane);

    // Add location markers
    const markerGeometry = new THREE.ConeGeometry(2, 5, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    
    const markers = [
        { x: -30, z: -20 },
        { x: 30, z: 20 },
        { x: 0, z: 0 }
    ];

    markers.forEach(marker => {
        const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
        markerMesh.position.set(marker.x, 2.5, marker.z);
        mapScene.add(markerMesh);
    });

    mapCamera.position.set(0, 50, 50);
    mapCamera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        mapPlane.rotation.z += 0.001;
        mapRenderer.render(mapScene, mapCamera);
    }

    animate();

    window.addEventListener('resize', () => {
        mapCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        mapCamera.updateProjectionMatrix();
        mapRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.step-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== Carousel Functions =====
function moveCarousel(direction) {
    const track = document.getElementById('vehicles-track');
    if (!track) return;

    const cards = track.querySelectorAll('.vehicle-card');
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
    const maxIndex = cards.length - 3;

    currentCarouselIndex += direction;
    if (currentCarouselIndex < 0) currentCarouselIndex = 0;
    if (currentCarouselIndex > maxIndex) currentCarouselIndex = maxIndex;

    track.style.transform = `translateX(-${currentCarouselIndex * cardWidth}px)`;
}

// ===== Testimonials =====
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');

    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    if (testimonials[index - 1]) {
        testimonials[index - 1].classList.add('active');
        dots[index - 1].classList.add('active');
    }

    currentTestimonial = index;
}

function autoRotateTestimonials() {
    testimonialInterval = setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial > 3) currentTestimonial = 1;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// ===== Booking Modal =====
function openBookingModal(vehicleId) {
    const modal = document.getElementById('booking-modal');
    const vehicleName = document.querySelector(`[data-vehicle="${vehicleId}"] h3`)?.textContent || 'Vehicle';
    
    if (modal) {
        document.getElementById('modal-vehicle-name').value = vehicleName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make it globally available
window.closeBookingModal = closeBookingModal;
window.openBookingModal = openBookingModal;

// ===== Booking Form Submit =====
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Booking confirmed! We will contact you shortly.', 'success', 5000);
            closeBookingModal();
            bookingForm.reset();
        });
    }

    // Close modal on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// ===== Scroll to Booking =====
function scrollToBooking() {
    const vehiclesSection = document.getElementById('featured-vehicles');
    if (vehiclesSection) {
        vehiclesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.padding = '1rem';
        });
    }
});

// ===== Newsletter Form =====
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing!', 'success', 4000);
            form.reset();
        });
    });
});

// ===== Book Now Button =====
document.addEventListener('DOMContentLoaded', () => {
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    bookNowButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scrollToBooking();
        });
    });
});

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initHeroThreeJS();
    initScrollAnimations();
    autoRotateTestimonials();
    
    // Initialize map if on home page
    setTimeout(() => {
        if (document.getElementById('map-canvas')) {
            initMapThreeJS();
        }
    }, 100);
});


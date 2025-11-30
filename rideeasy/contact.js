// ===== Three.js for About Section =====
let aboutScene, aboutCamera, aboutRenderer;
let pickupMapScene, pickupMapCamera, pickupMapRenderer;

function initAboutThreeJS() {
    const canvas = document.getElementById('about-canvas');
    if (!canvas) return;

    aboutScene = new THREE.Scene();
    aboutCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    aboutRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    aboutRenderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Create a 3D bike model representation
    const bikeGroup = new THREE.Group();

    // Frame
    const frameGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10, 0, 0),
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3(10, 0, 0)
        ]),
        20,
        0.3,
        8,
        false
    );
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x007bff, emissive: 0x001122 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    bikeGroup.add(frame);

    // Wheels
    const wheelGeometry = new THREE.TorusGeometry(3, 0.2, 8, 20);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel.position.set(8, 0, 0);
    bikeGroup.add(frontWheel);

    const backWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    backWheel.position.set(-8, 0, 0);
    bikeGroup.add(backWheel);

    // Spokes
    const spokeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
    const spokeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
        spoke.position.set(8 + Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
        spoke.rotation.z = angle + Math.PI / 2;
        bikeGroup.add(spoke);
    }

    aboutScene.add(bikeGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    aboutScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    aboutScene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x007bff, 1, 100);
    pointLight.position.set(-10, 10, 10);
    aboutScene.add(pointLight);

    aboutCamera.position.set(0, 5, 20);
    aboutCamera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        
        bikeGroup.rotation.y += 0.01;
        frontWheel.rotation.z += 0.05;
        backWheel.rotation.z += 0.05;
        
        aboutRenderer.render(aboutScene, aboutCamera);
    }

    animate();

    window.addEventListener('resize', () => {
        aboutCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        aboutCamera.updateProjectionMatrix();
        aboutRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ===== Pickup Map Three.js =====
function initPickupMapThreeJS() {
    const canvas = document.getElementById('pickup-map-canvas');
    if (!canvas) return;

    pickupMapScene = new THREE.Scene();
    pickupMapCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    pickupMapRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    pickupMapRenderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Create map base
    const mapBaseGeometry = new THREE.PlaneGeometry(80, 80, 20, 20);
    const mapBaseMaterial = new THREE.MeshPhongMaterial({
        color: 0x001122,
        wireframe: false,
        transparent: true,
        opacity: 0.8
    });
    const mapBase = new THREE.Mesh(mapBaseGeometry, mapBaseMaterial);
    mapBase.rotation.x = -Math.PI / 2;
    pickupMapScene.add(mapBase);

    // Add roads
    const roadGeometry = new THREE.PlaneGeometry(5, 80);
    const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    
    const road1 = new THREE.Mesh(roadGeometry, roadMaterial);
    road1.rotation.x = -Math.PI / 2;
    road1.position.set(0, 0.1, 0);
    pickupMapScene.add(road1);

    const road2 = new THREE.Mesh(roadGeometry, roadMaterial);
    road2.rotation.x = -Math.PI / 2;
    road2.rotation.z = Math.PI / 2;
    road2.position.set(0, 0.1, 0);
    pickupMapScene.add(road2);

    // Add pickup point markers
    const markerGeometry = new THREE.ConeGeometry(2, 6, 8);
    const markerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ffff,
        emissive: 0x001122
    });

    const pickupPoints = [
        { x: -25, z: -15 },
        { x: 25, z: 15 },
        { x: 0, z: 0 }
    ];

    pickupPoints.forEach(point => {
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(point.x, 3, point.z);
        pickupMapScene.add(marker);

        // Add glow effect
        const glowGeometry = new THREE.RingGeometry(2, 4, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.rotation.x = -Math.PI / 2;
        glow.position.set(point.x, 0.2, point.z);
        pickupMapScene.add(glow);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    pickupMapScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.6);
    directionalLight.position.set(0, 50, 0);
    pickupMapScene.add(directionalLight);

    pickupMapCamera.position.set(0, 60, 60);
    pickupMapCamera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate markers slightly
        pickupMapScene.children.forEach(child => {
            if (child.type === 'Mesh' && child.geometry.type === 'ConeGeometry') {
                child.rotation.y += 0.01;
            }
        });
        
        pickupMapRenderer.render(pickupMapScene, pickupMapCamera);
    }

    animate();

    window.addEventListener('resize', () => {
        pickupMapCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        pickupMapCamera.updateProjectionMatrix();
        pickupMapRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ===== Contact Form Validation =====
function validateContactForm() {
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name) {
        showNotification('Please enter your name.', 'warning', 4000);
        return false;
    }

    if (!phone) {
        showNotification('Please enter your phone number.', 'warning', 4000);
        return false;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Please enter a valid phone number.', 'error', 4000);
        return false;
    }

    if (!message) {
        showNotification('Please enter a message.', 'warning', 4000);
        return false;
    }

    return true;
}

// ===== Contact Form Submit =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateContactForm()) {
                showNotification('Thank you for your message! We will get back to you soon.', 'success', 5000);
                contactForm.reset();
            }
        });
    }
});

// ===== FAQ Toggle =====
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===== Live Chat =====
function openLiveChat() {
    const modal = document.getElementById('chat-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLiveChat() {
    const modal = document.getElementById('chat-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    
    if (!input || !messages || !input.value.trim()) return;

    const message = input.value.trim();
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<p>${message}</p>`;
    messages.appendChild(userMsg);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        
        const responses = [
            "Thanks for your message! How can we help you today?",
            "We're here to assist you. What would you like to know?",
            "Great question! Our team will get back to you shortly.",
            "I can help you with that. Let me connect you with our support team."
        ];
        
        botMsg.innerHTML = `<p>${responses[Math.floor(Math.random() * responses.length)]}</p>`;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}

// ===== Enter key for chat =====
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('about-canvas')) {
            initAboutThreeJS();
        }
        if (document.getElementById('pickup-map-canvas')) {
            initPickupMapThreeJS();
        }
    }, 100);

    // Close modals on outside click
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


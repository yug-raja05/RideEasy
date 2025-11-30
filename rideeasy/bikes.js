// ===== Vehicles Data =====
const vehiclesData = [
    {
        id: 1,
        name: 'Honda Activa 6G',
        category: 'standard',
        type: 'scooter',
        price: 180,
        image: './activa.png',
        images: [
            './activa.png',
            'activa1.png',
            'activa2.png'
        ],
        features: ['Reliable', 'Comfortable Ride', 'Wide Service Network'],
        specs: {
            'Max Speed': '85 km/h',
            'Mileage': '45 km/l',
            'Engine': '109 cc Petrol',
            'Weight': '106 kg'
        },
        available: true
    },
    {
        id: 2,
        name: 'TVS Jupiter',
        category: 'standard',
        type: 'scooter',
        price: 190,
        image: './tvs.png',
        images: [
            './tvs.png',
            'tvs1.png',
            'tvs2.png'
        ],
        features: ['Smooth Suspension', 'Storage Space', 'Ideal for Daily Commuting'],
        specs: {
            'Max Speed': '80 km/h',
            'Mileage': '50 km/l',
            'Engine': '113 cc Petrol',
            'Weight': '107 kg'
        },
        available: true
    },
    {
        id: 3,
        name: 'Ola S1 Pro (EV)',
        category: 'electric',
        type: 'scooter',
        price: 250,
        image: './ola.png',
        images: [
            './ola.png',
            'ola1.png',
            'ola2.png'
        ],
        features: ['Smart Touchscreen', 'Fast Charging', 'App Connectivity'],
        specs: {
            'Max Speed': '120 km/h',
            'Range': '181 km per charge',
            'Battery': '4 kWh',
            'Charging Time': '6.5 hours'
        },
        available: true
    },
    {
        id: 4,
        name: 'Ather 450X (EV)',
        category: 'electric',
        type: 'scooter',
        price: 260,
        image: './ather.png',
        images: [
            './ather.png',
            'ather1.png',
            'ather2.png'
        ],
        features: ['Performance EV', 'Fast Charge', 'Navigation Support'],
        specs: {
            'Max Speed': '90 km/h',
            'Range': '146 km per charge',
            'Weight': '108 kg',
            'Charging Time': '5 hours'
        },
        available: true
    },
    {
        id: 5,
        name: 'Bajaj Pulsar 150',
        category: 'standard',
        type: 'bike',
        price: 200,
        image: './pulasr.png',
        images: [
            './pulasr.png',
            'pulasr1.png',
            'pulasr2.png'
        ],
        features: ['Sporty Look','Powerful Performance','Great for Long Rides'],
        specs: {
            'Max Speed': '110 km/h',
            'Mileage': '47 km/l',
            'Engine': '149.5 cc Petrol',
            'Weight': '148 kg'
        },
        available: true
    },
    {
        id: 6,
        name: 'Revolt RV400 (EV Bike)',
        category: 'electric',
        type: 'bike',
        price: 230,
        image: './revolt.png',
        images: [
            './revolt.png',
            'revolt1.png',
            'revolt2.png'
        ],
        features: ['Electric Motorbike', 'AI Sound', 'Swappable Battery'],
        specs: {
            'Max Speed': '85 km/h',
            'Range': '150 km',
            'Weight': '108 kg',
            'Charging Time': '4.5 hours'
        },
        available: true
    },
    {
        id: 7,
        name: 'Hero Splendor Plus (Bike)',
        category: 'standard',
        type: 'bike',
        price: 170,
        image: './hero.png',
        images: [
            './hero.png',
            'hero1.png',
            'hero2.png'
        ],
        features: ['High Fuel Efficiency', 'Low Maintenance', 'Classic Commuter'],
        specs: {
            'Max Speed': '90 km/h',
            'Mileage': '60 km/l',
            'Engine': '97.2 cc Petrol',
            'Weight': '112 kg'
        },
        available: true
    }
];

let filteredVehicles = [...vehiclesData];
let selectedVehicle = null;

// ===== Render Vehicles Grid =====
function renderVehicles() {
    const grid = document.getElementById('vehicles-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (filteredVehicles.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem;">No vehicles found matching your criteria.</p>';
        return;
    }

    filteredVehicles.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.dataset.vehicleId = vehicle.id;
        
        const badge = vehicle.category === 'electric' ? '<div class="vehicle-badge">Electric</div>' : '';
        const helmetIcon = vehicle.features.some(f => f.includes('Helmet')) ? '<i class="fas fa-shield-alt"></i>' : '';
        
        card.innerHTML = `
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                ${badge}
            </div>
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <div class="vehicle-price">
                    <span class="price">₹${vehicle.price}</span>
                    <span class="period">/hour</span>
                </div>
                <ul class="vehicle-features">
                    ${vehicle.features.map(f => `<li>${helmetIcon && f.includes('Helmet') ? helmetIcon : '<i class="fas fa-check"></i>'} ${f}</li>`).join('')}
                </ul>
                <button class="btn-primary" onclick="viewVehicle(${vehicle.id})">View Details</button>
            </div>
        `;
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                viewVehicle(vehicle.id);
            }
        });

        grid.appendChild(card);
    });
}

// ===== View Vehicle Details =====
function viewVehicle(id) {
    const vehicle = vehiclesData.find(v => v.id === id);
    if (!vehicle) return;

    selectedVehicle = vehicle;
    const modal = document.getElementById('vehicle-modal');
    const content = document.getElementById('vehicle-modal-content');

    if (!modal || !content) return;

    const specsList = Object.entries(vehicle.specs).map(([key, value]) => 
        `<li><span>${key}</span><span>${value}</span></li>`
    ).join('');

    content.innerHTML = `
        <div class="vehicle-modal-gallery">
            <img src="${vehicle.images[0]}" alt="${vehicle.name}" class="vehicle-modal-main-image" id="modal-main-image">
            <div class="vehicle-modal-thumbnails">
                ${vehicle.images.map((img, idx) => 
                    `<img src="${img}" alt="Thumbnail ${idx + 1}" class="vehicle-modal-thumbnail ${idx === 0 ? 'active' : ''}" onclick="changeModalImage('${img}', this)">`
                ).join('')}
            </div>
        </div>
        <div class="vehicle-modal-info">
            <h2>${vehicle.name}</h2>
            <div class="vehicle-modal-price-large">
                ₹${vehicle.price} <span style="font-size: 1rem;">/hour</span>
            </div>
            <ul class="vehicle-modal-specs">
                ${specsList}
            </ul>
            <div style="margin: 1.5rem 0;">
                <h3 style="color: #00FFFF; margin-bottom: 1rem;">Features</h3>
                <ul class="vehicle-features">
                    ${vehicle.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                </ul>
            </div>
            <button class="btn-primary btn-large" onclick="openBookingModalFromBikes(${vehicle.id})" style="width: 100%; margin-top: 1.5rem;">
                Reserve Now
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== Change Modal Image =====
function changeModalImage(src, element) {
    document.getElementById('modal-main-image').src = src;
    document.querySelectorAll('.vehicle-modal-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

// ===== Close Vehicle Modal =====
function closeVehicleModal() {
    const modal = document.getElementById('vehicle-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== Apply Filters =====
function applyFilters() {
    const category = document.getElementById('filter-category').value;
    const price = document.getElementById('filter-price').value;
    const date = document.getElementById('filter-date').value;
    const sort = document.getElementById('filter-sort').value;

    filteredVehicles = vehiclesData.filter(vehicle => {
        // Category filter
        if (category !== 'all') {
            if (category === 'scooter' && vehicle.type !== 'scooter') return false;
            if (category === 'standard' && vehicle.category !== 'standard') return false;
            if (category === 'electric' && vehicle.category !== 'electric') return false;
        }

        // Price filter
        if (price !== 'all') {
            const [min, max] = price === '20+' ? [20, Infinity] : price.split('-').map(Number);
            if (vehicle.price < min || (max !== Infinity && vehicle.price > max)) return false;
        }

        // Date filter (simplified - just check availability)
        if (date && !vehicle.available) return false;

        return true;
    });

    // Sort
    switch (sort) {
        case 'price-low':
            filteredVehicles.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredVehicles.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredVehicles.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Most popular (keep original order or by id)
            break;
    }

    renderVehicles();
    updateQuickReserve();
}

// ===== Reset Filters =====
function resetFilters() {
    document.getElementById('filter-category').value = 'all';
    document.getElementById('filter-price').value = 'all';
    document.getElementById('filter-date').value = '';
    document.getElementById('filter-sort').value = 'popular';
    
    filteredVehicles = [...vehiclesData];
    renderVehicles();
    updateQuickReserve();
}

// ===== Quick Reserve Bar =====
function updateQuickReserve() {
    const quickBar = document.getElementById('quick-reserve-bar');
    if (!quickBar) return;

    if (selectedVehicle && window.innerWidth <= 768) {
        quickBar.classList.add('active');
        document.getElementById('quick-reserve-image').src = selectedVehicle.image;
        document.getElementById('quick-reserve-name').textContent = selectedVehicle.name;
        document.getElementById('quick-reserve-price').textContent = `₹${selectedVehicle.price}/hour`;
    } else {
        quickBar.classList.remove('active');
    }
}

function openQuickReserve() {
    if (selectedVehicle) {
        viewVehicle(selectedVehicle.id);
    }
}

// ===== Apply Coupon =====
function applyCoupon() {
    const code = document.getElementById('coupon-code').value.trim().toUpperCase();
    if (code === 'RIDEEASY20') {
        showNotification('Coupon applied! You will receive 20% off at checkout.', 'success', 5000);
        document.getElementById('coupon-code').style.borderColor = '#00FFFF';
        document.getElementById('coupon-code').style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
    } else {
        showNotification('Invalid coupon code. Please try again.', 'error', 4000);
        document.getElementById('coupon-code').style.borderColor = '#ff0000';
    }
}

// ===== Open Booking Modal from Bikes Page =====
function openBookingModalFromBikes(vehicleId) {
    const vehicle = vehiclesData.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const modal = document.getElementById('booking-modal');
    if (modal) {
        document.getElementById('modal-vehicle-name').value = vehicle.name;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeVehicleModal(); // Close vehicle detail modal
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderVehicles();
    
    // Close modal on outside click
    const modal = document.getElementById('vehicle-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVehicleModal();
            }
        });
    }

    // Booking form submit
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Booking confirmed! We will contact you shortly.', 'success', 5000);
            closeBookingModal();
            bookingForm.reset();
        });
    }

    // Close booking modal on outside click
    const bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    // Update quick reserve on scroll/resize
    window.addEventListener('resize', updateQuickReserve);
    window.addEventListener('scroll', updateQuickReserve);
});


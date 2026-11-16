# RideEasy - Bike & Scooter Rental Platform

A modern, fully responsive web application for bike and scooter rentals featuring interactive 3D models and effects powered by **Three.js**.

---

## 🚀 How to Run the Project

Since the project uses Three.js and external CDN assets, it is best run through a local web server to prevent browser CORS restrictions.

### Option 1: Using Python (Recommended)

1. Open your terminal in the project root:
   ```bash
   cd rideeasy
   python -m http.server 8080
   ```
2. Open your browser and navigate to:
   [http://localhost:8080](http://localhost:8080)

---

### Option 2: Using Node.js / npx

1. Navigate to the `rideeasy` directory:
   ```bash
   cd rideeasy
   ```
2. Start the server using either:
   ```bash
   npx serve -l 8080
   ```
   *or*
   ```bash
   npx http-server -p 8080
   ```
3. Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### Option 3: Using VS Code Live Server Extension

1. Open the project folder in **VS Code**.
2. Navigate to `rideeasy/index.html` in the file explorer.
3. Right-click `index.html` and click **"Open with Live Server"**.

---

### Option 4: Direct Browser Open (No Server)

You can also directly double-click `rideeasy/index.html` in your file explorer to open it in Chrome, Edge, or Firefox.

---

## 📁 Project Structure

```
rideeasy1/
├── README.md               # Project documentation & run guide
├── d.html                  # Standalone Rapido 3D scooter model demo
└── rideeasy/               # Main application directory
    ├── index.html          # Home landing page with 3D hero & booking
    ├── bikes.html          # Vehicle fleet catalog with filtering
    ├── contact.html        # Contact page with 3D animation & FAQ
    ├── styles.css          # Base global styles
    ├── home.css            # Styles for home page
    ├── bikes.css           # Styles for bikes/fleet page
    ├── contact.css         # Styles for contact page
    ├── script.js           # Home page logic & Three.js canvas
    ├── bikes.js            # Fleet filtering & vehicle details
    ├── contact.js          # Contact form & 3D scooter viewer
    ├── notification.js     # Toast notification system
    └── *.png               # Vehicle graphics & assets
```

---

## 🌟 Pages & Key Features

### 1. Home Page (`index.html`)
- **3D Hero Scene**: Interactive particle effects and 3D canvas via Three.js.
- **Booking Flow**: Quick reservation modal with location and date pickers.
- **Featured Vehicles**: Showcase of top electric scooters and motorbikes.
- **Testimonials & Trust**: Customer reviews and service highlights.

### 2. Fleet Catalog (`bikes.html`)
- **Filter & Search**: Categorize by vehicle type (Electric Scooter, Commuter, Sports Bike).
- **Vehicle Cards**: Hourly and daily pricing, specs, and quick reserve buttons.
- **Detail Modals**: In-depth vehicle overview with image galleries.

### 3. Contact & Support (`contact.html`)
- **Interactive 3D Viewer**: Real-time 3D scooter model with customizable body colors and rotation.
- **Inquiry Form**: Contact form with built-in client-side validation.
- **Support & FAQ**: Expandable FAQ accordions and branch pickup locations.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Modern Neon/Dark UI Theme)
- **Scripting**: Vanilla JavaScript (ES6+)
- **3D Graphics**: [Three.js](https://threejs.org/) (WebGL rendering & OrbitControls)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **Styling Theme**: Dark mode `#000000` with Electric Blue `#007BFF` and Cyan Glow `#00FFFF` accents

---

## 🌐 Browser Compatibility

- Google Chrome (Recommended for best WebGL performance)
- Mozilla Firefox
- Microsoft Edge
- Apple Safari (macOS/iOS)

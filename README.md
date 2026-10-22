# AR/VR Innovation & Learning Platform

A modern, professional, responsive full-stack platform focused on **AR, VR, AI, Robotics, Oculus / Meta Quest, and the Metaverse**, equipped with an enterprise-grade administrative distribution engine for **Unity 2022 APK applications**.

---

## 🚀 Key Features

### 1. Futuristic Presentation & Spatial Education
- **Next-Gen Aesthetic**: Dark obsidian background (`#060913`), glassmorphism cards, glowing neon cyan/purple accents, and subtle gradient highlights.
- **Interactive 3D Particle Network**: High-performance 60fps HTML5 Canvas particle network with proximity node connections and mouse tracking (respects `prefers-reduced-motion`).
- **Foundations of the Spatial Era**: Deep dives into AR, VR, MR, AI, Robotics, Metaverse, and Unity 3D.
- **Reality-Virtuality Continuum**: Interactive horizontal timeline flow from Physical Reality &rarr; AR &rarr; MR &rarr; VR &rarr; Metaverse.
- **Technology Behind Immersive Experiences**: Showcase of Oculus/Meta Quest, AI Robotics, Unity 2022 LTS, Blender 3D, CAD Decimation, Edge AI, and Virtual Laboratories.
- **Meta Quest Dedicated Hardware Feature**: Detailed breakdown of pancake optics, inside-out 6-DoF tracking, Touch Pro haptic controllers, and education/training/simulation applications.
- **8 Interactive Educational Projects**:
  1. Human Heart Blood Circulation (Hemodynamic VR)
  2. Water Cycle Simulation (Atmospheric Hydrology in AR/MR)
  3. Kidney Anatomy & Nephron VR (Microscopic Renal Filtration)
  4. Physics Virtual Laboratory (Newtonian & Quantum Mechanics)
  5. Chemistry Virtual Laboratory (Stoichiometry & Molecular Synthesis)
  6. Biology Virtual Laboratory (Cellular Mitosis & Genetics)
  7. Magnetic Field Simulation (Lorentz Force & Flux in MR Passthrough)
  8. AI & Robotics Experience (6-DoF Inverse Kinematics & Computer Vision)
  - Interactive "View Details" modal with deep simulation mechanics, hardware compatibility, and learning outcomes.

### 2. Dual-Role Authentication & Security
- **Strict Role-Based Access Control (RBAC)**: Backend-verified `OWNER` vs `CLIENT` privileges. Clients are strictly prohibited from accessing administrative endpoints.
- **Cryptographic Password Hashing**: Passwords encrypted using `bcrypt` (salted rounds).
- **Session Security**: Stateless JSON Web Tokens (JWT) with bearer authentication headers.
- **Pre-Seeded Credentials**:
  - **OWNER Account**:
    - **Username**: `OWNER`
    - **Password**: `owner@123`
    *(Includes first-login password update modal)*
  - **Sample CLIENT Account**:
    - **Username**: `client_demo`
    - **Password**: `client@123`

### 3. Owner Dashboard (`/admin`)
- **System Metrics Overview**: Total authorized clients, total APKs, published APKs, and total download count.
- **Unity 2022 APK Distribution Engine**:
  - Upload standalone `.apk` files generated from Unity 2022.x LTS.
  - Package validation (extension verification, file size limits).
  - Versioning (`1.0.0`), Unity version tagging (`2022.3 LTS`), and thumbnail covers.
  - One-click Publish / Unpublish visibility toggle.
  - Metadata editing and permanent file deletion.
- **Client Management Portal**:
  - Create new client accounts with temporary credentials.
  - Instant account activation / deactivation switch.
  - Remote client password reset.
  - Individual client download activity history.
- **Download Audit Log**:
  - Complete immutable audit stream tracking client username, APK name, version, timestamp, and IP address.

### 4. Client Dashboard (`/client`)
- **"Welcome to Your AR/VR Applications"**: High-contrast portal for authorized schools, universities, and research labs.
- **Browse Published APKs**: Live grid of verified applications with Unity engine version, file size, release date, and descriptions.
- **Authenticated Streaming Download**: Secure backend stream endpoint (`/api/client/apks/:id/download`) that tracks download metrics and streams `.apk` packages directly to the browser.
- **Built-in Sideloading Guide**: Clear 3-step instructions for sideloading `.apk` files onto Meta Quest 2, 3, and Pro headsets via SideQuest or ADB.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons |
| **Backend API** | Node.js, Express.js, Helmet, CORS, Morgan |
| **Authentication** | JWT (JSON Web Tokens), Bcryptjs |
| **File Storage** | Multer with disk stream storage (`server/storage/apks`) |
| **Database** | Dual Support: MongoDB (Mongoose) with automatic zero-config persistent JSON fallback (`server/data/store.json`) |

---

## ⚡ Quick Start

### 1. Installation

From the project root:
```bash
npm run install:all
```
*Or install individually in `server/` and `client/`:*
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Run Full Stack (Concurrently)

Run both the Express backend API (Port 5000) and the Vite React frontend (Port 5173) with a single command:
```bash
npm run dev
```

The application will be accessible at:
- **Frontend Web Portal**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔐 Authentication Credentials

| Role | Username | Password | Destination Dashboard |
| :--- | :--- | :--- | :--- |
| **OWNER** (Administrator) | `OWNER` | `owner@123` | `/admin` |
| **CLIENT** (Authorized User) | `client_demo` | `client@123` | `/client` |

---

## 📂 Project Structure

```
ARVR/
├── package.json               # Root scripts (concurrently dev runner)
├── README.md                  # Project documentation & operational manual
├── server/                    # Node.js + Express Backend API
│   ├── .env                   # Environment secrets & storage config
│   ├── data/
│   │   └── store.json         # Resilient document store (auto-created)
│   ├── storage/
│   │   ├── apks/              # Secure private store for Unity .apk files
│   │   └── thumbnails/        # Public preview covers
│   ├── src/
│   │   ├── config/            # DB connection & store configuration
│   │   ├── controllers/       # Auth, APK, Client, Download, Contact controllers
│   │   ├── middleware/        # JWT auth, role check, multer .apk validation
│   │   ├── models/            # Dual MongoDB & persistent file store repositories
│   │   ├── routes/            # Admin, Client, Auth, and Public Express routers
│   │   ├── seeds/             # Seed initial OWNER, demo CLIENT, and Unity APKs
│   │   └── index.js           # Server entry point
└── client/                    # React 19 + TypeScript + Vite Frontend
    ├── index.html             # HTML entry with Google Fonts (Space Grotesk, Inter)
    ├── vite.config.ts         # Vite configuration with /api proxy
    ├── tailwind.config.js     # Cyberpunk neon dark theme configuration
    └── src/
        ├── components/
        │   ├── common/        # ParticleCanvas, GlassCard, ToastNotification
        │   ├── home/          # Hero, IntroCards, Flow, TechShowcase, Oculus, Projects
        │   └── layout/        # Responsive Navbar & Footer
        ├── context/           # AuthContext (JWT, user state, auto-refresh)
        ├── pages/
        │   ├── HomePage.tsx
        │   ├── LoginPage.tsx
        │   ├── admin/         # Overview, Apks, Clients, Downloads
        │   └── client/        # ClientDashboard
        ├── services/          # Unified API service with blob download streaming
        ├── styles/            # Global glassmorphism, neon glow, custom scrollbars
        └── types/             # TypeScript interfaces for APKs, Users, Projects
```

---

## 👓 Sideloading Unity APKs to Meta Quest

1. **Enable Developer Mode** on your Meta Quest headset in the Meta Horizon mobile app.
2. **Connect your Meta Quest** to your PC using a USB-C cable and accept the USB Debugging prompt inside the headset.
3. **Download the APK** from the Client Portal (`/client`).
4. **Install using SideQuest or ADB**:
   ```bash
   adb install -r "YourApplication_v1.0.0.apk"
   ```
5. Put on your headset, navigate to the **App Library &rarr; Filter &rarr; Unknown Sources**, and launch your immersive experience.

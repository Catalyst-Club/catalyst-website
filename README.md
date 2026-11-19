<div align="center">

# 🧪 Catalyst Club — Official Website

**The official digital platform for Catalyst Club, Haldia Institute of Pharmacy.**  
*Managing club events, student activities, announcements, and community initiatives.*

[![Live Website](https://img.shields.io/badge/Live_Website-catalystclub.in-2ea44f?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.catalystclub.in)
[![Hosted on Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://dash.cloudflare.com)
[![Powered by Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://console.firebase.google.com)

[🌐 Visit Live Site](https://www.catalystclub.in) • [🐛 Report an Issue](https://github.com/Catalyst-Club/catalyst-website/issues) • [🤝 Contribution Guide](#-developer-workflow)

</div>

---

## 📖 Overview

This repository contains the complete source code for **[catalystclub.in](https://www.catalystclub.in)**. Every update pushed to the `main` branch is automatically built and deployed live via **Cloudflare Pages**, while dynamic event data and authentication are powered by **Firebase**.

### ✨ Key Features
* **Event & Activity Hub:** Showcases upcoming workshops, seminars, and campus events at Haldia Institute of Pharmacy.
* **Dynamic Backend:** Real-time data updates and registration management powered by Firebase.
* **Continuous Deployment:** Zero-downtime automatic builds on every push to `main`.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript / Framework | Responsive UI and interactive components |
| **Backend & Database** | Firebase | Authentication, database, and dynamic data |
| **Hosting & CDN** | Cloudflare Pages | Global edge deployment and SSL security |
| **Version Control** | Git & GitHub | Team collaboration and source management |

---

## 🚀 Getting Started (For Club Developers)

Follow these steps to set up the project locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/Catalyst-Club/catalyst-website.git](https://github.com/Catalyst-Club/catalyst-website.git)
cd catalyst-website
```

### 2. Install Dependencies *(if using Node/React/Vite)*
```bash
npm install
```

### 3. Run Local Development Server
```bash
npm run dev
```
*(Note: If the site is built with plain HTML/CSS/JS, simply open `index.html` using the **Live Server** extension in VS Code.)*

---

## 🤝 Developer Workflow

To keep **[catalystclub.in](https://www.catalystclub.in)** stable and avoid merge conflicts, please follow these rules before making changes:

1. **Pull the latest code first:**
   ```bash
   git pull origin main
   ```
2. **Create a feature branch** for major edits:
   ```bash
   git checkout -b update-events-page
   ```
3. **Protect sensitive credentials:** Never commit `.env` files, private admin keys, or raw passwords.
4. **Push and Deploy:** Once tested locally, push your changes to `main`. Cloudflare will automatically update the live site within 1–2 minutes.

---

## 👥 Maintainers & Team

Maintained by the Development team of **Catalyst Club, Haldia Institute of Pharmacy**

---

<div align="center">
  <sub>Built with ❤️ by the Catalyst Club Dev Team • <a href="https://www.catalystclub.in">www.catalystclub.in</a></sub>
</div>

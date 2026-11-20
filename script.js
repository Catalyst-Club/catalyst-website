/**
 * Catalyst Club — Core JavaScript Module
 * Handles:
 *  1. Academic Year / Member Directory Roster (Clean structured data)
 *  2. Activities & Events Data Repository & Interactive Detail Drawer / Modal
 *  3. Legal Modals (Terms of Use, Privacy Policy, Event Details, Leaflet)
 *  4. Global Theme and Responsive Mobile Sidebar
 */

/* ==========================================================================
   1. CLUB MEMBERS DATA ROSTER
   --------------------------------------------------------------------------
   INSTRUCTIONS FOR ADDING / EDITING MEMBERS:
   Add or update member objects inside the corresponding academic year array.
   Supported fields:
     - name: Full name of student
     - role: Club leadership position or role
     - dept: Department / Academic Year (e.g. "B.Pharm 3rd Year")
     - initials: 2-character avatar initials (e.g. "SM")
     - bio: (Optional) Short 1-sentence bio or interest
     - avatar: (Optional) Direct image URL
   ========================================================================== */
const clubMembersData = {
    // ----------------------------------------------------------------------
    // 2025–2026 BATCH (CURRENT ACTIVE ACADEMIC YEAR)
    // ----------------------------------------------------------------------
    "2025-26": [
        {
            name: "Member 1",
            role: "Club Coordinator",
            dept: "B.Pharm 3rd Year",
            initials: "M1",
            bio: "Passionate about pharmaceutical innovations, robotics, and creative design."
        },
        {
            name: "Member 2",
            role: "Technical Lead",
            dept: "B.Pharm 3rd Year",
            initials: "M2",
            bio: "Focusing on Python, full-stack web platforms, and automated tools."
        },
        {
            name: "Member 3",
            role: "Events & Operations Lead",
            dept: "B.Pharm 2nd Year",
            initials: "M3",
            bio: "Organizing weekly Saturday sessions, hackathons, and guest seminars."
        },
        {
            name: "Member 4",
            role: "Design & Creative Studio",
            dept: "B.Pharm 2nd Year",
            initials: "M4",
            bio: "Crafting visual identities, social posters, UI graphics, and video media."
        },
        {
            name: "Member 5",
            role: "Research & Sci-Tech Desk",
            dept: "B.Pharm 2nd Year",
            initials: "M5",
            bio: "Exploring computational drug design, meta-analysis, and scientific writing."
        },
        {
            name: "Member 6",
            role: "Core Team Member",
            dept: "B.Pharm 1st Year",
            initials: "M6",
            bio: "Enthusiastic beginner exploring programming, hardware, and club initiatives."
        }
    ],

    // ----------------------------------------------------------------------
    // 2024–2025 BATCH
    // ----------------------------------------------------------------------
    "2024-25": [
        {
            name: "Member 1",
            role: "Core Lead",
            dept: "B.Pharm Batch 2025",
            initials: "M1",
            bio: "Led initial club founding meets and tech bootcamps."
        },
        {
            name: "Member 2",
            role: "Club Member",
            dept: "B.Pharm Batch 2025",
            initials: "M2",
            bio: "Contributed to design assets and student outreach."
        },
        {
            name: "Member 3",
            role: "Club Member",
            dept: "B.Pharm Batch 2025",
            initials: "M3",
            bio: "Spearheaded scientific symposiums and journal discussions."
        },
        {
            name: "Member 4",
            role: "Club Member",
            dept: "B.Pharm Batch 2025",
            initials: "M4",
            bio: "Managed workshop logistics and participation certificates."
        },
        {
            name: "Member 5",
            role: "Club Member",
            dept: "B.Pharm Batch 2025",
            initials: "M5",
            bio: "Assisted in student mentoring and event documentation."
        },
        {
            name: "Member 6",
            role: "Club Member",
            dept: "B.Pharm Batch 2025",
            initials: "M6",
            bio: "Participated in Python workshops and club media."
        }
    ],

    // ----------------------------------------------------------------------
    // 2023–2024 BATCH (FOUNDING COHORT / ALUMNI)
    // ----------------------------------------------------------------------
    "2023-24": [
        {
            name: "Member 1",
            role: "Founding Lead",
            dept: "HIP Alumni",
            initials: "M1",
            bio: "Catalyst Club co-founder and alumni advisor."
        },
        {
            name: "Member 2",
            role: "Founding Member",
            dept: "HIP Alumni",
            initials: "M2",
            bio: "Established foundational student collaborative guidelines."
        },
        {
            name: "Member 3",
            role: "Founding Member",
            dept: "HIP Alumni",
            initials: "M3",
            bio: "Alumni mentor for computational biology and research."
        }
    ]
};

// Aliases for alternate dropdown formats
clubMembersData["2025"] = clubMembersData["2024-25"];
clubMembersData["2024"] = clubMembersData["2023-24"];
clubMembersData["2026"] = clubMembersData["2025-26"];

/**
 * Render the member cards into #members-list
 * @param {string} yearKey - Key identifying the batch ('2025-26', '2024-25', '2023-24')
 */
function renderClubMembers(yearKey) {
    const listContainer = document.getElementById("members-list");
    if (!listContainer) return;

    const members = clubMembersData[yearKey] || [];
    listContainer.innerHTML = "";

    if (members.length === 0) {
        listContainer.innerHTML = `
            <div class="members-empty-state">
                <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 12px; color: var(--muted-text);"></i>
                <p>No member records found for this academic year.</p>
            </div>
        `;
        return;
    }

    members.forEach((member) => {
        const card = document.createElement("div");
        card.className = "member-card";

        let initials = member.initials;
        if (!initials) {
            const parts = member.name.trim().split(/\s+/);
            initials = parts.length > 1
                ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                : parts[0].slice(0, 2).toUpperCase();
        }

        card.innerHTML = `
            <div class="member-avatar">${escapeHtml(initials)}</div>
            <h4 class="member-name">${escapeHtml(member.name)}</h4>
            <div class="member-role">${escapeHtml(member.role)}</div>
            <div class="member-dept">${escapeHtml(member.dept)}</div>
            ${member.bio ? `<p class="member-bio" style="font-size:0.8rem; color:var(--muted-text); margin-top:8px;">${escapeHtml(member.bio)}</p>` : ""}
        `;
        listContainer.appendChild(card);
    });
}

/* ==========================================================================
   2. CATALYST CLUB EVENTS & MEETS DATA REPOSITORY
   --------------------------------------------------------------------------
   INSTRUCTIONS FOR ADDING / EDITING EVENTS:
   To add an upcoming or past event, duplicate one of the objects below and edit:
     - id: Unique slug string (e.g. "event-spring-symposium-2026")
     - title: Full event title
     - category: "workshops" | "meets" | "competitions"
     - categoryLabel: Badge display name (e.g. "HANDS-ON WORKSHOP")
     - status: "upcoming" | "past"
     - statusLabel: Badge status (e.g. "UPCOMING" or "CONCLUDED")
     - day: Day number or "--" (e.g. "15" or "--")
     - month: 3-letter or full month (e.g. "APR" or "TBD")
     - year: 4-digit year (e.g. "2026")
     - time: Time range (e.g. "6:30 PM - 8:30 PM" or "Date Announced Soon")
     - location: Room or platform (e.g. "Classroom 3rd Floor" or "Google Meet")
     - locationType: "in-person" | "online" | "hybrid"
     - speaker: Host, speaker, or coordinator name
     - shortDesc: 1-2 sentence preview for the card
     - fullDesc: Detailed multi-paragraph overview for the detail modal
     - highlights: Array of 3-4 bullet takeaways
     - rsvpLink: Registration URL or "form.html"
   ========================================================================== */
const catalystEventsData = [
    {
        id: "event-py-workshop-2026",
        title: "Workshop on Python 3 for Beginners & Data Science",
        category: "workshops",
        categoryLabel: "HANDS-ON WORKSHOP",
        status: "upcoming",
        statusLabel: "UPCOMING",
        day: "--",
        month: "TBD",
        year: "2026",
        time: "Date to be announced",
        location: "Classroom 3rd Floor, College Building",
        locationType: "in-person",
        speaker: "Catalyst Tech Team & Faculty Mentors",
        shortDesc: "Hands-on intensive workshop introducing Python programming, foundational data science, creative coding, and automation workflows.",
        fullDesc: "This guided hands-on workshop introduces students to core programming logic, Python syntax, and scientific libraries. Designed specifically for beginners in pharmacy and sciences, participants will build real automation scripts, parse experimental datasets, and visualize insights using modern developer tools. Bring your laptop for guided coding labs.",
        highlights: [
            "Introduction to Python programming & script execution",
            "Scientific libraries overview (NumPy, Pandas, Matplotlib)",
            "Hands-on interactive coding labs & live debugging",
            "Official Certificate of Completion awarded to all attendees"
        ],
        rsvpLink: "form.html"
    },
    {
        id: "event-hackathon-2026",
        title: "Catalyst Hackathon & Innovation Challenge 2026",
        category: "competitions",
        categoryLabel: "COMPETITION // HACKATHON",
        status: "upcoming",
        statusLabel: "UPCOMING",
        day: "--",
        month: "Q2",
        year: "2026",
        time: "Full-Day Innovation Sprint",
        location: "HIP Campus Innovation Lab & Virtual Google Meet",
        locationType: "hybrid",
        speaker: "Catalyst Club Jury & Industry Mentors",
        shortDesc: "Interdisciplinary team sprint solving healthcare, computational drug research, and digital utility challenges. Win certificates and awards.",
        fullDesc: "Catalyst Club's flagship annual student hackathon. Teams will spend 12 hours designing and prototyping functional digital solutions, web applications, or data pipelines that tackle campus challenges and healthcare workflows. Mentors will be present to guide participants through concept validation, design, and code.",
        highlights: [
            "Multi-disciplinary teams (Code, Design, Pharmacology, Strategy)",
            "Live pitch and demonstration before college panel",
            "Prizes, winner trophies, and project incubation support"
        ],
        rsvpLink: "form.html"
    },
    {
        id: "event-space-talk-2025",
        title: "Virtual Talk On International Day For Human Space Flight",
        category: "meets",
        categoryLabel: "SPACE SCIENCE & TECH",
        status: "past",
        statusLabel: "CONCLUDED",
        day: "12",
        month: "JULY",
        year: "2025",
        time: "6:30 PM - 9:15 PM",
        location: "Google Meet (Online Session)",
        locationType: "online",
        speaker: "Catalyst Core Leads & Space Science Enthusiasts",
        shortDesc: "Deep exploration into modern space science, satellite engineering, human space exploration, and scientific discovery.",
        fullDesc: "An inspiring virtual seminar honoring human achievements in orbital science and cosmic exploration. Student presentations explored microgravity pharmacology, satellite telecommunications, life-support biotechnology, and future missions to Mars and deep space.",
        highlights: [
            "Physiological and pharmacological adaptations in zero gravity",
            "History and future milestones of human space exploration",
            "Interactive student Q&A and scientific paper reviews"
        ],
        rsvpLink: ""
    },
    {
        id: "event-ai-talk-2025",
        title: "Tech Talk: AI & The Future of Innovation",
        category: "meets",
        categoryLabel: "AI & INNOVATION",
        status: "past",
        statusLabel: "CONCLUDED",
        day: "12",
        month: "APRIL",
        year: "2025",
        time: "7:00 PM - 9:00 PM",
        location: "Classroom 3rd Floor, College Building",
        locationType: "in-person",
        speaker: "Catalyst Innovation & Software Team",
        shortDesc: "Interactive session and presentations by Catalyst members on generative AI, machine learning algorithms, and tech trends.",
        fullDesc: "A lively interactive presentation dissecting modern AI architectures, neural network basics, large language models, and computational molecular prediction. Members demonstrated real-world workflows using automated AI tools and shared prospective opportunities for pharmacy students.",
        highlights: [
            "Foundations of Machine Learning & Neural Networks",
            "Generative AI tools for academic research and code",
            "Student presentations, live demos, and open debate"
        ],
        rsvpLink: ""
    },
    {
        id: "event-meta-analysis-2024",
        title: "Small Talk on Scientific Meta-Analysis",
        category: "workshops",
        categoryLabel: "RESEARCH METHODOLOGY",
        status: "past",
        statusLabel: "CONCLUDED",
        day: "11",
        month: "OCT",
        year: "2024",
        time: "10:30 AM - 12:00 PM",
        location: "Classroom 3rd Floor, College Building",
        locationType: "in-person",
        speaker: "Catalyst Academic Research Desk",
        shortDesc: "Focused discussions on systematic reviews, data synthesis techniques, statistical tools, and research methodologies.",
        fullDesc: "Focused workshop detailing systematic literature synthesis, PRISMA guidelines, statistical effect sizing, and forest plots for pharmaceutical research papers and thesis dissertations.",
        highlights: [
            "Systematic review design & study qualification",
            "Statistical software tools for data aggregation",
            "Publication benchmarks for research journals"
        ],
        rsvpLink: ""
    }
];

/**
 * Render the dynamic interactive events list into .events-list
 * @param {string} filterCategory - 'all', 'workshops', 'meets', 'competitions', 'upcoming', 'past'
 */
function renderCatalystEvents(filter = "all") {
    const container = document.querySelector(".events-list");
    if (!container) return;

    let filtered = catalystEventsData;
    if (filter === "upcoming" || filter === "past") {
        filtered = catalystEventsData.filter(e => e.status === filter);
    } else if (filter !== "all") {
        filtered = catalystEventsData.filter(e => e.category === filter);
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; background:var(--liquid-glass-bg); border-radius:18px; border:1px solid var(--border-color);">
                <i class="fas fa-calendar-times" style="font-size:2rem; color:var(--muted-text); margin-bottom:12px;"></i>
                <p style="color:var(--muted-text); margin:0;">No events found in this category.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(ev => {
        const row = document.createElement("div");
        row.className = `event-row ${ev.status}-event`;
        row.setAttribute("data-status", ev.status);
        row.setAttribute("data-category", ev.category);
        row.setAttribute("data-event-id", ev.id);

        const isUpcoming = (ev.status === "upcoming");
        const locationIcon = ev.locationType === "online" ? "fa-video" : (ev.locationType === "hybrid" ? "fa-globe" : "fa-map-marker-alt");

        row.innerHTML = `
            <div class="event-date">
                <span class="date-day">${escapeHtml(ev.day)}</span>
                <span class="date-month">${escapeHtml(ev.month)}</span>
                <span class="date-year">${escapeHtml(ev.year)}</span>
            </div>
            <div class="event-content">
                <div class="event-badges">
                    <span class="badge-tag">${escapeHtml(ev.categoryLabel)}</span>
                    <span class="badge-status status-${ev.status}">${escapeHtml(ev.statusLabel)}</span>
                </div>
                <h3>${escapeHtml(ev.title)}</h3>
                <p>${escapeHtml(ev.shortDesc)}</p>
                <div class="event-location-meta">
                    <span><i class="fas ${locationIcon}"></i> ${escapeHtml(ev.location)}</span>
                    <span><i class="fas fa-user-tie"></i> ${escapeHtml(ev.speaker)}</span>
                </div>
            </div>
            <div class="event-action-col">
                <div class="event-time">${escapeHtml(ev.time)}</div>
                <span class="event-click-hint">Details <i class="fas fa-arrow-right"></i></span>
            </div>
        `;

        // Click row to open Interactive Event Detail Modal
        row.addEventListener("click", () => {
            openEventDetailModal(ev.id);
        });

        container.appendChild(row);
    });
}

/**
 * Open Event Detail Modal with full information
 * @param {string} eventId
 */
function openEventDetailModal(eventId) {
    const ev = catalystEventsData.find(e => e.id === eventId);
    if (!ev) return;

    const modal = document.getElementById("eventDetailModal");
    if (!modal) return;

    // Populate Modal Elements
    const titleEl = document.getElementById("eventModalTitle");
    const catBadgeEl = document.getElementById("eventModalCatBadge");
    const statusBadgeEl = document.getElementById("eventModalStatusBadge");
    const dateEl = document.getElementById("eventModalDate");
    const timeEl = document.getElementById("eventModalTime");
    const locationEl = document.getElementById("eventModalLocation");
    const speakerEl = document.getElementById("eventModalSpeaker");
    const descEl = document.getElementById("eventModalDesc");
    const highlightsUl = document.getElementById("eventModalHighlightsList");
    const rsvpBtn = document.getElementById("eventModalRsvpBtn");

    if (titleEl) titleEl.textContent = ev.title;
    if (catBadgeEl) catBadgeEl.textContent = ev.categoryLabel;
    if (statusBadgeEl) {
        statusBadgeEl.textContent = ev.statusLabel;
        statusBadgeEl.className = `badge-status status-${ev.status}`;
    }
    if (dateEl) dateEl.textContent = `${ev.day} ${ev.month} ${ev.year}`;
    if (timeEl) timeEl.textContent = ev.time;
    if (locationEl) locationEl.textContent = ev.location;
    if (speakerEl) speakerEl.textContent = ev.speaker;
    if (descEl) descEl.textContent = ev.fullDesc;

    if (highlightsUl) {
        highlightsUl.innerHTML = "";
        (ev.highlights || []).forEach(hl => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${escapeHtml(hl)}</span>`;
            highlightsUl.appendChild(li);
        });
    }

    if (rsvpBtn) {
        if (ev.status === "upcoming" && ev.rsvpLink) {
            rsvpBtn.style.display = "inline-flex";
            rsvpBtn.setAttribute("href", ev.rsvpLink);
            rsvpBtn.innerHTML = '<i class="fas fa-ticket-alt"></i> RSVP / REGISTER →';
        } else {
            rsvpBtn.style.display = "none";
        }
    }

    openModal("eventDetailModal");
}

/**
 * Initialize interactive events filtering tabs
 */
function initEventsFiltering() {
    const filterButtons = document.querySelectorAll(".event-filter-btn");
    if (!filterButtons.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter") || "all";
            renderCatalystEvents(filterValue);
        });
    });
}

/**
 * Simple HTML escaper to prevent XSS
 */
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ==========================================================================
   3. LEGAL & DETAIL MODALS UTILITIES
   ========================================================================== */
function openModal(modalId) {
    const modal = typeof modalId === "string" ? document.getElementById(modalId) : modalId;
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    if (modalId) {
        const modal = typeof modalId === "string" ? document.getElementById(modalId) : modalId;
        if (modal) modal.style.display = "none";
    } else {
        document.querySelectorAll(".leaflet-modal, .legal-modal").forEach((m) => {
            m.style.display = "none";
        });
    }
    const anyVisible = Array.from(document.querySelectorAll(".leaflet-modal, .legal-modal")).some(
        (m) => m.style.display === "flex"
    );
    if (!anyVisible) {
        document.body.style.overflow = "";
    }
}

window.openModal = openModal;
window.closeModal = closeModal;
window.openEventDetailModal = openEventDetailModal;

function initModals() {
    // Intercept clicks on links with data-modal attribute
    document.querySelectorAll("[data-modal]").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            const modalId = trigger.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                e.preventDefault();
                openModal(modalId);
            }
        });
    });

    // Close buttons inside modals
    document.querySelectorAll(".modal-close-trigger").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const modal = btn.closest(".leaflet-modal, .legal-modal");
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close on backdrop click
    document.querySelectorAll(".leaflet-modal, .legal-modal").forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".leaflet-modal, .legal-modal").forEach((m) => {
                if (m.style.display === "flex") {
                    closeModal(m.id);
                }
            });
        }
    });
}

/* ==========================================================================
   4. TABS & THEME UTILITIES
   ========================================================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle || themeToggle.dataset.hasThemeListener) return;
    themeToggle.dataset.hasThemeListener = "true";

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else if (savedTheme === "light") {
        document.documentElement.removeAttribute("data-theme");
    }

    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
        if (typeof updateSidebarThemeText === "function") {
            updateSidebarThemeText();
        }
    });
}

function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    if (!tabButtons.length) return;

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.tab;
            if (!targetId) return;

            tabButtons.forEach((b) => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

            btn.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });
}

/* ==========================================================================
   5. MOBILE SIDEBAR NAVIGATION
   ========================================================================== */
function openSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (!sidebar) return;
    sidebar.style.display = "flex";
    if (overlay) overlay.style.display = "block";
    void sidebar.offsetWidth;
    sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.classList.add("sidebar-open");
}

function closeSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    setTimeout(() => {
        if (sidebar && !sidebar.classList.contains("active")) {
            sidebar.style.display = "none";
        }
        if (overlay && !overlay.classList.contains("active")) {
            overlay.style.display = "none";
        }
    }, 320);
    document.body.classList.remove("sidebar-open");
    document.body.style.overflow = "";
}

function updateSidebarThemeText() {
    const textEl = document.getElementById("sidebarThemeText");
    if (!textEl) return;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    textEl.textContent = isDark ? "Light Mode" : "Dark Mode";
}

function initMobileSidebar() {
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const closeBtn = document.getElementById("sidebarCloseBtn");
    const overlay = document.getElementById("sidebarOverlay");
    const sidebarThemeBtn = document.getElementById("sidebarThemeToggle");

    if (toggleBtn && !toggleBtn.dataset.hasListener) {
        toggleBtn.dataset.hasListener = "true";
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSidebar();
        });
    }

    if (closeBtn && !closeBtn.dataset.hasListener) {
        closeBtn.dataset.hasListener = "true";
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            closeSidebar();
        });
    }

    if (overlay && !overlay.dataset.hasListener) {
        overlay.dataset.hasListener = "true";
        overlay.addEventListener("click", () => {
            closeSidebar();
        });
    }

    if (sidebarThemeBtn && !sidebarThemeBtn.dataset.hasListener) {
        sidebarThemeBtn.dataset.hasListener = "true";
        sidebarThemeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            if (isDark) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }
            updateSidebarThemeText();
        });
    }

    const navItems = document.querySelectorAll(".sidebar-nav a, .sidebar-actions-group a");
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeSidebar();
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSidebar();
        }
    });

    updateSidebarThemeText();
}

/* ==========================================================================
   6. DOM READY INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Academic Year Member Dropdown
    const yearSelect = document.getElementById("academic-year");
    if (yearSelect) {
        renderClubMembers(yearSelect.value);
        yearSelect.addEventListener("change", (e) => {
            renderClubMembers(e.target.value);
        });
    }

    // 2. Render & Initialize Interactive Events Filtering
    renderCatalystEvents("all");
    initEventsFiltering();

    // 3. Initialize Modals
    initModals();

    // 4. Initialize Tabs
    initTabs();

    // 5. Initialize Theme Toggle
    initThemeToggle();

    // 6. Initialize Mobile Sidebar Navigation
    initMobileSidebar();

    // 7. Automatically popup Onboarding Leaflet Modal on home page
    const leafletModal = document.getElementById("leafletModal");
    if (leafletModal && !sessionStorage.getItem("catalyst_leaflet_shown")) {
        sessionStorage.setItem("catalyst_leaflet_shown", "true");
        setTimeout(() => {
            openModal("leafletModal");
        }, 400);
    }
});

// Expose utilities to global window scope
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.initMobileSidebar = initMobileSidebar;
window.openModal = openModal;
window.closeModal = closeModal;
window.renderCatalystEvents = renderCatalystEvents;
window.initEventsFiltering = initEventsFiltering;
window.escapeHtml = escapeHtml;
window.initThemeToggle = initThemeToggle;
window.initTabs = initTabs;
window.catalystEventsData = catalystEventsData;
window.clubMembersData = clubMembersData;

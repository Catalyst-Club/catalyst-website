/**
 * Catalyst Club — Core JavaScript Module
 * Handles:
 *  1. Academic Year / Member Directory Roster
 *  2. Activities & Events Filtering
 *  3. Legal Modals (Terms of Use & Privacy Policy)
 *  4. Global Theme and Responsive Utilities
 */

/* ==========================================================================
   1. CLUB MEMBERS DATA ROSTER
   --------------------------------------------------------------------------
   Member directory organized by academic year.
   ========================================================================== */
const clubMembersData = {
    // ----------------------------------------------------------------------
    // 2025–2026 BATCH
    // ----------------------------------------------------------------------
    "2025-26": [
        {
            name: "Member 1",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M1"
        },
        {
            name: "Member 2",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M2"
        },
        {
            name: "Member 3",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M3"
        },
        {
            name: "Member 4",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M4"
        },
        {
            name: "Member 5",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M5"
        },
        {
            name: "Member 6",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M6"
        }
    ],

    // ----------------------------------------------------------------------
    // 2024–2025 BATCH
    // ----------------------------------------------------------------------
    "2024-25": [
        {
            name: "Member 1",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M1"
        },
        {
            name: "Member 2",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M2"
        },
        {
            name: "Member 3",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M3"
        },
        {
            name: "Member 4",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M4"
        },
        {
            name: "Member 5",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M5"
        },
        {
            name: "Member 6",
            role: "Club Member",
            dept: "B.Pharm",
            initials: "M6"
        }
    ],

    // ----------------------------------------------------------------------
    // 2023–2024 BATCH
    // ----------------------------------------------------------------------
    "2023-24": [
        {
            name: "Member 1",
            role: "Club Member",
            dept: "HIP Alumni",
            initials: "M1"
        },
        {
            name: "Member 2",
            role: "Club Member",
            dept: "HIP Alumni",
            initials: "M2"
        },
        {
            name: "Member 3",
            role: "Club Member",
            dept: "HIP Alumni",
            initials: "M3"
        }
    ]
};

// Also support alternative keys if selected (e.g. "2025" or "2024")
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

        // Compute initials if not provided
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
        `;
        listContainer.appendChild(card);
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
   2. EVENTS & ACTIVITIES FILTERING
   ========================================================================== */
function initEventsFiltering() {
    const filterButtons = document.querySelectorAll(".event-filter-btn");
    const eventRows = document.querySelectorAll(".event-row");

    if (!filterButtons.length || !eventRows.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter"); // 'all', 'upcoming', 'past'

            eventRows.forEach((row) => {
                const rowStatus = row.getAttribute("data-status"); // 'upcoming' or 'past'
                if (filterValue === "all" || rowStatus === filterValue) {
                    row.style.display = "grid";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   3. LEGAL MODALS (TERMS OF USE & PRIVACY POLICY)
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
   MOBILE SIDEBAR NAVIGATION
   ========================================================================== */
function openSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (!sidebar) return;
    sidebar.style.display = "flex";
    if (overlay) overlay.style.display = "block";
    // Trigger reflow for smooth transform transition
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

    // Close when clicking any nav item inside sidebar
    const navItems = document.querySelectorAll(".sidebar-nav a, .sidebar-actions-group a");
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeSidebar();
        });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSidebar();
        }
    });

    // Initial label
    updateSidebarThemeText();
}

/* ==========================================================================
   5. DOM READY INITIALIZATION
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

    // 2. Initialize Events Filtering
    initEventsFiltering();

    // 3. Initialize Modals
    initModals();

    // 4. Initialize Tabs
    initTabs();

    // 5. Initialize Theme Toggle
    initThemeToggle();

    // 6. Initialize Mobile Sidebar Navigation
    initMobileSidebar();

    // 6. Automatically popup Onboarding Leaflet Modal whenever someone opens the website
    const leafletModal = document.getElementById("leafletModal");
    if (leafletModal) {
        // Pop up the leaflet modal smoothly on page load
        setTimeout(() => {
            openModal("leafletModal");
        }, 400);
    }
});

// Expose utilities to global window scope for modular scripts
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.initMobileSidebar = initMobileSidebar;
window.openModal = openModal;
window.closeModal = closeModal;
window.initEventsFiltering = initEventsFiltering;
window.escapeHtml = escapeHtml;
window.initThemeToggle = initThemeToggle;
window.initTabs = initTabs;

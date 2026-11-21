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
    // 2026–2027 BATCH (CURRENT ACTIVE ACADEMIC YEAR)
    // ----------------------------------------------------------------------
    "2026-27": [
        { name: "Bikramjit Chakraborty", role: "President", initials: "BC" },
        { name: "Soham Mistry", role: "Acting Vice-President", initials: "SM" },
        { name: "Indranil Mondal", role: "Acting Secretary", initials: "IM" },
        { name: "Akshay Kumar Manna", role: "Acting Treasurer", initials: "AK" },
        { name: "Sayantan Maiti", role: "Acting Outreach Lead", initials: "SM" },
        { name: "Swapnendu Das Adhikari", role: "Former Secretary", initials: "SD" },
        { name: "Mrinmayee Mallik", role: "Former Treasurer", initials: "MM" },
        { name: "Sayan Mandal", role: "Former Outreach Lead", initials: "SM" },
        { name: "Aditya Sinha", role: "Active Member", initials: "AS" },
        { name: "Arijit Raut", role: "Active Member", initials: "AR" },
        { name: "Aritra Das Adhikari", role: "Active Member", initials: "AA" },
        { name: "Ayan Dhara", role: "Active Member", initials: "AD" },
        { name: "Ayan Maity", role: "Active Member", initials: "AM" },
        { name: "Ayan Pattanayak", role: "Active Member", initials: "AP" },
        { name: "Manisha Khatun", role: "Active Member", initials: "MK" },
        { name: "Rikita Mani", role: "Active Member", initials: "RM" },
        { name: "Rohit Gucchait", role: "Active Member", initials: "RG" },
        { name: "Rupsa Adak", role: "Active Member", initials: "RA" },
        { name: "Safikul Rahaman Mallik", role: "Active Member", initials: "SR" },
        { name: "Sagarika Samanta", role: "Active Member", initials: "SS" },
        { name: "Sandip Kuila", role: "Active Member", initials: "SK" },
        { name: "Soumyadip Das", role: "Active Member", initials: "SD" }
    ],

    // ----------------------------------------------------------------------
    // 2025–2026 BATCH
    // ----------------------------------------------------------------------
    "2025-26": [
        { name: "Member 1", role: "Core Lead", initials: "M1" },
        { name: "Member 2", role: "Technical Lead", initials: "M2" },
        { name: "Member 3", role: "Events Lead", initials: "M3" },
        { name: "Member 4", role: "Design Studio", initials: "M4" },
        { name: "Member 5", role: "Research Desk", initials: "M5" },
        { name: "Member 6", role: "Core Member", initials: "M6" }
    ],

    // ----------------------------------------------------------------------
    // 2024–2025 BATCH
    // ----------------------------------------------------------------------
    "2024-25": [
        { name: "Member 1", role: "Core Lead", initials: "M1" },
        { name: "Member 2", role: "Club Member", initials: "M2" },
        { name: "Member 3", role: "Club Member", initials: "M3" },
        { name: "Member 4", role: "Club Member", initials: "M4" },
        { name: "Member 5", role: "Club Member", initials: "M5" },
        { name: "Member 6", role: "Club Member", initials: "M6" }
    ],

    // ----------------------------------------------------------------------
    // 2023–2024 BATCH (FOUNDING COHORT / ALUMNI)
    // ----------------------------------------------------------------------
    "2023-24": [
        { name: "Member 1", role: "Founding Lead", initials: "M1" },
        { name: "Member 2", role: "Founding Member", initials: "M2" },
        { name: "Member 3", role: "Founding Member", initials: "M3" }
    ]
};

// Aliases for alternate dropdown formats
clubMembersData["2026"] = clubMembersData["2026-27"];
clubMembersData["2027"] = clubMembersData["2026-27"];
clubMembersData["2025"] = clubMembersData["2025-26"];
clubMembersData["2024"] = clubMembersData["2023-24"];

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

    // Hierarchical role rank weighting (President > VP > Secretary > Treasurer > Outreach Lead > Former Officers > Members)
    const roleHierarchy = {
        "President": 1,
        "Acting Vice-President": 2,
        "Acting Vice-president": 2,
        "Vice-President": 2,
        "Vice-president": 2,
        "Acting Secretary": 3,
        "Secretary": 3,
        "Acting Treasurer": 4,
        "Treasurer": 4,
        "Acting Outreach Lead": 5,
        "Outreach Lead": 5,
        "Former Secretary": 6,
        "Former Treasurer": 7,
        "Former Outreach Lead": 8,
        "Core Lead": 9,
        "Technical Lead": 10,
        "Events Lead": 11,
        "Design Studio": 12,
        "Research Desk": 13,
        "Founding Lead": 14,
        "Founding Member": 15,
        "Active Member": 20,
        "Club Member": 20,
        "Core Member": 20,
        "Member": 20
    };

    const sortedMembers = [...members].sort((a, b) => {
        const rankA = roleHierarchy[a.role] || 50;
        const rankB = roleHierarchy[b.role] || 50;
        if (rankA !== rankB) return rankA - rankB;
        return a.name.localeCompare(b.name);
    });

    sortedMembers.forEach((member) => {
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
            <div class="member-role">${escapeHtml(member.role || "Member")}</div>
            ${member.bio ? `<p class="member-bio" style="font-size:0.8rem; color:var(--muted-text); margin-top:8px;">${escapeHtml(member.bio)}</p>` : ""}
        `;
        listContainer.appendChild(card);
    });
}

/* ==========================================================================
   2. CATALYST CLUB ACTIVITIES & TRACKS DATA REPOSITORY
   --------------------------------------------------------------------------
   Structured repository for Club Pillars & Interactive Tracks.
   ========================================================================== */
const catalystActivitiesData = [
    {
        id: "track-regular-meets",
        category: "meets",
        trackTag: "Weekly Meet",
        trackBadge: "Weekly Forum",
        icon: "fa-calendar-week",
        title: "Regular Saturday Meets",
        subtitle: "Weekly Community Gathering & Sync",
        frequency: "Every Saturday (excl. holidays)",
        timing: "10:30 AM – 12:30 PM",
        location: "Classroom 3rd Floor / Google Meet",
        lead: "Executive Council & Core Team",
        targetAudience: "All Catalyst Club Members & Aspirants",
        shortDesc: "Weekly collaborative discussions, project review sprints, live tech demos, lightning talks, and club syncs.",
        fullDesc: "Regular Saturday Meets form the heartbeat of Catalyst Club. Every week, members gather to demo newly developed code, brainstorm ideas for upcoming campus competitions, review team milestones, and learn through peer-led mini-talks. Sessions feature an attendance check-in, lively tech debates, and project mentorship desks.",
        tools: ["Google Meet", "Sprint Planning", "Jupyter Demos", "Project Reviews", "Peer Crit"],
        curriculum: [
            "Agile project management & collaborative problem-solving",
            "Public speaking & concise technical presentation skills",
            "Peer code review and constructive feedback etiquette",
            "Club leadership, event organizing, and student advocacy"
        ],
        agenda: [
            { time: "15 min", title: "Club Announcements & Check-In", desc: "Welcome address, attendance logging, and weekly agenda overview." },
            { time: "45 min", title: "Lightning Demos & Sprint Reviews", desc: "Member showcases: code repositories, design iterations, or research hypotheses." },
            { time: "35 min", title: "Interactive Workshop / Tech Debate", desc: "Hands-on walkthrough or discussion on emerging tech & pharmaceutical trends." },
            { time: "25 min", title: "Action Sprints & Networking", desc: "Sub-team breakout rooms, task assignment, and informal mentor Q&A." }
        ],
        relatedEventFilter: "meets"
    },
    {
        id: "track-skill-workshops",
        category: "workshops",
        trackTag: "Hands-on Lab",
        trackBadge: "Coding Labs",
        icon: "fa-laptop-code",
        title: "Skill Bootcamps & Labs",
        subtitle: "Practical Coding & Software Workflows",
        frequency: "Bi-Weekly Intensives",
        timing: "Saturday Afternoons / Scheduled Labs",
        location: "Classroom 3rd Floor, College Building",
        lead: "Technical Lead & Software Mentors",
        targetAudience: "Students curious about coding, data science & modern tech",
        shortDesc: "Beginner-friendly intensives transforming students into makers with Python scripts, real-world data science, and web applications.",
        fullDesc: "Designed from the ground up for science and healthcare students with zero prior programming experience, this track transitions students into confident builders. Through structured, hands-on lab exercises, attendees write real code, build web dashboards, parse experimental datasets, and deploy automated utilities.",
        tools: ["Python 3", "VS Code", "GitHub", "Pandas", "Streamlit", "HTML5/CSS3"],
        curriculum: [
            "Python 3 essentials, data structures, and script automation",
            "Web development fundamentals (HTML5, Modern CSS, JavaScript)",
            "Data analysis with Pandas, NumPy, and Matplotlib charts",
            "Git version control and collaborative GitHub workflows"
        ],
        agenda: [
            { time: "20 min", title: "Core Concepts & Architecture", desc: "Syntax overview, conceptual diagrams, and use-cases." },
            { time: "50 min", title: "Guided Live Coding Lab", desc: "Step-by-step notebook builds with instructor mentoring." },
            { time: "30 min", title: "Sprint Challenge & Pair Coding", desc: "Tackle a problem prompt, debug, and push to GitHub." },
            { time: "20 min", title: "Code Teardown & Submissions", desc: "Best-practice reviews, common bug fixes, and sign-off." }
        ],
        relatedEventFilter: "workshops"
    },
    {
        id: "track-sci-tech",
        category: "research",
        trackTag: "Journal Club",
        trackBadge: "Scientific Inquiry",
        icon: "fa-microscope",
        title: "Sci-Tech & Research Lab",
        subtitle: "Evidence Synthesis & Emerging Sciences",
        frequency: "Monthly Colloquium",
        timing: "Scheduled Sessions / Seminar Hours",
        location: "Hybrid (Classroom 3rd Floor / Google Meet)",
        lead: "Research Desk & Academic Advisory Panel",
        targetAudience: "Students interested in scientific research, meta-analysis & publication",
        shortDesc: "Rigorous scientific inquiry exploring biomedical databases, systematic review methodologies, statistical pooling, and AI applications.",
        fullDesc: "Bridging the gap between pharmaceutical sciences and modern computational methods, this track trains students to dissect peer-reviewed literature, execute systematic reviews and meta-analyses, and explore AI tools accelerating drug discovery, molecular modeling, and clinical trials.",
        tools: ["PubMed", "PRISMA 2020", "Forest Plots", "Zotero", "DeepChem", "KaTeX"],
        curriculum: [
            "Systematic literature reviews according to PRISMA protocols",
            "Statistical effect sizing, meta-regression, and forest plot interpretation",
            "Navigating scientific databases (PubMed, ScienceDirect, ClinicalTrials.gov)",
            "Scientific manuscript preparation, reference management, and peer review"
        ],
        agenda: [
            { time: "25 min", title: "Landmark Paper Breakdown", desc: "Critical appraisal of high-impact journal breakthroughs." },
            { time: "40 min", title: "Methodological Deep-Dive", desc: "Data extraction, risk of bias analysis, and forest plots." },
            { time: "30 min", title: "Computational Tool Demo", desc: "Live walkthroughs of molecular software and AI tools." },
            { time: "25 min", title: "Research Pitches & Crit", desc: "Member hypothesis pitches and manuscript mentoring." }
        ],
        relatedEventFilter: "meets"
    },
    {
        id: "track-creative-media",
        category: "creative",
        trackTag: "Design Studio",
        trackBadge: "Creative Studio",
        icon: "fa-palette",
        title: "Creative & Media Studio",
        subtitle: "UI/UX Design, Visual Identity & Media",
        frequency: "Sprint-Based Workshops",
        timing: "Pre-Event Campaigns & Design Jams",
        location: "Classroom 3rd Floor & Cloud Sandbox",
        lead: "Design Studio Lead & Creative Team",
        targetAudience: "Visual designers, UI/UX enthusiasts & content creators",
        shortDesc: "Master modern UI/UX design, typography systems, vector illustrations, and high-impact social campaigns that elevate club initiatives.",
        fullDesc: "The Creative & Media Studio powers the visual presence and storytelling of Catalyst Club. Members master modern design tools like Figma and Canva, explore typography, color theory, responsive layouts, and motion design to craft stunning event branding, interactive prototypes, and engaging media.",
        tools: ["Figma", "Canva Pro", "Vector Assets", "UI Kits", "Typography", "Media"],
        curriculum: [
            "Figma component architecture, auto-layout, and design tokens",
            "Visual branding, color systems, and modern responsive typography",
            "Social media poster composition and promotional asset generation",
            "UI/UX prototyping for mobile and desktop web applications"
        ],
        agenda: [
            { time: "20 min", title: "Design Principles & Inspiration", desc: "Layout composition, visual hierarchies, and branding case studies." },
            { time: "45 min", title: "Hands-On Figma / Canva Sprint", desc: "Live guided creation of UI screens, posters, or motion graphics." },
            { time: "35 min", title: "Critique & Refinement Round", desc: "Constructive feedback on spacing, contrast, and visual polish." },
            { time: "20 min", title: "Export & Asset Publishing", desc: "Production export for web, print, and social broadcasts." }
        ],
        relatedEventFilter: "workshops"
    }
];

/**
 * Open Activity Detail Modal with full syllabus & session breakdown
 * @param {string} trackId
 */
function openActivityDetailModal(trackId) {
    const track = catalystActivitiesData.find(t => t.id === trackId);
    if (!track) return;

    const modal = document.getElementById("activityDetailModal");
    if (!modal) return;

    const tagEl = document.getElementById("activityModalTag");
    const badgeEl = document.getElementById("activityModalBadge");
    const iconEl = document.getElementById("activityModalIcon");
    const titleEl = document.getElementById("activityModalTitle");
    const audienceEl = document.getElementById("activityModalAudience");
    const freqEl = document.getElementById("activityModalFrequency");
    const timingEl = document.getElementById("activityModalTiming");
    const locationEl = document.getElementById("activityModalLocation");
    const leadEl = document.getElementById("activityModalLead");
    const descEl = document.getElementById("activityModalDesc");
    const toolsContainer = document.getElementById("activityModalTools");
    const curriculumUl = document.getElementById("activityModalCurriculumList");
    const agendaTimeline = document.getElementById("activityModalAgendaTimeline");
    const eventsBtn = document.getElementById("activityModalEventsBtn");

    if (tagEl) tagEl.textContent = track.trackTag;
    if (badgeEl) badgeEl.textContent = track.trackBadge;
    if (iconEl) iconEl.innerHTML = `<i class="fas ${track.icon}"></i>`;
    if (titleEl) titleEl.textContent = track.title;
    if (audienceEl) audienceEl.textContent = `Audience: ${track.targetAudience}`;
    if (freqEl) freqEl.textContent = track.frequency;
    if (timingEl) timingEl.textContent = track.timing;
    if (locationEl) locationEl.textContent = track.location;
    if (leadEl) leadEl.textContent = track.lead;
    if (descEl) descEl.textContent = track.fullDesc;

    if (toolsContainer) {
        toolsContainer.innerHTML = "";
        (track.tools || []).forEach(tool => {
            const span = document.createElement("span");
            span.className = "tool-chip";
            span.innerHTML = `<i class="fas fa-check"></i> ${escapeHtml(tool)}`;
            toolsContainer.appendChild(span);
        });
    }

    if (curriculumUl) {
        curriculumUl.innerHTML = "";
        (track.curriculum || []).forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${escapeHtml(item)}</span>`;
            curriculumUl.appendChild(li);
        });
    }

    if (agendaTimeline) {
        agendaTimeline.innerHTML = "";
        (track.agenda || []).forEach(step => {
            const stepEl = document.createElement("div");
            stepEl.className = "agenda-step";
            stepEl.innerHTML = `
                <span class="agenda-time">${escapeHtml(step.time)}</span>
                <div class="agenda-content">
                    <strong>${escapeHtml(step.title)}</strong>
                    <span>${escapeHtml(step.desc)}</span>
                </div>
            `;
            agendaTimeline.appendChild(stepEl);
        });
    }

    if (eventsBtn) {
        eventsBtn.onclick = () => {
            filterAndScrollToEvents(track.relatedEventFilter);
        };
    }

    openModal("activityDetailModal");
}

/**
 * Filter Events section and smoothly scroll to it
 * @param {string} category
 */
function filterAndScrollToEvents(category) {
    const filterBtns = document.querySelectorAll(".event-filter-btn");
    filterBtns.forEach(btn => {
        if (btn.getAttribute("data-filter") === category) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderCatalystEvents(category);
    closeModal("activityDetailModal");

    const eventsEl = document.getElementById("events");
    if (eventsEl) {
        eventsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

/**
 * Initialize interactive activities & tracks:
 * - Category filter pills
 * - Expandable session routine drawers
 */
function initActivities() {
    // 1. Track Filter Tabs
    const filterButtons = document.querySelectorAll(".activity-filter-btn");
    const trackCards = document.querySelectorAll(".activity-track-card");
    const countBadge = document.getElementById("activitiesCountBadge");

    if (filterButtons.length && trackCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-track-filter") || "all";
                let visibleCount = 0;

                trackCards.forEach(card => {
                    const cardCat = card.getAttribute("data-track-category");
                    if (filter === "all" || cardCat === filter) {
                        card.style.display = "flex";
                        card.style.animation = "softFadeIn 0.3s ease";
                        visibleCount++;
                    } else {
                        card.style.display = "none";
                    }
                });

                if (countBadge) {
                    countBadge.innerHTML = `<i class="fas fa-layer-group"></i> ${visibleCount} ${visibleCount === 1 ? "TRACK" : "TRACKS"}`;
                }
            });
        });
    }

    // 2. Expandable Session Routine Drawers
    const expandButtons = document.querySelectorAll(".btn-track-expand");
    expandButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute("data-target");
            const drawer = document.getElementById(targetId);
            if (!drawer) return;

            const isExpanded = drawer.classList.contains("expanded");
            if (isExpanded) {
                drawer.classList.remove("expanded");
                btn.classList.remove("active");
                btn.setAttribute("aria-expanded", "false");
                const span = btn.querySelector("span");
                if (span) span.textContent = "Session Routine";
            } else {
                drawer.classList.add("expanded");
                btn.classList.add("active");
                btn.setAttribute("aria-expanded", "true");
                const span = btn.querySelector("span");
                if (span) span.textContent = "Hide Routine";
            }
        });
    });
}

/* ==========================================================================
   2.2 CATALYST CLUB EVENTS & MEETS DATA REPOSITORY
   --------------------------------------------------------------------------
   INSTRUCTIONS FOR ADDING / EDITING EVENTS:
   To add an upcoming or past event, duplicate one of the objects below and edit:
     - id: Unique slug string (e.g. "event-spring-symposium-2026")
     - title: Full event title
     - category: "workshops" | "meets" | "competitions"
     - categoryLabel: Badge display name (e.g. "HANDS-ON WORKSHOP")
     - status: "upcoming" | "completed" | "past" (Auto-evaluated by date/time)
     - statusLabel: Badge status (e.g. "Upcoming" or "Completed")
     - day: Day number or "--" (e.g. "21" or "--")
     - month: 3-letter or full month (e.g. "NOV" or "TBD")
     - year: 4-digit year (e.g. "2026")
     - time: Time range or start time (e.g. "6:15 PM" or "6:15 PM - 7:30 PM")
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
        id: "event-blockchain-meet-2026",
        title: "Google Meet on Blockchain Tech",
        category: "meets",
        categoryLabel: "Google Meet • Tech Talk",
        status: "upcoming",
        statusLabel: "Upcoming",
        day: "21",
        month: "NOV",
        year: "2026",
        time: "6:15 PM",
        location: "Google Meet (Online Session)",
        locationType: "online",
        speaker: "Catalyst Tech Team & Speakers",
        shortDesc: "Virtual meet exploring blockchain fundamentals, decentralized ledgers, smart contracts, and Web3 applications.",
        fullDesc: "Join Catalyst Club for a live interactive virtual session on Google Meet deep-diving into blockchain technology. Topics include decentralized network architecture, cryptographic principles, smart contracts, and potential real-world applications across healthcare supply chains and scientific research. Open to all members.",
        highlights: [
            "Core architecture of blockchains & distributed ledgers",
            "Smart contracts & cryptographic consensus mechanisms",
            "Real-world healthcare and digital supply chain use cases",
            "Live interactive student Q&A and technical discussion"
        ],
        rsvpLink: "form.html"
    }
];

/**
 * Compute the scheduled end timestamp of an event
 * Returns a Date object, or null if date is not fully defined
 * @param {Object} ev
 * @returns {Date|null}
 */
function getEventEndDateTime(ev) {
    if (!ev || !ev.year || !ev.month || !ev.day) return null;
    if (ev.day === "--" || String(ev.month).trim().toLowerCase() === "tbd") return null;

    const monthMap = {
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7,
        sep: 8, sept: 8, september: 8,
        oct: 9, october: 9,
        nov: 10, november: 10,
        dec: 11, december: 11
    };

    const monthStr = String(ev.month).trim().toLowerCase();
    const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : parseInt(monthStr, 10) - 1;
    const year = parseInt(ev.year, 10);
    const day = parseInt(ev.day, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

    let hours = 23;
    let minutes = 59;

    if (ev.time && typeof ev.time === "string") {
        // If a range is given (e.g. "6:15 PM - 7:30 PM" or "10:30 AM – 12:30 PM"), pick the end time
        const parts = ev.time.split(/[-–—]/);
        const targetTimeStr = parts.length > 1 ? parts[parts.length - 1].trim() : parts[0].trim();

        const match = targetTimeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
        if (match) {
            let h = parseInt(match[1], 10);
            let m = match[2] ? parseInt(match[2], 10) : 0;
            const meridian = match[3] ? match[3].toLowerCase() : null;

            if (meridian === "pm" && h < 12) h += 12;
            if (meridian === "am" && h === 12) h = 0;

            // If only a single start time was provided without an end time, grant a 1-hour session window
            if (parts.length === 1) {
                h += 1;
            }

            hours = h;
            minutes = m;
        }
    }

    return new Date(year, month, day, hours, minutes, 0);
}

/**
 * Automatically evaluate event scheduled times against current time.
 * If scheduled time has passed, marks status as 'completed' and statusLabel as 'Completed'
 * and moves it to past archive.
 */
function autoUpdateEventsScheduleStatus() {
    if (!Array.isArray(catalystEventsData)) return;

    const now = new Date();
    catalystEventsData.forEach(ev => {
        const endDt = getEventEndDateTime(ev);
        if (endDt) {
            if (now >= endDt) {
                ev.status = "completed";
                ev.statusLabel = "Completed";
            } else {
                ev.status = "upcoming";
                ev.statusLabel = "Upcoming";
            }
        }
    });
}

/**
 * Render the dynamic interactive events list into .events-list
 * @param {string} filterCategory - 'all', 'workshops', 'meets', 'competitions', 'upcoming', 'past'
 */
function renderCatalystEvents(filter = "all") {
    const container = document.querySelector(".events-list");
    if (!container) return;

    // Automatically check scheduled time and transition expired events to completed/past archive
    autoUpdateEventsScheduleStatus();

    let filtered = catalystEventsData;
    if (filter === "upcoming") {
        filtered = catalystEventsData.filter(e => e.status === "upcoming");
    } else if (filter === "past") {
        filtered = catalystEventsData.filter(e => e.status === "completed" || e.status === "past");
    } else if (filter !== "all") {
        filtered = catalystEventsData.filter(e => e.category === filter);
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
        if (filter === "upcoming") {
            container.innerHTML = `
                <div class="events-empty-liquid-state">
                    <div class="empty-glass-icon"><i class="fas fa-calendar-check"></i></div>
                    <h3>No Upcoming Meets Scheduled</h3>
                    <p>All scheduled sessions for this cycle have concluded. Check back soon for fresh workshops, or explore our past archives below.</p>
                    <button type="button" class="btn btn-primary" onclick="filterAndScrollToEvents('past')" style="margin-top:14px;">
                        <i class="fas fa-history"></i> Browse Past Archive →
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="events-empty-liquid-state">
                    <div class="empty-glass-icon"><i class="fas fa-calendar-times"></i></div>
                    <h3>No Events Found</h3>
                    <p>No events found in this category.</p>
                </div>
            `;
        }
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
    autoUpdateEventsScheduleStatus();
    renderCatalystEvents("all");
    initEventsFiltering();

    // Periodic check every 60s to transition any event into past archive when its scheduled time arrives
    setInterval(() => {
        autoUpdateEventsScheduleStatus();
    }, 60000);

    // 2.1 Initialize Interactive Activities & Tracks
    initActivities();

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
window.getEventEndDateTime = getEventEndDateTime;
window.autoUpdateEventsScheduleStatus = autoUpdateEventsScheduleStatus;
window.initActivities = initActivities;
window.openActivityDetailModal = openActivityDetailModal;
window.filterAndScrollToEvents = filterAndScrollToEvents;
window.escapeHtml = escapeHtml;
window.initThemeToggle = initThemeToggle;
window.initTabs = initTabs;
window.catalystActivitiesData = catalystActivitiesData;
window.catalystEventsData = catalystEventsData;
window.clubMembersData = clubMembersData;

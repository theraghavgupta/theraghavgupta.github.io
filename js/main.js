/* ============================================================
   MAIN.JS — rendering + behavior. You should not need to edit
   this file to change what the site SAYS — that lives in
   js/content.js. Edit this only to change how the site WORKS.
   ============================================================ */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER   = window.matchMedia('(pointer: fine)').matches;

/* ===== ICON LIBRARY (referenced by name from content.js) ===== */
const ICONS = {
    github:    '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>',
    linkedin:  '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>',
    youtube:   '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>',
    instagram: '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>',
    twitter:   '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>',
};

const SVG_ATTR = 'width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const ACAT_ICONS = {
    grid:   `<svg ${SVG_ATTR}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    code:   `<svg ${SVG_ATTR}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    ai:     `<svg ${SVG_ATTR}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
    shield: `<svg ${SVG_ATTR}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    music:  `<svg ${SVG_ATTR}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    bike:   `<svg ${SVG_ATTR}><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`,
    glass:  `<svg ${SVG_ATTR}><path d="M5 3h14l-7 9z"/><path d="M12 12v9"/><path d="M8 21h8"/></svg>`,
    film:   `<svg ${SVG_ATTR}><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 9h5M2 15h5M17 9h5M17 15h5"/></svg>`,
    car:    `<svg ${SVG_ATTR}><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M5 12h14"/></svg>`,
};

const CHIP_CLASS = { daily: 'chip--e', solid: 'chip--a', used: 'chip--m' };

/* ============================================================
   RENDERERS — build each section's DOM from CONTENT
   ============================================================ */

function renderHero() {
    const root = document.getElementById('hero-root');
    const h = CONTENT.hero;
    const [first, ...rest] = CONTENT.identity.name.split(' ');
    root.innerHTML = `
        <p class="hero-greeting">${h.greeting}</p>
        <h1 class="hero-name">
            <span class="name-part" style="--d:0">${first}</span>
            <span class="name-part" style="--d:1">${rest.join(' ')}</span>
        </h1>
        <div class="hero-role">
            <span class="role-prefix">${h.subtitlePrefix}</span><span id="role-text" class="role-text"></span><span class="role-cursor">|</span>
        </div>
        <blockquote class="hero-quote">
            ${h.quote.map(l => `<span>${l}</span>`).join('')}
        </blockquote>
        ${h.tagline ? `<p class="hero-tagline">${h.tagline.replace(/\n/g, '<br>')}</p>` : ''}
        <div class="hero-actions">
            <a href="${h.ctaPrimary.href}" class="btn-primary magnetic">${h.ctaPrimary.label}</a>
            <a href="${h.ctaGhost.href}" class="btn-ghost magnetic">${h.ctaGhost.label}</a>
        </div>
    `;
    const cue = document.querySelector('.hero-scroll span');
    if (cue && h.scrollCue) cue.textContent = h.scrollCue;
}

function renderAbout() {
    const root = document.getElementById('about-root');
    const a = CONTENT.about;
    root.innerHTML = `
        <div class="about-visual reveal-left">
            <div class="profile-wrap">
                <img src="${a.image}" alt="${CONTENT.identity.name}" class="profile-img">
            </div>
            <div class="stats-row">
                ${a.stats.map(s => `
                    <div class="stat">
                        <div class="stat-top">
                            <span class="stat-n" data-to="${s.n}">0</span><span class="stat-plus">${s.suffix}</span>
                        </div>
                        <span class="stat-label">${s.label}</span>
                    </div>`).join('')}
            </div>
        </div>
        <div class="about-text reveal-right">
            <span class="sec-label">${a.label}</span>
            <h2>${a.heading}</h2>

            <div class="about-block">
                <h3 class="about-sublabel">${a.shortVersionLabel}</h3>
                ${a.shortVersion.map(p => `<p>${p}</p>`).join('')}
            </div>

            <div class="about-block">
                <h3 class="about-sublabel">${a.honestLabel}</h3>
                ${a.honest.map(p => `<p>${p}</p>`).join('')}
            </div>

            <div class="about-block">
                <h3 class="about-sublabel">${a.principlesLabel}</h3>
                <ol class="about-principles">
                    ${a.principles.map(p => `
                        <li>
                            <strong>${p.lead}</strong>
                            <span>${p.text}</span>
                        </li>`).join('')}
                </ol>
            </div>

            ${a.pills && a.pills.length ? `
                <div class="tag-list">
                    ${a.pills.map(p => `<span class="pill">${p}</span>`).join('')}
                </div>` : ''}

            <p class="about-contact">
                <a href="mailto:${CONTENT.identity.email}">${CONTENT.identity.email}</a>
                <span class="dot">&nbsp;&middot;&nbsp;</span>${CONTENT.identity.location}
            </p>
        </div>
    `;
}

function renderJourney() {
    const root = document.getElementById('journey-root');
    const j = CONTENT.journey;

    const phaseHTML = j.phases.map(ph => `
        <div class="tl-phase reveal-up">
            <div class="tl-spine">
                <div class="tl-node${ph.nodeStyle ? ' tl-node--' + ph.nodeStyle : ''}">${ph.node}</div>
            </div>
            <div class="tl-body">
                <div class="phase-tag${ph.tagStyle ? ' phase-tag--' + ph.tagStyle : ''}">${ph.tag}</div>
                <h3>${ph.title}</h3>
                ${ph.period ? `<p class="tl-period">${ph.period}</p>` : ''}
                ${ph.location ? `<p class="tl-location">${ph.location}</p>` : ''}
                <p class="tl-desc">${ph.desc}</p>
                ${ph.projects ? `
                    <div class="tl-projects">
                        ${ph.projects.map(pr => {
                            const tag = pr.link ? 'a' : 'div';
                            const attrs = pr.link ? ` href="${pr.link}" target="_blank" rel="noopener noreferrer"` : '';
                            return `<${tag} class="tl-proj"${attrs}>
                                <img src="${pr.img}" alt="${pr.name}" loading="lazy">
                                <div class="tl-proj-info">
                                    <strong>${pr.name}</strong>
                                    <span>${pr.sub}</span>
                                </div>
                            </${tag}>`;
                        }).join('')}
                    </div>` : ''}
            </div>
        </div>
    `).join('');

    root.innerHTML = `
        <div class="sec-header reveal-up">
            <span class="sec-label">${j.label}</span>
            <h2>${j.heading}</h2>
            <p>${j.sub}</p>
        </div>
        <div class="timeline">${phaseHTML}</div>
    `;
}

function renderProjectsShell() {
    const root = document.getElementById('projects-root');
    const p = CONTENT.projects;
    const vb = p.viewBox;
    root.innerHTML = `
        <div class="sec-header reveal-up">
            <span class="sec-label">${p.label}</span>
            <h2>${p.heading}</h2>
            <p>${p.sub}</p>
        </div>
        <div class="constellation-filters reveal-up">
            ${p.filters.map((f, i) => `<button class="cf-btn${i === 0 ? ' active' : ''}" data-filter="${f.id}">${f.label}</button>`).join('')}
        </div>
        <div class="constellation-wrap">
            <div class="c-cursor-glow" id="c-cursor-glow"></div>
            <svg id="constellation-svg" viewBox="0 0 ${vb.w} ${vb.h}" preserveAspectRatio="xMidYMid meet" aria-label="Project constellation map"></svg>
            <div id="node-tooltip" class="node-tooltip"></div>
        </div>
        <div class="proj-mobile-grid" id="proj-mobile-grid"></div>
    `;
}

function renderArsenal() {
    const root = document.getElementById('arsenal-root');
    const a = CONTENT.arsenal;
    root.innerHTML = `
        <div class="sec-header reveal-up">
            <span class="sec-label">${a.label}</span>
            <h2>${a.heading}</h2>
            ${a.sub ? `<p>${a.sub}</p>` : ''}
        </div>
        <div class="arsenal-grid">
            ${a.categories.map((cat, i) => `
                <div class="arsenal-cat reveal-up${cat.prose ? ' arsenal-cat--prose' : ''}" style="--d:${i}">
                    <div class="acat-head">
                        <div class="acat-icon">${ACAT_ICONS[cat.icon] || ''}</div>
                        <h4>${cat.name}</h4>
                    </div>
                    ${cat.chips ? `
                        <div class="skill-chips">
                            ${cat.chips.map(c => `<span class="chip ${CHIP_CLASS[c.level] || 'chip--m'}">${c.label}</span>`).join('')}
                        </div>` : ''}
                    ${cat.prose ? `<p class="acat-prose">${cat.prose}</p>` : ''}
                    ${cat.quote ? `<p class="acat-quote">${cat.quote}</p>` : ''}
                </div>`).join('')}
        </div>
        <div class="certs-row reveal-up">
            <h4 class="certs-label">Certifications</h4>
            <div class="certs-grid">
                ${a.certs.map(c => `
                    <div class="cert-card">
                        <div class="cert-badge">${c.badge}</div>
                        <div class="cert-info"><strong>${c.name}</strong></div>
                    </div>`).join('')}
            </div>
        </div>
    `;
}

function renderLife() {
    const root = document.getElementById('life-root');
    const l = CONTENT.life;
    root.innerHTML = `
        <div class="sec-header reveal-up">
            <span class="sec-label">${l.label}</span>
            <h2>${l.heading}</h2>
            ${l.sub ? `<p>${l.sub}</p>` : ''}
        </div>
        <div class="life-grid">
            ${l.cards.map((c, i) => `
                <div class="life-card reveal-up tilt" style="--i:${i}">
                    <div class="lc-num">${String(i + 1).padStart(2, '0')}</div>
                    <div class="lc-body">
                        <h3>${c.title}</h3>
                        <p>${c.text}</p>
                    </div>
                    <div class="lc-accent"></div>
                </div>`).join('')}
        </div>
        ${l.currently ? `
            <div class="life-now reveal-up">
                <div class="now-head">
                    <span class="now-dot"></span>${l.currentlyLabel}${l.currentlyUpdated ? ` · ${l.currentlyUpdated}` : ''}
                </div>
                <dl class="now-list">
                    ${l.currently.map(c => `
                        <div class="now-row">
                            <dt>${c.label}</dt>
                            <dd>${c.text}</dd>
                        </div>`).join('')}
                </dl>
            </div>` : ''}
    `;
}

function renderConnect() {
    const root = document.getElementById('connect-root');
    const c = CONTENT.connect;
    root.innerHTML = `
        <span class="sec-label sec-label--amber">${c.label}</span>
        <h2>${c.heading}</h2>
        <p>${c.blurb}</p>
        ${c.hiring ? `<p class="connect-hiring">${c.hiring}</p>` : ''}
        <a href="mailto:${CONTENT.identity.email}" class="connect-email">${CONTENT.identity.email}</a>
        <div class="connect-socials">
            ${CONTENT.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="soc-btn magnetic">
                    ${ICONS[s.icon] || ''}
                    ${s.name}
                </a>`).join('')}
        </div>
        <div class="connect-extra">
            ${c.extraLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="connect-link">${l.label}</a>`).join('')}
        </div>
    `;
}

function renderFooter() {
    const root = document.getElementById('footer-root');
    const f = CONTENT.footer;
    root.innerHTML = `
        <div class="footer-brand">${CONTENT.identity.name} <span>aka ${CONTENT.identity.alias}</span></div>
        ${f.tagline ? `<p class="footer-tagline">${f.tagline}</p>` : ''}
        <div class="footer-socials">
            ${CONTENT.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}">${ICONS[s.icon] || ''}</a>`).join('')}
        </div>
        <p class="footer-copy">${f.copy}</p>
    `;
}

/* ============================================================
   BEHAVIOR
   ============================================================ */

/* ===== ENTRY SEQUENCE ===== */
function initEntry() {
    const veil = document.getElementById('entry-veil');
    if (!veil) return;

    let seen = false;
    try { seen = sessionStorage.getItem('and0-seen') === '1'; } catch (e) { /* private mode */ }

    if (seen || REDUCED_MOTION) {
        veil.remove();
        document.body.classList.remove('booting');
        return;
    }

    veil.querySelector('.entry-mark').textContent = CONTENT.identity.alias;
    try { sessionStorage.setItem('and0-seen', '1'); } catch (e) { /* ignore */ }

    setTimeout(() => {
        veil.classList.add('done');
        document.body.classList.remove('booting');
        setTimeout(() => veil.remove(), 700);
    }, 1100);
}

/* ===== PROGRESS BAR ===== */
function initProgress() {
    const bar = document.getElementById('page-progress');
    window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
}

/* ===== HEADER SCROLL ===== */
function initHeader() {
    const hdr = document.getElementById('site-header');
    const hero = document.getElementById('home');

    const obs = new IntersectionObserver(entries => {
        hdr.classList.toggle('scrolled', !entries[0].isIntersecting);
    }, { threshold: 0.1 });

    obs.observe(hero);
}

/* ===== ACTIVE NAV ===== */
function initActiveNav() {
    const links = document.querySelectorAll('.header-nav a[data-section]');
    const sections = [...links].map(l => document.getElementById(l.dataset.section)).filter(Boolean);

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => obs.observe(s));
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-close-btn');
    const menu = document.getElementById('mobile-menu');
    const links = menu.querySelectorAll('a');

    const open = () => { menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };

    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    links.forEach(l => l.addEventListener('click', close));
}

/* ===== HERO CANVAS ===== */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    const COUNT = REDUCED_MOTION ? 34 : 70;
    const MAX_DIST = 130;
    let mouse = { x: null, y: null };
    let running = true;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        if (!particles) {
            particles = Array.from({ length: COUNT }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.5 + 0.8,
                o: Math.random() * 0.25 + 0.08
            }));
        }
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Stop drawing once the hero has scrolled away — saves battery on long pages.
    const heroObs = new IntersectionObserver(e => {
        running = e[0].isIntersecting;
        if (running) tick();
    }, { threshold: 0 });
    heroObs.observe(document.getElementById('home'));

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    function tick() {
        if (!running) return;
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            if (mouse.x !== null && !REDUCED_MOTION) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 90 && d > 0) {
                    p.vx += (dx / d) * 0.025;
                    p.vy += (dy / d) * 0.025;
                }
            }

            p.vx *= 0.998;
            p.vy *= 0.998;
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed < 0.05) { p.vx = (Math.random() - 0.5) * 0.3; p.vy = (Math.random() - 0.5) * 0.3; }
            if (speed > 1.2)  { p.vx *= 0.96; p.vy *= 0.96; }

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = dx * dx + dy * dy;
                if (d < MAX_DIST * MAX_DIST) {
                    const alpha = (1 - Math.sqrt(d) / MAX_DIST) * 0.14;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.o})`;
            ctx.fill();
        });

        requestAnimationFrame(tick);
    }

    tick();
}

/* ===== TYPEWRITER ===== */
function initTypewriter() {
    const el = document.getElementById('role-text');
    const cursor = document.querySelector('.role-cursor');
    if (!el) return;

    const roles = CONTENT.hero.roles;

    if (REDUCED_MOTION) { el.textContent = roles[0]; return; }

    let ri = 0, ci = 0, del = false;

    function step() {
        const word = roles[ri];
        if (!del) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) { del = true; return setTimeout(step, 2200); }
            setTimeout(step, 45);
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) { del = false; ri = (ri + 1) % roles.length; return setTimeout(step, 380); }
            setTimeout(step, 22);
        }
    }

    setTimeout(step, 1600);
    setInterval(() => { cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0'; }, 520);
}

/* ===== SCROLL REVEAL ===== */
function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
}

/* ===== STAT COUNTERS ===== */
function initCounters() {
    const els = document.querySelectorAll('.stat-n[data-to]');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.to);

            if (REDUCED_MOTION) { el.textContent = target; obs.unobserve(el); return; }

            const dur = 1400;
            const fps = 60;
            const frames = dur / (1000 / fps);
            let cur = 0;
            const inc = target / frames;

            const timer = setInterval(() => {
                cur = Math.min(cur + inc, target);
                el.textContent = Math.floor(cur);
                if (cur >= target) clearInterval(timer);
            }, 1000 / fps);

            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    els.forEach(el => obs.observe(el));
}

/* ===== PROJECT CONSTELLATION ===== */
const EDGE_COLORS = {
    python:  '#e63946',
    web:     '#4cc9f0',
    data:    '#4cc9f0',
    ai:      '#ff9b24',
    azure:   '#4cc9f0',
    college: '#8888aa',
    fun:     '#a78bfa',
};

// Builds a node-matching predicate from a filter definition in content.js
function filterTest(filterId) {
    const f = CONTENT.projects.filters.find(x => x.id === filterId);
    if (!f || f.id === 'all') return () => true;
    if (f.phase) return n => n.phase === f.phase;
    if (f.match) return n => f.match.some(t => n.tags.includes(t));
    return () => true;
}

function svgEl(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

// Node circle radius (kept in one place — edges are trimmed against it)
function nodeRadius(node) {
    return node.phase === 'college' ? 14 : 16;
}

// Pull an edge's endpoints back to the rim of each circle so lines never
// run through the translucent node fill.
function trimEdge(x1, y1, x2, y2, r1, r2) {
    const dx = x2 - x1, dy = y2 - y1;
    const d = Math.hypot(dx, dy) || 1;
    const ux = dx / d, uy = dy / d;
    const GAP = 3;
    return [
        x1 + ux * (r1 + GAP), y1 + uy * (r1 + GAP),
        x2 - ux * (r2 + GAP), y2 - uy * (r2 + GAP),
    ];
}

function initConstellation() {
    const svg = document.getElementById('constellation-svg');
    if (!svg) return;

    const P = CONTENT.projects;
    const NODES = P.nodes;
    const EDGES = P.edges;
    const VB = P.viewBox;

    /* --- defs: glow filter + grid --- */
    const defs = svgEl('defs');
    const filt = svgEl('filter');
    filt.setAttribute('id', 'glow');
    filt.setAttribute('x', '-50%'); filt.setAttribute('y', '-50%');
    filt.setAttribute('width', '200%'); filt.setAttribute('height', '200%');
    const blur = svgEl('feGaussianBlur');
    blur.setAttribute('stdDeviation', '4'); blur.setAttribute('result', 'blur');
    const merge = svgEl('feMerge');
    const mNode1 = svgEl('feMergeNode'); mNode1.setAttribute('in', 'blur');
    const mNode2 = svgEl('feMergeNode'); mNode2.setAttribute('in', 'SourceGraphic');
    merge.append(mNode1, mNode2);
    filt.append(blur, merge);
    defs.appendChild(filt);
    svg.appendChild(defs);

    const gridPat = svgEl('pattern');
    gridPat.setAttribute('id', 'grid'); gridPat.setAttribute('width', '40'); gridPat.setAttribute('height', '40');
    gridPat.setAttribute('patternUnits', 'userSpaceOnUse');
    const gLine1 = svgEl('path');
    gLine1.setAttribute('d', 'M 40 0 L 0 0 0 40');
    gLine1.setAttribute('fill', 'none');
    gLine1.setAttribute('stroke', 'rgba(255,255,255,0.025)');
    gLine1.setAttribute('stroke-width', '0.5');
    gridPat.appendChild(gLine1);
    defs.appendChild(gridPat);

    const bg = svgEl('rect');
    bg.setAttribute('width', VB.w); bg.setAttribute('height', VB.h);
    bg.setAttribute('fill', 'url(#grid)');
    svg.appendChild(bg);

    /* --- era labels --- */
    P.eras.forEach(({ text, x, y }) => {
        const t = svgEl('text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('class', 'c-era-label');
        t.textContent = text;
        svg.appendChild(t);
    });

    /* --- cluster dividers --- */
    P.dividers.forEach(d => {
        const line = svgEl('line');
        line.setAttribute('x1', d.x1); line.setAttribute('y1', d.y1);
        line.setAttribute('x2', d.x2); line.setAttribute('y2', d.y2);
        line.setAttribute('class', 'c-divider');
        svg.appendChild(line);
    });

    /* --- adjacency, used for hover focus --- */
    const neighbours = {};
    NODES.forEach(n => { neighbours[n.id] = new Set(); });
    EDGES.forEach(e => {
        if (neighbours[e.a] && neighbours[e.b]) {
            neighbours[e.a].add(e.b);
            neighbours[e.b].add(e.a);
        }
    });

    /* --- edges (behind nodes) --- */
    const edgeG = svgEl('g');
    edgeG.setAttribute('class', 'edges-group');
    svg.appendChild(edgeG);

    const edgeEls = [];
    EDGES.forEach(edge => {
        const src = NODES.find(n => n.id === edge.a);
        const tgt = NODES.find(n => n.id === edge.b);
        if (!src || !tgt) return;

        const line = svgEl('line');
        const [tx1, ty1, tx2, ty2] = trimEdge(src.x, src.y, tgt.x, tgt.y, nodeRadius(src), nodeRadius(tgt));
        line.setAttribute('x1', tx1); line.setAttribute('y1', ty1);
        line.setAttribute('x2', tx2); line.setAttribute('y2', ty2);
        line.setAttribute('stroke', EDGE_COLORS[edge.type] || '#888');
        line.setAttribute('class', `c-edge${edge.cross ? ' c-edge--cross' : ''}`);
        line.dataset.a = edge.a;
        line.dataset.b = edge.b;
        line.dataset.type = edge.type;
        edgeG.appendChild(line);
        edgeEls.push({ line, src, tgt, a: edge.a, b: edge.b, r1: nodeRadius(src), r2: nodeRadius(tgt) });
    });

    /* --- nodes --- */
    const nodeG = svgEl('g');
    nodeG.setAttribute('class', 'nodes-group');
    svg.appendChild(nodeG);

    const tooltip = document.getElementById('node-tooltip');
    const nodeEls = [];

    NODES.forEach((node, i) => {
        const g = svgEl('g');
        g.setAttribute('class', `c-node c-node--${node.phase}`);
        g.setAttribute('data-id', node.id);
        g.setAttribute('data-phase', node.phase);
        g.setAttribute('data-tags', node.tags.join(' '));
        g.setAttribute('transform', `translate(${node.x},${node.y})`);
        g.style.setProperty('--i', i);

        const glow = svgEl('circle');
        glow.setAttribute('r', '30');
        glow.setAttribute('class', 'c-node-glow');
        g.appendChild(glow);

        const circle = svgEl('circle');
        circle.setAttribute('r', nodeRadius(node));
        circle.setAttribute('class', 'c-node-circle');
        g.appendChild(circle);

        const short = node.name.length > 22 ? node.name.slice(0, 21) + '…' : node.name;
        const lbl = svgEl('text');
        lbl.setAttribute('y', node.phase === 'college' ? '31' : '34');
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('class', 'c-node-label');
        lbl.setAttribute('font-family', 'Inter, sans-serif');
        lbl.textContent = short;
        g.appendChild(lbl);

        /* hover: focus this node + its neighbours, fade the rest */
        g.addEventListener('mouseenter', () => {
            const label = P.phaseLabels[node.phase] || node.phase.toUpperCase();
            tooltip.innerHTML = `
                <div class="tt-phase tt-phase--${node.phase}">${label}</div>
                <div class="tt-name">${node.name}</div>
                <div class="tt-tags">${node.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <div class="tt-desc">${node.desc}</div>
                ${node.link ? '<div class="tt-link">Click to open ↗</div>' : ''}
            `;
            tooltip.classList.add('visible');

            svg.classList.add('has-focus');
            const near = neighbours[node.id];
            nodeEls.forEach(({ g: og, node: on }) => {
                og.classList.toggle('focused', on.id === node.id);
                og.classList.toggle('neighbour', near.has(on.id));
            });
            edgeEls.forEach(({ line, a, b }) => {
                line.classList.toggle('active', a === node.id || b === node.id);
            });
        });

        g.addEventListener('mousemove', evt => {
            let x = evt.clientX + 18;
            let y = evt.clientY - 12;
            if (x + 300 > window.innerWidth) x = evt.clientX - 308;
            if (y + 220 > window.innerHeight) y = Math.max(12, evt.clientY - 200);
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        g.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
            svg.classList.remove('has-focus');
            nodeEls.forEach(({ g: og }) => og.classList.remove('focused', 'neighbour'));
            edgeEls.forEach(({ line }) => line.classList.remove('active'));
        });

        if (node.link) {
            g.style.cursor = 'pointer';
            g.addEventListener('click', () => window.open(node.link, '_blank', 'noopener,noreferrer'));
        }

        nodeG.appendChild(g);
        nodeEls.push({
            g, node,
            px: Math.random() * Math.PI * 2,   // drift phase
            py: Math.random() * Math.PI * 2,
            sx: 0.55 + Math.random() * 0.5,    // drift speed
            sy: 0.55 + Math.random() * 0.5,
        });
    });

    /* --- staggered entrance when the map scrolls into view --- */
    const wrap = svg.closest('.constellation-wrap');
    const revealObs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        svg.classList.add('c-revealed');
        revealObs.disconnect();
    }, { threshold: 0.12 });
    revealObs.observe(wrap);

    /* --- idle drift: one shared rAF, paused when off-screen --- */
    if (REDUCED_MOTION) return;

    let visible = false;
    const driftObs = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) requestAnimationFrame(drift);
    }, { threshold: 0 });
    driftObs.observe(wrap);

    const AMP = 3.2;
    const start = performance.now();

    function drift(now) {
        if (!visible) return;
        const t = (now - start) / 1000;

        nodeEls.forEach(n => {
            n.dx = Math.sin(t * n.sx + n.px) * AMP;
            n.dy = Math.cos(t * n.sy + n.py) * AMP;
            n.g.setAttribute('transform', `translate(${n.node.x + n.dx},${n.node.y + n.dy})`);
        });

        const pos = {};
        nodeEls.forEach(n => { pos[n.node.id] = [n.node.x + n.dx, n.node.y + n.dy]; });

        edgeEls.forEach(e => {
            const p1 = pos[e.a], p2 = pos[e.b];
            if (!p1 || !p2) return;
            const [x1, y1, x2, y2] = trimEdge(p1[0], p1[1], p2[0], p2[1], e.r1, e.r2);
            e.line.setAttribute('x1', x1); e.line.setAttribute('y1', y1);
            e.line.setAttribute('x2', x2); e.line.setAttribute('y2', y2);
        });

        requestAnimationFrame(drift);
    }
}

/* ===== CONSTELLATION FILTERS ===== */
function initConstellationFilters() {
    const btns = document.querySelectorAll('.cf-btn');
    const svg = document.getElementById('constellation-svg');
    if (!svg) return;

    const NODES = CONTENT.projects.nodes;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const test = filterTest(filter);

            const nodes = svg.querySelectorAll('.c-node');
            const edges = svg.querySelectorAll('.c-edge');

            if (filter === 'all') {
                nodes.forEach(n => { n.classList.remove('dimmed', 'lit'); });
                edges.forEach(e => { e.classList.remove('dimmed', 'lit'); });
                return;
            }

            const matchIds = new Set(NODES.filter(test).map(n => n.id));

            nodes.forEach(n => {
                const id = n.dataset.id;
                if (matchIds.has(id)) { n.classList.remove('dimmed'); n.classList.add('lit'); }
                else { n.classList.add('dimmed'); n.classList.remove('lit'); }
            });

            edges.forEach(e => {
                const aMatch = matchIds.has(e.dataset.a);
                const bMatch = matchIds.has(e.dataset.b);
                if (aMatch && bMatch) { e.classList.remove('dimmed'); e.classList.add('lit'); }
                else { e.classList.add('dimmed'); e.classList.remove('lit'); }
            });
        });
    });
}

/* ===== CURSOR GLOW INSIDE THE MAP ===== */
function initCursorGlow() {
    const wrap = document.querySelector('.constellation-wrap');
    const glow = document.getElementById('c-cursor-glow');
    if (!wrap || !glow || !FINE_POINTER || REDUCED_MOTION) return;

    wrap.addEventListener('mousemove', e => {
        const r = wrap.getBoundingClientRect();
        glow.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    }, { passive: true });

    wrap.addEventListener('mouseenter', () => glow.classList.add('on'));
    wrap.addEventListener('mouseleave', () => glow.classList.remove('on'));
}

/* ===== MOBILE PROJECT GRID ===== */
function initMobileGrid() {
    const container = document.getElementById('proj-mobile-grid');
    if (!container) return;

    const P = CONTENT.projects;
    const NODES = P.nodes;

    NODES.forEach(node => {
        const card = document.createElement(node.link ? 'a' : 'div');
        card.className = 'pmg-card';
        if (node.link) { card.href = node.link; card.target = '_blank'; card.rel = 'noopener noreferrer'; }
        card.dataset.id = node.id;
        card.dataset.phase = node.phase;
        card.dataset.tags = node.tags.join(' ');

        const label = P.phaseLabels[node.phase] || node.phase.toUpperCase();
        card.innerHTML = `
            <div class="pmg-phase pmg-phase--${node.phase}">${label}</div>
            <div class="pmg-name">${node.name}</div>
            <div class="pmg-desc">${node.desc}</div>
            <div class="pmg-tags">${node.tags.map(t => `<span>${t}</span>`).join('')}</div>
        `;

        container.appendChild(card);
    });

    document.querySelectorAll('.cf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const test = filterTest(btn.dataset.filter);
            container.querySelectorAll('.pmg-card').forEach(card => {
                const node = NODES.find(n => n.id === card.dataset.id);
                card.style.display = (node && test(node)) ? '' : 'none';
            });
        });
    });
}

/* ===== MAGNETIC BUTTONS ===== */
function initMagnetic() {
    if (!FINE_POINTER || REDUCED_MOTION) return;

    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', e => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
        }, { passive: true });

        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
}

/* ===== CARD TILT ===== */
function initTilt() {
    if (!FINE_POINTER || REDUCED_MOTION) return;

    document.querySelectorAll('.tilt').forEach(el => {
        el.addEventListener('mousemove', e => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(700px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
        }, { passive: true });

        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render all content from content.js
    renderHero();
    renderAbout();
    renderJourney();
    renderProjectsShell();
    renderArsenal();
    renderLife();
    renderConnect();
    renderFooter();

    // 2. Wire up behavior on the rendered DOM
    initEntry();
    initProgress();
    initHeader();
    initActiveNav();
    initMobileMenu();
    initHeroCanvas();
    initTypewriter();
    initReveal();
    initCounters();
    initConstellation();
    initConstellationFilters();
    initCursorGlow();
    initMobileGrid();
    initMagnetic();
    initTilt();
});

/* ============================================================
   MAIN.JS — rendering + behaviour.
   Words live in js/content.js. Edit this only to change how the
   site WORKS, not what it says.
   ============================================================ */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_VIEW_TL   = CSS.supports('animation-timeline: view()');
const HAS_SCROLL_TL = CSS.supports('animation-timeline: scroll()');

const ICONS = {
    github:    'GitHub', linkedin: 'LinkedIn', youtube: 'YouTube',
    instagram: 'Instagram', twitter: 'Twitter',
};

const esc = s => String(s);
const R = id => document.getElementById(id);

/* ============================================================
   RENDERERS
   ============================================================ */

function renderHero() {
    const h = CONTENT.hero, id = CONTENT.identity;
    const [first, ...rest] = id.name.split(' ');
    R('home').innerHTML = `
        <p class="hero-greeting reveal">${h.greeting}</p>
        <h1 class="hero-name">
            <span class="name-line">${first}</span>
            <span class="name-line">${rest.join(' ')}</span>
        </h1>
        <p class="hero-sub reveal">${h.subtitlePrefix}<b>${h.roles[0]}</b></p>
        <blockquote class="hero-quote reveal">
            ${h.quote.map(l => `<span>${l}</span>`).join('')}
        </blockquote>
        <div class="hero-actions reveal">
            <a href="${h.ctaPrimary.href}" class="btn">${h.ctaPrimary.label}</a>
            <a href="${h.ctaGhost.href}" class="btn btn--ghost">${h.ctaGhost.label}</a>
        </div>
        <div class="hero-scroll reveal">${h.scrollCue}</div>
    `;
}

function head(num, label, title, lede) {
    return `
        <div class="sec-index reveal"><span class="sec-num">${num}</span><span>${label}</span></div>
        <h2 class="sec-title reveal">${title}</h2>
        ${lede ? `<p class="sec-lede reveal">${lede}</p>` : ''}
    `;
}

function renderAbout() {
    const a = CONTENT.about, id = CONTENT.identity;
    R('about').innerHTML = `
        ${head('01', a.label, a.heading)}
        <div class="about-media reveal">
            <img class="portrait" src="${a.image}" alt="${id.name}" loading="lazy">
            <div class="stats">
                ${a.stats.map(s => `
                    <div class="stat">
                        <span class="stat-v"><span class="stat-n" data-to="${s.n}">0</span>${s.suffix}</span>
                        <span class="stat-l">${s.label}</span>
                    </div>`).join('')}
            </div>
        </div>
        <div class="prose reveal">
            <h3 class="block-label">${a.shortVersionLabel}</h3>
            ${a.shortVersion.map(p => `<p>${p}</p>`).join('')}
            <h3 class="block-label">${a.honestLabel}</h3>
            ${a.honest.map(p => `<p>${p}</p>`).join('')}
            <h3 class="block-label">${a.principlesLabel}</h3>
            <ol class="principles">
                ${a.principles.map(p => `<li><b>${p.lead}</b><span>${p.text}</span></li>`).join('')}
            </ol>
            <p class="contact"><a href="mailto:${id.email}">${id.email}</a> &nbsp;·&nbsp; ${id.location}</p>
        </div>
    `;
}

function renderJourney() {
    const j = CONTENT.journey;
    R('journey').innerHTML = `
        ${head('02', j.label, j.heading, j.sub)}
        <div class="sec-body sec-body--wide">
            <ol class="timeline">
                ${j.phases.map(p => `
                    <li class="phase reveal">
                        <div class="phase-meta">
                            <span class="phase-tag">${p.tag}</span>
                            ${p.period ? `<span class="phase-period">${p.period}</span>` : ''}
                            ${p.location ? `<span class="phase-where">${p.location}</span>` : ''}
                        </div>
                        <div class="phase-main">
                            <h3>${p.title}</h3>
                            <p>${p.desc}</p>
                            ${p.projects ? `<div class="thumbs">${p.projects.map(pr => {
                                const t = pr.link ? 'a' : 'div';
                                const at = pr.link ? ` href="${pr.link}" target="_blank" rel="noopener noreferrer"` : '';
                                return `<${t} class="thumb"${at}><img src="${pr.img}" alt="${pr.name}" loading="lazy"><b>${pr.name}</b><span>${pr.sub}</span></${t}>`;
                            }).join('')}</div>` : ''}
                        </div>
                    </li>`).join('')}
            </ol>
        </div>
    `;
}

function renderProjects() {
    const p = CONTENT.projects, vb = p.viewBox;
    R('projects').innerHTML = `
        ${head('03', p.label, p.heading, p.sub)}
        <div class="sec-body sec-body--wide">
            <div class="filters reveal">
                ${p.filters.map((f, i) => `<button class="cf-btn${i ? '' : ' active'}" data-filter="${f.id}">${f.label}</button>`).join('')}
            </div>
            <div class="map reveal">
                <svg id="constellation-svg" viewBox="0 0 ${vb.w} ${vb.h}" preserveAspectRatio="xMidYMid meet" aria-label="Project map"></svg>
            </div>
            <div class="map-list" id="map-list"></div>
        </div>
        <div class="tip" id="node-tooltip"></div>
    `;
}

function renderArsenal() {
    const a = CONTENT.arsenal;
    R('arsenal').innerHTML = `
        ${head('04', a.label, a.heading, a.sub)}
        <div class="sec-body sec-body--wide">
            <div class="spec">
                ${a.categories.map(c => `
                    <div class="spec-row reveal">
                        <div class="spec-key">${c.name}</div>
                        <div>
                            ${c.chips ? `<div class="chips">${c.chips.map(ch =>
                                `<span class="chip${ch.level === 'daily' ? ' chip--daily' : ''}">${ch.label}</span>`).join('')}</div>` : ''}
                            ${c.prose ? `<p class="spec-note">${c.prose}</p>` : ''}
                            ${c.quote ? `<p class="spec-note">${c.quote}</p>` : ''}
                        </div>
                    </div>`).join('')}
            </div>
            <div class="certs reveal">
                ${a.certs.map(c => `<div class="cert"><b>${c.badge}</b><span>${c.name}</span></div>`).join('')}
            </div>
        </div>
    `;
}

function renderLife() {
    const l = CONTENT.life;
    R('life').innerHTML = `
        ${head('05', l.label, l.heading, l.sub)}
        <div class="sec-body sec-body--wide">
            <ol class="life">
                ${l.cards.map(c => `<li class="life-row reveal"><b>${c.title}</b><p>${c.text}</p></li>`).join('')}
            </ol>
            ${l.currently ? `
                <div class="now reveal">
                    <div class="now-head"><span class="now-dot"></span>${l.currentlyLabel}${l.currentlyUpdated ? ` · ${l.currentlyUpdated}` : ''}</div>
                    <dl class="now-rows">
                        ${l.currently.map(c => `<div class="now-row"><dt>${c.label}</dt><dd>${c.text}</dd></div>`).join('')}
                    </dl>
                </div>` : ''}
        </div>
    `;
}

function renderConnect() {
    const c = CONTENT.connect, id = CONTENT.identity;
    R('connect').innerHTML = `
        ${head('06', c.label, c.heading, c.blurb)}
        <div class="sec-body">
            <a class="connect-mail reveal" href="mailto:${id.email}">${id.email}</a>
            ${c.hiring ? `<p class="connect-note reveal">${c.hiring}</p>` : ''}
            <div class="links reveal">
                ${CONTENT.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name} ↗</a>`).join('')}
                ${c.extraLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join('')}
            </div>
        </div>
    `;
}

function renderFooter() {
    const f = CONTENT.footer, id = CONTENT.identity;
    R('site-footer').innerHTML = `
        <div>
            <div class="foot-brand">${id.name} — ${id.alias}</div>
            ${f.tagline ? `<p class="foot-tag">${f.tagline}</p>` : ''}
            <p class="foot-copy">${f.copy}</p>
        </div>
    `;
}

/* ============================================================
   BEHAVIOUR
   ============================================================ */

function initHeader() {
    const hdr = R('site-header'), hero = R('home');
    new IntersectionObserver(e => hdr.classList.toggle('scrolled', !e[0].isIntersecting), { threshold: 0.02 })
        .observe(hero);
}

function initActiveNav() {
    const links = document.querySelectorAll('.header-nav a[data-section]');
    const secs = [...links].map(l => R(l.dataset.section)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => obs.observe(s));
}

function initMobileMenu() {
    const btn = R('mobile-menu-btn'), close = R('mobile-close-btn'), menu = R('mobile-menu');
    const set = on => { menu.classList.toggle('open', on); document.body.style.overflow = on ? 'hidden' : ''; };
    btn.addEventListener('click', () => set(true));
    close.addEventListener('click', () => set(false));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
}

/* progress bar — only if the browser can't do it in CSS */
function initProgress() {
    if (HAS_SCROLL_TL) return;
    const bar = R('page-progress');
    addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    }, { passive: true });
}

/* scroll reveal — only if the browser can't do it in CSS */
function initReveal() {
    if (HAS_VIEW_TL || REDUCED) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, to = +el.dataset.to;
            obs.unobserve(el);
            if (REDUCED) { el.textContent = to; return; }
            const t0 = performance.now(), dur = 1100;
            const step = now => {
                const k = Math.min((now - t0) / dur, 1);
                el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
                if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.stat-n[data-to]').forEach(el => obs.observe(el));
}

/* ---------- constellation ---------- */
const EDGE_VAR = {
    python: '--d-college', college: '--d-college', web: '--d-pro',
    data: '--d-pro', azure: '--d-pro', ai: '--d-hub', fun: '--d-personal',
};

const svgEl = t => document.createElementNS('http://www.w3.org/2000/svg', t);
const nodeR = n => (n.phase === 'college' ? 13 : 15);

function trimEdge(x1, y1, x2, y2, r1, r2) {
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1;
    const ux = dx / d, uy = dy / d, g = 3;
    return [x1 + ux * (r1 + g), y1 + uy * (r1 + g), x2 - ux * (r2 + g), y2 - uy * (r2 + g)];
}

function filterTest(id) {
    const f = CONTENT.projects.filters.find(x => x.id === id);
    if (!f || f.id === 'all') return () => true;
    if (f.phase) return n => n.phase === f.phase;
    if (f.match) return n => f.match.some(t => n.tags.includes(t));
    return () => true;
}

function initConstellation() {
    const svg = R('constellation-svg');
    if (!svg) return;
    const P = CONTENT.projects, NODES = P.nodes, EDGES = P.edges;

    P.eras.forEach(({ text, x, y }) => {
        const t = svgEl('text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('class', 'c-era');
        t.textContent = text;
        svg.appendChild(t);
    });

    P.dividers.forEach(d => {
        const l = svgEl('line');
        ['x1', 'y1', 'x2', 'y2'].forEach(k => l.setAttribute(k, d[k]));
        l.setAttribute('class', 'c-divider');
        svg.appendChild(l);
    });

    const near = {};
    NODES.forEach(n => near[n.id] = new Set());
    EDGES.forEach(e => { near[e.a]?.add(e.b); near[e.b]?.add(e.a); });

    const eg = svgEl('g'); svg.appendChild(eg);
    const edgeEls = [];
    EDGES.forEach(e => {
        const s = NODES.find(n => n.id === e.a), t = NODES.find(n => n.id === e.b);
        if (!s || !t) return;
        const line = svgEl('line');
        const [a, b, c, d] = trimEdge(s.x, s.y, t.x, t.y, nodeR(s), nodeR(t));
        line.setAttribute('x1', a); line.setAttribute('y1', b);
        line.setAttribute('x2', c); line.setAttribute('y2', d);
        line.setAttribute('stroke', `var(${EDGE_VAR[e.type] || '--ink-3'})`);
        line.setAttribute('class', `c-edge${e.cross ? ' c-edge--cross' : ''}`);
        line.dataset.a = e.a; line.dataset.b = e.b;
        eg.appendChild(line);
        edgeEls.push({ line, a: e.a, b: e.b });
    });

    const ng = svgEl('g'); svg.appendChild(ng);
    const tip = R('node-tooltip');
    const nodeEls = [];

    NODES.forEach(node => {
        const g = svgEl('g');
        g.setAttribute('class', `c-node c-node--${node.phase}`);
        g.dataset.id = node.id;
        if (node.link) g.dataset.link = '1';
        g.setAttribute('transform', `translate(${node.x},${node.y})`);

        const c = svgEl('circle');
        c.setAttribute('r', nodeR(node));
        c.setAttribute('class', 'c-node-circle');
        g.appendChild(c);

        const label = svgEl('text');
        label.setAttribute('y', nodeR(node) + 17);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('class', 'c-node-label');
        label.textContent = node.name;
        g.appendChild(label);

        g.addEventListener('mouseenter', () => {
            tip.innerHTML = `
                <div class="tip-era tip-era--${node.phase}">${P.phaseLabels[node.phase]}</div>
                <div class="tip-name">${node.name}</div>
                <div class="tip-desc">${node.desc}</div>
                <div class="tip-tags">${node.tags.map(t => `<span>${t}</span>`).join('')}</div>
                ${node.link ? '<div class="tip-link">Click to open ↗</div>' : ''}`;
            tip.classList.add('on');
            svg.classList.add('has-focus');
            nodeEls.forEach(({ g: og, node: on }) => {
                og.classList.toggle('focused', on.id === node.id);
                og.classList.toggle('neighbour', near[node.id].has(on.id));
            });
            edgeEls.forEach(({ line, a, b }) => line.classList.toggle('active', a === node.id || b === node.id));
        });

        g.addEventListener('mousemove', ev => {
            let x = ev.clientX + 18, y = ev.clientY - 10;
            if (x + 326 > innerWidth) x = ev.clientX - 328;
            if (y + 240 > innerHeight) y = Math.max(10, innerHeight - 250);
            tip.style.left = x + 'px';
            tip.style.top = y + 'px';
        });

        g.addEventListener('mouseleave', () => {
            tip.classList.remove('on');
            svg.classList.remove('has-focus');
            nodeEls.forEach(({ g: og }) => og.classList.remove('focused', 'neighbour'));
            edgeEls.forEach(({ line }) => line.classList.remove('active'));
        });

        if (node.link) g.addEventListener('click', () => open(node.link, '_blank', 'noopener'));

        ng.appendChild(g);
        nodeEls.push({ g, node });
    });

    /* filters */
    document.querySelectorAll('.cf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const test = filterTest(btn.dataset.filter);
            const all = btn.dataset.filter === 'all';
            const hit = new Set(NODES.filter(test).map(n => n.id));
            nodeEls.forEach(({ g, node }) => g.classList.toggle('dimmed', !all && !hit.has(node.id)));
            edgeEls.forEach(({ line, a, b }) => line.classList.toggle('dimmed', !all && !(hit.has(a) && hit.has(b))));
            document.querySelectorAll('.map-row').forEach(row => {
                const n = NODES.find(x => x.id === row.dataset.id);
                row.style.display = (all || (n && test(n))) ? '' : 'none';
            });
        });
    });
}

function initMapList() {
    const box = R('map-list');
    if (!box) return;
    const P = CONTENT.projects;
    box.innerHTML = P.nodes.map(n => {
        const t = n.link ? 'a' : 'div';
        const at = n.link ? ` href="${n.link}" target="_blank" rel="noopener noreferrer"` : '';
        return `<${t} class="map-row" data-id="${n.id}"${at}>
            <div class="map-row-top"><span class="map-row-era tip-era--${n.phase}">${P.phaseLabels[n.phase]}</span></div>
            <b>${n.name}</b><p>${n.desc}</p>
        </${t}>`;
    }).join('');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderAbout();
    renderJourney();
    renderProjects();
    renderArsenal();
    renderLife();
    renderConnect();
    renderFooter();

    initHeader();
    initActiveNav();
    initMobileMenu();
    initProgress();
    initReveal();
    initCounters();
    initConstellation();
    initMapList();
});

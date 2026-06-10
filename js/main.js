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
    const COUNT = 70;
    const MAX_DIST = 130;
    let mouse = { x: null, y: null };

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

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    function tick() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            // Mouse repulsion
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 90) {
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

        // Edges
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

        // Dots
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

    const roles = ['Data Engineer', 'Dashboard Builder', 'AI & GenAI Engineer', 'Venture Builder', 'Problem Solver'];
    let ri = 0, ci = 0, del = false;

    function step() {
        const word = roles[ri];
        if (!del) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) { del = true; return setTimeout(step, 2200); }
            setTimeout(step, 58);
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) { del = false; ri = (ri + 1) % roles.length; return setTimeout(step, 380); }
            setTimeout(step, 30);
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
const NODES = [
    // College era
    { id: 'flappy',     name: 'Flappy Bird',          phase: 'college',      tags: ['cpp', 'gamedev'],                  x: 198, y: 118, link: 'https://github.com/theraghavgupta/flappybird',              desc: 'C++ & OpenGL game — full physics, sprites, collision. Built just to prove it could be done.' },
    { id: 'sniffer',    name: 'Packet Sniffer',        phase: 'college',      tags: ['python', 'networking'],             x: 105, y: 235, desc: 'Python CLI that captures and decodes raw network packets in real time.' },
    { id: 'blood',      name: 'Blood Bank',            phase: 'college',      tags: ['python', 'django', 'web'],          x: 228, y: 350, desc: 'Django web app managing blood inventory, donors, and hospital requests.' },
    { id: 'sorting',    name: 'Sorting Visualizer',   phase: 'college',      tags: ['javascript', 'web'],                x: 348, y: 148, link: 'https://github.com/theraghavgupta/sorting-visualiser',       desc: 'Interactive visualization of 6+ sorting algorithms with speed controls.' },
    { id: 'crypto',     name: 'Crypto Tracker',        phase: 'college',      tags: ['react', 'javascript', 'web'],       x: 395, y: 288, link: 'https://github.com/theraghavgupta/react-crypto-tracker',    desc: 'React app tracking 100+ crypto prices with live charts and market data.' },
    { id: 'form',       name: 'Form Automator',        phase: 'college',      tags: ['python', 'selenium'],               x: 132, y: 398, link: 'https://github.com/theraghavgupta/formResponseAutomater',  desc: 'Selenium script to auto-fill and submit Google Forms from a CSV source.' },
    { id: 'farming',    name: 'Precision Farming',     phase: 'college',      tags: ['python', 'ml'],                     x: 298, y: 455, desc: 'ML-based crop recommendation and yield prediction — B.E. Capstone project.' },
    // Professional era
    { id: 'lakehouse',  name: 'Lakehouse Architecture', phase: 'professional', tags: ['azure', 'databricks', 'pyspark', 'data'], x: 598, y: 128, desc: 'Azure ADLS Gen2 + Databricks lakehouse: 10+ pharma datasets, 65+ Delta tables.' },
    { id: 'dashboards', name: 'BI Dashboards (20+)',  phase: 'professional', tags: ['powerbi', 'tableau', 'data', 'web'], x: 742, y: 185, desc: 'Sales, HCP Engagement, Market Analytics & Executive dashboards across 5+ US pharma clients.' },
    { id: 'mdm',        name: 'Data Warehouse & MDM', phase: 'professional', tags: ['sql', 'snowflake', 'data'],          x: 548, y: 298, desc: 'End-to-end data warehouse & MDM delivery for pharma CRM systems.' },
    { id: 'rag',        name: 'RAG Chatbot PoC',       phase: 'professional', tags: ['genai', 'python', 'azure', 'ai'],   x: 838, y: 138, desc: 'Retrieval-Augmented Generation chatbot for pharma literature search on Azure.' },
    { id: 'summarizer', name: 'Article Summarizer',   phase: 'professional', tags: ['genai', 'python', 'ai'],            x: 828, y: 308, desc: 'LLM-powered tool summarizing pharma research articles and clinical trial data.' },
    { id: 'fabric',     name: 'PowerBI-Copilot',       phase: 'professional', tags: ['genai', 'powerbi', 'fabric', 'ai'], x: 688, y: 418, desc: 'Natural language analytics via PowerBI Copilot in Microsoft Fabric.' },
];

const EDGES = [
    // College internal
    { a: 'sniffer',   b: 'blood',      type: 'python', cross: false },
    { a: 'sniffer',   b: 'form',       type: 'python', cross: false },
    { a: 'blood',     b: 'form',       type: 'python', cross: false },
    { a: 'blood',     b: 'farming',    type: 'python', cross: false },
    { a: 'sorting',   b: 'crypto',     type: 'web',    cross: false },
    { a: 'flappy',    b: 'sniffer',    type: 'college', cross: false },
    { a: 'flappy',    b: 'sorting',    type: 'college', cross: false },
    // Professional internal
    { a: 'lakehouse',  b: 'dashboards', type: 'data',   cross: false },
    { a: 'lakehouse',  b: 'mdm',        type: 'data',   cross: false },
    { a: 'dashboards', b: 'mdm',        type: 'data',   cross: false },
    { a: 'dashboards', b: 'fabric',     type: 'data',   cross: false },
    { a: 'rag',        b: 'summarizer', type: 'ai',     cross: false },
    { a: 'rag',        b: 'fabric',     type: 'ai',     cross: false },
    { a: 'summarizer', b: 'fabric',     type: 'ai',     cross: false },
    { a: 'rag',        b: 'lakehouse',  type: 'azure',  cross: false },
    // Cross-phase bridges
    { a: 'farming',  b: 'lakehouse',  type: 'data',   cross: true },
    { a: 'form',     b: 'rag',        type: 'python', cross: true },
    { a: 'crypto',   b: 'dashboards', type: 'web',    cross: true },
];

const EDGE_COLORS = {
    python:  '#e63946',
    web:     '#4cc9f0',
    data:    '#4cc9f0',
    ai:      '#ff9b24',
    azure:   '#4cc9f0',
    college: '#8888aa',
};

const FILTER_MAP = {
    all:          () => true,
    college:      n => n.phase === 'college',
    professional: n => n.phase === 'professional',
    python:       n => n.tags.includes('python'),
    data:         n => n.tags.includes('data'),
    web:          n => n.tags.includes('web'),
    ai:           n => n.tags.includes('ai') || n.tags.includes('genai'),
};

function svgEl(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function initConstellation() {
    const svg = document.getElementById('constellation-svg');
    if (!svg) return;

    // Defs + glow filter
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

    // Subtle grid background
    const gridPat = svgEl('pattern');
    gridPat.setAttribute('id', 'grid'); gridPat.setAttribute('width', '40'); gridPat.setAttribute('height', '40');
    gridPat.setAttribute('patternUnits', 'userSpaceOnUse');
    const gLine1 = svgEl('path'); gLine1.setAttribute('d', 'M 40 0 L 0 0 0 40'); gLine1.setAttribute('fill', 'none'); gLine1.setAttribute('stroke', 'rgba(255,255,255,0.025)'); gLine1.setAttribute('stroke-width', '0.5');
    gridPat.appendChild(gLine1);
    defs.appendChild(gridPat);

    const bg = svgEl('rect');
    bg.setAttribute('width', '940'); bg.setAttribute('height', '520');
    bg.setAttribute('fill', 'url(#grid)');
    svg.appendChild(bg);

    // Era labels
    const labelData = [
        { text: 'COLLEGE ERA  ·  2019–2023', x: 220, y: 36 },
        { text: 'PROFESSIONAL ERA  ·  2022–NOW', x: 680, y: 36 },
    ];
    labelData.forEach(({ text, x, y }) => {
        const t = svgEl('text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('class', 'c-era-label');
        t.textContent = text;
        svg.appendChild(t);
    });

    // Divider
    const div = svgEl('line');
    div.setAttribute('x1', '470'); div.setAttribute('y1', '50');
    div.setAttribute('x2', '470'); div.setAttribute('y2', '490');
    div.setAttribute('stroke', 'rgba(255,255,255,0.06)');
    div.setAttribute('stroke-width', '1');
    div.setAttribute('stroke-dasharray', '4 10');
    svg.appendChild(div);

    // Edge group (behind nodes)
    const edgeG = svgEl('g');
    edgeG.setAttribute('class', 'edges-group');
    svg.appendChild(edgeG);

    EDGES.forEach(edge => {
        const src = NODES.find(n => n.id === edge.a);
        const tgt = NODES.find(n => n.id === edge.b);
        if (!src || !tgt) return;

        const line = svgEl('line');
        line.setAttribute('x1', src.x); line.setAttribute('y1', src.y);
        line.setAttribute('x2', tgt.x); line.setAttribute('y2', tgt.y);
        line.setAttribute('stroke', EDGE_COLORS[edge.type] || '#888');
        line.setAttribute('class', `c-edge${edge.cross ? ' c-edge--cross' : ''}`);
        line.dataset.a = edge.a;
        line.dataset.b = edge.b;
        line.dataset.type = edge.type;
        edgeG.appendChild(line);
    });

    // Node group
    const nodeG = svgEl('g');
    nodeG.setAttribute('class', 'nodes-group');
    svg.appendChild(nodeG);

    NODES.forEach(node => {
        const g = svgEl('g');
        g.setAttribute('class', `c-node c-node--${node.phase}`);
        g.setAttribute('data-id', node.id);
        g.setAttribute('data-phase', node.phase);
        g.setAttribute('data-tags', node.tags.join(' '));
        g.setAttribute('transform', `translate(${node.x},${node.y})`);

        const glow = svgEl('circle');
        glow.setAttribute('r', '30');
        glow.setAttribute('class', 'c-node-glow');
        g.appendChild(glow);

        const circle = svgEl('circle');
        circle.setAttribute('r', node.phase === 'professional' ? '16' : '14');
        circle.setAttribute('class', 'c-node-circle');
        g.appendChild(circle);

        // Short label (max ~16 chars)
        const short = node.name.length > 16 ? node.name.slice(0, 15) + '…' : node.name;
        const lbl = svgEl('text');
        lbl.setAttribute('y', node.phase === 'professional' ? '34' : '31');
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('class', 'c-node-label');
        lbl.setAttribute('font-family', 'Inter, sans-serif');
        lbl.textContent = short;
        g.appendChild(lbl);

        const tooltip = document.getElementById('node-tooltip');

        g.addEventListener('mouseenter', evt => {
            const phaseLabel = node.phase === 'college' ? 'COLLEGE ERA' : 'PROFESSIONAL';
            const phaseClass = node.phase === 'college' ? 'tt-phase--college' : 'tt-phase--professional';
            tooltip.innerHTML = `
                <div class="tt-phase ${phaseClass}">${phaseLabel}</div>
                <div class="tt-name">${node.name}</div>
                <div class="tt-tags">${node.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <div class="tt-desc">${node.desc}</div>
                ${node.link ? '<div class="tt-link">Click to open ↗</div>' : ''}
            `;
            tooltip.classList.add('visible');
        });

        g.addEventListener('mousemove', evt => {
            const tt = tooltip;
            let x = evt.clientX + 18;
            let y = evt.clientY - 12;
            if (x + 250 > window.innerWidth) x = evt.clientX - 258;
            if (y + 180 > window.innerHeight) y = evt.clientY - 160;
            tt.style.left = x + 'px';
            tt.style.top = y + 'px';
        });

        g.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));

        if (node.link) {
            g.style.cursor = 'pointer';
            g.addEventListener('click', () => window.open(node.link, '_blank', 'noopener,noreferrer'));
        }

        nodeG.appendChild(g);
    });
}

/* ===== CONSTELLATION FILTERS ===== */
function initConstellationFilters() {
    const btns = document.querySelectorAll('.cf-btn');
    const svg = document.getElementById('constellation-svg');
    if (!svg) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const test = FILTER_MAP[filter] || (() => true);

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

/* ===== MOBILE PROJECT GRID ===== */
function initMobileGrid() {
    const container = document.getElementById('proj-mobile-grid');
    if (!container) return;

    NODES.forEach(node => {
        const card = document.createElement(node.link ? 'a' : 'div');
        card.className = 'pmg-card';
        if (node.link) { card.href = node.link; card.target = '_blank'; card.rel = 'noopener noreferrer'; }
        card.dataset.phase = node.phase;
        card.dataset.tags = node.tags.join(' ');

        card.innerHTML = `
            <div class="pmg-phase pmg-phase--${node.phase}">${node.phase === 'college' ? 'COLLEGE ERA' : 'PROFESSIONAL'}</div>
            <div class="pmg-name">${node.name}</div>
            <div class="pmg-desc">${node.desc}</div>
            <div class="pmg-tags">${node.tags.map(t => `<span>${t}</span>`).join('')}</div>
        `;

        container.appendChild(card);
    });

    // Wire up filter buttons to also filter the mobile grid
    document.querySelectorAll('.cf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            const test = FILTER_MAP[filter] || (() => true);

            container.querySelectorAll('.pmg-card').forEach(card => {
                const id = [...NODES].find(n => card.querySelector('.pmg-name').textContent === n.name)?.id;
                const node = NODES.find(n => n.name === card.querySelector('.pmg-name').textContent);
                const match = node && test(node);
                card.style.display = match ? '' : 'none';
            });
        });
    });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
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
    initMobileGrid();
});

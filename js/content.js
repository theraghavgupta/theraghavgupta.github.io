/* ============================================================
   CONTENT.JS — THE ONLY FILE YOU EVER NEED TO EDIT
   ============================================================
   Every word on the website lives here. Change text, save,
   commit, push — done. No HTML, no CSS, no logic.

   QUICK RECIPES
   -------------
   • Change the typewriter roles      → hero.roles
   • Rewrite your bio                 → about.shortVersion / about.honest
   • Change the three principles      → about.principles
   • Update a stat number             → about.stats
   • Add a project to the graph       → projects.nodes (+ projects.edges)
   • Move a node on the map           → its x / y (canvas is projects.viewBox)
   • Add/remove a hobby card          → life.cards
   • Update "what I'm doing now"      → life.currently
   • Add a skill chip                 → arsenal.categories[..].chips
   • Add a non-tech Arsenal card      → arsenal.categories with `prose` instead of `chips`
   • Change social links              → socials (used by Connect + footer)

   RULES
   -----
   • Keep the quotes and commas intact — it's JavaScript, not prose.
   • To write a quote inside text use \" or use 'single-quoted' strings.
   • icon names for socials: github, linkedin, youtube, instagram, twitter
   • chip levels: "daily" (green = daily driver), "solid" (blue =
     comfortable), "used" (grey = can fight through it)
   • constellation phases: "college" | "professional" | "personal"
   ============================================================ */

const CONTENT = {

    /* ---------- IDENTITY ---------- */
    identity: {
        name: "Raghav Gupta",
        alias: "and0",
        role: "Solution Architect",
        location: "Gurugram, India",
        email: "raghavgupta3659@gmail.com",
    },

    /* ---------- HERO (top of page) ---------- */
    hero: {
        greeting: "नमस्ते!",
        // Static first half of the subtitle; the typewriter rotates the rest.
        subtitlePrefix: "Gurugram · builds data platforms · ",
        roles: [
            "plays harmonica badly on purpose",
            "argues with films",
            "rides until the traffic ends",
            "answers to a cat",
        ],
        // The line people remember. Two halves, rendered on two lines.
        quote: [
            "I'm professionally responsible for making sure a number is true.",
            "Unprofessionally, I'm interested in almost everything else.",
        ],
        // Swap any of these into `quote` if you get bored:
        //   "Solution architect by trade. Obsessive by temperament."
        //   "I spend my days making machines answer questions correctly, and my evenings asking worse ones."
        //   "Data platforms, pharma, agents, a Royal Enfield, and a cat with a public persona."
        scrollCue: "less of it is about work than you'd expect",
        ctaPrimary: { label: "My Story", href: "#about" },
        ctaGhost:   { label: "Let's Talk →", href: "#connect" },
    },

    /* ---------- ABOUT ---------- */
    about: {
        label: "About",
        heading: "The short version and the honest one.",

        shortVersionLabel: "The short version",
        shortVersion: [
            "I'm a solution architect. I build the data platforms and AI systems that large pharmaceutical companies use to decide things — where to send their field teams, which drug to acquire, what the evidence actually says. Four years in, all of it at one firm, which is either loyalty or inertia depending on the day you ask. Title on the badge: <strong>Associate Consultant (Technology), ProcDNA Analytics</strong>.",
        ],

        honestLabel: "The honest one",
        honest: [
            "I'm curious in a way that isn't always convenient. The reason I'm good at my job is the same reason my browser has forty tabs open: I can't leave a question half-answered. Somebody says \"the two reports disagree\" and I'm gone for three hours.",
            "What I like about building systems is that they don't let you get away with vagueness. You can hand-wave in a meeting. You cannot hand-wave in a schema. Every fuzzy definition eventually becomes someone's wrong decision, and there's a right answer down there somewhere.",
            "That instinct doesn't switch off at 7pm. It's why I care what a film is arguing rather than what it's showing. Why I want the model behind the football match. Why a cocktail is a ratio problem before it's a drink. Same engine, different fuel.",
        ],

        principlesLabel: "Three things that are true about how I work",
        principles: [
            { lead: "I'd rather be correct than impressive.", text: "A demo that works once is a magic trick. I care what's still standing in month six." },
            { lead: "Nothing should depend on me being in the room.", text: "Knowledge stuck in one head is a liability, even when it's mine." },
            { lead: "I get bored by the fifth implementation of anything.", text: "If there's a manual for it, someone else should do it." },
        ],

        // n = the number it counts up to, suffix shown after it ("" for exact)
        stats: [
            { n: 4,  suffix: "+", label: "Years Exp" },
            { n: 22, suffix: "",  label: "Projects" },
            { n: 5,  suffix: "+", label: "Clients" },
            { n: 20, suffix: "+", label: "Dashboards" },
        ],
        image: "pictures/profile.png",
    },

    /* ---------- JOURNEY (timeline) ----------
       Each phase: tag (small label), node (text in the circle),
       title, period, location (optional), desc.
       College phase can carry "projects" thumbnails. */
    journey: {
        label: "Journey",
        heading: "My story so far.",
        sub: "Not a career ladder — a sequence of things I got obsessed with.",
        phases: [
            {
                tag: "ORIGIN", tagStyle: "",
                node: "00", nodeStyle: "sm",
                title: "The Spark",
                period: "Pre-2019",
                desc: "Started with \"how does a website really work?\" Ended with view-source, a C compiler, and no way back.",
            },
            {
                tag: "BUILDER", tagStyle: "college",
                node: "01", nodeStyle: "college",
                title: "B.E. Computer Engineering",
                period: "2019 — 2023",
                location: "Thapar Institute of Engineering & Technology · CGPA 7.31",
                desc: "Four years of building anything that compiled: a game in raw OpenGL, web apps in Django and React, a packet sniffer out of curiosity, automation bots out of laziness, and an ML capstone for the degree. The syllabus was optional. The building wasn't.",
                projects: [
                    { name: "Flappy Bird",        sub: "C++ · OpenGL",        img: "pictures/projects/Flappy_Bird.png",          link: "https://github.com/theraghavgupta/flappybird" },
                    { name: "Packet Sniffer",     sub: "Python · Networking", img: "pictures/projects/sniffer.jpeg" },
                    { name: "Blood Bank",         sub: "Django · Python",     img: "pictures/projects/bloodManage.png" },
                    { name: "Sorting Visualizer", sub: "JavaScript · Web",    img: "pictures/projects/sorting-visualiser.png",   link: "https://github.com/theraghavgupta/sorting-visualiser" },
                    { name: "Crypto Tracker",     sub: "React · Web",         img: "pictures/projects/crypto-Exchanges.png",     link: "https://github.com/theraghavgupta/react-crypto-tracker" },
                    { name: "Form Automator",     sub: "Python · Selenium",   img: "pictures/projects/selenium.png",             link: "https://github.com/theraghavgupta/formResponseAutomater" },
                    { name: "Precision Farming",  sub: "ML · Capstone",       img: "pictures/projects/precision-agriculture.png" },
                ],
            },
            {
                tag: "THEN", tagStyle: "pro",
                node: "02", nodeStyle: "pro",
                title: "Curiosity about data itself",
                period: "2022 — 2023",
                location: "ProcDNA Analytics Pvt Ltd · Gurugram",
                desc: "I learned what the data <em>meant</em> before what the tools did. Prescriptions, claims, sales activity — which fields lie, which lie predictably, and why two \"correct\" reports never agree. Tools rotate every eighteen months; this doesn't.",
            },
            {
                tag: "THEN", tagStyle: "pro",
                node: "03", nodeStyle: "pro",
                title: "How do you make wrongness hard?",
                period: "2023 — 2024",
                desc: "Building a report teaches you an answer. Building the platform teaches you how many ways an answer can go wrong. I stopped producing outputs and started designing the thing that produces them.",
            },
            {
                tag: "THEN", tagStyle: "pro",
                node: "04", nodeStyle: "pro",
                title: "Architecture is a people problem",
                period: "2024 — 2025",
                desc: "The best design loses to the one the team can actually run. Some of the work I'm proudest of is onboarding, definitions and handover — unglamorous, and the difference between a platform that lives and one that gets worked around.",
            },
            {
                tag: "NOW", tagStyle: "pro",
                node: "05", nodeStyle: "pro",
                title: "Teaching machines to answer honestly",
                period: "2025 — Now",
                desc: "Natural-language querying, agents, evaluation. Same old question — <em>can I trust this?</em> — except the interface no longer signals its own uncertainty. It says everything in the same confident voice, and I don't think most people are taking that seriously enough.",
            },
            {
                tag: "NEXT", tagStyle: "future",
                node: "∞", nodeStyle: "future",
                title: "Something of my own",
                period: "Next",
                desc: "Weekends, a personal machine, deliberately no cloud bill. Something I built and can sell without a company's name on it.",
            },
        ],
    },

    /* ---------- PROJECTS (constellation graph) ----------
       nodes: every project as a star on the map.
         id     unique short key (used by edges)
         phase  "college" | "professional" | "personal"
         tags   used by the filter buttons
         x,y    position on the viewBox below
         link   optional — makes the node clickable
         desc   the tooltip text
       edges: lines between nodes. cross:true = bridges two clusters
       (drawn dashed). */
    projects: {
        label: "Projects",
        heading: "The Constellation.",
        sub: "Everything I've built, mapped as one graph — college experiments, production systems, and the things I made purely because they'd be funny. Serious and silly in the same list, on purpose. Hover around.",

        viewBox: { w: 1200, h: 760 },
        phaseLabels: {
            college:      "COLLEGE ERA",
            professional: "PROFESSIONAL",
            personal:     "PERSONAL",
        },
        eras: [
            { text: "COLLEGE ERA  ·  2019–2023",      x: 250, y: 44 },
            { text: "PROFESSIONAL ERA  ·  2022–NOW",  x: 830, y: 44 },
            { text: "PERSONAL / SIDE  ·  ALWAYS",     x: 600, y: 583 },
        ],
        dividers: [
            { x1: 486, y1: 62,  x2: 486, y2: 524 },   // college | professional
            { x1: 70,  y1: 548, x2: 1130, y2: 548 },  // work | personal
        ],

        filters: [
            { id: "all",          label: "All" },
            { id: "college",      label: "College Era",  phase: "college" },
            { id: "professional", label: "Professional", phase: "professional" },
            { id: "personal",     label: "Personal",     phase: "personal" },
            { id: "python",       label: "Python",       match: ["python"] },
            { id: "data",         label: "Data",         match: ["data"] },
            { id: "web",          label: "Web",          match: ["web"] },
            { id: "ai",           label: "AI / GenAI",   match: ["ai", "genai", "langchain"] },
        ],

        nodes: [
            /* ---- College era ---- */
            { id: "flappy", name: "Flappy Bird", phase: "college", tags: ["cpp", "gamedev"], x: 200, y: 120,
              link: "https://github.com/theraghavgupta/flappybird",
              desc: "Rebuilt from scratch in C++ and OpenGL — game loop, gravity, collision, sprites. No engine, no shortcuts. Died a thousand times testing it." },
            { id: "sorting", name: "Sorting Visualizer", phase: "college", tags: ["javascript", "web"], x: 360, y: 175,
              link: "https://github.com/theraghavgupta/sorting-visualiser",
              desc: "Six sorting algorithms racing as animated bars in vanilla JavaScript. The fastest way to actually internalize O(n log n)." },
            { id: "sniffer", name: "Packet Sniffer", phase: "college", tags: ["python", "networking"], x: 105, y: 255,
              desc: "Python CLI that drops the interface into raw mode and decodes traffic live — Ethernet frames, IP headers, TCP/UDP payloads." },
            { id: "crypto", name: "Crypto Tracker", phase: "college", tags: ["react", "javascript", "web"], x: 390, y: 315,
              link: "https://github.com/theraghavgupta/react-crypto-tracker",
              desc: "React app tracking live prices for 100+ cryptocurrencies. Built during the bull run. The portfolio it tracked did not survive it." },
            { id: "blood", name: "Blood Bank", phase: "college", tags: ["python", "django", "web"], x: 235, y: 385,
              desc: "Django app for blood bank operations — donors, inventory by group, hospital requests. My first \"real software for real users\" moment." },
            { id: "form", name: "Form Automator", phase: "college", tags: ["python", "selenium"], x: 110, y: 455,
              link: "https://github.com/theraghavgupta/formResponseAutomater",
              desc: "Selenium bot that reads a CSV and fills Google Forms at superhuman speed. Born from pure laziness — my most honest motivation." },
            { id: "farming", name: "Precision Farming", phase: "college", tags: ["python", "ml"], x: 320, y: 500,
              desc: "B.E. capstone: ML models recommending crops and predicting yield from soil and weather data, trained on Indian agriculture datasets." },

            /* ---- Professional ---- */
            { id: "lakehouse", name: "Analytics Lakehouse", phase: "professional", tags: ["azure", "databricks", "pyspark", "data"], x: 620, y: 110,
              desc: "The architecture layer. Azure ADLS Gen2 + Databricks pulling 10+ pharma sources — IQVIA Xponent, DDD, LAAD, Veeva, Copay, GPO — into 65+ Delta tables, with PySpark pipelines computing the field-force KPIs everything downstream runs on." },
            { id: "dashboards", name: "Commercial Dashboards", phase: "professional", tags: ["powerbi", "tableau", "data", "web"], x: 800, y: 110,
              desc: "20+ production dashboards across 5+ US pharma clients — sales, HCP engagement, market analytics, contract pricing, executive reporting. Power BI and Tableau, built on the Lakehouse." },
            { id: "oncology", name: "Oncology Intel DB", phase: "professional", tags: ["genai", "ai", "python", "data"], x: 980, y: 110,
              desc: "Reads oncology trials and admits when it's confused. Agents pull the source data, a model classifies it against an expert taxonomy, and a validation layer exists because an LLM that extracts confidently is more dangerous than one that fails." },
            { id: "mdm", name: "CRM & Data Governance", phase: "professional", tags: ["sql", "snowflake", "data"], x: 560, y: 235,
              desc: "The trust layer. 5+ pharma CRM systems mastered into one Snowflake warehouse — dedup rules, QC validation, audit-ready documentation. Every dashboard is only as good as this." },
            { id: "phi", name: "PHI-Safe Warehouse", phase: "professional", tags: ["azure", "databricks", "data", "security", "ai"], x: 730, y: 235,
              desc: "Holds patient data and doesn't leak. The architecture wasn't the hard part — the isolation model was: who touches what, under whose identity, with what audit trail. Then wired to an LLM, which meant answering \"can this agent see this?\" before \"can it do this?\"" },
            { id: "semantic", name: "Semantic Layer", phase: "professional", tags: ["data", "ai", "genai", "sql"], x: 900, y: 235,
              desc: "A boring name for something that isn't. The layer deciding what a question <em>means</em> before it becomes a query, scoped per audience. Vague semantics produce vague agents, and nobody downstream can tell." },
            { id: "rag", name: "RAG Chatbot", phase: "professional", tags: ["genai", "python", "azure", "ai"], x: 1070, y: 235,
              desc: "Early GenAI PoC on Azure for pharma literature — semantic chunking, vector retrieval, LLM synthesis. Answers cite their sources." },
            { id: "fabric", name: "PowerBI-Copilot", phase: "professional", tags: ["genai", "powerbi", "fabric", "ai"], x: 640, y: 360,
              desc: "PowerBI Copilot wired into Microsoft Fabric — natural-language Q&A over commercial dashboards. The firm's first GenAI-in-BI demo; it made a room of consultants go quiet." },
            { id: "agents", name: "Databricks AI Agents", phase: "professional", tags: ["databricks", "langchain", "genai", "ai", "python", "azure"], x: 820, y: 360,
              desc: "Databricks-native agents with multi-agent workflows — LangChain and LangGraph for orchestration, Genie for querying, MCP for tools. Ask in English, get an answer grounded in the Lakehouse and honest about its uncertainty." },
            { id: "summarizer", name: "Article Summarizer", phase: "professional", tags: ["genai", "python", "ai"], x: 1000, y: 360,
              desc: "LLM pipeline compressing dense pharma research into structured summaries — field teams get the gist in 30 seconds instead of 30 minutes." },
            { id: "catalyst", name: "CATALYST", phase: "professional", tags: ["ai", "people", "data"], x: 730, y: 470,
              desc: "A pod for technology nobody has a manual for: self-selected members, allocated time, and a rule that we only touch what isn't documented yet. Output is a template that stands up a whole environment in one command." },

            /* ---- Personal / side ---- */
            { id: "tinkos", name: "Tinkos Fenrir", phase: "personal", tags: ["creative", "internet"], x: 260, y: 645,
              link: "https://www.instagram.com/_theraghavgupta/",
              desc: "A cat with a content strategy. Lynx point ragdoll, appears online in first person — calm, dominant, faintly arrogant. He does not know he is a bit." },
            { id: "interns", name: "Interns Got Latent", phase: "personal", tags: ["creative", "people"], x: 500, y: 690,
              desc: "An icebreaker for 46 new interns: 25 slides, brainrot aesthetic, comedy arc structured around a Lorenz attractor. It got harder to justify the more I built it." },
            { id: "events", name: "Office Events", phase: "personal", tags: ["creative", "people"], x: 745, y: 630,
              desc: "Mango parties, FIFA nights, offsites. Someone has to make the poster and sort the buses — same skill as delivery management, with better snacks." },
            { id: "weekend", name: "Weekend Build", phase: "personal", tags: ["python", "data", "ai", "genai"], x: 980, y: 690,
              desc: "Whatever I'm building this weekend. Right now: an insight product from clinical trial data, running entirely on my own machine." },
        ],

        edges: [
            /* College internal */
            { a: "sniffer", b: "blood",   type: "python" },
            { a: "sniffer", b: "form",    type: "python" },
            { a: "blood",   b: "form",    type: "python" },
            { a: "blood",   b: "farming", type: "python" },
            { a: "sorting", b: "crypto",  type: "web" },
            { a: "flappy",  b: "sniffer", type: "college" },
            { a: "flappy",  b: "sorting", type: "college" },

            /* Professional — data layer */
            { a: "lakehouse",  b: "dashboards", type: "data" },
            { a: "lakehouse",  b: "mdm",        type: "data" },
            { a: "dashboards", b: "mdm",        type: "data" },
            { a: "dashboards", b: "fabric",     type: "data" },
            { a: "phi",        b: "mdm",        type: "data" },
            { a: "phi",        b: "lakehouse",  type: "azure" },
            { a: "semantic",   b: "dashboards", type: "data" },

            /* Professional — AI layer */
            { a: "agents", b: "rag",        type: "ai" },
            { a: "agents", b: "summarizer", type: "ai" },
            { a: "agents", b: "fabric",     type: "ai" },
            { a: "agents", b: "lakehouse",  type: "azure" },
            { a: "agents", b: "semantic",   type: "ai" },
            { a: "agents", b: "phi",        type: "ai" },
            { a: "agents", b: "catalyst",   type: "ai" },
            { a: "rag",        b: "summarizer", type: "ai" },
            { a: "rag",        b: "fabric",     type: "ai" },
            { a: "rag",        b: "oncology",   type: "ai" },
            { a: "summarizer", b: "fabric",     type: "ai" },
            { a: "oncology",   b: "agents",     type: "ai" },
            { a: "semantic",   b: "fabric",     type: "ai" },
            { a: "catalyst",   b: "semantic",   type: "ai" },

            /* Personal internal */
            { a: "tinkos",  b: "interns", type: "fun" },
            { a: "interns", b: "events",  type: "fun" },
            { a: "events",  b: "weekend", type: "fun" },
            { a: "tinkos",  b: "events",  type: "fun" },

            /* Bridges between clusters (drawn dashed) */
            { a: "farming", b: "lakehouse",  type: "data",   cross: true },
            { a: "form",    b: "agents",     type: "python", cross: true },
            { a: "crypto",  b: "dashboards", type: "web",    cross: true },
            { a: "sniffer", b: "rag",        type: "python", cross: true },
            { a: "form",    b: "interns",    type: "fun",    cross: true },
            { a: "crypto",  b: "weekend",    type: "fun",    cross: true },
            { a: "weekend", b: "oncology",   type: "data",   cross: true },
            { a: "catalyst", b: "events",    type: "fun",    cross: true },
        ],
    },

    /* ---------- ARSENAL ----------
       A category has EITHER `chips` (tech) or `prose` (everything else).
       icon options: grid, code, ai, shield, music, bike, glass, film, car
       chip level: "daily" | "solid" | "used"  */
    arsenal: {
        label: "Arsenal",
        heading: "Everything I carry.",
        sub: "Stacks rotate. Domain knowledge doesn't. Both are load-bearing.",
        categories: [
            { name: "Things I build with", icon: "grid",
              quote: "Governance you configure once beats governance you enforce socially forever.",
              chips: [
                { label: "Azure",       level: "daily" },
                { label: "Databricks",  level: "daily" },
                { label: "Unity Catalog", level: "daily" },
                { label: "SQL",         level: "daily" },
                { label: "Python",      level: "solid" },
                { label: "PySpark",     level: "solid" },
                { label: "Snowflake",   level: "solid" },
                { label: "Power BI",    level: "daily" },
                { label: "Tableau",     level: "solid" },
                { label: "Microsoft Fabric", level: "solid" },
                { label: "medallion architecture", level: "solid" },
                { label: "semantic layers", level: "solid" },
                { label: "IICS",        level: "used"  },
                { label: "Dataiku",     level: "used"  },
                { label: "Linux",       level: "used"  },
                { label: "C / C++",     level: "used"  },
              ]},
            { name: "Things I build agents with", icon: "ai",
              quote: "Orchestration is easy. Knowing when the thing should refuse to answer is the job.",
              chips: [
                { label: "LangChain",   level: "solid" },
                { label: "LangGraph",   level: "solid" },
                { label: "MCP",         level: "solid" },
                { label: "Databricks Genie", level: "solid" },
                { label: "GenAI / LLMs", level: "solid" },
                { label: "RAG",         level: "solid" },
                { label: "agent evaluation", level: "solid" },
              ]},
            { name: "Things I know that don't expire", icon: "code",
              quote: "Domain knowledge is the moat — I mostly get paid to know why two counts of the same thing disagree. The stack is rented.",
              chips: [
                { label: "pharma commercial data", level: "daily" },
                { label: "claims data", level: "daily" },
                { label: "prescription data", level: "daily" },
                { label: "prescriber hierarchies", level: "solid" },
                { label: "clinical trial data", level: "solid" },
              ]},
            { name: "Things I break on purpose", icon: "shield",
              quote: "I like thinking about how to break the thing I built. Someone else will.",
              chips: [
                { label: "RBAC",              level: "solid" },
                { label: "just-in-time access", level: "solid" },
                { label: "prompt injection",  level: "solid" },
                { label: "agentic tool misuse", level: "solid" },
              ]},

            /* Non-tech cards live in `life` so nothing is said twice. To add one
               back here, use `prose: "..."` instead of `chips` — the renderer
               and the .arsenal-cat--prose styles still support it.
               icons available: grid, code, ai, shield, music, bike, glass, film, car */
        ],
        certs: [
            { badge: "DBX", name: "Databricks Certified Data Engineer Associate" },
            { badge: "DKU", name: "Core Designer Certification — Dataiku" },
            { badge: "HR",  name: "5-Star Gold Badge, C++ — HackerRank" },
        ],
    },

    /* ---------- LIFE (beyond work) ---------- */
    life: {
        label: "Beyond Work",
        heading: "The part I'd actually want you to read.",
        sub: "Solution architect is the job title. Here's the rest of the build.",
        cards: [
            { title: "I play the harmonica",
              text: "Badly, then less badly, then badly again after two weeks off. It's an instrument you can carry everywhere and get away with nowhere, which suits me." },
            { title: "I ride",
              text: "Out of Gurugram on a Royal Enfield, usually with no destination picked. The best debugging I do happens somewhere with no signal, which I've decided is a feature of the road and not an indictment of the desk." },
            { title: "Football, badly supported",
              text: "Years of watching a team that reliably breaks my heart in the second leg. I keep the spreadsheet open anyway." },
            { title: "I make cocktails, some good",
              text: "Mostly stirred, occasionally undrinkable. The failures are more instructive, and more frequently repeated." },
            { title: "Indian political cinema",
              text: "And the criticism around it. Most of my favourite arguments have been about a film neither of us fully liked." },
            { title: "Tinkos outranks me",
              text: "Lynx point ragdoll. Unbothered, mildly contemptuous, better at the internet than I am. Showed up, took over, now has strong opinions on keyboard placement." },
            { title: "Always travelling",
              text: "Next trip gets planned before the current one ends. New cities, street food of questionable provenance, zero regrets so far." },
            { title: "PS5 hours",
              text: "Story-driven single-player games over everything. The backlog grows faster than the completion rate — like all good backlogs." },
        ],
        // The block that keeps the page alive — refresh these four every few months.
        currentlyLabel: "Currently",
        currentlyUpdated: "August 2026",
        currently: [
            { label: "Learning",   text: "evaluation harnesses — the unglamorous half of agents nobody demos" },
            { label: "Reading",    text: "one novel I keep restarting, and other people's incident write-ups" },
            { label: "Failing at", text: "clean note bends" },
            { label: "Planning",   text: "an overnight road trip for a couple of hundred colleagues, which is either logistics or a personality disorder" },
        ],
    },

    /* ---------- CONNECT ---------- */
    connect: {
        label: "Connect",
        heading: "Low bar for saying hello.",
        blurb: "Come argue with me. Data platforms, whether your biggest risk is technical or organisational, agent evaluation, the correct base spirit for anything, or that film you think was underrated.",
        hiring: "If you're hiring: I do cloud data architecture and applied AI in regulated industries, and I'm better in a conversation than on a CV.<br>If you're not: even better, honestly.",
        extraLinks: [
            { label: "LeetCode →",   url: "https://leetcode.com/theraghavgupta" },
            { label: "HackerRank →", url: "https://www.hackerrank.com/theraghavgupta" },
        ],
    },

    /* ---------- SOCIALS (used in Connect buttons + footer icons) ----------
       icon must be one of: github, linkedin, youtube, instagram, twitter */
    socials: [
        { name: "GitHub",    icon: "github",    url: "https://github.com/theraghavgupta" },
        { name: "LinkedIn",  icon: "linkedin",  url: "https://www.linkedin.com/in/raghav-gupta-a01b401ba/" },
        { name: "YouTube",   icon: "youtube",   url: "https://www.youtube.com/channel/UCeRLGtCtjOpvprVNvfQjZTQ" },
        { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/_theraghavgupta/" },
        { name: "Twitter",   icon: "twitter",   url: "https://twitter.com/AndrokottoGupta" },
    ],

    /* ---------- FOOTER ---------- */
    footer: {
        // Alternatives: "and0 — still convinced the modelling layer is where it all goes wrong."
        //               "No analytics on this site. I already know you're here."
        tagline: "Built in Gurugram. Argued about everywhere.",
        copy: "Gurugram, India · raghavgupta3659@gmail.com",
    },
};

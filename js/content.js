/* ============================================================
   CONTENT.JS — THE ONLY FILE YOU EVER NEED TO EDIT
   ============================================================
   Every word on the website lives here. Change text, save,
   commit, push — done. No HTML, no CSS, no logic.

   QUICK RECIPES
   -------------
   • Change the typewriter roles      → hero.roles
   • Rewrite your bio                 → about.paragraphs
   • Update a stat number             → about.stats
   • Add a project to the graph       → projects.nodes (+ optionally projects.edges)
   • Add/remove a hobby card          → life.cards
   • Add a skill chip                 → arsenal.categories[..].chips
   • Change social links              → socials (used by Connect + footer)

   RULES
   -----
   • Keep the quotes and commas intact — it's JavaScript, not prose.
   • To write a quote inside text use \" or use 'single-quoted' strings.
   • icon names available for socials: github, linkedin, youtube,
     instagram, twitter
   • chip levels: "daily" (green = daily driver), "solid" (blue =
     comfortable), "used" (grey = can fight through it)
   ============================================================ */

const CONTENT = {

    /* ---------- IDENTITY ---------- */
    identity: {
        name: "Raghav Gupta",
        alias: "and0",
        location: "Gurugram, India",
        email: "raghavgupta3659@gmail.com",
    },

    /* ---------- HERO (top of page) ---------- */
    hero: {
        greeting: "नमस्ते!",
        // The typewriter cycles through these. First two carry the credibility,
        // the rest carry the personality. Reorder freely.
        roles: [
            "Data Engineer",
            "AI Agent Builder",
            "Dashboard Dealer",
            "Venture Plotter",
            "Cat Butler",
        ],
        tagline: "Pipelines by day. Plotting ventures by night.\nThe cat supervises both shifts.",
        ctaPrimary: { label: "My Story", href: "#journey" },
        ctaGhost:   { label: "Let's Talk →", href: "#connect" },
    },

    /* ---------- ABOUT ---------- */
    about: {
        label: "About",
        heading: "The short version.",
        paragraphs: [
            "I'm Raghav — data engineer and pharma analytics consultant in Gurugram. Three years of building things that actually ship: Lakehouses on Azure + Databricks, PySpark pipelines crunching prescription data for US pharma clients, 20+ dashboards that executives actually open, and lately — AI agents that let people ask data questions in English instead of writing SQL at 2 AM.",
            "Day job: <strong>Associate Consultant (Technology) at ProcDNA Analytics</strong>. The rest of the time: plotting a venture, travelling somewhere new, or getting outplayed on the PS5. All of it supervised by Tinkos, the cat.",
        ],
        pills: ["Shipping > Talking", "Serial Idea-Haver", "Traveller", "PS5 Tryhard", "Cat Butler"],
        // n = the number it counts up to, suffix shown after it
        stats: [
            { n: 3,  suffix: "+", label: "Years Exp" },
            { n: 14, suffix: "+", label: "Projects" },
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
        sub: "From 'how does a website work?' to production AI.",
        phases: [
            {
                tag: "ORIGIN", tagStyle: "",
                node: "00", nodeStyle: "sm",
                title: "The Spark",
                period: "Pre-2019",
                desc: "Started with 'how does a website actually work?' Ended with view-source, a C compiler, and no way back.",
            },
            {
                tag: "BUILDER", tagStyle: "college",
                node: "01", nodeStyle: "college",
                title: "B.E. Computer Engineering",
                period: "2019 — 2023",
                location: "Thapar Institute of Engineering & Technology · CGPA 7.31",
                desc: "Four years of building anything that compiled: a game in raw OpenGL, web apps in Django and React, a packet sniffer for curiosity, automation bots for laziness, and an ML capstone for the degree. The syllabus was optional. The building wasn't.",
                // Thumbnails shown under this phase. img path is relative to site root.
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
                tag: "ENGINEER", tagStyle: "pro",
                node: "02", nodeStyle: "pro",
                title: "Associate Consultant — Technology",
                period: "Nov 2022 — Present",
                location: "ProcDNA Analytics Pvt Ltd · Gurugram",
                desc: "Joined as a fresh grad, got handed real client problems on day one. Since then: architected an Analytics Lakehouse on Azure + Databricks turning 10+ raw pharma data sources into live KPIs, built the governance layer that keeps 5+ CRM systems honest, shipped 20+ dashboards leadership actually uses — and moved into AI agents: LangChain, Databricks Genie, multi-agent workflows. Requirements to production, every single time.",
            },
        ],
    },

    /* ---------- PROJECTS (constellation graph) ----------
       nodes: every project as a star on the map.
         id     unique short key (used by edges)
         phase  "college" or "professional" (decides side + colour)
         tags   used by the filter buttons
         x,y    position on the 940×520 map (college left of 470, pro right)
         link   optional — makes the node clickable
         desc   the tooltip text. BE HONEST — this is the part recruiters read.
       edges: lines between nodes. type decides colour, cross:true means
       it bridges college → professional (drawn dashed). */
    projects: {
        label: "Projects",
        heading: "The Constellation.",
        sub: "Everything I've built, mapped as one graph. College experiments on the left, production systems on the right. Hover around — things are connected for a reason.",
        eras: [
            { text: "COLLEGE ERA  ·  2019–2023",       x: 220, y: 36 },
            { text: "PROFESSIONAL ERA  ·  2022–NOW",   x: 680, y: 36 },
        ],
        filters: [
            { id: "all",          label: "All" },
            { id: "college",      label: "College Era",  phase: "college" },
            { id: "professional", label: "Professional", phase: "professional" },
            { id: "python",       label: "Python",       match: ["python"] },
            { id: "data",         label: "Data",         match: ["data"] },
            { id: "web",          label: "Web",          match: ["web"] },
            { id: "ai",           label: "AI / GenAI",   match: ["ai", "genai", "langchain"] },
        ],
        nodes: [
            // ---- College era ----
            { id: "flappy", name: "Flappy Bird", phase: "college", tags: ["cpp", "gamedev"], x: 198, y: 118,
              link: "https://github.com/theraghavgupta/flappybird",
              desc: "The classic, rebuilt from scratch in C++ with OpenGL — game loop, gravity, collision detection, sprite animation. No engine, no shortcuts. Died a thousand times testing it." },
            { id: "sniffer", name: "Packet Sniffer", phase: "college", tags: ["python", "networking"], x: 105, y: 235,
              desc: "Python CLI that puts the network interface in raw mode and decodes traffic live — Ethernet frames, IP headers, TCP/UDP payloads. Built to see what actually travels on the wire." },
            { id: "blood", name: "Blood Bank", phase: "college", tags: ["python", "django", "web"], x: 228, y: 350,
              desc: "Django web app for blood bank operations — donor records, inventory by blood group, hospital request workflows. Auth, admin, full CRUD. My first 'real software for real users' moment." },
            { id: "sorting", name: "Sorting Visualizer", phase: "college", tags: ["javascript", "web"], x: 348, y: 148,
              link: "https://github.com/theraghavgupta/sorting-visualiser",
              desc: "Six sorting algorithms racing as animated bars in vanilla JavaScript, with speed and array-size controls. The fastest way to actually internalize O(n log n)." },
            { id: "crypto", name: "Crypto Tracker", phase: "college", tags: ["react", "javascript", "web"], x: 395, y: 288,
              link: "https://github.com/theraghavgupta/react-crypto-tracker",
              desc: "React app pulling live prices for 100+ cryptocurrencies — charts, market caps, search. Built during the bull run. The portfolio it tracked did not survive it." },
            { id: "form", name: "Form Automator", phase: "college", tags: ["python", "selenium"], x: 132, y: 398,
              link: "https://github.com/theraghavgupta/formResponseAutomater",
              desc: "Python + Selenium bot that reads a CSV and fills Google Forms at superhuman speed. Born from pure laziness — my most honest motivation." },
            { id: "farming", name: "Precision Farming", phase: "college", tags: ["python", "ml"], x: 298, y: 455,
              desc: "B.E. capstone: ML models recommending crops and predicting yield from soil parameters and weather data, trained on Indian agriculture datasets." },

            // ---- Professional era ----
            { id: "lakehouse", name: "Analytics Lakehouse", phase: "professional", tags: ["azure", "databricks", "pyspark", "data"], x: 598, y: 128,
              desc: "The architecture layer: Azure ADLS Gen2 + Databricks ingesting 10+ pharma sources — IQVIA Xponent, DDD, LAAD, Veeva CRM, Copay, GPO — into 65+ curated Delta tables. PySpark pipelines compute field-force KPIs (Call Attainment, ADS, TOT) that power everything downstream." },
            { id: "dashboards", name: "Commercial Dashboards", phase: "professional", tags: ["powerbi", "tableau", "data", "web"], x: 742, y: 185,
              desc: "20+ production dashboards across 5+ US pharma clients — Sales Insights, HCP Engagement, Market Analytics, Contract Pricing, Executive Reporting. Power BI and Tableau, built on top of the Lakehouse." },
            { id: "mdm", name: "CRM & Data Governance", phase: "professional", tags: ["sql", "snowflake", "data"], x: 548, y: 298,
              desc: "The trust layer: 5+ pharma CRM systems mastered into one Snowflake warehouse — dedup and MDM rules, QC validation frameworks, audit-ready documentation. Unglamorous and mission-critical: every dashboard is only as good as this." },
            { id: "agents", name: "Databricks AI Agents", phase: "professional", tags: ["databricks", "langchain", "genai", "ai", "python", "azure"], x: 762, y: 248,
              desc: "The current frontier: Databricks-native AI agents with multi-agent workflows — LangChain for orchestration, Databricks Genie for natural-language querying. Goal: ask the data a question in English, get an answer grounded in the Lakehouse." },
            { id: "rag", name: "RAG Chatbot", phase: "professional", tags: ["genai", "python", "azure", "ai"], x: 870, y: 148,
              desc: "Early GenAI PoC: a RAG chatbot on Azure for pharma literature — documents chunked semantically, embedded into a vector store, retrieved and synthesized by an LLM. Answers cite their sources." },
            { id: "summarizer", name: "Article Summarizer", phase: "professional", tags: ["genai", "python", "ai"], x: 868, y: 318,
              desc: "LLM pipeline that compresses dense pharma research articles into structured summaries — field teams get the gist in 30 seconds instead of 30 minutes." },
            { id: "fabric", name: "PowerBI-Copilot", phase: "professional", tags: ["genai", "powerbi", "fabric", "ai"], x: 668, y: 418,
              desc: "PowerBI Copilot wired into Microsoft Fabric — natural-language Q&A over commercial dashboards. The firm's first GenAI-in-BI demo; it made a room full of consultants go quiet." },
        ],
        edges: [
            // College internal
            { a: "sniffer", b: "blood",   type: "python" },
            { a: "sniffer", b: "form",    type: "python" },
            { a: "blood",   b: "form",    type: "python" },
            { a: "blood",   b: "farming", type: "python" },
            { a: "sorting", b: "crypto",  type: "web" },
            { a: "flappy",  b: "sniffer", type: "college" },
            { a: "flappy",  b: "sorting", type: "college" },
            // Professional — data layer
            { a: "lakehouse",  b: "dashboards", type: "data" },
            { a: "lakehouse",  b: "mdm",        type: "data" },
            { a: "dashboards", b: "mdm",        type: "data" },
            { a: "dashboards", b: "fabric",     type: "data" },
            // Professional — AI layer
            { a: "agents", b: "rag",        type: "ai" },
            { a: "agents", b: "summarizer", type: "ai" },
            { a: "agents", b: "fabric",     type: "ai" },
            { a: "agents", b: "lakehouse",  type: "azure" },
            { a: "rag",        b: "summarizer", type: "ai" },
            { a: "rag",        b: "fabric",     type: "ai" },
            { a: "summarizer", b: "fabric",     type: "ai" },
            // Bridges between the two eras (drawn dashed)
            { a: "farming", b: "lakehouse",  type: "data",   cross: true },
            { a: "form",    b: "agents",     type: "python", cross: true },
            { a: "crypto",  b: "dashboards", type: "web",    cross: true },
            { a: "sniffer", b: "rag",        type: "python", cross: true },
        ],
    },

    /* ---------- ARSENAL (skills) ----------
       icon options: grid, code, ai
       chip level: "daily" | "solid" | "used"  */
    arsenal: {
        label: "Arsenal",
        heading: "Tools I actually use.",
        sub: "No skill bars, no '90% Excel'. Green = daily driver, blue = comfortable, grey = can fight my way through.",
        categories: [
            { name: "Data & BI", icon: "grid", chips: [
                { label: "Databricks", level: "daily" },
                { label: "Power BI",   level: "daily" },
                { label: "Tableau",    level: "solid" },
                { label: "Snowflake",  level: "solid" },
                { label: "IICS",       level: "used"  },
            ]},
            { name: "Engineering", icon: "code", chips: [
                { label: "Azure",   level: "daily" },
                { label: "SQL",     level: "daily" },
                { label: "Python",  level: "solid" },
                { label: "PySpark", level: "solid" },
                { label: "Linux",   level: "used"  },
            ]},
            { name: "AI & GenAI", icon: "ai", chips: [
                { label: "LangChain",        level: "solid" },
                { label: "Databricks Genie", level: "solid" },
                { label: "GenAI / LLMs",     level: "solid" },
                { label: "Microsoft Fabric", level: "solid" },
                { label: "Dataiku",          level: "used"  },
                { label: "C / C++",          level: "used"  },
            ]},
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
        heading: "The full stack.",
        sub: "Data engineer is the job title. Here's the rest of the build.",
        cards: [
            { title: "Founder-in-Progress",
              text: "The voice memos folder is full of startup ideas. The Venture Lab is how they stop being voice memos. One of them is going to work — statistically." },
            { title: "Always Travelling",
              text: "Next trip gets planned before the current one ends. New cities, street food of questionable provenance, zero regrets so far." },
            { title: "PS5 Hours",
              text: "Story-driven single-player games over everything. The backlog grows faster than the completion rate — like all good backlogs." },
            { title: "Tinkos",
              text: "Adopted the house, then the human. Sits on the keyboard during calls. Technically my most consistent code reviewer." },
            { title: "Building in Public",
              text: "YouTube, Twitter, the occasional Instagram post. Ideas that don't fit in code end up somewhere on the internet." },
            { title: "Always Learning",
              text: "Certifications, rabbit holes, half-read papers at 1 AM. Currently somewhere deep in the agentic-AI literature." },
        ],
    },

    /* ---------- CONNECT ---------- */
    connect: {
        label: "Connect",
        heading: "Let's build something.",
        blurb: "A project, a collab, a half-crazy venture idea, or just a good meme — all valid reasons. I reply faster than my dashboards refresh.",
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
        copy: "Gurugram, India · raghavgupta3659@gmail.com",
    },
};

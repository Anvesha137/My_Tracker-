<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>38-Day Sprint — README</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #fef8f2;
      --card:      #ffffff;
      --border:    #f0e4d7;
      --text:      #3d2010;
      --sub:       #7a5540;
      --muted:     #b89880;
      --faint:     #e8d8cc;
      --green:     #5f9e7a;
      --green-bg:  #f0f8f4;
      --rose:      #c97a7a;
      --rose-bg:   #fdf4f4;
      --lavender:  #8b7ec8;
      --lav-bg:    #f5f3fb;
      --amber:     #c4885a;
      --amb-bg:    #fdf5ee;
      --blue:      #5a8fc4;
      --blue-bg:   #eef4fb;
      --shadow:    0 2px 30px rgba(140,80,40,0.08);
      --shadow-lg: 0 8px 60px rgba(140,80,40,0.12);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 15px;
      line-height: 1.7;
      min-height: 100vh;
    }

    /* ── NOISE OVERLAY ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    /* ── HERO ── */
    .hero {
      position: relative;
      overflow: hidden;
      padding: 80px 40px 70px;
      text-align: center;
      background: linear-gradient(160deg, #fff9f4 0%, #fef3e8 50%, #f5edf9 100%);
      border-bottom: 1px solid var(--border);
    }

    .hero::after {
      content: '';
      position: absolute;
      width: 700px; height: 700px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,126,200,0.12) 0%, transparent 70%);
      top: -200px; right: -200px;
      pointer-events: none;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 99px;
      padding: 6px 18px;
      font-size: 12px;
      color: var(--green);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 28px;
      box-shadow: var(--shadow);
    }

    .hero-badge::before {
      content: '';
      width: 7px; height: 7px;
      background: var(--green);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.8); }
    }

    .hero h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: clamp(42px, 7vw, 72px);
      line-height: 1.05;
      color: var(--text);
      margin-bottom: 16px;
    }

    .hero h1 em {
      font-style: italic;
      color: var(--lavender);
    }

    .hero-sub {
      font-size: 17px;
      color: var(--sub);
      max-width: 520px;
      margin: 0 auto 40px;
    }

    .pill-row {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: default;
    }
    .pill:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
    .pill-green  { background: var(--green-bg);  color: var(--green);    border-color: #c0e4d0; }
    .pill-lav    { background: var(--lav-bg);     color: var(--lavender); border-color: #d8d2f0; }
    .pill-amber  { background: var(--amb-bg);     color: var(--amber);   border-color: #f0d4bb; }
    .pill-rose   { background: var(--rose-bg);    color: var(--rose);    border-color: #f0cece; }
    .pill-blue   { background: var(--blue-bg);    color: var(--blue);    border-color: #c4d8f0; }

    /* ── LAYOUT ── */
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px 24px 80px;
      position: relative;
      z-index: 1;
    }

    /* ── SECTION ── */
    .section {
      margin-bottom: 64px;
    }

    .section-label {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
    }

    .section-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px;
      flex-shrink: 0;
    }

    .section-title {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 26px;
      color: var(--text);
    }

    /* ── CARDS ── */
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      box-shadow: var(--shadow);
      padding: 28px 32px;
      margin-bottom: 16px;
    }

    .card-sm {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 10px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card-sm:hover { transform: translateY(-2px); box-shadow: var(--shadow); }

    /* ── OVERVIEW STATS ── */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px 22px;
      box-shadow: var(--shadow);
      transition: transform 0.2s;
    }
    .stat-card:hover { transform: translateY(-3px); }

    .stat-num {
      font-family: 'DM Serif Display', serif;
      font-size: 36px;
      line-height: 1;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 11px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    /* ── FEATURE GRID ── */
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }

    .feature-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 24px;
      box-shadow: var(--shadow);
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
      overflow: hidden;
    }
    .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      border-radius: 18px 18px 0 0;
    }
    .feature-card.green::before  { background: var(--green); }
    .feature-card.lav::before    { background: var(--lavender); }
    .feature-card.amber::before  { background: var(--amber); }
    .feature-card.rose::before   { background: var(--rose); }
    .feature-card.blue::before   { background: var(--blue); }

    .feature-icon { font-size: 28px; margin-bottom: 14px; }

    .feature-title {
      font-family: 'DM Serif Display', serif;
      font-size: 18px;
      color: var(--text);
      margin-bottom: 8px;
    }

    .feature-desc { font-size: 14px; color: var(--sub); line-height: 1.6; }

    /* ── CODE ── */
    pre, code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
    }

    pre {
      background: #fdf7f2;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px 26px;
      overflow-x: auto;
      line-height: 1.7;
      color: var(--sub);
    }

    code {
      background: var(--faint);
      color: var(--amber);
      padding: 2px 7px;
      border-radius: 5px;
      font-size: 12.5px;
    }

    pre code {
      background: none;
      color: var(--sub);
      padding: 0;
      font-size: inherit;
    }

    .token-purple { color: var(--lavender); }
    .token-green  { color: var(--green); }
    .token-amber  { color: var(--amber); }
    .token-muted  { color: var(--muted); }

    /* ── REELS LIST ── */
    .reels-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 8px;
    }

    .reels-table th {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--muted);
      text-align: left;
      padding: 0 14px 8px;
      font-weight: 500;
    }

    .reels-table td {
      background: var(--card);
      border: 1px solid var(--border);
      padding: 12px 14px;
      font-size: 13px;
      color: var(--sub);
    }

    .reels-table td:first-child {
      border-radius: 12px 0 0 12px;
      border-right: none;
      font-weight: 600;
      color: var(--muted);
      width: 48px;
      text-align: center;
    }

    .reels-table td:nth-child(2) {
      border-left: none;
      border-right: none;
      color: var(--text);
      font-weight: 500;
    }

    .reels-table td:last-child {
      border-radius: 0 12px 12px 0;
      border-left: none;
      color: var(--muted);
      font-size: 12px;
    }

    .reels-table tr:hover td { background: var(--bg); }

    /* ── TYPE BADGE ── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.3px;
      border: 1px solid;
    }
    .badge-green  { background: var(--green-bg);  color: var(--green);    border-color: #c0e4d0; }
    .badge-lav    { background: var(--lav-bg);     color: var(--lavender); border-color: #d8d2f0; }
    .badge-amber  { background: var(--amb-bg);     color: var(--amber);   border-color: #f0d4bb; }
    .badge-rose   { background: var(--rose-bg);    color: var(--rose);    border-color: #f0cece; }
    .badge-blue   { background: var(--blue-bg);    color: var(--blue);    border-color: #c4d8f0; }

    /* ── DIVIDER ── */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 40px 0;
    }

    /* ── NAV ── */
    .toc {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px 32px;
      box-shadow: var(--shadow);
      margin-bottom: 56px;
    }

    .toc-title {
      font-size: 11px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }

    .toc-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .toc-list a {
      display: inline-block;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 99px;
      padding: 5px 14px;
      font-size: 13px;
      color: var(--sub);
      text-decoration: none;
      transition: all 0.2s;
    }
    .toc-list a:hover {
      background: var(--lavender);
      color: #fff;
      border-color: var(--lavender);
      transform: translateY(-1px);
    }

    /* ── DATA FLOW ── */
    .flow {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin: 20px 0;
    }

    .flow-node {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 8px 16px;
      font-size: 13px;
      color: var(--text);
      font-weight: 500;
      white-space: nowrap;
    }

    .flow-arrow {
      color: var(--muted);
      font-size: 18px;
    }

    /* ── TIMELINE ── */
    .timeline { position: relative; padding-left: 28px; }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0; top: 6px; bottom: 6px;
      width: 2px;
      background: linear-gradient(to bottom, var(--lavender), var(--green));
      border-radius: 2px;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 22px;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: -34px; top: 7px;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: var(--lavender);
      border: 2px solid var(--bg);
    }

    .timeline-date {
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .timeline-text {
      font-size: 14px;
      color: var(--sub);
    }

    /* ── CALLOUT ── */
    .callout {
      border-radius: 14px;
      padding: 18px 22px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin: 20px 0;
    }

    .callout-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
    .callout-green { background: var(--green-bg);  border-left: 3px solid var(--green);  color: #3a7458; }
    .callout-amber { background: var(--amb-bg);    border-left: 3px solid var(--amber);  color: #8a5830; }
    .callout-lav   { background: var(--lav-bg);    border-left: 3px solid var(--lavender); color: #5a4d96; }

    /* ── FOOTER ── */
    .footer {
      text-align: center;
      padding: 40px 24px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 13px;
    }

    .footer-heart {
      display: inline-block;
      color: var(--rose);
      animation: heartbeat 1.4s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      14%       { transform: scale(1.3); }
      28%       { transform: scale(1); }
      42%       { transform: scale(1.2); }
      70%       { transform: scale(1); }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 600px) {
      .hero { padding: 50px 20px 50px; }
      .card { padding: 20px 18px; }
      .container { padding: 40px 16px 60px; }
      .reels-table { display: block; overflow-x: auto; }
    }
  </style>
</head>
<body>

<!-- ═══════════════════════════════ HERO ═══════════════════════════════ -->
<header class="hero">
  <div class="hero-badge">Live Sprint</div>
  <h1>38-Day <em>Sprint</em> Tracker<br>🚀</h1>
  <p class="hero-sub">
    A personal command centre for Khushi's 38-day mission to earn ₹1,00,000
    from freelance, ship QuickRevert, and go viral on Instagram — all at once.
  </p>
  <div class="pill-row">
    <span class="pill pill-green">💰 Revenue Goal</span>
    <span class="pill pill-lav">🎬 22 Reels</span>
    <span class="pill pill-amber">⚡ QuickRevert Features</span>
    <span class="pill pill-rose">🧘 Daily Habits</span>
    <span class="pill pill-blue">📅 Day-by-Day Tasks</span>
  </div>
</header>


<!-- ═══════════════════════════ CONTAINER ═══════════════════════════ -->
<div class="container">

  <!-- TABLE OF CONTENTS -->
  <nav class="toc">
    <div class="toc-title">Contents</div>
    <ul class="toc-list">
      <li><a href="#overview">Overview</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#data-model">Data Model</a></li>
      <li><a href="#tech">Tech Stack</a></li>
      <li><a href="#reels">Reels Lineup</a></li>
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#setup">Quick Setup</a></li>
      <li><a href="#customise">Customise</a></li>
      <li><a href="#timeline">Sprint Timeline</a></li>
    </ul>
  </nav>


  <!-- ─── OVERVIEW ─── -->
  <section class="section" id="overview">
    <div class="section-label">
      <div class="section-icon" style="background:var(--lav-bg);">📋</div>
      <h2 class="section-title">Overview</h2>
    </div>

    <div class="card">
      <p style="color:var(--sub); font-size:15px; margin-bottom:20px;">
        <strong style="color:var(--text);">38-Day Sprint Tracker</strong> is a single-page React dashboard built to keep
        one person laser-focused on a hard deadline. From <strong>March 23 → April 30, 2026</strong>,
        every metric that matters lives in one warm, opinionated UI — no Notion bloat,
        no spreadsheet fragility.
      </p>

      <div class="stats-grid" style="margin-bottom:0;">
        <div class="stat-card">
          <div class="stat-num" style="color:var(--green);">₹1L</div>
          <div class="stat-label">Revenue Goal</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:var(--lavender);">38</div>
          <div class="stat-label">Sprint Days</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:var(--amber);">22</div>
          <div class="stat-label">Scripted Reels</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:var(--rose);">8</div>
          <div class="stat-label">Daily Habits</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:var(--blue);">5</div>
          <div class="stat-label">QR Features</div>
        </div>
      </div>
    </div>

    <div class="callout callout-lav">
      <span class="callout-icon">✨</span>
      <span>All data is persisted to <code>localStorage</code> under the key <code>38DayTrackerV2</code> — no backend, no auth, no friction. Just open and go.</span>
    </div>
  </section>


  <!-- ─── FEATURES ─── -->
  <section class="section" id="features">
    <div class="section-label">
      <div class="section-icon" style="background:var(--amb-bg);">⚡</div>
      <h2 class="section-title">Features</h2>
    </div>

    <div class="feature-grid">
      <div class="feature-card green">
        <div class="feature-icon">💰</div>
        <div class="feature-title">Revenue Calculator</div>
        <div class="feature-desc">Log freelance income entries with date + description. Visualises cumulative earnings vs daily target pace with an interactive area chart. Shows remaining amount and pace needed per day in real time.</div>
      </div>

      <div class="feature-card lav">
        <div class="feature-icon">🎬</div>
        <div class="feature-title">Reels Tracker</div>
        <div class="feature-desc">22 pre-scripted reels from Khushi's founder story series, each with full script, title editing, and a 4-stage pipeline: <em>Pending → Recording → Typography → Posted</em>. Pipeline bar chart auto-updates.</div>
      </div>

      <div class="feature-card amber">
        <div class="feature-icon">⚡</div>
        <div class="feature-title">QuickRevert Board</div>
        <div class="feature-desc">Track the 5 core product features: Conversational Flows, Retrigger Messages, Lead Manager, Live Automation, and Carousel Cards. Click to toggle; add notes per feature.</div>
      </div>

      <div class="feature-card rose">
        <div class="feature-icon">🧘</div>
        <div class="feature-title">Habits Today</div>
        <div class="feature-desc">8 default daily habits from Udemy lessons to inbox replies. One-click toggle, inline rename, and a live progress ring so nothing slips through the cracks.</div>
      </div>

      <div class="feature-card blue">
        <div class="feature-icon">📅</div>
        <div class="feature-title">Daily Work Tracker</div>
        <div class="feature-desc">Day-by-day task columns: Morning 🌅, Afternoon ☀️, Evening 🌇, Before Bed 🌙. Navigate all 38 days with a scrollable tab strip. Tasks are pre-loaded from <code>dailyTasksData</code>.</div>
      </div>

      <div class="feature-card lav">
        <div class="feature-icon">📊</div>
        <div class="feature-title">Goal Hero + KPI Grid</div>
        <div class="feature-desc">At-a-glance header with a large circular ring showing % of ₹1L goal, a day timeline slider, and four mini KPI cards for Revenue, QR Features, Habits, and Reels.</div>
      </div>
    </div>
  </section>


  <!-- ─── DATA MODEL ─── -->
  <section class="section" id="data-model">
    <div class="section-label">
      <div class="section-icon" style="background:var(--blue-bg);">🗂</div>
      <h2 class="section-title">Data Model</h2>
    </div>

    <div class="card">
      <p style="color:var(--sub); margin-bottom:22px; font-size:14px;">
        All state lives in a single <code>TrackerData</code> object — serialised to localStorage on every change.
      </p>
<pre><span class="token-purple">interface</span> <span class="token-amber">TrackerData</span> {
  reels:               <span class="token-amber">Reel</span>[];
  dailyTasks:          <span class="token-amber">DailyTask</span>[];
  freelanceIncomes:    <span class="token-amber">FreelanceIncome</span>[];
  quickRevertFeatures: <span class="token-amber">QuickRevertFeature</span>[];
  habits:              <span class="token-amber">Habit</span>[];
}

<span class="token-muted">// Reel pipeline stage</span>
<span class="token-purple">type</span> <span class="token-amber">ReelStatus</span> = <span class="token-green">'pending'</span> | <span class="token-green">'recording'</span> | <span class="token-green">'typography'</span> | <span class="token-green">'posted'</span>;

<span class="token-purple">interface</span> <span class="token-amber">Reel</span> {
  id: string;  title: string;
  script: string;  status: <span class="token-amber">ReelStatus</span>;
}

<span class="token-purple">interface</span> <span class="token-amber">DailyTask</span> {
  id: string;  day: number;  text: string;
  completed: boolean;
  column: <span class="token-green">'morning'</span> | <span class="token-green">'work'</span> | <span class="token-green">'evening'</span> | <span class="token-green">'bed'</span>;
}

<span class="token-purple">interface</span> <span class="token-amber">FreelanceIncome</span> {
  id: string;  date: string;  <span class="token-muted">// ISO YYYY-MM-DD</span>
  amount: number;  description: string;
}

<span class="token-purple">interface</span> <span class="token-amber">QuickRevertFeature</span> {
  id: string;  name: string;  icon: string;
  completed: boolean;  notes: string;
}

<span class="token-purple">interface</span> <span class="token-amber">Habit</span> { id: string;  name: string;  completed: boolean; }
</pre>
    </div>

    <div class="callout callout-amber">
      <span class="callout-icon">💡</span>
      <span>
        <strong>Key constants:</strong> <code>GOAL_AMOUNT = 100000</code> ·
        <code>START_DATE = 2026-03-23</code> ·
        <code>TOTAL_DAYS = 38</code> ·
        <code>DAILY_TARGET = ⌈100000 / 38⌉ = ₹2,632</code>
      </span>
    </div>
  </section>


  <!-- ─── TECH STACK ─── -->
  <section class="section" id="tech">
    <div class="section-label">
      <div class="section-icon" style="background:var(--rose-bg);">🛠</div>
      <h2 class="section-title">Tech Stack</h2>
    </div>

    <div class="feature-grid">
      <div class="card-sm" style="display:flex; align-items:center; gap:16px;">
        <span style="font-size:26px;">⚛️</span>
        <div>
          <div style="font-weight:600; color:var(--text); margin-bottom:3px;">React 18</div>
          <div style="font-size:13px; color:var(--muted);">Hooks — <code>useState</code>, <code>useEffect</code>, <code>useMemo</code></div>
        </div>
      </div>
      <div class="card-sm" style="display:flex; align-items:center; gap:16px;">
        <span style="font-size:26px;">📈</span>
        <div>
          <div style="font-weight:600; color:var(--text); margin-bottom:3px;">Recharts</div>
          <div style="font-size:13px; color:var(--muted);">AreaChart (revenue) · BarChart (pipeline)</div>
        </div>
      </div>
      <div class="card-sm" style="display:flex; align-items:center; gap:16px;">
        <span style="font-size:26px;">🖋</span>
        <div>
          <div style="font-weight:600; color:var(--text); margin-bottom:3px;">DM Serif Display + DM Sans</div>
          <div style="font-size:13px; color:var(--muted);">Google Fonts — editorial warmth</div>
        </div>
      </div>
      <div class="card-sm" style="display:flex; align-items:center; gap:16px;">
        <span style="font-size:26px;">🎨</span>
        <div>
          <div style="font-weight:600; color:var(--text); margin-bottom:3px;">CSS-in-JS inline styles</div>
          <div style="font-size:13px; color:var(--muted);">Token object <code>T</code> for the warm terra-cotta palette</div>
        </div>
      </div>
      <div class="card-sm" style="display:flex; align-items:center; gap:16px;">
        <span style="font-size:26px;">📦</span>
        <div>
          <div style="font-weight:600; color:var(--text); margin-bottom:3px;">lucide-react</div>
          <div style="font-size:13px; color:var(--muted);">Icons — Plus, X, Trash2, ChevronDown/Up, Edit2, TrendingUp</div>
        </div>
      </div>
      <div class="card-sm" style="display:flex; align-items:center; gap:16px;">
        <span style="font-size:26px;">💾</span>
        <div>
          <div style="font-weight:600; color:var(--text); margin-bottom:3px;">localStorage</div>
          <div style="font-size:13px; color:var(--muted);">Key: <code>38DayTrackerV2</code> · auto-synced on every state change</div>
        </div>
      </div>
    </div>
  </section>


  <!-- ─── REELS LINEUP ─── -->
  <section class="section" id="reels">
    <div class="section-label">
      <div class="section-icon" style="background:var(--lav-bg);">🎬</div>
      <h2 class="section-title">Reels Lineup</h2>
    </div>

    <div class="card" style="padding: 0; overflow: hidden;">
      <div style="padding: 22px 28px 14px; border-bottom: 1px solid var(--border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <span style="font-size:14px; color:var(--sub);">Khushi's founder story series — 22 scripted reels, ready to film.</span>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <span class="badge badge-lav">22 Total</span>
          <span class="badge badge-rose">0 Posted</span>
        </div>
      </div>
      <div style="overflow-x:auto; padding: 16px 24px 24px;">
        <table class="reels-table">
          <thead>
            <tr>
              <th>#</th><th>Title</th><th>Teaser</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>01</td><td>47 Tabs Open</td><td>anxiety and no niche → the origin</td></tr>
            <tr><td>02</td><td>8 Pointer Felt Nothing</td><td>top grades, zero fulfilment</td></tr>
            <tr><td>03</td><td>Waiting at the Restaurant</td><td>everyone eating; me just watching</td></tr>
            <tr><td>04</td><td>45 Companies Resume</td><td>shotgun applications + one read receipt</td></tr>
            <tr><td>05</td><td>Imposter Syndrome</td><td>blanking on your own subject</td></tr>
            <tr><td>06</td><td>The DM That Changed Everything</td><td>the LinkedIn message that started QuickRevert</td></tr>
            <tr><td>07</td><td>Working on Something</td><td>6 months of vague answers to parents</td></tr>
            <tr><td>08</td><td>Code Had Beef With Me</td><td>fix one thing → three break</td></tr>
            <tr><td>09</td><td>Laptop Crash Pt. 1</td><td>black screen, 25 days of work gone</td></tr>
            <tr><td>10</td><td>Crash Pt. 2 / Rebuild</td><td>starting again was faster</td></tr>
            <tr><td>11</td><td>Loneliness of Building</td><td>nobody speaks the language yet</td></tr>
            <tr><td>12</td><td>Almost Quit on a Wednesday</td><td>nothing dramatic — just a Wednesday</td></tr>
            <tr><td>13</td><td>First Win / It Worked</td><td>refresh. still working. STILL WORKING.</td></tr>
            <tr><td>14</td><td>No Backup Plan</td><td>backup plan = optional; I needed this to not be optional</td></tr>
            <tr><td>15</td><td>Forgot Things I Used to Know</td><td>AI/ML gone from brain mid-build</td></tr>
            <tr><td>16</td><td>Pivoting / Calibration</td><td>chaos wasn't confusion — it was data</td></tr>
            <tr><td>17</td><td>Found My People at 2am</td><td>cofounder criteria: replies at 2am</td></tr>
            <tr><td>18</td><td>Imposter Gets Quieter</td><td>doubt moves to passenger seat</td></tr>
            <tr><td>19</td><td>What Building Actually Costs</td><td>not money — yet</td></tr>
            <tr><td>20</td><td>Chaos Over Salary</td><td>and I'd do it again immediately</td></tr>
            <tr><td>21</td><td>Building in Public is Terrifying</td><td>doing it anyway, no chill</td></tr>
            <tr><td>22</td><td>THE REVEAL 🎯</td><td>you were using QuickRevert the whole time</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>


  <!-- ─── HOW IT WORKS ─── -->
  <section class="section" id="how-it-works">
    <div class="section-label">
      <div class="section-icon" style="background:var(--green-bg);">⚙️</div>
      <h2 class="section-title">How It Works</h2>
    </div>

    <div class="card">
      <p style="color:var(--sub); font-size:14px; margin-bottom:22px;">State flows one way — every user action calls a setter, React re-renders, and <code>useEffect</code> flushes to localStorage.</p>

      <div class="flow">
        <div class="flow-node">User Action</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node"><code>setData(…)</code></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">React re-renders</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node"><code>useEffect</code></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">localStorage</div>
      </div>

      <div class="divider"></div>

      <p style="font-weight:600; color:var(--text); margin-bottom:12px;">Derived Values (no extra state)</p>
<pre><span class="token-muted">// Days elapsed since sprint started</span>
<span class="token-purple">const</span> daysElapsed = Math.max(<span class="token-green">1</span>,
  Math.min(<span class="token-amber">TOTAL_DAYS</span>,
    Math.floor((today - START_DATE) / <span class="token-green">86400000</span>) + <span class="token-green">1</span>
  )
);

<span class="token-muted">// Revenue pace needed each remaining day</span>
<span class="token-purple">const</span> paceNeeded = daysRemaining &gt; <span class="token-green">0</span>
  ? Math.ceil((GOAL_AMOUNT - totalEarned) / daysRemaining)
  : <span class="token-green">0</span>;

<span class="token-muted">// Chart data — memoised to avoid recalc on every render</span>
<span class="token-purple">const</span> revenueChartData = useMemo(() =&gt; (
  Array.from({ length: <span class="token-amber">TOTAL_DAYS</span> }, (_, i) =&gt; ({
    day:    i + <span class="token-green">1</span>,
    earned: <span class="token-muted">/* cumulative income up to this day */</span>,
    target: Math.round((i + <span class="token-green">1</span>) * <span class="token-amber">DAILY_TARGET</span>),
  }))
), [data.freelanceIncomes]);
</pre>
    </div>

    <div class="callout callout-green">
      <span class="callout-icon">🔄</span>
      <span>On first load, if no <code>localStorage</code> key exists, <code>DEFAULT_DATA</code> seeds everything — all 22 reels, 8 habits, 5 QR features, and tasks from <code>dailyTasksData.ts</code>.</span>
    </div>
  </section>


  <!-- ─── SETUP ─── -->
  <section class="section" id="setup">
    <div class="section-label">
      <div class="section-icon" style="background:var(--amb-bg);">🚀</div>
      <h2 class="section-title">Quick Setup</h2>
    </div>

    <div class="card">
      <p style="color:var(--sub); font-size:14px; margin-bottom:20px;">
        Drop <code>Tracker.tsx</code> (and its sibling <code>dailyTasksData.ts</code>) into any React + TypeScript project. Install peer deps and render.
      </p>

<pre><span class="token-muted"># 1 — install dependencies</span>
npm install recharts lucide-react

<span class="token-muted"># 2 — add Google Fonts to your index.html &lt;head&gt;</span>
<span class="token-green">&lt;link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1
  &amp;family=DM+Sans:wght@300;400;500;600;700&amp;display=swap"
  rel="stylesheet" /&gt;</span>

<span class="token-muted"># 3 — render the component</span>
<span class="token-purple">import</span> Tracker <span class="token-purple">from</span> <span class="token-green">'./Tracker'</span>;

<span class="token-purple">export default function</span> <span class="token-amber">App</span>() {
  <span class="token-purple">return</span> &lt;<span class="token-green">Tracker</span> /&gt;;
}
</pre>

      <div class="callout callout-amber" style="margin-top:20px;">
        <span class="callout-icon">⚠️</span>
        <span>Make sure <code>dailyTasksData.ts</code> (exporting <code>ALL_DAILY_TASKS</code>) lives in the same directory as <code>Tracker.tsx</code>, or update the import path.</span>
      </div>
    </div>
  </section>


  <!-- ─── CUSTOMISE ─── -->
  <section class="section" id="customise">
    <div class="section-label">
      <div class="section-icon" style="background:var(--rose-bg);">🎨</div>
      <h2 class="section-title">Customise</h2>
    </div>

    <div class="card">
      <p style="font-weight:600; color:var(--text); margin-bottom:16px;">Change the sprint target or dates</p>
<pre><span class="token-purple">const</span> GOAL_AMOUNT  = <span class="token-green">100000</span>;          <span class="token-muted">// ₹ target</span>
<span class="token-purple">const</span> START_DATE   = <span class="token-purple">new</span> Date(<span class="token-green">'2026-03-23'</span>);
<span class="token-purple">const</span> TOTAL_DAYS   = <span class="token-green">38</span>;
<span class="token-purple">const</span> DAILY_TARGET = Math.ceil(GOAL_AMOUNT / TOTAL_DAYS);</pre>

      <div class="divider"></div>

      <p style="font-weight:600; color:var(--text); margin-bottom:16px;">Swap the colour palette</p>
      <p style="color:var(--sub); font-size:14px; margin-bottom:14px;">All colours live in the <code>T</code> object at the top of the file:</p>
<pre><span class="token-purple">const</span> T = {
  bg:       <span class="token-green">'#fef8f2'</span>,   <span class="token-muted">// page background</span>
  green:    <span class="token-green">'#5f9e7a'</span>,   <span class="token-muted">// revenue / positive</span>
  rose:     <span class="token-green">'#c97a7a'</span>,   <span class="token-muted">// habits / warnings</span>
  lavender: <span class="token-green">'#8b7ec8'</span>,   <span class="token-muted">// reels / time</span>
  amber:    <span class="token-green">'#c4885a'</span>,   <span class="token-muted">// QuickRevert / urgency</span>
  blue:     <span class="token-green">'#5a8fc4'</span>,   <span class="token-muted">// daily tasks</span>
  <span class="token-muted">// … and more</span>
};</pre>

      <div class="divider"></div>

      <p style="font-weight:600; color:var(--text); margin-bottom:16px;">Edit default habits / QR features</p>
      <p style="color:var(--sub); font-size:14px;">Update <code>DEFAULT_HABITS</code> and <code>DEFAULT_QR_FEATURES</code> arrays near the top of <code>Tracker.tsx</code>. Changes only take effect on first load (before localStorage is set) — or after clearing localStorage.</p>
    </div>
  </section>


  <!-- ─── SPRINT TIMELINE ─── -->
  <section class="section" id="timeline">
    <div class="section-label">
      <div class="section-icon" style="background:var(--lav-bg);">📆</div>
      <h2 class="section-title">Sprint Timeline</h2>
    </div>

    <div class="card">
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">March 23, 2026 — Day 1</div>
          <div class="timeline-text">Sprint begins. Revenue at ₹0. All 22 reels in <em>Pending</em>.</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">March 23 – April 5 — Days 1–14</div>
          <div class="timeline-text">First half. Target: ₹50,000. Film and post the first 11 reels. Ship first 2–3 QR features.</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">April 6 – April 23 — Days 15–32</div>
          <div class="timeline-text">Acceleration phase. Reels 12–21 live. QuickRevert beta outreach. Daily pace tracked against the chart.</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">April 24 – April 29 — Days 33–37</div>
          <div class="timeline-text">Final push. Reel 22 — The Reveal — drops. All 5 QR features shipped.</div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">April 30, 2026 — Day 38</div>
          <div class="timeline-text">Sprint end. Goal: ₹1,00,000 earned. 22/22 reels posted. 8/8 habits daily. QuickRevert live.</div>
        </div>
      </div>
    </div>
  </section>


  <div class="divider"></div>

  <!-- ─── COMPONENT INVENTORY ─── -->
  <section class="section">
    <div class="section-label">
      <div class="section-icon" style="background:var(--blue-bg);">🧩</div>
      <h2 class="section-title">Component Inventory</h2>
    </div>

    <div class="card">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap:12px;">
        <div class="card-sm">
          <div style="font-weight:600; color:var(--text); margin-bottom:4px;"><code style="font-size:12px;">Ring</code></div>
          <div style="font-size:13px; color:var(--muted);">Animated SVG circular progress ring — used in KPI cards and goal hero.</div>
        </div>
        <div class="card-sm">
          <div style="font-weight:600; color:var(--text); margin-bottom:4px;"><code style="font-size:12px;">Card</code></div>
          <div style="font-size:13px; color:var(--muted);">Shared white card with border, radius 20, and warm shadow.</div>
        </div>
        <div class="card-sm">
          <div style="font-weight:600; color:var(--text); margin-bottom:4px;"><code style="font-size:12px;">SectionTitle</code></div>
          <div style="font-size:13px; color:var(--muted);">Icon + serif heading + optional badge chip.</div>
        </div>
        <div class="card-sm">
          <div style="font-weight:600; color:var(--text); margin-bottom:4px;"><code style="font-size:12px;">RevenueTooltip</code></div>
          <div style="font-size:13px; color:var(--muted);">Custom Recharts tooltip for the area chart — shows ₹ values for earned and target.</div>
        </div>
        <div class="card-sm">
          <div style="font-weight:600; color:var(--text); margin-bottom:4px;"><code style="font-size:12px;">ReelTooltip</code></div>
          <div style="font-size:13px; color:var(--muted);">Custom Recharts tooltip for the horizontal pipeline bar chart.</div>
        </div>
        <div class="card-sm">
          <div style="font-weight:600; color:var(--text); margin-bottom:4px;"><code style="font-size:12px;">inp()</code></div>
          <div style="font-size:13px; color:var(--muted);">Utility that returns a consistent input style object, mergeable with extra overrides.</div>
        </div>
      </div>
    </div>
  </section>

</div><!-- /container -->


<!-- ═══════════════════════════════ FOOTER ═══════════════════════════════ -->
<footer class="footer">
  <p style="margin-bottom:8px;">
    Built with <span class="footer-heart">♥</span> for Khushi's 38-day sprint &nbsp;·&nbsp;
    Mar 23 – Apr 30, 2026
  </p>
  <p style="font-size:12px; color:var(--faint);">
    Saved to localStorage &nbsp;·&nbsp; No backend &nbsp;·&nbsp; No drama &nbsp;·&nbsp; Just ship ✨
  </p>
</footer>

</body>
</html>

export interface DailyTask {
  id: string;
  day: number;
  text: string;
  completed: boolean;
  column: 'morning' | 'work' | 'evening' | 'bed';
}

export const ALL_DAILY_TASKS: DailyTask[] = [
  // Day 1
  { id: 'd1m1', day: 1, text: 'Udemy: Section 1 — watch for 45 min, take notes in a notebook', completed: false, column: 'morning' },
  { id: 'd1w1', day: 1, text: 'Go to upwork.com → create account → select "work as freelancer"', completed: false, column: 'work' },
  { id: 'd1w2', day: 1, text: 'Fill title: Instagram DM Automation Engineer | n8n + Meta API + Supabase', completed: false, column: 'work' },
  { id: 'd1w3', day: 1, text: 'Skills: n8n, Instagram API, Supabase, FastAPI, Python, Webhook', completed: false, column: 'work' },
  { id: 'd1w4', day: 1, text: 'Hourly rate: ₹1500/hr', completed: false, column: 'work' },
  { id: 'd1w5', day: 1, text: 'Bio: "I co-founded QuickRevert, a Meta-approved Instagram automation SaaS. I build DM flows, lead capture systems, and Supabase backends. 3–7 day delivery. Portfolio: quickrevert.com"', completed: false, column: 'work' },
  { id: 'd1w6', day: 1, text: 'Upload a screenshot of QR dashboard as portfolio item', completed: false, column: 'work' },
  { id: 'd1w7', day: 1, text: 'Take the Upwork English test (adds credibility badge)', completed: false, column: 'work' },
  { id: 'd1e1', day: 1, text: 'Open Supabase, design the `conversation_flows` table schema: flow_id, node_id, message_text, trigger_keyword, next_node_id, workspace_id', completed: false, column: 'evening' },
  { id: 'd1e2', day: 1, text: 'Design `conversation_state` table: igsid, workspace_id, current_node_id, updated_at', completed: false, column: 'evening' },
  { id: 'd1e3', day: 1, text: "Don't code yet. Just plan on paper or Notion.", completed: false, column: 'evening' },
  { id: 'd1b1', day: 1, text: 'Find 20 Instagram creators (fashion/coaches/D2C) between 10k–100k followers. Save their handles in a note.', completed: false, column: 'bed' },

  // Day 2
  { id: 'd2m1', day: 2, text: 'Udemy: Section 1 continued or finish it', completed: false, column: 'morning' },
  { id: 'd2w1', day: 2, text: 'Create Fiverr account → go to Selling → Create Gig', completed: false, column: 'work' },
  { id: 'd2w2', day: 2, text: 'Title: I will build Instagram DM automation with n8n and Meta API', completed: false, column: 'work' },
  { id: 'd2w3', day: 2, text: 'Category: Programming & Tech → Chatbots', completed: false, column: 'work' },
  { id: 'd2w4', day: 2, text: 'Basic ₹8,000 / Standard ₹20,000 / Premium ₹35,000', completed: false, column: 'work' },
  { id: 'd2w5', day: 2, text: 'Gig description with co-founder credentials and 3-7 day delivery', completed: false, column: 'work' },
  { id: 'd2w6', day: 2, text: 'Tags: instagram automation, n8n, chatbot, meta api, instagram bot', completed: false, column: 'work' },
  { id: 'd2w7', day: 2, text: 'Upload QR workflow screenshot as gig image', completed: false, column: 'work' },
  { id: 'd2e1', day: 2, text: 'Start building conversational flows in n8n', completed: false, column: 'evening' },
  { id: 'd2e2', day: 2, text: 'Create the Supabase tables you planned yesterday', completed: false, column: 'evening' },
  { id: 'd2e3', day: 2, text: 'Build the basic webhook trigger: incoming DM → lookup igsid → fetch node → send response', completed: false, column: 'evening' },
  { id: 'd2b1', day: 2, text: 'Send cold DMs to the 20 creators you found yesterday (Loom offer)', completed: false, column: 'bed' },

  // Day 3
  { id: 'd3m1', day: 3, text: 'Udemy: Section 2 — Python for ML basics', completed: false, column: 'morning' },
  { id: 'd3w1', day: 3, text: 'Continue building conversational flows', completed: false, column: 'work' },
  { id: 'd3w2', day: 3, text: 'Goal: make a message successfully send based on keyword trigger', completed: false, column: 'work' },
  { id: 'd3w3', day: 3, text: 'Test it: send yourself a DM with a keyword → QR should reply', completed: false, column: 'work' },
  { id: 'd3w4', day: 3, text: 'Fix whatever breaks (it will break)', completed: false, column: 'work' },
  { id: 'd3a1', day: 3, text: 'Go to Upwork → search "n8n automation" → apply to 3 jobs', completed: false, column: 'work' },
  { id: 'd3a2', day: 3, text: 'Personalize first 2 lines of each proposal', completed: false, column: 'work' },
  { id: 'd3e1', day: 3, text: 'Sign up for Hostinger affiliate: hostinger.com/affiliates', completed: false, column: 'evening' },
  { id: 'd3e2', day: 3, text: 'Get your affiliate link. Save it somewhere.', completed: false, column: 'evening' },
  { id: 'd3e3', day: 3, text: 'Find 20 more creators for tomorrow\'s DMs', completed: false, column: 'evening' },

  // Day 4
  { id: 'd4m1', day: 4, text: 'Udemy: Section 2 continued', completed: false, column: 'morning' },
  { id: 'd4w1', day: 4, text: 'Conversational flows: add branching logic today (yes/no/default)', completed: false, column: 'work' },
  { id: 'd4w2', day: 4, text: 'Test the branch with 2 different replies from your phone', completed: false, column: 'work' },
  { id: 'd4a1', day: 4, text: '3 more Upwork proposals (Instagram bot or Supabase backend)', completed: false, column: 'work' },
  { id: 'd4a2', day: 4, text: 'Check Fiverr messages. Reply within 1 hour.', completed: false, column: 'work' },
  { id: 'd4a3', day: 4, text: 'Set up Gumroad account: gumroad.com', completed: false, column: 'work' },
  { id: 'd4a4', day: 4, text: 'Create product: n8n Instagram DM automation JSON workflow (₹399)', completed: false, column: 'work' },
  { id: 'd4a5', day: 4, text: 'Export n8n workflow JSON, upload and publish on Gumroad', completed: false, column: 'work' },
  { id: 'd4e1', day: 4, text: 'Send cold DMs to 20 more creators', completed: false, column: 'evening' },
  { id: 'd4e2', day: 4, text: 'Reply to any responses from Day 2 DMs', completed: false, column: 'evening' },

  // Day 5
  { id: 'd5m1', day: 5, text: 'Udemy: Section 3 — Data preprocessing', completed: false, column: 'morning' },
  { id: 'd5w1', day: 5, text: 'Conversational flows: build the full 11-step chain today', completed: false, column: 'work' },
  { id: 'd5w2', day: 5, text: 'Have at least 5 nodes connected and working', completed: false, column: 'work' },
  { id: 'd5w3', day: 5, text: 'Each node: receive → match → send → update state', completed: false, column: 'work' },
  { id: 'd5a1', day: 5, text: 'Post on LinkedIn about the 11-step flow with screenshot', completed: false, column: 'work' },
  { id: 'd5a2', day: 5, text: '3 Upwork proposals', completed: false, column: 'work' },
  { id: 'd5e1', day: 5, text: 'DM 20 creators (non-negotiable)', completed: false, column: 'evening' },
  { id: 'd5e2', day: 5, text: 'Peerlist: Add QuickRevert as project + apply to 2 opportunities', completed: false, column: 'evening' },

  // Day 6
  { id: 'd6m1', day: 6, text: 'Udemy: Section 3 continued', completed: false, column: 'morning' },
  { id: 'd6w1', day: 6, text: 'Conversational flows: finish all 11 nodes', completed: false, column: 'work' },
  { id: 'd6w2', day: 6, text: 'Test entire flow end to end from personal account', completed: false, column: 'work' },
  { id: 'd6w3', day: 6, text: 'Write down every bug. Fix them one by one.', completed: false, column: 'work' },
  { id: 'd6a1', day: 6, text: '3 Upwork proposals', completed: false, column: 'work' },
  { id: 'd6a2', day: 6, text: 'Share Gumroad link: Indian startup Discord/Slack + IG story', completed: false, column: 'work' },
  { id: 'd6e1', day: 6, text: '20 creator DMs', completed: false, column: 'evening' },
  { id: 'd6e2', day: 6, text: 'Check Upwork, Fiverr, LinkedIn inbox. Reply to everything.', completed: false, column: 'evening' },

  // Day 7
  { id: 'd7m1', day: 7, text: 'Udemy: finish Section 3', completed: false, column: 'morning' },
  { id: 'd7w1', day: 7, text: 'Deploy conversational flows edge function to Supabase', completed: false, column: 'work' },
  { id: 'd7w2', day: 7, text: 'Deploy all functions except verify-razorpay-payment', completed: false, column: 'work' },
  { id: 'd7w3', day: 7, text: 'Test on live Instagram account with real DMs (Feature 1 DONE ✅)', completed: false, column: 'work' },
  { id: 'd7a1', day: 7, text: 'Film Reel 1 (anxiety script) + Reel 2 (8 pointer script)', completed: false, column: 'work' },
  { id: 'd7a2', day: 7, text: 'Don\'t edit today. Just film raw.', completed: false, column: 'work' },
  { id: 'd7e1', day: 7, text: '20 creator DMs + 3 Upwork proposals', completed: false, column: 'evening' },
  { id: 'd7e2', day: 7, text: 'Plan Feature 2 (Retrigger): last_interaction_at + retrigger_count', completed: false, column: 'evening' },

  // Day 8
  { id: 'd8m1', day: 8, text: 'Udemy: Section 4 — Supervised learning intro', completed: false, column: 'morning' },
  { id: 'd8w1', day: 8, text: 'Edit and post Reel 1 today (Caption: your script)', completed: false, column: 'work' },
  { id: 'd8w2', day: 8, text: 'DM trigger in caption: match your reel\'s CTA keyword', completed: false, column: 'work' },
  { id: 'd8a1', day: 8, text: 'Weekly review: Upwork/Creator replies & follow ups', completed: false, column: 'work' },
  { id: 'd8a2', day: 8, text: 'Check Gumroad sales and share link 2 more places', completed: false, column: 'work' },
  { id: 'd8e1', day: 8, text: 'Start building Retrigger Messages (Feature 2)', completed: false, column: 'evening' },

  // Day 9
  { id: 'd9m1', day: 9, text: 'Udemy: Section 4 continued', completed: false, column: 'morning' },
  { id: 'd9w1', day: 9, text: 'Retrigger: write the n8n scheduled workflow (every 6 hours)', completed: false, column: 'work' },
  { id: 'd9w2', day: 9, text: 'Logic: find IGSIDs (interaction < 2 days AND count < 2)', completed: false, column: 'work' },
  { id: 'd9a1', day: 9, text: 'Post Reel 2 today + reply to inboxes', completed: false, column: 'work' },
  { id: 'd9e1', day: 9, text: '10 creator DMs + follow up warm leads', completed: false, column: 'evening' },

  // Day 10
  { id: 'd10m1', day: 10, text: 'Udemy: Section 4 finish', completed: false, column: 'morning' },
  { id: 'd10w1', day: 10, text: 'Retrigger: test with manual last_interaction_at change', completed: false, column: 'work' },
  { id: 'd10w2', day: 10, text: 'Fix bugs (Feature 2 DONE ✅)', completed: false, column: 'work' },
  { id: 'd10a1', day: 10, text: 'Potential freelance client scope call (₹20,000 quote)', completed: false, column: 'work' },
  { id: 'd10e1', day: 10, text: 'Film Reel 3 (restaurant script) + 10 creator DMs', completed: false, column: 'evening' },
  { id: 'd10e2', day: 10, text: 'Follow up warm leads from Week 1', completed: false, column: 'evening' },

  // Day 11
  { id: 'd11m1', day: 11, text: 'Udemy: Section 5 — Model evaluation', completed: false, column: 'morning' },
  { id: 'd11w1', day: 11, text: 'Start Lead Manager (Feature 3): Create leads table in Supabase', completed: false, column: 'work' },
  { id: 'd11w2', day: 11, text: 'Webhook-meta: run regex check (Email & Indian Phone)', completed: false, column: 'work' },
  { id: 'd11w3', day: 11, text: 'If match found → upsert to leads table', completed: false, column: 'work' },
  { id: 'd11a1', day: 11, text: 'Post Reel 3 + 3 Upwork proposals', completed: false, column: 'work' },
  { id: 'd11a2', day: 11, text: 'Freelance client confirmed? Start their project.', completed: false, column: 'work' },
  { id: 'd11e1', day: 11, text: '10 creator DMs + pitch QR presales actively', completed: false, column: 'evening' },

  // Day 12
  { id: 'd12m1', day: 12, text: 'Udemy: Section 5 continued', completed: false, column: 'morning' },
  { id: 'd12w1', day: 12, text: 'Lead Manager: build dashboard table UI + search bar', completed: false, column: 'work' },
  { id: 'd12w2', day: 12, text: 'Add CSV export button calling Supabase edge function', completed: false, column: 'work' },
  { id: 'd12a1', day: 12, text: 'Post Reel 4 + 3 Upwork proposals', completed: false, column: 'work' },
  { id: 'd12a2', day: 12, text: 'Check all inboxes. Reply to everything.', completed: false, column: 'work' },
  { id: 'd12e1', day: 12, text: '10 creator DMs + work on freelance project delivery', completed: false, column: 'evening' },

  // Day 13
  { id: 'd13m1', day: 13, text: 'Udemy: Section 5 finish', completed: false, column: 'morning' },
  { id: 'd13w1', day: 13, text: 'Lead Manager: finish CSV export & verify data', completed: false, column: 'work' },
  { id: 'd13w2', day: 13, text: 'Feature 3 DONE ✅', completed: false, column: 'work' },
  { id: 'd13a1', day: 13, text: 'LinkedIn: Post about Lead Manager with screenshot', completed: false, column: 'work' },
  { id: 'd13a2', day: 13, text: '3 Upwork proposals', completed: false, column: 'work' },
  { id: 'd13e1', day: 13, text: 'Film Reel 5 (imposter script) + 10 creator DMs', completed: false, column: 'evening' },

  // Day 14
  { id: 'd14m1', day: 14, text: 'Udemy: Section 6 — Clustering', completed: false, column: 'morning' },
  { id: 'd14w1', day: 14, text: 'Deliver freelance project with Loom walkthrough (₹20,000)', completed: false, column: 'work' },
  { id: 'd14w2', day: 14, text: 'Invoice client + ask for Upwork review', completed: false, column: 'work' },
  { id: 'd14a1', day: 14, text: 'Start looking for Freelance Client 2 + Post Reel 5', completed: false, column: 'work' },
  { id: 'd14e1', day: 14, text: '10 creator DMs + follow up QR presales', completed: false, column: 'evening' },

  // Day 15
  { id: 'd15m1', day: 15, text: 'Udemy: Section 6 continued', completed: false, column: 'morning' },
  { id: 'd15w1', day: 15, text: 'Weekly check: target ₹35k+ earned or invoiced', completed: false, column: 'work' },
  { id: 'd15w2', day: 15, text: 'If below: cold DM 10 LinkedIn founders today', completed: false, column: 'work' },
  { id: 'd15a1', day: 15, text: '3 Upwork proposals + Post Reel 6', completed: false, column: 'work' },
  { id: 'd15e1', day: 15, text: '10 creator DMs + scope Feature 4 (Live Automation)', completed: false, column: 'evening' },

  // Day 16
  { id: 'd16m1', day: 16, text: 'Udemy: Section 6 finish', completed: false, column: 'morning' },
  { id: 'd16w1', day: 16, text: 'Co-founder scope call for Feature 4: trigger types, response time, details', completed: false, column: 'work' },
  { id: 'd16w2', day: 16, text: 'After call: write the build plan (no coding yet)', completed: false, column: 'work' },
  { id: 'd16a1', day: 16, text: '3 Upwork proposals + Scoping Freelance Client 2 (get on call)', completed: false, column: 'work' },
  { id: 'd16e1', day: 16, text: '10 creator DMs + Film & Post Reel 7 (working script)', completed: false, column: 'evening' },

  // Day 17
  { id: 'd17m1', day: 17, text: 'Udemy: Section 7 — Neural networks', completed: false, column: 'morning' },
  { id: 'd17w1', day: 17, text: 'Feature 4 (Live Automation): build new trigger handler', completed: false, column: 'work' },
  { id: 'd17w2', day: 17, text: 'Set up webhook listener for follow events (new follower DM trigger)', completed: false, column: 'work' },
  { id: 'd17a1', day: 17, text: '3 Upwork proposals + Freelance Client 2 project start', completed: false, column: 'work' },
  { id: 'd17e1', day: 17, text: '10 creator DMs + Share Gumroad link on 2 new platforms', completed: false, column: 'evening' },

  // Day 18
  { id: 'd18m1', day: 18, text: 'Udemy: Section 7 continued', completed: false, column: 'morning' },
  { id: 'd18w1', day: 18, text: 'Feature 4: connect new trigger to existing flows system', completed: false, column: 'work' },
  { id: 'd18w2', day: 18, text: 'Test: trigger event → flow starts → conversation runs', completed: false, column: 'work' },
  { id: 'd18w3', day: 18, text: 'Fix bugs as they appear during testing', completed: false, column: 'work' },
  { id: 'd18a1', day: 18, text: '3 Upwork proposals + Post Reel 8 (code breaking script)', completed: false, column: 'work' },
  { id: 'd18e1', day: 18, text: '10 creator DMs + Film Reel 9 (laptop crash part 1)', completed: false, column: 'evening' },

  // Day 19
  { id: 'd19m1', day: 19, text: 'Udemy: Section 8 — Deep learning', completed: false, column: 'morning' },
  { id: 'd19w1', day: 19, text: 'Feature 4: optimize response time (target < 2 seconds)', completed: false, column: 'work' },
  { id: 'd19w2', day: 19, text: 'Check cold starts in Supabase + add response_time_ms to logs', completed: false, column: 'work' },
  { id: 'd19a1', day: 19, text: 'Freelance Client 2: continue delivery + 3 Upwork proposals', completed: false, column: 'work' },
  { id: 'd19e1', day: 19, text: 'Post Reel 9 + Film Reel 10 (laptop crash part 2) + 10 creator DMs', completed: false, column: 'evening' },

  // Day 20
  { id: 'd20m1', day: 20, text: 'Udemy: Section 8 continued', completed: false, column: 'morning' },
  { id: 'd20w1', day: 20, text: 'Feature 4: load test (10 DMs in quick succession) + fix failures', completed: false, column: 'work' },
  { id: 'd20w2', day: 20, text: 'Feature 4 DONE ✅', completed: false, column: 'work' },
  { id: 'd20a1', day: 20, text: '3 Upwork proposals + LinkedIn post (latency before/after)', completed: false, column: 'work' },
  { id: 'd20e1', day: 20, text: 'Post Reel 10 + 10 creator DMs', completed: false, column: 'evening' },

  // Day 21
  { id: 'd21m1', day: 21, text: 'Udemy: Section 9 — NLP basics', completed: false, column: 'morning' },
  { id: 'd21w1', day: 21, text: 'Freelance Client 2: deliver today + Loom + invoice (₹20,000)', completed: false, column: 'work' },
  { id: 'd21w2', day: 21, text: 'Ask for Upwork review immediately after delivery', completed: false, column: 'work' },
  { id: 'd21a1', day: 21, text: 'Film & Post Reel 11 (loneliness script) + Start looking for Client 3', completed: false, column: 'work' },
  { id: 'd21e1', day: 21, text: '10 creator DMs + Weekly income check (target ₹55k+)', completed: false, column: 'evening' },

  // Day 22
  { id: 'd22m1', day: 22, text: 'Udemy: Section 9 continued', completed: false, column: 'morning' },
  { id: 'd22w1', day: 22, text: 'Start Feature 5 (Carousel Cards): wire into n8n as Code node', completed: false, column: 'work' },
  { id: 'd22w2', day: 22, text: '3 cards, 700ms sleep between each; add node type to flows', completed: false, column: 'work' },
  { id: 'd22a1', day: 22, text: '3 Upwork proposals + Film & Post Reel 12 (almost quit script)', completed: false, column: 'work' },
  { id: 'd22e1', day: 22, text: '10 creator DMs + Hostinger affiliate reel (affiliate link in bio)', completed: false, column: 'evening' },

  // Day 23
  { id: 'd23m1', day: 23, text: 'Udemy: Section 10 — LLM APIs', completed: false, column: 'morning' },
  { id: 'd23w1', day: 23, text: 'Carousel: real account test (keyword → 3 cards with 700ms gap)', completed: false, column: 'work' },
  { id: 'd23w2', day: 23, text: 'Verify postback routes correctly (DONE All 5 features shipped)', completed: false, column: 'work' },
  { id: 'd23a1', day: 23, text: 'Film & Post Reel 13 (cooked script) + Feature overview reel', completed: false, column: 'work' },
  { id: 'd23e1', day: 23, text: '10 creator DMs (pitch QR harder ₹599 for 3 months) + Look for Client 3', completed: false, column: 'evening' },

  // Day 24
  { id: 'd24m1', day: 24, text: 'Udemy: Section 10 continued', completed: false, column: 'morning' },
  { id: 'd24w1', day: 24, text: 'Freelance Client 3: scope call + confirm + start project', completed: false, column: 'work' },
  { id: 'd24a1', day: 24, text: 'Post Reel 14 (no backup script) + Film Reel 15 (skills script) + 3 Upwork props', completed: false, column: 'work' },
  { id: 'd24e1', day: 24, text: '10 creator DMs + follow-up cold presale conversations', completed: false, column: 'evening' },

  // Day 25
  { id: 'd25m1', day: 25, text: 'Udemy: Section 11 — MLOps', completed: false, column: 'morning' },
  { id: 'd25w1', day: 25, text: 'Freelance Client 3: continue delivery work', completed: false, column: 'work' },
  { id: 'd25w2', day: 25, text: 'SmartKitchen AI (Udemy Capstone): set up repo & ETL base', completed: false, column: 'work' },
  { id: 'd25a1', day: 25, text: '3 Upwork proposals + Post Reel 15', completed: false, column: 'work' },
  { id: 'd25e1', day: 25, text: 'Film Reel 16 (pivoting script) + 10 creator DMs', completed: false, column: 'evening' },

  // Day 26
  { id: 'd26m1', day: 26, text: 'Udemy: Section 11 continued', completed: false, column: 'morning' },
  { id: 'd26w1', day: 26, text: 'Freelance Client 3: continue delivery', completed: false, column: 'work' },
  { id: 'd26w2', day: 26, text: 'SmartKitchen: build data ingestion script (CSV → Supabase)', completed: false, column: 'work' },
  { id: 'd26a1', day: 26, text: 'Post Reel 16 + Film Reel 17 (found people script) + 3 Upwork props', completed: false, column: 'work' },
  { id: 'd26e1', day: 26, text: '10 creator DMs + Income check (target ₹75k+)', completed: false, column: 'evening' },

  // Day 27
  { id: 'd27m1', day: 27, text: 'Udemy: Section 12 — Deploying ML models', completed: false, column: 'morning' },
  { id: 'd27w1', day: 27, text: 'Freelance Client 3: deliver project + Loom walkthrough + invoice', completed: false, column: 'work' },
  { id: 'd27a1', day: 27, text: 'Post Reel 17 + Film Reel 18 (imposter quiet script) + 3 Upwork props', completed: false, column: 'work' },
  { id: 'd27e1', day: 27, text: '10 creator DMs + follow up with Upwork referrals (₹2k discount offer)', completed: false, column: 'evening' },

  // Day 28
  { id: 'd28m1', day: 28, text: 'Udemy: Section 12 continued', completed: false, column: 'morning' },
  { id: 'd28w1', day: 28, text: 'SmartKitchen: train demand forecasting model (Linear Regression)', completed: false, column: 'work' },
  { id: 'd28w2', day: 28, text: 'Evaluate: check MAE/RMSE + wrap in FastAPI endpoint', completed: false, column: 'work' },
  { id: 'd28a1', day: 28, text: 'Post Reel 18 + Film Reel 19 (building costs script) + 3 Upwork props', completed: false, column: 'work' },
  { id: 'd28e1', day: 28, text: '10 creator DMs + QR presales final push (12 days to ₹1L)', completed: false, column: 'evening' },

  // Day 29
  { id: 'd29m1', day: 29, text: 'Udemy: Section 12 finish', completed: false, column: 'morning' },
  { id: 'd29w1', day: 29, text: 'Weekly income check: target ₹75k+', completed: false, column: 'work' },
  { id: 'd29w2', day: 29, text: 'If below: cold DM 20 LinkedIn SaaS founders/agency owners', completed: false, column: 'work' },
  { id: 'd29a1', day: 29, text: 'Post Reel 19 + Film Reel 20 (chaos script) & 21 (terrifying script) + 3 Upwork props', completed: false, column: 'work' },
  { id: 'd29e1', day: 29, text: '10 creator DMs + Plan final push for ₹1L goal', completed: false, column: 'evening' },

  // Day 30
  { id: 'd30m1', day: 30, text: 'Udemy: Section 13 — Capstone start', completed: false, column: 'morning' },
  { id: 'd30w1', day: 30, text: 'SmartKitchen: deploy FastAPI model to Vercel & connect to Supabase', completed: false, column: 'work' },
  { id: 'd30a1', day: 30, text: 'Post Reel 20 + Start QR bugfix week (rough edge walkthrough)', completed: false, column: 'work' },
  { id: 'd30e1', day: 30, text: '10 creator DMs + Razorpay referral sign up & share', completed: false, column: 'evening' },

  // Day 31
  { id: 'd31m1', day: 31, text: 'Udemy: Capstone continued', completed: false, column: 'morning' },
  { id: 'd31w1', day: 31, text: 'QR bugfix: fix the top 3 things that feel broken', completed: false, column: 'work' },
  { id: 'd31w2', day: 31, text: 'Test full onboarding flow as new user; fix confusion points', completed: false, column: 'work' },
  { id: 'd31a1', day: 31, text: 'Post Reel 21 + Film Reel 22 (THE REVEAL - Launch Reel) + 3 Upwork props', completed: false, column: 'work' },
  { id: 'd31e1', day: 31, text: '10 creator DMs (QR launch week notice) + Reply to all pending chats', completed: false, column: 'evening' },

  // Day 32
  { id: 'd32m1', day: 32, text: 'Udemy: Capstone continued', completed: false, column: 'morning' },
  { id: 'd32w1', day: 32, text: 'QR: improve onboarding copy and first-run experience', completed: false, column: 'work' },
  { id: 'd32w2', day: 32, text: 'Write onboarding checklist: connect IG → create flow → test it', completed: false, column: 'work' },
  { id: 'd32a1', day: 32, text: '3 Upwork proposals + Follow up with all pending freelance leads', completed: false, column: 'work' },
  { id: 'd32e1', day: 32, text: '10 creator DMs + Share Gumroad link in 3 communities today', completed: false, column: 'evening' },

  // Day 33
  { id: 'd33m1', day: 33, text: 'Udemy: Capstone — finish the model and get it working end to end', completed: false, column: 'morning' },
  { id: 'd33w1', day: 33, text: 'SmartKitchen: full pipeline working (CSV → FastAPI → Supabase)', completed: false, column: 'work' },
  { id: 'd33a1', day: 33, text: '3 Upwork proposals + Income check (push hard for ₹1L goal)', completed: false, column: 'work' },
  { id: 'd33e1', day: 33, text: 'Film & Post QR launch week story series + 10 creator DMs', completed: false, column: 'evening' },

  // Day 34
  { id: 'd34m1', day: 34, text: 'Udemy: Finish remaining sections + complete the certificate', completed: false, column: 'morning' },
  { id: 'd34w1', day: 34, text: 'SmartKitchen: deploy everything (deployed and callable)', completed: false, column: 'work' },
  { id: 'd34w2', day: 34, text: 'Download Udemy Certificate ✅', completed: false, column: 'work' },
  { id: 'd34a1', day: 34, text: '3 Upwork proposals + LinkedIn: Post certificate & project demo', completed: false, column: 'work' },
  { id: 'd34e1', day: 34, text: '10 creator DMs + QR presale final push to all warm leads', completed: false, column: 'evening' },

  // Day 35
  { id: 'd35m1', day: 35, text: 'Free — course is done. Review everything you built.', completed: false, column: 'morning' },
  { id: 'd35w1', day: 35, text: 'Post ALL remaining pending reels today', completed: false, column: 'work' },
  { id: 'd35w2', day: 35, text: 'Set up QR launch page / simple link in bio', completed: false, column: 'work' },
  { id: 'd35a1', day: 35, text: '3 Upwork proposals + Final freelance push on LinkedIn/IG', completed: false, column: 'work' },
  { id: 'd35e1', day: 35, text: '10 creator DMs + Income check: last 5 days to close the gap', completed: false, column: 'evening' },

  // Day 36
  { id: 'd36w1', day: 36, text: 'LAUNCH DAY: Post Reel 22 — THE REVEAL in the morning', completed: false, column: 'work' },
  { id: 'd36w2', day: 36, text: 'Ensure QR automation is LIVE (keyword: revert)', completed: false, column: 'work' },
  { id: 'd36a1', day: 36, text: 'Reply to every comment on Reel 22 + Convert DMs to paid users', completed: false, column: 'work' },
  { id: 'd36e1', day: 36, text: '10 creator DMs: "just launched QuickRevert — check my latest reel"', completed: false, column: 'evening' },

  // Day 37
  { id: 'd37w1', day: 37, text: 'Respond to every DM, comment, and Upwork message', completed: false, column: 'work' },
  { id: 'd37w2', day: 37, text: 'Close every pending deal (freelance, presale, Gumroad, affiliate)', completed: false, column: 'work' },
  { id: 'd37a1', day: 37, text: 'Follow up one last time: "Last chance for early access pricing"', completed: false, column: 'work' },
  { id: 'd37e1', day: 37, text: 'Income check: how close to ₹1L?', completed: false, column: 'evening' },

  // Day 38
  { id: 'd38w1', day: 38, text: 'Final push: follow up on unpaid invoices + bump Upwork proposals', completed: false, column: 'work' },
  { id: 'd38w2', day: 38, text: 'Message "maybe" creators one last time', completed: false, column: 'work' },
  { id: 'd38a1', day: 38, text: 'Count total: freelance + QR + affiliate + Gumroad', completed: false, column: 'work' },
  { id: 'd38e1', day: 38, text: 'Goal: ₹1,00,000 ✨ (38 days of absolute hustle)', completed: false, column: 'evening' },
];

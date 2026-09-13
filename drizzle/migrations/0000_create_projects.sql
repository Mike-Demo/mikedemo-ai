CREATE TABLE public.projects (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  started DATE NOT NULL,
  detail_path TEXT,
  credits JSONB NOT NULL DEFAULT '[]'::jsonb,
  sites JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
  ON public.projects
  FOR SELECT
  USING (true);

INSERT INTO public.projects (slug, name, domain, summary, description, tech, url, icon, started, detail_path, credits, sites) VALUES
('bugle-crowns', 'Bugle Crowns', 'agenticfootballcup.com',
 'My AI agent team in the AWS Agentic Football Cup — five agents, 120-second matches.',
 'Bugle Crowns is my team in the AWS Agentic Football Cup, where AI agents play 120-second football matches against each other. Each of the five positions runs its own agent with its own instructions, and every week''s results feed back into the next round of tactical tuning.',
 ARRAY['AI Agents','AWS','Prompt Engineering'], 'https://agenticfootballcup.com', 'futbol', '2026-09-10', '/bugle-crowns',
 '[{"name":"AWS Agentic Football Cup","url":"https://agenticfootballcup.com"}]'::jsonb, '[]'::jsonb),
('on-device-ai', 'On-Device AI', 'ai.mikedemo.dev',
 'An AI model running inside the page — on-device inference with no server round-trips.',
 'On-Device AI runs a real language model entirely inside the browser. Inference happens on your own hardware via WebLLM and WebGPU — no server round-trips, and no data ever leaves your machine. It includes on-device inference demos, model comparisons, and diagnostics.',
 ARRAY['TypeScript','React','WebLLM','WebGPU'], 'https://ai.mikedemo.dev', 'microchip', '2026-09-11', NULL,
 '[{"name":"WebLLM by MLC AI","url":"https://github.com/mlc-ai/web-llm"},{"name":"WebGPU","url":"https://www.w3.org/TR/webgpu/"}]'::jsonb, '[]'::jsonb),
('ai-deployer', 'AI Deployer', 'local.mikedemo.dev',
 'Copy-and-paste install guides for self-hosted AI agents — no live SSH, no accounts.',
 'AI Deployer generates personalized, copy-and-paste install guides for self-hosted AI agents like OpenClaw, Ollama, and n8n. Pick your stack, get a tailored VPS install guide — no live SSH sessions and no account required.',
 ARRAY['TypeScript','React','TanStack Start','Tailwind CSS','Zod'], 'https://local.mikedemo.dev', 'server', '2026-09-09', NULL,
 '[{"name":"OpenClaw","url":"https://github.com/openclaw"},{"name":"Ollama","url":"https://github.com/ollama/ollama"},{"name":"n8n","url":"https://github.com/n8n-io/n8n"}]'::jsonb, '[]'::jsonb),
('crosspost', 'Crosspost', 'tweet.mikedemo.dev',
 'Crossposting from tweet.app to X, automatically.',
 'Crosspost keeps your posts in sync: write once on tweet.app and it republishes to X automatically. One composer, two timelines, zero copy-pasting.',
 ARRAY['TypeScript','React','TanStack Start','Supabase'], 'https://tweet.mikedemo.dev', 'retweet', '2026-09-06', NULL,
 '[{"name":"tweet.app","url":"https://tweet.app"},{"name":"X","url":"https://x.com"}]'::jsonb, '[]'::jsonb),
('skill-finder-plus', 'Skill Finder Plus', 'skills.mikedemo.dev',
 'A directory of agent skills for Claude, ChatGPT, Cursor, Copilot, Grok, MCP, and Perplexity.',
 'Skill Finder Plus is a browsable library of agent skills across every major AI platform — Claude, ChatGPT, Cursor, GitHub Copilot, Grok, MCP servers, and Perplexity. Find the right skill for your assistant of choice without digging through repos.',
 ARRAY['TypeScript','React','AI SDK','Supabase','hCaptcha'], 'https://skills.mikedemo.dev', 'wand-magic-sparkles', '2026-09-02', NULL,
 '[]'::jsonb, '[]'::jsonb),
('awesome-design-system', 'Design Systems', 'NES + AWESOME',
 'Two complementary design systems powering this portfolio: retro NES pixels and accessible Web Awesome components.',
 'Design Systems combines a retro NES component library with Font Awsome & Web Awesome ("Awesome DS"), pairing expressive pixel styling with accessible components, icons, design tokens, layout utilities, and reusable patterns.',
 ARRAY['TypeScript','React','NES.css','Web Awesome','Font Awesome Free'], 'https://project--9fea97bb-e317-446f-b683-1274350846c6.lovable.app', 'swatchbook', '2026-09-03', NULL,
 '[{"name":"NES.css","url":"https://nostalgic-css.github.io/NES.css/"},{"name":"Web Awesome","url":"https://webawesome.com"},{"name":"Font Awesome Free","url":"https://fontawesome.com"}]'::jsonb,
 '[{"name":"NES Design System","url":"https://project--2d41e7ac-ac8d-4713-844e-300c9d4181e6.lovable.app"},{"name":"Font Awsome & Web Awesome","url":"https://project--9fea97bb-e317-446f-b683-1274350846c6.lovable.app"}]'::jsonb),
('pretendpro', 'PretendPro Office Suite', 'pretend.pro',
 'A fake productivity suite — set up your fake workday.',
 'PretendPro Office Suite is a parody productivity platform built purely for entertainment. Set up your fake workday with mock applications that simulate a convincingly busy environment — spreadsheets that type themselves, meetings that attend themselves, and more.',
 ARRAY['TypeScript','React','Tailwind CSS','shadcn/ui','Supabase'], 'https://pretend.pro', 'user-tie', '2026-08-30', NULL,
 '[]'::jsonb, '[]'::jsonb),
('awesome-adventure-cv', 'Awesome Adventure CV', 'mikedemo.work',
 'A playable résumé as a retro text adventure — type commands to explore a career.',
 'Awesome Adventure CV turns a professional résumé into an interactive, retro-style text adventure. Navigate rooms that represent real career milestones, collect artifacts, and uncover contact details by typing classic adventure commands.',
 ARRAY['TypeScript','React','TanStack Start','Tailwind CSS'], 'https://mikedemo.work/', 'terminal', '2026-08-25', NULL,
 '[]'::jsonb, '[]'::jsonb),
('pride-blobs', 'Pride Blobs', 'blobs.gay',
 'Deterministic pride-flag blobatars from any name — same string, same avatar, every time.',
 'Pride Blobs (Pridatar) is a pride-focused fork of blobatar. Type any name and get a striped pride blobatar rendered as SVG. Fifteen flags, a live playground, and downloadable PNGs, all generated in the browser with no backend.',
 ARRAY['TypeScript','React','SVG','Canvas API'], 'https://blobs.gay', 'palette', '2026-08-24', NULL,
 '[{"name":"blobatar by Alain00 (MIT)","url":"https://github.com/Alain00/blobatar"}]'::jsonb, '[]'::jsonb),
('sta-2e-d20-roller', 'STA 2e D20 Roller — LCARS', '2d20.space',
 'A Star Trek Adventures 2d20 dice roller with an LCARS interface.',
 'STA 2e D20 Roller brings the Star Trek Adventures 2d20 system to the table with a full LCARS-styled interface — challenge dice, momentum, threat, and a dice guide, all wrapped in Starfleet''s favorite operating system.',
 ARRAY['TypeScript','React','Tailwind CSS'], 'https://2d20.space', 'dice-d20', '2026-02-23', NULL,
 '[{"name":"Star Trek Adventures (Modiphius Entertainment)","url":"https://www.modiphius.net"},{"name":"LCARS design by Jim Robertus","url":"https://thelcars.com"}]'::jsonb, '[]'::jsonb);

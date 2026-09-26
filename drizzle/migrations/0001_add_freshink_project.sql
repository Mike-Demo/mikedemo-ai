INSERT INTO public.projects (
  slug,
  name,
  domain,
  summary,
  description,
  tech,
  url,
  icon,
  started,
  detail_path,
  credits,
  sites
)
VALUES (
  'freshink',
  'Fresh Ink',
  'freshink.art',
  'Fresh Ink project site.',
  'Fresh Ink is a live project site available at freshink.art.',
  ARRAY[]::text[],
  'https://freshink.art/',
  'star',
  '2026-09-26',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  domain = EXCLUDED.domain,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  tech = EXCLUDED.tech,
  url = EXCLUDED.url,
  icon = EXCLUDED.icon,
  started = EXCLUDED.started,
  detail_path = EXCLUDED.detail_path,
  credits = EXCLUDED.credits,
  sites = EXCLUDED.sites,
  updated_at = now();

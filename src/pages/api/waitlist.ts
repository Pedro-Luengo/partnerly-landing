import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[waitlist] Supabase env vars missing');
    return json({ ok: false, error: 'not_configured' }, 503);
  }

  let body: { email?: string; source?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const { email = '', source = 'direct', locale = 'en' } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { error } = await supabase.from('waitlist').insert({ email, source, locale });

  // 23505 = unique_violation → already on list, treat as success
  if (!error || error.code === '23505') {
    return json({ ok: true, already: error?.code === '23505' }, 200);
  }

  console.error('[waitlist] Supabase error:', error.code, error.message, error.details);
  return json({ ok: false, error: error.message, code: error.code }, 500);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

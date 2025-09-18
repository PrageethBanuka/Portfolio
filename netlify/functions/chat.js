// Netlify Function: /.netlify/functions/chat
// Map /api/chat -> this function using netlify.toml redirects.
// Env vars in Netlify:
// - OPENAI_API_KEY (required)
// - ALLOWED_ORIGIN (optional)
// - CHAT_MODEL (optional)

export async function handler(event) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { message, history } = body;
    if (!message || typeof message !== 'string') {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid body: expected { message: string, history?: Array }' }) };
    }

    const model = process.env.CHAT_MODEL || 'gpt-4o-mini';
    const messages = [];
    if (Array.isArray(history)) {
      for (const m of history) {
        if (m && typeof m.role === 'string' && typeof m.content === 'string') {
          messages.push({ role: m.role, content: m.content });
        }
      }
    }
    messages.push({ role: 'user', content: message });

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.7 }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return { statusCode: upstream.status, headers: corsHeaders, body: JSON.stringify({ error: 'Upstream error', detail: text }) };
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.';
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ reply }) };
  } catch (err) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error', detail: String(err) }) };
  }
}

// Vercel Serverless Function: /api/chat
// Proxies chat requests to OpenAI securely. Configure env vars in Vercel:
// - OPENAI_API_KEY (required)
// - ALLOWED_ORIGIN (optional, e.g., https://prageethbanuka.github.io)
// - CHAT_MODEL (optional, default: gpt-4o-mini)

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      return res.status(400).json({ error: 'Invalid body: expected { message: string, history?: Array }' });
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
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      return res.status(upstream.status).json({ error: 'Upstream error', detail: text });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.';

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    return res.status(200).json({ reply });
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}

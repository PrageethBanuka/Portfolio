# Portfolio Chatbot: GitHub Pages + Serverless API

Your site is static and hosted on GitHub Pages. To add an AI chatbot securely, the UI runs on Pages and calls a serverless API (on Vercel or Netlify) that holds your API key. If the API is not configured, the chat falls back to simple built-in replies.

## What you already have
- `AIChat.js` UI with:
  - Toggle open/close
  - Send on button or Enter
  - Typing indicator
  - Async `getBotResponse()` which first calls `/api/chat` and falls back to rule-based responses
- `index.html` sets `window.CHAT_API_URL` (optional). If left blank, it will try `/api/chat` relative to the site.

## Option A: Vercel Function (recommended)
1. Copy `api/chat.js` into a Vercel project (you can deploy this repository to Vercel if you want, but you only need the API). Vercel will host it at `https://<your-vercel-app>.vercel.app/api/chat`.
2. In Vercel Project Settings → Environment Variables:
   - `OPENAI_API_KEY` = your key
   - Optional: `ALLOWED_ORIGIN` = `https://<your-username>.github.io` (GitHub Pages origin)
   - Optional: `CHAT_MODEL` = `gpt-4o-mini` (default)
3. Redeploy.
4. In your GitHub Pages repo, set:
   ```html
   <script>
     window.CHAT_API_URL = "https://<your-vercel-app>.vercel.app/api/chat";
   </script>
   ```

## Option B: Netlify Function
1. Netlify will use `netlify/functions/chat.js` with `netlify.toml` routing.
2. On Netlify → Site settings → Environment Variables:
   - `OPENAI_API_KEY` = your key
   - Optional: `ALLOWED_ORIGIN` = `https://<your-username>.github.io`
   - Optional: `CHAT_MODEL`
3. Deploy the site to Netlify. The function will be at `/.netlify/functions/chat` and due to the redirect will also be available at `/api/chat`.
4. On GitHub Pages, set:
   ```html
   <script>
     window.CHAT_API_URL = "https://<your-netlify-site>.netlify.app/api/chat";
   </script>
   ```

## Local quick test (optional)
If you run a local static server, the UI will call `/api/chat`. That will 404 unless you also run an API locally. For quick UI-only testing, leave `window.CHAT_API_URL` empty and rely on the fallback replies.

## Security notes
- Never expose `OPENAI_API_KEY` in client-side code.
- Restrict CORS with `ALLOWED_ORIGIN` to your GitHub Pages domain when possible.

## Troubleshooting
- If messages never arrive and you see a CORS error in DevTools, set `window.CHAT_API_URL` to the fully qualified function URL and configure `ALLOWED_ORIGIN` on the backend.
- If the function returns 500 with `OPENAI_API_KEY is not configured`, add the env var in your function host.

## Alternatives (no server needed)
If you prefer a plug-and-play widget, consider:
- Crisp, Tawk.to, or Chatbase widgets — add their embed script to `index.html` and disable `AIChat.js`.
# TEDDY-XMD ULTRA Frontend

Modern, responsive TEDDY-XMD ULTRA website by Teddy Tech, with a website AI chat and WhatsApp pairing server links.

## Deploy on Vercel

1. Extract this folder and push its contents to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the project root set to this folder. No build command is required for the static frontend; Vercel serves `api/ai.js` as a serverless function.
4. Deploy. The AI chat calls `/api/ai`, which proxies questions to `https://api.neosoft.best/api/ai/gemini`.

## Configure links

Edit `script.js`:
- `servers`: your pairing server URLs.
- `github`: source repository.
- `socials`: community and developer links.

Current contact links:
- Telegram: https://t.me/xdbot1
- WhatsApp channel: https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n
- Developer WhatsApp: https://wa.me/254799963583

## AI chat

The chat UI posts the user's question to `/api/ai`. The Vercel function prepends a TEDDY-XMD ULTRA system prompt (project identity, intended features, official links, setup guidance, and honesty/security rules) before forwarding the question to the Neosoft Gemini endpoint. Edit `SYSTEM_PROMPT` at the top of `api/ai.js` to update the AI's project knowledge. If the provider changes its required query parameter or response format, update `api/ai.js` accordingly. Do not put private API credentials in browser-side JavaScript.

## Branding

Bot: TEDDY-XMD ULTRA  
Brand: Teddy Tech  
Powered by Teddy Tech.

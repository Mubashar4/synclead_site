# SyncLead.io — Marketing Website

Official marketing website and infrastructure showcase for [SyncLead.io](https://synclead.io).

## 🚀 Tech Stack

- **Framework**: [Astro 4.x](https://astro.build/) (Static Site Generation / SSG)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with Dark Cinema Design System v2 tokens
- **Typography**: Self-hosted `@fontsource/instrument-sans`, `@fontsource/instrument-serif`, `@fontsource/jetbrains-mono`
- **JavaScript**: Zero framework overhead — 100% Vanilla JS (MPA architecture)
- **SEO & AI**: Full Open Graph social cards, JSON-LD schemas (Organization, WebSite, SoftwareApplication, FAQPage), and native LLM integration (`/llms.txt`, `/llms-full.txt`)

---

## ☁️ Cloudflare Pages Deployment Guide

This repository is pre-configured and 100% compliant with **Cloudflare Pages**.

### One-Click Cloudflare Pages Settings

1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository: `Mubashar4/synclead_site`.
3. Configure the build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
4. **Environment variables / Node Version**:
   - Cloudflare Pages will automatically read `.nvmrc` (`20`).
   - If needed, you can explicitly add the environment variable: `NODE_VERSION` = `20`.
5. Click **Save and Deploy**.

Cloudflare Pages will build the static output in under 15 seconds and deploy globally across Cloudflare's edge network.

---

## 🤖 LLM & Search Engine Crawlers

The website includes complete, fine-grained accessibility rules and machine-readable context for both search engines and AI models:

- **Robots Policy (`/robots.txt`)**: Explicitly grants crawler access to Googlebot, Bingbot, GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended, meta-externalagent, CCBot, and Cohere.
- **LLM Context Standard (`/llms.txt`)**: Structured markdown summary according to the [llms.txt](https://llmstxt.org/) specification for LLM agents (ChatGPT, Claude, Perplexity, Cursor, Copilot).
- **Comprehensive Knowledge Base (`/llms-full.txt`)**: Exhaustive technical documentation of platform features, deliverability engines, and pricing economics for generative AI citations.
- **Cloudflare Edge Headers (`/_headers`)**: Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), long-term caching for immutable hashed assets (`/_astro/*`), and open CORS for LLM endpoints.
- **Redirects (`/_redirects`)**: Edge redirects for `/app`, `/login`, and `/signup`.
- **Custom 404 (`/404.html`)**: Edge fallback page built via `src/pages/404.astro`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production static output
npm run build

# Preview production build locally
npm run preview
```

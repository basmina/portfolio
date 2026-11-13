# Zamruth Begum — Next.js Portfolio

A ready-to-run Next.js + React + TypeScript portfolio with:

- Portfolio sections: About, Skills, Projects, AI Agents, Architecture, Experience, Education, Contact
- Responsive light theme, lavender/purple accents, and a portrait-free hero with an AI workflow visual
- Live goal planner powered by Anthropic Claude Haiku 5.5, with a clear immediate action after each plan
- Section-aware guide with an illustrated chibi, speech bubble and voice narration
- Mute, pause/resume, replay, previous/next and turn-off controls
- Live design editor: light/dark, colors, fonts, card style, corner radius, motion and section visibility
- Browser localStorage saves design preferences

## Requirements

Node.js 20.9+ and npm (Node 24 is fine).

## Run locally

1. Extract this ZIP.
2. Open the extracted `Zamruth_NextJS_Portfolio` folder in VS Code.
3. Open Terminal in that folder and run:

```bash
npm install
npm run dev
```

4. Visit http://localhost:3000

## Live AI agent setup

The goal planner needs an Anthropic API key. In production, it also needs a persistent Upstash Redis
database to enforce its two-attempt limit across deployments. Create an API key in the
[Anthropic Console](https://console.anthropic.com/) and, for production, a Redis database in
[Upstash](https://upstash.com/), then:

1. Copy `.env.example` to `.env.local`.
2. Set `ANTHROPIC_API_KEY` in `.env.local`.
3. For production, also set `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and
   `AGENT_VISITOR_SECRET` to a random secret of at least 32 characters. Add these to the hosting
   provider's environment settings.
4. Restart `npm run dev`.

Keep all secrets in `.env.local` or your hosting provider's environment settings; never put them in
client-side code or commit them. The planner allows two valid submissions per browser. It uses a
signed, anonymous browser cookie and stores only a hash of that identifier and the attempt count in
Upstash in production; it does not ask visitors for a name or email. Local development uses a
temporary in-memory counter when no Upstash configuration is present; it resets when the dev server
restarts. This identifies a browser, not a person: clearing its cookies or using another
browser/device creates a new anonymous identifier. A per-person limit would require sign-in or
another verified identity.

The server sends the visitor's goal and selected audience to Anthropic. Attempts are consumed when a
valid request is submitted, including if the AI provider then fails. Visitors are warned not to
submit private or sensitive information. Set provider spending limits before exposing the planner to
significant public traffic.

## Production

```bash
npm run build
npm start
```

## Formatting

Prettier is configured for the project. VS Code formats files on save when the
recommended Prettier extension is installed. You can also format the project with
`npm run format` or check formatting with `npm run format:check`.

## Where to edit

- `src/components/portfolio.tsx` — portfolio text, project data, narration, controls and React state.
- `src/app/globals.css` — design, responsive layout and CSS mascot.
- `src/app/layout.tsx` — SEO title and description.
- `public/` — add your own images and assets.

## Guide notes

The guide is enabled by default. It follows sections with IntersectionObserver. Voice uses the browser SpeechSynthesis API; choose a narration voice in Customize from the voices available on the current device. Browsers can require an initial user interaction before allowing speech. The guide can be muted, paused, replayed, navigated, or fully turned off and reopened.

## Content and confidentiality

DoIt Coach is marked as a deployed personal project. Employee Management API and PostgreSQL/Prisma are marked as learning work. The architecture diagram is conceptual. Client work is anonymized; do not add confidential client screenshots or proprietary assets without permission. Verify resume dates, metrics and links before publishing.

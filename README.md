# Chat to Follow-Up

MVP Next.js app that turns pasted customer chats into follow-up insights and ready-to-send replies.

## Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Lightweight shadcn-style UI components
- Zod validation

## Local setup
```bash
npm install
npm run dev
```

Open:
- `http://localhost:3000/` landing page
- `http://localhost:3000/app` generator

## Environment
Copy `.env.example` to `.env.local`.
- If `OPENAI_API_KEY` is missing, API runs in mock mode.
- If key is set, `/api/generate` calls the model helper.

## Structure
- `app/` routes and API
- `components/landing` landing UI
- `components/app` generator UI
- `prompts/` prompt templates
- `lib/` model and parsing helpers
- `types/` zod schemas and types
- `data/` sample and mock content

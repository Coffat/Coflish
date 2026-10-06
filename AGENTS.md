# AGENTS.md — IELTS Study Web

Web app tự học IELTS (mục tiêu 7.0) với AI free-tier. UI tiếng Việt.
Kiến trúc client-server: Next.js frontend + Node.js API, MongoDB lưu dữ liệu,
Redis làm cache/rate-limit/queue.

## Stack

- Next.js 15 (App Router) + TypeScript strict + Tailwind CSS, runtime Node.js
- Database: **MongoDB** via Mongoose — users, decks, cards, quiz attempts,
  error log, study stats
- **Redis** — cache kết quả AI (TTL 24h), rate-limit `/api/*`, queue job nặng
  (transcribe, chấm writing dài) bằng BullMQ
- AI: Gemini API (primary, free tier) → Groq (fallback) — xem `docs/rules/ai-integration.md`
- STT: Groq Whisper free · TTS: Web Speech API (built-in trình duyệt)
- pnpm · Test: Vitest + mongodb-memory-server + ioredis-mock, Playwright e2e

## Lệnh

```bash
docker compose up -d   # MongoDB + Redis local (lần đầu)
pnpm dev               # chạy local
pnpm build             # build production (phải pass trước khi merge)
pnpm lint              # eslint
pnpm typecheck         # tsc --noEmit
pnpm test              # vitest
pnpm test:e2e          # playwright
```

## Cấu trúc

```
app/                     # routes (App Router)
app/api/                 # Route Handlers (Node.js runtime, không edge khi cần Mongoose)
features/<domain>/       # flashcard, quiz, writing, speaking, listening, dashboard
  components/ hooks/
models/                  # Mongoose schemas: User, Deck, Card, QuizAttempt, ErrorItem, StudyDay
lib/db/mongo.ts          # connection singleton (cache trong globalThis)
lib/redis.ts             # Redis client singleton
lib/queue/               # BullMQ queues: transcribe, grade-writing
lib/ai/                  # provider abstraction: types + gemini.ts + groq.ts + fallback.ts
lib/srs/                 # thuật toán spaced repetition (SM-2)
prompts/                 # prompt templates có version (writing-grader.v1.ts, ...)
design/                    # DESIGN.md + SCREEN_MAP.md + STITCH.md sync từ Stitch (nguồn sự thật về UI)
docs/rules/              # rule chi tiết
docs/workflows/          # quy trình làm việc
docs/domain/             # business logic (quiz, grading, SRS) — đọc khi làm feature AI
.agents/skills/       # engineering skills (chuẩn Antigravity)
.github/workflows/       # CI/CD
```

## Quy ước bắt buộc

1. **TypeScript strict, cấm `any`** — dùng `unknown` + type guard khi parse output AI.
2. Mọi output JSON từ AI phải validate bằng **zod schema** trước khi lưu MongoDB.
3. **Không hardcode secret** — `MONGODB_URI`, `REDIS_URL`, API key chỉ từ env
   server-side, xem `docs/rules/security.md`.
4. Mongoose: mọi query read dùng `.lean()`, field tra cứu phải có index
   (xem `docs/rules/coding-style.md`).
5. UI copy tiếng Việt, tone thân thiện như mentor; nội dung học tập tiếng Anh.
6. Component < 200 dòng; logic nghiệp vụ tách ra `lib/`, không để trong component.
7. Mọi tính năng AI mới phải có **fallback**: primary fail → provider dự phòng →
   báo lỗi thân thiện. Kết quả AI giống nhau thì **cache Redis 24h**.
8. Job > 10s (transcribe audio dài, chấm writing) chạy qua **BullMQ queue**,
   client poll trạng thái — không giữ request HTTP treo.
9. Commit theo Conventional Commits (`feat:`, `fix:`, `docs:`...).

## Quy trình làm feature (vibe-code loop)

1. Đọc `docs/rules/*.md` liên quan + skill trong `.agents/skills/` trước khi code.
2. Viết spec ngắn trong PR description: input/output, schema Mongo thay đổi gì,
   edge cases.
3. Code → `pnpm typecheck && pnpm lint && pnpm test` phải xanh.
4. Logic SRS/chấm điểm: bắt buộc có unit test. Schema Mongo đổi → viết
   migration script trong `lib/db/migrations/`.
5. Không tự ý nâng scope — việc ngoài spec thì hỏi trước.

## Definition of done

- Build pass, không warning TS/eslint mới
- Test xanh (unit + integration với mongodb-memory-server)
- Không secret nào lọt vào repo (`git grep -i apikey` trước khi push)
- API mới có rate-limit + validate zod + ghi log lỗi có requestId

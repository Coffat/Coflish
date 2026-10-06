# Workflow: Feature Workflow (vòng lặp vibe-code)

Áp dụng cho mọi feature/tính năng mới. AI agent (hoặc bạn + AI) đi qua đủ
6 bước, không nhảy cóc.

## 1. Đọc context (bắt buộc)

- `AGENTS.md` + `docs/rules/*.md` liên quan.
- Skill trong `.agents/skills/` phù hợp (vd: API mới → `developing-nodejs-api`); business logic đọc `docs/domain/` + `prompts/`.
- Code hiện có của domain đó (`features/<domain>/`, `models/`, `app/api/`).

## 2. Viết spec ngắn (trong PR description hoặc `docs/specs/<ten>.md`)

- Input/output, JSON schema (nếu có).
- Schema MongoDB thay đổi gì → migration nào.
- Edge cases: AI fail, quota hết, input xấu, user chưa nhập API key.
- Không code khi spec chưa rõ — hỏi trước.

## 3. Plan

- Liệt kê file tạo/sửa, thứ tự làm.
- Đánh dấu chỗ cần test mới.
- Nếu > 8 file hoặc đụng nhiều domain → chia PR nhỏ.

## 4. Implement

- Theo `docs/rules/coding-style.md` và `ai-integration.md`.
- API mới: zod validate + rate-limit + `requestId` trong log.
- Không scope-creep: việc ngoài spec → ghi vào backlog, không code luôn.

## 5. Verify

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

- Logic SRS/chấm điểm: unit test mới phải có.
- Đổi prompt version → chạy test `@ai-live` thủ công (xem `prompt-review.md`).

## 6. Review checklist (tự review trước khi báo xong)

- [ ] Không secret trong diff
- [ ] Không `any`, không `// @ts-ignore`
- [ ] Output AI validate zod
- [ ] Có fallback khi AI fail
- [ ] Mobile 360px không vỡ layout
- [ ] Commit message đúng Conventional Commits

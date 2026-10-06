# Domain: quiz-generator

Sinh bộ câu hỏi trắc nghiệm / flashcard từ văn bản hoặc ảnh (OCR trước),
phục vụ học từ vựng, ngữ pháp và reading theo chủ đề IELTS.

## Khi nào dùng

- User bấm "Tạo bộ học từ tài liệu" (paste text / upload ảnh / PDF).
- Sinh quiz ôn tập từ "sổ lỗi sai" (input = danh sách lỗi).
- Sinh quiz từ vựng theo chủ đề (input = chủ đề + trình độ).

## Input

```ts
{
  sourceText: string;        // text đã OCR/làm sạch, ≤ 4000 ký tự
  target: 'vocab' | 'grammar' | 'mixed';
  level: 'A2' | 'B1' | 'B2'; // trình độ user hiện tại
  count: number;             // 5..20
  lang: 'vi';                // ngôn ngữ giải thích
}
```

## Output JSON schema (bắt buộc validate bằng zod)

```json
{
  "items": [
    {
      "id": "q1",
      "type": "mcq",
      "question": "Choose the correct word: She is ___ in learning English.",
      "options": ["interested", "interesting", "interest", "interests"],
      "answer": 0,
      "explanation_vi": "'be interested in' + V-ing: thích làm gì.",
      "tag": "preposition"
    }
  ]
}
```

- `type`: `mcq` (trắc nghiệm) hoặc `flashcard` (`question` = từ, `options` = [],
  `answer` = nghĩa + ví dụ).
- Distractor (đáp án nhiễu) phải hợp lý, không quá dễ loại trừ.
- Mỗi câu có `tag` để gom vào sổ lỗi sai khi user làm sai.

## Prompt template — `prompts/quiz-generator.v1.ts`

```
You are an IELTS teacher creating practice questions for a Vietnamese student
at {level} level. Generate {count} {target} questions from the text below.

Rules:
- Questions test understanding, not memorization of the text.
- MCQ: 4 options, exactly 1 correct, plausible distractors.
- Explanations in Vietnamese, short (1-2 sentences), teach the rule not just the answer.
- Output ONLY valid JSON matching this schema: {schema}
- No markdown fences, no commentary.

---SOURCE TEXT---
{sourceText}
```

## Lưu ý

- Text OCR thường lỗi chính tả → làm sạch cơ bản trước khi gửi AI, và dặn AI
  bỏ qua lỗi OCR không ảnh hưởng nghĩa.
- Nếu `sourceText` quá ngắn (< 200 ký tự) → báo user bổ sung, không cố sinh.
- Cache Redis 24h theo hash input (xem `docs/rules/ai-integration.md`).

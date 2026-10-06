# Domain: vocab-extractor

Trích từ vựng đáng học từ ảnh chụp / PDF / text, lọc theo trình độ user,
sinh flashcard có nghĩa, phiên âm, ví dụ và collocation.

## Khi nào dùng

- User upload ảnh sách/báo/menu → OCR → trích từ → tạo deck mới.
- User paste đoạn văn → trích từ vựng theo chủ đề.

## Input

```ts
{
  sourceText: string;   // text sau OCR, ≤ 4000 ký tự
  level: 'A2' | 'B1' | 'B2';
  maxWords: number;     // 10..30
  knownWords?: string[];// từ user đã thuộc → loại trừ
}
```

## Output JSON schema

```json
{
  "cards": [
    {
      "word": "beneficial",
      "pos": "adjective",
      "ipa": "/ˌben.ɪˈfɪʃ.əl/",
      "meaning_vi": "có lợi",
      "example": "Regular exercise is beneficial for health.",
      "example_vi": "Tập thể dục đều đặn có lợi cho sức khỏe.",
      "collocations": ["beneficial for", "highly beneficial"],
      "level": "B1"
    }
  ]
}
```

## Prompt template — `prompts/vocab-extractor.v1.ts`

```
You are a vocabulary coach for a Vietnamese IELTS student at {level} level.
Extract up to {maxWords} most useful words from the text below.

Rules:
- Skip: words the student certainly knows at {level}, proper nouns, OCR garbage.
- Prefer: academic words, collocations, words with high IELTS frequency.
- meaning_vi: short, natural Vietnamese (not word-by-word translation).
- example: one natural sentence using the word in an IELTS-like context.
- Output ONLY valid JSON matching this schema: {schema}

---TEXT---
{sourceText}
```

## Lưu ý

- OCR: dùng Tesseract.js (client) cho ảnh đơn giản; ảnh phức tạp → gửi AI
  vision (Gemini) đọc trực tiếp.
- Sau khi sinh: cho user **duyệt/tick chọn** trước khi lưu vào MongoDB —
  không nhồi deck bằng từ rác.
- Card lưu vào collection `cards` với `deckId`, `nextReview` phục vụ SRS
  (xem skill `srs-scheduler`).
- Cache Redis 24h theo hash sourceText.

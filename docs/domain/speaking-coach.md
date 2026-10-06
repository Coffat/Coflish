# Domain: speaking-coach

Mock test Speaking đủ 3 parts với AI examiner + chấm 4 tiêu chí.
Luồng: TTS đọc câu hỏi (Web Speech API) → user trả lời bằng giọng nói →
Whisper transcribe → AI chấm.

## Khi nào dùng

- Chế độ "Thi thử Speaking": Part 1 (4-5 câu hỏi ngắn) → Part 2 (cue card,
  1 phút chuẩn bị + 1-2 phút nói) → Part 3 (thảo luận sâu).
- Chế độ "Luyện 1 câu": user chọn câu hỏi, trả lời, nhận feedback nhanh.

## Input

```ts
{
  mode: 'full_mock' | 'single';
  part: 1 | 2 | 3;
  question: string;      // câu hỏi / cue card
  transcript: string;    // bản transcribe từ Whisper
  audioSeconds: number;  // để đánh giá fluency (nói quá ngắn = trừ)
}
```

## Output JSON schema

```json
{
  "bands": {
    "fluency_coherence": 6.0,
    "lexical_resource": 6.0,
    "grammatical_range": 5.5,
    "pronunciation": 6.0
  },
  "overall": 6.0,
  "transcript_fixed": "bản transcript đã sửa lỗi nghe nhầm (nếu có)",
  "issues": [
    {
      "quote": "I go to market yesterday.",
      "issue_vi": "Sai thì: yesterday phải dùng quá khứ đơn.",
      "correction": "I went to the market yesterday.",
      "criterion": "grammatical_range"
    }
  ],
  "better_answer_vi": "Gợi ý dàn ý trả lời tốt hơn (3-4 bullet tiếng Việt).",
  "feedback_vi": "Nhận xét 3-4 câu: điểm mạnh + 2 việc sửa ngay."
}
```

## Prompt template — `prompts/speaking-coach.v1.ts`

```
You are a certified IELTS speaking examiner. The student answered Part {part}:

Question: {question}
Transcript (may contain minor STT errors, correct them mentally): {transcript}
Speaking time: {audioSeconds}s (expected: Part 1 ~20-30s/answer, Part 2 60-120s)

Grade fluency_coherence, lexical_resource, grammatical_range_accuracy,
pronunciation (estimate from transcript: unnatural phrasing, wrong word stress
patterns) in 0.5 increments. Be strict but fair.

Note: very short answers cap Task Response — mention it explicitly.
Give up to 6 key issues with corrections, and a better answer outline.
Write issues' explanations and feedback in Vietnamese.

Output ONLY valid JSON matching this schema: {schema}
```

## Ngân hàng câu hỏi

- Lưu trong MongoDB collection `speaking_questions`, seed sẵn theo Part và chủ đề
  (hometown, work, technology, environment...).
- Part 2 cue card có sẵn gợi ý 4 bullet để user bám vào khi nói.

## Lưu ý kỹ thuật

- Transcribe qua Groq Whisper (`whisper-large-v3-turbo`); audio > 60s → qua
  queue `transcribe`.
- **Pronunciation**: AI text không nghe được giọng thật — chỉ đánh giá gián tiếp
  qua transcript + riêng module "shadowing score" so sánh nhịp (phase 2).
  Ghi rõ giới hạn này trong UI, không chấm bừa.
- Audio của user không lưu lâu: xóa file sau khi transcribe xong (giữ transcript).

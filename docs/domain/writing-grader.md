# Domain: writing-grader

Chấm bài Writing IELTS (Task 1 & Task 2) theo đúng 4 tiêu chí band descriptors,
trả điểm từng tiêu chí + overall, chỉ lỗi cụ thể và gợi ý viết lại.

## Khi nào dùng

- User nộp bài Writing (paste text hoặc upload) → chấm qua BullMQ queue
  (`grade-writing`), vì thường > 10s.

## Input

```ts
{
  taskType: 'task1' | 'task2';
  question: string;   // đề bài
  answer: string;     // bài làm, ≤ 2000 từ (validate trước)
  targetBand: number; // vd: 6.5 — để feedback đúng tầm
}
```

## Output JSON schema

```json
{
  "bands": {
    "task_achievement": 6.0,
    "coherence_cohesion": 6.0,
    "lexical_resource": 5.5,
    "grammatical_range": 6.0
  },
  "overall": 6.0,
  "errors": [
    {
      "sentence": "She go to school every day.",
      "issue_vi": "Thiếu -s ở động từ ngôi thứ 3 số ít.",
      "correction": "She goes to school every day.",
      "criterion": "grammatical_range"
    }
  ],
  "rewrites": [
    {
      "original": "This is very good for health.",
      "better": "This is highly beneficial for health.",
      "why_vi": "'highly beneficial' học thuật hơn 'very good'."
    }
  ],
  "feedback_vi": "Nhận xét tổng quan 3-5 câu bằng tiếng Việt: điểm mạnh, 2 việc cần sửa ngay."
}
```

- Điểm theo nấc 0.5. `overall` = trung bình 4 tiêu chí, làm tròn theo quy tắc IELTS.
- `errors` tối đa 8 lỗi nghiêm trọng nhất (ưu tiên lỗi lặp lại).
- `rewrites` tối đa 5 câu — chọn câu nâng band hiệu quả nhất, không rewrite cả bài.

## Prompt template — `prompts/writing-grader.v1.ts`

```
You are a certified IELTS examiner grading a Writing {taskType} for a Vietnamese
student targeting band {targetBand}. Use official IELTS band descriptors.

Question:
{question}

---STUDENT ANSWER---
{answer}

Grade each criterion (task_achievement/task_response, coherence_cohesion,
lexical_resource, grammatical_range_accuracy) in 0.5 increments. Be strict but
fair: do not inflate scores.

List up to 8 most important errors with corrections, and up to 5 sentence
rewrites that would most raise the band. Write errors' explanations and overall
feedback in Vietnamese.

Output ONLY valid JSON matching this schema: {schema}
```

## Band descriptors rút gọn (nhúng vào prompt)

- **TA/TR**: Task 1 — overview rõ + data chọn lọc; Task 2 — trả lời đủ ý, lập trường rõ.
- **CC**: đoạn văn mạch lạc, dùng cohesive devices tự nhiên (không nhồi).
- **LR**: collocation chuẩn, paraphrase đề, tránh lặp từ; lỗi spelling ảnh hưởng nhẹ.
- **GRA**: mix câu đơn/phức, lỗi không cản trở hiểu = band 6+.

## Lưu ý

- Không cache (mỗi bài là duy nhất). Timeout 60s, fail → retry 1 lần → báo lỗi.
- Bài < 50 từ → từ chối chấm, nhắc yêu cầu độ dài tối thiểu.
- Nghiêm cấm nâng điểm để "động viên" — mentor cần sự thật.

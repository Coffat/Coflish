# Domain: srs-scheduler

Đặc tả thuật toán Spaced Repetition (SM-2) dùng cho flashcard. Code trong
`lib/srs/`, logic thuần — không gọi AI.

## Khi nào dùng

- Tính `nextReview` sau mỗi lần user trả lời flashcard.
- Query "đến hạn ôn hôm nay": `Card.find({ nextReview: { $lte: now } })`.

## Thuật toán SM-2 (rút gọn)

Mỗi card lưu: `easeFactor` (mặc định 2.5), `interval` (ngày), `repetitions`.

User tự đánh giá sau khi lật card: `quality` 0..5
(0 = quên hẳn, 3 = nhớ khó khăn, 5 = nhớ dễ).

```
if quality < 3:
    repetitions = 0
    interval = 1          # học lại ngày mai
else:
    if repetitions == 0: interval = 1
    elif repetitions == 1: interval = 6
    else: interval = round(interval * easeFactor)
    repetitions += 1

easeFactor += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
easeFactor = max(easeFactor, 1.3)

nextReview = now + interval days
```

## Quy ước UI (đơn giản cho user)

- Hiện 3 nút thay vì 0-5: **Quên** (=0), **Nhớ khó** (=3), **Nhớ dễ** (=5).
- Card mới học lần đầu: mặc định `interval = 1` sau lần đúng đầu tiên.

## Schema MongoDB (`models/Card.ts`)

```ts
{
  deckId: ObjectId (index),
  front: string, back: string,       // từ / nghĩa (+ ipa, ví dụ)
  easeFactor: { type: Number, default: 2.5 },
  interval: { type: Number, default: 0 },      // ngày
  repetitions: { type: Number, default: 0 },
  nextReview: { type: Date, index: true },
  lastReviewed: Date,
}
```

## Test bắt buộc (Vitest)

- quality < 3 → repetitions reset 0, interval = 1.
- Chuỗi 5,5,5 → interval = 1, 6, ~15 (2.5^2 × 6).
- easeFactor không bao giờ < 1.3.
- nextReview tính đúng theo timezone server (lưu UTC).

## Lưu ý

- Không cần AI cho SRS — đây là logic toán thuần, phải deterministic.
- Dashboard "hôm nay cần ôn N từ" = count query `nextReview <= today`.

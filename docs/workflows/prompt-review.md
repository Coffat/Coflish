# Workflow: Prompt Review (đổi prompt version)

Prompt là "code" — đổi prompt có thể làm thay đổi chất lượng chấm bài.
Quy trình này áp dụng mỗi khi sửa file trong `prompts/`.

## 1. Tạo version mới, không sửa version cũ

- Copy `prompts/<ten>.vN.ts` → `prompts/<ten>.vN+1.ts`.
- Version cũ giữ nguyên để rollback. Route Handler trỏ sang version mới
  bằng hằng số `CURRENT_PROMPT_VERSION` trong `lib/ai/config.ts`.

## 2. Test `@ai-live` thủ công (bắt buộc)

Chuẩn bị bộ test cố định cho từng skill:

| Skill | Bộ test |
|---|---|
| writing-grader | 3 bài mẫu: band ~5.0, ~6.5, ~7.5 (lưu trong `prompts/__fixtures__/`) |
| speaking-coach | 3 transcript mẫu: ngắn/cụt, trung bình, tốt |
| quiz-generator | 2 đoạn text: ngắn (< 200 từ), chuẩn (~1000 từ) |
| vocab-extractor | 1 ảnh OCR lỗi + 1 đoạn văn sạch |

Chạy script: `pnpm prompt:test <skill> <version>` → so sánh output với
version cũ: điểm có lệch > 1.0 band? JSON có valid? Có "nịnh" điểm không?

## 3. Tiêu chí pass

- JSON valid 100% (5/5 lần chạy).
- Điểm các bài fixture lệch ≤ 0.5 band so với version cũ (trừ khi version mới
  cố ý strict hơn — ghi rõ trong PR).
- Không nâng điểm vô lý, không hạ điểm oan bài tốt.

## 4. Merge & theo dõi

- Ghi changelog ngắn trong PR: đổi gì, vì sao, kết quả test fixture.
- Sau deploy 3 ngày: kiểm tra log — tỉ lệ AI fail/parse error có tăng không.
- Có vấn đề → rollback bằng cách đổi `CURRENT_PROMPT_VERSION` về cũ (1 dòng).

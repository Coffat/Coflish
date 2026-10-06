# Setup Stitch MCP cho Antigravity

Stitch (stitch.withgoogle.com) là tool design AI miễn phí của Google Labs.
MCP server cho phép agent trong Antigravity đọc trực tiếp project, screens và
design tokens — không cần copy-paste spec thủ công.

## 1. Lấy API key

- Vào stitch.withgoogle.com → Profile → Settings → API key, hoặc
- Chạy wizard một lệnh (tự lo auth + config):
  ```bash
  npx @_davideast/stitch-mcp init
  ```

## 2. Thêm MCP server vào Antigravity

**Cách A — qua proxy CLI (khuyên dùng, tự refresh token):**

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  }
}
```

**Cách B — remote server chính thức của Google:**

- Endpoint: `https://stitch.googleapis.com/mcp`
- Auth header: `X-Goog-Api-Key: <key lấy ở bước 1>`

Thêm vào phần MCP settings của Antigravity, sau đó restart IDE/agent session.

## 3. Kiểm tra

Trong Antigravity, yêu cầu agent liệt kê Stitch projects. Nếu thấy danh sách
project → thành công. Ghi project ID của dự án IELTS web vào
`design/STITCH.md`:

```md
# Stitch project
- Project ID: <paste-id>
- Tên: IELTS Study Web
```

## 4. Quy trình sync (nhắc lại trong skill frontend)

1. Thiết kế / chỉnh sửa màn hình trong Stitch.
2. Agent pull `DESIGN.md` (design tokens) → lưu `design/DESIGN.md`, commit.
3. Agent pull screen code từng màn hình → convert sang component Next.js.
4. Sync **một chiều** Stitch → code. Design đổi → pull lại, không sửa ngược.

## Lưu ý

- Stitch là Google Labs experiment, miễn phí ở thời điểm hiện tại; quota có
  thể thay đổi — kiểm tra tại stitch.withgoogle.com nếu tool báo lỗi quota.
- Không commit API key vào repo. Key nằm ở MCP config local của máy bạn.

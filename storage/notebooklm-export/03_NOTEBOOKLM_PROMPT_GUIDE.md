# 🧠 CẨM NANG KHAI THÁC DỰ ÁN HOME MONI TRÊN GOOGLE NOTEBOOKLM
> **Mục tiêu:** Hướng dẫn cách tương tác, cấu hình persona và các câu hỏi mẫu để NotebookLM hỗ trợ bạn hiệu quả nhất.

---

## 🎭 1. CẤU HÌNH VAI TRÒ CHO NOTEBOOKLM (CUSTOM PERSONA)

Khi mở Notebook mới trên [NotebookLM](https://notebooklm.google.com/), bạn hãy cấu hình vai trò của Notebook trong ô chat bằng cách gửi prompt mở đầu sau:

> *"Bạn là Lead Fintech Architect & Cố Vấn Tài Chính Gia Đình cấp cao của dự án HOME MONI. Dự án này được thiết kế riêng cho tổ ấm của Anh Chuột (Chồng) và Bé Mèo (Vợ). Hãy dựa 100% vào các tài liệu kiến trúc và toàn bộ mã nguồn Next.js/TypeScript được cung cấp trong nguồn để trả lời các câu hỏi về nghiệp vụ, logic tính toán, số dư thẻ tín dụng, kiến trúc mã nguồn và đề xuất tính năng mới mà không bịa đặt (hallucinate)."*

---

## 🧪 2. BỘ CÂU HỎI KIỂM THỬ MỨC ĐỘ HIỂU DỰ ÁN (VERIFICATION TESTS)

Hãy gửi lần lượt các câu hỏi sau vào NotebookLM để kiểm chứng AI đã đọc hiểu chính xác 100% ngữ cảnh:

### Câu 1: Về cơ cấu tài khoản & thẻ tín dụng
- **Prompt:** *"Liệt kê danh sách các tài khoản ngân hàng và thẻ tín dụng của Anh Chuột và Bé Mèo trong dự án này? Thẻ tín dụng của Anh Chuột có hạn mức bao nhiêu, ngày sao kê và hạn trả nợ là ngày nào?"*
- **Kỳ vọng AI trả lời:** 
  - Anh Chuột: Vietinbank (lương), BIDV (chi tiêu), BIDV Credit 50.000.000 ₫ (sao kê ngày 20, trả ngày 25).
  - Bé Mèo: Vietcombank (lương), ACB (chi tiêu), BIDV Credit 20.000.000 ₫ (sao kê ngày 22, trả ngày 28).
  - Quỹ chung: Tiền mặt gia đình `acc_family_cash`.

### Câu 2: Về quy tắc hạch toán thẻ tín dụng
- **Prompt:** *"Trong dự án này, trường currentBalance của thẻ tín dụng đại diện cho cái gì? Khi quẹt thẻ chi tiêu thì currentBalance tăng hay giảm, và công thức tính Tài sản ròng (Net Worth) được xác định như thế nào?"*
- **Kỳ vọng AI trả lời:**
  - `currentBalance` là **DƯ NỢ ĐANG DÙNG** (khoản nợ ngân hàng).
  - Chi tiêu làm TĂNG dư nợ. Trả nợ thẻ làm GIẢM dư nợ.
  - Net Worth = Tổng ví khả dụng + Đầu tư - Nợ vay ngoài - Dư nợ 2 thẻ tín dụng BIDV.

### Câu 3: Về cấu trúc code và Local-First
- **Prompt:** *"Dữ liệu của dự án được lưu trữ ở đâu? Tên storage key là gì? File nào đảm nhận việc tính toán lại số dư các tài khoản sau mỗi giao dịch?"*
- **Kỳ vọng AI trả lời:**
  - Lưu trữ Local-First trên trình duyệt qua key `HOME_MONI_DATA_V4`.
  - Hàm `recalculateAccountBalances` trong file `lib/storage.ts` đảm nhận việc tính toán lại số dư.

---

## 💡 3. CÁC PROMPT KHAI THÁC SỨC MẠNH CỦA NOTEBOOKLM

### A. Đề xuất tính năng & Kiến trúc code
> *"Tôi muốn bổ sung tính năng Phân bổ ngân sách theo quy tắc 50/30/20 cho 2 vợ chồng trong trang PlanningView. Hãy dựa vào mô hình dữ liệu hiện tại trong types/finance.ts và FinanceContext.tsx để phác thảo các trường dữ liệu cần bổ sung và logic tính toán."*

### B. Kiểm tra bảo mật & Rà soát Bug
> *"Rà soát toàn bộ file lib/storage.ts và context/FinanceContext.tsx để kiểm tra xem có trường hợp ngoại lệ nào khi xóa giao dịch chuyển khoản thanh toán thẻ tín dụng mà số dư thẻ không được hoàn nguyên chính xác không?"*

### C. Tạo Bản Tóm Tắt Radio (Audio Overview)
> 1. Trên giao diện NotebookLM, nhìn sang cột bên phải mục **Notebook guide**.
> 2. Bấm nút **Generate** tại phần **Audio Overview (Deep Dive)**.
> 3. AI sẽ tự động tạo một đoạn podcast đàm thoại 2 người bằng tiếng Anh thảo luận cực kỳ sinh động về cách Anh Chuột & Bé Mèo quản lý 2 thẻ tín dụng BIDV và vun đắp tài chính cho tổ ấm!

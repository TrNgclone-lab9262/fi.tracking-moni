import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const exportDir = path.join(rootDir, 'storage', 'notebooklm-export');

// Đảm bảo thư mục xuất tồn tại
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

console.log('🚀 Bắt đầu đóng gói tài liệu cho Google NotebookLM...');

// -------------------------------------------------------------
// 1. TẠO TẬP TIN 01: KIẾN TRÚC & QUY TẮC NGHIỆP VỤ HỆ THỐNG
// -------------------------------------------------------------
console.log('📦 Đang tạo 01_HOME_MONI_ARCHITECTURE.md...');

const projectStateContent = fs.existsSync(path.join(rootDir, 'PROJECT_STATE.md'))
  ? fs.readFileSync(path.join(rootDir, 'PROJECT_STATE.md'), 'utf-8')
  : '';

const agentsMdContent = fs.existsSync(path.join(rootDir, 'AGENTS.md'))
  ? fs.readFileSync(path.join(rootDir, 'AGENTS.md'), 'utf-8')
  : '';

const uiuxSkillContent = fs.existsSync(path.join(rootDir, '.agents', 'skills', 'lovely-money-uiux', 'SKILL.md'))
  ? fs.readFileSync(path.join(rootDir, '.agents', 'skills', 'lovely-money-uiux', 'SKILL.md'), 'utf-8')
  : '';

const architectureDoc = `# 🏛️ HOME MONI - TÀI LIỆU KIẾN TRÚC HỆ THỐNG & ĐẶC TẢ NGHIỆP VỤ
> **Dự án:** HOME MONI (Nền tảng Quản lý Tài chính Gia đình & Tổ ấm Song Hành)  
> **Phiên bản:** v3.3 (Streamlined Sidebar UX Edition)  
> **Thời gian đóng gói:** ${new Date().toISOString()}  
> **Storage Key hoạt động:** \`HOME_MONI_DATA_V4\`  
> **Kiến trúc cốt lõi:** Local-First (LocalStorage trình duyệt, Không backend server, Chuẩn PWA di động)

---

## 👨‍👩‍👧 1. TỔ TỔNG QUAN VÀ ĐỊNH VỊ CHỦ THỂ GIA ĐÌNH

### 1.1. Tôn chỉ & Tên thương hiệu
- **Tên ứng dụng:** **HOME MONI** (Home Moni).
- **Khẩu hiệu:** *"Tổ ấm hạnh phúc - Tài chính minh bạch - Vun vén tương lai"*.
- **Ý nghĩa biểu tượng:** Ngôi nhà đan xen trái tim và đồng xu tượng trưng cho sự gắn kết vợ chồng cùng vun đắp tổ ấm.

### 1.2. Ba góc nhìn tài chính cốt lõi (Perspective Switcher)
Hệ thống cung cấp thanh lọc góc nhìn trên đầu trang (TopBar Header) để chuyển đổi nhanh:
1. **🏡 My Home (Tổ ấm / Quỹ chung):** Tổng hợp bức tranh tài sản ròng, tổng thu nhập, tổng chi tiêu và ngân sách của toàn bộ gia đình.
2. **👨 Anh Chuột (Chồng):** Tập trung xem các tài khoản lương Vietinbank, tài khoản chi tiêu BIDV, thẻ tín dụng BIDV 50M và các giao dịch do Anh Chuột phụ trách.
3. **👩 Bé Mèo (Vợ):** Tập trung xem tài khoản lương Vietcombank, tài khoản chi tiêu ACB, thẻ tín dụng BIDV 20M và các giao dịch do Bé Mèo phụ trách.

---

## 💳 2. HỆ THỐNG TÀI KHOẢN THỰC TẾ & HẠN MỨC THẺ TÍN DỤNG

Bảng cấu trúc 6 tài khoản ngân hàng + 1 quỹ tiền mặt cố định:

| Chủ Sở Hữu | Tên Tài Khoản | Loại | Vai Trò Nghiệp Vụ | Hạn Mức / Chu Kỳ Sao Kê | Mã Màu Nhận Diện |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **👨 Anh Chuột** | \`acc_husband_vietinbank\` | BANK | Chính - Nhận lương Anh Chuột | Tài khoản thanh toán | \`#005CA9\` (Vietinbank) |
| **👨 Anh Chuột** | \`acc_husband_bidv\` | BANK | Phụ - Chi tiêu sinh hoạt hằng ngày | Tài khoản thanh toán | \`#0A6E3F\` (BIDV) |
| **👨 Anh Chuột** | \`acc_husband_bidv_credit\` | CREDIT_CARD | Thẻ tín dụng mua sắm trả sau | **Hạn mức: 50.000.000 ₫**<br>Sao kê ngày 20, Trả ngày 25 | \`#1E3A8A\` (Navy BIDV) |
| **👩 Bé Mèo** | \`acc_wife_vcb\` | BANK | Chính - Nhận lương Bé Mèo | Tài khoản thanh toán | \`#008542\` (Vietcombank) |
| **👩 Bé Mèo** | \`acc_wife_acb\` | BANK | Phụ - Chi tiêu cá nhân, đi chợ | Tài khoản thanh toán | \`#0060AF\` (ACB) |
| **👩 Bé Mèo** | \`acc_wife_bidv_credit\` | CREDIT_CARD | Thẻ tín dụng mua sắm trả sau | **Hạn mức: 20.000.000 ₫**<br>Sao kê ngày 22, Trả ngày 28 | \`#D97706\` (Amber BIDV) |
| **🏡 My Home** | \`acc_family_cash\` | CASH | Quỹ tiền mặt chi tiêu lặt vặt | Quỹ chung trong nhà | \`#10B981\` (Emerald) |

### ⚠️ QUY TẮC BẤT BIẾN: CƠ CHẾ HẠCH TOÁN THẺ TÍN DỤNG
- Trường \`currentBalance\` của thẻ tín dụng thể hiện **DƯ NỢ ĐANG DÙNG** (số tiền đang nợ ngân hàng).
- **Chi tiêu bằng thẻ tín dụng (EXPENSE):** Làm **TĂNG** \`currentBalance\` (tăng dư nợ).
- **Thanh toán nợ thẻ (TRANSFER):** Chuyển tiền từ tài khoản thanh toán sang thẻ tín dụng làm **GIẢM** \`currentBalance\` (giảm dư nợ).
- **Công thức tính Tài sản ròng (Net Worth):**
  \`\`\`
  Net Worth = (Tổng số dư tài khoản BANK + CASH + E_WALLET) 
            + (Tổng giá trị ĐẦU TƯ: Vàng, Sổ tiết kiệm) 
            - (Tổng NỢ VAY ngoài) 
            - (Tổng DƯ NỢ ĐANG DÙNG của 2 thẻ tín dụng BIDV Credit)
  \`\`\`

---

## 🎨 3. QUY CHUẨN THIẾT KẾ & FINTECH DESIGN TOKENS

Trích xuất từ \`.agents/skills/lovely-money-uiux/SKILL.md\`:
- **Primary Navy:** \`#1E3A8A\` (Thanh điều hướng Sidebar, thương hiệu chính)
- **Active Blue:** \`#2563EB\` (Nút bấm thao tác chính, số dư, liên kết kích hoạt)
- **Income Emerald:** \`#10B981\` / \`#059669\` (Khoản thu nhập, tỷ lệ tiết kiệm)
- **Expense Rose:** \`#F43F5E\` / \`#E11D48\` (Khoản chi tiêu, dư nợ thẻ)
- **Warning Amber:** \`#F59E0B\` / \`#D97706\` (Cảnh báo hạn mức thẻ > 70%, nợ đến hạn)
- **Hình khối (Border Radius):**
  - Cards, Modals, Widgets: \`rounded-3xl\` (24px)
  - Buttons, Inputs: \`rounded-xl\` (12px) hoặc \`rounded-2xl\` (16px)
  - Mobile Floating Action Button: \`rounded-full\` (\`w-14 h-14\` bóng mờ lớn)
- **Recharts Invariant:** Luôn sử dụng cờ \`isMounted\` trước khi render biểu đồ để tránh lỗi sai khác DOM giữa Server và Client (Next.js Hydration Mismatch).

---

## 📋 4. SỔ TỔNG TRẠNG THÁI HIỆN TẠI (LIVING LEDGER)

\`\`\`markdown
${projectStateContent}
\`\`\`

---

## 🛡️ 5. QUY TRÌNH 3 CỔNG QUẢN TRỊ PHÁT TRIỂN (AGENTS.MD)

\`\`\`markdown
${agentsMdContent}
\`\`\`

---

## 🎨 6. ĐẶC TẢ CHI TIẾT KỸ THUẬT UI/UX (SKILL SPEC)

\`\`\`markdown
${uiuxSkillContent}
\`\`\`
`;

fs.writeFileSync(path.join(exportDir, '01_HOME_MONI_ARCHITECTURE.md'), architectureDoc, 'utf-8');
console.log('✅ Đã tạo xong 01_HOME_MONI_ARCHITECTURE.md');

// -------------------------------------------------------------
// 2. TẠO TẬP TIN 02: TOÀN BỘ MÃ NGUỒN DỰ ÁN (FULL CODEBASE DIGEST)
// -------------------------------------------------------------
console.log('📦 Đang quét và đóng gói mã nguồn vào 02_HOME_MONI_CODEBASE.md...');

const scanExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.json']);
const ignoreDirs = new Set(['node_modules', '.next', '.git', 'notebooklm-export', 'reference-ux-ui', '.system_generated']);
const ignoreFiles = new Set(['package-lock.json', 'fi.tracking-moni.rar']);

let allFiles = [];

function walkDirectory(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relativePath = path.relative(rootDir, fullPath);

    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        walkDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (scanExtensions.has(ext) && !ignoreFiles.has(entry.name)) {
        allFiles.push(relativePath);
      }
    }
  }
}

walkDirectory(rootDir);
allFiles.sort();

// Tạo cây thư mục trực quan
let treeStructure = '# 📁 CÂU TRÚC TỆP TIN DỰ ÁN (PROJECT FILE TREE)\n\n```text\n';
allFiles.forEach(f => {
  treeStructure += `fi.tracking-moni/${f.replace(/\\/g, '/')}\n`;
});
treeStructure += '```\n\n---\n\n';

let codebaseDigest = `# 💻 HOME MONI - TOÀN BỘ MÃ NGUỒN DỰ ÁN (CODEBASE DIGEST)
> **Tập hợp mã nguồn thuần túy của dự án HOME MONI.**  
> Đã lọc sạch các thư viện phụ thuộc (node_modules, build cache).  
> Số lượng tệp mã nguồn: ${allFiles.length} files.

${treeStructure}
`;

for (const relativePath of allFiles) {
  const fullPath = path.join(rootDir, relativePath);
  const ext = path.extname(relativePath).toLowerCase();
  let lang = 'typescript';
  if (ext === '.css') lang = 'css';
  if (ext === '.json') lang = 'json';
  if (ext === '.js' || ext === '.mjs') lang = 'javascript';

  const content = fs.readFileSync(fullPath, 'utf-8');
  const normalizedPath = relativePath.replace(/\\/g, '/');

  codebaseDigest += `## 📄 Tệp: \`${normalizedPath}\`\n\n`;
  codebaseDigest += `\`\`\`${lang}\n// [Bắt đầu tệp: ${normalizedPath}]\n`;
  codebaseDigest += content;
  codebaseDigest += `\n// [Kết thúc tệp: ${normalizedPath}]\n\`\`\`\n\n---\n\n`;
}

fs.writeFileSync(path.join(exportDir, '02_HOME_MONI_CODEBASE.md'), codebaseDigest, 'utf-8');
console.log(`✅ Đã đóng gói xong 02_HOME_MONI_CODEBASE.md (${allFiles.length} files)`);

// -------------------------------------------------------------
// 3. TẠO TẬP TIN 03: HƯỚNG DẪN PROMPTING VÀ KIỂM THỬ CHO NOTEBOOKLM
// -------------------------------------------------------------
console.log('📦 Đang tạo 03_NOTEBOOKLM_PROMPT_GUIDE.md...');

const promptGuideDoc = `# 🧠 CẨM NANG KHAI THÁC DỰ ÁN HOME MONI TRÊN GOOGLE NOTEBOOKLM
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
  - Quỹ chung: Tiền mặt gia đình \`acc_family_cash\`.

### Câu 2: Về quy tắc hạch toán thẻ tín dụng
- **Prompt:** *"Trong dự án này, trường currentBalance của thẻ tín dụng đại diện cho cái gì? Khi quẹt thẻ chi tiêu thì currentBalance tăng hay giảm, và công thức tính Tài sản ròng (Net Worth) được xác định như thế nào?"*
- **Kỳ vọng AI trả lời:**
  - \`currentBalance\` là **DƯ NỢ ĐANG DÙNG** (khoản nợ ngân hàng).
  - Chi tiêu làm TĂNG dư nợ. Trả nợ thẻ làm GIẢM dư nợ.
  - Net Worth = Tổng ví khả dụng + Đầu tư - Nợ vay ngoài - Dư nợ 2 thẻ tín dụng BIDV.

### Câu 3: Về cấu trúc code và Local-First
- **Prompt:** *"Dữ liệu của dự án được lưu trữ ở đâu? Tên storage key là gì? File nào đảm nhận việc tính toán lại số dư các tài khoản sau mỗi giao dịch?"*
- **Kỳ vọng AI trả lời:**
  - Lưu trữ Local-First trên trình duyệt qua key \`HOME_MONI_DATA_V4\`.
  - Hàm \`recalculateAccountBalances\` trong file \`lib/storage.ts\` đảm nhận việc tính toán lại số dư.

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
`;

fs.writeFileSync(path.join(exportDir, '03_NOTEBOOKLM_PROMPT_GUIDE.md'), promptGuideDoc, 'utf-8');
console.log('✅ Đã tạo xong 03_NOTEBOOKLM_PROMPT_GUIDE.md');

console.log('\n🎉 ĐÓNG GÓI THÀNH CÔNG!');
console.log(`📁 Thư mục xuất: ${exportDir}`);

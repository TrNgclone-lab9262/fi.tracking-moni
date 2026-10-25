# 💻 HOME MONI - TOÀN BỘ MÃ NGUỒN DỰ ÁN (CODEBASE DIGEST)
> **Tập hợp mã nguồn thuần túy của dự án HOME MONI.**  
> Đã lọc sạch các thư viện phụ thuộc (node_modules, build cache).  
> Số lượng tệp mã nguồn: 44 files.

# 📁 CÂU TRÚC TỆP TIN DỰ ÁN (PROJECT FILE TREE)

```text
fi.tracking-moni/app/globals.css
fi.tracking-moni/app/layout.tsx
fi.tracking-moni/app/page.tsx
fi.tracking-moni/components/common/CategoryIcon.tsx
fi.tracking-moni/components/common/ConfirmDialog.tsx
fi.tracking-moni/components/common/ExportImportModal.tsx
fi.tracking-moni/components/common/Header.tsx
fi.tracking-moni/components/common/MobileDrawer.tsx
fi.tracking-moni/components/common/Sidebar.tsx
fi.tracking-moni/components/common/TopBar.tsx
fi.tracking-moni/components/dashboard/AssetDebtGoalsWidgets.tsx
fi.tracking-moni/components/dashboard/DualCreditCardsWidget.tsx
fi.tracking-moni/components/dashboard/ExpensePieChart.tsx
fi.tracking-moni/components/dashboard/FamilyCashflowWidget.tsx
fi.tracking-moni/components/dashboard/FilterBar.tsx
fi.tracking-moni/components/dashboard/IncomePieChart.tsx
fi.tracking-moni/components/dashboard/MonthlyTrendChart.tsx
fi.tracking-moni/components/dashboard/RecentActivitySection.tsx
fi.tracking-moni/components/dashboard/SummaryCards.tsx
fi.tracking-moni/components/dashboard/TrendLineCharts.tsx
fi.tracking-moni/components/transactions/TransactionFormModal.tsx
fi.tracking-moni/components/transactions/TransactionList.tsx
fi.tracking-moni/components/views/AccountsView.tsx
fi.tracking-moni/components/views/DebtsInvestView.tsx
fi.tracking-moni/components/views/GuideView.tsx
fi.tracking-moni/components/views/OverviewView.tsx
fi.tracking-moni/components/views/PlanningView.tsx
fi.tracking-moni/components/views/SettingsView.tsx
fi.tracking-moni/components/views/TransactionsView.tsx
fi.tracking-moni/constants/defaultCategories.ts
fi.tracking-moni/constants/mockData.ts
fi.tracking-moni/context/FinanceContext.tsx
fi.tracking-moni/lib/formatters.ts
fi.tracking-moni/lib/storage.ts
fi.tracking-moni/lib/validations.ts
fi.tracking-moni/next-env.d.ts
fi.tracking-moni/next.config.mjs
fi.tracking-moni/package.json
fi.tracking-moni/postcss.config.js
fi.tracking-moni/public/manifest.json
fi.tracking-moni/scripts/export-notebooklm.mjs
fi.tracking-moni/tailwind.config.ts
fi.tracking-moni/tsconfig.json
fi.tracking-moni/types/finance.ts
```

---


## 📄 Tệp: `app/globals.css`

```css
// [Bắt đầu tệp: app/globals.css]
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

// [Kết thúc tệp: app/globals.css]
```

---

## 📄 Tệp: `app/layout.tsx`

```typescript
// [Bắt đầu tệp: app/layout.tsx]
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FinanceProvider } from "@/context/FinanceContext";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "HOME MONI - Quản Lý Tài Chính Gia Đình",
  description: "Tổ ấm hạnh phúc - Tài chính minh bạch - Vun vén tương lai cho 2 vợ chồng",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HOME MONI",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <FinanceProvider>{children}</FinanceProvider>
      </body>
    </html>
  );
}

// [Kết thúc tệp: app/layout.tsx]
```

---

## 📄 Tệp: `app/page.tsx`

```typescript
// [Bắt đầu tệp: app/page.tsx]
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { Sidebar } from "@/components/common/Sidebar";
import { TopBar } from "@/components/common/TopBar";
import { MobileDrawer } from "@/components/common/MobileDrawer";
import { OverviewView } from "@/components/views/OverviewView";
import { TransactionsView } from "@/components/views/TransactionsView";
import { AccountsView } from "@/components/views/AccountsView";
import { PlanningView } from "@/components/views/PlanningView";
import { DebtsInvestView } from "@/components/views/DebtsInvestView";
import { GuideView } from "@/components/views/GuideView";
import { SettingsView } from "@/components/views/SettingsView";
import { TransactionFormModal } from "@/components/transactions/TransactionFormModal";
import { ExportImportModal } from "@/components/common/ExportImportModal";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export default function HomePage() {
  const { isLoaded, activeTab, resetToMockData } = useFinance();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Skeleton Loader khi chờ hydrate từ LocalStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-[#1E3A8A] hidden md:block animate-pulse" />
        <div className="flex-1 flex flex-col">
          <header className="h-20 bg-white border-b border-slate-200 animate-pulse" />
          <main className="p-8 space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-slate-200/80 rounded-3xl animate-pulse" />
              ))}
            </div>
            <div className="h-80 bg-slate-200/80 rounded-3xl animate-pulse" />
          </main>
        </div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewView />;
      case "transactions":
        return (
          <TransactionsView
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenBackupModal={() => setIsBackupModalOpen(true)}
          />
        );
      case "accounts":
        return <AccountsView />;
      case "planning":
        return <PlanningView />;
      case "debts_invest":
        return <DebtsInvestView />;
      case "guide":
        return <GuideView />;
      case "settings":
        return (
          <SettingsView
            onOpenBackupModal={() => setIsBackupModalOpen(true)}
            onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
          />
        );
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans antialiased">
      {/* 1. Sidebar cố định bên trái (Khớp 100% hình ảnh tham khảo) */}
      <Sidebar />

      {/* 2. Drawer Menu cho Thiết bị Di động */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 3. Vùng làm việc chính */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenBackupModal={() => setIsBackupModalOpen(true)}
          onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {renderActiveView()}
        </main>
      </div>

      {/* 4. Floating Action Button cho Mobile (Khớp hình uix-mobile.JPG) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/40 flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Thêm giao dịch mới"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* 5. Modals toàn cục */}
      <TransactionFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ExportImportModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onOpenResetDemo={() => setIsResetConfirmOpen(true)}
      />

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Khôi phục toàn bộ dữ liệu mẫu?"
        message="Hệ thống sẽ nạp lại toàn bộ dữ liệu mẫu chuẩn (Tài khoản, Khoản nợ, Đầu tư, Kế hoạch & Giao dịch) theo bộ thiết kế tham khảo. Các thay đổi của bạn sẽ được thiết lập lại."
        confirmLabel="Nạp lại mẫu chuẩn"
        cancelLabel="Hủy"
        isDanger={false}
        onConfirm={() => {
          resetToMockData();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}

// [Kết thúc tệp: app/page.tsx]
```

---

## 📄 Tệp: `components/common/CategoryIcon.tsx`

```typescript
// [Bắt đầu tệp: components/common/CategoryIcon.tsx]
import React from "react";
import {
  Utensils,
  Home,
  Car,
  ShoppingBag,
  HeartPulse,
  Zap,
  Film,
  MoreHorizontal,
  Briefcase,
  Laptop,
  Award,
  TrendingUp,
  CreditCard,
  Folder,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Utensils,
  Home,
  Car,
  ShoppingBag,
  HeartPulse,
  Zap,
  Film,
  MoreHorizontal,
  Briefcase,
  Laptop,
  Award,
  TrendingUp,
  CreditCard,
};

interface CategoryIconProps {
  name?: string;
  className?: string;
}

export function CategoryIcon({ name, className = "w-4 h-4" }: CategoryIconProps) {
  if (!name || !ICON_MAP[name]) {
    return <Folder className={className} />;
  }
  const IconComponent = ICON_MAP[name];
  return <IconComponent className={className} />;
}

// [Kết thúc tệp: components/common/CategoryIcon.tsx]
```

---

## 📄 Tệp: `components/common/ConfirmDialog.tsx`

```typescript
// [Bắt đầu tệp: components/common/ConfirmDialog.tsx]
"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy bỏ",
  isDanger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isDanger ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800">{title}</h3>
              <p className="text-sm text-slate-500 mt-1">{message}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-xl shadow-sm transition-all ${
              isDanger
                ? "bg-rose-600 hover:bg-rose-700 active:scale-95"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/common/ConfirmDialog.tsx]
```

---

## 📄 Tệp: `components/common/ExportImportModal.tsx`

```typescript
// [Bắt đầu tệp: components/common/ExportImportModal.tsx]
"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileJson,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResetDemo: () => void;
}

export function ExportImportModal({
  isOpen,
  onClose,
  onOpenResetDemo,
}: ExportImportModalProps) {
  const { transactions, categories, exportBackup, importBackup } = useFinance();
  const [activeTab, setActiveTab] = useState<"EXPORT" | "IMPORT">("EXPORT");
  const [importStatus, setImportStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportBackup();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus({ type: "loading", message: "Đang kiểm tra và nhập dữ liệu..." });

    try {
      const result = await importBackup(file);
      if (result.success) {
        setImportStatus({
          type: "success",
          message: "Dữ liệu đã được phục hồi thành công vào LocalStorage!",
        });
      } else {
        setImportStatus({
          type: "error",
          message: result.error || "File sao lưu không đúng định dạng.",
        });
      }
    } catch (err: any) {
      setImportStatus({
        type: "error",
        message: "Có lỗi xảy ra khi xử lý file JSON.",
      });
    }

    // Reset input để có thể chọn lại file cùng tên nếu cần
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileJson className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Sao lưu & Phục hồi dữ liệu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex gap-2">
          <button
            onClick={() => {
              setActiveTab("EXPORT");
              setImportStatus({ type: "idle" });
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === "EXPORT"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Download className="w-4 h-4" />
            Xuất dữ liệu (Export)
          </button>
          <button
            onClick={() => {
              setActiveTab("IMPORT");
              setImportStatus({ type: "idle" });
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === "IMPORT"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Upload className="w-4 h-4" />
            Nhập dữ liệu (Import)
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === "EXPORT" ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  Toàn bộ dữ liệu của bạn chỉ lưu trong LocalStorage trình duyệt này. Hãy xuất file sao lưu định kỳ để không bị mất dữ liệu khi dọn dẹp cache.
                </div>
              </div>

              {/* Tóm tắt data */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Tổng giao dịch:</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {transactions.length} bản ghi
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Danh mục cấu hình:</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {categories.length} danh mục
                  </p>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                Tải file sao lưu JSON về máy (.json)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  Chọn tệp JSON sao lưu từ máy tính
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Định dạng chuẩn do ứng dụng Lovely Money tạo ra
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="json-file-input"
                />
                <label
                  htmlFor="json-file-input"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl shadow-sm cursor-pointer transition-colors"
                >
                  Duyệt file...
                </label>
              </div>

              {/* Status feedback */}
              {importStatus.type === "success" && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{importStatus.message}</span>
                </div>
              )}

              {importStatus.type === "error" && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{importStatus.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Nút Reset Mock data phụ bên dưới */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Muốn dùng lại dữ liệu mẫu demo?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenResetDemo();
              }}
              className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nạp lại mẫu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/common/ExportImportModal.tsx]
```

---

## 📄 Tệp: `components/common/Header.tsx`

```typescript
// [Bắt đầu tệp: components/common/Header.tsx]
"use client";

import React, { useState } from "react";
import {
  Wallet,
  PlusCircle,
  HardDriveDownload,
  RotateCcw,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { getMonthDisplayLabel } from "@/lib/formatters";

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenBackupModal: () => void;
  onOpenResetConfirm: () => void;
}

export function Header({
  onOpenAddModal,
  onOpenBackupModal,
  onOpenResetConfirm,
}: HeaderProps) {
  const { selectedMonth, setSelectedMonth, availableMonths } = useFinance();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent">
                  LOVELY MONEY
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Đã đồng bộ LocalStorage
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium hidden sm:block">
                Quản lý chi tiêu cá nhân thông minh & bảo mật
              </p>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bộ chọn tháng hiển thị */}
            <div className="relative">
              <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-slate-200">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer pr-1 font-semibold text-slate-700 text-xs sm:text-sm"
                >
                  <option value="ALL">Tất cả thời gian</option>
                  {availableMonths.map((m) => (
                    <option key={m} value={m}>
                      {getMonthDisplayLabel(m)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nút Sao lưu / Khôi phục */}
            <button
              onClick={onOpenBackupModal}
              title="Sao lưu hoặc phục hồi dữ liệu JSON"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <HardDriveDownload className="w-4 h-4 text-slate-500" />
              <span>Sao lưu / Khôi phục</span>
            </button>

            {/* Nút Khôi phục dữ liệu mẫu */}
            <button
              onClick={onOpenResetConfirm}
              title="Khôi phục lại dữ liệu mẫu ban đầu để test UI"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Dữ liệu mẫu</span>
            </button>

            {/* Nút Thêm giao dịch (Primary) */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-md shadow-blue-600/25 active:scale-95"
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Thêm giao dịch</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// [Kết thúc tệp: components/common/Header.tsx]
```

---

## 📄 Tệp: `components/common/MobileDrawer.tsx`

```typescript
// [Bắt đầu tệp: components/common/MobileDrawer.tsx]
"use client";

import React from "react";
import {
  Home,
  ArrowLeftRight,
  CreditCard,
  Target,
  Coins,
  HelpCircle,
  Settings,
  X,
  Heart,
} from "lucide-react";
import { useFinance, NavTab } from "@/context/FinanceContext";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavGroup {
  title: string;
  items: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Dòng tiền tổ ấm",
    items: [
      { id: "overview", label: "Tổng quan tổ ấm", icon: Home },
      { id: "transactions", label: "Sổ giao dịch", icon: ArrowLeftRight },
      { id: "accounts", label: "Tài khoản & Thẻ", icon: CreditCard },
    ],
  },
  {
    title: "Kế hoạch & Tích lũy",
    items: [
      { id: "planning", label: "Ngân sách & Mục tiêu", icon: Target },
      { id: "debts_invest", label: "Khoản nợ & Đầu tư", icon: Coins },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      { id: "guide", label: "Cẩm nang tổ ấm", icon: HelpCircle },
      { id: "settings", label: "Cài đặt & Tùy biến", icon: Settings },
    ],
  },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { activeTab, setActiveTab } = useFinance();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-4/5 max-w-xs bg-gradient-to-b from-[#1E3A8A] via-[#1D4ED8] to-[#172554] text-white h-full flex flex-col p-4 shadow-2xl animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base tracking-wider block leading-tight">
                HOME MONI
              </span>
              <span className="text-[10px] text-blue-200 uppercase tracking-widest block font-bold mt-0.5">
                🏡 My Home
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-blue-900/80 text-blue-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List grouped */}
        <nav className="flex-1 py-4 space-y-4 overflow-y-auto scrollbar-none">
          {NAV_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <h4 className="px-2 text-[10px] font-bold text-blue-300/70 uppercase tracking-widest mb-1">
                {group.title}
              </h4>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-white text-blue-900 font-black shadow-md"
                        : "text-blue-100 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="pt-3 border-t border-blue-800/40 text-[11px] text-blue-200">
          <p className="flex items-center gap-1.5 font-bold">
            <span>👨</span> Anh Chuột
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            Bé Mèo <span>👩</span>
          </p>
          <p className="text-[10px] text-blue-400 mt-0.5">HOME MONI v3.2 · My Home</p>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/common/MobileDrawer.tsx]
```

---

## 📄 Tệp: `components/common/Sidebar.tsx`

```typescript
// [Bắt đầu tệp: components/common/Sidebar.tsx]
"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  ArrowLeftRight,
  CreditCard,
  Target,
  Coins,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useFinance, NavTab } from "@/context/FinanceContext";

interface NavItemDef {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    variant: "warning" | "danger" | "info";
  };
}

interface NavGroup {
  title: string;
  items: NavItemDef[];
}

export function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    husbandCreditCard,
    wifeCreditCard,
    budgetSummary,
    debts,
  } = useFinance();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Khôi phục trạng thái thu gọn từ LocalStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("HOME_MONI_SIDEBAR_COLLAPSED");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    try {
      localStorage.setItem("HOME_MONI_SIDEBAR_COLLAPSED", String(nextState));
    } catch (e) {
      // ignore
    }
  };

  // Tính toán dynamic badges
  const creditCardWarning =
    (husbandCreditCard && husbandCreditCard.usagePercentage >= 70) ||
    (wifeCreditCard && wifeCreditCard.usagePercentage >= 70);

  const budgetOverLimit = budgetSummary.items.some((i) => i.percentage >= 100);
  const activeDebtsCount = debts.filter((d) => d.status === "ACTIVE").length;

  const NAV_GROUPS: NavGroup[] = [
    {
      title: "Dòng tiền tổ ấm",
      items: [
        { id: "overview", label: "Tổng quan tổ ấm", icon: Home },
        { id: "transactions", label: "Sổ giao dịch", icon: ArrowLeftRight },
        {
          id: "accounts",
          label: "Tài khoản & Thẻ",
          icon: CreditCard,
          badge: creditCardWarning
            ? { text: "Cảnh báo thẻ", variant: "warning" }
            : undefined,
        },
      ],
    },
    {
      title: "Kế hoạch & Tích lũy",
      items: [
        {
          id: "planning",
          label: "Ngân sách & Mục tiêu",
          icon: Target,
          badge: budgetOverLimit
            ? { text: "Vượt trần", variant: "danger" }
            : undefined,
        },
        {
          id: "debts_invest",
          label: "Khoản nợ & Đầu tư",
          icon: Coins,
          badge:
            activeDebtsCount > 0
              ? { text: `${activeDebtsCount}`, variant: "info" }
              : undefined,
        },
      ],
    },
    {
      title: "Hệ thống",
      items: [
        { id: "guide", label: "Cẩm nang tổ ấm", icon: HelpCircle },
        { id: "settings", label: "Cài đặt & Tùy biến", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-gradient-to-b from-[#1E3A8A] via-[#1D4ED8] to-[#172554] text-white transition-all duration-300 relative z-30 shrink-0 border-r border-blue-900/40 shadow-xl shadow-blue-950/20 sticky top-0 h-screen select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* 1. Nút Thu gọn Nổi viền (Floating Edge Toggle) */}
      <button
        onClick={toggleCollapse}
        aria-label={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
        title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
        className="absolute -right-3.5 top-7 z-40 w-7 h-7 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-lg hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* 2. Brand Header: HOME MONI */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-blue-800/40 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-500/25 ring-2 ring-white/20">
            <Home className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="font-black text-lg tracking-wider text-white block truncate leading-tight">
                HOME MONI
              </span>
              <span className="text-[10px] text-blue-200 uppercase tracking-widest font-bold block mt-0.5">
                🏡 My Home
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Danh sách Điều Hướng Phân Nhóm (Grouped Navigation - Thoáng đãng & Tinh gọn) */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-none">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            {/* Group Header (ẩn khi thu gọn) */}
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-blue-300/60 uppercase tracking-widest mb-1.5">
                {group.title}
              </h4>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-blue-900 shadow-md shadow-blue-950/25 font-black"
                        : "text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-1"
                    } ${isCollapsed ? "justify-center px-0 hover:translate-x-0" : ""}`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isActive
                          ? "text-blue-700 scale-110"
                          : "text-blue-200 group-hover:text-white"
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 shadow-xs ${
                          item.badge.variant === "warning"
                            ? "bg-amber-400 text-amber-950"
                            : item.badge.variant === "danger"
                            ? "bg-rose-500 text-white"
                            : "bg-blue-900 text-blue-200"
                        }`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </button>

                  {/* Tooltip nổi khi Sidebar ở trạng thái thu gọn */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50 border border-slate-700/60 flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            item.badge.variant === "warning"
                              ? "bg-amber-400 text-amber-950"
                              : item.badge.variant === "danger"
                              ? "bg-rose-500 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {item.badge.text}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* 4. Footer Sidebar */}
      {!isCollapsed ? (
        <div className="p-4 border-t border-blue-800/40 text-[11px] text-blue-200 bg-blue-950/30 shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>👨</span>
              <span>Anh Chuột</span>
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
              <span>Bé Mèo</span>
              <span>👩</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Local-First Sync" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-blue-300/80 mt-1">
            <span>HOME MONI v3.2</span>
            <span className="text-emerald-300 font-medium">Bảo mật cục bộ</span>
          </div>
        </div>
      ) : (
        <div className="p-3.5 border-t border-blue-800/40 flex justify-center shrink-0 group relative">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="absolute left-full bottom-2 ml-3 px-2.5 py-1 bg-slate-900/95 text-white text-[10px] font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-slate-700/50">
            🟢 Local-First đã sẵn sàng
          </div>
        </div>
      )}
    </aside>
  );
}

// [Kết thúc tệp: components/common/Sidebar.tsx]
```

---

## 📄 Tệp: `components/common/TopBar.tsx`

```typescript
// [Bắt đầu tệp: components/common/TopBar.tsx]
"use client";

import React, { useState } from "react";
import {
  Bell,
  Plus,
  Download,
  Calendar,
  CheckCircle2,
  Menu,
  X,
  AlertTriangle,
  RotateCcw,
  Users,
  Home,
} from "lucide-react";
import { useFinance, NavTab, PerspectiveMode } from "@/context/FinanceContext";
import { getMonthDisplayLabel } from "@/lib/formatters";

interface TopBarProps {
  onOpenAddModal: () => void;
  onOpenBackupModal: () => void;
  onOpenResetConfirm: () => void;
  onToggleMobileMenu: () => void;
}

export function TopBar({
  onOpenAddModal,
  onOpenBackupModal,
  onOpenResetConfirm,
  onToggleMobileMenu,
}: TopBarProps) {
  const {
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    notifications,
    activeTab,
    activePerspective,
    setActivePerspective,
  } = useFinance();

  const [showNotifications, setShowNotifications] = useState(false);

  const tabTitles: Record<NavTab, string> = {
    overview: "Tổng quan tổ ấm (My Home)",
    transactions: "Sổ giao dịch gia đình",
    accounts: "Tài khoản & Thẻ tín dụng",
    planning: "Kế hoạch & Ngân sách tổ ấm",
    debts_invest: "Nợ & Đầu tư gia đình",
    guide: "Cẩm nang tài chính tổ ấm",
    settings: "Cài đặt & Tùy biến",
  };

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          {/* Bên Trái: Nút Mobile Menu + Tiêu đề Phân hệ */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Mở menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                  {tabTitles[activeTab]}
                </h1>
                <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Đã đồng bộ
                </span>
              </div>
            </div>
          </div>

          {/* Giữa: Bộ Chuyển Đổi Góc Nhìn Thành Viên (My Home / Anh Chuột / Bé Mèo) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl shadow-inner border border-slate-200/60">
            <button
              type="button"
              onClick={() => setActivePerspective("ALL")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePerspective === "ALL"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>🏡</span>
              <span className="hidden sm:inline">My Home</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePerspective("HUSBAND")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePerspective === "HUSBAND"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>👨</span>
              <span className="hidden sm:inline">Anh Chuột</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePerspective("WIFE")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePerspective === "WIFE"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>👩</span>
              <span className="hidden sm:inline">Bé Mèo</span>
            </button>
          </div>

          {/* Bên Phải: Bộ chọn kỳ + Chuông thông báo + Nút Thao tác */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bộ chọn tháng */}
            <div className="flex items-center bg-slate-100/90 text-slate-700 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200/60">
              <Calendar className="w-4 h-4 text-blue-600 mr-1.5 shrink-0" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer pr-1 font-semibold text-slate-800 text-xs sm:text-sm"
              >
                <option value="ALL">Toàn thời gian</option>
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {getMonthDisplayLabel(m)}
                  </option>
                ))}
              </select>
            </div>

            {/* Chuông Thông Báo */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-600 transition-colors"
                title="Cảnh báo & Nhắc nhở"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Popup Cảnh báo & Nhắc nhở */}
              {showNotifications && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Cảnh báo gia đình
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-2">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-3 hover:bg-slate-50 rounded-xl transition-colors flex items-start gap-2.5"
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                            notif.type === "danger"
                              ? "bg-rose-500"
                              : notif.type === "warning"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">
                            {notif.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nút Sao lưu */}
            <button
              onClick={onOpenBackupModal}
              title="Sao lưu / Khôi phục dữ liệu JSON"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Sao lưu</span>
            </button>

            {/* Nút Mẫu demo */}
            <button
              onClick={onOpenResetConfirm}
              title="Nạp lại bộ dữ liệu mẫu gia đình chuẩn"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Mẫu demo</span>
            </button>

            {/* Nút Thêm giao dịch */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-md shadow-blue-600/25 active:scale-95"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Thêm giao dịch</span>
              <span className="sm:hidden">Thêm</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// [Kết thúc tệp: components/common/TopBar.tsx]
```

---

## 📄 Tệp: `components/dashboard/AssetDebtGoalsWidgets.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/AssetDebtGoalsWidgets.tsx]
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatShortVND } from "@/lib/formatters";
import { Landmark, Briefcase, Coins, Target } from "lucide-react";

export function AssetDebtGoalsWidgets() {
  const { accounts, investments, debts, goals } = useFinance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Cơ cấu tài sản
  const assetStructure = useMemo(() => {
    const totalInvest = investments
      .filter((i) => i.status === "ACTIVE")
      .reduce((sum, i) => sum + (i.currentValue || i.amount), 0);

    const list = [
      ...accounts.map((a) => ({
        name: a.name,
        amount: Math.max(0, a.currentBalance),
        color: a.color || "#0284C7",
      })),
      {
        name: "Đầu tư",
        amount: totalInvest,
        color: "#10B981",
      },
    ];

    const total = list.reduce((sum, item) => sum + item.amount, 0);
    return { list, total };
  }, [accounts, investments]);

  // 2. Đầu tư đang hoạt động (Vốn vs Giá trị ước tính)
  const activeInvestmentsData = useMemo(() => {
    return investments
      .filter((i) => i.status === "ACTIVE")
      .map((i) => ({
        name: i.name.length > 14 ? `${i.name.substring(0, 12)}...` : i.name,
        principal: i.amount,
        estimated: i.currentValue || i.amount,
      }));
  }, [investments]);

  // 3. Tiến độ trả nợ
  const debtProgress = useMemo(() => {
    const activeDebts = debts.filter((d) => d.status === "ACTIVE");
    const totalRemaining = activeDebts.reduce(
      (sum, d) => sum + (d.totalAmount - d.paidAmount),
      0
    );

    const items = activeDebts.map((d) => {
      const pct = Math.round((d.paidAmount / d.totalAmount) * 100);
      return {
        name: d.name,
        percentage: pct,
      };
    });

    return { totalRemaining, items };
  }, [debts]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <Landmark className="w-4 h-4 text-blue-600" />
        Tài sản, nợ & mục tiêu
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* WIDGET 1: CƠ CẤU TÀI SẢN */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700">Cơ cấu tài sản</h4>
          </div>

          <div className="relative w-full h-40 flex items-center justify-center my-1">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(v: any) => [formatVND(Number(v)), "Giá trị"]}
                    contentStyle={{ borderRadius: 12, fontSize: 11 }}
                  />
                  <Pie
                    data={assetStructure.list}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={2}
                  >
                    {assetStructure.list.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Tổng tài sản</span>
              <span className="text-sm font-black text-slate-800">
                {formatShortVND(assetStructure.total)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
            {assetStructure.list.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET 2: ĐẦU TƯ ĐANG HOẠT ĐỘNG */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold text-slate-700">Đầu tư đang hoạt động</h4>
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-400" /> Vốn
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Giá trị
              </span>
            </div>
          </div>

          <div className="h-40 w-full pt-2">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activeInvestmentsData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
                >
                  <XAxis
                    type="number"
                    stroke="#94A3B8"
                    fontSize={9}
                    tickFormatter={(v) => formatShortVND(v)}
                  />
                  <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={9} />
                  <Tooltip formatter={(v: any) => formatVND(Number(v))} />
                  <Bar dataKey="principal" fill="#94A3B8" radius={[0, 4, 4, 0]} maxBarSize={12} />
                  <Bar dataKey="estimated" fill="#2563EB" radius={[0, 4, 4, 0]} maxBarSize={12} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center font-medium">
            Lợi nhuận bình quân ~ 6.5% / năm
          </div>
        </div>

        {/* WIDGET 3: TIẾN ĐỘ TRẢ NỢ */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700">Tiến độ trả nợ</h4>
          </div>

          <div className="flex flex-col items-center justify-center my-auto py-2">
            <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-blue-600 border-r-blue-600 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Còn nợ</span>
              <span className="text-base font-black text-slate-800">
                {formatShortVND(debtProgress.totalRemaining)}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
            {debtProgress.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.percentage > 0 ? "bg-blue-600" : "bg-emerald-500"
                    }`}
                  />
                  {item.name}:
                </span>
                <span className="font-bold text-slate-800">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET 4: MỤC TIÊU TIẾT KIỆM */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700">Mục tiêu tiết kiệm</h4>
          </div>

          <div className="space-y-3.5 my-auto">
            {goals.map((g) => {
              const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
              return (
                <div key={g.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{g.name}</span>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        pct === 100
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct === 100 ? "bg-emerald-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center font-medium">
            Tự động theo dõi từ các khoản nạp
          </div>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/AssetDebtGoalsWidgets.tsx]
```

---

## 📄 Tệp: `components/dashboard/DualCreditCardsWidget.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/DualCreditCardsWidget.tsx]
"use client";

import React from "react";
import { CreditCard, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { formatVND } from "@/lib/formatters";

export function DualCreditCardsWidget() {
  const { husbandCreditCard, wifeCreditCard, setActiveTab } = useFinance();

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Quản lý 2 Thẻ Tín Dụng BIDV Credit
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Kiểm soát dư nợ & hạn mức chi tiêu của 2 vợ chồng
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("accounts")}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>Chi tiết ví</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. THẺ BIDV CREDIT (CHỒNG) - HẠN MỨC 50TR */}
        {husbandCreditCard && (
          <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">
                  BIDV PLATINUM CREDIT
                </span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">
                  Thẻ Anh Chuột
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-blue-200">
                Hạn mức 50 Triệu
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-baseline text-xs mb-1">
                <span className="text-slate-300">Dư nợ đã dùng:</span>
                <span className="font-black text-amber-300 text-sm">
                  {formatVND(husbandCreditCard.usedAmount)}
                </span>
              </div>

              {/* Thanh đo hạn mức */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    husbandCreditCard.usagePercentage > 70
                      ? "bg-rose-500"
                      : "bg-emerald-400"
                  }`}
                  style={{ width: `${husbandCreditCard.usagePercentage}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-300 mt-2 font-medium">
                <span>Khả dụng: {formatVND(husbandCreditCard.availableAmount)}</span>
                <span className="font-bold text-emerald-400">
                  {husbandCreditCard.usagePercentage}% (An toàn)
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
              <span>Sao kê ngày 20 · Hạn trả: 25/10</span>
              <span className="font-mono text-slate-400">4111 •••• 5050</span>
            </div>
          </div>
        )}

        {/* 2. THẺ BIDV CREDIT (VỢ) - HẠN MỨC 20TR */}
        {wifeCreditCard && (
          <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 text-white shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                  BIDV GOLD CREDIT
                </span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">
                  Thẻ Bé Mèo
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-amber-200">
                Hạn mức 20 Triệu
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-baseline text-xs mb-1">
                <span className="text-slate-300">Dư nợ đã dùng:</span>
                <span className="font-black text-amber-300 text-sm">
                  {formatVND(wifeCreditCard.usedAmount)}
                </span>
              </div>

              {/* Thanh đo hạn mức */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    wifeCreditCard.usagePercentage > 70
                      ? "bg-rose-500"
                      : "bg-emerald-400"
                  }`}
                  style={{ width: `${wifeCreditCard.usagePercentage}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-300 mt-2 font-medium">
                <span>Khả dụng: {formatVND(wifeCreditCard.availableAmount)}</span>
                <span className="font-bold text-emerald-400">
                  {wifeCreditCard.usagePercentage}% (An toàn)
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
              <span>Sao kê ngày 22 · Hạn trả: 28/10</span>
              <span className="font-mono text-slate-400">4111 •••• 2020</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/DualCreditCardsWidget.tsx]
```

---

## 📄 Tệp: `components/dashboard/ExpensePieChart.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/ExpensePieChart.tsx]
"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatShortVND, getMonthDisplayLabel } from "@/lib/formatters";
import { PieChart as PieIcon, Info } from "lucide-react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs p-3 rounded-xl shadow-xl border border-slate-800">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: data.categoryColor }}
          />
          <span className="font-bold text-sm text-slate-100">{data.categoryName}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>Số tiền chi:</span>
          <span className="font-semibold text-white">{formatVND(data.totalAmount)}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300 mt-1">
          <span>Tỷ trọng:</span>
          <span className="font-bold text-amber-400">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
}

export function ExpensePieChart() {
  const { categoryExpenseStats, summary, selectedMonth } = useFinance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const periodLabel =
    selectedMonth === "ALL" ? "Toàn thời gian" : getMonthDisplayLabel(selectedMonth);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col h-full">
      {/* Tiêu đề Box */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Chi tiêu theo danh mục</h3>
            <p className="text-xs text-slate-400 font-medium">
              Tỷ trọng phân bổ ngân sách ({periodLabel.toLowerCase()})
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
          {categoryExpenseStats.length} danh mục
        </span>
      </div>

      {/* Nội dung Biểu đồ */}
      <div className="flex-1 flex flex-col justify-center items-center py-4">
        {categoryExpenseStats.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Info className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-slate-700">Chưa có dữ liệu chi tiêu</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Không có khoản chi nào trong {periodLabel.toLowerCase()}. Thêm một khoản chi để xem tỷ trọng.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Vùng vẽ Recharts Donut */}
            <div className="relative w-full h-64 sm:h-72 max-w-xs mx-auto flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={categoryExpenseStats}
                      dataKey="totalAmount"
                      nameKey="categoryName"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={3}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {categoryExpenseStats.map((entry) => (
                        <Cell key={`cell-${entry.categoryId}`} fill={entry.categoryColor} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}

              {/* Tâm của Donut Chart - giống mẫu trong oveview.JPG */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Tổng chi
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
                  {formatShortVND(summary.monthlyExpense)}
                </span>
              </div>
            </div>

            {/* Danh mục chi tiết (Legend badges) */}
            <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-100">
              {categoryExpenseStats.map((cat) => (
                <div
                  key={cat.categoryId}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100 transition-colors"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.categoryColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-slate-700 truncate">
                        {cat.categoryName}
                      </p>
                      <span className="text-[10px] font-bold text-slate-500">
                        {cat.percentage}%
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 truncate">
                      {formatVND(cat.totalAmount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/ExpensePieChart.tsx]
```

---

## 📄 Tệp: `components/dashboard/FamilyCashflowWidget.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/FamilyCashflowWidget.tsx]
"use client";

import React, { useMemo } from "react";
import { Users, Heart, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { formatVND } from "@/lib/formatters";

export function FamilyCashflowWidget() {
  const { summary, transactions } = useFinance();

  // Tính lịch chi tiêu 31 ngày của Tháng 10/2026 (Calendar Heatmap)
  const heatmapDays = useMemo(() => {
    const daysMap = new Map<number, number>();
    for (let i = 1; i <= 31; i++) daysMap.set(i, 0);

    transactions.forEach((tx) => {
      if (tx.type === "EXPENSE" && tx.date.startsWith("2026-10")) {
        const day = parseInt(tx.date.split("-")[2], 10);
        const cur = daysMap.get(day) || 0;
        daysMap.set(day, cur + tx.amount);
      }
    });

    return Array.from(daysMap.entries()).map(([day, amount]) => {
      let level = "zero"; // 0: không chi
      if (amount > 0 && amount <= 500000) level = "low"; // <= 500k: xanh
      else if (amount > 500000 && amount <= 2000000) level = "medium"; // <= 2tr: vàng cam
      else if (amount > 2000000) level = "high"; // > 2tr: đỏ/hồng (tiền nhà, mua sắm lớn)

      return { day, amount, level };
    });
  }, [transactions]);

  const totalIncome = summary.husbandIncome + summary.wifeIncome || 1;
  const husbandPct = Math.round((summary.husbandIncome / totalIncome) * 100);
  const wifePct = 100 - husbandPct;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. CƠ CẤU ĐÓNG GÓP THU NHẬP 2 VỢ CHỒNG */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Đóng Góp Thu Nhập Tổ Ấm
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Tỷ trọng lương Anh Chuột (Vietinbank) vs Lương Bé Mèo (Vietcombank)
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl">
            Tổng {formatVND(totalIncome)}
          </span>
        </div>

        {/* Thanh tỷ lệ Anh Chuột vs Bé Mèo */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-blue-600 transition-all flex items-center justify-center text-[10px] text-white font-black"
              style={{ width: `${husbandPct}%` }}
            >
              {husbandPct}%
            </div>
            <div
              className="h-full bg-emerald-500 transition-all flex items-center justify-center text-[10px] text-white font-black"
              style={{ width: `${wifePct}%` }}
            >
              {wifePct}%
            </div>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <div>
                <span className="font-bold text-slate-800">👨 Anh Chuột (Vietinbank)</span>
                <p className="text-[11px] text-slate-400 font-semibold">
                  {formatVND(summary.husbandIncome)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="font-bold text-slate-800">👩 Bé Mèo (Vietcombank)</span>
                <p className="text-[11px] text-slate-400 font-semibold">
                  {formatVND(summary.wifeIncome)}
                </p>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
          <Heart className="w-4 h-4 text-rose-500 shrink-0" />
          <span>
            Hai vợ chồng cùng hợp lực tích lũy được{" "}
            <strong>{formatVND(summary.savingsAmount)}</strong> trong tháng này!
          </span>
        </div>
      </div>

      {/* 2. LỊCH CHI TIÊU GIA ĐÌNH (CALENDAR HEATMAP 31 NGÀY) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Lịch Chi Tiêu Tháng 10
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Bản đồ nhiệt theo dõi ngày chi tiêu tiết kiệm vs ngày mua sắm lớn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-xs bg-slate-100" /> 0₫
            <span className="w-2 h-2 rounded-xs bg-emerald-400" /> &lt;500k
            <span className="w-2 h-2 rounded-xs bg-amber-400" /> &lt;2tr
            <span className="w-2 h-2 rounded-xs bg-rose-500" /> &gt;2tr
          </div>
        </div>

        {/* 31 Ô Ngày Trong Tháng */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
          {heatmapDays.map((d) => {
            let bgClass = "bg-slate-100 text-slate-400";
            if (d.level === "low") bgClass = "bg-emerald-100 text-emerald-800 font-bold";
            if (d.level === "medium") bgClass = "bg-amber-100 text-amber-900 font-bold";
            if (d.level === "high") bgClass = "bg-rose-500 text-white font-black shadow-xs";

            return (
              <div
                key={d.day}
                title={`Ngày ${d.day}/10: ${d.amount > 0 ? formatVND(d.amount) : "Không chi tiêu"}`}
                className={`h-8 sm:h-9 rounded-xl flex flex-col items-center justify-center text-xs transition-transform hover:scale-110 cursor-pointer ${bgClass}`}
              >
                <span>{d.day}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-400 text-center font-medium">
          💡 Ngày 6 (Tiền nhà 6.5tr) & Ngày 10, 12 (Siêu thị & Sắm chăn đệm) là những ngày phát sinh chi phí chính.
        </p>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/FamilyCashflowWidget.tsx]
```

---

## 📄 Tệp: `components/dashboard/FilterBar.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/FilterBar.tsx]
"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { TransactionType } from "@/types/finance";
import { getMonthDisplayLabel } from "@/lib/formatters";

export function FilterBar() {
  const {
    categories,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useFinance();

  const handleClearFilters = () => {
    setSelectedType("ALL");
    setSelectedCategory("ALL");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedType !== "ALL" || selectedCategory !== "ALL" || searchQuery.trim() !== "";

  // Danh mục tương ứng để lọc
  const filteredCategoryOptions = categories.filter((c) => {
    if (selectedType === "ALL") return true;
    return c.type === selectedType;
  });

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Quick Tabs lọc theo tháng */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedMonth("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedMonth === "ALL"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            Tất cả thời gian
          </button>
          {availableMonths.map((m) => {
            const isSelected = selectedMonth === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {getMonthDisplayLabel(m)}
              </button>
            );
          })}
        </div>

        {/* Nút Reset bộ lọc khi đang có filter */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold self-start md:self-auto bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200/50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      {/* Dòng điều khiển: Lọc Loại + Danh mục + Tìm kiếm */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Lọc theo Loại (Thu / Chi / Tất cả) */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Loại giao dịch
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedType("ALL")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedType === "ALL"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("INCOME")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedType === "INCOME"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-emerald-700"
              }`}
            >
              Thu nhập
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("EXPENSE")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedType === "EXPENSE"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-rose-700"
              }`}
            >
              Chi tiêu
            </button>
          </div>
        </div>

        {/* 2. Dropdown Lọc Danh mục */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Danh mục
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="ALL">Tất cả danh mục</option>
              {filteredCategoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.type === "INCOME" ? "[Thu] " : "[Chi] "}
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Ô tìm kiếm ghi chú / từ khóa */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Tìm kiếm
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo ghi chú hoặc số tiền..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/FilterBar.tsx]
```

---

## 📄 Tệp: `components/dashboard/IncomePieChart.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/IncomePieChart.tsx]
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatShortVND } from "@/lib/formatters";
import { ArrowDownLeft, Info } from "lucide-react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs p-3 rounded-xl shadow-xl border border-slate-800">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-bold text-sm text-slate-100">{data.name}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>Thu nhập:</span>
          <span className="font-semibold text-white">{formatVND(data.amount)}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300 mt-1">
          <span>Tỷ trọng:</span>
          <span className="font-bold text-emerald-400">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
}

export function IncomePieChart() {
  const { transactions, categories, selectedMonth, summary, getCategoryById } = useFinance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const incomeStats = useMemo(() => {
    const map = new Map<string, number>();
    let totalIncome = 0;

    for (const tx of transactions) {
      if (tx.type !== "INCOME") continue;
      if (selectedMonth !== "ALL" && !tx.date.startsWith(selectedMonth)) continue;

      const cur = map.get(tx.categoryId) || 0;
      map.set(tx.categoryId, cur + tx.amount);
      totalIncome += tx.amount;
    }

    if (totalIncome === 0) return [];

    const result: { id: string; name: string; color: string; amount: number; percentage: number }[] = [];
    map.forEach((amount, catId) => {
      const cat = getCategoryById(catId);
      result.push({
        id: catId,
        name: cat?.name || "Khác",
        color: cat?.color || "#10B981",
        amount,
        percentage: Math.round((amount / totalIncome) * 100),
      });
    });

    return result.sort((a, b) => b.amount - a.amount);
  }, [transactions, selectedMonth, getCategoryById]);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Thu nhập theo nguồn</h3>
            <p className="text-xs text-slate-400 font-medium">Tỷ trọng các nguồn thu</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-4">
        {incomeStats.length === 0 ? (
          <div className="text-center py-10 px-4">
            <Info className="w-6 h-6 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Chưa phát sinh thu nhập trong kỳ</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full h-56 max-w-xs mx-auto flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={incomeStats}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {incomeStats.map((entry) => (
                        <Cell key={`cell-${entry.id}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}

              {/* Tâm của Donut Chart - giống ảnh overview-1.JPG */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tổng thu
                </span>
                <span className="text-xl font-black text-slate-800 tracking-tight">
                  {formatShortVND(summary.monthlyIncome)}
                </span>
              </div>
            </div>

            {/* Legend badges */}
            <div className="w-full mt-3 flex flex-wrap justify-center gap-2 pt-3 border-t border-slate-100">
              {incomeStats.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                  <span className="text-[10px] text-slate-400">({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/IncomePieChart.tsx]
```

---

## 📄 Tệp: `components/dashboard/MonthlyTrendChart.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/MonthlyTrendChart.tsx]
"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatShortVND } from "@/lib/formatters";
import { BarChart3 } from "lucide-react";

interface CustomBarTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomBarTooltip({ active, payload, label }: CustomBarTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs p-3 rounded-xl shadow-xl border border-slate-800">
        <p className="font-bold text-slate-200 mb-1.5 border-b border-slate-700 pb-1">
          {label}
        </p>
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-300">{item.name}:</span>
            </span>
            <span className="font-semibold text-white">{formatVND(item.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function MonthlyTrendChart() {
  const { monthlyTrendData } = useFinance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Thu - Chi các tháng</h3>
            <p className="text-xs text-slate-400 font-medium">Xu hướng thu nhập & chi tiêu</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Thu nhập
          </span>
          <span className="flex items-center gap-1.5 text-rose-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Chi tiêu
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-[260px] pt-4">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTrendData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <XAxis
                dataKey="label"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "#E2E8F0" }}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatShortVND(val)}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="income"
                name="Thu nhập"
                fill="#10B981"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="expense"
                name="Chi tiêu"
                fill="#F43F5E"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            Đang tải dữ liệu biểu đồ...
          </div>
        )}
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/MonthlyTrendChart.tsx]
```

---

## 📄 Tệp: `components/dashboard/RecentActivitySection.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/RecentActivitySection.tsx]
"use client";

import React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  History,
  Target,
  ChevronRight,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatDateVN } from "@/lib/formatters";
import { CategoryIcon } from "@/components/common/CategoryIcon";

export function RecentActivitySection() {
  const {
    filteredTransactions,
    budgetSummary,
    getCategoryById,
    getAccountById,
    setActiveTab,
  } = useFinance();

  // Lấy 8 giao dịch mới nhất
  const recentList = filteredTransactions.slice(0, 8);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <History className="w-4 h-4 text-blue-600" />
        Hoạt động gần đây
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CỘT 1 & 2: GIAO DỊCH GẦN ĐÂY (2 COLUMNS) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Giao dịch gần đây
            </h3>
            <button
              onClick={() => setActiveTab("transactions")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3">
            {recentList.map((tx) => {
              const cat = getCategoryById(tx.categoryId);
              const acc = getAccountById(tx.accountId);
              const toAcc = tx.toAccountId ? getAccountById(tx.toAccountId) : undefined;
              const isExpense = tx.type === "EXPENSE";
              const isTransfer = tx.type === "TRANSFER";

              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white ${
                        isTransfer
                          ? "bg-blue-500"
                          : isExpense
                          ? "bg-rose-500"
                          : "bg-emerald-500"
                      }`}
                    >
                      {isTransfer ? (
                        <ArrowLeftRight className="w-4 h-4" />
                      ) : isExpense ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {isTransfer ? "Chuyển khoản" : cat?.name || "Khác"}
                        </span>
                        {tx.tag === "RECURRING" && (
                          <span className="text-[9px] font-bold text-blue-600 bg-blue-100 px-1 rounded-sm">
                            Định kỳ
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {formatDateVN(tx.date)} ·{" "}
                        {isTransfer
                          ? `${acc?.name} → ${toAcc?.name}`
                          : acc?.name || "Ví tiền"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-extrabold whitespace-nowrap ${
                        isTransfer
                          ? "text-blue-600"
                          : isExpense
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {isExpense ? "-" : isTransfer ? "" : "+"} {formatVND(tx.amount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CỘT 3: NGÂN SÁCH THÁNG NÀY (PROGRESS BARS) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Ngân sách tháng này
            </h3>
            <button
              onClick={() => setActiveTab("planning")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <span>Chi tiết</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 py-3">
            {budgetSummary.items.slice(0, 4).map((item) => {
              const isOver = item.percentage >= 100;
              return (
                <div key={item.categoryId} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.categoryColor }}
                      />
                      {item.categoryName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {formatVND(item.spentAmount)} / {formatVND(item.limitAmount)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOver ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>
                      {isOver ? "Hết ngân sách" : `Còn ${formatVND(item.remainingAmount)}`}
                    </span>
                    <span className="font-bold">{item.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/RecentActivitySection.tsx]
```

---

## 📄 Tệp: `components/dashboard/SummaryCards.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/SummaryCards.tsx]
"use client";

import React from "react";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, getMonthDisplayLabel } from "@/lib/formatters";

export function SummaryCards() {
  const { summary, selectedMonth, activePerspective } = useFinance();
  const periodLabel =
    selectedMonth === "ALL" ? "Toàn thời gian" : getMonthDisplayLabel(selectedMonth);

  const perspectiveLabel =
    activePerspective === "ALL"
      ? "My Home"
      : activePerspective === "HUSBAND"
      ? "Anh Chuột"
      : "Bé Mèo";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. THẺ TÀI SẢN RÒNG (Blue Gradient) */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-600/15">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-blue-200" />
            Tài sản ròng ({perspectiveLabel})
          </span>
          <span className="p-2 rounded-2xl bg-white/15 text-white backdrop-blur-xs">
            <Sparkles className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            {formatVND(summary.netWorth)}
          </h3>
          <p className="text-xs text-blue-200 mt-1 font-medium">
            Ví: {formatVND(summary.currentBalance)} · Dư nợ thẻ: {formatVND(summary.totalCreditDebt)}
          </p>
        </div>
      </div>

      {/* 2. THẺ THU NHẬP (Emerald Gradient) */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/15">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
            <ArrowDownLeft className="w-4 h-4 text-emerald-200" />
            Thu nhập ({perspectiveLabel})
          </span>
          <span className="p-2 rounded-2xl bg-white/15 text-white backdrop-blur-xs">
            <ArrowDownLeft className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            {formatVND(summary.monthlyIncome)}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {activePerspective === "ALL"
                ? `Chồng: ${formatVND(summary.husbandIncome)} · Vợ: ${formatVND(summary.wifeIncome)}`
                : "Lương tháng nhận đủ"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. THẺ CHI TIÊU (Rose Gradient) */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700 text-white shadow-lg shadow-rose-500/15">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-100 flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-rose-200" />
            Chi tiêu ({perspectiveLabel})
          </span>
          <span className="p-2 rounded-2xl bg-white/15 text-white backdrop-blur-xs">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            {formatVND(summary.monthlyExpense)}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {activePerspective === "ALL"
                ? `Việc chung nhà: ${formatVND(summary.familySharedExpense)}`
                : `${periodLabel}`}
            </span>
          </div>
        </div>
      </div>

      {/* 4. THẺ TIẾT KIỆM (Amber Gradient) */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/15">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
            <PiggyBank className="w-4 h-4 text-amber-200" />
            Tiết kiệm tích lũy
          </span>
          <span className="p-2 rounded-2xl bg-white/15 text-white backdrop-blur-xs">
            <PiggyBank className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            {formatVND(summary.savingsAmount)}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {summary.savingsRate}% tỷ lệ tích lũy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/SummaryCards.tsx]
```

---

## 📄 Tệp: `components/dashboard/TrendLineCharts.tsx`

```typescript
// [Bắt đầu tệp: components/dashboard/TrendLineCharts.tsx]
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatShortVND } from "@/lib/formatters";
import { TrendingUp, Activity } from "lucide-react";

export function TrendLineCharts() {
  const { transactions, budgetSummary } = useFinance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Dữ liệu Số dư theo thời gian (T5 -> T10)
  const balanceTrendData = useMemo(() => {
    const months = [
      { key: "T5", balance: 20000000 },
      { key: "T6", balance: 22000000 },
      { key: "T7", balance: 21500000 },
      { key: "T8", balance: 45000000 },
      { key: "T9", balance: 52000000 },
      { key: "T10", balance: 57650000 },
    ];
    return months;
  }, []);

  // 2. Dữ liệu Chi tiêu lũy kế trong tháng 10 (Ngày 1 -> 29)
  const monthlyExpenseCumulative = useMemo(() => {
    const points: { day: string; amount: number }[] = [];
    let cum = 0;
    const days = [1, 5, 9, 13, 17, 21, 25, 29];

    days.forEach((d) => {
      if (d === 1) cum = 108000;
      else if (d === 5) cum = 5252000;
      else if (d === 9) cum = 5824000;
      else if (d === 13) cum = 6490000;
      else if (d === 17) cum = 7119000;
      else if (d >= 21) cum = 7469000;

      points.push({ day: `${d}`, amount: cum });
    });

    return points;
  }, []);

  // 3. Dữ liệu Thu nhập lũy kế trong tháng 10
  const monthlyIncomeCumulative = useMemo(() => {
    const points: { day: string; amount: number }[] = [];
    let cum = 0;
    const days = [1, 5, 9, 13, 17, 21, 25, 29];

    days.forEach((d) => {
      if (d < 5) cum = 0;
      else if (d === 5) cum = 18500000;
      else if (d >= 10) cum = 21619000;

      points.push({ day: `${d}`, amount: cum });
    });

    return points;
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <Activity className="w-4 h-4 text-blue-600" />
        Xu hướng tích lũy
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Biểu đồ 1: Số dư theo thời gian */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700">Số dư theo thời gian</h4>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              T5 - T10
            </span>
          </div>
          <div className="h-40 w-full pt-2">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceTrendData}>
                  <XAxis dataKey="key" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatShortVND(v)}
                  />
                  <Tooltip
                    formatter={(v: any) => [formatVND(Number(v)), "Số dư"]}
                    contentStyle={{ borderRadius: 12, fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#2563EB" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Biểu đồ 2: Chi tiêu lũy kế trong tháng */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700">Chi tiêu lũy kế trong tháng</h4>
            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Mốc {formatShortVND(budgetSummary.totalBudget)}
            </span>
          </div>
          <div className="h-40 w-full pt-2">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyExpenseCumulative}>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatShortVND(v)}
                  />
                  <Tooltip
                    formatter={(v: any) => [formatVND(Number(v)), "Đã chi"]}
                    contentStyle={{ borderRadius: 12, fontSize: 12 }}
                  />
                  <ReferenceLine
                    y={budgetSummary.totalBudget}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#F43F5E"
                    strokeWidth={2.5}
                    dot={{ r: 2, fill: "#F43F5E" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Biểu đồ 3: Thu lũy kế trong tháng */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700">Thu lũy kế trong tháng</h4>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Tháng 10
            </span>
          </div>
          <div className="h-40 w-full pt-2">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyIncomeCumulative}>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatShortVND(v)}
                  />
                  <Tooltip
                    formatter={(v: any) => [formatVND(Number(v)), "Thu nhập"]}
                    contentStyle={{ borderRadius: 12, fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    dot={{ r: 2, fill: "#10B981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/dashboard/TrendLineCharts.tsx]
```

---

## 📄 Tệp: `components/transactions/TransactionFormModal.tsx`

```typescript
// [Bắt đầu tệp: components/transactions/TransactionFormModal.tsx]
"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Calendar,
  Tag,
  FileText,
  CreditCard,
  Users,
  Heart,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { TransactionType, FamilyMember, ExpenseScope } from "@/types/finance";
import { formatVND } from "@/lib/formatters";

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionFormModal({ isOpen, onClose }: TransactionFormModalProps) {
  const { categories, accounts, activePerspective, addTransaction } = useFinance();

  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [memberId, setMemberId] = useState<FamilyMember>(() => {
    return activePerspective === "WIFE" ? "WIFE" : "HUSBAND";
  });
  const [scope, setScope] = useState<ExpenseScope>("FAMILY");

  const [amountInput, setAmountInput] = useState<string>("");
  const [date, setDate] = useState<string>(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });

  const [categoryId, setCategoryId] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const [toAccountId, setToAccountId] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const availableCategories = categories.filter(
    (c) => c.type === (type === "INCOME" ? "INCOME" : "EXPENSE")
  );

  useEffect(() => {
    if (availableCategories.length > 0) {
      const isCurrentValid = availableCategories.some((c) => c.id === categoryId);
      if (!isCurrentValid) {
        setCategoryId(availableCategories[0].id);
      }
    }
  }, [type, availableCategories, categoryId]);

  // Chọn tài khoản gợi ý phù hợp với thành viên
  useEffect(() => {
    if (accounts.length > 0) {
      const preferredAccount = accounts.find(
        (a) => a.owner === memberId && a.type !== "CREDIT_CARD"
      );
      if (preferredAccount) {
        setAccountId(preferredAccount.id);
      } else {
        setAccountId(accounts[0].id);
      }
    }
  }, [memberId, accounts]);

  useEffect(() => {
    if (isOpen) {
      setAmountInput("");
      setNote("");
      setError(null);
      setMemberId(activePerspective === "WIFE" ? "WIFE" : "HUSBAND");
    }
  }, [isOpen, activePerspective]);

  if (!isOpen) return null;

  const numericAmount = parseFloat(amountInput.replace(/[^0-9]/g, "")) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (numericAmount <= 0) {
      setError("Vui lòng nhập số tiền lớn hơn 0");
      return;
    }

    if (!accountId) {
      setError("Vui lòng chọn tài khoản nguồn");
      return;
    }

    if (type === "TRANSFER") {
      if (!toAccountId) {
        setError("Vui lòng chọn tài khoản nhận");
        return;
      }
      if (accountId === toAccountId) {
        setError("Tài khoản nguồn và tài khoản nhận không được trùng nhau");
        return;
      }
    } else {
      if (!categoryId) {
        setError("Vui lòng chọn danh mục giao dịch");
        return;
      }
    }

    addTransaction({
      amount: numericAmount,
      date,
      type,
      categoryId: type === "TRANSFER" ? "cat_expense_other" : categoryId,
      accountId,
      toAccountId: type === "TRANSFER" ? toAccountId : undefined,
      memberId,
      scope,
      note: note.trim(),
    });

    onClose();
  };

  const handleAmountChange = (valStr: string) => {
    const rawVal = valStr.replace(/[^0-9]/g, "");
    if (!rawVal) {
      setAmountInput("");
      return;
    }
    const num = parseInt(rawVal, 10);
    setAmountInput(new Intl.NumberFormat("vi-VN").format(num));
  };

  // Numpad fast buttons
  const addQuickAmount = (extra: number) => {
    const current = numericAmount;
    handleAmountChange(`${current + extra}`);
  };

  const appendZeros = () => {
    if (numericAmount > 0) {
      handleAmountChange(`${numericAmount}000`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏡</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Ghi chép giao dịch gia đình
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          {/* 1. Chọn Ai là người chi/thu? (Chồng vs Vợ) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              Thành viên thực hiện
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMemberId("HUSBAND")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  memberId === "HUSBAND"
                    ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>👨</span>
                <span>Anh Chuột</span>
              </button>
              <button
                type="button"
                onClick={() => setMemberId("WIFE")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  memberId === "WIFE"
                    ? "bg-emerald-50 border-emerald-600 text-emerald-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>👩</span>
                <span>Bé Mèo</span>
              </button>
            </div>
          </div>

          {/* 2. Loại giao dịch (Chi tiêu, Thu nhập, Chuyển khoản) */}
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={`flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                type === "EXPENSE"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Chi tiêu
            </button>
            <button
              type="button"
              onClick={() => setType("INCOME")}
              className={`flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                type === "INCOME"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              Thu nhập
            </button>
            <button
              type="button"
              onClick={() => setType("TRANSFER")}
              className={`flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                type === "TRANSFER"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Chuyển khoản
            </button>
          </div>

          {/* 3. Ô Nhập Số Tiền & Numpad Quick Buttons */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Số tiền giao dịch (VND)
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={amountInput}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              autoFocus
              className="w-full text-center text-3xl sm:text-4xl font-black bg-transparent outline-none text-slate-900 placeholder:text-slate-300"
            />
            <p className="text-xs font-semibold text-blue-600 mt-1">
              {numericAmount > 0 ? formatVND(numericAmount) : "Nhập số tiền..."}
            </p>

            {/* Quick Numpad Shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-3 border-t border-slate-200/60">
              <button
                type="button"
                onClick={appendZeros}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-black text-slate-700 shadow-2xs"
              >
                +000
              </button>
              <button
                type="button"
                onClick={() => addQuickAmount(50000)}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 shadow-2xs"
              >
                +50k
              </button>
              <button
                type="button"
                onClick={() => addQuickAmount(100000)}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 shadow-2xs"
              >
                +100k
              </button>
              <button
                type="button"
                onClick={() => addQuickAmount(200000)}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 shadow-2xs"
              >
                +200k
              </button>
              <button
                type="button"
                onClick={() => addQuickAmount(500000)}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 shadow-2xs"
              >
                +500k
              </button>
            </div>
          </div>

          {/* 4. Mục đích chi tiêu: Việc chung gia đình vs Cá nhân */}
          {type === "EXPENSE" && (
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-600 shrink-0">Mục đích:</span>
              <button
                type="button"
                onClick={() => setScope("FAMILY")}
                className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                  scope === "FAMILY"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                🏠 Chung gia đình
              </button>
              <button
                type="button"
                onClick={() => setScope("PERSONAL")}
                className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                  scope === "PERSONAL"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                👤 Cá nhân riêng
              </button>
            </div>
          )}

          {/* 5. Chọn Tài Khoản Nguồn */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              {type === "TRANSFER" ? "Từ tài khoản (Nguồn)" : "Tài khoản / Thẻ thanh toán"}
            </label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}{" "}
                  {acc.type === "CREDIT_CARD"
                    ? `(Dư nợ: ${formatVND(acc.currentBalance)})`
                    : `(Số dư: ${formatVND(acc.currentBalance)})`}
                </option>
              ))}
            </select>
          </div>

          {/* Nếu là Chuyển Khoản -> Chọn Tài Khoản Nhận */}
          {type === "TRANSFER" ? (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                Đến tài khoản (Đích)
              </label>
              <select
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
              >
                {accounts
                  .filter((a) => a.id !== accountId)
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                Chọn danh mục
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
              >
                {availableCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Ngày Giao dịch & Ghi chú */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Ngày giao dịch
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Ghi chú
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Tiền chợ, Tiền nhà..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                type === "EXPENSE"
                  ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/25"
                  : type === "INCOME"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
              }`}
            >
              <Check className="w-4 h-4" />
              Lưu giao dịch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/transactions/TransactionFormModal.tsx]
```

---

## 📄 Tệp: `components/transactions/TransactionList.tsx`

```typescript
// [Bắt đầu tệp: components/transactions/TransactionList.tsx]
"use client";

import React, { useState } from "react";
import {
  Trash2,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  AlertCircle,
  Calendar,
  FileText,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction } from "@/types/finance";
import { formatVND, formatDateVN } from "@/lib/formatters";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { CategoryIcon } from "@/components/common/CategoryIcon";

export function TransactionList() {
  const { filteredTransactions, getCategoryById, deleteTransaction } = useFinance();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const targetTransaction = filteredTransactions.find((tx) => tx.id === deleteTargetId);

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteTransaction(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
      {/* Header Danh sách */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Lịch sử giao dịch</h3>
            <p className="text-xs text-slate-400 font-medium">
              Sắp xếp theo ngày phát sinh mới nhất
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
          {filteredTransactions.length} giao dịch
        </div>
      </div>

      {/* Nội dung danh sách */}
      {filteredTransactions.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-8 h-8" />
          </div>
          <p className="text-sm font-bold text-slate-700">Không tìm thấy giao dịch nào</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Không có bản ghi nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện tại. Thử đổi bộ lọc hoặc thêm giao dịch mới.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View (Ẩn trên mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Mã GD</th>
                  <th className="py-3.5 px-4">Ngày</th>
                  <th className="py-3.5 px-4">Loại</th>
                  <th className="py-3.5 px-4">Danh mục</th>
                  <th className="py-3.5 px-4">Ghi chú</th>
                  <th className="py-3.5 px-4 text-right">Số tiền</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => {
                  const category = getCategoryById(tx.categoryId);
                  const isExpense = tx.type === "EXPENSE";

                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Mã GD */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 font-medium">
                        {tx.id.length > 14 ? `${tx.id.substring(0, 12)}...` : tx.id}
                      </td>

                      {/* Ngày */}
                      <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                        {formatDateVN(tx.date)}
                      </td>

                      {/* Loại Thu / Chi */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isExpense
                              ? "bg-rose-50 text-rose-600 border border-rose-100"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          }`}
                        >
                          {isExpense ? (
                            <>
                              <ArrowUpRight className="w-3 h-3" />
                              Chi
                            </>
                          ) : (
                            <>
                              <ArrowDownLeft className="w-3 h-3" />
                              Thu
                            </>
                          )}
                        </span>
                      </td>

                      {/* Danh mục */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100/90 border border-slate-200/60">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: category?.color || "#94A3B8" }}
                          />
                          <CategoryIcon
                            name={category?.icon}
                            className="w-3.5 h-3.5 text-slate-500"
                          />
                          <span>{category?.name || "Khác"}</span>
                        </div>
                      </td>

                      {/* Ghi chú */}
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-600 font-medium">
                        {tx.note || <span className="text-slate-300 italic">Không có</span>}
                      </td>

                      {/* Số tiền */}
                      <td
                        className={`py-3.5 px-4 text-right font-bold text-sm whitespace-nowrap ${
                          isExpense ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {isExpense ? "-" : "+"} {formatVND(tx.amount)}
                      </td>

                      {/* Nút Xóa */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setDeleteTargetId(tx.id)}
                          title="Xóa giao dịch này"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Hiện trên mobile & tablet nhỏ) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredTransactions.map((tx) => {
              const category = getCategoryById(tx.categoryId);
              const isExpense = tx.type === "EXPENSE";

              return (
                <div
                  key={tx.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon Category */}
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-sm"
                      style={{ backgroundColor: category?.color || "#94A3B8" }}
                    >
                      <CategoryIcon name={category?.icon} className="w-5 h-5" />
                    </div>

                    {/* Chi tiết */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800 truncate">
                          {category?.name || "Khác"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatDateVN(tx.date)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {tx.note || (isExpense ? "Chi tiêu" : "Thu nhập")}
                      </p>
                    </div>
                  </div>

                  {/* Số tiền & Xóa */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold whitespace-nowrap ${
                          isExpense ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {isExpense ? "-" : "+"} {formatVND(tx.amount)}
                      </p>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {isExpense ? "Khoản chi" : "Khoản thu"}
                      </span>
                    </div>

                    <button
                      onClick={() => setDeleteTargetId(tx.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Dialog xác nhận xóa giao dịch */}
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Xóa giao dịch này?"
        message={`Bạn có chắc chắn muốn xóa giao dịch ${
          targetTransaction ? formatVND(targetTransaction.amount) : ""
        } khỏi lịch sử chi tiêu? Thao tác này không thể hoàn tác.`}
        confirmLabel="Xóa vĩnh viễn"
        cancelLabel="Hủy"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

// [Kết thúc tệp: components/transactions/TransactionList.tsx]
```

---

## 📄 Tệp: `components/views/AccountsView.tsx`

```typescript
// [Bắt đầu tệp: components/views/AccountsView.tsx]
"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard,
  Plus,
  Building2,
  Banknote,
  Eye,
  Trash2,
  X,
  Users,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { Account, AccountType, FamilyMember } from "@/types/finance";
import { formatVND, formatDateVN } from "@/lib/formatters";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export function AccountsView() {
  const {
    accounts,
    transactions,
    addAccount,
    deleteAccount,
    getCategoryById,
    activePerspective,
  } = useFinance();

  const [selectedAccountForDetail, setSelectedAccountForDetail] = useState<Account | null>(null);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form states thêm tài khoản
  const [name, setName] = useState("");
  const [owner, setOwner] = useState<FamilyMember>("HUSBAND");
  const [type, setType] = useState<AccountType>("BANK");
  const [initialBalance, setInitialBalance] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Nhóm tài khoản theo chủ sở hữu
  const husbandAccounts = accounts.filter((a) => a.owner === "HUSBAND");
  const wifeAccounts = accounts.filter((a) => a.owner === "WIFE");
  const sharedAccounts = accounts.filter((a) => a.owner === "SHARED");

  // Tổng số dư khả dụng (không tính thẻ tín dụng)
  const totalAvailable = useMemo(() => {
    return accounts
      .filter((a) => a.type !== "CREDIT_CARD")
      .reduce((sum, a) => sum + Math.max(0, a.currentBalance), 0);
  }, [accounts]);

  // Tổng dư nợ thẻ tín dụng
  const totalCreditDebt = useMemo(() => {
    return accounts
      .filter((a) => a.type === "CREDIT_CARD")
      .reduce((sum, a) => sum + Math.max(0, a.currentBalance), 0);
  }, [accounts]);

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initVal = parseFloat(initialBalance.replace(/[^0-9]/g, "")) || 0;
    const limitVal = type === "CREDIT_CARD" ? parseFloat(creditLimit.replace(/[^0-9]/g, "")) || 0 : undefined;

    addAccount({
      name: name.trim(),
      owner,
      type,
      initialBalance: initVal,
      creditLimit: limitVal,
      accountNumber: accountNumber.trim() || undefined,
    });

    setName("");
    setInitialBalance("");
    setCreditLimit("");
    setAccountNumber("");
    setIsAddAccountModalOpen(false);
  };

  const detailTransactions = useMemo(() => {
    if (!selectedAccountForDetail) return [];

    const accId = selectedAccountForDetail.id;
    const isCredit = selectedAccountForDetail.type === "CREDIT_CARD";

    const list = transactions.filter(
      (tx) => tx.accountId === accId || tx.toAccountId === accId
    );

    const sortedAsc = [...list].sort((a, b) => a.date.localeCompare(b.date));

    let runningBalance = selectedAccountForDetail.initialBalance;
    const computed = sortedAsc.map((tx) => {
      let change = 0;
      let oppositeAccId: string | undefined = undefined;

      if (isCredit) {
        if (tx.type === "EXPENSE" && tx.accountId === accId) {
          change = tx.amount; // Tăng nợ
        } else if (tx.type === "TRANSFER" && tx.toAccountId === accId) {
          change = -tx.amount; // Giảm nợ
        }
      } else {
        if (tx.type === "INCOME" && tx.accountId === accId) {
          change = tx.amount;
        } else if (tx.type === "EXPENSE" && tx.accountId === accId) {
          change = -tx.amount;
        } else if (tx.type === "TRANSFER") {
          if (tx.accountId === accId) {
            change = -tx.amount;
            oppositeAccId = tx.toAccountId;
          } else if (tx.toAccountId === accId) {
            change = tx.amount;
            oppositeAccId = tx.accountId;
          }
        }
      }

      runningBalance += change;
      return {
        ...tx,
        change,
        balanceAfter: runningBalance,
        oppositeAccId,
      };
    });

    return computed.reverse();
  }, [selectedAccountForDetail, transactions]);

  const renderAccountCard = (acc: Account) => {
    const isCredit = acc.type === "CREDIT_CARD";
    const limit = acc.creditLimit || 0;
    const used = Math.max(0, acc.currentBalance);
    const available = Math.max(0, limit - used);

    return (
      <div
        key={acc.id}
        className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: acc.color || "#0284C7" }}
              >
                {isCredit ? <CreditCard className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{acc.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  {acc.accountNumber || (isCredit ? "Thẻ tín dụng" : "Tài khoản thanh toán")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 text-xs">
            {isCredit ? (
              <>
                <div className="flex justify-between text-slate-400">
                  <span>Hạn mức thẻ:</span>
                  <span className="font-bold text-slate-700">{formatVND(limit)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-bold text-amber-600">Dư nợ đã dùng:</span>
                  <span className="text-sm font-black text-amber-600">{formatVND(used)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Còn khả dụng:</span>
                  <span className="text-emerald-600 font-bold">{formatVND(available)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-slate-400">
                  <span>Số dư đầu kỳ:</span>
                  <span className="font-semibold text-slate-600">{formatVND(acc.initialBalance)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-bold">Số dư hiện tại:</span>
                  <span className="text-sm font-black text-blue-600">{formatVND(acc.currentBalance)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setSelectedAccountForDetail(acc)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem sổ giao dịch</span>
          </button>

          <button
            onClick={() => setDeleteTargetId(acc.id)}
            className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Tóm tắt số dư gia đình */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 sm:gap-12">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Tổng số dư khả dụng (Ví & Bank)
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 mt-1 block">
              {formatVND(totalAvailable)}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Tổng dư nợ thẻ BIDV Credit
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-600 mt-1 block">
              {formatVND(totalCreditDebt)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAddAccountModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm ví / thẻ</span>
        </button>
      </div>

      {/* NHÓM 1: TÀI KHOẢN CỦA ANH CHUỘT */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>👨</span>
          <span>Tài khoản của Anh Chuột</span>
          <span className="text-slate-400 font-normal">
            (Vietinbank Lương, BIDV Chi tiêu, BIDV Credit 50tr)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {husbandAccounts.map((acc) => renderAccountCard(acc))}
        </div>
      </section>

      {/* NHÓM 2: TÀI KHOẢN CỦA BÉ MÈO */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>👩</span>
          <span>Tài khoản của Bé Mèo</span>
          <span className="text-slate-400 font-normal">
            (Vietcombank Lương, ACB Chi tiêu, BIDV Credit 20tr)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wifeAccounts.map((acc) => renderAccountCard(acc))}
        </div>
      </section>

      {/* NHÓM 3: QUỸ TIỀN MẶT CHUNG TỔ ẤM (MY HOME) */}
      {sharedAccounts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>🏡</span>
            <span>Quỹ chung tổ ấm (My Home)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sharedAccounts.map((acc) => renderAccountCard(acc))}
          </div>
        </section>
      )}

      {/* Modal Xem Sổ Chi Tiết Giao Dịch */}
      {selectedAccountForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Sổ chi tiết giao dịch - {selectedAccountForDetail.name}
                </h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">
                  {selectedAccountForDetail.type === "CREDIT_CARD"
                    ? `Dư nợ hiện tại: ${formatVND(selectedAccountForDetail.currentBalance)}`
                    : `Số dư lũy kế: ${formatVND(selectedAccountForDetail.currentBalance)}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedAccountForDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {detailTransactions.length === 0 ? (
                <p className="text-center py-12 text-xs text-slate-400 font-semibold">
                  Tài khoản này chưa có giao dịch phát sinh nào
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-3">Ngày</th>
                        <th className="py-3 px-3">Người chi</th>
                        <th className="py-3 px-3">Loại</th>
                        <th className="py-3 px-3">Danh mục</th>
                        <th className="py-3 px-3 text-right">Số tiền</th>
                        <th className="py-3 px-3">Ví đối ứng</th>
                        <th className="py-3 px-3">Ghi chú</th>
                        <th className="py-3 px-3 text-right">Số dư sau GD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {detailTransactions.map((item) => {
                        const cat = getCategoryById(item.categoryId);
                        const oppAcc = item.oppositeAccId
                          ? accounts.find((a) => a.id === item.oppositeAccId)
                          : undefined;

                        return (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-3 font-medium whitespace-nowrap">
                              {formatDateVN(item.date)}
                            </td>
                            <td className="py-3 px-3 font-bold text-slate-700">
                              {item.memberId === "HUSBAND" ? "👨 Chồng" : "👩 Vợ"}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.type === "TRANSFER"
                                    ? "bg-blue-50 text-blue-600"
                                    : item.change < 0
                                    ? "bg-rose-50 text-rose-600"
                                    : "bg-emerald-50 text-emerald-600"
                                }`}
                              >
                                {item.type === "TRANSFER" ? "Chuyển khoản" : item.type === "EXPENSE" ? "Chi" : "Thu"}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold text-slate-700">
                              {cat?.name || "Khác"}
                            </td>
                            <td
                              className={`py-3 px-3 text-right font-bold whitespace-nowrap ${
                                item.change < 0 ? "text-rose-600" : "text-emerald-600"
                              }`}
                            >
                              {item.change < 0 ? "-" : "+"} {formatVND(item.amount)}
                            </td>
                            <td className="py-3 px-3 text-slate-500 font-medium">
                              {oppAcc?.name || "—"}
                            </td>
                            <td className="py-3 px-3 text-slate-600 max-w-xs truncate">
                              {item.note || "—"}
                            </td>
                            <td className="py-3 px-3 text-right font-black text-slate-800 whitespace-nowrap">
                              {formatVND(item.balanceAfter)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm tài khoản mới */}
      {isAddAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Thêm tài khoản / thẻ mới</h3>
              <button onClick={() => setIsAddAccountModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-3.5 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Chủ sở hữu</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOwner("HUSBAND")}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      owner === "HUSBAND" ? "bg-blue-600 text-white" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    👨 Chồng
                  </button>
                  <button
                    type="button"
                    onClick={() => setOwner("WIFE")}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      owner === "WIFE" ? "bg-emerald-600 text-white" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    👩 Vợ
                  </button>
                  <button
                    type="button"
                    onClick={() => setOwner("SHARED")}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      owner === "SHARED" ? "bg-purple-600 text-white" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    🏡 Chung
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tên tài khoản / Ví</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Vietinbank Lương, BIDV Credit..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Loại tài khoản</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AccountType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="BANK">Tài khoản ngân hàng</option>
                  <option value="CREDIT_CARD">Thẻ tín dụng (Credit Card)</option>
                  <option value="CASH">Tiền mặt</option>
                </select>
              </div>

              {type === "CREDIT_CARD" ? (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Hạn mức thẻ tín dụng (VND)</label>
                  <input
                    type="text"
                    required
                    value={creditLimit}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setCreditLimit(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                    }}
                    placeholder="VD: 50.000.000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-bold"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Số dư ban đầu (VND)</label>
                  <input
                    type="text"
                    value={initialBalance}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setInitialBalance(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                    }}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-bold"
                  />
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddAccountModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-600/25"
                >
                  Lưu tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm xóa */}
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Xóa tài khoản này?"
        message="Thao tác này sẽ xóa tài khoản khỏi danh sách ví của gia đình bạn."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        isDanger={true}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteAccount(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

// [Kết thúc tệp: components/views/AccountsView.tsx]
```

---

## 📄 Tệp: `components/views/DebtsInvestView.tsx`

```typescript
// [Bắt đầu tệp: components/views/DebtsInvestView.tsx]
"use client";

import React, { useState, useMemo } from "react";
import {
  Coins,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  X,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { DebtItem, InvestmentItem, InvestmentType } from "@/types/finance";
import { formatVND, formatDateVN } from "@/lib/formatters";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export function DebtsInvestView() {
  const {
    debts,
    investments,
    addDebt,
    payDebt,
    deleteDebt,
    addInvestment,
    updateInvestment,
    deleteInvestment,
  } = useFinance();

  // Modals state
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [payTargetDebt, setPayTargetDebt] = useState<DebtItem | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [deleteDebtId, setDeleteDebtId] = useState<string | null>(null);
  const [deleteInvestId, setDeleteInvestId] = useState<string | null>(null);

  // Form states Thêm Nợ
  const [debtName, setDebtName] = useState("");
  const [debtTotal, setDebtTotal] = useState("");
  const [debtInterest, setDebtInterest] = useState("0");
  const [debtStartDate, setDebtStartDate] = useState("");
  const [debtDueDate, setDebtDueDate] = useState("");

  // Form states Thêm Đầu tư
  const [invName, setInvName] = useState("");
  const [invType, setInvType] = useState<InvestmentType>("SAVINGS");
  const [invAmount, setInvAmount] = useState("");
  const [invProfit, setInvProfit] = useState("6.5");
  const [invStartDate, setInvStartDate] = useState("");

  // Thống kê Nợ
  const debtTotals = useMemo(() => {
    const totalBorrowed = debts.reduce((sum, d) => sum + d.totalAmount, 0);
    const totalPaid = debts.reduce((sum, d) => sum + d.paidAmount, 0);
    const remaining = totalBorrowed - totalPaid;
    return { totalBorrowed, totalPaid, remaining };
  }, [debts]);

  // Thống kê Đầu tư
  const investTotals = useMemo(() => {
    const totalInvested = investments.reduce((sum, i) => sum + i.amount, 0);
    const activeInvested = investments
      .filter((i) => i.status === "ACTIVE")
      .reduce((sum, i) => sum + i.amount, 0);
    return { totalInvested, activeInvested };
  }, [investments]);

  const handleCreateDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtName.trim()) return;

    const total = parseFloat(debtTotal.replace(/[^0-9]/g, "")) || 0;
    addDebt({
      name: debtName.trim(),
      type: "BORROW",
      totalAmount: total,
      paidAmount: 0,
      interestRate: parseFloat(debtInterest) || 0,
      startDate: debtStartDate || new Date().toISOString().split("T")[0],
      dueDate: debtDueDate || new Date().toISOString().split("T")[0],
      status: "ACTIVE",
    });

    setDebtName("");
    setDebtTotal("");
    setDebtInterest("0");
    setDebtStartDate("");
    setDebtDueDate("");
    setIsDebtModalOpen(false);
  };

  const handlePayDebtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payTargetDebt) return;

    const amt = parseFloat(payAmount.replace(/[^0-9]/g, "")) || 0;
    if (amt > 0) {
      payDebt(payTargetDebt.id, amt);
    }
    setPayTargetDebt(null);
    setPayAmount("");
  };

  const handleCreateInvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName.trim()) return;

    const amt = parseFloat(invAmount.replace(/[^0-9]/g, "")) || 0;
    addInvestment({
      name: invName.trim(),
      type: invType,
      amount: amt,
      currentValue: Math.round(amt * (1 + (parseFloat(invProfit) || 0) / 100)),
      expectedProfitRate: parseFloat(invProfit) || 0,
      startDate: invStartDate || new Date().toISOString().split("T")[0],
      status: "ACTIVE",
    });

    setInvName("");
    setInvAmount("");
    setInvProfit("6.5");
    setInvStartDate("");
    setIsInvestModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ========================================================
          PHẦN 1: QUẢN LÝ KHOẢN NỢ (Khớp 100% debt-invest-management.JPG)
          ======================================================== */}
      <section className="space-y-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Tổng đã vay
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-700 mt-0.5 block">
                {formatVND(debtTotals.totalBorrowed)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Đã trả
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5 block">
                {formatVND(debtTotals.totalPaid)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                Còn nợ
              </span>
              <span className="text-xl sm:text-2xl font-black text-rose-600 mt-0.5 block">
                {formatVND(debtTotals.remaining)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsDebtModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm khoản nợ</span>
          </button>
        </div>

        {/* Bảng Khoản Nợ */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Mã nợ</th>
                  <th className="py-3.5 px-4">Tên khoản nợ</th>
                  <th className="py-3.5 px-4">Số tiền vay</th>
                  <th className="py-3.5 px-4">Tiến độ trả</th>
                  <th className="py-3.5 px-4">Ngày vay</th>
                  <th className="py-3.5 px-4">Đáo hạn</th>
                  <th className="py-3.5 px-4 text-center">Lãi suất</th>
                  <th className="py-3.5 px-4 text-center">Trạng thái</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {debts.map((d) => {
                  const remaining = Math.max(0, d.totalAmount - d.paidAmount);
                  const isPaid = d.status === "PAID" || remaining === 0;

                  return (
                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400">{d.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{d.name}</td>
                      <td className="py-3.5 px-4 font-black text-slate-800">
                        {formatVND(d.totalAmount)}
                      </td>
                      <td className="py-3.5 px-4 min-w-[140px]">
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-500 font-medium block">
                            {isPaid ? "Còn 0 VND" : `Còn ${formatVND(remaining)}`}
                          </span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isPaid ? "bg-emerald-500" : "bg-blue-600"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((d.paidAmount / d.totalAmount) * 100)
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {formatDateVN(d.startDate)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {formatDateVN(d.dueDate)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                        {d.interestRate}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : "bg-rose-50 text-rose-600 border border-rose-200"
                          }`}
                        >
                          {isPaid ? "Đã trả" : "Đang vay"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {!isPaid && (
                            <button
                              onClick={() => {
                                setPayTargetDebt(d);
                                setPayAmount("");
                              }}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-lg transition-colors"
                            >
                              Trả nợ
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteDebtId(d.id)}
                            className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PHẦN 2: QUẢN LÝ ĐẦU TƯ (Khớp 100% debt-invest-management.JPG)
          ======================================================== */}
      <section className="space-y-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Tổng đã đầu tư
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-700 mt-0.5 block">
                {formatVND(investTotals.totalInvested)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Đang đầu tư
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-600 mt-0.5 block">
                {formatVND(investTotals.activeInvested)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsInvestModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm khoản đầu tư</span>
          </button>
        </div>

        {/* Bảng Đầu tư */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Mã</th>
                  <th className="py-3.5 px-4">Tên khoản đầu tư</th>
                  <th className="py-3.5 px-4">Loại</th>
                  <th className="py-3.5 px-4">Số tiền vốn</th>
                  <th className="py-3.5 px-4">Ngày bắt đầu</th>
                  <th className="py-3.5 px-4 text-center">Lợi nhuận dự kiến</th>
                  <th className="py-3.5 px-4 text-center">Trạng thái</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {investments.map((i) => {
                  const isActive = i.status === "ACTIVE";
                  const typeLabel =
                    i.type === "GOLD"
                      ? "Vàng"
                      : i.type === "SAVINGS"
                      ? "Tiết kiệm"
                      : i.type === "STOCK"
                      ? "Chứng khoán"
                      : "Khác";

                  return (
                    <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400">{i.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{i.name}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-600">{typeLabel}</td>
                      <td className="py-3.5 px-4 font-black text-slate-800">
                        {formatVND(i.amount)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {formatDateVN(i.startDate)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-600">
                        {i.expectedProfitRate}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isActive
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {isActive ? "Đang đầu tư" : "Đã kết thúc"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {isActive ? (
                            <button
                              onClick={() => updateInvestment(i.id, { status: "CLOSED" })}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors"
                            >
                              Tất toán
                            </button>
                          ) : (
                            <button
                              onClick={() => updateInvestment(i.id, { status: "ACTIVE" })}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[11px] font-bold rounded-lg transition-colors"
                            >
                              Kích hoạt lại
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteInvestId(i.id)}
                            className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal Trả Nợ */}
      {payTargetDebt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              Ghi nhận trả nợ - {payTargetDebt.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Còn nợ: {formatVND(payTargetDebt.totalAmount - payTargetDebt.paidAmount)}
            </p>

            <form onSubmit={handlePayDebtSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Số tiền trả đợt này (VND)
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={payAmount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setPayAmount(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                  }}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-bold outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPayTargetDebt(null)}
                  className="flex-1 py-2.5 text-xs font-semibold bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow-md"
                >
                  Xác nhận trả
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Thêm Khoản Nợ */}
      {isDebtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Thêm khoản nợ mới</h3>
              <button onClick={() => setIsDebtModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDebt} className="space-y-3.5 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tên khoản nợ</label>
                <input
                  type="text"
                  required
                  value={debtName}
                  onChange={(e) => setDebtName(e.target.value)}
                  placeholder="VD: Vay mua xe, Mượn bạn..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Số tiền vay (VND)</label>
                <input
                  type="text"
                  required
                  value={debtTotal}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setDebtTotal(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                  }}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Ngày vay</label>
                  <input
                    type="date"
                    required
                    value={debtStartDate}
                    onChange={(e) => setDebtStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Ngày đáo hạn</label>
                  <input
                    type="date"
                    required
                    value={debtDueDate}
                    onChange={(e) => setDebtDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Lãi suất (%/năm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={debtInterest}
                  onChange={(e) => setDebtInterest(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDebtModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25"
                >
                  Lưu khoản nợ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Thêm Đầu tư */}
      {isInvestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Thêm khoản đầu tư</h3>
              <button onClick={() => setIsInvestModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvest} className="space-y-3.5 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tên khoản đầu tư</label>
                <input
                  type="text"
                  required
                  value={invName}
                  onChange={(e) => setInvName(e.target.value)}
                  placeholder="VD: Vàng SJC, Cổ phiếu FPT..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Loại đầu tư</label>
                <select
                  value={invType}
                  onChange={(e) => setInvType(e.target.value as InvestmentType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="GOLD">Vàng</option>
                  <option value="SAVINGS">Tiết kiệm ngân hàng</option>
                  <option value="STOCK">Cổ phiếu / Chứng khoán</option>
                  <option value="OTHER">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Số tiền vốn (VND)</label>
                <input
                  type="text"
                  required
                  value={invAmount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setInvAmount(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                  }}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Lợi nhuận dự kiến (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={invProfit}
                    onChange={(e) => setInvProfit(e.target.value)}
                    placeholder="6.5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    required
                    value={invStartDate}
                    onChange={(e) => setInvStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsInvestModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25"
                >
                  Lưu đầu tư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm xóa nợ */}
      <ConfirmDialog
        isOpen={deleteDebtId !== null}
        title="Xóa khoản nợ này?"
        message="Khoản nợ này sẽ bị xóa khỏi danh sách theo dõi."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        isDanger={true}
        onConfirm={() => {
          if (deleteDebtId) {
            deleteDebt(deleteDebtId);
            setDeleteDebtId(null);
          }
        }}
        onCancel={() => setDeleteDebtId(null)}
      />

      {/* Confirm xóa đầu tư */}
      <ConfirmDialog
        isOpen={deleteInvestId !== null}
        title="Xóa khoản đầu tư này?"
        message="Khoản đầu tư này sẽ bị xóa khỏi danh mục của bạn."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        isDanger={true}
        onConfirm={() => {
          if (deleteInvestId) {
            deleteInvestment(deleteInvestId);
            setDeleteInvestId(null);
          }
        }}
        onCancel={() => setDeleteInvestId(null)}
      />
    </div>
  );
}

// [Kết thúc tệp: components/views/DebtsInvestView.tsx]
```

---

## 📄 Tệp: `components/views/GuideView.tsx`

```typescript
// [Bắt đầu tệp: components/views/GuideView.tsx]
"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowLeftRight,
  CreditCard,
  Target,
  Coins,
  TrendingUp,
  Settings,
  Home,
  Users,
} from "lucide-react";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export function GuideView() {
  const [openSectionId, setOpenSectionId] = useState<string>("family");

  const toggleSection = (id: string) => {
    setOpenSectionId(openSectionId === id ? "" : id);
  };

  const sections: GuideSection[] = [
    {
      id: "family",
      title: "Cơ chế quản lý tài chính Tổ Ấm (Anh Chuột & Bé Mèo)",
      icon: Users,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/60 flex items-start gap-3 text-blue-900">
            <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Nguyên tắc đồng thuận:</strong> HOME MONI giúp Anh Chuột và Bé Mèo nắm rõ thu nhập, chi tiêu và nợ thẻ tín dụng của nhau nhưng vẫn tôn trọng các khoản chi tiêu cá nhân hợp lý.
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Bộ lọc góc nhìn (Sidebar & TopBar):</strong> Bấm <code>[ 🏡 My Home ]</code> để xem bức tranh chung tổ ấm, hoặc bấm <code>[ 👨 Anh Chuột ]</code> / <code>[ 👩 Bé Mèo ]</code> để lọc riêng tài khoản và chi phí của từng người.
            </li>
            <li>
              <strong>Phân loại mục đích:</strong> Khi ghi chép, chọn <strong>🏠 Chung gia đình</strong> (tiền nhà, tiền chợ, điện nước, con cái) hoặc <strong>👤 Cá nhân riêng</strong> (cà phê, sở thích riêng).
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "credit",
      title: "Quản lý 2 thẻ tín dụng BIDV Credit (50tr & 20tr)",
      icon: CreditCard,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Tổ ấm sử dụng 2 thẻ BIDV Credit: thẻ của <strong>Anh Chuột (Hạn mức 50.000.000 ₫)</strong> và thẻ của <strong>Bé Mèo (Hạn mức 20.000.000 ₫)</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Cơ chế dư nợ:</strong> Khi quẹt thẻ tín dụng, số dư nợ sẽ tăng lên. Khi lấy tiền lương Vietinbank/VCB chuyển vào thanh toán thẻ, dư nợ sẽ giảm xuống.
            </li>
            <li>
              <strong>Ngưỡng an toàn 70%:</strong> Không nên quẹt vượt quá 70% hạn mức thẻ để giữ điểm tín dụng tốt và tránh áp lực trả nợ cuối kỳ.
            </li>
            <li>
              <strong>Nhắc ngày sao kê:</strong> Hệ thống tự động cảnh báo ngày sao kê thẻ Anh Chuột (20 hàng tháng, hạn trả 25) và thẻ Bé Mèo (22 hàng tháng, hạn trả 28) trên chuông thông báo.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "accounts",
      title: "Hệ thống 6 tài khoản ngân hàng của gia đình",
      icon: CreditCard,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Vietinbank (Anh Chuột):</strong> Nhận lương chính của Anh Chuột. Dùng trích tiền nhà và nạp sang ví chi tiêu.</li>
            <li><strong>BIDV (Anh Chuột):</strong> Ví phụ chi tiêu thường ngày của Anh Chuột.</li>
            <li><strong>Vietcombank (Bé Mèo):</strong> Nhận lương chính của Bé Mèo. Dùng tiết kiệm và chuyển sang ví đi chợ.</li>
            <li><strong>ACB (Bé Mèo):</strong> Ví phụ chi tiêu sinh hoạt, đi chợ, siêu thị của Bé Mèo.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "planning",
      title: "Ngân sách tháng & Chỉ số tiêu mỗi ngày",
      icon: Target,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Chỉ số <strong>"Mỗi ngày còn được tiêu X VND"</strong> lấy số tiền ngân sách còn lại chia đều cho số ngày thực tế còn lại trong tháng, giúp 2 vợ chồng điều tiết chi tiêu hợp lý.
          </p>
        </div>
      ),
    },
    {
      id: "settings",
      title: "Cài đặt & Sao lưu LocalStorage an toàn",
      icon: Settings,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Dữ liệu tài chính gia đình được mã hóa và lưu trực tiếp trên thiết bị này. Hãy xuất file sao lưu JSON định kỳ để bảo toàn dữ liệu.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Cẩm nang sử dụng HOME MONI
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Quy chuẩn quản lý tài chính song hành cho 2 vợ chồng
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSectionId === sec.id;
          const Icon = sec.icon;

          return (
            <div
              key={sec.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-slate-800">{sec.title}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-white">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/views/GuideView.tsx]
```

---

## 📄 Tệp: `components/views/OverviewView.tsx`

```typescript
// [Bắt đầu tệp: components/views/OverviewView.tsx]
"use client";

import React from "react";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { DualCreditCardsWidget } from "@/components/dashboard/DualCreditCardsWidget";
import { FamilyCashflowWidget } from "@/components/dashboard/FamilyCashflowWidget";
import { MonthlyTrendChart } from "@/components/dashboard/MonthlyTrendChart";
import { ExpensePieChart } from "@/components/dashboard/ExpensePieChart";
import { IncomePieChart } from "@/components/dashboard/IncomePieChart";
import { TrendLineCharts } from "@/components/dashboard/TrendLineCharts";
import { AssetDebtGoalsWidgets } from "@/components/dashboard/AssetDebtGoalsWidgets";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";

export function OverviewView() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Bốn Thẻ Chỉ Số Gradient Tổng quan */}
      <section aria-label="Thống kê tổng quan">
        <SummaryCards />
      </section>

      {/* 2. Widget Quản lý 2 Thẻ Tín Dụng BIDV Credit (50tr & 20tr) */}
      <section aria-label="Quản lý thẻ tín dụng BIDV">
        <DualCreditCardsWidget />
      </section>

      {/* 3. Phân Tích Dòng Tiền Thu Nhập 2 Vợ Chồng & Lịch Chi Tiêu Heatmap */}
      <section aria-label="Dòng tiền gia đình">
        <FamilyCashflowWidget />
      </section>

      {/* 4. Hàng Biểu Đồ: Thu - Chi các tháng, Chi theo danh mục, Thu theo nguồn */}
      <section aria-label="Biểu đồ phân tích" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MonthlyTrendChart />
        </div>
        <div className="lg:col-span-1">
          <ExpensePieChart />
        </div>
        <div className="lg:col-span-1">
          <IncomePieChart />
        </div>
      </section>

      {/* 5. Xu hướng tích lũy */}
      <section aria-label="Xu hướng lũy kế">
        <TrendLineCharts />
      </section>

      {/* 6. Tài sản nợ & mục tiêu */}
      <section aria-label="Tài sản nợ và mục tiêu">
        <AssetDebtGoalsWidgets />
      </section>

      {/* 7. Hoạt động gần đây & Ngân sách tháng */}
      <section aria-label="Hoạt động gần đây">
        <RecentActivitySection />
      </section>
    </div>
  );
}

// [Kết thúc tệp: components/views/OverviewView.tsx]
```

---

## 📄 Tệp: `components/views/PlanningView.tsx`

```typescript
// [Bắt đầu tệp: components/views/PlanningView.tsx]
"use client";

import React, { useState } from "react";
import {
  Target,
  Sliders,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  X,
  Coins,
  ShieldAlert,
  Plane,
  Laptop,
  Trash2,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { formatVND } from "@/lib/formatters";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export function PlanningView() {
  const {
    budgetSummary,
    goals,
    categories,
    setCategoryBudget,
    addGoal,
    depositGoal,
    deleteGoal,
  } = useFinance();

  const [activeSubTab, setActiveSubTab] = useState<"BUDGET" | "GOALS">("BUDGET");
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [depositGoalId, setDepositGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [deleteGoalId, setDeleteGoalId] = useState<string | null>(null);

  // New goal form states
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalCurrent, setGoalCurrent] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim()) return;

    const target = parseFloat(goalTarget.replace(/[^0-9]/g, "")) || 0;
    const current = parseFloat(goalCurrent.replace(/[^0-9]/g, "")) || 0;

    addGoal({
      name: goalName.trim(),
      targetAmount: target,
      currentAmount: current,
      deadline: goalDeadline || undefined,
    });

    setGoalName("");
    setGoalTarget("");
    setGoalCurrent("");
    setGoalDeadline("");
    setIsGoalModalOpen(false);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositGoalId) return;

    const amt = parseFloat(depositAmount.replace(/[^0-9]/g, "")) || 0;
    if (amt > 0) {
      depositGoal(depositGoalId, amt);
    }
    setDepositGoalId(null);
    setDepositAmount("");
  };

  const getGoalIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("khẩn cấp") || lower.includes("quỹ")) return <ShieldAlert className="w-5 h-5 text-rose-500" />;
    if (lower.includes("du lịch") || lower.includes("đà lạt") || lower.includes("vé")) return <Plane className="w-5 h-5 text-blue-500" />;
    return <Laptop className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Tab Switcher: Ngân sách vs Mục tiêu (Khớp hình financial-plan.JPG) */}
      <div className="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveSubTab("BUDGET")}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeSubTab === "BUDGET"
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Ngân sách tháng
        </button>
        <button
          onClick={() => setActiveSubTab("GOALS")}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeSubTab === "GOALS"
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Mục tiêu tiết kiệm
        </button>
      </div>

      {activeSubTab === "BUDGET" ? (
        <div className="space-y-6">
          {/* Header 4 thẻ chỉ số ngân sách tháng (Khớp 100% financial-plan.JPG) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-800">Theo dõi ngân sách tháng</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Theo dõi chi tiêu tháng này so với ngân sách đặt cho từng danh mục chi
                </p>
              </div>
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors self-start sm:self-auto"
              >
                <Sliders className="w-4 h-4 text-slate-500" />
                <span>Đặt ngân sách</span>
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Tổng ngân sách tháng
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-800 mt-1 block">
                  {formatVND(budgetSummary.totalBudget)}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Đã chi
                </span>
                <span className="text-xl sm:text-2xl font-black text-rose-600 mt-1 block">
                  {formatVND(budgetSummary.totalSpent)}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Còn lại
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-1 block">
                  {formatVND(budgetSummary.remaining)}
                </span>
              </div>
              <div className="bg-blue-50/70 p-3 sm:p-4 rounded-2xl border border-blue-100">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Mỗi ngày còn được tiêu ({budgetSummary.daysRemaining} ngày)
                </span>
                <span className="text-lg sm:text-xl font-black text-blue-700 mt-1 block">
                  {formatVND(budgetSummary.dailyAllowance)}
                </span>
              </div>
            </div>
          </div>

          {/* Grid Hạn mức từng danh mục (Khớp 100% financial-plan.JPG) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetSummary.items.map((item) => {
              const isOver = item.percentage >= 100;
              return (
                <div
                  key={item.categoryId}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.categoryColor }}
                      />
                      <h4 className="font-bold text-slate-800 text-sm">{item.categoryName}</h4>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {formatVND(item.spentAmount)} / {formatVND(item.limitAmount)}
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOver ? "bg-amber-500" : "bg-teal-500"
                      }`}
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span>
                      {isOver ? "Còn 0 VND" : `Còn ${formatVND(item.remainingAmount)}`}
                    </span>
                    <span className={`font-bold ${isOver ? "text-amber-600" : "text-teal-600"}`}>
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TAB 2: MỤC TIÊU TIẾT KIỆM (Khớp 100% financial-plan.JPG) */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Mục tiêu tài chính</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Đặt mục tiêu tiết kiệm và theo dõi số tiền cần để dành mỗi tháng
              </p>
            </div>
            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm mục tiêu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((g) => {
              const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
              const isDone = pct === 100;

              return (
                <div
                  key={g.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          {getGoalIcon(g.name)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{g.name}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {g.deadline ? `Hạn: ${g.deadline.split("-").reverse().join("/")}` : "Không đặt hạn"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-baseline mb-1.5 text-xs">
                        <span className="font-black text-slate-800">
                          {formatVND(g.currentAmount)}
                        </span>
                        <span className="text-slate-400 font-semibold">
                          / {formatVND(g.targetAmount)}
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isDone ? "bg-emerald-500" : "bg-blue-600"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] mt-2 font-medium">
                        <span className="text-slate-500">
                          {isDone ? "🎉 Đã hoàn thành!" : `Tiến độ: ${pct}%`}
                        </span>
                        {!isDone && (
                          <span className="text-blue-600 font-semibold">
                            Cần ~{formatVND(Math.round((g.targetAmount - g.currentAmount) / 12))}/tháng
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {!isDone ? (
                      <button
                        onClick={() => setDepositGoalId(g.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl transition-colors"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>Nạp thêm</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Đạt mục tiêu
                      </span>
                    )}

                    <button
                      onClick={() => setDeleteGoalId(g.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Cài đặt Hạn mức Ngân sách */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Cài đặt hạn mức ngân sách tháng</h3>
              <button onClick={() => setIsBudgetModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {categories
                .filter((c) => c.type === "EXPENSE")
                .map((cat) => {
                  const currentBudget = budgetSummary.items.find((b) => b.categoryId === cat.id)?.limitAmount || 0;
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-xs font-bold text-slate-800">{cat.name}</span>
                      </div>
                      <input
                        type="text"
                        defaultValue={new Intl.NumberFormat("vi-VN").format(currentBudget)}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value.replace(/[^0-9]/g, "")) || 0;
                          setCategoryBudget(cat.id, val);
                        }}
                        className="w-32 text-right bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-black text-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>
                  );
                })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nạp thêm tiền vào Mục tiêu */}
      {depositGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-3">Nạp tiền vào mục tiêu</h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Số tiền nạp (VND)</label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={depositAmount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setDepositAmount(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                  }}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDepositGoalId(null)}
                  className="flex-1 py-2 text-xs font-semibold bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl shadow-md"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tạo Mục Tiêu Mới */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Thêm mục tiêu tiết kiệm</h3>
              <button onClick={() => setIsGoalModalOpen(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3.5 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tên mục tiêu</label>
                <input
                  type="text"
                  required
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="VD: Quỹ dự phòng, Mua xe máy..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Số tiền mục tiêu (VND)</label>
                <input
                  type="text"
                  required
                  value={goalTarget}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setGoalTarget(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                  }}
                  placeholder="VD: 50.000.000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Hiện đã có (VND)</label>
                <input
                  type="text"
                  value={goalCurrent}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setGoalCurrent(raw ? new Intl.NumberFormat("vi-VN").format(parseInt(raw, 10)) : "");
                  }}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Hạn mục tiêu (Tùy chọn)</label>
                <input
                  type="date"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25"
                >
                  Lưu mục tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Dialog Xóa mục tiêu */}
      <ConfirmDialog
        isOpen={deleteGoalId !== null}
        title="Xóa mục tiêu này?"
        message="Mục tiêu tiết kiệm này sẽ bị xóa khỏi kế hoạch tài chính của bạn."
        confirmLabel="Xóa mục tiêu"
        cancelLabel="Hủy"
        isDanger={true}
        onConfirm={() => {
          if (deleteGoalId) {
            deleteGoal(deleteGoalId);
            setDeleteGoalId(null);
          }
        }}
        onCancel={() => setDeleteGoalId(null)}
      />
    </div>
  );
}

// [Kết thúc tệp: components/views/PlanningView.tsx]
```

---

## 📄 Tệp: `components/views/SettingsView.tsx`

```typescript
// [Bắt đầu tệp: components/views/SettingsView.tsx]
"use client";

import React, { useState } from "react";
import {
  Palette,
  Shield,
  Download,
  RotateCcw,
  Check,
  CheckCircle2,
  HardDrive,
  Info,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { ThemeColor } from "@/types/finance";

interface SettingsViewProps {
  onOpenBackupModal: () => void;
  onOpenResetConfirm: () => void;
}

const THEME_OPTIONS: { id: ThemeColor; name: string; bgClass: string; hex: string }[] = [
  { id: "blue", name: "Xanh dương", bgClass: "bg-blue-600", hex: "#2563EB" },
  { id: "purple", name: "Tím thạch anh", bgClass: "bg-purple-600", hex: "#9333EA" },
  { id: "pink", name: "Hồng ruby", bgClass: "bg-rose-500", hex: "#F43F5E" },
  { id: "green", name: "Xanh ngọc lục bảo", bgClass: "bg-emerald-600", hex: "#059669" },
  { id: "orange", name: "Cam hoàng hôn", bgClass: "bg-amber-600", hex: "#D97706" },
];

export function SettingsView({
  onOpenBackupModal,
  onOpenResetConfirm,
}: SettingsViewProps) {
  const { settings, updateSettings } = useFinance();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSelectTheme = (color: ThemeColor) => {
    updateSettings({ themeColor: color });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* 1. Tùy biến Giao diện (Khớp 100% hình setting.JPG) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Palette className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-800">Giao diện</h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2">
            Màu sắc chủ đề (được ghi nhớ trên thiết bị này):
          </label>
          <div className="flex items-center gap-3">
            {THEME_OPTIONS.map((t) => {
              const isSelected = settings.themeColor === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  title={t.name}
                  className={`w-10 h-10 rounded-full ${t.bgClass} flex items-center justify-center transition-all ${
                    isSelected
                      ? "ring-4 ring-blue-200 scale-110 shadow-md"
                      : "opacity-85 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  {isSelected && <Check className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>
          {saveSuccess && (
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Đã lưu màu chủ đề thành công!
            </p>
          )}
        </div>
      </div>

      {/* 2. Bảo mật (Khớp hình setting.JPG) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-800">Bảo mật</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Mật khẩu mới</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700"
          >
            Đổi mật khẩu
          </button>
          <p className="text-[11px] text-slate-400 mt-1">
            Ứng dụng hoạt động cục bộ (Local-First). Khóa mã bảo vệ được xác thực trực tiếp trên trình duyệt của bạn.
          </p>
        </div>
      </div>

      {/* 3. Dữ liệu & Sao lưu */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <HardDrive className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-800">Quản lý Dữ liệu LocalStorage</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onOpenBackupModal}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Sao lưu / Phục hồi JSON</span>
          </button>

          <button
            onClick={onOpenResetConfirm}
            className="flex-1 py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Nạp lại dữ liệu mẫu Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// [Kết thúc tệp: components/views/SettingsView.tsx]
```

---

## 📄 Tệp: `components/views/TransactionsView.tsx`

```typescript
// [Bắt đầu tệp: components/views/TransactionsView.tsx]
"use client";

import React, { useState, useMemo } from "react";
import {
  Trash2,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Search,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  Users,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { formatVND, formatDateVN, getMonthDisplayLabel } from "@/lib/formatters";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

interface TransactionsViewProps {
  onOpenAddModal: () => void;
  onOpenBackupModal: () => void;
}

export function TransactionsView({
  onOpenAddModal,
  onOpenBackupModal,
}: TransactionsViewProps) {
  const {
    filteredTransactions,
    categories,
    accounts,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    selectedAccount,
    setSelectedAccount,
    searchQuery,
    setSearchQuery,
    getCategoryById,
    getAccountById,
    deleteTransaction,
    activePerspective,
  } = useFinance();

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filterSummary = useMemo(() => {
    let income = 0;
    let expense = 0;

    filteredTransactions.forEach((tx) => {
      if (tx.type === "INCOME") income += tx.amount;
      if (tx.type === "EXPENSE") expense += tx.amount;
    });

    return {
      count: filteredTransactions.length,
      income,
      expense,
      diff: income - expense,
    };
  }, [filteredTransactions]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage]);

  const targetTx = filteredTransactions.find((tx) => tx.id === deleteTargetId);

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* 1. Thanh Lọc & Tìm kiếm Toàn diện */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Quick Month Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedMonth("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedMonth === "ALL"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              Tất cả thời gian
            </button>
            {availableMonths.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedMonth === m
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {getMonthDisplayLabel(m)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBackupModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất dữ liệu</span>
            </button>
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm giao dịch</span>
            </button>
          </div>
        </div>

        {/* Dòng Dropdowns: Loại, Tài khoản, Danh mục, Search */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả loại giao dịch</option>
              <option value="INCOME">Thu nhập</option>
              <option value="EXPENSE">Chi tiêu</option>
              <option value="TRANSFER">Chuyển khoản</option>
            </select>
          </div>

          <div>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả tài khoản (Ví)</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.type === "INCOME" ? "[Thu] " : "[Chi] "}
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo ghi chú..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Dòng Tóm tắt Chỉ số */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 px-2 text-xs font-bold text-slate-600">
        <span className="text-slate-700">
          📋 <strong>{filterSummary.count}</strong> giao dịch {activePerspective !== "ALL" ? `(${activePerspective === "HUSBAND" ? "Anh Chuột" : "Bé Mèo"})` : "(My Home)"}
        </span>
        <span className="text-emerald-600">
          Thu: <strong>{formatVND(filterSummary.income)}</strong>
        </span>
        <span className="text-rose-600">
          Chi: <strong>{formatVND(filterSummary.expense)}</strong>
        </span>
        <span className="text-blue-600">
          Chênh lệch: <strong>{formatVND(filterSummary.diff)}</strong>
        </span>
      </div>

      {/* 3. Bảng Giao Dịch Chi Tiết */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">Không tìm thấy giao dịch nào phù hợp</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Ngày</th>
                  <th className="py-3.5 px-4">Người chi</th>
                  <th className="py-3.5 px-4">Loại</th>
                  <th className="py-3.5 px-4">Mục đích</th>
                  <th className="py-3.5 px-4">Danh mục</th>
                  <th className="py-3.5 px-4 text-right">Số tiền</th>
                  <th className="py-3.5 px-4">Tài khoản</th>
                  <th className="py-3.5 px-4">Ghi chú</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedList.map((tx) => {
                  const cat = getCategoryById(tx.categoryId);
                  const acc = getAccountById(tx.accountId);
                  const toAcc = tx.toAccountId ? getAccountById(tx.toAccountId) : undefined;
                  const isExpense = tx.type === "EXPENSE";
                  const isTransfer = tx.type === "TRANSFER";

                  return (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                        {formatDateVN(tx.date)}
                      </td>

                      {/* Người chi (Chồng hay Vợ) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            tx.memberId === "HUSBAND"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {tx.memberId === "HUSBAND" ? "👨 Anh Chuột" : "👩 Bé Mèo"}
                        </span>
                      </td>

                      {/* Loại */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isTransfer
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : isExpense
                              ? "bg-rose-50 text-rose-600 border border-rose-200"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          }`}
                        >
                          {isTransfer ? (
                            <>
                              <ArrowLeftRight className="w-3 h-3" />
                              Chuyển khoản
                            </>
                          ) : isExpense ? (
                            <>
                              <ArrowUpRight className="w-3 h-3" />
                              Chi
                            </>
                          ) : (
                            <>
                              <ArrowDownLeft className="w-3 h-3" />
                              Thu
                            </>
                          )}
                        </span>
                      </td>

                      {/* Mục đích (Chung gia đình vs Cá nhân) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            tx.scope === "FAMILY"
                              ? "bg-slate-100 text-slate-700"
                              : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}
                        >
                          {tx.scope === "FAMILY" ? "🏠 Chung nhà" : "👤 Riêng"}
                        </span>
                      </td>

                      {/* Danh mục */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200/60">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: cat?.color || "#94A3B8" }}
                          />
                          <span>{isTransfer ? "Chuyển khoản ví" : cat?.name || "Khác"}</span>
                        </div>
                      </td>

                      {/* Số tiền */}
                      <td
                        className={`py-3.5 px-4 text-right font-black whitespace-nowrap ${
                          isTransfer
                            ? "text-blue-600"
                            : isExpense
                            ? "text-rose-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {isExpense ? "-" : isTransfer ? "" : "+"} {formatVND(tx.amount)}
                      </td>

                      {/* Tài khoản */}
                      <td className="py-3.5 px-4 text-slate-600 font-semibold whitespace-nowrap">
                        {isTransfer ? `${acc?.name} → ${toAcc?.name}` : acc?.name || "Ví tiền"}
                      </td>

                      {/* Ghi chú */}
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-600 font-medium">
                        {tx.note || <span className="text-slate-300 italic">—</span>}
                      </td>

                      {/* Xóa */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setDeleteTargetId(tx.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Phân trang */}
        {filteredTransactions.length > pageSize && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg font-bold text-xs ${
                    currentPage === p ? "bg-blue-600 text-white" : "hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span>
              Hiển thị {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, filteredTransactions.length)} của{" "}
              {filteredTransactions.length} giao dịch
            </span>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Xóa giao dịch này?"
        message={`Bạn có chắc muốn xóa giao dịch ${
          targetTx ? formatVND(targetTx.amount) : ""
        }?`}
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        isDanger={true}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteTransaction(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

// [Kết thúc tệp: components/views/TransactionsView.tsx]
```

---

## 📄 Tệp: `constants/defaultCategories.ts`

```typescript
// [Bắt đầu tệp: constants/defaultCategories.ts]
import { Category } from "@/types/finance";

export const DEFAULT_CATEGORIES: Category[] = [
  // CHI TIÊU (EXPENSE)
  {
    id: "cat_expense_food",
    name: "Ăn uống",
    type: "EXPENSE",
    color: "#3B82F6", // Blue
    icon: "Utensils",
    isDefault: true,
  },
  {
    id: "cat_expense_rent",
    name: "Tiền nhà",
    type: "EXPENSE",
    color: "#F43F5E", // Rose
    icon: "Home",
    isDefault: true,
  },
  {
    id: "cat_expense_transport",
    name: "Đi lại",
    type: "EXPENSE",
    color: "#6366F1", // Indigo
    icon: "Car",
    isDefault: true,
  },
  {
    id: "cat_expense_shopping",
    name: "Mua sắm",
    type: "EXPENSE",
    color: "#F59E0B", // Amber
    icon: "ShoppingBag",
    isDefault: true,
  },
  {
    id: "cat_expense_health",
    name: "Sức khoẻ",
    type: "EXPENSE",
    color: "#10B981", // Emerald
    icon: "HeartPulse",
    isDefault: true,
  },
  {
    id: "cat_expense_bills",
    name: "Hoá đơn",
    type: "EXPENSE",
    color: "#EC4899", // Pink
    icon: "Zap",
    isDefault: true,
  },
  {
    id: "cat_expense_entertainment",
    name: "Giải trí",
    type: "EXPENSE",
    color: "#8B5CF6", // Purple
    icon: "Film",
    isDefault: true,
  },
  {
    id: "cat_expense_other",
    name: "Chi phí khác",
    type: "EXPENSE",
    color: "#64748B", // Slate
    icon: "MoreHorizontal",
    isDefault: true,
  },

  // THU NHẬP (INCOME)
  {
    id: "cat_income_salary",
    name: "Lương",
    type: "INCOME",
    color: "#10B981", // Emerald
    icon: "Briefcase",
    isDefault: true,
  },
  {
    id: "cat_income_freelance",
    name: "Freelance",
    type: "INCOME",
    color: "#06B6D4", // Cyan
    icon: "Laptop",
    isDefault: true,
  },
  {
    id: "cat_income_bonus",
    name: "Thưởng",
    type: "INCOME",
    color: "#F59E0B", // Amber
    icon: "Award",
    isDefault: true,
  },
  {
    id: "cat_income_investment",
    name: "Đầu tư",
    type: "INCOME",
    color: "#8B5CF6", // Violet
    icon: "TrendingUp",
    isDefault: true,
  },
];

// [Kết thúc tệp: constants/defaultCategories.ts]
```

---

## 📄 Tệp: `constants/mockData.ts`

```typescript
// [Bắt đầu tệp: constants/mockData.ts]
import {
  Account,
  Transaction,
  CategoryBudget,
  SavingsGoal,
  DebtItem,
  InvestmentItem,
  AppSettings,
  AppNotification,
} from "@/types/finance";

export const DEFAULT_ACCOUNTS: Account[] = [
  // --- TÀI KHOẢN CỦA ANH CHUỘT ---
  {
    id: "acc_husband_vietinbank",
    name: "Vietinbank (Lương Anh Chuột)",
    owner: "HUSBAND",
    type: "BANK",
    isSalaryAccount: true,
    initialBalance: 5000000,
    currentBalance: 32500000,
    accountNumber: "1088****9988",
    color: "#005CA9", // Vietinbank Blue
    icon: "Building2",
  },
  {
    id: "acc_husband_bidv",
    name: "BIDV (Chi tiêu Anh Chuột)",
    owner: "HUSBAND",
    type: "BANK",
    initialBalance: 2000000,
    currentBalance: 6450000,
    accountNumber: "1221****6789",
    color: "#0A6E3F", // BIDV Emerald
    icon: "Banknote",
  },
  {
    id: "acc_husband_bidv_credit",
    name: "BIDV Credit (Anh Chuột)",
    owner: "HUSBAND",
    type: "CREDIT_CARD",
    creditLimit: 50000000, // Hạn mức 50 triệu VND
    initialBalance: 0,
    currentBalance: 12500000, // Dư nợ đang dùng
    accountNumber: "4111****5050",
    color: "#1E3A8A", // BIDV Navy
    icon: "CreditCard",
  },

  // --- TÀI KHOẢN CỦA BÉ MÈO ---
  {
    id: "acc_wife_vcb",
    name: "Vietcombank (Lương Bé Mèo)",
    owner: "WIFE",
    type: "BANK",
    isSalaryAccount: true,
    initialBalance: 4000000,
    currentBalance: 26800000,
    accountNumber: "0071****1234",
    color: "#008542", // Vietcombank Green
    icon: "Building2",
  },
  {
    id: "acc_wife_acb",
    name: "ACB (Chi tiêu Bé Mèo)",
    owner: "WIFE",
    type: "BANK",
    initialBalance: 1500000,
    currentBalance: 5320000,
    accountNumber: "2345****8888",
    color: "#0060AF", // ACB Blue
    icon: "Banknote",
  },
  {
    id: "acc_wife_bidv_credit",
    name: "BIDV Credit (Bé Mèo)",
    owner: "WIFE",
    type: "CREDIT_CARD",
    creditLimit: 20000000, // Hạn mức 20 triệu VND
    initialBalance: 0,
    currentBalance: 4200000, // Dư nợ đang dùng
    accountNumber: "4111****2020",
    color: "#D97706", // BIDV Amber
    icon: "CreditCard",
  },

  // --- QUỸ CHUNG GIA ĐÌNH ---
  {
    id: "acc_family_cash",
    name: "Tiền mặt Gia đình",
    owner: "SHARED",
    type: "CASH",
    initialBalance: 2000000,
    currentBalance: 3500000,
    color: "#10B981",
    icon: "Wallet",
  },
];

export const DEFAULT_DEBTS: DebtItem[] = [
  {
    id: "debt_car",
    name: "Vay mua ô tô gia đình",
    type: "BORROW",
    totalAmount: 120000000,
    paidAmount: 40000000,
    interestRate: 8.5,
    startDate: "2026-01-15",
    dueDate: "2027-12-15",
    status: "ACTIVE",
    memberId: "SHARED",
  },
  {
    id: "debt_house_renovation",
    name: "Mượn ông bà sửa nhà",
    type: "BORROW",
    totalAmount: 30000000,
    paidAmount: 30000000,
    interestRate: 0,
    startDate: "2026-03-01",
    dueDate: "2026-09-01",
    status: "PAID",
    memberId: "SHARED",
  },
];

export const DEFAULT_INVESTMENTS: InvestmentItem[] = [
  {
    id: "inv_gold_family",
    name: "Vàng nhẫn tiết kiệm (2 chỉ)",
    type: "GOLD",
    amount: 17000000,
    currentValue: 18500000,
    expectedProfitRate: 8.8,
    startDate: "2026-03-20",
    status: "ACTIVE",
    memberId: "SHARED",
  },
  {
    id: "inv_savings_nest",
    name: "Sổ tiết kiệm tổ ấm 12 tháng",
    type: "SAVINGS",
    amount: 50000000,
    currentValue: 53200000,
    expectedProfitRate: 6.4,
    startDate: "2026-06-10",
    status: "ACTIVE",
    memberId: "SHARED",
  },
  {
    id: "inv_husband_stocks",
    name: "Cổ phiếu FPT (Chồng)",
    type: "STOCK",
    amount: 25000000,
    currentValue: 28500000,
    expectedProfitRate: 14,
    startDate: "2025-11-15",
    status: "ACTIVE",
    memberId: "HUSBAND",
  },
];

export const DEFAULT_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: "goal_emergency_fund",
    name: "Quỹ khẩn cấp gia đình (6 tháng)",
    targetAmount: 100000000,
    currentAmount: 65000000,
    deadline: "2027-06-01",
    icon: "ShieldAlert",
    isCompleted: false,
    memberId: "SHARED",
  },
  {
    id: "goal_japan_trip",
    name: "Du lịch Nhật Bản 2 vợ chồng",
    targetAmount: 45000000,
    currentAmount: 32000000,
    deadline: "2027-04-15",
    icon: "Plane",
    isCompleted: false,
    memberId: "SHARED",
  },
  {
    id: "goal_upgrade_macbook",
    name: "Nâng cấp máy tính cho Chồng",
    targetAmount: 35000000,
    currentAmount: 35000000,
    icon: "Laptop",
    isCompleted: true,
    memberId: "HUSBAND",
  },
];

export const DEFAULT_BUDGETS: CategoryBudget[] = [
  {
    categoryId: "cat_expense_rent",
    month: "2026-10",
    limitAmount: 7000000, // Tiền thuê nhà & dịch vụ
  },
  {
    categoryId: "cat_expense_food",
    month: "2026-10",
    limitAmount: 8500000, // Tiền chợ, siêu thị & ăn uống gia đình
  },
  {
    categoryId: "cat_expense_bills",
    month: "2026-10",
    limitAmount: 2000000, // Điện, nước, internet
  },
  {
    categoryId: "cat_expense_shopping",
    month: "2026-10",
    limitAmount: 4000000, // Mua sắm vật dụng tổ ấm
  },
  {
    categoryId: "cat_expense_transport",
    month: "2026-10",
    limitAmount: 2500000, // Xăng xe & đi lại của 2 vợ chồng
  },
  {
    categoryId: "cat_expense_entertainment",
    month: "2026-10",
    limitAmount: 2000000, // Hẹn hò, xem phim, cà phê
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  themeColor: "blue",
  currency: "VND",
  notificationsEnabled: true,
  husbandName: "Anh Chuột",
  wifeName: "Bé Mèo",
};

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif_bidv_statement_husband",
    title: "Kỳ sao kê thẻ BIDV Credit (Anh Chuột)",
    message: "Hạn thanh toán thẻ BIDV Credit (Anh Chuột - 50tr) là ngày 25/10. Dư nợ: 12.500.000 ₫",
    type: "warning",
    date: "2026-10-20",
    read: false,
  },
  {
    id: "notif_bidv_statement_wife",
    title: "Kỳ sao kê thẻ BIDV Credit (Bé Mèo)",
    message: "Hạn thanh toán thẻ BIDV Credit (Bé Mèo - 20tr) là ngày 28/10. Dư nợ: 4.200.000 ₫",
    type: "warning",
    date: "2026-10-22",
    read: false,
  },
  {
    id: "notif_budget_food",
    title: "Tiến độ ngân sách Ăn uống",
    message: 'Ngân sách "Ăn uống & Đi chợ" đã dùng 62% hạn mức tháng',
    type: "info",
    date: "2026-10-18",
    read: false,
  },
];

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  // --- THU NHẬP LƯƠNG ANH CHUỘT & BÉ MÈO THÁNG 10/2026 ---
  {
    id: "TX261005080001",
    amount: 28000000,
    date: "2026-10-05",
    type: "INCOME",
    categoryId: "cat_income_salary",
    accountId: "acc_husband_vietinbank",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Lương tháng 9 Tech Corp (Anh Chuột)",
    createdAt: "2026-10-05T08:00:00.000Z",
    updatedAt: "2026-10-05T08:00:00.000Z",
  },
  {
    id: "TX261005083002",
    amount: 22000000,
    date: "2026-10-05",
    type: "INCOME",
    categoryId: "cat_income_salary",
    accountId: "acc_wife_vcb",
    memberId: "WIFE",
    scope: "FAMILY",
    note: "Lương tháng 9 Vingroup (Bé Mèo)",
    createdAt: "2026-10-05T08:30:00.000Z",
    updatedAt: "2026-10-05T08:30:00.000Z",
  },

  // --- CHUYỂN KHOẢN TIỀN VÀO CÁC VÍ CHI TIÊU & QUỸ GIA ĐÌNH ---
  {
    id: "TX261006090003",
    amount: 8000000,
    date: "2026-10-06",
    type: "TRANSFER",
    categoryId: "cat_expense_other",
    accountId: "acc_husband_vietinbank",
    toAccountId: "acc_husband_bidv",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Chuyển tiền vào tài khoản BIDV chi tiêu sinh hoạt",
    createdAt: "2026-10-06T09:00:00.000Z",
    updatedAt: "2026-10-06T09:00:00.000Z",
  },
  {
    id: "TX261006091504",
    amount: 7000000,
    date: "2026-10-06",
    type: "TRANSFER",
    categoryId: "cat_expense_other",
    accountId: "acc_wife_vcb",
    toAccountId: "acc_wife_acb",
    memberId: "WIFE",
    scope: "FAMILY",
    note: "Chuyển tiền vào tài khoản ACB đi chợ & chi tiêu",
    createdAt: "2026-10-06T09:15:00.000Z",
    updatedAt: "2026-10-06T09:15:00.000Z",
  },
  {
    id: "TX261006093005",
    amount: 3000000,
    date: "2026-10-06",
    type: "TRANSFER",
    categoryId: "cat_expense_other",
    accountId: "acc_husband_vietinbank",
    toAccountId: "acc_family_cash",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Rút tiền mặt bỏ hòm tiết kiệm gia đình",
    createdAt: "2026-10-06T09:30:00.000Z",
    updatedAt: "2026-10-06T09:30:00.000Z",
  },

  // --- CÁC KHOẢN CHI TIÊU GIA ĐÌNH CHUNG ---
  {
    id: "TX261006100006",
    amount: 6500000,
    date: "2026-10-06",
    type: "EXPENSE",
    categoryId: "cat_expense_rent",
    accountId: "acc_husband_vietinbank",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Tiền thuê chung cư & phí dịch vụ tháng 10",
    createdAt: "2026-10-06T10:00:00.000Z",
    updatedAt: "2026-10-06T10:00:00.000Z",
  },
  {
    id: "TX261008112007",
    amount: 1250000,
    date: "2026-10-08",
    type: "EXPENSE",
    categoryId: "cat_expense_bills",
    accountId: "acc_wife_acb",
    memberId: "WIFE",
    scope: "FAMILY",
    note: "Hóa đơn tiền điện & nước tháng 9",
    createdAt: "2026-10-08T11:20:00.000Z",
    updatedAt: "2026-10-08T11:20:00.000Z",
  },
  {
    id: "TX261010173008",
    amount: 2450000,
    date: "2026-10-10",
    type: "EXPENSE",
    categoryId: "cat_expense_food",
    accountId: "acc_wife_acb",
    memberId: "WIFE",
    scope: "FAMILY",
    note: "Đi siêu thị WinMart mua đồ ăn tuần cho cả nhà",
    createdAt: "2026-10-10T17:30:00.000Z",
    updatedAt: "2026-10-10T17:30:00.000Z",
  },
  {
    id: "TX261012190009",
    amount: 2100000,
    date: "2026-10-12",
    type: "EXPENSE",
    categoryId: "cat_expense_shopping",
    accountId: "acc_wife_bidv_credit",
    memberId: "WIFE",
    scope: "FAMILY",
    note: "Shopee sắm chăn ga gối nệm phòng ngủ (Quẹt BIDV Credit Bé Mèo)",
    createdAt: "2026-10-12T19:00:00.000Z",
    updatedAt: "2026-10-12T19:00:00.000Z",
  },
  {
    id: "TX261014203010",
    amount: 850000,
    date: "2026-10-14",
    type: "EXPENSE",
    categoryId: "cat_expense_entertainment",
    accountId: "acc_husband_bidv_credit",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Hẹn hò ăn tối lẩu Haidilao 2 vợ chồng (Quẹt BIDV Credit Anh Chuột)",
    createdAt: "2026-10-14T20:30:00.000Z",
    updatedAt: "2026-10-14T20:30:00.000Z",
  },
  {
    id: "TX261016140011",
    amount: 1200000,
    date: "2026-10-16",
    type: "EXPENSE",
    categoryId: "cat_expense_transport",
    accountId: "acc_husband_bidv_credit",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Bảo dưỡng & thay nhớt xe ô tô gia đình (Quẹt BIDV Credit Anh Chuột)",
    createdAt: "2026-10-16T14:00:00.000Z",
    updatedAt: "2026-10-16T14:00:00.000Z",
  },
  {
    id: "TX261018164512",
    amount: 1350000,
    date: "2026-10-18",
    type: "EXPENSE",
    categoryId: "cat_expense_food",
    accountId: "acc_wife_acb",
    memberId: "WIFE",
    scope: "FAMILY",
    note: "Đi chợ đầu mối mua hải sản tẩm bổ cuối tuần",
    createdAt: "2026-10-18T16:45:00.000Z",
    updatedAt: "2026-10-18T16:45:00.000Z",
  },
  {
    id: "TX261020083013",
    amount: 250000,
    date: "2026-10-20",
    type: "EXPENSE",
    categoryId: "cat_expense_bills",
    accountId: "acc_husband_bidv",
    memberId: "HUSBAND",
    scope: "FAMILY",
    note: "Cước internet cáp quang gia đình",
    createdAt: "2026-10-20T08:30:00.000Z",
    updatedAt: "2026-10-20T08:30:00.000Z",
  },

  // --- CÁC KHOẢN CHI TIÊU CÁ NHÂN RIÊNG CỦA CHỒNG HOẶC VỢ ---
  {
    id: "TX261015090014",
    amount: 450000,
    date: "2026-10-15",
    type: "EXPENSE",
    categoryId: "cat_expense_food",
    accountId: "acc_husband_bidv",
    memberId: "HUSBAND",
    scope: "PERSONAL",
    note: "Cà phê & ăn sáng làm việc với đối tác (Chồng)",
    createdAt: "2026-10-15T09:00:00.000Z",
    updatedAt: "2026-10-15T09:00:00.000Z",
  },
  {
    id: "TX261017113015",
    amount: 680000,
    date: "2026-10-17",
    type: "EXPENSE",
    categoryId: "cat_expense_shopping",
    accountId: "acc_wife_acb",
    memberId: "WIFE",
    scope: "PERSONAL",
    note: "Mỹ phẩm dưỡng da chăm sóc sắc đẹp (Vợ)",
    createdAt: "2026-10-17T11:30:00.000Z",
    updatedAt: "2026-10-17T11:30:00.000Z",
  },
];

// [Kết thúc tệp: constants/mockData.ts]
```

---

## 📄 Tệp: `context/FinanceContext.tsx`

```typescript
// [Bắt đầu tệp: context/FinanceContext.tsx]
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  Category,
  Account,
  Transaction,
  CategoryBudget,
  SavingsGoal,
  DebtItem,
  InvestmentItem,
  AppSettings,
  AppNotification,
  TransactionType,
  FinancialSummary,
  CategoryExpenseStat,
  FamilyMember,
  ExpenseScope,
} from "@/types/finance";
import {
  loadStoredDataV3,
  saveStoredDataV3,
  seedInitialDataV3,
  exportDataToJsonV3,
  importDataFromJsonV3,
  recalculateAccountBalances,
} from "@/lib/storage";
import { getCurrentMonthKey } from "@/lib/formatters";
import { DEFAULT_CATEGORIES } from "@/constants/defaultCategories";
import {
  DEFAULT_ACCOUNTS,
  DEFAULT_BUDGETS,
  DEFAULT_SAVINGS_GOALS,
  DEFAULT_DEBTS,
  DEFAULT_INVESTMENTS,
  DEFAULT_SETTINGS,
  DEFAULT_NOTIFICATIONS,
} from "@/constants/mockData";

export type NavTab =
  | "overview"
  | "transactions"
  | "accounts"
  | "planning"
  | "debts_invest"
  | "guide"
  | "settings";

export type PerspectiveMode = "ALL" | "HUSBAND" | "WIFE";

interface TransactionInput {
  amount: number;
  date: string;
  type: TransactionType;
  categoryId: string;
  accountId: string;
  toAccountId?: string;
  memberId: FamilyMember;
  scope: ExpenseScope;
  note?: string;
  tag?: "NORMAL" | "DEBT" | "INVESTMENT" | "RECURRING";
}

interface MonthlyTrendItem {
  month: string;
  label: string;
  income: number;
  expense: number;
}

interface BudgetProgressItem {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  limitAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentage: number;
}

interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  daysRemaining: number;
  dailyAllowance: number;
  items: BudgetProgressItem[];
}

export interface CreditCardInfo {
  account: Account;
  creditLimit: number;
  usedAmount: number;
  availableAmount: number;
  usagePercentage: number;
}

interface FinanceContextType {
  isLoaded: boolean;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Góc nhìn thành viên (Cả nhà / Chồng / Vợ)
  activePerspective: PerspectiveMode;
  setActivePerspective: (mode: PerspectiveMode) => void;

  categories: Category[];
  accounts: Account[];
  transactions: Transaction[];
  budgets: CategoryBudget[];
  goals: SavingsGoal[];
  debts: DebtItem[];
  investments: InvestmentItem[];
  settings: AppSettings;
  notifications: AppNotification[];

  // Bộ lọc
  selectedMonth: string;
  selectedCategory: string;
  selectedType: "ALL" | TransactionType;
  selectedAccount: string;
  searchQuery: string;

  setSelectedMonth: (month: string) => void;
  setSelectedCategory: (catId: string) => void;
  setSelectedType: (type: "ALL" | TransactionType) => void;
  setSelectedAccount: (accId: string) => void;
  setSearchQuery: (query: string) => void;

  // CRUD Giao dịch
  addTransaction: (data: TransactionInput) => Transaction;
  updateTransaction: (id: string, data: Partial<TransactionInput>) => void;
  deleteTransaction: (id: string) => void;

  // Quản lý Tài khoản (Ví)
  addAccount: (acc: Omit<Account, "id" | "currentBalance">) => void;
  updateAccount: (id: string, acc: Partial<Account>) => void;
  deleteAccount: (id: string) => void;

  // Quản lý Ngân sách & Mục tiêu
  setCategoryBudget: (categoryId: string, limitAmount: number, month?: string) => void;
  addGoal: (goal: Omit<SavingsGoal, "id" | "isCompleted">) => void;
  updateGoal: (id: string, goal: Partial<SavingsGoal>) => void;
  deleteGoal: (id: string) => void;
  depositGoal: (id: string, amount: number) => void;

  // Quản lý Nợ & Đầu tư
  addDebt: (debt: Omit<DebtItem, "id">) => void;
  payDebt: (id: string, amount: number) => void;
  deleteDebt: (id: string) => void;

  addInvestment: (inv: Omit<InvestmentItem, "id">) => void;
  updateInvestment: (id: string, inv: Partial<InvestmentItem>) => void;
  deleteInvestment: (id: string) => void;

  // Cài đặt & Sao lưu
  updateSettings: (settings: Partial<AppSettings>) => void;
  markNotificationRead: (id: string) => void;
  resetToMockData: () => void;
  exportBackup: () => void;
  importBackup: (file: File) => Promise<{ success: boolean; error?: string }>;

  // Dữ liệu tính toán & Helpers
  availableMonths: string[];
  summary: FinancialSummary;
  budgetSummary: BudgetSummary;
  filteredTransactions: Transaction[];
  categoryExpenseStats: CategoryExpenseStat[];
  monthlyTrendData: MonthlyTrendItem[];
  getCategoryById: (id: string) => Category | undefined;
  getAccountById: (id: string) => Account | undefined;

  // Thông tin 2 thẻ BIDV Credit
  husbandCreditCard: CreditCardInfo | null;
  wifeCreditCard: CreditCardInfo | null;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavTab>("overview");
  const [activePerspective, setActivePerspective] = useState<PerspectiveMode>("ALL");

  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<CategoryBudget[]>(DEFAULT_BUDGETS);
  const [goals, setGoals] = useState<SavingsGoal[]>(DEFAULT_SAVINGS_GOALS);
  const [debts, setDebts] = useState<DebtItem[]>(DEFAULT_DEBTS);
  const [investments, setInvestments] = useState<InvestmentItem[]>(DEFAULT_INVESTMENTS);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Bộ lọc
  const [selectedMonth, setSelectedMonth] = useState<string>("2026-10");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<"ALL" | TransactionType>("ALL");
  const [selectedAccount, setSelectedAccount] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Khởi tạo từ LocalStorage khi mount
  useEffect(() => {
    const data = loadStoredDataV3();
    setCategories(data.categories);
    setTransactions(data.transactions);
    setBudgets(data.budgets);
    setGoals(data.goals);
    setDebts(data.debts);
    setInvestments(data.investments);
    setSettings(data.settings);

    const updatedAccounts = recalculateAccountBalances(data.accounts, data.transactions);
    setAccounts(updatedAccounts);

    setIsLoaded(true);
  }, []);

  // Tự động đồng bộ vào LocalStorage V3
  useEffect(() => {
    if (!isLoaded) return;
    saveStoredDataV3({
      categories,
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments,
      settings,
    });
  }, [categories, accounts, transactions, budgets, goals, debts, investments, settings, isLoaded]);

  const syncAccountBalances = useCallback((txList: Transaction[]) => {
    setAccounts((prev) => recalculateAccountBalances(prev, txList));
  }, []);

  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    set.add("2026-10");
    set.add(getCurrentMonthKey());
    transactions.forEach((tx) => {
      if (tx.date && tx.date.length >= 7) {
        set.add(tx.date.substring(0, 7));
      }
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [transactions]);

  const getCategoryById = useCallback(
    (id: string) => categories.find((c) => c.id === id),
    [categories]
  );

  const getAccountById = useCallback(
    (id: string) => accounts.find((a) => a.id === id),
    [accounts]
  );

  // CRUD Giao dịch
  const addTransaction = useCallback(
    (input: TransactionInput): Transaction => {
      const now = new Date().toISOString();
      const newTx: Transaction = {
        id: `TX${new Date().toISOString().slice(2, 10).replace(/-/g, "")}${Math.floor(100000 + Math.random() * 900000)}`,
        amount: Math.abs(input.amount),
        date: input.date,
        type: input.type,
        categoryId: input.categoryId,
        accountId: input.accountId,
        toAccountId: input.toAccountId,
        memberId: input.memberId,
        scope: input.scope,
        note: input.note?.trim() || "",
        tag: input.tag || "NORMAL",
        createdAt: now,
        updatedAt: now,
      };

      setTransactions((prev) => {
        const next = [newTx, ...prev];
        syncAccountBalances(next);
        return next;
      });

      return newTx;
    },
    [syncAccountBalances]
  );

  const updateTransaction = useCallback(
    (id: string, input: Partial<TransactionInput>) => {
      setTransactions((prev) => {
        const next = prev.map((tx) => {
          if (tx.id !== id) return tx;
          return {
            ...tx,
            amount: input.amount !== undefined ? Math.abs(input.amount) : tx.amount,
            date: input.date !== undefined ? input.date : tx.date,
            type: input.type !== undefined ? input.type : tx.type,
            categoryId: input.categoryId !== undefined ? input.categoryId : tx.categoryId,
            accountId: input.accountId !== undefined ? input.accountId : tx.accountId,
            toAccountId: input.toAccountId !== undefined ? input.toAccountId : tx.toAccountId,
            memberId: input.memberId !== undefined ? input.memberId : tx.memberId,
            scope: input.scope !== undefined ? input.scope : tx.scope,
            note: input.note !== undefined ? input.note.trim() : tx.note,
            tag: input.tag !== undefined ? input.tag : tx.tag,
            updatedAt: new Date().toISOString(),
          };
        });
        syncAccountBalances(next);
        return next;
      });
    },
    [syncAccountBalances]
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prev) => {
        const next = prev.filter((tx) => tx.id !== id);
        syncAccountBalances(next);
        return next;
      });
    },
    [syncAccountBalances]
  );

  // Quản lý Tài khoản (Ví)
  const addAccount = useCallback((acc: Omit<Account, "id" | "currentBalance">) => {
    const newId = `acc_${Date.now()}`;
    const newAccount: Account = {
      ...acc,
      id: newId,
      currentBalance: acc.initialBalance,
    };
    setAccounts((prev) => [...prev, newAccount]);
  }, []);

  const updateAccount = useCallback((id: string, acc: Partial<Account>) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...acc } : a))
    );
  }, []);

  const deleteAccount = useCallback((id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Ngân sách
  const setCategoryBudget = useCallback(
    (categoryId: string, limitAmount: number, month?: string) => {
      const targetMonth = month || selectedMonth || "2026-10";
      setBudgets((prev) => {
        const exists = prev.some(
          (b) => b.categoryId === categoryId && b.month === targetMonth
        );
        if (exists) {
          return prev.map((b) =>
            b.categoryId === categoryId && b.month === targetMonth
              ? { ...b, limitAmount }
              : b
          );
        }
        return [...prev, { categoryId, limitAmount, month: targetMonth }];
      });
    },
    [selectedMonth]
  );

  // Mục tiêu
  const addGoal = useCallback((goal: Omit<SavingsGoal, "id" | "isCompleted">) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `goal_${Date.now()}`,
      isCompleted: goal.currentAmount >= goal.targetAmount,
    };
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const updateGoal = useCallback((id: string, goal: Partial<SavingsGoal>) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const updated = { ...g, ...goal };
        updated.isCompleted = updated.currentAmount >= updated.targetAmount;
        return updated;
      })
    );
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const depositGoal = useCallback((id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const newCurrent = g.currentAmount + amount;
        return {
          ...g,
          currentAmount: newCurrent,
          isCompleted: newCurrent >= g.targetAmount,
        };
      })
    );
  }, []);

  // Nợ & Đầu tư
  const addDebt = useCallback((debt: Omit<DebtItem, "id">) => {
    setDebts((prev) => [...prev, { ...debt, id: `debt_${Date.now()}` }]);
  }, []);

  const payDebt = useCallback((id: string, amount: number) => {
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const newPaid = d.paidAmount + amount;
        return {
          ...d,
          paidAmount: newPaid,
          status: newPaid >= d.totalAmount ? "PAID" : "ACTIVE",
        };
      })
    );
  }, []);

  const deleteDebt = useCallback((id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const addInvestment = useCallback((inv: Omit<InvestmentItem, "id">) => {
    setInvestments((prev) => [...prev, { ...inv, id: `inv_${Date.now()}` }]);
  }, []);

  const updateInvestment = useCallback((id: string, inv: Partial<InvestmentItem>) => {
    setInvestments((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...inv } : i))
    );
  }, []);

  const deleteInvestment = useCallback((id: string) => {
    setInvestments((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  // Reset to Mock
  const resetToMockData = useCallback(() => {
    const seeded = seedInitialDataV3();
    setCategories(seeded.categories);
    setAccounts(seeded.accounts);
    setTransactions(seeded.transactions);
    setBudgets(seeded.budgets);
    setGoals(seeded.goals);
    setDebts(seeded.debts);
    setInvestments(seeded.investments);
    setSettings(seeded.settings);
    setSelectedMonth("2026-10");
    setActivePerspective("ALL");
  }, []);

  // Backup
  const exportBackup = useCallback(() => {
    exportDataToJsonV3({
      categories,
      accounts,
      transactions,
      budgets,
      goals,
      debts,
      investments,
      settings,
    });
  }, [categories, accounts, transactions, budgets, goals, debts, investments, settings]);

  const importBackup = useCallback(
    async (file: File): Promise<{ success: boolean; error?: string }> => {
      const res = await importDataFromJsonV3(file);
      if (res.success && res.data) {
        setCategories(res.data.categories);
        setAccounts(res.data.accounts);
        setTransactions(res.data.transactions);
        setBudgets(res.data.budgets);
        setGoals(res.data.goals);
        setDebts(res.data.debts);
        setInvestments(res.data.investments);
        setSettings(res.data.settings);
        saveStoredDataV3(res.data);
        return { success: true };
      }
      return { success: false, error: res.error || "Nhập file thất bại" };
    },
    []
  );

  // Tính toán Thông tin 2 thẻ BIDV Credit
  const husbandCreditCard = useMemo<CreditCardInfo | null>(() => {
    const acc = accounts.find((a) => a.id === "acc_husband_bidv_credit");
    if (!acc) return null;
    const limit = acc.creditLimit || 50000000;
    const used = Math.max(0, acc.currentBalance);
    const available = Math.max(0, limit - used);
    const pct = Math.min(100, Math.round((used / limit) * 100));
    return {
      account: acc,
      creditLimit: limit,
      usedAmount: used,
      availableAmount: available,
      usagePercentage: pct,
    };
  }, [accounts]);

  const wifeCreditCard = useMemo<CreditCardInfo | null>(() => {
    const acc = accounts.find((a) => a.id === "acc_wife_bidv_credit");
    if (!acc) return null;
    const limit = acc.creditLimit || 20000000;
    const used = Math.max(0, acc.currentBalance);
    const available = Math.max(0, limit - used);
    const pct = Math.min(100, Math.round((used / limit) * 100));
    return {
      account: acc,
      creditLimit: limit,
      usedAmount: used,
      availableAmount: available,
      usagePercentage: pct,
    };
  }, [accounts]);

  // Tính toán Tổng hợp Tài chính (theo góc nhìn activePerspective)
  const summary = useMemo<FinancialSummary>(() => {
    // 1. Phân loại tài khoản theo góc nhìn
    const filteredAccounts = accounts.filter((a) => {
      if (activePerspective === "ALL") return true;
      if (activePerspective === "HUSBAND") return a.owner === "HUSBAND" || a.owner === "SHARED";
      if (activePerspective === "WIFE") return a.owner === "WIFE" || a.owner === "SHARED";
      return true;
    });

    // Số dư khả dụng (chỉ tính ví tiền mặt và ngân hàng thường, không tính thẻ tín dụng)
    const currentBalance = filteredAccounts
      .filter((a) => a.type !== "CREDIT_CARD")
      .reduce((sum, a) => sum + Math.max(0, a.currentBalance), 0);

    // Tổng dư nợ thẻ tín dụng
    const totalCreditDebt = filteredAccounts
      .filter((a) => a.type === "CREDIT_CARD")
      .reduce((sum, a) => sum + Math.max(0, a.currentBalance), 0);

    // Nợ ngoài
    const totalDebt = debts
      .filter((d) => d.status === "ACTIVE")
      .filter((d) => {
        if (activePerspective === "ALL") return true;
        if (activePerspective === "HUSBAND") return d.memberId === "HUSBAND" || d.memberId === "SHARED";
        if (activePerspective === "WIFE") return d.memberId === "WIFE" || d.memberId === "SHARED";
        return true;
      })
      .reduce((sum, d) => sum + (d.totalAmount - d.paidAmount), 0);

    // Đầu tư
    const totalInvested = investments
      .filter((i) => i.status === "ACTIVE")
      .filter((i) => {
        if (activePerspective === "ALL") return true;
        if (activePerspective === "HUSBAND") return i.memberId === "HUSBAND" || i.memberId === "SHARED";
        if (activePerspective === "WIFE") return i.memberId === "WIFE" || i.memberId === "SHARED";
        return true;
      })
      .reduce((sum, i) => sum + (i.currentValue || i.amount), 0);

    // Tài sản ròng
    const netWorth = currentBalance + totalInvested - totalDebt - totalCreditDebt;

    // Thu - Chi theo kỳ và theo góc nhìn
    let monthlyIncome = 0;
    let monthlyExpense = 0;
    let husbandIncome = 0;
    let wifeIncome = 0;
    let husbandExpense = 0;
    let wifeExpense = 0;
    let familySharedExpense = 0;

    for (const tx of transactions) {
      const matchMonth = selectedMonth === "ALL" || tx.date.startsWith(selectedMonth);
      if (!matchMonth) continue;

      if (tx.type === "INCOME") {
        if (tx.memberId === "HUSBAND") husbandIncome += tx.amount;
        if (tx.memberId === "WIFE") wifeIncome += tx.amount;

        if (activePerspective === "ALL") monthlyIncome += tx.amount;
        else if (activePerspective === "HUSBAND" && tx.memberId === "HUSBAND") monthlyIncome += tx.amount;
        else if (activePerspective === "WIFE" && tx.memberId === "WIFE") monthlyIncome += tx.amount;
      } else if (tx.type === "EXPENSE") {
        if (tx.memberId === "HUSBAND") husbandExpense += tx.amount;
        if (tx.memberId === "WIFE") wifeExpense += tx.amount;
        if (tx.scope === "FAMILY") familySharedExpense += tx.amount;

        if (activePerspective === "ALL") monthlyExpense += tx.amount;
        else if (activePerspective === "HUSBAND" && tx.memberId === "HUSBAND") monthlyExpense += tx.amount;
        else if (activePerspective === "WIFE" && tx.memberId === "WIFE") monthlyExpense += tx.amount;
      }
    }

    const savingsAmount = monthlyIncome - monthlyExpense;
    const savingsRate =
      monthlyIncome > 0 ? Math.max(0, Math.round((savingsAmount / monthlyIncome) * 100)) : 0;

    return {
      currentBalance,
      netWorth,
      monthlyIncome,
      monthlyExpense,
      savingsAmount,
      savingsRate,
      totalDebt,
      totalInvested,
      husbandIncome,
      wifeIncome,
      husbandExpense,
      wifeExpense,
      familySharedExpense,
      totalCreditDebt,
    };
  }, [accounts, debts, investments, transactions, selectedMonth, activePerspective]);

  // Ngân sách tháng
  const budgetSummary = useMemo<BudgetSummary>(() => {
    const monthKey = selectedMonth === "ALL" ? "2026-10" : selectedMonth;
    const currentMonthBudgets = budgets.filter((b) => b.month === monthKey);

    const categorySpentMap = new Map<string, number>();
    for (const tx of transactions) {
      if (tx.type === "EXPENSE" && tx.date.startsWith(monthKey)) {
        if (activePerspective === "HUSBAND" && tx.memberId !== "HUSBAND") continue;
        if (activePerspective === "WIFE" && tx.memberId !== "WIFE") continue;

        const cur = categorySpentMap.get(tx.categoryId) || 0;
        categorySpentMap.set(tx.categoryId, cur + tx.amount);
      }
    }

    let totalBudget = 0;
    let totalSpent = 0;

    const items: BudgetProgressItem[] = currentMonthBudgets.map((b) => {
      const cat = getCategoryById(b.categoryId);
      const spent = categorySpentMap.get(b.categoryId) || 0;
      totalBudget += b.limitAmount;
      totalSpent += spent;

      const remaining = Math.max(0, b.limitAmount - spent);
      const percentage = Math.round((spent / b.limitAmount) * 100);

      return {
        categoryId: b.categoryId,
        categoryName: cat?.name || "Danh mục",
        categoryColor: cat?.color || "#94A3B8",
        limitAmount: b.limitAmount,
        spentAmount: spent,
        remainingAmount: remaining,
        percentage,
      };
    });

    const remaining = Math.max(0, totalBudget - totalSpent);
    const daysRemaining = 18;
    const dailyAllowance = daysRemaining > 0 ? Math.round(remaining / daysRemaining) : 0;

    return {
      totalBudget,
      totalSpent,
      remaining,
      daysRemaining,
      dailyAllowance,
      items,
    };
  }, [budgets, transactions, selectedMonth, activePerspective, getCategoryById]);

  // Danh sách giao dịch được lọc
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (selectedMonth !== "ALL" && !tx.date.startsWith(selectedMonth)) return false;
        if (selectedType !== "ALL" && tx.type !== selectedType) return false;
        if (selectedCategory !== "ALL" && tx.categoryId !== selectedCategory) return false;
        if (selectedAccount !== "ALL" && tx.accountId !== selectedAccount && tx.toAccountId !== selectedAccount)
          return false;

        // Lọc theo góc nhìn thành viên
        if (activePerspective === "HUSBAND" && tx.memberId !== "HUSBAND") return false;
        if (activePerspective === "WIFE" && tx.memberId !== "WIFE") return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const category = getCategoryById(tx.categoryId);
          const account = getAccountById(tx.accountId);
          const matchNote = tx.note?.toLowerCase().includes(q);
          const matchCat = category?.name.toLowerCase().includes(q);
          const matchAcc = account?.name.toLowerCase().includes(q);
          const matchAmount = tx.amount.toString().includes(q);
          if (!matchNote && !matchCat && !matchAcc && !matchAmount) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      });
  }, [transactions, selectedMonth, selectedType, selectedCategory, selectedAccount, activePerspective, searchQuery, getCategoryById, getAccountById]);

  // Thống kê Donut chi tiêu
  const categoryExpenseStats = useMemo<CategoryExpenseStat[]>(() => {
    const expenseMap = new Map<string, number>();
    let totalExpense = 0;

    for (const tx of transactions) {
      if (tx.type !== "EXPENSE") continue;
      if (selectedMonth !== "ALL" && !tx.date.startsWith(selectedMonth)) continue;
      if (activePerspective === "HUSBAND" && tx.memberId !== "HUSBAND") continue;
      if (activePerspective === "WIFE" && tx.memberId !== "WIFE") continue;

      const current = expenseMap.get(tx.categoryId) || 0;
      expenseMap.set(tx.categoryId, current + tx.amount);
      totalExpense += tx.amount;
    }

    if (totalExpense === 0) return [];

    const stats: CategoryExpenseStat[] = [];
    expenseMap.forEach((amount, catId) => {
      const cat = getCategoryById(catId);
      stats.push({
        categoryId: catId,
        categoryName: cat?.name || "Chi khác",
        categoryColor: cat?.color || "#94A3B8",
        totalAmount: amount,
        percentage: Math.round((amount / totalExpense) * 100),
      });
    });

    return stats.sort((a, b) => b.totalAmount - a.totalAmount);
  }, [transactions, selectedMonth, activePerspective, getCategoryById]);

  // Monthly Trend
  const monthlyTrendData = useMemo<MonthlyTrendItem[]>(() => {
    const months = ["2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"];
    const map = new Map<string, { income: number; expense: number }>();

    months.forEach((m) => map.set(m, { income: 0, expense: 0 }));

    for (const tx of transactions) {
      const m = tx.date.substring(0, 7);
      if (map.has(m)) {
        if (activePerspective === "HUSBAND" && tx.memberId !== "HUSBAND") continue;
        if (activePerspective === "WIFE" && tx.memberId !== "WIFE") continue;

        const item = map.get(m)!;
        if (tx.type === "INCOME") item.income += tx.amount;
        if (tx.type === "EXPENSE") item.expense += tx.amount;
      }
    }

    return months.map((m) => {
      const item = map.get(m)!;
      const monthNum = parseInt(m.split("-")[1], 10);
      return {
        month: m,
        label: `Tháng ${monthNum}`,
        income: item.income,
        expense: item.expense,
      };
    });
  }, [transactions, activePerspective]);

  // Thông báo
  const notifications = useMemo<AppNotification[]>(() => {
    const list: AppNotification[] = [...DEFAULT_NOTIFICATIONS];

    // Cảnh báo hạn mức thẻ tín dụng nếu dùng > 70%
    if (husbandCreditCard && husbandCreditCard.usagePercentage >= 70) {
      list.push({
        id: "warn_husband_credit_high",
        title: "Cảnh báo hạn mức thẻ Chồng",
        message: `Thẻ BIDV Credit Chồng đã dùng ${husbandCreditCard.usagePercentage}% hạn mức (vượt ngưỡng 70%)`,
        type: "warning",
        date: "2026-10-21",
        read: false,
      });
    }

    return list;
  }, [husbandCreditCard]);

  const markNotificationRead = useCallback((id: string) => {}, []);

  const value = {
    isLoaded,
    activeTab,
    setActiveTab,
    activePerspective,
    setActivePerspective,
    categories,
    accounts,
    transactions,
    budgets,
    goals,
    debts,
    investments,
    settings,
    notifications,
    selectedMonth,
    selectedCategory,
    selectedType,
    selectedAccount,
    searchQuery,
    setSelectedMonth,
    setSelectedCategory,
    setSelectedType,
    setSelectedAccount,
    setSearchQuery,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addAccount,
    updateAccount,
    deleteAccount,
    setCategoryBudget,
    addGoal,
    updateGoal,
    deleteGoal,
    depositGoal,
    addDebt,
    payDebt,
    deleteDebt,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    updateSettings,
    markNotificationRead,
    resetToMockData,
    exportBackup,
    importBackup,
    availableMonths,
    summary,
    budgetSummary,
    filteredTransactions,
    categoryExpenseStats,
    monthlyTrendData,
    getCategoryById,
    getAccountById,
    husbandCreditCard,
    wifeCreditCard,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance phải được sử dụng bên trong FinanceProvider");
  }
  return context;
}

// [Kết thúc tệp: context/FinanceContext.tsx]
```

---

## 📄 Tệp: `lib/formatters.ts`

```typescript
// [Bắt đầu tệp: lib/formatters.ts]
/**
 * Định dạng số tiền sang định dạng tiền tệ Việt Nam Đồng (VND)
 * Ví dụ: 57650000 -> "57.650.000 ₫" hoặc "57.650.000 VND"
 */
export function formatVND(amount: number, showCurrency: boolean = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return showCurrency ? "0 ₫" : "0";
  }
  const formatted = new Intl.NumberFormat("vi-VN").format(Math.round(amount));
  return showCurrency ? `${formatted} ₫` : formatted;
}

/**
 * Định dạng rút gọn cho biểu đồ tâm tròn hoặc nhãn nhỏ
 * Ví dụ: 7469000 -> "7.5tr", 21619000 -> "21.6tr"
 */
export function formatShortVND(amount: number): string {
  if (Math.abs(amount) >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}tỷ`;
  }
  if (Math.abs(amount) >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}tr`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}k`;
  }
  return `${amount}`;
}

/**
 * Định dạng ngày ISO (YYYY-MM-DD) sang hiển thị người dùng (DD/MM/YYYY)
 */
export function formatDateVN(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [year, month, day] = dateStr.split("-");
    if (year && month && day) {
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

/**
 * Lấy chuỗi tháng hiện tại theo chuẩn YYYY-MM
 */
export function getCurrentMonthKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Danh sách tên các tháng tiếng Việt để hiển thị bộ chọn tháng
 */
export function getMonthDisplayLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  return `Tháng ${parseInt(month, 10)}/${year}`;
}

// [Kết thúc tệp: lib/formatters.ts]
```

---

## 📄 Tệp: `lib/storage.ts`

```typescript
// [Bắt đầu tệp: lib/storage.ts]
import {
  Category,
  Account,
  Transaction,
  CategoryBudget,
  SavingsGoal,
  DebtItem,
  InvestmentItem,
  AppSettings,
  AppDataBackup,
} from "@/types/finance";
import { DEFAULT_CATEGORIES } from "@/constants/defaultCategories";
import {
  DEFAULT_ACCOUNTS,
  DEFAULT_TRANSACTIONS,
  DEFAULT_BUDGETS,
  DEFAULT_SAVINGS_GOALS,
  DEFAULT_DEBTS,
  DEFAULT_INVESTMENTS,
  DEFAULT_SETTINGS,
} from "@/constants/mockData";
import { AppDataBackupSchema } from "./validations";

export const STORAGE_KEY_V3 = "HOME_MONI_DATA_V4";

export interface StoredAppStateV3 {
  categories: Category[];
  accounts: Account[];
  transactions: Transaction[];
  budgets: CategoryBudget[];
  goals: SavingsGoal[];
  debts: DebtItem[];
  investments: InvestmentItem[];
  settings: AppSettings;
}

function isStorageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Tự động tính toán lại số dư của từng tài khoản:
 * - Với tài khoản ngân hàng / tiền mặt: Số dư = Đầu kỳ + Thu - Chi - Chuyển đi + Chuyển đến
 * - Với thẻ tín dụng: Dư nợ = Đầu kỳ + Chi tiêu bằng thẻ - Thanh toán thẻ (chuyển vào)
 */
export function recalculateAccountBalances(
  accounts: Account[],
  transactions: Transaction[]
): Account[] {
  return accounts.map((acc) => {
    let balance = acc.initialBalance;
    const isCredit = acc.type === "CREDIT_CARD";

    for (const tx of transactions) {
      if (isCredit) {
        // Thẻ tín dụng: Chi tiêu làm TĂNG dư nợ, chuyển tiền vào làm GIẢM dư nợ
        if (tx.type === "EXPENSE" && tx.accountId === acc.id) {
          balance += tx.amount;
        } else if (tx.type === "TRANSFER" && tx.toAccountId === acc.id) {
          balance -= tx.amount;
        }
      } else {
        // Tài khoản thanh toán thường:
        if (tx.type === "INCOME" && tx.accountId === acc.id) {
          balance += tx.amount;
        } else if (tx.type === "EXPENSE" && tx.accountId === acc.id) {
          balance -= tx.amount;
        } else if (tx.type === "TRANSFER") {
          if (tx.accountId === acc.id) {
            balance -= tx.amount;
          }
          if (tx.toAccountId === acc.id) {
            balance += tx.amount;
          }
        }
      }
    }

    return {
      ...acc,
      currentBalance: balance,
    };
  });
}

/**
 * Khởi tạo dữ liệu mẫu chuẩn HOME MONI cho gia đình
 */
export function seedInitialDataV3(): StoredAppStateV3 {
  const initialData: StoredAppStateV3 = {
    categories: DEFAULT_CATEGORIES,
    accounts: DEFAULT_ACCOUNTS,
    transactions: DEFAULT_TRANSACTIONS,
    budgets: DEFAULT_BUDGETS,
    goals: DEFAULT_SAVINGS_GOALS,
    debts: DEFAULT_DEBTS,
    investments: DEFAULT_INVESTMENTS,
    settings: DEFAULT_SETTINGS,
  };

  initialData.accounts = recalculateAccountBalances(initialData.accounts, initialData.transactions);

  if (isStorageAvailable()) {
    try {
      window.localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(initialData));
    } catch (e) {
      console.warn("Không thể lưu trữ vào localStorage:", e);
    }
  }

  return initialData;
}

/**
 * Đọc dữ liệu từ LocalStorage V3
 */
export function loadStoredDataV3(): StoredAppStateV3 {
  if (!isStorageAvailable()) {
    return seedInitialDataV3();
  }

  try {
    const rawV3 = window.localStorage.getItem(STORAGE_KEY_V3);
    if (rawV3) {
      const parsed = JSON.parse(rawV3);
      if (parsed.transactions && Array.isArray(parsed.transactions)) {
        return {
          categories: parsed.categories?.length ? parsed.categories : DEFAULT_CATEGORIES,
          accounts: parsed.accounts?.length ? parsed.accounts : DEFAULT_ACCOUNTS,
          transactions: parsed.transactions || [],
          budgets: parsed.budgets || DEFAULT_BUDGETS,
          goals: parsed.goals || DEFAULT_SAVINGS_GOALS,
          debts: parsed.debts || DEFAULT_DEBTS,
          investments: parsed.investments || DEFAULT_INVESTMENTS,
          settings: parsed.settings || DEFAULT_SETTINGS,
        };
      }
    }

    return seedInitialDataV3();
  } catch (err) {
    console.error("Lỗi khi đọc LocalStorage V3:", err);
    return seedInitialDataV3();
  }
}

/**
 * Lưu trạng thái vào LocalStorage V3
 */
export function saveStoredDataV3(state: StoredAppStateV3): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Lỗi khi lưu LocalStorage V3:", error);
    return false;
  }
}

/**
 * Xuất dữ liệu sao lưu JSON
 */
export function exportDataToJsonV3(state: StoredAppStateV3): void {
  const backupPayload: AppDataBackup = {
    version: "3.0",
    exportedAt: new Date().toISOString(),
    categories: state.categories,
    accounts: state.accounts,
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
    debts: state.debts,
    investments: state.investments,
    settings: state.settings,
  };

  const jsonString = JSON.stringify(backupPayload, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateFormatted = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
  const filename = `home_moni_family_backup_${dateFormatted}.json`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Nhập dữ liệu sao lưu JSON
 */
export async function importDataFromJsonV3(file: File): Promise<{
  success: boolean;
  data?: StoredAppStateV3;
  error?: string;
}> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          return resolve({ success: false, error: "Tệp tin rỗng" });
        }

        const rawJson = JSON.parse(text);
        const validation = AppDataBackupSchema.safeParse(rawJson);

        if (!validation.success) {
          const firstError = validation.error.errors[0]?.message || "Cấu trúc tệp JSON không hợp lệ";
          return resolve({ success: false, error: `Lỗi định dạng: ${firstError}` });
        }

        const validData = validation.data;
        const appState: StoredAppStateV3 = {
          categories: validData.categories,
          accounts: validData.accounts || DEFAULT_ACCOUNTS,
          transactions: validData.transactions,
          budgets: validData.budgets || DEFAULT_BUDGETS,
          goals: validData.goals || DEFAULT_SAVINGS_GOALS,
          debts: validData.debts || DEFAULT_DEBTS,
          investments: validData.investments || DEFAULT_INVESTMENTS,
          settings: validData.settings || DEFAULT_SETTINGS,
        };

        appState.accounts = recalculateAccountBalances(appState.accounts, appState.transactions);

        resolve({ success: true, data: appState });
      } catch (err) {
        resolve({ success: false, error: "Không thể đọc tệp JSON. Vui lòng kiểm tra lại." });
      }
    };

    reader.onerror = () => {
      resolve({ success: false, error: "Đã xảy ra lỗi khi tải tệp từ thiết bị." });
    };

    reader.readAsText(file);
  });
}

// [Kết thúc tệp: lib/storage.ts]
```

---

## 📄 Tệp: `lib/validations.ts`

```typescript
// [Bắt đầu tệp: lib/validations.ts]
import { z } from "zod";

export const FamilyMemberSchema = z.enum(["HUSBAND", "WIFE", "SHARED"]);
export const ExpenseScopeSchema = z.enum(["FAMILY", "PERSONAL"]);

export const TransactionInputSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Vui lòng nhập số tiền hợp lệ" })
    .positive("Số tiền phải lớn hơn 0")
    .max(1_000_000_000_000, "Số tiền quá lớn"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày giao dịch phải có định dạng YYYY-MM-DD"),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"], {
    errorMap: () => ({ message: "Loại giao dịch không hợp lệ" }),
  }),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  accountId: z.string().min(1, "Vui lòng chọn tài khoản nguồn"),
  toAccountId: z.string().optional(),
  memberId: FamilyMemberSchema,
  scope: ExpenseScopeSchema,
  note: z.string().max(255, "Ghi chú không vượt quá 255 ký tự").optional(),
  tag: z.enum(["NORMAL", "DEBT", "INVESTMENT", "RECURRING"]).optional(),
});

export const CategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["INCOME", "EXPENSE"]),
  color: z.string().min(1),
  icon: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const AccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["BANK", "CASH", "E_WALLET", "CREDIT_CARD"]),
  owner: FamilyMemberSchema,
  isSalaryAccount: z.boolean().optional(),
  creditLimit: z.number().optional(),
  initialBalance: z.number(),
  currentBalance: z.number(),
  accountNumber: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export const TransactionSchema = z.object({
  id: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
  categoryId: z.string().min(1),
  accountId: z.string().min(1),
  toAccountId: z.string().optional(),
  memberId: FamilyMemberSchema,
  scope: ExpenseScopeSchema,
  note: z.string().optional(),
  tag: z.enum(["NORMAL", "DEBT", "INVESTMENT", "RECURRING"]).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BudgetSchema = z.object({
  categoryId: z.string().min(1),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  limitAmount: z.number().positive(),
});

export const SavingsGoalSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  targetAmount: z.number().positive(),
  currentAmount: z.number().nonnegative(),
  deadline: z.string().optional(),
  icon: z.string().optional(),
  isCompleted: z.boolean(),
  memberId: FamilyMemberSchema.optional(),
});

export const DebtItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["BORROW", "LEND"]),
  totalAmount: z.number().positive(),
  paidAmount: z.number().nonnegative(),
  interestRate: z.number().nonnegative(),
  startDate: z.string(),
  dueDate: z.string(),
  status: z.enum(["ACTIVE", "PAID"]),
  memberId: FamilyMemberSchema.optional(),
});

export const InvestmentItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["GOLD", "SAVINGS", "STOCK", "OTHER"]),
  amount: z.number().positive(),
  currentValue: z.number().optional(),
  expectedProfitRate: z.number(),
  startDate: z.string(),
  status: z.enum(["ACTIVE", "CLOSED"]),
  memberId: FamilyMemberSchema.optional(),
});

export const AppSettingsSchema = z.object({
  themeColor: z.enum(["blue", "purple", "pink", "green", "orange"]),
  currency: z.literal("VND"),
  notificationsEnabled: z.boolean(),
  husbandName: z.string(),
  wifeName: z.string(),
});

export const AppDataBackupSchema = z.object({
  version: z.string(),
  exportedAt: z.string(),
  categories: z.array(CategorySchema),
  accounts: z.array(AccountSchema).optional(),
  transactions: z.array(TransactionSchema),
  budgets: z.array(BudgetSchema).optional(),
  goals: z.array(SavingsGoalSchema).optional(),
  debts: z.array(DebtItemSchema).optional(),
  investments: z.array(InvestmentItemSchema).optional(),
  settings: AppSettingsSchema.optional(),
});

export type TransactionInput = z.infer<typeof TransactionInputSchema>;
export type AppDataBackupValid = z.infer<typeof AppDataBackupSchema>;

// [Kết thúc tệp: lib/validations.ts]
```

---

## 📄 Tệp: `next-env.d.ts`

```typescript
// [Bắt đầu tệp: next-env.d.ts]
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

// [Kết thúc tệp: next-env.d.ts]
```

---

## 📄 Tệp: `next.config.mjs`

```javascript
// [Bắt đầu tệp: next.config.mjs]
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

// [Kết thúc tệp: next.config.mjs]
```

---

## 📄 Tệp: `package.json`

```json
// [Bắt đầu tệp: package.json]
{
  "name": "fi-tracking-moni",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "next": "^14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.13.3",
    "tailwind-merge": "^2.5.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.17.6",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3"
  }
}

// [Kết thúc tệp: package.json]
```

---

## 📄 Tệp: `postcss.config.js`

```javascript
// [Bắt đầu tệp: postcss.config.js]
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// [Kết thúc tệp: postcss.config.js]
```

---

## 📄 Tệp: `public/manifest.json`

```json
// [Bắt đầu tệp: public/manifest.json]
{
  "name": "HOME MONI - Quản Lý Tài Chính Gia Đình",
  "short_name": "HOME MONI",
  "description": "Nền tảng quản lý tài chính tổ ấm thông minh, bảo mật LocalStorage cho 2 vợ chồng",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1E3A8A",
  "theme_color": "#2563EB",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ]
}

// [Kết thúc tệp: public/manifest.json]
```

---

## 📄 Tệp: `scripts/export-notebooklm.mjs`

```javascript
// [Bắt đầu tệp: scripts/export-notebooklm.mjs]
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

// [Kết thúc tệp: scripts/export-notebooklm.mjs]
```

---

## 📄 Tệp: `tailwind.config.ts`

```typescript
// [Bắt đầu tệp: tailwind.config.ts]
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;

// [Kết thúc tệp: tailwind.config.ts]
```

---

## 📄 Tệp: `tsconfig.json`

```json
// [Bắt đầu tệp: tsconfig.json]
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

// [Kết thúc tệp: tsconfig.json]
```

---

## 📄 Tệp: `types/finance.ts`

```typescript
// [Bắt đầu tệp: types/finance.ts]
export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';

export type AccountType = 'BANK' | 'CASH' | 'E_WALLET' | 'CREDIT_CARD';

export type DebtType = 'BORROW' | 'LEND';

export type InvestmentType = 'GOLD' | 'SAVINGS' | 'STOCK' | 'OTHER';

export type ThemeColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange';

export type FamilyMember = 'HUSBAND' | 'WIFE' | 'SHARED';

export type ExpenseScope = 'FAMILY' | 'PERSONAL';

export interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  color: string;
  icon?: string;
  isDefault?: boolean;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  owner: FamilyMember;       // Chồng | Vợ | Chung
  isSalaryAccount?: boolean; // Tài khoản nhận lương chính
  creditLimit?: number;      // Hạn mức thẻ tín dụng (50tr Chồng, 20tr Vợ)
  initialBalance: number;
  currentBalance: number;    // Với thẻ tín dụng: dư nợ đang dùng
  accountNumber?: string;
  icon?: string;
  color?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;               // YYYY-MM-DD
  type: TransactionType;
  categoryId: string;
  accountId: string;          // Ví nguồn
  toAccountId?: string;       // Ví đích
  memberId: FamilyMember;     // Ai là người thực hiện (Chồng hay Vợ)
  scope: ExpenseScope;        // Chi cho việc chung gia đình hay cá nhân
  note?: string;
  tag?: 'NORMAL' | 'DEBT' | 'INVESTMENT' | 'RECURRING';
  createdAt: string;
  updatedAt: string;
}

export interface CategoryBudget {
  categoryId: string;
  month: string;              // YYYY-MM
  limitAmount: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  icon?: string;
  isCompleted: boolean;
  memberId?: FamilyMember;
}

export interface DebtItem {
  id: string;
  name: string;
  type: DebtType;
  totalAmount: number;
  paidAmount: number;
  interestRate: number;
  startDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'PAID';
  memberId?: FamilyMember;
}

export interface InvestmentItem {
  id: string;
  name: string;
  type: InvestmentType;
  amount: number;
  currentValue?: number;
  expectedProfitRate: number;
  startDate: string;
  status: 'ACTIVE' | 'CLOSED';
  memberId?: FamilyMember;
}

export interface AppSettings {
  themeColor: ThemeColor;
  currency: 'VND';
  notificationsEnabled: boolean;
  husbandName: string;
  wifeName: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'danger';
  date: string;
  read: boolean;
}

export interface AppDataBackup {
  version: '3.0';
  exportedAt: string;
  categories: Category[];
  accounts: Account[];
  transactions: Transaction[];
  budgets: CategoryBudget[];
  goals: SavingsGoal[];
  debts: DebtItem[];
  investments: InvestmentItem[];
  settings: AppSettings;
}

export interface FinancialSummary {
  currentBalance: number;   // Số dư khả dụng (Tiền trong các ví ngân hàng + tiền mặt)
  netWorth: number;         // Tài sản ròng = Số dư ví + Đầu tư - Nợ - Dư nợ thẻ tín dụng
  monthlyIncome: number;    // Tổng thu nhập gia đình
  monthlyExpense: number;   // Tổng chi tiêu gia đình
  savingsAmount: number;    // Tiết kiệm tháng = Thu - Chi
  savingsRate: number;      // % Tiết kiệm
  totalDebt: number;        // Nợ ngoài
  totalInvested: number;    // Tiền đang đầu tư

  // Phân tích thành viên
  husbandIncome: number;
  wifeIncome: number;
  husbandExpense: number;
  wifeExpense: number;
  familySharedExpense: number;
  totalCreditDebt: number;  // Tổng dư nợ thẻ BIDV Credit của cả 2
}

export interface CategoryExpenseStat {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  totalAmount: number;
  percentage: number;
}

// [Kết thúc tệp: types/finance.ts]
```

---


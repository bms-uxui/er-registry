import { Clock, RefreshCw } from "lucide-react";
import { INK_SOFT, MUTED } from "../tokens";

export function LatestUpdate() {
  return (
    <div className="flex items-center gap-3 pb-2">
      <span
        className="inline-flex items-center gap-1.5 text-[12px]"
        style={{ color: MUTED }}
      >
        <Clock size={12} />
        อัปเดตล่าสุด 22 เม.ย. 2026 · 08:45 น.
      </span>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-black/5"
        style={{ color: INK_SOFT }}
      >
        <RefreshCw size={12} />
        รีเฟรชข้อมูล
      </button>
    </div>
  );
}

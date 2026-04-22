import { RefreshCw } from "lucide-react";
import mophLogo from "../../assets/logo_MOPH.png";
import { INK_SOFT, MUTED, GLASS_SUBCARD } from "../tokens";

export function SiteFooter() {
  return (
    <footer
      className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3 mt-2"
      style={GLASS_SUBCARD}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src={mophLogo}
          alt=""
          className="w-9 h-9 object-contain shrink-0"
          draggable={false}
        />
        <span className="text-[12px]" style={{ color: INK_SOFT }}>
          ER Registry Dashboard
        </span>
      </div>
      <div className="flex items-center gap-4 text-[12px]" style={{ color: MUTED }}>
        <span className="inline-flex items-center gap-1.5">
          <RefreshCw size={11} strokeWidth={2.25} />
          ข้อมูลอัปเดตล่าสุด 22 เม.ย. 2568
        </span>
        <span aria-hidden style={{ color: "#D6D0C2" }}>|</span>
        <span>v1.0.0</span>
      </div>
    </footer>
  );
}

import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { INK, INK_SOFT, MUTED, GLASS_CARD, GLASS_SUBCARD } from "../tokens";
import { hydrateCategories } from "../data";
import type { HospitalRowData } from "../types";
import { CategoryCard } from "./CategoryCard";

export function HospitalDetailPanel({
  hospital,
  onClose,
}: {
  hospital: HospitalRowData;
  onClose: () => void;
}) {
  const hydrated = hydrateCategories(hospital);
  const rootRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hospital]);
  return (
    <section
      ref={rootRef}
      className="rounded-3xl p-5 md:p-6 relative overflow-hidden"
      style={GLASS_CARD}
    >
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <div
            className="text-[11px] font-medium uppercase tracking-wider mb-1"
            style={{ color: MUTED }}
          >
            รายละเอียดข้อมูลการวัดผลของสถานพยาบาล
          </div>
          <h2
            className="text-[22px] md:text-[26px] font-bold leading-tight"
            style={{ color: INK, letterSpacing: "-0.01em" }}
          >
            {hospital.name}
          </h2>
          <div className="mt-1 text-[13px]" style={{ color: INK_SOFT }}>
            จังหวัด{" "}
            <span className="font-semibold" style={{ color: INK }}>
              {hospital.province}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold cursor-pointer transition-all hover:-translate-y-0.5"
          style={{ ...GLASS_SUBCARD, color: INK_SOFT }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          ย้อนกลับ
        </button>
      </div>

      <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-5">
        {hydrated.map((cat, i) => (
          <div
            key={cat.key}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <CategoryCard category={cat} />
          </div>
        ))}
      </div>
    </section>
  );
}

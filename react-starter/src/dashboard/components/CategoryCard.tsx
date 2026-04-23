import ctScanSvg from "../../assets/ct-scan.svg";
import { INK, MUTED, GLASS_CARD, GLASS_SUBCARD } from "../tokens";
import { STATUS_META, statusOf } from "../data";
import type { Category, KPI } from "../types";
import { FyiButton } from "./FyiButton";
import { SegmentDial } from "./SegmentDial";

function CtScannerIllustration() {
  return (
    <img
      src={ctScanSvg}
      alt="CT scanner"
      className="w-40 h-36 object-contain select-none pointer-events-none"
      draggable={false}
    />
  );
}

function KpiSubCard({ kpi }: { kpi: KPI }) {
  const status = statusOf(kpi);
  const meta = STATUS_META[status];
  const StatusIcon = meta.Icon;
  return (
    <div
      className="kpi-card rounded-2xl p-4 flex flex-col gap-3.5 relative overflow-hidden cursor-default will-change-transform"
      style={GLASS_SUBCARD}
    >
      {/* top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-14 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* top-right faded overlay (softens the CT illustration) */}
      <div
        className="absolute top-0 right-0 pointer-events-none z-1"
        style={{
          width: 220,
          height: 180,
          background:
            "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0) 80%)",
        }}
      />
      {/* Floating CT illustration — top-right corner, overflows card */}
      <div
        className="absolute pointer-events-none z-0"
        style={{ top: -18, right: -22, opacity: 0.5 }}
      >
        <CtScannerIllustration />
      </div>

      {/* Floating status pill — top-right corner, solid 3D */}
      <div
        className="absolute z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          top: 12,
          right: 12,
          background: `linear-gradient(145deg, ${meta.solidFrom} 0%, ${meta.solidMid} 55%, ${meta.solidTo} 100%)`,
          color: meta.solidText,
          textShadow: meta.solidTextShadow,
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.45)",
            "inset 0 -2px 0 rgba(0,0,0,0.18)",
            "inset 0 0 0 1px rgba(255,255,255,0.15)",
            "0 2px 4px rgba(0,0,0,0.12)",
            `0 8px 18px -4px ${meta.solidTo}80`,
          ].join(", "),
        }}
      >
        <StatusIcon size={13} strokeWidth={2.75} />
        <span className="text-[12px] font-semibold">{meta.label}</span>
      </div>

      <div className="relative z-10 flex flex-col gap-3 min-w-0">
        <div className="pr-28">
          <div className="flex items-center gap-1.5">
            <p className="text-[16px] font-semibold whitespace-nowrap" style={{ color: INK }}>
              {kpi.title}
            </p>
            {kpi.subtitle && (
              <FyiButton title={kpi.title} body={kpi.subtitle} size="sm" />
            )}
          </div>
          <p className="text-[13px] mt-1" style={{ color: MUTED }}>
            {kpi.target}
          </p>
        </div>
        <div>
          <p className="text-[13px]" style={{ color: MUTED }}>
            คะแนน
          </p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <p
              className="text-[36px] font-semibold leading-none"
              style={{
                color: INK,
                textShadow: "0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              {kpi.score}
            </p>
            <span className="text-[13px]" style={{ color: MUTED }}>
              / {kpi.maxScore}
            </span>
          </div>
        </div>
        {typeof kpi.casesTotal === "number" && (
          <div className="grid grid-cols-2 gap-3 pt-2" style={{ borderTop: "1px dashed rgba(16,24,40,0.1)" }}>
            <div>
              <p className="text-[12px]" style={{ color: MUTED }}>เคสที่ทำได้</p>
              <p className="text-[18px] font-semibold tabular-nums mt-0.5" style={{ color: INK }}>
                {(kpi.casesDone ?? 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[12px]" style={{ color: MUTED }}>เคสทั้งหมด</p>
              <p className="text-[18px] font-semibold tabular-nums mt-0.5" style={{ color: INK }}>
                {kpi.casesTotal.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: dial progress */}
      <div className="relative flex flex-col items-center gap-1.5">
        <SegmentDial
          percent={kpi.done}
          goalPercent={kpi.goal}
          color={kpi.done >= kpi.goal ? "#3EAE3E" : "#95691A"}
        />
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px]"
          style={{
            background: "linear-gradient(160deg, #4ADE80 0%, #15803D 100%)",
            color: "#FFFFFF",
            textShadow: "0 1px 0 rgba(0,0,0,0.18)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.45)",
              "inset 0 -2px 0 rgba(0,0,0,0.18)",
              "inset 0 0 0 1px rgba(255,255,255,0.15)",
              "0 2px 4px rgba(0,0,0,0.12)",
              "0 8px 18px -4px rgba(21,128,61,0.5)",
            ].join(", "),
          }}
        >
          <span className="font-semibold">เป้าหมาย ≥{kpi.goal}%</span>
        </span>
      </div>
    </div>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  const isWide = category.kpis.length === 1;
  return (
    <section
      className="rounded-3xl p-5 relative overflow-hidden"
      style={GLASS_CARD}
    >
      {/* soft category-tinted glow in top-left corner */}
      <div
        className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle, ${category.color}26 0%, transparent 70%)`,
        }}
      />
      {/* top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <header className="relative mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[19px] font-semibold" style={{ color: INK }}>
              {category.name}
            </h2>
            {category.criteria && (
              <FyiButton
                title="เงื่อนไขการนับเกณฑ์"
                body={category.criteria}
                size="sm"
              />
            )}
          </div>
          <p className="text-[14px] mt-1.5" style={{ color: MUTED }}>
            {category.description}
          </p>
        </div>
        <img
          src={category.image}
          alt={category.name}
          className="shrink-0 w-14 h-14 object-contain select-none pointer-events-none"
          draggable={false}
        />
      </header>

      <div className={`relative grid ${isWide ? "grid-cols-1" : "grid-cols-2"} gap-3`}>
        {category.kpis.map((kpi) => (
          <KpiSubCard key={kpi.title} kpi={kpi} />
        ))}
      </div>

    </section>
  );
}

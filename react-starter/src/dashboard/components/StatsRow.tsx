import { INK, MUTED, GLASS_SUBCARD } from "../tokens";
import { CATEGORY_STATS, type CategoryStat } from "../data";

function StatCard({ stat }: { stat: CategoryStat }) {
  const up = stat.delta >= 0;
  const prevCount = Math.round(stat.count / (1 + stat.delta / 100));
  const unit = stat.unit ?? "เคส";
  return (
    <div
      className="rounded-2xl p-4 relative overflow-hidden"
      style={GLASS_SUBCARD}
    >
      {/* top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium" style={{ color: MUTED }}>
            {stat.label}
          </p>
          <p
            className="text-[28px] font-bold leading-none mt-1"
            style={{ color: INK }}
          >
            {stat.count}
            <span
              className="text-[12px] font-normal ml-1"
              style={{ color: MUTED }}
            >
              {unit}
            </span>
          </p>
          <p className="mt-2 text-[11px] leading-tight" style={{ color: MUTED }}>
            <span
              className="inline-flex items-center gap-0.5 font-semibold mr-1"
              style={{ color: up ? "#15803D" : "#B45309" }}
            >
              <span>{up ? "▲" : "▼"}</span>
              {up ? "+" : ""}
              {stat.delta}%
            </span>
            จาก {prevCount} {unit}เดือนก่อน
          </p>
        </div>
        <img
          src={stat.image}
          alt={stat.label}
          className="shrink-0 w-14 h-14 object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {CATEGORY_STATS.map((s) => (
        <StatCard key={s.key} stat={s} />
      ))}
    </div>
  );
}

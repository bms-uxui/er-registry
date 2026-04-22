import { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";
import { INK, INK_SOFT, GREEN } from "../tokens";
import { lerpHex } from "../data";

export function SegmentDial({
  percent,
  goalPercent,
  color,
}: {
  percent: number;
  goalPercent: number;
  color: string;
}) {
  const target = Math.min(100, percent);
  const [animPercent, setAnimPercent] = useState(0);

  useEffect(() => {
    const duration = 1100;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setAnimPercent(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const segments = 4;
  const passed = color === "#3EAE3E" || color === GREEN;
  const passRamp = ["#4ADE80", "#16A34A", "#15803D", "#14532D"];
  const failRamp = ["#F3C94A", "#D9A332", "#B58522", "#95691A"];
  const ramp = passed ? passRamp : failRamp;
  const trackSolid = "#E8E4DA";
  // Continuous fill: each segment's color interpolates from track to its ramp
  // color based on how far the animated value has progressed within its range.
  const subArcs = Array.from({ length: segments }, (_, i) => {
    const lower = (i / segments) * 100;
    const upper = ((i + 1) / segments) * 100;
    const t = Math.max(0, Math.min(1, (animPercent - lower) / (upper - lower)));
    return {
      limit: upper,
      color: lerpHex(trackSolid, ramp[i], t),
      showTick: false,
    };
  });
  // Goal marker — custom overlay for full control over visibility
  const goalAngleDeg = 180 + (Math.min(100, goalPercent) / 100) * 180;
  const goalRad = (goalAngleDeg * Math.PI) / 180;
  const gcx = 80;
  const gcy = 85;
  const rInner = 46;
  const rOuter = 82;
  const rCap = 86;
  const goalX1 = gcx + rInner * Math.cos(goalRad);
  const goalY1 = gcy + rInner * Math.sin(goalRad);
  const goalX2 = gcx + rOuter * Math.cos(goalRad);
  const goalY2 = gcy + rOuter * Math.sin(goalRad);
  const goalCapX = gcx + rCap * Math.cos(goalRad);
  const goalCapY = gcy + rCap * Math.sin(goalRad);

  return (
    <div className="relative shrink-0" style={{ width: 160, height: 98 }}>
      {/* colored bloom behind the dial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 70%, ${color}33 0%, transparent 70%)`,
        }}
      />
      <div style={{ filter: "url(#gauge-bevel)" }}>
        <GaugeComponent
          type="semicircle"
          value={animPercent}
          minValue={0}
          maxValue={100}
          arc={{
            cornerRadius: 3,
            padding: 0.008,
            width: 0.26,
            subArcs,
          }}
          pointer={{ hide: true }}
          labels={{
            valueLabel: { hide: true },
            tickLabels: { hideMinMax: true, ticks: [] },
          }}
          style={{ width: 160, height: 98 }}
        />
      </div>

      {/* Goal tick overlay — bright, visible */}
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 160 98"
        width={160}
        height={98}
        style={{ overflow: "visible" }}
      >
        {/* white halo for pop against the gauge */}
        <line
          x1={goalX1}
          y1={goalY1}
          x2={goalX2}
          y2={goalY2}
          stroke="#FFFFFF"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <line
          x1={goalX1}
          y1={goalY1}
          x2={goalX2}
          y2={goalY2}
          stroke="#3EAE3E"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* outer cap dot */}
        <circle cx={goalCapX} cy={goalCapY} r={4.5} fill="#FFFFFF" />
        <circle cx={goalCapX} cy={goalCapY} r={3} fill="#3EAE3E" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
        <p
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ color: INK_SOFT }}
        >
          ทำได้
        </p>
        <p className="leading-none" style={{ color: INK }}>
          <span className="text-[28px] font-semibold">{Math.round(animPercent)}</span>
          <span className="text-[14px] font-normal" style={{ color: INK_SOFT }}>
            %
          </span>
        </p>
      </div>
    </div>
  );
}

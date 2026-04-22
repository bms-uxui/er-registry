import type { ReactNode } from "react";

export type PillTone = "stroke" | "trauma" | "stemi" | "sepsis" | "neutral";

// eslint-disable-next-line react-refresh/only-export-components
export const PILL_STYLES: Record<PillTone, { bg: string; edge: string; shadow: string }> = {
  stroke: { bg: "#34C77A", edge: "#1F8A52", shadow: "rgba(31,138,82,0.35)" },
  trauma: { bg: "#3E7BE6", edge: "#2456B8", shadow: "rgba(36,86,184,0.35)" },
  stemi:  { bg: "#F04D63", edge: "#B82238", shadow: "rgba(184,34,56,0.35)" },
  sepsis: { bg: "#F5A524", edge: "#C77A0C", shadow: "rgba(199,122,12,0.35)" },
  neutral: { bg: "#B8A46C", edge: "#7D6A3A", shadow: "rgba(125,106,58,0.3)" },
};

export function TablePill({ tone, children }: { tone: PillTone; children: ReactNode }) {
  const s = PILL_STYLES[tone];
  return (
    <span
      className="inline-flex items-center justify-center min-w-14 px-3 py-1 rounded-full text-[14px] font-semibold"
      style={{
        background: s.bg,
        color: "#FFFFFF",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.45)",
          "inset 1px 0 0 rgba(255,255,255,0.18)",
          "inset -1px 0 0 rgba(255,255,255,0.18)",
          `inset 0 -2px 0 ${s.shadow}`,
          `0 1px 2px ${s.shadow}`,
        ].join(", "),
        textShadow: "0 1px 0 rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </span>
  );
}

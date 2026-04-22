/* ────────────────────────────────────────────────────────────
   Tokens
   ──────────────────────────────────────────────────────────── */
export const INK = "#1A1A1A";
export const INK_SOFT = "#3A3A3A";
export const MUTED = "#707070";
export const RED = "#DC2626";
export const GREEN = "#15803D";
export const GREEN_TINT = "#DCFCE7";

/* ── Glass surfaces ─────────────────────────────── */
export const GLASS_CARD: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.55) 100%)",
  backdropFilter: "blur(24px) saturate(1.4)",
  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,1)",
    "inset 0 0 0 1px rgba(255,255,255,0.25)",
    "0 2px 6px rgba(16,24,40,0.04)",
    "0 14px 36px -10px rgba(16,24,40,0.10)",
    "0 32px 60px -30px rgba(16,24,40,0.14)",
  ].join(", "),
};

export const GLASS_SUBCARD: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.68) 100%)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,1)",
    "inset 0 -1px 0 rgba(16,24,40,0.04)",
    "0 1px 2px rgba(16,24,40,0.04)",
    "0 10px 28px -10px rgba(16,24,40,0.10)",
  ].join(", "),
};

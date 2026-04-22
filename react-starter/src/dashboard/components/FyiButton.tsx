import { Info } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { INK, INK_SOFT, MUTED } from "../tokens";

export function FyiButton({
  title,
  body,
  size = "md",
}: {
  title?: string;
  body: string;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? { btn: "w-6 h-6", icon: 12 } : { btn: "w-8 h-8", icon: 15 };
  return (
    <Tooltip.Provider delayDuration={120}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label={title ?? "รายละเอียดเพิ่มเติม"}
            className={`shrink-0 inline-flex items-center justify-center ${dims.btn} rounded-full transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10`}
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 100%)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,1)",
                "inset 0 -1px 0 rgba(16,24,40,0.04)",
                "0 1px 2px rgba(16,24,40,0.05)",
                "0 6px 14px -6px rgba(16,24,40,0.12)",
              ].join(", "),
            }}
          >
            <Info size={dims.icon} strokeWidth={2.25} style={{ color: MUTED }} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="end"
            sideOffset={8}
            className="z-50 max-w-sm"
            style={{
              borderRadius: 16,
              padding: 14,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 100%)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,1)",
                "0 2px 6px rgba(16,24,40,0.06)",
                "0 16px 40px -10px rgba(16,24,40,0.18)",
                "0 30px 60px -30px rgba(16,24,40,0.22)",
              ].join(", "),
              animationDuration: "160ms",
              animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex items-start gap-2">
              <Info size={14} className="mt-0.5 shrink-0" style={{ color: MUTED }} />
              <div className="text-[12px] leading-relaxed" style={{ color: INK_SOFT }}>
                {title && (
                  <p className="font-semibold mb-1" style={{ color: INK }}>
                    {title}
                  </p>
                )}
                {body}
              </div>
            </div>
            <Tooltip.Arrow
              width={12}
              height={6}
              style={{ fill: "rgba(255,255,255,0.92)" }}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

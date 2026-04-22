import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { GLASS_CARD, INK, INK_SOFT, MUTED, RED } from "../tokens";

export function UserProfile() {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <div
        className="group flex items-center rounded-full p-1.5 relative overflow-hidden transition-all duration-300 ease-out"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.62) 100%)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,1)",
            "inset 0 -1px 0 rgba(16,24,40,0.04)",
            "0 1px 2px rgba(16,24,40,0.05)",
            "0 10px 24px -10px rgba(16,24,40,0.18)",
          ].join(", "),
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* ── Avatar ── */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 relative cursor-pointer"
          style={{
            background: "linear-gradient(145deg, #E4F1EB 0%, #9BC5AE 100%)",
            color: "#15603F",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.9)",
              "inset 0 -1px 0 rgba(0,0,0,0.1)",
              "0 2px 6px rgba(46,125,91,0.3)",
            ].join(", "),
          }}
        >
          ภก
        </div>

        {/* ── Expanding: name + hospital ── */}
        <div className="flex items-center overflow-hidden whitespace-nowrap transition-all duration-300 ease-out max-w-0 opacity-0 group-hover:max-w-80 group-hover:opacity-100 group-hover:ml-3">
          <div className="leading-tight pr-1">
            <p className="text-[13px] font-semibold" style={{ color: INK }}>
              นพ. ภิรมย์ภักดิ์ เกียรติวัฒน์
            </p>
            <p className="text-[11px]" style={{ color: MUTED }}>
              รพ. พระจอมเกล้า · เพชรบุรี
            </p>
          </div>
        </div>

        {/* ── Expanding: logout ── */}
        <div className="overflow-hidden transition-all duration-300 ease-out max-w-0 opacity-0 group-hover:max-w-10 group-hover:opacity-100 group-hover:ml-2">
          <button
            type="button"
            aria-label="ออกจากระบบ"
            onClick={() => setConfirmOpen(true)}
            className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20"
            style={{
              background: `linear-gradient(145deg, #F87171 0%, ${RED} 100%)`,
              color: "#FFFFFF",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.3)",
                "inset 0 -1px 0 rgba(0,0,0,0.2)",
              ].join(", "),
            }}
          >
            <LogOut size={13} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-60 animate-[fadeUp_300ms_ease-out]"
            style={{
              background: "rgba(16,24,40,0.45)",
              backdropFilter: "blur(4px)",
            }}
          />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-70 -translate-x-1/2 -translate-y-1/2 w-[min(420px,92vw)] rounded-3xl p-6 focus:outline-none"
            style={{
              ...GLASS_CARD,
              background:
                "linear-gradient(145deg, rgba(253,247,232,0.98) 0%, rgba(250,240,218,0.96) 100%)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(145deg, #FCA5A5 0%, ${RED} 100%)`,
                  boxShadow: [
                    "inset 0 1px 0 rgba(255,255,255,0.4)",
                    "inset 0 -2px 0 rgba(0,0,0,0.15)",
                    "0 6px 18px -4px rgba(220,38,38,0.45)",
                  ].join(", "),
                }}
              >
                <LogOut size={22} strokeWidth={2.25} color="#FFFFFF" />
              </div>
              <Dialog.Title
                className="text-[18px] font-semibold"
                style={{ color: INK }}
              >
                ออกจากระบบ
              </Dialog.Title>
              <Dialog.Description
                className="mt-1.5 text-[13px]"
                style={{ color: INK_SOFT }}
              >
                คุณต้องการออกจากระบบใช่หรือไม่?
              </Dialog.Description>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full py-2.5 text-[13px] font-semibold cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(250,248,240,0.85) 100%)",
                  color: INK_SOFT,
                  border: "1px solid rgba(16,24,40,0.08)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(16,24,40,0.04)",
                }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmOpen(false);
                  navigate("/login");
                }}
                className="rounded-full py-2.5 text-[13px] font-semibold cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(145deg, #F87171 0%, ${RED} 100%)`,
                  color: "#FFFFFF",
                  textShadow: "0 1px 0 rgba(0,0,0,0.18)",
                  boxShadow: [
                    "inset 0 1px 0 rgba(255,255,255,0.35)",
                    "inset 0 -2px 0 rgba(0,0,0,0.18)",
                    "0 4px 12px rgba(220,38,38,0.35)",
                  ].join(", "),
                }}
              >
                ออกจากระบบ
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

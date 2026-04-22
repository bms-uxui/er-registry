import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import mophLogo from "../../assets/logo_MOPH.png";
import heroImg from "../../assets/hero.png";
import { INK, MUTED, GLASS_CARD } from "../tokens";
import { SAMPLE_HOSPITALS } from "../data";

export function Banner({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (searchRef.current) setRect(searchRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  const filtered = SAMPLE_HOSPITALS.filter((h) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.province.toLowerCase().includes(q) ||
      h.code.includes(q)
    );
  }).slice(0, 8);

  return (
    <div
      className="rounded-3xl relative overflow-hidden flex items-stretch"
      style={{
        ...GLASS_CARD,
        background:
          "linear-gradient(135deg, rgba(255,248,236,0.85) 0%, rgba(255,226,186,0.55) 100%)",
        minHeight: 140,
      }}
    >
      {/* top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* faint dotted grid on far-right corner */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,123,26,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(circle at 90% 10%, black 0%, transparent 45%)",
          WebkitMaskImage:
            "radial-gradient(circle at 90% 10%, black 0%, transparent 45%)",
        }}
      />

      {/* ── Left: headline + input + steps ── */}
      <div className="relative flex-1 min-w-0 px-6 py-5 flex flex-col justify-center gap-3">
        {/* brand chip */}
        <div className="flex items-center gap-2">
          <img
            src={mophLogo}
            alt="กระทรวงสาธารณสุข"
            className="w-8 h-8 object-contain shrink-0 select-none"
            style={{ filter: "drop-shadow(0 2px 6px rgba(16,24,40,0.12))" }}
            draggable={false}
          />
          <span className="text-[12px] font-semibold tracking-wide" style={{ color: "#D9A332" }}>
            ER Registry • รายงานข้อมูลการวัดผลแผนกห้องฉุกเฉิน
          </span>
        </div>

        {/* headline */}
        <h1
          className="text-[24px] leading-[1.2] font-semibold max-w-xl"
          style={{ color: INK, letterSpacing: "0.015em" }}
        >
          ค้นหาข้อมูลแผนกห้องฉุกเฉิน
        </h1>

        {/* input + CTA with hospital dropdown */}
        <div className="relative max-w-xl" ref={searchRef}>
          <div
            className="flex items-center gap-2 rounded-full pl-4 pr-2 py-2"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.95)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,1)",
                "0 1px 2px rgba(16,24,40,0.04)",
                "0 10px 24px -12px rgba(16,24,40,0.18)",
              ].join(", "),
            }}
          >
            <Search size={15} style={{ color: MUTED }} />
            <input
              type="text"
              placeholder="กรอกรหัสหรือชื่อสถานพยาบาล"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[#9CA3AF]"
              style={{ color: INK }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(query);
                  setOpen(false);
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                onSearch(query);
                setOpen(false);
              }}
              className="shrink-0 flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background:
                  "linear-gradient(145deg, #F3C94A 0%, #E5A42E 55%, #D9A332 100%)",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(120,80,10,0.55)",
                boxShadow: [
                  "inset 0 1.5px 0 rgba(255,255,255,0.7)",
                  "inset 0 -2px 0 rgba(180,130,30,0.35)",
                  "inset 0 0 0 1px rgba(255,255,255,0.35)",
                  "0 2px 6px rgba(201,152,50,0.3)",
                  "0 10px 22px -8px rgba(201,152,50,0.5)",
                ].join(", "),
              }}
            >
              ค้นหา
            </button>
          </div>

          {/* Dropdown — portaled to escape banner overflow */}
          {open && rect && createPortal(
            <div
              className="rounded-2xl p-2 max-h-80 overflow-auto"
              style={{
                position: "fixed",
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width,
                zIndex: 9999,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 100%)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255,255,255,1)",
                  "0 2px 6px rgba(16,24,40,0.06)",
                  "0 16px 40px -10px rgba(16,24,40,0.18)",
                  "0 30px 60px -30px rgba(16,24,40,0.22)",
                ].join(", "),
              }}
            >
              {filtered.length === 0 ? (
                <p
                  className="text-[13px] py-6 px-3 text-center"
                  style={{ color: MUTED }}
                >
                  ไม่พบสถานพยาบาลที่ตรงกับ "{query}"
                </p>
              ) : (
                <ul>
                    {filtered.map((h) => (
                      <li key={h.code}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setQuery(h.name);
                            setOpen(false);
                            onSearch(h.name);
                          }}
                          className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-colors hover:bg-black/5 focus:bg-black/5 focus:outline-none"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <span
                              className="inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-[11px] font-semibold"
                              style={{
                                background: "#FEF3C7",
                                color: "#B58522",
                              }}
                            >
                              รพ
                            </span>
                            <span className="min-w-0">
                              <span
                                className="block text-[13px] font-medium truncate"
                                style={{ color: INK }}
                              >
                                {h.name}
                              </span>
                              <span
                                className="block text-[11px]"
                                style={{ color: MUTED }}
                              >
                                {h.province} · รหัส {h.code}
                              </span>
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
              )}
            </div>,
            document.body,
          )}
        </div>

      </div>

      {/* ── Right: hero image with floating badges ── */}
      <div className="relative shrink-0 w-[49%] max-w-xl hidden md:flex items-end justify-end pr-6">
        {/* grid background, fades to the left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(181,133,34,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(181,133,34,0.22) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 90%)",
          }}
        />
        {/* soft warm glow behind the hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 60%, rgba(245,197,74,0.20) 0%, transparent 65%)",
          }}
        />

        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="relative w-full object-contain object-bottom-right select-none pointer-events-none"
          style={{
            maxHeight: 234,
            marginBottom: -36,
            marginRight: -62,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { HOSPITAL_ROWS } from "../dashboard/data";
import { GaugeGradientDefs } from "../dashboard/components/GaugeGradientDefs";
import { Banner } from "../dashboard/components/Banner";
import { StatsRow } from "../dashboard/components/StatsRow";
import { FolderTabs } from "../dashboard/components/FolderTabs";
import { SiteFooter } from "../dashboard/components/SiteFooter";
import { UserProfile } from "../dashboard/components/UserProfile";

export { HOSPITAL_ROWS } from "../dashboard/data";
export type { HospitalRowData } from "../dashboard/types";

export default function ErRegistryDashboard() {
  const [tab, setTab] = useState<"overview" | "hospitals">("overview");
  const [tableQuery, setTableQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const handleBannerSearch = (q: string) => {
    const needle = q.trim().toLowerCase();
    setTab("hospitals");
    if (!needle) {
      setTableQuery("");
      setSelectedIdx(null);
      return;
    }
    const exact = HOSPITAL_ROWS.findIndex(
      (r) => r.name.toLowerCase() === needle,
    );
    const idx = exact >= 0
      ? exact
      : HOSPITAL_ROWS.findIndex(
          (r) =>
            r.name.toLowerCase().includes(needle) ||
            r.province.toLowerCase().includes(needle),
        );
    if (idx >= 0) {
      setSelectedIdx(idx);
      setTableQuery("");
    } else {
      setTableQuery(q);
      setSelectedIdx(null);
    }
  };
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF5 0%, #FFF1DC 100%)",
      }}
    >
      {/* ── Abstract blob gradient objects (white → #FFA500) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blob A — top-left, largest */}
        <div
          className="absolute w-160 h-160 opacity-75"
          style={{
            top: "-180px",
            left: "-160px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #FFA500 100%)",
            borderRadius: "58% 42% 38% 62% / 55% 45% 55% 45%",
            filter: "blur(80px)",
          }}
        />
        {/* Blob B — top-right */}
        <div
          className="absolute w-130 h-130 opacity-65"
          style={{
            top: "-120px",
            right: "-140px",
            background: "linear-gradient(220deg, #FFFFFF 0%, #FFA500 100%)",
            borderRadius: "40% 60% 65% 35% / 50% 42% 58% 50%",
            filter: "blur(90px)",
          }}
        />
        {/* Blob C — mid-right drifting */}
        <div
          className="absolute w-140 h-140 opacity-55"
          style={{
            top: "40%",
            right: "-180px",
            background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #FFA500 75%)",
            borderRadius: "62% 38% 48% 52% / 45% 55% 45% 55%",
            filter: "blur(100px)",
          }}
        />
        {/* Blob D — bottom-left */}
        <div
          className="absolute w-170 h-170 opacity-70"
          style={{
            bottom: "-240px",
            left: "-200px",
            background: "linear-gradient(45deg, #FFFFFF 0%, #FFA500 100%)",
            borderRadius: "48% 52% 62% 38% / 58% 48% 52% 42%",
            filter: "blur(110px)",
          }}
        />
        {/* Blob E — small accent, mid-top */}
        <div
          className="absolute w-80 h-80 opacity-60"
          style={{
            top: "18%",
            left: "42%",
            background: "radial-gradient(circle, #FFFFFF 0%, #FFA500 80%)",
            borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* soft whitening veil so blobs stay in the background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.55) 80%)",
        }}
      />
      <GaugeGradientDefs />
      <div className="relative max-w-360 mx-auto px-8 py-5 space-y-4">
        {/* ── Full-width hero banner ── */}
        <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
          <Banner onSearch={handleBannerSearch} />
        </div>

        {/* ── Stats cards by category ── */}
        <div className="animate-fade-up" style={{ animationDelay: "140ms" }}>
          <StatsRow />
        </div>

        {/* ── Tabbed content ── */}
        <div className="animate-fade-up" style={{ animationDelay: "280ms" }}>
          <FolderTabs
            tab={tab}
            onTabChange={setTab}
            tableQuery={tableQuery}
            setTableQuery={setTableQuery}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "420ms" }}>
          <SiteFooter />
        </div>
      </div>

      {/* ── Floating user profile (bottom-right overlay) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <UserProfile />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { INK, INK_SOFT } from "../tokens";
import { categories } from "../data";
import { CategoryCard } from "./CategoryCard";
import { HospitalTable } from "./HospitalTable";
import { LatestUpdate } from "./LatestUpdate";

function FolderTab({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className="group relative px-5 pt-2.5 pb-3 text-[14px] font-semibold transition-all focus:outline-none data-[state=active]:z-10 cursor-pointer"
      style={{ color: INK_SOFT }}
    >
      {/* Folder tab shape — rounded top, flat bottom, extends into content */}
      <span
        className="absolute inset-0 rounded-t-2xl pointer-events-none transition-all"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 100%)",
          border: "1px solid rgba(255,255,255,0.75)",
          borderBottom: "none",
        }}
      />
      {/* hover overlay — only on inactive tabs */}
      <span
        className="absolute inset-0 rounded-t-2xl pointer-events-none opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-0 transition-opacity"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.55) 100%)",
          border: "1px solid rgba(255,255,255,0.9)",
          borderBottom: "none",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1)",
        }}
      />
      <span
        className="absolute inset-0 rounded-t-2xl pointer-events-none opacity-0 group-data-[state=active]:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.72) 100%)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.9)",
          borderBottom: "none",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,1)",
            "inset 1px 0 0 rgba(255,255,255,0.6)",
            "inset -1px 0 0 rgba(255,255,255,0.6)",
            "0 -6px 14px -8px rgba(16,24,40,0.08)",
          ].join(", "),
        }}
      />
      {/* seam: cover the 1px border where the active tab meets the content */}
      <span
        className="absolute left-0 right-0 -bottom-px h-0.5 pointer-events-none opacity-0 group-data-[state=active]:opacity-100"
        style={{ background: "rgba(255,255,255,0.95)" }}
      />
      <span
        className="relative group-data-[state=active]:text-inherit"
        style={{ color: "inherit" }}
      >
        <span className="group-data-[state=active]:hidden">{children}</span>
        <span
          className="hidden group-data-[state=active]:inline"
          style={{ color: INK }}
        >
          {children}
        </span>
      </span>
    </Tabs.Trigger>
  );
}

export function FolderTabs({
  tab,
  onTabChange,
  tableQuery,
  setTableQuery,
  selectedIdx,
  setSelectedIdx,
}: {
  tab: "overview" | "hospitals";
  onTabChange: (t: "overview" | "hospitals") => void;
  tableQuery: string;
  setTableQuery: (q: string) => void;
  selectedIdx: number | null;
  setSelectedIdx: (i: number | null) => void;
}) {
  return (
    <Tabs.Root
      value={tab}
      onValueChange={(v) => onTabChange(v as "overview" | "hospitals")}
      className="relative"
    >
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <Tabs.List className="flex items-end gap-1 pl-4 relative z-10">
          <FolderTab value="overview">ภาพรวม</FolderTab>
          <FolderTab value="hospitals">รายชื่อสถานพยาบาล</FolderTab>
        </Tabs.List>
        <LatestUpdate />
      </div>

      <div className="relative">
        <Tabs.Content value="overview" className="outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <div
                key={cat.key}
                className="animate-fade-up"
                style={{ animationDelay: `${340 + i * 120}ms` }}
              >
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content value="hospitals" className="outline-none">
          <HospitalTable
            query={tableQuery}
            setQuery={setTableQuery}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}

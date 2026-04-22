import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, ChevronRight } from "lucide-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import hospitalImg from "../../assets/hospital.png";
import { INK, INK_SOFT, MUTED, GLASS_CARD, GLASS_SUBCARD } from "../tokens";
import { HOSPITAL_ROWS } from "../data";
import type { HospitalRowData } from "../types";
import { TablePill } from "./TablePill";
import { HospitalDetailPanel } from "./HospitalDetailPanel";

type SortField =
  | "stroke"
  | "trauma"
  | "stemi"
  | "sepsis"
  | "strokeD2CT"
  | "strokeD2N"
  | "traumaD2C"
  | "traumaD2FB"
  | "stemiD2EKG"
  | "stemiD2Dx"
  | "sepsisD2ABX";

type ColumnDef = { label: string; field?: SortField };

const TABLE_COLUMNS: ColumnDef[] = [
  { label: "ชื่อสถานพยาบาล" },
  { label: "จังหวัด" },
  { label: "Stroke", field: "stroke" },
  { label: "Trauma", field: "trauma" },
  { label: "STEMI", field: "stemi" },
  { label: "Sepsis", field: "sepsis" },
  { label: "Stroke: D2CT", field: "strokeD2CT" },
  { label: "Stroke: D2N", field: "strokeD2N" },
  { label: "Trauma: D2C", field: "traumaD2C" },
  { label: "Trauma: D2FB", field: "traumaD2FB" },
  { label: "STEMI: D2EKG", field: "stemiD2EKG" },
  { label: "STEMI: D2Dx", field: "stemiD2Dx" },
  { label: "Sepsis: D2ABX", field: "sepsisD2ABX" },
];

export function HospitalTable({
  query,
  setQuery,
  selectedIdx,
  setSelectedIdx,
}: {
  query: string;
  setQuery: (q: string) => void;
  selectedIdx: number | null;
  setSelectedIdx: (i: number | null) => void;
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | null>(null);
  const checkEnd = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };
  useEffect(() => {
    checkEnd();
    window.addEventListener("resize", checkEnd);
    return () => window.removeEventListener("resize", checkEnd);
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(0);
  };

  const q = query.trim().toLowerCase();
  const filteredRows: HospitalRowData[] = q
    ? HOSPITAL_ROWS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.province.toLowerCase().includes(q),
      )
    : HOSPITAL_ROWS;

  const sortedRows = sortField
    ? [...filteredRows].sort((a, b) => {
        const av = a[sortField];
        const bv = b[sortField];
        return sortDir === "asc" ? av - bv : bv - av;
      })
    : filteredRows;

  const visibleRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  if (selectedIdx !== null && HOSPITAL_ROWS[selectedIdx]) {
    return (
      <HospitalDetailPanel
        hospital={HOSPITAL_ROWS[selectedIdx]}
        onClose={() => setSelectedIdx(null)}
      />
    );
  }

  return (
    <section
      className="rounded-3xl p-5 md:p-6 relative overflow-hidden"
      style={GLASS_CARD}
    >
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative flex flex-wrap items-center gap-3 mb-4">
        <h3 className="text-[18px] font-semibold" style={{ color: INK }}>
          รายชื่อสถานพยาบาล
        </h3>

        <div className="flex-1 min-w-60 flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 rounded-full pl-4 pr-2 py-1.5"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.95)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(16,24,40,0.04)",
            }}
          >
            <Search size={14} style={{ color: MUTED }} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="พิมพ์ชื่อสถานพยาบาลหรือจังหวัดเพื่อค้นหา"
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[#9CA3AF]"
              style={{ color: INK }}
            />
            <button
              type="button"
              className="shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
              style={{
                background:
                  "linear-gradient(145deg, #F3C94A 0%, #E5A42E 55%, #D9A332 100%)",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(120,80,10,0.5)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255,255,255,0.55)",
                  "inset 0 -1px 0 rgba(120,70,10,0.3)",
                  "0 2px 6px rgba(201,152,50,0.3)",
                ].join(", "),
              }}
            >
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      {sortedRows.length === 0 ? (
        <div
          className="rounded-2xl p-10 flex flex-col items-center text-center gap-3"
          style={GLASS_SUBCARD}
        >
          <img
            src={hospitalImg}
            alt=""
            className="w-36 h-36 object-contain"
            style={{ filter: "grayscale(0.4) opacity(0.85)" }}
          />
          <div className="text-[16px] font-semibold" style={{ color: INK }}>
            ไม่พบข้อมูลสถานพยาบาล
          </div>
          <div className="text-[13px]" style={{ color: INK_SOFT }}>
            ลองค้นหาด้วยชื่อสถานพยาบาลหรือจังหวัดอื่น
          </div>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setPage(0);
              }}
              className="mt-2 rounded-full px-4 py-1.5 text-[12px] font-semibold cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(145deg, #F3C94A 0%, #E5A42E 55%, #D9A332 100%)",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(120,80,10,0.5)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.55), 0 4px 12px rgba(201,152,50,0.3)",
              }}
            >
              ล้างการค้นหา
            </button>
          )}
        </div>
      ) : (
      <div className="relative">
        {/* right-edge fade to hint at horizontal scroll */}
        <div
          className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 100%)",
            opacity: atEnd ? 0 : 1,
          }}
        />
        {/* chevron indicator */}
        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 z-20 pointer-events-none w-7 h-7 rounded-full flex items-center justify-center transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,1)",
              "0 2px 6px rgba(16,24,40,0.12)",
              "0 6px 14px -6px rgba(16,24,40,0.18)",
            ].join(", "),
            color: INK_SOFT,
            opacity: atEnd ? 0 : 1,
          }}
        >
          <ChevronRight size={14} strokeWidth={2.5} />
        </div>
      <TableContainer
        ref={scrollRef}
        onScroll={checkEnd}
        sx={{
          background: "transparent",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{
            width: "max-content",
            minWidth: "100%",
            "& .MuiTableCell-root": {
              fontFamily: "inherit",
              borderBottom: "1px solid rgba(16,24,40,0.05)",
              padding: "14px",
              fontSize: "14px",
              backgroundColor: "#FFFFFF",
            },
            "& .MuiTableCell-head": {
              color: "#4B5563",
              backgroundColor: "#F3F4F6",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderBottom: "none",
              whiteSpace: "nowrap",
              verticalAlign: "bottom",
            },
            // Sticky name column (index 1)
            "& .MuiTableCell-root:nth-of-type(1)": {
              position: "sticky",
              left: 0,
              zIndex: 2,
              backgroundColor: "#FFFFFF",
              minWidth: 220,
              width: 220,
            },
            "& .MuiTableCell-head:nth-of-type(1)": {
              zIndex: 3,
              backgroundColor: "#F3F4F6",
            },
            // Sticky province column (index 2)
            "& .MuiTableCell-root:nth-of-type(2)": {
              position: "sticky",
              left: 220,
              zIndex: 2,
              backgroundColor: "#FFFFFF",
              minWidth: 140,
              width: 140,
              boxShadow: "4px 0 8px -4px rgba(16,24,40,0.08)",
            },
            "& .MuiTableCell-head:nth-of-type(2)": {
              zIndex: 3,
              backgroundColor: "#F3F4F6",
            },
            "& .MuiTableHead-root .MuiTableCell-head:first-of-type": {
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
            "& .MuiTableHead-root .MuiTableCell-head:last-of-type": {
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
            "& .MuiTableBody-root .MuiTableRow-root": {
              transition: "background-color 150ms ease",
              cursor: "pointer",
            },
            "& .MuiTableBody-root .MuiTableRow-root:hover .MuiTableCell-root": {
              backgroundColor: "#FCF8EF",
              borderBottomColor: "rgba(217,163,50,0.25)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((col) => (
                <TableCell
                  key={col.label}
                  align={col.field ? "center" : "left"}
                  sortDirection={
                    col.field && sortField === col.field ? sortDir : false
                  }
                >
                  {col.field ? (
                    <TableSortLabel
                      active={sortField === col.field}
                      direction={sortField === col.field ? sortDir : "asc"}
                      onClick={() => handleSort(col.field!)}
                      sx={{
                        fontFamily: "inherit",
                        color: "inherit !important",
                        "& .MuiTableSortLabel-icon": {
                          color: "inherit !important",
                          opacity: 0.6,
                        },
                        "&.Mui-active": { color: "inherit !important" },
                        "&:hover": { color: INK },
                      }}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            onMouseMove={(e) => setTipPos({ x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setTipPos(null)}
          >
            {visibleRows.map((r, i) => (
              <TableRow
                key={i}
                hover
                onClick={() => setSelectedIdx(HOSPITAL_ROWS.indexOf(r))}
              >
                <TableCell
                  sx={{
                    color: INK,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {r.name}
                </TableCell>
                <TableCell
                  sx={{ color: INK_SOFT, whiteSpace: "nowrap" }}
                >
                  {r.province}
                </TableCell>
                <TableCell align="center"><TablePill tone="stroke">{r.stroke}</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="trauma">{r.trauma}</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="stemi">{r.stemi}</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="sepsis">{r.sepsis}</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.strokeD2CT}%</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.strokeD2N}%</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.traumaD2C}%</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.traumaD2FB}%</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.stemiD2EKG}%</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.stemiD2Dx}%</TablePill></TableCell>
                <TableCell align="center"><TablePill tone="neutral">{r.sepsisD2ABX}%</TablePill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      )}

      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20, 50]}
        labelRowsPerPage="แสดงต่อหน้า"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} จาก ${count}`
        }
        sx={{
          mt: 1,
          fontFamily: "inherit",
          color: INK_SOFT,
          borderTop: "1px solid rgba(16,24,40,0.06)",
          "& .MuiToolbar-root": { fontFamily: "inherit", minHeight: 48 },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            { fontFamily: "inherit", fontSize: "12px", color: INK_SOFT, margin: 0 },
          "& .MuiTablePagination-select": { fontFamily: "inherit", fontSize: "12px" },
          "& .MuiIconButton-root": { color: INK_SOFT },
        }}
      />

      {tipPos && createPortal(
        <div
          className="pointer-events-none fixed z-50 rounded-full px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap"
          style={{
            left: tipPos.x + 14,
            top: tipPos.y + 14,
            background: "rgba(26,26,26,0.92)",
            color: "#FFFFFF",
            boxShadow: "0 6px 18px -4px rgba(16,24,40,0.35)",
          }}
        >
          ดูรายละเอียด
        </div>,
        document.body,
      )}
    </section>
  );
}

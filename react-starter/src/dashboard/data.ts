import { Siren, Brain, Activity, HeartPulse, Bug, CheckCircle2 } from "lucide-react";
import strokeImg from "../assets/stroke.png";
import traumaImg from "../assets/trauma.png";
import stemiImg from "../assets/stemi.png";
import sepsisImg from "../assets/sepsis.png";
import hospitalImg from "../assets/hospital.png";
import { GREEN, GREEN_TINT } from "./tokens";
import type { Category, HospitalRowData, KPI, Status } from "./types";

export const categories: Category[] = [
  {
    key: "stroke",
    name: "Stroke",
    description: "กลุ่มโรคหลอดเลือดสมอง",
    color: "#2E7D5B",
    bg: "#E4F1EB",
    Icon: Brain,
    image: strokeImg,
    kpis: [
      { title: "Door to CT Scan", target: "ไม่เกิน 25 นาที", score: 17, maxScore: 20, done: 78, goal: 80 },
      { title: "Door to Needle", subtitle: "Thrombolytic", target: "ไม่เกิน 60 นาที", score: 8, maxScore: 20, done: 42, goal: 80 },
    ],
  },
  {
    key: "trauma",
    name: "Trauma",
    description: "กลุ่มภาวะบาดเจ็บที่อาจกระทบหลายระบบพร้อมกัน",
    color: "#1E4F9C",
    bg: "#E3ECF7",
    Icon: Activity,
    image: traumaImg,
    criteria:
      "อายุ ≥ 18 ปี, SBP ≤ 90, DBP ≤ 60, FAST = Positive, ICD-10 = S36.xx, S39.9, Blunt Abdomen, Intraabdominal trauma, Abdominal Trauma, Abdominal Injury",
    kpis: [
      { title: "Door to Consult", subtitle: "Send Consult", target: "ไม่เกิน 20 นาที", score: 13, maxScore: 20, done: 64, goal: 80 },
      { title: "Door to First Blood", target: "ไม่เกิน 10 นาที", score: 18, maxScore: 20, done: 85, goal: 80 },
    ],
  },
  {
    key: "stemi",
    name: "STEMI",
    description: "ภาวะกล้ามเนื้อหัวใจตายเฉียบพลันชนิด ST ยก",
    color: "#B4254A",
    bg: "#F8E1E6",
    Icon: HeartPulse,
    image: stemiImg,
    kpis: [
      { title: "Door to EKG", subtitle: "Physician Report", target: "ไม่เกิน 10 นาที", score: 19, maxScore: 20, done: 88, goal: 80 },
      { title: "Door to Dx", subtitle: "Physician Key Dx", target: "ไม่เกิน 15 นาที", score: 14, maxScore: 20, done: 68, goal: 80 },
    ],
  },
  {
    key: "sepsis",
    name: "Sepsis",
    description: "ภาวะติดเชื้อในกระแสเลือด",
    color: "#D17A1E",
    bg: "#FBEAD3",
    Icon: Bug,
    image: sepsisImg,
    criteria: "อายุ ≥ 18 ปี, NEWS ≥ 5, SBP ≤ 90 และ DBP ≤ 60",
    kpis: [
      { title: "Door to Antibiotic", target: "ไม่เกิน 60 นาที", score: 11, maxScore: 20, done: 55, goal: 80 },
    ],
  },
];

export function statusOf(kpi: KPI): Status {
  return kpi.done >= kpi.goal ? "pass" : "below";
}

export function lerpHex(a: string, b: string, t: number): string {
  const parse = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export const STATUS_META: Record<Status, { label: string; color: string; solidFrom: string; solidMid: string; solidTo: string; solidText: string; solidTextShadow: string; bg: string; Icon: typeof Siren; barFrom: string; barTo: string }> = {
  pass: { label: "ผ่านเกณฑ์", color: GREEN, solidFrom: "#4ADE80", solidMid: "#22C55E", solidTo: "#15803D", solidText: "#FFFFFF", solidTextShadow: "0 1px 0 rgba(0,0,0,0.18)", bg: GREEN_TINT, Icon: CheckCircle2, barFrom: "#16A34A", barTo: "#22C55E" },
  below: { label: "ต่ำกว่าเกณฑ์", color: "#95691A", solidFrom: "#F3C94A", solidMid: "#D9A332", solidTo: "#B58522", solidText: "#FFFFFF", solidTextShadow: "0 1px 0 rgba(0,0,0,0.22)", bg: "#FEF3C7", Icon: Siren, barFrom: "#D9A332", barTo: "#F3C94A" },
};

export type CategoryStat = {
  key: string;
  label: string;
  count: number;
  delta: number;
  image: string;
  unit?: string;
};

export const CATEGORY_STATS: CategoryStat[] = [
  { key: "hospital", label: "สถานพยาบาล", count: 356, delta: 4, image: hospitalImg, unit: "แห่ง" },
  { key: "stroke", label: "Stroke", count: 165, delta: 8, image: strokeImg },
  { key: "trauma", label: "Trauma", count: 142, delta: -3, image: traumaImg },
  { key: "stemi", label: "STEMI", count: 128, delta: 5, image: stemiImg },
  { key: "sepsis", label: "Sepsis", count: 165, delta: 12, image: sepsisImg },
];

export const HOSPITAL_ROWS: HospitalRowData[] = [
  { name: "โรงพยาบาลศิริราช", province: "กรุงเทพมหานคร", stroke: 342, trauma: 418, stemi: 276, sepsis: 512, strokeD2CT: 92, strokeD2N: 84, traumaD2C: 88, traumaD2FB: 95, stemiD2EKG: 96, stemiD2Dx: 89, sepsisD2ABX: 83 },
  { name: "โรงพยาบาลจุฬาลงกรณ์ สภากาชาดไทย", province: "กรุงเทพมหานคร", stroke: 318, trauma: 362, stemi: 254, sepsis: 478, strokeD2CT: 90, strokeD2N: 81, traumaD2C: 85, traumaD2FB: 92, stemiD2EKG: 94, stemiD2Dx: 87, sepsisD2ABX: 80 },
  { name: "โรงพยาบาลรามาธิบดี", province: "กรุงเทพมหานคร", stroke: 296, trauma: 344, stemi: 238, sepsis: 456, strokeD2CT: 89, strokeD2N: 82, traumaD2C: 86, traumaD2FB: 90, stemiD2EKG: 93, stemiD2Dx: 85, sepsisD2ABX: 78 },
  { name: "โรงพยาบาลราชวิถี", province: "กรุงเทพมหานคร", stroke: 268, trauma: 312, stemi: 202, sepsis: 394, strokeD2CT: 85, strokeD2N: 74, traumaD2C: 80, traumaD2FB: 88, stemiD2EKG: 91, stemiD2Dx: 82, sepsisD2ABX: 75 },
  { name: "โรงพยาบาลภูมิพลอดุลยเดช", province: "กรุงเทพมหานคร", stroke: 184, trauma: 236, stemi: 142, sepsis: 268, strokeD2CT: 82, strokeD2N: 68, traumaD2C: 75, traumaD2FB: 84, stemiD2EKG: 88, stemiD2Dx: 76, sepsisD2ABX: 70 },
  { name: "โรงพยาบาลพระมงกุฎเกล้า", province: "กรุงเทพมหานคร", stroke: 172, trauma: 298, stemi: 128, sepsis: 246, strokeD2CT: 84, strokeD2N: 72, traumaD2C: 82, traumaD2FB: 90, stemiD2EKG: 86, stemiD2Dx: 78, sepsisD2ABX: 68 },
  { name: "โรงพยาบาลมหาราชนครเชียงใหม่", province: "เชียงใหม่", stroke: 258, trauma: 286, stemi: 192, sepsis: 362, strokeD2CT: 88, strokeD2N: 78, traumaD2C: 83, traumaD2FB: 89, stemiD2EKG: 92, stemiD2Dx: 84, sepsisD2ABX: 76 },
  { name: "โรงพยาบาลนครพิงค์", province: "เชียงใหม่", stroke: 146, trauma: 178, stemi: 102, sepsis: 212, strokeD2CT: 76, strokeD2N: 62, traumaD2C: 71, traumaD2FB: 82, stemiD2EKG: 84, stemiD2Dx: 73, sepsisD2ABX: 64 },
  { name: "โรงพยาบาลขอนแก่น", province: "ขอนแก่น", stroke: 224, trauma: 312, stemi: 176, sepsis: 338, strokeD2CT: 86, strokeD2N: 75, traumaD2C: 81, traumaD2FB: 88, stemiD2EKG: 90, stemiD2Dx: 82, sepsisD2ABX: 74 },
  { name: "โรงพยาบาลศรีนครินทร์ มหาวิทยาลัยขอนแก่น", province: "ขอนแก่น", stroke: 238, trauma: 268, stemi: 184, sepsis: 326, strokeD2CT: 87, strokeD2N: 79, traumaD2C: 82, traumaD2FB: 86, stemiD2EKG: 91, stemiD2Dx: 83, sepsisD2ABX: 77 },
  { name: "โรงพยาบาลสงขลานครินทร์", province: "สงขลา", stroke: 216, trauma: 256, stemi: 168, sepsis: 308, strokeD2CT: 85, strokeD2N: 76, traumaD2C: 80, traumaD2FB: 87, stemiD2EKG: 89, stemiD2Dx: 80, sepsisD2ABX: 72 },
  { name: "โรงพยาบาลหาดใหญ่", province: "สงขลา", stroke: 162, trauma: 198, stemi: 124, sepsis: 232, strokeD2CT: 78, strokeD2N: 65, traumaD2C: 73, traumaD2FB: 83, stemiD2EKG: 85, stemiD2Dx: 72, sepsisD2ABX: 66 },
  { name: "โรงพยาบาลมหาราชนครราชสีมา", province: "นครราชสีมา", stroke: 248, trauma: 324, stemi: 186, sepsis: 352, strokeD2CT: 83, strokeD2N: 71, traumaD2C: 78, traumaD2FB: 85, stemiD2EKG: 88, stemiD2Dx: 79, sepsisD2ABX: 73 },
  { name: "โรงพยาบาลสรรพสิทธิประสงค์", province: "อุบลราชธานี", stroke: 178, trauma: 242, stemi: 138, sepsis: 276, strokeD2CT: 80, strokeD2N: 68, traumaD2C: 75, traumaD2FB: 84, stemiD2EKG: 86, stemiD2Dx: 74, sepsisD2ABX: 69 },
  { name: "โรงพยาบาลอุดรธานี", province: "อุดรธานี", stroke: 168, trauma: 218, stemi: 122, sepsis: 254, strokeD2CT: 77, strokeD2N: 64, traumaD2C: 72, traumaD2FB: 82, stemiD2EKG: 84, stemiD2Dx: 71, sepsisD2ABX: 65 },
  { name: "โรงพยาบาลชลบุรี", province: "ชลบุรี", stroke: 192, trauma: 278, stemi: 148, sepsis: 286, strokeD2CT: 81, strokeD2N: 70, traumaD2C: 77, traumaD2FB: 85, stemiD2EKG: 87, stemiD2Dx: 77, sepsisD2ABX: 71 },
  { name: "โรงพยาบาลสมเด็จพระนางเจ้าฯ ณ ศรีราชา", province: "ชลบุรี", stroke: 124, trauma: 186, stemi: 92, sepsis: 184, strokeD2CT: 74, strokeD2N: 58, traumaD2C: 68, traumaD2FB: 80, stemiD2EKG: 82, stemiD2Dx: 68, sepsisD2ABX: 62 },
  { name: "โรงพยาบาลพระปกเกล้า", province: "จันทบุรี", stroke: 138, trauma: 196, stemi: 106, sepsis: 208, strokeD2CT: 75, strokeD2N: 60, traumaD2C: 70, traumaD2FB: 81, stemiD2EKG: 83, stemiD2Dx: 70, sepsisD2ABX: 63 },
  { name: "โรงพยาบาลพุทธชินราช", province: "พิษณุโลก", stroke: 172, trauma: 234, stemi: 132, sepsis: 256, strokeD2CT: 79, strokeD2N: 66, traumaD2C: 74, traumaD2FB: 83, stemiD2EKG: 85, stemiD2Dx: 73, sepsisD2ABX: 67 },
  { name: "โรงพยาบาลสุราษฎร์ธานี", province: "สุราษฎร์ธานี", stroke: 156, trauma: 212, stemi: 118, sepsis: 234, strokeD2CT: 76, strokeD2N: 62, traumaD2C: 71, traumaD2FB: 82, stemiD2EKG: 84, stemiD2Dx: 71, sepsisD2ABX: 64 },
  { name: "โรงพยาบาลภูเก็ต", province: "ภูเก็ต", stroke: 132, trauma: 204, stemi: 98, sepsis: 196, strokeD2CT: 78, strokeD2N: 65, traumaD2C: 76, traumaD2FB: 86, stemiD2EKG: 85, stemiD2Dx: 72, sepsisD2ABX: 66 },
  { name: "โรงพยาบาลนครปฐม", province: "นครปฐม", stroke: 148, trauma: 192, stemi: 112, sepsis: 218, strokeD2CT: 74, strokeD2N: 58, traumaD2C: 69, traumaD2FB: 80, stemiD2EKG: 82, stemiD2Dx: 69, sepsisD2ABX: 61 },
  { name: "โรงพยาบาลพระจอมเกล้า", province: "เพชรบุรี", stroke: 96, trauma: 144, stemi: 72, sepsis: 148, strokeD2CT: 72, strokeD2N: 54, traumaD2C: 66, traumaD2FB: 78, stemiD2EKG: 80, stemiD2Dx: 66, sepsisD2ABX: 58 },
  { name: "โรงพยาบาลพหลพลพยุหเสนา", province: "กาญจนบุรี", stroke: 88, trauma: 132, stemi: 64, sepsis: 134, strokeD2CT: 68, strokeD2N: 48, traumaD2C: 62, traumaD2FB: 76, stemiD2EKG: 78, stemiD2Dx: 62, sepsisD2ABX: 54 },
  { name: "โรงพยาบาลลำปาง", province: "ลำปาง", stroke: 102, trauma: 156, stemi: 78, sepsis: 164, strokeD2CT: 70, strokeD2N: 52, traumaD2C: 65, traumaD2FB: 78, stemiD2EKG: 80, stemiD2Dx: 64, sepsisD2ABX: 56 },
  { name: "โรงพยาบาลเจ้าพระยายมราช", province: "สุพรรณบุรี", stroke: 78, trauma: 118, stemi: 58, sepsis: 122, strokeD2CT: 66, strokeD2N: 46, traumaD2C: 60, traumaD2FB: 74, stemiD2EKG: 76, stemiD2Dx: 60, sepsisD2ABX: 52 },
  { name: "โรงพยาบาลสระบุรี", province: "สระบุรี", stroke: 92, trauma: 142, stemi: 68, sepsis: 148, strokeD2CT: 69, strokeD2N: 50, traumaD2C: 63, traumaD2FB: 76, stemiD2EKG: 78, stemiD2Dx: 62, sepsisD2ABX: 55 },
  { name: "โรงพยาบาลมหาสารคาม", province: "มหาสารคาม", stroke: 68, trauma: 98, stemi: 48, sepsis: 108, strokeD2CT: 62, strokeD2N: 42, traumaD2C: 58, traumaD2FB: 72, stemiD2EKG: 74, stemiD2Dx: 56, sepsisD2ABX: 48 },
  { name: "โรงพยาบาลร้อยเอ็ด", province: "ร้อยเอ็ด", stroke: 74, trauma: 108, stemi: 52, sepsis: 118, strokeD2CT: 64, strokeD2N: 44, traumaD2C: 60, traumaD2FB: 73, stemiD2EKG: 75, stemiD2Dx: 58, sepsisD2ABX: 50 },
  { name: "โรงพยาบาลแพร่", province: "แพร่", stroke: 56, trauma: 84, stemi: 38, sepsis: 92, strokeD2CT: 58, strokeD2N: 38, traumaD2C: 54, traumaD2FB: 70, stemiD2EKG: 72, stemiD2Dx: 52, sepsisD2ABX: 44 },
  { name: "โรงพยาบาลน่าน", province: "น่าน", stroke: 48, trauma: 72, stemi: 32, sepsis: 78, strokeD2CT: 54, strokeD2N: 34, traumaD2C: 50, traumaD2FB: 68, stemiD2EKG: 70, stemiD2Dx: 48, sepsisD2ABX: 40 },
  { name: "โรงพยาบาลตรัง", province: "ตรัง", stroke: 82, trauma: 124, stemi: 58, sepsis: 132, strokeD2CT: 67, strokeD2N: 48, traumaD2C: 62, traumaD2FB: 75, stemiD2EKG: 77, stemiD2Dx: 61, sepsisD2ABX: 53 },
];

export const SAMPLE_HOSPITALS: { name: string; province: string; code: string }[] = [
  { name: "โรงพยาบาลศิริราช", province: "กรุงเทพมหานคร", code: "10001" },
  { name: "โรงพยาบาลจุฬาลงกรณ์", province: "กรุงเทพมหานคร", code: "10002" },
  { name: "โรงพยาบาลรามาธิบดี", province: "กรุงเทพมหานคร", code: "10003" },
  { name: "โรงพยาบาลพระจอมเกล้า", province: "เพชรบุรี", code: "10721" },
  { name: "โรงพยาบาลขอนแก่น", province: "ขอนแก่น", code: "10401" },
  { name: "โรงพยาบาลเชียงใหม่ มหาราช", province: "เชียงใหม่", code: "10501" },
  { name: "โรงพยาบาลสงขลานครินทร์", province: "สงขลา", code: "10901" },
  { name: "โรงพยาบาลชลบุรี", province: "ชลบุรี", code: "10201" },
  { name: "โรงพยาบาลนครพิงค์", province: "เชียงใหม่", code: "10502" },
  { name: "โรงพยาบาล BMS ทดสอบ 99999", province: "นครศรีธรรมราช", code: "99999" },
];

export const KPI_FIELDS: Record<string, (keyof HospitalRowData)[]> = {
  stroke: ["strokeD2CT", "strokeD2N"],
  trauma: ["traumaD2C", "traumaD2FB"],
  stemi:  ["stemiD2EKG", "stemiD2Dx"],
  sepsis: ["sepsisD2ABX"],
};

export const CASE_TOTAL_FIELD: Record<string, keyof HospitalRowData> = {
  stroke: "stroke",
  trauma: "trauma",
  stemi: "stemi",
  sepsis: "sepsis",
};

export function hydrateCategories(hospital: HospitalRowData): Category[] {
  return categories.map((cat) => {
    const fields = KPI_FIELDS[cat.key] ?? [];
    const total = hospital[CASE_TOTAL_FIELD[cat.key]] as number;
    return {
      ...cat,
      kpis: cat.kpis.map((kpi, i) => {
        const pct = hospital[fields[i]] as number | undefined;
        if (typeof pct !== "number") return kpi;
        return {
          ...kpi,
          done: pct,
          score: Math.round((pct * kpi.maxScore) / 100),
          casesTotal: total,
          casesDone: Math.round((total * pct) / 100),
        };
      }),
    };
  });
}

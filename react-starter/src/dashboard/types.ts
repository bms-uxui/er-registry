import type { Brain } from "lucide-react";

export type Status = "pass" | "below";

export type KPI = {
  title: string;
  subtitle?: string;
  target: string;
  score: number;
  maxScore: number;
  done: number;
  goal: number;
  casesDone?: number;
  casesTotal?: number;
};

export type Category = {
  key: string;
  name: string;
  description: string;
  color: string;
  bg: string;
  Icon: typeof Brain;
  image: string;
  kpis: KPI[];
  criteria?: string;
};

export type HospitalRowData = {
  name: string;
  province: string;
  stroke: number;
  trauma: number;
  stemi: number;
  sepsis: number;
  strokeD2CT: number;
  strokeD2N: number;
  traumaD2C: number;
  traumaD2FB: number;
  stemiD2EKG: number;
  stemiD2Dx: number;
  sepsisD2ABX: number;
};

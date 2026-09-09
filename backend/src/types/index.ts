export type CaseStatus = "Novo" | "Em Acolhimento" | "Encaminhado ao Conselho Tutelar" | "Encerrado";
export type SeverityLevel = "Baixa" | "Média" | "Alta";

export interface ConfidentialNote {
  author: string;
  date: string;
  text: string;
}

export interface LegalActions {
  conselhoTutelarNotified: boolean;
  policeReportFiled: boolean;
  guardiansContacted: boolean;
}

export interface ReportCase {
  id: string; // Protocol code e.g. "4PT-7821-S"
  date: string;
  type: string;
  isAnonymous: boolean;
  studentName?: string;
  studentContact?: string;
  location: string;
  frequency: string;
  status: CaseStatus;
  severity: SeverityLevel;
  narrative: string;
  hasEvidence: boolean;
  evidenceFiles: string[];
  confidentialNotes: ConfidentialNote[];
  legalActions: LegalActions;
}

export interface CreateReportDTO {
  category: string;
  isAnonymous: boolean;
  name?: string;
  contact?: string;
  location: string;
  frequency: string;
  severity?: SeverityLevel;
  narrative: string;
  evidenceFiles?: string[];
}

export interface AuthUser {
  id: string;
  name: string;
  role: string;
  email: string;
}

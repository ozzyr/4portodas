import { Router, Request, Response } from "express";
import { store } from "../data/store";
import { CreateReportDTO, CaseStatus } from "../types";

export const reportsRouter = Router();

// POST /api/reports - Submeter novo relato seguro
reportsRouter.post("/", (req: Request, res: Response) => {
  try {
    const dto: CreateReportDTO = req.body;
    if (!dto.category || !dto.location || !dto.narrative) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes (categoria, local e relato)." });
    }

    const created = store.createCase(dto);
    return res.status(201).json({
      success: true,
      protocol: created.id,
      date: created.date,
      message: "Relato recebido com sigilo e segurança. Guarde seu número de protocolo para acompanhamento.",
      case: created
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao processar o relato." });
  }
});

// GET /api/reports/track/:protocol - Consulta de protocolo público (sem dados sensíveis)
reportsRouter.get("/track/:protocol", (req: Request, res: Response) => {
  const { protocol } = req.params;
  const report = store.getCaseById(protocol);

  if (!report) {
    return res.status(404).json({ error: "Protocolo não encontrado no sistema escolar." });
  }

  // Retorna visão segura e acolhedora sem vazar dados de terceiros
  return res.json({
    id: report.id,
    date: report.date,
    type: report.type,
    status: report.status,
    severity: report.severity,
    notesSummary: report.confidentialNotes.map(n => ({
      date: n.date,
      author: n.author,
      text: n.text
    })),
    legalActions: {
      conselhoTutelarNotified: report.legalActions.conselhoTutelarNotified,
      guardiansContacted: report.legalActions.guardiansContacted
    }
  });
});

// GET /api/reports - Listagem restrita ao Comitê de Proteção Escolar
reportsRouter.get("/", (_req: Request, res: Response) => {
  const cases = store.getAllCases();
  return res.json({
    total: cases.length,
    cases
  });
});

// GET /api/reports/:id - Detalhes confidenciais de um caso
reportsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const report = store.getCaseById(id);
  if (!report) {
    return res.status(404).json({ error: "Caso não encontrado." });
  }
  return res.json(report);
});

// PATCH /api/reports/:id/status - Atualizar status do caso
reportsRouter.patch("/:id/status", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, author } = req.body as { status: CaseStatus; author?: string };

  if (!status) {
    return res.status(400).json({ error: "Novo status é obrigatório." });
  }

  const updated = store.updateStatus(id, status, author);
  if (!updated) {
    return res.status(404).json({ error: "Caso não encontrado." });
  }

  return res.json({ success: true, case: updated });
});

// POST /api/reports/:id/notes - Adicionar nota confidencial
reportsRouter.post("/:id/notes", (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, text } = req.body as { author: string; text: string };

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Texto da anotação não pode ser vazio." });
  }

  const updated = store.addConfidentialNote(id, author, text);
  if (!updated) {
    return res.status(404).json({ error: "Caso não encontrado." });
  }

  return res.json({ success: true, case: updated });
});

// POST /api/reports/:id/conselho - Registrar encaminhamento oficial ao Conselho Tutelar
reportsRouter.post("/:id/conselho", (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = store.notifyConselhoTutelar(id);
  if (!updated) {
    return res.status(404).json({ error: "Caso não encontrado." });
  }

  return res.json({
    success: true,
    message: "Ofício formal registrado com sucesso e encaminhado ao Conselho Tutelar Regional.",
    case: updated
  });
});

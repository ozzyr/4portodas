import { Router, Request, Response } from "express";
import { store } from "../data/store";

export const statsRouter = Router();

// GET /api/stats - Indicadores para o painel de gestão escolar
statsRouter.get("/", (_req: Request, res: Response) => {
  const cases = store.getAllCases();

  const total = cases.length;
  const inCare = cases.filter(c => c.status === "Em Acolhimento").length;
  const forwardedConselho = cases.filter(c => c.legalActions.conselhoTutelarNotified || c.status === "Encaminhado ao Conselho Tutelar").length;
  const resolved = cases.filter(c => c.status === "Encerrado").length;
  const anonymous = cases.filter(c => c.isAnonymous).length;

  // Tipos mais frequentes
  const typeCounts: Record<string, number> = {};
  cases.forEach(c => {
    typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
  });

  return res.json({
    total,
    inCare,
    forwardedConselho,
    resolved,
    anonymous,
    identified: total - anonymous,
    typeCounts
  });
});

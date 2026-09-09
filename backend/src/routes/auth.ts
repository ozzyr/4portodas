import { Router, Request, Response } from "express";

export const authRouter = Router();

// POST /api/auth/login - Acesso do Comitê de Proteção Escolar
authRouter.post("/login", (req: Request, res: Response) => {
  const { code, password } = req.body;

  // Credenciais de homologação escolar
  if ((code === "COMITE2026" || code === "comite2026" || code === "ADMIN") && password === "protecao4pt") {
    return res.json({
      success: true,
      token: "fake-jwt-token-4pt-committee",
      user: {
        id: "usr-01",
        name: "Dra. Helena Martins",
        role: "Psicóloga Escolar & Comitê de Proteção",
        email: "helena.psico@escola.edu.br"
      }
    });
  }

  // Fallback permissivo para desenvolvimento com qualquer senha segura
  if (code && password && password.length >= 4) {
    return res.json({
      success: true,
      token: "dev-session-token",
      user: {
        id: "usr-dev",
        name: "Membro da Gestão Pedagógica",
        role: "Comitê de Proteção",
        email: "gestao@escola.edu.br"
      }
    });
  }

  return res.status(401).json({
    error: "Código de acesso ou senha institucional incorretos."
  });
});

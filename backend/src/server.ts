import express from "express";
import cors from "cors";
import { reportsRouter } from "./routes/reports";
import { statsRouter } from "./routes/stats";
import { authRouter } from "./routes/auth";

const app = express();
const PORT = Number(process.env.PORT) || 3333;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "4 Por Todas API", timestamp: new Date().toISOString() });
});

// Rotas da API
app.use("/api/reports", reportsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌸 Servidor 4 Por Todas rodando em http://localhost:${PORT} e na rede local http://0.0.0.0:${PORT}`);
  console.log(`🛡️  Conformidade LGPD & Lei 14.811/2024 ativa.`);
});

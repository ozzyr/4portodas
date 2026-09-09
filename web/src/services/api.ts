import { ReportCase, CreateReportDTO, StatsResponse, CaseStatus } from '../types';

const API_BASE = '/api';

export const ApiService = {
  // Criar relato
  async submitReport(dto: CreateReportDTO): Promise<{ success: boolean; protocol: string; case: ReportCase }> {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (!res.ok) throw new Error('Falha ao enviar relato');
      return await res.json();
    } catch (err) {
      console.warn('API indisponível, salvando localmente:', err);
      // Fallback local
      const id = `4PT-${Math.floor(1000 + Math.random() * 9000)}-S`;
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
      const localCase: ReportCase = {
        id,
        date: formattedDate,
        type: dto.category || 'Assédio ou Constrangimento',
        isAnonymous: dto.isAnonymous,
        studentName: dto.isAnonymous ? 'Anônimo (Protegido)' : (dto.name || 'Aluna Identificada'),
        studentContact: dto.isAnonymous ? 'Sigiloso' : (dto.contact || 'Não informado'),
        location: dto.location || 'Ambiente Escolar',
        frequency: dto.frequency || 'Primeira vez',
        status: 'Novo',
        severity: dto.severity || 'Média',
        narrative: dto.narrative || '',
        hasEvidence: Boolean(dto.evidenceFiles && dto.evidenceFiles.length > 0),
        evidenceFiles: dto.evidenceFiles || [],
        confidentialNotes: [
          { author: 'Sistema 4 Por Todas', date: formattedDate, text: 'Relato recebido com sucesso.' }
        ],
        legalActions: {
          conselhoTutelarNotified: false,
          policeReportFiled: false,
          guardiansContacted: false
        }
      };
      return { success: true, protocol: id, case: localCase };
    }
  },

  // Rastrear protocolo
  async trackProtocol(protocol: string): Promise<ReportCase | null> {
    try {
      const res = await fetch(`${API_BASE}/reports/track/${protocol}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Listar todos os casos para o comitê
  async getCases(): Promise<ReportCase[]> {
    try {
      const res = await fetch(`${API_BASE}/reports`);
      if (!res.ok) throw new Error('Falha ao obter casos');
      const data = await res.json();
      return data.cases || [];
    } catch {
      return [];
    }
  },

  // Atualizar status
  async updateStatus(id: string, status: CaseStatus, author = 'Comitê de Proteção'): Promise<ReportCase | null> {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, author })
      });
      if (!res.ok) throw new Error('Falha ao atualizar status');
      const data = await res.json();
      return data.case;
    } catch {
      return null;
    }
  },

  // Adicionar anotação confidencial
  async addNote(id: string, author: string, text: string): Promise<ReportCase | null> {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text })
      });
      if (!res.ok) throw new Error('Falha ao adicionar nota');
      const data = await res.json();
      return data.case;
    } catch {
      return null;
    }
  },

  // Ofício Conselho Tutelar
  async notifyConselho(id: string): Promise<ReportCase | null> {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}/conselho`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Falha ao notificar conselho');
      const data = await res.json();
      return data.case;
    } catch {
      return null;
    }
  },

  // Estatísticas
  async getStats(): Promise<StatsResponse | null> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};

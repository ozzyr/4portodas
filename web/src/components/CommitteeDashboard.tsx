import React, { useState } from 'react';
import { Shield, FileText, Send, UserCheck, MessageSquarePlus, RefreshCw } from 'lucide-react';
import { ReportCase, CaseStatus } from '../types';
import { ApiService } from '../services/api';

interface CommitteeDashboardProps {
  cases: ReportCase[];
  onRefreshCases: () => void;
  currentUser: { name: string; role: string } | null;
}

export const CommitteeDashboard: React.FC<CommitteeDashboardProps> = ({ cases, onRefreshCases, currentUser }) => {
  const [selectedCase, setSelectedCase] = useState<ReportCase | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [actionLoading, setActionLoading] = useState(false);

  // Computed metrics
  const total = cases.length;
  const inCare = cases.filter(c => c.status === 'Em Acolhimento').length;
  const forwarded = cases.filter(c => c.status === 'Encaminhado ao Conselho Tutelar' || c.legalActions.conselhoTutelarNotified).length;
  const resolved = cases.filter(c => c.status === 'Encerrado').length;

  const filteredCases = cases.filter(c => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  const handleStatusChange = async (caseId: string, newStatus: CaseStatus) => {
    setActionLoading(true);
    await ApiService.updateStatus(caseId, newStatus, currentUser?.name || 'Comitê de Proteção');
    setActionLoading(false);
    onRefreshCases();
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleAddNote = async (caseId: string) => {
    if (!newNoteText.trim()) return;
    setActionLoading(true);
    const updated = await ApiService.addNote(caseId, currentUser?.name || 'Comitê de Proteção', newNoteText.trim());
    setActionLoading(false);
    setNewNoteText('');
    onRefreshCases();
    if (updated) {
      setSelectedCase(updated);
    }
  };

  const handleNotifyConselho = async (caseId: string) => {
    if (!confirm('Deseja emitir e registrar o ofício formal para o Conselho Tutelar Regional conforme o Artigo 13 do ECA e Lei 14.811/2024?')) {
      return;
    }
    setActionLoading(true);
    const updated = await ApiService.notifyConselho(caseId);
    setActionLoading(false);
    onRefreshCases();
    if (updated) {
      setSelectedCase(updated);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--violet-900), var(--violet-800))', color: '#fff', padding: '2rem', borderRadius: 'var(--radius-xl)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--violet-200)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
            <Shield size={18} />
            <span>PAINEL DE GOVERNANÇA & PROTEÇÃO ESCOLAR (LEI 14.811/2024)</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 'var(--font-size-2xl)', margin: '0 0 0.5rem 0' }}>
            Comitê de Acolhimento e Gestão de Casos
          </h1>
          <p style={{ color: 'var(--violet-100)', margin: 0, fontSize: '0.95rem' }}>
            Operador logado: <strong>{currentUser?.name || 'Equipe de Gestão'}</strong> ({currentUser?.role || 'Acolhimento'})
          </p>
        </div>

        <button type="button" className="btn btn-secondary btn-sm" onClick={onRefreshCases} style={{ background: '#fff', color: 'var(--violet-900)' }}>
          <RefreshCw size={16} />
          <span>Atualizar Casos</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--violet-500)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', fontWeight: 600 }}>Total de Relatos</div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--violet-900)', marginTop: '0.25rem' }}>{total}</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--pink-500)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', fontWeight: 600 }}>Em Acolhimento Ativo</div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--pink-600)', marginTop: '0.25rem' }}>{inCare}</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--violet-800)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', fontWeight: 600 }}>Encaminhados ao Conselho</div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--violet-800)', marginTop: '0.25rem' }}>{forwarded}</div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--success-500)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', fontWeight: 600 }}>Casos Concluídos</div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--success-600)', marginTop: '0.25rem' }}>{resolved}</div>
        </div>
      </div>

      {/* Main Grid: Cases List & Case Details Drawer */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedCase ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Cases List Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--neutral-900)' }}>
              Relatos Registrados ({filteredCases.length})
            </h2>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--neutral-600)' }}>Filtrar:</span>
              <select
                className="form-input"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}
              >
                <option value="all">Todos os Status</option>
                <option value="Novo">Novos</option>
                <option value="Em Acolhimento">Em Acolhimento</option>
                <option value="Encaminhado ao Conselho Tutelar">Encaminhado ao Conselho</option>
                <option value="Encerrado">Encerrados</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${selectedCase?.id === c.id ? 'var(--violet-500)' : 'var(--neutral-200)'}`,
                  background: selectedCase?.id === c.id ? 'var(--violet-50)' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: 'var(--violet-900)', fontSize: '0.95rem' }}>{c.id}</span>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--neutral-500)' }}>{c.date}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      background: c.status === 'Novo' ? 'var(--warning-50)' : c.status === 'Em Acolhimento' ? 'var(--pink-100)' : c.status === 'Encaminhado ao Conselho Tutelar' ? 'var(--violet-200)' : 'var(--neutral-200)',
                      color: c.status === 'Novo' ? 'var(--warning-700)' : c.status === 'Em Acolhimento' ? 'var(--pink-800)' : c.status === 'Encaminhado ao Conselho Tutelar' ? 'var(--violet-900)' : 'var(--neutral-700)'
                    }}
                  >
                    {c.status}
                  </span>
                </div>

                <div style={{ fontWeight: 600, color: 'var(--neutral-900)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {c.type}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', marginBottom: '0.5rem' }}>
                  <strong>Local:</strong> {c.location} • <strong>Frequência:</strong> {c.frequency}
                </div>
                <div style={{ fontSize: '0.8rem', color: c.isAnonymous ? 'var(--pink-700)' : 'var(--violet-700)', fontWeight: 600 }}>
                  {c.isAnonymous ? '🔒 Sigiloso (Relato Anônimo)' : `👤 Aluna Identificada: ${c.studentName}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Case Detail Drawer */}
        {selectedCase && (
          <div className="card" style={{ border: '2px solid var(--violet-300)', position: 'sticky', top: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--violet-700)', fontWeight: 700 }}>CASO EM ANÁLISE</span>
                <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--violet-950)', margin: 0 }}>{selectedCase.id}</h3>
              </div>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                onClick={() => setSelectedCase(null)}
              >
                Fechar
              </button>
            </div>

            {/* Narrative Box */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: '0.35rem' }}>
                Relato da Aluna:
              </div>
              <div style={{ background: 'var(--neutral-100)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: 'var(--neutral-900)', lineHeight: 1.5 }}>
                "{selectedCase.narrative}"
              </div>
            </div>

            {/* Legal Status & Conselho Action */}
            <div style={{ padding: '1rem', background: 'var(--violet-50)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--violet-200)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--violet-900)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={16} />
                <span>Protocolo de Encaminhamento Institucional (Art. 13 ECA)</span>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--neutral-700)', marginBottom: '0.75rem' }}>
                Status Atual: <strong>{selectedCase.status}</strong>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={actionLoading || selectedCase.status === 'Em Acolhimento'}
                  onClick={() => handleStatusChange(selectedCase.id, 'Em Acolhimento')}
                >
                  <UserCheck size={15} />
                  <span>Iniciar Acolhimento</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  disabled={actionLoading || selectedCase.legalActions.conselhoTutelarNotified}
                  onClick={() => handleNotifyConselho(selectedCase.id)}
                >
                  <Send size={15} />
                  <span>{selectedCase.legalActions.conselhoTutelarNotified ? 'Conselho Notificado ✓' : 'Oficiar Conselho Tutelar'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-subtle btn-sm"
                  disabled={actionLoading || selectedCase.status === 'Encerrado'}
                  onClick={() => handleStatusChange(selectedCase.id, 'Encerrado')}
                  style={{ color: 'var(--success-600)' }}
                >
                  Concluir / Encerrar
                </button>
              </div>
            </div>

            {/* Confidential Notes Feed */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MessageSquarePlus size={16} />
                <span>Notas Confidenciais da Equipe:</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '0.75rem' }}>
                {selectedCase.confidentialNotes && selectedCase.confidentialNotes.map((n, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid var(--neutral-200)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--violet-700)', fontWeight: 600 }}>{n.author} — {n.date}</div>
                    <div style={{ color: 'var(--neutral-800)', marginTop: '0.15rem' }}>{n.text}</div>
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Escreva uma observação confidencial..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleAddNote(selectedCase.id)}
                  disabled={actionLoading || !newNoteText.trim()}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

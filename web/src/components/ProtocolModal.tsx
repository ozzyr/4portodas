import React, { useState } from 'react';
import { Search, X, Clock, AlertCircle } from 'lucide-react';
import { ReportCase } from '../types';
import { ApiService } from '../services/api';

interface ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProtocolModal: React.FC<ProtocolModalProps> = ({ isOpen, onClose }) => {
  const [protocolCode, setProtocolCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundCase, setFoundCase] = useState<ReportCase | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolCode.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setFoundCase(null);

    const result = await ApiService.trackProtocol(protocolCode.trim());
    setLoading(false);

    if (result) {
      setFoundCase(result);
    } else {
      setErrorMsg('Protocolo não localizado. Verifique se digitou o código completo (ex: 4PT-7821-S).');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(23, 18, 22, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '100%', background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', position: 'relative' }}>
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-500)' }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--violet-100)', color: 'var(--violet-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)' }}>Acompanhar Protocolo</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>Consulte o andamento da sua solicitação sem expor sua identidade.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Digite o código (ex: 4PT-7821-S)"
            value={protocolCode}
            onChange={(e) => setProtocolCode(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)' }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Search size={18} />
            <span>{loading ? 'Buscando...' : 'Consultar'}</span>
          </button>
        </form>

        {errorMsg && (
          <div style={{ padding: '1rem', background: 'var(--danger-50)', border: '1px solid var(--danger-500)', borderRadius: 'var(--radius-md)', color: 'var(--danger-700)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        {foundCase && (
          <div style={{ background: 'var(--violet-50)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--violet-200)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--violet-700)', fontWeight: 700 }}>CÓDIGO:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--violet-950)' }}>{foundCase.id}</div>
              </div>
              <span
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: foundCase.status === 'Encaminhado ao Conselho Tutelar' ? 'var(--violet-200)' : foundCase.status === 'Em Acolhimento' ? 'var(--pink-100)' : 'var(--neutral-200)',
                  color: foundCase.status === 'Encaminhado ao Conselho Tutelar' ? 'var(--violet-900)' : foundCase.status === 'Em Acolhimento' ? 'var(--pink-800)' : 'var(--neutral-800)'
                }}
              >
                {foundCase.status}
              </span>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', marginBottom: '1rem' }}>
              <strong>Tipo:</strong> {foundCase.type}<br />
              <strong>Data de Envio:</strong> {foundCase.date}
            </div>

            <div style={{ borderTop: '1px solid var(--violet-200)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--violet-900)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={16} />
                <span>Histórico de Atualizações do Comitê de Proteção:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {foundCase.confidentialNotes && foundCase.confidentialNotes.length > 0 ? (
                  foundCase.confidentialNotes.map((note, idx) => (
                    <div key={idx} style={{ background: '#fff', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--violet-700)', fontWeight: 600 }}>{note.author} — {note.date}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--neutral-800)', marginTop: '0.2rem' }}>{note.text}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
                    Relato recebido e aguardando triagem pela equipe pedagógica.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

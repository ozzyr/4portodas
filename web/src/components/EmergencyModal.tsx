import React from 'react';
import { Phone, X, ShieldAlert } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(23, 18, 22, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', width: '100%', background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', position: 'relative' }}>
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-500)' }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--pink-100)', color: 'var(--pink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)' }}>Canais de Ajuda Imediata</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>Linhas gratuitas, 24 horas por dia, com sigilo garantido.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {/* Disque 180 */}
          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--pink-50)', border: '1px solid var(--pink-200)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--pink-800)', fontSize: '1.25rem' }}>Disque 180</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--neutral-700)' }}>Central de Atendimento à Mulher</div>
              </div>
              <a href="tel:180" className="btn btn-primary btn-sm">
                <Phone size={16} />
                <span>Ligar 180</span>
              </a>
            </div>
          </div>

          {/* Disque 100 */}
          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--violet-50)', border: '1px solid var(--violet-200)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--violet-900)', fontSize: '1.25rem' }}>Disque 100</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--neutral-700)' }}>Direitos Humanos & Proteção Infantojuvenil (ECA)</div>
              </div>
              <a href="tel:100" className="btn btn-secondary btn-sm">
                <Phone size={16} />
                <span>Ligar 100</span>
              </a>
            </div>
          </div>

          {/* Polícia Militar 190 */}
          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--neutral-100)', border: '1px solid var(--neutral-300)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--neutral-900)', fontSize: '1.25rem' }}>Ligue 190</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--neutral-700)' }}>Polícia Militar (Em caso de perigo imediato)</div>
              </div>
              <a href="tel:190" className="btn btn-subtle btn-sm" style={{ border: '1px solid var(--neutral-400)' }}>
                <Phone size={16} />
                <span>Ligar 190</span>
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} style={{ width: '100%' }}>
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

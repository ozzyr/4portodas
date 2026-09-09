import React from 'react';
import { PhoneCall, Search, Lock, UserCheck } from 'lucide-react';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenProtocol: () => void;
  onOpenCommitteeLogin: () => void;
  isCommitteeLoggedIn: boolean;
  activeView: 'student' | 'committee';
  setActiveView: (view: 'student' | 'committee') => void;
  onLogoutCommittee: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEmergency,
  onOpenProtocol,
  onOpenCommitteeLogin,
  isCommitteeLoggedIn,
  activeView,
  setActiveView,
  onLogoutCommittee
}) => {
  return (
    <header className="app-header">
      <nav className="navbar container" aria-label="Navegação Principal">
        <a
          href="#"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('student');
          }}
        >
          <img src="/assets/mascote.png" alt="Mascote 4 Por Todas" className="brand-logo-img" />
          <div>
            <div className="brand-name">4 Por Todas</div>
            <div className="brand-sub">Acolhimento & Proteção Escolar</div>
          </div>
        </a>

        <div className="nav-links">
          {activeView === 'student' ? (
            <>
              <button
                type="button"
                className="btn btn-subtle"
                style={{ fontSize: 'var(--font-size-sm)', color: 'var(--violet-800)' }}
                onClick={onOpenEmergency}
              >
                <PhoneCall size={18} />
                <span>Ajuda Imediata</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenProtocol}
              >
                <Search size={16} />
                <span>Acompanhar Protocolo</span>
              </button>

              <button
                type="button"
                className="btn btn-subtle btn-sm"
                style={{ color: 'var(--neutral-600)' }}
                onClick={() => {
                  if (isCommitteeLoggedIn) {
                    setActiveView('committee');
                  } else {
                    onOpenCommitteeLogin();
                  }
                }}
              >
                <Lock size={15} />
                <span>Acesso Gestão</span>
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--violet-700)', fontWeight: 600, fontSize: '0.9rem' }}>
                <UserCheck size={18} />
                <span>Comitê de Proteção Ativo</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setActiveView('student')}
              >
                Voltar à Visão Aluna
              </button>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                style={{ color: 'var(--danger-500)' }}
                onClick={onLogoutCommittee}
              >
                Encerrar Sessão
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

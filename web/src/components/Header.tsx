import React, { useState, useEffect } from 'react';
import { PhoneCall, Search, Lock, UserCheck, Menu, X, Shield, ArrowRight, LogOut, BookOpen } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fecha o menu ao redimensionar para telas grandes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Previne scroll de fundo quando o drawer mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavAction = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="app-header">
      <nav className="navbar container" aria-label="Navegação Principal">
        {/* Brand / Logo */}
        <a
          href="#"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('student');
            setMobileMenuOpen(false);
          }}
        >
          <img src="./assets/mascote.png" alt="Mascote 4 Por Todas" className="brand-logo-img" />
          <div>
            <div className="brand-name">4 Por Todas</div>
            <div className="brand-sub">Acolhimento & Proteção Escolar</div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links desktop-only">
          {activeView === 'student' ? (
            <>
              <button
                type="button"
                className="btn btn-subtle"
                style={{ fontSize: 'var(--font-size-sm)', color: 'var(--violet-800)', minHeight: '44px' }}
                onClick={onOpenEmergency}
              >
                <PhoneCall size={18} />
                <span>Ajuda Imediata</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenProtocol}
                style={{ minHeight: '44px' }}
              >
                <Search size={16} />
                <span>Acompanhar Protocolo</span>
              </button>

              <button
                type="button"
                className="btn btn-subtle btn-sm"
                style={{ color: 'var(--neutral-600)', minHeight: '44px' }}
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
                style={{ minHeight: '44px' }}
              >
                Voltar à Visão Aluna
              </button>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                style={{ color: 'var(--danger-500)', minHeight: '44px' }}
                onClick={onLogoutCommittee}
              >
                Encerrar Sessão
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-toggle mobile-only"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.5rem',
            color: 'var(--violet-900)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-md)',
            minWidth: '44px',
            minHeight: '44px'
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop mobile-only"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            backgroundColor: 'rgba(23, 18, 22, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius: 'var(--radius-xl)',
              borderBottomRightRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xl)',
              borderTop: '1px solid var(--pink-100)',
              animation: 'drawerSlideDown 0.25s ease-out',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto'
            }}
          >
            {/* Quick Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--pink-50)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--pink-200)' }}>
              <Shield size={16} color="var(--pink-600)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--pink-900)', fontWeight: 600 }}>
                Canal Seguro, Anônimo e em Conformidade com o ECA
              </span>
            </div>

            {/* Links based on Active View */}
            {activeView === 'student' ? (
              <>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => handleNavAction(onOpenEmergency)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--pink-50)',
                    border: '1.5px solid var(--pink-300)',
                    color: 'var(--pink-700)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    minHeight: '52px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--pink-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PhoneCall size={18} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div>Ajuda Imediata 24h</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--pink-600)', fontWeight: 500 }}>Ligue 180, 190 ou CVV 188</div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--pink-600)" />
                </button>

                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => handleNavAction(onOpenProtocol)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--neutral-50)',
                    border: '1px solid var(--neutral-300)',
                    color: 'var(--violet-900)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    minHeight: '52px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--violet-100)', color: 'var(--violet-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Search size={18} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div>Acompanhar Protocolo</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)', fontWeight: 500 }}>Consulte o status do seu relato</div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--neutral-500)" />
                </button>

                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    handleNavAction(() => {
                      if (isCommitteeLoggedIn) {
                        setActiveView('committee');
                      } else {
                        onOpenCommitteeLogin();
                      }
                    });
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    background: '#FFFFFF',
                    border: '1px solid var(--neutral-300)',
                    color: 'var(--neutral-700)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    minHeight: '52px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--neutral-100)', color: 'var(--neutral-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={18} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div>Acesso da Gestão Escolar</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 400 }}>Painel do Comitê de Proteção</div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--neutral-400)" />
                </button>
              </>
            ) : (
              <>
                <div style={{ background: 'var(--violet-50)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--violet-200)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--violet-900)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    <UserCheck size={18} color="var(--violet-700)" />
                    <span>Sessão da Gestão Ativa</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--violet-700)' }}>
                    Você está operando o Painel de Acolhimento e Ofícios.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleNavAction(() => setActiveView('student'))}
                  style={{ width: '100%', minHeight: '48px', justifyContent: 'center', fontSize: '0.95rem' }}
                >
                  <BookOpen size={18} />
                  <span>Voltar à Visão da Aluna</span>
                </button>

                <button
                  type="button"
                  className="btn btn-subtle"
                  onClick={() => handleNavAction(onLogoutCommittee)}
                  style={{ width: '100%', minHeight: '48px', justifyContent: 'center', color: 'var(--danger-500)', fontSize: '0.95rem' }}
                >
                  <LogOut size={18} />
                  <span>Encerrar Sessão da Gestão</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

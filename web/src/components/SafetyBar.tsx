import React, { useEffect } from 'react';
import { Shield, LogOut } from 'lucide-react';

export const SafetyBar: React.FC = () => {
  const handleQuickExit = () => {
    // Redireciona imediatamente para um site neutro e limpa histórico da aba
    window.location.replace('https://www.google.com.br');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Pressionar ESC três vezes rapidamente ou Alt+Q aciona a saída rápida
      if (e.key === 'Escape') {
        handleQuickExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="safety-bar">
      <div className="safety-bar-left">
        <div className="safety-pulse" aria-hidden="true"></div>
        <Shield size={16} color="var(--violet-300)" />
        <span>Ambiente Protegido & Criptografado • Lei 14.811/2024 & ECA</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn btn-quick-exit"
          onClick={handleQuickExit}
          title="Fecha a página imediatamente se alguém se aproximar (Tecla ESC)"
        >
          <LogOut size={16} />
          <span>Saída Rápida (ESC)</span>
        </button>
      </div>
    </div>
  );
};

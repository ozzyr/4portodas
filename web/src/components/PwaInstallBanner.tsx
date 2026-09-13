import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, CheckCircle2, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (installed PWA)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      // @ts-ignore
      const isNavigatorStandalone = window.navigator.standalone === true;
      return isStandaloneMedia || isNavigatorStandalone;
    };

    setIsStandalone(checkStandalone());

    // Check device type
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent) || window.innerWidth < 768;
    
    setIsIos(isIosDevice);
    setIsMobile(isMobileDevice);

    // Listen for beforeinstallprompt event (Android / Chromium)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for custom trigger from anywhere in the app (e.g. Header button)
    const handleCustomTrigger = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        setShowIosGuide(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('open-pwa-install', handleCustomTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('open-pwa-install', handleCustomTrigger);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] Usuário aceitou a instalação do atalho do app');
      }
      setDeferredPrompt(null);
    } else {
      setShowIosGuide(true);
    }
  };

  // Do not show if already running as installed app or dismissed
  if (isStandalone || dismissed) {
    return null;
  }

  // Show banner on mobile or when beforeinstallprompt is ready
  if (!isMobile && !deferredPrompt) {
    return null;
  }

  return (
    <>
      <aside
        aria-label="Instalar atalho do aplicativo"
        className="pwa-install-banner"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '540px',
          width: 'calc(100% - 2rem)',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '0.85rem 1.25rem',
          boxShadow: '0 10px 30px rgba(101, 8, 174, 0.22), 0 0 0 1px var(--pink-200)',
          zIndex: 9990,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          animation: 'modalSlideUp 0.3s ease-out'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--pink-50)',
              border: '2px solid var(--pink-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Smartphone size={24} color="var(--pink-600)" />
          </div>

          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--violet-950)' }}>
              Adicionar Atalho na Tela Inicial
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-600)' }}>
              Acesso rápido com 1 toque como aplicativo móvel
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleInstallClick}
            style={{ minHeight: '38px', padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <Download size={15} />
            <span>Adicionar</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dispensar aviso de instalação"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--neutral-400)',
              padding: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </aside>

      {/* Guide Modal (iOS Safari or Android without prompt) */}
      {showIosGuide && (
        <div
          className="modal-backdrop"
          onClick={() => setShowIosGuide(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 18, 22, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10010,
            padding: '1rem'
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '440px',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              aria-label="Fechar guia"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--neutral-500)',
                padding: '0.25rem'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--pink-50)',
                  border: '2px solid var(--pink-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <PlusSquare size={24} color="var(--pink-600)" />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--violet-950)', margin: 0, fontWeight: 800 }}>
                  Criar Atalho na Tela Inicial
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                  {isIos ? 'Instruções para iPhone e iPad (Safari)' : 'Instruções para Navegador Mobile'}
                </span>
              </div>
            </div>

            {isIos ? (
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                <li style={{ marginBottom: '0.6rem' }}>
                  Toque no botão de <strong>Compartilhar</strong> (<Share size={15} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--violet-700)' }} />) na barra inferior do Safari.
                </li>
                <li style={{ marginBottom: '0.6rem' }}>
                  Role a lista e toque em <strong>"Adicionar à Tela de Início"</strong>.
                </li>
                <li>
                  Toque em <strong>"Adicionar"</strong> no canto superior direito para finalizar.
                </li>
              </ol>
            ) : (
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                <li style={{ marginBottom: '0.6rem' }}>
                  Toque no menu de <strong>três pontos (⋮)</strong> no canto superior do navegador Chrome/Edge.
                </li>
                <li style={{ marginBottom: '0.6rem' }}>
                  Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                </li>
                <li>
                  Confirme tocando em <strong>"Instalar"</strong>.
                </li>
              </ol>
            )}

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowIosGuide(false)}
              style={{ width: '100%', minHeight: '44px', justifyContent: 'center' }}
            >
              <CheckCircle2 size={16} />
              <span>Entendido, vou adicionar</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

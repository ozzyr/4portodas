import React, { useState, useEffect } from 'react';
import { SafetyBar } from './components/SafetyBar';
import { Header } from './components/Header';
import { StudentHero } from './components/StudentHero';
import { StudentForm } from './components/StudentForm';
import { EmergencyModal } from './components/EmergencyModal';
import { ProtocolModal } from './components/ProtocolModal';
import { CommitteeLoginModal } from './components/CommitteeLoginModal';
import { CommitteeDashboard } from './components/CommitteeDashboard';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { ReportCase } from './types';
import { ApiService } from './services/api';

import './styles/tokens.css';
import './styles/design-system.css';
import './styles/app.css';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'student' | 'committee'>('student');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const [isCommitteeLoginOpen, setIsCommitteeLoginOpen] = useState(false);
  const [committeeUser, setCommitteeUser] = useState<{ name: string; role: string } | null>(null);
  const [cases, setCases] = useState<ReportCase[]>([]);

  // Load cases from backend on mount
  const loadCases = async () => {
    const data = await ApiService.getCases();
    if (data && data.length > 0) {
      setCases(data);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleStartReport = () => {
    const el = document.getElementById('relatoFormSection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaseCreated = (newCase: ReportCase) => {
    setCases(prev => [newCase, ...prev]);
  };

  const handleLoginSuccess = (user: { name: string; role: string }) => {
    setCommitteeUser(user);
    setActiveView('committee');
  };

  const handleLogoutCommittee = () => {
    setCommitteeUser(null);
    setActiveView('student');
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Safety Header Bar */}
      <SafetyBar />

      {/* Main App Navigation */}
      <Header
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenProtocol={() => setIsProtocolOpen(true)}
        onOpenCommitteeLogin={() => setIsCommitteeLoginOpen(true)}
        isCommitteeLoggedIn={Boolean(committeeUser)}
        activeView={activeView}
        setActiveView={setActiveView}
        onLogoutCommittee={handleLogoutCommittee}
      />

      {/* Main Views */}
      <main style={{ flex: 1 }}>
        {activeView === 'student' ? (
          <div>
            <StudentHero
              onStartReport={handleStartReport}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
            <StudentForm onCaseCreated={handleCaseCreated} />
          </div>
        ) : (
          <CommitteeDashboard
            cases={cases}
            onRefreshCases={loadCases}
            currentUser={committeeUser}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--violet-950)', color: 'var(--violet-200)', padding: '2rem 1rem', marginTop: '3rem', fontSize: '0.9rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>4 Por Todas</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--violet-300)' }}>Intranet Escolar de Acolhimento e Proteção • Lei 14.811/2024 & ECA</div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <span>🔒 Criptografia de Ponta a Ponta</span>
            <span>🛡️ Respaldo Art. 13 do ECA</span>
            <span>🌸 Espaço Seguro</span>
          </div>
        </div>
      </footer>

      {/* PWA Install Prompt Banner */}
      <PwaInstallBanner />

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <ProtocolModal
        isOpen={isProtocolOpen}
        onClose={() => setIsProtocolOpen(false)}
      />

      <CommitteeLoginModal
        isOpen={isCommitteeLoginOpen}
        onClose={() => setIsCommitteeLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

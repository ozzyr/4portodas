import React from 'react';
import { Sparkles, HeartHandshake, PhoneCall, Check } from 'lucide-react';

interface StudentHeroProps {
  onStartReport: () => void;
  onOpenEmergency: () => void;
}

export const StudentHero: React.FC<StudentHeroProps> = ({ onStartReport, onOpenEmergency }) => {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div>
          <div className="hero-tag">
            <Sparkles size={16} color="var(--pink-500)" />
            <span>Você está em um espaço de escuta e segurança</span>
          </div>
          <h1 className="hero-title">
            A culpa <span>nunca</span> é sua.<br />
            Você tem voz, apoio e proteção.
          </h1>
          <p className="hero-subtitle">
            Este é o canal oficial e protegido da escola para meninas e alunas que vivenciaram ou presenciaram qualquer situação de assédio, importunação ou intimidação. Escolha como prefere falar conosco.
          </p>

          <div className="hero-actions">
            <button type="button" className="btn btn-primary btn-lg" onClick={onStartReport}>
              <HeartHandshake size={20} />
              <span>Fazer um Relato Seguro</span>
            </button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={onOpenEmergency}>
              <PhoneCall size={20} />
              <span>Canais de Ajuda Imediata</span>
            </button>
          </div>

          <div className="hero-guarantees">
            <div className="guarantee-item">
              <span style={{ color: 'var(--pink-600)', fontWeight: 'bold' }}><Check size={16} /></span>
              <span>Opção 100% Anônima</span>
            </div>
            <div className="guarantee-item">
              <span style={{ color: 'var(--pink-600)', fontWeight: 'bold' }}><Check size={16} /></span>
              <span>Sigilo Absoluto</span>
            </div>
            <div className="guarantee-item">
              <span style={{ color: 'var(--pink-600)', fontWeight: 'bold' }}><Check size={16} /></span>
              <span>Sem Julgamentos ou Retaliação</span>
            </div>
          </div>
        </div>

        {/* Hero Visual with Mascot */}
        <div className="hero-visual">
          <div className="hero-visual-card">
            <img src="/assets/mascote.png" alt="Mascote da Escola — Guia Acolhedora" className="mascot-hero-img" />
            <div className="mascot-hero-bubble">
              "Olá! Eu sou a mascote da nossa escola. Estou aqui para te garantir que cada palavra sua será acolhida com todo respeito, carinho e cuidado que você merece."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

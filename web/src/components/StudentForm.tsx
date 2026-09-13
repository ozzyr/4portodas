import React, { useState } from 'react';
import { Shield, EyeOff, User, Upload, ArrowRight, ArrowLeft, CheckCircle2, Copy, Check, MapPin, Clock, Lock, Sparkles } from 'lucide-react';
import { CreateReportDTO, ReportCase } from '../types';
import { ApiService } from '../services/api';
import { AppDialogModal, DialogOptions } from './AppDialogModal';

const STEPS = [
  { number: 1, title: 'Ocorrência', subtitle: 'Tipo de situação' },
  { number: 2, title: 'Contexto', subtitle: 'Local e frequência' },
  { number: 3, title: 'Seu Relato', subtitle: 'Narrativa e anexos' },
  { number: 4, title: 'Sigilo', subtitle: 'Anônimo ou identificado' },
  { number: 5, title: 'Revisão', subtitle: 'Confirmação e envio' }
];

const CATEGORIES = [
  { id: 'verbal', title: 'Comentários Invasivos e Constrangimento', desc: 'Piadas sobre seu corpo, insinuações, cantadas desrespeitosas ou intimidação verbal nos corredores.' },
  { id: 'touch', title: 'Toque Físico Sem Consentimento', desc: 'Passadas de mão, toques forçados, abraços invasivos ou qualquer contato físico não autorizado.' },
  { id: 'digital', title: 'Exposição ou Assédio Digital', desc: 'Vazamento ou compartilhamento de fotos, vídeos, prints, mensagens abusivas em grupos de WhatsApp ou redes.' },
  { id: 'stalking', title: 'Perseguição e Intimidação Sistemática', desc: 'Ser seguida na saída da escola, bloqueios de passagem, chantagens ou ameaças de retaliação.' },
  { id: 'other', title: 'Outra Situação Desconfortável', desc: 'Qualquer outro comportamento que fez você ou uma colega se sentir insegura, humilhada ou ameaçada.' }
];

const LOCATIONS = [
  'Corredores ou Escadarias',
  'Salas de Aula / Laboratórios',
  'Banheiros ou Vestiários',
  'Pátio / Cantina / Quadra de Esportes',
  'Entrada ou Saída da Escola / Ponto de Ônibus',
  'Ambiente Digital (WhatsApp, Instagram, Grupos)',
  'Outro Local da Escola'
];

const FREQUENCIES = [
  'Ocorrência Única Recente',
  'Aconteceu poucas vezes (2 a 3 vezes)',
  'Recorrente / Sistemático (Acontece com frequência)',
  'Está acontecendo hoje / Agora'
];

const STEP_MASCOT_GUIDANCE = [
  {
    image: './assets/step1-ocorrencia.jpg',
    speech: '"Olá! Me conte com calma o que aconteceu. Respire fundo, você está em um espaço acolhedor, seguro e protegido."'
  },
  {
    image: './assets/step2-contexto.jpg',
    speech: '"Saber onde e com que frequência isso costuma ocorrer nos ajuda a manter os espaços da escola mais protegidos e monitorados."'
  },
  {
    image: './assets/step3-relato.jpg',
    speech: '"Escreva do seu jeito, com suas próprias palavras e sem pressa. Tudo o que você disser será acolhido com respeito e sigilo."'
  },
  {
    image: './assets/step4-sigilo.jpg',
    speech: '"Você tem total autonomia: escolha se prefere sigilo 100% anônimo ou apoio individual e discreto da psicóloga escolar."'
  },
  {
    image: './assets/step5-envio.jpg',
    speech: '"Quase pronto! Confira suas informações. Ao confirmar o envio, você receberá seu código exclusivo de protocolo confidencial."'
  }
];

export const StudentForm: React.FC<{ onCaseCreated?: (newCase: ReportCase) => void }> = ({ onCaseCreated }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [submittedCase, setSubmittedCase] = useState<ReportCase | null>(null);
  const [copied, setCopied] = useState(false);

  // Modal Dialog State (substituindo alerts nativos)
  const [dialogState, setDialogState] = useState<DialogOptions>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'Entendido',
    onConfirm: () => setDialogState(prev => ({ ...prev, isOpen: false }))
  });

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].title);
  const [location, setLocation] = useState<string>(LOCATIONS[0]);
  const [frequency, setFrequency] = useState<string>(FREQUENCIES[0]);
  const [narrative, setNarrative] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [evidenceFileName, setEvidenceFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFileName(e.target.files[0].name);
    }
  };

  const handleNext = () => {
    if (currentStep === 3 && !narrative.trim()) {
      setDialogState({
        isOpen: true,
        type: 'warning',
        title: 'Descreva o que aconteceu',
        message: 'Por favor, descreva com suas próprias palavras o que ocorreu para que a equipe de acolhimento possa te ajudar da melhor maneira.',
        confirmText: 'Vou descrever agora',
        onConfirm: () => setDialogState(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }
    if (currentStep === 4 && !isAnonymous && (!name.trim() || !contact.trim())) {
      setDialogState({
        isOpen: true,
        type: 'info',
        title: 'Dados para Apoio Individual',
        message: 'Como você optou pelo relato identificado, informe seu nome/turma e uma forma de contato segura para que a psicóloga escolar possa te convidar com discrição.',
        confirmText: 'Preencher dados',
        onConfirm: () => setDialogState(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const dto: CreateReportDTO = {
      category: selectedCategory,
      location,
      frequency,
      narrative: narrative.trim(),
      isAnonymous,
      name: isAnonymous ? undefined : name.trim(),
      contact: isAnonymous ? undefined : contact.trim(),
      evidenceFiles: evidenceFileName ? [evidenceFileName] : []
    };

    const res = await ApiService.submitReport(dto);
    setLoading(false);

    if (res && res.case) {
      setSubmittedCase(res.case);
      if (onCaseCreated) onCaseCreated(res.case);
    }
  };

  const copyProtocol = () => {
    if (submittedCase) {
      navigator.clipboard.writeText(submittedCase.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (submittedCase) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="card" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', borderColor: 'var(--success-500)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--success-50)', color: 'var(--success-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={40} />
          </div>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--success-700)', marginBottom: '0.75rem' }}>
            Relato Registrado com Sucesso e Proteção
          </h2>

          <p style={{ color: 'var(--neutral-700)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Seu relato foi criptografado e transmitido ao Comitê de Proteção Escolar da instituição. Todo o acolhimento será conduzido com estrito sigilo conforme a <strong>Lei 14.811/2024</strong> e o <strong>Estatuto da Criança e do Adolescente</strong>.
          </p>

          <div style={{ background: 'var(--violet-50)', border: '2px dashed var(--violet-300)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--violet-800)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Seu Código de Protocolo Confidencial
            </div>
            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 900, color: 'var(--violet-950)', margin: '0.5rem 0', letterSpacing: '0.1em' }}>
              {submittedCase.id}
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--violet-700)', margin: '0 0 1rem 0' }}>
              Guarde este código. Você pode consultá-lo no botão <strong>"Acompanhar Protocolo"</strong> para saber o status do acolhimento sem se identificar.
            </p>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={copyProtocol}
              style={{ minHeight: '44px' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Código Copiado com Sucesso!' : 'Copiar Código de Protocolo'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSubmittedCase(null);
                setCurrentStep(1);
                setNarrative('');
                setEvidenceFileName('');
                setName('');
                setContact('');
              }}
              style={{ minHeight: '48px' }}
            >
              Fazer Novo Relato
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '1.5rem 1rem' }} id="relatoFormSection">
      {/* Reusable Dialog Modal replacing JS alerts */}
      <AppDialogModal {...dialogState} />

      <div className="card form-wizard-card" style={{ maxWidth: '880px', margin: '0 auto', boxShadow: 'var(--shadow-xl)', borderRadius: 'var(--radius-xl)' }}>
        
        {/* =========================================================================
            STEPPER HEADER VISUAL (RESPONSIVE)
            ========================================================================= */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="stepper-track-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginBottom: '1.25rem' }}>
            
            {/* Progress Connecting Line */}
            <div
              className="stepper-line"
              style={{
                position: 'absolute',
                top: 20,
                left: '5%',
                right: '5%',
                height: 4,
                backgroundColor: 'var(--neutral-200)',
                zIndex: 1
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--pink-500)',
                  width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  transition: 'width 0.35s ease-in-out'
                }}
              />
            </div>

            {/* Stepper Dots */}
            {STEPS.map((s) => {
              const isDone = s.number < currentStep;
              const isCurrent = s.number === currentStep;

              return (
                <div
                  key={s.number}
                  onClick={() => {
                    if (s.number < currentStep) setCurrentStep(s.number);
                  }}
                  className="stepper-node"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 2,
                    cursor: isDone ? 'pointer' : 'default',
                    flex: 1
                  }}
                >
                  <div
                    className="stepper-circle"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      backgroundColor: isDone ? 'var(--pink-500)' : isCurrent ? 'var(--violet-700)' : 'var(--neutral-100)',
                      color: isDone || isCurrent ? '#ffffff' : 'var(--neutral-600)',
                      border: isCurrent ? '4px solid var(--violet-200)' : isDone ? '2px solid var(--pink-600)' : '2px solid var(--neutral-300)',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(101, 8, 174, 0.15)' : 'none'
                    }}
                  >
                    {isDone ? <Check size={20} /> : s.number}
                  </div>

                  <div className="stepper-title-box" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: isCurrent ? 800 : isDone ? 700 : 500,
                        color: isCurrent ? 'var(--violet-900)' : isDone ? 'var(--pink-700)' : 'var(--neutral-500)'
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--pink-50)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--pink-500)', marginBottom: '1.25rem' }}>
            <Sparkles size={18} color="var(--pink-600)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--pink-900)', fontWeight: 600 }}>
              Etapa {currentStep} de 5: {STEPS[currentStep - 1].title} — {STEPS[currentStep - 1].subtitle}
            </span>
          </div>

          {/* Mascot Guidance Banner for Current Step */}
          <div className="mascot-guidance-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'linear-gradient(135deg, var(--pink-50), var(--violet-50))', border: '1.5px solid var(--pink-200)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem' }}>
            <img
              src={STEP_MASCOT_GUIDANCE[currentStep - 1].image}
              alt="Mascote da Escola"
              className="mascot-guidance-img"
              style={{ width: 76, height: 76, borderRadius: '50%', border: '2.5px solid var(--pink-500)', objectFit: 'cover', flexShrink: 0, boxShadow: '0 3px 10px rgba(204, 59, 136, 0.2)' }}
            />
            <div style={{ fontSize: '0.95rem', color: 'var(--neutral-900)', fontStyle: 'italic', lineHeight: 1.5, fontWeight: 500 }}>
              {STEP_MASCOT_GUIDANCE[currentStep - 1].speech}
            </div>
          </div>
        </div>

        {/* =========================================================================
            STEP 1: OCORRÊNCIA (CATEGORIA)
            ========================================================================= */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              Qual situação você vivenciou ou testemunhou?
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Escolha a opção que melhor se aproxima do ocorrido. Você poderá detalhar mais adiante:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.title)}
                  className="interactive-card-option"
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${selectedCategory === cat.title ? 'var(--pink-500)' : 'var(--neutral-300)'}`,
                    background: selectedCategory === cat.title ? 'var(--pink-50)' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedCategory === cat.title ? '0 4px 12px rgba(204, 59, 136, 0.1)' : 'none',
                    minHeight: '48px'
                  }}
                >
                  <div style={{ fontWeight: 800, color: selectedCategory === cat.title ? 'var(--pink-900)' : 'var(--neutral-900)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    {cat.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: 1.4 }}>
                    {cat.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="form-action-buttons" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleNext}
                style={{ minHeight: '48px' }}
              >
                <span>Avançar para Contexto</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: CONTEXTO (LOCAL E FREQUÊNCIA)
            ========================================================================= */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              Onde e quando isso aconteceu?
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Essas informações ajudam a equipe escolar a reforçar a segurança e a mediação preventiva nos pontos críticos:
            </p>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>
                <MapPin size={18} color="var(--violet-700)" />
                <span>Local da Ocorrência:</span>
              </label>
              <select
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', minHeight: '48px', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', fontSize: '1rem' }}
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>
                <Clock size={18} color="var(--violet-700)" />
                <span>Com que frequência tem ocorrido?</span>
              </label>
              <select
                className="form-input"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{ width: '100%', minHeight: '48px', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', fontSize: '1rem' }}
              >
                {FREQUENCIES.map((freq) => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>

            <div className="form-action-buttons" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrev}
                style={{ minHeight: '48px' }}
              >
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleNext}
                style={{ minHeight: '48px' }}
              >
                <span>Avançar para o Relato</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: SEU RELATO & EVIDÊNCIAS
            ========================================================================= */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              Descreva o que aconteceu
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Escreva com calma, do seu jeito. Ninguém vai te julgar ou questionar sua experiência:
            </p>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <textarea
                className="form-textarea"
                rows={6}
                placeholder="Exemplo: No intervalo do 2º andar perto dos armários, um grupo começou a fazer piadas sobre meu corpo..."
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: 1.6 }}
              />
            </div>

            {/* Evidence Upload */}
            <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: 'var(--violet-50)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--violet-300)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 700, color: 'var(--violet-900)', fontSize: '0.95rem', minHeight: '44px' }}>
                <Upload size={20} color="var(--violet-700)" />
                <span>Anexar prints, áudios ou documentos (Opcional & Criptografado)</span>
                <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              {evidenceFileName ? (
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--success-600)', fontWeight: 700 }}>
                  ✓ Arquivo carregado: {evidenceFileName}
                </div>
              ) : (
                <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                  Formatos aceitos: PNG, JPG, PDF, MP3, M4A. Arquivos salvos em ambiente isolado e seguro.
                </div>
              )}
            </div>

            <div className="form-action-buttons" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrev}
                style={{ minHeight: '48px' }}
              >
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleNext}
                style={{ minHeight: '48px' }}
              >
                <span>Avançar para Sigilo</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: SIGILO & IDENTIFICAÇÃO
            ========================================================================= */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              Como você deseja que seu relato seja tratado?
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Você tem total autonomia para escolher entre anonimato ou acompanhamento direto da psicóloga escolar:
            </p>

            <div className="choice-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div
                onClick={() => setIsAnonymous(true)}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${isAnonymous ? 'var(--pink-500)' : 'var(--neutral-300)'}`,
                  background: isAnonymous ? 'var(--pink-50)' : '#fff',
                  cursor: 'pointer',
                  boxShadow: isAnonymous ? '0 4px 14px rgba(204, 59, 136, 0.12)' : 'none',
                  minHeight: '48px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--pink-900)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <EyeOff size={22} color="var(--pink-600)" />
                  <span>100% Anônimo</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-700)', lineHeight: 1.5 }}>
                  Nenhum dado seu será registrado. Você acompanhará as providências unicamente através do código de protocolo confidencial.
                </div>
              </div>

              <div
                onClick={() => setIsAnonymous(false)}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${!isAnonymous ? 'var(--violet-700)' : 'var(--neutral-300)'}`,
                  background: !isAnonymous ? 'var(--violet-50)' : '#fff',
                  cursor: 'pointer',
                  boxShadow: !isAnonymous ? '0 4px 14px rgba(101, 8, 174, 0.12)' : 'none',
                  minHeight: '48px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--violet-950)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <User size={22} color="var(--violet-700)" />
                  <span>Identificado (Apoio Direto)</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-700)', lineHeight: 1.5 }}>
                  Permite que a psicóloga escolar faça uma escuta ativa e acolhimento individualizado em sala reservada, com sigilo institucional.
                </div>
              </div>
            </div>

            {!isAnonymous && (
              <div className="identified-form-grid" style={{ padding: '1.25rem', background: 'var(--violet-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--violet-200)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--violet-900)', display: 'block', marginBottom: '0.35rem' }}>
                    Seu Nome ou Iniciais e Turma:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Mariana S. (1º Ano B)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', minHeight: '48px', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--violet-900)', display: 'block', marginBottom: '0.35rem' }}>
                    Contato Seguro (WhatsApp ou E-mail):
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: mariana@escola.edu.br"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={{ width: '100%', minHeight: '48px', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)' }}
                  />
                </div>
              </div>
            )}

            <div className="form-action-buttons" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrev}
                style={{ minHeight: '48px' }}
              >
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleNext}
                style={{ minHeight: '48px' }}
              >
                <span>Avançar para Revisão</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 5: REVISÃO & ENVIO CRIPTOGRAFADO
            ========================================================================= */}
        {currentStep === 5 && (
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              Confira seu relato antes de enviar
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Revise os dados abaixo. Ao clicar em enviar, seu protocolo confidencial será gerado imediatamente:
            </p>

            <div style={{ background: 'var(--neutral-100)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--neutral-300)', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 700, textTransform: 'uppercase' }}>Tipo de Ocorrência:</span>
                <div style={{ fontWeight: 800, color: 'var(--neutral-900)', fontSize: '1rem' }}>{selectedCategory}</div>
              </div>

              <div className="review-meta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 700, textTransform: 'uppercase' }}>Local:</span>
                  <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{location}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 700, textTransform: 'uppercase' }}>Frequência:</span>
                  <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{frequency}</div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 700, textTransform: 'uppercase' }}>Descrição do Relato:</span>
                <div style={{ background: '#fff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)', marginTop: '0.25rem', fontSize: '0.9rem', color: 'var(--neutral-900)', lineHeight: 1.5 }}>
                  "{narrative}"
                </div>
              </div>

              <div className="review-meta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 700, textTransform: 'uppercase' }}>Sigilo:</span>
                  <div style={{ fontWeight: 700, color: isAnonymous ? 'var(--pink-700)' : 'var(--violet-800)' }}>
                    {isAnonymous ? '🔒 100% Anônimo' : `👤 Identificado (${name})`}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 700, textTransform: 'uppercase' }}>Evidências:</span>
                  <div style={{ fontWeight: 600, color: evidenceFileName ? 'var(--success-600)' : 'var(--neutral-600)' }}>
                    {evidenceFileName ? `✓ Anexo: ${evidenceFileName}` : 'Nenhum anexo'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--pink-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--pink-200)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <Lock size={22} color="var(--pink-600)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--pink-900)', lineHeight: 1.4 }}>
                <strong>Garantia Legal:</strong> Conforme o Artigo 13 do ECA e Lei 14.811/2024, nenhuma retaliação, julgamento ou constrangimento será permitido contra quem relata.
              </div>
            </div>

            <div className="form-action-buttons" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={loading}
                style={{ minHeight: '48px' }}
              >
                <ArrowLeft size={18} />
                <span>Voltar e Editar</span>
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
                disabled={loading}
                style={{ minHeight: '48px' }}
              >
                <Shield size={20} />
                <span>{loading ? 'Criptografando e Enviando...' : 'Confirmar e Enviar Relato'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

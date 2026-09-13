import React, { useState } from 'react';
import { X, Printer, FileText, ArrowLeft, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { ReportCase } from '../types';

interface OfficialDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportCase: ReportCase | null;
  onConfirmDispatch: (caseId: string, dispatchText: string, recipientCouncil: string) => Promise<void>;
  currentUserName?: string;
}

const DISPATCH_PRESETS = [
  {
    label: 'Padrão (Escuta Ativa & Art. 13 ECA)',
    text: 'Em estrito cumprimento ao Artigo 13 da Lei Federal nº 8.069/1990 (ECA) e aos protocolos da Lei nº 14.811/2024, encaminhamos a este respeitável órgão tutelar a ocorrência confidencial registrada no canal seguro "4 Por Todas". A equipe escolar realizou escuta ativa e acolhimento psicossocial inicial, resguardando a integridade da aluna e evitando qualquer tipo de acareação interna. Solicitamos a adoção das medidas protetivas e acompanhamento pertinentes no âmbito da rede de proteção.'
  },
  {
    label: 'Urgência (Necessidade de Rede Protetiva CREAS/CRAS)',
    text: 'Encaminhamos a presente notificação com solicitação de intervenção prioritária da rede de assistência e proteção social. O Comitê Escolar acolheu a aluna em ambiente privativo e assegurou o suporte emocional inicial. Requeremos articulação intersetorial urgente junto ao Conselho Tutelar e órgãos competentes para garantir a segurança integral da estudante e de seus familiares.'
  },
  {
    label: 'Mediação Institucional & Monitoramento Ativo',
    text: 'Notificamos este Conselho Tutelar acerca dos fatos relatados para ciência e providências institucionais cabíveis. No âmbito escolar, a equipe gestora intensificou o monitoramento preventivo nos locais indicados e manterá o acompanhamento psicopedagógico contínuo, preservando integralmente o sigilo e a dignidade de todas as partes envolvidas.'
  }
];

export const OfficialDispatchModal: React.FC<OfficialDispatchModalProps> = ({
  isOpen,
  onClose,
  reportCase,
  onConfirmDispatch,
  currentUserName
}) => {
  const [recipient, setRecipient] = useState('Conselho Tutelar Regional da Comarca');
  const [schoolName, setSchoolName] = useState('Escola de Educação Básica — Comitê 4 Por Todas');
  const [managerName, setManagerName] = useState(currentUserName || 'Coordenação Pedagógica & Psicologia Escolar');
  const [dispatchText, setDispatchText] = useState(DISPATCH_PRESETS[0].text);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !reportCase) return null;

  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const generateDocumentHtml = () => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Ofício Formal de Encaminhamento — Protocolo ${reportCase.id}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 20mm; }
    * { box-sizing: border-box; }
    body { 
      font-family: 'Times New Roman', Times, Georgia, serif; 
      line-height: 1.6; 
      color: #000000; 
      background: #ffffff;
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    .header { text-align: center; border-bottom: 2px solid #222; padding-bottom: 12px; margin-bottom: 24px; }
    .header-sub { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; }
    .header-title { font-size: 20px; font-weight: bold; margin: 6px 0; }
    .header-dept { font-size: 13px; color: #444; }
    .meta-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px; }
    .addressee { margin-bottom: 20px; font-size: 15px; }
    .p-text { text-align: justify; text-indent: 35px; font-size: 14px; margin-bottom: 14px; }
    .case-box { background: #f8f8f8; border: 1px solid #ddd; padding: 14px 18px; border-radius: 4px; margin: 18px 0; font-family: Arial, sans-serif; font-size: 13px; }
    .case-box div { margin-bottom: 5px; }
    .signatures { display: flex; justify-content: space-around; margin-top: 50px; text-align: center; font-size: 13px; }
    .sig-block { border-top: 1px solid #222; padding-top: 6px; width: 260px; }
    .footer-note { margin-top: 35px; border-top: 1px solid #eee; padding-top: 8px; font-size: 10px; color: #777; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-sub">REPÚBLICA FEDERATIVA DO BRASIL • ESTABELECIMENTO DE ENSINO</div>
    <div class="header-title">${schoolName.toUpperCase()}</div>
    <div class="header-dept">Comitê de Acolhimento, Convivência e Proteção Escolar — Sistema 4 Por Todas</div>
  </div>

  <div class="meta-row">
    <div><strong>OFÍCIO Nº:</strong> ${new Date().getFullYear()}/${reportCase.id}</div>
    <div>Localidade, ${today}.</div>
  </div>

  <div class="addressee">
    <div><strong>Ao(À) Ilustríssimo(a) Senhor(a) Conselheiro(a) Tutelar</strong></div>
    <div>${recipient}</div>
    <div style="margin-top: 4px;"><strong>Assunto:</strong> Notificação Compulsória — Artigo 13 do Estatuto da Criança e do Adolescente (Lei 8.069/1990) e Lei 14.811/2024.</div>
  </div>

  <p class="p-text">Prezado(a) Conselheiro(a),</p>
  <p class="p-text">Vimos por meio deste formalizar a notificação compulsória referente ao relato de violência/assédio escolar registrado sob o <strong>Protocolo nº ${reportCase.id}</strong> em <strong>${reportCase.date}</strong>, cujos dados sintetizados seguem abaixo:</p>

  <div class="case-box">
    <div><strong>Classificação do Fato:</strong> ${reportCase.type}</div>
    <div><strong>Local da Ocorrência:</strong> ${reportCase.location} (Frequência: ${reportCase.frequency})</div>
    <div><strong>Identificação da Estudante:</strong> ${reportCase.isAnonymous ? 'Regime de Anonimato e Proteção Integral (Art. 100 do ECA)' : reportCase.studentName}</div>
    <div style="border-top: 1px dashed #ccc; padding-top: 8px; margin-top: 8px;">
      <strong>Síntese do Relato:</strong><br>
      <em>"${reportCase.narrative}"</em>
    </div>
    ${reportCase.hasEvidence ? `<div><strong>Anexos Custodiados:</strong> ${reportCase.evidenceFiles.join(', ')}</div>` : ''}
  </div>

  <p class="p-text"><strong>Parecer da Gestão Escolar e Providências Iniciais:</strong> ${dispatchText}</p>
  <p class="p-text">Renovamos nossos protestos de elevada consideração e colocamo-nos à disposição desta entidade tutelar para colaborar na implementação das medidas de proteção cabíveis.</p>

  <div class="signatures">
    <div class="sig-block">
      <strong>DIREÇÃO ESCOLAR</strong><br>
      Unidade de Ensino
    </div>
    <div class="sig-block">
      <strong>${managerName.toUpperCase()}</strong><br>
      Comitê de Proteção Escolar (4 Por Todas)
    </div>
  </div>

  <div class="footer-note">
    Documento emitido eletronicamente pelo Sistema 4 Por Todas em conformidade com as Leis Federais 8.069/1990 (ECA), 14.811/2024 e 13.709/2018 (LGPD).
  </div>
</body>
</html>`;

  const handlePrintAndConfirm = async () => {
    setIsSubmitting(true);
    await onConfirmDispatch(reportCase.id, dispatchText, recipient);
    setIsSubmitting(false);

    // Cria um iframe isolado dedicado para impressão limpa garantida
    const html = generateDocumentHtml();
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const frameDoc = iframe.contentWindow?.document || iframe.contentDocument;
    if (frameDoc && iframe.contentWindow) {
      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1500);
      }, 300);
    } else {
      window.print();
    }
  };

  const handleDownloadDocument = async () => {
    setIsSubmitting(true);
    await onConfirmDispatch(reportCase.id, dispatchText, recipient);
    setIsSubmitting(false);

    const docContent = generateDocumentHtml();
    const blob = new Blob([docContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Oficio_Conselho_Tutelar_${reportCase.id}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(23, 18, 22, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div
        className="card modal-dispatch-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: viewMode === 'preview' ? '860px' : '740px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          position: 'relative',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="no-print"
          aria-label="Fechar ofício"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-500)', minHeight: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={24} />
        </button>

        {/* EDITOR MODE */}
        {viewMode === 'editor' && (
          <div>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--violet-100)', color: 'var(--violet-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--neutral-900)', margin: 0 }}>
                  Expedição de Ofício de Notificação Compulsória
                </h2>
                <p style={{ fontSize: 'var(--font-size-sm)', margin: '0.2rem 0 0 0', color: 'var(--neutral-600)' }}>
                  Fundamentação Legal: <strong>Art. 13 do ECA (Lei 8.069/90) & Lei 14.811/2024</strong>
                </p>
              </div>
            </div>

            {/* Clarify Legal Directive Guidance Box */}
            <div style={{ background: 'var(--violet-50)', border: '1px solid var(--violet-200)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldCheck size={20} color="var(--violet-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.82rem', color: 'var(--violet-950)', lineHeight: 1.4 }}>
                <strong>Diretriz de Proteção e Não Acareação:</strong> A emissão deste ofício cumpre a obrigação legal da escola sem expor a vítima a constrangimentos ou acareações. Todos os dados permanecem sob sigilo funcional (LGPD).
              </div>
            </div>

            {/* Case Snapshot Box */}
            <div style={{ background: 'var(--neutral-100)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--neutral-300)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span><strong>Protocolo Confidencial:</strong> <span style={{ color: 'var(--violet-900)', fontWeight: 800 }}>{reportCase.id}</span></span>
                <span><strong>Data do Registro:</strong> {reportCase.date}</span>
              </div>
              <div style={{ marginBottom: '0.25rem' }}><strong>Ocorrência:</strong> {reportCase.type} ({reportCase.location} • {reportCase.frequency})</div>
              <div><strong>Regime de Sigilo:</strong> {reportCase.isAnonymous ? '🔒 100% Anônimo (Art. 100 do ECA)' : `👤 Identificado (${reportCase.studentName})`}</div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', display: 'block', marginBottom: '0.35rem' }}>
                  Destinatário (Conselho Tutelar / Órgão Competente):
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  style={{ width: '100%', minHeight: '46px', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)' }}
                />
              </div>

              <div className="dispatch-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', display: 'block', marginBottom: '0.35rem' }}>
                    Nome da Unidade Escolar:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    style={{ width: '100%', minHeight: '46px', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', display: 'block', marginBottom: '0.35rem' }}>
                    Responsável pelo Encaminhamento:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    style={{ width: '100%', minHeight: '46px', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)' }}
                  />
                </div>
              </div>

              {/* Presets Selector */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', display: 'block' }}>
                    Parecer Psicopedagógico da Gestão Escolar:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--violet-700)', fontWeight: 600 }}>
                    <Sparkles size={14} />
                    <span>Modelos Rápidos:</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  {DISPATCH_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDispatchText(p.text)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: dispatchText === p.text ? 'var(--violet-100)' : 'var(--neutral-100)',
                        border: `1px solid ${dispatchText === p.text ? 'var(--violet-400)' : 'var(--neutral-300)'}`,
                        color: dispatchText === p.text ? 'var(--violet-900)' : 'var(--neutral-700)',
                        cursor: 'pointer',
                        fontWeight: dispatchText === p.text ? 700 : 500
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <textarea
                  className="form-textarea"
                  rows={5}
                  value={dispatchText}
                  onChange={(e) => setDispatchText(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.5 }}
                />
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--neutral-200)', paddingTop: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-subtle"
                onClick={onClose}
                style={{ minHeight: '44px' }}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setViewMode('preview')}
                style={{ minHeight: '48px', padding: '0.75rem 1.5rem' }}
              >
                <span>Visualizar Modelo Oficial A4</span>
                <FileText size={18} />
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW & PRINTABLE DOCUMENT MODE */}
        {viewMode === 'preview' && (
          <div>
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setViewMode('editor')}
                style={{ minHeight: '44px' }}
              >
                <ArrowLeft size={16} />
                <span>Voltar e Editar</span>
              </button>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleDownloadDocument}
                  disabled={isSubmitting}
                  style={{ minHeight: '44px' }}
                >
                  <Download size={16} />
                  <span>Baixar Arquivo HTML</span>
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handlePrintAndConfirm}
                  disabled={isSubmitting}
                  style={{ background: 'var(--violet-800)', minHeight: '44px' }}
                >
                  <Printer size={18} />
                  <span>{isSubmitting ? 'Registrando...' : 'Imprimir / Salvar em PDF'}</span>
                </button>
              </div>
            </div>

            {/* PRINTABLE OFFICIAL LETTER PAPER */}
            <div className="printable-oficio-paper" style={{ padding: '2.5rem', border: '1px solid var(--neutral-300)', borderRadius: 'var(--radius-md)', background: '#fff', color: '#111', fontFamily: 'Georgia, serif', lineHeight: 1.6 }}>
              
              {/* Official Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #222', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  REPÚBLICA FEDERATIVA DO BRASIL • ESTABELECIMENTO DE ENSINO
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.35rem 0', color: '#111' }}>
                  {schoolName.toUpperCase()}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#444' }}>
                  Comitê de Acolhimento, Convivência e Proteção Escolar — Sistema 4 Por Todas
                </div>
              </div>

              {/* Protocol Header & Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div>
                  <strong>OFÍCIO Nº:</strong> {new Date().getFullYear()}/{reportCase.id}
                </div>
                <div>
                  Localidade, {today}.
                </div>
              </div>

              {/* Addressee */}
              <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                <div><strong>Ao(À) Ilustríssimo(a) Senhor(a) Conselheiro(a) Tutelar</strong></div>
                <div>{recipient}</div>
                <div style={{ marginTop: '0.25rem' }}><strong>Assunto:</strong> Comunicação Obrigatória de Ocorrência Escolar — Artigo 13 da Lei 8.069/1990 (ECA) e Lei 14.811/2024.</div>
              </div>

              {/* Main Body */}
              <div style={{ fontSize: '0.95rem', textAlign: 'justify', marginBottom: '1.25rem', textIndent: '2rem' }}>
                Prezado(a) Conselheiro(a),
              </div>

              <div style={{ fontSize: '0.92rem', textAlign: 'justify', marginBottom: '1.25rem', textIndent: '2rem' }}>
                Vimos por meio deste formalizar a notificação compulsória referente ao relato de violência/assédio escolar registrado no canal protegido institucional sob o <strong>Protocolo nº {reportCase.id}</strong> em <strong>${reportCase.date}</strong>, conforme os dados sintetizados a seguir:
              </div>

              {/* Case Details Box */}
              <div style={{ background: '#f8f8f8', border: '1px solid #ddd', padding: '1rem 1.25rem', borderRadius: '4px', marginBottom: '1.25rem', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>
                <div style={{ marginBottom: '0.35rem' }}><strong>Classificação do Fato:</strong> {reportCase.type}</div>
                <div style={{ marginBottom: '0.35rem' }}><strong>Local / Circunstância:</strong> {reportCase.location} (Frequência: {reportCase.frequency})</div>
                <div style={{ marginBottom: '0.35rem' }}>
                  <strong>Identificação da Aluna:</strong> {reportCase.isAnonymous ? 'Regime de Anonimato e Proteção Integral (Art. 100 do ECA)' : reportCase.studentName}
                </div>
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #ccc' }}>
                  <strong>Síntese Narrativa da Estudante:</strong>
                  <div style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#222' }}>
                    "{reportCase.narrative}"
                  </div>
                </div>
                {reportCase.hasEvidence && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#555' }}>
                    <strong>Anexos/Evidências Custodiadas:</strong> {reportCase.evidenceFiles.join(', ')}
                  </div>
                )}
              </div>

              {/* Pedagogical Statement */}
              <div style={{ fontSize: '0.92rem', textAlign: 'justify', marginBottom: '1.5rem', textIndent: '2rem' }}>
                <strong>Parecer da Gestão Escolar e Providências Iniciais:</strong> {dispatchText}
              </div>

              <div style={{ fontSize: '0.92rem', textAlign: 'justify', marginBottom: '2.5rem', textIndent: '2rem' }}>
                Renovamos nossos protestos de elevada consideração e colocamo-nos à disposição para colaborar com as medidas protetivas necessárias.
              </div>

              {/* Signatures */}
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem', marginTop: '3rem', textAlign: 'center', fontSize: '0.85rem' }}>
                <div style={{ width: '45%' }}>
                  <div style={{ borderTop: '1px solid #333', paddingTop: '0.5rem' }}>
                    <strong>DIREÇÃO ESCOLAR</strong><br />
                    Unidade de Ensino
                  </div>
                </div>
                <div style={{ width: '45%' }}>
                  <div style={{ borderTop: '1px solid #333', paddingTop: '0.5rem' }}>
                    <strong>{managerName.toUpperCase()}</strong><br />
                    Comitê de Proteção Escolar (4 Por Todas)
                  </div>
                </div>
              </div>

              {/* Footer legal watermark */}
              <div style={{ marginTop: '2.5rem', paddingTop: '0.5rem', borderTop: '1px solid #eee', fontSize: '0.7rem', color: '#777', textAlign: 'center' }}>
                Documento emitido eletronicamente pelo Sistema 4 Por Todas em conformidade com as Leis Federais 8.069/1990 (ECA), 14.811/2024 e 13.709/2018 (LGPD).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { ReportCase, CreateReportDTO } from "../types";

export class DataStore {
  private cases: ReportCase[] = [
    {
      id: "4PT-7821-S",
      date: "08/09/2026 14:20",
      type: "Importunação Verbal e Constrangimento",
      isAnonymous: true,
      studentName: "Sigiloso (Relato Anônimo)",
      studentContact: "Sigiloso (Relato Anônimo)",
      location: "Corredor do 2º Andar (próximo aos armários)",
      frequency: "Recorrente (últimas duas semanas)",
      status: "Em Acolhimento",
      severity: "Média",
      narrative: "Durante os intervalos, um grupo de alunos fica bloqueando a passagem e fazendo comentários invasivos sobre as roupas e o corpo das alunas que passam.",
      hasEvidence: true,
      evidenceFiles: ["print_grupo_whatsapp.png (Anexo Seguro)", "declaracao_contexto.pdf"],
      confidentialNotes: [
        {
          author: "Psicóloga Escolar (Dra. Helena)",
          date: "08/09/2026 16:00",
          text: "Escuta ativa inicial agendada com as representantes de turma para reforço de conscientização preventiva sem exposição."
        }
      ],
      legalActions: {
        conselhoTutelarNotified: false,
        policeReportFiled: false,
        guardiansContacted: true
      }
    },
    {
      id: "4PT-9410-S",
      date: "06/09/2026 10:15",
      type: "Compartilhamento Não Autorizado de Imagem",
      isAnonymous: false,
      studentName: "M. S. (1º Ano B)",
      studentContact: "mariana.aluna@escola.edu.br",
      location: "Ambiente Digital (Redes Sociais da Turma)",
      frequency: "Ocorrência Única Grave",
      status: "Encaminhado ao Conselho Tutelar",
      severity: "Alta",
      narrative: "Foto tirada sem consentimento durante a aula de educação física foi postada em grupo fechado com comentários ofensivos.",
      hasEvidence: true,
      evidenceFiles: ["captura_tela_stories.png", "audio_depoimento.m4a"],
      confidentialNotes: [
        {
          author: "Coordenação Pedagógica",
          date: "06/09/2026 11:30",
          text: "Ofício formal nº 142/2026 emitido e encaminhado ao Conselho Tutelar Regional conforme Art. 13 do ECA."
        },
        {
          author: "Diretoria",
          date: "07/09/2026 09:00",
          text: "Reunião de acolhimento realizada com a mãe da aluna em sala reservada."
        }
      ],
      legalActions: {
        conselhoTutelarNotified: true,
        policeReportFiled: true,
        guardiansContacted: true
      }
    },
    {
      id: "4PT-3209-S",
      date: "04/09/2026 16:45",
      type: "Perseguição ou Intimidação Sistemática (Bullying)",
      isAnonymous: true,
      studentName: "Sigiloso (Relato Anônimo)",
      studentContact: "Sigiloso",
      location: "Saída da Escola / Ponto de Ônibus",
      frequency: "Diária",
      status: "Novo",
      severity: "Média",
      narrative: "Alunos do 3º ano ficam esperando na saída para intimidar e seguir meninas até o ponto de ônibus da esquina.",
      hasEvidence: false,
      evidenceFiles: [],
      confidentialNotes: [],
      legalActions: {
        conselhoTutelarNotified: false,
        policeReportFiled: false,
        guardiansContacted: false
      }
    },
    {
      id: "4PT-1055-S",
      date: "01/09/2026 09:30",
      type: "Toque Físico Não Consentido",
      isAnonymous: false,
      studentName: "L. C. (3º Ano A)",
      studentContact: "contato.responsavel@email.com",
      location: "Pátio Central / Cantina",
      frequency: "Ocorrência Única",
      status: "Encerrado",
      severity: "Alta",
      narrative: "Situação de importunação resolvida com aplicação de medidas protetivas e apoio psicológico contínuo.",
      hasEvidence: true,
      evidenceFiles: ["relatorio_apoio.pdf"],
      confidentialNotes: [
        {
          author: "Comitê de Proteção",
          date: "05/09/2026 14:00",
          text: "Processo concluído com encaminhamentos cumpridos e suporte mantido."
        }
      ],
      legalActions: {
        conselhoTutelarNotified: true,
        policeReportFiled: true,
        guardiansContacted: true
      }
    }
  ];

  public getAllCases(): ReportCase[] {
    return [...this.cases];
  }

  public getCaseById(id: string): ReportCase | undefined {
    return this.cases.find(c => c.id.toUpperCase() === id.toUpperCase());
  }

  public createCase(dto: CreateReportDTO): ReportCase {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    const protocol = this.generateProtocol();

    const newCase: ReportCase = {
      id: protocol,
      date: formattedDate,
      type: dto.category || "Assédio ou Constrangimento",
      isAnonymous: dto.isAnonymous,
      studentName: dto.isAnonymous ? "Anônimo (Protegido)" : (dto.name || "Aluna Identificada"),
      studentContact: dto.isAnonymous ? "Sigiloso" : (dto.contact || "Não informado"),
      location: dto.location || "Ambiente Escolar",
      frequency: dto.frequency || "Primeira vez",
      status: "Novo",
      severity: dto.severity || "Média",
      narrative: dto.narrative || "",
      hasEvidence: Boolean(dto.evidenceFiles && dto.evidenceFiles.length > 0),
      evidenceFiles: dto.evidenceFiles || [],
      confidentialNotes: [
        {
          author: "Sistema 4 Por Todas",
          date: formattedDate,
          text: "Relato recebido com sucesso via portal protegido e criptografado."
        }
      ],
      legalActions: {
        conselhoTutelarNotified: false,
        policeReportFiled: false,
        guardiansContacted: false
      }
    };

    this.cases.unshift(newCase);
    return newCase;
  }

  public updateStatus(id: string, status: ReportCase["status"], authorName = "Comitê de Proteção"): ReportCase | null {
    const report = this.getCaseById(id);
    if (!report) return null;

    report.status = status;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

    report.confidentialNotes.push({
      author: authorName,
      date: formattedDate,
      text: `Status alterado para: "${status}"`
    });

    return report;
  }

  public addConfidentialNote(id: string, author: string, text: string): ReportCase | null {
    const report = this.getCaseById(id);
    if (!report) return null;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

    report.confidentialNotes.push({
      author: author || "Membro do Comitê",
      date: formattedDate,
      text: text.trim()
    });

    return report;
  }

  public notifyConselhoTutelar(id: string): ReportCase | null {
    const report = this.getCaseById(id);
    if (!report) return null;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

    report.legalActions.conselhoTutelarNotified = true;
    report.status = "Encaminhado ao Conselho Tutelar";
    report.confidentialNotes.push({
      author: "Ofício de Proteção Escolar",
      date: formattedDate,
      text: "Caso formalmente reportado ao Conselho Tutelar Regional conforme Art. 13 do ECA e Lei 14.811/2024."
    });

    return report;
  }

  private generateProtocol(): string {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `4PT-${num}-S`;
  }
}

export const store = new DataStore();

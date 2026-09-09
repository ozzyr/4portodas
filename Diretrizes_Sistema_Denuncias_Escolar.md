# Sistema de Denúncias de Assédio Escolar: Diretrizes e Legislação

Este documento estabelece as bases legais, estruturais e de governança para a implementação de um canal de denúncias na intranet da escola, focado em acolhimento e proteção.

## 1. Referencial Legislativo e Jurídico

A criação deste sistema é respaldada pelas seguintes legislações:

*   **Lei 14.811/2024 (Proteção em Estabelecimentos Educacionais):** Torna obrigatória a criação de protocolos e medidas de proteção contra a violência (incluindo abuso e assédio) no ambiente escolar.
*   **Estatuto da Criança e do Adolescente (ECA - Lei 8.069/1990):** O **Artigo 13** determina a comunicação obrigatória ao Conselho Tutelar em casos de suspeita ou confirmação de maus-tratos, assédio ou abuso. O **Artigo 53** reforça o direito ao respeito e à inviolabilidade física e moral.
*   **Lei do Bullying (Lei 13.185/2015):** Exige que escolas implementem mecanismos de notificação para combater intimidação sistemática e assédio.
*   **Lei 14.164/2021:** Institui a Semana Escolar de Combate à Violência contra a Mulher (excelente gancho pedagógico para introduzir o sistema, inspirado na iniciativa das alunas).
*   **Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018):** Dados de crianças e adolescentes são sensíveis. O sistema exige rigor arquitetônico no controle de acessos e criptografia.

## 2. Estrutura de Coleta e UX (Experiência do Usuário)

Ao modelar os cartões de interface e a estrutura de dados, o foco deve ser o acolhimento seguro:

*   **Anonimato e Sigilo:** O formulário deve prever submissão anônima, mas com opção de identificação segura para quem busca acompanhamento direto.
*   **Coleta Estruturada e Dicionário de Dados:** Utilizar campos fechados e *tags* dinâmicas (tipo de ocorrência, local, frequência) para gerar indicadores de gestão e mapas de calor sem expor identidades.
*   **Upload Restrito de Evidências:** Capacidade de anexar capturas de tela, fotos ou áudios, salvos em ambiente isolado.
*   **Linguagem e Acessibilidade:** Interface empática, sem jargões jurídicos, com fluxo claro que garanta à vítima a ausência de retaliações.

## 3. Governança e Matriz de Responsabilidades

Os registros do banco de dados não podem ficar abertos à rede. A gestão do sistema requer papéis bem definidos para a equipe gestora:

*   **Comitê de Proteção Escolar (Receptores):** Acesso estrito à Direção, Coordenação Pedagógica e suporte psicossocial (assistente social/psicólogo, se disponível na rede).
*   **Isolamento de Dados:** Professores individualmente, administradores da intranet/TI e alunos envolvidos no desenvolvimento não devem ter acesso aos *dashboards* de gestão ou aos registros nominais.

## 4. Fluxo Oficial de Tratamento das Denúncias

1.  **Acolhimento Imediato:** Abordagem discreta da aluna pela equipe de gestão para escuta ativa e suporte inicial, sem questionar a validade da denúncia.
2.  **Registro Formal:** A denúncia digital deve originar um registro confidencial documentado.
3.  **Acionamento da Rede (Conselho Tutelar):** A escola deve encaminhar o caso oficialmente ao Conselho Tutelar, evitando acareações internas ou investigações paralelas severas.
4.  **Aviso às Autoridades (Boletim de Ocorrência):** Havendo tipificação criminal (assédio ou importunação), orienta-se o registro de B.O. junto à Delegacia da Mulher ou Delegacia de Proteção à Criança e ao Adolescente.
5.  **Notificação aos Responsáveis:** Os pais ou responsáveis legais devem ser comunicados de forma estratégica e cuidadosa, avaliando o contexto familiar para evitar novos riscos à vítima.

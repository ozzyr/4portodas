# Regras de Design e Engenharia — 4 Por Todas (Impeccable Workflow)

Este documento estabelece as diretrizes permanentes de UI/UX, acessibilidade e conformidade técnica para o projeto **4 Por Todas**.

---

## 1. Identidade Visual & Design System
- **Paleta Primária:** Rosa 500 (`#CC3B88`), Violeta 700 (`#6508AE`), Violeta 900 (`#3E0375`), Ameixa/Fundo Escuro (`#241E22`).
- **Paleta de Apoio & Semântica:** Sucesso (`#10B981`), Alerta (`#F59E0B`), Perigo (`#EF4444`), Neutros (`#FAFAFB`, `#FFFFFF`).
- **Tipografia:** `Outfit` para títulos e cabeçalhos com peso visual marcante; `Inter` para leitura, textos descritivos e ofícios.
- **Ilustrações 2D da Mascote:** Utilizar os ativos gerados em `./assets/stepX-...` para garantir coerência visual e sensação acolhedora.

---

## 2. Acolhimento & Conformidade Legal (Art. 13 ECA & Lei 14.811/2024)
- **Não Acareação:** Em nenhuma circunstância o fluxo deve sugerir confronto ou acareação com agressores.
- **Opção de Anonimato Integral:** Respeitar a escolha da aluna por 100% de sigilo via código de protocolo criptográfico.
- **Linguagem Desestigmatizante:** Microtextos acolhedores, sem termos culpabilizantes ou jurídicos herméticos na visão da estudante.

---

## 3. Diretrizes Mobile-First & PWA
- **Touch Targets:** Todos os botões e áreas interativas devem possuir no mínimo $44\text{px} \times 44\text{px}$ de área de toque.
- **PWA Ready:** Manter o `manifest.json` e `sw.js` atualizados para permitir instalação em tela cheia (standalone) em iOS e Android.
- **Sem `alert()` ou `confirm()` Nativos:** Sempre utilizar o `AppDialogModal.tsx` integrado ao design system.

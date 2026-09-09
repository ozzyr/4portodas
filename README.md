# 🌸 4 Por Todas — Intranet Escolar de Acolhimento e Proteção

Canal seguro, confidencial e acolhedor para alunas e meninas relatarem situações de assédio, importunação ou intimidação no ambiente escolar. Desenvolvido em total conformidade com a **Lei 14.811/2024**, o **Estatuto da Criança e do Adolescente (ECA - Art. 13)** e a **LGPD (Lei 13.709/2018)**.

---

## 🏛️ Arquitetura do Projeto

O projeto é estruturado como um monorepo moderno contendo:

- ⚙️ **Backend (`backend/`)**: API RESTful em **Node.js + Express + TypeScript** com triagem de denúncias, ofícios formais ao Conselho Tutelar e notas confidenciais.
- 🌐 **Frontend Web (`web/`)**: Aplicação em **React 18 + Vite + TypeScript** com stepper em 5 etapas, botão de saída rápida e painel de governança.
- 📱 **Mobile App (`mobile/`)**: Aplicativo em **React Native + Expo + TypeScript** para acolhimento e discagem rápida de emergência (180, 100, 190).

---

## 🚀 Como Executar

### 1. Pré-requisitos
- **Node.js** (v18+)
- **npm** ou **yarn**

### 2. Rodar o Frontend Web (React)
```bash
npm run dev:web
```
*Acesse:* [http://localhost:5173](http://localhost:5173)

### 3. Rodar o Backend API (Node.js)
```bash
npm run dev:backend
```
*API Base:* `http://localhost:3333/api`

### 4. Rodar o Aplicativo Mobile (React Native / Expo)
```bash
npm run dev:mobile
```
*Escaneie o QR Code exibido no terminal utilizando o aplicativo **Expo Go** no seu smartphone.*

---

## 🛡️ Principais Funcionalidades

- **Stepper Guiado (5 Etapas):** Ocorrência, Contexto, Relato, Nível de Sigilo e Revisão.
- **Sigilo Absoluto:** Opção de relato 100% anônimo ou identificado para acolhimento individual pela psicóloga escolar.
- **Botão de Saída Rápida (ESC):** Redirecionamento instantâneo em caso de aproximação de terceiros.
- **Consulta por Código de Protocolo (`4PT-XXXX-S`):** Acompanhamento seguro sem exposição de dados.
- **Painel do Comitê de Proteção:** Triagem de casos, emissão de ofício ao Conselho Tutelar e notas confidenciais.

---

## 📜 Licença
Projeto desenvolvido para fins educacionais e de proteção infantojuvenil.

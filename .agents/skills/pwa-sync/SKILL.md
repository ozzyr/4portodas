---
name: pwa-sync
description: Workflow for validating, building, and deploying the 4 Por Todas PWA and Service Worker across mobile devices and GitHub Pages.
---

# PWA Sync & Validation Skill

Este skill orienta a verificação contínua e publicação do Progressive Web App do projeto **4 Por Todas**.

## Checklist de Verificação PWA
1. **Manifest (`web/public/manifest.json`):**
   - Validar se `start_url`, `scope`, `display: standalone`, `theme_color`, e os ícones 192px/512px estão apontados corretamente.
2. **Service Worker (`web/public/sw.js`):**
   - Garantir que o nome do cache (`CACHE_NAME`) seja incrementado quando novos recursos estáticos forem adicionados.
   - Manter a estratégia *Stale-While-Revalidate* e fallback offline.
3. **Banner de Instalação (`PwaInstallBanner.tsx`):**
   - Conferir se o evento `beforeinstallprompt` é capturado em navegadores Chromium/Android e o guia de compartilhamento é exibido no iOS Safari.
4. **Build e Deploy:**
   - Rodar `npm --prefix web run build`.
   - Publicar na branch `gh-pages` com `npx gh-pages -d web/dist`.

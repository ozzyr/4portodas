# Paleta de cores — Acolhimento e protagonismo feminino

**Versão:** 1.0  
**Formato:** escala padrão de design tokens 50–950  
**Referências visuais:** mãos femininas em rosa e composição de força feminina em rosa e violeta

## 1. Conceito visual

A paleta combina duas mensagens presentes nas imagens:

- **Rosa:** acolhimento, proximidade, escuta e pertencimento;
- **Violeta:** proteção, confiança, força coletiva e transformação;
- **Neutros ameixa:** seriedade e legibilidade sem a frieza do cinza puro.

O sistema deve parecer acolhedor, mas não infantil. As cores intensas aparecem nas ações e nos pontos de identidade; as superfícies de leitura permanecem claras e tranquilas.

## 2. Cores-base extraídas das referências

| Papel | Cor | Hex | Origem visual |
|---|---|---|---|
| Rosa principal | Rosa coletivo | `#CC3B88` | Mão central da primeira imagem |
| Rosa suave | Rosa acolhimento | `#E7B8D1` | Mãos claras da primeira imagem |
| Rosa profundo | Ameixa protetora | `#8B2B5E` | Mão escura da primeira imagem |
| Violeta principal | Violeta força | `#AA2BE3` | Punhos e recortes da segunda imagem |
| Magenta de destaque | Magenta expressão | `#DE36E9` | Luzes intensas da segunda imagem |
| Violeta profundo | Violeta segurança | `#55056E` | Sombras da segunda imagem |

## 3. Escala primária — Rosa acolhimento

A cor `500` é a cor principal da marca e das ações prioritárias.

| Escala | Hex | Uso recomendado |
|---:|---|---|
| 50 | `#FDF2F8` | Fundo geral acolhedor |
| 100 | `#FCE7F3` | Cards informativos e avisos suaves |
| 200 | `#F7C9E1` | Destaques leves e chips selecionados |
| 300 | `#EFA3CB` | Bordas decorativas e ilustrações |
| 400 | `#D86AA6` | Ícones e elementos sem texto branco |
| 500 | `#CC3B88` | Botão primário e identidade principal |
| 600 | `#B52C74` | Hover do botão primário |
| 700 | `#94205D` | Estado pressionado e links fortes |
| 800 | `#781A4D` | Títulos de destaque |
| 900 | `#63173F` | Texto expressivo em fundos claros |
| 950 | `#3D0A25` | Contraste máximo e fundos escuros |

### Combinações acessíveis

| Fundo | Texto | Contraste aproximado | Uso |
|---|---|---:|---|
| `#CC3B88` | `#FFFFFF` | 4,62:1 | Texto normal — WCAG AA |
| `#B52C74` | `#FFFFFF` | 5,87:1 | Hover — WCAG AA |
| `#94205D` | `#FFFFFF` | 8,00:1 | Alto contraste — WCAG AAA |
| `#FDF2F8` | `#241E22` | 14,98:1 | Texto principal em superfície rosa |

## 4. Escala secundária — Violeta proteção

O violeta reforça confiança institucional e diferencia ações secundárias, navegação e áreas protegidas.

| Escala | Hex | Uso recomendado |
|---:|---|---|
| 50 | `#FAF5FF` | Fundo alternativo |
| 100 | `#F3E8FF` | Cards de apoio |
| 200 | `#E7CCFA` | Seleção suave e badges |
| 300 | `#D8A4F3` | Bordas e ilustrações |
| 400 | `#BC6DE8` | Ícones e gráficos |
| 500 | `#AA2BE3` | Ação secundária forte |
| 600 | `#8C18C5` | Hover da ação secundária |
| 700 | `#6508AE` | Estado pressionado e navegação ativa |
| 800 | `#55056E` | Cabeçalhos e áreas protegidas |
| 900 | `#46045C` | Fundo institucional escuro |
| 950 | `#36016C` | Profundidade e contraste máximo |

### Combinações acessíveis

| Fundo | Texto | Contraste aproximado | Uso |
|---|---|---:|---|
| `#AA2BE3` | `#FFFFFF` | 5,04:1 | Texto normal — WCAG AA |
| `#8C18C5` | `#FFFFFF` | 6,88:1 | Hover — WCAG AA |
| `#6508AE` | `#FFFFFF` | 9,55:1 | Alto contraste — WCAG AAA |
| `#FAF5FF` | `#241E22` | 15,24:1 | Texto principal em superfície violeta |

## 5. Escala neutra — Ameixa

Os neutros recebem uma pequena influência de rosa e violeta para preservar a unidade visual.

| Escala | Hex | Uso recomendado |
|---:|---|---|
| 50 | `#FCFAFC` | Fundo principal da aplicação |
| 100 | `#F7F2F6` | Fundo de cards e campos desabilitados |
| 200 | `#EDE4EA` | Divisores suaves |
| 300 | `#D9CAD3` | Bordas de campos |
| 400 | `#B7A3AF` | Ícones desabilitados |
| 500 | `#927C89` | Texto auxiliar grande; evitar em texto pequeno |
| 600 | `#705D68` | Texto secundário |
| 700 | `#55464F` | Texto de apoio forte |
| 800 | `#392F35` | Títulos e navegação |
| 900 | `#241E22` | Texto principal |
| 950 | `#171216` | Contraste máximo |

## 6. Cor de destaque — Magenta expressão

O magenta `#DE36E9` vem da iluminação da segunda imagem. Deve ser usado com moderação:

- detalhes de ilustração;
- indicador de progresso;
- gráfico ou dado selecionado;
- foco visual em campanhas.

Não usar como cor principal de grandes áreas ou textos longos. Para texto branco, prefira uma versão escurecida: `#A516B5`.

## 7. Cores semânticas

As cores semânticas devem manter significado consistente em todo o produto. Ícone e texto devem acompanhar a cor; nunca comunicar estado apenas por tonalidade.

| Token | Hex | Fundo suave | Uso |
|---|---|---|---|
| Sucesso | `#237A57` | `#E9F7F0` | Envio concluído e confirmação |
| Atenção | `#A15C00` | `#FFF4DB` | Avisos que exigem leitura |
| Erro | `#B4233A` | `#FDECEF` | Falha de envio ou validação |
| Informação | `#2457A6` | `#EAF1FC` | Orientações neutras |

Vermelho deve aparecer somente para erro real ou risco, nunca como identidade visual dominante.

## 8. Tokens semânticos da interface

| Token | Valor | Aplicação |
|---|---|---|
| `color-brand-primary` | `#CC3B88` | CTA principal |
| `color-brand-primary-hover` | `#B52C74` | Hover do CTA principal |
| `color-brand-primary-active` | `#94205D` | Estado pressionado |
| `color-brand-secondary` | `#AA2BE3` | CTA secundário e navegação |
| `color-brand-secondary-hover` | `#8C18C5` | Hover secundário |
| `color-surface-page` | `#FCFAFC` | Fundo da aplicação |
| `color-surface-card` | `#FFFFFF` | Cards e formulário |
| `color-surface-soft` | `#FDF2F8` | Acolhimento e explicações |
| `color-surface-protected` | `#FAF5FF` | Área de privacidade e segurança |
| `color-text-primary` | `#241E22` | Texto principal |
| `color-text-secondary` | `#705D68` | Texto de apoio |
| `color-text-on-brand` | `#FFFFFF` | Texto sobre rosa ou violeta fortes |
| `color-border-default` | `#D9CAD3` | Bordas de campos e cards |
| `color-border-focus` | `#6508AE` | Foco de teclado |
| `color-link` | `#781A4D` | Links em fundos claros |
| `color-success` | `#237A57` | Confirmação |
| `color-warning` | `#A15C00` | Atenção |
| `color-danger` | `#B4233A` | Erro |
| `color-info` | `#2457A6` | Informação |

## 9. Aplicação nos componentes principais

| Componente | Fundo | Texto/ícone | Estado |
|---|---|---|---|
| Botão primário | Rosa 500 | Branco | Hover Rosa 600; ativo Rosa 700 |
| Botão secundário | Branco | Violeta 700 | Borda Violeta 500; hover Violeta 50 |
| Botão discreto | Transparente | Neutro 700 | Hover Neutro 100 |
| Card de acolhimento | Rosa 50 | Neutro 900 | Borda Rosa 200 |
| Card de privacidade | Violeta 50 | Neutro 900 | Borda Violeta 200 |
| Campo padrão | Branco | Neutro 900 | Borda Neutro 300 |
| Campo em foco | Branco | Neutro 900 | Borda Violeta 700 + halo Violeta 200 |
| Step concluído | Rosa 500 | Branco | Ícone de confirmação |
| Step atual | Violeta 700 | Branco | Anel Violeta 200 |
| Step futuro | Neutro 100 | Neutro 700 | Borda Neutro 300 |
| Mensagem de sucesso | `#E9F7F0` | `#18563E` | Ícone Sucesso |
| Mensagem de erro | `#FDECEF` | `#8A172C` | Ícone Erro |

## 10. CSS — variáveis prontas para desenvolvimento

```css
:root {
  /* Primary — Rosa acolhimento */
  --pink-50: #FDF2F8;
  --pink-100: #FCE7F3;
  --pink-200: #F7C9E1;
  --pink-300: #EFA3CB;
  --pink-400: #D86AA6;
  --pink-500: #CC3B88;
  --pink-600: #B52C74;
  --pink-700: #94205D;
  --pink-800: #781A4D;
  --pink-900: #63173F;
  --pink-950: #3D0A25;

  /* Secondary — Violeta proteção */
  --violet-50: #FAF5FF;
  --violet-100: #F3E8FF;
  --violet-200: #E7CCFA;
  --violet-300: #D8A4F3;
  --violet-400: #BC6DE8;
  --violet-500: #AA2BE3;
  --violet-600: #8C18C5;
  --violet-700: #6508AE;
  --violet-800: #55056E;
  --violet-900: #46045C;
  --violet-950: #36016C;

  /* Neutral — Ameixa */
  --neutral-50: #FCFAFC;
  --neutral-100: #F7F2F6;
  --neutral-200: #EDE4EA;
  --neutral-300: #D9CAD3;
  --neutral-400: #B7A3AF;
  --neutral-500: #927C89;
  --neutral-600: #705D68;
  --neutral-700: #55464F;
  --neutral-800: #392F35;
  --neutral-900: #241E22;
  --neutral-950: #171216;

  /* Accent */
  --magenta-500: #DE36E9;
  --magenta-700: #A516B5;

  /* Semantic */
  --success-600: #237A57;
  --success-50: #E9F7F0;
  --warning-700: #A15C00;
  --warning-50: #FFF4DB;
  --danger-700: #B4233A;
  --danger-50: #FDECEF;
  --info-700: #2457A6;
  --info-50: #EAF1FC;

  /* Interface */
  --color-brand-primary: var(--pink-500);
  --color-brand-primary-hover: var(--pink-600);
  --color-brand-primary-active: var(--pink-700);
  --color-brand-secondary: var(--violet-500);
  --color-brand-secondary-hover: var(--violet-600);
  --color-surface-page: var(--neutral-50);
  --color-surface-card: #FFFFFF;
  --color-surface-soft: var(--pink-50);
  --color-surface-protected: var(--violet-50);
  --color-text-primary: var(--neutral-900);
  --color-text-secondary: var(--neutral-600);
  --color-text-on-brand: #FFFFFF;
  --color-border-default: var(--neutral-300);
  --color-border-focus: var(--violet-700);
  --color-link: var(--pink-800);
}
```

## 11. Regras de acessibilidade

- Para texto normal, manter contraste mínimo de **4,5:1**.
- Para texto grande, manter contraste mínimo de **3:1**.
- Usar branco sobre Rosa 500 ou mais escuro.
- Usar branco sobre Violeta 500 ou mais escuro.
- Usar Neutro 900 sobre escalas 50–400.
- Não usar Rosa 400 ou Violeta 400 com texto branco pequeno.
- Não usar Neutro 500 em texto pequeno sobre fundo branco.
- Estados de erro, sucesso e atenção devem combinar cor, ícone e mensagem.
- O foco de teclado deve ser visível, preferencialmente com Violeta 700 e halo Violeta 200.
- Evitar gradientes intensos atrás de textos ou formulários longos.

## 12. Proporção visual recomendada

Para manter tranquilidade e legibilidade:

- **70%** superfícies brancas ou neutras claras;
- **20%** rosas e violetas claros;
- **10%** cores fortes em botões, ícones e destaques.

Essa proporção preserva a identidade das imagens sem transformar a jornada de acolhimento em uma experiência visualmente cansativa.


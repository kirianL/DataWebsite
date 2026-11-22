# Plan de implementación — DataWebsite (landing Customerup)

> **Agente:** `implementation-planner` (modo solo lectura). Este documento es el plan ejecutable para el implementador único (`Gemini 4 Hydrogen`). No se ha creado ni modificado ningún archivo. Listo para persistirse en `docs/design/implementation-plan.md`.

---

## 1. Metadata y alcance

- **Proyecto:** `projects/DataWebsite/`
- **Fuente de verdad:** `references/` (5 capturas) + `docs/design/visual-analysis.md` + `docs/design/design-system.md` + `docs/design/asset-inventory.md` + `AGENTS.md`.
- **Stack (referencia `projects/healthwebsite`):** Vite 6 + React 19 + TypeScript 5.7 + Tailwind CSS v4 + `@tailwindcss/vite`.
- **Idioma de UI:** Inglés (copy observado en las referencias). `lang="en"`.
- **Alcance:** una sola landing page, sin backend, sin routing. Componentes en `src/components/*.tsx`, datos en `src/data/content.ts`.
- **Implementador único:** `antigravity/gemini-4-hydrogen`. Los 6 especialistas son solo lectura.

---

## 2. Stack y configuración

### 2.1. `package.json`

```json
{
  "name": "datawebsite",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc -b --noEmit"
  },
  "dependencies": {
    "landing-factory": "file:../..",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.7"
  }
}
```

### 2.2. `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 2.3. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### 2.4. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Customerup — Data platform for customer engagement</title>
    <meta
      name="description"
      content="Customerup unifies your data streams, activation and analytics so every message reaches the right person at the right time."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 2.5. `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 3. Estructura exacta de archivos

```
projects/DataWebsite/
├── AGENTS.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── images/
│       ├── hero-woman-phone.webp            (F1)
│       ├── portrait-man-glasses.webp        (F2)
│       ├── team-office-modern.webp          (F3)
│       ├── two-people-conversation.webp     (F4)
│       ├── city-skyline-dusk.webp           (F5)
│       └── two-people-collaborating.webp    (F6)
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── styles/
│   │   └── tokens.css
│   ├── data/
│   │   └── content.ts
│   └── components/
│       ├── TopBar.tsx
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── MetricsStrip.tsx
│       ├── ActivationCards.tsx
│       ├── WhyChooseUsBento.tsx
│       ├── SplitChart.tsx
│       ├── ServicesDarkBlock.tsx
│       ├── CaseStudies.tsx
│       ├── ProcessSteps.tsx
│       ├── Insights.tsx
│       ├── FAQAccordion.tsx
│       ├── Footer.tsx
│       └── icons/
│           ├── LogoMark.tsx
│           ├── KickerChip.tsx
│           ├── ArrowUpRight.tsx
│           ├── PlayCircle.tsx
│           ├── ChevronDown.tsx
│           ├── MenuIcon.tsx
│           ├── DataJourneyIcon.tsx
│           ├── DataStreamsIcon.tsx
│           └── PackageInfoIcon.tsx
└── docs/
    └── design/
        ├── visual-analysis.md
        ├── design-system.md
        ├── asset-inventory.md
        └── implementation-plan.md
```

**Regla:** ningún otro archivo de componente se crea fuera de esta lista. Iconos exclusivamente en `src/components/icons/*.tsx` como SVG inline. Sin archivos `.png`/`.jpg` en `src/`; fotos solo en `public/images/`.

---

## 4. Tokens y estilos globales

### 4.1. `src/styles/tokens.css`

```css
:root {
  /* Colores */
  --color-bg-electric-lime: #D7FC6E;
  --color-bg-dark-forest: #0B1C18;
  --color-bg-offwhite: #F5F6F3;
  --color-card-white: #FFFFFF;
  --color-card-lavender: #E9EEF5;
  --color-card-mint: #DCEBE8;
  --color-border: #E4E4E7;
  --color-text-dark: #111827;
  --color-text-muted: #4B5563;
  --color-text-on-dark: #FFFFFF;
  --color-text-on-lime: #111827;
  --color-accent-border: #C4F83A;

  /* Tipografía */
  --font-sans: "Plus Jakarta Sans", "Inter", sans-serif;
  --text-display: clamp(2.5rem, 4.5vw, 4rem);
  --text-h2: clamp(1.875rem, 3vw, 2.5rem);
  --text-h3: 1.375rem;
  --text-body: 1rem;
  --text-caption: 0.8125rem;

  /* Geometría */
  --radius-card: 14px;
  --radius-button: 8px;
  --radius-pill: 9999px;
  --container-max: 1200px;
  --space-section-y: 5rem;
}

/* Utilidad tipográfica reutilizable */
.tabular-nums { font-variant-numeric: tabular-nums; }
```

### 4.2. `src/index.css`

```css
@import "tailwindcss";
@import "./styles/tokens.css";

@theme {
  --color-lime: var(--color-bg-electric-lime);
  --color-forest: var(--color-bg-dark-forest);
  --color-offwhite: var(--color-bg-offwhite);
  --color-card: var(--color-card-white);
  --color-border: var(--color-border);
  --font-sans: var(--font-sans);
}

@layer base {
  html { font-family: var(--font-sans); }
  body {
    background-color: var(--color-bg-offwhite);
    color: var(--color-text-dark);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  *:focus-visible {
    outline: 2px solid var(--color-bg-electric-lime);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

### 4.3. `src/App.tsx`

```tsx
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MetricsStrip from "./components/MetricsStrip";
import ActivationCards from "./components/ActivationCards";
import WhyChooseUsBento from "./components/WhyChooseUsBento";
import SplitChart from "./components/SplitChart";
import ServicesDarkBlock from "./components/ServicesDarkBlock";
import CaseStudies from "./components/CaseStudies";
import ProcessSteps from "./components/ProcessSteps";
import Insights from "./components/Insights";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-offwhite)] text-[var(--color-text-dark)]">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <MetricsStrip />
        <ActivationCards />
        <WhyChooseUsBento />
        <SplitChart />
        <ServicesDarkBlock />
        <CaseStudies />
        <ProcessSteps />
        <Insights />
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}
```

---

## 5. Datos y contenido (`src/data/content.ts`)

**Reglas obligatorias al escribir este archivo:**

- Todo texto de UI en **Sentence case** (solo primera palabra en mayúscula; nombres propios/siglas permitidos: `Customerup`, `San José`, `SINPE`, etc.).
- Prohibido: `potencia`, `eleva`, `revoluciona`, `sin fisuras`.
- Prohibido formato `**Concepto:** explicación`.
- Cero emojis.
- Tipado estricto (exportar interfaces).

### 5.1. Esqueleto tipado

```ts
export interface NavLink { label: string; href: string; }

export const site = {
  name: "Customerup",
  tagline: "Data platform for customer engagement",
  email: "hello@customerup.com",
  phone: "+1 (555) 010-2024",
  address: "San José, Costa Rica",
};

export const navLinks: NavLink[] = [
  { label: "About us", href: "#about" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact us", href: "#contact" },
];

export const topBar = {
  news: "Latest news — new feature on our platform.",
  cta: "Read more",
};

export const hero = {
  title: "Turn customer data into engagement that lasts",
  lead: "Customerup unifies your data streams, activation and analytics so every message reaches the right person at the right time.",
  primaryCta: "Get started",
  secondaryCta: "Book demo",
  showreel: "Watch our showreel",
  floatingCard: {
    title: "Latest product campaign",
    channels: [
      { label: "Email", value: 78 },
      { label: "Push", value: 62 },
      { label: "In-app", value: 45 },
    ],
  },
};

export const metrics = [
  { value: "99.55%", label: "Platform uptime" },
  { value: "34B+", label: "Messages sent in 2024" },
  { value: "5.4B+", label: "Webhooks sent in 2024" },
  { value: "24/5", label: "Global support coverage" },
];

export const activation = {
  kicker: "Data and activation",
  title: "One platform for data, messaging and measurement",
  body: "Bring events, profiles and channels together so teams can build journeys without stitching tools.",
  cards: [
    { title: "Data journey", description: "Track every event from first touch to conversion across channels." },
    { title: "Data streams", description: "Ingest real-time events with reliable delivery and replay." },
    { title: "Package info", description: "Manage plans, limits and usage from a single view." },
  ],
};

export const whyChooseUs = {
  kicker: "Why choose us",
  title: "We help companies grow with data they can trust",
  body: "Reliable pipelines, clear metrics and fast iteration for teams that ship every week.",
  primaryCta: "Get a quote",
  secondaryCta: "See how it works",
  bento: {
    alignedStrategy: { title: "Aligned strategy", items: ["Practical", "Transparent", "Scalable"] },
    provenGrowth: { title: "Proven growth", value: "4X", caption: "Revenue influenced by data-led journeys" },
    fasterExecution: {
      title: "Faster execution",
      phases: [
        { label: "Week 1", value: 1 },
        { label: "Week 17", value: 17 },
        { label: "Week 18", value: 0.2 },
      ],
    },
    darkCard: { title: "Messaging that performs", body: "Send the right message on the right channel with live data." },
  },
  portraitAlt: "Team member reviewing data on a laptop",
};

export const services = {
  kicker: "What we do",
  title: "Our services",
  intro: "From pipeline design to activation, we cover the full data lifecycle.",
  items: [
    { title: "Strategic growth consulting", description: "Roadmaps that connect data investments to revenue." },
    { title: "Data pipeline engineering", description: "Reliable ingestion, transformation and delivery at scale." },
    { title: "Activation and messaging", description: "Journeys across email, push and in-app channels." },
    { title: "Analytics and reporting", description: "Dashboards and metrics your whole team can read." },
  ],
};

export const splitChart = {
  title: "Spot the drop before it costs you",
  body: "Compare ingest volume against query peaks across the day and act on the gap.",
  callouts: ["Problem", "Midday dip", "Evening spike"],
  markers: ["6 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"],
};

export const caseStudies = {
  title: "Real work",
  body: "Teams that moved from fragmented data to one clear picture.",
  items: [
    { title: "Retail chain", result: "2.4x faster reporting", description: "Unified events from 12 stores into one warehouse." },
    { title: "Fintech app", result: "38% lift in activation", description: "Triggered onboarding journeys from live product events." },
  ],
};

export const processSteps = {
  title: "Here is what to expect",
  steps: [
    { number: "01", title: "Discovery and goals", body: "We map your data sources, metrics and team needs." },
    { number: "02", title: "Build and connect", body: "Pipelines, profiles and channels go live in weeks." },
    { number: "03", title: "Measure and improve", body: "Dashboards and experiments keep performance honest." },
  ],
};

export const insights = {
  kicker: "Insights",
  title: "Fresh ideas, proven strategies",
  viewMore: "View more",
  articles: [
    { chip: "Demand generation", title: "How to read a funnel without fooling yourself", author: "Xenia Lein", readTime: "5 min read", imageAlt: "Two colleagues discussing a campaign" },
    { chip: "Demand generation", title: "The quiet cost of duplicate events", author: "Xenia Lein", readTime: "4 min read", imageAlt: "Two colleagues reviewing data" },
    { chip: "Demand generation", title: "When to send the second message", author: "Xenia Lein", readTime: "6 min read", imageAlt: "Team planning content" },
  ],
};

export const faq = {
  title: "Frequently asked questions",
  items: [
    { q: "How long does onboarding take?", a: "Most teams are live within two to four weeks, depending on data sources." },
    { q: "Do you support our existing tools?", a: "Yes. We connect to common warehouses, CRMs and messaging providers." },
    { q: "Is my data secure?", a: "Data is encrypted in transit and at rest, with access controls per team." },
    { q: "Can we start small?", a: "Yes. Begin with one journey and expand as results land." },
    { q: "Who owns the data?", a: "You do. Exports and full access are available at any time." },
    { q: "What support is included?", a: "Global support coverage around the clock on business days." },
  ],
};

export const footer = {
  designBy: "Design by — Customerup",
  contact: "hello@customerup.com",
};
```

**Notas de fidelidad sobre el copy:** el título del hero en la referencia está en mayúsculas ("POWER UP YOUR CUSTOMER ENGAGEMENT…"); se sustituye por sentence case y se evita la palabra prohibida "potencia" (y su equivalente "power up"), cumpliendo `AGENTS.md`. Los valores de métricas (`99.55%`, `34B+`, etc.) se mantienen como observados y se adaptan a Customerup (plataforma de datos).

---

## 6. Componentes: responsabilidades y contratos

| Componente | Responsabilidad | Notas de implementación |
|---|---|---|
| `TopBar` | Noticia a la izquierda + teléfono/dirección a la derecha. | Fondo oscuro o lima según referencia; texto pequeño; sentence case. |
| `Navbar` | Logo SVG + nav links + "Sign in" + botón pill "Start trial". | Fijo/sticky; menú hamburguesa en móvil (icono SVG). |
| `Hero` | Fondo lima eléctrico, título tracking-tight, lead, dos CTAs, motivo geométrico de cuadrados, tarjeta flotante "Latest product campaign", imagen editorial con overlay de líneas, botón "Watch our showreel". | Imagen F1 con `loading="eager"`, `fetchpriority="high"`. Motivo G1 en SVG/CSS. |
| `MetricsStrip` | 4 métricas en fila (`tabular-nums`). | Grid 4 cols desktop → 2x2 tablet → 1 col móvil. Sin `shadow-md`. |
| `ActivationCards` | Kicker + título + párrafo + 3 tarjetas (Data journey/streams/package info). | **Sin fondos pastel**: tarjetas blancas con borde `1px` o texto sobre fondo blanco con divisorias. Iconos SVG sin caja de color. |
| `WhyChooseUsBento` | Kicker + título + sub-bloque derecho + bento mixto (pixel grid, retrato F2, "Proven growth 4X" con círculos, barra "Faster execution", tarjeta oscura). | Grid desigual (no `grid-cols-3` idéntico). Círculos concéntricos en SVG. |
| `SplitChart` | Contenedor redondeado dividido (blanco/oscuro), callouts lima, curva SVG, marcadores de tiempo, skyline F5 al fondo. | Curva G5 en SVG con `viewBox` responsive. |
| `ServicesDarkBlock` | Panel oscuro con foto F3 a la izquierda y 4 tarjetas con flecha externa (1 lima, 3 blancas). | Grid 2x2 desktop → 1 col móvil. |
| `CaseStudies` | Casos de éxito con foto F6 y resultados. | Layout editorial, divisorias `1px`. |
| `ProcessSteps` | 3 pasos numerados `01/02/03`. | Números grandes, texto a la derecha. |
| `Insights` | Kicker + título + "View more" + tarjetas de artículo (F4) con chip + autor + tiempo de lectura. | Scroll horizontal o grid responsivo. |
| `FAQAccordion` | Acordeón con chevron, 6 preguntas. | Estado local `useState`; accesible con `aria-expanded`, teclado. |
| `Footer` | "Design by — Customerup" izquierda + contacto derecha. | Texto pequeño, sentence case. |
| `icons/*` | SVG inline, `aria-hidden="true"` cuando decorativo. | Sin cajas con fondo pastel; `currentColor` para color. |

**Componentes de icono (9):** `LogoMark`, `KickerChip`, `ArrowUpRight`, `PlayCircle`, `ChevronDown`, `MenuIcon`, `DataJourneyIcon`, `DataStreamsIcon`, `PackageInfoIcon`. Todos en SVG inline, sin emojis, sin raster.

---

## 7. Orden de implementación (fases)

Ejecutar en este orden estricto. Cada fase debe compilar (`tsc -b`) antes de pasar a la siguiente.

### Fase 0 — Scaffolding (sin UI)
1. Crear `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`.
2. Crear `src/styles/tokens.css`, `src/index.css`.
3. Crear `src/data/content.ts` con el contenido tipado (sección 5).
4. Crear `src/App.tsx` con imports (componentes aún no existen → crear stubs vacíos para que compile).
5. `npm install` y verificar `npm run dev` levanta sin errores.

### Fase 1 — Shell global
6. `TopBar.tsx`
7. `Navbar.tsx` (incluye menú móvil con `MenuIcon`)
8. `Footer.tsx`

### Fase 2 — Hero y métricas
9. Iconos: `LogoMark`, `KickerChip`, `ArrowUpRight`, `PlayCircle`.
10. `Hero.tsx` (motivo geométrico G1 + tarjeta flotante + imagen F1).
11. `MetricsStrip.tsx`.

### Fase 3 — Activación y por qué elegirnos
12. Iconos: `DataJourneyIcon`, `DataStreamsIcon`, `PackageInfoIcon`.
13. `ActivationCards.tsx`.
14. `WhyChooseUsBento.tsx` (bento + retrato F2 + círculos 4X + barra fases).

### Fase 4 — Visualización y servicios
15. `SplitChart.tsx` (curva SVG + skyline F5).
16. `ServicesDarkBlock.tsx` (foto F3 + 4 tarjetas).

### Fase 5 — Casos, proceso, insights
17. `CaseStudies.tsx` (foto F6).
18. `ProcessSteps.tsx`.
19. `Insights.tsx` (foto F4 en tarjetas).

### Fase 6 — FAQ e integración final
20. Icono `ChevronDown.tsx`.
21. `FAQAccordion.tsx`.
22. Integrar todo en `App.tsx` (ya importado); verificar orden de secciones.
23. Pulido responsive y accesibilidad.

### Fase 7 — Assets (ver sección 8)
24. Generar 6 fotos con Recraft (42 créditos) y colocar en `public/images/`.
25. Optimizar (webp, dimensiones, compresión) y actualizar `alt` en componentes.

### Fase 8 — Verificación (ver sección 10)
26. Playwright en 3 viewports.
27. Quality Gate.

---

## 8. Plan de assets (Recraft `recraftv4_1_flash_v2`)

**Modelo obligatorio:** `recraftv4_1_flash_v2`. **Coste:** 7 créditos por foto. **Total:** 6 fotos × 7 = **42 créditos**.

| # | Archivo destino | Uso | Aspect ratio | Dimensiones sugeridas | Focal point | Créditos |
|---|---|---|---|---|---|---:|
| F1 | `public/images/hero-woman-phone.webp` | Hero (imagen principal derecha) | 16:9 | 1600×900 | Rostro y manos con teléfono | 7 |
| F2 | `public/images/portrait-man-glasses.webp` | Why choose us — retrato editorial | 3:4 | 900×1200 | Rostro con gafas, mirada al frente | 7 |
| F3 | `public/images/team-office-modern.webp` | Our services — apoyo visual izquierda | 3:2 | 1200×800 | Área de trabajo central, personas | 7 |
| F4 | `public/images/two-people-conversation.webp` | Insights — tarjetas de artículo | 4:3 | 1200×900 | Rostros y torsos | 7 |
| F5 | `public/images/city-skyline-dusk.webp` | SplitChart — fondo inferior | 16:9 | 1600×900 | Edificios del skyline, parte inferior | 7 |
| F6 | `public/images/two-people-collaborating.webp` | Case studies / real work | 3:2 | 1200×800 | Personas y mesa de trabajo | 7 |

**Reglas de generación:**

- Estilo: fotografía editorial realista, luz natural/cálida, sin texto incrustado, sin logos, sin marcas de agua.
- Prohibido usar screenshot completo como fondo; las fotos son recursos independientes.
- Formato final: `.webp` (convertir si el generador entrega `.png`), calidad 80–85, dimensiones exactas de la tabla.
- Atributos `width`/`height` (o `aspect-ratio`) en `<img>` para evitar CLS.
- `loading="lazy"` en todas excepto F1 (`loading="eager"`, `fetchpriority="high"`).
- `alt` descriptivo en sentence case (ej. `alt="Woman on a phone call in a modern office"`).
- Generar en este orden para desbloquear layout: F1 → F3 → F2 → F4 → F6 → F5.

**Gráficos en código (0 créditos, SVG/CSS):** G1 motivo geométrico diagonal; G2 círculos concéntricos 4X; G3 pixel grid; G4 barra segmentada faster execution; G5 curva SplitChart; G6 divisorias `1px` y callouts.

---

## 9. Reglas estrictas de fidelidad y Anti-AI Slop

### 9.1. Fidelidad (innegociables)

1. La referencia en `references/` es la fuente de verdad. No inventar secciones ni elementos.
2. Cero emojis en la UI.
3. Toda iconografía en SVG inline (`src/components/icons/`). Cero iconos raster.
4. Cero screenshots completos como fondo.
5. Distinguir mentalmente `observed` / `inferred` / `substituted` (ver `visual-analysis.md` §4) al tomar decisiones de implementación.

### 9.2. Sentence case (obligatorio)

- Títulos, subtítulos, botones, etiquetas, menús, listas: mayúscula inicial únicamente en la primera palabra.
- Prohibido Title Case anglosajón ("Conexión Directa Con La Banca", "Control Total Para Finanzas").
- Excepciones: nombres propios reales, instituciones oficiales, siglas (`Customerup`, `San José`, `Banco Nacional`, `SINPE`, `MONEX`, `BCCR`, `BAC`, `BCR`, `SUGEF`, `Hacienda`).
- Kickers en sentence case (prohibido kicker en mayúsculas encima del título).

### 9.3. Anti-AI Slop (prohibiciones explícitas)

1. **Cero clichés SaaS:** sin kickers/subtítulos en mayúsculas sobre títulos; sin `border-l-4` de color en tarjetas; sin iconos encerrados en cajas con fondos pastel.
2. **Cero efectos "Tech" genéricos:** sin degradados morados/azules, sin glows neón de fondo, sin puntos decorativos pulsantes.
3. **Layout editorial:** evitar `grid-cols-3` de tarjetas idénticas; sin exceso de bordes ni `shadow-md`; priorizar espacio en blanco y divisorias sutiles de `1px`.
4. **Tipografía con carácter:** alto contraste entre títulos grandes (`tracking-tight`) y cuerpo limpio, respetando sentence case.
5. **Copywriting humano:** prohibido `potencia`, `eleva`, `revoluciona`, `sin fisuras`; prohibido formato `**Concepto:** explicación`.

### 9.4. Checks automáticos (ejecutar en `src/`)

```bash
# Deben devolver 0 resultados
grep -rn "border-l-4" src/
grep -rn "shadow-md\|shadow-lg" src/
grep -rn "potencia\|eleva\|revoluciona\|sin fisuras" src/
grep -rn "grid-cols-3" src/   # revisar manualmente: solo permitido si no son tarjetas idénticas
# Emojis (rangos unicode) — debe estar vacío
grep -rnP "[\x{1F300}-\x{1F9FF}\x{2600}-\x{27BF}]" src/
```

Adicional (manual): revisar que ningún icono esté envuelto en un contenedor con fondo pastel (clases `bg-purple-*`, `bg-blue-*`, `bg-pink-*`, `bg-*-100`/`200`/`300` aplicadas a la caja del icono).

---

## 10. Verificación Playwright y Quality Gate

### 10.1. Viewports obligatorios

- `1440×900` (desktop)
- `768×1024` (tablet)
- `390×844` (mobile)

### 10.2. Checklist por viewport

Para cada viewport, capturar screenshot completo y verificar:

1. **Carga:** página renderiza sin errores de consola ni de red (404 de assets).
2. **Sin scroll horizontal:** `document.documentElement.scrollWidth <= window.innerWidth`.
3. **TopBar + Navbar:** visibles arriba; en `390×844` el menú colapsa a hamburguesa y se abre/cierra.
4. **Hero:** título en sentence case, CTAs visibles y clicables, imagen F1 carga, sin CLS visible.
5. **Métricas:** 4 cols (`1440`), 2x2 (`768`), 1 col (`390`); números con `tabular-nums`.
6. **Activation cards:** sin fondos pastel; bordes `1px` o espacio en blanco; iconos SVG sin caja de color.
7. **WhyChooseUs bento:** grid desigual; tarjeta "Proven growth" con 4X y círculos; barra de fases con etiquetas.
8. **SplitChart:** contenedor redondeado dividido; curva visible; callouts; skyline F5 carga.
9. **Services:** 2x2 (`1440`/`768`), 1 col (`390`); flecha externa en cada tarjeta; una tarjeta lima, tres blancas.
10. **CaseStudies + ProcessSteps:** imágenes F6/F4 cargan; pasos `01/02/03`.
11. **Insights:** tarjetas con chip "Demand generation", autor y tiempo de lectura; imagen F4.
12. **FAQ:** acordeón abre/cierra; chevron rota; solo una pregunta abierta a la vez (o múltiples, pero consistente).
13. **Footer:** "Design by — Customerup" a la izquierda, contacto a la derecha; texto pequeño.
14. **Sentence case:** revisar todos los textos visibles (títulos, botones, etiquetas, menús, listas).
15. **Anti-AI Slop:** sin kickers en mayúsculas, sin `border-l-4`, sin iconos en cajas pastel, sin emojis, sin degradados morados/azules, sin glows, sin puntos pulsantes, sin `shadow-md`, sin `grid-cols-3` de tarjetas idénticas.

### 10.3. Pruebas de interacción (Playwright)

- Click en cada nav link → scroll suave a la sección (si se implementa) o al menos no rompe.
- Click "Start trial", "Get started", "Book demo", "Get a quote", "See how it works", "View more" → no errores de consola.
- FAQ: click en cada pregunta → se expande/colapsa; teclado (Enter/Espacio) funciona; foco visible.
- Navbar móvil: abrir/cerrar menú; foco atrapado mientras está abierto (recomendado).
- `prefers-reduced-motion`: con la media query activa, las animaciones se desactivan.

### 10.4. Quality Gate (debe pasar todo)

| Criterio | Umbral | Comando / método |
|---|---|---|
| Typecheck | 0 errores | `npm run typecheck` |
| Build | éxito | `npm run build` |
| Consola (dev) | 0 errores | Playwright `console` listener |
| Red (assets) | 0 fallos 404 | Playwright `requestfailed` / network |
| Scroll horizontal | 0 en los 3 viewports | Playwright |
| Lighthouse Performance | ≥ 90 | Lighthouse CLI (opcional pero recomendado) |
| Lighthouse Accessibility | ≥ 95 | Lighthouse CLI |
| Lighthouse Best Practices | ≥ 90 | Lighthouse CLI |
| Lighthouse SEO | ≥ 90 | Lighthouse CLI |
| CLS | < 0.1 | Lighthouse / Web Vitals |
| Imágenes | webp, < 200 KB c/u, con width/height | inspección manual |
| Accesibilidad teclado | todos los interactivos enfocables con foco visible | Playwright + tab |
| Contraste | AA en texto sobre lima (oscuro) y sobre oscuro (blanco) | Lighthouse / axe |

**Regla de parada:** si algún criterio falla, no declarar fidelidad. El implementador corrige y re-ejecuta. Límite por defecto: 3 rondas visuales.

---

## 11. Accesibilidad, SEO y performance

- **Semántica:** `<header>`, `<nav>`, `<main>`, `<section>` con `aria-labelledby` apuntando al título de cada sección; `<footer>`.
- **Imágenes:** `alt` descriptivo en sentence case; decorativas con `alt=""` y `aria-hidden="true"`.
- **Iconos SVG:** `aria-hidden="true"` cuando son decorativos; si transmiten información, añadir `<title>` y `role="img"`.
- **FAQ:** `button` con `aria-expanded`, `aria-controls`; panel con `role="region"`.
- **Navbar móvil:** `aria-label="Main navigation"`, menú con `aria-expanded`.
- **Foco:** anillo visible (definido en `index.css`); no eliminar `outline`.
- **Reduced motion:** respetar `prefers-reduced-motion` (definido en `index.css`).
- **SEO:** `<title>` y `<meta name="description">` en `index.html`; un solo `<h1>` (hero); jerarquía `h2` por sección, `h3` por tarjeta.
- **Performance:** fuentes con `display=swap`; imagen hero `eager` + `fetchpriority="high"`; resto `lazy`; evitar librerías pesadas; sin imágenes sin dimensiones.

---

## 12. Riesgos y notas

- **Fuente tipográfica exacta desconocida** (`inferred` en `design-system.md`). Se usa `Plus Jakarta Sans` con fallback `Inter`. Si el QA visual detecta diferencia notable, ajustar en `tokens.css` (`--font-sans`) sin tocar componentes.
- **Colores aproximados** (`observed`/`substituted`). Si el QA detecta desviación de tono del lima/oscuro, ajustar tokens.
- **Copy del hero:** sustituido para evitar palabra prohibida "potencia" (equivalente a "power up" del ref). Si el usuario quiere otro título, editarlo solo en `content.ts`.
- **Métricas:** valores observados adaptados a Customerup; validar con el usuario si son las cifras definitivas.
- **No modificar archivos desde este agente:** este plan es solo lectura. Toda escritura la realiza `Gemini 4 Hydrogen`.

---

**Fin del plan.** Contenido listo para ser guardado en `docs/design/implementation-plan.md` por el coordinador; no se realizó escritura de archivo desde este sub-agente.
# Design System — DataWebsite (landing page)

**Fuente de verdad:** `projects/DataWebsite/references/` (5 capturas) + `projects/DataWebsite/AGENTS.md`  
**Entregable:** `docs/design/design-system.md`  
**Etiquetado de datos:** `observed` = verificado visualmente en las referencias / `inferred` = deducido por coherencia de diseño / `substituted` = valor propuesto por ausencia de dato exacto.

---

## 1. Paleta de colores (tokens CSS semánticos)

| Token | Valor aprox. | Uso | Procedencia |
|-------|--------------|-----|-------------|
| `--color-bg-electric-lime` | `#D7FC6E` / `#C4F83A` (lima eléctrico brillante) | Hero, tarjetas de acento (`Strategic Growth Consulting`, `Proven Growth`, `Data Journey`), botones de acento | `observed` |
| `--color-bg-dark-forest` | `#0B1C18` / `#0E2018` (verde bosque oscuro) | Fondos de paneles oscuros (`Our Services`, `SplitChart` lado derecho, tarjetas oscuras de bento/proceso) | `observed` |
| `--color-bg-offwhite` | `#F5F6F3` / `#F7F9F4` (off-white cálido) | Fondo principal de página, fondo de sección `We help companies grow` | `observed` |
| `--color-card-white` | `#FFFFFF` | Tarjetas blancas con borde `1px` | `observed` |
| `--color-card-lavender` | `#E9EEF5` (lavanda/gris-azulado muy suave) | Card `Data Streams` | `observed` |
| `--color-card-mint` | `#DCEBE8` (menta muy suave) | Card `Package Info` | `observed` |
| `--color-border` | `#E4E4E7` / `#D1D5DB` | Bordes `1px` de tarjetas, divisores sutiles | `observed` |
| `--color-text-dark` | `#111827` | Títulos, cuerpo principal sobre fondos claros | `observed` |
| `--color-text-muted` | `#4B5563` | Descripciones, etiquetas pequeñas, metadatos | `observed` |
| `--color-text-on-dark` | `#FFFFFF` | Texto sobre fondos oscuros (`dark-forest`) | `observed` |
| `--color-text-on-lime` | `#111827` | Texto sobre fondo lima eléctrico | `observed` |
| `--color-accent-border` | `#C4F83A` | Borde de acento en botones secundarios | `observed` |

**Regla Anti-AI Slop aplicada:** sin degradados morados/azules, sin glows neón, sin puntos decorativos pulsantes.

---

## 2. Sistema tipográfico

| Token | Valor | Uso | Procedencia |
|-------|-------|-----|-------------|
| `--font-sans` | `Plus Jakarta Sans`, `Inter`, sans-serif | Cuerpo y UI general | `substituted` |
| `--text-display` | `clamp(2.5rem, 4.5vw, 4rem)`, `line-height: 1.05–1.15`, `tracking-tight` | Títulos principales de hero y secciones clave | `observed` |
| `--text-h2` | `clamp(1.875rem, 3vw, 2.5rem)`, `line-height: 1.2`, `tracking-tight` | Títulos de sección | `inferred` |
| `--text-h3` | `1.25rem–1.5rem`, `line-height: 1.3` | Títulos de tarjetas / componentes | `inferred` |
| `--text-body` | `1rem`, `line-height: 1.5–1.6` | Párrafos, descripciones | `observed` |
| `--text-caption` | `0.75rem–0.875rem`, `line-height: 1.4` | Etiquetas, metadatos (`5 min read`, `Platform uptime`) | `observed` |
| `--text-tabular-nums` | `font-variant-numeric: tabular-nums` | Métricas numéricas (`99.55%`, `34B+`, `5.4B+`, `24/5`, `2M+ MWh`, `4X`) | `observed` |

**Sentence case:** Todos los textos de interfaz usan mayúscula inicial únicamente en la primera palabra, salvo nombres propios/siglas.

---

## 3. Radios, sombras, espaciado, contenedores y breakpoints

- Tarjetas principales: `12px–16px`
- Botones: `6px–8px` (o pill en navbar `Start trial` / `Get started`)
- Sombras: nulas por defecto; bordes `1px` y espacio en blanco
- Contenedor: `max-width: 1200px` centrado, padding `24px–32px` desktop, `16px–20px` mobile
- Breakpoints: `390×844` (mobile), `768×1024` (tablet), `1440×900` (desktop)

---

## 4. Mapa de componentes reutilizables

1. **Navbar** — Logo, enlaces (`About us`, `Platform`, `Pricing`, `Blog`, `Contact us`), `Sign in` y `Start trial`
2. **Hero** — Fondo lima eléctrico, titular `tracking-tight`, descripción, CTAs (`Get started`, `Book demo`), motivo geométrico diagonal, fotografía editorial + tarjeta flotante `Latest product campaign`
3. **MetricStrip & ActivationCards** — Fila de 4 métricas (`99.55%`, `34B+`, `5.4B+`, `24/5`) + 3 tarjetas (`Data journey`, `Data streams`, `Package info`)
4. **WhyChooseUsBento** — Bento grid (`Aligned strategy` pixel grid, retrato editorial, `Proven growth 4X` círculos concéntricos, `Faster execution` barra de timeline, `Practical / Transparent / Scalable` pills, tarjeta oscura de marca)
5. **SplitChart** — Sección dividida claro/oscuro con curva de datos, tarjetas `Midday dip` / `Evening spike` y silueta urbana inferior
6. **ServicesDarkBlock** — Bloque `#0B1C18` con foto de estudio a la izquierda y 4 tarjetas de servicio a la derecha
7. **CaseStudies & ProcessSteps** — Casos de éxito y pasos `01`, `02`, `03` (`Discovery & goals`)
8. **Insights & FAQAccordion & Footer** — Artículos editoriales, acordeón FAQ interactivo (`01`–`06`) y footer limpio

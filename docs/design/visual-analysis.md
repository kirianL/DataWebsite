# Visual Analysis — Landing Customerup (plataforma de datos)

> **Informe generado por el sub-agente `visual-analyst` (modo solo lectura).** No se ha modificado ni creado ningún archivo del proyecto. El contenido está listo para persistirse en `docs/design/visual-analysis.md`.

---

## 0. Metodología y fuentes

**Referencias analizadas** (5 imágenes en `projects/DataWebsite/references/`):

| # | Archivo | Rol en el informe |
|---|---------|-------------------|
| 1 | `50688775391_s_whatsapp_net-3AFE35E200DD13A13EC1.jpg` | Landing base de **Customerup** (hero, navbar, stats, tarjetas Data Journey/Streams/Package Info). |
| 2 | `50688775391_s_whatsapp_net-3A71EE6C14816E5A2AFF.jpg` | Sección "Why choose us" / estrategias, split de texto-foto-cards, barra de ejecución. |
| 3 | `50688775391_s_whatsapp_net-3AC16C3C11CA49DBE14C.jpg` | Sección "Our Services" (grid 2×2 de tarjetas con flecha externa). |
| 4 | `50688775391_s_whatsapp_net-3AF8B5313FF41A8CADE1.jpg` | Panel dividido (split screen) con visualización de línea y callouts. |
| 5 | `50688775391_s_whatsapp_net-3AB0B9CC8FE6EB52763E.jpg` | Página compuesta: "Real Work", "Here's what to expect", "Insights", FAQ, "Our Services" repetido, footer. |

**Leyenda de etiquetas aplicada a cada decisión:**

- `observed`: directamente visible en la referencia.
- `inferred`: deducción de proporción, jerarquía o relación espacial a partir de lo observable.
- `substituted`: adaptación necesaria para Customerup (plataforma de datos) que difiere de la referencia original (agencia de marketing / energía), aplicando las reglas de `AGENTS.md`.

---

## 1. Arquitectura de secciones (top → bottom)

La landing de **Customerup** se construye integrando las 5 referencias en una sola arquitectura editorial, de arriba a abajo:

| # | Sección | Aporta referencia | Decisión para Customerup | Etiqueta |
|---|---------|-------------------|--------------------------|----------|
| 1 | **Top bar** (noticia + teléfono + dirección) | Ref 1 | Conservar: "LATEST NEWS — New feature on our platform." a la izquierda; contacto a la derecha. | `observed` |
| 2 | **Header / navegación** | Ref 1 | Logo "Customerup" (icono de cuadrícula de cuadrados oscuros) + nav "About Us, Platform, Pricing, Blog, Contact Us" + "Sign in" + botón "Start trial". | `observed` |
| 3 | **Hero** | Ref 1 | Fondo verde lima. Título grande, lead, dos CTAs ("Get started »", "Book demo"), motivo geométrico de cuadrados, tarjeta flotante "Latest product campaign", imagen de persona con teléfono, overlay de líneas finas, "Watch our showreel". | `observed` (estructura); `substituted` (título en mayúsculas del ref → sentence case obligatorio, ver §3) |
| 4 | **Métricas de plataforma** (4 big numbers) | Ref 1 | "99.55% Platform uptime", "34B+ Messages sent in 2024", "5.4B+ Webhooks sent in 2024", "24/5 Global support coverage". Adaptar copy a métricas de datos de Customerup. | `observed` (geometría); `substituted` (copy) |
| 5 | **Data + Activation** (texto + 3 tarjetas) | Ref 1 | Texto de plataforma unificada + tarjetas "Data Journey", "Data Streams", "Package Info". **Sustituir fondos pastel** (prohibidos por AGENTS.md) por tratamiento editorial sin caja de color pastel. | `observed` (estructura); `substituted` (acabado de tarjetas) |
| 6 | **Why choose us / Estrategias** | Ref 2 | Kicker sentence case + título grande + sub-bloque derecho + grid mixto (tarjeta de estrategia, foto, card "Proven Growth" con "4X", card "Faster Execution" con barra de fases, card oscuro de mensajería). | `observed` (layout); `substituted` (copy a plataforma de datos) |
| 7 | **Our Services** (grid 2×2) | Ref 3 | Kicker "What we do" + título + 4 tarjetas con flecha externa superior derecha: una en verde lima (ej. "Strategic Growth Consulting") y tres blancas. Adaptar nombres a servicios de datos. | `observed` (estructura); `substituted` (copy) |
| 8 | **Visualización dividida: problema vs pico** | Ref 4 | Contenedor redondeado dividido verticalmente (izq. blanco / der. oscuro), callouts de lima, línea de tendencia, marcadores de tiempo, skyline de fondo oscurecida. Contenido de energía → sustituir por métrica de datos (ej. ingest vs pico de consulta). | `observed` (geometría); `substituted` (contenido) |
| 9 | **Insights + FAQ** | Ref 5 | Kicker "Insights", título "Fresh Ideas, Proven Strategies", "View More", tarjetas de artículos con chip "Demand Generation" y autor/lectura. FAQ estilo acordeón (Q1…Q6 con chevron). | `observed` |
| 10 | **Footer** | Refs 2, 3, 5 | "Design By — Customerup" (izquierda) y correo/contacto (derecha), texto pequeño, mayúsculas iniciales solo en la primera palabra. | `observed` (estructura); `substituted` (marca) |

**Reglas de layout editorial aplicadas (AGENTS.md):**
- No usar `grid-cols-3` de tarjetas idénticas; las 3 tarjetas de Data Journey/Streams/Package Info se resuelven con espacio en blanco y divisoras sutiles de 1px, no con cajas idénticas con sombra.
- Cero `border-l-4` de color en tarjetas.
- Cero iconos encerrados en cajas con fondos pastel.
- Cero emojis en la UI.

---

## 2. Geometría, proporciones, grillas, bordes, radios, espaciados y jerarquía visual

### 2.1. Hero (ref 1)
- **Fondo:** verde lima/chartreuse (observed; aproximación visual #D6FC7A–#E7FF7A).
- **Contenedor:** ancho completo, sección por debajo del header fijo. Padding lateral generoso (inferred ≈ 6–8 % del ancho).
- **Título:** bloque grande a la izquierda, tracking-tight, varias líneas, alineado a la izquierda (observed).
- **Motivo geométrico:** grupo de cuadrados oscuros con radios leves, dispuesto en diagonal/checkerboard a la derecha del título (observed).
- **Tarjeta flotante:** blanca, esquinas redondeadas (inferred radius ≈ 12–16 px), flotando sobre el fondo a la derecha, con sombra muy sutil o sin sombra (inferred: preferir borde sutil o ninguno). Barras de progreso horizontales finas (1–2 px) verdes (observed).
- **Imagen hero:** mujer con teléfono, planta Monstera, ventana con ladrillo (observed). Overlay de líneas blancas finas estilo construcción/arquitectura sobre la imagen (observed).
- **Botón "Watch our showreel":** texto pequeño + círculo con ícono de play (observed), posicionado a la derecha inferior de la imagen.
- **Jerarquía:** Título > lead > CTAs principales > motivo geométrico > tarjeta flotante > imagen > showreel.

### 2.2. Métricas (ref 1)
- **Disposición:** 4 columnas equitativas (inferred: grid 1×4 en escritorio, apilado en móvil).
- **Número:** tipografía muy grande, peso semibold/bold, alineado izquierda (observed).
- **Etiqueta:** texto pequeño, gris, directamente debajo del número, alineado izquierda (observed).
- **Separación entre columnas:** espacio en blanco amplio (inferred ≈ 4–6 rem).

### 2.3. Data + Activation (ref 1)
- **Kicker:** etiqueta pequeña con chip cuadrado a la izquierda ("SCALE, FLEX, AND INNOVATE" / "DATA + ACTIVATION") (observed).
- **Texto:** párrafo de 2–3 líneas, ancho limitado (inferred ≈ 45–60 caracteres por línea), alineado izquierda.
- **Tarjetas:** 3 tarjetas con fondo pastel en el ref (verde lima, lila, azul claro) (observed). **Substituido:** eliminar fondos pastel; usar tarjetas blancas con borde sutil de 1px o texto sobre fondo blanco con divisorias horizontales finas (cumple AGENTS.md).
- **Icono de tarjeta:** cuadrado oscuro con patrón de 4 cuadrados (observed). **Substituido:** ícono SVG sin caja de color pastel.
- **Título de tarjeta:** sentence case, negrita mediana (observed). **Descripción:** 1–2 líneas pequeñas.

### 2.4. Why choose us / Estrategias (ref 2)
- **Fondo sección:** verde oscuro casi negro exterior; panel interior blanco/clarito (observed).
- **Kicker:** "Why choose us" con chip de cuadrados a la izquierda, sentence case (observed).
- **Título:** grande, negro, alineado izquierda (observed).
- **Sub-bloque derecho:** texto de 2–3 líneas alineado a la derecha + CTA "Get a Quote" (botón negro relleno) + botón secundario verde lima con flecha (observed).
- **Grid mixto:** columnas desiguales (inferred: izquierda ≈ 25 %, centro-foto ≈ 30 %, derecha ≈ 45 %). No es un grid de 3 tarjetas idénticas.
- **Card "Proven Growth":** fondo verde lima, número "4X" enorme, círculos concéntricos finos con cifras monetarias ($56.15B / $21.88B) (observed).
- **Card "Faster Execution":** blanco, barra de progreso horizontal segmentada con fases y etiquetas de tiempo abajo ("1 Week", "17 Weeks", "0.2 Weeks") (observed).
- **Card oscuro (derecha inferior):** fondo verde oscuro, texto blanco, chip cuadrado de lima arriba (observed).

### 2.5. Our Services (ref 3)
- **Fondo:** verde lima exterior; panel central verde oscuro (observed).
- **Kicker:** "What we do" con chip cuadrado de lima (observed).
- **Título:** "Our Services", blanco, grande (observed).
- **Grid 2×2:** 4 tarjetas, todas con ícono de flecha externa en un cuadrado negro arriba a la derecha (observed). Tarjeta 1 en verde lima; tarjetas 2–4 blancas con borde muy sutil o sin borde (observed/inferred).
- **Radio de tarjetas:** esquinas redondeadas leves (inferred ≈ 8–12 px).
- **Imagen de apoyo:** oficina con personas y plantas a la izquierda del grid (observed).

### 2.6. Split panel: problema vs pico (ref 4)
- **Contenedor:** redondeado exterior (inferred radius ≈ 20–24 px), dividido verticalmente en dos mitades iguales (izq. blanco, der. verde oscuro) (observed).
- **Líneas divisorias verticales finas:** dentro del contenedor, separando columnas de tiempo (observed).
- **Callouts:** chips redondeados de verde lima ("Problem", "Midday dip", "Evening spike") con texto blanco o negro según fondo (observed).
- **Línea de curva:** trazo verde grueso que sube y baja, marcadores de tiempo (6AM, 12PM, 3PM, 6PM, 9PM, 12AM) y puntos (sol, reloj) (observed).
- **Skyline:** imagen de ciudad oscurecida al fondo inferior (observed).
- **Substituido:** contenido de energía → métrica de datos de Customerup (volumen de ingest, pico de consultas, etc.).

### 2.7. Insights + FAQ (ref 5)
- **Fondo:** verde lima con rejilla (grid) muy sutil de fondo (observed).
- **Kicker "Insights":** pequeño con icono (observed).
- **Título:** "Fresh Ideas, Proven Strategies", grande, dos líneas (observed).
- **Botón "View More":** negro relleno con flecha verde lima, alineado a la derecha (observed).
- **Tarjetas de artículo:** fila horizontal con desplazamiento (inferred: scroll o grid responsivo), cada una con foto de personas, chip verde "Demand Generation", título, autor ("Xenia Lein") y "5 min read" (observed).
- **FAQ:** encabezado "Frequently Asked Question" + lista de preguntas (Q1…Q6) con chevron hacia abajo a la derecha, estilo acordeón (observed).
- **Espaciado:** secciones separadas por bloques de fondo alternados (blanco / verde oscuro) con márgenes verticales amplios (inferred).

### 2.8. Footer (refs 2, 3, 5)
- **Disposición:** dos extremos, texto pequeño: "Design By — Customerup" a la izquierda; correo o contacto a la derecha (observed).
- **Alineación:** baseline inferior de la página (observed).

---

## 3. Tipografía: familias, pesos, tracking, alineación y capitalización

### 3.1. Familia tipográfica (inferred)
No es posible identificar la familia exacta sin inspeccionar CSS; se infere una **sans-serif geográfica/moderna** para títulos y una **sans-serif limpia** para cuerpo (compatible con Inter, Geist, o similar). Etiqueta: `inferred`.

### 3.2. Escala y pesos (inferred/observed)

| Elemento | Tamaño relativo | Peso inferido | Tracking | Alineación | Origen |
|----------|-----------------|---------------|----------|------------|--------|
| Kicker / etiqueta pequeña | Pequeño | Regular / Medium | Normal (o levemente expandido) | Izquierda | Observed (refs 1, 2, 3, 5) |
| Título hero / sección | Muy grande | Bold / Extra bold | `tracking-tight` | Izquierda | Observed (refs 1, 2, 3, 5) |
| Lead / subtítulo | Cuerpo grande | Regular | Normal | Izquierda (o derecha en bloques de ref 2/3) | Observed |
| CTA primario | Medio | Medium / Semibold | Normal | Centro (dentro del botón) | Observed |
| Número grande (métricas) | Muy grande | Bold | Normal | Izquierda | Observed (ref 1) |
| Etiqueta bajo número | Pequeño | Regular | Normal | Izquierda | Observed (ref 1) |
| Cuerpo de tarjetas | Pequeño-mediano | Regular | Normal | Izquierda | Observed |
| FAQ pregunta | Mediano | Medium | Normal | Izquierda | Observed (ref 5) |
| Footer | Muy pequeño | Regular | Normal | Izquierda / derecha | Observed |

### 3.3. Reglas de capitalización (Sentence case obligatorio — AGENTS.md)

| Elemento | En la referencia | Decisión para Customerup | Etiqueta |
|----------|------------------|--------------------------|----------|
| Títulos de sección y hero | Ref 1 usa mayúsculas ("POWER UP YOUR CUSTOMER ENGAGEMENT..."); refs 2, 3, 5 usan sentence case ("We help companies grow...", "Our Services", "Fresh Ideas, Proven Strategies") | **Sentence case:** solo primera palabra en mayúscula (salvo nombres propios/siglas: Customerup, SINPE, BAC, etc.). Prohibido Title Case. | `substituted` (para lo observado en mayúsculas en ref 1) |
| Kickers | Ref 1: "SCALE, FLEX, AND INNOVATE" (mayúsculas); refs 2, 3, 5: sentence case ("Why choose us", "What we do", "Insights") | **Sentence case en kickers.** Prohibido kicker en mayúsculas encima del título (cliché SaaS prohibido). | `substituted` (ref 1 kicker) |
| Botones | "Start trial", "Get a Quote", "Book demo", "View More" | Sentence case conservado. | `observed` |
| Nombres propios / siglas | Customerup, Squidx.agency (ref) | Customerup y siglas técnicas en mayúsculas cuando correspondan. | `observed` / `substituted` (marca) |

### 3.4. Prohibiciones de diseño aplicadas al tipografía/copy (AGENTS.md)
- **Cero clichés SaaS:** no kickers en mayúsculas sobre títulos; no `border-l-4` de color; no iconos en cajas con fondos pastel.
- **Cero efectos "Tech" genéricos:** no degradados morados/azules, no glows neón, no puntos decorativos pulsantes.
- **Copy humano:** prohibido "potencia", "eleva", "revoluciona", "sin fisuras"; prohibido formato `**Concepto:** explicación`.

---

## 4. Tabla de decisiones: observed / inferred / substituted

| # | Decisión de diseño | Valor / descripción | Origen (ref) | Etiqueta | Nota |
|---|--------------------|---------------------|--------------|----------|------|
| 1 | Top bar con noticia + contacto | "LATEST NEWS — …" izq.; teléfono + dirección der. | 1 | `observed` | |
| 2 | Logo Customerup + nav | Icono cuadrícula oscura; About Us / Platform / Pricing / Blog / Contact Us | 1 | `observed` | |
| 3 | CTA header "Sign in" + "Start trial" | Texto link + botón negro relleno | 1 | `observed` | |
| 4 | Fondo hero verde lima | Chartreuse/lime como fondo principal | 1 | `observed` | |
| 5 | Título hero | Bloque grande, tracking-tight, alineado izquierda | 1 | `observed` (forma) | |
| 6 | Capitalización título hero | Ref en MAYÚSCULAS → Customerup sentence case | 1 | `substituted` | Cumple AGENTS.md |
| 7 | Lead hero | "…craft personalized journeys…" cuerpo gris, izquierda | 1 | `observed` | |
| 8 | CTAs hero "Get started »" / "Book demo" | Pill negro relleno + pill outline | 1 | `observed` | |
| 9 | Motivo geométrico cuadrados | Cuadrados oscuros en diagonal/checkerboard | 1 | `observed` | |
| 10 | Tarjeta flotante "Latest product campaign" | Blanca, redondeada, barras progresivas finas verdes | 1 | `observed` | |
| 11 | Barras Email / Push / In-App | Etiqueta + número + barra delgada | 1 | `observed` | |
| 12 | Imagen hero + overlay líneas | Persona con teléfono, Monstera, líneas blancas finas de construcción | 1 | `observed` | |
| 13 | Showreel button | Texto + círculo con play, derecha inferior | 1 | `observed` | |
| 14 | Sección métricas 4 columnas | Números grandes + etiqueta debajo | 1 | `observed` | |
| 15 | Valores métricas | 99.55% / 34B+ / 5.4B+ / 24/5 | 1 | `observed` (forma); `substituted` (copy datos) | Adaptar a métricas de Customerup |
| 16 | Kicker con chip cuadrado | "SCALE, FLEX, AND INNOVATE" / "DATA + ACTIVATION" | 1 | `observed` (forma) | |
| 17 | Kicker en mayúsculas | Ref 1 usa mayúsculas → prohibited | 1 | `substituted` | Convertir a sentence case |
| 18 | Tarjetas Data Journey / Streams / Package Info | 3 tarjetas con icono cuadrado oscuro, título, descripción | 1 | `observed` (estructura) | |
| 19 | Fondos pastel tarjetas | Lima / lila / azul claro | 1 | `substituted` | Prohibido por AGENTS.md; usar blanco + borde 1px o espacio en blanco |
| 20 | Iconos tarjetas en caja pastel | Prohibido | 1 | `substituted` | Ícono SVG sin caja de color |
| 21 | Sección Why choose us | Kicker sentence case + título grande + sub-bloque derecho + CTA | 2 | `observed` | |
| 22 | Botón "Get a Quote" + flecha lima | Botón negro + botón secundario verde | 2 | `observed` | |
| 23 | Grid mixto estrategia/foto/cards | Columnas desiguales, no grid de 3 idénticas | 2 | `observed` | Cumple layout editorial |
| 24 | Card "Proven Growth" + 4X + círculos | Fondo lima, número grande, círculos concéntricos con cifras | 2 | `observed` | |
| 25 | Card "Faster Execution" + barra fases | Barra horizontal segmentada con tiempos | 2 | `observed` | |
| 26 | Card oscuro mensajería | Fondo verde oscuro, texto blanco, chip lima | 2 | `observed` | |
| 27 | Sección Our Services | Panel verde oscuro, 2×2 tarjetas, flecha externa arriba derecha | 3 | `observed` | |
| 28 | Tarjeta 1 lima, tarjetas 2–4 blancas | Diferenciación de acento | 3 | `observed` | |
| 29 | Split panel problema vs pico | Mitad blanca / mitad verde oscuro, redondeado exterior | 4 | `observed` | |
| 30 | Callouts lima y línea de curva | Chips redondeados, trazo verde, marcadores de tiempo | 4 | `observed` | |
| 31 | Skyline fondo oscurecido | Imagen de ciudad al fondo inferior | 4 | `observed` | |
| 32 | Contenido energía → datos | Sustituir métrica de red eléctrica por métrica de plataforma de datos | 4 | `substituted` | Coherente con Customerup |
| 33 | Sección Insights | Kicker, título dos líneas, "View More" negro con flecha lima | 5 | `observed` | |
| 34 | Tarjetas artículos con chip + autor | Foto, "Demand Generation", título, "Xenia Lein · 5 min read" | 5 | `observed` | |
| 35 | FAQ acordeón Q1…Q6 | Preguntas con chevron derecho | 5 | `observed` | |
| 36 | Footer "Design By" + contacto | Dos extremos, texto pequeño | 2, 3, 5 | `observed` (estructura) | Marca sustituida a Customerup |
| 37 | Colores prohibidos | Sin degradados morados/azules, sin glows neón, sin puntos pulsantes | Todas | `substituted` | Cumple AGENTS.md |
| 38 | Copy prohibido | Sin "potencia", "eleva", "revoluciona", "sin fisuras"; sin `**Concepto:** explicación` | Todas | `substituted` | Copy humano, sentence case |

---

## 5. Notas de fidelidad y validación pendiente

- El presente informe se basa exclusivamente en inspección visual de las 5 referencias. Ningún archivo de proyecto fue leído, creado ni modificado (modo solo lectura).
- Antes de declarar fidelidad visual, el implementador (`Gemini 4 Hydrogen`) debe validar con **Playwright** en tres viewports: `1440×900`, `768×1024` y `390×844`, verificando:
  1. Sentence case en todos los textos de UI (títulos, subtítulos, botones, etiquetas, menús, listas).
  2. Ausencia de kickers en mayúsculas, `border-l-4`, iconos en cajas pastel, emojis y efectos tech genéricos.
  3. Layout editorial sin `grid-cols-3` de tarjetas idénticas y sin sombras excesivas (`shadow-md`).
  4. Divisoras sutiles de 1px y espacio en blanco como separador principal entre secciones.

**Fin del informe.** Contenido listo para ser guardado en `docs/design/visual-analysis.md` por el coordinador; no se realizó escritura de archivo desde este sub-agente.
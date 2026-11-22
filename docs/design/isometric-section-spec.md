# Especificación de diseño — Sección isométrica interactiva Customerup

**Proyecto:** DataWebsite (LandingFactory)  
**Rol:** ui-ux-designer (especialista solo lectura)  
**Idioma y copy:** español de Costa Rica (es-CR), sentence case estricto  
**Referencia de verdad:** `projects/DataWebsite/references/isometric-reference.png`  
**Complementa:** `docs/design/design-system.md` y `src/styles/tokens.css`

---

## 1. Ubicación recomendada en `App.tsx`

### Inserción exacta

Colocar el componente `<IsometricHub />` entre `MetricsAndActivation` y `WhyChooseUsBento`:

```tsx
<Hero />
<MetricsAndActivation />
<IsometricHub />
<WhyChooseUsBento />
<SplitChart />
<ServicesDarkBlock />
<ProcessAndInsights />
<FaqSection />
```

### Por qué encaja en el flujo narrativo de Customerup

1. **MetricsAndActivation** prueba la escala con números (99.55 % disponibilidad, 34 B+ mensajes, 5.4 B+ webhooks, soporte 24/5 desde San José).  
2. **IsometricHub** muestra el mecanismo que hace posible esos números: la arquitectura unificada de datos, los nodos de entrada (SINPE, Hacienda, web), el almacén central y los canales de salida. Es la prueba visual de "cómo funciona".  
3. **WhyChooseUsBento** cierra con la propuesta de valor y la estrategia alineada.

El orden métrica → arquitectura → valor crea una narrativa lógica: primero qué logra Customerup, luego cómo está construido, luego por qué elegirlo. Colocarlo antes de `SplitChart` (que habla del problema de los silos de datos) también funciona como contrapunto: primero se muestra la solución unificada de Customerup, luego el problema que resuelve frente a stacks fragmentados.

---

## 2. Estrategia de color

### Decisión recomendada (clara y justificada)

**Híbrido técnico: fondo blanco puro y torre central en cobalto `#1122f5` preservados al 100 % de la referencia; acentos de marca Customerup (`#0b1c18` bosque + `#d7fc6e` lima) solo en la barra KPI superior y en detalles del inspector.**

#### Justificación

| Elemento | Color | Origen | Razón |
|---|---|---|---|
| Fondo de la sección | `#ffffff` (blanco puro) | Referencia | La referencia usa fondo blanco puro. Cambiarlo al offwhite `#f5f6f3` de Customerup rompería la fidelidad visual al 100 %. |
| Torre central (almacén) | `#1122f5` cobalto | Referencia | Es el ancla visual de la isometría. Cambiarlo a bosque `#0b1c18` o lima `#d7fc6e` destruiría la identidad de la ilustración. |
| Techo, puertas y badge | Cobalto sólido, alto contraste | Referencia | Deben mantenerse sólidos y sin degradados, tal como aparecen en la referencia. |
| Trazos finos arquitectónicos | `#e2e5df` / `#d1d5db` | `tokens.css` (`--color-border`) | Coherente con el sistema de Customerup y con el trazo delgado de la referencia. |
| Plataformas suaves | Grises casi blancos muy sutiles | Referencia + `tokens.css` | Respeta la estética minimalista sin sombras ni glows. |
| Barra KPI superior (valores) | `#0b1c18` bosque | Customerup | Integra la marca sin tocar el dibujo isométrico. |
| Barra KPI (etiquetas de acento) | `#d7fc6e` lima | Customerup | Toque de marca discreto, sin romper la limpieza de la referencia. |

#### Por qué no usar solo paleta Customerup (`#0b1c18` + `#d7fc6e`) en la torre

Usar bosque o lima en la torre central equivaldría a rediseñar la referencia, violando la regla de fidelidad al 100 %. La sección isométrica es una infografía técnica, no un panel de marca: el cobalto funciona como color neutro de "datos/infraestructura" y no compite con la identidad Customerup, que sigue viva en la barra KPI, el inspector y el resto de la página.

#### Reglas anti-slop aplicadas

- Sin degradados morados/azules.
- Sin glows neón ni puntos decorativos pulsantes.
- Sin bordes de colores (`border-l-4`) en tarjetas.
- Iconografía 100 % SVG; ningún ícono encerrado en caja con fondo pastel.

---

## 3. Adaptación semántica 100 % Customerup (es-CR, sentence case)

### 3.1 Tres KPI de la barra superior

Coherentes con `src/data/content.ts` (`metricsSection.metrics`), adaptados a una barra de arquitectura de datos:

| KPI | Valor | Etiqueta (sentence case, es-CR) | Fuente en `content.ts` |
|---|---|---|---|
| 1 | `5.4B+` | Webhooks enviados en 2024 | `metricsSection.metrics[2]` |
| 2 | `34B+` | Mensajes enviados en 2024 | `metricsSection.metrics[1]` |
| 3 | `99.55 %` | Disponibilidad de la plataforma | `metricsSection.metrics[0]` |

Tipografía: valores numéricos con `font-variant-numeric: tabular-nums`; etiquetas en `--text-caption`, color bosque `#0b1c18` para valores y texto secundario gris para etiquetas.

### 3.2 Etiqueta del callout principal

Equivalente de "YOUR AGENT-READY PRODUCT" (referencia), adaptado a Customerup:

> **Tu hub de datos Customerup**

Sentence case: solo la primera palabra en mayúscula ("Tu"); "Customerup" se conserva como nombre propio de marca. Sin mayúsculas en medio de la frase, sin title case.

### 3.3 Mapeo de bloques interactivos

Cada bloque de la isometría representa un concepto real de Customerup definido en `content.ts`. Al hacer hover o clic, se activa un micro-tarjeta/inspector limpio que **no rompe la composición** (ver sección 4).

| Bloque isométrico | Elemento Customerup | Contenido del inspector (micro-tarjeta) |
|---|---|---|
| Torre central (cobalto, alta) | Almacén de datos / data hub central | Título: "Almacén central de datos". Descripción: "Centraliza eventos de facturación electrónica de Hacienda, SINPE y web en tiempo real." Origen: `activationSection.cards[1].title/description` (streams). |
| Silos cilíndricos (alrededor de la torre) | Silos de datos / warehouse nodos | Título: "Nodos de warehouse". Descripción: "Conexión nativa con Snowflake, BigQuery, Postgres y webhooks de pago sin duplicar pipelines." Origen: `faqSection.items[2].answer` (integraciones). |
| Nodos de entrada (esferas pequeñas, dispersos) | Entrada SINPE / Hacienda / Web | Título: "Entrada de señales". Descripción: "SDKs ligeros de eventos y sincronización en tiempo real con tu warehouse." Origen: `servicesSection.cards[2]` (telemetría web y de producto). |
| Bloques con puntos (grids, planos) | Segmentación de audiencias | Título: "Segmentación de datos". Descripción: "Perfiles unificados, manejo de consentimiento y cumplimiento con la Ley 8968." Origen: `servicesSection.cards[1]` (identidad del cliente y gobernanza). |
| Canales de salida (puertas de la torre / extremos) | Correo, WhatsApp, Push, Webhooks | Título: "Canales de salida". Descripción: "Crea y automatiza mensajes por correo, WhatsApp o app con reglas locales." Origen: `activationSection.cards[0]` (recorrido de datos) y `hero.campaignCard.channels`. |

Todos los textos en sentence case. Ejemplos de copy:

- "Almacén central de datos" (no "ALMACÉN CENTRAL DE DATOS" ni "Almacén Central De Datos").
- "Webhooks enviados en 2024" (no "Webhooks Enviados En 2024").
- "Tu hub de datos Customerup" (Customerup como nombre propio).

### 3.4 Requisitos del inspector (micro-tarjeta)

- Posición: anclado lateralmente al bloque activado, sin cubrir la torre central ni romper la grilla isométrica.
- Fondo: blanco `#ffffff`, borde `1px` `#e2e5df`, radio `16px` (`--radius-card`).
- Sin sombra (`shadow-md` prohibido por reglas del sistema).
- Botón de cierre discreto (ícono SVG "X", sin fondo pastel).
- Máximo un inspector abierto a la vez.

---

## 4. Interacciones concretas

### 4.1 Hover (desktop)

- **Highlight del edificio:** el bloque sobre el que se posa el cursor se resalta con un contorno cobalto de `2px` y un ligero aumento de opacidad en su plataforma base.
- **Ruta de datos:** al pasar sobre un nodo de entrada (SINPE, Hacienda, Web) se dibuja una línea fina desde ese nodo hasta la torre central, indicando el flujo de datos. La línea desaparece al quitar el cursor.

### 4.2 Clic para fijar detalle

- Clic en cualquier bloque abre el inspector correspondiente y "fija" el bloque resaltado (permanece activo aunque se retire el cursor).
- Clic en otro bloque cierra el inspector anterior y abre el nuevo.
- Clic fuera del inspector o en el botón de cierre lo cierra y desfixa el bloque.

### 4.3 Pausa / reanudar y filtro de canal

- **Pausa / reanudar:** botón o ícono de pausa para detener/reanudar cualquier animación de flujo de datos entre nodos. Estado inicial: reproduciendo.
- **Filtro de canal:** botones de filtro para mostrar solo Correo, WhatsApp, Push o Webhooks. Al filtrar, los nodos no seleccionados se atenuan (opacidad reducida) y las rutas correspondientes se ocultan.
- Ninguno de estos controles usa puntos decorativos pulsantes ni glows.

### 4.4 Accesibilidad de teclado

- **Tab:** recorre los bloques interactivos y controles del inspector en orden lógico.
- **Enter / Espacio:** activa el bloque con foco (abre inspector).
- **Esc:** cierra el inspector abierto y quita el foco.
- **Teclas numéricas 1-4:** filtran por canal (1 Correo, 2 WhatsApp, 3 Push, 4 Webhooks).
- **Barra espaciadora:** pausa o reanuda el flujo de animación.
- Todos los controles tienen estado `:focus-visible` visible (anillo cobalto `2px`).

### 4.5 `prefers-reduced-motion`

- Si el usuario tiene activado "Reducir movimiento" en el sistema:
  - Todas las animaciones de flujo de datos se desactivan.
  - Las rutas de datos se muestran estáticas (líneas fijas, sin trazo animado).
  - Transiciones de apertura/cierre del inspector se reducen a opacidad instantánea o duración mínima (`0.1s`).
  - El hover de highlight se mantiene (no es animación, es cambio de estado).

### 4.6 Responsive (sin verse diminuto)

| Viewport | Estrategia |
|---|---|
| `1440×900` (desktop) | Isometría a escala completa, inspector lateral, barra KPI horizontal arriba, todos los controles visibles. |
| `768×1024` (tablet) | Isometría escalada con `clamp` para que no pierda presencia; inspector se coloca debajo de la grilla en una fila; barra KPI puede envolverse en dos filas; filtros en fila horizontal o desplegable. |
| `390×844` (mobile) | Isometría apilada verticalmente o en una grilla reducida de 2 columnas; inspector como panel inferior (bottom sheet) que se desliza; barra KPI en columna vertical; filtros como botones apilados. Táctiles mínimos `44×44 px`. |

En ningún breakpoint la isometría debe verse diminuta: usar `clamp()` en tamaños de bloques y trazos, y priorizar legibilidad sobre cantidad de elementos visibles.

---

## 5. Tokens CSS sugeridos para la sección

Agregar a `src/styles/tokens.css` (valores `observed` de la referencia + tokens existentes de Customerup):

```css
--color-isometric-bg: #ffffff;
--color-isometric-tower: #1122f5;
--color-isometric-platform: #f2f4f1;
--color-isometric-line: #e2e5df;
--color-isometric-node: #d1d5db;
--color-isometric-kpi-value: #0b1c18;
--color-isometric-kpi-label: #67726d;
--radius-isometric-block: 8px;
--motion-isometric: var(--ease-out);
```

---

## 6. Checklist de fidelidad visual (pre-Playwright)

- [ ] Fondo blanco puro, sin offwhite de página.
- [ ] Torre central en cobalto `#1122f5`, techo y puertas sólidos.
- [ ] Trazos finos `1px`, sin sombras ni glows.
- [ ] Plataformas grises suaves, sin fondo pastel en iconos.
- [ ] 3 KPI en barra superior con datos reales de `content.ts`.
- [ ] Callout "Tu hub de datos Customerup" en sentence case.
- [ ] 5 bloques mapeados a contenido real de Customerup.
- [ ] Inspector limpio, sin romper composición, cierre con Esc y clic fuera.
- [ ] Teclado: Tab, Enter, Espacio, Esc, 1-4.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Verificado en `1440×900`, `768×1024`, `390×844` con Playwright.

---

**Estado:** diseño listo para implementación por el implementador principal (Gemini 4 Hydrogen). Este documento no modifica archivos del proyecto; solo especifica.

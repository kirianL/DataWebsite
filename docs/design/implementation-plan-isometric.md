# Plan de implementación — Sección isométrica interactiva Customerup

**Rol:** `implementation-planner` (`opencode/beam-free`) + coordinación Fase 3 `/modify-landing`.  
**Nivel de cambio:** Nivel 2 (nueva sección interactiva integrada sin alterar el resto de la landing).

## 1. Evaluación comparativa de opciones
| Criterio | A: SVG isométrico paramétrico (React) | B: Librería 3D/Canvas (`three.js`/`isomer`) | C: Imagen raster transparente + hotspots |
|---|---|---|---|
| Fidelidad geométrica exacta a la referencia | **Alta** (control matemático 2:1 exacto) | Media-Alta | Baja (aproximación IA) |
| Nitidez de trazos finos `1px` | **Alta** (vector puro en cualquier DPR) | Media (subpixel/AA WebGL) | Baja (pixelación) |
| Interactividad por edificio y paquete | **Alta** (DOM/SVG nativo, hover/click/focus) | Media (raycasting) | Baja (hotspots gruesos) |
| Peso de bundle | **0 KB adicionales** | +150–300 KB gz | +150–300 KB imagen |
| Accesibilidad y `prefers-reduced-motion` | **Alta** (ARIA, teclado, SMIL/CSS pausable) | Baja (canvas opaco) | Baja |
| Responsive (`1440`, `768`, `390`) | **Alta** (`viewBox` adaptable + panel inferior móvil) | Media | Media-Baja |

**Decisión:** **Opción A — SVG isométrico paramétrico puro en React**, 0 dependencias nuevas, 0 créditos Recraft.

## 2. Archivos a crear y modificar
- Crear `src/components/isometric/isoMath.ts`: proyección 2:1 exacta, ensanche de avenidas centrales, helpers de polígonos.
- Crear `src/components/isometric/isoPrimitives.tsx`: primitivas vectoriales fieles a la referencia (torre central IN/OUT, silos, bloques 3×3, escalonados, cubo rayado, parques de 3 nodos, cubos de datos animados).
- Crear `src/data/isometricHub.ts`: mapa de las 25 parcelas + semántica Customerup (`es-CR`, Sentence case) + KPIs.
- Crear `src/components/IsometricDataHub.tsx`: sección interactiva con barra KPI superior, hover/click inspector editorial, filtros de flujo, pausa/reanudar y soporte teclado.
- Modificar `src/styles/tokens.css`, `src/index.css` y `src/App.tsx` (insertar entre `MetricsAndActivation` y `WhyChooseUsBento`).

## 3. Verificación planificada
- `npm run typecheck` y `npm run build` sin errores.
- Capturas Playwright en `1440×900`, `768×1024`, `390×844` + captura directa de la sección comparada lado a lado con `references/isometric-reference.png`.
- Auditoría `visual-qa`, `code-reviewer` y `quality-gate.mjs`.

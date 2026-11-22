# Análisis visual — Sección isométrica (`isometric-reference.png`)

**Rol:** `visual-analyst` (`opencode/nemotron-3.5-super-vl-free` fallback multimodal) + verificación geométrica del implementador.  
**Fuente de verdad:** `projects/DataWebsite/references/isometric-reference.png`

## 1. Estructura general (`observed`)
- Lienzo blanco puro (`#FFFFFF`), sin sombras, sin degradados y sin glows.
- Barra superior centrada con 3 KPIs separados por líneas verticales finas (`1px`).
- Grilla isométrica exacta de **5×5 parcelas** en proyección 2:1 (`≈26.565°`) con dos avenidas principales cruzadas alrededor de la torre central `(2, 2)`.
- Callout flotante sólido arriba a la derecha conectado con línea ortogonal en ángulo recto (vertical hacia arriba + horizontal hacia la derecha) al cilindro blanco central del techo de la torre.

## 2. Mapa exacto de las 25 parcelas `(u, v)` (`u` baja-derecha `0..4`, `v` baja-izquierda `0..4`)
- **Torre central protagonista (1):** `(2, 2)` — fachada frontal izquierda con líneas verticales finas y puerta sólida `IN`; fachada frontal derecha con líneas horizontales isométricas y puerta sólida `OUT`; techo sólido cobalto `#1421e8` con cuadrícula blanca fina y cilindro blanco central.
- **Silos cilíndricos sobre plinto cuadrado (4):** `(0, 3)`, `(1, 4)`, `(3, 4)`, `(4, 1)`.
- **Edificios escalonados de 2 niveles con techo 3×3 puntos y fachada rayada (3):** `(0, 2)`, `(1, 2)`, `(4, 0)`.
- **Edificio cúbico con fachada lateral rayada horizontal (1):** `(3, 1)`.
- **Bloques bajos planos con matriz de puntos 3×3 (6) + bloque plano trasero (1) + nodo trasero (1):** `(1, 0)`, `(2, 0)`, `(0, 4)`, `(3, 2)`, `(3, 3)`, `(4, 3)`, `(2, 1)`, `(1, 1)`.
- **Parcelas planas suaves con 3 nodos/árboles esféricos sobre postes (8):** `(0, 0)`, `(0, 1)`, `(3, 0)`, `(1, 3)`, `(2, 3)`, `(4, 2)`, `(2, 4)`, `(4, 4)`.

## 3. Avenidas y flujo (`observed`)
- **Avenida IN (`v = 2.5`):** línea punteada con flechas triangulares pequeñas y cubos/paquetes viajando hacia abajo-derecha directo a la puerta `IN`.
- **Avenida OUT (`u = 2.5`):** línea punteada con flechas triangulares pequeñas y cubos/paquetes saliendo desde la puerta `OUT` hacia arriba-derecha.

# Informe de Visual QA — DataWebsite

**Proyecto:** LandingFactory / DataWebsite  
**Sub-agente:** `@visual-qa` (`openrouter/nvidia/nemotron-3.5-super-vl:free`)  
**Fecha:** 22/11/2026  
**Métricas Playwright (`report.json`):** `consoleErrors: 0`, `pageErrors: 0`, `failedRequests: 0`, `horizontalOverflow: false` en `1440×900`, `768×1024` y `390×844`.

## Veredicto global: PASS

- **Paleta:** coincidencia alta con las 5 referencias (`#d7fc6e`, `#0b1c18`, `#1d2508`, `#f5f6f3`, `#ffffff`, `#e2e5df`). Sin degradados morados/azules, glows ni puntos pulsantes.
- **Tipografía & Sentence case:** `Plus Jakarta Sans` + `Inter`, `tabular-nums` en métricas, Sentence case aplicado de forma consistente.
- **Imágenes y SVG:** las 6 fotografías generadas con Recraft (`recraftv4_1_flash_v2`, 7 créditos c/u) cargan sin errores; toda la iconografía y diagramas (`BrandMarkIcon`, `KickerMarkIcon`, `ActivationCardIcon`, `WhyChooseUsBento` círculos 4X + pixel grid, `SplitChart` curva) son SVG/CSS nativos, cero emojis, cero iconos raster.
- **Responsive:** sin desbordamientos horizontales en `1440×900`, `768×1024` ni `390×844`.
- **Anti-AI Slop:** cumple todas las reglas (sin kickers en mayúsculas, sin `border-l-4`, sin iconos en cajas pastel, layout editorial asimétrico).

## Hallazgos menores (no bloqueantes)
- **H1:** Título del Hero adaptado a Sentence case conforme a `AGENTS.md` (vs ALL CAPS en referencia).
- **H2:** Tarjetas de activación adaptadas a paleta editorial sin cajas pastel excesivas conforme a `AGENTS.md`.
- **H3:** Primer ítem del FAQ abierto por defecto para mostrar el estado expandido.

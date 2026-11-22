import { useEffect, useMemo, useState } from "react";
import {
  CITY_TILES,
  ISO_NODES,
  ISOMETRIC_CALLOUT,
  ISOMETRIC_KPIS,
  type GridTileSpec,
} from "../data/isometricHub";
import {
  IN_AVENUE_V,
  isoRaw,
  OUT_AVENUE_U,
} from "./isometric/isoMath";
import {
  getCentralTowerAnchor,
  getTileTopAnchor,
  IsoCentralTower,
  IsoDotBlock,
  IsoKiosk,
  IsoPacketCubeGlyph,
  IsoPlainLow,
  IsoRelayCube,
  IsoSilo,
  IsoSteppedBuilding,
  IsoStripedCube,
  IsoTreePark,
} from "./isometric/isoPrimitives";

const IN_PACKET_OFFSETS = [0, 3.73, 7.46];
// Staggered ~0.8s after each IN cube enters so packets visibly emerge from OUT without bunching
const OUT_PACKET_OFFSETS = [2.9, 6.63, 10.36];
const PACKET_DURATION = "11.2s";

function renderTilePrimitive(tile: GridTileSpec, active: boolean, dimmed: boolean) {
  const props = { u: tile.u, v: tile.v, active, dimmed };
  switch (tile.kind) {
    case "tower":
      return <IsoCentralTower {...props} />;
    case "dots":
      return <IsoDotBlock {...props} />;
    case "silo":
      return <IsoSilo {...props} />;
    case "stepped":
      return <IsoSteppedBuilding {...props} />;
    case "stripedCube":
      return <IsoStripedCube {...props} />;
    case "plainLow":
      return <IsoPlainLow {...props} />;
    case "kiosk":
      return <IsoKiosk {...props} />;
    case "trees":
      return <IsoTreePark {...props} />;
  }
}

/**
 * Places the architectural readout strictly inside one of the 3 guaranteed empty pure-white
 * outer triangles of viewBox="0 36 1120 572" so NO building or diagram line is ever covered:
 * - Top-Left:     x [12..280],  y [48..184]  (40px+ clear of (0,3) silo & (0,2) stepped)
 * - Bottom-Left:  x [12..280],  y [462..598] (74px+ clear of (1,4) silo & (3,4) silo)
 * - Bottom-Right: x [840..1108], y [462..598] (74px+ clear of (4,1) silo & (4,3) dotted)
 * Top-Right is intentionally reserved exclusively for "Tu hub de datos Customerup".
 */
function getWhiteSpaceCalloutGeometry(anchorX: number, anchorY: number, isTower: boolean) {
  const boxW = 268;
  const boxH = 132;

  // Upper buildings + central tower -> guaranteed pure-white Top-Left triangle
  if (isTower || (anchorX < 560 && anchorY < 290) || (anchorX >= 560 && anchorY < 215)) {
    const boxX = 12;
    const boxY = 48;
    return {
      boxX,
      boxY,
      boxW,
      boxH,
      alignRight: false,
      points: `${anchorX.toFixed(1)},${anchorY.toFixed(1)} ${anchorX.toFixed(1)},${boxY} ${boxX},${boxY}`,
    };
  }

  // Lower-left quadrant -> guaranteed pure-white Bottom-Left triangle (fixed boxY stays inside viewBox)
  if (anchorX < 560) {
    const boxX = 12;
    const boxY = 462;
    return {
      boxX,
      boxY,
      boxW,
      boxH,
      alignRight: false,
      points: `${anchorX.toFixed(1)},${anchorY.toFixed(1)} ${anchorX.toFixed(1)},${boxY} ${boxX},${boxY}`,
    };
  }

  // Right-side & bottom-apex buildings -> guaranteed pure-white Bottom-Right triangle
  const boxX = 840;
  const boxY = 462;
  return {
    boxX,
    boxY,
    boxW,
    boxH,
    alignRight: true,
    points: `${anchorX.toFixed(1)},${anchorY.toFixed(1)} ${anchorX.toFixed(1)},${boxY} ${(boxX + boxW).toFixed(1)},${boxY}`,
  };
}

export function IsometricDataHub() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedTile, setSelectedTile] = useState<GridTileSpec | null>(null);
  const [mobileZoomed, setMobileZoomed] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches;
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 639px)");
    const onMotionChange = () => setReducedMotion(mqMotion.matches);
    const onMobileChange = () => setIsMobileViewport(mqMobile.matches);
    mqMotion.addEventListener("change", onMotionChange);
    mqMobile.addEventListener("change", onMobileChange);
    return () => {
      mqMotion.removeEventListener("change", onMotionChange);
      mqMobile.removeEventListener("change", onMobileChange);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTile(null);
        setHoveredNodeId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const pinnedNodeId = selectedTile?.nodeId ?? null;
  const activeNodeId = hoveredNodeId ?? pinnedNodeId;
  const inspectedNode = selectedTile ? ISO_NODES[selectedTile.nodeId] : null;
  const isAnimating = !reducedMotion;

  const toggleTile = (tile: GridTileSpec) => {
    setSelectedTile((prev) =>
      prev && prev.u === tile.u && prev.v === tile.v ? null : tile
    );
  };

  // Painter's algorithm: strict back-to-front ordering by (u + v)
  const sortedTiles = useMemo(
    () =>
      [...CITY_TILES].sort((a, b) => {
        const depthDiff = a.u + a.v - (b.u + b.v);
        if (depthDiff !== 0) return depthDiff;
        return a.u - b.u;
      }),
    []
  );

  // Avenue coordinates & exact IN/OUT portal turn geometry
  // Central tower (2,2) footprint spans u,v in [2.06, 2.94]
  const inDoorU = 2.49;
  const inDoorWallV = 2.94;
  const inDoorInsideV = 2.64;

  const outDoorV = 2.51;
  const outDoorWallU = 2.94;
  const outDoorInsideU = 2.66;

  const inStart = isoRaw(-0.15, IN_AVENUE_V, 0);
  const inTurnCorner = isoRaw(inDoorU, IN_AVENUE_V, 0);
  const inDoorThreshold = isoRaw(inDoorU, inDoorWallV, 0);
  const inDoorInside = isoRaw(inDoorU, inDoorInsideV, 0);
  const inEnd = isoRaw(4.65, IN_AVENUE_V, 0);

  const outBottom = isoRaw(OUT_AVENUE_U, 4.65, 0);
  const outDoorInside = isoRaw(outDoorInsideU, outDoorV, 0);
  const outDoorThreshold = isoRaw(outDoorWallU, outDoorV, 0);
  const outTurnCorner = isoRaw(OUT_AVENUE_U, outDoorV, 0);
  const outEnd = isoRaw(OUT_AVENUE_U, -0.05, 0);

  const inDoorRightJambX = isoRaw(2.06 + 0.88 * 0.68, inDoorWallV, 0).x;
  const outDoorLeftJambX = isoRaw(outDoorWallU, 2.06 + 0.88 * 0.7, 0).x;

  const inPathD = [
    `M ${inStart.x.toFixed(1)} ${inStart.y.toFixed(1)}`,
    `L ${inTurnCorner.x.toFixed(1)} ${inTurnCorner.y.toFixed(1)}`,
    `L ${inDoorInside.x.toFixed(1)} ${inDoorInside.y.toFixed(1)}`,
  ].join(" ");

  const outPathD = [
    `M ${outDoorInside.x.toFixed(1)} ${outDoorInside.y.toFixed(1)}`,
    `L ${outTurnCorner.x.toFixed(1)} ${outTurnCorner.y.toFixed(1)}`,
    `L ${outEnd.x.toFixed(1)} ${outEnd.y.toFixed(1)}`,
  ].join(" ");

  const inArrows = [0.65, 1.68].map((uPos) => isoRaw(uPos, IN_AVENUE_V, 0));
  const outArrows = [1.42, 0.45].map((vPos) => isoRaw(OUT_AVENUE_U, vPos, 0));

  const anchor = getCentralTowerAnchor();
  const useTightMobileView = isMobileViewport && mobileZoomed;
  const leaderElbowY = 104;
  const calloutX = useTightMobileView ? 618 : 732;
  const calloutY = 90;
  const calloutW = 248;
  const calloutH = 30;
  const svgViewBox = useTightMobileView ? "224 62 666 436" : "0 36 1120 572";

  const staticInPackets = [0.25, 0.92, 1.58, 2.18].map((uPos) => isoRaw(uPos, IN_AVENUE_V, 0));
  const staticOutPackets = [2.25, 1.65, 0.95, 0.35].map((vPos) => isoRaw(OUT_AVENUE_U, vPos, 0));

  const highlightInRoute = activeNodeId === "ingress" || activeNodeId === "hub";
  const highlightOutRoute = activeNodeId === "channels" || activeNodeId === "hub";

  const backTiles = useMemo(
    () => sortedTiles.filter((t) => t.u <= 2 && t.v <= 2),
    [sortedTiles]
  );
  const frontTiles = useMemo(
    () => sortedTiles.filter((t) => t.u >= 3 || t.v >= 3),
    [sortedTiles]
  );

  const selectedCallout = useMemo(() => {
    if (!selectedTile || !inspectedNode) return null;
    const p = getTileTopAnchor(selectedTile.u, selectedTile.v, selectedTile.kind);
    return {
      anchor: p,
      ...getWhiteSpaceCalloutGeometry(p.x, p.y, selectedTile.kind === "tower"),
    };
  }, [selectedTile, inspectedNode]);

  return (
    <section
      id="arquitectura"
      aria-labelledby="isometric-hub-heading"
      className="border-y border-[var(--color-border)] bg-[var(--iso-bg)] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <h2 id="isometric-hub-heading" className="sr-only">
          Arquitectura de activación de datos Customerup
        </h2>

        {/* Top 3-KPI strip matching reference proportion & hairline separators */}
        <div
          className="mx-auto grid max-w-3xl grid-cols-3 gap-2 pb-4 sm:flex sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:pb-6"
          aria-label="Métricas clave de arquitectura"
        >
          {ISOMETRIC_KPIS.map((kpi, idx) => (
            <div
              key={kpi.label}
              className={`flex flex-col items-center text-center sm:flex-row sm:items-baseline sm:gap-2 sm:px-6 sm:text-left ${
                idx > 0 ? "border-l border-[var(--iso-divider)]" : ""
              }`}
            >
              <span className="tabular-nums text-sm font-semibold tracking-tight text-[var(--iso-kpi-num)] sm:text-[15px]">
                {kpi.value}
              </span>
              <span className="text-[10.5px] leading-tight font-medium tracking-[0.01em] text-[var(--iso-kpi-label)] sm:text-xs">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>

        {/* Full-width Isometric Blueprint Canvas (100% pure white canvas, zero bottom cards or tabs) */}
        <div className="relative mx-auto mt-1 w-full max-w-[1120px]">
          <svg
            viewBox={svgViewBox}
            className="mx-auto block h-auto w-full select-none"
            role="img"
            aria-label="Diagrama isométrico interactivo del hub de datos Customerup con entradas IN, torre central y salidas OUT"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedTile(null);
              }
            }}
          >
            <defs>
              <path id="iso-in-route-path" d={inPathD} />
              <path id="iso-out-route-path" d={outPathD} />
              <clipPath id="iso-in-portal-clip">
                <rect x="0" y="0" width={inDoorRightJambX.toFixed(2)} height="640" />
              </clipPath>
              <clipPath id="iso-out-portal-clip">
                <rect
                  x={outDoorLeftJambX.toFixed(2)}
                  y="0"
                  width={(1120 - outDoorLeftJambX).toFixed(2)}
                  height="640"
                />
              </clipPath>
            </defs>

            {/* Dashed cross-avenues */}
            <g className="pointer-events-none">
              <line
                x1={inStart.x}
                y1={inStart.y}
                x2={inEnd.x}
                y2={inEnd.y}
                stroke={highlightInRoute ? "var(--iso-accent)" : "var(--iso-stroke-soft)"}
                strokeWidth={highlightInRoute ? 1.35 : 1.05}
                strokeDasharray="4 4"
                strokeOpacity={highlightInRoute ? 0.85 : 0.45}
              />
              <line
                x1={outBottom.x}
                y1={outBottom.y}
                x2={outEnd.x}
                y2={outEnd.y}
                stroke={highlightOutRoute ? "var(--iso-accent)" : "var(--iso-stroke-soft)"}
                strokeWidth={highlightOutRoute ? 1.35 : 1.05}
                strokeDasharray="4 4"
                strokeOpacity={highlightOutRoute ? 0.85 : 0.45}
              />
              <line
                x1={inTurnCorner.x}
                y1={inTurnCorner.y}
                x2={inDoorThreshold.x}
                y2={inDoorThreshold.y}
                stroke={highlightInRoute ? "var(--iso-accent)" : "var(--iso-stroke-soft)"}
                strokeWidth={highlightInRoute ? 1.3 : 1}
                strokeDasharray="3 3"
                strokeOpacity={highlightInRoute ? 0.9 : 0.5}
              />
              <line
                x1={outDoorThreshold.x}
                y1={outDoorThreshold.y}
                x2={outTurnCorner.x}
                y2={outTurnCorner.y}
                stroke={highlightOutRoute ? "var(--iso-accent)" : "var(--iso-stroke-soft)"}
                strokeWidth={highlightOutRoute ? 1.3 : 1}
                strokeDasharray="3 3"
                strokeOpacity={highlightOutRoute ? 0.9 : 0.5}
              />

              {inArrows.map((p, i) => (
                <polygon
                  key={`in-arr-${i}`}
                  points="5,0 -3,-3.2 -3,3.2"
                  fill="var(--iso-accent)"
                  opacity={highlightInRoute ? 0.95 : 0.5}
                  transform={`translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)}) rotate(26.565)`}
                />
              ))}

              {outArrows.map((p, i) => (
                <polygon
                  key={`out-arr-${i}`}
                  points="5,0 -3,-3.2 -3,3.2"
                  fill="var(--iso-accent)"
                  opacity={highlightOutRoute ? 0.95 : 0.5}
                  transform={`translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)}) rotate(-26.565)`}
                />
              ))}
            </g>

            {/* Layer 1: Back quadrant + Central Tower (u <= 2 && v <= 2) */}
            {backTiles.map((tile) => {
              const node = ISO_NODES[tile.nodeId];
              const isSelected = activeNodeId === tile.nodeId;

              return (
                <g
                  key={`tile-${tile.u}-${tile.v}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.title} — ${node.roleLabel}`}
                  aria-pressed={selectedTile?.u === tile.u && selectedTile?.v === tile.v}
                  onMouseEnter={() => setHoveredNodeId(tile.nodeId)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onFocus={() => setHoveredNodeId(tile.nodeId)}
                  onBlur={() => setHoveredNodeId(null)}
                  onClick={() => toggleTile(tile)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleTile(tile);
                    }
                  }}
                  className="iso-tile cursor-pointer focus:outline-none"
                  style={{
                    transform: isSelected ? "translateY(-3px)" : "translateY(0px)",
                  }}
                >
                  {renderTilePrimitive(tile, isSelected, false)}
                </g>
              );
            })}

            {/* Layer 2: Animated isometric data packets on IN and OUT avenues */}
            <g className="pointer-events-none" aria-hidden="true">
              {isAnimating ? (
                <>
                  <g clipPath="url(#iso-in-portal-clip)">
                    {IN_PACKET_OFFSETS.map((delay, idx) => (
                      <g key={`in-pkt-${idx}`}>
                        <g>
                          <IsoPacketCubeGlyph />
                          <animate
                            attributeName="opacity"
                            values="0;1;1"
                            keyTimes="0;0.04;1"
                            dur={PACKET_DURATION}
                            begin={`-${delay}s`}
                            repeatCount="indefinite"
                          />
                        </g>
                        <animateMotion
                          dur={PACKET_DURATION}
                          begin={`-${delay}s`}
                          repeatCount="indefinite"
                          calcMode="spline"
                          keyPoints="0;0.852;0.852;1"
                          keyTimes="0;0.78;0.845;1"
                          keySplines="0.05 0 0.78 1; 0 0 1 1; 0.3 0 0.2 1"
                        >
                          <mpath href="#iso-in-route-path" />
                        </animateMotion>
                      </g>
                    ))}
                  </g>
                  <g clipPath="url(#iso-out-portal-clip)">
                    {OUT_PACKET_OFFSETS.map((delay, idx) => (
                      <g key={`out-pkt-${idx}`}>
                        <g>
                          <IsoPacketCubeGlyph accent />
                          <animate
                            attributeName="opacity"
                            values="1;1;0"
                            keyTimes="0;0.94;1"
                            dur={PACKET_DURATION}
                            begin={`-${delay}s`}
                            repeatCount="indefinite"
                          />
                        </g>
                        <animateMotion
                          dur={PACKET_DURATION}
                          begin={`-${delay}s`}
                          repeatCount="indefinite"
                          calcMode="spline"
                          keyPoints="0;0.147;0.147;1"
                          keyTimes="0;0.14;0.205;1"
                          keySplines="0.2 0 0.3 1; 0 0 1 1; 0.22 0 0.95 1"
                        >
                          <mpath href="#iso-out-route-path" />
                        </animateMotion>
                      </g>
                    ))}
                  </g>
                </>
              ) : (
                <>
                  {staticInPackets.map((p, idx) => (
                    <g
                      key={`sin-${idx}`}
                      transform={`translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`}
                    >
                      <IsoPacketCubeGlyph />
                    </g>
                  ))}
                  {staticOutPackets.map((p, idx) => (
                    <g
                      key={`sout-${idx}`}
                      transform={`translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`}
                    >
                      <IsoPacketCubeGlyph accent />
                    </g>
                  ))}
                </>
              )}
              <IsoRelayCube u={1.96} v={3.96} />
              <IsoRelayCube u={3.96} v={2.96} />
            </g>

            {/* Layer 3: Front quadrant tiles (u >= 3 || v >= 3) properly occluding avenue traffic */}
            {frontTiles.map((tile) => {
              const node = ISO_NODES[tile.nodeId];
              const isSelected = activeNodeId === tile.nodeId;

              return (
                <g
                  key={`tile-${tile.u}-${tile.v}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.title} — ${node.roleLabel}`}
                  aria-pressed={selectedTile?.u === tile.u && selectedTile?.v === tile.v}
                  onMouseEnter={() => setHoveredNodeId(tile.nodeId)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onFocus={() => setHoveredNodeId(tile.nodeId)}
                  onBlur={() => setHoveredNodeId(null)}
                  onClick={() => toggleTile(tile)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleTile(tile);
                    }
                  }}
                  className="iso-tile cursor-pointer focus:outline-none"
                  style={{
                    transform: isSelected ? "translateY(-3px)" : "translateY(0px)",
                  }}
                >
                  {renderTilePrimitive(tile, isSelected, false)}
                </g>
              );
            })}

            {/* Orthogonal leader line + main callout badge */}
            <polyline
              points={`${anchor.x.toFixed(1)},${anchor.y.toFixed(1)} ${anchor.x.toFixed(1)},${leaderElbowY} ${calloutX},${leaderElbowY}`}
              fill="none"
              stroke="var(--iso-stroke)"
              strokeWidth="1.15"
              className="pointer-events-none"
            />
            <g
              className="iso-callout cursor-pointer focus:outline-none"
              role="button"
              tabIndex={0}
              aria-label={ISOMETRIC_CALLOUT}
              onClick={() =>
                toggleTile({ u: 2, v: 2, kind: "tower", nodeId: "hub" })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleTile({ u: 2, v: 2, kind: "tower", nodeId: "hub" });
                }
              }}
            >
              <rect
                x={calloutX}
                y={calloutY}
                width={calloutW}
                height={calloutH}
                rx="2"
                fill="var(--iso-accent-deep)"
              />
              <text
                x={calloutX + calloutW / 2}
                y={calloutY + 19}
                textAnchor="middle"
                fill="var(--iso-lime)"
                fontSize="13"
                fontWeight="600"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                letterSpacing="0.04em"
              >
                {ISOMETRIC_CALLOUT}
              </text>
            </g>

            {/* Desktop/tablet: animated leader line + minimalist info block positioned in pure-white outer space */}
            {!useTightMobileView && selectedTile && inspectedNode && selectedCallout && (
              <g key={`sel-${selectedTile.u}-${selectedTile.v}`}>
                <polyline
                  points={selectedCallout.points}
                  fill="none"
                  stroke="var(--iso-accent-deep)"
                  strokeWidth="1.25"
                  className="iso-leader-draw pointer-events-none"
                />
                <circle
                  cx={selectedCallout.anchor.x}
                  cy={selectedCallout.anchor.y}
                  r="3.4"
                  fill="var(--iso-lime)"
                  stroke="var(--iso-accent-deep)"
                  strokeWidth="1.35"
                  className="pointer-events-none"
                />
                <foreignObject
                  x={selectedCallout.boxX}
                  y={selectedCallout.boxY + 6}
                  width={selectedCallout.boxW}
                  height={selectedCallout.boxH}
                >
                  <div
                    className={`iso-node-swap bg-white pt-1.5 ${
                      selectedCallout.alignRight ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`flex items-baseline gap-2 ${
                        selectedCallout.alignRight ? "justify-end" : "justify-between"
                      }`}
                    >
                      <span className="tabular-nums text-[11px] font-semibold text-[var(--color-forest)]">
                        {inspectedNode.metric}{" "}
                        <span className="font-normal text-[var(--color-text-muted)]">
                          · {inspectedNode.roleLabel}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTile(null);
                        }}
                        aria-label="Cerrar detalle"
                        className="iso-pressable ml-2 inline-flex h-4 w-4 shrink-0 items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-forest)]"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="mt-1 text-[13px] leading-snug font-semibold tracking-tight text-[var(--color-forest)]">
                      {inspectedNode.title}
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                      {inspectedNode.description}
                    </p>
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>

          {/* Compact mobile-only zoom toggle */}
          <div className="mt-2 flex justify-end sm:hidden">
            <button
              type="button"
              onClick={() => setMobileZoomed((z) => !z)}
              className="iso-pressable border-b border-[var(--color-border)] pb-0.5 text-xs font-medium text-[var(--color-text-secondary)]"
            >
              {mobileZoomed ? "Ver mapa completo" : "Acercar al núcleo"}
            </button>
          </div>

          {/* Mobile-only pure white readout when zoomed in and a building is tapped */}
          {useTightMobileView && inspectedNode && (
            <div
              key={inspectedNode.id}
              className="iso-node-swap mt-4 border-t border-[var(--color-forest)] bg-white pt-3 sm:hidden"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="tabular-nums text-xs font-semibold text-[var(--color-forest)]">
                  {inspectedNode.metric}{" "}
                  <span className="font-normal text-[var(--color-text-muted)]">
                    · {inspectedNode.roleLabel}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTile(null)}
                  aria-label="Cerrar detalle"
                  className="iso-pressable text-xs font-medium text-[var(--color-text-muted)]"
                >
                  Cerrar
                </button>
              </div>
              <h3 className="mt-1 text-sm font-semibold tracking-tight text-[var(--color-forest)]">
                {inspectedNode.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {inspectedNode.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

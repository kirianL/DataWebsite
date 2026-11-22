import {
  cellFootprint,
  ISO_UNIT_X,
  ISO_UNIT_Y,
  isoRaw,
  pts,
  warpCoord,
} from "./isoMath";

interface PrimitiveProps {
  u: number;
  v: number;
  active: boolean;
  dimmed: boolean;
}

const STROKE_BASE = "var(--iso-stroke)";
const STROKE_ACTIVE = "var(--iso-accent)";

function strokeFor(active: boolean) {
  return active ? STROKE_ACTIVE : STROKE_BASE;
}

function strokeWidthFor(active: boolean, base = 1.1) {
  return active ? base + 0.65 : base;
}

/**
 * Basic isometric rectangular prism with crisp 3 visible faces.
 */
export function IsoPrism({
  wu,
  wv,
  du,
  dv,
  z0,
  z1,
  topFill = "#ffffff",
  leftFill = "var(--iso-face-left)",
  rightFill = "var(--iso-face-right)",
  stroke = STROKE_BASE,
  strokeWidth = 1.1,
}: {
  wu: number;
  wv: number;
  du: number;
  dv: number;
  z0: number;
  z1: number;
  topFill?: string;
  leftFill?: string;
  rightFill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const top = [
    isoRaw(wu, wv, z1),
    isoRaw(wu + du, wv, z1),
    isoRaw(wu + du, wv + dv, z1),
    isoRaw(wu, wv + dv, z1),
  ];
  const left = [
    isoRaw(wu, wv + dv, z1),
    isoRaw(wu + du, wv + dv, z1),
    isoRaw(wu + du, wv + dv, z0),
    isoRaw(wu, wv + dv, z0),
  ];
  const right = [
    isoRaw(wu + du, wv, z1),
    isoRaw(wu + du, wv + dv, z1),
    isoRaw(wu + du, wv + dv, z0),
    isoRaw(wu + du, wv, z0),
  ];

  return (
    <g stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
      <polygon points={pts(left)} fill={leftFill} />
      <polygon points={pts(right)} fill={rightFill} />
      <polygon points={pts(top)} fill={topFill} />
    </g>
  );
}

/**
 * Low flat building with 3x3 isometric dot matrix on its roof.
 */
export function IsoDotBlock({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.75);
  const h = 0.24;
  const fractions = [0.24, 0.5, 0.76];
  const stroke = strokeFor(active);
  const sw = strokeWidthFor(active, 1.15);

  return (
    <g>
      <IsoPrism
        wu={wu}
        wv={wv}
        du={size}
        dv={size}
        z0={0}
        z1={h}
        topFill={active ? "var(--iso-lime-tint)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      {fractions.map((fu) =>
        fractions.map((fv) => {
          const p = isoRaw(wu + size * fu, wv + size * fv, h);
          return (
            <circle
              key={`${fu}-${fv}`}
              cx={p.x}
              cy={p.y}
              r={active ? 2.15 : 1.75}
              fill="var(--iso-accent)"
            />
          );
        })
      )}
    </g>
  );
}

/**
 * Plain low architectural block tucked behind the central tower.
 */
export function IsoPlainLow({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.75);
  const h = 0.24;
  const stroke = strokeFor(active);
  const sw = strokeWidthFor(active, 1.1);
  const m1a = isoRaw(wu + size * 0.5, wv, h);
  const m1b = isoRaw(wu + size * 0.5, wv + size, h);
  const m2a = isoRaw(wu, wv + size * 0.5, h);
  const m2b = isoRaw(wu + size, wv + size * 0.5, h);

  return (
    <g>
      <IsoPrism
        wu={wu}
        wv={wv}
        du={size}
        dv={size}
        z0={0}
        z1={h}
        topFill={active ? "var(--iso-lime-tint)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      <line x1={m1a.x} y1={m1a.y} x2={m1b.x} y2={m1b.y} stroke={stroke} strokeOpacity="0.25" strokeWidth="0.85" />
      <line x1={m2a.x} y1={m2a.y} x2={m2b.x} y2={m2b.y} stroke={stroke} strokeOpacity="0.25" strokeWidth="0.85" />
    </g>
  );
}

/**
 * Tiny gatehouse / utility kiosk peeking right behind the top-right edge of the central tower.
 */
export function IsoKiosk({ u, v, active }: PrimitiveProps) {
  const { wu, wv } = cellFootprint(u, v, 0.34);
  const stroke = strokeFor(active);
  const ku = wu + 0.42;
  const kv = wv - 0.14;
  return (
    <g>
      <IsoPrism
        wu={ku}
        wv={kv}
        du={0.28}
        dv={0.28}
        z0={0}
        z1={0.26}
        stroke={stroke}
        strokeWidth={strokeWidthFor(active, 1.05)}
      />
      <polygon
        points={pts([
          isoRaw(ku + 0.08, kv + 0.28, 0.13),
          isoRaw(ku + 0.2, kv + 0.28, 0.13),
          isoRaw(ku + 0.2, kv + 0.28, 0),
          isoRaw(ku + 0.08, kv + 0.28, 0),
        ])}
        fill="var(--iso-accent)"
      />
    </g>
  );
}

/**
 * Cylindrical data warehouse silo on a square plinth.
 */
export function IsoSilo({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.76);
  const plinthH = 0.07;
  const stroke = strokeFor(active);
  const sw = strokeWidthFor(active, 1.15);

  const center = isoRaw(wu + size / 2, wv + size / 2, plinthH);
  const rx = ISO_UNIT_X * 0.3;
  const ry = ISO_UNIT_Y * 0.3;
  const cylH = 34;
  const topY = center.y - cylH;
  const botY = center.y;

  const bodyPath = [
    `M ${(center.x - rx).toFixed(2)} ${topY.toFixed(2)}`,
    `L ${(center.x - rx).toFixed(2)} ${botY.toFixed(2)}`,
    `A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 0 ${(center.x + rx).toFixed(2)} ${botY.toFixed(2)}`,
    `L ${(center.x + rx).toFixed(2)} ${topY.toFixed(2)}`,
    "Z",
  ].join(" ");

  const ringYs = [topY + cylH * 0.34, topY + cylH * 0.67];

  return (
    <g>
      <IsoPrism
        wu={wu}
        wv={wv}
        du={size}
        dv={size}
        z0={0}
        z1={plinthH}
        topFill={active ? "var(--iso-lime-tint)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      {/* Cylinder body */}
      <path d={bodyPath} fill="var(--iso-face-left)" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {/* Subtle right-side shading arc */}
      <path
        d={`M ${center.x.toFixed(2)} ${(topY + ry).toFixed(2)} L ${center.x.toFixed(2)} ${(botY + ry).toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 0 ${(center.x + rx).toFixed(2)} ${botY.toFixed(2)} L ${(center.x + rx).toFixed(2)} ${topY.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${center.x.toFixed(2)} ${(topY + ry).toFixed(2)} Z`}
        fill="var(--iso-face-right)"
        opacity="0.7"
      />
      {/* Horizontal drum rings */}
      {ringYs.map((ryPos) => (
        <path
          key={ryPos}
          d={`M ${(center.x - rx).toFixed(2)} ${ryPos.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 0 ${(center.x + rx).toFixed(2)} ${ryPos.toFixed(2)}`}
          fill="none"
          stroke={stroke}
          strokeWidth="0.85"
          strokeOpacity="0.65"
        />
      ))}
      {/* Top cap + recessed inner rim */}
      <ellipse
        cx={center.x}
        cy={topY}
        rx={rx}
        ry={ry}
        fill={active ? "var(--iso-lime-tint)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      <ellipse
        cx={center.x}
        cy={topY}
        rx={rx * 0.76}
        ry={ry * 0.76}
        fill="none"
        stroke={stroke}
        strokeWidth="0.85"
        strokeOpacity="0.6"
      />
    </g>
  );
}

/**
 * Stepped two-tier building: wide flat base + smaller upper block with 3x3 roof dots & striped right facade.
 */
export function IsoSteppedBuilding({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.76);
  const baseH = 0.23;
  const topSize = 0.44;
  const topOffset = (size - topSize) / 2;
  const topH = 0.56;
  const stroke = strokeFor(active);
  const sw = strokeWidthFor(active, 1.15);

  const tu = wu + topOffset;
  const tv = wv + topOffset;
  const dotFractions = [0.24, 0.5, 0.76];
  const stripeSteps = [0.16, 0.32, 0.48, 0.64, 0.8];

  return (
    <g>
      <IsoPrism
        wu={wu}
        wv={wv}
        du={size}
        dv={size}
        z0={0}
        z1={baseH}
        topFill={active ? "var(--iso-lime-tint)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      <IsoPrism
        wu={tu}
        wv={tv}
        du={topSize}
        dv={topSize}
        z0={baseH}
        z1={topH}
        topFill={active ? "var(--iso-lime)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      {/* Horizontal louvers on upper right wall */}
      {stripeSteps.map((t) => {
        const z = baseH + (topH - baseH) * t;
        const p1 = isoRaw(tu + topSize, tv, z);
        const p2 = isoRaw(tu + topSize, tv + topSize, z);
        return (
          <line
            key={t}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={stroke}
            strokeWidth="0.85"
            strokeOpacity="0.72"
          />
        );
      })}
      {/* 3x3 dots on upper roof */}
      {dotFractions.map((fu) =>
        dotFractions.map((fv) => {
          const p = isoRaw(tu + topSize * fu, tv + topSize * fv, topH);
          return (
            <circle
              key={`${fu}-${fv}`}
              cx={p.x}
              cy={p.y}
              r={active ? 1.8 : 1.45}
              fill="var(--iso-accent)"
            />
          );
        })
      )}
    </g>
  );
}

/**
 * Medium-tall cubic building with clean white roof and fine horizontal louvers on front-right wall.
 */
export function IsoStripedCube({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.72);
  const h = 0.68;
  const stroke = strokeFor(active);
  const sw = strokeWidthFor(active, 1.15);
  const louverCount = 9;
  const m1a = isoRaw(wu + size * 0.5, wv, h);
  const m1b = isoRaw(wu + size * 0.5, wv + size, h);
  const m2a = isoRaw(wu, wv + size * 0.5, h);
  const m2b = isoRaw(wu + size, wv + size * 0.5, h);

  return (
    <g>
      <IsoPrism
        wu={wu}
        wv={wv}
        du={size}
        dv={size}
        z0={0}
        z1={h}
        topFill={active ? "var(--iso-lime-tint)" : "#ffffff"}
        stroke={stroke}
        strokeWidth={sw}
      />
      {/* Subtle roof seam crosshair */}
      <line x1={m1a.x} y1={m1a.y} x2={m1b.x} y2={m1b.y} stroke={stroke} strokeOpacity="0.28" strokeWidth="0.85" />
      <line x1={m2a.x} y1={m2a.y} x2={m2b.x} y2={m2b.y} stroke={stroke} strokeOpacity="0.28" strokeWidth="0.85" />
      {/* Horizontal isometric stripes on right wall */}
      {Array.from({ length: louverCount }, (_, idx) => {
        const z = (h * (idx + 1)) / (louverCount + 1);
        const p1 = isoRaw(wu + size, wv, z);
        const p2 = isoRaw(wu + size, wv + size, z);
        return (
          <line
            key={idx}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={stroke}
            strokeWidth="0.9"
            strokeOpacity="0.78"
          />
        );
      })}
    </g>
  );
}

/**
 * Soft periwinkle ground pad with 3 minimalist architectural lollipop trees.
 */
export function IsoTreePark({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.78);
  const pad = [
    isoRaw(wu, wv, 0),
    isoRaw(wu + size, wv, 0),
    isoRaw(wu + size, wv + size, 0),
    isoRaw(wu, wv + size, 0),
  ];
  const stroke = strokeFor(active);
  const treeCoords = [
    { fu: 0.48, fv: 0.25 },
    { fu: 0.28, fv: 0.64 },
    { fu: 0.7, fv: 0.56 },
  ];

  return (
    <g>
      <polygon
        points={pts(pad)}
        fill={active ? "var(--iso-pad-active)" : "var(--iso-pad)"}
        stroke={active ? STROKE_ACTIVE : "none"}
        strokeWidth={active ? 1.4 : 0}
      />
      {treeCoords.map((tree, idx) => {
        const base = isoRaw(wu + size * tree.fu, wv + size * tree.fv, 0);
        const topY = base.y - 16;
        return (
          <g key={idx}>
            <line
              x1={base.x}
              y1={base.y}
              x2={base.x}
              y2={topY}
              stroke={stroke}
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <circle
              cx={base.x}
              cy={topY - 3}
              r={5.8}
              fill="#ffffff"
              stroke={stroke}
              strokeWidth="1.1"
            />
            {/* Minimal lower shade arc inside tree sphere */}
            <path
              d={`M ${(base.x - 4.4).toFixed(2)} ${(topY - 1.5).toFixed(2)} A 5.4 5.4 0 0 0 ${(base.x + 4.4).toFixed(2)} ${(topY - 1.5).toFixed(2)} Z`}
              fill="var(--iso-tree-shade)"
            />
            <line
              x1={base.x}
              y1={topY + 2.8}
              x2={base.x}
              y2={topY - 1.5}
              stroke={stroke}
              strokeWidth="0.95"
            />
          </g>
        );
      })}
    </g>
  );
}

/**
 * Central Hero Tower at (2, 2):
 * - Vertical flutes on front-left (IN) wall
 * - Horizontal isometric louvers on front-right (OUT) wall
 * - Solid cobalt IN & OUT doors with isometric wall typography
 * - Solid cobalt roof with white 2x2 grid lines & central white cylindrical hub
 */
export function IsoCentralTower({ u, v, active }: PrimitiveProps) {
  const { wu, wv, size } = cellFootprint(u, v, 0.88);
  const h = 1.66;
  const stroke = active ? "var(--iso-accent-deep)" : STROKE_BASE;
  const sw = active ? 1.75 : 1.3;

  // Roof center for cylindrical hub
  const roofCenter = isoRaw(wu + size / 2, wv + size / 2, h);
  const hubRx = 16.5;
  const hubRy = 8.2;
  const hubH = 12;

  // Vertical flutes on front-left wall (IN wall, v = wv + size)
  const leftFluteCount = 12;
  // Horizontal louvers on front-right wall (OUT wall, u = wu + size)
  const rightLouverCount = 16;

  // Door bounds (fractions along wall & height)
  const doorA = 0.3;
  const doorB = 0.68;
  const doorH = 0.43;

  const inDoor = [
    isoRaw(wu + size * doorA, wv + size, doorH),
    isoRaw(wu + size * doorB, wv + size, doorH),
    isoRaw(wu + size * doorB, wv + size, 0),
    isoRaw(wu + size * doorA, wv + size, 0),
  ];
  const inDoorLabelPos = isoRaw(wu + size * 0.49, wv + size, doorH + 0.14);

  const outDoor = [
    isoRaw(wu + size, wv + size * (1 - doorB), doorH),
    isoRaw(wu + size, wv + size * (1 - doorA), doorH),
    isoRaw(wu + size, wv + size * (1 - doorA), 0),
    isoRaw(wu + size, wv + size * (1 - doorB), 0),
  ];
  const outDoorLabelPos = isoRaw(wu + size, wv + size * 0.51, doorH + 0.14);

  // Single crisp white crosshair on solid cobalt roof radiating from under the central cylinder
  const roofGridFracs = [0.5];

  return (
    <g>
      <IsoPrism
        wu={wu}
        wv={wv}
        du={size}
        dv={size}
        z0={0}
        z1={h}
        topFill="var(--iso-accent-deep)"
        leftFill="#ffffff"
        rightFill="var(--iso-face-left)"
        stroke={stroke}
        strokeWidth={sw}
      />

      {/* Front-left vertical louvers (IN facade) */}
      {Array.from({ length: leftFluteCount }, (_, i) => {
        const f = (i + 1) / (leftFluteCount + 1);
        const insideDoorWidth = f > doorA - 0.03 && f < doorB + 0.03;
        const zStart = insideDoorWidth ? doorH + 0.25 : 0.02;
        const pTop = isoRaw(wu + size * f, wv + size, h - 0.02);
        const pBot = isoRaw(wu + size * f, wv + size, zStart);
        return (
          <line
            key={`lf-${i}`}
            x1={pTop.x}
            y1={pTop.y}
            x2={pBot.x}
            y2={pBot.y}
            stroke={STROKE_BASE}
            strokeWidth="0.85"
            strokeOpacity="0.62"
          />
        );
      })}

      {/* Front-right horizontal louvers (OUT facade) */}
      {Array.from({ length: rightLouverCount }, (_, i) => {
        const z = (h * (i + 1)) / (rightLouverCount + 1);
        if (z < doorH + 0.24) {
          // Split around OUT doorway & label
          const p1 = isoRaw(wu + size, wv, z);
          const p2 = isoRaw(wu + size, wv + size * (1 - doorB - 0.03), z);
          const p3 = isoRaw(wu + size, wv + size * (1 - doorA + 0.03), z);
          const p4 = isoRaw(wu + size, wv + size, z);
          return (
            <g key={`rl-${i}`} stroke={STROKE_BASE} strokeWidth="0.85" strokeOpacity="0.68">
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
              <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} />
            </g>
          );
        }
        const p1 = isoRaw(wu + size, wv, z);
        const p2 = isoRaw(wu + size, wv + size, z);
        return (
          <line
            key={`rl-${i}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={STROKE_BASE}
            strokeWidth="0.85"
            strokeOpacity="0.68"
          />
        );
      })}

      {/* Solid cobalt IN doorway + crisp double frame + isometric outlined label */}
      <polygon
        points={pts(inDoor)}
        fill="var(--iso-accent)"
        stroke="var(--iso-accent-deep)"
        strokeWidth="1.2"
      />
      <polygon
        points={pts([
          isoRaw(wu + size * (doorA + 0.04), wv + size, doorH - 0.04),
          isoRaw(wu + size * (doorB - 0.04), wv + size, doorH - 0.04),
          isoRaw(wu + size * (doorB - 0.04), wv + size, 0.01),
          isoRaw(wu + size * (doorA + 0.04), wv + size, 0.01),
        ])}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="0.8"
      />
      <text
        x={inDoorLabelPos.x}
        y={inDoorLabelPos.y}
        textAnchor="middle"
        fill="#ffffff"
        stroke="var(--iso-stroke)"
        strokeWidth="1"
        paintOrder="stroke"
        fontSize="13.5"
        fontWeight="800"
        fontFamily="var(--font-display)"
        letterSpacing="0.06em"
        transform={`translate(${inDoorLabelPos.x.toFixed(1)}, ${inDoorLabelPos.y.toFixed(1)}) skewY(26.565) translate(${(-inDoorLabelPos.x).toFixed(1)}, ${(-inDoorLabelPos.y).toFixed(1)})`}
      >
        IN
      </text>

      {/* Solid cobalt OUT doorway + crisp double frame + isometric outlined label */}
      <polygon
        points={pts(outDoor)}
        fill="var(--iso-accent)"
        stroke="var(--iso-accent-deep)"
        strokeWidth="1.2"
      />
      <polygon
        points={pts([
          isoRaw(wu + size, wv + size * (1 - doorB + 0.04), doorH - 0.04),
          isoRaw(wu + size, wv + size * (1 - doorA - 0.04), doorH - 0.04),
          isoRaw(wu + size, wv + size * (1 - doorA - 0.04), 0.01),
          isoRaw(wu + size, wv + size * (1 - doorB + 0.04), 0.01),
        ])}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="0.8"
      />
      <text
        x={outDoorLabelPos.x}
        y={outDoorLabelPos.y}
        textAnchor="middle"
        fill="#ffffff"
        stroke="var(--iso-stroke)"
        strokeWidth="1"
        paintOrder="stroke"
        fontSize="12.5"
        fontWeight="800"
        fontFamily="var(--font-display)"
        letterSpacing="0.04em"
        transform={`translate(${outDoorLabelPos.x.toFixed(1)}, ${outDoorLabelPos.y.toFixed(1)}) skewY(-26.565) translate(${(-outDoorLabelPos.x).toFixed(1)}, ${(-outDoorLabelPos.y).toFixed(1)})`}
      >
        OUT
      </text>

      {/* Crisp lime roof cross lines */}
      {roofGridFracs.map((f) => {
        const a1 = isoRaw(wu + size * f, wv, h);
        const a2 = isoRaw(wu + size * f, wv + size, h);
        const b1 = isoRaw(wu, wv + size * f, h);
        const b2 = isoRaw(wu + size, wv + size * f, h);
        return (
          <g key={`rg-${f}`} stroke="var(--iso-lime)" strokeOpacity="0.82" strokeWidth="1.05">
            <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} />
            <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} />
          </g>
        );
      })}

      {/* White central cylindrical roof hub */}
      <path
        d={[
          `M ${(roofCenter.x - hubRx).toFixed(2)} ${(roofCenter.y - hubH).toFixed(2)}`,
          `L ${(roofCenter.x - hubRx).toFixed(2)} ${roofCenter.y.toFixed(2)}`,
          `A ${hubRx} ${hubRy} 0 0 0 ${(roofCenter.x + hubRx).toFixed(2)} ${roofCenter.y.toFixed(2)}`,
          `L ${(roofCenter.x + hubRx).toFixed(2)} ${(roofCenter.y - hubH).toFixed(2)}`,
          "Z",
        ].join(" ")}
        fill="var(--iso-face-left)"
        stroke="var(--iso-accent-deep)"
        strokeWidth="1.15"
      />
      <ellipse
        cx={roofCenter.x}
        cy={roofCenter.y - hubH}
        rx={hubRx}
        ry={hubRy}
        fill="#ffffff"
        stroke="var(--iso-accent-deep)"
        strokeWidth="1.15"
      />
      <circle
        cx={roofCenter.x}
        cy={roofCenter.y - hubH}
        r={3}
        fill="var(--iso-lime)"
        stroke="var(--iso-accent-deep)"
        strokeWidth="1.25"
      />
    </g>
  );
}

/**
 * Returns the exact anchor point on top of the central tower's white roof hub
 * so the orthogonal leader line connects with sub-pixel accuracy.
 */
export function getCentralTowerAnchor() {
  const { wu, wv, size } = cellFootprint(2, 2, 0.88);
  const p = isoRaw(wu + size / 2, wv + size / 2, 1.66);
  return { x: p.x, y: p.y - 12 };
}

/**
 * Returns the exact visual top-center anchor point for any tile in the 5x5 grid
 * so clicking any building draws a crisp orthogonal leader line from its exact roof/apex.
 */
export function getTileTopAnchor(u: number, v: number, kind: string) {
  if (kind === "tower") return getCentralTowerAnchor();
  const { wu, wv, size } = cellFootprint(u, v, 0.76);
  const cu = wu + size / 2;
  const cv = wv + size / 2;
  switch (kind) {
    case "stripedCube":
      return isoRaw(cu, cv, 0.68);
    case "stepped":
      return isoRaw(cu, cv, 0.56);
    case "silo": {
      const p = isoRaw(cu, cv, 0.07);
      return { x: p.x, y: p.y - 34 };
    }
    case "kiosk":
      return isoRaw(cu, cv, 0.28);
    case "trees": {
      const p = isoRaw(cu, cv, 0);
      return { x: p.x, y: p.y - 16 };
    }
    default:
      return isoRaw(cu, cv, 0.24);
  }
}

/**
 * Small animated isometric data-packet cube (centered at 0,0 so it rides along SVG motion paths).
 */
export function IsoPacketCubeGlyph({ accent = false }: { accent?: boolean }) {
  const s = 9;
  const h = 10;
  const dy = 4.5;
  return (
    <g>
      {/* Left face */}
      <polygon
        points={`0,${-h + dy} ${-s},${-h} ${-s},0 0,${dy}`}
        fill="#ffffff"
        stroke="var(--iso-stroke)"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      {/* Right face */}
      <polygon
        points={`0,${-h + dy} ${s},${-h} ${s},0 0,${dy}`}
        fill={accent ? "var(--iso-lime)" : "var(--iso-pad)"}
        stroke="var(--iso-stroke)"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      {/* Top face */}
      <polygon
        points={`0,${-h - dy} ${s},${-h} 0,${-h + dy} ${-s},${-h}`}
        fill="#ffffff"
        stroke="var(--iso-stroke)"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      {/* Tiny forest screen/dot on front-left face */}
      <circle cx={-4.4} cy={-3.4} r={1.85} fill="var(--iso-accent-deep)" />
    </g>
  );
}

/**
 * Small static relay cube positioned near an avenue corner (matching reference micro-cubes).
 */
export function IsoRelayCube({ u, v }: { u: number; v: number }) {
  const p = isoRaw(warpCoord(u), warpCoord(v), 0);
  return (
    <g transform={`translate(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`}>
      <IsoPacketCubeGlyph />
    </g>
  );
}

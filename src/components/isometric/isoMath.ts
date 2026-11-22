export interface Point2D {
  x: number;
  y: number;
}

// Exact 2:1 isometric projection constants calibrated for viewBox 0 0 1120 620
export const ISO_ORIGIN_X = 560;
export const ISO_ORIGIN_Y = 92;
export const ISO_UNIT_X = 84;
export const ISO_UNIT_Y = 42;
export const ISO_UNIT_Z = 76;

// Slight avenue widening around the central hub (u=2, v=2) for dashed data lanes
export const AVENUE_EXTRA = 0.24;

export function warpCoord(coord: number): number {
  return coord > 2.5 ? coord + AVENUE_EXTRA : coord;
}

/**
 * Projects isometric world coordinates (u = down-right, v = down-left, z = up)
 * into 2D SVG coordinates.
 */
export function isoRaw(u: number, v: number, z = 0): Point2D {
  return {
    x: ISO_ORIGIN_X + (u - v) * ISO_UNIT_X,
    y: ISO_ORIGIN_Y + (u + v) * ISO_UNIT_Y - z * ISO_UNIT_Z,
  };
}

/**
 * Projects grid-cell coordinates using the widened central cross-avenues.
 */
export function isoGrid(u: number, v: number, z = 0): Point2D {
  return isoRaw(warpCoord(u), warpCoord(v), z);
}

export function pts(points: Point2D[]): string {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

/**
 * Builds a rectangle/diamond polygon in the horizontal plane at altitude z.
 */
export function isoDiamond(
  u0: number,
  v0: number,
  du: number,
  dv: number,
  z = 0
): Point2D[] {
  const wu0 = warpCoord(u0);
  const wv0 = warpCoord(v0);
  return [
    isoRaw(wu0, wv0, z),
    isoRaw(wu0 + du, wv0, z),
    isoRaw(wu0 + du, wv0 + dv, z),
    isoRaw(wu0, wv0 + dv, z),
  ];
}

export function cellFootprint(u: number, v: number, size: number) {
  const pad = (1 - size) / 2;
  const wu = warpCoord(u) + pad;
  const wv = warpCoord(v) + pad;
  return { wu, wv, size };
}

/**
 * Center coordinates of the two main cross-avenues:
 * - IN avenue runs along v = IN_AVENUE_V (between row v=2 and row v=3)
 * - OUT avenue runs along u = OUT_AVENUE_U (between col u=2 and col u=3)
 */
export const IN_AVENUE_V = 3 + AVENUE_EXTRA / 2 - 0.02;
export const OUT_AVENUE_U = 3 + AVENUE_EXTRA / 2 - 0.02;

import type { IconFamilyToken } from "./semantic-icon-family";
import { semanticIconFamilyTokens } from "./semantic-icon-family";

export type IconFamilyKey = "default" | "emphasis";
export type IconStyle = "outlined" | "rounded";
export type IconSizeKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

export const ICON_WEIGHTS: IconWeight[] = [100, 200, 300, 400, 500, 600, 700];
export const DEFAULT_ICON_WEIGHT: IconWeight = 400;

export const ICON_SIZE_TOKENS: Record<IconSizeKey, { token: string; px: number }> = {
  xs: { token: "--icon-size-xs", px: 12 },
  sm: { token: "--icon-size-sm", px: 14 },
  md: { token: "--icon-size-md", px: 16 },
  lg: { token: "--icon-size-lg", px: 18 },
  xl: { token: "--icon-size-xl", px: 20 },
  "2xl": { token: "--icon-size-2xl", px: 24 },
};

export const ICON_FAMILY_BY_KEY: Record<IconFamilyKey, IconFamilyToken> = {
  default: semanticIconFamilyTokens[0],
  emphasis: semanticIconFamilyTokens[1],
};

export function iconStyleFor(family: IconFamilyKey): IconStyle {
  return ICON_FAMILY_BY_KEY[family].style;
}


export const ICON_VIEWBOX = "0 -960 960 960";

import type { ReactNode } from "react";

export type ControlKind = "select" | "boolean" | "text";

export type ControlSchema = {
  name: string;
  label: string;
  kind: ControlKind;
  options?: string[];
  defaultValue: string | boolean;
};

export type AnatomyPart = {
  id: number;
  name: string;
  description: string;
};

export type TokenDeclaration = {
  property: string;
  token: string;
  fallback: string;
  /** Optional resolved color for a swatch preview. */
  swatch?: string;
};

export type TokenGroup = {
  label: string;
  declarations: TokenDeclaration[];
};

/**
 * Component tokens are the third tier of the token architecture:
 * `--<component>-<part>-<role>` names that alias a semantic token.
 * Components consume ONLY component tokens; overrides can happen at
 * any of the three layers (primitive, semantic, component).
 */
export type ComponentTokenDeclaration = {
  /** The component token itself, e.g. `--card-background`. */
  token: string;
  /** Human-friendly description of what this token controls. */
  description?: string;
  /** The semantic (or primitive) token this component token aliases. */
  aliasOf: string;
  /** Resolved display value (primitive fallback). */
  fallback: string;
  /** Optional color swatch. */
  swatch?: string;
};

export type ComponentTokenGroup = {
  label: string;
  tokens: ComponentTokenDeclaration[];
};

export type DocEntry = {
  slug: string;
  name: string;
  description: string;
  render: (props: Record<string, unknown>) => ReactNode;
  /**
   * Optional full-page renderer for components (e.g., Shell) that benefit
   * from being previewed at viewport size. When present, the doc page
   * exposes a "View full page" button.
   */
  fullPageRender?: (opts: {
    showGrid: boolean;
    showAnatomy: boolean;
    breakpoint: BreakpointKey;
    width: number;
    options: Record<string, string>;
  }) => ReactNode;
  /**
   * Extra segmented toggles rendered in the full-page preview toolbar.
   * Their current values are passed to `fullPageRender` via `options`.
   */
  fullPageOptions?: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    defaultValue: string;
  }[];
  controls: ControlSchema[];
  /** Hide the "Interactive example" section (e.g. gallery-driven components). */
  hideExample?: boolean;
  /** Open the full-page renderer immediately when the page loads. */
  autoFullPage?: boolean;
  /** Overrides the eyebrow label above the title (default "Component"). */
  kindLabel?: string;
  /** Hide the "Tokens" section (e.g. when tokens are surfaced elsewhere). */
  hideTokens?: boolean;
  anatomy: AnatomyPart[];
  tokens: TokenGroup[] | ((state: Record<string, unknown>) => TokenGroup[]);
  /**
   * Optional consolidated token set that lists every token used across all
   * semantics and variants of the component. Rendered in the combined
   * "All tokens" block at the bottom of the doc when present.
   */
  combinedTokens?: TokenGroup[];
  /**
   * Component-token surface: the addressable `--<component>-*` variables
   * a consumer can override. Each entry aliases a semantic token.
   */
  componentTokens?: ComponentTokenGroup[];
  /**
   * Optional extra documentation sections rendered after the token blocks.
   */
  extraSections?: {
    id: string;
    title: string;
    description?: string;
    content: ReactNode;
  }[];
  /** Which layout to render. Defaults to "component". */
  layout?:
    | "component"
    | "tokens-primitive-colors"
    | "tokens-primitive-spacing"
    | "tokens-primitive-radius"
    | "tokens-primitive-font-family"
    | "tokens-primitive-font-size"
    | "tokens-primitive-font-weight"
    | "tokens-primitive-line-height"
    | "tokens-primitive-icon-size"
    | "tokens-primitive-icon-weight"
    | "tokens-primitive-border-width"
    | "tokens-primitive-shadow"
    | "tokens-primitive-opacity"
    | "tokens-primitive-duration"
    | "tokens-primitive-easing"
    | "tokens-primitive-letter-spacing"
    | "tokens-semantic-v2"
    | "tokens-semantic-typography"
    | "tokens-semantic-text-family"
    | "tokens-semantic-icon-family"
    | "tokens-semantic-icon-weight"
    | "tokens-overview";
  /** For `tokens-semantic-v2`: which semantic section to render. */
  semanticSection?: string;
};

export type DocGroup = {
  id: "foundations" | "atomic" | "components" | "simulations";
  label: string;
  entries: DocEntry[];
};

export type BreakpointKey =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "self";

export const BREAKPOINTS: {
  key: BreakpointKey;
  label: string;
  width: number;
  columns: number;
  margin: number;
  gutter: number;
}[] = [
  { key: "xs", label: "XS", width: 420, columns: 4, margin: 16, gutter: 16 },
  { key: "sm", label: "SM", width: 640, columns: 8, margin: 24, gutter: 16 },
  { key: "md", label: "MD", width: 768, columns: 8, margin: 24, gutter: 24 },
  { key: "lg", label: "LG", width: 1024, columns: 12, margin: 32, gutter: 24 },
  { key: "xl", label: "XL", width: 1280, columns: 12, margin: 32, gutter: 24 },
  { key: "2xl", label: "2XL", width: 1536, columns: 12, margin: 40, gutter: 24 },
  { key: "3xl", label: "3XL", width: 1920, columns: 12, margin: 40, gutter: 24 },
];

/**
 * Returns the preset whose band a given pixel width falls into.
 * Used by the live "My screen" breakpoint, which has no fixed width.
 */
export function resolveBreakpoint(width: number) {
  let match = BREAKPOINTS[0];
  for (const b of BREAKPOINTS) {
    if (width >= b.width) match = b;
  }
  return match;
}
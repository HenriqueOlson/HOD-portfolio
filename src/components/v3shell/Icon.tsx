import {
  DEFAULT_ICON_WEIGHT,
  ICON_FAMILY_BY_KEY,
  ICON_SIZE_TOKENS,
  ICON_VIEWBOX,
  iconStyleFor,
  type IconFamilyKey,
  type IconSizeKey,
  type IconWeight,
} from "./icons";
import iconPaths from "./icon-paths.json";

export type IconProps = {
  /** Material Symbols icon name, e.g. "search" or "home". */
  name: string;
  /** Semantic icon family: `default` (outlined) or `emphasis` (rounded). */
  family?: IconFamilyKey;
  size?: IconSizeKey;
  /** Material Symbols weight axis (100–700). Defaults to 400. */
  weight?: IconWeight;
  /** Material Symbols fill axis. Defaults to false (outlined glyph). */
  fill?: boolean;
  /** Optional accessible label. Omit for decorative icons. */
  label?: string;
  className?: string;
};

/**
 * Design-system icon. Consumes component tokens only:
 * `--icon-family`, `--icon-size`, `--icon-color`, `--icon-weight`, `--icon-fill`.
 */
export function Icon({
  name,
  family = "default",
  size = "2xl",
  weight = DEFAULT_ICON_WEIGHT,
  fill = false,
  label,
  className,
}: IconProps) {
  const style = iconStyleFor(family);
  const variants = iconPaths as Record<string, Record<string, string>>;
  const set = variants[style + '-' + weight + (fill ? '-fill' : '')] ?? variants[style + '-400'];
  const path = set?.[name];
  const sizeToken = ICON_SIZE_TOKENS[size];
  const familyToken = ICON_FAMILY_BY_KEY[family];

  const boxStyle = {
    ["--icon-family" as string]: `var(${familyToken.token}, ${familyToken.reference})`,
    ["--icon-size" as string]: `var(${sizeToken.token}, ${sizeToken.px}px)`,
    ["--icon-color" as string]: "currentColor",
    ["--icon-weight" as string]: `var(--icon-weight-${weight}, ${weight})`,
    ["--icon-fill" as string]: fill ? "1" : "0",
    width: "var(--icon-size)",
    height: "var(--icon-size)",
    color: "var(--icon-color)",
    display: "inline-block",
    flex: "none",
  } as React.CSSProperties;

  if (!path) {
    // Reserve layout while the icon set loads (or when the name is unknown).
    return <span aria-hidden style={boxStyle} className={className} />;
  }

  return (
    <svg
      viewBox={ICON_VIEWBOX}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={boxStyle}
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

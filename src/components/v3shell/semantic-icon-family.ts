export type IconFamilyToken = {
  token: string;
  role: string;
  reference: string;
  primitiveToken: string;
  /** Material Symbols style folder this family resolves to. */
  style: "outlined" | "rounded";
};

/**
 * Primitive icon families. Context-free references to the two Material
 * Symbols styles shipped with the design system.
 */
export const primitiveIconFamilyTokens = [
  { token: "--icon-family-outlined", value: "material-symbols-outlined" },
  { token: "--icon-family-rounded", value: "material-symbols-rounded" },
] as const;

export const semanticIconFamilyTokens: IconFamilyToken[] = [
  {
    token: "--iconFamily-default",
    role: "Default UI iconography",
    reference: "var(--icon-family-outlined)",
    primitiveToken: "--icon-family-outlined",
    style: "outlined",
  },
  {
    token: "--iconFamily-emphasis",
    role: "Expressive / marketing iconography",
    reference: "var(--icon-family-rounded)",
    primitiveToken: "--icon-family-rounded",
    style: "rounded",
  },
];

export function semanticIconFamilyAsCss(): string {
  const lines: string[] = [":root {"];
  primitiveIconFamilyTokens.forEach((t) => {
    lines.push(`  ${t.token}: ${t.value};`);
  });
  semanticIconFamilyTokens.forEach((t) => {
    lines.push(`  ${t.token}: var(${t.primitiveToken});`);
  });
  lines.push("}");
  return lines.join("\n");
}

import { useEffect, useRef } from "react";
import { Grid3X3 } from "lucide-react";
import {
  WAFFLE_BY_ID,
  WAFFLE_SECTIONS,
  type WaffleDashboard,
} from "./waffle-dashboards";

/**
 * "Switch dashboard" waffle panel — presentational port of the Korelabs.space
 * ProductSwitcher (compact variant) for The Waffle screen simulation.
 */
export function WaffleSwitcherPanel({
  activeId,
  onSelect,
  onClose,
  align = "left",
}: {
  activeId?: string;
  onSelect?: (d: WaffleDashboard) => void;
  onClose: () => void;
  align?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: MouseEvent) => {
      const el = ref.current;
      if (el && !el.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Switch dashboard"
      className="no-scrollbar"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        ...(align === "right" ? { right: 0 } : { left: 0 }),
        zIndex: 60,
        width: 440,
        borderRadius: 4,
        border: "1px solid var(--borderColor-default, #E5E7EB)",
        background: "var(--bgColor-default, #FFFFFF)",
        color: "var(--fgColor-default, #111827)",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--borderColor-default, #E5E7EB)",
          background: "var(--bgColor-muted, #F9FAFB)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fgColor-muted, #6B7280)",
          }}
        >
          Switch dashboard
        </span>
        <Grid3X3 size={16} color="var(--fgColor-muted, #6B7280)" />
      </div>

      <div
        className="no-scrollbar"
        style={{ padding: 8, maxHeight: "72vh", overflowY: "auto" }}
      >
        {WAFFLE_SECTIONS.map((section, si) => (
          <div
            key={si}
            style={
              si > 0
                ? {
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid var(--borderColor-default, #E5E7EB)",
                  }
                : undefined
            }
          >
            {section.label && (
              <div
                style={{
                  padding: "0 4px 8px",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--fgColor-muted, #6B7280)",
                }}
              >
                {section.label}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {section.rows.map((row, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gridAutoColumns: "minmax(0, 1fr)",
                    gap: 4,
                  }}
                >
                  {row.map((id) => {
                    const d = WAFFLE_BY_ID[id];
                    if (!d) return null;
                    return (
                      <WaffleTile
                        key={id}
                        d={d}
                        active={activeId === d.id}
                        onSelect={onSelect}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaffleTile({
  d,
  active,
  onSelect,
}: {
  d: WaffleDashboard;
  active: boolean;
  onSelect?: (d: WaffleDashboard) => void;
}) {
  const Icon = d.icon;
  const isSoon = d.status === "soon";
  const isConcept = d.status === "concept";
  return (
    <button
      type="button"
      title={`${d.label}${isSoon ? " (soon)" : isConcept ? " (concept)" : ""}`}
      disabled={isSoon}
      onClick={() => onSelect?.(d)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 8,
        minWidth: 0,
        borderRadius: 4,
        border: "none",
        textAlign: "center",
        background: active ? "hsl(213,90%,96%)" : "transparent",
        cursor: isSoon ? "not-allowed" : "pointer",
        transition: "background-color 150ms",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "var(--bgColor-muted, #F3F4F6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = active ? "hsl(213,90%,96%)" : "transparent";
      }}
    >
      <span
        style={{
          position: "relative",
          width: 36,
          height: 36,
          borderRadius: 6,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: d.iconBg,
        }}
      >
        <Icon size={16} color={d.iconColor} strokeWidth={1.75} />
        {isConcept && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              fontSize: 7,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#92400E",
              background: "#FEF3C7",
              border: "1px solid #FCD34D",
              padding: "1px 4px",
              borderRadius: 3,
              lineHeight: 1,
            }}
          >
            C
          </span>
        )}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          lineHeight: 1.2,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "var(--fgColor-default, #111827)",
        }}
      >
        {d.label}
      </span>
    </button>
  );
}

// Extracted from the user-supplied v3shell.zip for the portfolio case.
import type { TokenDeclaration } from "./types";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { createContext, Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { WaffleSwitcherPanel } from "./waffle-switcher";
import { WAFFLE_BY_ID } from "./waffle-dashboards";
import { WaffleDealroomOverview, WaffleDealroomPlaceholder } from "./waffle-dealroom-overview";
import { StepStatus } from "./stepper";
import { Icon } from "./Icon";
import { type IconSizeKey } from "./icons";
import { BREAKPOINTS, resolveBreakpoint, type BreakpointKey } from "./types";

export type ShellRegionProps = Partial<Record<
  "header" | "navigation" | "content",
  HTMLAttributes<HTMLDivElement>
>>;

function NavToggleButton({
  collapsed,
  isXs,
  onToggle,
  style,
}: {
  collapsed: boolean;
  isXs: boolean;
  onToggle: () => void;
  style?: CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
      aria-expanded={!collapsed}
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onBlur={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderRadius: 8,
        border: "none",
        background:
          active || hover
            ? "var(--color-gray-100, #F1F2F4)"
            : "transparent",
        color: "var(--color-fg-primary, #111827)",
        cursor: "pointer",
        flexShrink: 0,
        transition:
          "background-color var(--shell-nav-transition-duration, 200ms) var(--shell-nav-transition-easing, cubic-bezier(0.4, 0, 0.2, 1))",
        ...style,
      }}
    >
      {isXs ? (
        <Menu size={24} />
      ) : (
        <Icon
          name={
            collapsed
              ? "keyboard_double_arrow_right"
              : "keyboard_double_arrow_left"
          }
          family="emphasis"
          size="2xl"
          weight={400}
        />
      )}
    </button>
  );
}

export type ButtonType = "primary" | "secondary" | "tertiary" | "quaternary";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonState = "default" | "hover" | "focus" | "disabled";

export type ButtonSurface = "50" | "100";

type ButtonSizeSpec = {
  padY: { token: string; fallback: string };
  padX: { token: string; fallback: string };
  icon: { token: string; fallback: string; key: IconSizeKey };
  text: {
    family: string;
    size: string;
    line: string;
    weight: string;
    sizePx: string;
    linePx: string;
  };
};

const buttonText = (
  scale: "sm" | "md" | "lg",
  sizePx: string,
): ButtonSizeSpec["text"] => ({
  family: `--typography-body-${scale}-regular-font-family`,
  size: `--typography-body-${scale}-regular-font-size`,
  line: "--line-height-sm",
  weight: `--typography-body-${scale}-regular-font-weight`,
  sizePx,
  linePx: "1.2",
});

const buttonSizeSpec: Record<ButtonSize, ButtonSizeSpec> = {
  small: {
    padY: { token: "--space-inset-xs", fallback: "8px" },
    padX: { token: "--space-inset-md", fallback: "16px" },
    icon: { token: "--icon-size-md", fallback: "16px", key: "md" },
    text: buttonText("sm", "14px"),
  },
  medium: {
    padY: { token: "--space-10", fallback: "10px" },
    padX: { token: "--space-inset-lg", fallback: "20px" },
    icon: { token: "--icon-size-2xl", fallback: "24px", key: "2xl" },
    text: buttonText("md", "16px"),
  },
  large: {
    padY: { token: "--space-inset-sm", fallback: "12px" },
    padX: { token: "--space-inset-xl", fallback: "24px" },
    icon: { token: "--icon-size-2xl", fallback: "24px", key: "2xl" },
    text: buttonText("lg", "18px"),
  },
};

const buttonQuaternarySpec: Record<ButtonSize, ButtonSizeSpec> = {
  small: {
    padY: { token: "--space-2", fallback: "2px" },
    padX: { token: "--space-inset-xs", fallback: "8px" },
    icon: { token: "--icon-size-md", fallback: "16px", key: "md" },
    text: buttonText("sm", "14px"),
  },
  medium: {
    padY: { token: "--space-2", fallback: "2px" },
    padX: { token: "--space-10", fallback: "10px" },
    icon: { token: "--icon-size-xl", fallback: "20px", key: "xl" },
    text: buttonText("md", "16px"),
  },
  large: {
    padY: { token: "--space-2", fallback: "2px" },
    padX: { token: "--space-10", fallback: "10px" },
    icon: { token: "--icon-size-xl", fallback: "20px", key: "xl" },
    text: buttonText("md", "16px"),
  },
};

function buttonSpecFor(type: ButtonType, size: ButtonSize): ButtonSizeSpec {
  return type === "quaternary" ? buttonQuaternarySpec[size] : buttonSizeSpec[size];
}

type ButtonPalette = {
  bg: TokenDeclaration;
  border: TokenDeclaration;
  fg: TokenDeclaration;
};

const BUTTON_FOCUS_BORDER: TokenDeclaration = {
  property: "border-color",
  token: "--color-brand-primary-400",
  fallback: "#44A7FD",
  swatch: "#44A7FD",
};

const BUTTON_NO_BORDER: TokenDeclaration = {
  property: "border-color",
  token: "--color-transparent",
  fallback: "transparent",
};

function buttonPalette(
  type: ButtonType,
  state: ButtonState,
  surface: ButtonSurface = "50",
): ButtonPalette {
  const white: TokenDeclaration = { property: "background", token: "--color-white", fallback: "#FFFFFF", swatch: "#FFFFFF" };
  const transparent: TokenDeclaration = { property: "background", token: "--color-transparent", fallback: "transparent" };
  const gray100: TokenDeclaration = { property: "background", token: "--color-gray-100", fallback: "#F3F4F6", swatch: "#F3F4F6" };
  const gray200: TokenDeclaration = { property: "background", token: "--color-gray-200", fallback: "#E5E7EB", swatch: "#E5E7EB" };
  const gray400bg: TokenDeclaration = { property: "background", token: "--color-gray-400", fallback: "#9CA3AF", swatch: "#9CA3AF" };
  const brand700fg: TokenDeclaration = { property: "color", token: "--color-brand-primary-700", fallback: "#025297", swatch: "#025297" };
  const whiteFg: TokenDeclaration = { property: "color", token: "--color-white", fallback: "#FFFFFF", swatch: "#FFFFFF" };
  const gray400fg: TokenDeclaration = { property: "color", token: "--color-gray-400", fallback: "#9CA3AF", swatch: "#9CA3AF" };

  if (type === "primary") {
    if (state === "disabled") return { bg: gray400bg, border: BUTTON_NO_BORDER, fg: whiteFg };
    return {
      bg:
        state === "hover"
          ? { property: "background", token: "--color-brand-primary-800", fallback: "#043C6E", swatch: "#043C6E" }
          : { property: "background", token: "--color-brand-primary-700", fallback: "#025297", swatch: "#025297" },
      border: state === "focus" ? BUTTON_FOCUS_BORDER : BUTTON_NO_BORDER,
      fg: whiteFg,
    };
  }

  if (type === "secondary") {
    if (state === "disabled") {
      return {
        bg: white,
        border: { property: "border-color", token: "--color-gray-400", fallback: "#9CA3AF", swatch: "#9CA3AF" },
        fg: gray400fg,
      };
    }
    return {
      bg: state === "hover" ? gray100 : white,
      border:
        state === "focus"
          ? BUTTON_FOCUS_BORDER
          : { property: "border-color", token: "--color-brand-primary-600", fallback: "#006AC6", swatch: "#006AC6" },
      fg: brand700fg,
    };
  }

  if (type === "tertiary") {
    if (state === "disabled") return { bg: transparent, border: BUTTON_NO_BORDER, fg: gray400fg };
    return {
      bg: state === "hover" ? gray100 : state === "focus" ? white : transparent,
      border: state === "focus" ? BUTTON_FOCUS_BORDER : BUTTON_NO_BORDER,
      fg: brand700fg,
    };
  }

  // quaternary — the surface pair (50 = on white, 100 = on grey)
  if (state === "disabled") {
    return { bg: surface === "100" ? gray100 : transparent, border: BUTTON_NO_BORDER, fg: gray400fg };
  }
  const rest = surface === "100" ? gray100 : transparent;
  const hover = surface === "100" ? gray200 : gray100;
  return {
    bg: state === "hover" ? hover : rest,
    border: state === "focus" ? BUTTON_FOCUS_BORDER : BUTTON_NO_BORDER,
    fg: brand700fg,
  };
}

const BUTTON_ICON_VARS = {
  ["--button-icon-family" as string]: "var(--iconFamily-emphasis, var(--icon-family-rounded, material-symbols-rounded))",
  ["--button-icon-weight" as string]: "var(--iconWeight-default, var(--icon-weight-400, 400))",
  ["--button-icon-fill" as string]: "var(--icon-fill-none, 0)",
  ["--icon-family" as string]: "var(--button-icon-family)",
  ["--icon-weight" as string]: "var(--button-icon-weight)",
  ["--icon-fill" as string]: "var(--button-icon-fill)",
  display: "inline-flex",
} as React.CSSProperties;

export function DsButton({
  type = "primary",
  size = "medium",
  surface = "50",
  state,
  label = "Button label",
  leftIcon,
  rightIcon,
  onClick,
}: {
  type?: ButtonType;
  size?: ButtonSize;
  surface?: ButtonSurface;
  /** Force a state for documentation. Omit for real interaction. */
  state?: ButtonState;
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const resolved: ButtonState =
    state ?? (focused ? "focus" : hovered ? "hover" : "default");
  const disabled = resolved === "disabled";
  const spec = buttonSpecFor(type, size);
  const pal = buttonPalette(type, resolved, surface);

  const borderWidth = resolved === "focus" ? 2 : type === "secondary" ? 1 : 0;
  const radiusToken =
    type === "quaternary"
      ? "var(--button-radius-quaternary, var(--radius-sm, 4px))"
      : size === "small"
        ? "var(--button-radius-sm, var(--radius-lg, 8px))"
        : "var(--button-radius, var(--radius-button-default, 10px))";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--button-gap, var(--space-inline-sm, 8px))",
        padding: `var(${spec.padY.token}, ${spec.padY.fallback}) var(${spec.padX.token}, ${spec.padX.fallback})`,
        borderRadius: radiusToken,
        borderWidth,
        borderStyle: borderWidth > 0 ? "solid" : "none",
        borderColor: pal.border.fallback,
        background: pal.bg.fallback,
        color: pal.fg.fallback,
        fontFamily: `var(${spec.text.family}, Inter, sans-serif)`,
        fontSize: `var(${spec.text.size}, ${spec.text.sizePx})`,
        lineHeight: `var(${spec.text.line}, ${spec.text.linePx})`,
        fontWeight: (disabled
          ? "var(--font-weight-medium, 500)"
          : `var(${spec.text.weight}, 400)`) as unknown as number,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 120ms ease, border-color 120ms ease",
        boxSizing: "border-box",
        outline: "none",
      }}
    >
      {leftIcon && (
        <span style={BUTTON_ICON_VARS}>
          <Icon name={leftIcon} family="emphasis" size={spec.icon.key} weight={400} fill={false} />
        </span>
      )}
      <span>{label}</span>
      {rightIcon && (
        <span style={BUTTON_ICON_VARS}>
          <Icon name={rightIcon} family="emphasis" size={spec.icon.key} weight={400} fill={false} />
        </span>
      )}
    </button>
  );
}

const shellSlotStyle: CSSProperties = {
  background: "var(--shell-slot-bg, var(--bgColor-neutral-muted, #F3F4F6))",
  border: "1px dashed var(--shell-slot-border, var(--borderColor-muted, #E5E7EB))",
  borderRadius: 4,
};

export function NavItemView({
  label,
  iconName,
  collapsed = false,
  selected = false,
  forcedHover = false,
  onClick,
}: {
  label: string;
  iconName: string;
  collapsed?: boolean;
  selected?: boolean;
  forcedHover?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isHover = (hovered || forcedHover) && !selected;

  const background = selected
    ? "var(--nav-item-selected-background, #F1F8FE)"
    : isHover
      ? "var(--nav-item-hover-background, #F1F2F4)"
      : "var(--nav-item-background, transparent)";

  const color = selected
    ? "var(--nav-item-selected-label-color, #0084F8)"
    : "var(--nav-item-label-color, #374151)";

  return (
    <button
      type="button"
      aria-current={selected ? "page" : undefined}
      title={collapsed ? label : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "var(--nav-item-align, center)",
        justifyContent: collapsed
          ? "var(--nav-item-collapsed-justify, center)"
          : "flex-start",
        width: collapsed
          ? "var(--nav-item-collapsed-width, auto)"
          : "var(--nav-item-width, 100%)",
        height: undefined,
        boxSizing: "border-box",
        minWidth: 0,
        padding: collapsed
          ? "var(--nav-item-collapsed-padding, 6px)"
          : "var(--nav-item-padding, 6px)",
        borderRadius: "var(--nav-item-radius, 8px)",
        background,
        border: "none",
        cursor: "var(--nav-item-cursor, pointer)",
        textAlign: "left",
        overflow: "hidden",
        transition:
          "padding var(--nav-item-transition-duration, 200ms) var(--nav-item-transition-easing, cubic-bezier(0.4, 0, 0.2, 1)), width var(--nav-item-transition-duration, 200ms) var(--nav-item-transition-easing, cubic-bezier(0.4, 0, 0.2, 1)), background-color var(--nav-item-transition-duration, 200ms) var(--nav-item-transition-easing, cubic-bezier(0.4, 0, 0.2, 1))",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "var(--nav-item-lead-align, center)",
          gap: collapsed ? 0 : "var(--nav-item-lead-gap, 12px)",
          minWidth: 0,
          transition:
            "gap var(--nav-item-transition-duration, 200ms) var(--nav-item-transition-easing, cubic-bezier(0.4, 0, 0.2, 1))",
          color: selected
            ? "var(--nav-item-selected-icon-color, #0084F8)"
            : "var(--nav-item-icon-color, #374151)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}
        >
          <Icon name={iconName} family="emphasis" size="2xl" weight={500} />
        </span>
        <span
          aria-hidden={collapsed || undefined}
          style={{
            fontFamily: "var(--nav-item-label-font-family, Roboto, sans-serif)",
            fontSize: "var(--nav-item-label-font-size, 16px)",
            lineHeight: "var(--nav-item-label-line-height, 1.2)",
            fontWeight: (selected
              ? "var(--nav-item-selected-label-font-weight, 500)"
              : "var(--nav-item-label-font-weight, 400)") as unknown as number,
            color,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
            maxWidth: collapsed ? 0 : 240,
            opacity: collapsed ? 0 : 1,
            pointerEvents: collapsed ? "none" : undefined,
            flexShrink: 1,
            transition:
              "max-width var(--nav-item-transition-duration, 200ms) var(--nav-item-transition-easing, cubic-bezier(0.4, 0, 0.2, 1)), opacity var(--nav-item-transition-duration, 200ms) var(--nav-item-transition-easing, cubic-bezier(0.4, 0, 0.2, 1))",
          }}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

function WaffleLobSelector({
  onSelectDashboard,
  activeId = "company",
}: {
  onSelectDashboard?: (id: string) => void;
  activeId?: string;
}) {
  const [open, setOpen] = useState(false);
  const active = WAFFLE_BY_ID[activeId];
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <LobSelectorView
        label={active?.label ?? "Line of business"}
        iconName="grid_on"
        open={open}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <WaffleSwitcherPanel
          align="right"
          activeId={activeId}
          onSelect={(d) => {
            onSelectDashboard?.(d.id);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export function LobSelectorView({
  label,
  iconName = "grid_on",
  iconNode: _iconNode,
  pictureColor: _pictureColor,
  forcedHover = false,
  open = false,
  onClick,
}: {
  label: string;
  iconName?: string;
  iconNode?: ReactNode;
  pictureColor?: string;
  forcedHover?: boolean;
  open?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isHover = hovered || forcedHover || open;

  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "var(--notification-action-display, inline-flex)" as CSSProperties["display"],
        alignItems: "var(--notification-action-align, center)",
        justifyContent: "var(--notification-action-align, center)",
        padding: "var(--notification-action-padding, 10px)",
        borderRadius: "var(--notification-action-radius, 8px)",
        background: isHover
          ? "var(--notification-action-hover-background, #F1F2F4)"
          : "var(--notification-action-background, transparent)",
        border: "var(--notification-action-border, none)" as CSSProperties["border"],
        cursor: "var(--notification-action-cursor, pointer)",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--notification-action-icon-size, 24px)",
          height: "var(--notification-action-icon-size, 24px)",
          color: "var(--notification-action-icon-color, #374151)",
        }}
      >
        <Icon name={iconName} family="emphasis" size="xl" weight={400} fill />
      </span>
    </button>
  );
}

const shellRefBadgeStyle: CSSProperties = {
  position: "absolute",
  top: 4,
  left: 4,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "hsl(var(--primary))",
  color: "hsl(var(--primary-foreground))",
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 1,
  zIndex: 2,
  pointerEvents: "none",
};

const ShellAnatomyContext = createContext(false);

const ShellContentWidthContext = createContext<{
  frameWidth: number;
  contentWidth: number;
} | null>(null);

function ShellRef({ n, style }: { n: number; style?: CSSProperties }) {
  const show = useContext(ShellAnatomyContext);
  if (!show) return null;
  return <span style={{ ...shellRefBadgeStyle, ...style }}>{n}</span>;
}

const NAV_WIDTH_EXPANDED = 336;

const SHELL_NAV_MENU: WaffleNavItem[] = [
  { label: "Feature name", icon: "home" },
  { label: "Feature name", icon: "dashboard" },
  { label: "Feature name", icon: "group" },
  { label: "Feature name", icon: "description" },
  { label: "Feature name", icon: "bar_chart" },
  { label: "Feature name", icon: "settings" },
];

type WaffleNavContext = string;

type WaffleNavItem = {
  label: string;
  icon: string;
  isShortcut?: boolean;
};

const WAFFLE_NAV_MENUS: Record<
  string,
  { title: string; items: WaffleNavItem[] }
> = {
  dashboard: {
    title: "Company dashboard",
    items: [
      { label: "Home", icon: "home" },
      { label: "Captable", icon: "table_chart" },
      { label: "Shareholders communication", icon: "campaign" },
      { label: "Dealroom", icon: "handshake" },
      { label: "Company portfolio", icon: "work" },
      { label: "Documents", icon: "description" },
      { label: "Company Profile", icon: "domain" },
      { label: "Administration", icon: "admin_panel_settings" },
    ],
  },
  dealroom: {
    title: "Dealroom",
    items: [
      { label: "Overview", icon: "dashboard" },
      { label: "Draft", icon: "edit_document" },
      { label: "Live", icon: "bolt" },
      { label: "Closed", icon: "check_circle" },
      { label: "Declined", icon: "cancel" },
      { label: "Company Dashboard", icon: "domain", isShortcut: true },
    ],
  },

  shareholders: {
    title: "Shareholders communication",
    items: [
      { label: "Overview", icon: "dashboard" },
      { label: "Shareholders List", icon: "group" },
      { label: "Reports", icon: "bar_chart" },
      { label: "News Releases", icon: "newspaper" },
      { label: "Meetings", icon: "event" },
      { label: "Company Dashboard", icon: "domain", isShortcut: true },
    ],
  }

};

const WAFFLE_OTHER_NAV_MENUS: Record<string, { title: string; items: WaffleNavItem[] }> = {
  wire: {
    title: "Korewire",
    items: [
      { label: "Newsfeed", icon: "newspaper" },
      { label: "My releases", icon: "campaign" },
      { label: "Distribution", icon: "send" },
      { label: "Analytics", icon: "bar_chart" },
    ],
  },
  profile: {
    title: "Profile",
    items: [
      { label: "Personal details", icon: "person" },
      { label: "Security", icon: "lock" },
      { label: "Notifications", icon: "notifications" },
      { label: "Preferences", icon: "tune" },
    ],
  },
  portfolio: {
    title: "Portfolio",
    items: [
      { label: "Holdings", icon: "work" },
      { label: "Transactions", icon: "swap_horiz" },
      { label: "Performance", icon: "trending_up" },
      { label: "Statements", icon: "description" },
    ],
  },
  personal: {
    title: "Personal dashboard",
    items: [
      { label: "Home", icon: "home" },
      { label: "My investments", icon: "savings" },
      { label: "Documents", icon: "description" },
      { label: "Tasks", icon: "checklist" },
    ],
  },
};

const WAFFLE_DEFAULT_ITEMS: WaffleNavItem[] = [
  { label: "Overview", icon: "dashboard" },
  { label: "Activity", icon: "history" },
  { label: "Reports", icon: "bar_chart" },
  { label: "Settings", icon: "settings" },
];

const WAFFLE_SWITCHER_REDIRECTS: Record<string, string> = {
  dealroom: "Dealroom",
  shareholders: "Shareholders communication",
};

function getWaffleMenu(context: string): { title: string; items: WaffleNavItem[] } {
  return (
    WAFFLE_NAV_MENUS[context] ??
    WAFFLE_OTHER_NAV_MENUS[context] ?? {
      title: WAFFLE_BY_ID[context]?.label ?? "Dashboard",
      items: WAFFLE_DEFAULT_ITEMS,
    }
  );
}

const NAV_WIDTH_COLLAPSED = 84;

const WAFFLE_DEALROOM_TAB_LABELS = [
  "Overview",
  "Draft / Pending (23)",
  "Live (5)",
  "Closed (4)",
  "Declined (0)",
];

const NAV_SLOT_COLLAPSED = 26;

const NAV_TOGGLE_ROW_HEIGHT = 40;

const NAV_GRID_GUTTER = 20;

const NAV_INSET = 24;

const CONTENT_INSET = 24;

const CONTENT_GRID_GUTTER = 20;

const NAV_COLUMN_WIDTH_COLLAPSED = NAV_WIDTH_COLLAPSED - NAV_INSET * 2;

const NAV_COLUMN_WIDTH =
  Math.round(
    ((NAV_WIDTH_EXPANDED - NAV_INSET * 2 - NAV_GRID_GUTTER * 2) / 3) * 1000,
  ) / 1000;

function ShellGridOverlay({
  breakpoint,
  navCollapsed = false,
  navOverlay = false,
  xs = false,
  width,
}: {
  breakpoint: BreakpointKey;
  navCollapsed?: boolean;
  navOverlay?: boolean;
  xs?: boolean;
  width?: number;
}) {
  const bp =
    BREAKPOINTS.find((b) => b.key === breakpoint) ??
    BREAKPOINTS[BREAKPOINTS.length - 1];
  const frameWidth = width && width > 0 ? width : bp.width;

  const NAV_WIDTH = navCollapsed ? NAV_WIDTH_COLLAPSED : NAV_WIDTH_EXPANDED;
  const NAV_COLUMNS = navCollapsed ? 1 : 3;
  // When the navigation floats as an overlay, Content keeps the collapsed
  // nav width as its left offset so nothing reflows behind the drawer.
  const CONTENT_LEFT = xs ? 0 : navOverlay ? NAV_WIDTH_COLLAPSED : NAV_WIDTH;
  // At XS the navigation stacks above the content and, when expanded, covers
  // the full frame width as a drawer.
  const NAV_ZONE_WIDTH = xs
    ? navCollapsed
      ? frameWidth
      : NAV_WIDTH_EXPANDED
    : NAV_WIDTH;
  const NAV_ZONE_COLUMNS = xs ? (navCollapsed ? 1 : 3) : NAV_COLUMNS;
  const NAV_COL = "rgba(171,224,248,0.7)";
  const CONTENT_COL = "rgba(118,118,255,0.5)";
  const MARGIN_FILL = "rgba(56,201,102,0.5)";
  const MARGIN_BORDER = "#0a4";

  const zone = (
    left: number,
    width: number,
  ): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    left,
    width,
    background: MARGIN_FILL,
    borderLeft: `1px dashed ${MARGIN_BORDER}`,
    borderRight: `1px dashed ${MARGIN_BORDER}`,
  });

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        width: frameWidth,
        opacity: 0.5,
      }}
    >
      {/* Navigation zone (Level 2) */}
      {/* 3 flexible columns, fixed 20px gutter, 24px inset — identical at
          every breakpoint. Skipped at XS unless the drawer is open, since the
          navigation is a thin bar stacked above the content. */}
      {(!xs || !navCollapsed) && (
        <>
          <div style={zone(0, NAV_INSET)} />
          <div style={zone(NAV_ZONE_WIDTH - NAV_INSET, NAV_INSET)} />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: NAV_ZONE_WIDTH,
              display: "flex",
              gap: NAV_GRID_GUTTER,
              paddingLeft: NAV_INSET,
              paddingRight: NAV_INSET,
              boxSizing: "border-box",
            }}
          >
            {Array.from({ length: NAV_ZONE_COLUMNS }).map((_, i) => (
              <div
                key={`nav-${i}`}
                style={{
                  flex:
                    navCollapsed && !xs
                      ? `0 0 ${NAV_COLUMN_WIDTH_COLLAPSED}px`
                      : `0 0 ${NAV_COLUMN_WIDTH}px`,
                  minWidth: 0,
                  height: "100%",
                  background: NAV_COL,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Content zone (Level 2) — 12 flexible columns, fixed 20px gutter,
          24px inset, identical at every breakpoint. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: CONTENT_LEFT,
          width: Math.max(0, frameWidth - CONTENT_LEFT),
          display: "flex",
          gap: CONTENT_GRID_GUTTER,
          paddingLeft: CONTENT_INSET,
          paddingRight: CONTENT_INSET,
          boxSizing: "border-box",
        }}
      >
        {Array.from({ length: xs ? 4 : 12 }).map((_, i) => (
          <div
            key={`content-${i}`}
            style={{
              flex: "1 1 0",
              minWidth: 0,
              height: "100%",
              background: CONTENT_COL,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ShellPreview({
  showAnatomy = false,
  ...props
}: {
  fullPage: boolean;
  showGrid?: boolean;
  showAnatomy?: boolean;
  showContent?: boolean;
  simulation?: "dealroom" | "waffle";
  breakpoint?: BreakpointKey;
  width?: number;
  surface?: "shell" | "cmp";
  regionProps?: ShellRegionProps;
}) {
  return (
    <ShellAnatomyContext.Provider value={showAnatomy}>
      <div
        style={
          {
            display: "contents",
            ...(showAnatomy
              ? {}
              : { "--shell-slot-bg": "transparent", "--shell-slot-border": "transparent" }),
          } as CSSProperties
        }
      >
        <ShellPreviewInner {...props} />
      </div>
    </ShellAnatomyContext.Provider>
  );
}

function ShellPreviewInner({
  fullPage,
  showGrid = false,
  showContent = false,
  simulation = "dealroom",
  breakpoint = "2xl" as BreakpointKey,
  width,
  surface = "shell",
  regionProps = {},
}: {
  fullPage: boolean;
  showGrid?: boolean;
  showContent?: boolean;
  simulation?: "dealroom" | "waffle";
  breakpoint?: BreakpointKey;
  width?: number;
  surface?: "shell" | "cmp";
  regionProps?: ShellRegionProps;
}) {
  // CMP: the same Content (Level 2) plugged into a white-label client site.
  const isCmp = surface === "cmp";
  const CMP_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
  const cmpTransition = (props: string[], delay = 0) =>
    props.map((p) => `${p} 600ms ${CMP_EASE} ${delay}ms`).join(", ");
  // SM and MD default the navigation to collapsed and, when expanded, float
  // it over the content region behind a scrim.
  const bandKey =
    breakpoint === "self"
      ? resolveBreakpoint(width && width > 0 ? width : 1280).key
      : breakpoint;
  const isOverlayBp = bandKey === "sm" || bandKey === "md";
  const isXs = bandKey === "xs";
  const collapsedDefault = isOverlayBp || isXs;
  const [navCollapsed, setNavCollapsed] = useState(collapsedDefault);
  // Start the case demo on Dealroom so both surfaces show the same real content.
  const [navSelected, setNavSelected] = useState(simulation === "waffle" ? 3 : 0);
  const [navContext, setNavContext] = useState<WaffleNavContext>("dashboard");
  const isWaffle = simulation === "waffle";
  // The company selector belongs to company-scoped lines of business only.
  const isCompanyContext =
    navContext === "dashboard" ||
    navContext === "dealroom" ||
    navContext === "shareholders";
  const waffleMenu = getWaffleMenu(navContext);
  const navMenu = isWaffle ? waffleMenu.items : SHELL_NAV_MENU;
  const [waffleTab, setWaffleTab] = useState(0);
  const waffleSelectedLabel = waffleMenu.items[navSelected]?.label ?? "";
  // Two ways into the Dealroom screen: via the dashboard nav item (tabbed) or
  // via the dashboard switcher (no tabs, driven by the level 2 nav).
  const waffleDealroomMode: "tabs" | "nav" | null = !isWaffle
    ? null
    : navContext === "dashboard" && waffleSelectedLabel === "Dealroom"
      ? "tabs"
      : navContext === "dealroom"
        ? "nav"
        : null;
  const waffleDealroomSection =
    waffleDealroomMode === "tabs"
      ? (WAFFLE_DEALROOM_TAB_LABELS[waffleTab] ?? "Overview")
      : waffleDealroomMode === "nav"
        ? waffleSelectedLabel
        : null;
  // On the Dealroom screen the card runs flush into the breadcrumb row: no top
  // stroke, no rounded top corners, and zero stack space above the card.
  const isDealroomScreen =
    showContent && (simulation === "dealroom" || waffleDealroomSection != null);
  // Level 1 header uses a single personal-based suffix everywhere (Figma
  // 252:1958): notification action icon + avatar-only UserProfile.
  const waffleTrail = (() => {
    const selected = waffleMenu.items[navSelected];
    const leaf = selected ? selected.label : waffleMenu.title;
    if (navContext === "dashboard") {
      return leaf === "Company dashboard"
        ? ["Company dashboard"]
        : ["Company dashboard", leaf];
    }
    if (navContext === "dealroom" || navContext === "shareholders") {
      return [waffleMenu.title, leaf];
    }
    return leaf === waffleMenu.title ? [leaf] : [waffleMenu.title, leaf];
  })();
  useEffect(() => {
    setNavCollapsed(collapsedDefault);
  }, [collapsedDefault]);
  useEffect(() => {
    setWaffleTab(0);
  }, [navContext, navSelected]);
  const navFloating = (isOverlayBp || isXs) && !navCollapsed;
  const xsDrawerOpen = isXs && !navCollapsed;
  // Content region width = simulation width minus the navigation in its
  // current state. Floating navs sit over the content, so they only reserve
  // the collapsed width.
  const frameWidth =
    width && width > 0
      ? width
      : (BREAKPOINTS.find((b) => b.key === bandKey)?.width ?? 1280);
  const navReservedWidth = isXs
    ? 0
    : navCollapsed || navFloating
      ? NAV_WIDTH_COLLAPSED
      : NAV_WIDTH_EXPANDED;
  const contentRegionWidth = Math.max(0, frameWidth - navReservedWidth);
  const shellWidths = useMemo(
    () => ({ frameWidth, contentWidth: contentRegionWidth }),
    [frameWidth, contentRegionWidth],
  );
  return (
    <ShellContentWidthContext.Provider value={shellWidths}>
    <div
      style={{
          // Component tokens (Layer 3). Each aliases a semantic token.
          ["--shell-background" as string]: "var(--bgColor-default, #FFFFFF)",
          ["--shell-masthead-background" as string]: "var(--bgColor-default, #FFFFFF)",
          ["--shell-masthead-border-color" as string]: "var(--borderColor-default, #E5E7EB)",
          ["--shell-masthead-border-width" as string]: "var(--border-width-default, 1px)",
          ["--shell-masthead-padding-y" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-masthead-padding-left" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-masthead-padding-right" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-masthead-slot-width" as string]: "160px",
          ["--shell-masthead-slot-height" as string]: "32px",
          ["--shell-nav-background" as string]:
            "var(--color-bg-surface-secondary, #FBFBFC)",
          ["--shell-nav-menu-gap" as string]: "var(--space-20, 20px)",
          ["--shell-nav-border-color" as string]: "var(--borderColor-default, #E5E7EB)",
          ["--shell-nav-border-width" as string]: "var(--border-width-default, 1px)",
          ["--shell-nav-padding-y" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-nav-padding-left" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-nav-padding-right" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-nav-grid-columns" as string]: "3",
          ["--shell-nav-grid-column-width" as string]: `${NAV_COLUMN_WIDTH}px`,
          ["--shell-nav-grid-gutter" as string]: "var(--space-inline-2xl, 20px)",
          ["--shell-nav-row-gap" as string]: "var(--space-stack-xl, 24px)",
          ["--shell-nav-width" as string]: `${NAV_WIDTH_EXPANDED}px`,
          ["--shell-nav-width-collapsed" as string]: `${NAV_WIDTH_COLLAPSED}px`,
          ["--shell-nav-slot-width-collapsed" as string]: `${NAV_SLOT_COLLAPSED}px`,
          ["--shell-nav-toggle-row-height" as string]: `${NAV_TOGGLE_ROW_HEIGHT}px`,
          ["--shell-nav-grid-columns-collapsed" as string]: "1",
          ["--shell-nav-grid-column-width-collapsed" as string]: `${NAV_COLUMN_WIDTH_COLLAPSED}px`,
          ["--shell-nav-transition-duration" as string]: "200ms",
          ["--shell-nav-transition-easing" as string]: "cubic-bezier(0.4, 0, 0.2, 1)",
          ["--shell-nav-overlay-background" as string]:
            "color-mix(in srgb, var(--bgColor-black, #000000) 50%, transparent)",
          ["--shell-nav-overlay-z-index" as string]: "30",
          ["--shell-nav-footer-gap" as string]: "var(--space-stack-lg, 16px)",
          ["--shell-nav-height-xs" as string]: "48px",
          ["--shell-nav-padding-y-xs" as string]: "var(--space-inset-3xs, 8px)",
          ["--shell-content-background" as string]: "var(--bgColor-default, #FFFFFF)",
          ["--shell-content-padding-y" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-content-padding-left" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-content-padding-right" as string]: "var(--space-inset-xl, 24px)",
          ["--shell-content-grid-columns" as string]: isXs ? "4" : "12",
          ["--shell-content-grid-gutter" as string]: "var(--space-inline-2xl, 20px)",
          background: "var(--shell-background)",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: fullPage ? "100%" : 520,
          minHeight: fullPage ? "100%" : undefined,
          border: fullPage ? "none" : "1px solid var(--borderColor-muted, #E5E7EB)",
          borderRadius: fullPage ? 0 : 8,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <ShellRef n={1} />
        {fullPage && showGrid && (
          <ShellGridOverlay
            breakpoint={breakpoint}
            navCollapsed={navCollapsed}
            navOverlay={navFloating}
            xs={isXs}
            width={width}
          />
        )}
        {/* CMP — client website header */}
        <ClientSiteHeader visible={isCmp} transition={cmpTransition(["height", "opacity", "transform"], isCmp ? 250 : 0)} />
        {/* Level 1 — Masthead */}
        <div
          {...regionProps.header}
          data-shell-region="header"
          inert={isCmp}
          aria-hidden={isCmp || undefined}
          style={{
            background: "var(--shell-masthead-background)",
            borderBottom:
              "var(--shell-masthead-border-width) solid var(--shell-masthead-border-color)",
            height: 80,
            padding:
              "var(--shell-masthead-padding-y) var(--shell-masthead-padding-right) var(--shell-masthead-padding-y) var(--shell-masthead-padding-left)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            position: "relative",
            ...(isCmp
              ? {
                  height: 0,
                  padding: "0 var(--shell-masthead-padding-right) 0 var(--shell-masthead-padding-left)",
                  borderBottom: "0 solid transparent",
                  opacity: 0,
                  transform: "translateY(-24px)",
                  overflow: "hidden",
                  pointerEvents: "none",
                }
              : null),
            transition: cmpTransition(
              ["height", "padding", "opacity", "transform", "border-bottom-width"],
              isCmp ? 0 : 250,
            ),
            overflow: isCmp ? "hidden" : "visible",
          }}
        >
          <ShellRef n={2} />
          <div
            style={{
              ...shellSlotStyle,
              width: "auto",
              minWidth: "var(--shell-masthead-slot-width)",
              height: "auto",
              minHeight: "var(--shell-masthead-slot-height)",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <ShellRef n={3} />
          </div>
          <div
            style={{
              ...shellSlotStyle,
              width: "auto",
              minWidth: "var(--shell-masthead-slot-width)",
              height: "auto",
              minHeight: "var(--shell-masthead-slot-height)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "var(--space-inline-lg, 20px)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <ShellRef n={4} />
            {simulation === "waffle" ? (
              <WaffleLobSelector
                activeId={
                  navContext === "dashboard"
                    ? (Object.keys(WAFFLE_SWITCHER_REDIRECTS).find(
                        (key) => WAFFLE_SWITCHER_REDIRECTS[key] === waffleSelectedLabel,
                      ) ?? "company")
                    : navContext
                }
                onSelectDashboard={(id) => {
                  const redirectLabel = WAFFLE_SWITCHER_REDIRECTS[id];
                  if (redirectLabel) {
                    const index = WAFFLE_NAV_MENUS.dashboard.items.findIndex(
                      (item) => item.label === redirectLabel,
                    );
                    setNavContext("dashboard");
                    setNavSelected(index >= 0 ? index : 0);
                    return;
                  }
                  setNavContext(id === "company" ? "dashboard" : id);
                  setNavSelected(0);
                }}
              />
            ) : (
              <LobSelectorView label="Line of business" iconName="grid_on" />
            )}
            <NotificationActionIconView />
            <UserProfileView name="Ana Souza" compact />
          </div>
        </div>
        {/* Level 2 — Navigation + Content */}
        <div
          style={{
            display: "flex",
            flexDirection: isXs ? "column" : "row",
            flex: "1 0 0",
            minHeight: 0,
            position: "relative",
          }}
        >
          {/* Placeholder keeping Content in place while the nav floats */}
          {navFloating && !isXs && (
            <div
              style={{
                width: "var(--shell-nav-width-collapsed)",
                flexShrink: 0,
              }}
            />
          )}
          {/* Placeholder keeping Content in place while the XS drawer is open */}
          {xsDrawerOpen && (
            <div
              style={{
                height: "var(--shell-nav-height-xs)",
                flexShrink: 0,
              }}
            />
          )}
          {/* Navigation */}
          <div
            {...regionProps.navigation}
            data-shell-region="navigation"
            style={{
              background: "var(--shell-nav-background)",
              ...(isXs && navCollapsed
                ? {
                    borderBottom:
                      "var(--shell-nav-border-width) solid var(--shell-nav-border-color)",
                    width: "100%",
                    height: "var(--shell-nav-height-xs)",
                    padding:
                      "var(--shell-nav-padding-y-xs) var(--shell-nav-padding-right) var(--shell-nav-padding-y-xs) var(--shell-nav-padding-left)",
                  }
                : {
                    borderRight:
                      "var(--shell-nav-border-width) solid var(--shell-nav-border-color)",
                    width: navCollapsed
                      ? "var(--shell-nav-width-collapsed)"
                      : "var(--shell-nav-width)",
                    padding:
                      "var(--shell-nav-padding-y) var(--shell-nav-padding-right) var(--shell-nav-padding-y) var(--shell-nav-padding-left)",
                  }),
              display: "grid",
              gridTemplateColumns:
                navCollapsed && !isXs
                  ? "minmax(0, 1fr)"
                  : isXs && navCollapsed
                    ? "var(--shell-nav-slot-width-collapsed) 1fr"
                    : "repeat(var(--shell-nav-grid-columns, 3), var(--shell-nav-grid-column-width))",
              gridTemplateRows: "auto auto 1fr auto",
              columnGap: "var(--shell-nav-grid-gutter)",
              rowGap: isXs && navCollapsed ? 0 : "var(--shell-nav-row-gap)",
              justifyItems: navCollapsed && !isXs ? "start" : "stretch",
              flexShrink: 0,
              ...(isXs && navCollapsed ? null : { height: "100%", minHeight: 0 }),
              position: "relative",
              boxSizing: "border-box",
              ...(navFloating
                ? {
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 30,
                  }
                : null),
              ...(isCmp
                ? {
                    width: 0,
                    height: isXs ? 0 : undefined,
                    padding: 0,
                    borderRight: "0 solid transparent",
                    borderBottom: "0 solid transparent",
                    opacity: 0,
                    transform: isXs ? "translateY(-16px)" : "translateX(-32px)",
                    overflow: "hidden",
                    pointerEvents: "none",
                  }
                : null),
              transition: cmpTransition(
                ["width", "height", "padding", "opacity", "transform", "border-width"],
                isCmp ? 0 : 250,
              ),
              overflow: isCmp ? "hidden" : "visible",
            }}
            inert={isCmp}
            aria-hidden={isCmp || undefined}
          >
            <ShellRef n={5} />
            <div
              style={{
                ...shellSlotStyle,
                height:
                  isXs && navCollapsed
                    ? NAV_SLOT_COLLAPSED
                    : "var(--shell-nav-toggle-row-height, 40px)",
                ...(isXs && navCollapsed
                  ? { width: NAV_SLOT_COLLAPSED, gridColumn: "1 / 2" }
                  : navCollapsed
                    ? { width: 36, gridColumn: "1 / -1" }
                    : { gridColumn: "1 / -1" }),
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: navCollapsed ? 0 : 4,
                paddingRight: navCollapsed ? 0 : 4,
                boxSizing: "border-box",
                minWidth: 0,
              }}
            >
              <ShellRef n={6} />
              <NavToggleButton
                collapsed={navCollapsed}
                isXs={isXs}
                onToggle={() => setNavCollapsed((c) => !c)}
                style={{ marginLeft: navCollapsed ? 0 : "auto" }}
              />
            </div>
            {isWaffle && isCompanyContext && !(isXs && navCollapsed) && (

                <div
                  style={{
                    gridColumn: "1 / -1",
                    minWidth: 0,
                    alignSelf: "start",
                    height: "fit-content",
                  }}
                >
                  <CompanySelectorView
                    variant="nav"
                    collapsed={navCollapsed && !isXs}
                  />
                </div>
              )}
            {!(isXs && navCollapsed) && (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--shell-nav-menu-gap, 20px)",
                  alignItems: navCollapsed ? "flex-start" : "stretch",
                  gridColumn: "1 / -1",
                  alignSelf: "stretch",
                  minWidth: 0,
                  minHeight: 0,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                className="no-scrollbar"
              >
                {navMenu.map((item, i) => (
                  <Fragment key={i}>
                    {item.isShortcut && !navCollapsed && (
                      <div
                        style={{
                          borderTop: "1px solid var(--borderColor-default, #E5E7EB)",
                          margin: "4px 0",
                        }}
                      />
                    )}
                    <NavItemView
                      label={item.label}
                      iconName={item.icon}
                      collapsed={navCollapsed}
                      selected={i === navSelected}
                      onClick={() => {
                        if (item.isShortcut) {
                          setNavContext("dashboard");
                          setNavSelected(0);
                        } else {
                          setNavSelected(i);
                        }
                      }}
                    />
                  </Fragment>
                ))}

              </div>
            )}
            {!(isXs && navCollapsed) && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--shell-nav-footer-gap)",
                alignItems: navCollapsed && !isXs ? "center" : "flex-start",
                gridColumn: "1 / -1",
                alignSelf: "end",
                position: "relative",
                minWidth: 0,
              }}
            >
              <ShellRef n={7} style={{ top: -4, left: -4 }} />
              <div
                style={{
                  ...shellSlotStyle,
                  width: navCollapsed ? NAV_SLOT_COLLAPSED : 64,
                  height: navCollapsed ? 32 : 64,
                  borderRadius: navCollapsed ? 8 : 12,
                }}
              />
              {!navCollapsed && (
                <div style={{ ...shellSlotStyle, width: 200, height: 20 }} />
              )}
            </div>
            )}
          </div>
          {/* Scrim between Navigation (5) and Content (8) */}
          {navFloating && (
            <div
              aria-hidden
              onClick={() => setNavCollapsed(true)}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: isXs
                  ? "var(--shell-nav-width)"
                  : "var(--shell-nav-width-collapsed)",
                right: 0,
                background: "var(--shell-nav-overlay-background)",
                zIndex: 20,
                cursor: "pointer",
              }}
            />
          )}
          {/* Content */}
          <div
            {...regionProps.content}
            data-shell-region="content"
            style={{
              background: "var(--shell-content-background)",
              flex: "1 0 0",
              minWidth: 0,
              padding:
                "var(--shell-content-padding-y) var(--shell-content-padding-right) var(--shell-content-padding-y) var(--shell-content-padding-left)",
              display: "grid",
              gridTemplateColumns: `repeat(${isXs ? 4 : 12}, minmax(0, 1fr))`,
              columnGap: "var(--shell-content-grid-gutter)",
              rowGap: isDealroomScreen ? 0 : "var(--space-stack-sm, 8px)",
              position: "relative",
              gridTemplateRows: "auto minmax(0, 1fr)",
              minHeight: 0,
              overflow: "hidden",
              alignContent: "start",
            }}
          >
            <ShellRef n={8} />
            <div
              style={{
                background: "transparent",
                borderTop: "1px dashed var(--shell-slot-border, var(--borderColor-muted, #E5E7EB))",
                borderLeft: "1px dashed var(--shell-slot-border, var(--borderColor-muted, #E5E7EB))",
                borderRight: "1px dashed var(--shell-slot-border, var(--borderColor-muted, #E5E7EB))",
                borderRadius: "4px 4px 0 0",
                gridColumn: "1 / -1",
                position: "relative",
              }}
            >
              <ShellRef n={9} />
              {showContent && (
                <ShellPageControls
                  isXs={isXs}
                  showTabs={!isWaffle || waffleDealroomMode === "tabs"}
                  trail={isWaffle ? waffleTrail : undefined}
                  tabLabels={
                    waffleDealroomMode === "tabs"
                      ? WAFFLE_DEALROOM_TAB_LABELS
                      : undefined
                  }
                  selectedTab={
                    waffleDealroomMode === "tabs" ? waffleTab : undefined
                  }
                  onSelectTab={
                    waffleDealroomMode === "tabs" ? setWaffleTab : undefined
                  }
                />
              )}
            </div>
            <div
              style={{
                background: "var(--card-background, var(--bgColor-default, #FFFFFF))",
                borderRadius: isDealroomScreen
                  ? "0 0 var(--radius-card-default, 16px) var(--radius-card-default, 16px)"
                  : "var(--radius-card-default, 16px)",
                paddingLeft: "var(--space-inline-lg, 16px)",
                paddingRight: "var(--space-inline-lg, 16px)",
                boxSizing: "border-box",
                gridColumn: "1 / -1",
                alignSelf: "stretch",
                minHeight: 0,
                maxHeight: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ShellRef n={10} />
              {/* Stroke drawn on top of the content, inside the box */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  /* Align with the tab track above, which sits inside region 9's 1px frame */
                  top: 0,
                  bottom: 0,
                  left: "var(--border-width-default, 1px)",
                  right: "var(--border-width-default, 1px)",
                  pointerEvents: "none",
                  borderTop: isDealroomScreen
                    ? "none"
                    : "var(--border-width-default, 1px) solid var(--borderColor-default, #E5E7EB)",
                  borderLeft:
                    "var(--border-width-default, 1px) solid var(--borderColor-default, #E5E7EB)",
                  borderRight:
                    "var(--border-width-default, 1px) solid var(--borderColor-default, #E5E7EB)",
                  borderBottom:
                    "var(--border-width-default, 1px) solid var(--borderColor-default, #E5E7EB)",
                  borderRadius: isDealroomScreen
                    ? "0 0 var(--radius-card-default, 16px) var(--radius-card-default, 16px)"
                    : "var(--radius-card-default, 16px)",
                  zIndex: 5,
                }}
              />
              {showContent && isWaffle && waffleDealroomSection && (
                <div
                  className="no-scrollbar"
                  style={{
                    flex: "1 1 auto",
                    overflowY: "auto",
                    overflowX: "hidden",
                    minHeight: 0,
                  }}
                >
                  {waffleDealroomSection === "Overview" ? (
                    <WaffleDealroomOverview />
                  ) : (
                    <WaffleDealroomPlaceholder label={waffleDealroomSection} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* CMP — client website footer */}
        <ClientSiteFooter visible={isCmp} transition={cmpTransition(["max-height", "opacity", "transform"], isCmp ? 250 : 0)} />
      </div>
    </ShellContentWidthContext.Provider>
  );
}

const CLIENT_BRAND = {
  name: "Northbank",
  primary: "#0E3B43",
  accent: "#E8B04A",
  onPrimary: "#F4F1EA",
  muted: "rgba(244, 241, 234, 0.64)",
};

function ClientLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <rect width="28" height="28" rx="7" fill={CLIENT_BRAND.accent} />
        <path d="M8 20V8l12 12V8" stroke={CLIENT_BRAND.primary} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em", color: CLIENT_BRAND.onPrimary }}>
        {CLIENT_BRAND.name}
      </span>
    </div>
  );
}

function ClientSiteHeader({ visible, transition }: { visible: boolean; transition: string }) {
  return (
    <div
      inert={!visible}
      aria-hidden={!visible || undefined}
      style={{
        height: visible ? 72 : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition,
        overflow: "hidden",
        flexShrink: 0,
        background: CLIENT_BRAND.primary,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          height: 72,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <ClientLogo />
        <nav style={{ display: "flex", gap: 28, fontSize: 14, color: CLIENT_BRAND.muted }}>
          {["Personal", "Business", "Investments", "Help"].map((l) => (
            <span key={l} style={{ cursor: "default", color: l === "Investments" ? CLIENT_BRAND.onPrimary : undefined }}>{l}</span>
          ))}
        </nav>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 999,
            border: `1px solid ${CLIENT_BRAND.muted}`,
            color: CLIENT_BRAND.onPrimary,
          }}
        >
          Log out
        </span>
      </div>
    </div>
  );
}

function ClientSiteFooter({ visible, transition }: { visible: boolean; transition: string }) {
  const cols: [string, string[]][] = [
    ["Banking", ["Accounts", "Cards", "Loans"]],
    ["Invest", ["Private markets", "Funds", "Research"]],
    ["Company", ["About", "Careers", "Press"]],
  ];
  return (
    <div
      inert={!visible}
      aria-hidden={!visible || undefined}
      style={{
        maxHeight: visible ? 200 : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition,
        overflow: "hidden",
        flexShrink: 0,
        background: CLIENT_BRAND.primary,
        color: CLIENT_BRAND.muted,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div style={{ padding: "28px 32px 20px", display: "flex", gap: 48, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 auto" }}>
          <ClientLogo />
          <p style={{ fontSize: 12, marginTop: 12, maxWidth: 280 }}>
            Investment products are powered by our partner platform.
          </p>
        </div>
        {cols.map(([title, links]) => (
          <div key={title} style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
            <span style={{ color: CLIENT_BRAND.onPrimary, fontWeight: 600 }}>{title}</span>
            {links.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 32px", borderTop: `1px solid rgba(244,241,234,0.12)`, fontSize: 11 }}>
        © 2026 {CLIENT_BRAND.name} Bank N.A. · Member FDIC · Privacy · Terms
      </div>
    </div>
  );
}

function ShellPageControls({
  isXs,
  showTabs = true,
  trail: trailOverride,
  tabLabels: tabLabelsOverride,
  selectedTab,
  onSelectTab,
}: {
  isXs: boolean;
  showTabs?: boolean;
  trail?: string[];
  tabLabels?: string[];
  selectedTab?: number;
  onSelectTab?: (i: number) => void;
}) {
  const [selectedLocal, setSelectedLocal] = useState(0);
  const selected = selectedTab ?? selectedLocal;
  const setSelected = (i: number) => {
    setSelectedLocal(i);
    onSelectTab?.(i);
  };
  const [stepIndex, setStepIndex] = useState(0);
  const baseTrail = trailOverride ?? BREADCRUMB_TRAIL;
  const trail = trailOverride
    ? isXs
      ? baseTrail.slice(-2)
      : baseTrail
    : baseTrail.slice(0, isXs ? 2 : 4);
  const allLabels = tabLabelsOverride ?? DEALROOM_TAB_LABELS;
  const labels = isXs ? allLabels.slice(0, 3) : allLabels;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-md, 12px)",
        minWidth: 0,
      }}
    >

      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--breadcrumb-gap, 4px)",
          minWidth: 0,
          flexWrap: "nowrap",
          overflow: "hidden",
        }}
      >
        {trail.map((label, i) => (
          <span key={`${label}-${i}`} style={{ display: "contents" }}>
            <CrumbLabel label={label} state={i === trail.length - 1 ? "current" : "default"} />
            {i < trail.length - 1 && <CrumbDivider />}
          </span>
        ))}
      </nav>

      {showTabs && (
        <SecondaryTabTrack
          labels={labels}
          selectedIndex={selected}
          showIcon={false}
          showLead={!isXs}
          stepIndex={stepIndex}
          onPickStep={setStepIndex}
          onSelect={setSelected}
          stacked={isXs}
          scroll={isXs}
        />
      )}
    </div>
  );
}

type CrumbState = "default" | "hover" | "current";

const BREADCRUMB_TRAIL = ["Home", "Workspaces", "DealRoom", "Deals", "Live"];

function CrumbLabel({
  label,
  state,
  forcedHover,
  onClick,
}: {
  label: string;
  state: CrumbState;
  forcedHover?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isCurrent = state === "current";
  const underline = !isCurrent && (forcedHover || hovered);
  return (
    <span
      role={isCurrent ? undefined : "link"}
      tabIndex={isCurrent ? undefined : 0}
      aria-current={isCurrent ? "page" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={isCurrent ? undefined : onClick}
      onKeyDown={(e) => {
        if (!isCurrent && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        flexShrink: 0,
        whiteSpace: "nowrap",
        fontFamily: isCurrent
          ? "var(--breadcrumb-item-current-font-family, Roboto, sans-serif)"
          : "var(--breadcrumb-item-font-family, Roboto, sans-serif)",
        fontSize: isCurrent
          ? "var(--breadcrumb-item-current-font-size, 16px)"
          : "var(--breadcrumb-item-font-size, 16px)",
        lineHeight: isCurrent
          ? "var(--breadcrumb-item-current-line-height, 1.2)"
          : "var(--breadcrumb-item-line-height, 1.2)",
        fontWeight: (isCurrent
          ? "var(--breadcrumb-item-current-font-weight, 500)"
          : "var(--breadcrumb-item-font-weight, 400)") as unknown as number,
        color: isCurrent
          ? "var(--breadcrumb-item-current-color, #0084F8)"
          : "var(--breadcrumb-item-color, #374151)",
        textDecoration: underline
          ? "var(--breadcrumb-item-hover-text-decoration, underline)"
          : "var(--breadcrumb-item-text-decoration, none)",
        cursor: isCurrent
          ? "var(--breadcrumb-item-current-cursor, default)"
          : "var(--breadcrumb-item-hover-cursor, pointer)",
        outline: "none",
      }}
    >
      {label}
    </span>
  );
}

function CrumbDivider() {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        fontFamily: "var(--breadcrumb-divider-font-family, Roboto, sans-serif)",
        fontSize: "var(--breadcrumb-divider-font-size, 16px)",
        fontWeight: "var(--breadcrumb-divider-font-weight, 400)" as unknown as number,
        lineHeight: "var(--breadcrumb-divider-line-height, 1.2)",
        color: "var(--breadcrumb-divider-color, #374151)",
      }}
    >
      /
    </span>
  );
}

type SecondaryTabState = "default" | "hover" | "selected" | "disabled";

type StepStatus = "complete" | "pending" | "in-progress" | "pendency";

function StepStatusDot({ status }: { status: StepStatus }) {
  const base: CSSProperties = {
    width: "var(--secondary-tab-step-size, 16px)",
    height: "var(--secondary-tab-step-size, 16px)",
    borderRadius: "var(--secondary-tab-step-radius, 9999px)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    boxSizing: "border-box",
  };

  if (status === "complete") {
    return (
      <span
        style={{
          ...base,
          background: "var(--secondary-tab-step-complete-background, #3B82F6)",
          color: "var(--secondary-tab-step-complete-icon-color, #FFFFFF)",
        }}
      >
        <Icon name="check" family="emphasis" size="xs" weight={400} />
      </span>
    );
  }
  if (status === "pendency") {
    return (
      <span
        style={{
          ...base,
          background: "var(--secondary-tab-step-pendency-background, #EAB308)",
        }}
      />
    );
  }
  return (
    <span
      style={{
        ...base,
        border: `var(--secondary-tab-step-border-width, 1.5px) ${
          status === "pending" ? "dashed" : "solid"
        } ${
          status === "pending"
            ? "var(--secondary-tab-step-pending-border-color, #6B7280)"
            : "var(--secondary-tab-step-in-progress-border-color, #3B82F6)"
        }`,
      }}
    />
  );
}

function SecondaryTabView({
  label,
  state,
  showIcon,
  iconName,
  onSelect,
}: {
  label: string;
  state: SecondaryTabState;
  showIcon: boolean;
  iconName: string;
  onSelect?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const disabled = state === "disabled";
  const selected = state === "selected";
  const isHover = !disabled && !selected && (hovered || state === "hover");

  const background = disabled
    ? "var(--secondary-tab-disabled-background, transparent)"
    : selected
      ? "var(--secondary-tab-selected-background, #FFFFFF)"
      : isHover
        ? "var(--secondary-tab-hover-background, #F1F2F4)"
        : "var(--secondary-tab-background, transparent)";

  const color = disabled
    ? "var(--secondary-tab-disabled-color, #9CA3AF)"
    : selected
      ? "var(--secondary-tab-selected-color, #0084F8)"
      : "var(--secondary-tab-color, #374151)";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={disabled ? undefined : onSelect}
      style={{
        flex: "1 0 0",
        minWidth: 0,
        height: "var(--secondary-tab-height, 52px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--secondary-tab-gap, 8px)",
        paddingInline: "var(--secondary-tab-padding-inline, 24px)",
        paddingBlock: "var(--secondary-tab-padding-block, 16px)",
        borderRadius: "var(--secondary-tab-radius, 12px)",
        background,
        color,
        border: `var(--secondary-tab-border-width, 2px) solid ${
          selected
            ? "var(--secondary-tab-selected-border-color, #44A7FD)"
            : "transparent"
        }`,
        boxSizing: "border-box",
        fontFamily: "var(--secondary-tab-label-font-family, Roboto, sans-serif)",
        fontSize: "var(--secondary-tab-label-font-size, 16px)",
        fontWeight: "var(--secondary-tab-label-font-weight, 400)" as unknown as number,
        lineHeight: "var(--secondary-tab-label-line-height, 1.2)",
        letterSpacing: "var(--secondary-tab-label-letter-spacing, 0)",
        overflow: "hidden",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {showIcon && (
        <Icon name={iconName} family="emphasis" size="xl" weight={400} />
      )}
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
        }}
      >
        {label}
      </span>
    </button>
  );
}

const SECONDARY_TAB_STEPS = [
  "Issuance Platform",
  "Data Room",
  "Platform Listing",
  "Live Details",
  "Close Details",
];

function SecondaryTabSelector({
  stepIndex,
  onPick,
  full,
}: {
  stepIndex: number;
  onPick: (i: number) => void;
  full: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", flex: "none", alignSelf: "stretch", display: "flex", alignItems: "center" }}>
      <button
        type="button"
        aria-expanded={open}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: full ? "100%" : "var(--secondary-tab-selector-width, 264px)",
          height: "var(--secondary-tab-selector-height, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--secondary-tab-selector-gap, 12px)",
          paddingInline: "var(--secondary-tab-selector-padding-inline, 24px)",
          paddingBlock: "var(--secondary-tab-selector-padding-block, 6px)",
          background: hovered
            ? "var(--secondary-tab-selector-hover-background, #F1F8FE)"
            : "var(--secondary-tab-selector-background, transparent)",
          border: "none",
          borderStartStartRadius: "var(--secondary-tab-selector-radius-top-left, 16px)",
          borderStartEndRadius: "var(--secondary-tab-selector-radius-top-right, 0px)",
          borderEndEndRadius: "var(--secondary-tab-selector-radius-bottom-right, 0px)",
          borderEndStartRadius: "var(--secondary-tab-selector-radius-bottom-left, 0px)",
          color: "var(--secondary-tab-selector-color, #0084F8)",
          cursor: "pointer",
          minWidth: 0,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--secondary-tab-selector-gap, 12px)",
            minWidth: 0,
          }}
        >
          <StepStatusDot status={stepIndex === 0 ? "pending" : "in-progress"} />
          <span
            style={{
              fontFamily: "var(--secondary-tab-selector-title-font-family, Roboto, sans-serif)",
              fontSize: "var(--secondary-tab-selector-title-font-size, 18px)",
              fontWeight: "var(--secondary-tab-selector-title-font-weight, 500)" as unknown as number,
              lineHeight: "var(--secondary-tab-selector-title-line-height, 1.2)",
              whiteSpace: "nowrap",
              overflow: "visible",
              flex: "none",
            }}
          >
            {SECONDARY_TAB_STEPS[stepIndex]}
          </span>
        </span>
        <Icon
          name={open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          family="emphasis"
          size="md"
          weight={400}
        />
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: "var(--secondary-tab-selector-padding-inline, 24px)",
            zIndex: 20,
            width: "var(--secondary-tab-selector-drawer-width, 260px)",
            maxWidth: "calc(100% - 24px)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--secondary-tab-selector-drawer-gap, 20px)",
            background: "var(--secondary-tab-selector-drawer-background, #FFFFFF)",
            border:
              "var(--secondary-tab-selector-drawer-border-width, 1px) solid var(--secondary-tab-selector-drawer-border-color, #E5E7EB)",
            borderRadius: "var(--secondary-tab-selector-drawer-radius, 16px)",
            filter: "var(--secondary-tab-selector-drawer-shadow, drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1)))",
            paddingInline: "var(--secondary-tab-selector-drawer-padding-inline, 20px)",
            paddingBlock: "var(--secondary-tab-selector-drawer-padding-block, 16px)",
          }}
        >
          {SECONDARY_TAB_STEPS.map((step, i) => (
            <button
              key={step}
              type="button"
              role="menuitem"
              onClick={() => {
                onPick(i);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--secondary-tab-selector-item-gap, 12px)",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "var(--secondary-tab-selector-item-color, #374151)",
                fontFamily: "var(--secondary-tab-selector-item-label-font-family, Roboto, sans-serif)",
                fontSize: "var(--secondary-tab-selector-item-label-font-size, 16px)",
                fontWeight:
                  "var(--secondary-tab-selector-item-label-font-weight, 400)" as unknown as number,
                lineHeight: "var(--secondary-tab-selector-item-label-line-height, 1.2)",
                minWidth: 0,
              }}
            >
              <StepStatusDot
                status={i < stepIndex ? "complete" : i === stepIndex ? "in-progress" : "pending"}
              />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {step}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const DEALROOM_TAB_LABELS = [
  "Overview",
  "Issuance",
  "KorePay",
  "API",
  "People",
  "Email",
  "KorePartners",
];

const SECONDARY_TAB_ICONS = [
  "dashboard",
  "description",
  "group",
  "schedule",
  "verified_user",
  "bar_chart",
  "settings",
];

function SecondaryTabTrack({
  labels,
  selectedIndex,
  disabledIndex,
  forcedState,
  showIcon,
  showLead,
  stepIndex,
  onPickStep,
  onSelect,
  stacked,
  scroll,
}: {
  labels: string[];
  selectedIndex: number;
  disabledIndex?: number;
  forcedState?: SecondaryTabState;
  showIcon: boolean;
  showLead: boolean;
  stepIndex: number;
  onPickStep: (i: number) => void;
  onSelect: (i: number) => void;
  stacked: boolean;
  scroll: boolean;
}) {
  const tabsRow = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flex: stacked ? "none" : "1 0 0",
        minWidth: 0,
        gap: "var(--secondary-tab-row-gap, 1px)",
        padding: "var(--secondary-tab-row-padding, 4px)",
        overflowX: scroll ? "auto" : "visible",
      }}
    >
      {labels.map((label, i) => {
        const state: SecondaryTabState =
          i === disabledIndex
            ? "disabled"
            : i === selectedIndex
              ? "selected"
              : forcedState === "hover" && i === (selectedIndex + 1) % labels.length
                ? "hover"
                : "default";
        return (
          <SecondaryTabView
            key={`${label}-${i}`}
            label={label}
            state={state}
            showIcon={showIcon}
            iconName={SECONDARY_TAB_ICONS[i % SECONDARY_TAB_ICONS.length]}
            onSelect={() => onSelect(i)}
          />
        );
      })}
    </div>
  );

  return (
    <div
      role="tablist"
      style={{
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: stacked ? "stretch" : "center",
        height: stacked ? "auto" : "var(--secondary-tab-track-height, 60px)",
        background: "var(--secondary-tab-track-background, #FBFBFC)",
        borderTop:
          "var(--secondary-tab-track-border-width, 1px) solid var(--secondary-tab-track-border-color, #E5E7EB)",
        borderLeft:
          "var(--secondary-tab-track-border-width, 1px) solid var(--secondary-tab-track-border-color, #E5E7EB)",
        borderRight:
          "var(--secondary-tab-track-border-width, 1px) solid var(--secondary-tab-track-border-color, #E5E7EB)",
        borderRadius:
          "var(--secondary-tab-track-radius, 16px) var(--secondary-tab-track-radius, 16px) 0 0",
        overflow: "visible",
        boxSizing: "border-box",
      }}
    >
      {showLead && (
        <SecondaryTabSelector stepIndex={stepIndex} onPick={onPickStep} full={stacked} />
      )}
      {tabsRow}
    </div>
  );
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function UserProfileView({
  name,
  avatarColor,
  forcedHover = false,
  forcedSelected = false,
  open = false,
  onClick,
  compact = false,
}: {
  name: string;
  avatarColor?: string;
  forcedHover?: boolean;
  forcedSelected?: boolean;
  open?: boolean;
  onClick?: () => void;
  /** Avatar-only variant used in the Shell header suffix (Figma 252:1974). */
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isSelected = forcedSelected || open;
  const isHover = hovered || forcedHover;
  const filled = isSelected || isHover;

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "var(--user-profile-display, flex)" as CSSProperties["display"],
        alignItems: "var(--user-profile-align, center)",
        justifyContent: "center",
        gap: "var(--user-profile-gap, 4px)",
        paddingBlock: "var(--user-profile-padding-block, 6px)",
        paddingInline: "var(--user-profile-padding-inline, 10px)",
        borderRadius: "var(--user-profile-radius, 8px)",
        background: isSelected
          ? "var(--user-profile-selected-background, #F1F2F4)"
          : isHover
            ? "var(--user-profile-hover-background, #F1F2F4)"
            : "var(--user-profile-background, transparent)",
        border: "none",
        width: "var(--user-profile-width, fit-content)",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        cursor: "var(--user-profile-cursor, pointer)",
        textAlign: "left",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "var(--user-profile-lead-align, center)",
          gap: "var(--user-profile-lead-gap, 8px)",
          minWidth: 0,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--user-profile-avatar-size, 32px)",
            height: "var(--user-profile-avatar-size, 32px)",
            borderRadius: "var(--user-profile-avatar-radius, 9999px)",
            background: avatarColor ?? "var(--user-profile-avatar-background, #7B61FF)",
            overflow: "var(--user-profile-avatar-overflow, hidden)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--user-profile-initials-font-family, Roboto, sans-serif)",
              fontSize: "var(--user-profile-initials-font-size, 14px)",
              lineHeight: "var(--user-profile-initials-line-height, 1.2)",
              fontWeight: "var(--user-profile-initials-font-weight, 600)" as unknown as number,
              color: "var(--user-profile-initials-color, #FFFFFF)",
              textTransform: "uppercase",
            }}
          >
            {initialsOf(name)}
          </span>
        </span>
        {compact ? null : (
          <span
            style={{
              fontFamily: "var(--user-profile-label-font-family, Roboto, sans-serif)",
              fontSize: "var(--user-profile-label-font-size, 16px)",
              lineHeight: "var(--user-profile-label-line-height, 1.2)",
              fontWeight: "var(--user-profile-label-font-weight, 400)" as unknown as number,
              color: "var(--user-profile-label-color, #374151)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
            }}
          >
            {name}
          </span>
        )}
      </span>
      {compact ? null : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--user-profile-chevron-size, 16px)",
            height: "var(--user-profile-chevron-size, 16px)",
            flexShrink: 0,
            color: "var(--user-profile-chevron-color, #374151)",
          }}
        >
          <Icon
            name={isSelected ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            family="emphasis"
            size="md"
            weight={400}
          />
        </span>
      )}
    </button>
  );
}

export type WaffleCompany = {
  id: string;
  name: string;
  logoColor: string;
};

export const WAFFLE_COMPANIES: WaffleCompany[] = [
  { id: "fundrizz", name: "Fundrizz", logoColor: "hsl(184,62%,26%)" },
  { id: "korelabs", name: "KoreLabs", logoColor: "hsl(213,90%,45%)" },
  { id: "northwind", name: "Northwind Capital", logoColor: "hsl(260,55%,48%)" },
  { id: "auroraag", name: "Aurora AgTech", logoColor: "hsl(150,55%,32%)" },
];

function CompanyLogoTile({
  company,
  round = false,
}: {
  company: WaffleCompany;
  /** Circular 32px avatar with no outer frame — Figma "Level 2 - Navigation". */
  round?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: round ? 32 : "var(--company-selector-tile-size, 36px)",
        height: round ? 32 : "var(--company-selector-tile-size, 36px)",
        padding: round ? 0 : "var(--company-selector-tile-padding, 2px)",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--company-selector-image-size, 32px)",
          height: "var(--company-selector-image-size, 32px)",
          borderRadius: round
            ? "var(--company-selector-nav-image-radius, 99px)"
            : "var(--company-selector-image-radius, 6px)",
          background: company.logoColor,
          overflow: "var(--company-selector-image-overflow, hidden)",
          fontFamily: "var(--company-selector-monogram-font-family, Roboto, sans-serif)",
          fontSize: "var(--company-selector-monogram-font-size, 14px)",
          lineHeight: "var(--company-selector-monogram-line-height, 1.2)",
          fontWeight: "var(--company-selector-monogram-font-weight, 600)" as unknown as number,
          color: "var(--company-selector-monogram-color, #FFFFFF)",
          textTransform: "uppercase",
        }}
      >
        {company.name.trim().slice(0, 1)}
      </span>
    </span>
  );
}

export function CompanySelectorView({
  companies = WAFFLE_COMPANIES,
  selectedId,
  onSelect,
  variant = "header",
  collapsed = false,
}: {
  companies?: WaffleCompany[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /**
   * "header" — hug-width, transparent, square logo tile (Shell header suffix).
   * "nav" — full-width bordered field used in the Level 2 navigation lead for
   * company-based lines of business. Figma "Level 2 - Navigation" (252:1916).
   */
  variant?: "header" | "nav";
  /**
   * Renders an icon-only compact form for the collapsed navigation rail.
   */
  collapsed?: boolean;
}) {
  const isNav = variant === "nav";
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [internalId, setInternalId] = useState(companies[0]?.id ?? "");
  const activeId = selectedId ?? internalId;
  const active =
    companies.find((c) => c.id === activeId) ?? companies[0] ?? WAFFLE_COMPANIES[0]!;
  const wrapRef = useRef<HTMLDivElement>(null);
  const filled = open || hovered;


  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", minWidth: 0, width: isNav ? "100%" : undefined }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Company: ${active.name}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "var(--company-selector-display, flex)" as CSSProperties["display"],
          alignItems: "var(--company-selector-align, center)",
          justifyContent: collapsed
            ? "center"
            : isNav
              ? "space-between"
              : "center",
          gap: collapsed
            ? 0
            : isNav
              ? "var(--company-selector-nav-gap, 8px)"
              : "var(--company-selector-gap, 4px)",
          paddingBlock: collapsed
            ? 0
            : isNav
              ? "var(--company-selector-nav-padding-block, 6px)"
              : "var(--company-selector-padding-block, 6px)",
          paddingInline: collapsed
            ? 0
            : isNav
              ? "var(--company-selector-nav-padding-inline, 10px)"
              : "var(--company-selector-padding-inline, 10px)",
          borderRadius: collapsed
            ? "var(--company-selector-collapsed-radius, 8px)"
            : isNav
              ? "var(--company-selector-nav-radius, 10px)"
              : "var(--company-selector-radius, 8px)",
          background: collapsed
            ? hovered
              ? "var(--company-selector-collapsed-hover-background, #F1F2F4)"
              : "var(--company-selector-collapsed-background, transparent)"
            : isNav
              ? open || hovered
                ? "var(--company-selector-nav-hover-background, #F8FAFB)"
                : "var(--company-selector-nav-background, #FFFFFF)"
              : open
                ? "var(--company-selector-open-background, #F1F2F4)"
                : hovered
                  ? "var(--company-selector-hover-background, #F1F2F4)"
                  : "var(--company-selector-background, transparent)",
          border: collapsed
            ? "none"
            : isNav
              ? "1px solid var(--company-selector-nav-border-color, #C9D6DF)"
              : "none",
          width: collapsed
            ? "var(--company-selector-collapsed-width, 36px)"
            : isNav
              ? "100%"
              : "var(--company-selector-width, fit-content)",
          height: collapsed
            ? "var(--company-selector-collapsed-height, 48px)"
            : isNav
              ? "var(--company-selector-nav-height, 48px)"
              : undefined,

          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          cursor: "var(--company-selector-cursor, pointer)",
          textAlign: "left",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "var(--company-selector-lead-align, center)",
            gap: collapsed ? 0 : "var(--company-selector-lead-gap, 8px)",
            minWidth: 0,
          }}
        >
          <CompanyLogoTile company={active} round={isNav || collapsed} />

          {!collapsed && (
            <span
              style={{
                fontFamily: "var(--company-selector-label-font-family, Roboto, sans-serif)",
                fontSize: "var(--company-selector-label-font-size, 16px)",
                lineHeight: "var(--company-selector-label-line-height, 1.2)",
                fontWeight: "var(--company-selector-label-font-weight, 400)" as unknown as number,
                color: "var(--company-selector-label-color, #374151)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: 0,
              }}
            >
              {active.name}
            </span>
          )}
        </span>
        {!collapsed && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--company-selector-chevron-size, 16px)",
              height: "var(--company-selector-chevron-size, 16px)",
              flexShrink: 0,
              color: "var(--company-selector-chevron-color, #374151)",
            }}
          >
            <Icon
              name={open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              family="emphasis"
              size="md"
              weight={400}
            />
          </span>
        )}
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            ...(collapsed
              ? {
                  top: 0,
                  left: "calc(100% + 6px)",
                  minWidth: 240,
                }
              : {
                  top: "calc(100% + 6px)",
                  right: 0,
                  ...(isNav ? { left: 0, minWidth: 0 } : { minWidth: 240 }),
                }),
            zIndex: 50,
            background: "var(--company-selector-menu-background, #FFFFFF)",
            border:
              "1px solid var(--company-selector-menu-border-color, #E5E7EB)",
            borderRadius: "var(--company-selector-menu-radius, 8px)",
            boxShadow: "var(--company-selector-menu-shadow, 0 4px 6px rgba(0,0,0,.07))",
            padding: "var(--company-selector-menu-padding, 8px)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {companies.map((c) => (
            <CompanyMenuRow
              key={c.id}
              company={c}
              selected={c.id === active.id}
              onSelect={() => {
                setInternalId(c.id);
                onSelect?.(c.id);
                setOpen(false);
              }}
            />
          ))}
          <div
            style={{
              marginTop: 4,
              paddingTop: 4,
              borderTop:
                "1px solid var(--company-selector-menu-border-color, #E5E7EB)",
              display: "flex",
            }}
          >
            <DsButton
              type="tertiary"
              size="medium"
              label="Register Company"
              leftIcon="add"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}

function CompanyMenuRow({
  company,
  selected,
  onSelect,
}: {
  company: WaffleCompany;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      role="menuitem"
      aria-current={selected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--company-selector-menu-item-gap, 8px)",
        padding: "6px 8px",
        border: "none",
        borderRadius: "var(--radius-control-md, 6px)",
        background:
          hovered || selected
            ? "var(--company-selector-menu-item-hover, #F1F2F4)"
            : "transparent",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
      }}
    >
      <CompanyLogoTile company={company} />
      <span
        style={{
          fontFamily: "var(--company-selector-label-font-family, Roboto, sans-serif)",
          fontSize: "var(--company-selector-label-font-size, 16px)",
          lineHeight: "var(--company-selector-label-line-height, 1.2)",
          color: "var(--company-selector-label-color, #374151)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0,
        }}
      >
        {company.name}
      </span>
      {selected && (
        <span style={{ marginLeft: "auto", display: "inline-flex", color: "var(--color-icon-default, #374151)" }}>
          <Icon name="check" family="emphasis" size="md" weight={400} />
        </span>
      )}
    </button>
  );
}

export function NotificationActionIconView({
  hasNotification = false,
  forcedHover = false,
  ariaLabel = "Notifications",
  onClick,
}: {
  hasNotification?: boolean;
  forcedHover?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isHover = hovered || forcedHover;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "var(--notification-action-display, inline-flex)" as CSSProperties["display"],
        alignItems: "var(--notification-action-align, center)",
        justifyContent: "var(--notification-action-align, center)",
        padding: "var(--notification-action-padding, 10px)",
        borderRadius: "var(--notification-action-radius, 8px)",
        background: isHover
          ? "var(--notification-action-hover-background, #F1F2F4)"
          : "var(--notification-action-background, transparent)",
        border: "var(--notification-action-border, none)" as CSSProperties["border"],
        cursor: "var(--notification-action-cursor, pointer)",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--notification-action-icon-size, 24px)",
          height: "var(--notification-action-icon-size, 24px)",
          color: "var(--notification-action-icon-color, #374151)",
        }}
      >
        <Icon
          name={hasNotification ? "notifications_unread" : "notifications"}
          family="emphasis"
          size="xl"
          weight={400}
        />
        {hasNotification ? (
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "var(--notification-action-indicator-inset-block, 2px)",
              right: "var(--notification-action-indicator-inset-inline, 2px)",
              width: "var(--notification-action-indicator-size, 8px)",
              height: "var(--notification-action-indicator-size, 8px)",
              borderRadius: "var(--notification-action-indicator-radius, 9999px)",
              background: "var(--notification-action-indicator-color, #DC2626)",
            }}
          />
        ) : null}
      </span>
    </button>
  );
}

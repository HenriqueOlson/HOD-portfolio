// Extracted from the user-supplied v3shell.zip for the portfolio case.
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export type StepStatusKind = "complete" | "in-progress" | "pending" | "pendency";

const v = (token: string, fallback: string) => `var(${token}, ${fallback})`;

export function StepStatus({ status = "complete" }: { status?: StepStatusKind }) {
  const size = v("--step-status-size", "16px");
  const base: CSSProperties = {
    width: size,
    height: size,
    borderRadius: v("--step-status-radius", "9999px"),
    display: "flex",
    alignItems: "center",
    justifyContent: v("--step-status-align", "center"),
    flex: "none",
    boxSizing: "border-box",
  };

  if (status === "complete") {
    return (
      <div
        style={{
          ...base,
          background: v("--step-status-complete-background", "#3B82F6"),
          color: v("--step-status-complete-icon-color", "#FFFFFF"),
        }}
      >
        <Icon name="check" family="emphasis" size="xs" weight={600} />
      </div>
    );
  }

  if (status === "pendency") {
    return (
      <div
        style={{
          ...base,
          background: v("--step-status-pendency-background", "#FACC15"),
          color: v("--step-status-pendency-icon-color", "#374151"),
        }}
      >
        <Icon name="priority_high" family="emphasis" size="xs" weight={600} />
      </div>
    );
  }

  const inProgress = status === "in-progress";
  return (
    <div
      style={{
        ...base,
        background: inProgress
          ? v("--step-status-in-progress-background", "transparent")
          : v("--step-status-pending-background", "transparent"),
        borderWidth: v("--step-status-ring-width", "1.5px"),
        borderStyle: inProgress
          ? v("--step-status-in-progress-border-style", "solid")
          : v("--step-status-pending-border-style", "dashed"),
        borderColor: inProgress
          ? v("--step-status-in-progress-border-color", "#3B82F6")
          : v("--step-status-pending-border-color", "#6B7280"),
      }}
    />
  );
}

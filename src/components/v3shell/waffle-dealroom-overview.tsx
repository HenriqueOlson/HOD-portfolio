import { useId } from "react";
import { CircleDollarSign, Coins, HelpCircle, User } from "lucide-react";

const CAPITAL_SERIES = [
  { t: "31/12/69 21:00", usd: 0, eur: 0, cad: 0 },
  { t: "31/12/69 21:05", usd: 190000, eur: 12000, cad: 4000 },
  { t: "31/12/69 21:10", usd: 520000, eur: 31000, cad: 9000 },
  { t: "31/12/69 21:15", usd: 780000, eur: 44000, cad: 12000 },
  { t: "31/12/69 21:20", usd: 1090000, eur: 61000, cad: 15000 },
  { t: "31/12/69 21:25", usd: 1520000, eur: 78000, cad: 18000 },
  { t: "31/12/69 21:30", usd: 1910000, eur: 94000, cad: 22000 },
  { t: "31/12/69 21:35", usd: 2300000, eur: 112000, cad: 26000 },
  { t: "31/12/69 21:40", usd: 2532709, eur: 128000, cad: 30000 },
];

const SERIES = [
  { key: "usd", label: "USD ($)", color: "var(--color-brand-primary-400, #29B6F6)" },
  { key: "eur", label: "EUR (€)", color: "var(--fgColor-danger, #EF5350)" },
  { key: "cad", label: "CAD ($)", color: "var(--fgColor-attention, #FBC02D)" },
] as const;

function Card({
  title,
  right,
  children,
  bodyStyle,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  bodyStyle?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        background: "var(--bgColor-default, #FFFFFF)",
        border:
          "var(--border-width-default, 1px) solid var(--borderColor-default, #E5E7EB)",
        borderRadius: "var(--radius-card-default, 16px)",
        padding: "var(--space-inset-xl, 24px)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-lg, 16px)",
        minWidth: 0,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-inline-md, 12px)",
          paddingBottom: "var(--space-stack-md, 12px)",
          borderBottom:
            "var(--border-width-default, 1px) solid var(--borderColor-muted, #EEF0F3)",
          minWidth: 0,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--typography-heading-3-font-family, inherit)",
            fontSize: "var(--typography-heading-3-font-size, 18px)",
            fontWeight: "var(--typography-heading-3-font-weight, 600)" as never,
            color: "var(--fgColor-default, #1F2937)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>
        {right ?? (
          <HelpCircle size={18} color="var(--fgColor-muted, #9AA4B2)" aria-hidden />
        )}
      </header>
      <div style={{ minWidth: 0, ...bodyStyle }}>{children}</div>
    </section>
  );
}

function ComingSoon() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-stack-lg, 16px)",
        padding: "var(--space-inset-2xl, 32px) 0",
        minHeight: 220,
      }}
    >
      <div
        aria-hidden
        style={{
          width: 96,
          height: 96,
          borderRadius: "var(--radius-pill, 999px)",
          background: "var(--bgColor-muted, #F3F5F7)",
        }}
      />
      <p
        style={{
          margin: 0,
          fontFamily: "var(--typography-heading-3-font-family, inherit)",
          fontSize: "var(--typography-heading-3-font-size, 18px)",
          fontWeight: "var(--typography-heading-3-font-weight, 600)" as never,
          color: "var(--fgColor-default, #1F2937)",
        }}
      >
        Coming Soon
      </p>
    </div>
  );
}

function MetricRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-lg, 16px)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          borderRadius: "var(--radius-lg, 8px)",
          background: "var(--bgColor-muted, #F3F5F7)",
          color: "var(--fgColor-accent, #0084F8)",
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--typography-body-sm-regular-font-family, inherit)",
            fontSize: "var(--typography-body-sm-regular-font-size, 13px)",
            color: "var(--fgColor-muted, #6B7280)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--typography-heading-3-font-family, inherit)",
            fontSize: "var(--typography-heading-3-font-size, 18px)",
            fontWeight: "var(--typography-heading-3-font-weight, 600)" as never,
            color: "var(--fgColor-default, #1F2937)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function Donut({ percent }: { percent: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ display: "grid", placeItems: "center", position: "relative" }}>
      <svg width={144} height={144} viewBox="0 0 144 144" aria-hidden>
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke="var(--bgColor-muted, #EDEFF2)"
          strokeWidth="16"
        />
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke="var(--fgColor-accent, #0084F8)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(c * percent) / 100} ${c}`}
          transform="rotate(-90 72 72)"
        />
      </svg>
      <span
        style={{
          position: "absolute",
          fontFamily: "var(--typography-heading-1-font-family, inherit)",
          fontSize: "var(--typography-heading-1-font-size, 28px)",
          fontWeight: "var(--typography-heading-1-font-weight, 700)" as never,
          color: "var(--fgColor-default, #1F2937)",
        }}
      >
        {percent}%
      </span>
    </div>
  );
}

const axisStyle = {
  fontSize: 11,
  fill: "var(--fgColor-muted, #6B7280)",
} as const;

// The case embed renders the supplied chart data as SVG, avoiding a separate
// charting runtime while retaining the original dashboard and its series.
function CapitalChart() {
  const chartId = useId().replaceAll(':', '');
  const left = 82;
  const right = 1076;
  const top = 12;
  const bottom = 282;
  const point = (index: number, value: number) => ({
    x: left + (index / (CAPITAL_SERIES.length - 1)) * (right - left),
    y: bottom - (value / 3000000) * (bottom - top),
  });

  return (
    <svg width="100%" height="100%" viewBox="0 0 1100 320" preserveAspectRatio="none" role="img" aria-label="Total capital raised across USD, EUR, and CAD">
      <defs>
        {SERIES.map((series) => (
          <linearGradient key={series.key} id={`${chartId}-${series.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series.color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={series.color} stopOpacity={0.05} />
          </linearGradient>
        ))}
      </defs>
      {[0, 750000, 1500000, 2250000, 3000000].map((value) => {
        const { y } = point(0, value);
        return (
          <g key={value}>
            <line x1={left} x2={right} y1={y} y2={y} stroke="var(--borderColor-muted, #EEF0F3)" />
            <text x={left - 12} y={y + 4} textAnchor="end" style={axisStyle}>{value.toLocaleString('en-US')}</text>
          </g>
        );
      })}
      {CAPITAL_SERIES.filter((_, index) => index % 2 === 0).map((row, index) => (
        <text key={row.t} x={point(index * 2, 0).x} y={310} textAnchor="middle" style={axisStyle}>{row.t}</text>
      ))}
      {SERIES.map((series) => {
        const points = CAPITAL_SERIES.map((row, index) => point(index, row[series.key]));
        const line = points.map(({ x, y }, index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' ');
        return (
          <g key={series.key}>
            <path d={`${line} L${right} ${bottom} L${left} ${bottom} Z`} fill={`url(#${chartId}-${series.key})`} />
            <path d={line} fill="none" stroke={series.color} strokeWidth={2} />
            {points.map(({ x, y }, index) => (
              <circle key={index} cx={x} cy={y} r={2} fill={series.color}>
                <title>{`${series.label}: ${CAPITAL_SERIES[index][series.key].toLocaleString('en-US')}`}</title>
              </circle>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function WaffleDealroomOverview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-xl, 24px)",
        padding: "var(--space-inset-xl, 24px) 0",
        minWidth: 0,
      }}
    >
      <Card title="Total Capital Raised" right={<span />}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-inline-xl, 24px)",
            marginBottom: "var(--space-stack-md, 12px)",
          }}
        >
          {SERIES.map((s) => (
            <span
              key={s.key}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "var(--typography-body-sm-regular-font-size, 13px)",
                color: "var(--fgColor-default, #1F2937)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "var(--radius-pill, 999px)",
                  background: s.color,
                }}
              />
              {s.label}
            </span>
          ))}
        </div>
        <div style={{ width: "100%", height: 320 }}>
          <CapitalChart />
        </div>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "var(--space-inline-xl, 24px)",
          minWidth: 0,
        }}
      >
        <Card title="Draft / Pending">
          <ComingSoon />
        </Card>

        <Card
          title="Live"
          right={
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-inline-sm, 8px)",
                fontSize: "var(--typography-body-md-regular-font-size, 14px)",
                color: "var(--fgColor-default, #1F2937)",
                whiteSpace: "nowrap",
              }}
            >
              DemoCompany CORP | RegA+
              <HelpCircle size={18} color="var(--fgColor-muted, #9AA4B2)" aria-hidden />
            </span>
          }
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--space-inline-lg, 16px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-stack-md, 12px)",
                border:
                  "var(--border-width-default, 1px) solid var(--borderColor-muted, #EEF0F3)",
                borderRadius: "var(--radius-card-default, 16px)",
                padding: "var(--space-inset-lg, 16px)",
              }}
            >
              <MetricRow
                icon={<CircleDollarSign size={22} />}
                label="Amount Raised (USD)"
                value="$ 2,532,709.00"
              />
              <MetricRow
                icon={<Coins size={22} />}
                label="Average Investment (USD)"
                value="$ 14,639.94"
              />
              <MetricRow icon={<User size={22} />} label="Number of Shareholders" value="81" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-stack-md, 12px)",
                border:
                  "var(--border-width-default, 1px) solid var(--borderColor-muted, #EEF0F3)",
                borderRadius: "var(--radius-card-default, 16px)",
                padding: "var(--space-inset-lg, 16px)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--typography-body-sm-regular-font-size, 13px)",
                  color: "var(--fgColor-muted, #6B7280)",
                }}
              >
                Percent of Funds Raise
              </span>
              <Donut percent={0} />
              <dl
                style={{
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "6px var(--space-inline-lg, 16px)",
                  width: "100%",
                  fontSize: "var(--typography-body-sm-regular-font-size, 13px)",
                  color: "var(--fgColor-muted, #6B7280)",
                }}
              >
                <dt>Number of Pauses</dt>
                <dd style={{ margin: 0, color: "var(--fgColor-default, #1F2937)" }}>0</dd>
                <dt>Number of Closes</dt>
                <dd style={{ margin: 0, color: "var(--fgColor-default, #1F2937)" }}>173</dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Closed">
        <ComingSoon />
      </Card>
    </div>
  );
}

export function WaffleDealroomPlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: 260,
        padding: "var(--space-inset-xl, 24px)",
        color: "var(--fgColor-muted, #6B7280)",
        fontSize: "var(--typography-body-md-regular-font-size, 14px)",
      }}
    >
      {label} — coming soon
    </div>
  );
}

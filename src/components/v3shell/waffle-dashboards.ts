/**
 * Simulation-only catalogue ported from the Korelabs.space "Switch dashboard"
 * waffle. These colours are product brand values, not design tokens — they are
 * intentionally kept out of the token system and used only by The Waffle
 * screen simulation.
 */
import {
  User, Building2, ShieldCheck, Network, FileSignature, Radio, CreditCard,
  Layers, Rocket, Database, Sparkles, Receipt, PiggyBank, TrendingUp, Vote,
  Landmark, HeartHandshake, Server, BadgeCheck, Handshake, Calculator, Gauge,
  Banknote, UserCircle, Briefcase, ArrowLeftRight, Table2, CircleDot, Users2,
  FolderOpen, Compass, Scale,
  type LucideIcon,
} from "lucide-react";

export type WaffleStatus = "live" | "soon" | "concept";

export interface WaffleDashboard {
  id: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  status: WaffleStatus;
}

export const WAFFLE_DASHBOARDS: WaffleDashboard[] = [
  { id: "personal", label: "Personal Dashboard", tagline: "Your investor profile & holdings", icon: User, iconBg: "hsl(213,90%,96%)", iconColor: "hsl(213,90%,52%)", status: "live" },
  { id: "company", label: "Company Dashboard", tagline: "Cap table, dealroom & shareholders", icon: Building2, iconBg: "hsl(30,90%,95%)", iconColor: "hsl(30,90%,55%)", status: "live" },
  { id: "compliance", label: "Compliance Desk", tagline: "KYC, KYP & AML reviews", icon: ShieldCheck, iconBg: "hsl(213,90%,96%)", iconColor: "hsl(213,90%,52%)", status: "live" },
  { id: "ecosystem", label: "Ecosystem", tagline: "Partners & integrations", icon: Network, iconBg: "hsl(190,55%,94%)", iconColor: "hsl(190,65%,42%)", status: "soon" },
  { id: "tap", label: "TAP", tagline: "Transfer Agent Platform", icon: FileSignature, iconBg: "hsl(260,40%,95%)", iconColor: "hsl(260,50%,55%)", status: "live" },
  { id: "wire", label: "Newswire", tagline: "Private capital markets communications ecosystem", icon: Radio, iconBg: "hsl(4,80%,95%)", iconColor: "hsl(4,80%,62%)", status: "live" },
  { id: "pay", label: "Payments", tagline: "Investor payments & disbursements", icon: CreditCard, iconBg: "hsl(168,55%,94%)", iconColor: "hsl(168,55%,42%)", status: "soon" },
  { id: "builders", label: "API", tagline: "Developer APIs & integrations", icon: Layers, iconBg: "hsl(225,60%,95%)", iconColor: "hsl(225,65%,36%)", status: "soon" },
  { id: "launch", label: "Launch", tagline: "Form & operate your U.S. company", icon: Rocket, iconBg: "hsl(26,90%,95%)", iconColor: "hsl(26,90%,55%)", status: "soon" },
  { id: "alts", label: "Alts", tagline: "Alternative investments", icon: Layers, iconBg: "hsl(45,90%,94%)", iconColor: "hsl(40,85%,50%)", status: "soon" },
  { id: "data", label: "KoreData", tagline: "Data & analytics platform", icon: Database, iconBg: "hsl(270,50%,95%)", iconColor: "hsl(270,60%,55%)", status: "live" },
  { id: "askoscar", label: "AskOscar", tagline: "AI answers across your workspace", icon: Sparkles, iconBg: "hsl(280,55%,95%)", iconColor: "hsl(280,65%,55%)", status: "soon" },
  { id: "billing", label: "Billing", tagline: "Invoices, subscriptions & payments", icon: Receipt, iconBg: "hsl(150,55%,94%)", iconColor: "hsl(150,55%,42%)", status: "live" },
  { id: "spv", label: "SPV", tagline: "Special purpose vehicles", icon: PiggyBank, iconBg: "hsl(20,80%,95%)", iconColor: "hsl(20,80%,52%)", status: "soon" },
  { id: "funds", label: "Funds", tagline: "Fund administration & reporting", icon: TrendingUp, iconBg: "hsl(340,60%,95%)", iconColor: "hsl(340,70%,52%)", status: "soon" },
  { id: "proxy", label: "Proxy", tagline: "Proxy voting & shareholder actions", icon: Vote, iconBg: "hsl(220,70%,95%)", iconColor: "hsl(220,70%,42%)", status: "soon" },
  { id: "issuance", label: "Issuance", tagline: "Guided capital raise, registration & deal room", icon: Landmark, iconBg: "hsl(213,90%,96%)", iconColor: "hsl(213,90%,52%)", status: "soon" },
  { id: "success", label: "Client Success", tagline: "Client health, onboarding & engagement", icon: HeartHandshake, iconBg: "hsl(340,60%,95%)", iconColor: "hsl(340,70%,50%)", status: "live" },
  { id: "node", label: "KoreNode", tagline: "Operator console for nodes, transactions & compliance", icon: Server, iconBg: "hsl(174,55%,94%)", iconColor: "hsl(174,60%,36%)", status: "live" },
  { id: "verify", label: "Verify", tagline: "Compliance verifications, reports & filings", icon: BadgeCheck, iconBg: "hsl(200,70%,95%)", iconColor: "hsl(200,75%,42%)", status: "soon" },
  { id: "sales", label: "Sales", tagline: "Pipeline, clients, commissions & partners", icon: Handshake, iconBg: "hsl(213,90%,96%)", iconColor: "hsl(213,90%,52%)", status: "live" },
  { id: "valuation", label: "Valuation", tagline: "409A valuations, reports & distribution", icon: Calculator, iconBg: "hsl(262,60%,96%)", iconColor: "hsl(262,60%,50%)", status: "soon" },
  { id: "koreready", label: "Ready", tagline: "Business, investment & diligence readiness", icon: Gauge, iconBg: "hsl(158,50%,95%)", iconColor: "hsl(158,64%,32%)", status: "soon" },
  { id: "distributions", label: "Distributions", tagline: "Dividends, investor distributions & payments", icon: Banknote, iconBg: "hsl(174,50%,95%)", iconColor: "hsl(174,64%,32%)", status: "soon" },
  { id: "profile", label: "Profile", tagline: "Your company & user profile", icon: UserCircle, iconBg: "hsl(213,60%,95%)", iconColor: "hsl(213,70%,45%)", status: "live" },
  { id: "portfolio", label: "Portfolio", tagline: "Holdings across the ecosystem", icon: Briefcase, iconBg: "hsl(200,60%,95%)", iconColor: "hsl(200,70%,45%)", status: "soon" },
  { id: "invest", label: "Invest", tagline: "Discover & invest in offerings", icon: PiggyBank, iconBg: "hsl(150,60%,95%)", iconColor: "hsl(150,60%,34%)", status: "soon" },
  { id: "transfer", label: "Transfer", tagline: "Transfer securities & ownership", icon: ArrowLeftRight, iconBg: "hsl(20,60%,95%)", iconColor: "hsl(20,75%,45%)", status: "soon" },
  { id: "trade", label: "Trade", tagline: "Secondary market trading", icon: TrendingUp, iconBg: "hsl(340,60%,95%)", iconColor: "hsl(340,70%,48%)", status: "soon" },
  { id: "captable", label: "Cap Table", tagline: "Ownership & securities ledger", icon: Table2, iconBg: "hsl(30,60%,95%)", iconColor: "hsl(30,70%,45%)", status: "soon" },
  { id: "dealroom", label: "DealRoom", tagline: "Deal materials & investor access", icon: CircleDot, iconBg: "hsl(260,60%,95%)", iconColor: "hsl(260,70%,45%)", status: "live" },
  { id: "shareholders", label: "Shareholder Comm", tagline: "Shareholder communications", icon: Users2, iconBg: "hsl(35,60%,95%)", iconColor: "hsl(35,70%,45%)", status: "live" },
  { id: "documents", label: "Documents", tagline: "Central document vault", icon: FolderOpen, iconBg: "hsl(220,60%,95%)", iconColor: "hsl(220,70%,45%)", status: "soon" },
  { id: "compass", label: "Compass", tagline: "Guidance across your journey", icon: Compass, iconBg: "hsl(190,60%,95%)", iconColor: "hsl(190,70%,42%)", status: "soon" },
  { id: "ria", label: "RIA", tagline: "Registered investment advisors", icon: Scale, iconBg: "hsl(262,60%,95%)", iconColor: "hsl(262,70%,50%)", status: "soon" },
  { id: "rr", label: "RR", tagline: "Registered representatives", icon: BadgeCheck, iconBg: "hsl(174,60%,95%)", iconColor: "hsl(174,70%,36%)", status: "soon" },
  { id: "nexus", label: "Nexus", tagline: "Connected network services", icon: Network, iconBg: "hsl(280,60%,95%)", iconColor: "hsl(280,70%,52%)", status: "soon" },
];

export const WAFFLE_SECTIONS: { label?: string; rows: string[][] }[] = [
  {
    rows: [
      ["profile", "portfolio", "invest", "transfer", "trade"],
      ["captable", "dealroom", "shareholders", "documents", "issuance"],
      ["distributions", "compass", "launch", "wire", "pay"],
      ["spv", "funds", "proxy", "valuation", "koreready"],
      ["compliance", "ria", "rr", "nexus", "verify"],
      ["ecosystem", "builders", "personal", "company"],
    ],
  },
  {
    label: "Kore Only",
    rows: [["billing", "data", "sales", "success", "askoscar"]],
  },
];

export const WAFFLE_BY_ID: Record<string, WaffleDashboard> = Object.fromEntries(
  WAFFLE_DASHBOARDS.map((d) => [d.id, d]),
);

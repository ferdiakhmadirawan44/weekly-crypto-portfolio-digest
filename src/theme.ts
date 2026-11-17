// ---------------------------------------------------------------------------
// The Ledger's brand, written once as a Hyper Elements theme and handed to
// the <Email> root. Every color, font and default below flows into the whole
// template through tokens — no per-element brand values.
// ---------------------------------------------------------------------------

import { defineTheme } from "@hyper-elements/react";

/** Monospace stack for figures (prices, values, percentages). */
export const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Semantic colors used across the digest (kept as constants so the theme
 *  stays limited to Hyper Elements' documented color roles). */
export const C = {
  ink: "#0B1220",
  band: "#0B1220",
  bandSoft: "#94A3B8",
  page: "#E9EDF2",
  card: "#FFFFFF",
  muted: "#5B6472",
  faint: "#94A3B8",
  border: "#E2E8F0",
  zebra: "#F8FAFC",
  track: "#E5E7EB",
  up: "#059669",
  upDark: "#047857",
  upTint: "#D1FAE5",
  down: "#DC2626",
  downDark: "#B91C1C",
  downTint: "#FEE2E2",
  amber: "#B45309",
  amberTint: "#FEF3C7",
  teal: "#0F766E",
} as const;

export const ledgerTheme = defineTheme({
  colors: {
    background: C.page,
    foreground: C.ink,
    primary: C.ink,
    primaryForeground: "#FFFFFF",
    muted: C.muted,
    border: C.border,
  },
  fonts: {
    body: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
    heading: "Georgia, 'Times New Roman', serif",
  },
  fontSizes: { body: 15 },
  lineHeights: { body: 1.6 },
  elements: {
    Heading: {
      by: {
        level: {
          // Broadsheet-style serif headlines.
          1: { fontSize: 30, lineHeight: 1.15, mobile: { fontSize: 25 } },
          2: { fontSize: 20, lineHeight: 1.25, mobile: { fontSize: 18 } },
          // Section kickers: small, tracked-out, uppercase, muted.
          3: {
            fontSize: 12,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: "{colors.muted}",
          },
        },
      },
    },
    Button: {
      borderRadius: 8,
      hover: { backgroundColor: "#1E293B" },
    },
  },
  styles: {
    // The white card every content section lives in.
    card: {
      backgroundColor: "#FFFFFF",
      padding: 28,
      gap: 20,
      borderRadius: 12,
      border: "1px solid #E2E8F0",
    },
  },
});

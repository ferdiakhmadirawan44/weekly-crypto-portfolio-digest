// ---------------------------------------------------------------------------
// THE LEDGER — Weekly Crypto Portfolio Digest
// An email template built with Hyper Elements (@hyper-elements/react).
//
// Concept: a weekly "financial broadsheet" for one person's portfolio —
// serif headlines, monospace figures, and a strict navy / paper / green /
// red palette, so it reads like a premium product email, not a spreadsheet
// with a logo on top. The template is data-driven: pass a `data` prop (see
// src/data.ts) and the same template renders any portfolio.
// ---------------------------------------------------------------------------

import {
  Button,
  Column,
  Divider,
  Email,
  Grid,
  Heading,
  Image,
  LineBreak,
  Link,
  List,
  ListItem,
  Menu,
  MergeTag,
  Row,
  Section,
  Social,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { defaultData, type DigestData, type Holding, type Mover } from "./data.js";
import { C, ledgerTheme, MONO_FONT } from "./theme.js";
import { LOGO_DATA_URI } from "./logo.js";

/** Width (px) of an allocation bar's track, inside the allocation card. */
const TRACK_PX = 376;

const fmtChange = (n: number) =>
  `${n > 0 ? "▲ " : n < 0 ? "▼ " : ""}${n > 0 ? "+" : ""}${n.toFixed(2)}%`;

function Stat({
  label,
  value,
  sub,
  subColor,
}: {
  label: string;
  value: string;
  sub: string;
  subColor: string;
}) {
  return (
    <Column style={{ gap: 4 }}>
      <Text
        style={{
          fontSize: 12,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: token("colors.muted"),
        }}
      >
        {label}
      </Text>
      <Text style={{ fontFamily: MONO_FONT, fontSize: 22, fontWeight: 700 }}>{value}</Text>
      <Text style={{ fontSize: 13, fontWeight: 700, color: subColor }}>{sub}</Text>
    </Column>
  );
}

function MoverCard({ mover }: { mover: Mover }) {
  const isGainer = mover.kind === "gainer";
  const accent = isGainer ? C.up : C.down;
  const accentDark = isGainer ? C.upDark : C.downDark;
  const tint = isGainer ? "#F0FDF4" : "#FEF2F2";
  const edge = isGainer ? "#BBF7D0" : "#FECACA";
  return (
    <Column
      style={{
        backgroundColor: tint,
        border: `1px solid ${edge}`,
        borderRadius: 12,
        padding: 20,
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          fontWeight: 700,
          color: accentDark,
        }}
      >
        {isGainer ? "▲ Biggest gainer" : "▼ Biggest loser"}
      </Text>
      <Heading level={2}>
        {mover.name} · {mover.symbol}
      </Heading>
      <Text style={{ fontFamily: MONO_FONT, fontSize: 30, fontWeight: 700, color: accent }}>
        {mover.changeWeek > 0 ? "+" : ""}
        {mover.changeWeek.toFixed(1)}%
      </Text>
      <Text style={{ fontSize: 14 }}>{mover.reason}</Text>
      <Text style={{ fontSize: 12, color: token("colors.muted") }}>
        {mover.weekRange} · Now {mover.price}
      </Text>
    </Column>
  );
}

export interface DigestProps {
  data?: DigestData;
}

function Digest({ data = defaultData }: DigestProps) {
  const { holdings } = data;
  return (
    <Email
      theme={ledgerTheme}
      title="The Ledger — Your Weekly Crypto Portfolio Digest"
      previewText="Your portfolio is up 4.19% this week — BTC leads, SOL steals the show. Your weekly digest is inside."
      lang="en"
      style={{ gap: 0 }}
    >
      {/* ---- Masthead: dark band, brand lockup, issue line ---- */}
      <Section
        tokens={{ colors: { background: C.band, foreground: "#FFFFFF" } }}
        style={{ backgroundColor: C.band, padding: [28, 0, 24, 0], gap: 16 }}
      >
        <Row style={{ gap: 14, alignItems: "center" }}>
          <Image
            src={{ src: LOGO_DATA_URI, width: 240, height: 240 }}
            alt="The Ledger"
            style={{ width: 40, flex: "none" }}
          />
          <Column style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#FFFFFF",
                letterSpacing: 2,
              }}
            >
              THE LEDGER
            </Text>
            <Text style={{ color: C.bandSoft, fontSize: 13 }}>
              Your weekly crypto portfolio digest
            </Text>
          </Column>
        </Row>
        <Divider style={{ borderTop: { width: 1, style: "solid", color: "#1E293B" } }} />
        <Row style={{ gap: 16 }}>
          <Text style={{ color: C.bandSoft, fontSize: 12, flex: 1 }}>
            Issue #{data.issue} · {data.weekLabel} · {data.weekDates}
          </Text>
          <Text style={{ color: C.bandSoft, fontSize: 12, textAlign: "right" }}>
            Sunday edition
          </Text>
        </Row>
      </Section>

      {/* ---- Body: the cards, on the page background ---- */}
      <Section style={{ padding: [24, 0, 8, 0], gap: 24 }}>
        {/* Hero: greeting + portfolio summary */}
        <Column style={{ apply: ["card"] }}>
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: token("colors.muted"),
            }}
          >
            {data.weekLabel} · {data.weekDates}
          </Text>
          <Heading level={1}>
            Good morning, <MergeTag name="first_name" />
          </Heading>
          <Text>
            Your portfolio gained{" "}
            <Span style={{ fontWeight: 700, color: C.upDark }}>
              {data.totalChangeWeek} (+{data.totalChangeWeekPct.toFixed(2)}%)
            </Span>{" "}
            this week. Bitcoin did the heavy lifting — Solana did the celebrating.
          </Text>
          <Divider style={{ borderTop: { width: 1, style: "solid", color: token("colors.border") } }} />
          <Row style={{ gap: 24 }}>
            <Stat
              label="Total value"
              value={data.totalValue}
              sub={`${data.totalChangeWeek} this week`}
              subColor={C.upDark}
            />
            <Stat
              label="Last 24 hours"
              value={`+${data.change24hPct.toFixed(2)}%`}
              sub={`${data.change24hValue} today`}
              subColor={C.upDark}
            />
            <Stat
              label="Last 7 days"
              value={`+${data.change7dPct.toFixed(2)}%`}
              sub={`Market +${data.marketChange7dPct.toFixed(1)}%`}
              subColor={C.muted}
            />
          </Row>
        </Column>

        {/* Holdings table */}
        <Column style={{ apply: ["card"] }}>
          <Row style={{ gap: 16, alignItems: "end" }}>
            <Heading level={2} style={{ flex: 1 }}>
              Your holdings
            </Heading>
            <Text style={{ fontSize: 12, color: token("colors.muted") }}>
              {holdings.length} assets · 16 Nov, 09:00 UTC
            </Text>
          </Row>
          <Table
            style={{
              cellPadding: [10, 8],
              rowBorder: { width: 1, style: "solid", color: C.border },
            }}
          >
            <TableRow header>
              <TableCell>Asset</TableCell>
              <TableCell style={{ textAlign: "right", width: 96 }}>Price</TableCell>
              <TableCell style={{ textAlign: "right", width: 84 }}>24h</TableCell>
              <TableCell style={{ textAlign: "right", width: 108 }}>Value</TableCell>
              <TableCell style={{ textAlign: "right", width: 64 }}>Share</TableCell>
            </TableRow>
            {holdings.map((h: Holding, i: number) => (
              <TableRow
                key={h.symbol}
                style={i % 2 === 1 ? { backgroundColor: C.zebra } : undefined}
              >
                <TableCell>
                  <Span style={{ fontWeight: 700 }}>{h.symbol}</Span>
                  <LineBreak />
                  <Span style={{ fontSize: 12, color: token("colors.muted") }}>{h.name}</Span>
                </TableCell>
                <TableCell style={{ textAlign: "right", fontFamily: MONO_FONT }}>
                  {h.price}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "right",
                    fontFamily: MONO_FONT,
                    fontWeight: 700,
                    color: h.change24h > 0 ? C.upDark : h.change24h < 0 ? C.down : token("colors.muted"),
                  }}
                >
                  {fmtChange(h.change24h)}
                </TableCell>
                <TableCell style={{ textAlign: "right", fontFamily: MONO_FONT, fontWeight: 700 }}>
                  {h.value}
                </TableCell>
                <TableCell style={{ textAlign: "right", fontFamily: MONO_FONT }}>
                  {h.share.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <Text style={{ fontSize: 12, color: token("colors.muted") }}>
            Stablecoins (USDC) are held at $1.00. Prices are sample data as of 16 November
            2026, 09:00 UTC.
          </Text>
        </Column>

        {/* Allocation bars */}
        <Column style={{ apply: ["card"] }}>
          <Heading level={2}>Where your money sits</Heading>
          <Text style={{ color: token("colors.muted") }}>
            Bitcoin still runs the show — just over two-fifths of the portfolio. Solana is the
            only holding that grew its slice this week.
          </Text>
          {holdings.map((h: Holding) => (
            <Row key={h.symbol} style={{ gap: 12, alignItems: "center" }}>
              <Column style={{ width: 92, gap: 0 }}>
                <Text style={{ fontWeight: 700, fontSize: 13 }}>{h.symbol}</Text>
                <Text style={{ fontSize: 12, color: token("colors.muted") }}>{h.name}</Text>
              </Column>
              <Column
                style={{
                  flex: 1,
                  backgroundColor: C.track,
                  borderRadius: 999,
                  height: 8,
                  overflow: "hidden",
                  gap: 0,
                }}
              >
                <Column
                  style={{
                    width: Math.max(8, Math.round((h.share / 100) * TRACK_PX)),
                    height: 8,
                    backgroundColor: h.color,
                    borderRadius: 999,
                  }}
                />
              </Column>
              <Text
                style={{
                  width: 52,
                  fontFamily: MONO_FONT,
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "right",
                }}
              >
                {h.share.toFixed(1)}%
              </Text>
            </Row>
          ))}
        </Column>

        {/* Top movers */}
        <Grid columns={2} style={{ gap: 16 }}>
          {data.movers.map((m: Mover) => (
            <MoverCard key={m.symbol} mover={m} />
          ))}
        </Grid>

        {/* Analyst note */}
        <Column style={{ apply: ["card"] }}>
          <Heading level={3}>Analyst note</Heading>
          <Heading level={2}>The week in one paragraph</Heading>
          <Text>{data.insight}</Text>
          <Divider style={{ borderTop: { width: 1, style: "solid", color: token("colors.border") } }} />
          <Heading level={3}>Three things to watch next week</Heading>
          <List type="number">
            {data.watchList.map((w: string) => (
              <ListItem key={w}>{w}</ListItem>
            ))}
          </List>
        </Column>
      </Section>

      {/* ---- Market snapshot: dark band ---- */}
      <Section
        tokens={{ colors: { background: C.band, foreground: "#FFFFFF" } }}
        style={{ backgroundColor: C.band, padding: [24, 0], gap: 16 }}
      >
        <Heading level={3} style={{ color: C.bandSoft }}>
          Market snapshot · 16 November 2026
        </Heading>
        <Row style={{ gap: 24 }}>
          {data.market.map((s) => (
            <Column key={s.label} style={{ gap: 4 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: C.bandSoft,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {s.label}
              </Text>
              <Text style={{ fontFamily: MONO_FONT, fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>
                {s.value}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color:
                    s.trend === "up" ? "#34D399" : s.trend === "down" ? "#F87171" : C.bandSoft,
                }}
              >
                {s.note}
              </Text>
            </Column>
          ))}
        </Row>
      </Section>

      {/* ---- CTA + footer ---- */}
      <Section style={{ padding: [24, 0, 32, 0], gap: 24 }}>
        <Column style={{ apply: ["card"], alignItems: "center", gap: 16 }}>
          <Heading level={2} style={{ textAlign: "center" }}>
            See the full picture
          </Heading>
          <Text style={{ textAlign: "center", color: token("colors.muted") }}>
            Open your portfolio to drill into every trade, transfer and token — live prices,
            cost basis and tax lots included.
          </Text>
          <Button href="https://example.com/portfolio">View your full portfolio</Button>
          <Text style={{ fontSize: 13, textAlign: "center" }}>
            <Link href="https://example.com/preferences">Manage your digest preferences</Link>
          </Text>
        </Column>
        <Divider style={{ borderTop: { width: 1, style: "solid", color: "#CBD5E1" } }} />
        <Menu
          items={[
            { text: "View in browser", href: "https://example.com/digest/47" },
            { text: "Preferences", href: "https://example.com/preferences" },
            { text: "Unsubscribe", href: "https://example.com/unsubscribe" },
          ]}
          separator="·"
          style={{ fontSize: 13, color: token("colors.muted") }}
        />
        <Social
          icons={[
            { name: "X", href: "https://x.com/example" },
            { name: "Discord", href: "https://discord.gg/example" },
            { name: "Telegram", href: "https://t.me/example" },
          ]}
          size={28}
        />
        <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "center" }}>
          The Ledger is a weekly digest from Example Finance. You are receiving this because
          you subscribed to weekly portfolio updates.
        </Text>
        <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "center" }}>
          All figures in this email are SAMPLE DATA for demonstration purposes only — not
          financial advice, and not your real portfolio. Prices as of 16 November 2026,
          09:00 UTC.
        </Text>
        <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "center" }}>
          Example Finance · 1 Market Street, San Francisco, CA 94105
        </Text>
      </Section>
    </Email>
  );
}

// Props for `npx hyper-elements check/render` (the template renders its
// sample data when no props are given).
export default Object.assign(Digest, { PreviewProps: {} });

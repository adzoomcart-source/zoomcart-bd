# Design Brief — ZoomCart BD

## Purpose & Tone
Mobile-first Bangladeshi dropshipping reseller platform. **Tone**: Bold, energetic, trust-forward. Target: young entrepreneurs seeking low-risk income. Every interface signals "fast, simple, proven."

## Visual Direction
Vibrant modern market energy paired with structured credibility. Red dominates action, orange encourages, green confirms, yellow highlights. Rounded cards soften bold color impact. Bilingual CTAs (English + Bangla).

## Color Palette (OKLCH)

| Name | L | C | H | Purpose |
|------|---|---|---|---------|
| Primary Red | 0.5 | 0.22 | 25 | Brand, urgency, CTAs |
| Secondary Orange | 0.62 | 0.23 | 45 | Encouragement, accents |
| Success Green | 0.68 | 0.15 | 142 | Confirmation, growth |
| Warning Yellow | 0.75 | 0.18 | 80 | Highlights, attention |
| Background | 0.98 | 0.01 | 0 | Clean near-white |
| Foreground | 0.2 | 0.01 | 0 | High-contrast text |
| Muted | 0.88 | 0.03 | 0 | Subtle separation |
| Border | 0.92 | 0.02 | 0 | Light dividers |

## Typography
**Display**: Space Grotesk (geometric, energetic headlines). **Body**: General Sans (refined, readable). **Mono**: System monospace.

## Structural Zones

| Zone | Surface | Treatment |
|------|---------|-----------|
| Header | Card | Sticky, solid bg-card, border-b, brand + nav + reseller CTA |
| Hero | Background | Large imagery area with layered trust badges (Fast Delivery, Weekly Payment, Free) |
| Product Grid | Muted | 2-col mobile / 3-col tablet, commission badges top-right, rounded-lg cards with shadow-card |
| Trust Footer | Card | Summary row: trust signals, support link |
| Sidebar (admin) | Sidebar | Sidebar-primary for active, sidebar-accent for secondary nav |

## Spacing & Rhythm
Mobile-first density: 16px base unit. Tight vertical rhythm on cards (12px gutters). Loose spacing between sections (24–32px).

## Component Patterns
- **Trust Badge**: bg-primary/5, border border-primary/10, rounded-full, icon + label
- **Commission Badge**: bg-success, text-success-foreground, rounded-full, bold text
- **CTA Button**: bg-primary, text-primary-foreground, cta-primary utility, bilingual label
- **Product Card**: bg-card, shadow-card, rounded-lg, image + title + price + commission badge + CTA
- **Form Input**: bg-input, border-border, rounded-md, focus:ring-2 ring-primary

## Motion
Smooth transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1). Hover: opacity-90. Active: scale-95.

## Dark Mode
Implemented. Darker backgrounds (0.13 L), lighter text (0.96 L), muted becomes (0.25 L). Primary red brightens to 0.62 L for readability.

## Constraints
- No shadow abuse — only card, elevated, subtle shadows for depth, never glow
- Border-radius: rounded-lg (1rem) for cards, rounded-md (0.5rem) for inputs
- No arbitrary color classes — all tokens via CSS variables
- Bilingual labels on CTAs and key headlines only

## Signature Detail
Commission badges integrated into product cards with success green. Trust signals layered in hero as stackable badges. Bold red CTAs with slight opacity-90 hover state create energetic click targets.

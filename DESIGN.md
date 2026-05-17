# Design Brief: Digital Human Memory Vault

## Purpose & Context
Secure emergency healthcare platform enabling instant medical access during critical situations. Users: patients creating emergency profiles, doctors requesting access, admins approving workflows. Primary use case: QR code scanning for instant retrieval of patient blood group, allergies, medications, and emergency contacts.

## Tone & Aesthetic
Clinical confidence with urgency. Hospital authority meets modern clarity. Deep blue conveys medical trust; red signals emergency severity. Refined, not sterile. Minimalist card-based UI with clear visual hierarchy.

## Design Decisions
- **Primary Color**: Medical blue `oklch(0.45 0.16 262)` — authority, credibility
- **Emergency Accent**: Clinical red `oklch(0.58 0.28 17)` — alerts, destructive actions
- **Success**: Medical green `oklch(0.68 0.15 142)` — approval, cleared status
- **Backgrounds**: Crisp white light / deep dark for trust and clarity
- **Typography**: GeneralSans (humanist medical sans-serif) + GeistMono (data display)
- **Border Radius**: 0.5rem (8px) — precise, medical-grade
- **Motion**: Smooth transitions (0.3s cubic-bezier) for form validation, alert entrance

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-------------|-----------|-------|
| Primary | `0.45 0.16 262` | `0.72 0.14 265` | Header, buttons, links, medical authority |
| Accent/Destructive | `0.58 0.28 17` | `0.65 0.26 20` | Emergency alerts, critical indicators, emergency buttons |
| Success | `0.68 0.15 142` | `0.62 0.18 142` | Doctor approvals, cleared status, verified badges |
| Background | `0.98 0 0` | `0.12 0 0` | Page background |
| Card | `0.99 0 0` | `0.16 0 0` | Card surfaces |
| Border | `0.88 0.01 0` | `0.25 0.01 0` | Dividers, input borders |
| Muted | `0.92 0 0` | `0.2 0 0` | Secondary backgrounds, disabled states |

## Structural Zones

| Zone | Light Bg | Dark Bg | Treatment | Purpose |
|------|----------|---------|-----------|----------|
| Header | `primary` (blue) | `primary` (blue) | Elevated shadow, white text | Navigation, branding |
| Main Content | `background` (white) | `background` (dark) | Neutral baseline | Patient profiles, doctor forms |
| Cards | `card` (off-white) | `card` (dark-card) | Shadow-elevated, border | Data display, profile sections |
| Emergency Alert | `accent` (red) | `accent` (red) | Shadow-emergency, white text | Critical alerts, approvals needed |
| Sidebar | `sidebar` (white/dark) | `sidebar` (dark) | `border-r`, navy text | Navigation, role-based menus |
| Footer | `muted` (grey) | `muted` (dark-grey) | `border-t`, subtle text | Links, support, metadata |

## Typography Hierarchy

| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display XL | GeneralSans | 2.5rem (40px) | 700 | Page title (emergency, registration) |
| Display | GeneralSans | 2rem (32px) | 600 | Section title, profile name |
| Body Large | GeneralSans | 1.125rem (18px) | 500 | Card headline, form label |
| Body | GeneralSans | 1rem (16px) | 400 | Body copy, patient data |
| Body Small | GeneralSans | 0.875rem (14px) | 400 | Helper text, metadata |
| Mono | GeistMono | 0.875rem (14px) | 400 | QR codes, medical IDs, codes |

## Component Patterns

- **Buttons**: Blue primary (confident), red destructive (emergency), grey secondary (tertiary actions)
- **Forms**: Bordered input (`border-border`), label above, error in red, success checkmark in green
- **Cards**: Subtle shadow, 1px border, 0.5rem radius, padding: 1.5rem
- **Alerts**: Emergency cards with red left border, icon + text, shadow-emergency
- **Badges**: Doctor approval (green), emergency indicator (red), verified (blue)

## Motion & Interaction

- **Default**: `transition-smooth` (0.3s cubic-bezier(0.4, 0, 0.2, 1))
- **Alert Entrance**: Fade in + scale 0.98→1.0 over 0.2s
- **Form Validation**: Border flash red on error, green on success
- **Approval Flow**: Green checkmark fade in when doctor request accepted

## Spacing & Rhythm

- **Gaps**: 0.5rem (8px), 1rem (16px), 1.5rem (24px), 2rem (32px) — mobile-first
- **Padding**: Cards 1.5rem, sections 2rem, full-bleed 0
- **Line Height**: 1.5 (body), 1.3 (headings) — medical readability

## Differentiation

Clinical precision meets digital urgency. Card-based layout with clear elevation hierarchy. Blue header commands authority; red emergency indicators cut through noise. QR code and badge icons signal instant access and security. No decoration — every visual choice serves clarity and speed.

## Constraints

- No generic bootstrap blue; medical blue throughout
- No rounded corners on buttons; consistent 0.5rem
- Emergency alerts always include icon + text + actionable button
- All sensitive data (blood group, allergies, medications) displayed in cards with subtle shadows, never on plain background
- Dark mode maintains contrast: blue primary, white text on blue header, clear card separation

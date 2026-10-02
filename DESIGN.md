# Design Brief

## Direction

Calm Care — a soft, spa-like dental clinic site that feels like a deep breath before the dentist's chair.

## Tone

Gentle, trustworthy, and airy: generous whitespace, rounded forms, and muted mint-teal executed with clinical precision rather than bright consumer energy.

## Differentiation

A warm paper background paired with a humanist serif headline and soft mint surfaces — healthcare that reads as hospitality, not hospital.

## Color Palette

| Token      | OKLCH         | Role                                       |
| ---------- | ------------- | ------------------------------------------ |
| background | 0.975 0.008 165 | Warm off-white page canvas               |
| foreground | 0.27 0.032 175  | Deep teal-charcoal text                  |
| card       | 0.995 0.004 165 | Near-white elevated surfaces             |
| primary    | 0.62 0.088 175  | Soft mint-teal CTAs and active states    |
| accent     | 0.78 0.11 88    | Warm gold for stars and small highlights |
| muted      | 0.945 0.022 168 | Tinted section bands and quiet chips     |
| border     | 0.9 0.02 170    | Hairline mint borders                    |

## Typography

- Display: Lora — headings, hero headline, section titles (serif, warm authority)
- Body: Figtree — paragraphs, labels, buttons, form fields (clean geometric sans)
- Scale: hero `text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight`, h2 `text-3xl md:text-4xl font-semibold tracking-tight`, label `text-xs font-semibold tracking-[0.18em] uppercase`, body `text-base md:text-lg leading-relaxed`

## Elevation & Depth

Layered soft shadows with a mint tint rather than neutral gray; cards float on `shadow-soft`, hover lifts to `shadow-lift`, and the sticky header uses a blurred translucent surface.

## Structural Zones

| Zone    | Background               | Border     | Notes                                          |
| ------- | ------------------------ | ---------- | ---------------------------------------------- |
| Header  | `bg-card/80` + backdrop-blur | `border-b border-border` | Sticky, pill nav, persistent Book Now button |
| Hero    | `bg-gradient-hero` on background | —    | Two-column, decorative mint blob + tooth mark |
| Content | Alternating `bg-background` / `bg-muted/40` | — | About, Services, Reviews, Hours, Contact bands |
| Footer  | `bg-primary` (deep mint) | `border-t border-primary` | Light text, social icons, quick links |

## Spacing & Rhythm

Sections use `py-16 md:py-24` with a `max-w-6xl` container and `px-4 sm:px-6`; cards group content at `p-6 md:p-8`, and micro-spacing stays on a 4/8px rhythm.

## Component Patterns

- Buttons: pill (`rounded-full`), solid mint primary with soft shadow, outlined secondary, hover lift + slight darken
- Cards: `rounded-2xl` white surfaces with `border border-border` and `shadow-soft`, hover `-translate-y-1`
- Badges: pill chips in `bg-secondary` mint with `text-secondary-foreground`; star ratings use the gold accent

## Motion

- Entrance: single `fade-up` keyframe on scroll-revealed sections, 0.5s ease-out, staggered 80ms
- Hover: 200ms lift and shadow change on cards and buttons
- Decorative: slow `float` on hero illustration blobs, subtle `pulse-soft` on the rating badge

## Constraints

- Soft, calm palette only — no saturated or neon colors, no purple gradients
- Light mode is the primary experience; dark tokens exist but the site ships light
- Single long page with anchor navigation; no online payment and no language toggle

## Signature Detail

The hero's soft mint blob with a friendly tooth mark and floating sparkle accents — a warm, human moment that sets the clinic apart from clinical stock imagery.

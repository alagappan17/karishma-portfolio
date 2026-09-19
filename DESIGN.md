---
name: Karishma Sharma Portfolio
description: An editorial, bento-led portfolio for making complex product work feel clear and human.
colors:
  ink: "#152a40"
  muted-ink: "#556478"
  paper-canvas: "#f7f5f0"
  paper-surface: "#fcfbf8"
  powder-blue: "#dfe9fa"
  pale-butter: "#f6efc9"
  muted-lilac: "#ebe1f4"
  signal-blue: "#263cce"
  line: "rgba(21,42,64,.14)"
  inverse-paper: "#f8f6f0"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(4rem, 8vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 0.87
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.7rem, 5vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  bento: "18px"
  mockup: "12px"
  pill: "999px"
  circular: "50%"
spacing:
  micro: "6px"
  tight: "12px"
  tile-gap: "16px"
  section: "112px"
  desktop-gutter: "24px"
  tile-padding: "clamp(24px, 3vw, 44px)"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "#fff"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 17px 13px 19px"
  button-light:
    backgroundColor: "{colors.inverse-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "13px 17px 13px 19px"
  project-card:
    backgroundColor: "{colors.powder-blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bento}"
    padding: "21px"
  tag-chip:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 8px"
---

# Design System: Karishma Sharma Portfolio

## Overview

**Creative North Star: "The Editorial Worktable"**

This is a personal editorial portfolio in **Experience** mode: the work takes the foreground, while navigation and controls recede into a calm, precise frame. Warm paper gives the page a tactile, considered base; deep navy provides the seriousness needed for complex enterprise and AI work; a rotating family of powder blue, pale butter, and muted lilac tiles gives each story room to breathe.

The system behaves like an arranged worktable rather than a conventional stacked website. Generous bento tiles create a paced sequence of introduction, proof, project work, perspective, experience, and contact. Expressive serif headlines carry the human point of view; compact sans-serif UI copy keeps the experience practical and legible. Case-study routes inherit this world so the homepage reads as the front door, not a visual detour.

**Key Characteristics:**

- Editorial, personal, and quietly confident rather than promotional.
- Warm light surfaces with deep-navy contrast and one restrained cobalt signal.
- Varied rounded bento tiles that make the portfolio feel composed, not templated.
- Large, close-set serif statements paired with compact, clear sans-serif information.
- Minimal motion: small hover lifts and deliberate scroll behavior, never ambient spectacle.

## Colors

The palette is a soft paper-and-pastel field grounded by dark ink; color differentiates editorial moments and project identities rather than decorating every element.

### Primary

- **Deep Editorial Ink:** the principal contrast color for primary tiles, text, outlines, and directional controls. It establishes focus and authority without defaulting to black.
- **Cobalt Signal:** a sparingly used interactive and indexing signal for greetings, links, focus treatment, and small visual anchors.

### Secondary

- **Powder Blue:** the cool, optimistic tile field for experience and operational clarity.
- **Pale Butter:** the warm, reflective tile field for featured work and personal perspective.

### Tertiary

- **Muted Lilac:** the quiet, imaginative tile field for notes and document-oriented project work.

### Neutral

- **Paper Canvas:** the warm off-white page field that lets the bento composition feel collected and editorial.
- **Paper Surface:** the slightly brighter light tile surface for the hero and experience area.
- **Muted Ink:** supporting copy and secondary navigation color; it maintains hierarchy without weakening readability.
- **Hairline Ink:** the low-contrast divider and border treatment that structures cards without boxing the page in.

**The Color-Field Rule.** Use a single pastel field per tile and let paper or ink create the counterpoint. Do not combine multiple pastels inside one card.

## Typography

**Display Font:** Instrument Serif (with Georgia fallback)

**Body Font:** DM Sans (with Arial fallback)

**Character:** Instrument Serif makes the portfolio feel authored and editorial; DM Sans keeps enterprise context, labels, and navigation crisply factual. The contrast is intentional: human perspective in display type, operational clarity in supporting type.

### Hierarchy

- **Display:** reserved for the homepage’s first statement and major invitation moments; set large, light-weight, and tightly tracked to make each phrase feel like a headline rather than a banner.
- **Headline:** used for section and project titles; it keeps the same serif voice at a smaller, responsive scale.
- **Body:** used for explanatory copy; keep paragraphs compact and within the existing restrained measure so bento tiles remain airy.
- **Label:** used for navigation, buttons, tags, project metadata, and experience markers; strong-weight sans type supports fast scanning.

**The Two-Voice Rule.** Use Instrument Serif for authored statements and project titles; use DM Sans for everything visitors need to scan, compare, or operate.

## Layout

The desktop canvas is centered and capped at 1360px, with a slim outer gutter and a repeated 16px interior rhythm. The hero is an asymmetric four-tile grid: a large introductory paper tile is counterbalanced by a blue statistic, navy availability panel, and lilac note. Selected work continues that varied geometry with wide, tall, and vertically offset cards. Later sections alternate two-column editorial arrangements, nested principle tiles, and a calm tabular experience surface.

At 900px, the hero and project grids resolve into two columns while preserving the large-first hierarchy. At 620px, the experience becomes a single vertical sequence: header navigation simplifies, every bento grid stacks, gaps tighten, and tiles keep their generous internal breathing room. The system favors composition over strict symmetry, but never sacrifices a clear reading order.

**The Varied-Grid Rule.** Keep tile proportions intentionally uneven within a section, then use the shared gap and rounded edges to make the composition feel like one system.

## Elevation & Depth

Depth is mostly tonal and compositional: paper, pastel, and ink tiles sit flat against the warm canvas. Project cards are the exception, receiving a soft ambient shadow to mark them as navigable case-study entry points; their hover state becomes slightly more lifted. No hard shadows, glass effects, or heavy borders belong in this world.

### Shadow Vocabulary

- **Project Rest:** a diffuse cool-ink shadow that separates selected-work cards from the canvas without making them look floating.
- **Project Hover:** a larger diffuse shadow paired with a small upward move to confirm that the card is an entry point.
- **Button Hover:** a compact shadow paired with the same small upward move; it adds tactility to an otherwise flat interface.

**The Flat-By-Default Rule.** Tiles stay flat at rest. Reserve lifted depth for interactive case-study cards and primary actions.

## Shapes

Gently rounded rectangles are the system’s recurring form: bento tiles, project cards, principles, and experience surfaces share the same soft corner language. Mockup windows use a smaller radius so they read as contained artifacts inside a tile. Pills are reserved for actions and tags; circles carry compact directional and status cues such as the monogram, project arrow, and availability light.

## Components

### Buttons

- **Character:** concise, tactile calls to action that stay secondary to the work.
- **Shape:** fully pill-shaped with compact asymmetric horizontal padding for label-plus-arrow composition.
- **Primary:** ink fill with inverse-paper text, used for conversation and contact actions.
- **Light:** inverse-paper fill with ink text, used on ink fields such as the contact panel.
- **Hover / Focus:** hover lifts slightly with a soft shadow; keyboard focus uses a clear cobalt outline with breathing room.

### Text Links

- **Character:** minimal inline navigation with an arrow, keeping secondary actions quiet.
- **State:** shift from ink to cobalt on hover; retain the global visible focus treatment.

### Project Cards / Case-Study Entrypoints

- **Corner Style:** shared bento rounding with a contained smaller-radius illustrative window.
- **Background:** one of the project pastel fields; the card itself is the color block.
- **Content Pattern:** number and category at the top, illustrative interface artifact in the middle, then a serif project title, short summary, discipline tags, and circular arrow.
- **State:** lift, deepen the soft shadow, and subtly relax the mockup rotation on hover. The entire card is one accessible link to its case-study route.

### Tag Chips

- **Style:** compact ink-outline pills with strong sans labels; use them only for concise disciplines or classifications.

### Navigation

- **Style:** a centered small-label navigation, monogram circle at left, and underlined contact link at right.
- **State:** muted ink at rest, cobalt on hover, and a visible cobalt focus outline. On narrow screens, hide the centered navigation and preserve the monogram and contact action.

### Bento Tiles

- **Character:** rounded editorial fields that hold one idea each: introduction, proof point, availability, note, perspective, or experience.
- **Internal Padding:** responsive and generous; text aligns to the tile’s purpose rather than a universal vertical position.

## Do's and Don'ts

### Do:

- **Do** lead major statements and project titles with Instrument Serif, then use DM Sans for the supporting information around them.
- **Do** create hierarchy through varied tile proportions, paper space, and tonal fields before adding borders or effects.
- **Do** give each project or editorial idea one clear pastel or paper tile field.
- **Do** preserve the shared bento corner language and repeated interior gap when extending into case-study routes.
- **Do** respect reduced-motion preferences by removing transitions and smooth scrolling.

### Don't:

- **Don't** turn the portfolio into a dense dashboard, marketing funnel, or uniform card gallery.
- **Don't** use more than one pastel field within a single bento tile or project card.
- **Don't** add heavy shadows, gradients, glassmorphism, or decorative motion that competes with the work.
- **Don't** use Instrument Serif for dense metadata, navigation, tags, or long explanatory paragraphs.
- **Don't** make hover movement necessary to understand or access content.

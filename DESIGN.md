---
name: Karishma Sharma Portfolio
description: A high-contrast personal product-design portfolio built as a graphic poster wall for the work.
colors:
  ink: "#141511"
  muted: "#5d615a"
  canvas: "#f2f0eb"
  paper: "#fbfaf7"
  blue: "#d5e8ff"
  acid: "#d7efa0"
  lilac: "#d8d0fb"
  peach: "#ffb4a1"
  signal: "#5546d8"
  line: "rgba(20,21,17,.14)"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3.8rem, 6.5vw, 5.9rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.9rem, 5.25vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.78
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.3
rounded:
  bento: "16px"
  mockup: "12px"
  recognition: "10px"
  pill: "999px"
  circular: "50%"
spacing:
  grid-gap: "14px"
  compact-gap: "10px"
  section: "132px"
  desktop-gutter: "28px"
  tile-padding: "clamp(28px, 4vw, 58px)"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 17px 14px 20px"
  project-card:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bento}"
    padding: "21px"
  filter-chip:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
---

# Design System: Karishma Sharma Portfolio

## Overview

**Creative North Star: "The Personal Poster Wall"**

This personal product-design portfolio is in **Experience** mode. The work leads from the first viewport; the interface is a sharp, minimal frame around it. The system takes its confidence from oversized modern posters arranged on a quiet canvas: graphic color fields, close-set grotesk type, and deliberately uneven compositions make it feel authored and immediate.

The homepage uses bold but controlled compositions. Its asymmetric three-panel hero introduces Karishma through a paper statement, an ink monogram poster, and an acid-green point of view. Featured and archive work use a variable 12-column grid so cards change proportion and vertical position without losing their common rhythm. Case studies slow down into a focused reading surface while retaining the same color fields and typographic voice.

Motion is a coordinated layer within this poster wall, not a separate visual language. Motion powers the first-load hero sequence, one-time section entrances, archive reflow, and expandable experience details. Lucide icons provide the shared, outlined symbol vocabulary for actions, navigation, recognition, related work, and a few deliberately placed poster accents.

The presentation layer is separate from the portfolio itself. Typed JSON owns site copy and project facts; Markdown owns long-form case-study narrative. Components compose those sources but never duplicate their content.

**Key Characteristics:**

- Experience-led, personal, and graphic rather than editorial or promotional.
- Oversized Space Grotesk headlines with tight tracking and a practical Manrope information layer.
- Quiet warm canvas, near-black ink, paper, and five distinct project color fields.
- An asymmetric three-panel personal-poster hero, not a conventional banner.
- Variable 12-column featured and archive compositions instead of a uniform card gallery.
- Shared 16px bento corners and a repeated 14px internal grid gap.
- Coordinated Motion entrances and layout changes that reinforce, never replace, content hierarchy.
- A hover-, focus-, and click-expandable experience timeline with recognition and related work.
- Desktop-only contextual cursor labels, plus a complete reduced-motion fallback.
- JSON project data paired with Markdown case-study writing.

## Colors

The palette uses quiet neutrals as the gallery wall and saturated light fields as individual work posters. One field owns each tile, so color communicates hierarchy and project identity before decoration.

### Primary

- **Near-Black Ink:** principal text, outline, and high-contrast panel color for actions, the ink hero panel, and experience.
- **Signal Violet:** interactive color for hover, visible focus, selection, and the contact panel.

### Secondary

- **Poster Blue:** cool field for interface-forward and operational work.
- **Acid Green:** energetic field for featured work, availability, and high-attention calls to action.
- **Peach:** warm personal field for the about statement and human perspective.

### Tertiary

- **Soft Lilac:** supporting project field that contrasts with blue, acid, paper, and ink.

### Neutral

- **Canvas:** warm grey page ground for the poster fields.
- **Paper:** lifted off-white panel for primary statements, quiet work, and inverse text pairings.
- **Muted Ink:** supporting copy and inactive navigation color.
- **Hairline Ink:** low-contrast divider and control-border treatment.

**The One-Field Rule.** Assign each bento tile and project to one named color field. Do not layer multiple pastel fields inside a card.

## Typography

**Display Font:** Space Grotesk (with sans-serif fallback)

**Body Font:** Manrope (with Arial fallback)

**Character:** Space Grotesk supplies the large, compact contemporary voice. Manrope keeps navigation, metadata, controls, and reading copy calm and highly legible. Hierarchy comes from grotesk scale, weight, tracking, and space rather than a serif contrast.

### Hierarchy

- **Display:** oversized responsive scale, 600 weight, tight negative tracking, and compressed leading for the hero and major invitations.
- **Headline:** the same close-set display family at a smaller responsive scale for section titles, project names, archive titles, and Markdown headings.
- **Body:** relaxed leading and a constrained measure for explanations and case-study prose.
- **Label:** small, strong Manrope for navigation, buttons, filters, project metadata, dates, and compact links.

**The Grotesk Scale Rule.** Do not introduce a serif or a third display voice. Create major hierarchy through Space Grotesk scale and tight tracking; use Manrope where information must be scanned or read at length.

## Layout

The desktop shell defaults to 1440px with a 28px outer gutter for standard laptops (such as MacBook Air). On larger desktop screens (1536px+), it expands to 1680px with proportional typography and card heights. On 27-inch monitors and 4K displays (1920px–2560px+), the shell expands to up to 2140px–2240px with 60px–70px gutters, scaled display typography (Space Grotesk up to 7.5rem–8rem), golden aspect ratio card heights, an editorial 72ch reading measure for case studies, and centered decorative thread stages. A 14px to 18px gap is the recurring internal rhythm. The header is an even three-part line: mark at left, navigation in the center, and location at right.

The homepage hero is an asymmetric three-panel composition. A large paper introduction column carries the headline; a narrow ink personal-poster panel uses the monogram, orbital circles, and small acid and peach markers; an acid statement panel carries the point of view and conversation action. This is composition and identity, not a generic landing-page banner.

Featured work and the archive use 12-column variable grids. The featured composition resolves into a 7-column lead card, a 5-column offset companion, and a final 8-column card starting at column 5. The archive repeats a deliberately uneven five-card cadence with 7, 5, 3, 5, and 4-column spans. More-work tiles use the same grid in a denser supporting composition. Shared gaps and 16px corners unify changing proportions.

At 900px, the hero becomes a large first row plus two supporting panels and project grids move to six columns. Case-study metadata becomes an inline three-column facts grid. At 620px, the hero stacks, center navigation hides, featured and archive cards become one column, and smaller work becomes two columns. Preserve reading order before preserving any offset. The custom cursor is limited to fine-pointer desktop input and is removed on mobile.

**The Variable-Grid Rule.** Use the 12-column system to create hierarchy through span, offset, and height. Do not flatten featured work or the archive into equal cards on desktop.

## Elevation & Depth

Depth is flat and compositional. Paper, ink, and colored bento fields sit directly on the canvas. Interactive project cards and the primary button get a small upward movement and diffuse ink shadow on hover; mockup placeholders rotate slightly at rest and settle level on card hover. No shadow is structural and no surface floats at rest.

### Shadow Vocabulary

- **Action Hover:** compact diffuse ink shadow for the primary button.
- **Card Hover:** wider low-contrast ink shadow confirming a project is a case-study entry point.

**The Flat-First Rule.** Convey hierarchy with span, color, typography, and space first. Use shadow only as responsive interaction feedback.

## Shapes

Gently rounded poster rectangles define the system. Bento surfaces and project cards use a 16px radius; contained interface placeholders and images use 12px; compact recognition tiles use 10px. Actions and filters are fully pill-shaped. The monogram and orbit motifs are the only circular anchors.

Borders are purposeful and spare: a faint ink hairline separates mockup frames, metadata rows, and inactive filter chips. There are no glass treatments, heavy rounded containers, or decorative gradients.

## Components

### Buttons

- **Character:** compact, high-contrast conversation actions that yield priority to the work.
- **Shape:** full pill with deliberate label-and-arrow spacing.
- **Primary:** ink fill with paper text and the shared small bold label treatment.
- **Hover / Focus:** hover rises slightly with a compact shadow; keyboard focus uses an offset violet outline.

### Project Cards / Case-Study Entrypoints

- **Character:** each card is a small project poster and the entire tile is the accessible case-study link.
- **Corner Style:** shared 16px bento rounding with a 12px mockup window inside.
- **Background:** one named project field, including blue, acid, lilac, paper, or ink with inverse text.
- **Content Pattern:** compact category and industry metadata, abstract interface placeholder, large Space Grotesk title, summary, tags, and directional arrow.
- **State:** cards lift on hover and the slightly rotated placeholder settles toward level. Movement is confirmatory, never required for comprehension.

### Archive Filters

- **Style:** small pill controls with muted text and a hairline outline.
- **State:** active or hovered controls become ink with paper text and refine the current work grid in place.

### Navigation

- **Style:** lightweight three-part header with monogram, compact center navigation, and location link.
- **State:** muted at rest and violet on hover, with the global visible-focus outline.
- **Mobile:** hide center navigation and written portfolio name while retaining monogram and location link.

### Personal Poster Hero

- **Character:** a three-panel self-portrait built from typography, color, and abstract geometry rather than photography.
- **Structure:** paper statement panel, ink monogram panel with orbital circles and colored dots, and acid perspective panel with primary action.
- **Rule:** preserve the asymmetric panel hierarchy. Do not turn this signature composition into a centered headline with generic supporting cards.

### Motion and Entrances

- **First load:** the three hero panels enter as one coordinated sequence. The hero staggers its children by 110ms after an 80ms delay; the statement panels rise 30px while the monogram poster scales from 0.94. Use the shared Motion ease `[0.16, 1, 0.3, 1]` and 650 to 700ms durations.
- **In view:** homepage sections use a single 22px rise and opacity reveal when at least 20 percent is visible. Each section reveals once, so browsing remains calm and repeat visits do not re-play the page.
- **Reflow:** archive cards use Motion layout animation during filtering. The grid arrangement changes as content changes, rather than teleporting items.
- **Rule:** use Motion for entrances, structural disclosure, and layout continuity only. Do not add looping decoration, scroll-bound spectacle, or motion whose state cannot also be understood without movement.

### Expandable Experience Timeline

- **Character:** an ink-on-dark chronology that turns resume facts into a focused, accessible exploration surface.
- **Interaction:** hovering, focusing, or clicking an experience entry activates it. The active entry receives a subtle light field, its chevron rotates, and its details animate open or closed through `AnimatePresence` in 280ms. The button exposes its state through `aria-expanded`.
- **Content:** each active entry may show its summary, detail list, tags, recognition, and related case-study links. Deloitte recognition is shown as compact lilac award marks. Related links use the selected project records, not duplicated titles.
- **Data rule:** `src/data/site.json` owns the experience items, labels, awards, and `projectSlugs`. Each slug maps to the matching self-contained record in `src/content/projects/`, then routes to `/work/:slug`.

### Contextual Cursor and Icons

- **Cursor:** on fine-pointer desktop devices, the custom cursor follows the pointer with a spring and hides the native pointer on labelled interactive targets. A compact pointer is the resting state; it expands to a 76px ink circle with a short `data-cursor-label` on contextual targets. It is presentational only and never conveys essential information.
- **Icon system:** use Lucide React exclusively for interface symbols. Keep icons outlined, compact, and secondary to text. Pair an icon with visible text for actions and labels; use `aria-hidden` when adjacent text already names the action.
- **Placement:** icons may clarify navigation, buttons, contact links, experience periods, recognition, related case studies, and project directions. Decorative Sparkles and PenTool motifs are reserved for the hero and experience introduction, where they reinforce the personal-poster composition. Do not scatter decorative icons across cards or prose.
- **Accessibility:** `MotionConfig` follows the user's reduced-motion setting. With reduced motion, the cursor does not render and CSS reduces transitions and animations to effectively instant while preserving every control and disclosure state.

### Case-Study Reading Surface

- **Hero:** paper headline panel paired with a themed artifact placeholder and violet category kicker.
- **Metadata:** factual project details occupy a sticky desktop rail and switch to an inline grid at smaller sizes.
- **Narrative:** Markdown provides headings, paragraphs, lists, and images. Manrope prose keeps a narrow measure; Space Grotesk headings preserve the graphic voice.
- **Next project:** one themed poster tile follows the narrative as direct continuation, not a carousel.

## Do's and Don'ts

### Do:

- **Do** use Space Grotesk for every display, headline, project title, and signature statement.
- **Do** use Manrope for navigation, metadata, controls, summaries, and case-study prose.
- **Do** build desktop hierarchy through a variable 12-column composition, 14px gaps, and 16px bento corners.
- **Do** give each work tile exactly one named field and carry its project theme through card, media placeholder, case hero, and next-project handoff.
- **Do** keep the homepage hero as an asymmetric paper, ink, and acid three-panel personal poster.
- **Do** preserve factual content in `src/data/site.json`, keep each project’s facts and named case-study sections together in `src/content/projects/*.md`, and map experience `projectSlugs` to project slugs instead of duplicating link data.
- **Do** use Lucide React for functional symbols, pair action icons with visible labels, and confine decorative icons to the hero and experience introduction.
- **Do** use coordinated first-load and in-view Motion transitions only to establish hierarchy, disclose content, or preserve layout continuity.
- **Do** respect reduced-motion preferences by removing the custom cursor and reducing smooth scrolling, transitions, and animations while leaving all interactions usable.

### Don't:

- **Don't** revive the former serif editorial direction or introduce Instrument Serif or DM Sans.
- **Don't** make the portfolio feel like a generic marketing page, dashboard, or identical-card gallery.
- **Don't** add gradients, glass effects, heavy borders, or permanent floating shadows.
- **Don't** make hover movement necessary for meaning, navigation, or access.
- **Don't** use the custom cursor on touch, coarse-pointer, or reduced-motion contexts, or rely on cursor labels as instructions.
- **Don't** introduce a second icon family, use icons as unlabelled controls, or turn Lucide symbols into repeated decoration.
- **Don't** hard-code experience awards, case-study titles, or related-work routes in components.
- **Don't** turn abstract project placeholders into decorative clutter; they should remain simple interface artifacts.
- **Don't** embed portfolio facts or case-study prose directly in React components.
- **Don't** use em dash characters in website content.

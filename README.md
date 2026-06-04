# Handoff: Stakeholder Empathy Map Worksheet

## Overview
An interactive, fillable **empathy-map worksheet** for a graduate program-evaluation course (Vanderbilt Peabody College, *LLO 8230: Program Evaluation*). Students use it to build a shared, vivid picture of one stakeholder in the program being evaluated — what that person thinks & feels, sees, hears, says & does, plus their pains and gains — before deciding what to measure.

The worksheet is editable in-place: every field (name, role, the six sections) is click-to-edit, items can be added/removed as chips, the sheet can be toggled between a **worked sample** and a **blank** state, and it can be exported to PDF. State persists per-variation in `localStorage`.

There are **three visual treatments** of the same worksheet (one underlying data model and component set):
1. **Canvas** — the classic empathy-map cross (2×2 quadrants around a centered medallion, Pain/Gain band below).
2. **Portrait** — a dark identity panel on the left, six section cards on the right.
3. **Orbit** — the stakeholder at the center with six cards radiating outward, connected by hairlines.

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** — runnable prototypes that demonstrate the intended look, layout, and interaction behavior. They are **not** meant to be shipped as-is. The Babel-in-the-browser setup, the `window.*` global-component pattern, and the `contentEditable` editing model are prototype conveniences, not production architecture.

**The task is to recreate these designs in the target codebase's existing environment** (React, Vue, Svelte, etc.) using its established component patterns, state management, and styling system. If no codebase environment exists yet, choose an appropriate modern framework (e.g. React + Vite with CSS Modules or Tailwind) and implement the designs there. Treat the HTML/JSX here as the specification of *what to build*, not the code to copy.

## Fidelity
**High-fidelity (hifi).** These are pixel-level mockups with final colors, typography, spacing, border radii, and interaction states. Recreate the UI faithfully using the codebase's existing libraries and patterns. The exact design tokens are listed below and defined in `styles.css`.

The artboards are authored at a native **1920×1080** canvas and scaled to fit the viewport via a CSS `transform: scale()` wrapper. Treat 1920×1080 as the design reference size; in production you will likely make the layout responsive rather than fixed-canvas — preserve proportions and hierarchy.

---

## Data Model

All three treatments share one stakeholder object (see `empathy-core.jsx`):

```ts
type Stakeholder = {
  name: string;          // e.g. "Renée Carter"
  role: string;          // e.g. "Site Director · Bridges After-School Program"
  stake: string;         // short first-person quote (used by Portrait treatment)
  thinkFeel: string[];   // 1–5 chips
  see:       string[];   // 1–5 chips
  hear:      string[];   // 1–5 chips
  sayDo:     string[];   // 1–5 chips
  pain:      string[];   // 1–5 chips
  gain:      string[];   // 1–5 chips
  touched:   boolean;    // false while showing the untouched sample; true after any edit
};
```

### The six sections (Gamestorming / Dave Gray model, framed for program evaluation)
| id | Label | Lead prompt |
|---|---|---|
| `thinkFeel` | Think & Feel | What occupies this stakeholder? Their worries, aspirations, and what really matters to them about the program. |
| `see` | See | What do they see in their environment — in the program, the data, and the people around them? |
| `hear` | Hear | What are they hearing — from funders, staff, families, peers — about the program and its evaluation? |
| `sayDo` | Say & Do | What do they say in public, and how do they behave? Watch for gaps between words and actions. |
| `pain` | Pain | Fears, frustrations, obstacles. What makes the evaluation feel risky, burdensome, or threatening? |
| `gain` | Gain | Wants, needs, measures of success. What would make this evaluation genuinely useful to them? |

### Worked sample content (the "Completed Example")
- **name:** `Renée Carter`
- **role:** `Site Director · Bridges After-School Program`
- **stake:** `I believe in this program — but every hour we spend documenting outcomes is an hour we're not with the kids.`
- **thinkFeel:** Proud of the team, but stretched thin · Anxious the data won't capture what really matters · Hopeful the evaluation could finally win stable funding
- **see:** Funders asking for outcomes she can't easily measure · Staff burning out on extra paperwork · Kids who light up — but only some weeks
- **hear:** "Show us the numbers" from the district office · Families calling the program a lifeline · Peers warning that evaluations get used against programs
- **sayDo:** Volunteers to pilot new tools, then runs out of time · Tells staff "just do your best with the forms" · Quietly keeps her own notes on what's working
- **pain:** No time or training to collect good data · Fear results will be used to cut, not improve · Past evaluations felt done to her, not with her
- **gain:** Evidence to protect and grow the funding · A clearer picture of which kids she's reaching · Being treated as a partner in the evaluation

The intro paragraph shown on every sheet:
> An empathy map builds a shared, vivid picture of one stakeholder in the program being evaluated. Before deciding what to measure, pause on a person who holds a stake in the findings — what they think and feel, see, hear, say and do, and the pains and gains that shape how they will receive the evaluation. Keep the end in mind: an evaluation only creates value if the interestholders can act on what it finds.

---

## Design Tokens

### Colors (Vanderbilt-restrained palette — defined as CSS variables in `styles.css`)
| Token | Hex | Use |
|---|---|---|
| `--vu-black` | `#1C1C1C` | Headings, dark panels, active chips |
| `--vu-ink` | `#2A2825` | Body text (warm black) |
| `--vu-cream` | `#F5F3EF` | Light fills, text on dark |
| `--vu-paper` | `#FBFAF7` | Page/artboard background |
| `--vu-sand` | `#E0D5C0` | Hover borders |
| `--vu-gold` | `#CFAE70` | Flat gold accent, rings, active dots |
| `--vu-gold-d` | `#B49248` | Deep gold — tabs, focus ring, icons |
| `--vu-oak` | `#946E24` | Darkest gold — section icon color, eyebrow accent |
| `--vu-rule` | `#D8D2C5` | Hairline borders & dividers |
| `--vu-muted` | `#6F6A60` | Lead prompts, secondary text |

Notable rgba usages: focus ring `rgba(180,146,72,0.15–0.25)`; gold tints `rgba(207,174,112,0.08–0.20)`; pain panel tint `rgba(148,110,36,0.05)`; medallion shadow `rgba(28,28,28,0.10–0.22)`.

### Typography
| Token | Stack | Role |
|---|---|---|
| `--sans` | **Inter Tight**, Inter, -apple-system, "Segoe UI", sans-serif | Headings, labels, chips, UI |
| `--serif` | **Source Serif 4**, "Source Serif Pro", Georgia, serif | Italic accents — roles, quotes, avatar initials |
| `--mono` | **JetBrains Mono**, ui-monospace, Menlo, monospace | Quadrant number badges, card tab labels |

Fonts load from Google Fonts (weights: Inter Tight 400/500/600/700; Source Serif 4 400/500/600 incl. italic + optical sizing; JetBrains Mono 500/600). `font-feature-settings: "ss01","ss02","kern"` is applied to `.ws`.

Representative type scale (px, from the Canvas treatment): page title 44 / weight 700 / letter-spacing −0.035em / line-height 0.96; intro body 14.5 / lh 1.46; section label 21 / 700; lead prompt 12.5 / lh 1.4 / muted; chip text 18 / 500; medallion name 19 / 700; medallion role 12.5 serif italic. Portrait treatment uses a larger name (50) and a 25px serif-italic quote. Orbit medallion name is 26.

### Spacing, radius, shadow
- Artboard padding: Canvas `44px 56px 40px`; Orbit `44px 60px`; Portrait right column `44px 52px 34px`, dark panel `50px 50px 42px`.
- Grid gaps: Canvas quadrant grid is a bordered box with a hairline cross; Portrait cards gap 14; Orbit columnGap 24 / rowGap 16.
- Border radius: chips & pills `999px`; cards `14px`; Canvas quadrant box `18px`, panels `16px`; avatar square variant `18px`, circle `50%`.
- Borders: hairlines `1px`–`1.5px solid var(--vu-rule)`.
- Shadows: medallion `0 8px 30px rgba(28,28,28,0.10)` (Canvas) / `0 12px 40px rgba(28,28,28,0.22)` (Orbit); export button `0 6px 20px rgba(28,28,28,0.18)`.
- Section number badge (Canvas): mono 11px, gold-d background, cream text, radius 5, padding `2px 7px`.

---

## Components

### Editable primitives (`worksheet-core.jsx`)
- **`Editable`** — a `contentEditable` span/div. Fires `onChange(text)` on input; pushes external value in only when it changes (to keep the caret stable while typing); Enter blurs unless `multiline`. In production, replace the `contentEditable` approach with the codebase's controlled inputs / inline-edit pattern — the key behaviors to preserve are: click anywhere on the field to edit, placeholder shown when empty (italic, muted), and no caret-jumping while typing.
- **`Chip`** — `.chip` styled `Editable`: pill, cream fill, hairline border. Hover → white fill + sand border. Focus → gold-d border + 3px gold focus ring, and the chip expands to show full wrapped text (`white-space: normal`). Empty → italic placeholder.
- **`EditableChipList`** — a wrapping flex row of chips, each with a hover-revealed circular **×** remove button (top-right, black fill, cream glyph), plus a trailing dashed **"+ Add"** pill (gold "+" badge). Respects `minItems` (default 1, can't empty out) and `maxItems`. Has a `compact` variant (smaller padding/font) used by the Orbit treatment.
- **`Blank`** — inline underlined fill-in field (not used by the empathy variants but part of the shared system).
- **`CategoryGroup`** — toggle-chip group with hover tooltips (from the sibling Evaluation-Purpose worksheet; not used by empathy variants).
- **`ExportButton`** — floating top-right black pill ("Export PDF"). On click it adds `.print-target` to the artboard DOM node and a page-size class to `<body>`, then calls `window.print()` and reverts. Print CSS (in `styles.css`) hides everything except `.print-target` and sizes the page to 1920×1080. In production, wire this to the app's existing print/PDF-export mechanism.

### Empathy-specific pieces (`empathy-core.jsx`)
- **`useStakeholderState(variantKey, {startBlank})`** — state hook. Loads from `localStorage` key `ws.empathyMap.<variantKey>`; otherwise seeds with the worked sample (`touched:false`) or the blank object (`touched:true`). Exposes `set(field,value)`, `setList(field,list)`, `loadExample()`, `clearAll()`. Any edit flips `touched:true`. Replace with the codebase's state/persistence approach; keep per-variation isolation and the sample/blank seeding.
- **`Avatar`** — drop-a-photo placeholder. Shows derived initials (Source Serif italic) if a name is typed, else a neutral head silhouette (SVG). Props: `size`, `shape` ("circle"|"square"), `variant` ("light"|"dark"). Dashed gold ring when empty, solid when initials present. In production this is a slot for an uploaded stakeholder photo.
- **`SampleToggle`** — two small outlined pills, **"Sample"** (loads worked example) and **"Blank"** (clears all). `dark` variant for the Portrait panel.
- **`SampleRibbon`** — uppercase gold pill reading "Sample — edit any field to make it yours", shown only while `touched` is false.
- **`Eyebrow`** — header kicker line: "Vanderbilt Peabody College — LLO 8230: Program Evaluation".
- **`SectionIcon`** — one line-icon per section (`thinkFeel` cloud-thought, `see` eye, `hear` ear, `sayDo` speech bubble, `pain` shield-check, `gain` star), 18×18 viewBox, `stroke: currentColor`.

---

## Screens / Views

### Shared entry points
- **`Empathy Map - Completed Example.html`** renders the Canvas treatment seeded with the worked sample (`<EmpathyMapV1 mode="example" />`).
- **`Empathy Map - Blank.html`** renders the Canvas treatment blank, ready for a student (`<EmpathyMapV1 mode="blank" />`).
- **`Empathy Map - Explorations.html`** shows all three treatments side-by-side on a pan/zoom design canvas (reference only — not a deliverable screen).

Both deliverable HTML files mount one artboard centered in a dark (`#1c1c1c`) stage, the `#slide-frame` (1920×1080, paper background, soft drop shadow) scaled to fit with `Math.min(vw/1920, vh/1080)`.

### View 1 — Canvas (classic cross) · `empathy-v1.jsx` · the primary deliverable
- **Purpose:** the textbook empathy-map layout students recognize.
- **Layout:** header row (left: eyebrow, 44px title "Stakeholder Empathy Map.", intro paragraph max-width 1040; right: SampleToggle + SampleRibbon). Below, a flex-1 bordered box (radius 18, `#fff`) as a 2×2 grid with a **hairline gold cross** (1.5px dividers) and a soft white radial halo behind center. Quadrants: top-left **Think & Feel**, top-right **See**, bottom-left **Hear**, bottom-right **Say & Do**. Right-column quadrants are right-aligned (label icon order reversed, chips hug the right edge via `.quad-right .chip-list{justify-content:flex-end}`); bottom quadrants align to the bottom.
- **Center medallion:** absolutely centered circle (188px, cream fill, hairline border, soft shadow, z-index 3) holding a 64px Avatar + editable name (19/700) and role (12.5 serif italic).
- **Pain / Gain band:** below the grid, a 2-col grid (gap 18). **Pain** panel — tint `rgba(148,110,36,0.05)`, black uppercase "Pain" tab (cream text). **Gain** panel — tint `rgba(207,174,112,0.10)`, gold border, gold-d "Gain" tab (cream text). Each panel: tab + lead prompt + EditableChipList (max 5).
- Each quadrant header: SectionIcon (22px, oak) + label (21/700) + lead prompt (12.5 muted) + EditableChipList (min 1, max 5).

### View 2 — Portrait (dark identity panel) · `empathy-v2.jsx`
- **Purpose:** persona-profile treatment; the stakeholder's identity and a verbatim quote carry the left side.
- **Layout:** CSS grid `560px 1fr`. **Left aside** (`--vu-black`, cream text, padding `50px 50px 42px`): dark eyebrow, 150px dark Avatar, kicker "The Stakeholder", name (50/700), role (19/500 gold), a divider, "In their words" label, a large serif open-quote, and an editable multiline serif-italic **quote** (25/lh1.42). At the bottom: SampleRibbon (dark, if untouched) + a "Drop in a real photo" hint with camera icon. **Right column** (padding `44px 52px 34px`): header row (40px title "Empathy Map." + intro; SampleToggle right), then a 2-col × 3-row card grid (gap 14, auto-rows 1fr). Cards: 1px border, radius 14, `#fff`, a mono uppercase tab (gold-d bg) + lead + EditableChipList. **Pain** card tab is black/cream; **Gain** card tab is gold/black.

### View 3 — Orbit (radial map) · `empathy-v3.jsx`
- **Purpose:** the most literal "map" — stakeholder at center, sections radiating, split into Outward (experience & do) vs Inward (what drives them).
- **Layout:** header (eyebrow, 42px title "Empathy Map — Orbit.", intro; SampleToggle right). Below, a 3-col (`1fr 300px 1fr`) × 3-row grid. Column micro-labels: left "Outward · what they experience & do", right "Inward · what drives them". **Left column cards** (left-aligned): See, Hear, Say & Do. **Right column cards** (right-aligned): Think & Feel, Pain, Gain. **Center medallion** spans all three rows (256px black circle, 3px gold border, big shadow): 70px dark Avatar, kicker "The Stakeholder", name (26/700 cream), role (14 serif italic). An SVG **Connectors** layer draws six dashed gold hairlines from center (50,50) to each card anchor, with a gold center dot; cards sit at z-index 2 over the outer half of each line, leaving a clean radial stub. Cards use the **compact** chip-list variant (max 4 chips).

---

## Interactions & Behavior
- **Inline editing:** click any name/role/quote/chip to edit in place. Placeholder (italic, muted) shows when empty. Enter commits single-line fields (blurs); the quote field is multiline.
- **Chips:** hover a chip → white fill + sand border; focus → gold-d border + 3px gold focus ring and the chip expands to show wrapped text. Hover a chip → its × remove button fades in (top-right). "+ Add" appends an empty chip. `minItems` prevents emptying a section; `maxItems` (4 or 5) caps it.
- **Sample / Blank toggle:** "Sample" repopulates the worked example and shows the Sample ribbon; "Blank" clears all fields. Any edit hides the ribbon (`touched:true`).
- **Persistence:** state is written to `localStorage` on every change, keyed per treatment + mode (e.g. `ws.empathyMap.v1-example`, `ws.empathyMap.v1-blank`). Reloading restores edits.
- **Export PDF:** floating "Export PDF" button (top-right of each artboard) prints just that artboard at 1920×1080 via the browser print dialog.
- **Transitions:** chips/buttons use ~120–150ms ease on border/background/box-shadow/transform; cat-chips lift 1px on hover (not used in empathy variants). No page-level animation.
- **Responsive note:** prototypes use a fixed 1920×1080 canvas scaled to fit. For production, decide whether to keep a fixed worksheet aspect (good for print parity) or reflow responsively.

## State Management
Per-treatment, per-mode stakeholder object (see Data Model) plus a `touched` flag. Triggers:
- field edit → `set(field, value)` / `setList(field, list)`, `touched:true`, persist.
- "Sample" → replace with worked example, `touched:false`, persist.
- "Blank" → replace with empty object, `touched:true`, persist.
- mount → hydrate from `localStorage` or seed sample/blank by `mode`.

No network/data-fetching. Avatar is a placeholder for an (optional) uploaded image — not currently wired to upload.

## Assets
- **Fonts:** Inter Tight, Source Serif 4, JetBrains Mono — Google Fonts (see `<link>` in each HTML head). Substitute with the codebase's brand fonts if it has them; web-safe fallbacks are Georgia (serif) and the system sans/mono.
- **Icons:** all inline SVG (section glyphs, avatar silhouette, export/camera/add/remove). No external icon library. Re-implement with the codebase's icon system or keep as inline SVG.
- **Images:** none. The Avatar is an SVG/initials placeholder for a future stakeholder photo.
- **Branding:** "Vanderbilt Peabody College / LLO 8230" eyebrow text and the gold-on-cream palette. If the target app has an institutional brand system, map these tokens onto it.

## Screenshots
Reference renders of each treatment (seeded with the worked sample), in `screenshots/`:
- `1-canvas-completed-example.png` — Canvas (classic cross), the primary deliverable
- `2-portrait.png` — Portrait (dark identity panel)
- `3-orbit.png` — Orbit (radial map)

## Files
HTML entry points (open in a browser to view the running prototype):
- `Empathy Map - Completed Example.html` — Canvas treatment, pre-filled sample **(primary deliverable)**
- `Empathy Map - Blank.html` — Canvas treatment, empty **(primary deliverable)**
- `Empathy Map - Explorations.html` — all three treatments on a design canvas (reference)

Source modules:
- `styles.css` — design tokens + all component styles + print rules
- `worksheet-core.jsx` — shared editable primitives (Editable, Chip, EditableChipList, Blank, ExportButton, CategoryGroup) → `window.WSCore`
- `empathy-core.jsx` — sections, sample/blank data, `useStakeholderState`, Avatar, SampleToggle, SampleRibbon, Eyebrow, SectionIcon → `window.EmpathyCore`
- `empathy-v1.jsx` — Canvas treatment → `window.EmpathyMapV1`
- `empathy-v2.jsx` — Portrait treatment → `window.EmpathyMapV2`
- `empathy-v3.jsx` — Orbit treatment → `window.EmpathyMapV3`
- `design-canvas.jsx` — pan/zoom canvas used only by the Explorations file

> **Load order matters** in the prototypes: React/ReactDOM/Babel, then `worksheet-core.jsx`, `empathy-core.jsx`, then the variant file(s). Components communicate via `window.*` globals because each Babel `<script>` is its own scope — this is a prototype constraint, not a production pattern; use real imports/modules in the target codebase.

# Hand-drawn Scene Art — Generation Spec

Evidence Detective has two scenes that need illustrated backgrounds.
This document covers visual style, per-scene layout, and the integration architecture.

---

## 1 · Visual style

| Property | Target |
|---|---|
| Style | Hand-drawn storybook illustration — pen/ink outlines with watercolour-wash fills |
| Mood | Warm, slightly lived-in; investigative but not spooky |
| Reference feel | Usborne puzzle books, Where's Waldo interiors, Studio Ghibli backgrounds (no characters) |
| Audience | Middle school students (grades 6–12) |
| Colour temperature | Warm cream/ochre shadows; cool light from windows/ceiling strips |
| Linework | Confident ink outlines, slightly wobbly/organic (not mechanical); cross-hatch shading in shadows |
| Fills | Watercolour wash with visible texture; no flat vector fills |
| Detail level | Medium — objects readable at a glance, background surfaces textured but not distracting |
| Mood lighting | Scene 1: afternoon daylight from window (upper-left); Scene 2: fluorescent overhead strips |

**What to avoid:** photorealism, anime, flat-icon style, neon colours, text/logos on in-scene objects (text will be implied by shapes/lines)

---

## 2 · Canvas spec

Both images must share identical dimensions so hotspot overlays snap correctly.

| Property | Value |
|---|---|
| Viewbox / logical size | **920 × 520** (SVG units, not pixels) |
| Export format | **PNG** at 2× (1840 × 1040 px) or **SVG with embedded raster** |
| Aspect ratio | 16 : 9.04 — roughly landscape widescreen |
| Background | No transparent pixels; fill the entire canvas |

---

## 3 · Scene 1 — The Hendersons' Living Room & Kitchen (`cats-vs-dogs`)

### Composition overview

Split-view: left ~65% is living room (warm amber/cream walls, wood floor), right ~35% is kitchen visible behind a counter. Afternoon light from a window upper-left casting a light shaft across the floor. Cosy, slightly cluttered family home.

```
x=0                          x=600        x=920
┌────────────────────────────┬────────────────┐
│  window (upper-left)       │  kitchen       │ y=0
│  bookshelf / wall shelf    │  counter       │
│                            │  fridge        │
│  sofa (center-left)  chair │  corkboard     │ y=520
│  coffee table              │  (upper-right) │
└────────────────────────────┴────────────────┘
```

### Room elements (structural, no interaction)

- **Wall**: warm cream/ochre, with a dado rail or moulding strip near y=26
- **Floor**: warm wood planks, perspective lines converging slightly, meets wall at y≈400
- **Baseboard/skirting** at floor-wall join
- **Window** (x=60–215, y=40–400): sunlit sky visible, orange curtains tied back, window frame with cross-bar; light shaft polygon from window to floor
- **Rug**: oval/circular woven rug under coffee table and in front of sofa (approx x=100–380, y=370–520), warm terracotta and cream concentric rings
- **Sofa**: 3-cushion sofa x=40–330, y=240–380, steel-blue/slate upholstery, wooden feet
- **Armchair**: rust/tobacco orange, x=360–500, y=240–380, matching wooden feet
- **Coffee table**: low wood table x=130–315, y=410–490
- **Door** (to outside): x=600–712, y=130–402, warm wood grain, raised panel detail, door handle right side
- **Counter/kitchen island**: x=720–920, y=326–404
- **Fridge**: x=720–832, y=144–402, white/cream, handle on right, magnets and a thumbtack strip on door
- **Corkboard**: x=836–916, y=116–214, cork texture, pushed-pin holes
- **Ceiling**: plain cream with a single overhead lamp (left of centre)

### Hotspot objects

Each object must appear clearly, readable at thumbnail size. The x/y positions below are SVG-unit centres. Include a ±30px clear zone around each object so the click region doesn't overlap neighbours.

| ID | Object | Position (x, y) | Region | Visual description |
|---|---|---|---|---|
| `allergy-meds` | Box of allergy medication | 465, 126 | Wall shelf, upper-centre | Small cardboard box, pink cross mark on label, medicine-cabinet aesthetic |
| `goldfish` | Glass fishbowl | 528, 122 | Wall shelf, next to meds | Round bowl with water, single orange goldfish, pebbles at base, slight water-line reflection |
| `scratched-sofa` | Left arm of sofa with claw marks | 56, 290 | Sofa's left armrest | Deep parallel scratches in the fabric (4–5 lines), stuffing peeking out slightly |
| `tv-remote` | TV remote | 200, 322 | Sofa seat (between cushions) | Dark oblong remote half-buried in sofa cushion, small coloured buttons |
| `purring-cat` | Grey cat curled on armchair | 432, 280 | Armchair seat | Fluffy grey cat, eyes closed, tail tucked; small speech bubble with "prrr…" near ear |
| `health-study` | Science magazine | 212, 406 | Coffee table | Open magazine, small line graph visible on page, scientific-looking cover strip |
| `chewed-shoe` | Chewed red sneaker | 668, 462 | Floor, right of centre | Red low-top sneaker with teeth marks and torn lacing on the toe |
| `apartment-notice` | Paper notice | 655, 226 | Door, mid-height | White A5 sheet pinned to door, red text band at bottom (implied notice/stamp) |
| `walk-schedule` | Yellow sticky note | 770, 300 | Fridge, mid-section | Bright yellow sticky note, hand-written paw-print doodle and grid of days |
| `training-receipt` | Receipt | 864, 152 | Corkboard, upper area | Curling white receipt pinned with a red pushpin, faint text lines, green "PAID" stamp |
| `hiding-cat` | Sticky note (cat sighting) | 896, 186 | Corkboard, lower area | Yellow sticky note pinned with blue pin; small sketch of a cat hiding behind a sofa |
| `vet-pamphlet` | Tri-fold pamphlet | 874, 310 | Counter, below fridge | Green-and-white trifold brochure standing upright, medical cross / paw print on front |

---

## 4 · Scene 2 — Maple Middle School: Classroom & Hallway (`phone-ban`)

### Composition overview

Divided by a wall with a doorway: left 48% is the classroom, right 52% is the hallway outside. The divider is a thick wall with glass window and door at centre-right. Fluorescent ceiling light bars overhead. School linoleum floor, slightly institutional but not bleak.

```
x=0              x=446  x=458              x=920
┌────────────────┬──────┬───────────────────────┐
│  CLASSROOM     │ wall │  HALLWAY              │
│  blackboard    │ door │  bulletin board       │ y=0
│  teacher desk  │ win- │  lockers              │
│  student desk  │ dow  │  bench (seating)      │
│                │      │  library door         │ y=520
└────────────────┴──────┴───────────────────────┘
```

### Room elements (structural)

**Classroom (left)**
- Walls: pale sage/grey-green, cement or painted cinder-block texture
- Floor: linoleum tiles with perspective lines, cream-grey
- Ceiling fluorescent strip lights (x=120–290 and x=560–730, y=14–32)
- **Blackboard**: x=40–292, y=70–212, dark green-black, chalk marks, eraser smudge
- **Teacher's desk**: large wood-grain desk x=36–234, y=306–386
- **Student desk**: single student desk x=278–408, y=318–386 (mid-classroom)
- **Divider wall**: thick wall stripe x=446–458; classroom window in wall x=446–458, y=160–320

**Hallway (right)**
- Continuation of the same linoleum floor
- Pale yellow/institutional cream walls
- **Lockers**: x=468–624, y=104–366, mint-green, combination locks, vents at top
- **Bench**: wooden bench x=626–778, y=330–388
- **Library door**: x=866–920, y=142–404, glass panel with paper notice taped inside
- **Vending machine**: x=788–870, y=236–402, blue/silver, backlit display

### Hotspot objects

| ID | Object | Position (x, y) | Region | Visual description |
|---|---|---|---|---|
| `study` | Research printout | 331, 86 | Right of blackboard, upper wall | White A4 paper pinned with two paper clips, small line-graph showing upward trend |
| `chat` | Counsellor's flyer | 329, 190 | Right of blackboard, lower wall | Cream flyer, two smartphone chat bubbles illustrated on it (one teal, one pink) |
| `tally` | Tally sheet | 98, 294 | Teacher's desk surface | White slip of paper, 5-bar tally marks in sets of 5 (about 27 marks) |
| `refocus` | Teacher's binder | 176, 282 | Teacher's desk | Thick binder, rust-orange/terracotta spine, white label strip with text lines |
| `translate` | Phone open to translate app | 356, 306 | Student desk surface | Phone screen glowing softly, "あ A" translation icon visible, earphones beside it |
| `glucose` | Purple backpack | 418, 432 | Floor beside student desk | Open backpack, phone with glucose graph screen poking out, medical supplies visible |
| `alert` | Safety-alert poster | 675, 80 | Locker area, near top | Yellow poster on locker face, bold exclamation/bell icon, orange text band at bottom |
| `lunch` | Clipping pinned to bulletin board | 767, 104 | Bulletin board, left section | White newspaper clipping, red pushpin, headline text lines |
| `detention` | Memo on bulletin board | 842, 114 | Bulletin board, right section | Yellow sticky note, blue pushpin, stamped text lines |
| `scarf` | Pink scarf left on bench | 672, 318 | Bench, near left end | Loosely coiled magenta/rose scarf, "LOST & FOUND ↓" tag attached |
| `survey` | Clipboard with survey | 744, 302 | Bench, leaning against lockers | Brown clipboard, white form, pencil clipped to top, "68%" written large |
| `cracked` | Cracked phone on floor | 548, 448 | Hallway floor near divider | Phone face-down, cracked screen visible from side, web of cracks |
| `vending` | Vending machine | 828, 244 | Right-side hallway wall | Blue-grey vending machine, backlit snacks display, coin slot panel |
| `laptops` | Notice on library door | 894, 238 | Library door glass | White A5 notice taped inside glass panel, "12 / 30" numbers implied |

---

## 5 · Integration architecture

### How raster backgrounds slot into the existing React components

The current scenes are pure SVG. After generating the images, each scene component needs one small change: **swap the background geometry for an `<image>` element**, keeping all hotspot `<g>` elements on top with transparent fills.

**New pattern for hotspot shapes:**

```tsx
// Before (opaque fill):
<rect x="298" y="90" width="66" height="82" fill="#FFFFFF" stroke="#C9C5B8" strokeWidth="1.5" />

// After (transparent, still triggers hover glow):
<rect x="298" y="90" width="66" height="82" fill="transparent" stroke="none" />
```

The CSS `filter: drop-shadow(...)` on `.hotspot:hover` still works with transparent shapes.

**New SVG shell:**

```tsx
<svg viewBox="0 0 920 520" className="scene-svg" role="img" aria-label="...">
  {/* raster background — must be the first element */}
  <image
    href="/scenes/cat-scene.png"
    x="0" y="0"
    width="920" height="520"
    preserveAspectRatio="xMidYMid slice"
  />

  {/* all Spot <g> elements follow, shapes made transparent */}
  <Spot id="allergy-meds" gx={465} gy={126}>
    <rect x="446" y="110" width="38" height="40" rx="4" fill="transparent" />
    {/* glint dot still drawn for hints */}
  </Spot>
  {/* ... */}
</svg>
```

**Files to place generated images:**

```
evidence-detective/
  public/
    scenes/
      cat-scene.png       ← Scene 1 background (1840×1040 @2x)
      phone-scene.png     ← Scene 2 background
```

**Components to update after image delivery:**

| File | Change |
|---|---|
| `src/scenes/CatSceneHiFi.tsx` | Replace all `<defs>` + background `<rect>` / decorative elements with `<image href="/scenes/cat-scene.png" .../>` |
| `src/scenes/PhoneSceneHiFi.tsx` | Same for phone scene |
| Hotspot `<g>` children | Change `fill` of the primary hit-target shape to `fill="transparent"` (keep glint circles) |

The mid-fi toggle (`SceneMidFi`) is untouched — `CatScene.tsx` and `PhoneScene.tsx` stay as-is.

---

## 6 · Prompts for image-generation tools

These are optimised for tools that accept a detailed text prompt (Midjourney, DALL-E 3, Stable Diffusion with detailed prompting).

### Scene 1 — Living room

```
Interior illustration of a cosy family living room and open kitchen, hand-drawn storybook style, pen-and-ink outlines with watercolour-wash fills, warm afternoon light from a large window upper-left casting a diagonal light shaft onto a wood floor.

Layout: living room fills the left two-thirds; kitchen is visible on the right third behind a low counter. A three-cushion steel-blue sofa sits centre-left facing the viewer. A rust-orange armchair is to its right. A low wooden coffee table in front of the sofa has a science magazine on it. An oval woven rug in terracotta and cream sits under the coffee table. A wooden door (mid-right of wall) has a pinned paper notice. A wall shelf above the kitchen counter holds a small medicine box (pink cross) and a round glass fishbowl with an orange goldfish. A tall white fridge on the right wall has a yellow sticky note. A corkboard in the upper-right corner has a curled receipt and a sticky note. A tri-fold green pamphlet stands on the kitchen counter. A grey cat is curled and purring on the armchair. A chewed red sneaker lies on the floor in the right-centre area. A TV remote is half-buried between sofa cushions. The left sofa arm has visible claw marks in the fabric.

Mood: warm, lived-in, slightly cluttered with family objects. No characters/people visible. No legible text on any objects. Wide landscape format 16:9.
```

### Scene 2 — School classroom and hallway

```
Interior illustration of a middle-school classroom on the left half and a school hallway on the right half, separated by a thick wall with a glass door, hand-drawn storybook style, pen-and-ink outlines with watercolour-wash fills, fluorescent strip lights on ceiling.

Classroom (left half): pale sage walls, linoleum floor, large dark-green blackboard on the far-left wall with chalk marks and an eraser smudge. A large teacher's desk near the blackboard has a tally sheet and an orange binder on it. A single student desk sits mid-room with a glowing phone (translate app visible) on its surface. A purple backpack on the floor beside the desk has a phone poking out. A research printout and a counsellor's flyer are pinned to the wall beside the blackboard.

Hallway (right half): institutional cream walls, same linoleum floor, rows of mint-green lockers left side, a wooden bench mid-right. A bright yellow safety-alert poster is on the lockers. A cork bulletin board has a white newspaper clipping and a yellow sticky note pinned to it. A pink scarf is looped on the bench. A clipboard with a survey sits on the bench. A cracked phone lies face-down on the floor near the wall divider. A blue-grey vending machine stands against the far-right wall. A glass library door on the far right has a paper notice taped inside.

Mood: ordinary school day, slightly messy, evidence of student life everywhere. No students or teachers visible. No legible text on any objects. Wide landscape format 16:9.
```

---

## 7 · Delivery checklist

- [ ] `cat-scene.png` — 1840 × 1040 px, all 12 hotspot objects visible and clearly placed
- [ ] `phone-scene.png` — 1840 × 1040 px, all 14 hotspot objects visible and clearly placed
- [ ] Objects are roughly centred on the (x, y) coordinates listed in §3/§4 (±5% tolerance)
- [ ] No legible English text on any object (text presence implied by lines and shapes)
- [ ] No human figures in either scene
- [ ] Colour palette warm but not garish; scene-specific palette consistency
- [ ] File placed in `public/scenes/` — both PNG and optionally a source PSD/Procreate file

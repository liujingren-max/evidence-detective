# Evidence Detective

Search the scene. Grade the clues. Argue your case.

A prototype exploring **scene-based evidence evaluation as a scaffold for argumentative
writing**. Students explore an illustrated scene, inspect objects to reveal evidence cards,
judge which side each clue supports and how strong it is (red herrings included), then build
a case file — claim, three pieces of evidence with reasoning, one counterargument — defend it
against jury challenges, and assemble a connective-polished essay.

**Live:** https://evidence-detective.vercel.app

## Cases

- **Case 001 — Cats vs. dogs**: which makes the better pet?
- **Case 002 — The phone ban**: should schools ban cell phones during the school day?

Both evidence sets are hand-authored (14 items each: 6 per side, 2 red herrings, two
strengths per side plus deliberately debatable items). The data schema is designed so a
prompt-to-scene generation pipeline can replace hand authoring without touching the app.

## Design decisions

- **Objects are the hotspots.** Evidence lives in scene context (whose sofa, how recent the
  scratches) — context is itself a clue to relevance and strength.
- **No immediate right/wrong feedback while grading.** Misjudgments surface later with
  narrative consequences: the case file has only three slots, and the jury challenges
  overrated or wrong-side evidence. Feedback timing is a deliberate design variable.
- **Claim comes after exploring**, not before — evidence first, conclusion second.
- **Counterargument is mandatory** and borrows the opposing side's own clue.
- **Strength anchors**: strong = data/research/many cases; medium = one true, clearly related
  fact or story; weak = one-off events, opinions, barely related.
- **Connectives are visible machinery**: auto-inserted, highlighted, swappable.
- **Process log export**: every inspect/grade/place/challenge event downloads as JSON from
  the case-closed screen (research instrumentation).

## Evidence schema

```ts
interface Evidence {
  id: string
  object: string          // short name of the scene object
  snippet: string         // what the detective reads on inspection
  side: string            // answer key: a side id, or 'neither' (red herring)
  strength?: 'strong' | 'medium' | 'weak'
  type?: 'statistic' | 'fact' | 'anecdote' | 'expert' | 'opinion'
  note: string            // notebook chip label
  essaySentence?: string  // sentence used when assembling the essay
  discussion?: string     // authoring note: why this item is pedagogically interesting
}
```

`type` drives the rotating reasoning starters ("These numbers suggest that…", "This story
matters because…"). `side`/`strength` are the answer key used by the jury and the end-of-case
stats — never shown during grading.

## Develop

```sh
npm install
npm run dev    # vite dev server
npm run build  # typecheck + production build
```

Deployed on Vercel; pushes to `main` auto-deploy.

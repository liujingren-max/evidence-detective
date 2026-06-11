import { CASES } from './data'

export function Picker() {
  return (
    <main className="picker">
      <header className="picker-head">
        <div className="badge-logo">ED</div>
        <h1>Evidence Detective</h1>
        <p className="tagline">Search the scene. Grade the clues. Argue your case.</p>
      </header>
      <div className="case-grid">
        {Object.values(CASES).map((c) => (
          <a key={c.id} className="case-card" href={`?case=${c.id}`}>
            <span className="case-no">{c.caseNo}</span>
            <h2>{c.title}</h2>
            <p>{c.prompt}</p>
            <span className="open-btn">Open case →</span>
          </a>
        ))}
      </div>
      <footer className="picker-foot">
        <p>
          A prototype for scene-based evidence evaluation and argumentative writing. Evidence
          sets are hand-authored JSON, designed to be swapped for a generation pipeline later.
        </p>
      </footer>
    </main>
  )
}

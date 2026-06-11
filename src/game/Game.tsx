import { useMemo, useRef, useState } from 'react'
import type { CaseEntry, Grading, LogEntry, Strength } from '../types'
import type { ConnKey } from './essay'
import {
  CONNECTIVES,
  REASONING_FALLBACK,
  REBUTTAL_FALLBACK,
  lcFirst,
  starterFor,
} from './essay'

type Screen = 'intake' | 'investigate' | 'organize' | 'polish' | 'closed'

interface Challenge {
  kind: 'herring' | 'wrongside' | 'counterwrong' | 'defend'
  evidenceId: string
  /** slot index, or -1 when the challenged item sits in the counter slot */
  slotIdx: number
}

const STRENGTH_ANCHORS =
  'How much would the jury trust it? Strong — data, research, or many cases. ' +
  'Medium — one true fact or story, clearly related. Weak — a one-off event, an opinion, or barely related.'

export function Game({ entry }: { entry: CaseEntry }) {
  const byId = useMemo(
    () => Object.fromEntries(entry.evidence.map((e) => [e.id, e])),
    [entry],
  )
  const [sideA, sideB] = entry.sides

  const [screen, setScreen] = useState<Screen>('intake')
  const [sceneStyle, setSceneStyle] = useState<'hifi' | 'midfi'>('hifi')
  const Scene = sceneStyle === 'hifi' ? entry.SceneHiFi : entry.SceneMidFi
  const [inspected, setInspected] = useState<ReadonlySet<string>>(new Set())
  const [gradings, setGradings] = useState<Record<string, Grading>>({})
  const [active, setActive] = useState<string | null>(null)
  const [pendingSide, setPendingSide] = useState<string | null>(null)
  const [hints, setHints] = useState(true)
  const [claim, setClaim] = useState<string | null>(null)
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null])
  const [counter, setCounter] = useState<string | null>(null)
  const [reasonings, setReasonings] = useState<string[]>(['', '', ''])
  const [rebuttal, setRebuttal] = useState('')
  const [orgMsg, setOrgMsg] = useState('')
  const [jury, setJury] = useState<'idle' | 'open' | 'approved'>('idle')
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [defenseDrafts, setDefenseDrafts] = useState<Record<string, string>>({})
  const [defended, setDefended] = useState<ReadonlySet<string>>(new Set())
  const [rerated, setRerated] = useState<ReadonlySet<string>>(new Set())
  const [connChoice, setConnChoice] = useState<Record<ConnKey, number>>({
    ev1: 0,
    ev2: 0,
    ev3: 0,
    counter: 0,
    conclusion: 0,
  })
  const log = useRef<LogEntry[]>([])

  const logEvent = (type: string, data: Record<string, unknown> = {}) => {
    log.current.push({ t: new Date().toISOString(), type, ...data })
  }

  const sideById = (id: string) => entry.sides.find((s) => s.id === id)
  const chipClass = (sideId: string) => {
    const side = sideById(sideId)
    return side ? `chip chip-${side.color}` : 'chip chip-gray'
  }
  const placed = (id: string) => slots.includes(id) || counter === id
  const colIds = (sideId: string) =>
    Object.keys(gradings).filter((id) => gradings[id].side === sideId)

  /* ---------- investigate ---------- */

  const onInspect = (id: string) => {
    setActive(id)
    setPendingSide(null)
    if (!inspected.has(id)) {
      setInspected(new Set([...inspected, id]))
      logEvent('inspect', { id })
    } else {
      logEvent('reinspect', { id })
    }
  }

  const commitGrading = (id: string, g: Grading) => {
    setGradings((prev) => ({ ...prev, [id]: g }))
    setPendingSide(null)
    logEvent('grade', { id, ...g, keySide: byId[id].side, keyStrength: byId[id].strength ?? null })
  }

  const clearGrading = (id: string) => {
    setGradings((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setPendingSide(null)
    logEvent('regrade_start', { id })
  }

  const gradedCount = Object.keys(gradings).length
  const gateOk = gradedCount >= 5 && colIds(sideA.id).length >= 1 && colIds(sideB.id).length >= 1

  /* ---------- organize ---------- */

  const touchCaseFile = () => {
    if (jury === 'approved') setJury('idle')
  }

  const pickClaim = (sideId: string) => {
    if (claim === sideId) return
    setClaim(sideId)
    setSlots([null, null, null])
    setCounter(null)
    setReasonings(['', '', ''])
    setRebuttal('')
    setJury('idle')
    setOrgMsg('')
    logEvent('claim', { side: sideId })
  }

  const chipClick = (id: string) => {
    setOrgMsg('')
    if (!claim) {
      setOrgMsg('Pick your claim first, detective.')
      return
    }
    if (placed(id)) {
      setOrgMsg('That clue is already in your case file.')
      return
    }
    const g = gradings[id]
    if (g.side === 'neither') {
      setOrgMsg("That one is on your discard pile — the jury won't hear it.")
      return
    }
    if (g.side === claim) {
      const idx = slots.indexOf(null)
      if (idx === -1) {
        setOrgMsg('Your case file is full — three strongest clues only.')
        return
      }
      const next = [...slots]
      next[idx] = id
      setSlots(next)
      touchCaseFile()
      logEvent('place_evidence', { id, slot: idx })
    } else {
      if (counter) {
        setOrgMsg('You already chose a counterargument. Remove it first if you want to swap.')
        return
      }
      setCounter(id)
      touchCaseFile()
      logEvent('place_counter', { id })
    }
  }

  const removeFromSlot = (idx: number) => {
    const next = [...slots]
    const removedId = next[idx]
    next[idx] = null
    setSlots(next)
    const r = [...reasonings]
    r[idx] = ''
    setReasonings(r)
    touchCaseFile()
    logEvent('remove_evidence', { id: removedId, slot: idx })
  }

  const removeCounter = () => {
    logEvent('remove_counter', { id: counter })
    setCounter(null)
    setRebuttal('')
    touchCaseFile()
  }

  const placedCount = slots.filter(Boolean).length
  const hasStrong = slots.some((id) => id && gradings[id]?.strength === 'strong')
  const checklistOk = placedCount === 3 && hasStrong && !!counter

  const runJury = () => {
    if (!claim) return
    const ch: Challenge[] = []
    slots.forEach((id, i) => {
      if (!id) return
      const ev = byId[id]
      if (ev.side === 'neither') ch.push({ kind: 'herring', evidenceId: id, slotIdx: i })
      else if (ev.side !== claim) ch.push({ kind: 'wrongside', evidenceId: id, slotIdx: i })
    })
    if (counter) {
      const ev = byId[counter]
      if (ev.side === 'neither') ch.push({ kind: 'herring', evidenceId: counter, slotIdx: -1 })
      else if (ev.side === claim) ch.push({ kind: 'counterwrong', evidenceId: counter, slotIdx: -1 })
    }
    let defends = 0
    slots.forEach((id) => {
      if (!id) return
      const ev = byId[id]
      const g = gradings[id]
      if (
        ev.side === claim &&
        g?.strength === 'strong' &&
        ev.strength !== 'strong' &&
        !defended.has(id) &&
        !rerated.has(id) &&
        defends < 2
      ) {
        ch.push({ kind: 'defend', evidenceId: id, slotIdx: slots.indexOf(id) })
        defends++
      }
    })
    if (ch.length === 0) {
      setJury('approved')
      setChallenges([])
      logEvent('jury_approved')
    } else {
      setChallenges(ch)
      setJury('open')
      logEvent('jury_challenges', { kinds: ch.map((c) => c.kind), ids: ch.map((c) => c.evidenceId) })
    }
  }

  const dismissChallenge = (c: Challenge) => {
    setChallenges((prev) => {
      const next = prev.filter((x) => x !== c)
      if (next.length === 0) {
        setJury('idle')
        setOrgMsg('Update your case file, then take it back to the jury.')
      }
      return next
    })
  }

  const regradeSide = (id: string, sideId: string) => {
    setGradings((prev) => ({ ...prev, [id]: { ...prev[id], side: sideId } }))
  }

  const resolveStrike = (c: Challenge) => {
    if (c.slotIdx === -1) {
      setCounter(null)
      setRebuttal('')
    } else {
      const next = [...slots]
      next[c.slotIdx] = null
      setSlots(next)
      const r = [...reasonings]
      r[c.slotIdx] = ''
      setReasonings(r)
    }
    regradeSide(c.evidenceId, byId[c.evidenceId].side)
    logEvent('jury_strike', { id: c.evidenceId, kind: c.kind })
    dismissChallenge(c)
  }

  const resolveMoveToCounter = (c: Challenge) => {
    const next = [...slots]
    next[c.slotIdx] = null
    setSlots(next)
    const r = [...reasonings]
    r[c.slotIdx] = ''
    setReasonings(r)
    regradeSide(c.evidenceId, byId[c.evidenceId].side)
    setCounter(c.evidenceId)
    logEvent('jury_move_to_counter', { id: c.evidenceId })
    dismissChallenge(c)
  }

  const resolveDefend = (c: Challenge) => {
    setDefended(new Set([...defended, c.evidenceId]))
    logEvent('jury_defended', { id: c.evidenceId, defense: defenseDrafts[c.evidenceId] })
    dismissChallenge(c)
  }

  const resolveRerate = (c: Challenge, strength: Strength) => {
    setGradings((prev) => ({ ...prev, [c.evidenceId]: { ...prev[c.evidenceId], strength } }))
    setRerated(new Set([...rerated, c.evidenceId]))
    logEvent('jury_rerated', { id: c.evidenceId, strength })
    dismissChallenge(c)
  }

  /* ---------- essay ---------- */

  const conn = (k: ConnKey) => CONNECTIVES[k][connChoice[k] % CONNECTIVES[k].length]
  const cycleConn = (k: ConnKey) => {
    setConnChoice((prev) => ({ ...prev, [k]: prev[k] + 1 }))
    logEvent('cycle_connective', { key: k })
  }

  const claimSide = claim ? sideById(claim) : null
  const evKeys: ConnKey[] = ['ev1', 'ev2', 'ev3']

  const bodyChunks = slots.map((id, i) => {
    const ev = id ? byId[id] : null
    return {
      key: evKeys[i],
      sentence: ev?.essaySentence ?? '',
      reasoning: reasonings[i].trim() || REASONING_FALLBACK,
      missing: !reasonings[i].trim(),
    }
  })
  const counterSentence = counter ? byId[counter].essaySentence ?? '' : ''
  const counterChunk = {
    text: `some people point out that ${lcFirst(counterSentence)}`,
    rebuttal: rebuttal.trim() || REBUTTAL_FALLBACK,
    missing: !rebuttal.trim(),
  }

  const essayText = () => {
    if (!claimSide) return ''
    const intro = `${claimSide.claim} The clues from the scene tell a clear story.`
    const body = bodyChunks
      .map((c) => `${conn(c.key)} ${lcFirst(c.sentence)} ${c.reasoning}`)
      .join(' ')
    const counterPara = `${conn('counter')} ${counterChunk.text} However, ${counterChunk.rebuttal}`
    const outro = `${conn('conclusion')} ${lcFirst(claimSide.claim)}`
    return `${intro}\n\n${body}\n\n${counterPara}\n\n${outro}`
  }

  /* ---------- stats ---------- */

  const herringIds = entry.evidence.filter((e) => e.side === 'neither').map((e) => e.id)
  const herringsCaught = herringIds.filter((id) => gradings[id]?.side === 'neither').length
  const relevantGraded = Object.keys(gradings)
  const sideMatches = relevantGraded.filter((id) => gradings[id].side === byId[id].side).length
  const accuracy = relevantGraded.length ? sideMatches / relevantGraded.length : 0
  const rank =
    accuracy >= 0.85 && herringsCaught === herringIds.length
      ? 'Chief inspector'
      : accuracy >= 0.6
        ? 'Detective'
        : 'Junior detective'

  const downloadLog = () => {
    const payload = {
      caseId: entry.id,
      exportedAt: new Date().toISOString(),
      gradings,
      slots,
      counter,
      reasonings,
      rebuttal,
      essay: essayText(),
      events: log.current,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `evidence-detective-${entry.id}-log.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  /* ---------- shared UI ---------- */

  const Chip = ({ id, clickable }: { id: string; clickable?: boolean }) => {
    const g = gradings[id]
    const label = byId[id].note + (g.strength ? ` · ${g.strength}` : '')
    return (
      <button
        className={chipClass(g.side) + (placed(id) ? ' chip-placed' : '')}
        onClick={clickable ? () => chipClick(id) : undefined}
        disabled={!clickable || placed(id)}
      >
        {label}
      </button>
    )
  }

  const Notebook = ({ clickable }: { clickable?: boolean }) => (
    <aside className="notebook">
      <h3>Detective notebook</h3>
      {[sideA, sideB].map((s) => (
        <div key={s.id}>
          <p className={`col-label col-${s.color}`}>{s.teamLabel}</p>
          <div className="chip-col">
            {colIds(s.id).map((id) => (
              <Chip key={id} id={id} clickable={clickable} />
            ))}
            {colIds(s.id).length === 0 && <p className="col-empty">No clues yet</p>}
          </div>
        </div>
      ))}
      <p className="col-label col-gray">Discard pile</p>
      <div className="chip-col">
        {colIds('neither').map((id) => (
          <Chip key={id} id={id} clickable={false} />
        ))}
        {colIds('neither').length === 0 && <p className="col-empty">Nothing discarded</p>}
      </div>
    </aside>
  )

  const StepNav = () => {
    const steps: [Screen, string][] = [
      ['investigate', '1 · Investigate'],
      ['organize', '2 · Closing argument'],
      ['polish', '3 · Essay'],
    ]
    return (
      <nav className="stepnav">
        {steps.map(([s, label]) => (
          <span key={s} className={'step' + (screen === s ? ' step-on' : '')}>
            {label}
          </span>
        ))}
      </nav>
    )
  }

  /* ---------- screens ---------- */

  if (screen === 'intake') {
    return (
      <main className="frame">
        <header className="topbar">
          <a className="backlink" href="./">← All cases</a>
          <span className="case-no">{entry.caseNo}</span>
        </header>
        <section className="intake">
          <h1>{entry.title}</h1>
          <p className="prompt-line">{entry.prompt}</p>
          <div className="briefing">{entry.briefing}</div>
          <ol className="howto">
            <li>Search the scene — every object might hide a clue.</li>
            <li>
              Grade each clue: which side does it support, and how strong is it? Watch out for
              red herrings.
            </li>
            <li>Choose your claim, build your case file, and face the jury.</li>
            <li>Assemble your closing argument — your essay.</li>
          </ol>
          <button
            className="primary"
            onClick={() => {
              setScreen('investigate')
              logEvent('start')
            }}
          >
            Take the case →
          </button>
        </section>
      </main>
    )
  }

  if (screen === 'investigate') {
    const activeEv = active ? byId[active] : null
    const activeGrading = active ? gradings[active] : undefined
    return (
      <main className="frame">
        <header className="topbar">
          <a className="backlink" href="./">← All cases</a>
          <span className="case-no">{entry.caseNo} · {entry.title}</span>
          <StepNav />
          <span className="counter">Clues: {inspected.size} / {entry.evidence.length}</span>
          <div className="art-toggle" role="group" aria-label="Scene art style">
            {(
              [
                ['hifi', 'Illustrated'],
                ['midfi', 'Mid-fi demo'],
              ] as const
            ).map(([style, label]) => (
              <button
                key={style}
                className={'art-pick' + (sceneStyle === style ? ' art-on' : '')}
                onClick={() => {
                  setSceneStyle(style)
                  logEvent('scene_style', { style })
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="hints-toggle">
            <input type="checkbox" checked={hints} onChange={(e) => setHints(e.target.checked)} />
            Hints
          </label>
        </header>
        <div className="invest-grid">
          <div>
            <div className="scene-wrap">
              <Scene discovered={inspected} hints={hints} onInspect={onInspect} />
            </div>
            <div className="evidence-card">
              {!activeEv && (
                <>
                  <p className="ev-title">Click anything that looks interesting</p>
                  <p className="ev-snippet">
                    Each object hides an evidence card. Decide which side it supports, then rate
                    how strong it is.
                  </p>
                </>
              )}
              {activeEv && (
                <>
                  <p className="ev-title">{activeEv.object}</p>
                  <p className="ev-snippet">{activeEv.snippet}</p>
                  {activeGrading ? (
                    <div className="logged-row">
                      <span className="logged">
                        {activeGrading.side === 'neither'
                          ? 'Tossed on the discard pile.'
                          : `Logged: ${sideById(activeGrading.side)?.teamLabel} · ${activeGrading.strength}`}
                      </span>
                      <button className="ghost" onClick={() => clearGrading(activeEv.id)}>
                        Change my rating
                      </button>
                    </div>
                  ) : (
                    <div className="grading">
                      <div className="btn-row">
                        <span className="q">Supports:</span>
                        {[sideA, sideB].map((s) => (
                          <button
                            key={s.id}
                            className={'pick' + (pendingSide === s.id ? ' pick-on' : '')}
                            onClick={() => setPendingSide(s.id)}
                          >
                            {s.teamLabel}
                          </button>
                        ))}
                        <button
                          className="pick"
                          onClick={() => commitGrading(activeEv.id, { side: 'neither' })}
                        >
                          Unrelated
                        </button>
                      </div>
                      {pendingSide && (
                        <>
                          <div className="btn-row">
                            <span className="q">Strength:</span>
                            {(['strong', 'medium', 'weak'] as Strength[]).map((st) => (
                              <button
                                key={st}
                                className="pick"
                                onClick={() =>
                                  commitGrading(activeEv.id, { side: pendingSide, strength: st })
                                }
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                          <p className="anchors">{STRENGTH_ANCHORS}</p>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="sidebar">
            <Notebook />
            <button
              className="primary"
              disabled={!gateOk}
              onClick={() => {
                setScreen('organize')
                logEvent('to_organize')
              }}
            >
              Closing argument →
            </button>
            {!gateOk && (
              <p className="gate-hint">
                Log at least 5 clues, with at least one in each column, before you argue your
                case.
              </p>
            )}
          </div>
        </div>
      </main>
    )
  }

  if (screen === 'organize') {
    return (
      <main className="frame">
        <header className="topbar">
          <a className="backlink" href="./">← All cases</a>
          <span className="case-no">{entry.caseNo} · {entry.title}</span>
          <StepNav />
          <button className="ghost" onClick={() => setScreen('investigate')}>
            ← Back to the scene
          </button>
        </header>

        <section className="claim-bar">
          <p className="q">
            Your notebook: {colIds(sideA.id).length} clue{colIds(sideA.id).length === 1 ? '' : 's'} for{' '}
            {sideA.teamLabel}, {colIds(sideB.id).length} for {sideB.teamLabel}. Where does the
            evidence point?
          </p>
          <div className="btn-row">
            {[sideA, sideB].map((s) => (
              <button
                key={s.id}
                className={'pick claim-pick' + (claim === s.id ? ' pick-on' : '')}
                onClick={() => pickClaim(s.id)}
              >
                {s.claim}
              </button>
            ))}
          </div>
        </section>

        <div className="org-grid">
          <Notebook clickable />
          <div>
            <section className="casefile">
              <h3>Case file</h3>
              <p className="claim-line">
                {claimSide ? `Your claim: ${claimSide.claim}` : 'Pick a claim to open your case file.'}
              </p>
              {slots.map((id, i) => (
                <div key={i} className={'slot' + (id ? ' slot-filled' : '')}>
                  {id ? (
                    <>
                      <div className="slot-head">
                        <span>{byId[id].essaySentence}</span>
                        <button className="x" onClick={() => removeFromSlot(i)} aria-label="Remove">
                          ×
                        </button>
                      </div>
                      <textarea
                        value={reasonings[i]}
                        onChange={(e) => {
                          const r = [...reasonings]
                          r[i] = e.target.value
                          setReasonings(r)
                        }}
                        placeholder={`Connect it to your claim. Try: “${starterFor(byId[id])}…”`}
                      />
                    </>
                  ) : (
                    <span className="slot-hint">Evidence {i + 1} — click a clue from your side</span>
                  )}
                </div>
              ))}
              <div className={'slot slot-counter' + (counter ? ' slot-filled' : '')}>
                {counter ? (
                  <>
                    <div className="slot-head">
                      <span>Some people point out: {byId[counter].essaySentence}</span>
                      <button className="x" onClick={removeCounter} aria-label="Remove">
                        ×
                      </button>
                    </div>
                    <textarea
                      value={rebuttal}
                      onChange={(e) => setRebuttal(e.target.value)}
                      placeholder="Answer it: “However…” — why does your claim still hold?"
                    />
                  </>
                ) : (
                  <span className="slot-hint">
                    Counterargument — click one clue from the other side
                  </span>
                )}
              </div>
              {orgMsg && <p className="org-msg">{orgMsg}</p>}
            </section>

            <section className="jury-panel">
              <h3>The jury</h3>
              <p className="ck">
                {placedCount === 3 ? '✓' : '○'} Three pieces of evidence ({placedCount}/3)
              </p>
              <p className="ck">{hasStrong ? '✓' : '○'} At least one clue you rated strong</p>
              <p className="ck">{counter ? '✓' : '○'} Counterargument chosen</p>

              {jury !== 'open' && (
                <button className="primary" disabled={!checklistOk} onClick={runJury}>
                  {jury === 'approved' ? 'Jury satisfied ✓' : 'Take my case to the jury'}
                </button>
              )}

              {jury === 'open' &&
                challenges.map((c) => {
                  const ev = byId[c.evidenceId]
                  return (
                    <div key={c.evidenceId + c.kind} className="challenge">
                      {c.kind === 'herring' && (
                        <>
                          <p>
                            Objection! How does {ev.object.toLowerCase()} bear on the question at
                            all? The jury moves to strike it.
                          </p>
                          <button className="pick" onClick={() => resolveStrike(c)}>
                            Strike it from the record
                          </button>
                        </>
                      )}
                      {c.kind === 'wrongside' && (
                        <>
                          <p>
                            Read it again, detective: “{ev.snippet}” — the jury thinks this clue
                            argues for the other side.
                          </p>
                          <div className="btn-row">
                            {!counter && (
                              <button className="pick" onClick={() => resolveMoveToCounter(c)}>
                                Use it as my counterargument
                              </button>
                            )}
                            <button className="pick" onClick={() => resolveStrike(c)}>
                              Remove it
                            </button>
                          </div>
                        </>
                      )}
                      {c.kind === 'counterwrong' && (
                        <>
                          <p>
                            Wait — this clue actually supports your claim. It cannot be your
                            counterargument.
                          </p>
                          <button className="pick" onClick={() => resolveStrike(c)}>
                            Return it to my notebook
                          </button>
                        </>
                      )}
                      {c.kind === 'defend' && (
                        <>
                          <p>
                            You rated “{ev.note}” as strong.{' '}
                            {ev.type === 'anecdote'
                              ? 'But it is one story about one case. Strong usually means data, research, or many cases.'
                              : 'Is it really data or research — or a single fact?'}{' '}
                            Defend your rating, or change it.
                          </p>
                          <textarea
                            value={defenseDrafts[c.evidenceId] ?? ''}
                            onChange={(e) =>
                              setDefenseDrafts((prev) => ({
                                ...prev,
                                [c.evidenceId]: e.target.value,
                              }))
                            }
                            placeholder="Your defense, in one sentence…"
                          />
                          <div className="btn-row">
                            <button
                              className="pick"
                              disabled={(defenseDrafts[c.evidenceId] ?? '').trim().length < 15}
                              onClick={() => resolveDefend(c)}
                            >
                              Submit my defense
                            </button>
                            <button className="pick" onClick={() => resolveRerate(c, 'medium')}>
                              Re-rate to medium
                            </button>
                            <button className="pick" onClick={() => resolveRerate(c, 'weak')}>
                              Re-rate to weak
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}

              {jury === 'approved' && (
                <div className="approved">
                  <p>The jury finds your case file in order.</p>
                  <button
                    className="primary"
                    onClick={() => {
                      setScreen('polish')
                      logEvent('to_polish')
                    }}
                  >
                    Assemble my essay →
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    )
  }

  if (screen === 'polish') {
    const missing = bodyChunks.some((c) => c.missing) || counterChunk.missing
    return (
      <main className="frame">
        <header className="topbar">
          <a className="backlink" href="./">← All cases</a>
          <span className="case-no">{entry.caseNo} · {entry.title}</span>
          <StepNav />
          <button className="ghost" onClick={() => setScreen('organize')}>
            ← Back to case file
          </button>
        </header>
        <section className="polish">
          <h2>Your closing argument</h2>
          <p className="polish-note">
            The highlighted connectives were added automatically — click one to try an
            alternative.
          </p>
          <div className="essay">
            <p>{claimSide?.claim} The clues from the scene tell a clear story.</p>
            <p>
              {bodyChunks.map((c) => (
                <span key={c.key}>
                  <button className="conn" onClick={() => cycleConn(c.key)}>
                    {conn(c.key)}
                  </button>{' '}
                  {lcFirst(c.sentence)}{' '}
                  <span className={c.missing ? 'weak-bit' : ''}>{c.reasoning}</span>{' '}
                </span>
              ))}
            </p>
            <p>
              <button className="conn" onClick={() => cycleConn('counter')}>
                {conn('counter')}
              </button>{' '}
              {counterChunk.text} However,{' '}
              <span className={counterChunk.missing ? 'weak-bit' : ''}>
                {counterChunk.rebuttal}
              </span>
            </p>
            <p>
              <button className="conn" onClick={() => cycleConn('conclusion')}>
                {conn('conclusion')}
              </button>{' '}
              {claimSide ? lcFirst(claimSide.claim) : ''}
            </p>
          </div>
          {missing && (
            <p className="gate-hint">
              The dotted parts are weak placeholders — go back to your case file and write your
              own reasoning to replace them.
            </p>
          )}
          <button
            className="primary"
            onClick={() => {
              setScreen('closed')
              logEvent('case_closed')
            }}
          >
            Close the case →
          </button>
        </section>
      </main>
    )
  }

  /* closed */
  const otherCase = entry.id === 'cats-vs-dogs' ? 'phone-ban' : 'cats-vs-dogs'
  return (
    <main className="frame">
      <header className="topbar">
        <a className="backlink" href="./">← All cases</a>
        <span className="case-no">{entry.caseNo} · {entry.title}</span>
      </header>
      <section className="closed">
        <div className="rank-badge">{rank}</div>
        <h2>Case closed</h2>
        <ul className="stats">
          <li>Clues inspected: {inspected.size} / {entry.evidence.length}</li>
          <li>
            Gradings matching the agency file: {sideMatches} / {relevantGraded.length}
          </li>
          <li>
            Red herrings caught: {herringsCaught} / {herringIds.length}
          </li>
          <li>
            Jury challenges — defended: {defended.size}, re-rated: {rerated.size}
          </li>
        </ul>
        <div className="essay essay-final">
          {essayText()
            .split('\n\n')
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
        <div className="btn-row">
          <button className="pick" onClick={() => navigator.clipboard.writeText(essayText())}>
            Copy essay
          </button>
          <button className="pick" onClick={downloadLog}>
            Download investigation log
          </button>
          <a className="pick linkbtn" href={`?case=${otherCase}`}>
            Try the other case →
          </a>
        </div>
      </section>
    </main>
  )
}

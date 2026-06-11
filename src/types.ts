import type { FC } from 'react'

export type Strength = 'strong' | 'medium' | 'weak'
export type EvidenceType = 'statistic' | 'fact' | 'anecdote' | 'expert' | 'opinion'

export interface Evidence {
  id: string
  /** Short name of the object in the scene */
  object: string
  /** What the detective reads when inspecting it */
  snippet: string
  /** Answer key: which side this clue really supports, or 'neither' for red herrings */
  side: string
  /** Answer key strength — omitted for red herrings */
  strength?: Strength
  type?: EvidenceType
  /** Short chip label for the notebook */
  note: string
  /** Sentence used when assembling the essay */
  essaySentence?: string
  /** Authoring note: why this item is pedagogically interesting */
  discussion?: string
}

export interface Side {
  id: string
  /** e.g. "Cats are better" */
  label: string
  /** e.g. "Team cat" — used on buttons and notebook columns */
  teamLabel: string
  /** Full claim sentence for the essay */
  claim: string
  color: 'teal' | 'coral'
}

export interface SceneProps {
  discovered: ReadonlySet<string>
  hints: boolean
  onInspect: (id: string) => void
}

export interface CaseData {
  id: string
  caseNo: string
  title: string
  prompt: string
  briefing: string
  sides: [Side, Side]
  evidence: Evidence[]
}

export interface CaseEntry extends CaseData {
  /** Default illustrated scene */
  SceneHiFi: FC<SceneProps>
  /** Original flat prototype scene, kept selectable as "Mid-fi demo" */
  SceneMidFi: FC<SceneProps>
}

export interface Grading {
  side: string // a side id, or 'neither'
  strength?: Strength
}

export interface LogEntry {
  t: string
  type: string
  [key: string]: unknown
}

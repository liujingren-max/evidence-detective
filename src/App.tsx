import { CASES } from './data'
import { Game } from './game/Game'
import { Picker } from './Picker'

export default function App() {
  const caseId = new URLSearchParams(window.location.search).get('case')
  const entry = caseId ? CASES[caseId] : undefined
  return entry ? <Game key={entry.id} entry={entry} /> : <Picker />
}

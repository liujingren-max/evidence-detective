import type { CaseEntry } from '../types'
import { catsVsDogs } from './catsVsDogs'
import { phoneBan } from './phoneBan'
import { CatScene } from '../scenes/CatScene'
import { PhoneScene } from '../scenes/PhoneScene'

export const CASES: Record<string, CaseEntry> = {
  'cats-vs-dogs': { ...catsVsDogs, Scene: CatScene },
  'phone-ban': { ...phoneBan, Scene: PhoneScene },
}

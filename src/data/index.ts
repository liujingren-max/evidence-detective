import type { CaseEntry } from '../types'
import { catsVsDogs } from './catsVsDogs'
import { phoneBan } from './phoneBan'
import { CatScene } from '../scenes/CatScene'
import { PhoneScene } from '../scenes/PhoneScene'
import { CatSceneHiFi } from '../scenes/CatSceneHiFi'
import { PhoneSceneHiFi } from '../scenes/PhoneSceneHiFi'

export const CASES: Record<string, CaseEntry> = {
  'cats-vs-dogs': { ...catsVsDogs, SceneHiFi: CatSceneHiFi, SceneMidFi: CatScene },
  'phone-ban': { ...phoneBan, SceneHiFi: PhoneSceneHiFi, SceneMidFi: PhoneScene },
}

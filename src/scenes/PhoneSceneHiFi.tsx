import type { FC } from 'react'
import type { SceneProps } from '../types'
import bg from './phone-scene.jpeg'

export const PhoneSceneHiFi: FC<SceneProps> = ({ discovered, hints, onInspect }) => {
  const Spot = ({
    id, gx, gy,
    x, y, w, h,
  }: { id: string; gx: number; gy: number; x: number; y: number; w: number; h: number }) => (
    <g
      className={'hotspot' + (discovered.has(id) ? ' done' : '')}
      onClick={() => onInspect(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onInspect(id)}
    >
      <rect x={x} y={y} width={w} height={h} rx="6" fill="transparent" />
      {discovered.has(id)
        ? <circle className="glint-done" cx={gx} cy={gy} r={5} />
        : <circle className="glint" cx={gx} cy={gy} r={6} />
      }
    </g>
  )

  return (
    <svg
      viewBox="0 0 920 520"
      className="scene-svg"
      role="img"
      aria-label="A classroom and the hallway outside it, illustrated"
    >
      <image
        href={bg}
        x="0" y="0"
        width="920" height="520"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* — CLASSROOM (left half) — */}

      {/* research printout taped on wall right of blackboard */}
      <Spot id="study"     gx={334} gy={145} x={302} y={114} w={ 65} h={ 62} />

      {/* phone-use tally on classroom wall */}
      <Spot id="chat"      gx={232} gy={170} x={200} y={136} w={ 65} h={ 68} />

      {/* tally sheet on teacher's desk */}
      <Spot id="tally"     gx={ 57} gy={333} x={ 25} y={309} w={ 65} h={ 48} />

      {/* orange binder on teacher's desk */}
      <Spot id="refocus"   gx={167} gy={318} x={136} y={291} w={ 62} h={ 55} />

      {/* phone open to translate app on student desk */}
      <Spot id="translate" gx={267} gy={344} x={241} y={318} w={ 52} h={ 52} />

      {/* purple backpack on floor */}
      <Spot id="glucose"   gx={251} gy={451} x={212} y={415} w={ 78} h={ 72} />

      {/* — HALLWAY (right half) — */}

      {/* yellow safety-alert poster on lockers */}
      <Spot id="alert"     gx={491} gy={216} x={456} y={182} w={ 70} h={ 68} />

      {/* bulletin board — newspaper clipping */}
      <Spot id="lunch"     gx={623} gy={228} x={589} y={197} w={ 68} h={ 62} />

      {/* bulletin board — yellow detention memo */}
      <Spot id="detention" gx={699} gy={240} x={668} y={211} w={ 62} h={ 58} />

      {/* pink scarf on bench */}
      <Spot id="scarf"     gx={654} gy={318} x={614} y={287} w={ 80} h={ 62} />

      {/* Chromebook shortage sign on hallway wall */}
      <Spot id="laptops"   gx={829} gy={261} x={795} y={230} w={ 68} h={ 62} />

      {/* PTA clipboard */}
      <Spot id="survey"    gx={734} gy={343} x={708} y={317} w={ 52} h={ 52} />

      {/* cracked phone on hallway floor */}
      <Spot id="cracked"   gx={529} gy={486} x={498} y={460} w={ 62} h={ 52} />

      {/* vending machine */}
      <Spot id="vending"   gx={889} gy={312} x={845} y={227} w={ 88} h={170} />
    </svg>
  )
}

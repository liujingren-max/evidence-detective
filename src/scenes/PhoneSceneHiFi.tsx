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
      {hints && !discovered.has(id) && <circle className="glint" cx={gx} cy={gy} r={6} />}
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
      <Spot id="study"    gx={270} gy={137} x={240} y={112} w={65}  h={62} />

      {/* counsellor's flyer below printout */}
      <Spot id="chat"     gx={267} gy={196} x={238} y={170} w={65}  h={68} />

      {/* tally sheet on teacher's desk surface */}
      <Spot id="tally"    gx={116} gy={316} x={88}  y={292} w={65}  h={48} />

      {/* orange binder on teacher's desk */}
      <Spot id="refocus"  gx={175} gy={312} x={148} y={288} w={62}  h={55} />

      {/* phone open to translate app on student desk */}
      <Spot id="translate" gx={349} gy={314} x={324} y={290} w={52} h={52} />

      {/* purple backpack on floor */}
      <Spot id="glucose"  gx={322} gy={398} x={290} y={368} w={78}  h={72} />

      {/* — HALLWAY (right half) — */}

      {/* yellow safety-alert poster on lockers */}
      <Spot id="alert"    gx={493} gy={220} x={462} y={192} w={70}  h={68} />

      {/* bulletin board — newspaper clipping */}
      <Spot id="lunch"    gx={623} gy={228} x={596} y={200} w={68}  h={62} />

      {/* bulletin board — yellow detention memo */}
      <Spot id="detention" gx={699} gy={240} x={672} y={212} w={62} h={58} />

      {/* pink scarf on bench */}
      <Spot id="scarf"    gx={644} gy={318} x={610} y={290} w={80}  h={62} />

      {/* clipboard on/near bench */}
      <Spot id="survey"   gx={712} gy={316} x={684} y={288} w={68}  h={62} />

      {/* cracked phone on hallway floor */}
      <Spot id="cracked"  gx={479} gy={400} x={452} y={374} w={62}  h={52} />

      {/* vending machine (right wall) */}
      <Spot id="vending"  gx={808} gy={318} x={778} y={230} w={88}  h={170} />

      {/* notice on library door */}
      <Spot id="laptops"  gx={883} gy={295} x={858} y={212} w={52}  h={52} />
    </svg>
  )
}

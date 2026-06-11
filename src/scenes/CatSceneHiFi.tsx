import type { FC } from 'react'
import type { SceneProps } from '../types'
import bg from './cat-scene.jpg'

export const CatSceneHiFi: FC<SceneProps> = ({ discovered, hints, onInspect }) => {
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
      aria-label="The Hendersons' living room and kitchen, illustrated"
    >
      <image
        href={bg}
        x="0" y="0"
        width="920" height="520"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* sofa left arm — claw marks */}
      <Spot id="scratched-sofa"   gx={134} gy={293} x={ 98} y={249} w={ 72} h={ 88} />

      {/* framed news clipping on wall near sofa */}
      <Spot id="fire-clipping"    gx={147} gy={358} x={113} y={324} w={ 68} h={ 68} />

      {/* remote on sofa seat */}
      <Spot id="tv-remote"        gx={255} gy={307} x={220} y={283} w={ 70} h={ 48} />

      {/* grey cat on armchair */}
      <Spot id="purring-cat"      gx={551} gy={353} x={486} y={303} w={130} h={100} />

      {/* science magazine on coffee table */}
      <Spot id="health-study"     gx={170} gy={375} x={115} y={346} w={110} h={ 58} />

      {/* chewed red sneaker near rug */}
      <Spot id="chewed-shoe"      gx={257} gy={464} x={212} y={438} w={ 90} h={ 52} />

      {/* paper notice on door */}
      <Spot id="apartment-notice" gx={458} gy={139} x={424} y={105} w={ 68} h={ 68} />

      {/* goldfish bowl on counter */}
      <Spot id="goldfish"         gx={575} gy={220} x={531} y={179} w={ 88} h={ 82} />

      {/* box on kitchen shelf (allergy meds) */}
      <Spot id="allergy-meds"     gx={729} gy={ 36} x={698} y={ 10} w={ 62} h={ 52} />

      {/* green pamphlet on counter */}
      <Spot id="vet-pamphlet"     gx={740} gy={238} x={709} y={209} w={ 62} h={ 58} />

      {/* receipt on corkboard */}
      <Spot id="training-receipt" gx={848} gy={ 62} x={821} y={ 35} w={ 54} h={ 54} />

      {/* neighbor's note on corkboard */}
      <Spot id="hiding-cat"       gx={883} gy={ 83} x={857} y={ 57} w={ 52} h={ 52} />

      {/* sticky note on fridge */}
      <Spot id="walk-schedule"    gx={877} gy={172} x={844} y={142} w={ 66} h={ 60} />
    </svg>
  )
}

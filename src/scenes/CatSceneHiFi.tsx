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
      {hints && !discovered.has(id) && <circle className="glint" cx={gx} cy={gy} r={6} />}
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
      <Spot id="scratched-sofa"   gx={100} gy={288} x={72}  y={260} w={72}  h={88} />

      {/* remote on sofa seat */}
      <Spot id="tv-remote"        gx={363} gy={290} x={330} y={268} w={70}  h={48} />

      {/* grey cat on armchair */}
      <Spot id="purring-cat"      gx={562} gy={300} x={518} y={265} w={130} h={100} />

      {/* science magazine on coffee table */}
      <Spot id="health-study"     gx={200} gy={400} x={162} y={375} w={110} h={58} />

      {/* chewed red sneaker near rug */}
      <Spot id="chewed-shoe"      gx={276} gy={465} x={240} y={442} w={90}  h={52} />

      {/* paper notice on door */}
      <Spot id="apartment-notice" gx={524} gy={190} x={494} y={165} w={68}  h={68} />

      {/* goldfish bowl on counter */}
      <Spot id="goldfish"         gx={602} gy={242} x={564} y={208} w={88}  h={82} />

      {/* pink medicine box on shelf */}
      <Spot id="allergy-meds"     gx={568} gy={108} x={540} y={85}  w={62}  h={52} />

      {/* yellow sticky on fridge */}
      <Spot id="walk-schedule"    gx={856} gy={228} x={824} y={200} w={66}  h={60} />

      {/* receipt pinned to corkboard */}
      <Spot id="training-receipt" gx={774} gy={122} x={748} y={98}  w={54}  h={54} />

      {/* sticky note on corkboard */}
      <Spot id="hiding-cat"       gx={830} gy={148} x={804} y={124} w={52}  h={52} />

      {/* green tri-fold pamphlet on counter */}
      <Spot id="vet-pamphlet"     gx={726} gy={268} x={698} y={244} w={62}  h={58} />
    </svg>
  )
}

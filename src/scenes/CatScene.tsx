import type { FC, ReactNode } from 'react'
import type { SceneProps } from '../types'

export const CatScene: FC<SceneProps> = ({ discovered, hints, onInspect }) => {
  const Spot = ({ id, gx, gy, children }: { id: string; gx: number; gy: number; children: ReactNode }) => (
    <g
      className={'hotspot' + (discovered.has(id) ? ' done' : '')}
      onClick={() => onInspect(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onInspect(id)}
    >
      {children}
      {hints && !discovered.has(id) && <circle className="glint" cx={gx} cy={gy} r={6} />}
    </g>
  )

  return (
    <svg viewBox="0 0 920 520" className="scene-svg" role="img" aria-label="The Hendersons' living room and kitchen">
      <rect x="0" y="0" width="920" height="520" fill="#F4EEE0" />
      <rect x="0" y="400" width="920" height="120" fill="#D9C8AA" />
      <rect x="0" y="396" width="920" height="6" fill="#C2B091" />
      <ellipse cx="220" cy="455" rx="170" ry="34" fill="#C9B493" />

      {/* window */}
      <g>
        <rect x="50" y="70" width="170" height="130" fill="#BFDCEE" stroke="#9A8C72" strokeWidth="8" />
        <line x1="135" y1="74" x2="135" y2="196" stroke="#9A8C72" strokeWidth="5" />
        <line x1="54" y1="135" x2="216" y2="135" stroke="#9A8C72" strokeWidth="5" />
        <circle cx="95" cy="105" r="14" fill="#FFFFFF" opacity="0.8" />
        <circle cx="112" cy="100" r="10" fill="#FFFFFF" opacity="0.8" />
      </g>

      {/* framed news clipping */}
      <Spot id="fire-clipping" gx={295} gy={78}>
        <rect x="255" y="80" width="80" height="62" fill="#8A6B4A" rx="3" />
        <rect x="262" y="87" width="66" height="48" fill="#FAF3DF" />
        <rect x="266" y="92" width="58" height="7" fill="#5F5E5A" />
        <rect x="266" y="104" width="48" height="3" fill="#B4B2A9" />
        <rect x="266" y="111" width="52" height="3" fill="#B4B2A9" />
        <rect x="266" y="118" width="44" height="3" fill="#B4B2A9" />
        <path d="M300 124 q4 -8 9 0 q4 6 -2 8 l-10 0 q-3 -4 3 -8z" fill="#D85A30" />
      </Spot>

      {/* shelf and items */}
      <rect x="360" y="150" width="215" height="10" fill="#8A6B4A" rx="2" />
      <rect x="372" y="160" width="8" height="14" fill="#7A5C3E" />
      <rect x="555" y="160" width="8" height="14" fill="#7A5C3E" />
      <Spot id="trick-trophy" gx={395} gy={112}>
        <path d="M380 104 h30 v14 q0 12 -15 14 q-15 -2 -15 -14 z" fill="#E8B23A" />
        <path d="M378 106 q-9 2 -6 11 q2 7 9 6" fill="none" stroke="#E8B23A" strokeWidth="4" />
        <path d="M412 106 q9 2 6 11 q-2 7 -9 6" fill="none" stroke="#E8B23A" strokeWidth="4" />
        <rect x="390" y="132" width="10" height="8" fill="#C2912E" />
        <rect x="383" y="140" width="24" height="10" fill="#8A6B4A" rx="2" />
      </Spot>
      <Spot id="allergy-meds" gx={465} gy={125}>
        <rect x="448" y="112" width="34" height="38" fill="#F3E3E9" stroke="#D4537E" strokeWidth="2" rx="3" />
        <rect x="461" y="122" width="8" height="20" fill="#D4537E" />
        <rect x="455" y="128" width="20" height="8" fill="#D4537E" />
      </Spot>
      <Spot id="goldfish" gx={528} gy={120}>
        <path d="M508 116 q-4 22 20 26 q24 -4 20 -26 q-4 -14 -20 -14 q-16 0 -20 14z" fill="#BFDCEE" />
        <ellipse cx="528" cy="128" rx="8" ry="5" fill="#F2842F" />
        <path d="M536 128 l8 -5 v10 z" fill="#F2842F" />
        <ellipse cx="528" cy="106" rx="14" ry="3" fill="#9FC4DC" />
      </Spot>

      {/* sofa */}
      <g>
        <rect x="60" y="248" width="250" height="70" fill="#7FA3C6" rx="10" />
        <rect x="60" y="306" width="250" height="56" fill="#6E92B5" rx="8" />
        <line x1="143" y1="252" x2="143" y2="306" stroke="#6E92B5" strokeWidth="3" />
        <line x1="226" y1="252" x2="226" y2="306" stroke="#6E92B5" strokeWidth="3" />
        <rect x="297" y="256" width="30" height="106" fill="#7FA3C6" rx="10" />
        <rect x="70" y="362" width="14" height="16" fill="#5C5240" />
        <rect x="286" y="362" width="14" height="16" fill="#5C5240" />
      </g>
      <Spot id="scratched-sofa" gx={58} gy={290}>
        <rect x="43" y="256" width="30" height="106" fill="#7FA3C6" rx="10" />
        <path d="M48 274 l16 30 M55 270 l14 32 M62 268 l12 34 M50 296 l18 26" stroke="#41608A" strokeWidth="2.5" fill="none" />
      </Spot>
      <Spot id="tv-remote" gx={196} gy={322}>
        <rect x="184" y="314" width="26" height="13" fill="#2C2C2A" rx="3" transform="rotate(-8 197 320)" />
        <circle cx="191" cy="318" r="1.6" fill="#E8B23A" />
        <circle cx="197" cy="319" r="1.6" fill="#F1EFE8" />
        <circle cx="203" cy="320" r="1.6" fill="#F1EFE8" />
      </Spot>

      {/* armchair with cat */}
      <g>
        <rect x="370" y="258" width="120" height="60" fill="#C98963" rx="12" />
        <rect x="362" y="300" width="136" height="62" fill="#B97A55" rx="10" />
        <rect x="374" y="362" width="12" height="14" fill="#5C5240" />
        <rect x="474" y="362" width="12" height="14" fill="#5C5240" />
      </g>
      <Spot id="purring-cat" gx={432} gy={282}>
        <ellipse cx="428" cy="296" rx="32" ry="17" fill="#8C8C8C" />
        <circle cx="456" cy="288" r="11" fill="#8C8C8C" />
        <path d="M449 280 l3 -8 5 7 z M457 279 l4 -7 4 8 z" fill="#8C8C8C" />
        <path d="M398 300 q-12 -2 -8 -14" stroke="#6E6E6E" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M452 288 q2 2 4 0 M458 288 q2 2 4 0" stroke="#4A4A4A" strokeWidth="1.5" fill="none" />
        <text x="470" y="268" fontSize="13" fill="#9A8C72" fontStyle="italic">prrr</text>
      </Spot>

      {/* coffee table + magazine */}
      <g>
        <rect x="130" y="418" width="180" height="12" fill="#8A6B4A" rx="3" />
        <rect x="142" y="430" width="9" height="52" fill="#7A5C3E" />
        <rect x="289" y="430" width="9" height="52" fill="#7A5C3E" />
      </g>
      <Spot id="health-study" gx={210} gy={408}>
        <rect x="180" y="396" width="62" height="26" fill="#FFFFFF" stroke="#B4B2A9" strokeWidth="1.5" rx="2" transform="rotate(-4 211 409)" />
        <rect x="186" y="401" width="30" height="4" fill="#185FA5" transform="rotate(-4 211 409)" />
        <path d="M188 414 l10 -5 8 3 12 -7" stroke="#1D9E75" strokeWidth="2" fill="none" transform="rotate(-4 211 409)" />
      </Spot>

      {/* chewed shoe */}
      <Spot id="chewed-shoe" gx={528} gy={462}>
        <path d="M505 468 q0 -12 14 -12 l16 2 q16 2 20 10 l0 6 l-50 0 z" fill="#E2574C" />
        <rect x="505" y="472" width="50" height="6" fill="#FFFFFF" />
        <path d="M548 456 l5 -5 M539 454 l4 -6" stroke="#B23A31" strokeWidth="2" />
        <circle cx="521" cy="461" r="2" fill="#FFFFFF" />
        <circle cx="529" cy="459" r="2" fill="#FFFFFF" />
      </Spot>

      {/* door between rooms */}
      <g>
        <rect x="604" y="142" width="102" height="262" fill="#9A7B52" rx="4" />
        <rect x="612" y="150" width="86" height="246" fill="#B98E5F" rx="3" />
        <circle cx="690" cy="280" r="5" fill="#5C4A33" />
      </g>
      <Spot id="apartment-notice" gx={652} gy={222}>
        <rect x="628" y="196" width="50" height="62" fill="#FAF3DF" stroke="#C2B091" strokeWidth="1.5" />
        <rect x="634" y="204" width="38" height="5" fill="#5F5E5A" />
        <rect x="634" y="215" width="34" height="3" fill="#B4B2A9" />
        <rect x="634" y="222" width="36" height="3" fill="#B4B2A9" />
        <rect x="634" y="229" width="28" height="3" fill="#B4B2A9" />
        <rect x="634" y="240" width="20" height="4" fill="#D85A30" />
      </Spot>

      {/* fridge */}
      <g>
        <rect x="722" y="148" width="108" height="254" fill="#EBE9E4" stroke="#C9C5BC" strokeWidth="2" rx="8" />
        <line x1="722" y1="232" x2="830" y2="232" stroke="#C9C5BC" strokeWidth="3" />
        <rect x="812" y="170" width="6" height="42" fill="#B4B2A9" rx="3" />
        <rect x="812" y="246" width="6" height="60" fill="#B4B2A9" rx="3" />
      </g>
      <Spot id="walk-schedule" gx={768} gy={300}>
        <rect x="740" y="262" width="58" height="72" fill="#FFF3B0" transform="rotate(2 769 298)" />
        <rect x="746" y="270" width="44" height="6" fill="#5F5E5A" transform="rotate(2 769 298)" />
        <rect x="746" y="284" width="40" height="3" fill="#888780" transform="rotate(2 769 298)" />
        <rect x="746" y="292" width="42" height="3" fill="#888780" transform="rotate(2 769 298)" />
        <rect x="746" y="300" width="36" height="3" fill="#888780" transform="rotate(2 769 298)" />
        <rect x="746" y="312" width="30" height="4" fill="#D85A30" transform="rotate(2 769 298)" />
      </Spot>

      {/* corkboard with receipt + note */}
      <g>
        <rect x="838" y="120" width="76" height="92" fill="#B98E5F" rx="4" />
        <rect x="844" y="126" width="64" height="80" fill="#E2C18C" />
      </g>
      <Spot id="training-receipt" gx={862} gy={150}>
        <rect x="848" y="132" width="28" height="38" fill="#FFFFFF" transform="rotate(-3 862 151)" />
        <rect x="852" y="138" width="20" height="3" fill="#888780" transform="rotate(-3 862 151)" />
        <rect x="852" y="145" width="16" height="3" fill="#888780" transform="rotate(-3 862 151)" />
        <rect x="852" y="156" width="18" height="5" fill="#1D9E75" transform="rotate(-3 862 151)" />
        <circle cx="862" cy="134" r="2.5" fill="#E24B4A" />
      </Spot>
      <Spot id="hiding-cat" gx={896} gy={186}>
        <rect x="882" y="172" width="28" height="32" fill="#FFF3B0" transform="rotate(4 896 188)" />
        <rect x="886" y="178" width="20" height="3" fill="#888780" transform="rotate(4 896 188)" />
        <rect x="886" y="185" width="18" height="3" fill="#888780" transform="rotate(4 896 188)" />
        <rect x="886" y="192" width="14" height="3" fill="#888780" transform="rotate(4 896 188)" />
        <circle cx="896" cy="174" r="2.5" fill="#E24B4A" />
      </Spot>

      {/* counter + pamphlet */}
      <g>
        <rect x="836" y="330" width="84" height="12" fill="#8A6B4A" rx="2" />
        <rect x="842" y="342" width="72" height="60" fill="#A98F6F" />
        <rect x="850" y="350" width="26" height="20" fill="#8A6B4A" rx="2" />
        <rect x="882" y="350" width="26" height="20" fill="#8A6B4A" rx="2" />
      </g>
      <Spot id="vet-pamphlet" gx={872} gy={314}>
        <path d="M856 304 l16 -4 16 4 v26 l-16 -4 -16 4 z" fill="#DFF0E6" stroke="#1D9E75" strokeWidth="1.5" />
        <rect x="868" y="310" width="8" height="3" fill="#1D9E75" />
        <rect x="868" y="316" width="8" height="3" fill="#1D9E75" />
        <path d="M870 296 q2 -5 4 0 q5 -2 3 3 l-7 2 -4 -3 q0 -3 4 -2z" fill="#1D9E75" />
      </Spot>
    </svg>
  )
}

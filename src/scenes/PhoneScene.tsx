import type { FC, ReactNode } from 'react'
import type { SceneProps } from '../types'

export const PhoneScene: FC<SceneProps> = ({ discovered, hints, onInspect }) => {
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
    <svg viewBox="0 0 920 520" className="scene-svg" role="img" aria-label="A classroom and the hallway outside it">
      <rect x="0" y="0" width="920" height="520" fill="#EEF1ED" />
      <rect x="0" y="400" width="920" height="120" fill="#CFCBC0" />
      <rect x="0" y="396" width="920" height="6" fill="#B8B4A8" />
      <rect x="446" y="60" width="10" height="340" fill="#C2BDB0" />

      {/* blackboard */}
      <g>
        <rect x="44" y="74" width="242" height="132" fill="#8A6B4A" rx="4" />
        <rect x="52" y="82" width="226" height="110" fill="#3A6B5B" rx="2" />
        <rect x="52" y="192" width="226" height="8" fill="#7A5C3E" />
        <rect x="66" y="98" width="120" height="5" fill="#E8E4D5" opacity="0.9" />
        <rect x="66" y="112" width="90" height="4" fill="#E8E4D5" opacity="0.6" />
        <rect x="66" y="124" width="104" height="4" fill="#E8E4D5" opacity="0.6" />
        <rect x="66" y="146" width="60" height="4" fill="#FAC775" opacity="0.8" />
        <rect x="240" y="194" width="20" height="5" fill="#FFFFFF" />
      </g>

      {/* study printout taped beside board */}
      <Spot id="study" gx={331} gy={88}>
        <rect x="300" y="92" width="62" height="78" fill="#FFFFFF" stroke="#B4B2A9" strokeWidth="1.5" />
        <rect x="296" y="88" width="18" height="8" fill="#D7E8F5" opacity="0.9" transform="rotate(-20 305 92)" />
        <rect x="348" y="88" width="18" height="8" fill="#D7E8F5" opacity="0.9" transform="rotate(20 357 92)" />
        <rect x="306" y="100" width="50" height="5" fill="#5F5E5A" />
        <path d="M308 150 l12 -10 10 4 16 -16" stroke="#1D9E75" strokeWidth="2.5" fill="none" />
        <rect x="306" y="112" width="44" height="3" fill="#B4B2A9" />
        <rect x="306" y="119" width="40" height="3" fill="#B4B2A9" />
      </Spot>

      {/* counselor flyer */}
      <Spot id="chat" gx={329} gy={192}>
        <rect x="300" y="196" width="58" height="66" fill="#FAF3DF" stroke="#C2B091" strokeWidth="1.5" />
        <rect x="306" y="204" width="44" height="5" fill="#5F5E5A" />
        <rect x="308" y="216" width="30" height="12" fill="#D7E8F5" rx="4" />
        <rect x="318" y="232" width="30" height="12" fill="#F4C8D4" rx="4" />
        <path d="M312 228 l4 5 2 -5z" fill="#D7E8F5" />
      </Spot>

      {/* teacher desk */}
      <g>
        <rect x="40" y="308" width="190" height="14" fill="#8A6B4A" rx="3" />
        <rect x="52" y="322" width="10" height="60" fill="#7A5C3E" />
        <rect x="208" y="322" width="10" height="60" fill="#7A5C3E" />
        <rect x="120" y="322" width="70" height="44" fill="#9A7B52" />
      </g>
      <Spot id="tally" gx={94} gy={296}>
        <rect x="70" y="290" width="48" height="20" fill="#FFFFFF" stroke="#B4B2A9" strokeWidth="1.5" transform="rotate(-3 94 300)" />
        <path d="M78 296 v8 M83 296 v8 M88 296 v8 M93 296 v8 M75 300 l21 0" stroke="#5F5E5A" strokeWidth="1.5" transform="rotate(-3 94 300)" />
        <path d="M102 296 v8 M107 296 v8" stroke="#5F5E5A" strokeWidth="1.5" transform="rotate(-3 94 300)" />
      </Spot>
      <Spot id="refocus" gx={172} gy={284}>
        <rect x="152" y="272" width="42" height="36" fill="#B5532F" rx="3" />
        <rect x="158" y="268" width="30" height="8" fill="#FFFFFF" transform="rotate(-6 173 272)" />
        <rect x="156" y="278" width="34" height="3" fill="#E8C7B8" />
        <rect x="156" y="286" width="34" height="3" fill="#E8C7B8" />
      </Spot>

      {/* student desk + phone */}
      <g>
        <rect x="280" y="328" width="124" height="12" fill="#C9A064" rx="3" />
        <rect x="290" y="340" width="8" height="44" fill="#888780" />
        <rect x="386" y="340" width="8" height="44" fill="#888780" />
      </g>
      <Spot id="translate" gx={332} gy={310}>
        <rect x="322" y="300" width="18" height="30" fill="#2C2C2A" rx="4" />
        <rect x="325" y="304" width="12" height="20" fill="#9FD8C9" rx="1" />
        <text x="327" y="317" fontSize="9" fill="#085041">あA</text>
      </Spot>

      {/* backpack with glucose phone */}
      <Spot id="glucose" gx={418} gy={436}>
        <path d="M395 470 q-4 -34 14 -40 q4 -10 14 0 q18 6 14 40 z" fill="#7A5FB5" />
        <rect x="404" y="446" width="28" height="18" fill="#65498F" rx="5" />
        <rect x="424" y="430" width="12" height="20" fill="#2C2C2A" rx="2" transform="rotate(14 430 440)" />
        <rect x="426" y="433" width="8" height="13" fill="#BFE3D8" transform="rotate(14 430 440)" />
      </Spot>

      {/* lockers */}
      <g>
        <rect x="470" y="110" width="150" height="252" fill="#8FB8A5" rx="4" />
        <line x1="520" y1="110" x2="520" y2="362" stroke="#6E9684" strokeWidth="3" />
        <line x1="570" y1="110" x2="570" y2="362" stroke="#6E9684" strokeWidth="3" />
        {[482, 532, 582].map((x) => (
          <g key={x}>
            <rect x={x} y="130" width="26" height="4" fill="#6E9684" />
            <rect x={x} y="140" width="26" height="4" fill="#6E9684" />
            <circle cx={x + 30} cy={200} r={3.5} fill="#5C7F6F" />
          </g>
        ))}
      </g>

      {/* safety poster */}
      <Spot id="alert" gx={675} gy={82}>
        <rect x="640" y="85" width="70" height="95" fill="#FCE9B8" stroke="#C9A957" strokeWidth="2" />
        <path d="M675 102 q-10 0 -10 14 v8 l-5 6 h30 l-5 -6 v-8 q0 -14 -10 -14z" fill="#BA7517" />
        <circle cx="675" cy="134" r="3" fill="#BA7517" />
        <rect x="650" y="146" width="50" height="4" fill="#854F0B" />
        <rect x="654" y="156" width="42" height="3" fill="#B4925E" />
        <rect x="654" y="163" width="38" height="3" fill="#B4925E" />
      </Spot>

      {/* bulletin board */}
      <g>
        <rect x="725" y="80" width="170" height="118" fill="#8A6B4A" rx="4" />
        <rect x="732" y="87" width="156" height="104" fill="#D9B98C" />
      </g>
      <Spot id="lunch" gx={767} gy={106}>
        <rect x="740" y="98" width="55" height="64" fill="#FFFFFF" transform="rotate(-2 767 130)" />
        <rect x="746" y="106" width="42" height="5" fill="#5F5E5A" transform="rotate(-2 767 130)" />
        <rect x="746" y="118" width="38" height="3" fill="#B4B2A9" transform="rotate(-2 767 130)" />
        <rect x="746" y="125" width="40" height="3" fill="#B4B2A9" transform="rotate(-2 767 130)" />
        <rect x="746" y="132" width="34" height="3" fill="#B4B2A9" transform="rotate(-2 767 130)" />
        <circle cx="767" cy="100" r="2.5" fill="#E24B4A" />
      </Spot>
      <Spot id="detention" gx={840} gy={116}>
        <rect x="812" y="108" width="58" height="56" fill="#FFF3B0" transform="rotate(3 841 136)" />
        <rect x="818" y="116" width="44" height="5" fill="#5F5E5A" transform="rotate(3 841 136)" />
        <rect x="818" y="128" width="40" height="3" fill="#888780" transform="rotate(3 841 136)" />
        <rect x="818" y="135" width="36" height="3" fill="#888780" transform="rotate(3 841 136)" />
        <rect x="818" y="146" width="24" height="5" fill="#D85A30" transform="rotate(3 841 136)" />
        <circle cx="840" cy="110" r="2.5" fill="#E24B4A" />
      </Spot>

      {/* bench with scarf + clipboard */}
      <g>
        <rect x="630" y="332" width="145" height="12" fill="#8A6B4A" rx="3" />
        <rect x="640" y="344" width="9" height="42" fill="#7A5C3E" />
        <rect x="756" y="344" width="9" height="42" fill="#7A5C3E" />
      </g>
      <Spot id="scarf" gx={672} gy={322}>
        <path d="M648 336 q14 -16 34 -8 q16 6 10 14 l-10 18 q-6 4 -8 -4 l4 -14 q-16 -4 -30 -6z" fill="#D4537E" />
        <path d="M676 356 l-2 12 M682 350 l2 12" stroke="#993556" strokeWidth="3" />
      </Spot>
      <Spot id="survey" gx={742} gy={306}>
        <rect x="726" y="292" width="34" height="46" fill="#C9A064" rx="3" />
        <rect x="730" y="300" width="26" height="34" fill="#FFFFFF" />
        <rect x="736" y="288" width="14" height="8" fill="#888780" rx="2" />
        <rect x="733" y="306" width="20" height="3" fill="#B4B2A9" />
        <rect x="733" y="313" width="18" height="3" fill="#B4B2A9" />
        <rect x="733" y="320" width="14" height="3" fill="#185FA5" />
      </Spot>

      {/* cracked phone on floor */}
      <Spot id="cracked" gx={548} gy={452}>
        <rect x="534" y="450" width="30" height="17" fill="#2C2C2A" rx="3" transform="rotate(-10 549 458)" />
        <rect x="537" y="453" width="24" height="11" fill="#6B7B8A" rx="1" transform="rotate(-10 549 458)" />
        <path d="M540 454 l7 5 -3 4 M551 453 l-4 6" stroke="#FFFFFF" strokeWidth="1.2" fill="none" transform="rotate(-10 549 458)" />
      </Spot>

      {/* vending machine */}
      <Spot id="vending" gx={828} gy={246}>
        <rect x="790" y="240" width="78" height="160" fill="#3E78AC" rx="5" />
        <rect x="798" y="252" width="42" height="96" fill="#BFD9F2" rx="3" />
        {[262, 284, 306, 328].map((y) => (
          <rect key={y} x="803" y={y} width="32" height="12" fill="#7FA8CC" rx="2" />
        ))}
        <rect x="848" y="258" width="14" height="30" fill="#2C5578" rx="2" />
        <rect x="800" y="360" width="38" height="16" fill="#28557D" rx="2" />
      </Spot>

      {/* library door + notice */}
      <g>
        <rect x="872" y="148" width="48" height="254" fill="#8A6B4A" rx="3" />
        <rect x="878" y="156" width="36" height="238" fill="#A98F6F" rx="2" />
        <circle cx="882" cy="280" r="4" fill="#5C4A33" />
      </g>
      <Spot id="laptops" gx={896} gy={242}>
        <rect x="880" y="216" width="34" height="48" fill="#FFFFFF" stroke="#B4B2A9" strokeWidth="1.5" />
        <rect x="884" y="222" width="26" height="4" fill="#5F5E5A" />
        <rect x="884" y="232" width="24" height="3" fill="#B4B2A9" />
        <rect x="884" y="239" width="22" height="3" fill="#B4B2A9" />
        <rect x="884" y="250" width="16" height="4" fill="#D85A30" />
      </Spot>
    </svg>
  )
}

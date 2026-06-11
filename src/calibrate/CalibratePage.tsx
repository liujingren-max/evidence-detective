import { useState, useRef, useCallback } from 'react'
import catBg from '../scenes/cat-scene.jpg'
import phoneBg from '../scenes/phone-scene.jpeg'

interface Spot { id: string; gx: number; gy: number; w: number; h: number }

const CAT_SPOTS: Spot[] = [
  { id: 'scratched-sofa',   gx: 134, gy: 293, w: 72,  h: 88  },
  { id: 'fire-clipping',    gx: 147, gy: 358, w: 68,  h: 68  },
  { id: 'tv-remote',        gx: 255, gy: 307, w: 70,  h: 48  },
  { id: 'purring-cat',      gx: 551, gy: 353, w: 130, h: 100 },
  { id: 'health-study',     gx: 170, gy: 375, w: 110, h: 58  },
  { id: 'chewed-shoe',      gx: 257, gy: 464, w: 90,  h: 52  },
  { id: 'apartment-notice', gx: 458, gy: 139, w: 68,  h: 68  },
  { id: 'goldfish',         gx: 575, gy: 220, w: 88,  h: 82  },
  { id: 'allergy-meds',     gx: 729, gy:  36, w: 62,  h: 52  },
  { id: 'vet-pamphlet',     gx: 740, gy: 238, w: 62,  h: 58  },
  { id: 'training-receipt', gx: 848, gy:  62, w: 54,  h: 54  },
  { id: 'hiding-cat',       gx: 883, gy:  83, w: 52,  h: 52  },
  { id: 'walk-schedule',    gx: 877, gy: 172, w: 66,  h: 60  },
]

const PHONE_SPOTS: Spot[] = [
  { id: 'study',     gx: 334, gy: 145, w: 65,  h: 62  },
  { id: 'chat',      gx: 232, gy: 170, w: 65,  h: 68  },
  { id: 'tally',     gx:  57, gy: 333, w: 65,  h: 48  },
  { id: 'refocus',   gx: 167, gy: 318, w: 62,  h: 55  },
  { id: 'translate', gx: 267, gy: 344, w: 52,  h: 52  },
  { id: 'glucose',   gx: 251, gy: 451, w: 78,  h: 72  },
  { id: 'alert',     gx: 491, gy: 216, w: 70,  h: 68  },
  { id: 'lunch',     gx: 623, gy: 228, w: 68,  h: 62  },
  { id: 'detention', gx: 699, gy: 240, w: 62,  h: 58  },
  { id: 'scarf',     gx: 654, gy: 318, w: 80,  h: 62  },
  { id: 'laptops',   gx: 734, gy: 343, w: 52,  h: 52  },
  { id: 'survey',    gx: 829, gy: 261, w: 68,  h: 62  },
  { id: 'cracked',   gx: 529, gy: 486, w: 62,  h: 52  },
  { id: 'vending',   gx: 889, gy: 312, w: 88,  h: 170 },
]

const SCENES: Record<string, { bg: string; spots: Spot[]; label: string }> = {
  'cats-vs-dogs': { bg: catBg,   spots: CAT_SPOTS,   label: 'Cats vs Dogs' },
  'phone-ban':    { bg: phoneBg, spots: PHONE_SPOTS, label: 'Phone Ban'    },
}

const COLORS = [
  '#e74c3c','#e67e22','#f1c40f','#2ecc71','#1abc9c',
  '#3498db','#9b59b6','#e91e63','#ff5722','#00bcd4',
  '#8bc34a','#ff9800','#795548','#607d8b',
]

function toCode(spots: Spot[]): string {
  return spots.map(s =>
    `      <Spot id="${s.id.padEnd(18)}" gx={${String(s.gx).padStart(3)}} gy={${String(s.gy).padStart(3)}} x={${String(Math.round(s.gx - s.w / 2)).padStart(3)}} y={${String(Math.round(s.gy - s.h / 2)).padStart(3)}} w={${String(s.w).padStart(3)}} h={${String(s.h).padStart(3)}} />`
  ).join('\n')
}

export function CalibratePage() {
  const sceneId = new URLSearchParams(window.location.search).get('calibrate') ?? 'cats-vs-dogs'
  const scene = SCENES[sceneId] ?? SCENES['cats-vs-dogs']

  const [spots, setSpots] = useState<Spot[]>(() => scene.spots.map(s => ({ ...s })))
  const [active, setActive] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragOffset = useRef({ dx: 0, dy: 0 })

  const svgPoint = useCallback((e: React.PointerEvent) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const pt = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    const t = pt.matrixTransform(svg.getScreenCTM()!.inverse())
    return { x: Math.round(t.x), y: Math.round(t.y) }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const { x, y } = svgPoint(e)
    const spot = spots.find(s => s.id === id)!
    dragOffset.current = { dx: x - spot.gx, dy: y - spot.gy }
    setActive(id)
  }, [spots, svgPoint])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!active) return
    const { x, y } = svgPoint(e)
    setSpots(prev => prev.map(s =>
      s.id === active
        ? { ...s, gx: Math.max(0, Math.min(920, x - dragOffset.current.dx)),
                  gy: Math.max(0, Math.min(520, y - dragOffset.current.dy)) }
        : s
    ))
  }, [active, svgPoint])

  const onPointerUp = useCallback(() => setActive(null), [])

  const copy = () => {
    navigator.clipboard.writeText(toCode(spots))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16, background: '#1a1a1a', minHeight: '100vh', color: '#eee' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <strong style={{ fontSize: 15 }}>Calibrate: {scene.label}</strong>
        {Object.keys(SCENES).map(id => (
          <a key={id} href={`?calibrate=${id}`}
            style={{ color: id === sceneId ? '#fac775' : '#888', fontSize: 13 }}>
            {SCENES[id].label}
          </a>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
          drag circles → click Copy → paste back
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 920 520"
        style={{ width: '100%', maxWidth: 1100, display: 'block', border: '1px solid #444', borderRadius: 8, cursor: active ? 'grabbing' : 'default' }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <image href={scene.bg} x="0" y="0" width="920" height="520" preserveAspectRatio="xMidYMid slice" />

        {spots.map((s, i) => {
          const col = COLORS[i % COLORS.length]
          const isActive = s.id === active
          return (
            <g key={s.id}>
              {/* hit rect preview */}
              <rect
                x={s.gx - s.w / 2} y={s.gy - s.h / 2}
                width={s.w} height={s.h}
                fill="none"
                stroke={col} strokeWidth={isActive ? 2 : 1}
                strokeDasharray="4 3"
                opacity={0.6}
              />
              {/* draggable handle */}
              <circle
                cx={s.gx} cy={s.gy} r={isActive ? 11 : 8}
                fill={col}
                opacity={isActive ? 1 : 0.82}
                style={{ cursor: 'grab' }}
                onPointerDown={e => onPointerDown(e, s.id)}
              />
              {/* label */}
              <text
                x={s.gx} y={s.gy - 13}
                textAnchor="middle"
                fontSize="9"
                fill="#fff"
                style={{ pointerEvents: 'none', textShadow: '0 1px 2px #000' }}
              >
                {s.id}
              </text>
              {/* coords */}
              <text
                x={s.gx} y={s.gy + 22}
                textAnchor="middle"
                fontSize="8"
                fill={col}
                style={{ pointerEvents: 'none' }}
              >
                {s.gx},{s.gy}
              </text>
            </g>
          )
        })}
      </svg>

      <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <pre style={{
          flex: 1, fontSize: 11.5, lineHeight: 1.6,
          background: '#111', border: '1px solid #333', borderRadius: 8,
          padding: '10px 14px', overflow: 'auto', color: '#ccc', margin: 0,
        }}>
          {toCode(spots)}
        </pre>
        <button
          onClick={copy}
          style={{
            padding: '8px 18px', fontSize: 13, borderRadius: 8,
            background: copied ? '#1d9e75' : '#3a3a3a',
            color: '#fff', border: 'none', cursor: 'pointer', flexShrink: 0,
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

import type { CSSProperties } from 'react'
import { classProfileMap } from '../data/classes'
import { specs } from '../data/specs'

interface ClassIconProps {
  className: string
  color: string
  specId?: string
  size?: number
  round?: boolean
  label?: string
}

const roleMarks = { tank:'防', healer:'疗', melee:'攻', ranged:'攻' }

// 门派图标取自「真·武学助手」的门派矢量图，用 CSS mask 染成门派色；心法图标在角落加职责标记。
export function ClassIcon({ className, color, specId, size = 48, round = false, label = '' }: ClassIconProps) {
  const key = classProfileMap.get(className)?.key ?? 'chunyang'
  const src = `${import.meta.env.BASE_URL}icons/${key}.svg`
  const spec = specId ? specs.find((item) => item.id === specId) : undefined
  return (
    <span className={round ? 'sect-icon round' : 'sect-icon'} role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} style={{ '--icon-color': color, '--icon-size': `${size}px`, '--icon-src': `url("${src}")` } as CSSProperties}>
      <i />
      {spec && size >= 40 && <b>{roleMarks[spec.role]}</b>}
    </span>
  )
}

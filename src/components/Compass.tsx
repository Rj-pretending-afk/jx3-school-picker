import type { CSSProperties } from 'react'
import { classProfiles } from '../data/classes'
import { ClassIcon } from './ClassIcon'

const ringRadius = 39.5
const nodeSize = 10.4

export function Compass() {
  return (
    <div className="compass" role="img" aria-label="二十门派罗盘">
      <div className="compass-glow" aria-hidden="true"><i /><i /></div>
      <svg className="compass-needle" viewBox="0 0 640 640" aria-hidden="true">
        <defs>
          <linearGradient id="needleGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3dca6" /><stop offset="1" stopColor="#d2a857" /></linearGradient>
          <linearGradient id="needleJade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5fd0bd" /><stop offset="1" stopColor="#23806f" stopOpacity="0.85" /></linearGradient>
        </defs>
        <circle cx="320" cy="320" r="150" fill="none" stroke="#e8b75c" strokeOpacity="0.1" />
        <circle cx="320" cy="320" r="112" fill="none" stroke="#5fd0bd" strokeOpacity="0.08" strokeDasharray="2 6" />
        <g opacity="0.85">
          <path d="M320 180L330 320H310Z" fill="url(#needleGold)" />
          <path d="M310 320H330L320 460Z" fill="url(#needleJade)" />
          <path d="M320 192V306" stroke="#fff6de" strokeOpacity="0.45" strokeWidth="0.9" />
        </g>
        <circle cx="320" cy="320" r="11" fill="#0c0d10" stroke="#e8b75c" strokeWidth="1.25" />
        <circle cx="320" cy="320" r="3.5" fill="#e8b75c" />
      </svg>
      {classProfiles.map((profile, index) => {
        const angle = (-90 + index * 360 / classProfiles.length) * Math.PI / 180
        const style = {
          left: `${50 + ringRadius * Math.cos(angle) - nodeSize / 2}%`,
          top: `${50 + ringRadius * Math.sin(angle) - nodeSize / 2}%`,
        } as CSSProperties
        return (
          <span className="compass-node" style={style} title={profile.name} key={profile.name}>
            <ClassIcon className={profile.name} color={profile.color} size={52} round />
          </span>
        )
      })}
    </div>
  )
}

export type Role = 'tank' | 'healer' | 'melee' | 'ranged'
export type Range = 'melee' | 'ranged' | 'mid'
export type Power = '内功' | '外功'
export type RadarMetricKey = 'difficulty' | 'ceiling' | 'pace' | 'mobility' | 'survivability' | 'utility'
export type MetricKey = RadarMetricKey | 'burst' | 'sustained'

// 门派 = 原版的“职业”，心法 = 原版的“专精”；字段名沿用 className / specName，方便复用评分引擎。
export interface SpecProfile {
  id: string
  className: string
  specName: string
  role: Role
  range: Range
  power: Power
  color: string
  metrics: Record<MetricKey, number>
  tags: string[]
  fantasy: string
  strengths: string
  weaknesses: string
}

export interface AnswerEffect {
  roles?: Role[]
  ranges?: Range[]
  tags?: string[]
  metrics?: Partial<Record<MetricKey, number>>
}

export interface QuestionOption {
  id: string
  label: string
  hint: string
  effect: AnswerEffect
  accent?: string
  swatches?: { label: string; color: string }[]
}

export interface ClassProfile {
  name: string
  key: string
  color: string
  weapon: string
  bodies: string
  intro: string
  identity: string
  strengths: string
  weaknesses: string
  versatility: number
}

export interface Question {
  id: string
  category: 'looks' | 'feel'
  slot: number
  group: string
  eyebrow: string
  title: string
  description: string
  options: QuestionOption[]
}

export type Answers = Record<string, string[]>

export interface RankedSpec extends SpecProfile {
  score: number
  match: number
  looksMatch: number
  feelMatch: number
  reasons: string[]
}

export interface RankedClass extends ClassProfile {
  match: number
  roles: string[]
  recommendedSpecs: string[]
  reason: string
}

export interface IndifferenceSummary {
  count: number
  total: number
  ratio: number
  isHigh: boolean
}

export type SinKey = 'pride' | 'greed' | 'lust' | 'envy' | 'wrath' | 'gluttony' | 'sloth'

// 七宗罪选项同时携带罪名分与玩法信号，推荐复用正式测试的评分引擎。
export interface SinOption extends QuestionOption {
  scores: Partial<Record<SinKey, number>>
}

export interface SinQuestion extends Question {
  context: '团本' | '日常' | '名剑大会' | '战场' | '家园' | '社交'
  options: SinOption[]
}

export interface SinProfile {
  key: SinKey
  name: string
  alias: string
  verdict: string
  playstyle: string
  taglines: string[]
}

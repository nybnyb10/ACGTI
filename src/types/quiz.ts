export type DimensionId =
  | 'expression'
  | 'temperature'
  | 'judgement'
  | 'order'
  | 'agency'
  | 'aura'

export type ArchetypeId =
  | 'luminous-lead'
  | 'icebound-observer'
  | 'oathbound-captain'
  | 'trickster-orbit'
  | 'gentle-healer'
  | 'shadow-strategist'
  | 'chaos-spark'
  | 'moonlit-guardian'

export interface QuestionOption {
  id: string
  label: string
  tone: string
  weights: Partial<Record<DimensionId, number>>
}

export interface Question {
  id: string
  prompt: string
  scene: string
  options: QuestionOption[]
}

export interface Archetype {
  id: ArchetypeId
  name: string
  subtitle: string
  oneLiner: string
  description: string
  tags: string[]
  narrativeRole: string
  spotlight: string
  weakness: string
  keywords: string[]
  accent: string
  vector: Record<DimensionId, number>
}

export interface CharacterMatch {
  id: string
  name: string
  series: string
  archetypeId: ArchetypeId
  tags: string[]
  note: string
  vector: Record<DimensionId, number>
}

export interface QuizRecord {
  answers: number[]
  createdAt: string
  result: QuizResult
}

export interface QuizResult {
  archetype: Archetype
  scores: Record<DimensionId, number>
  tags: string[]
  matchScore: number
  characterMatches: CharacterMatch[]
}

import type { Archetype, CharacterMatch, DimensionId, Question, QuizResult } from '../types/quiz'

const DIMENSIONS: DimensionId[] = ['expression', 'temperature', 'judgement', 'order', 'agency', 'aura']

function createEmptyScores() {
  return DIMENSIONS.reduce(
    (scores, dimension) => {
      scores[dimension] = 0
      return scores
    },
    {} as Record<DimensionId, number>,
  )
}

function clampAnswerIndex(answer: number, optionsLength: number) {
  if (!Number.isInteger(answer)) {
    return -1
  }

  if (answer < 0 || answer >= optionsLength) {
    return -1
  }

  return answer
}

function dotProduct(left: Record<DimensionId, number>, right: Record<DimensionId, number>) {
  return DIMENSIONS.reduce((sum, dimension) => sum + left[dimension] * right[dimension], 0)
}

function magnitude(vector: Record<DimensionId, number>) {
  return Math.sqrt(DIMENSIONS.reduce((sum, dimension) => sum + vector[dimension] ** 2, 0))
}

function cosineSimilarity(left: Record<DimensionId, number>, right: Record<DimensionId, number>) {
  const divisor = magnitude(left) * magnitude(right)

  if (divisor === 0) {
    return 0
  }

  return dotProduct(left, right) / divisor
}

function scoreToPercent(score: number) {
  return Math.max(0, Math.min(100, Math.round((score + 1) * 50)))
}

function buildNarrativeTags(scores: Record<DimensionId, number>, archetype: Archetype) {
  const ranked = DIMENSIONS.map((dimension) => ({
    dimension,
    score: scores[dimension],
  }))
    .sort((left, right) => Math.abs(right.score) - Math.abs(left.score))
    .slice(0, 4)

  const dimensionLabels: Record<DimensionId, string> = {
    expression: scores.expression >= 0 ? '外放系' : '收束系',
    temperature: scores.temperature >= 0 ? '热血系' : '冷感系',
    judgement: scores.judgement >= 0 ? '理性系' : '感性系',
    order: scores.order >= 0 ? '守序倾向' : '游离倾向',
    agency: scores.agency >= 0 ? '推进型' : '跟随型',
    aura: scores.aura >= 0 ? '危险感' : '治愈感',
  }

  return Array.from(
    new Set([
      archetype.tags[0],
      archetype.tags[1],
      ...ranked.map(({ dimension }) => dimensionLabels[dimension]),
    ]),
  ).slice(0, 6)
}

function rankCharacters(
  scores: Record<DimensionId, number>,
  characters: CharacterMatch[],
  archetypeId: string,
) {
  return [...characters]
    .map((character) => {
      const similarity = cosineSimilarity(scores, character.vector)
      const archetypeBonus = character.archetypeId === archetypeId ? 0.12 : 0
      const total = similarity + archetypeBonus

      return {
        character,
        total,
      }
    })
    .sort((left, right) => right.total - left.total || left.character.name.localeCompare(right.character.name, 'zh-Hans-CN'))
    .slice(0, 5)
    .map(({ character }) => character)
}

export function calculateQuizResult({
  answers,
  questions,
  archetypes,
  characters,
}: {
  answers: number[]
  questions: Question[]
  archetypes: Archetype[]
  characters: CharacterMatch[]
}): QuizResult {
  const scores = createEmptyScores()

  questions.forEach((question, questionIndex) => {
    const answerIndex = clampAnswerIndex(answers[questionIndex] ?? -1, question.options.length)

    if (answerIndex < 0) {
      return
    }

    const option = question.options[answerIndex]

    DIMENSIONS.forEach((dimension) => {
      scores[dimension] += option.weights[dimension] ?? 0
    })
  })

  const matchedArchetype =
    archetypes
      .map((archetype) => ({
        archetype,
        similarity: cosineSimilarity(scores, archetype.vector),
      }))
      .sort((left, right) => right.similarity - left.similarity || left.archetype.name.localeCompare(right.archetype.name, 'zh-Hans-CN'))[0]?.archetype ?? archetypes[0]

  const archetypeSimilarity =
    archetypes
      .map((archetype) => cosineSimilarity(scores, archetype.vector))
      .sort((left, right) => right - left)[0] ?? 0

  return {
    archetype: matchedArchetype,
    scores,
    tags: buildNarrativeTags(scores, matchedArchetype),
    matchScore: scoreToPercent(archetypeSimilarity),
    characterMatches: rankCharacters(scores, characters, matchedArchetype.id),
  }
}

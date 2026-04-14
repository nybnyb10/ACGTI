import characterProbabilitiesData from '../data/characterProbabilities.json' with { type: 'json' }

export type RarityTierId = 'mythic' | 'legendary' | 'epic' | 'rare' | 'common'

export interface CharacterRarityMeta {
  tier: RarityTierId
  rank: number
  total: number
  rarityIndex: number
  probability: number
  rarerThanPercent: number
}

const probabilityDataset = characterProbabilitiesData as {
  probabilities: Record<string, number>
}

const rankedCharacterIds = Object.entries(probabilityDataset.probabilities)
  .sort((left, right) => {
    if (left[1] !== right[1]) {
      return left[1] - right[1]
    }

    return left[0].localeCompare(right[0])
  })
  .map(([characterId]) => characterId)

const rankIndexMap = new Map(rankedCharacterIds.map((characterId, index) => [characterId, index]))
const totalCharacters = rankedCharacterIds.length

const rarityBuckets: Array<{ tier: RarityTierId; count: number }> = buildRarityBuckets(totalCharacters)

function buildRarityBuckets(total: number) {
  const bucketPlan: Array<{ tier: RarityTierId; ratio: number; minimum?: number }> = [
    { tier: 'mythic', ratio: 0.03, minimum: 1 },
    { tier: 'legendary', ratio: 0.08, minimum: 1 },
    { tier: 'epic', ratio: 0.17, minimum: 1 },
    { tier: 'rare', ratio: 0.3, minimum: 1 },
  ]

  const counts = bucketPlan.map((bucket) => Math.max(bucket.minimum ?? 0, Math.round(total * bucket.ratio)))
  const allocated = counts.reduce((sum, count) => sum + count, 0)

  if (allocated >= total) {
    const overflow = allocated - total + 1
    counts[counts.length - 1] = Math.max(1, counts[counts.length - 1] - overflow)
  }

  const commonCount = Math.max(1, total - counts.reduce((sum, count) => sum + count, 0))

  return [
    { tier: 'mythic' as const, count: counts[0] },
    { tier: 'legendary' as const, count: counts[1] },
    { tier: 'epic' as const, count: counts[2] },
    { tier: 'rare' as const, count: counts[3] },
    { tier: 'common' as const, count: commonCount },
  ]
}

function getRarityTierByRank(rank: number) {
  let cumulative = 0

  for (const bucket of rarityBuckets) {
    cumulative += bucket.count
    if (rank <= cumulative) {
      return bucket.tier
    }
  }

  return 'common'
}

function getRarityIndex(probability: number) {
  const safeProbability = Math.max(probability / 100, 0.000001)
  return Number((-Math.log2(safeProbability)).toFixed(1))
}

export function getCharacterRarityMeta(characterId: string | null | undefined): CharacterRarityMeta | null {
  if (!characterId) {
    return null
  }

  const rankIndex = rankIndexMap.get(characterId)
  if (rankIndex === undefined) {
    return null
  }

  const rank = rankIndex + 1
  const probability = probabilityDataset.probabilities[characterId] ?? 0

  return {
    tier: getRarityTierByRank(rank),
    rank,
    total: totalCharacters,
    rarityIndex: getRarityIndex(probability),
    probability,
    rarerThanPercent: totalCharacters > 1
      ? Math.round(((totalCharacters - rank) / (totalCharacters - 1)) * 100)
      : 0,
  }
}

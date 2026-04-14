import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { calculateQuizResult } from '../src/utils/quizEngine.ts'
import questions from '../src/data/questions.json' with { type: 'json' }
import archetypes from '../src/data/archetypes.json' with { type: 'json' }
import characters from '../src/data/characters.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outputPath = path.join(root, 'src/data/characterProbabilities.json')

function createRng(seed) {
  let state = seed >>> 0

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

const answerScale = [-3, -2, -1, 0, 1, 2, 3]
const seed = Number(process.argv[2] ?? 20260411)
const runs = Number(process.argv[3] ?? 200000)
const shouldWrite = process.argv.includes('--write')
const rng = createRng(seed)
const winnerCounts = new Map(characters.map((character) => [character.id, 0]))

for (let index = 0; index < runs; index += 1) {
  const answers = questions.map(() => answerScale[Math.floor(rng() * answerScale.length)])
  const result = calculateQuizResult({
    answers,
    questions,
    archetypes,
    characters,
  })
  const winnerId = result.featuredCharacter?.id
  if (winnerId) {
    winnerCounts.set(winnerId, (winnerCounts.get(winnerId) ?? 0) + 1)
  }
}

const probabilities = Object.fromEntries(
  [...winnerCounts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'en'))
    .map(([id, count]) => [
      id,
      Number(((count / runs) * 100).toFixed(4)),
    ])
)

const entries = [...winnerCounts.entries()]
  .sort((left, right) => right[1] - left[1])
  .map(([id, count]) => ({
    id,
    count,
    probability: probabilities[id],
  }))

const payload = {
  seed,
  runs,
  probabilities,
  entries,
}

if (shouldWrite) {
  fs.writeFileSync(
    outputPath,
    JSON.stringify({
      seed,
      runs,
      probabilities,
    }, null, 2) + '\n',
  )
  console.log(`Updated ${path.relative(root, outputPath)} with ${runs} runs (seed=${seed}).`)
} else {
  console.log(JSON.stringify(payload, null, 2))
}

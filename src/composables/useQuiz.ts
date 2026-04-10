import { computed, reactive, readonly } from 'vue'

import archetypesData from '../data/archetypes.json'
import charactersData from '../data/characters.json'
import questionsData from '../data/questions.json'
import type { Archetype, CharacterMatch, Question, QuizRecord, QuizResult } from '../types/quiz'
import { calculateQuizResult } from '../utils/quizEngine'
import { clearLastRecord, loadLastRecord, saveLastRecord } from '../utils/storage'

const questions = questionsData as Question[]
const archetypes = archetypesData as Archetype[]
const characters = charactersData as CharacterMatch[]

const emptyAnswers = () => Array.from({ length: questions.length }, () => -1)

const state = reactive({
  currentIndex: 0,
  answers: emptyAnswers(),
  latestRecord: loadLastRecord() as QuizRecord | null,
})

const currentQuestion = computed(() => questions[state.currentIndex] ?? null)
const selectedOptionIndex = computed(() => state.answers[state.currentIndex] ?? -1)
const progress = computed(() => (state.currentIndex + 1) / questions.length)
const answeredCount = computed(() => state.answers.filter((answer) => answer >= 0).length)
const canGoNext = computed(() => selectedOptionIndex.value >= 0)
const canGoPrev = computed(() => state.currentIndex > 0)
const isComplete = computed(() => state.answers.every((answer) => answer >= 0))
const latestResult = computed(() => state.latestRecord?.result ?? null)

function selectOption(optionIndex: number) {
  state.answers[state.currentIndex] = optionIndex
}

function goNext() {
  if (canGoNext.value && state.currentIndex < questions.length - 1) {
    state.currentIndex += 1
  }
}

function goPrev() {
  if (canGoPrev.value) {
    state.currentIndex -= 1
  }
}

function jumpToQuestion(index: number) {
  if (index >= 0 && index < questions.length) {
    state.currentIndex = index
  }
}

function resetQuiz(clearHistory = false) {
  state.currentIndex = 0
  state.answers = emptyAnswers()

  if (clearHistory) {
    state.latestRecord = null
    clearLastRecord()
  }
}

function finalizeQuiz(): QuizResult | null {
  if (!isComplete.value) {
    return null
  }

  const result = calculateQuizResult({
    answers: state.answers,
    questions,
    archetypes,
    characters,
  })

  const record: QuizRecord = {
    answers: [...state.answers],
    createdAt: new Date().toISOString(),
    result,
  }

  state.latestRecord = record
  saveLastRecord(record)

  return result
}

function resumeLastResult() {
  state.latestRecord = loadLastRecord()
}

export function useQuiz() {
  return {
    questions,
    archetypes,
    state: readonly(state),
    currentQuestion,
    selectedOptionIndex,
    progress,
    answeredCount,
    canGoNext,
    canGoPrev,
    isComplete,
    latestResult,
    selectOption,
    goNext,
    goPrev,
    jumpToQuestion,
    resetQuiz,
    finalizeQuiz,
    resumeLastResult,
  }
}

<template>
  <div class="page">
    <section class="panel stack">
      <ProgressBar :current="state.currentIndex + 1" :total="questions.length" :answered="answeredCount" />
      <div class="quiz-layout">
        <QuestionCard
          v-if="currentQuestion"
          :question="currentQuestion"
          :selected-index="selectedOptionIndex"
          @select="selectOption"
        />

        <aside class="quiz-side stack">
          <article class="stat-card">
            <h3>当前章回</h3>
            <p>{{ currentQuestion?.scene }}</p>
          </article>
          <article class="stat-card muted-panel">
            <h3>完成度</h3>
            <p>已回答 {{ answeredCount }} / {{ questions.length }} 题。</p>
          </article>
          <article class="stat-card">
            <h3>操作</h3>
            <p>选完当前题目后按下一题；最后一题完成后会生成结果并保存到本地。</p>
          </article>
        </aside>
      </div>

      <div class="actions quiz-actions">
        <button class="action-button secondary" type="button" :disabled="!canGoPrev" @click="goPrev">
          上一题
        </button>
        <button class="action-button secondary" type="button" :disabled="!canGoNext" @click="goNext">
          下一题
        </button>
        <button class="action-button primary" type="button" :disabled="selectedOptionIndex < 0" @click="handlePrimary">
          {{ isComplete ? '生成结果' : '保存并继续' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import ProgressBar from '../components/ProgressBar.vue'
import QuestionCard from '../components/QuestionCard.vue'
import { useQuiz } from '../composables/useQuiz'

const router = useRouter()
const {
  questions,
  state,
  currentQuestion,
  selectedOptionIndex,
  answeredCount,
  canGoNext,
  canGoPrev,
  isComplete,
  selectOption,
  goNext,
  goPrev,
  finalizeQuiz,
} = useQuiz()

function handlePrimary() {
  if (isComplete.value) {
    const result = finalizeQuiz()
    if (!result) return
    router.push({ name: 'result' })
    return
  }

  goNext()
}
</script>

<style scoped>
.quiz-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
  gap: 18px;
  margin-top: 20px;
}

.quiz-side {
  align-self: start;
}

.quiz-actions {
  justify-content: flex-end;
}

.quiz-actions .action-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 960px) {
  .quiz-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .quiz-actions {
    flex-direction: column;
  }
}
</style>

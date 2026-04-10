<template>
  <section class="panel question-card">
    <div class="question-head">
      <p class="eyebrow">剧情问题</p>
      <h1 class="section-title question-title">{{ question.prompt }}</h1>
      <p class="lead">{{ question.scene }}</p>
    </div>

    <div class="option-list">
      <button
        v-for="(option, index) in question.options"
        :key="option.id"
        type="button"
        class="option-button"
        :class="{ 'option-button-active': selectedIndex === index }"
        @click="$emit('select', index)"
      >
        <span class="option-label">{{ option.label }}</span>
        <span class="option-tone">{{ option.tone }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Question } from '../types/quiz'

defineProps<{
  question: Question
  selectedIndex: number
}>()

defineEmits<{
  select: [index: number]
}>()
</script>

<style scoped>
.question-card {
  display: grid;
  gap: 22px;
}

.question-head {
  max-width: 56rem;
}

.question-title {
  margin-bottom: 8px;
}

.option-list {
  display: grid;
  gap: 14px;
}

.option-button {
  width: 100%;
  display: grid;
  gap: 8px;
  padding: 20px 22px;
  text-align: left;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.06), transparent 58%),
    rgba(255, 255, 255, 0.02);
  color: inherit;
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
}

.option-button:hover,
.option-button-active {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(140deg, rgba(255, 111, 145, 0.12), rgba(110, 197, 255, 0.06) 70%),
    rgba(255, 255, 255, 0.05);
}

.option-label {
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.6;
}

.option-tone {
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .question-card {
    gap: 18px;
  }
}
</style>

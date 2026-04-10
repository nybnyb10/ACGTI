<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ResultSummary from '../components/ResultSummary.vue'
import { useQuiz } from '../composables/useQuiz'

const router = useRouter()
const quiz = useQuiz()
const result = computed(() => quiz.latestResult.value)

onMounted(() => {
  quiz.resumeLastResult()

  if (!quiz.latestResult.value) {
    void router.replace('/quiz')
  }
})

function retry() {
  quiz.resetQuiz()
  void router.push('/quiz')
}
</script>

<template>
  <div class="page-stack compact" v-if="result">
    <ResultSummary :result="result" />

    <section class="panel center">
      <p class="lead">最近一次测试结果已经保存在本地浏览器中，你可以直接重测，也可以稍后回来继续查看。</p>
      <div class="cta-row" style="justify-content: center; margin-top: 18px;">
        <button class="button button-primary" type="button" @click="retry">再测一次</button>
        <RouterLink class="button button-secondary" to="/about">查看项目说明</RouterLink>
      </div>
    </section>
  </div>
</template>

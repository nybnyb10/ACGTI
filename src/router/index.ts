import { createRouter, createWebHashHistory } from 'vue-router'

import AboutPage from '../pages/AboutPage.vue'
import HomePage from '../pages/HomePage.vue'
import IntroPage from '../pages/IntroPage.vue'
import QuizPage from '../pages/QuizPage.vue'
import ResultPage from '../pages/ResultPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/intro', name: 'intro', component: IntroPage },
    { path: '/quiz', name: 'quiz', component: QuizPage },
    { path: '/result', name: 'result', component: ResultPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

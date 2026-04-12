import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initI18n } from './i18n'

initI18n()
const app = createApp(App)

let revealObserver: IntersectionObserver | null = null
let revealDelay = 0
let resetDelayTimeout: ReturnType<typeof setTimeout> | null = null

const getRevealObserver = () => {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting)
      
      // 按从上到下、从左到右排序
      intersecting.sort((a, b) => {
        const topDiff = a.boundingClientRect.top - b.boundingClientRect.top
        if (Math.abs(topDiff) > 20) return topDiff
        return a.boundingClientRect.left - b.boundingClientRect.left
      })

      intersecting.forEach(entry => {
        const el = entry.target as HTMLElement
        if (revealDelay > 0) {
          el.style.animationDelay = `${revealDelay}ms`
        }
        el.classList.add('reveal-active')
        revealObserver!.unobserve(el)
        revealDelay += 30 // 60ms stagger per item
      })

      if (resetDelayTimeout) clearTimeout(resetDelayTimeout)
      resetDelayTimeout = setTimeout(() => {
        revealDelay = 0
      }, 100)
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })
  }
  return revealObserver
}

app.directive('reveal', {
  mounted(el: HTMLElement) {
    el.classList.add('reveal-init')
    getRevealObserver().observe(el)
  },
  unmounted(el: HTMLElement) {
    if (revealObserver) {
      revealObserver.unobserve(el)
    }
  }
})

app.use(router).mount('#app')


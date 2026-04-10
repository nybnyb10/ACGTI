<template>
  <div class="site-shell">
    <div class="site-backdrop site-backdrop-left"></div>
    <div class="site-backdrop site-backdrop-right"></div>

    <header class="site-header">
      <RouterLink class="brand-lockup" to="/">
        <span class="brand-kicker">叙事人格测试</span>
        <span class="brand-mark">ACGTI</span>
        <span class="brand-copy">ACG Type Indicator</span>
      </RouterLink>

      <nav class="site-nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/intro">测试说明</RouterLink>
        <RouterLink to="/quiz">开始测试</RouterLink>
        <RouterLink to="/about">关于项目</RouterLink>
      </nav>
    </header>

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>

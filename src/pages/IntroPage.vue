<template>
  <div class="page-stack compact">
    <section class="hero-panel center">
      <p class="eyebrow">测试说明</p>
      <h1 class="display-title">这是角色原型测试，不是心理诊断。</h1>
      <p class="lead">
        你会回答 16 道带有剧情感的小问题。系统会先算出你的叙事向量，再匹配 1 个主原型和 5 个相似角色。
      </p>
      <div class="cta-row" style="justify-content: center;">
        <RouterLink class="button button-primary" to="/quiz">直接开始</RouterLink>
      </div>
    </section>

    <section class="split-grid">
      <article class="panel">
        <h2 class="section-title">结果会告诉你什么</h2>
        <div class="meta-list">
          <div class="meta-item">
            <span class="label">主原型</span>
            <p class="value">你在二次元叙事里更像哪一种角色气质。</p>
          </div>
          <div class="meta-item">
            <span class="label">剧情位置</span>
            <p class="value">你更像主角团里的谁，通常负责什么功能。</p>
          </div>
          <div class="meta-item">
            <span class="label">角色匹配</span>
            <p class="value">系统会返回 3 个同原型角色和 2 个跨原型惊喜匹配。</p>
          </div>
        </div>
      </article>

      <article class="panel">
        <h2 class="section-title">六条叙事维度</h2>
        <div class="pill-row">
          <span class="pill">外放 / 收束</span>
          <span class="pill">热血 / 冷感</span>
          <span class="pill">理性 / 共感</span>
          <span class="pill">秩序 / 游离</span>
          <span class="pill">主动 / 被动</span>
          <span class="pill">危险 / 治愈</span>
        </div>
      </article>
    </section>
  </div>
</template>

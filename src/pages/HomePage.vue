<template>
  <div class="page-stack">
    <section class="hero-panel">
      <div class="hero-grid">
        <div class="page-stack">
          <div>
            <p class="eyebrow">ACG Type Indicator</p>
            <h1 class="display-title">测的不是现实人格，是你在番剧里的角色原型。</h1>
          </div>
          <p class="lead">
            ACGTI 是一个面向二次元语境的娱乐型角色测试。它不试图定义“真实的你”，而是判断你在故事里更接近什么气质、什么剧情位置、又最像哪些知名角色。
          </p>
          <div class="cta-row">
            <RouterLink class="button button-primary" to="/quiz">开始测试</RouterLink>
            <RouterLink class="button button-secondary" to="/intro">先看说明</RouterLink>
          </div>
        </div>

        <div class="page-stack">
          <div class="panel">
            <span class="label">第一版规格</span>
            <div class="meta-list">
              <div class="meta-item">
                <p class="value">16 道剧情题</p>
              </div>
              <div class="meta-item">
                <p class="value">8 个角色原型</p>
              </div>
              <div class="meta-item">
                <p class="value">Top 5 角色匹配</p>
              </div>
            </div>
          </div>
          <div class="accent-frame">
            <p class="body-copy">
              结果页会给出主原型、剧情位置、脆弱点、高光时刻，以及你最像的几位知名角色。适合截图，也适合后续继续扩充角色库。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="card-grid">
      <article class="panel">
        <p class="eyebrow">不是 MBTI 套皮</p>
        <h2 class="section-title">角色气质优先</h2>
        <p class="body-copy">
          输出重点是“角色原型”“叙事位置”“剧情功能”，不会把你写成现实世界里的严肃人格结论。
        </p>
      </article>
      <article class="panel">
        <p class="eyebrow">先做作品</p>
        <h2 class="section-title">静态站即可上线</h2>
        <p class="body-copy">
          题库、原型和角色库全部走本地数据，结果保存在 localStorage，天然适合 GitHub Pages。
        </p>
      </article>
      <article class="panel">
        <p class="eyebrow">分享驱动</p>
        <h2 class="section-title">结果页才是核心</h2>
        <p class="body-copy">
          不是做大而全的平台，而是先把“测完像被看穿”和“愿意截图”这两件事做强。
        </p>
      </article>
    </section>
  </div>
</template>

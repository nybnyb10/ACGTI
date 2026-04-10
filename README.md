# ACGTI

ACGTI = `ACG Type Indicator`。

这是一个面向二次元语境的娱乐型角色原型测试站点。它测的不是现实人格，而是你在 ACG 叙事里更接近哪种角色原型、剧情位置和气质标签。

## 当前版本

- 纯静态前端：`Vue 3 + TypeScript + Vite + Vue Router`
- 数据驱动：题库、原型库、角色库都存放在本地 JSON
- 核心闭环：做题 -> 算分 -> 原型匹配 -> 角色匹配 -> 本地保存结果
- 部署方向：GitHub Pages

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 内容结构

- `src/data/questions.json`：16 道剧情式问题
- `src/data/archetypes.json`：8 个角色原型
- `src/data/characters.json`：角色匹配库
- `src/utils/quizEngine.ts`：向量累加、原型匹配、角色匹配逻辑

## 产品边界

- 不作为心理诊断、医学评估或现实人格结论使用
- 结果优先作为角色卡、娱乐测试和分享内容阅读

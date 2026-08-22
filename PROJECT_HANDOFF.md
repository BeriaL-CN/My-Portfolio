# My Portfolio - Project Handoff

> Updated: 2026-08-22  
> Branch: `main`  
> Baseline commit before this document: `b5efa9a` (`Add Pokeball favicon`)  
> Worktree status before this document: clean

## 1. Project Snapshot

This is a React 19 + Vite portfolio with two presentation modes:

- A responsive 2D portfolio with project cards and media previews.
- A React Three Fiber 3D Pokemon Center scene with a controllable character and interactive Pokeball project markers.

The production site is published to GitHub Pages at:

- <https://berial-cn.github.io/My-Portfolio/>

Primary verification commands:

```bash
npm run lint
npm run build
```

Latest verification on 2026-08-22:

- `npm run lint`: passed.
- `npm run build`: passed.
- Remaining warning: the Three.js vendor chunk is larger than Vite's 500 kB warning threshold.

Latest SEO update on 2026-07-20:

- GitHub Pages can expose this public static site to search engines if repository/pages visibility allows crawling.
- `index.html` now includes canonical URL, title, description, robots meta, Open Graph/X preview metadata, JSON-LD Person/project structured data, and a `<noscript>` portfolio summary without detailed location metadata.
- `public/robots.txt` allows crawler access and points to `public/sitemap.xml`.
- `public/sitemap.xml` publishes the canonical GitHub Pages project route.
- Google Search Console file verification was added on 2026-08-19 at `public/google80921134db668829.html`; keep the filename and contents unchanged while ownership verification is in use.
- The Search Console verification file was deployed to GitHub Pages on 2026-08-19 and confirmed live at the expected project URL; `sitemap.xml` was also confirmed reachable.
- `src/data/public_resume_data.json` is now the only bundled portfolio resume data file.
- The previous `src/data/resume_data_jiepeng_huang.json` file was removed from the project to avoid keeping a file that reads like the full private resume source.
- The Digital Resume repository is expected to be private again, so remote raw fetching should not be treated as a reliable deployment dependency.
- `scripts/syncResumeData.mjs` still strips phone, visa, street/suburb, and postcode fields, but it is now an optional local/manual refresh helper rather than part of deployment.
- Latest public resume data refresh on 2026-08-22: `src/data/public_resume_data.json` was regenerated from the local private Digital Resume JSON and sanitized before commit.
- The latest data refresh added the United Fortune Financial ICT Support Technician internship entry and updated the China Telecom date range.

Latest career experience update on 2026-07-20:

- `src/data/portfolioData.js` now adapts technical work entries from `public_resume_data.json.work` into shared `experienceData`.
- The 2D portfolio now includes an Experience section between About and Projects.
- The 3D scene now uses a manual coordinate near the Pokemon Center `PC_02` computer as a glowing Career terminal for opening technical experience details.
- Project details and career details are mutually exclusive overlays, and both are cleared when leaving 3D.
- The 2D Experience timeline rail and markers are aligned through shared CSS variables.
- The 2D navigation highlight is scroll-position driven so Experience and Projects activate correctly during manual scrolling.

Deployment command:

```bash
npm run deploy
```

## 2. Key Decisions

### Portfolio data

- Profile, contact, and project copy are driven by `src/data/public_resume_data.json` rather than duplicated in components.
- Technical career experience is also adapted from `src/data/public_resume_data.json`; the portfolio intentionally filters it to software/web/IT-relevant roles instead of showing every work entry.
- Keep the full Digital Resume source out of this repository. If data needs to be refreshed, copy or pull `resume_data_jiepeng_huang.json` from the private Digital Resume project first, then sanitize it before replacing `public_resume_data.json`.
- Only three featured projects are shown. Their names must exactly match `featuredProjectNames` in `src/data/portfolioData.js`:
  - `VR Architectural Interaction Prototype`
  - `Food Map: Containerized Full-Stack Platform`
  - `UQ Hackathon - The Centenarian`
- Portfolio-only media stays in `projectPreviews`; it is intentionally not stored in the shared resume repository.
- Missing featured projects or GitHub links fail validation during build instead of silently hiding content.

### Resume synchronization and deployment

- Runtime is static: `App.jsx` uses the bundled `fallbackPortfolioViewData`.
- `npm run sync:resume` is optional. It can download the latest resume JSON from `BeriaL-CN/digital_resume`, sanitize it, and replace the bundled public JSON when the raw source is accessible.
- Remote source if temporarily public or locally authenticated: `https://raw.githubusercontent.com/BeriaL-CN/digital_resume/main/resume_data_jiepeng_huang.json`.
- Because Digital Resume is expected to be private, the preferred update path is manual copy/pull from the local Digital Resume project, then sanitize and update `src/data/public_resume_data.json`.
- `predeploy` now only runs the build. It does not automatically pull remote resume data.
- `gh-pages` publishes `dist` to the `gh-pages` branch after the build succeeds.
- There is currently no active `.github/workflows` deployment workflow; deployment is script-driven.

### 2D media previews

- Desktop project previews open as a fixed floating panel after the first hover position is captured.
- The floating panel does not follow subsequent mouse movement, so the user can move into it and click media.
- The panel is horizontally placed near the cursor with a 5 px gap and vertically anchored at `top: 120px`.
- The panel closes when the pointer leaves both the project card and its floating preview.
- Mobile does not use hover. Media is rendered inline in the card instead.
- Images open their original files in a new tab. YouTube links use thumbnails; GitHub-hosted video assets use `<video>` where possible and retain direct links.

### 3D exit behavior

- Returning from 3D to 2D is based on the rendered Pokemon Center GLB bounds, not a hand-authored door trigger.
- `PokemonCenter.jsx` calculates a Three.js `Box3` after model transforms are applied.
- `ThreeDScene.jsx` checks only the player's world-space `x/z` position against that footprint, with `0.2` padding.
- Exit is allowed only after the player has been inside the bounds once, preventing an immediate exit while the model loads.
- Both automatic boundary exit and the bottom-left view toggle use `handleExitTo2D`, which clears the selected project and joystick input.

### Career experience UX

- 2D experience uses a vertical, game-log style timeline that matches the existing beige/brown Pokemon Center card language.
- Only technical roles are shown: FABC Accounting, 28 Tattoo Studio, Deeproot Australia, HD Education, and China Telecom.
- 3D experience is not a separate board. It is manually positioned on the existing in-scene `PC_02` as a glowing terminal with a larger pulsing ring and stronger screen flicker.
- The Career terminal opens with Space on desktop or click/tap on mobile.
- The fixed far-away `Career` label was removed; only the proximity prompt is shown.
- Project and career overlays must remain mutually exclusive so the 3D canvas does not stack modals.

### Public assets

- All public asset URLs use `assetPath()` so GitHub Pages' `/My-Portfolio/` base path works correctly.
- GLB assets remain in `public/models/`; portfolio screenshots remain in `public/previews/`.

## 3. Completed Work

### Project previews

- VR Construction:
  - YouTube demo: <https://youtu.be/mSP4Lys0c1E>
  - YouTube thumbnail used as the visual preview.
- Food Map:
  - Four screenshots added under `public/previews/fruit-map/`.
  - Mobile and desktop users can open the original images.
- The Centenarian:
  - Gameplay/controller screenshot added under `public/previews/centenarian/`.
  - Three GitHub asset demo links retained.

### Project copy

- Fruit Map was renamed to Food Map.
- Food Map description was updated to reflect an interactive food map and nutrition comparison platform.
- The Centenarian copy now emphasizes the People's Choice Award, Unity/Arduino project context, and the user's actual responsibility for bullet mechanics and part of the UI.
- Unsupported claims such as `<80ms latency` were removed from project highlights.

### UI and interaction

- 2D project cards render resume highlights as bullet lists.
- Desktop floating previews support clickable images and videos.
- Mobile previews render inline and support tap-to-open original screenshots.
- 3D project details render the same images/videos as the 2D cards.
- Walking outside the Pokemon Center model footprint returns to 2D.
- Mobile 3D navigation still uses the existing virtual joystick.
- Pokeball favicon was added in commit `b5efa9a`.

### Documentation and code quality

- README was updated in English and Chinese for previews, data sync, deployment, and 3D exit behavior.
- Comments were added around non-obvious preview, asset-path, resume-adapter, and GLB-boundary behavior.
- The implemented feature set passed both `npm run lint` and `npm run build` during the work session.

## 4. Current Files and Ownership

| Area | Important files | Notes |
|---|---|---|
| App state and view switching | `src/App.jsx` | Owns 2D/3D mode, selected project, joystick state, and shared exit path. |
| Resume adapter and preview metadata | `src/data/portfolioData.js` | Featured project names, technical experience filtering, validation, 3D marker mapping, media metadata. |
| Bundled resume fallback | `src/data/public_resume_data.json` | Public-safe portfolio data imported by `portfolioData.js`. |
| Resume sync | `scripts/syncResumeData.mjs` | Optional helper that downloads, validates, sanitizes, and writes the public local JSON. |
| 2D preview interaction | `src/components/2d/ProjectCard.jsx` | Floating desktop panel and inline mobile media. |
| 2D career experience | `src/components/2d/ExperienceSection.jsx` | Technical work timeline sourced from shared `experienceData`; marker/rail alignment is controlled in CSS variables. |
| 2D preview styling | `src/components/2d/Portfolio2D.css` | Desktop/mobile preview behavior and responsive layout. |
| 3D details preview | `src/components/3d/ProjectDetailsPanel.jsx` | Shared image/video presentation in 3D. |
| 3D career terminal | `src/components/3d/CareerComputer.jsx`, `src/components/3d/ExperienceDetailsPanel.jsx` | Manually anchored PC_02 glowing interaction and fixed-close career details overlay. |
| 3D scene boundary | `src/components/3d/PokemonCenter.jsx`, `src/components/3d/ThreeDScene.jsx` | Computes model bounds and triggers exit. |
| Player movement/collision | `src/components/3d/Player.jsx` | TPS camera, keyboard/joystick movement, collision rays. |
| Project markers | `src/components/3d/ProjectMarker.jsx` | Proximity, Space/click interaction, Pokeball model selection. |
| Base-aware assets | `src/utils/assetPath.js` | Required for GitHub Pages public paths. |
| Static media | `public/models/`, `public/previews/`, `public/pokeball.svg` | GLBs, screenshots, favicon. |
| Search metadata | `index.html`, `public/robots.txt`, `public/sitemap.xml` | Static SEO shell, crawler policy, and sitemap for GitHub Pages. |
| User-facing documentation | `README.md` | Bilingual overview, usage, and deployment. |

### Files changed during this session

| Group | Files |
|---|---|
| Career experience | `src/data/portfolioData.js`, `src/components/2d/ExperienceSection.jsx`, `src/components/2d/Portfolio2D.jsx`, `src/components/2d/PortfolioHeader.jsx`, `src/components/2d/Portfolio2D.css`, `src/components/3d/CareerComputer.jsx`, `src/components/3d/ExperienceDetailsPanel.jsx`, `src/components/3d/ThreeDScene.jsx`, `src/App.jsx` |
| Shared data and deployment | `src/data/public_resume_data.json`, `src/data/portfolioData.js`, `scripts/syncResumeData.mjs`, `package.json` |
| App data flow and view switching | `src/App.jsx`, `src/components/2d/Portfolio2D.jsx`, `src/components/2d/PortfolioHeader.jsx`, `src/components/2d/HomeSection.jsx`, `src/components/2d/ContactSection.jsx` |
| 2D project details and responsive styling | `src/components/2d/ProjectCard.jsx`, `src/components/2d/Portfolio2D.css` |
| 3D loading, interaction, and details | `src/components/3d/PokemonCenter.jsx`, `src/components/3d/Player.jsx`, `src/components/3d/ProjectMarker.jsx`, `src/components/3d/ThreeDScene.jsx`, `src/components/3d/ProjectDetailsPanel.jsx` |
| GitHub Pages asset paths | `src/utils/assetPath.js`, `vite.config.js` |
| Preview and favicon assets | `public/previews/fruit-map/*`, `public/previews/centenarian/gameplay-cockpit.png`, `public/pokeball.svg`, `index.html` |
| SEO static entry points | `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| Documentation | `README.md`, `PROJECT_HANDOFF.md` |

## 5. Pending Work and Known Risks

There are no known required code changes left from the requests in this session. The following are recommended validation or improvement tasks:

1. **Visual browser QA**
   - Verify desktop floating previews at narrow and wide viewports.
   - Confirm the fixed `top: 120px` placement is comfortable at all common laptop heights.
   - Confirm moving from a card into the fixed panel does not close it prematurely.

2. **3D boundary QA**
   - Walk toward every edge/door of the Pokemon Center and confirm the `Box3` footprint matches the intended playable area.
   - If decorative geometry makes the bounding box too large, replace the full-model bounds with selected floor meshes or an explicit polygon footprint.

3. **3D Career terminal QA**
   - Verify the glow is visually attached to the intended PC in both desktop and mobile 3D views.
   - If the glow is visually awkward, adjust `CAREER_COMPUTER_POSITION` in `CareerComputer.jsx`; current target is `PC_02`.

4. **External media reliability**
   - YouTube thumbnails and GitHub asset videos depend on external hosting and network availability.
   - If reliability becomes important, store approved thumbnails locally and keep external links only for playback.

5. **Build size**
   - Vite reports the Three.js vendor chunk above 500 kB. This is currently a warning, not a failure.
   - Consider lazy-loading the 3D view if initial 2D load performance becomes a concern.

6. **Resume sync compatibility**
   - Renaming any featured project in `digital_resume` will break exact-name matching and intentionally fail the build.
   - Update `featuredProjectNames` and the corresponding `projectPreviews` key together when a project name changes.
   - Deployment no longer auto-syncs remote resume data, so remember to manually refresh and sanitize `src/data/public_resume_data.json` when Digital Resume changes should appear here.

## 6. Recommended Next Steps

1. Run `npm install` only if dependencies are missing, then run `npm run lint` and `npm run build`.
2. Start the site with `npm run dev` and perform desktop/mobile visual QA of the 2D previews.
3. Test the 3D bounds exit with keyboard and virtual joystick input.
4. Test the 3D Career terminal near the in-scene PC and confirm it does not overlap the project marker flow.
5. Check external video links in a deployed GitHub Pages build, where browser redirect/CORS behavior may differ from local development.
6. If behavior is accepted, keep this handoff updated whenever preview positioning, featured project names, career role filtering, or deployment sync changes.
7. After the next deployment, verify `https://berial-cn.github.io/My-Portfolio/google80921134db668829.html`, complete ownership verification in Google Search Console, and submit `https://berial-cn.github.io/My-Portfolio/sitemap.xml`.
8. If stronger privacy is desired, replace the visible email contact with a form or a non-primary alias before the next deployment.
9. When updating resume content, manually pull/copy from the Digital Resume project, sanitize private fields, then update `src/data/public_resume_data.json`.

## 7. Useful Commands

```bash
# Local development
npm run dev

# Static checks
npm run lint
npm run build

# Optional manual refresh if the Digital Resume raw JSON is accessible
npm run sync:resume

# Build and deploy to gh-pages
npm run deploy
```

## 8. Git Reference

Recent relevant commits:

- `b5efa9a` - Add Pokeball favicon
- `0df5536` - Restore gh-pages deployment with resume sync
- `5487b68` - Add resume-driven portfolio previews and deployment sync

The worktree was clean before this handoff document was added. This document itself is the only new change introduced by the handoff task.

---

# My Portfolio - 项目交接文档（中文）

> 更新日期：2026-07-20  
> 分支：`main`  
> 本文档创建前基线提交：`b5efa9a`（`Add Pokeball favicon`）  
> 本文档创建前工作区状态：clean

## 1. 项目概览

这是一个 React 19 + Vite 作品集项目，目前有两种展示模式：

- 响应式 2D 作品集页面，包含项目卡片和媒体预览。
- React Three Fiber 实现的 3D 宝可梦中心场景，包含可控制人物和精灵球项目标记。

线上站点发布在 GitHub Pages：

- <https://berial-cn.github.io/My-Portfolio/>

主要验证命令：

```bash
npm run lint
npm run build
```

最近验证结果：

- `npm run lint`：通过。
- `npm run build`：通过。
- 仍有一个 Vite warning：Three.js vendor chunk 超过 500 kB。这是体积提示，不是构建失败。

最近 SEO 和隐私更新：

- `index.html` 已加入 canonical URL、标题、description、robots meta、Open Graph/X metadata、JSON-LD Person/project 结构化数据，以及 `<noscript>` 的作品集摘要。
- `<noscript>` 摘要没有包含详细地址等敏感位置数据。
- `public/robots.txt` 允许 crawler 访问，并指向 `public/sitemap.xml`。
- `public/sitemap.xml` 发布 GitHub Pages 的 canonical 项目路径。
- 2026-08-19 已加入 Google Search Console 文件验证入口 `public/google80921134db668829.html`；所有权验证仍在使用期间不要修改文件名或内容。
- 该验证文件已于 2026-08-19 发布到 GitHub Pages，并确认可从预期项目 URL 访问；`sitemap.xml` 也已确认在线。
- `src/data/public_resume_data.json` 是当前唯一会被作品集打包的履历数据文件。
- 旧的 `src/data/resume_data_jiepeng_huang.json` 已从项目中删除，避免在 portfolio 仓库中保留看起来像完整私有履历源的数据文件。
- Digital Resume 仓库会改回 private，因此不要把远程 raw JSON 当作部署依赖。
- `scripts/syncResumeData.mjs` 仍会删除 phone、visa、街道/区级地址和邮编字段，但它现在只是可选的本地/手动辅助工具，不属于部署流程。
- 最近一次脱敏数据刷新：2026-08-22，`src/data/public_resume_data.json` 已从本地 private Digital Resume JSON 重新生成，并在提交前完成脱敏。
- 本次数据刷新新增 United Fortune Financial 的 ICT Support Technician 实习经历，并更新了 China Telecom 的日期范围。

最近职业经历更新：

- `src/data/portfolioData.js` 现在会把 `public_resume_data.json.work` 中的技术相关经历适配成共享的 `experienceData`。
- 2D 页面在 About 和 Projects 之间新增 Experience 板块。
- 3D 场景使用手动坐标定位到 Pokemon Center 现有 `PC_02` 电脑附近，作为带发光提示的 Career 终端。
- 项目详情和职业经历详情互斥显示；离开 3D 时会同时清理这两种浮层。
- 2D Experience 时间线的圆点和竖线已经改为通过 CSS 变量共享中心点来对齐。
- 2D 导航高亮改为基于滚动位置计算，Experience 和 Projects 在手动滚动时会正确激活。

部署命令：

```bash
npm run deploy
```

## 2. 关键决策

### 作品集数据

- 个人简介、联系方式和项目文案来自 `src/data/public_resume_data.json`，组件中不再重复维护这些内容。
- 技术职业经历也来自 `src/data/public_resume_data.json`，作品集会刻意筛选软件/Web/IT 相关经历，而不是展示完整 work 列表。
- 完整 Digital Resume 源数据不要放进这个仓库。需要更新时，先从 private Digital Resume 项目里手动 copy/pull `resume_data_jiepeng_huang.json`，脱敏后再替换 `src/data/public_resume_data.json`。
- 当前只展示 3 个 featured projects，它们的名称必须和 `src/data/portfolioData.js` 中的 `featuredProjectNames` 完全一致：
  - `VR Architectural Interaction Prototype`
  - `Food Map: Containerized Full-Stack Platform`
  - `UQ Hackathon - The Centenarian`
- 作品集专用媒体配置继续留在 `projectPreviews`，不会写进共享履历 JSON。
- featured project 或 GitHub link 缺失时，构建会主动失败，避免页面静默少内容或 GitHub 按钮消失。

### 履历同步和部署

- 运行时是静态的：`App.jsx` 使用 bundled 的 `fallbackPortfolioViewData`。
- `npm run sync:resume` 是可选工具。只有当 raw source 可访问时，它才能从 `BeriaL-CN/digital_resume` 下载、脱敏并替换本地 public JSON。
- 如果 Digital Resume 已改回 private，推荐流程是手动从本地 Digital Resume 项目复制/拉取 JSON，脱敏后更新 `src/data/public_resume_data.json`。
- `predeploy` 现在只执行 build，不会自动拉远程履历数据。
- `gh-pages` 在 build 成功后把 `dist` 发布到 `gh-pages` 分支。
- 当前没有启用 `.github/workflows` 部署 workflow；部署由 npm script 驱动。

### 2D 媒体预览

- 桌面端项目预览在首次 hover 时记录鼠标位置，并打开固定浮动面板。
- 浮动面板不会继续跟随鼠标，这样用户可以移动进去点击图片或视频。
- 面板水平位置靠近鼠标，间距约 5px，垂直固定在 `top: 120px`。
- 鼠标离开项目卡片和浮动预览面板后，面板才关闭。
- 移动端不使用 hover，媒体预览直接内嵌在卡片中。
- 图片会在新标签页打开原图；YouTube 使用缩略图链接；GitHub-hosted video 在可行时用 `<video>`，同时保留 direct link。

### 3D 返回 2D 行为

- 从 3D 返回 2D 基于渲染后的 Pokemon Center GLB 边界，不是手写门口 trigger。
- `PokemonCenter.jsx` 在模型 transform 应用后计算 Three.js `Box3`。
- `ThreeDScene.jsx` 只根据玩家世界坐标的 `x/z` 判断是否离开 footprint，并带 `0.2` padding。
- 只有玩家曾经进入过模型边界后才允许自动退出，避免模型加载阶段误触发。
- 自动边界退出和左下角视图切换按钮都走 `handleExitTo2D`，会清理选中项目和 joystick 输入。

### 职业经历交互

- 2D 职业经历使用竖向任务日志式时间线，并沿用现有米色/棕色 Pokemon Center 卡片语言。
- 当前只展示技术主线经历：FABC Accounting、28 Tattoo Studio、Deeproot Australia、HD Education 和 China Telecom。
- 3D 职业经历不使用独立公告板，而是手动定位到场景已有 `PC_02` 电脑上，显示发光屏幕、放大的脉冲环和靠近提示。
- 桌面端靠近 Career 终端后按 Space 打开；移动端可点击/轻触终端打开。
- 远距离固定 `Career` 标签已移除，只保留靠近后的交互提示。
- 项目详情和职业经历详情必须保持互斥，避免 3D canvas 上堆叠多个面板。

### Public 资源

- 所有 public asset URL 都通过 `assetPath()` 生成，确保 GitHub Pages 的 `/My-Portfolio/` base path 正常。
- GLB 模型放在 `public/models/`。
- 项目截图放在 `public/previews/`。

## 3. 已完成工作

### 项目预览

- VR Construction：
  - YouTube demo：<https://youtu.be/mSP4Lys0c1E>
  - 使用 YouTube thumbnail 作为可视预览。
- Food Map：
  - 4 张截图已加入 `public/previews/fruit-map/`。
  - 桌面端和移动端都可以打开原图。
- The Centenarian：
  - 游戏/控制器截图已加入 `public/previews/centenarian/`。
  - 保留 3 个 GitHub asset demo 链接。

### 项目文案

- Fruit Map 已改名为 Food Map。
- Food Map 描述更新为 interactive food map 和 nutrition comparison platform。
- The Centenarian 文案现在强调 People's Choice Award、Unity/Arduino 项目背景，以及用户负责 bullet mechanics 和部分 UI。
- 已移除无法确认或不适合展示的 `<80ms latency` 等表述。

### UI 和交互

- 2D 项目卡片把 resume highlights 渲染为项目符号列表。
- 桌面端浮动预览支持点击图片和视频。
- 移动端预览内嵌在卡片中，并支持点击截图查看原图。
- 3D 项目详情面板复用和 2D 相同的图片/视频数据。
- 玩家走出 Pokemon Center 模型 footprint 后自动回到 2D。
- 移动端 3D 导航继续使用已有 virtual joystick。
- 标签页图标已换成精灵球 favicon，提交为 `b5efa9a`。

### 文档和代码质量

- README 已用英文和中文说明预览、数据源、部署、3D 退出行为。
- 非显而易见的 preview、asset path、resume adapter、GLB boundary 行为附近已添加代码注释。
- 本轮工作中执行过 `npm run lint` 和 `npm run build`，均通过。

## 4. 当前文件职责

| 区域 | 关键文件 | 说明 |
|---|---|---|
| 应用状态和视图切换 | `src/App.jsx` | 管理 2D/3D 模式、选中项目、joystick 状态和统一退出路径。 |
| 履历适配和预览元数据 | `src/data/portfolioData.js` | featured project 名称、校验、3D marker 映射、媒体元数据。 |
| 打包履历数据 | `src/data/public_resume_data.json` | 脱敏后的 portfolio 数据，由 `portfolioData.js` import。 |
| 履历同步辅助 | `scripts/syncResumeData.mjs` | 可选工具：下载、校验、脱敏并写入本地 public JSON；private repo 下不一定可用。 |
| 2D 预览交互 | `src/components/2d/ProjectCard.jsx` | 桌面浮动预览和移动端内嵌媒体。 |
| 2D 预览样式 | `src/components/2d/Portfolio2D.css` | 桌面/移动预览行为和响应式布局。 |
| 3D 详情预览 | `src/components/3d/ProjectDetailsPanel.jsx` | 3D 面板中的图片/视频展示。 |
| 3D 场景边界 | `src/components/3d/PokemonCenter.jsx`, `src/components/3d/ThreeDScene.jsx` | 计算模型边界并触发退出。 |
| 玩家移动/碰撞 | `src/components/3d/Player.jsx` | TPS camera、键盘/joystick 移动、碰撞射线。 |
| 项目标记 | `src/components/3d/ProjectMarker.jsx` | 接近提示、Space/click 交互、精灵球模型选择。 |
| GitHub Pages asset path | `src/utils/assetPath.js` | public 资源路径必须通过它适配 base URL。 |
| 静态媒体 | `public/models/`, `public/previews/`, `public/pokeball.svg` | GLB、截图和 favicon。 |
| 搜索元数据 | `index.html`, `public/robots.txt`, `public/sitemap.xml` | 静态 SEO shell、crawler policy、sitemap。 |
| 用户文档 | `README.md` | 中英文项目说明、使用和部署。 |

### 本会话涉及文件

| 分组 | 文件 |
|---|---|
| 共享数据和部署 | `src/data/public_resume_data.json`, `src/data/portfolioData.js`, `scripts/syncResumeData.mjs`, `package.json` |
| 应用数据流和视图切换 | `src/App.jsx`, `src/components/2d/Portfolio2D.jsx`, `src/components/2d/PortfolioHeader.jsx`, `src/components/2d/HomeSection.jsx`, `src/components/2d/ContactSection.jsx` |
| 2D 项目详情和响应式样式 | `src/components/2d/ProjectCard.jsx`, `src/components/2d/Portfolio2D.css` |
| 3D 加载、交互和详情 | `src/components/3d/PokemonCenter.jsx`, `src/components/3d/Player.jsx`, `src/components/3d/ProjectMarker.jsx`, `src/components/3d/ThreeDScene.jsx`, `src/components/3d/ProjectDetailsPanel.jsx` |
| GitHub Pages 资源路径 | `src/utils/assetPath.js`, `vite.config.js` |
| 预览和 favicon 资源 | `public/previews/fruit-map/*`, `public/previews/centenarian/gameplay-cockpit.png`, `public/pokeball.svg`, `index.html` |
| SEO 静态入口 | `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| 文档 | `README.md`, `PROJECT_HANDOFF.md` |

## 5. 未完成事项和已知风险

1. **浏览器视觉 QA**
   - 检查桌面端 floating preview 在窄屏和宽屏下的位置。
   - 确认固定 `top: 120px` 在常见笔记本高度下仍然舒适。
   - 确认从卡片移动到预览面板时不会过早关闭。

2. **3D 边界 QA**
   - 向 Pokemon Center 每个边缘/门口移动，确认 `Box3` footprint 和预期可玩区域一致。
   - 如果装饰模型让 bounding box 太大，可以改成指定 floor mesh 或显式 polygon footprint。

3. **外部媒体可靠性**
   - YouTube thumbnail 和 GitHub asset video 依赖外部托管和网络。
   - 如果稳定性变重要，可以把获准使用的 thumbnails 本地化，外部链接只保留播放入口。

4. **构建体积**
   - Vite 报告 Three.js vendor chunk 超过 500 kB，目前只是 warning。
   - 如果 2D 首屏性能变重要，可以考虑 lazy-load 3D view。

5. **履历同步兼容性**
   - `digital_resume` 中 renamed featured project 会导致精确名称匹配失败，并主动让 build 失败。
   - 项目名变更时，要同时更新 `featuredProjectNames` 和 `projectPreviews` key。
   - 部署不再自动同步远程履历数据；Digital Resume 变更需要展示在这里时，记得手动刷新并脱敏 `src/data/public_resume_data.json`。
   - Digital Resume 会是 private repo，因此 `npm run sync:resume` 可能因为 raw URL 无权限而失败，这是预期风险，不应影响正常部署。

## 6. 建议下一步

1. 如果依赖缺失，先运行 `npm install`，然后运行 `npm run lint` 和 `npm run build`。
2. 用 `npm run dev` 启动站点，做桌面/移动端 2D preview 视觉 QA。
3. 用键盘和 virtual joystick 测试 3D 边界退出。
4. 在 GitHub Pages 部署版本中检查外部视频链接，因为 redirect/CORS 行为可能和本地不同。
5. 如果行为确认可接受，每次改 preview 位置、featured project 名称或部署同步逻辑时，同步更新本文档。
6. 下次部署后，先确认 `https://berial-cn.github.io/My-Portfolio/google80921134db668829.html` 可访问，在 Google Search Console 完成所有权验证，然后提交 `https://berial-cn.github.io/My-Portfolio/sitemap.xml`。
7. 如果想进一步加强隐私，可以在下次部署前把公开 email 改成 contact form 或非主力邮箱。
8. 更新履历内容时，从 private Digital Resume 项目手动 pull/copy，脱敏后再更新 `src/data/public_resume_data.json`。

## 7. 常用命令

```bash
# 本地开发
npm run dev

# 静态检查
npm run lint
npm run build

# 仅当 Digital Resume raw JSON 可访问时使用的可选手动刷新
npm run sync:resume

# 构建并部署到 gh-pages
npm run deploy
```

## 8. Git 参考

近期相关提交：

- `b5efa9a` - Add Pokeball favicon
- `0df5536` - Restore gh-pages deployment with resume sync
- `5487b68` - Add resume-driven portfolio previews and deployment sync

本文档创建前工作区是 clean。本文档最初是 handoff 任务引入的新文件，随后已追加隐私数据源决策和中文版本。

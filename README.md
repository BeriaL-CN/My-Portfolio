# My Portfolio

[English](#-project-overview-en) | [中文](#-项目概述)

---

## 🎨 Project Overview (EN)

A creative personal portfolio website built with **React** and **Vite**, featuring an immersive **3D environment** themed around a Pokemon Center, with interactive player navigation and project markers.
Portfolio content is adapted from a public-safe JSON Resume data file, so the 2D and 3D views share the same project copy, contact links, tags, and media previews without bundling the private resume source.

### Live Demo

The site is deployed on GitHub Pages: https://berial-cn.github.io/My-Portfolio/

### Current Status

✅ **3D Portfolio Complete** - The 3D scene is now fully functional with:
- Pokemon Center themed environment
- Third-person player navigation (WASD/Arrow keys)
- Interactive project markers (Pokeballs)
- Space key interaction for opening/closing project details
- Automatic return to 2D when the player leaves the rendered Pokemon Center model footprint

✅ **2D Portfolio Website Complete** - A modern, responsive portfolio website with:
- Full-screen homepage with floating scroll indicator
- Clean project card layout with fixed floating media previews on desktop hover
- Mobile-friendly inline previews with tap-to-open full-size images
- Smooth navigation between sections
- Modern gradient design and animations

✅ **Project Media Complete** - Featured projects now include:
- VR Construction: YouTube demo thumbnail and video link
- Food Map: four screenshots with full-size image links
- The Centenarian: gameplay/controller screenshot plus three demo video links

### Core Features

- 🎨 **Dual View Modes**: Seamless switching between immersive 3D view and modern 2D portfolio view
- 🧾 **Resume-Driven Content**: Shared project, profile, and contact data sourced from a public-safe JSON Resume-style data file
- 🌐 **3D Environment**: Pokemon Center themed scene rendered with Three.js (GLB models via `useGLTF`)
- 🎮 **Third-Person Player**: Controllable character with smooth TPS camera follow, directional movement, and animation blending
- ⌨️ **Input Controls**: Supports `W/A/S/D` and Arrow keys concurrently; Space key for project interaction
- 🦾 **Animations**: Managed with `useAnimations` (Three.js AnimationMixer) and cross-fade transitions
- 🛡️ **Collision Detection**: Multi-ray sampling collision checks prevent walking through walls
- 🚪 **3D Exit Interaction**: Leaving the Pokemon Center model bounds closes overlays and returns to the 2D portfolio
- 🎯 **Interactive Markers**: Pokeball-shaped project markers that respond to player proximity
- 🖼️ **Project Previews**: Desktop floating preview panel, mobile inline screenshots, full-size image links, and video demo links
- ⚡ **High Performance**: Vite build tool with instant cold start and fast HMR
- 📱 **Mobile-Optimized**: Responsive design for mobile devices with optimized fonts, layouts, and touch interactions
- 🎨 **2D Portfolio**: Modern single-page portfolio with full-screen homepage, project cards, and smooth navigation

### Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI Framework |
| **React DOM** | 19.2.0 | DOM Rendering |
| **Vite** | 7.2.4 | Build Tool |
| **Three.js** | 0.181.2 | 3D Graphics Library |
| **React Three Fiber** | 9.4.0 | React + Three.js Integration |
| **React Three Drei** | 10.7.7 | 3D Component Library |
| **ESLint** | 9.39.1 | Code Quality |

### Project Structure (Updated for My-Portfolio naming)

```
my-portfolio/
├── src/
│   ├── App.jsx                    # Main app component (view switching, state management)
│   ├── App.css                    # Application styles
│   ├── main.jsx                  # App entry point
│   ├── index.css                 # Global styles
│   ├── utils/
│   │   └── assetPath.js          # Public asset path helper for GitHub Pages base URLs
│   ├── components/
│   │   ├── 2d/                   # 2D portfolio components
│   │   │   ├── PortfolioHeader.jsx   # Navigation header
│   │   │   ├── ProjectCard.jsx       # Project card and floating preview component
│   │   │   ├── HomeSection.jsx       # Full-screen homepage
│   │   │   ├── ContactSection.jsx  # Contact section component
│   │   │   ├── Portfolio2D.jsx       # Main 2D portfolio layout
│   │   │   └── Portfolio2D.css       # 2D portfolio and preview styles
│   │   └── 3d/                  # 3D scene components
│   │       ├── ThreeDScene.jsx   # 3D scene assembly
│   │       ├── Player.jsx        # Player controller
│   │       ├── ProjectMarker.jsx # Interactive project markers
│   │       ├── PokemonCenter.jsx  # Environment model loader
│   │       ├── ProjectDetailsPanel.jsx # 3D project details modal
│   │       └── useKeyboardControls.jsx # Keyboard input hook
│   ├── data/
│   │   ├── portfolioData.js      # Resume adapter, featured projects, and media previews
│   │   └── public_resume_data.json # Public-safe portfolio resume data
│   └── assets/                   # Static resources
├── public/
│   ├── models/                   # 3D GLB models
│   │   ├── player_model.glb
│   │   ├── pokeballs.glb
│   │   └── pokemon_center.glb
│   ├── previews/                 # Project screenshots used by 2D/3D previews
│   │   ├── centenarian/
│   │   └── fruit-map/
│   └── vite.svg
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts
├── index.html                    # HTML entry
└── README.md                     # Project documentation
```

### Quick Start

#### Prerequisites
- Node.js >= 16.0
- npm >= 8.0 or yarn >= 3.0

#### Installation

```bash
npm install
```

#### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

#### Production Build

```bash
npm run build
```

#### Preview Build

```bash
npm run preview
```

#### Code Linting

```bash
npm run lint
```

### Usage Guide

#### 1. **View Switching**
- Click the fixed button at the bottom-left corner to toggle between 3D and 2D views
- In 3D mode, walking outside the rendered Pokemon Center model footprint also returns to the 2D view

#### 2. **3D Navigation**
- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Move left
- **D / Arrow Right**: Move right

#### 3. **Project Interaction**
- Walk close to a Pokeball marker (within 2 units)
- Press **Space** to open project details
- Press **Space** again to close the panel

#### 4. **2D Project Previews**
- On desktop, hover a project card to open a fixed floating preview panel near the cursor
- Move into the floating panel to open full-size images or demo videos
- On mobile, previews are shown inline; tap screenshots to view the original image

### Deployment (GitHub Pages)

The site uses the repository's existing `gh-pages` branch deployment:

```bash
npm run deploy
```

`predeploy` builds the checked-in public-safe data from `src/data/public_resume_data.json`, and then `gh-pages` publishes only `dist` to the `gh-pages` branch. Build artifacts are not committed to `main`.

To refresh portfolio data from the Digital Resume project, manually pull or copy `resume_data_jiepeng_huang.json` from that project, remove private fields such as phone, visa, street/suburb address, and postcode, then update `src/data/public_resume_data.json`. The optional `npm run sync:resume` helper can also download the public raw JSON and write the sanitized portfolio copy, but deployment no longer runs it automatically.

### License

MIT License

### Contact

- GitHub: [@BeriaL-CN](https://github.com/BeriaL-CN)
- Repository: [My-Portfolio](https://github.com/BeriaL-CN/My-Portfolio)

---

# 我的作品集

## 📋 项目概述

一个创意的个人作品展示网站，基于 **React** 和 **Vite** 构建，包含一个以宝可梦中心为主题的沉浸式 **3D 环境**，玩家可以在其中自由探索并与作品标记互动。
作品集内容由脱敏后的 JSON Resume 风格数据文件统一适配，2D 和 3D 视图共用同一份项目文案、联系方式、标签和媒体预览，同时不会把完整履历源文件打包进站点。

### 演示地址

已部署到 GitHub Pages：https://berial-cn.github.io/My-Portfolio/

### 当前状态

✅ **3D 作品集已完成** - 3D 场景现已完全可用，包括：
- 宝可梦中心主题环境
- 第三人称玩家控制（WASD/方向键）
- 精灵球形态的交互式项目标记
- 空格键打开/关闭项目详情面板
- 人物离开宝可梦中心模型渲染范围后自动返回 2D 页面

✅ **2D 作品集网站已完成** - 现代响应式作品集网站，包括：
- 带浮动滚动指示器的全屏首页
- 桌面端项目卡片悬停后显示固定浮动预览窗口
- 移动端内嵌项目预览，并支持点击截图查看原图
- 各部分间的平滑导航
- 现代渐变设计和动画效果

✅ **项目媒体预览已完成** - 当前 featured projects 包括：
- VR Construction：YouTube 演示缩略图和视频链接
- Food Map：4 张项目截图，并支持查看原图
- The Centenarian：游戏/控制器截图和 3 个演示视频链接

### 核心特性

- 🎨 **双视图模式**：沉浸式 3D 视图与现代 2D 作品集视图无缝切换
- 🧾 **履历数据驱动**：项目、个人简介和联系方式来自项目内脱敏后的 JSON Resume 数据适配层
- 🌐 **3D 环境**：宝可梦中心主题场景，基于 Three.js 渲染（通过 `useGLTF` 加载 GLB 模型）
- 🎮 **第三人称玩家**：可控制角色，平滑 TPS 相机跟随、方向移动与动画混合
- ⌨️ **输入支持**：同时支持 `W/A/S/D`、方向键；空格键与项目标记交互
- 🦾 **动画管理**：使用 `useAnimations`（AnimationMixer）实现动画过渡和 cross-fade
- 🛡️ **碰撞检测**：多射线采样检测，防止穿墙
- 🚪 **3D 返回交互**：离开宝可梦中心模型边界时关闭浮层并返回 2D 页面
- 🎯 **交互式标记**：精灵球形态的项目标记，响应玩家接近
- 🖼️ **项目预览**：桌面端浮动预览、移动端内嵌截图、原图查看和视频演示链接
- ⚡ **高性能**：Vite 构建工具，极速冷启动和热更新
- 📱 **移动优化**：响应式设计，针对移动设备优化字体大小、布局和触控交互
- 🎨 **2D 作品集**：现代单页作品集，包含全屏首页、项目卡片、联系方式和流畅导航

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| **React** | 19.2.0 | UI 框架 |
| **React DOM** | 19.2.0 | DOM 渲染 |
| **Vite** | 7.2.4 | 构建工具 |
| **Three.js** | 0.181.2 | 3D 图形库 |
| **React Three Fiber** | 9.4.0 | React + Three.js 集成 |
| **React Three Drei** | 10.7.7 | 3D 组件库 |
| **ESLint** | 9.39.1 | 代码检查 |

---

## 📂 项目结构

```
my-portfolio/
├── src/
│   ├── App.jsx                    # 主应用组件（视图切换、状态管理）
│   ├── App.css                    # 应用样式
│   ├── main.jsx                  # 应用入口
│   ├── index.css                 # 全局样式
│   ├── utils/
│   │   └── assetPath.js          # GitHub Pages base URL 下的 public 资源路径助手
│   ├── components/
│   │   ├── 2d/                   # 2D 作品集组件
│   │   │   ├── PortfolioHeader.jsx   # 导航头部
│   │   │   ├── ProjectCard.jsx       # 项目卡片与浮动预览组件
│   │   │   ├── HomeSection.jsx       # 全屏首页
│   │   │   ├── ContactSection.jsx    # 联系方式板块
│   │   │   ├── Portfolio2D.jsx       # 主 2D 作品集布局
│   │   │   └── Portfolio2D.css       # 2D 作品集和预览样式
│   │   └── 3d/                  # 3D 场景组件
│   │       ├── ThreeDScene.jsx   # 3D 场景组件
│   │       ├── Player.jsx        # 玩家控制器
│   │       ├── ProjectMarker.jsx # 交互式项目标记
│   │       ├── PokemonCenter.jsx # 环境模型加载器
│   │       ├── ProjectDetailsPanel.jsx # 3D 项目详情面板
│   │       └── useKeyboardControls.jsx # 键盘输入 Hook
│   ├── data/
│   │   ├── portfolioData.js      # 履历数据适配、featured projects 和媒体预览
│   │   └── public_resume_data.json # 作品集使用的脱敏履历数据
│   └── assets/                   # 静态资源
├── public/
│   ├── models/                   # 3D GLB 模型文件
│   │   ├── player_model.glb
│   │   ├── pokeballs.glb
│   │   └── pokemon_center.glb
│   ├── previews/                 # 2D/3D 项目预览截图
│   │   ├── centenarian/
│   │   └── fruit-map/
│   └── vite.svg
├── vite.config.js               # Vite 配置文件
├── eslint.config.js            # ESLint 配置
├── package.json               # 项目依赖和脚本
├── index.html                # HTML 入口
└── README.md                # 项目文档
```

---

## 🚀 快速开始

### 前置要求

- Node.js >= 16.0
- npm >= 8.0 或 yarn >= 3.0

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### GitHub Pages 部署

项目继续使用仓库原有的 `gh-pages` 分支部署方式：

```bash
npm run deploy
```

`predeploy` 会使用项目内已提交的 `src/data/public_resume_data.json` 构建网站，再由 `gh-pages` 将 `dist` 内容发布到 `gh-pages` 分支。构建产物不会提交到 `main`。

如果需要从 Digital Resume 项目更新数据，可以手动拉取或复制该项目里的 `resume_data_jiepeng_huang.json`，删除 phone、visa、街道/区级地址、邮编等私密字段后，再更新 `src/data/public_resume_data.json`。`npm run sync:resume` 仍可作为可选辅助脚本从公开 raw JSON 下载并写入脱敏副本，但部署流程不会自动执行它。

### 代码检查

```bash
npm run lint
```

---

## 🎮 使用指南

### 1. 视图切换
- 点击左下角固定按钮在 3D 和 2D 视图间切换
- 在 3D 视图中，人物离开宝可梦中心模型渲染范围后也会返回 2D 页面

### 2. 3D 导航
- **W / ↑**：向前移动
- **S / ↓**：向后移动
- **A / ←**：向左移动
- **D / →**：向右移动

### 3. 项目交互
- 走近精灵球标记（2 单位内）
- 按 **空格键** 打开项目详情
- 再次按 **空格键** 关闭面板

### 4. 2D 项目预览
- 桌面端悬停项目卡片时，会在鼠标附近显示固定浮动预览窗口
- 可以移动到浮动窗口中点击查看原图或打开演示视频
- 移动端会直接显示内嵌预览，点击截图可查看原图

---

## 📧 联系方式

- GitHub: [@BeriaL-CN](https://github.com/BeriaL-CN)
- 项目仓库：[My-Portfolio](https://github.com/BeriaL-CN/My-Portfolio)

---

**最后更新**: 2026 年 6 月


## 精灵球模型来源
https://sketchfab.com/3d-models/pokeballs-84120cf99f074b89bd3b7619a426d708
## 人物模型来源
https://skfb.ly/pzYpT

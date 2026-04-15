# My Portfolio

[English](#-project-overview-en) | [中文](#-项目概述)

---

## 🎨 Project Overview (EN)

A creative personal portfolio website built with **React** and **Vite**, featuring an immersive **3D environment** themed around a Pokemon Center, with interactive player navigation and project markers.

### Live Demo

The site is deployed on GitHub Pages: https://berial-cn.github.io/My-Portfolio/

### Current Status

✅ **3D Portfolio Complete** - The 3D scene is now fully functional with:
- Pokemon Center themed environment
- Third-person player navigation (WASD/Arrow keys)
- Interactive project markers (Pokeballs)
- Space key interaction for opening/closing project details

✅ **2D Portfolio Website Complete** - A modern, responsive portfolio website with:
- Full-screen homepage with floating scroll indicator
- Clean project card layout with hover effects
- Smooth navigation between sections
- Modern gradient design and animations

### Core Features

- 🎨 **Dual View Modes**: Seamless switching between immersive 3D view and modern 2D portfolio view
- 🌐 **3D Environment**: Pokemon Center themed scene rendered with Three.js (GLB models via `useGLTF`)
- 🎮 **Third-Person Player**: Controllable character with smooth TPS camera follow, directional movement, and animation blending
- ⌨️ **Input Controls**: Supports `W/A/S/D` and Arrow keys concurrently; Space key for project interaction
- 🦾 **Animations**: Managed with `useAnimations` (Three.js AnimationMixer) and cross-fade transitions
- 🛡️ **Collision Detection**: Multi-ray sampling collision checks prevent walking through walls
- 🎯 **Interactive Markers**: Pokeball-shaped project markers that respond to player proximity
- ⚡ **High Performance**: Vite build tool with instant cold start and fast HMR
- 📱 **Responsive Full-Screen**: Supports full viewport layout
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
│   ├── ProjectDetailsPanel.jsx    # Project details modal panel
│   ├── main.jsx                  # App entry point
│   ├── index.css                 # Global styles
│   ├── components/
│   │   ├── 2d/                   # 2D portfolio components
│   │   │   ├── PortfolioHeader.jsx   # Navigation header
│   │   │   ├── ProjectCard.jsx       # Project card component
│   │   │   ├── HomeSection.jsx       # Full-screen homepage
│   │   │   ├── ContactSection.jsx  # Contact section component
│   │   │   └── Portfolio2D.jsx       # Main 2D portfolio layout
│   │   │   └── Portfolio2D.css       # 2D portfolio styles
│   │   └── 3d/                  # 3D scene components
│   │       ├── ThreeDScene.jsx   # 3D scene assembly
│   │       ├── Player.jsx        # Player controller
│   │       ├── ProjectMarker.jsx # Interactive project markers
│   │       ├── PokemonCenter.jsx  # Environment model loader
│   │       └── useKeyboardControls.jsx # Keyboard input hook
│   ├── data/
│   │   └── portfolioData.js      # Project data configuration
│   └── assets/                   # Static resources
├── public/
│   ├── models/                   # 3D GLB models
│   │   ├── player_model.glb
│   │   ├── pokeballs.glb
│   │   └── pokemon_center.glb
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

#### 2. **3D Navigation**
- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Move left
- **D / Arrow Right**: Move right

#### 3. **Project Interaction**
- Walk close to a Pokeball marker (within 2 units)
- Press **Space** to open project details
- Press **Space** again to close the panel

### Deployment (GitHub Pages)

```bash
npm install --save-dev gh-pages
# Add to package.json:
"homepage": "https://berial-cn.github.io/My-Portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
npm run deploy
```

### License

MIT License

### Contact

- GitHub: [@BeriaL-CN](https://github.com/BeriaL-CN)
- Repository: [My-Portfolio](https://github.com/BeriaL-CN/My-Portfolio)

---

# 我的作品集

## 📋 项目概述

一个创意的个人作品展示网站，基于 **React** 和 **Vite** 构建，包含一个以宝可梦中心为主题的沉浸式 **3D 环境**，玩家可以在其中自由探索并与作品标记互动。

### 演示地址

已部署到 GitHub Pages：https://berial-cn.github.io/My-Portfolio/

### 当前状态

✅ **3D 作品集已完成** - 3D 场景现已完全可用，包括：
- 宝可梦中心主题环境
- 第三人称玩家控制（WASD/方向键）
- 精灵球形态的交互式项目标记
- 空格键打开/关闭项目详情面板

✅ **2D 作品集网站已完成** - 现代响应式作品集网站，包括：
- 带浮动滚动指示器的全屏首页
- 带悬停效果的简洁项目卡片布局
- 各部分间的平滑导航
- 现代渐变设计和动画效果

### 核心特性

- 🎨 **双视图模式**：沉浸式 3D 视图与现代 2D 作品集视图无缝切换
- 🌐 **3D 环境**：宝可梦中心主题场景，基于 Three.js 渲染（通过 `useGLTF` 加载 GLB 模型）
- 🎮 **第三人称玩家**：可控制角色，平滑 TPS 相机跟随、方向移动与动画混合
- ⌨️ **输入支持**：同时支持 `W/A/S/D`、方向键；空格键与项目标记交互
- 🦾 **动画管理**：使用 `useAnimations`（AnimationMixer）实现动画过渡和 cross-fade
- 🛡️ **碰撞检测**：多射线采样检测，防止穿墙
- 🎯 **交互式标记**：精灵球形态的项目标记，响应玩家接近
- ⚡ **高性能**：Vite 构建工具，极速冷启动和热更新
- 📱 **全屏响应式**：支持全视口布局
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
│   ├── ProjectDetailsPanel.jsx    # 项目详情弹窗面板
│   ├── main.jsx                  # 应用入口
│   ├── index.css                 # 全局样式
│   ├── components/
│   │   ├── 2d/                   # 2D 作品集组件
│   │   │   ├── PortfolioHeader.jsx   # 导航头部
│   │   │   ├── ProjectCard.jsx       # 项目卡片组件
│   │   │   ├── HomeSection.jsx       # 全屏首页
│   │   │   ├── ContactSection.jsx    # 联系方式板块
│   │   │   └── Portfolio2D.jsx       # 主 2D 作品集布局
│   │   │   └── Portfolio2D.css       # 2D 作品集样式
│   │   └── 3d/                  # 3D 场景组件
│   │       ├── ThreeDScene.jsx   # 3D 场景组件
│   │       ├── Player.jsx        # 玩家控制器
│   │       ├── ProjectMarker.jsx # 交互式项目标记
│   │       ├── PokemonCenter.jsx # 环境模型加载器
│   │       └── useKeyboardControls.jsx # 键盘输入 Hook
│   ├── data/
│   │   └── portfolioData.js      # 项目数据配置
│   └── assets/                   # 静态资源
├── public/
│   ├── models/                   # 3D GLB 模型文件
│   │   ├── player_model.glb
│   │   ├── pokeballs.glb
│   │   └── pokemon_center.glb
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

### 代码检查

```bash
npm run lint
```

---

## 🎮 使用指南

### 1. 视图切换
- 点击左下角固定按钮在 3D 和 2D 视图间切换

### 2. 3D 导航
- **W / ↑**：向前移动
- **S / ↓**：向后移动
- **A / ←**：向左移动
- **D / →**：向右移动

### 3. 项目交互
- 走近精灵球标记（2 单位内）
- 按 **空格键** 打开项目详情
- 再次按 **空格键** 关闭面板

---

## 📧 联系方式

- GitHub: [@BeriaL-CN](https://github.com/BeriaL-CN)
- 项目仓库：[My-Portfolio](https://github.com/BeriaL-CN/My-Portfolio)

---

**最后更新**: 2026 年 4 月
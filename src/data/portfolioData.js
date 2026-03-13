// src/data/portfolioData.js

/**
 * 作品集数据结构
 *
 * id: 唯一标识符
 * title: 项目标题
 * description: 简短描述
 * tags: 涉及的技术栈 (用于筛选或 2D UI)
 * links: 项目链接
 * position: [x, y, z] - 核心！定义它在 3D 场景中的坐标
 * model: 用于该项目的 3D 模型文件名 (例如 'robot.glb')
 */
export const portfolioData = [
  {
    id: "project-1-vr-app",
    title: "VR Construction Design App",
    description: "A VR application for designing and visualizing construction projects in an immersive environment.",
    tags: ["Unity", "C#", "VR"],
    links: {
      github: "https://github.com/BeriaL-CN/VR_Construction_Design_App_DECO7230",
    },
    // 定义 3D 位置，它们将作为 可交互旋转模型 的坐标
    position: [-1, 1.5, -2.6],
    model: "Normal_4",
  },
  {
    id: "project-2-web-full-stack",
    title: "Top 100 Healthiest Food Map",
    description: "A web application that visualizes the top 100 healthiest foods using an interactive map, allowing users to explore nutritional information and health benefits.",
    tags: ["React", "Docker", "Full Stack", "Django"],
    links: {
      github: "https://github.com/BeriaL-CN/100_healthiest_food_web_INFS3208",
    },
    position: [-2, 1.5, -2.6],
    model: "Great_9",
  },
  {
    id: "project-3-the-centenarian",
    title: "The Centenarian",
    description:
      'The Centenarian is a unity project to create a "virtual cockpit" controller which is satisfying to use in controlling a spaceship in a 2D environment.',
    tags: ["Unity", "C#", "2D"],
    links: {
      github: "https://github.com/ArkansasLover/the-centenarian",
    },
    position: [-3, 1.5, -2.6],
    model: "Ultra_14",
  },
];

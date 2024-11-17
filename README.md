<h1 align="center">JinYu后台管理系统（前端）</h1>
<p align="center">
    <img src="https://img.shields.io/github/stars/Xiao-Tree/JinYu-vue?style=flat-square" />
    <img src="https://img.shields.io/github/license/Xiao-Tree/JinYu-vue?style=flat" >
    <img src="https://img.shields.io/github/issues/Xiao-Tree/JinYu-vue" />
    <img src="https://img.shields.io/github/forks/Xiao-Tree/JinYu-vue?style=flat" />
</p>

一个采用当前主流前端技术栈的后台管理系统

## 特性

- 采用`Vue3`、`Vite`、`TypeScript`、`NaiveUi`、`Pinia`、`VueRouter`、`ECharts`技术栈开发
- 基于文件系统自动生成路由，通过[Unplugin Vue Router](https://github.com/posva/unplugin-vue-router)实现
- 自动设置布局，通过[vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)实现
- 根据用户权限自动判断路由权限
- 集成`ECharts`，自动切换主题，自动调整布局大小，通过`WebSocket`实现实时数据展示
- 支持静态和动态图标，静态图标基于`iconify`实现，动态图标基于`lottie`实现
- 完美支持移动端，实现自适应布局。

## 代办事项

- [ ] tab 组件
  - [ ] 右键菜单
  - [ ] 删除缓存
- [ ] 防止重复请求
- [x] 集成`ECharts`
- [x] 图片上传、加载
- [ ] 菜单页面
- [ ] 灵活切换路由模式：`静态路由`或`动态路由`

## 项目启动

### 1. 安装项目依赖

```shell
pnpm install
```

### 2. 编译和热加载用于开发

```shell
pnpm dev
```

### 3. 为生产环境进行类型检查、编译和压缩

```shell
pnpm build
```
## 目录说明

```
├─ public
│  ├─ demo
│  ├─ favicon.ico
│  └─ lottie                    // lottie请求的json
├─ src
│  ├─ api                       // 封装请求函数
│  ├─ assets                    // 静态资源
│  │  ├─ css                    // 样式
│  │  ├─ img                    // 图片
│  │  └─ theme                  // echart的主题
│  ├─ components
│  │  ├─ common                 // 公共组件
│  │  ├─ echarts                // 封装echart
│  │  ├─ form                   // 封装表单
│  │  ├─ Dependencies.vue       // 项目依赖
│  │  ├─ LottieIcon.vue         // Lottie动态图标
│  │  ├─ SvgIcon.vue            // 静态图标
│  │  ├─ Tabs.vue               // 标签组件
│  │  └─ tree
│  │     └─ MenuTree.vue
│  ├─ layouts                   // 布局
│  │  ├─ blank.vue              // 空白布局
│  │  ├─ default.vue            // 默认布局
│  │  └─ modules                // 默认布局的子组件
│  │     ├─ footer.vue
│  │     ├─ header.vue
│  │     ├─ main.vue
│  │     └─ nav.vue
│  ├─ router                    // 路由设置
│  ├─ stores                    // 状态管理
│  │  ├─ data.ts                // 数据缓存
│  │  ├─ index.ts               // 应用和用户的状态
│  │  └─ tabs.ts                // 标签页的转台
│  ├─ types                     // 类型
│  ├─ utils                     // 工具函数
│  ├─ views                     // 页面
│  │  ├─ index.vue              // 首页
│  │  ├─ login.vue              // 登录
│  │  ├─ notFound.vue           // 捕获未知
│  │  ├─ error.vue              // 异常
│  │  ├─ system                 // 系统管理
│  │  │  ├─ index.vue           // 概览
│  │  │  ├─ users.vue           // 用户管理
│  │  │  ├─ roles.vue           // 角色管理
│  │  │  └─ dicts.vue           // 字典管理
│  │  └─ user                   // 用户中心
│  │     └─ index.vue
│  ├─ App.vue
│  └─ main.ts
├─ .env                         // 环境变量
├─ .gitignore
├─ index.html
├─ README.md
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.app.json
├─ tsconfig.json                // TS配置
├─ tsconfig.node.json    
└─ vite.config.ts               // Vite配置
```

## 演示图片

![](/public/demo/light/JinYu后台管理系统%20-%20login.png)
![](/public/demo/light/JinYu后台管理系统%20-%20home.png)
![](/public/demo/light/JinYu后台管理系统%20-%20system.png)
![](/public/demo/light/JinYu后台管理系统%20-%20user.png)
![](/public/demo/light/JinYu后台管理系统%20-%20user1.png)
![](/public/demo/light/JinYu后台管理系统%20-%20user2.png)
![](/public/demo/light/JinYu后台管理系统%20-%20role.png)
![](/public/demo/light/JinYu后台管理系统%20-%20role1.png)
![](/public/demo/light/JinYu后台管理系统%20-%20role2.png)
![](/public/demo/light/JinYu后台管理系统%20-%20dict.png)
![](/public/demo/light/JinYu后台管理系统%20-%20dict1.png)

![](/public/demo/dark/JinYu后台管理系统%20-%20login.png)
![](/public/demo/dark/JinYu后台管理系统%20-%20home.png)
![](/public/demo/dark/JinYu后台管理系统%20-%20system.png)
![](/public/demo/dark/JinYu后台管理系统%20-%20user.png)
![](/public/demo/dark/JinYu后台管理系统%20-%20role.png)
![](/public/demo/dark/JinYu后台管理系统%20-%20dict.png)

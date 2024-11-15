# JinYu后台管理系统（前端）

一个采用当前主流前端技术栈的后台管理系统

## 特性

- 采用`Vue3`、`Vite`、`TypeScript`、`NaiveUi`、`Pinia`、`VueRouter`、`ECharts`技术栈开发
- 基于文件系统自动生成路由，通过[Unplugin Vue Router](https://github.com/posva/unplugin-vue-router)实现
- 自动设置布局，通过[Pinia Plugin Persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)实现
- 根据用户权限自动判断路由权限
- 集成`ECharts`，自动切换主题，自动调整布局大小，通过`WebSocket`实现实时数据展示
- 支持静态和动态图标，静态图标基于`iconify`实现，动态图标基于`lottie`实现

## 代办事项

- [ ] tab组件
    - [ ] 右键标签菜单
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

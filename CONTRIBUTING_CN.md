# sxkj-echarts 贡献指南

sxkj-echarts 是一套基于 Vue2.x 封装的 Echarts 图表组件，用于为开发者提供快速生成图表的服务。
贡献代码，请阅读以下内容:

## 开发原则

sxkj-echarts 的核心原则是**为开发者简化配置项**，基于此原则，sxkj-echarts 有如下约定：

**请先阅读 doc 目录下的 SXKJ-ECHARTS 实现方案，在进行开发！！**

1. 数据需要*尽量*使用指标维度的形式，统一数据格式
2. 指标维度的设置、数据类型、简化的配置项、数据别名 等通过在 settings 中增加的属性实现。
3. 遵守开发约定，实现对应接口
4. 减少不必要的依赖引入。

## 目录说明

- config => `webpack配置目录`
- dist => `测试前端输出目录`
- doc => `文档目录`
- example => `测试前端目录`
- lib => `组件库输出目录`
- node_modules `依赖`
- src => `组件库代码目录`

## 环境搭建

- 安装依赖 `npm install`
- 运行测试前端 `npm run serve`
- 生成测试前端 `npm run build`
- 生成组件库 `npm run lib`

## 组件开发

开发新的图表组件，需要首先在 `src/packages` 下增加对应图表，然后在 `examples/data`
下增加对应数据并在 `index.js` 中引入，最后在 `src/index.js` 中增加对应的组件即可。
另外还需要完善各类文档：使用手册、demo 项目添加新开发组件实例测试及说明等

## 代码规范

遵循 [prettier](https://prettier.io/) 即可。

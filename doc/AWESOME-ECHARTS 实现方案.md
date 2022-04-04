# SXKJ-ECHARTS 实现方案

## 简介

 echarts 作为大型图表库可以创建各式各样的图表，例如：饼图、折线图、柱状图等等。也正是因为 echarts 图表类型纷繁复杂，导致对每种类型都需要参考官网实例和配置手册来手动实现，上手有一定难度，更何况还要实现设计稿的一比一还原。**通过封装 SXKJ-ECHARTS 组件库，来简化对 echarts 的复杂操作及组件生命周期维护**。
 本方案主要通过 **问题分析**、**设计思路**、**具体实现** 三个方面阐述 **SXKJ-ECHARTS** 组件库的实现过程。

## 1. 问题分析

 公司项目基本上为中后台管理项目，前端更多做的是数据可视化，因此前端工作中对 echarts 这类数据可视化图表使用非常频繁。 为方便使用，前端组曾对 echarts 做过封装 ，但也存在一些问题：

1. 每次需要在项目中导入图表组件库
2. 每种图表组件仍有独特的配置、数据格式
3. 首次使用需了解组件且无使用文档

针对上述问题及借鉴原先封装的优点，将通过一下几方面来封装 **SXKJ-ECHARTS** 组件库：

1. **简化图表配置** (提高复用性)
2. **统一数据格式**
3. **基于设计稿开发** (简化后续使用样式操作)
4. **处理各类边界情况及维护组件生命周期**
5. **使用 npm 导入、提供使用手册及模型网站**

## 2. 设计思路

 **每种 echarts 图表组件仅其配置项不同，但组件实现还需要规范对实例维护及边界情况的处理**，例如：数据变动监听、事件截流及生命周期维护等等。
 采取 **组合** 方式进行封装，对实现做以下分层：

1. **核心组件** (具体组件实现，包括页面样式、边界处理、生命周期维护等)
2. **配置函数** (针对不同图表配置特殊性，手动实现函数，但暴露一致接口)

 **组合上述分层生成完整图表组件** (具体实现：使用 **Object.assign** 方法组合**核心组件**与各类型图表**配置函数**) 项目目录及折线图配置函数实现如下：

![nHZutS.png](https://s2.ax1x.com/2019/09/18/nHZutS.png)

```javascript
// 项目目录
>charts // 根目录
>core.js // 核心组件
>index.js // 整体库统一出口
>>line // 折线图目录
>>>index.js // 折线图完整组件出口
>>>main.js // 折线图配置函数
...
```

```javascript
// 折线图完整组件出口 index.js
// core + 折线图的配置函数 = 完整图表组件
import 'echarts/lib/chart/line'
import { line } from './main' // 折线图的配置函数
import Core from '../core' // 统一的核心组件对象
export default Object.assign({}, Core, {
  // 两者结合成为完整的图表组件
  name: 'SxLine',
  data() {
    this.chartHandler = line
    return {}
  },
})
```

## 3. 具体实现

 结合设计思路中的分层可总结出具体实现：

1. **组件级别实现**：(对通用参数及组件生命周期等实现)
   - **组件级别通用参数**：对外暴露的接口 (方便用户对边界处理、生命周期维护做特殊处理)
2. **图表特例级别实现**：(对各图表配置的实现)
   - **图表特例配置对象**：对外暴露的唯一对图表本身配置的接口 (方便用户快速启动预设配置等)

### 3.1 组件级别实现

 组件实现主要包括：**参数管理**、**边界处理**、**生命周期管理**

![nHZxjs.png](https://s2.ax1x.com/2019/09/18/nHZxjs.png)

 在实现时，还要思考该组件在使用过程中会碰到什么特殊情况并总结归纳，在组件实现过程中一一解决并留有接口。
 来思考一下，图表组件设计中会遇到什么边界情况？

1. 图表实例大小显示
2. 浏览器窗口大小变化
3. 数据加载异常

 因此设计组件时需要解决这些边界情况：比如数据加载异常就可以通过显示加载动画等来达到界面友好的效果，另外通过向外暴露是否加载动画等接口让用户可以方便的使用；再比如浏览器窗口变化，那么可以通过包装浏览器窗口变化的监听、具体大小变化逻辑以及暴露部分配置接口 (resizeable、resize delay、check resize state、etc.) 来实现。

 另外对于模版实现，选择使用 **Vue Rander** 函数编写并考虑友好用户体验插入加载中和无数据展示页面

```javascript
// core.js
render (h) {
    return h(
      "div", // 顶层元素
      {
        class: [_.kebabCase(this.$options.name || this.$options._componentTag)],
        style: this.canvasStyle
      },
      [
        h("div", { // 要挂载到echarts的元素
          style: this.canvasStyle,
          class: { "charts-mask__status": this.dataEmpty || this.loading },
          ref: "canvas"
        }),
        h(DataEmpty, { // 无数据
          style: { display: this.dataEmpty ? "" : "none" }
        }),
        h(Loading, { // 加载中
          style: { display: this.loading ? "" : "none" }
        }),
        this.$slots.default
      ]
    )
  }
...
```

###3.2 图表特例级别实现

 根据 echarts 官方配置手册，我们很清楚的知道只需要创建一个绑定具体 html 元素的 echarts 实例并传入配置项即可，每种类型图表仅配置对象不同。**因此在组件级别上我们仅做通用元素绑定、echarts 实例化以及统一数据和图表特例配置对象变化的监听即可，具体的图表配置对象的生成通过对应的函数去实现。**

![nHM6HA.png](https://s2.ax1x.com/2019/09/18/nHM6HA.png)

 设计理念要求对于不同类型图表采用相同类型数据格式 (方便使用), 所以每种图表配置函数要对统一的数据格式做不同的操作，最终结合各种向外暴露的接口组合生成配置特例。

 配置函数实现：

1. **入参特殊处理**
2. **实现各细分配置项构造函数 (前提条件：各细分配置项构造接口约定)**
3. **调用各细分配置项构造函数并组合产出配置项**

```javascript
export const line = (keys, values, settings, extra) => {
  ...
  return options
}
```

#### 3.2.1 接口约定

 每种图表都有特殊配置，但是也有相通之处，无非就是**数据项配置、维度配置、其他配置 (工具栏、图例、弹出框等)**。因此每种图例的函数也是类似的，即**根据传入的数据和配置经过处理最终组合成配置对象**，另外还可以对一些通用配置再进行统一的封装。

![nH32qg.png](https://s2.ax1x.com/2019/09/18/nH32qg.png)

 针对这些共同之处，对入参、细分配置函数做了约定：

1. **约定入参**： + keys、values： 仅是统一数据格式的拆分 + settings：图表特殊配置参数集合 (包含作用于各图表的特殊配置参数) + extra：组件级别参数集合 (包含作用于图表的通用参数)
2. **约定细分配置函数接口**： + getLegend：图例配置函数 + getTooltip：弹出框配置函数 + getXAxis：X 轴配置函数 + getYAxis：Y 轴配置函数 + getSeries：数据组配置函数

 约定是为了规范配置函数构建：**对约定入参进行处理，将处理好的数据交给对应的细分配置函数处理，最终组合生成最终的配置项**

![nqTPGF.png](https://s2.ax1x.com/2019/09/19/nqTPGF.png)

> 接下来每种图表配置函数，仅按照约定实现即可

#### 3.2.2 入参特殊处理

 由于统一了数据格式，所以每种图表配置函数要率先对数据进行处理

```javascript
	keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []
  // 数据 自定义单位
  let units = {}
  // 默认数据项
  let tempMetrics = keys.slice(1).map((v, i) => {
    if (Array.isArray(v)) {
      units[v[0]] = v[1]
      return v[0]
    }
    return v
  })
  const {
    // 纬度 def:keys[0]
    dimension = [keys[0]],
    // 自定义数据项
    metrics = tempMetrics,
    // visible slots:[xAxis, yAxis]
    axisVisible = [true, true],
    // xAxis name list
    xAxisName = [],
    ...
  } = settings
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra
```

> 上面的代码对数据做了部分处理, 以及默认配置，方便后续操作

####3.2.3 各细分配置项构造函数处理

> 将处理好的数据传入对应配置函数，由对应函数根据传参产出配置片段

```javascript
const series = getSeries({...})
```

```javascript
function getSeries ({...}) {
  const series = []
  const stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)
  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: "line",
      data: dataTemp[item],
      ...
    }
    if (stack && stackMap[item]) seriesItem.stack = stackMap[item]
    if (area) {
      seriesItem.areaStyle = {
        normal: {...}
      }
    }
    if (label) seriesItem.label = label
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (lineStyle) seriesItem.lineStyle = lineStyle
    if (areaStyle) seriesItem.areaStyle = areaStyle
    series.push(seriesItem)
  })
  return series
}
```

####3.2.4 产出最终配置

> 通过组合各配置函数输出配置片段完成对应图表的配置

```javascript
	const legend = getLegend({...})
	const tooltip = getTooltip({...})
	const xAxis = getXAxis({...})
	const yAxis = getYAxis({...})
	const series = getSeries({...})
  const options = {
    legend,
    tooltip,
    xAxis,
    yAxis,
    series,
    color: chartColors
  }
  return options
```

> 总结特例函数实现的基本流程就是 **处理数据=>各细分配置函数处理=>组合各细分配置项=>产出配置**

## 总结

>  在封装组件前应当有大量的实践，只有不断的实践才能抽象出通用逻辑，再进行封装。封装组件不单单是对功能的实现还需要考虑全面：例如组件生命周期管理、组件参数配置、边界情况处理以及友好的用户体验等等，另外还需要注意组件的可复用性(比如提供各种插槽)、简单配置等。
>  进行封装的同时，还要做好使用手册、文档的书写或 demo 实现，方便后续使用！

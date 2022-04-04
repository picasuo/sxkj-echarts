#SXKJ-ECHARTS 使用手册

###快速上手

#### 1. NPM 安装

```javascript
$ npm install sxkj-echarts --save
```

#### 2. 引入 SXKJ-ECHARTS

##### 全局引入

一般在 webpack 入口页面 `main.js` 中如下配置：

```javascript
import Vue from 'vue'
import App from './App.vue'
// 添加样式
import 'sxkj-echarts/lib/sxEcharts.css'
// 导入 sxkj-echarts
import sxEcharts from 'sxkj-echarts'
// 注册
Vue.use(sxEcharts)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

##### 按需引入

借助插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)可以实现按需加载组件，减少文件体积。首先安装，并在文件 `.babelrc` 中配置：

```javascript
npm install babel-plugin-import --save-dev

// .babelrc
"plugins": [["import", {
    "libraryName": "sxkj-echarts",
    "libraryDirectory": "src/packages"
  }]]
```

然后这样按需引入组件，就可以减小体积了：

```javascript
import { line } from 'sxkj-echarts'
Vue.component('sxLine', line)
```

**特别提醒**

- 不要在项目中同时 **全部引入** 和 **按需引入** (存在冲突)
- 按需引用仍然需要导入样式，即在 **main.js** 或根组件执行 `import 'sxkj-echarts/lib/sxEcharts.css'`
- 由于组件库内部使用了 `lodash`，所以请在 `vue.config.js` 中提供自动导入 `lodash`

```javascript
// vue.config.js

chainWebpack: config => {
  config.plugin('provide').use(webpack.ProvidePlugin, [
    {
      _: 'lodash',
    },
  ])
}
```

###组件级别参数 (props)

|       参数        |                             简介                              |   类型   | 默认配置 | 例子 |
| :---------------: | :-----------------------------------------------------------: | :------: | :------: | :--: |
|       data        |                             数据                              |  Object  |    --    |  --  |
|     settings      |                 特例配置项(图表实例级别参数)                  |  Object  |    --    |  --  |
|       width       |                组件宽度 (echarts canvas 宽度)                 |  String  |  "100%"  |  --  |
|      height       |                组件高度 (echarts canvas 高度)                 |  String  |  "100%"  |  --  |
|  tooltipVisible   |                   echarts tooltip 是否显示                    | Boolean  |   true   |  --  |
|   legendVisible   |                    echarts legend 是否显示                    | Boolean  |   true   |  --  |
|    resizeable     |                  echarts 实例是否可改变大小                   | Boolean  |   true   |  --  |
| cancelResizeCheck |                     取消改变大小时的检测                      | Boolean  |  false   |  --  |
|    resizeDelay    |                      改变大小前延迟时间                       |  Number  | 200(ms)  |  --  |
|    changeDelay    |       改变 echarts 前延迟时间(初始化、数据、配置项变化)       |  Number  |    0     |  --  |
|      colors       |                   echarts 配置项: 颜色数组                    |  Array   |    --    |  --  |
| tooltipFormatter  |                    tooltip formatter 函数                     | Function |    --    |  --  |
|     dataEmpty     |                  无数据标记 (显示无数据提醒)                  | Boolean  |  false   |  --  |
|      loading      |                  加载中标记 (显示加载中提醒)                  | Boolean  |  false   |  --  |
|  beforeOptionSet  | 生命周期函数：在配置项传入 setOption 函数前触发(可修改配置项) | Function |    --    |  --  |
|   beforeResize    |   生命周期函数：在 echarts 实例大小改变前触发(可修改配置项)   | Function |    --    |  --  |

####data (数据项)

```javascript
// 格式：
{
	keys: ["日期", "访问用户", "下单用户"],
	values: [
    { 日期: "1/1", 访问用户: 1393, 下单用户: 1093 },
    { 日期: "1/2", 访问用户: 3530, 下单用户: 3230 },
    { 日期: "1/3", 访问用户: 2923, 下单用户: 2623 },
    { 日期: "1/4", 访问用户: 1723, 下单用户: 1423 },
    { 日期: "1/5", 访问用户: 3792, 下单用户: 3492 },
    { 日期: "1/6", 访问用户: 4593, 下单用户: 4293 }
	]
}
```

> 数据由 **纬度 (dimension)** 和 **指标 (metrics)** 组成 (默认 **keys** 首项是纬度, 其余项为指标. **values** 是相应的数据集合)
> **纬度**：数据的属性 (关键项)
> **指标**：量化衡量标准 (相对关键项的衡量数据)
> 上述实例中，**日期** 纬度表示每组数据的日期，指标则是相对日期的 **访问用户量** 和 **下单用户量**

####settings (特例配置项)

> 其主要作用是搜集所有图表实例级别参数，方便管理

####数据格式

> 由于日常开发中我们的数据往往都是特殊的，带有不同的含义。因此不同的数据会有不同的数据格式，目前包含以下几种数据格式
>
> 1. **rmb**：表示数据为人民币格式
> 2. **percent**：表示数据为百分比格式
> 3. **people**：表示数据为人数格式
> 4. **normal**：表示数据按照其本身字面意识，不做格式化

---

###图表实例级别参数 (settings)

####Line (折线图) 配置参数

|    参数     |       简介        |  类型   |              默认配置               |                例子                 |
| :---------: | :---------------: | :-----: | :---------------------------------: | :---------------------------------: |
|  dimension  |       纬度        |  Array  |         包含 keys[0]的数组          |               ["XXX"]               |
|   metrics   |       指标        |  Array  | 包含 keys 中除第 0 位外其他项的数组 |           ["aaa", "bbb"]            |
| axisVisible |  坐标轴显示状态   |  Array  |     [true, true](0:x轴、1:y轴)      |            [true, false]            |
|  xAxisName  |     x 轴名称      |  Array  |         包含 x 轴名称的数组         |          ["我是 x 轴名称"]          |
|  yAxisName  |     y 轴名称      |  Array  |         包含 y 轴名称的数组         |          ["我是 y 轴名称"]          |
|  xAxisType  | x 轴类型 官方类型 | String  |             "category"              |               "value"               |
| defaultUnit | 图表数据默认单位  | String  |              "normal"               |  "percent"/"people"/"rmb"/"normal"  |
|  sortData   |   数据显示排序    | String  |              "normal"               |        "normal"/"asc"/"desc"        |
|    area     | 是否展示为面积图  | Boolean |                false                |                true                 |
|    stack    |     堆叠选项      | Object  |                 --                  | { count: ['访客人数', 'VIP 人数'] } |
|  legendMap  |   图例别名字典    | Object  |                 --                  |    { date: '我是日期图例别名' }     |
|  labelMap   |   标签别名字典    | Object  |                 --                  |    { date: '我是日期标签别名' }     |
|    label    |   series.label    | Object  |                 --                  |                 --                  |
|  itemStyle  | series.itemStyle  | Object  |                 --                  |                 --                  |
|  lineStyle  | series.lineStyle  | Object  |                 --                  |                 --                  |
|  areaStyle  | series.areaStyle  | Object  |                 --                  |                 --                  |
|    grid     |   options.grid    | Object  |                 --                  |                 --                  |

####histogram (柱状图) 配置参数

|    参数     |       简介        |  类型  |              默认配置               |                例子                 |
| :---------: | :---------------: | :----: | :---------------------------------: | :---------------------------------: |
|  dimension  |       纬度        | Array  |         包含 keys[0]的数组          |               ["XXX"]               |
|   metrics   |       指标        | Array  | 包含 keys 中除第 0 位外其他项的数组 |           ["aaa", "bbb"]            |
| axisVisible |  坐标轴显示状态   | Array  |     [true, true](0:x轴、1:y轴)      |            [true, false]            |
|  xAxisName  |     x 轴名称      | Array  |         包含 x 轴名称的数组         |          ["我是 x 轴名称"]          |
|  yAxisName  |     y 轴名称      | Array  |         包含 y 轴名称的数组         |          ["我是 y 轴名称"]          |
|  xAxisType  | x 轴类型 官方类型 | String |             "category"              |               "value"               |
| defaultUnit | 图表数据默认单位  | String |              "normal"               |  "percent"/"people"/"rmb"/"normal"  |
|  sortData   |   数据显示排序    | String |              "normal"               |        "normal"/"asc"/"desc"        |
|    stack    |     堆叠选项      | Object |                 --                  | { count: ['访客人数', 'VIP 人数'] } |
|  showLine   |     显示成线      | Array  |                 --                  |  ["访问用户"](则该类数据显示成线)   |
|  legendMap  |   图例别名字典    | Object |                 --                  |    { date: '我是日期图例别名' }     |
|  labelMap   |   标签别名字典    | Object |                 --                  |    { date: '我是日期标签别名' }     |
|    label    |   series.label    | Object |                 --                  |                 --                  |
|  itemStyle  | series.itemStyle  | Object |                 --                  |                 --                  |
|    Grid     |   options.grid    | Object |                 --                  |                 --                  |

####Pie (饼、环图) 配置参数

|     参数     |       简介       |        类型         |            默认配置             |               例子                |
| :----------: | :--------------: | :-----------------: | :-----------------------------: | :-------------------------------: |
|  dimension   |       纬度       |        Array        |       包含 keys[0]的数组        |              ["XXX"]              |
|   metrics    |       指标       |        Array        |       包含 keys[1]的数组        |              ["aaa"]              |
| defaultUnit  | 图表数据默认单位 |       String        |            "normal"             | "percent"/"people"/"rmb"/"normal" |
|    isRing    |     是否为环     |       Boolean       |              False              |               true                |
|    radius    |   半径 (范围)    | String Array Number | isRing ? ['50%', '70%'] : '70%' |                30                 |
| selectedMode |     选中模式     |   String Boolean    |              false              |     "single"/"multiple"/false     |
|  legendMap   |   图例别名字典   |       Object        |               --                |   { date: '我是日期图例别名' }    |
|   labelMap   |   标签别名字典   |       Object        |               --                |   { date: '我是日期标签别名' }    |
|    label     |   series.label   |       Object        |               --                |                --                 |
|  itemStyle   | series.itemStyle |       Object        |               --                |                --                 |
|  labelLine   | series.labelLine |       Object        |               --                |                --                 |

#### Radar (雷达图) 配置参数

|      参数      |       简介       |  类型   |              默认配置               |               例子                |
| :------------: | :--------------: | :-----: | :---------------------------------: | :-------------------------------: |
|   dimension    |       纬度       |  Array  |         包含 keys[0]的数组          |              ["XXX"]              |
|    metrics     |       指标       |  Array  | 包含 keys 中除第 0 位外其他项的数组 |          ["aaa", "bbb"]           |
|  defaultUnit   | 图表数据默认单位 | String  |              "normal"               | "percent"/"people"/"rmb"/"normal" |
|    sortData    |   数据显示排序   | String  |              "normal"               |       "normal"/"asc"/"desc"       |
| radarShapeType |       图形       | String  |              "polygon"              |        "polygon"/"circle"         |
|    labelMap    |   标签别名字典   | Object  |                 --                  |   { date: '我是日期标签别名' }    |
|      area      | 是否展示为面积图 | Boolean |                false                |               true                |
|     label      |   series.label   | Object  |                 --                  |                --                 |
|   itemStyle    | series.itemStyle | Object  |                 --                  |                --                 |
|   lineStyle    | series.lineStyle | Object  |                 --                  |                --                 |
|   areaStyle    | series.areaStyle | Object  |                 --                  |                --                 |

#### Scatter (散点图) 配置参数

|    参数     |       简介       |      类型       |              默认配置               |               例子                |
| :---------: | :--------------: | :-------------: | :---------------------------------: | :-------------------------------: |
|  dimension  |       纬度       |      Array      |         包含 keys[0]的数组          |              ["XXX"]              |
|   metrics   |       指标       |      Array      | 包含 keys 中除第 0 位外其他项的数组 |          ["aaa", "bbb"]           |
| axisVisible |  坐标轴显示状态  |      Array      |     [true, true](0:x轴、1:y轴)      |           [true, false]           |
|  xAxisName  |     x 轴名称     |      Array      |         包含 x 轴名称的数组         |         ["我是 x 轴名称"]         |
|  yAxisName  |     y 轴名称     |      Array      |         包含 y 轴名称的数组         |         ["我是 y 轴名称"]         |
| defaultUnit | 图表数据默认单位 |     String      |              "normal"               | "percent"/"people"/"rmb"/"normal" |
|  labelMap   |   标签别名字典   |     Object      |                 --                  |   { date: '我是日期标签别名' }    |
| symbolType  |     标记类型     | String Function |              "circle"               |              "rect"               |
|    label    |   series.label   |     Object      |                 --                  |                --                 |
|  itemStyle  | series.itemStyle |     Object      |                 --                  |                --                 |
|    grid     |   options.grid   |     Object      |                 --                  |                --                 |

#### Bar (条形图) 配置参数

|      参数      |         简介         |  类型   |          默认配置          |               例子                |
| :------------: | :------------------: | :-----: | :------------------------: | :-------------------------------: |
|   dimension    |         纬度         |  Array  |     包含 keys[0]的数组     |              ["XXX"]              |
|    metrics     |         指标         |  Array  |     包含 keys[1]的数组     |              ["aaa"]              |
|  axisVisible   |    坐标轴显示状态    |  Array  | [true, true](0:x轴、1:y轴) |           [true, false]           |
|   xAxisName    |       x 轴名称       |  Array  |    包含 x 轴名称的数组     |         ["我是 x 轴名称"]         |
|   yAxisName    |       y 轴名称       |  Array  |    包含 y 轴名称的数组     |         ["我是 y 轴名称"]         |
|   yAxisType    |  Y 轴类型 官方类型   | String  |         "category"         |              "value"              |
|  defaultUnit   |   图表数据默认单位   | String  |          "normal"          | "percent"/"people"/"rmb"/"normal" |
|  barStyleType  |       bar 类型       | String  |          "normal"          |         "normal"/"circle"         |
|  showMainBar   | 显示 main bar 的标记 | Boolean |           false            |               true                |
| showBackground |     显示背景 bar     | Boolean |           false            |               true                |
| showDiffColor  |   bar 显示不同颜色   | Boolean |           false            |               true                |
| labelPosition  |    显示标记的位置    | String  |         "outside"          |        "outside"/"inside"         |
|    labelMap    |     标签别名字典     | Object  |             --             |   { date: '我是日期标签别名' }    |
|     label      |     series.label     | Object  |             --             |                --                 |
|   itemStyle    |   series.itemStyle   | Object  |             --             |                --                 |
|      gird      |     options.grid     | Object  |             --             |                --                 |

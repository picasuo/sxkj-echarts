export default [
  {
    title: '实现方案',
    type: 'program',
    html: `
    <h1>实现方案</h1>
    <h2>1. 设计理念</h2>
    <blockquote>
      <p>
        echarts 作为大型图表库可以创建各式各样的图表，例如：饼图、折线图、柱状图等等。但是 echarts 图表类型纷繁复杂，对每种类型都需要参考官网实例和配置手册来手动实现，上手有一定难度，更何况还要实现设计稿的一比一还原。

        <strong>为解决原生配置项过多及在开发中对echarts实例的维护等问题，尝试通过封装来简化配置和统一实例维护</strong>。
        ​ 本次设计的主要中心思想是为了
        <strong>简化图表配置，提高复用性</strong>。在设计封装时就已按照目前设计稿整理的图表样式进行封装，所有已封装的图表类型仅传入
        <strong>统一的数据格式</strong>即可满足日常开发需求，每种图表类型还
        <strong>暴露部分参数</strong>，用于对图表的个性化配置，方便食用。
        ​ 另外对于边界情况，例如加载数据、无数据等做了友好的界面提醒，实例刷新以及暴露部分生命周期函数方便对实例的检测、修改等等。
      </p>
    </blockquote>
    <h2>2. 核心思路</h2>
    <blockquote>
      <p>
        <strong>每种 echarts 图表组件仅其配置项不同，但组件实现还需要规范对实例维护及边界情况的处理</strong>，例如：数据变动监听、配置项变动监听、宽高变化监听、截流以及在各生命周期阶段对各种监听处理等等。
        ​ 采取类似
        <strong>mixin</strong> 的方式进行封装：实现
        <strong>核心组件</strong>和不同图表
        <strong>配置函数</strong>，
        <strong>混合成完整图表组件</strong>。 (具体实现：使用
        <strong>Object.assign</strong> 方法组合
        <strong>Core</strong>与各类型图表
        <strong>配置函数</strong>) 达到复用的效果，简化实现过程。
      </p>
    </blockquote>
    <pre><code class="language-javascript" lang="javascript">// 项目目录
&gt;charts // 根目录
&gt;core.js // 核心组件
&gt;index.js // 整体库统一出口
&gt;&gt;line // 折线图目录
&gt;&gt;&gt;index.js // 折线图完整组件出口
&gt;&gt;&gt;main.js // 折线图配置函数
...
</code></pre>
    <pre><code class="language-javascript" lang="javascript">// 折线图完整组件出口 index.js
// core + 折线图的配置函数 = 完整图表组件
import &#39;echarts/lib/chart/line&#39;
import { line } from &#39;./main&#39; // 折线图的配置函数
import Core from &#39;../core&#39; // 统一的核心组件对象
export default Object.assign({}, Core, { // 两者结合成为完整的图表组件
  name: &#39;SxLine&#39;,
  data () {
    this.chartHandler = line
    return {}
  }
})
</code></pre>
    <h2>3. 具体实现</h2>
    <blockquote>
      <p>
        设计思路概要的讲：通过
        <strong>统一的数据格式</strong>、
        <strong>图表特例配置对象</strong> 以及
        <strong>组件级别通用参数</strong> 渐进式 (仅配置数据即可实现图表，其余配置可满足定制要求) 快速的开发符合公司设计的图表功能。具体化思路就是
        <u>
          在
          <strong>组件级别</strong>上对通用参数及组件生命周期实现，在
          <strong>图表特例级别</strong>上对各图表配置的实现
        </u>。
      </p>
      <ol>
        <li>
          1.<strong>组件级别实现</strong>: core.js
        </li>
        <li>
          2.<strong>图表特例级别实现</strong>: 图表配置函数
        </li>
      </ol>
    </blockquote>
    <h3>3.1 组件级别实现</h3>
    <blockquote>
      <p>
        选择使用
        <strong>Vue Rander</strong> 函数编写，考虑到友好的用户体验插入加载中和无数据展示页面。
      </p>
    </blockquote>
    <pre><code class="language-javascript" lang="javascript">// core.js
render (h) {
    return h(
      &quot;div&quot;, // 顶层元素
      {
        class: [_.kebabCase(this.$options.name || this.$options._componentTag)],
        style: this.canvasStyle
      },
      [
        h(&quot;div&quot;, { // 要挂载到echarts的元素
          style: this.canvasStyle,
          class: { &quot;charts-mask__status&quot;: this.dataEmpty || this.loading },
          ref: &quot;canvas&quot;
        }),
        h(DataEmpty, { // 无数据
          style: { display: this.dataEmpty ? &quot;&quot; : &quot;none&quot; }
        }),
        h(Loading, { // 加载中
          style: { display: this.loading ? &quot;&quot; : &quot;none&quot; }
        }),
        this.$slots.default
      ]
    )
  }
...
</code></pre>
    <blockquote>
      <p>
        <strong>设计组件时，在满足核心功能实现的同时还需要考虑如何处理边界情况，减少使用过程中的二次处理，并且又要暴露具体的接口来满足特殊情况对边界的处理</strong>。需要思考该组件在使用过程中会碰到什么特殊情况并一一罗列，总结归纳，在组件实现过程中一一解决并留有接口。
        ​ 来思考一下，图表组件设计中会遇到什么边界情况？
      </p>
      <ol>
        <li>图表实例大小显示</li>
        <li>浏览器窗口大小变化</li>
        <li>数据加载异常</li>
      </ol>
      <p>
        因此设计组件时需要解决这些边界情况：比如数据加载异常就可以通过显示加载动画等来达到界面友好的效果，另外通过向外暴露是否加载动画等接口让用户可以方便的使用；再比如浏览器窗口变化，那么可以通过包装浏览器窗口变化的监听、具体大小变化逻辑以及暴露部分配置接口 (resizeable、resize delay、check resize state、etc.) 来实现。
        现在回到
        <strong>实现 echarts 实例封装</strong> 的核心功能上，根据echarts官方配置手册，我们很清楚的知道只需要创建一个绑定具体html元素的echarts实例并传入配置项即可，另外每种类型图表仅配置对象不同。
        <strong>因此在组件级别上我们仅做通用元素绑定、echarts实例化以及统一数据和图表特例配置对象变化的监听即可，具体的图表配置对象的生成通过对应的函数去实现。</strong>
      </p>
    </blockquote>
    <h3>3.2 图表特例级别实现</h3>
    <blockquote>
      <p>
        <strong>core.js</strong> 已经对组件的各种情况做了统一处理，
        <u>接下来就是各类图表的个性化配置，每种图表配置向外暴露唯一的函数用于组合成最终的组件</u>。
        ​ 配置函数的设计就需要按照设计稿样式编写。通过调用内部各类基础函数，最终组合生成一个可以产生特定图表配置的函数。设计理念要求对于不同类型图表采用相同类型数据格式 (方便使用), 所以每种图表配置函数要对统一的数据格式做不同的操作，最终结合各种向外暴露的接口组合生成配置特例。
      </p>
    </blockquote>
    <pre><code
  class="language-javascript"
  lang="javascript"
>export const line = (keys, values, settings, extra) =&gt; {
  ...
  return options
}
</code></pre>
    <blockquote>
      <p>
        每种图表都有特殊配置，但是也有相通之处，无非就是数据项配置、维度配置、其他配置 (工具栏、图例、弹出框等)。因此每种图例的函数也是类似的，即
        <strong>根据传入的数据和配置经过处理最终组合成配置对象</strong>，另外还可以对一些通用配置再进行统一的封装。
        ​ 总结特例函数实现的基本流程就是
        <strong>处理数据=&gt;对应配置函数处理=&gt;组合最终配置=&gt;产出配置</strong>，我们拿折线图配置函数实现过程讲解。
      </p>
    </blockquote>
    <h4>3.2.1 处理数据</h4>
    <pre><code class="language-javascript" lang="javascript">	keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []
  // 数据 自定义单位
  let units = {}
  // 默认数据项
  let tempMetrics = keys.slice(1).map((v, i) =&gt; {
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
</code></pre>
    <blockquote>
      <p>上面的代码对数据做了部分处理, 以及默认配置，方便后续操作</p>
    </blockquote>
    <h4>3.2.2 对应配置函数处理</h4>
    <blockquote>
      <p>将处理好的数据传入对应的配置函数，由对应函数根据传参产出配置片段</p>
    </blockquote>
    <pre><code class="language-javascript" lang="javascript">const series = getSeries({...})
</code></pre>
    <pre><code class="language-javascript" lang="javascript">function getSeries ({...}) {
  const series = []
  const stackMap = stack &amp;&amp; stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)
  metrics.forEach((item, index) =&gt; {
    let seriesItem = {
      name: labelMap[item] || item,
      type: &quot;line&quot;,
      data: dataTemp[item],
      ...
    }
    if (stack &amp;&amp; stackMap[item]) seriesItem.stack = stackMap[item]
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
</code></pre>
    <h4>3.2.3 产出最终配置</h4>
    <blockquote>
      <p>通过组合各配置函数输出配置片段完成对应图表的配置</p>
    </blockquote>
    <pre><code class="language-javascript" lang="javascript">	
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
</code></pre>
    <h2>4. 总结</h2>
    <blockquote>
      <p>在封装组件前应当有大量的实践，只有不断的实践才能抽象出通用逻辑，再进行封装。封装组件不单单是对功能的实现还需要考虑全面：例如组件生命周期管理、组件参数配置、边界情况处理以及友好的用户体验等等，另外还需要注意组件的可复用性(比如提供各种插槽)、简单配置等。</p>
    </blockquote>`,
  },
  {
    title: '组件级别参数',
    type: 'template',
    html: `<h3>组件级别参数 (props)</h3>
    <figure><table>
    <thead>
    <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
    <tbody><tr><td style='text-align:center;' >data</td><td style='text-align:center;' >数据</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >settings</td><td style='text-align:center;' >特例配置项(图表实例级别参数)</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >width</td><td style='text-align:center;' >组件宽度 (echarts canvas宽度)</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;100%&quot;</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >height</td><td style='text-align:center;' >组件高度 (echarts canvas高度)</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;100%&quot;</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >tooltipVisible</td><td style='text-align:center;' >echarts tooltip 是否显示</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >true</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >legendVisible</td><td style='text-align:center;' >echarts legend 是否显示</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >true</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >resizeable</td><td style='text-align:center;' >echarts 实例是否可改变大小</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >true</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >cancelResizeCheck</td><td style='text-align:center;' >取消改变大小时的检测</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >resizeDelay</td><td style='text-align:center;' >改变大小前延迟时间</td><td style='text-align:center;' >Number</td><td style='text-align:center;' >200(ms)</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >changeDelay</td><td style='text-align:center;' >改变echarts前延迟时间(初始化、数据、配置项变化)</td><td style='text-align:center;' >Number</td><td style='text-align:center;' >0</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >colors</td><td style='text-align:center;' >echarts 配置项: 颜色数组</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >tooltipFormatter</td><td style='text-align:center;' >tooltip formatter 函数</td><td style='text-align:center;' >Function</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >dataEmpty</td><td style='text-align:center;' >无数据标记 (显示无数据提醒)</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >loading</td><td style='text-align:center;' >加载中标记 (显示加载中提醒)</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >beforeOptionSet</td><td style='text-align:center;' >生命周期函数：在配置项传入setOption函数前触发(可修改配置项)</td><td style='text-align:center;' >Function</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >beforeResize</td><td style='text-align:center;' >生命周期函数：在echarts实例大小改变前触发(可修改配置项)</td><td style='text-align:center;' >Function</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
    </table></figure>
    <h4>data (数据项)</h4>
    <pre><code class='language-javascript' lang='javascript'>// 格式：
    {
      keys: [&quot;日期&quot;, &quot;访问用户&quot;, &quot;下单用户&quot;],
      values: [
        { 日期: &quot;1/1&quot;, 访问用户: 1393, 下单用户: 1093 },
        { 日期: &quot;1/2&quot;, 访问用户: 3530, 下单用户: 3230 },
        { 日期: &quot;1/3&quot;, 访问用户: 2923, 下单用户: 2623 },
        { 日期: &quot;1/4&quot;, 访问用户: 1723, 下单用户: 1423 },
        { 日期: &quot;1/5&quot;, 访问用户: 3792, 下单用户: 3492 },
        { 日期: &quot;1/6&quot;, 访问用户: 4593, 下单用户: 4293 }
      ]
    }
    </code></pre>
    <blockquote><p>数据由 <strong>纬度 (dimension)</strong> 和 <strong>指标 (metrics)</strong> 组成 (默认 <strong>keys</strong> 首项是纬度, 其余项为指标. <strong>values</strong> 是相应的数据集合)
    <strong>纬度</strong>：数据的属性 (关键项)
    <strong>指标</strong>：量化衡量标准 (相对关键项的衡量数据)
    上述实例中，<strong>日期</strong> 纬度表示每组数据的日期，指标则是相对日期的 <strong>访问用户量</strong> 和 <strong>下单用户量</strong></p>
    </blockquote>
    <h4>settings (特例配置项)</h4>
    <blockquote><p>其主要作用是搜集所有图表实例级别参数，方便管理</p>
    </blockquote>
    <h4>数据格式</h4>
    <blockquote><p>由于日常开发中我们的数据往往都是特殊的，带有不同的含义。因此不同的数据会有不同的数据格式，目前包含以下几种数据格式</p>
    <ol>
    <li><strong>rmb</strong>：表示数据为人民币格式</li>
    <li><strong>percent</strong>：表示数据为百分比格式</li>
    <li><strong>people</strong>：表示数据为人数格式</li>
    <li><strong>normal</strong>：表示数据按照其本身字面意识，不做格式化</li>
    
    </ol>
    </blockquote>
    `,
  },
]

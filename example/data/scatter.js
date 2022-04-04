export default {
  name: '散点图',
  type: 'scatter',
  html: `<h4>Scatter (散点图) 配置参数</h4>
  <figure><table>
  <thead>
  <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
  <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys中除第0位外其他项的数组</td><td style='text-align:center;' >[&quot;aaa&quot;, &quot;bbb&quot;]</td></tr><tr><td style='text-align:center;' >axisVisible</td><td style='text-align:center;' >坐标轴显示状态</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >[true, true] (0:x轴、1:y轴)</td><td style='text-align:center;' >[true, false]</td></tr><tr><td style='text-align:center;' >xAxisName</td><td style='text-align:center;' >x轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含x轴名称的数组</td><td style='text-align:center;' >[&quot;我是x轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisName</td><td style='text-align:center;' >y轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含y轴名称的数组</td><td style='text-align:center;' >[&quot;我是y轴名称&quot;]</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >symbolType</td><td style='text-align:center;' >标记类型</td><td style='text-align:center;' >String Function</td><td style='text-align:center;' >&quot;circle&quot;</td><td style='text-align:center;' >&quot;rect&quot;</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
  </table></figure>
  `,
  data: [
    {
      name: '基础散点图',
      data: {
        keys: ['日期', '访问用户', 'VIP用户'],
        values: [
          { 日期: '1/1', 访问用户: 1393, VIP用户: 500 },
          { 日期: '1/2', 访问用户: 3530, VIP用户: 321 },
          { 日期: '1/3', 访问用户: 2923, VIP用户: 456 },
          { 日期: '1/4', 访问用户: 1723, VIP用户: 673 },
          { 日期: '1/5', 访问用户: 3792, VIP用户: 812 },
          { 日期: '1/6', 访问用户: 3000, VIP用户: 379 },
        ],
      },
      settings: {},
    },
    {
      name: '设置 symbol 样式',
      data: {
        keys: ['日期', '访问用户'],
        values: [
          { 日期: '1/1', 访问用户: 1393 },
          { 日期: '1/2', 访问用户: 3530 },
          { 日期: '1/3', 访问用户: 2923 },
          { 日期: '1/4', 访问用户: 1723 },
          { 日期: '1/5', 访问用户: 3792 },
          { 日期: '1/6', 访问用户: 4593 },
        ],
      },
      settings: {
        symbolType: 'triangle',
      },
    },
    {
      name: '显示轴线名称',
      data: {
        keys: ['日期', '访问用户'],
        values: [
          { 日期: '1/1', 访问用户: 1393 },
          { 日期: '1/2', 访问用户: 3530 },
          { 日期: '1/3', 访问用户: 2923 },
          { 日期: '1/4', 访问用户: 1723 },
          { 日期: '1/5', 访问用户: 3792 },
          { 日期: '1/6', 访问用户: 4593 },
        ],
      },
      settings: {
        xAxisName: ['日期/天'],
        yAxisName: ['访问量/人'],
      },
    },
    {
      name: '设置别名',
      data: {
        keys: ['date', 'visitor'],
        values: [
          { date: '1/1', visitor: 1393 },
          { date: '1/2', visitor: 3530 },
          { date: '1/3', visitor: 2923 },
          { date: '1/4', visitor: 1723 },
          { date: '1/5', visitor: 3792 },
          { date: '1/6', visitor: 4593 },
        ],
      },
      settings: {
        labelMap: {
          visitor: '访问用户',
        },
      },
    },
    {
      name: '设置默认格式及自定义数据格式',
      data: {
        keys: ['日期', ['访问用户', 'people']],
        values: [
          { 日期: '1/1', 访问用户: 1393 },
          { 日期: '1/2', 访问用户: 3530 },
          { 日期: '1/3', 访问用户: 2923 },
          { 日期: '1/4', 访问用户: 1723 },
          { 日期: '1/5', 访问用户: 3792 },
          { 日期: '1/6', 访问用户: 4593 },
        ],
      },
      settings: {
        defaultUnit: 'people',
      },
    },
  ],
}

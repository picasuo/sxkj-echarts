export default {
  name: '条形图',
  type: 'bar',
  html: `<h4>Bar (条形图) 配置参数</h4>
  <figure><table>
  <thead>
  <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
  <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[1]的数组</td><td style='text-align:center;' >[&quot;aaa&quot;]</td></tr><tr><td style='text-align:center;' >axisVisible</td><td style='text-align:center;' >坐标轴显示状态</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >[true, true] (0:x轴、1:y轴)</td><td style='text-align:center;' >[true, false]</td></tr><tr><td style='text-align:center;' >xAxisName</td><td style='text-align:center;' >x轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含x轴名称的数组</td><td style='text-align:center;' >[&quot;我是x轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisName</td><td style='text-align:center;' >y轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含y轴名称的数组</td><td style='text-align:center;' >[&quot;我是y轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisType</td><td style='text-align:center;' >Y轴类型 官方类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;category&quot;</td><td style='text-align:center;' >&quot;value&quot;</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >barStyleType</td><td style='text-align:center;' >bar 类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;normal&quot;/&quot;circle&quot;</td></tr><tr><td style='text-align:center;' >showMainBar</td><td style='text-align:center;' >显示main bar的标记</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >showBackground</td><td style='text-align:center;' >显示背景 bar</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >showDiffColor</td><td style='text-align:center;' >bar 显示不同颜色</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >labelPosition</td><td style='text-align:center;' >显示标记的位置</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;outside&quot;</td><td style='text-align:center;' >&quot;outside&quot;/&quot;inside&quot;</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
  </table></figure>
  `,
  data: [
    {
      name: '基础条形图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        showColor: true,
        barwidth: 30,
      },
      colors: [
        '#4883FB',
        '#6395FB',
        '#76A2FC',
        '#88AEFC',
        '#9BBBFD',
        '#ACC7FD',
        '#C8D7F6',
        '#D3DFF8',
        '#D8E2F7',
        '#E0E8F8',
      ],
    },
    {
      name: 'show main bar label',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        showMainBar: true,
        defaultUnit: 'set_customer_rate',
      },
    },
    {
      name: '修改 bar 样式',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        barStyleType: 'circle',
      },
    },
    {
      name: '修改 bar 颜色',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        showMainBar: true,
        showDiffColor: true,
        defaultUnit: 'set_customer_rate',
      },
    },
    {
      name: '显示背景',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        showBackground: true,
      },
    },
    {
      name: '更改 label 位置',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        showBackground: true,
        labelPosition: 'inside',
      },
    },
    {
      name: '设置默认单位及自定义数据单位',
      data: {
        keys: ['类型', ['访问用户', 'percent']],
        values: [
          { 类型: '服饰鞋区', 访问用户: 0.25 },
          { 类型: '餐饮美区', 访问用户: 0.4521 },
          { 类型: '亲子项区', 访问用户: 0.33 },
          { 类型: '母婴产区', 访问用户: 0.361 },
          { 类型: '数码家电', 访问用户: 0.63 },
          { 类型: '休闲区', 访问用户: 0.193 },
        ],
      },
      settings: {
        defaultUnit: 'percent',
        showBackground: true,
      },
    },
    {
      name: '设置 label 别名',
      data: {
        keys: ['type', ['visitor', 'percent']],
        values: [
          { type: '服饰鞋区', visitor: 0.25 },
          { type: '餐饮美区', visitor: 0.4521 },
          { type: '亲子项区', visitor: 0.33 },
          { type: '母婴产区', visitor: 0.361 },
          { type: '数码家电', visitor: 0.63 },
          { type: '休闲区', visitor: 0.193 },
        ],
      },
      settings: {
        labelMap: {
          visitor: '访问用户',
        },
        showBackground: true,
      },
    },
  ],
}

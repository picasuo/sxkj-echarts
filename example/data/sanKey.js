export default {
  name: '桑基图',
  type: 'sanKey',
  html: `<h4>sanKey (桑基图) 配置参数</h4>
      <figure><table>
      <thead>
      <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
      <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[1]的数组</td><td style='text-align:center;' >[&quot;aaa&quot;]</td></tr><tr><td style='text-align:center;' >axisVisible</td><td style='text-align:center;' >坐标轴显示状态</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >[true, true] (0:x轴、1:y轴)</td><td style='text-align:center;' >[true, false]</td></tr><tr><td style='text-align:center;' >xAxisName</td><td style='text-align:center;' >x轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含x轴名称的数组</td><td style='text-align:center;' >[&quot;我是x轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisName</td><td style='text-align:center;' >y轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含y轴名称的数组</td><td style='text-align:center;' >[&quot;我是y轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisType</td><td style='text-align:center;' >Y轴类型 官方类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;category&quot;</td><td style='text-align:center;' >&quot;value&quot;</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >barStyleType</td><td style='text-align:center;' >bar 类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;normal&quot;/&quot;circle&quot;</td></tr><tr><td style='text-align:center;' >showMainBar</td><td style='text-align:center;' >显示main bar的标记</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >showBackground</td><td style='text-align:center;' >显示背景 bar</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >showDiffColor</td><td style='text-align:center;' >bar 显示不同颜色</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >labelPosition</td><td style='text-align:center;' >显示标记的位置</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;outside&quot;</td><td style='text-align:center;' >&quot;outside&quot;/&quot;inside&quot;</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
      </table></figure>
      `,
  data: [
    {
      name: '桑基图',
      data: {
        keys: [
          {
            name: '永辉超市',
            depth: 0,
          },
          {
            name: '肯德基',
            depth: 1,
          },
          {
            name: '周大福',
            depth: 1,
          },
          {
            name: '阿香米线',
            depth: 1,
          },
          {
            name: '中国李宁',
            depth: 2,
          },
          {
            name: 'vivo',
            depth: 2,
          },
          {
            name: 'OPPO',
            depth: 2,
          },
          {
            name: 'Apple',
            depth: 2,
          },
          {
            name: '华为',
            depth: 2,
          },
          {
            name: '三星',
            depth: 2,
          },
        ],
        values: [
          { source: '永辉超市', target: '肯德基', value: 275 },
          { source: '永辉超市', target: '周大福', value: 41 },
          { source: '永辉超市', target: '阿香米线', value: 43 },
          {
            source: '肯德基',
            target: '中国李宁',
            value: 152,
            currentValue: 45,
          },
          { source: '肯德基', target: 'vivo', value: 123 },
          { source: '周大福', target: 'Apple', value: 26 },
          { source: '周大福', target: 'OPPO', value: 15 },
          { source: '阿香米线', target: '华为', value: 23 },
          { source: '阿香米线', target: '三星', value: 20 },
        ],
      },
      settings: {
        grid: {},
        //树状结构深度 必传！！！！
        depth: 3,
      },
    },

    {
      name: '桑基图引流分流',
      data: {
        keys: [
          {
            name: '永辉超市',
            depth: 0,
          },
          {
            name: '肯德基',
            depth: 0,
          },
          {
            name: '周大福',
            depth: 0,
          },
          {
            name: '阿香米线',
            depth: 0,
          },
          {
            name: '中国李宁',
            depth: 1,
          },
          {
            name: 'vivo',
            depth: 2,
          },
          {
            name: 'OPPO',
            depth: 2,
          },
          {
            name: 'Calivn Klein Underwear',
            depth: 2,
          },
          {
            name: '华为',
            depth: 2,
          },
          {
            name: '三星',
            depth: 2,
          },
        ],
        values: [
          { source: '永辉超市', target: '中国李宁', value: 200 },
          { source: '肯德基', target: '中国李宁', value: 40 },
          { source: '周大福', target: '中国李宁', value: 40 },
          {
            source: '阿香米线',
            target: '中国李宁',
            value: 100,
            currentValue: 45,
          },
          { source: '中国李宁', target: 'vivo', value: 200 },
          { source: '中国李宁', target: 'Calivn Klein Underwear', value: 20 },
          { source: '中国李宁', target: 'OPPO', value: 50 },
          { source: '中国李宁', target: '华为', value: 10 },
          { source: '中国李宁', target: '三星', value: 100 },
        ],
      },
      settings: {
        grid: {},
        //树状结构深度 必传！！！！
        depth: 3,
        //系列名称显示长度 默认为4
        length: 5,
      },
    },
  ],
}

export default {
  name: '旭日图',
  type: 'sunburst',
  html: `<h4>sunburst (旭日图) 配置参数</h4>
      <figure><table>
      <thead>
      <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
      <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[1]的数组</td><td style='text-align:center;' >[&quot;aaa&quot;]</td></tr><tr><td style='text-align:center;' >axisVisible</td><td style='text-align:center;' >坐标轴显示状态</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >[true, true] (0:x轴、1:y轴)</td><td style='text-align:center;' >[true, false]</td></tr><tr><td style='text-align:center;' >xAxisName</td><td style='text-align:center;' >x轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含x轴名称的数组</td><td style='text-align:center;' >[&quot;我是x轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisName</td><td style='text-align:center;' >y轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含y轴名称的数组</td><td style='text-align:center;' >[&quot;我是y轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisType</td><td style='text-align:center;' >Y轴类型 官方类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;category&quot;</td><td style='text-align:center;' >&quot;value&quot;</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >barStyleType</td><td style='text-align:center;' >bar 类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;normal&quot;/&quot;circle&quot;</td></tr><tr><td style='text-align:center;' >showMainBar</td><td style='text-align:center;' >显示main bar的标记</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >showBackground</td><td style='text-align:center;' >显示背景 bar</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >showDiffColor</td><td style='text-align:center;' >bar 显示不同颜色</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >labelPosition</td><td style='text-align:center;' >显示标记的位置</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;outside&quot;</td><td style='text-align:center;' >&quot;outside&quot;/&quot;inside&quot;</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
      </table></figure>
      `,
  data: [
    {
      name: '旭日图',
      data: {
        keys: [],

        // keys: {
        //   华东区: ['临平银泰'],
        //   华北区: ['临平银泰才能升级超级市场'],
        //   华南区: [],
        // },

        // values: {
        //   华东区: { 临平银泰: 230 },
        //   华北区: { 临平银泰才能升级超级市场: 10 },
        // },

        values: [
          {
            name: '北方区',
            children: [],
            value: 0,
          },
          {
            name: '温台区',
            children: [],
            value: 0,
          },
          {
            name: '宁波区',
            children: [],
            value: 0,
          },
          {
            name: '云南区',
            children: [],
            value: 0,
          },
          {
            name: '成渝区',
            children: [],
            value: 0,
          },
          {
            name: '杭州区',
            children: [
              {
                name: '临平银泰',
                value: 39963,
              },
            ],
            value: 39963,
          },
        ],
      },
      settings: {
        title: '云泰集团',
        totalValue: 39963,
      },
    },
  ],
}

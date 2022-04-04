export default {
  name: '雷达图',
  type: 'radar',
  html: `<h4>Radar (雷达图) 配置参数</h4>
  <figure><table>
  <thead>
  <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
  <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys中除第0位外其他项的数组</td><td style='text-align:center;' >[&quot;aaa&quot;, &quot;bbb&quot;]</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >radarShapeType</td><td style='text-align:center;' >图形</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;polygon&quot;</td><td style='text-align:center;' >&quot;polygon&quot;/&quot;circle&quot;</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >area</td><td style='text-align:center;' >是否展示为面积图</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >lineStyle</td><td style='text-align:center;' >series.lineStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >areaStyle</td><td style='text-align:center;' >series.areaStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
  </table></figure>
  `,
  data: [
    {
      name: '基础雷达图',
      data: {
        keys: ['日期', '访问用户', '下单用户', '下单率'],
        values: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        ],
      },
      settings: {
        max: 10000000,
        radius: '100%',
      },
    },
    {
      name: 'shap 类型',
      data: {
        keys: ['日期', '访问用户', '下单用户', '下单率'],
        values: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        ],
      },
      settings: {
        radarShapType: 'circle',
      },
    },
    {
      name: '自定义label',
      data: {
        keys: ['date', 'visitor', 'order', 'rate'],
        values: [
          { date: '1/1', visitor: 1393, order: 1093, rate: 0.32 },
          { date: '1/2', visitor: 3530, order: 3230, rate: 0.26 },
          { date: '1/3', visitor: 2923, order: 2623, rate: 0.76 },
        ],
      },
      settings: {
        labelMap: {
          visitor: '访问用户',
          order: '下单用户',
          rate: '下单率',
        },
      },
    },
    {
      name: '默认单位&自定义项单位',
      data: {
        keys: [
          '日期',
          '访问用户',
          '下单用户',
          ['下单率', 'percent'],
          'VIP用户',
        ],
        values: [
          {
            日期: '1/1',
            访问用户: 1393,
            下单用户: 1093,
            下单率: 0.32,
            VIP用户: 520,
          },
          {
            日期: '1/2',
            访问用户: 3530,
            下单用户: 3230,
            下单率: 0.26,
            VIP用户: 1592,
          },
          {
            日期: '1/3',
            访问用户: 2923,
            下单用户: 2623,
            下单率: 0.76,
            VIP用户: 987,
          },
        ],
      },
      settings: {
        defaultUnit: 'people',
      },
    },
    {
      name: 'area',
      data: {
        keys: ['日期', '访问用户', '下单用户', '下单率'],
        values: [{ 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 }],
      },
      settings: {
        area: true,
      },
    },
    {
      name: 'area',
      data: {
        keys: [
          '性别',
          '客流数',
          '餐饮',
          '零售',
          '哈哈集市',
          '儿童',
          '生活配套',
          '快时尚',
        ],
        values: [
          {
            性别: '女',
            餐饮: 38665,
            零售: 33897,
            哈哈集市: 3958,
            儿童: 2812,
            生活配套: 2539,
            快时尚: 2158,
            客流数: 84724,
          },
          {
            性别: '男',
            餐饮: 38665,
            零售: 33897,
            哈哈集市: 3958,
            儿童: 2812,
            生活配套: 2539,
            快时尚: 2158,
            客流数: 84724,
          },
        ],
      },
      settings: {
        area: true,
      },
    },
  ],
}

export default {
  name: '折线图',
  type: 'line',
  html: `<h4>Line (折线图) 配置参数</h4>
  <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys中除第0位外其他项的数组</td><td>["aaa", "bbb"]</td></tr><tr><td>axisVisible</td><td>坐标轴显示状态</td><td>Array</td><td>[true, true] (0:x轴、1:y轴)</td><td>[true, false]</td></tr><tr><td>xAxisName</td><td>x轴名称</td><td>Array</td><td>包含x轴名称的数组</td><td>["我是x轴名称"]</td></tr><tr><td>yAxisName</td><td>y轴名称</td><td>Array</td><td>包含y轴名称的数组</td><td>["我是y轴名称"]</td></tr><tr><td>xAxisType</td><td>x轴类型 官方类型</td><td>String</td><td>"category"</td><td>"value"</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>shadowAreas</td><td>阴影区域</td><td>Array	</td><td>--</td><td>[{name: '我愿意',start: '1月',end: '3月',}]</td></tr><tr><td>toolboxAttribute</td><td>左上角的按钮属性</td><td>Object	</td><td>其中icon可不传，有默认值</td><td>{name: '标记时间',icon:'path://xxxxx',toolboxFunction: function() {alert('11111')},}</td></tr><tr><td>area</td><td>是否展示为面积图</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>stack</td><td>堆叠选项</td><td>Object</td><td>--</td><td>{ count: ['访客人数', 'VIP人数'] }</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>lineStyle</td><td>series.lineStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>areaStyle</td><td>series.areaStyle</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
  `,
  data: [
    // {
    //   name: '基础折线图',
    //   data: {
    //     // keys: ['日期', '访问用户', '下单用户'],
    //     // values: [
    //     //   { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
    //     //   { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
    //     //   { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
    //     //   { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
    //     //   { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
    //     //   { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
    //     // ],

    //     keys: ['日期', '进店客流', '预算指标'],
    //     values: [
    //       {
    //         日期: '2020年05月',
    //         进店客流: 10,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年06月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年07月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年08月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年09月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年10月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年11月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2020年12月',
    //         进店客流: 0,
    //         预算指标: 0,
    //       },
    //       {
    //         日期: '2021年01月',
    //         进店客流: 0,
    //         预算指标: 10000,
    //       },
    //       {
    //         日期: '2021年02月',
    //         进店客流: 0,
    //         预算指标: 1234567,
    //       },
    //       {
    //         日期: '2021年03月',
    //         进店客流: 0,
    //         预算指标: 50000,
    //       },
    //       {
    //         日期: '2021年04月',
    //         进店客流: 0,
    //         预算指标: 123456,
    //       },
    //     ],
    //   },
    //   settings: {
    //     legendGrid: {
    //       //   left: 'left',
    //     },
    //     dblclick: function(params) {
    //       // console.log('line-dblclick', params)
    //     },
    //     dashed: [0, 1],
    //     markLine: {
    //       label: { formatter: '数值为：1023456' },
    //       value: 1023456,
    //     },
    //     // legendShow: false,
    //     yAxisName: ['客流量'],
    //     yAxisLabel: true,
    //   },
    // },
    // {
    //   name: '自定义显示纬度项',
    //   data: {
    //     keys: ['日期', ['访问用户', 'set_customer_rate'], '下单用户'],
    //     values: [
    //       { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
    //       { 日期: '1/2', 访问用户: 3030, 下单用户: 3230, 下单率: 0.26 },
    //       { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
    //       { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
    //       { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
    //       { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
    //     ],
    //   },
    //   settings: {
    //     dimension: ['日期'],
    //     metrics: ['访问用户', '下单用户'],
    //     defaultUnit: 'jian',
    //   },
    // },
    // {
    //   name: '设置别名及legend别名',
    //   data: {
    //     keys: ['date', 'visitor', 'order', 'rate'],
    //     values: [
    //       { date: '1/1', visitor: 1393, order: 1093, rate: 0.32 },
    //       { date: '1/2', visitor: 3530, order: 3230, rate: 0.26 },
    //       { date: '1/3', visitor: 2923, order: 2623, rate: 0.76 },
    //       { date: '1/4', visitor: 1723, order: 1423, rate: 0.49 },
    //       { date: '1/5', visitor: 3792, order: 3492, rate: 0.323 },
    //       { date: '1/6', visitor: 4593, order: 4293, rate: 0.78 },
    //     ],
    //   },
    //   settings: {
    //     labelMap: {
    //       visitor: '访问用户',
    //       order: '下单用户',
    //       rate: '下单率',
    //     },
    //     // labelMap 封装了一层 所以 legendMap 需要注意
    //     legendMap: {
    //       访问用户: '我是访问用户',
    //     },
    //   },
    // },
    // {
    //   name: 'stack & area',
    //   data: {
    //     keys: ['日期', '访问用户', '下单用户'],
    //     values: [
    //       { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
    //       { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
    //       { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
    //       { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
    //       { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
    //       { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
    //     ],
    //   },
    //   settings: {
    //     area: true,
    //     stack: {
    //       用户: ['访问用户', '下单用户'],
    //     },
    //   },
    // },
    // {
    //   name: '设置阴影区域',
    //   data: {
    //     keys: ['日期', '访问用户', '下单用户'],
    //     values: [
    //       { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
    //       { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
    //       { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
    //       { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
    //       { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
    //       { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
    //     ],
    //   },
    //   settings: {
    //     shadowAreas: [
    //       {
    //         name: '我愿意',
    //         start: '1/1',
    //         end: '1/3',
    //       },
    //     ],
    //   },
    // },
    // {
    //   name: '设置右上角点击事件',
    //   data: {
    //     keys: ['日期', '访问用户', '下单用户'],
    //     values: [
    //       { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
    //       { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
    //       { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
    //       { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
    //       { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
    //       { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
    //     ],
    //   },
    //   settings: {
    //     toolboxAttribute: {
    //       myToolTitle: '标记时间',
    //       myToolboxFunction: function() {
    //         alert('11111')
    //       },
    //       myToolShow: true,
    //       downloadName: '折线图下载',
    //       downloadShow: true,
    //     },
    //     toolboxGrid: {
    //       right: '10%',
    //       top: '10%',
    //     },
    //   },
    // },
    // {
    //   name: '默认单位及自定义数据单位',
    //   data: {
    //     keys: [
    //       '日期',
    //       '访问用户',
    //       ['下单用户', 'avg_stay_time'],
    //       ['下单率', 'percent'],
    //     ],
    //     values: [
    //       { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
    //       { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
    //       { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
    //       { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
    //       { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
    //       { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
    //     ],
    //   },
    //   settings: {
    //     defaultUnit: 'people',
    //     selected: {
    //       访问用户: false,
    //       下单用户: false,
    //       下单率: true,
    //     },
    //     titleText: '这就是一个标题',

    //     updateAxisPointer: function(params) {
    //       // console.log('event', params)
    //     },
    //   },
    // },
    {
      name: '堆叠折线图(效果图)',
      data: {
        keys: ['日期', '一次', '两次', '三次', '四次', '四次以上'],
        values: [
          {
            日期: '1/1',
            一次: 7800,
            两次: 9000,
            三次: 393,
            四次: 93,
            四次以上: 39,
          },
          {
            日期: '1/2',
            一次: 6200,
            两次: 323,
            三次: 530,
            四次: 230,
            四次以上: 32,
          },
          {
            日期: '1/3',
            一次: 5600,
            两次: 262,
            三次: 923,
            四次: 623,
            四次以上: 26,
          },
          {
            日期: '1/4',
            一次: 7020,
            两次: 142,
            三次: 723,
            四次: 423,
            四次以上: 14,
          },
          {
            日期: '1/5',
            一次: 7000,
            两次: 349,
            三次: 792,
            四次: 492,
            四次以上: 34,
          },
          {
            日期: '1/6',
            一次: 6288,
            两次: 585,
            三次: 148,
            四次: 700,
            四次以上: 124,
          },
        ],
      },
      settings: {
        area: true,
        stack: {
          到访次数: ['一次', '两次', '三次', '四次', '四次以上'],
        },
        focus: true,
      },
    },
  ],
}

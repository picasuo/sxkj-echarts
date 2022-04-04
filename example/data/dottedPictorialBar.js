export default {
  name: '虚线象形柱图',
  type: 'dottedpictorialbar',
  html: `<h4>dottedpictorialbar(象形柱图)配置参数</h4>
    <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys中除第0位外其他项的数组</td><td>["aaa", "bbb"]</td></tr><tr><td>axisVisible</td><td>坐标轴显示状态</td><td>Array</td><td>[true, true] (0:x轴、1:y轴)</td><td>[true, false]</td></tr><tr><td>xAxisName</td><td>x轴名称</td><td>Array</td><td>包含x轴名称的数组</td><td>["我是x轴名称"]</td></tr><tr><td>yAxisName</td><td>y轴名称</td><td>Array</td><td>包含y轴名称的数组</td><td>["我是y轴名称"]</td></tr><tr><td>xAxisType</td><td>x轴类型 官方类型</td><td>String</td><td>"category"</td><td>"value"</td></tr><tr><td>showDataZoom</td><td>是否显示拉条</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>stack</td><td>堆叠选项</td><td>Object</td><td>--</td><td>{ count: ['访客人数', 'VIP人数'] }</td></tr><tr><td>showLine</td><td>显示成线</td><td>Array</td><td>--</td><td>["访问用户"] (则该类数据显示成线)</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
    `,
  data: [
    {
      name: '虚线柱状图',
      data: {
        keys: [
          '时间',
          ['今日', 'line'],
          ['昨日', 'bar'],
          ['最高', 'pictorialBar'],
        ],

        values: [
          { 时间: '2021-9-10', 今日: 2250, 昨日: 1233, 最高: 2250 },
          { 时间: '2021-9-11', 今日: 1500, 昨日: 500, 最高: 3350 },
          { 时间: '2021-9-12', 今日: 500, 昨日: 300, 最高: 5450 },
          { 时间: '2021-9-13', 今日: 500, 昨日: 1000, 最高: 1050 },
          { 时间: '2021-9-14', 今日: 500, 昨日: 1500, 最高: 4350 },
          { 时间: '2021-9-15', 今日: 500, 昨日: 2000, 最高: 2350 },
        ],
      },
      settings: {
        yAxisAttribute: {
          splitLine: true,
          unit: '人',
        },

        labelMap: {
          今日: '今日实时',
        },
        shadowAreas: [
          {
            name: '我愿意',
            start: '2021-9-10',
            end: '2021-9-12',
          },
          {
            name: '我愿意',
            start: '2021-9-13',
            end: '2021-9-15',
          },
        ],

        titleText: '标题',

        selected: {
          今日实时: true,
          昨日: true,
          最高: false,
        },
        dottedBarColor: '#ddd',
      },
    },
    {
      name: '无数据报错排查',
      data: {
        keys: [
          '时间',
          ['今日', 'line'],
          ['昨日', 'bar'],
          ['最高', 'pictorialBar'],
        ],

        values: [
          //   { 时间: '2021-9-10', 今日: 2250, 昨日: 1233, 最高: 2250 },
          //   { 时间: '2021-9-11', 今日: 1500, 昨日: 500, 最高: 3350 },
          //   { 时间: '2021-9-12', 今日: 500, 昨日: 300, 最高: 5450 },
          //   { 时间: '2021-9-13', 今日: 500, 昨日: 1000, 最高: 1050 },
          //   { 时间: '2021-9-14', 今日: 500, 昨日: 1500, 最高: 4350 },
          //   { 时间: '2021-9-15', 今日: 500, 昨日: 2000, 最高: 2350 },
        ],
      },
      settings: {
        yAxisAttribute: {
          splitLine: true,
          unit: '人',
        },

        labelMap: {
          今日: '今日实时',
        },
        shadowAreas: [
          {
            name: '我愿意',
            start: '2021-9-10',
            end: '2021-9-12',
          },
          {
            name: '我愿意',
            start: '2021-9-13',
            end: '2021-9-15',
          },
        ],

        titleText: '标题',

        selected: {
          今日实时: true,
          昨日: true,
          最高: false,
        },
        dottedBarColor: '#ddd',
      },
    },
  ],
}

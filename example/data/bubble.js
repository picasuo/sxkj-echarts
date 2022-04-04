export default {
  name: '打卡气泡图',
  type: 'bubble',
  html: `<h4>bubble (气泡图) 配置参数</h4>
    <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys中除第0位外其他项的数组</td><td>["aaa", "bbb"]</td></tr><tr><td>axisVisible</td><td>坐标轴显示状态</td><td>Array</td><td>[true, true] (0:x轴、1:y轴)</td><td>[true, false]</td></tr><tr><td>xAxisName</td><td>x轴名称</td><td>Array</td><td>包含x轴名称的数组</td><td>["我是x轴名称"]</td></tr><tr><td>yAxisName</td><td>y轴名称</td><td>Array</td><td>包含y轴名称的数组</td><td>["我是y轴名称"]</td></tr><tr><td>xAxisType</td><td>x轴类型 官方类型</td><td>String</td><td>"category"</td><td>"value"</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>shadowAreas</td><td>阴影区域</td><td>Array	</td><td>--</td><td>[{name: '我愿意',start: '1月',end: '3月',}]</td></tr><tr><td>toolboxAttribute</td><td>左上角的按钮属性</td><td>Object	</td><td>其中icon可不传，有默认值</td><td>{name: '标记时间',icon:'path://xxxxx',toolboxFunction: function() {alert('11111')},}</td></tr><tr><td>area</td><td>是否展示为面积图</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>stack</td><td>堆叠选项</td><td>Object</td><td>--</td><td>{ count: ['访客人数', 'VIP人数'] }</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>lineStyle</td><td>series.lineStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>areaStyle</td><td>series.areaStyle</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
    `,
  data: [
    {
      name: '气泡图',
      data: {
        keys: [
          ['b站', '腾讯', '爱奇艺', '抖音', '其他平台'],
          ['冰菓', '路人', '文豪', '夏目', '火影'],
        ],
        values: [
          [0, 0, 500],
          [0, 1, 200],
          [0, 2, 1000],
          [0, 3, 400],
          [0, 4, 300],
          [1, 0, 100],
          [1, 1, 300],
          [1, 2, 400],
          [1, 3, 0],
          [1, 4, 100],
          [2, 0, 0],
          [2, 1, 300],
          [2, 2, 400],
          [2, 3, 0],
          [2, 4, 500],
          [3, 0, 0],
          [3, 1, 300],
          [3, 2, 400],
          [3, 3, 0],
          [3, 4, 500],
          [4, 0, 0],
          [4, 1, 300],
          [4, 2, 400],
          [4, 3, 0],
          [4, 4, 500],
        ],
      },
      settings: {
        // symbolSize: 50,
        grid: {
          right: '2%',
          left: '4%',
        },
      },
    },
  ],
}

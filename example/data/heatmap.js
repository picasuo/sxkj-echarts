export default {
  name: '热力图',
  type: 'heatmap',
  html: `<h4>heatmap(热力图)配置参数</h4>
    <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys中除第0位外其他项的数组</td><td>["aaa", "bbb"]</td></tr><tr><td>axisVisible</td><td>坐标轴显示状态</td><td>Array</td><td>[true, true] (0:x轴、1:y轴)</td><td>[true, false]</td></tr><tr><td>xAxisName</td><td>x轴名称</td><td>Array</td><td>包含x轴名称的数组</td><td>["我是x轴名称"]</td></tr><tr><td>yAxisName</td><td>y轴名称</td><td>Array</td><td>包含y轴名称的数组</td><td>["我是y轴名称"]</td></tr><tr><td>xAxisType</td><td>x轴类型 官方类型</td><td>String</td><td>"category"</td><td>"value"</td></tr><tr><td>showDataZoom</td><td>是否显示拉条</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>stack</td><td>堆叠选项</td><td>Object</td><td>--</td><td>{ count: ['访客人数', 'VIP人数'] }</td></tr><tr><td>showLine</td><td>显示成线</td><td>Array</td><td>--</td><td>["访问用户"] (则该类数据显示成线)</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
    `,
  data: [
    {
      name: '基础热力图',
      data: {
        keys: [
          ['b站', '腾讯', '爱奇艺', '抖音', '其他平台'],
          ['冰菓', '路人', '文豪', '夏目', '火影'],
        ],
        values: [
          [0, 0, 5],
          [0, 1, 2],
          [0, 2, 1],
          [0, 3, 4],
          [0, 4, 3],
          [1, 0, 1],
          [1, 1, 3],
          [1, 2, 4],
          [1, 3, 0],
          [1, 4, 1],
          [2, 0, 0],
          [2, 1, 3],
          [2, 2, 4],
          [2, 3, 0],
          [2, 4, 5],
          [3, 0, 0],
          [3, 1, 3],
          [3, 2, 4],
          [3, 3, 0],
          [3, 4, 5],
          [4, 0, 0],
          [4, 1, 3],
          [4, 2, 4],
          [4, 3, 0],
          [4, 4, 5],
        ],
      },
      settings: {},
    },
  ],
}

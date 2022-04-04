export default {
  name: '饼图嵌套',
  type: 'pienest',
  html: `<h4>Pie (饼、环图) 配置参数</h4>
    <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys[1]的数组</td><td>["aaa"]</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>isRing</td><td>是否为环</td><td>Boolean</td><td>False</td><td>true</td></tr><tr><td>isRadius</td><td>是否为圆角</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>roseType</td><td>南丁格尔环类型</td><td>String</td><td>false</td><td>"radius"/"area"</td></tr><tr><td>isDoubleRing</td><td>是否为嵌套环形图</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>radius</td><td>半径 (范围)</td><td>String Array Number</td><td>isRing ? ['50%', '70%'] : '70%'</td><td>30</td></tr><tr><td>selectedMode</td><td>选中模式</td><td>String Boolean</td><td>false</td><td>"single"/"multiple"/false</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>labelLine</td><td>series.labelLine</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
    `,
  data: [
    {
      name: '树形嵌套',
      data: {
        keys: ['男', '女'],
        values: [
          {
            '2号门': 2252,
            '3号门': 2501,
            其他: 6199,
            运动场入口: 1890,
            all_flow: 12842,
            name: '男',
          },
          {
            '3号门': 2612,
            其他: 6985,
            永辉超市主入口: 3231,
            运动场入口: 2301,
            all_flow: 15129,
            name: '女',
          },
        ],
      },
      settings: {
        // legendGrid: {
        //   left: 'right',
        // },
        // chartColors: ['#4883FB', '#F28B43', '#2BC196 '],
        grid: {
          left: '19%',
        },
        // legendUnit: '人',
      },
    },
    {
      name: '无数据测试',
      data: {
        keys: [],
        values: [],
      },
      settings: {
        // legendGrid: {
        //   left: 'right',
        // },
        // chartColors: ['#4883FB', '#F28B43', '#2BC196 '],
        grid: {
          left: '19%',
        },
        // legendUnit: '人',
      },
    },
  ],
}

export default {
  name: '饼图',
  type: 'pie',
  html: `<h4>Pie (饼、环图) 配置参数</h4>
  <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys[1]的数组</td><td>["aaa"]</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>isRing</td><td>是否为环</td><td>Boolean</td><td>False</td><td>true</td></tr><tr><td>isRadius</td><td>是否为圆角</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>roseType</td><td>南丁格尔环类型</td><td>String</td><td>false</td><td>"radius"/"area"</td></tr><tr><td>isDoubleRing</td><td>是否为嵌套环形图</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>radius</td><td>半径 (范围)</td><td>String Array Number</td><td>isRing ? ['50%', '70%'] : '70%'</td><td>30</td></tr><tr><td>selectedMode</td><td>选中模式</td><td>String Boolean</td><td>false</td><td>"single"/"multiple"/false</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>labelLine</td><td>series.labelLine</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
  `,
  data: [
    {
      name: '基础饼图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        legendGrid: {
          right: '2%',
        },
        grid: {
          left: '19%',
        },
        legendUnit: '人',
      },
    },
    {
      name: '自定义label & 自定义legend',
      data: {
        keys: ['type', 'visitor'],
        values: [
          { type: '服饰鞋区', visitor: 393 },
          { type: '餐饮美区', visitor: 530 },
          { type: '亲子项区', visitor: 923 },
          { type: '母婴产区', visitor: 723 },
          { type: '数码家电', visitor: 792 },
          { type: '休闲区', visitor: 593 },
        ],
      },
      settings: {
        /**
         * pie 的 labelMap 可设置 数据项名称的别名、对应数据项的label别名、对应数据项的tooltip别名、legend别名
         */
        labelMap: {
          visitor: '访问用户',
          亲子项区: '我是亲子项区',
        },
        legendMap: {
          服饰鞋区: '我是服饰鞋区',
        },
        //是否删除legend中的百分比
        deletePercent: true,
        //控制外围的label是否显示
        label: {
          show: true,
        },
        //控制labelLine是否显示
        labelLine: {
          show: true,
          length: 17,
          length2: 27,
        },
        //控制外圈label为图例名称/对应的百分比
        onlyPercent: true,
        center: ['50%', '50%'],
      },
    },
    {
      name: '基础环图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        isRing: true,
      },
    },
    {
      name: '圆角环图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        isRing: true,
        isRadius: true,
      },
    },
    {
      name: '南丁格尔环图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        roseType: 'radius',
      },
    },
    {
      name: '嵌套环形图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          [
            { 类型: '服饰鞋区', 访问用户: 393 },
            { 类型: '餐饮美区', 访问用户: 530 },
          ],
          [
            { 类型: '亲子项区', 访问用户: 923 },
            { 类型: '母婴产区', 访问用户: 723 },
            { 类型: '数码家电', 访问用户: 792 },
            { 类型: '休闲区', 访问用户: 593 },
          ],
        ],
      },
      settings: {
        isDoubleRing: true,
      },
    },
    {
      name: '默认单位&自定义项单位',
      data: {
        keys: ['类型', ['访问用户', 'people']],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        defaultUnit: 'people',
      },
    },
    {
      name: '自定义 radius & 选中模式',
      data: {
        keys: ['类型', ['访问用户', 'people']],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        radius: 70,
        selectedMode: 'single',
      },
    },
  ],
}

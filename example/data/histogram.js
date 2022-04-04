export default {
  name: '柱状图',
  type: 'histogram',
  html: `<h4>histogram (柱状图) 配置参数</h4>
  <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>["XXX"]</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys中除第0位外其他项的数组</td><td>["aaa", "bbb"]</td></tr><tr><td>axisVisible</td><td>坐标轴显示状态</td><td>Array</td><td>[true, true] (0:x轴、1:y轴)</td><td>[true, false]</td></tr><tr><td>xAxisName</td><td>x轴名称</td><td>Array</td><td>包含x轴名称的数组</td><td>["我是x轴名称"]</td></tr><tr><td>yAxisName</td><td>y轴名称</td><td>Array</td><td>包含y轴名称的数组</td><td>["我是y轴名称"]</td></tr><tr><td>xAxisType</td><td>x轴类型 官方类型</td><td>String</td><td>"category"</td><td>"value"</td></tr><tr><td>showDataZoom</td><td>是否显示拉条</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>defaultUnit</td><td>图表数据默认单位</td><td>String</td><td>"normal"</td><td>"percent"/"people"/"rmb"/"normal"</td></tr><tr><td>stack</td><td>堆叠选项</td><td>Object</td><td>--</td><td>{ count: ['访客人数', 'VIP人数'] }</td></tr><tr><td>showLine</td><td>显示成线</td><td>Array</td><td>--</td><td>["访问用户"] (则该类数据显示成线)</td></tr><tr><td>legendMap</td><td>图例别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期图例别名' }</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{ date: '我是日期标签别名' }</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
  `,
  data: [
    {
      name: '基础柱状图',
      data: {
        keys: ['类型', ['访问用户', 'jian']],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 1000 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        toolboxAttribute: {
          myToolTitle: '标记时间',
          myToolboxFunction: function() {
            alert('11111')
          },
          myToolShow: true,
          downloadName: '下载',
          downloadShow: true,
        },
        toolboxGrid: {
          right: '10%',
          top: '10%',
        },
        // yAxisName: ['人数'],
        // legendGrid: {
        //   left: '0%',
        // },
        defaultUnit: 'times',
        grid: {
          //   height: '20%',
          //   right: '50%',
        },
        //柱形上方显示文本
        label: {
          // unit: '间',
          // distance: 10,
          special: true,
          specialValue: -0.2,
          color: '#F63333',
        },
        axisVisible: [true, true],
        //y轴文本显示、分割线类型
        yAxisSetting: {
          label: {
            formatter: '',
          },
          lineStyle: 'dashed',
        },
      },
    },
    {
      name: '设置别名及legend别名',
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
        labelMap: {
          visitor: '访问用户',
        },
        // labelMap 封装了一层 所以 legendMap 需要注意
        legendMap: {
          访问用户: '我是访问用户',
        },
      },
    },
    {
      name: '设置拉条选择区间',
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
        yAxisName: ['人数'],
        showDataZoom: {
          show: true,
          //最多展示几组
          maxValueSpan: 3,
        },
      },
    },
    {
      name: '默认单位、自定义单位及坐标名称显示',
      data: {
        keys: ['类型', '访问用户', ['VIP用户', 'people']],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393, VIP用户: 102 },
          { 类型: '餐饮美区', 访问用户: 530, VIP用户: 173 },
          { 类型: '亲子项区', 访问用户: 1100, VIP用户: 29 },
          { 类型: '母婴产区', 访问用户: 723, VIP用户: 9 },
          { 类型: '数码家电', 访问用户: 792, VIP用户: 79 },
          { 类型: '休闲区', 访问用户: 593, VIP用户: 237 },
        ],
      },
      settings: {
        yAxisName: ['人数'],
        defaultUnit: 'people',
      },
      extra: {
        legendVisible: false,
      },
    },
    {
      name: '堆叠柱状图',
      data: {
        keys: ['类型', '访问用户', 'VIP用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393, VIP用户: 192 },
          { 类型: '餐饮美区', 访问用户: 530, VIP用户: 373 },
          { 类型: '亲子项区', 访问用户: 923, VIP用户: 629 },
          { 类型: '母婴产区', 访问用户: 723, VIP用户: 359 },
          { 类型: '数码家电', 访问用户: 792, VIP用户: 579 },
          { 类型: '休闲区', 访问用户: 593, VIP用户: 237 },
        ],
      },
      settings: {
        stack: {
          用户: ['访问用户', 'VIP用户'],
        },
      },
    },
    {
      name: '线+柱状图',
      data: {
        keys: ['类型', '访问用户', 'VIP用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393, VIP用户: 192 },
          { 类型: '餐饮美区', 访问用户: 530, VIP用户: 373 },
          { 类型: '亲子项区', 访问用户: 923, VIP用户: 629 },
          { 类型: '母婴产区', 访问用户: 723, VIP用户: 359 },
          { 类型: '数码家电', 访问用户: 792, VIP用户: 579 },
          { 类型: '休闲区', 访问用户: 593, VIP用户: 237 },
        ],
      },
      settings: {
        showLine: ['VIP用户'],
        titleText: '标题',
      },
    },
  ],
}

export default {
  name: '折柱混合图',
  type: 'barline',
  html: `<h4>BarLine (折线图) 数据项</h4>
  <figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>keys</td><td>纬度与指标</td><td>Array</td><td>无</td><td>["日期", [ "过店客流", "bar", "人"],[ "进店率", "line", "%" ]]</td></tr><tr><td>values</td><td>对应数据</td><td>Array</td><td>无</td><td>[{日期: '1月',  过店客流: 1393,进店率: 32, }]</td></tr></tbody></table></figure>
<h4>BarLine (折线图) 配置参数</h4>
<figure><table style='text-align:center;'><thead><tr><td>参数</td><td>简介</td><td>类型</td><td>默认配置</td><td>例子</td></tr></thead><tbody><tr><td>dimension</td><td>纬度</td><td>Array</td><td>包含keys[0]的数组</td><td>['XXX']</td></tr><tr><td>metrics</td><td>指标</td><td>Array</td><td>包含keys中除第0位外其他项的数组</td><td>['add','acc']</td></tr><tr><td>toolboxAttribute</td><td>左上角的按钮属性</td><td>Object</td><td>其中icon可不传，有默认值</td><td>{name: '标记时间',icon:'path://xxxxx',toolboxFunction: function() {alert('11111')},}</td></tr><tr><td>axisVisible</td><td>坐标轴显示状态</td><td>Array</td><td>[true, true] (0:x轴、1:y轴)</td><td>[true, true]</td></tr><tr><td>xAxisType</td><td>x轴类型 官方类型</td><td>String</td><td>"category"</td><td>"value"</td></tr><tr><td>yAxisAttribute</td><td>y轴属性</td><td>Array</td><td>其中position可不传，默认第一个为左侧;showNegative可以不传，默认不显示负轴</td><td>[{name: '客流数',unit: '人',min: 0,max: 5000, position:'left',"showNegative": true},]</td></tr><tr><td>showNegativeAxis</td><td>是否显示负轴区域</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>lineYAxisIndex</td><td>折线所对应的y轴</td><td>Number</td><td>默认为 1 ，对应右侧轴</td><td>1</td></tr><tr><td>shadowAreas</td><td>阴影区域</td><td>Array</td><td>--</td><td>[{name: '我愿意',start: '1月',end: '3月',}]</td></tr><tr><td>sortData</td><td>toolTip排序</td><td>String</td><td>'normal'</td><td>'asc'/'desc'</td></tr><tr><td>area</td><td>是否展示为面积图</td><td>Boolean</td><td>false</td><td>true</td></tr><tr><td>stack</td><td>堆叠选项</td><td>Object</td><td>--</td><td>{"客流": ["过店客流","进店客流"]}</td></tr><tr><td>labelMap</td><td>标签别名字典</td><td>Object</td><td>--</td><td>{"visitor": "访问用户","order": "下单用户","rate": "下单率"}</td></tr><tr><td>label</td><td>series.label</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>itemStyle</td><td>series.itemStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>lineStyle</td><td>series.lineStyle</td><td>Object</td><td>--</td><td>--</td></tr><tr><td>areaStyle</td><td>series.areaStyle</td><td>Object</td><td>--</td><td>--</td></tr></tbody></table></figure>
  `,
  data: [
    {
      name: '自定义显示纬度项',
      data: {
        keys: [
          '日期',
          ['过店客流', 'bar', '人'],
          ['进店客流', 'bar', '人'],
          ['进店去重客流', 'bar', '人'],
          ['进店率', 'line', '%'],
        ],
        values: [
          {
            日期: '1月',
            过店客流: { value: 1393, color: 'red' },
            进店客流: 1093,
            进店去重客流: 1334,
            进店率: 32,
          },
          {
            日期: '2月',
            过店客流: { value: 3530, color: 'red' },
            进店客流: 3230,
            进店去重客流: 2334,
            进店率: 26,
          },
          {
            日期: '3月',
            过店客流: { value: 2923, color: 'orange' },
            进店客流: 2623,
            进店去重客流: 2334,
            进店率: 76,
          },
          {
            日期: '4月',
            过店客流: { value: 1723, color: 'orange' },
            进店客流: 1423,
            进店去重客流: 4334,
            进店率: 49,
          },
          {
            日期: '5月',
            过店客流: { value: 3792, color: 'orange' },
            进店客流: 3492,
            进店去重客流: 1334,
            进店率: 32,
          },
          {
            日期: '6月',
            过店客流: { value: 3000, color: 'cyan' },
            进店客流: 4293,
            进店去重客流: 4334,
            进店率: 78,
          },
          {
            日期: '7月',
            过店客流: { value: 1393, color: 'cyan' },
            进店客流: 1093,
            进店去重客流: 2334,
            进店率: 32,
          },
          {
            日期: '8月',
            过店客流: { value: 3530, color: 'cyan' },
            进店客流: 3230,
            进店去重客流: 1934,
            进店率: 26,
          },
          {
            日期: '9月',
            过店客流: { value: 2923, color: 'cyan' },
            进店客流: 2623,
            进店去重客流: 1304,
            进店率: 76,
          },
          {
            日期: '10月',
            过店客流: { value: 1723, color: 'cyan' },
            进店客流: 1423,
            进店去重客流: 2334,
            进店率: 49,
          },
          {
            日期: '11月',
            过店客流: { value: 4006, color: 'cyan' },
            进店客流: 3492,
            进店去重客流: 1034,
            进店率: 32,
          },
          {
            日期: '12月',
            过店客流: { value: 3000, color: 'cyan' },
            进店客流: 4293,
            进店去重客流: 3334,
            进店率: 78,
          },
        ],
      },
      settings: {
        titleText: '标题',
        labelMap: {
          过店客流: '哈哈哈',
        },
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
          right: '3%',
          top: '6%',
        },
        yAxisAttribute: [
          {
            name: '客流数',
            unit: '人',
            min: 0,
            max: 5000,
          },
          {
            name: '进店率',
            unit: '%',
            min: 0,
            max: 100,
            showNegative: true,
          },
        ],
        showNegativeAxis: true,
        shadowAreas: [
          {
            name: '我愿意',
            start: '1月',
            end: '3月',
          },
          {
            name: '我愿意',
            start: '5月',
            end: '7月',
          },
        ],
        dblclick: function(params) {
          //   console.log('barline-dblclick', params)
        },

        // mouseover: function(params) {
        //   console.log('===', params)
        // },
      },
    },

    {
      name: '考虑values为空时报错情况',
      data: {
        // keys: [
        //   '日期',
        //   ['过店客流', 'bar', '人'],
        //   ['进店客流', 'bar', '人'],
        //   ['进店去重客流', 'bar', '人'],
        //   ['进店率', 'line', '%'],
        // ],
        // values: [],
        keys: [
          'name',
          ['节假活动日日均客流', 'bar', '人'],
          ['事件效应', 'line', '%'],
        ],
        dblclick: function(params) {
          //   console.log('barline-dblclick', params)
        },
        values: [
          {
            name: '周末',
            节假活动日日均客流: {
              value: 30000,
              color: '#4883FB',
            },
            事件效应: 'null',
          },
          {
            name: '元旦',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '中国人民警察节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '腊八节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '春节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '元宵节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '妇女节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '植树节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '愚人节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '清明节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '劳动节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '母亲节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '儿童节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '端午节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '父亲节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '建党节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '建军节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '测试节日时间重叠',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '七夕节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '中元节',
            节假活动日日均客流: {
              value: 0,
              color: '#4883FB',
            },
            事件效应: 0,
          },
          {
            name: '教师节',
            节假活动日日均客流: {
              value: 30000,
              color: '#4883FB',
            },
            事件效应: 187.32,
          },
          {
            name: '中秋节',
            节假活动日日均客流: {
              value: 20000,
              color: '#4883FB',
            },
            事件效应: 25.76,
          },
          {
            name: '国庆节',
            节假活动日日均客流: {
              value: 25000,
              color: 'red',
            },
            事件效应: 64.76,
          },
        ],
        // mouseover: function(params) {
        //   console.log('===', params)
        // },
      },
      settings: {
        legendGrid: {
          left: '30%',
          top: '20%',
        },

        yAxisAttribute: [
          {
            name: '客流量',
            unit: '人',
            min: 0,
            max: 50000,
          },
          {
            name: '事件效应',
            unit: '%',
            min: 0,
            max: 100,
            showNegative: true,
          },
        ],

        showNegativeAxis: true,
        dblclick: param => {
          //   console.log('----', param)
        }, // this.formatLine,
        // mouseover: function(params) {
        //   console.log('===', params)
        // },
      },
    },
    {
      name: '时间',
      data: {
        keys: [
          'time',
          ['客流高峰', 'bar'],
          ['客流低峰', 'bar'],
          ['高峰时段', 'line', 'isTime'],
          ['低峰时段', 'line', 'isTime'],
        ],
        values: [
          {
            time: '周一',
            客流高峰: 500,
            客流低峰: 100,
            高峰时段: 14,
            低峰时段: 14.33,
          },
          {
            time: '周二',
            客流高峰: 500,
            客流低峰: 100,
            高峰时段: 10,
            低峰时段: 12.01,
          },
          {
            time: '周三',
            客流高峰: 500,
            客流低峰: 100,
            高峰时段: 17,
            低峰时段: 8,
          },
        ],
      },
      colors: ['#4883FB', '#FFB44E', '#FF5C7B', '#2AE3AE'],
      settings: {
        sortData: '',
        showNegativeAxis: false,
        yAxisAttribute: [
          {
            name: '客流数',
            splitNumber: 7,
          },
          {
            name: '时间',
            isTime: true,
          },
        ],
      },
    },
  ],
}

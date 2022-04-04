import { getTooltip } from './utils'

const singleRadius = '70%'
const ringRadius = ['50%', '70%']

//外圈tooltip用到的数据
let dataObject = {}

function getSeries({ keys, values, chartColors, totalCircleNumber }) {
  //内圈数据
  let data0 = []
  //外圈数据
  let data1 = []

  //内圈百分比数组
  let formatData = []

  keys.map((key, i) => {
    //内圈单个对象数据
    const partTotal = values.find(o => o.name === key)['all_flow'] || 0

    let value0 = 0
    if (keys.length - 1 === i) {
      value0 = 100 - sum(formatData)
    } else {
      value0 = Math.round((partTotal / totalCircleNumber) * 100)

      formatData.push(value0)
    }

    data0.push({
      value: partTotal,
      name: key,
      itemStyle: {
        color: chartColors[i],
        borderColor: '#fff',
        borderWidth: 2,
      },
      labelLine: {
        length: 40,
        length2: 10,
      },
      label: {
        normal: {
          formatter: function(params) {
            return `${params.name} ${value0}%`
          },
        },
      },
    })

    const foundItem = values.find(o => o.name === key)
    let items = Object.keys(foundItem)
    let dataArray = []

    //外圈百分比数组
    let formatData1 = []

    items = items.filter(item => item !== 'all_flow' && item !== 'name')
    if (items.length > 0) {
      items.map((item, index) => {
        const itemValue = foundItem[item] || 0
        let value1 = 0
        if (items.length - 1 === index) {
          value1 = 100 - sum(formatData1)
        } else {
          value1 = Math.round((itemValue / partTotal) * 100)

          formatData1.push(value1)
        }

        // console.log('formatData1', formatData1)
        let obj = {
          value: itemValue,
          name: item,
          itemStyle: {
            color: value1 === 0 ? 'transparent' : chartColors[i + 2],
            opacity: 0.8,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            normal: {
              position: 'outside',
              // formatter: '{b} {d}% ',
              color: '#909090',
              formatter: function(params) {
                return `${params.name}  ${value1}%`
              },
            },
          },
        }
        dataArray.push(obj)
      })
    }

    dataObject[key] = dataArray
    data1 = data1.concat(...dataObject[key])
  })

  //   console.log('data0', data0)
  //   console.log('data1', data1)

  const series = [
    {
      name: '访问来源',
      type: 'pie', //饼图
      // left:100,
      animation: false,
      radius: ['32%', '70%'], //内环尺寸
      label: {
        normal: {
          position: 'inside',
          formatter: '{b} {d}% ',
          color: '#fff',
        },
      },
      labelLine: {
        normal: {
          show: true,
        },
      },
      data: data0,
    },
    {
      name: '访问来源',
      type: 'pie',
      // left:100,
      radius: ['70%', '84%'], //外环尺寸
      animation: false,
      data: data1,
    },
  ]

  return series
}

//数组求和
function sum(arr) {
  return eval(arr.join('+'))
}

export const pienest = (keys, values, settings, extra) => {
  //   console.log('series', series)

  let totalCircleNumber = 0
  values.map(value => {
    totalCircleNumber = totalCircleNumber + value.all_flow
  })

  const { tooltipVisible, legendVisible, tooltipFormatter } = extra

  const chartColors = ['#4884FB', '#FFB727', '#C1D6FF', '#FFDFA0']

  const series = getSeries({ keys, values, chartColors, totalCircleNumber })

  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'item',
      tooltipFormatter,
      keys,
      dataObject,
      sortData: 'desc',
    })
  const options = {
    series,
    tooltip,
  }

  return options
}

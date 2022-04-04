import { getTooltip } from './utils'
// function getTooltip(xkeys, ykeys) {
//   return {
//     trigger: 'item',
//     position: 'top',
//     padding: 2,
//     formatter: params => {
//       //   console.log('params', params)
//       const xName = xkeys[params.value[0]]
//       const yName = ykeys[params.value[1]]

//       return `<div><p style="color: #4A4A4A;">${xName}</p><hr /><p style="font-size:12px">${yName}:<span style="margin-left:5px">${params.value[2]}</span></p></div>`
//     },
//   }
// }

function getXAxis({ AxisType, xkeys }) {
  return {
    type: AxisType,
    data: xkeys,
    boundaryGap: false,
    splitLine: {
      show: true,
      lineStyle: {
        width: 2,
      },
    },
    axisLine: {
      show: false,
    },
  }
}

function getYAxis({ AxisType, ykeys }) {
  return {
    type: AxisType,
    data: ykeys,
    axisLine: {
      show: false,
    },
    axisLabel: {
      margin: 15,
      formatter: params => {
        // console.log(params)
        if (params.length > 3) params = `${params.slice(0, 3)}...`

        return params
      },
    },
  }
}

function getSeries({ values, label, itemStyle, symbolSize }) {
  const size = symbolSize ? symbolSize : 30
  const totalValue = []
  values.map(value => {
    totalValue.push(value[2])
  })

  const maxTotalValue = Math.max(...totalValue)

  let seriesItem = [
    {
      type: 'scatter',
      symbolSize: function(val) {
        // console.log(val)
        return (val[2] / maxTotalValue) * size
      },
      itemStyle: {
        color: 'rgba(72,131,251,0.65)',
      },
      data: values,
      animationDelay: function(idx) {
        return idx * 5
      },
      //   label: {
      //     show: false,
      //   },
      //   emphasis: {
      //     itemStyle: {
      //       shadowBlur: 10,
      //       shadowColor: 'rgba(0, 0, 0, 0.5)',
      //     },
      //   },
    },
  ]
  if (label) seriesItem.label = label
  if (itemStyle) seriesItem.emphasis.itemStyle = itemStyle
  return seriesItem
}

export const bubble = (keys, values, settings, extra) => {
  let xkeys = Array.isArray(keys) ? keys[0] : []
  let ykeys = Array.isArray(keys) ? keys[1] : []
  values = Array.isArray(values) ? values : []

  const {
    AxisType = 'category',
    label,
    itemStyle,
    grid,
    color,
    name,
    unit,
    symbolSize,
  } = settings
  //   const {} = extra

  //   const tooltip = getTooltip(xkeys, ykeys)
  const tooltip = getTooltip({
    triggerType: 'item',
    unit,
    xkeys,
    ykeys,
  })
  const xAxis = getXAxis({ AxisType, xkeys })
  const yAxis = getYAxis({ AxisType, ykeys })
  const series = getSeries({ values, label, itemStyle, symbolSize })

  const options = {
    xAxis,
    yAxis,
    series,
    tooltip,
    grid: {
      height: '50%',
      top: '10%',
      containLabel: true,
    },
  }
  if (grid) options.grid = grid
  return options
}

function getTooltip() {
  return {
    position: 'top',
    borderColor: 'rgba(29, 49, 82, 0.05)',
  }
}

function getXAxis({ AxisType, xkeys }) {
  return {
    type: AxisType,
    data: xkeys,
    splitArea: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
  }
}

function getYAxis({ AxisType, ykeys }) {
  return {
    type: AxisType,
    data: ykeys,
    splitArea: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
  }
}

function getSeries({ values, label, itemStyle, name }) {
  let seriesItem = [
    {
      name: name ? name : '热度',
      type: 'heatmap',
      data: values,
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ]
  if (label) seriesItem.label = label
  if (itemStyle) seriesItem.emphasis.itemStyle = itemStyle
  return seriesItem
}

function getVisualMap({ color, maxmin }) {
  return {
    min: maxmin ? maxmin[1] : 0,
    max: maxmin ? maxmin[0] : 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%',
    inRange: {
      color: color ? color : ['#E8EFFD', '#4883FB'],
    },
  }
}

function getMaxMin(values) {
  let temp = values.map(item => {
    return item[2]
  })
  let max = Math.max(...temp)
  let min = Math.min(...temp)
  return [max, min]
}

export const heatmap = (keys, values, settings, extra) => {
  let xkeys = Array.isArray(keys) ? keys[0] : []
  let ykeys = Array.isArray(keys) ? keys[1] : []
  values = Array.isArray(values) ? values : []
  var maxmin = getMaxMin(values)

  const {
    AxisType = 'category',
    label,
    itemStyle,
    grid,
    color,
    name,
  } = settings
  //   const {} = extra

  const tooltip = getTooltip()
  const xAxis = getXAxis({ AxisType, xkeys })
  const yAxis = getYAxis({ AxisType, ykeys })
  const series = getSeries({ values, label, itemStyle, name })
  const visualMap = getVisualMap({ color, maxmin })
  const options = {
    xAxis,
    yAxis,
    series,
    visualMap,
    tooltip,
    grid: {
      height: '50%',
      top: '10%',
    },
  }
  if (grid) options.grid = grid
  return options
}

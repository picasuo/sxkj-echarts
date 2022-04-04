import { DEFAULT_PIR_LEGEND } from '../../constants'
import { getTooltip } from '../../utils'

const singleRadius = '70%'
const ringRadius = ['50%', '70%']

function getLegend({
  dimension,
  metrics,
  isDoubleRing,
  values,
  labelMap,
  legendMap,
  units,
  legendUnit,
  deletePercent,
}) {
  let dim = dimension[0]
  let met = metrics[0]
  let temps = {}
  let data = []
  let count = 0
  values = isDoubleRing ? values[1] : values
  values.forEach(item => {
    data.push(labelMap[item[dim]] || item[dim])
    count += item[met]
    temps[labelMap[item[dim]] || item[dim]] = item[met]
  })
  if (legendUnit) {
    return Object.assign({}, DEFAULT_PIR_LEGEND, {
      data: data,
      formatter(str) {
        let percent = Math.round((temps[str] / count) * 100) + '%'
        return `${legendMap[str] || str}  ${percent}  ${
          temps[str]
        }${legendUnit}`
      },
    })
  } else if (deletePercent) {
    return Object.assign({}, DEFAULT_PIR_LEGEND, {
      data: data,
      formatter(str) {
        return `${legendMap[str] || str}`
      },
    })
  } else {
    return Object.assign({}, DEFAULT_PIR_LEGEND, {
      data: data,
      // name 被 labelMap 封装了一层 所以 legendMap 需要注意
      formatter(str) {
        let percent = Math.round((temps[str] / count) * 100) + '%'
        return `${legendMap[str] || str}  ${percent}`
        //   return `${legendMap[str] || str}  ${formatData(
        //     temps[str],
        //     units[met] || units.default,
        //   )} ${percent}`
      },
    })
  }
}

function getSeries({
  dimension,
  metrics,
  values,
  radius,
  isRadius,
  roseType,
  selectedMode,
  labelMap,
  label,
  itemStyle,
  labelLine,
  legendVisible,
  grid,
  onlyPercent,
  center,
}) {
  let borderRadius = 0
  if (isRadius) {
    borderRadius = 50
  }

  return metrics.map((item, index) => {
    let dim = dimension[0]
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'pie',
      radius,
      roseType,
      selectedMode,
      center: legendVisible ? ['30%', '50%'] : ['50%', '50%'],
      data: values
        .filter(v => v[item])
        .map(v => ({ name: labelMap[v[dim]] || v[dim], value: v[item] })),
      itemStyle: {
        borderRadius,
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: Object.assign(
        {},
        {
          show: !legendVisible,
          position: 'outside',
          formatter(parmas) {
            return onlyPercent
              ? `${Math.round(parmas.percent) + '%'}`
              : labelMap[parmas.name] || parmas.name
          },
        },
        label,
      ),
      labelLine: {
        length: 5,
        length2: 8,
      },
    }
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (labelLine) seriesItem.labelLine = labelLine
    if (grid) {
      seriesItem = {
        ...seriesItem,
        ...grid,
      }
    }
    if (center) {
      seriesItem = {
        ...seriesItem,
        center,
      }
    }
    return seriesItem
  })
}

function getDoubleSeries({
  dimension,
  metrics,
  values,
  radius,
  isRadius,
  selectedMode,
  labelMap,
  label,
  itemStyle,
  labelLine,
  legendVisible,
  grid,
}) {
  let seriesMap = []
  let borderRadius = 0
  if (isRadius) {
    borderRadius = 50
  }
  let seriesMap1 = metrics.map((item, index) => {
    let dim = dimension[0]
    let seriesItem = {
      ...grid,
      name: labelMap[item] || item,
      type: 'pie',
      radius: [0, '45%'],
      selectedMode,
      center: legendVisible ? ['30%', '50%'] : ['50%', '50%'],
      data: values[0]
        .filter(v => v[item])
        .map(v => ({ name: labelMap[v[dim]] || v[dim], value: v[item] })),
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: Object.assign(
        {},
        {
          show: legendVisible,
          position: 'inner',
          formatter(parmas) {
            return (
              labelMap[parmas.name] ||
              parmas.name + ' ' + Math.round(parmas.percent) + '%'
            )
          },
        },
        label,
      ),
      labelLine: {
        length: 5,
        length2: 8,
      },
    }
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (labelLine) seriesItem.labelLine = labelLine
    if (grid) {
      seriesItem = {
        ...seriesItem,
        ...grid,
      }
    }

    return seriesItem
  })
  seriesMap[0] = seriesMap1[0]
  let seriesMap2 = metrics.map((item, index) => {
    let dim = dimension[0]
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'pie',
      radius: ['55%', '65%'],
      selectedMode,
      center: legendVisible ? ['30%', '50%'] : ['50%', '50%'],
      data: values[1]
        .filter(v => v[item])
        .map(v => ({ name: labelMap[v[dim]] || v[dim], value: v[item] })),
      itemStyle: {
        borderRadius,
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: Object.assign(
        {},
        {
          show: !legendVisible,
          position: 'inner',
          formatter(parmas) {
            return labelMap[parmas.name] || parmas.name
          },
        },
        label,
      ),
      labelLine: {
        length: 5,
        length2: 8,
      },
    }
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (labelLine) seriesItem.labelLine = labelLine
    return seriesItem
  })
  seriesMap[1] = seriesMap2[0]
  return seriesMap
}

export const pie = (keys, values, settings, extra) => {
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []

  // 数据 自定义单位
  let units = {}
  // 默认数据项 最多1个数据项
  let tempMetrics = keys.slice(1, 2).map((v, i) => {
    if (Array.isArray(v)) {
      units[v[0]] = v[1]
      return v[0]
    }
    return v
  })

  const {
    // 纬度 def:keys[0]
    dimension = [keys[0]],
    // 自定义数据项
    metrics = tempMetrics,
    // default unit
    defaultUnit = 'normal',
    // 是否为环
    isRing = false,
    // 是否为圆角
    isRadius = false,
    //是否为南丁格尔环图
    roseType = false,
    //是否为嵌套环
    isDoubleRing = false,
    // 可显示区半径
    radius = isRing || roseType ? ringRadius : singleRadius,
    // 选中模式
    selectedMode = false,
    // legend 名称字典
    legendMap = {},
    // label 名称字典
    labelMap = {},
    /**
     * echarts opts
     */
    label,
    itemStyle,
    labelLine,
    grid,
    //图例单位
    legendUnit,
    //图例位置
    legendGrid,
    //去除百分号
    deletePercent,
    //label只显示百分比
    onlyPercent,
    //饼图中心坐标
    center,
  } = settings
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  units.default = defaultUnit

  let legend =
    legendVisible &&
    getLegend({
      dimension,
      metrics,
      isDoubleRing,
      values,
      labelMap,
      legendMap,
      units,
      legendUnit,
      deletePercent,
    })
  if (legendGrid) {
    legend = { ...legend, ...legendGrid }
  }
  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'item',
      tooltipFormatter,
      units,
    })
  let series
  if (isDoubleRing) {
    series = getDoubleSeries({
      dimension,
      metrics,
      values,
      radius,
      isRadius,
      selectedMode,
      labelMap,
      label,
      itemStyle,
      labelLine,
      legendVisible,
      //饼图相对于外盒的位置
      grid,
    })
  } else {
    series = getSeries({
      dimension,
      metrics,
      values,
      radius,
      isRadius,
      roseType,
      selectedMode,
      labelMap,
      label,
      itemStyle,
      labelLine,
      legendVisible,
      grid,
      //label只显示percent
      onlyPercent,
      //饼图中心坐标
      center,
    })
  }

  //   console.log('series', series)
  const options = {
    legend,
    tooltip,
    series,
    color: chartColors,
  }

  return options
}

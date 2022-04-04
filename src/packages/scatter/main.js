import { trunkText, valueMap, getTooltip } from '../../utils'
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_FONT_COLOR,
  DEFAULT_AXIS_COLOR2,
  DEFAULT_LABEL_COLOR,
} from '../../constants'

function getXAxis({ dimension, values, axisVisible, xAxisName }) {
  return dimension.map((item, index) => ({
    show: axisVisible[0],
    name: xAxisName[index] || '',
    data: values.map(v => v[item]),
    nameTextStyle: {
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      lineHeight: DEFAULT_LINE_HEIGHT,
      color: DEFAULT_LABEL_COLOR,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: DEFAULT_AXIS_COLOR2,
        width: 1,
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        type: 'solid',
        color: DEFAULT_AXIS_COLOR2,
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      margin: 13,
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      lineHeight: DEFAULT_LINE_HEIGHT,
      color: DEFAULT_FONT_COLOR,
      formatter: value => trunkText(value, 4),
    },
    axisTick: {
      show: false,
    },
  }))
}

function getYAxis({ axisVisible, yAxisName, max }) {
  return [
    {
      name: yAxisName[0] || '',
      show: axisVisible[1],
      nameGap: 24,
      max,
      nameTextStyle: {
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
        color: DEFAULT_LABEL_COLOR,
        align: 'left',
        padding: [0, 30, 0, 0],
      },
      // max: 100,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: DEFAULT_AXIS_COLOR2,
          width: 1,
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: DEFAULT_AXIS_COLOR2,
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        margin: 14,
        fontSize: DEFAULT_FONT_SIZE,
        lineHeight: DEFAULT_LINE_HEIGHT,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        color: DEFAULT_FONT_COLOR,
        // formatter: this.formatLabel
      },
      axisTick: {
        show: false,
      },
    },
  ]
}

function getSeries({
  dimension,
  values,
  metrics,
  symbolType,
  labelMap,
  label,
  itemStyle,
  chartColors,
}) {
  const series = []
  const dataTemp = valueMap(values, metrics, dimension)

  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'scatter',
      data: dataTemp[item],
      symbol: symbolType,
      symbolSize(value) {
        return Math.sqrt(value)
      },
      itemStyle: {
        normal: {
          shadowBlur: 4,
          shadowColor: 'rgba(0,0,0,0.28)',
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: `${chartColors[index]}7f`,
              },
              {
                offset: 1,
                color: `${chartColors[index]}de`,
              },
            ],
          },
        },
      },
    }
    if (label) seriesItem.label = label
    if (itemStyle) seriesItem.itemStyle = itemStyle
    series.push(seriesItem)
  })
  return series
}

export const scatter = (keys, values, settings, extra) => {
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []

  // 数据 自定义单位
  let units = {}
  // 默认数据项
  let tempMetrics = keys.slice(1).map((v, i) => {
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
    // visible slots:[xAxis, yAxis]
    axisVisible = [true, true],
    // xAxis name list
    xAxisName = [],
    // yAxis name list
    yAxisName = [],
    // default unit
    defaultUnit = 'normal',
    // label 名称字典
    labelMap = {},
    // echatrs symbol type
    symbolType = 'circle',
    /**
     * echarts opts
     */
    grid,
    label,
    itemStyle,
  } = settings
  const { tooltipVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  units.default = defaultUnit

  // 选出最大数据项值 1.2倍
  let max = Math.max.apply(
    null,
    metrics.flatMap(key => {
      return values.map(item => item[key])
    }),
  )
  let num = Math.pow(10, String(max).length - 1)
  max = Math.ceil((max * 1.2) / num) * num

  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'axis',
      tooltipFormatter,
      units,
    })
  const xAxis = getXAxis({
    dimension,
    values,
    axisVisible,
    xAxisName,
  })
  const yAxis = getYAxis({
    axisVisible,
    yAxisName,
    max,
  })
  const series = getSeries({
    dimension,
    values,
    metrics,
    symbolType,
    labelMap,
    label,
    itemStyle,
    chartColors,
  })
  const options = {
    tooltip,
    xAxis,
    yAxis,
    series,
    color: chartColors,
  }
  if (grid) options.grid = grid
  return options
}

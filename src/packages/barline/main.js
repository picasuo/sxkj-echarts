import { formatAxisLabel } from '../../utils'
import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_BARLINE_GRID,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LABEL_COLOR,
  DEFAULT_LEGEND_BAR_ICON,
  DEFAULT_LEGEND_LINE_ICON,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_TITLE_STYLE,
  DEFAULT_TOOLBOX_ICON,
  DEFAULT_DOWNLOAD_ICON,
} from '../../constants'
import { getMaxData, getTooltip, stack2Map, valueMap } from './utils'

//处理左上角指标图标
function getLegend({ metrics, labelMap, types, values }) {
  //   console.log('values', values)
  //   console.log(metrics, labelMap, types)

  return {
    right: '8%',
    itemHeight: 12,
    itemWidth: 12,
    itemGap: 25,
    top: 30,
    data: metrics.map((item, index) => {
      let icon = DEFAULT_LEGEND_BAR_ICON
      const obj = {
        name: labelMap[item] ? labelMap[item] : item,
        icon: icon,
      }
      if (types[index] === 'line') {
        obj.icon = DEFAULT_LEGEND_LINE_ICON
      } else {
        //如果指标对应的柱图有两种颜色
        // console.log('item', item)
        if (values.length > 0 && typeof values[0][item] === 'object') {
          obj['itemStyle'] = {
            color: '#4883fb',
          }
        }
      }

      return obj
    }),
  }
}

//标记时间
function getToolbox({
  myToolTitle,
  myToolShow = false,
  myToolIcon,
  myToolboxFunction,
  downloadName,
  downloadShow = false,
  downloadIcon,
}) {
  return {
    itemSize: 16,
    feature: {
      myTool: {
        show: myToolShow,
        title: myToolTitle,
        icon: myToolIcon ? myToolIcon : DEFAULT_TOOLBOX_ICON,
        iconStyle: {
          borderColor: 'rgba(72, 131, 251, 1)',
        },
        emphasis: {
          iconStyle: {
            textPosition: 'top',
          },
        },
        onclick: function() {
          myToolboxFunction()
        },
      },
      saveAsImage: {
        type: 'png',
        title: '',
        show: downloadShow,
        name: downloadName,
        icon: downloadIcon ? downloadIcon : DEFAULT_DOWNLOAD_ICON,
      },
    },
  }
}

//横坐标
function getXAxis({ dimension, values, axisVisible, xAxisType }) {
  //   console.log('dimension', dimension)
  //   console.log('values', values)
  //   console.log('axisVisible', axisVisible)
  //   console.log('xAxisType', xAxisType)
  return dimension.map((item, index) => ({
    type: xAxisType,
    data:
      values.length > 0
        ? values.map((row, index) => {
            return row[item]
          })
        : [],
    show: axisVisible[0],
    axisLabel: {
      show: true,
      margin: 10,
      color: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      lineHeight: DEFAULT_LINE_HEIGHT,
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: DEFAULT_AXIS_COLOR,
      },
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      inside: true,
      length: 6,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
      //
    },
    splitLine: {
      show: false,
    },
    // axisPointer: {
    //   type: 'line',
    // },
  }))
}

//纵坐标
function getYAxis(
  yAxisAttribute,
  showNegativeAxis,
  axisVisible,
  keys,
  values,
  metrics,
  dimension,
) {
  const y = yAxisAttribute.map(
    (
      {
        name = '',
        unit = '',
        min = 0,
        max = 100,
        position,
        splitNumber = 5,
        showNegative = true,
        isTime = false,
      },
      index,
    ) => {
      let padding = []

      const dataTemp = valueMap(values, metrics, dimension)
      if ((position && position === 'left') || index === 0) {
        padding = unit === '' ? [0, 20, 15, 0] : [0, 0, 15, -65]
        max = getMaxData(keys, dataTemp, splitNumber, 'bar')
      } else {
        padding = unit === '' ? [0, 0, 15, 20] : [0, -45, 15, 0]
        max = getMaxData(keys, dataTemp, splitNumber, 'line')
        // console.log('max', max)
      }
      if (showNegativeAxis) {
        splitNumber *= 2
        min -= max
      }

      return {
        type: 'value',
        show: axisVisible[1],
        name: name ? (unit ? name + '/' + unit : name) : '',
        nameTextStyle: {
          padding: padding,
        },
        interval: isTime ? 2 : (max - min) / splitNumber,
        min: isTime ? 8 : min,
        max: isTime ? 22 : max,
        position: position,
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter(value) {
            if (isTime) {
              value = value < 10 ? `0${value}` : value
              value = `${value}:00`
              return value
            } else {
              return formatAxisLabel(value) + unit
            }
            // if (showNegative) {
            //   return value + unit
            // } else {
            //   if (value >= 0) {
            //     return value + unit
            //   } else {
            //     return ''
            //   }
            // }
          },
          color: DEFAULT_FONT_COLOR,
          fontSize: DEFAULT_FONT_SIZE,
          fontFamily: DEFAULT_FONT_FAMILY,
          fontWeight: DEFAULT_FONT_WEIGHT,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: DEFAULT_AXIS_COLOR,
          },
        },
      }
    },
  )

  //   console.log('y', y)
  return y
}

function getSeries({
  dimension,
  values,
  metrics,
  area,
  stack,
  labelMap,
  label,
  itemStyle,
  lineStyle,
  areaStyle,
  chartColors,
  types,
  shadowAreas,
  lineYAxisIndex,
  barWidth,
}) {
  const series = []
  const stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)

  metrics.forEach((item, index) => {
    let seriesItem = {}
    if (types[index] === 'bar') {
      let transformedData = []
      if (Object.keys(dataTemp).length > 0) {
        transformedData = dataTemp[item].map((o, index) => {
          // console.log(
          //   'type',
          //   Object.prototype.hasOwnProperty.call(o['value'], 'color'),
          // )
          if (
            Object.prototype &&
            Object.prototype.hasOwnProperty.call(o['value'], 'color')
          ) {
            return {
              value: o['value'].value,
              itemStyle: { color: o['value'].color },
            }
          } else {
            return o.value
          }

          // return {
          //   ...o,
          //   itemStyle: { color: color },
          // }
        })
      }

      //   console.log('transformedData', transformedData)
      seriesItem = {
        name: labelMap[item] || item,
        type: types[index],
        barWidth: barWidth,
        data: transformedData,
        // itemStyle: { color: color },
      }
      //   console.log('seriesItem', seriesItem)
    } else {
      seriesItem = {
        name: labelMap[item] || item,
        type: types[index],
        yAxisIndex: lineYAxisIndex,
        data: dataTemp[item],
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              width: 1,
            },
          },
        },
      }
    }
    if (stack && stackMap[item]) seriesItem.stack = stackMap[item]
    if (area) {
      seriesItem.areaStyle = {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: chartColors[index],
              },
              {
                offset: 1,
                color: '#fff',
              },
            ],
            global: false,
          },
        },
      }
    }
    if (label) seriesItem.label = label
    // console.log('itemStyle', seriesItem.itemStyle)
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (lineStyle) seriesItem.lineStyle = lineStyle
    if (areaStyle) seriesItem.areaStyle = areaStyle
    series.push(seriesItem)
  })
  if (shadowAreas[0]) {
    shadowAreas.forEach((item, index) => {
      let seriesItem = {
        type: 'line',
        markArea: {
          silent: true,
          itemStyle: {
            color: DEFAULT_LABEL_COLOR,
            opacity: 0.08,
          },
          label: {
            show: true,
            color: DEFAULT_LABEL_COLOR,
          },
          data: [
            [
              {
                xAxis: item.start,
                name: item.name,
              },
              {
                xAxis: item.end,
              },
            ],
          ],
        },
      }
      series.push(seriesItem)
    })
  }

  //   console.log('series', series)
  return series
}

export const barline = (keys, values, settings, extra) => {
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []
  let types = []
  let units = {}

  let tempMetrics = keys.slice(1).map((v, i) => {
    if (Array.isArray(v)) {
      if (v[1]) {
        if (v[4]) {
        }
        types.push(v[1])
        if (v[2]) {
          units[v[0]] = v[2]
        } else {
          units[v[0]] = ''
        }
      } else {
        types.push('bar')
        units[v[0]] = ''
      }
      return v[0]
    }
    types.push('bar')
    units[v] = '人'
    return v
  })

  //   console.log('units', units)

  const {
    // 纬度 def:keys[0]
    dimension = [keys[0]],
    // 自定义数据项
    metrics = tempMetrics,
    //右上角的按钮属性
    toolboxAttribute,
    toolboxGrid,
    // visible slots:[xAxis, yAxis]
    axisVisible = [true, true],
    // yAxis name unit min max position(left/right)
    yAxisAttribute = [],
    // 图表是否显示负轴区域
    showNegativeAxis = true,
    // echarts axis type
    xAxisType = 'category',
    //折线图和阴影区域对应的值
    lineYAxisIndex = 1,
    //柱状图粗细
    barWidth = 12,
    // 阴影区域属性 {name start end}
    shadowAreas = [],
    // sort data, type: normal, asc, desc
    sortData = 'desc',
    // area flag
    area = false,
    // customize stack obj 数据堆叠
    stack,
    // label 名称字典
    labelMap = {},
    //双击触发事件
    dblclick = Function,

    //鼠标经过事件
    // mouseover = Function,
    /**
     * echarts opts
     */
    grid,
    label,
    itemStyle,
    lineStyle,
    areaStyle,
    titleText,
    interval = [],
    legendGrid,
  } = settings
  //legendVisible 左上角指标项是否可见
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  let legend = legendVisible && getLegend({ metrics, labelMap, types, values })
  if (legendGrid) {
    legend = {
      ...legend,
      ...legendGrid,
    }
  }
  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'axis',
      tooltipFormatter,
      units,
      sortData,
    })
  const xAxis = getXAxis({
    dimension,
    values,
    axisVisible,
    xAxisType,
  })
  //   console.log('xAxis++++', xAxis)

  let yAxis = []
  if (values.length > 0) {
    yAxis = getYAxis(
      yAxisAttribute,
      showNegativeAxis,
      axisVisible,
      keys,
      values,
      metrics,
      dimension,
    )
  } else {
    yAxis = [
      {
        interval: 900,
        max: 4500,
        min: -4500,
        name: '客流数/人',
        nameTextStyle: {
          padding: [0, 0, 15, -65],
        },
        show: true,
        type: 'value',
      },
      {
        interval: 20,
        max: 100,
        min: -100,
        name: '进店率/%',
        nameTextStyle: {
          padding: [0, -45, 15, 0],
        },
        show: true,
        type: 'value',
      },
    ]
  }

  //   console.log('yAxis', yAxis)

  const series = getSeries({
    dimension,
    values,
    metrics,
    area,
    stack,
    labelMap,
    label,
    itemStyle,
    lineStyle,
    areaStyle,
    chartColors,
    types,
    shadowAreas,
    lineYAxisIndex,
    barWidth,
  })

  let toolbox = {}
  if (toolboxAttribute) {
    toolbox = getToolbox(toolboxAttribute)
  }
  if (toolboxGrid) toolbox = { ...toolbox, ...toolboxGrid }

  const title = {
    text: titleText || '',
    textStyle: DEFAULT_TITLE_STYLE,
    top: 30,
    left: 10,
  }
  const options = {
    title,
    legend,
    tooltip,
    toolbox,
    xAxis,
    yAxis,
    series,
    color: chartColors,
    dblclick,
    // mouseover,
  }
  options.grid = grid ? grid : DEFAULT_BARLINE_GRID
  return options
}

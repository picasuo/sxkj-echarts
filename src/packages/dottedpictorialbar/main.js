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
} from '../../constants'
import { formatAxisLabel } from '../../utils'
import { getTooltip, stack2Map, valueMap } from './utils'

//处理左上角指标图标
function getLegend({ metrics, labelMap, types, values, selected }) {
  //   console.log(metrics, labelMap, types)

  return {
    right: 60,
    itemHeight: 12,
    itemWidth: 12,
    itemGap: 25,
    top: 30,
    selected,
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
        if (
          values.length > 0 &&
          Object.prototype.hasOwnProperty.call(values[0][item], 'color')
        ) {
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
function getToolbox({ name, icon, toolboxFunction }) {
  return {
    top: 26,
    itemSize: 16,
    right: 35,
    feature: {
      myTool: {
        show: true,
        title: name,
        icon: icon ? icon : DEFAULT_TOOLBOX_ICON,
        iconStyle: {
          borderColor: 'rgba(72, 131, 251, 1)',
        },
        emphasis: {
          iconStyle: {
            textPosition: 'top',
          },
        },
        onclick: function() {
          toolboxFunction()
        },
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
    data: values.map((row, index) => {
      return row[item]
    }),
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
function getYAxis(yAxisAttribute, axisVisible) {
  //   console.log('yAxisAttribute', yAxisAttribute)
  //   console.log('axisVisible', axisVisible)
  let splitLine = yAxisAttribute.splitLine || false
  let unit = yAxisAttribute.unit || ''
  return {
    splitLine: { show: splitLine },
    axisLine: {
      lineStyle: {
        color: DEFAULT_FONT_COLOR,
      },
    },
    axisLabel: {
      formatter: val => {
        return `${formatAxisLabel(val)}${unit}`
      },
    },
  }
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
  barWidth,
  dottedBarColor,
}) {
  const series = []
  const stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)
  //   console.log('metrics', metrics)
  //   console.log('types', types)
  //   console.log('dataTemp', dataTemp)
  metrics.forEach((item, index) => {
    let seriesItem = {}
    let transformedData = []
    if (dataTemp[item]) {
      transformedData = dataTemp[item].map((o, index) => {
        return o.value
      })
    }

    if (types[index] === 'bar') {
      seriesItem = {
        name: labelMap[item] || item,
        type: types[index],
        barWidth: barWidth,
        data: transformedData,
        itemStyle: { color: '#4883FB' },
      }
      //   console.log('seriesItem', seriesItem)
    } else if (types[index] === 'line') {
      seriesItem = {
        name: labelMap[item] || item,
        type: types[index],
        data: transformedData,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 10,
        smooth: true,
        itemStyle: {
          color: '#A5C3FF',
        },
      }
      if (shadowAreas[0]) {
        let markArea = {}
        let markAreaData = []
        shadowAreas.forEach((item, index) => {
          let areaRange = [
            {
              xAxis: item.start,
              name: item.name,
            },
            {
              xAxis: item.end,
            },
          ]

          markAreaData.push(areaRange)
        })

        markArea = {
          silent: true,
          itemStyle: {
            color: DEFAULT_LABEL_COLOR,
            opacity: 0.08,
          },
          label: {
            show: true,
            color: DEFAULT_LABEL_COLOR,
          },
          data: markAreaData,
        }

        seriesItem['markArea'] = markArea
      }
    } else if (types[index] === 'pictorialBar') {
      seriesItem = {
        name: labelMap[item] || item,
        type: types[index],
        data: transformedData,
        itemStyle: {
          color: dottedBarColor || '#ddd',
        },
        symbol: 'rect',
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
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
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (lineStyle) seriesItem.lineStyle = lineStyle
    if (areaStyle) seriesItem.areaStyle = areaStyle
    series.push(seriesItem)
  })

  //   console.log('series', series)
  return series
}

export const dottedpictorialbar = (keys, values, settings, extra) => {
  //   console.log('extra', extra)
  //   console.log('keys', keys)
  //   console.log('value', values)
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []
  let types = []
  let units = {}

  //tempMetrics每列所有的数据项
  //types每项数据type数组
  //units每项数据所对应的单位
  let tempMetrics = keys.slice(1).map((v, i) => {
    if (Array.isArray(v)) {
      if (v[1]) {
        types.push(v[1])
        if (v[2]) {
          units[v[0]] = v[2]
        } else {
          units[v[0]] = '人'
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
    // visible slots:[xAxis, yAxis]
    axisVisible = [true, true],
    // yAxis name unit min max position(left/right)
    yAxisAttribute = [],

    // echarts axis type
    xAxisType = 'category',
    //折线图使用的y轴的 index
    // lineYAxisIndex = 1,
    //柱状图粗细
    barWidth = 12,
    // 阴影区域属性 {name start end}
    shadowAreas = [],
    // sort data, type: normal, asc, desc
    sortData = 'normal',
    // 折线图面积area flag
    area = false,
    // 数据堆叠
    stack,
    // label 名称字典
    labelMap = {},
    //双击触发事件
    dblclick = Function,
    //指标是否选中
    selected,
    /**
     * echarts opts
     */
    grid,
    label,
    itemStyle,
    lineStyle,
    areaStyle,
    titleText,
    dottedBarColor,
  } = settings
  //legendVisible 左上角指标项是否可见
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  const legend =
    legendVisible && getLegend({ metrics, labelMap, types, values, selected })

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
  })[0]
  //   console.log('xAxis++++', xAxis)
  const yAxis = getYAxis(yAxisAttribute, axisVisible)

  const series = getSeries({
    //时间
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
    barWidth,
    dottedBarColor,
  })

  let toolbox = {}
  if (toolboxAttribute) {
    toolbox = getToolbox(toolboxAttribute)
  }

  const title = {
    text: titleText || '',
    textStyle: DEFAULT_TITLE_STYLE,
    top: 30,
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
  }
  options.grid = grid ? grid : DEFAULT_BARLINE_GRID
  return options
}

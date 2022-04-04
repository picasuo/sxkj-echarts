import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_DOWNLOAD_ICON,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LABEL_COLOR,
  DEFAULT_LEGEND,
  DEFAULT_LEGEND_BAR_ICON,
  DEFAULT_LEGEND_LINE_DASHED_ICON,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_TITLE_STYLE,
  DEFAULT_TOOLBOX_ICON,
} from '../../constants'
import { getTooltip, stack2Map, valueMap } from '../../utils'

function getLegend({
  metrics,
  legendMap,
  labelMap,
  selected,
  dashed,
  legendShow,
}) {
  if (dashed) {
    return {
      show: legendShow,
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
        if (dashed[index] === 1) {
          obj.icon = DEFAULT_LEGEND_LINE_DASHED_ICON
        }
        // console.log(obj)
        return obj
      }),
    }
  } else {
    //无dashed的情况

    if (!legendMap && !labelMap) return {}
    const data = labelMap
      ? metrics.map(item => labelMap[item] || item)
      : metrics

    return Object.assign({}, DEFAULT_LEGEND, {
      data,
      // name 被 labelMap 封装了一层 所以 legendMap 需要注意
      formatter: name => legendMap[name] || name,
      selected: selected || {},
    })
  }
}

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

function getXAxis({ dimension, values, axisVisible, xAxisType, xAxisName }) {
  return dimension.map((item, index) => ({
    type: xAxisType,
    nameLocation: 'middle',
    nameGap: 22,
    name: xAxisName[index] || '',
    data: values.map(row => row[item]),
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
    axisPointer: {
      show: true,
      type: 'line',
      label: { show: false },
      lineStyle: {
        width: 1,
        type: 'dashed',
        color: DEFAULT_FONT_COLOR,
        opacity: 0.6,
      },
    },
  }))
}

function getYAxis({ axisVisible, yAxisName, yAxisLabel }) {
  return [
    {
      type: 'value',
      name: yAxisName[0] || '',
      show: axisVisible[1],
      nameGap: 24,
      nameTextStyle: {
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
        align: 'center',
        padding: [0, 20, 0, 0],
      },
      boundaryGap: [0, 0.1],
      axisLabel: {
        show: yAxisLabel,
        margin: 10,
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: '#C9D4E9',
        },
      },
      splitNumber: 5,
    },
  ]
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
  shadowAreas,
  dashed,
  focus,
  markLine,
}) {
  const series = []
  const stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)
  //   console.log('metrics', metrics)
  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'line',
      data: dataTemp[item],
      smooth: true,
      showSymbol: false,
      symbol: 'emptyCircle',
      symbolSize: 4,
    }

    if (stack && stackMap[item]) {
      seriesItem.stack = stackMap[item]
    }
    if (focus) {
      seriesItem = {
        ...seriesItem,
        emphasis: {
          focus: 'series',
        },
      }
    }
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
    if (dashed) {
      if (dashed[index] === 1) {
        seriesItem.itemStyle = {
          normal: { lineStyle: { width: 2, type: 'dashed' } },
        }
      }
    }
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

  if (Object.keys(markLine).length > 0) {
    series[0].markLine = {
      lineStyle: {
        color: '#F28B43',
        ...markLine.lineStyle,
      },
      data: [
        {
          yAxis: markLine.value,
          label: {
            formatter: params => {
              return '活动前15工作日日均客流：125,689'
            },
            position: 'insideStartTop',
            color: '#F28B43',
            fontFamily: DEFAULT_FONT_FAMILY,
            fontSize: DEFAULT_FONT_SIZE,
            lineHeight: DEFAULT_LINE_HEIGHT,
            ...markLine.label,
          },
        },
      ],
      ...markLine,
    }
  }
  return series
}

export const line = (keys, values, settings, extra) => {
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
    //左上角的按钮属性
    toolboxAttribute,
    toolboxGrid,
    // visible slots:[xAxis, yAxis]
    axisVisible = [true, true],
    // xAxis name list
    xAxisName = [],
    // yAxis name list
    yAxisName = [],
    // y轴label
    yAxisLabel = false,
    // echarts axis type
    xAxisType = 'category',
    // 阴影区域属性 {name start end}
    shadowAreas = [],
    // default unit
    defaultUnit = 'normal',
    // sort data, type: normal, asc, desc
    sortData = 'desc',
    // area flag
    area = false,
    // customize stack obj
    stack,
    // legend 名称字典
    legendMap = {},
    // label 名称字典
    labelMap = {},
    /**
     * echarts opts
     */
    grid,
    label,
    itemStyle,
    lineStyle,
    areaStyle,
    selected,
    titleText,
    //鼠标改变x轴事件
    updateAxisPointer,
    //双击事件
    dblclick,
    dashed,
    legendGrid,
    focus,
    //legend是否显示
    legendShow = true,
    //标记线
    markLine = {},
  } = settings
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra
  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  //   let intervaldata = []
  //   let result = 0
  //   let keytemp = keys.slice(1)
  //   keytemp.map(item => {
  //     values.map(val => {
  //       intervaldata.push(val[item])
  //     })
  //   })
  //   result = Math.max(...intervaldata) / interval

  units.default = defaultUnit

  //   function isEmpty(a) {
  //     // Get the string from the function;
  //     var funcString = a.toString()
  //     // Cut off the part before the actual content of the function
  //     funcString = funcString
  //       .substr(funcString.indexOf(')'))
  //       .replace(/function|[(){};]/g, '') // remove the function keyword, and the following characters: (){};
  //       .trim() // remove any leading / trailing whitespaces and

  //     console.log(funcString)
  //     return funcString === '' //check if it's an empty string.
  //   }

  let yAxis = getYAxis({
    axisVisible,
    yAxisName,
    yAxisLabel,
  })

  let legend =
    legendVisible &&
    getLegend({ metrics, legendMap, labelMap, selected, dashed, legendShow })
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
    xAxisName,
  })

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
    shadowAreas,
    dashed,
    focus,
    markLine,
  })
  let toolbox = {}
  if (toolboxAttribute) {
    toolbox = getToolbox(toolboxAttribute)
  }
  if (toolboxGrid) toolbox = { ...toolbox, ...toolboxGrid }

  const title = {
    text: titleText || '',
    textStyle: DEFAULT_TITLE_STYLE,
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
  }
  if (updateAxisPointer) {
    options['updateAxisPointer'] = updateAxisPointer
  }

  if (dblclick) {
    options['dblclick'] = dblclick
  }
  if (grid) options.grid = grid
  return options
}

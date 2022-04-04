import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LEGEND,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_TITLE_STYLE,
  DEFAULT_TOOLBOX_ICON,
  DEFAULT_DOWNLOAD_ICON,
} from '../../constants'
import { formatData, getTooltip, stack2Map, valueMap } from '../../utils'

function getLegend({ metrics, legendMap, labelMap }) {
  if (!legendMap && !labelMap) return {}
  const data = labelMap ? metrics.map(item => labelMap[item] || item) : metrics
  return Object.assign({}, DEFAULT_LEGEND, {
    icon: 'rect',
    data,
    // name 被 labelMap 封装了一层 所以 legendMap 需要注意
    formatter: name => legendMap[name] || name,
  })
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

function getXAxis({ dimension, values, axisVisible, xAxisType, xAxisName }) {
  return dimension.map((item, index) => ({
    type: xAxisType,
    nameLocation: 'middle',
    nameGap: 22,
    name: xAxisName[index] || '',
    data: values.map(row => row[item]),
    show: axisVisible[0],
    axisLabel: {
      interval: 0,
      show: true,
      margin: 10,
      // rotate: window.innerWidth < 1440 ? -45 : 0,
      color: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      lineHeight: DEFAULT_LINE_HEIGHT,
      //   formatter: value => trunkText(value, 4),
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: DEFAULT_AXIS_COLOR,
      },
    },
  }))
}

function getYAxis({ axisVisible, defaultUnit, yAxisName, yAxisSetting }) {
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
      axisLabel: {
        show: true,
        margin: 10,
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
        formatter(val) {
          return formatData(val, defaultUnit)
        },
        ...yAxisSetting.label,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: yAxisSetting.lineStyle ? yAxisSetting.lineStyle : 'solid',
          color: '#C9D4E9',
        },
      },
    },
  ]
}

function getSeries({
  dimension,
  values,
  metrics,
  stack,
  showLine,
  labelMap,
  label,
  itemStyle,
}) {
  const series = []
  let stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)

  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'bar',
      barWidth: 34,
      data: dataTemp[item],
    }

    if (showLine.includes(item)) {
      seriesItem = {
        ...seriesItem,
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 4,
      }
    }

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item]

    if (label) {
      const unit = label.unit ? label.unit : ''
      seriesItem.label = {
        show: true,
        position: 'outside',
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
        formatter: params => {
          if (label.special) {
            let val = ''
            if (params.dataIndex === 0) {
              if (label.specialValue > 0) {
                val = `+${label.specialValue * 100}%`
              } else {
                val = `${label.specialValue * 100}%`
              }
            }
            return val
          } else {
            return `${params.value}${unit}`
          }
        },
        ...label,
      }
    }
    if (itemStyle) seriesItem.itemStyle = itemStyle
    series.push(seriesItem)
  })
  return series
}

export const histogram = (keys, values, settings, extra) => {
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
    // echarts axis type
    xAxisType = 'category',
    // default unit
    defaultUnit = 'normal',
    // sort data, type: normal, asc, desc
    sortData = 'normal',
    // customize stack obj
    stack,
    // let data be line
    showLine = [],
    // legend 名称字典
    legendMap = {},
    // label 名称字典
    labelMap = {},
    //是否显示拉条
    showDataZoom,
    // echarts opts
    grid,
    //柱图上方显示文本
    label,
    itemStyle,
    titleText,
    //legend位置
    legendGrid,
    //y轴label文本
    yAxisSetting = {},
    //右上角的按钮属性
    toolboxAttribute,
    toolboxGrid,
  } = settings
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  units.default = defaultUnit

  let legend = legendVisible && getLegend({ metrics, legendMap, labelMap })
  if (legendGrid) legend = { ...legend, ...legendGrid }
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
  const yAxis = getYAxis({
    axisVisible,
    defaultUnit,
    yAxisName,
    yAxisSetting,
  })
  const series = getSeries({
    dimension,
    values,
    showLine,
    metrics,
    stack,
    labelMap,
    label,
    itemStyle,
  })
  let dataZoom = []

  dataZoom = [
    {
      type: 'slider',
      showDataShadow: false,
      maxValueSpan: 40,
      show: false,
      ...showDataZoom,
    },
  ]

  const title = {
    text: titleText || '',
    textStyle: DEFAULT_TITLE_STYLE,
    left: '7%',
  }

  let toolbox = {}
  if (toolboxAttribute) {
    toolbox = getToolbox(toolboxAttribute)
  }
  if (toolboxGrid) toolbox = { ...toolbox, ...toolboxGrid }

  const options = {
    title,
    legend,
    tooltip,
    xAxis,
    yAxis,
    series,
    dataZoom,
    color: chartColors,
    toolbox,
  }
  if (grid) options.grid = grid
  return options
}

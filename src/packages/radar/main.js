import {
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LINE_HEIGHT,
} from '../../constants'
import { getTooltip, getTooltipData } from '../../utils'

// function getLegend ({ values, dimension, legendName }) {
//   let legendData = values.map(row => row[dimension])

//   return {
//     data: legendData,
//     formatter (name) {
//       return legendName[name] != null ? legendName[name] : name
//     }
//   }
// }

function getRadar({ radarShapeType, values, metrics, labelMap, max, radius }) {
  if (max) {
    var maxtemp = max
  } else {
    //临时用
    var maxTemp = Object.values(values[0])
    //最大值
    var maxtemp = Math.max(...maxTemp)
  }
  let indicatorTemp = {}
  values.forEach(items => {
    metrics.forEach(item => {
      const key = labelMap[item] || item
      if (!indicatorTemp[key]) indicatorTemp[key] = []
      indicatorTemp[key].push(items[item])
    })
  })
  return {
    indicator: Object.keys(indicatorTemp).map(key => {
      return {
        name: key,
        max: maxtemp,
      }
    }),
    center: ['50%', '50%'],
    radius: radius ? radius : '75%',
    shape: radarShapeType,
    splitNumber: 5,
    nameGap: 10,
    lineStyle: {
      type: 'solid',
      color: '#5396C5',
      width: 1,
    },
    name: {
      show: true,
      color: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
      fontWeight: DEFAULT_FONT_WEIGHT,
      fontFamily: DEFAULT_FONT_FAMILY,
      lineHeight: DEFAULT_LINE_HEIGHT,
    },
  }
}

function getSeries({
  values,
  dimension,
  metrics,
  radar,
  label,
  area,
  itemStyle,
  lineStyle,
  labelMap,
  areaStyle,
}) {
  let radarIndexObj = {}
  radar.indicator.forEach((item, index) => {
    const name = item.name
    radarIndexObj[name] = index
  })

  const seriesData = values.map(row => {
    const serieData = {
      value: [],
      name: row[dimension],
    }
    Object.keys(row).forEach(key => {
      if (~metrics.indexOf(key)) {
        let k =
          labelMap[key] != null
            ? radarIndexObj[labelMap[key]]
            : radarIndexObj[key]
        serieData.value[k] = row[key]
      }
    })
    return serieData
  })
  const result = {
    name: dimension,
    type: 'radar',
    data: seriesData,
    symbol: 'emptyCircle',
    symbolSize: 5,
  }

  let baseItemStyle = {
    normal: {
      areaStyle: {
        type: 'default',
      },
      borderWidth: 2,
    },
  }

  if (label) result.label = label
  if (area) result.itemStyle = baseItemStyle
  if (itemStyle) result.itemStyle = itemStyle
  if (lineStyle) result.lineStyle = lineStyle
  if (areaStyle) result.areaStyle = areaStyle
  return [result]
}

export const radar = (keys, values, settings, extra) => {
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
    // default unit
    defaultUnit = 'normal',
    // sort data, type: normal, asc, desc
    sortData = 'normal',
    // echarts radar type
    radarShapeType = 'polygon',
    // label 名称字典
    labelMap = {},
    // area flag
    area = false,
    /**
     * echarts opts
     */
    label,
    itemStyle,
    lineStyle,
    areaStyle,
    max,
    grid,
    radius,
  } = settings
  const { tooltipVisible, tooltipFormatter, chartColors } = extra

  units.default = defaultUnit

  // const legend = legendVisible && getLegend({ values, dimension, legendName })
  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'item',
      tooltipFormatter,
      units,
      values: getTooltipData(values, dimension, labelMap),
      sortData,
    })
  const radar = getRadar({
    radarShapeType,
    values,
    metrics,
    labelMap,
    max,
    radius,
  })
  let series = getSeries({
    values,
    dimension,
    metrics,
    radar,
    label,
    area,
    itemStyle,
    lineStyle,
    labelMap,
    areaStyle,
  })
  const options = {
    // legend,
    tooltip,
    radar,
    series,
    color: chartColors,
  }
  if (grid) options.grid = grid
  return options
}

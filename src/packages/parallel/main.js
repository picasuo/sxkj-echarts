import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_LEGEND_BAR_ICON,
  DEFAULT_PARALLEL_COLORS,
  DEFAULT_TITLE_STYLE,
} from '../../constants'
import { formatData, getMaxData } from './utils'

function getLegend(legendMap) {
  if (!legendMap) return {}
  return {
    left: '2%',
    itemHeight: 12,
    itemWidth: 12,
    itemGap: 25,
    top: 10,
    data: legendMap.map((item, index) => {
      let icon = DEFAULT_LEGEND_BAR_ICON
      const obj = {
        name: item,
        icon: icon,
      }
      return obj
    }),
  }
}

function getParallelAxis(metrics, values, units) {
  const parallelAxis = []
  metrics.map((v, i) => {
    const max = getMaxData(values, v)
    if (units[v]) v = v + '/' + units[v]
    parallelAxis[i] = {
      dim: i,
      name: v,
      min: 0,
      max: max,
      interval: max / 5,
    }
  })
  return parallelAxis
}

function getSeries(metrics, values, dimension) {
  const series = []
  const dataTemp = formatData(values, metrics, dimension)
  const lineStyle = {
    normal: {
      width: 1,
      opacity: 0.5,
    },
  }
  values.forEach((item, index) => {
    let seriesItem = {
      name: item[dimension],
      type: 'parallel',
      data: [dataTemp[item[dimension]]],
      smooth: true,
      lineStyle,
    }
    series.push(seriesItem)
  })
  return series
}

function getParallel() {
  const parallel = {
    left: '5%',
    right: '5%',
    bottom: '15%',
    top: '30%',
    parallelAxisDefault: {
      type: 'value',
      nameGap: 20,
      nameLocation: 'start',
      splitNumber: 5,
      nameTextStyle: {
        color: '#4A4A4A',
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: 8,
        color: '#4A4A4A',
        fontSize: 12,
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: DEFAULT_AXIS_COLOR,
        },
      },
    },
  }
  return parallel
}

function getToolTip({ values, seriesName, tempMetrics, units, seriesData }) {
  return {
    show: true,
    confine: true,
    transitionDuration: 0.1,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    padding: [4, 10, 10],
    axisPointer: {
      type: 'none',
    },
    extraCssText:
      'box-shadow: 1px 1px 8px 0 rgba(29,49,82,0.28);border-radius: 2px;',

    formatter: params => {
      const value = seriesData.find(item => item.name === params.seriesName)
        ? `${seriesData.find(item => item.name === params.seriesName).value}分`
        : ''
      let itemData = values[params.seriesIndex]
      const tpl = tempMetrics.map(item => {
        return `
            <li class="charts-item">
              <div class="charts-item__icon" style="background-color: ${params.color};"></div>
              <span class="charts-item__title">${item}</span>
              <span class="charts-item__data">${itemData[item]}${units[item]}</span>
            </li>
          `
      })

      return ` 
          <div class="charts-tooltip">
            <h3 class="charts-title">${
              itemData[seriesName]
            }&nbsp&nbsp${value}</h3>
            <ul class="charts-content">
              ${tpl.join('')}
            </ul>
          </div>
          `
    },
  }
}

export const parallel = (keys, values, settings, extra) => {
  const seriesName = keys[0]
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []

  // 数据 自定义单位
  let units = {}
  // 默认数据项
  let tempMetrics = keys.slice(1).map((v, i) => {
    if (Array.isArray(v)) {
      units[v[0]] = v[1] || ''
      return v[0]
    }
    return v
  })

  let legendMap = values.map((v, i) => {
    return v[keys[0]]
  })

  const {
    // 纬度
    dimension = [keys[0]],
    // 自定义数据项
    metrics = tempMetrics,
    grid,
    titleText,
    seriesData = [],
  } = settings
  const { legendVisible } = extra

  const legend = legendVisible && getLegend(legendMap)
  const parallelAxis = getParallelAxis(metrics, values, units)
  const series = getSeries(metrics, values, dimension)
  const parallel = getParallel()
  const title = {
    text: titleText || '',
    textStyle: DEFAULT_TITLE_STYLE,
  }
  const tooltip = getToolTip({
    values,
    seriesName,
    tempMetrics,
    units,
    seriesData,
  })

  const options = {
    title,
    parallel,
    parallelAxis,
    legend,
    series,
    color: DEFAULT_PARALLEL_COLORS,
    tooltip,
  }
  if (grid) options.grid = grid
  return options
}

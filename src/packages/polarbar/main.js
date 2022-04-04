import { DEFAULT_GRID } from '../../constants'

function getSeries({ values, seriesName }) {
  let series = []
  let seriesItem = {}
  seriesName.map((item, index) => {
    seriesItem = {
      type: 'bar',
      data: values[item],
      coordinateSystem: 'polar',
      name: item,
      stack: 'a',
      emphasis: {
        focus: 'series',
      },
    }
    series.push(seriesItem)
  })

  return series
}

export const polarbar = (keys, values, settings, extra) => {
  //地区集合
  let metrics = keys.metrics

  let seriesName = keys.seriesName

  //极坐标系angleAxis的data
  const angleAxis = {
    type: 'category',
    data: metrics || [],
  }

  const tooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  }
  const radiusAxis = {}

  const polar = {}

  const { grid } = settings

  //   const { tooltipVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  //   if (Object.keys(labelMap).length !== 0) {
  //     _.forEach(units, function(v, key) {
  //       if (labelMap[key]) units[labelMap[key]] = v
  //     })
  //   }

  const series = getSeries({
    seriesName,
    values,
  })

  const legend = {
    show: true,
    data: seriesName,
    orient: 'vertical',
    right: 20,
    top: 30,
  }

  const options = {
    grid: grid || DEFAULT_GRID,
    angleAxis,
    radiusAxis,
    polar,
    series,
    tooltip,
    legend,
  }

  return options
}

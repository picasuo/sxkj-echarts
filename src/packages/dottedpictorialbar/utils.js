export const getTooltip = ({
  triggerType = 'axis',
  tooltipFormatter,
  units,
  sortData,
}) => ({
  show: true,
  confine: true,
  transitionDuration: 0.1,
  backgroundColor: '#FFFFFF',
  borderWidth: 0,
  padding: [4, 10, 10],
  axisPointer: {
    type: 'shadow',
  },
  extraCssText:
    'box-shadow: 1px 1px 8px 0 rgba(29,49,82,0.28);border-radius: 2px;',
  trigger: triggerType,
  formatter(params) {
    // console.log('params', params)
    // console.log('tooltipFormatter', tooltipFormatter)
    if (tooltipFormatter) return tooltipFormatter.apply(null, arguments)
    if (!Array.isArray(params)) params = [params]

    let itemOne = _.head(params)
    let chartsTilte = itemOne.name
    let data = params.map(({ color, seriesName, seriesType, value }, index) => {
      return {
        color: color,
        name: seriesName,
        type: seriesType,
        itemData: value.toLocaleString(),
        unit: units[seriesName],
      }
    })
    // ε/ιεΊ
    if (sortData && sortData !== 'normal') {
      data.sort((v1, v2) => {
        let n1 = parseFloat(v1.itemData)
        let n2 = parseFloat(v2.itemData)
        if (sortData === 'asc') return n1 - n2
        else if (sortData === 'desc') return n2 - n1
      })
    }
    return tooltipTemplate(chartsTilte, data)
  },
})

function tooltipTemplate(chartsTilte, data) {
  const tpl = data.map(({ color, name, type, itemData, unit }, index) => {
    if (type === 'line') {
      return `
            <li class="charts-item">
                <div class="charts-item__icon" style="background-color: #f0f4fa; margin-bottom: 6px;">
                  <svg class="tooltipicon" viewBox="0 0 1024 1024">
                    <path
                        d="M25.6 537.1392a25.6 25.6 0 1 1 0-51.2h141.1072a25.6 25.6 0 0 0 24.5248-18.2272l118.1184-393.7792a51.2 51.2 0 0 1 98.0992 0L665.6 934.4l118.1184-393.728a76.8 76.8 0 0 1 73.5744-54.784H998.4a25.6 25.6 0 1 1 0 51.2h-141.1072a25.6 25.6 0 0 0-24.5248 18.2272l-118.1184 393.7792a51.2 51.2 0 0 1-98.0992 0L358.4 88.6272 240.2816 482.4064a76.8 76.8 0 0 1-73.5744 54.784H25.6z"
                        fill=" ${color}"
                    ></path>
                  </svg>
                </div>
                <span class="charts-item__title">${name}</span>
                <span class="charts-item__data">${itemData} ${unit}</span>
            </li>`
    } else {
      return `
            <li class="charts-item">
                <div class="charts-item__icon" style="background-color: ${color}; margin-bottom: 1px;"></div>
                <span class="charts-item__title">${name}</span>
                <span class="charts-item__data">${itemData} ${unit}</span>
            </li>`
    }
  })
  return `
            <div class="charts-tooltip">
                <h3 class="charts-title">${chartsTilte}</h3>
                <ul class="charts-content">
                    ${tpl.join('')}
                </ul>
            </div>`
}

export const formatData = (val, type) => {
  if (typeof type === 'function') return type(val)
  switch (type) {
    case 'rmb':
      return `${val}ε`
    case 'percent':
      return `${(val * 100).toFixed(2)}%`
    case 'people':
      return `${val}δΊΊ`
    case 'normal':
      return val
  }
}

export const stack2Map = stack => {
  let stackMap = {}
  Object.keys(stack).forEach(key => {
    let item = stack[key]
    if (item && Array.isArray(item)) {
      item.forEach(v => {
        stackMap[v] = key
      })
    }
  })
  return stackMap
}

export const valueMap = (values, metrics, dimension) => {
  //   console.log('values', values)
  //   console.log('metrics', metrics)
  //   console.log('dimension', dimension)
  //values ζ¨ͺ/ηΊ΅ζζ ηζ°ζ?
  //metrics ζ±εΎεζηΊΏεΎζζ 
  //dimension ζ¨ͺεζ ζζ 

  const dataTemp = {}
  values.forEach(row => {
    metrics.forEach(item => {
      if (!dataTemp[item]) dataTemp[item] = []
      dataTemp[item].push({ name: row[dimension[0]], value: row[item] })
    })
  })
  return dataTemp
}

// if has labelMap need to set orign object for unit
export const getTooltipData = (values, dimension, labelMap) => {
  let tooltipData = { orign: {} }
  let dim = dimension[0]
  values.forEach(v => {
    if (!tooltipData[v[dim]]) tooltipData[v[dim]] = {}
    Object.keys(v).forEach(key => {
      if (key !== dim) tooltipData[v[dim]][labelMap[key] || key] = v[key]
    })
  })
  Object.keys(labelMap).forEach(key => {
    tooltipData['orign'][labelMap[key]] = key
  })
  return tooltipData
}

const itemTitleType = {
  line: 'seriesName',
  bar: 'seriesName',
  pictorialBar: 'seriesName',
  pie: 'name',
  radar: 'name',
  scatter: 'seriesName',
}
export const getTooltip = ({
  triggerType = 'axis',
  tooltipFormatter,
  units,
  values,
  sortData,
}) => ({
  show: true,
  confine: true,
  transitionDuration: 0.1,
  backgroundColor: '#FFFFFF',
  padding: [4, 10, 10],
  borderColor: 'rgba(29, 49, 82, 0.05)',
  axisPointer: {
    type: 'none',
  },
  extraCssText:
    'box-shadow: 1px 1px 8px 0 rgba(29,49,82,0.28);border-radius: 2px;',
  trigger: triggerType,
  formatter(params) {
    // console.log('===', params)

    if (tooltipFormatter) return tooltipFormatter.apply(null, arguments)
    if (!Array.isArray(params)) params = [params]

    let itemOne = _.head(params)

    let chartsTilte =
      itemOne.componentSubType === 'pie' ? itemOne.seriesName : itemOne.name
    let data = []

    if (itemOne.componentSubType === 'radar') {
      let v = values[itemOne.name]
      Object.keys(v).forEach(key => {
        data.push({
          color: itemOne.color,
          itemTitle: key,
          itemData: formatToolTipData(
            v[key],
            units[values['orign'][key] || key] || units['default'],
          ),
        })
      })
    } else {
      data = params.map((v, i) => {
        let color = v.color
        return {
          color:
            typeof color === 'string'
              ? color
              : color.colorStops[0].color.slice(0, -2),
          itemTitle: v[itemTitleType[v.componentSubType]],
          itemData: formatToolTipData(
            v.data['value'],
            units[v.seriesName] || units['default'],
          ),
        }
      })
    }

    // 升/降序
    if (sortData && sortData !== 'normal') {
      data.sort((v1, v2) => {
        let n1 = parseFloat(v1.itemData.replace(',', ''))
        let n2 = parseFloat(v2.itemData.replace(',', ''))
        if (sortData === 'asc') return n1 - n2
        else if (sortData === 'desc') return n2 - n1
      })
    }

    return tooltipTemplate(chartsTilte, data)
  },
})

function tooltipTemplate(chartsTilte, data) {
  let tpl = data.map(({ color, itemTitle, itemData }, index) => {
    return `
    <li class="charts-item">
      <div class="charts-item__icon" style="background-color: ${color};"></div>
      <span class="charts-item__title">${itemTitle}</span>
      <span class="charts-item__data">${itemData}</span>
    </li>
  `
  })
  return `
  <div class="charts-tooltip">
    <h3 class="charts-title">${chartsTilte}</h3>
    <ul class="charts-content">
      ${tpl.join('')}
    </ul>
  </div>
  `
}

export const formatData = (val, type) => {
  if (typeof type === 'function') return type(val)
  switch (type) {
    case 'rmb':
      return `${val.toLocaleString()}元`
    case 'percent':
      return `${(val * 100).toFixed(2)}%`
    case 'people':
      return `${formatAxisLabel(val)}人`
    case 'set_customer_rate':
      return `${val.toLocaleString()}人/m²`
    case 'times':
      return `${val.toLocaleString()}次`
    case 'jian':
      return `${val.toLocaleString()}间`
    case 'normal':
      return formatAxisLabel(val)
    case 'avg_stay_time':
      return `${toTime(val)}`
  }
}

function formatToolTipData(val, type) {
  if (typeof type === 'function') return type(val)
  switch (type) {
    case 'rmb':
      return `${val.toLocaleString()}元`
    case 'percent':
      return `${(val * 100).toFixed(2)}%`
    case 'people':
      return `${val.toLocaleString()}人`
    case 'set_customer_rate':
      return `${val.toLocaleString()}人/m²`
    case 'times':
      return `${val.toLocaleString()}次`
    case 'jian':
      return `${val.toLocaleString()}间`
    case 'normal':
      return val.toLocaleString()
    case 'avg_stay_time':
      return `${toTime(val)}`
  }
}

export const toTime = time => {
  let min = 0
  let second = 0
  if (time > 60) {
    min = Math.floor(time / 60)
    second = time % 60
    return min + '分' + second + '秒'
  } else if (time === 0) {
    return 0
  } else {
    return time + '秒'
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
  const dataTemp = {}
  values.forEach(row => {
    metrics.forEach(item => {
      if (!dataTemp[item]) dataTemp[item] = []
      dataTemp[item].push({ name: row[dimension[0]], value: row[item] })
    })
  })
  return dataTemp
}

export const trunkText = (str, len) => {
  return str.length > len + 1 ? str.slice(0, len) + '...' : str
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

export const formatAxisLabel = function(value) {
  if (Math.abs(value) >= 1000 && Math.abs(value) < 10000) {
    value = `${value / 1000}k`
  } else if (Math.abs(value) >= 10000) {
    value = `${value / 10000}w`
  }
  return value
}

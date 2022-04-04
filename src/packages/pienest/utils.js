export const getTooltip = ({
  triggerType = 'item',
  tooltipFormatter,
  keys,
  dataObject,
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
    // console.log('params', params)
    // console.log('dataObject', dataObject)

    if (tooltipFormatter) return tooltipFormatter.apply(null, arguments)

    let chartsTilte = keys.find(key => params.name === key)
      ? `${params.name}性入场习惯`
      : params.name

    let data = []
    let color = ''

    if (keys.find(key => params.name === key)) {
      dataObject[params.name].map(o => {
        color = o.itemStyle.color
        data.push({
          color,
          itemData: o.value,
          itemTitle: o.name,
        })
      })

      data.push({
        color: color,
        itemData: params.value,
        itemTitle: `${params.name}性总客流`,
      })

      // 升/降序
      if (sortData && sortData !== 'normal') {
        data.sort((v1, v2) => {
          let n1 = parseFloat(v1.itemData)
          let n2 = parseFloat(v2.itemData)
          //   console.log('n1', n1)
          //   console.log('n2', n2)
          if (sortData === 'asc') return n1 - n2
          else if (sortData === 'desc') return n2 - n1
        })
      }

      return tooltipTemplate(chartsTilte, data)
    } else {
      const content = {}
      content['color'] = params.color
      content['itemTitle'] = '客流数'
      content['itemData'] = formatData(params.value, 'people')

      return tooltipTemplate(chartsTilte, content)
    }
  },
})

function tooltipTemplate(chartsTilte, data) {
  if (data.length > 1) {
    let tpl = data.map(({ color, itemTitle, itemData }, index) => {
      return `
      <li class="charts-item">
        <div class="charts-item__icon" style="background-color: ${color};"></div>
        <span class="charts-item__title">${itemTitle}</span>
        <span class="charts-item__data">${formatData(itemData, 'people')}</span>
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
  } else {
    return `<div class="charts-tooltip">
      <h3 class="charts-title">${chartsTilte}</h3>
      <div class="charts-content">
       <div class="charts-item">
           <div class="charts-item__icon" style="background-color: ${data.color};"></div>
           <span class="charts-item__title">${data.itemTitle}</span>
           <span class="charts-item__data">${data.itemData}</span>        
      </div>
      </div>
    </div>`
  }
}

export const formatData = (val, type) => {
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
    case 'normal':
      return val.toLocaleString()
  }
}

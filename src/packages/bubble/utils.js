const itemTitleType = {
  line: 'seriesName',
  bar: 'seriesName',
  pictorialBar: 'seriesName',
  pie: 'name',
  radar: 'name',
  scatter: 'seriesName',
}
export const getTooltip = ({
  triggerType = 'item',
  //   tooltipFormatter,
  unit,
  xkeys,
  ykeys,
}) => ({
  show: true,
  confine: true,
  transitionDuration: 0.1,
  backgroundColor: '#FFFFFF',
  borderColor: 'rgba(29, 49, 82, 0.05)',
  padding: [4, 10, 10],
  axisPointer: {
    type: 'none',
  },
  extraCssText:
    'box-shadow: 1px 1px 8px 0 rgba(29,49,82,0.28);border-radius: 2px;',
  trigger: triggerType,
  formatter(params) {
    // if (tooltipFormatter) return tooltipFormatter.apply(null, arguments)

    let content = {
      color: params.color,
      itemTitle: ykeys[params.data[1]],
      itemData: formatData(params.data[2], unit || 'people'),
    }

    return tooltipTemplate(params.name, content)
  },
})

function tooltipTemplate(chartsTilte, content) {
  //   let tpl = data.map(({ color, itemTitle, itemData }, index) => {
  //     return `
  //       <li class="charts-item">
  //         <div class="charts-item__icon" style="background-color: ${color};"></div>
  //         <span class="charts-item__title">${itemTitle}</span>
  //         <span class="charts-item__data">${itemData}</span>
  //       </li>
  //     `
  //   })
  return `
    <div class="charts-tooltip">
      <h3 class="charts-title">${chartsTilte}</h3>
      <div class="charts-content">
       <div class="charts-item">
           <div class="charts-item__icon" style="background-color: ${content.color};"></div>
           <span class="charts-item__title">${content.itemTitle}</span>
           <span class="charts-item__data">${content.itemData}</span>        
      </div>
      </div>
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
      return `${val.toLocaleString()}人`
    case 'set_customer_rate':
      return `${val.toLocaleString()}人/m²`
    case 'normal':
      return val.toLocaleString()
  }
}

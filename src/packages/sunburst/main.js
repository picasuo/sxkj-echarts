function getSeries({ children, keys, values, title }) {
  let data = [
    {
      title,
      //   itemStyle: {
      //     color: 'red',
      //   },
      level: 1,
      label: {
        rotate: 'tangential',
      },

      children: [],
    },
  ]
  let series = {
    type: 'sunburst',
    radius: [0, '100%'],
    label: {
      rotate: 'radial',
    },
    levels: [
      {},
      {
        itemStyle: {
          color: '#FDF5EF',
        },
      },
      {
        itemStyle: {
          color: '#0E7BFC',
        },
      },
      {
        itemStyle: {
          color: '#D1E7FE',
        },
      },
    ],
  }

  data[0]['children'] = children.map(item => {
    return {
      name: item,
      value: 1,
      label: {
        rotate: 'tangential',
      },
      children: [],
    }
  })

  //   console.log(data[0]['children'])

  let totalValue = 0

  data[0]['children'] = data[0]['children'].map(item => {
    let childrenOPtions = []
    //决定tooltip的文本显示///1:该大区有数据///0:该大区暂无数据
    let info = 0
    const name = item['name']
    let value = 0
    if (keys[name].length > 0) {
      info = 1
      keys[name].map(el => {
        value = value + values[name][el]
        totalValue = totalValue + values[name][el]
        const obj = {
          name: el,
          value: values[name][el] || 0,
          label: {
            rotate: 'tangential',
          },
        }
        childrenOPtions.push(obj)
      })
    } else {
      childrenOPtions = []
      info = 0
    }

    // console.log('childrenOPtions', childrenOPtions)
    if (value === 0) {
      value = totalValue * 0.2
    }
    return {
      ...item,
      value,
      children: childrenOPtions,
      info,
    }
  })

  //   console.log(data)

  series['data'] = data

  return series
}

function getSeriesDataChildren(list, totalValue) {
  list = list.map(item => {
    const obj = {
      ...item,
      name: item.value === 0 ? '' : item.name,
      //用在tooltip中显示
      tooltipName: item.name,
      value: item.value === 0 ? totalValue * 0.02 : item.value,
    }

    if (item.children && item.children.length > 0) {
      obj.children = getSeriesDataChildren(obj.children)
    }

    return obj
  })

  return list
}

export const sunburst = (keys, values, settings, extra) => {
  const { title = '', grid, totalValue } = settings

  const seriesData = [
    {
      children: getSeriesDataChildren(values, totalValue),
      level: 1,
      title,
    },
  ]

  const series = {
    data: seriesData,
    type: 'sunburst',
    radius: [0, '100%'],
    label: {
      rotate: 'tangential',
    },
    // labelLine: {
    //   show: true,
    //   smooth: true,
    //   showAbove: true,
    //   length2: 200,
    //   minTurnAngle: 180,
    // },
    levels: [
      {},
      {
        itemStyle: {
          color: '#FDF5EF',
        },
      },
      {
        itemStyle: {
          color: '#0E7BFC',
        },
      },
      {
        itemStyle: {
          color: '#D1E7FE',
        },
      },
    ],
  }

  const tooltip = {
    trigger: 'item',
    borderColor: 'rgba(29, 49, 82, 0.05)',
    formatter: params => {
      let dataStr = ''
      //   console.log(params)
      if (
        params['data']['children'] &&
        params['data']['children'].length === 0
      ) {
        dataStr = `${params.data.tooltipName}  暂未接入`
      } else if (params['data']['level'] && params['data']['level'] === 1) {
        dataStr = params['data']['title']
      } else if (!params['dataType']) {
        dataStr = ''
      } else {
        dataStr = `
         <p class="sankey-tooltip ">
         <span class="sankey-tooltip__icon"></span>
         <span class="sankey-tooltip__path">客流数:
        </span>     
         <span">${params['value'].toLocaleString()}人</span>
         </p>
         `
      }
      return dataStr
    },
  }

  const options = {
    series,
    tooltip,
  }

  if (grid) {
    options.grid = grid
  }

  return options
}

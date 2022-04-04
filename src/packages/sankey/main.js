import { DEFAULT_COLORS } from '../../constants'

function getSeries({ keys, values, grid, nodeColor, depth, length }) {
  const series = {
    type: 'sankey',
    layout: 'none',
    emphasis: {
      focus: 'adjacency',
    },
    data: [],
    links: [],
    levels: [],
    ...grid,
  }

  Array(depth)
    .fill(1)
    .map((el, i) => {
      series.levels.push({
        depth: i,
        itemStyle: {
          color: nodeColor[i],
        },
        lineStyle: {
          color: 'gradient',
          opacity: 0.1,
        },
      })
    })

  keys.map((item, index) => {
    let obj = {
      name: item.name,
      label: {
        formatter: params => {
          return formatName(params.name, length)
        },
      },
    }

    if (item.depth === depth - 1) {
      obj.itemStyle = {
        color: DEFAULT_COLORS[index],
      }
    }

    series.data.push(obj)
  })
  series.data = removeArr(series.data)
  series.links = values

  return series
}

//去重数组
function removeArr(arr) {
  const res = new Map()
  return arr.filter(arr => !res.has(arr.name) && res.set(arr.name, 1))
}

//处理字符串
function formatName(name, length) {
  return name.length > length ? `${name.slice(0, length)}...` : name
}

export const sankey = (keys, values, settings, extra) => {
  const tooltip = {
    trigger: 'item',
    formatter: params => {
      //   console.log('params', params)
      let html = ''
      const value = params.data.currentValue || params.value
      if (params['data']['source']) {
        html = `
         <p class="sankey-tooltip ">
         <span class="sankey-tooltip__icon"></span>
         <span class="sankey-tooltip__path">${params.data.source}-${
          params.data.target
        }</span>     
         <span">${value.toLocaleString()}人</span>
         </p>
         `
      }
      return html
    },
  }

  const {
    grid,
    // 节点颜色
    nodeColor = ['#4883FB', '#71A0FF'],
    //必传
    depth = 4,
    //名称显示长度
    length = 4,
  } = settings

  //   const { tooltipVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  //   if (Object.keys(labelMap).length !== 0) {
  //     _.forEach(units, function(v, key) {
  //       if (labelMap[key]) units[labelMap[key]] = v
  //     })
  //   }

  const series = getSeries({ keys, values, grid, nodeColor, depth, length })
  //   const legend = {
  //     show: true,
  //     data: seriesName,
  //     orient: 'vertical',
  //     right: 20,
  //     top: 30,
  //   }

  const options = {
    // grid: grid || DEFAULT_GRID,
    // angleAxis,
    // radiusAxis,
    // polar,
    series,
    tooltip,
    // legend,
  }

  return options
}

import SxBar from './packages/bar'
import SxBarline from './packages/barline'
import SxBubble from './packages/bubble'
import SxDottedpictorialbar from './packages/dottedpictorialbar'
import SxHeatmap from './packages/heatmap'
import SxHistogram from './packages/histogram'
import SxLine from './packages/line'
import SxParallel from './packages/parallel'
import SxPictorialBar from './packages/pictorialbar'
import SxPie from './packages/pie'
import SxPienest from './packages/pienest'
import SxPolarBar from './packages/polarbar'
import SxRadar from './packages/radar'
import SxSanKey from './packages/sankey'
import SxScatter from './packages/scatter'
import SxSunburst from './packages/sunburst'
import './scss/main.scss'

const components = [
  SxLine,
  SxBarline,
  SxHistogram,
  SxPie,
  SxRadar,
  SxBar,
  SxPolarBar,
  SxSanKey,
  SxScatter,
  SxPictorialBar,
  SxDottedpictorialbar,
  SxHeatmap,
  SxSunburst,
  SxParallel,
  SxBubble,
  SxPienest,
]

function install(_Vue) {
  components.forEach(comp => {
    _Vue.component(comp.name, comp)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install,
  ...components,
}

import 'echarts/lib/chart/heatmap'
import Core from '../../core'
import { heatmap } from './main'
export default Object.assign({}, Core, {
  name: 'SxHeatmap',
  data() {
    this.chartHandler = heatmap
    return {}
  },
})

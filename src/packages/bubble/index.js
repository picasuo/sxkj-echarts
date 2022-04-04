import 'echarts/lib/chart/scatter'
import Core from '../../core'
import { bubble } from './main'
export default Object.assign({}, Core, {
  name: 'SxBubble',
  data() {
    this.chartHandler = bubble
    return {}
  },
})

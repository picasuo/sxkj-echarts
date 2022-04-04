import 'echarts/lib/chart/bar'
import { histogram } from './main'
import Core from '../../core'
export default Object.assign({}, Core, {
  name: 'SxHistogram',
  data() {
    this.chartHandler = histogram
    return {}
  },
})

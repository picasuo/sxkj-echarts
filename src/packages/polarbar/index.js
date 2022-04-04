import 'echarts/lib/chart/bar'
import Core from '../../core'
import { polarbar } from './main'
export default Object.assign({}, Core, {
  name: 'SxPolarBar',
  data() {
    this.chartHandler = polarbar
    return {}
  },
})

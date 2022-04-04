import 'echarts/lib/chart/pie'
import Core from '../../core'
import { pienest } from './main'
export default Object.assign({}, Core, {
  name: 'SxPienest',
  data() {
    this.chartHandler = pienest
    return {}
  },
})

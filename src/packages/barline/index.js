import 'echarts/lib/chart/line'
import Core from '../../core'
import { barline } from './main'
export default Object.assign({}, Core, {
  name: 'SxBarline',
  data() {
    this.chartHandler = barline
    return {}
  },
})

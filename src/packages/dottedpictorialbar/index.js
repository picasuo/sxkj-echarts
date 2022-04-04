import 'echarts/lib/chart/pictorialBar'
import Core from '../../core'
import { dottedpictorialbar } from './main'
export default Object.assign({}, Core, {
  name: 'SxDottedpictorialbar',
  data() {
    this.chartHandler = dottedpictorialbar
    return {}
  },
})

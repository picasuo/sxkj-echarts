import 'echarts/lib/chart/scatter'
import { scatter } from './main'
import Core from '../../core'
export default Object.assign({}, Core, {
  name: 'SxScatter',
  data() {
    this.chartHandler = scatter
    return {}
  },
})

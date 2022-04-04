import 'echarts/lib/chart/radar'
import { radar } from './main'
import Core from '../../core'
export default Object.assign({}, Core, {
  name: 'SxRadar',
  data() {
    this.chartHandler = radar
    return {}
  },
})

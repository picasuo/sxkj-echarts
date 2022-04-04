import 'echarts/lib/chart/pie'
import { pie } from './main'
import Core from '../../core'
export default Object.assign({}, Core, {
  name: 'SxPie',
  data() {
    this.chartHandler = pie
    return {}
  },
})

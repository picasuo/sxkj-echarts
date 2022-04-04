import 'echarts/lib/chart/pictorialBar'
import Core from '../../core'
import { pictorialBar } from './main'
export default Object.assign({}, Core, {
  name: 'SxPictorialBar',
  data() {
    this.chartHandler = pictorialBar
    return {}
  },
})

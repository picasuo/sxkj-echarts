import 'echarts/lib/chart/sunburst'
import Core from '../../core'
import { sunburst } from './main'
export default Object.assign({}, Core, {
  name: 'SxSunburst',
  data() {
    this.chartHandler = sunburst
    return {}
  },
})

import 'echarts/lib/chart/sankey'
import Core from '../../core'
import { sankey } from './main'
export default Object.assign({}, Core, {
  name: 'SxSanKey',
  data() {
    this.chartHandler = sankey
    return {}
  },
})

import Core from '../../core'
import { parallel } from './main'
export default Object.assign({}, Core, {
  name: 'SxParallel',
  data() {
    this.chartHandler = parallel
    return {}
  },
})

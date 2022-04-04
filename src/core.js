import * as echartsLib from 'echarts'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import DataEmpty from './components/data-empty'
import Loading from './components/loading'
import { DEFAULT_COLORS } from './constants'

let options

export default {
  render(h) {
    return h(
      'div',
      {
        class: [_.kebabCase(this.$options.name || this.$options._componentTag)],
        style: this.canvasStyle,
      },
      [
        h('div', {
          style: {
            width: '100%',
            height: '100%',
          },
          class: { 'charts-mask__status': this.dataEmpty || this.loading },
          ref: 'canvas',
        }),
        h(DataEmpty, {
          style: { display: this.dataEmpty ? '' : 'none' },
        }),
        h(Loading, {
          style: { display: this.loading ? '' : 'none' },
        }),
        this.$slots.default,
      ],
    )
  },

  props: {
    // remote or mock data
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    // echarts options
    settings: {
      type: Object,
      default() {
        return {}
      },
    },

    // echarts width
    width: { type: String, default: '100%' },
    // echarts height
    height: { type: String, default: '100%' },
    // tooltip visible
    tooltipVisible: { type: Boolean, default: true },
    // legend visible
    legendVisible: { type: Boolean, default: true },
    // echarts instance resizeable
    resizeable: { type: Boolean, default: true },
    // uncheck before canvas resize
    cancelResizeCheck: { type: Boolean, default: false },
    // echarts instance resize delay
    resizeDelay: { type: Number, default: 200 },
    // data change tigger change handle after delay
    changeDelay: { type: Number, default: 0 },
    // colors for echarts use
    colors: { type: Array },
    // tooltip customize formatter function
    tooltipFormatter: { type: Function },
    // empty data flag
    dataEmpty: { type: Boolean, default: false },
    // data loading flag
    loading: { type: Boolean, default: false },
    // lifeCycle method: trigger before setting options
    beforeOptionSet: Function,
    // lifeCycle method: trigger before resize
    beforeResize: Function,
    interval: { type: Number, default: 5 },
  },

  watch: {
    data: {
      deep: true,
      handler(v) {
        if (v) this.changeHandler()
      },
    },
    settings: {
      deep: true,
      handler(v) {
        this.changeHandler()
      },
    },
    width: 'nextTickResize',
    height: 'nextTickResize',
    resizeable: 'resizeableHandler',
  },

  computed: {
    // canvas style
    canvasStyle() {
      return {
        width: this.width,
        height: this.height,
        position: 'relative',
      }
    },
    // chart base colors
    chartColors() {
      return this.colors || DEFAULT_COLORS
    },
  },

  methods: {
    dataHandler() {
      if (!this.chartHandler) return
      let data = this.data
      //   console.log('data', data)
      if (Object.keys(data).length === 0) return
      const { keys = [], values = [] } = data

      const extra = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible,
        echarts: this.echarts,
        chartColors: this.chartColors,
        tooltipFormatter: this.tooltipFormatter,
        interval: this.interval,
      }
      //   console.log('setting', this.settings)
      let baseOpts = this.chartHandler(keys, values, this.settings, extra)
      //   console.log('baseOpts', baseOpts)
      //鼠标双击事件
      this.echarts.on('dblclick', function(params) {
        if (Object.prototype.hasOwnProperty.call(baseOpts, 'dblclick')) {
          baseOpts.dblclick(params)
        }
      })

      //鼠标改变x轴事件
      this.echarts.on('updateAxisPointer', function(event) {
        if (
          Object.prototype.hasOwnProperty.call(baseOpts, 'updateAxisPointer')
        ) {
          baseOpts.updateAxisPointer(event)
        }
      })

      if (baseOpts) this.setChartsOption(baseOpts)
    },
    setChartsOption(opts) {
      // run lifeCycle method beforeOptionSet, this is last time to customize options
      if (this.beforeOptionSet && typeof this.beforeOptionSet === 'function')
        this.beforeOptionSet(opts)
      options = opts

      this.echarts.setOption(opts, { notMerge: true }) // notMerge 是否和之前的配置合并

      //   console.log('options', options['mouseover']['name'])
    },
    // next tick to resize the canvas
    nextTickResize() {
      this.$nextTick(this.resize)
    },
    // check or unCheck before resize echarts instance
    resize() {
      if (!this.cancelResizeCheck) {
        if (this.$el && this.$el.clientWidth && this.$el.clientHeight) {
          this.echartsResize()
        }
      } else this.echartsResize()
    },
    // resize echarts instance
    echartsResize() {
      if (this.echarts) {
        if (
          this.beforeResize &&
          typeof this.beforeResize === 'function' &&
          options
        ) {
          this.beforeResize(options)
          this.echarts.setOption(options)
        }
        this.echarts.resize()
      }
    },
    // according to the judgment of resizeable, add or remove the resize listener
    resizeableHandler(resizeable) {
      if (resizeable && !this._once.onresize) this.addResizeListener()
      if (!resizeable && this._once.onresize) this.removeResizeListener()
    },
    // add resize listener and mark
    addResizeListener() {
      window.addEventListener('resize', this.resizeHandler)
      this._once.onresize = true
    },
    // remove resize listener and mark
    removeResizeListener() {
      window.removeEventListener('resize', this.resizeHandler)
      this._once.onresize = false
    },
    // init echarts instance
    init() {
      if (this.echarts) return
      this.echarts = echartsLib.init(this.$refs.canvas)
      if (this.data) this.changeHandler()
      if (this.resizeable) this.addResizeListener()
    },
    // destroy echarts instance
    clean() {
      if (this.resizeable) this.removeResizeListener()
      this.echarts.dispose()
    },
  },

  created() {
    this.echarts = null
    this._once = {}
    this.resizeHandler = _.debounce(this.resize, this.resizeDelay)
    this.changeHandler = _.debounce(this.dataHandler, this.changeDelay)
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.clean()
  },
}

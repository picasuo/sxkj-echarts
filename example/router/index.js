import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const TEST_ROUTERS = [
  {
    path: '/commonParams',
    name: '组件参数',
    component: () =>
      import(/* webpackChunkName: "commonParams" */ '../pages/test.vue'),
  },
]

export const INFOR_ROUTERS = [
  {
    path: '/info/:type',
    name: '信息',
    component: () => import(/* webpackChunkName: "info" */ '../pages/info.vue'),
  },
]

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/sxkj-echarts/' : '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../pages/home.vue'),
    },
    {
      path: '/chart/:type',
      name: '图表',
      component: () =>
        import(/* webpackChunkName: "chart" */ '../pages/chart.vue'),
    },
  ].concat(TEST_ROUTERS, INFOR_ROUTERS),
})

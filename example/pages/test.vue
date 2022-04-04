<template>
  <div class="container">
    <div class="item">
      <div class="item-title">Loading</div>
      <div class="item-main">
        <sx-line :loading="loading"></sx-line>
      </div>
    </div>
    <div class="item">
      <div class="item-title">Empty Data</div>
      <div class="item-main">
        <sx-line :dataEmpty="dataEmpty"></sx-line>
      </div>
    </div>
    <div class="item">
      <div class="item-title">hide tooltip</div>
      <div class="item-main">
        <sx-line :data="lineData" :tooltipVisible="false"></sx-line>
      </div>
    </div>
    <div class="item">
      <div class="item-title">hide legend</div>
      <div class="item-main">
        <sx-line :data="lineData" :legendVisible="false"></sx-line>
      </div>
    </div>
    <div class="item">
      <div class="item-title">LifeCycle: beforeOptionSet</div>
      <div class="item-main">
        <sx-line :data="lineData" :beforeOptionSet="beforeOptionSet"></sx-line>
      </div>
    </div>
    <div class="item">
      <div class="item-title">LifeCycle: beforeResize</div>
      <div class="item-main">
        <sx-line :data="lineData" :beforeResize="beforeResize"></sx-line>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      dataEmpty: true,
      lineData: {
        keys: ['date', '用户量'],
        values: [
          {
            date: '2019-01-01',
            用户量: 300,
          },
          {
            date: '2019-01-02',
            用户量: 230,
          },
          {
            date: '2019-01-03',
            用户量: 350,
          },
          {
            date: '2019-01-04',
            用户量: 189,
          },
          {
            date: '2019-01-05',
            用户量: 298,
          },
        ],
      },
    }
  },
  methods: {
    beforeOptionSet(opt) {
      console.log(
        '%cAfter this lifeCycle method will build a charts instance！we change the color before set option!',
        'color:#f0f;',
        'options：',
        opt,
      )
      opt.color = ['red', 'yellow']
    },
    beforeResize(opt) {
      console.log(
        '%cWhen resize window will trigger beforeResize lifeCycle method, we can do sometheing before echarts instance resize',
        'color:#f0f',
        'options',
        opt,
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: get-vw(500px);
  grid-gap: get-vw(20px) get-vw(20px);
  .item {
    display: grid;
    grid-template-rows: get-vw(50px) 1fr;
    border-radius: 5px;
    box-shadow: 1px 1px 16px 0 rgba(29, 49, 82, 0.08);
    &-title {
      text-align: center;
      line-height: get-vw(50px);
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>

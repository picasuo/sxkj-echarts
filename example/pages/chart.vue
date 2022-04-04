<template>
  <div class="page-item-test">
    <div class="chart-item" v-for="(d, i) in chartData" :key="i">
      <div class="chart-part">
        <h3>{{ d.name }}</h3>
        <component
          :is="`sx-${innerType}`"
          :data="d.data"
          :settings="d.settings"
          :colors="d.colors"
        >
        </component>
      </div>
      <div class="code-view">
        <p>数据格式</p>
        <div class="data-code">
          <code-section :content="d.data" json></code-section>
        </div>
        <p>配置项</p>
        <div class="setting-code">
          <code-section :content="d.settings" json></code-section>
        </div>
      </div>
    </div>
    <hr />
    <div class="info" v-html="html"></div>
  </div>
</template>

<script>
import CHART_DATA from '../data'

export default {
  name: 'Item',

  data() {
    return {
      chartData: [],
      type: null,
      innerType: null,
      html: null,
    }
  },

  methods: {
    init() {
      this.type = this.$route.params.type
      this.chartData = CHART_DATA[this.type].data
      this.innerType = CHART_DATA[this.type].type
      this.html = CHART_DATA[this.type].html
      //   console.log('chartData', this.chartData)
    },

    mounse() {},
  },

  created() {
    this.init()
  },

  watch: {
    $route() {
      this.init()
    },
  },
}
</script>

<style lang="scss">
.page-item-test {
  h3,
  p {
    margin: 0;
  }
  .info {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    h4 {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      padding: 20px 0;
    }
    table {
      width: 100%;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 1px 1px 4px 0 rgba(29, 49, 82, 0.5);
      thead {
        font-size: 16px;
        font-weight: 500;
        th {
          height: 60px;
        }
      }
      tr {
        height: 50px;
      }
      tbody {
        tr:nth-of-type(even) {
          background-color: #defaff30;
        }
        tr:nth-of-type(odd) {
          background-color: #dcdcdc47;
        }
      }
    }
  }

  pre {
    height: 150px;
  }

  .chart-item {
    display: flex;
    padding: 15px;

    .chart-part {
      flex: 1;
      height: get-vw(400px);
    }

    .code-view {
      width: 400px;
      margin-left: 20px;
    }
  }
}
</style>

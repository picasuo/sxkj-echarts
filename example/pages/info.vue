<template>
  <div class="info" v-html="html"></div>
</template>

<script>
import INFO_DATA from '../data/info'

export default {
  data() {
    return {
      html: null,
    }
  },

  methods: {
    init() {
      this.type = this.$route.params.type
      this.html = INFO_DATA.find(v => v.type === this.type).html
    },
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
.info {
  margin: 20px;
  h1 {
    text-align: center;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0;
  }
  blockquote {
    margin: 10px;
    text-indent: 2ch;
    border-left: 4px solid #aeabab;
    padding: 10px;
    background-color: #f6f6f69e;
  }
  pre {
    background-color: #f3f3f3;
    padding: 10px;
    font-size: 12px;
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
</style>

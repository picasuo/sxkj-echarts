<template>
  <div class="home">
    <h1>快速上手</h1>
    <hr />
    <h4>1. NPM 安装</h4>
    <pre><code class="language-javascript" lang="javascript">$ npm install sxkj-echarts --save
</code></pre>
    <h4>2. 引入 SXKJ-ECHARTS</h4>
    <h5>全局引入</h5>
    <p>
      一般在 webpack 入口页面
      <code>main.js</code> 中如下配置：
    </p>
    <pre><code class="language-javascript" lang="javascript">import Vue from &#39;vue&#39;
import App from &#39;./App.vue&#39;
// 添加样式
import &#39;sxkj-echarts/lib/sxEcharts.css&#39;
// 导入 sxkj-echarts
import sxEcharts from &#39;sxkj-echarts&#39;
// 注册
Vue.use(sxEcharts)

Vue.config.productionTip = false

new Vue({
  render: h =&gt; h(App),
}).$mount(&#39;#app&#39;)
</code></pre>
    <h5>按需引入</h5>
    <p>
      借助插件
      <a href="https://github.com/ant-design/babel-plugin-import" target="black"
        >babel-plugin-import</a
      >可以实现按需加载组件，减少文件体积。首先安装，并在文件
      <code>.babelrc</code> 中配置：
    </p>
    <pre><code class="language-javascript" lang="javascript">npm install babel-plugin-import --save-dev

// .babelrc
&quot;plugins&quot;: [[&quot;import&quot;, {
    &quot;libraryName&quot;: &quot;sxkj-echarts&quot;,
    &quot;libraryDirectory&quot;: &quot;src/packages&quot;
  }]]
</code></pre>
    <p>然后这样按需引入组件，就可以减小体积了：</p>
    <pre><code class="language-javascript" lang="javascript">import { line } from &#39;sxkj-echarts&#39;
Vue.component(&#39;sxLine&#39;, line)
</code></pre>
    <p>
      <strong>特别提醒</strong>
    </p>
    <ul>
      <li>
        1. 不要在项目中同时
        <strong>全部引入</strong> 和 <strong>按需引入</strong> (存在冲突)
      </li>
      <li>
        2. 按需引用仍然需要导入样式，即在
        <strong>main.js</strong> 或根组件执行
        <code>import &#39;sxkj-echarts/lib/sxEcharts.css&#39;</code>
      </li>
      <li>
        3. 由于组件库内部使用了
        <code>lodash</code>，所以请在 <code>vue.config.js</code> 中提供自动导入
        <code>lodash</code>
      </li>
    </ul>
    <pre><code class="language-javascript" lang="javascript">// vue.config.js

chainWebpack: (config) =&gt; {
    config.plugin(&quot;provide&quot;).use(webpack.ProvidePlugin, [{
      _: &quot;lodash&quot;,
    }])
  }
</code></pre>
    <p>&nbsp;</p>
  </div>
</template>
<style lang="scss">
.home {
  margin: 20px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    margin: 10px 0;
  }
  h1 {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-weight: 700;
    font-size: 20px;
  }
  h5 {
    font-weight: 700;
    border-left: 2px solid black;
    padding-left: 10px;
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
  li {
    padding: 5px;
  }
}
</style>

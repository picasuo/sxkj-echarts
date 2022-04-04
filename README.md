# awesome-echarts

awesome-echarts 是一套基于 Vue2.x 封装的 Echarts 图表组件，用于为开发者提供快速生成图表的服务。

1. 使用前可以先参考测试网站的用例
2. 如果想要参与代码贡献，请阅读贡献文档

**组件引入、组件参数等，请务必阅读 doc 目录下的使用手册**

## NPM 安装

```javascript
$ npm install sxkj-echarts --save
```

## 简单演示

```javascript
// template
<div>
  <sx-line :data="lineData"></sx-line>
</div>

// javascript
data () {
  return {
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
      }
  }
}
```

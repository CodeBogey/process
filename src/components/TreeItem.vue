<template>
    <div class="chart-box">
      <div :id="'charts'+id" class="chart"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    item: {
      type: Object  
    },
    id: {
      type: Number
    },
  },
  data () {
    return {

    }
  },
  mounted () {
    this.getTreeData(this.item)
  },
  methods: {
    getTreeData (data) {
      var that = this
      document.getElementById('charts' + this.id).style.height = 100 + '%'
      var myChart = echarts.init(document.getElementById('charts' + this.id))
      myChart.resize()
      // echarts.util.each(data.children, function (datum, index) {
      //   index % 2 === 0 && (datum.collapsed = true);
      // });
        // 改变第一部分线条的颜色
      for (var i = 0; i < data.children.length; i++) {
        data.children[i].lineStyle = {
          color: '#2b3878',
          width: 2
        }
      }
        // 树图配置项
      var option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            top: '1%',
            left: '20%',
            bottom: '1%',
            right: '15%',
            symbolSize: 0.01,
            // symbolOffset: [85, 0],
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'center',
              // offset: [90, 0],
              // fontSize: 12,
              lineHeight: 30,
              formatter: function(val) {
                // console.log(val)
                var strs = val.data.name.split(''); //字符串数组
                var str = ''
                for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
                  str += s;
                  if(!(i % 10)) str += '\n';
                }
                if (val.data.flag === 1) {
                  return `{a|${str.substring(0,10)}...}`
                }
                if (val.data.flag === 2) {
                  // console.log(val.data.target)
                  val.data.target = val.data.target !== '' ? val.data.target : ''
                  return [`{b|${str.substring(0,10)}...}`,`{y|${val.data.target}}`].join('\n')
                  // return `{b|${str.substring(0,14)}...}`
                }
                if (val.data.flag === 3) {
                  val.data.docStatusName = val.data.docStatusName !== '' ? val.data.docStatusName : '无'
                  return [`{c|${str.substring(0,10)}...}`,`{g|方正内容库:（${val.data.docStatusName}）}`].join('\n')
                  // return `{c|${str.substring(0,14)}...}`
                }
                
              },
              rich: {
                a: {
                  backgroundColor: {
                    image: require("../../static/images/blue-item-img.png")
                  },
                  width: 380,
                  height: 90,
                  color: "#fff",
                  fontSize: 26
                },
                b: {
                  backgroundColor: {
                    image: require("../../static/images/yellow-item-img.png")
                  },
                 width: 380,
                  height: 90,
                  color: "#fff",
                  fontSize: 26
                },
                c: {
                  backgroundColor: {
                    image: require("../../static/images/green-item-img.png")
                  },
                  width: 380,
                  height: 90,
                  color: "#fff",
                  fontSize: 26
                },
                y: {
                  color: '#dfb25b',
                  align: 'right',
                  fontSize: 18,
                  verticalAlign: 'top',
                  padding: [0, 20, 0, 0]
                  // lineHeight: -200
                },
                g: {
                  color: '#6ac987',
                  align: 'right',
                  fontSize: 18,
                  verticalAlign: 'top',
                  padding: [0, 20, 0, 0]
                }
              }
            },
            lineStyle: {
              color: '#766054',
              width: 2
            },
            itemStyle: {
              borderColor: '#fff'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
      myChart.setOption(option)
      // 图标自适应大小 监听窗口变化 - 多个图表同时刷新
      window.addEventListener('resize', ()=> {
        myChart.resize();
      })

    }
  }
}
</script>

<style scoped>
.chart-box {
  width: 94%;
  height: 100%;
  margin: 0 auto;
}
#charts {
  width: 94%;
  margin: 0 auto;
  height: 100%;
}
</style>

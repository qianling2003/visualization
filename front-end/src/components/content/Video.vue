<template>
  <div class='com-container' @dblclick="revertMap">
    <div class='com-chart' ref='map_ref'></div>
  </div>
</template>

<script>
import axios from 'axios'
// mport { getProvinceMapInfo } from '@/utils/map_utils'

export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {} // 所获取的省份的地图矢量数据
    }
  },
  created () {
    this.$socket.registerCallBack('mapData', this.getData)
  },
  mounted () {
    this.initChart()
    this.$socket.send({
      action: 'getData',
      socketType: 'mapData',
      chartName: 'map',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    this.$socket.unRegisterCallBack('mapData')
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
      const ret = await axios.get('http://localhost:8999/static/map/USA.json')
      this.$echarts.registerMap('USA', ret.data, {
        Alaska: {
          left: -131,
          top: 25,
          width: 15
        },
        Hawaii: {
          left: -110,
          top: 28,
          width: 5
        },
        'Puerto Rico': {
          left: -76,
          top: 26,
          width: 2
        }
      })

      const initOption = {
        title: {
          text: '▎ 美国各州车祸数量',
          left: 20,
          top: 20,
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          show: true,
          left: 'right',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            saveAsImage: {}
          }
        },
        geo: {
          type: 'map',
          map: 'USA',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        }
        // 不在初始化时设置 series 和 visualMap
      }
      this.chartInstance.setOption(initOption)
    },
    getData (ret) {
      this.allData = ret
      this.updateChart()
    },
    updateChart () {
      // 从 'count' 数据集中提取最小和最大值
      const countValues = this.allData.find(item => item.name === 'count').children.map(c => c.value)
      const minVal = Math.min(...countValues)
      const maxVal = Math.max(...countValues)

      const countData = this.allData.find(item => item.name === 'count').children.map(item => ({
        name: item.name,
        value: item.value
      }))

      const option = {
        title: {
          text: '▎ 美国各州车祸数量',
          left: 20,
          top: 20,
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          show: true,
          type: 'continuous',
          min: minVal,
          max: maxVal,
          inRange: {
            color: ['#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          textStyle: {
            color: '#fff'
          },
          left: 'right',
          bottom: 'bottom'
        },
        tooltip: {
          trigger: 'item', // 触发类型：数据项图形触发
          formatter: function (params) {
            return params.name + '<br/>' + '车祸数量: ' + params.value
          }
        },
        series: [
          {
            name: 'Count',
            type: 'map',
            mapType: 'USA',
            data: countData
          }
        ]
      }

      this.chartInstance.setOption(option)
    },
    screenAdapter () {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    },
    revertMap () {
      const revertOption = {
        geo: {
          map: 'USA'
        }
      }
      this.chartInstance.setOption(revertOption)
    }
  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.com-container {
  position: relative;
  height: 80vh;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

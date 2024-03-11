<!-- MatrixTreeChart.vue -->

<template>
  <div>
    <div class="yearLabelContainer">
      <label for="yearSelect" class="yearLabel">选择年份：</label>
      <select id="yearSelect" v-model="selectedYear" @change="onYearChange">
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div ref="chart" style="width: 100%; height: 80vh;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data () {
    return {
      chart: null,
      allData: null,
      availableYears: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      selectedYear: '2016'
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.chart)
    },
    async getData () {
      try {
        // 销毁之前的实例
        if (this.chart) {
          this.chart.dispose()
        }

        // 发送请求获取数据
        const { data } = await this.$http.get(`tree${this.selectedYear}`)
        this.allData = data
        this.updateChart()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    updateChart () {
      if (!this.allData) return

      // 处理图表需要的数据
      const treemapData = this.allData.map(state => {
        return {
          name: state.name,
          value: state.accidents,
          label: {
            show: true
          },
          children: state.cities.map(city => {
            return {
              name: city.name,
              value: city.accidents,
              label: {
                show: true
              },
              extraData: {
                name: city.name,
                accidents: city.accidents,
                percentage: city.percentage
              }
            }
          })
        }
      })

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: params => {
            if (params.data.extraData) {
              const { name, accidents, percentage } = params.data.extraData
              return `${name}<br>Accidents: ${accidents}<br>Percentage: ${percentage}%`
            }
            return ''
          }
        },
        series: [
          {
            type: 'treemap',
            label: {
              show: true // 不在节点上显示 label
            },
            upperLabel: {
              show: true,
              height: 10
            },
            itemStyle: {
              borderColor: '#fff',
              gapWidth: 0
            },
            levels: [
              {
                itemStyle: {
                  borderWidth: 0,
                  gapWidth: 0
                }
              }
            ],
            data: treemapData
          }
        ]
      }

      // 初始化新的图表实例
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(option)
    },
    screenAdapter () {
      // 适应屏幕变化的逻辑
      // ...
      if (this.chart) {
        this.chart.resize()
      }
    },
    onYearChange () {
      this.getData()
    }
  }
}
</script>

<style scoped>
/* 样式可以根据需求进行调整 */
.yearLabelContainer {
  margin-top: 10px; /* 调整上边距，根据需要调整数值 */
}

label.yearLabel {
  color: rgb(250, 250, 251);
  width: 100px; /* 设置宽度 */
  height: 10px; /* 设置高度 */
}
</style>

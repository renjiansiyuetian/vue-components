<template lang="html">
  <div>
    <!--转盘-->
    <wheel-surf :datas="obs"></wheel-surf>
  </div>
</template>

<script>
import WheelSurf from '@/components/WheelSurf.vue'

export default {
  data () {
    return {
      obs: {
        items: '', // 奖品列表
        play_times: '', // 可转几次
        stop_id: '' // 停住的id值
      }
    }
  },
  mounted () {
    this.fetchLotteries()
  },
  components: { WheelSurf },
  methods: {
    fetchLotteries () {
      // 模拟后台返回的数据
      this.obs.items = [
        { id: 1, aws_url: require('../assets/images/demo.jpg'), name: '奖品1' },
        { id: 2, aws_url: require('../assets/images/demo.jpg'), name: '奖品2' },
        { id: 3, aws_url: require('../assets/images/demo.jpg'), name: '奖品3' },
        { id: 4, aws_url: require('../assets/images/demo.jpg'), name: '奖品4' },
        { id: 5, aws_url: require('../assets/images/demo.jpg'), name: '奖品5' },
        { id: 6, aws_url: require('../assets/images/demo.jpg'), name: '奖品6' }
      ]
      this.obs.play_times = 200
      this.obs.stop_id = 3
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

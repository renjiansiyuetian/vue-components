<template lang="html">
  <div>
    <!--rank-->
    <p>级别分配</p>
    <ul>
      <li>0积分: 级别0</li>
      <li>到达200积分: 级别1</li>
      <li>到达500积分: 级别2</li>
      <li>到达1000积分: 级别3</li>
      <li>到达2000积分: 级别4</li>
      <li>到达10000积分: 级别5</li>
    </ul>
    <level-rank :currentRank='currentRank' :ranks='ranks'></level-rank>
  </div>
</template>

<script>
import LevelRank from '@/components/LevelRank.vue'

export default {
  data () {
    return {
      currentRank: '',
      ranks: 0
    }
  },
  mounted () {
    this.fetchRanks()
  },
  components: { LevelRank },
  methods: {
    fetchRanks () {
      // 模拟后台返回的数据
      this.ranks = { 0: 0, 1: 200, 2: 500, 3: 1000, 4: 2000, 5: 10000 }
      this.currentRank = 550
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template lang="html">
  <div>
    <!--rank-->
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

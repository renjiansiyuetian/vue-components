<template lang="html">
  <div class="lv-graphic">
    <h3>您当前的积分: {{ currentRank }}</h3>
    <table>
      <tr v-if='len'>
        <span class="color-width" :class="{ 'full-width': levelWidth >= 100 }" :style="{ width: levelWidth + '%' }"></span>
        <td v-for='ind in (len - 1)'>
           <span v-if='ind === 1' class="lv-before red">Lv.0</span>
          <span class="lv" :class="{ 'red': percentage >= ind/len }">Lv.{{ ind }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['currentRank', 'ranks'],
  data () {
    return {
      levelWidth: 0,
      percentage: 0,
      section: 0,
      len: 0
    }
  },
  mounted () {
    Vue.nextTick(() => {
      this.getRank()
    })
  },
  methods: {
    getRank () {
      let arr = []
      if (this.ranks) {
        for (let item in this.ranks) {
          arr.push(this.ranks[item])
        }
        let index = ''
        this.len = arr.length
        this.section = 1 / (this.len - 1)
        for (let i = 0; i < this.len; i++) {
          if (arr[i] <= this.currentRank) {
            index = i
          }
        }
        if (index >= this.len - 2) {
          this.percentage = 1
          this.levelWidth = 100
        } else {
          let beforeAmount = arr[index]
          let afterAmount = arr[index + 1]
          let differ = this.currentRank - beforeAmount
          let sectionPercentage = 0
          if ((index >= 1) && (index <= this.len - 2)) {
            sectionPercentage = ((differ / (afterAmount - beforeAmount))) * this.section
          } else {
            sectionPercentage = (differ / (afterAmount - beforeAmount)) * this.section
          }
          this.percentage = (index * this.section + sectionPercentage)
          this.levelWidth = 100 * this.percentage
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

h3 {
  margin-bottom: 50px;
}
p {
  margin: 2px 0px;
}
.red {
  color: $color-red;
}
.p-space {
  padding-right: 5px;
}
.m-top {
  margin-top: 10px;
}
.rank {
  padding-left: 5px;
  color: $color-brown;
}
.forecast {
  padding: 10px;
  margin-bottom: 5px;
  display: inline-block;
  font-weight: bold;
  color: $color-grey5;
}
.level-container {
  background-color: $color-white;
  padding: 10px;
  box-shadow: 0px 2px 3px $color-grey2;
  .info {
    padding: 10px;
  }
}
.levels {
  text-align: center;
  position: relative;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    img { border-radius: 50%; }
    margin: 0 auto;
    margin-bottom: 5px;
  }
  .level {
    font-size: $font-h5-1;
    span {
      &:last-child {
        color: $color-red;
        text-shadow: $px $px $color-grey2;
      }
    }
  }
  .condition {
    color: $color-grey2;
  }
}
.full-width {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.lv-graphic {
  margin: 10px auto;
  padding: 0px 10px;
  table {
    width: 100%;
    height: 5px;
    background-color: $color-grey3;
    border-radius: 5px;
    position: relative;
    .color-width {
      position: absolute;
      display: inline-block;
      background: linear-gradient(to right, $color-red1, $color-red);
      left: 0px;
      top: 0px;
      bottom: 0px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      width: 100%;
      background-color: green;
      &:after {
        content: '';
        left: 99%;
        bottom: -7px;
        position: absolute;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 5px solid $color-red;
      }
    }
    td {
      position: relative;
      .lv {
        position: absolute;
        top:-20px;
        right: -12px;
      }
      .lv-before {
        position: absolute;
        top: -20px;
        left: -10px;
      }
    }
    td:not(:last-child) {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 100%;
        top: -2px;
        height: 7px;
        width: 2px;
        background-color: $color-white;
      }
    }
  }
}
</style>

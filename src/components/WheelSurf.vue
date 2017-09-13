<template lang="html">
  <div>
    <section class="gb-wheel-container lottery_js" id="container">
      <div class="gb-wheel-content" :class="{ 'gb-wheel-run': runFlag }" :style="{ transform: 'rotate(' + (count * 3600 - endCount * 360)  + 'deg)' }">
        <ul class="gb-wheel-line">
          <li v-for="(item, index) in datas.items" class="gb-wheel-litem" :style="{ transform: 'rotate(' + (index * copies + copies / 2) + 'turn)' }"></li>
        </ul>
        <div class="gb-wheel-list">
          <div class="gb-wheel-item" v-for="(v, ind) in datas.items">
            <div class="gb-wheel-icontent" :style="{ transform: 'rotate(' + (ind * copies) + 'turn)' }">
              <p class="gb-wheel-itext">
                {{ v.name }}
              </p>
              <p class="gb-wheel-iicon">
                <i><img :src="v.aws_url" width="100%" height="100%"/></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="gb-wheel-btn" @click="handleLottery()"></a>
      </div>
    </section>
    <p>您还有<span>{{ playTimes }}</span>次抽奖机会</p>
  </div>
</template>

<script>
import { transitionRun } from '@/libs/utils.js'

export default {
  props: ['datas'],
  data () {
    return {
      count: 0,
      endCount: '', // 决定在哪个区域停住
      copies: '',
      playTimes: '',
      awardInfo: '',
      lock: '',
      lockCount: 0,
      runFlag: false,
      noIntegral: false
    }
  },
  watch: {
    'datas.items' () {
      this.calculateLottery()
    }
  },
  mounted () {
    this.calculateLottery()
  },
  methods: {
    calculateLottery () {
      // 根据返回数据 得到每份所占比例 以及能转的次数
      if (this.datas.items && this.datas.items.length) {
        this.copies = 1 / this.datas.items.length
        this.playTimes = this.datas.play_times || 0
        if (this.datas.play_times) {
          this.noIntegral = true
        } else {
          this.noIntegral = false
        }
      }
    },
    fetchAwards () {
      // 根据后台返回的得奖的id 决定转盘转几圈
      if (this.datas.items && this.datas.items.length) {
        let len = this.datas.items.length
        let awardId = Math.floor(Math.random() * 6 + 1) // 模拟后台返回的 抽奖到的id
        for (let a = 0; a < len; a++) {
          if (this.datas.items[a].id === awardId) {
            this.endCount = a / len
            this.awardInfo = this.datas.items[a].name
            break
          }
        }
        this.count = this.count + 2 // 此transform转的值一定要放在控制的后面，不然触发不了。
        this.getAwardsFlag = true
      }
    },
    handleLottery () {
      this.lockCount ++ // 一把锁
      if (this.lockCount === 1) {
        this.lock = true // 点进来便会被锁住
      }
      if ((this.lockCount > 1) && this.lock) {
        return
      }
      let transitionRunEve = transitionRun()
      let obElement = document.getElementsByClassName('lottery_js')[0]
      if (transitionRunEve) {
        // let flag = false // 控制监听执行一次
        obElement.addEventListener(transitionRunEve, () => {
          // if (flag) return
          if (this.getAwardsFlag) {
            this.lockCount = 0
            this.lock = false
            alert('恭喜您获取' + this.awardInfo)
            // flag = true
            // obElement.removeEventListener(transitionRunEve, false)
          }
        }, false)
      }
      if (!this.datas.items) {
        alert('无奖品，不能转')
        return
      }
      if (this.datas.items) {
        if (this.playTimes === 0) {
          alert('您已无抽奖机会')
          return
        } else {
          this.playTimes --
          this.runFlag = true
          this.getAwardsFlag = false
          this.fetchAwards()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.body {
  background-color: $color-yellow6;
}
.gb-wheel-container ul,
.gb-wheel-container li,
.gb-wheel-container p {
  margin: 0;
  padding: 0
}
.gb-wheel-container ul,
.gb-wheel-container li {
  list-style: none
}
.gb-wheel-container {
  margin: 0 auto;
  position: relative;
  width: 321px;
  height: 321px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid $color-red6;
}
.gb-wheel-content {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2;
  width: 311px;
  height: 311px;
  border-radius: inherit;
  border: 6px solid $color-yellow7;
  background-color: $color-yellow8;
}
.gb-wheel-content:before {
  content: ' ';
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
  width: 307px;
  height: 307px;
  border-radius: inherit;
  border: $px solid $color-red6;
}
.gb-wheel-list {
  position: absolute;
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  z-index: 9999
}
.gb-wheel-line {
  position: absolute;
  left: 15px;
  top: 2px;
  width: inherit;
  height: inherit;
  z-index: 95
}
.gb-wheel-litem {
  position: absolute;
  left: 140px;
  top: 0;
  width: $px;
  height: 150px;
  background-color: $color-yellow9;
  overflow: hidden;
  transform-origin: 50% 153px
}
.btn {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: $color-brown;
  z-index: 98;
  position: absolute;
  left: 52%;
  top: 50%;
  margin-left: -59px;
  margin-top: -59px;
}
.gb-wheel-btn {
  position: absolute;
  left: 50%;
  top: 42%;
  z-index: 98;
  width: 100px;
  height: 118px;
  margin-left: -50px;
  margin-top: -59px;
  background: url("../assets/images/lotspin.png");
  background-size: 100% 100%;
}
.gb-wheel-run {
  transition: transform 6s ease-in-out
}
// list
.gb-wheel-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: $color-red6;
  font-weight: bold;
}
.gb-wheel-icontent {
  position: relative;
  display: block;
  padding-top: 15px;
  margin: 0 auto;
  text-align: center;
  transform-origin: 50% 153px
}
.gb-wheel-itext {
  font-weight: lighter
}
.gb-wheel-iicon {
  i {
    margin-top: 5px;
    width:30px;
    height: 30px;
    display: inline-block;
  }
}
</style>

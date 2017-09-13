<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>vue(2.4.2) components</h2>
    <ul>
      <router-link to='/wheel_surf_demo'><li>大转盘(支持动态分割)Wheel surf, support for dynamic segmentation</li></router-link>
      <router-link to='/level_rank_demo'><li>等级进度条 The progress bar of rank</li></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to renjiansiyuetian`s vue components'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h1 {
  border-bottom: 1px solid #BFBFBF;
  padding-bottom: 10px;
}
h2 {
  color: #c67955;
}
ul {
  list-style-type: decimal;
  width: 600px;
  margin: 10px auto;
}
li {
  color: #407DC4;
  cursor: pointer;
  padding: 10px;
}
a {
  text-decoration: none;
}
</style>

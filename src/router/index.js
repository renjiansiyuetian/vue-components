import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HomeDemo', component: (resolve) => { require(['@/views/HomeDemo'], resolve) } },
    { path: '/wheel_surf_demo', name: 'WheelSurfDemo', component: (resolve) => { require(['@/views/WheelSurfDemo'], resolve) } },
    { path: '/level_rank_demo', name: 'LevelRankDemo', component: (resolve) => { require(['@/views/LevelRankDemo'], resolve) } }
  ]
})

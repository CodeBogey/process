import Vue from 'vue'
import Router from 'vue-router'
import TabelItem from '@/components/TabelItem'
// import ChartsItem from '@/components/ChartsItem'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TabelItem',
      component: TabelItem
    }
  ]
})

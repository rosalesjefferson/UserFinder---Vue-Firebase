import Vue from 'vue'
import Router from 'vue-router'
import Github from '@/components/Github'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Github',
      component: Github
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Auth from './views/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth
    },
    {
      path: '/flags',
      name: 'flags',
      component: () => import(/* webpackChunkName: "flags" */ './views/Flags')
    }
  ]
})

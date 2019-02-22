import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/views/Auth'
import store from '@/store'

const Flags = () => import(/* webpackChunkName: "flags" */ '@/views/Flags')
const PageNotFound = () => import(/* webpackChunkName: "pageNotFound" */ '@/views/PageNotFound')

Vue.use(Router)

const router = new Router({
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
      component: Flags,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

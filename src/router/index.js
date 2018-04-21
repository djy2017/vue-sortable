import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import simple from '@/components/simple'
import interaction from '@/components/interaction'
import transition from '@/components/transition'
import sort from '@/components/sort'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/simple',
      name: 'simple',
      component: simple
    },
    {
      path: '/interaction',
      name: 'interaction',
      component: interaction
    },
    {
      path: '/transition',
      name: 'transition',
      component: transition
    },
    {
      path: '/sort',
      name: 'sort',
      component: sort
    }
  ]
})
